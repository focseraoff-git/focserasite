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
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>PromptX Workshop Ticket</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
                  
                  <div style="width: 100%; padding: 40px 0; background-color: #0f172a;">
                    <!-- Main Ticket Container -->
                    <div style="max-width: 400px; margin: 0 auto; background-color: #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid #334155;">
                      
                      <!-- Header Section -->
                      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center; position: relative;">
                        <!-- Glow Effect -->
                        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none;"></div>
                        
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">PromptX</h1>
                        <p style="color: #d1fae5; margin: 5px 0 0 0; font-size: 14px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase;">AI Workshop Pass</p>
                      </div>

                      <!-- Ticket Body -->
                      <div style="padding: 30px; color: #e2e8f0;">
                        <div style="margin-bottom: 25px; text-align: center;">
                          <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Attendee</p>
                          <h2 style="margin: 5px 0 0 0; color: #ffffff; font-size: 24px; font-weight: 700;">${booking.student_name}</h2>
                          <div style="margin-top: 5px; display: inline-block; background-color: #334155; padding: 4px 12px; border-radius: 100px;">
                            <span style="color: #10b981; font-size: 12px; font-weight: 600;">Class ${booking.class_level || "7-10"}</span>
                          </div>
                        </div>

                        <!-- Info Grid -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background-color: #0f172a; padding: 20px; border-radius: 12px; border: 1px solid #334155; margin-bottom: 30px;">
                          <div>
                            <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Order ID</p>
                            <p style="margin: 4px 0 0 0; color: #f1f5f9; font-family: monospace; font-size: 14px;">${orderId.substring(0, 12)}...</p>
                          </div>
                          <div style="text-align: right;">
                            <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Status</p>
                            <p style="margin: 4px 0 0 0; color: #10b981; font-weight: 700; font-size: 14px;">CONFIRMED</p>
                          </div>
                          <div>
                            <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Date</p>
                            <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 14px;">Jan 25, 2026</p>
                          </div>
                          <div style="text-align: right;">
                             <p style="margin: 0; color: #64748b; font-size: 11px; text-transform: uppercase; font-weight: 600;">Amount</p>
                             <p style="margin: 4px 0 0 0; color: #f1f5f9; font-size: 14px;">₹${order.order_amount}</p>
                          </div>
                        </div>

                        <!-- QR Section -->
                        <div style="text-align: center; padding-top: 10px; border-top: 2px dashed #334155;">
                          <p style="margin: 0 0 15px 0; color: #94a3b8; font-size: 12px;">Scan at Entrance</p>
                          <div style="display: inline-block; background-color: #ffffff; padding: 15px; border-radius: 12px;">
                            <img src="https://quickchart.io/qr?text=${encodeURIComponent(JSON.stringify({
                                id: orderId,
                                name: booking.student_name,
                                class: booking.class_level,
                                status: "PAID"
                            }))}&size=200&dark=0f172a&light=ffffff" alt="Ticket QR" width="160" height="160" style="display: block;">
                          </div>
                        </div>

                      </div>
                      
                      <!-- Footer -->
                      <div style="background-color: #0f172a; padding: 15px; text-align: center; border-top: 1px solid #334155;">
                        <p style="margin: 0; color: #475569; font-size: 11px;">Powered by Focsera • Ticket #${orderId}</p>
                      </div>

                    </div>
                  </div>
                </body>
                </html>
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
    return new Response(JSON.stringify({ status: "PROCESSING", error: (err as Error).message }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

