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
       // UPDATE DB as FAILED 
       try {
         const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
         );
         await supabase.from("promptx_bookings")
           .update({ payment_status: "FAILED" })
           .eq("order_id", orderId);
       } catch (err) {
         console.error("Failed status update error:", err);
       }

       return new Response(JSON.stringify({ status: "FAILED", _v: "strict-v3" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // 4. Handle Pending/Processing
    if (!isPaid) {
      return new Response(JSON.stringify({ status: "PROCESSING", _v: "strict-v3" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
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
      .select("payment_status, ticket_sent, email, student_name")
      .eq("order_id", orderId)
      .single();

    if (bookingError || !booking) {
      console.error("Booking not found in DB but Paid at Cashfree:", orderId);
      // Even if DB is missing, return SUCCESS to frontend so user isn't stuck.
      // We can't send email if we don't have the email though.
      return new Response(JSON.stringify({ status: "SUCCESS", warn: "booking_missing" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Update status to SUCCESS if not already
    if (booking.payment_status !== "SUCCESS") {
      await supabase.from("promptx_bookings").update({ payment_status: "SUCCESS" }).eq("order_id", orderId);
    }

    // Trigger Email if not sent
    if (!booking.ticket_sent) {
       console.log("Triggering send-ticket for", booking.email);
       
       const ticketRes = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_ANON_KEY")}`,
          },
          body: JSON.stringify({
            orderId,
            email: booking.email,
            studentName: booking.student_name,
            amount: order.order_amount,
            class_level: booking.class_level 
          }),
        }
      );
      
      if (ticketRes.ok) {
        await supabase.from("promptx_bookings").update({ ticket_sent: true }).eq("order_id", orderId);
      } else {
        console.error("Failed to call send-ticket:", await ticketRes.text());
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

