import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      studentName,
      classLevel,
      parentName,
      mobile,
      email,
      notes,
      redirectUrl,
    } = await req.json();

    if (!studentName || !mobile || !email) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const orderId = `PX_${Date.now()}`;
    const amount = 149; // INR

    // 🔹 Save booking as PENDING
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await supabase.from("promptx_bookings").insert({
      student_name: studentName,
      class_level: classLevel,
      parent_name: parentName,
      mobile,
      email,
      notes,
      amount,
      order_id: orderId,
      payment_status: "PENDING",
    });

    // 🔹 Create Cashfree Order
    const cfRes = await fetch(
      "https://api.cashfree.com/pg/orders",
      {
        method: "POST",
        headers: {
          "x-client-id": Deno.env.get("CASHFREE_APP_ID")!,
          "x-client-secret": Deno.env.get("CASHFREE_SECRET_KEY")!,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: {
            customer_id: mobile,
            customer_phone: mobile,
            customer_email: email,
          },
          order_meta: {
            return_url: `${redirectUrl}?order_id=${orderId}`,
          },
        }),
      }
    );

    const data = await cfRes.json();

    if (!data?.payment_session_id) {
      console.error(data);
      throw new Error("Cashfree order creation failed");
    }

    return new Response(
      JSON.stringify({ paymentSessionId: data.payment_session_id }),
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
