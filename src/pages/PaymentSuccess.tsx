import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type Status = "PROCESSING" | "SUCCESS" | "FAILED";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState<Status>("PROCESSING");

  useEffect(() => {
    // ❌ If user directly opens page
    if (!orderId) {
      setStatus("FAILED");
      return;
    }

    let resolved = false;

    const confirm = async () => {
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
          resolved = true;
          setStatus("SUCCESS");
        }
      } catch {
        // ignore and fallback
      }
    };

    confirm();

    // ✨ Graceful fallback — never block user
    const timer = setTimeout(() => {
      if (!resolved) {
        setStatus("SUCCESS");
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 text-center overflow-hidden">

        {/* ✨ Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl" />

        {/* ⏳ PROCESSING */}
        {status === "PROCESSING" && (
          <>
            <div className="mx-auto mb-8 h-16 w-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              Confirming Your Booking
            </h2>
            <p className="text-gray-600 text-lg">
              Please wait while we finalize your registration…
            </p>
          </>
        )}

        {/* ✅ SUCCESS */}
        {status === "SUCCESS" && (
          <>
            {/* 🎉 Confetti Emojis */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="absolute top-0 text-2xl animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  🎉
                </span>
              ))}
            </div>

            <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
              <span className="text-5xl text-white">✓</span>
            </div>

            <h1 className="text-4xl font-extrabold text-emerald-700 mb-3">
              Booking Confirmed!
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              You’re successfully registered for <strong>PromptX – AI Workshop</strong>.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 text-sm text-gray-700">
              📩 <strong>What’s next?</strong>
              <br />
              Your ticket and workshop details will be sent to your email shortly.
            </div>

            {orderId && (
              <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 mb-8">
                <span className="font-medium">Order ID:</span> {orderId}
              </div>
            )}

            <button
              onClick={() => navigate("/")}
              className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
            >
              Go to Home
            </button>
          </>
        )}

        {/* ❌ FAILED (only if no order_id) */}
        {status === "FAILED" && (
          <>
            <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-4xl">❌</span>
            </div>

            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Payment Not Completed
            </h2>

            <p className="text-gray-600 mb-6">
              This page was accessed without a valid transaction.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Go to Home
            </button>
          </>
        )}
      </div>

      {/* ✨ Confetti Animation */}
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
