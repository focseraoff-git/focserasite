import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState<"PROCESSING" | "SUCCESS" | "FAILED">(
    "PROCESSING"
  );

  useEffect(() => {
    if (!orderId) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cashfree-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ orderId }),
          }
        );

        const data = await res.json();
        setStatus(data.status);
      } catch {
        setStatus("FAILED");
      }
    };

    checkStatus();
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      {status === "PROCESSING" && <h2>Checking payment status...</h2>}
      {status === "SUCCESS" && <h2>✅ Payment Successful!</h2>}
      {status === "FAILED" && <h2>❌ Payment Failed</h2>}
    </div>
  );
}
