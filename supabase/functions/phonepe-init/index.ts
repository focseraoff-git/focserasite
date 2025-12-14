// supabase/functions/phonepe-init/index.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* -------------------- CORS -------------------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/* -------------------- SUPABASE CLIENT -------------------- */
const supabaseUrl = Deno.env.get("VITE_SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("VITE_SUPABASE_ANON_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/* -------------------- MAIN HANDLER -------------------- */
serve(async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const {
      studentName,
      classLevel,
      parentName,
      mobile,
      email,
      redirectUrl,
    } = await req.json();

    if (!studentName || !mobile || !email || !redirectUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: corsHeaders }
      );
    }

    /* -------------------- PHONEPE CONFIG -------------------- */
    const merchantId = Deno.env.get("PHONEPE_MERCHANT_ID")!;
    const saltKey = Deno.env.get("PHONEPE_SALT_KEY")!;
    const saltIndex = Deno.env.get("PHONEPE_SALT_INDEX")!;
    const env = Deno.env.get("PHONEPE_ENV") || "UAT";

    const merchantTransactionId = `PX_${Date.now()}`;
    const amount = 14900; // ₹149 in paise

    /* -------------------- SAVE BOOKING (PENDING) -------------------- */
    await supabase.from("promptx_bookings").insert({
      student_name: studentName,
      class_level: classLevel,
      parent_name: parentName,
      mobile,
      email,
      amount,
      merchant_transaction_id: merchantTransactionId,
      payment_status: "PENDING",
    });

    /* -------------------- PHONEPE PAYLOAD -------------------- */
    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: mobile,
      amount,
      redirectUrl,
      redirectMode: "REDIRECT",
      callbackUrl: redirectUrl,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64Payload = btoa(JSON.stringify(payload));
    const checksumString = `${base64Payload}/pg/v1/pay${saltKey}`;

    const checksumBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(checksumString)
    );

    const checksum =
      Array.from(new Uint8Array(checksumBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("") +
      "###" +
      saltIndex;

    const phonepeUrl =
      env === "PROD"
        ? "https://api.phonepe.com/apis/hermes/pg/v1/pay"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    /* -------------------- CALL PHONEPE -------------------- */
    const response = await fetch(phonepeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const data = await response.json();

    const redirect =
      data?.data?.instrumentResponse?.redirectInfo?.url;

    if (!redirect) {
      console.error("PhonePe error:", data);
      return new Response(
        JSON.stringify({ error: "PhonePe initiation failed" }),
        { status: 500, headers: corsHeaders }
      );
    }

    /* -------------------- SUCCESS RESPONSE -------------------- */
    return new Response(
      JSON.stringify({ redirectUrl: redirect }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Edge Function Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
