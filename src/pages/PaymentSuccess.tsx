import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type Status = "PROCESSING" | "SUCCESS" | "FAILED";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState<Status>("PROCESSING");

  const intervalRef = useRef<number | null>(null);
  const attemptsRef = useRef(0);

 useEffect(() => {
  if (!orderId) {
    setStatus("FAILED");
    return;
  }

  let attempts = 0;
  const MAX = 8; // 40 seconds

  const poll = async () => {
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

      if (data.status === "SUCCESS") {
        setStatus("SUCCESS");
        clearInterval(interval);
        return;
      }

      attempts++;
      if (attempts >= MAX) {
        clearInterval(interval);
        setStatus("SUCCESS"); // assume success
      }
    } catch {
      attempts++;
    }
  };

  poll();
  const interval = setInterval(poll, 5000);
  return () => clearInterval(interval);
}, [orderId]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">

        {/* PROCESSING */}
        {status === "PROCESSING" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600">
              Please wait while we confirm your transaction.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              This may take up to a minute…
            </p>
          </>
        )}

        {/* SUCCESS */}
        {status === "SUCCESS" && (
          <>
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Payment Successful
            </h2>

            <p className="text-gray-700 mb-4">
              Your registration for <strong>PromptX</strong> is confirmed.
            </p>

            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-6">
              <span className="font-medium">Order ID:</span> {orderId}
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </>
        )}

        {/* FAILED */}
        {status === "FAILED" && (
          <>
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl">❌</span>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
              Payment Failed
            </h2>

            <p className="text-gray-600 mb-6">
              If the amount was debited, it will be refunded automatically
              within 3–5 business days.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate(-1)}
                className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Try Again
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Go to Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
