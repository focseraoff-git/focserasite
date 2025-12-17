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
    if (!raw) return new Response(JSON.stringify({ status: "PROCESSING" }), { headers: corsHeaders });

    const { orderId } = JSON.parse(raw);
    if (!orderId) return new Response(JSON.stringify({ status: "FAILED" }), { headers: corsHeaders });

    const headers = {
      "x-client-id": Deno.env.get("CASHFREE_APP_ID")!,
      "x-client-secret": Deno.env.get("CASHFREE_SECRET_KEY")!,
      "x-api-version": "2023-08-01",
    };

    const orderRes = await fetch(`https://api.cashfree.com/pg/orders/${orderId}`, { headers });
    const order = await orderRes.json();

    const payRes = await fetch(`https://api.cashfree.com/pg/orders/${orderId}/payments`, { headers });
    const payJson = await payRes.json();
    const payments = payJson?.data ?? [];

    console.log(`[Status Check] OrderID: ${orderId}, OrderStatus: ${order?.order_status}, Payments: ${payments.length}`);

    // STRICTER CHECK: Only consider paid if the MAIN order status is PAID.
    // Ignoring individual payment statuses to avoid false positives from dropped attempts.
    const isPaid = order?.order_status === "PAID";

    // Explicitly check for failure conditions
    const isFailed = 
      order?.order_status === "EXPIRED" || 
      order?.order_status === "USER_DROPPED" || 
      (payments.length > 0 && payments.every((p: any) => 
        p.payment_status === "FAILED" || 
        p.payment_status === "USER_DROPPED" || 
        p.payment_status === "CANCELLED"
      ));

    if (isFailed && !isPaid) {
       console.log(`[Status Check] returning FAILED for ${orderId}`);
       return new Response(JSON.stringify({ status: "FAILED", _v: "strict-v2" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (!isPaid) {
      // If not paid and not explicitly failed yet (e.g. ACTIVE with no payments or pending), continue processing
      return new Response(JSON.stringify({ status: "PROCESSING", _v: "strict-v2" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: booking } = await supabase
      .from("promptx_bookings")
      .select("payment_status, ticket_sent, email, student_name")
      .eq("order_id", orderId)
      .single();

    if (booking?.payment_status !== "SUCCESS") {
      await supabase.from("promptx_bookings").update({ payment_status: "SUCCESS" }).eq("order_id", orderId);
    }

    if (!booking?.ticket_sent) {
      await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-ticket`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          },
          body: JSON.stringify({
            orderId,
            email: booking.email,
            studentName: booking.student_name,
          }),
        }
      );

      await supabase.from("promptx_bookings").update({ ticket_sent: true }).eq("order_id", orderId);
    }

    return new Response(JSON.stringify({ status: "SUCCESS", _v: "strict-v2" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

  } catch (err) {
    console.error("STATUS ERROR:", err);
    return new Response(JSON.stringify({ status: "PROCESSING", error: err.message }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
