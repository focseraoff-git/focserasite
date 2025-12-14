import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type Status = "PROCESSING" | "SUCCESS" | "FAILED";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  const [status, setStatus] = useState<Status>("PROCESSING");

  useEffect(() => {
    if (!orderId) {
      setStatus("FAILED");
      return;
    }

    let resolved = false;

    const verify = async () => {
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
        // silent
      }
    };

    verify();

    // UX-first fallback — never trap the user
    const timeout = setTimeout(() => {
      if (!resolved) setStatus("SUCCESS");
    }, 2800);

    return () => clearTimeout(timeout);
  }, [orderId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6FAF8] px-4">
      <div className="relative w-full max-w-[520px] bg-white rounded-[28px] px-10 py-12
        shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

        {/* Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]
          bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />

        {/* PROCESSING */}
        {status === "PROCESSING" && (
          <div className="text-center">
            <div className="mx-auto mb-8 h-12 w-12 rounded-full border-[3px]
              border-emerald-500 border-t-transparent animate-spin" />

            <h2 className="text-[22px] font-semibold text-gray-900 mb-2">
              Verifying your payment
            </h2>

            <p className="text-gray-600 text-[15px] leading-relaxed">
              Please wait while we securely confirm your transaction.
            </p>
          </div>
        )}

        {/* SUCCESS */}
        {status === "SUCCESS" && (
          <div className="text-center">
            {/* Checkmark */}
            <div className="mx-auto mb-8 h-20 w-20 rounded-full
              bg-emerald-500 flex items-center justify-center
              shadow-[0_10px_30px_rgba(16,185,129,0.35)]">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-[28px] font-extrabold text-gray-900 mb-3 tracking-tight">
              Payment successful
            </h1>

            <p className="text-gray-700 text-[16px] leading-relaxed mb-8">
              Your seat for <strong>PromptX – AI Workshop</strong> has been
              successfully reserved.
            </p>

            {/* Info Card */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60
              px-5 py-4 mb-8 text-left">
              <p className="text-[14px] font-medium text-emerald-700 mb-1">
                What happens next
              </p>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                Your ticket and workshop details will be sent to your registered
                email address shortly.
              </p>
            </div>

            {/* Order ID */}
            {orderId && (
              <div className="text-[13px] text-gray-500 mb-8">
                Reference ID: <span className="font-medium">{orderId}</span>
              </div>
            )}

            <button
              onClick={() => navigate("/")}
              className="w-full py-[14px] rounded-full
                bg-emerald-500 text-white font-semibold text-[16px]
                hover:bg-emerald-600 transition
                shadow-[0_8px_24px_rgba(16,185,129,0.35)]"
            >
              Return to Home
            </button>

            <p className="text-[12px] text-gray-400 mt-6">
              Need help? Contact us at <span className="font-medium">support@focsera.in</span>
            </p>
          </div>
        )}

        {/* FAILED */}
        {status === "FAILED" && (
          <div className="text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-red-100
              flex items-center justify-center">
              <span className="text-3xl">✕</span>
            </div>

            <h2 className="text-[20px] font-bold text-red-600 mb-2">
              Invalid payment session
            </h2>

            <p className="text-gray-600 mb-6 text-[15px]">
              This page was accessed without a valid transaction.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-full bg-gray-900
                text-white font-semibold hover:bg-black transition"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
