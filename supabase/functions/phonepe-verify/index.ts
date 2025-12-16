import { serve } from "https://deno.land/std/http/server.ts";
import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

serve(async (req) => {
  const body = await req.json();

  const path = `/pg/v1/status/${Deno.env.get("PHONEPE_MERCHANT_ID")}/${body.merchantTransactionId}`;
  const checksum =
    crypto.createHash("sha256")
      .update(path + Deno.env.get("PHONEPE_SALT_KEY"))
      .digest("hex") + "###1";

  const verifyRes = await fetch(
    `https://api.phonepe.com/apis/hermes${path}`,
    {
      headers: {
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": Deno.env.get("PHONEPE_MERCHANT_ID")
      }
    }
  );

  const verifyData = await verifyRes.json();

  const supabase = createClient(
    Deno.env.get("VITE_SUPABASE_URL")!,
    Deno.env.get("VITE_SUPABASE_ANON_KEY")!
  );

  await supabase
    .from("promptx_bookings")
    .update({
      payment_status: verifyData.data.state === "COMPLETED" ? "SUCCESS" : "FAILED",
      phonepe_txn_id: verifyData.data.transactionId
    })
    .eq("phonepe_merchant_txn_id", body.merchantTransactionId);

  return new Response("OK");
});
