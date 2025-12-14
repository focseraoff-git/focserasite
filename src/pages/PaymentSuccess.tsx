import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type Status = "PROCESSING" | "SUCCESS" | "FAILED";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState<Status>("PROCESSING");
  const attemptsRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!orderId) {
      setStatus("FAILED");
      return;
    }

    const MAX_ATTEMPTS = 9; // ~45 seconds

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
          clearInterval(intervalRef.current!);
          return;
        }

        if (data.status === "FAILED") {
          setStatus("FAILED");
          clearInterval(intervalRef.current!);
          return;
        }

        // still processing
        setStatus("PROCESSING");
      } catch {
        // ignore temporary errors
        setStatus("PROCESSING");
      }

      attemptsRef.current++;

      if (attemptsRef.current >= MAX_ATTEMPTS) {
        clearInterval(intervalRef.current!);
        setStatus("FAILED"); // ⛔ HARD STOP
      }
    };

    poll(); // run immediately
    intervalRef.current = window.setInterval(poll, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 overflow-hidden">
      {/* CONFETTI */}
      {status === "SUCCESS" && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="absolute top-0 text-xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              🎉
            </span>
          ))}
        </div>
      )}

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center z-10">
        {/* PROCESSING */}
        {status === "PROCESSING" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verifying Payment
            </h2>
            <p className="text-gray-600 mb-2">
              Please wait while we confirm your transaction.
            </p>
            <p className="text-sm text-gray-500">
              This usually takes a few seconds…
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

            <p className="text-gray-700 mb-3">
              Your registration for <strong>PromptX</strong> is confirmed.
            </p>

            {orderId && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-6">
                <span className="font-medium">Order ID:</span> {orderId}
              </div>
            )}

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

      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
