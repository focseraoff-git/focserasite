import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const raw = await req.text();
    // defaulting to PROCESSING avoids breaking the frontend loop if empty, 
    // but usually we should fail if no data.
    if (!raw) return new Response(JSON.stringify({ status: "PROCESSING", reason: "no body" }), { headers: corsHeaders });

    const { orderId } = JSON.parse(raw);
    if (!orderId) return new Response(JSON.stringify({ status: "FAILED", reason: "no orderId" }), { headers: corsHeaders });

    const headers = {
      "x-client-id": Deno.env.get("CASHFREE_APP_ID")!,
      "x-client-secret": Deno.env.get("CASHFREE_SECRET_KEY")!,
      "x-api-version": "2023-08-01",
    };

    // 1. Fetch Order Status from Cashfree
    const orderRes = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, { headers });
    if (!orderRes.ok) {
       console.error("Cashfree API Error", await orderRes.text());
       // If order not found at Cashfree, it's definitely FAILED or invalid
       return new Response(JSON.stringify({ status: "FAILED", reason: "cashfree fetch failed" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const order = await orderRes.json();

    const payRes = await fetch(`https://api.cashfree.com/pg/orders/${orderId}/payments`, { headers });
    const payJson = await payRes.json();
    const payments = payJson?.data ?? [];

    console.log(`[Status Check] OrderID: ${orderId}, OrderStatus: ${order?.order_status}, Payments: ${payments.length}`);

    // 2. Determine "Real" Status
    const isPaid = order?.order_status === "PAID";
    const isFailed = 
      order?.order_status === "EXPIRED" || 
      order?.order_status === "USER_DROPPED" || 
      order?.order_status === "CANCELLED" || 
      order?.order_status === "VOID" ||
      (payments.length > 0 && payments.every((p: any) => 
        ["FAILED", "USER_DROPPED", "CANCELLED", "VOID"].includes(p.payment_status)
      ));

    // 3. Handle Failure
    if (isFailed && !isPaid) {
       console.log(`[Status Check] Detected FAILURE for ${orderId}. Updating DB...`);
       try {
         const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
         );
         const { error: updateError } = await supabase.from("promptx_bookings")
           .update({ payment_status: "FAILED" })
           .eq("order_id", orderId);
           
         if (updateError) console.error("DB Update Failed:", updateError);
         else console.log("DB Updated to FAILED");
         
       } catch (err) {
         console.error("Failed status update error:", err);
       }

       return new Response(JSON.stringify({ status: "FAILED", _v: "strict-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 4. Handle Pending/Processing
    if (!isPaid) {
      console.log(`[Status Check] Still PROCESSING. OrderStatus: ${order?.order_status}`);
      return new Response(JSON.stringify({ status: "PROCESSING", _v: "strict-v4" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 5. Handle Success (isPaid === true)
    
    // Update DB
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch booking
    const { data: booking, error: bookingError } = await supabase
      .from("promptx_bookings")
      .select("payment_status, ticket_sent, email, student_name, class_level")
      .eq("order_id", orderId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking not found in DB but Paid at Cashfree:", orderId);
      return new Response(JSON.stringify({ status: "SUCCESS", warn: "booking_missing" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Update status to SUCCESS if not already
    if (booking.payment_status !== "SUCCESS") {
      await supabase.from("promptx_bookings").update({ payment_status: "SUCCESS" }).eq("order_id", orderId);
    }

    // Trigger Email if not sent
    if (!booking.ticket_sent) {
       console.log("Triggering send-ticket DIRECT INLINE for", booking.email);
       
       const resendKey = Deno.env.get("RESEND_API_KEY");
       if (!resendKey) {
           console.error("Configuration Error: RESEND_API_KEY is missing in cashfree-status");
       } else {
           const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: Deno.env.get("FROM_EMAIL") || "PromptX <hello@focsera.in>",
                to: [booking.email],
                subject: "🎟️ Your PromptX Workshop Ticket",
                html: `
                <div style="font-family:Arial, sans-serif; max-width:600px; margin:auto; background-color:#ffffff; color:#333;">
                    <div style="text-align:center; padding: 24px 0; border-bottom: 3px solid #10b981;">
                    <h1 style="color:#10b981; margin:0;">Registration Confirmed!</h1>
                    </div>
                    
                    <div style="padding: 24px;">
                    <p style="font-size:16px;">Hello <strong>${booking.student_name}</strong>,</p>
                    <p style="font-size:16px; line-height:1.5;">
                        You have successfully secured your seat for <strong>PromptX – AI Workshop</strong>.
                        We are excited to see you there!
                    </p>
                    
                    <div style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; margin: 24px 0;">
                        <h3 style="margin-top:0; color:#166534;">Ticket Details</h3>
                        <p style="margin:8px 0;"><strong>Order ID:</strong> <span style="font-family:monospace;">${orderId}</span></p>
                        <p style="margin:8px 0;"><strong>Student:</strong> ${booking.student_name}</p>
                        <p style="margin:8px 0;"><strong>Class:</strong> ${booking.class_level || "7-10"}</p>
                        <p style="margin:8px 0;"><strong>Amount Paid:</strong> ₹${order.order_amount}</p>
                    </div>

                    <p style="font-size:14px; color:#666;">
                        📍 <strong>Important:</strong> Please present this email (digitally or printed) at the venue entrance.
                    </p>
                    </div>

                    <div style="background-color:#f9fafb; padding:20px; text-align:center; border-top:1px solid #e5e7eb; font-size:12px; color:#999;">
                    <p>Sent by PromptX Team • <a href="mailto:support@focsera.in" style="color:#10b981;">support@focsera.in</a></p>
                    </div>
                </div>
                `,
            }),
            });

            if (!emailRes.ok) {
                const errText = await emailRes.text();
                console.error(`Resend API Failed (${emailRes.status}):`, errText);
            } else {
                const emailData = await emailRes.json();
                console.log("Email sent successfully via Inline:", emailData.id);
                await supabase.from("promptx_bookings").update({ ticket_sent: true }).eq("order_id", orderId);
            }
       }
    }

    return new Response(JSON.stringify({ status: "SUCCESS", _v: "strict-v3" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("STATUS ERROR:", err);
    // Return FAILED on critical structure error so frontend doesn't hang forever?
    // Or keep PROCESSING? If it's a code bug, PROCESSING hangs the user.
    // Let's return PROCESSING with error details so we can debug, but maybe FAILED is safer for user experience if it persists?
    // User requested: "make it updated if failed make failed if success turn it success"
    return new Response(JSON.stringify({ status: "PROCESSING", error: err.message }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

