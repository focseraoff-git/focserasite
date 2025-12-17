import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Status = "PROCESSING" | "SUCCESS" | "FAILED";

// --- Components ---
const TiltableCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const rotateX = (y / height) * -2; // Subtle tilt
    const rotateY = (x / width) * 2;
    cardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.005)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`transition-transform duration-500 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const StatusIcon = ({ status }: { status: Status }) => {
  if (status === "PROCESSING") {
    return (
      <div className="relative mx-auto h-24 w-24">
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-emerald-500/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (status === "SUCCESS") {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)]"
      >
        <svg
          className="h-10 w-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-400 to-red-500 shadow-[0_10px_40px_-10px_rgba(244,63,94,0.5)]"
    >
      <svg
        className="h-10 w-10 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.div>
  );
};

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");
  const [status, setStatus] = useState<Status>("PROCESSING");

  useEffect(() => {
    // 1. Immediate Failure Check from URL Params
    const urlStatus = params.get("order_status");
    if (
      urlStatus === "FAILED" ||
      urlStatus === "USER_DROPPED" ||
      urlStatus === "CANCELLED" ||
      urlStatus === "TXN_FAILED"
    ) {
      setStatus("FAILED");
      return;
    }

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
        } else if (data.status === "FAILED") {
          resolved = true;
          setStatus("FAILED");
        }
      } catch {
        // network error
      }
    };

    let attempts = 0;
    const interval = setInterval(() => {
      if (resolved) {
        clearInterval(interval);
        return;
      }
      if (attempts >= 5) {
        clearInterval(interval);
        if (!resolved) setStatus("FAILED");
        return;
      }
      verify();
      attempts++;
    }, 2000);

    verify();

    return () => clearInterval(interval);
  }, [orderId, params]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans text-gray-900 selection:bg-emerald-100">

      {/* --- Background Effects (Matches PromptX) --- */}
      <style>{`
        .grid-background {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(100% 100% at center, white, transparent);
        }
        .aurora-blob {
          position: absolute; filter: blur(100px); opacity: 0.25; z-index: 0;
          animation: blob-float 20s infinite ease-in-out;
        }
        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
      `}</style>

      <div className="grid-background" />
      <div className="aurora-blob bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-200" />
      <div className="aurora-blob top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-teal-100 animation-delay-2000" />

      {/* --- Main Content --- */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <TiltableCard key={status} className="w-full max-w-lg">
            <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 px-8 py-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] backdrop-blur-xl md:px-12 md:py-14">

              {/* Top Accent Line */}
              <div
                className={`absolute left-0 right-0 top-0 h-1.5 w-full bg-gradient-to-r ${status === "SUCCESS"
                    ? "from-emerald-400 via-teal-500 to-emerald-400"
                    : status === "FAILED"
                      ? "from-rose-400 via-red-500 to-rose-400"
                      : "from-gray-300 via-gray-400 to-gray-300"
                  }`}
              />

              <div className="mb-10 text-center">
                <StatusIcon status={status} />
              </div>

              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl"
                >
                  {status === "SUCCESS"
                    ? "Payment Successful"
                    : status === "FAILED"
                      ? "Payment Failed"
                      : "Verifying Payment"}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 text-lg leading-relaxed text-gray-600"
                >
                  {status === "SUCCESS" && (
                    <>
                      You've successfully secured your spot for <br className="hidden md:block" />
                      <strong className="text-emerald-700">PromptX – AI Workshop</strong>.
                    </>
                  )}
                  {status === "FAILED" && (
                    <>
                      We couldn't verify your transaction. <br />
                      Please try again or contact support.
                    </>
                  )}
                  {status === "PROCESSING" && (
                    <>Please wait a moment while we securely <br /> confirm your transaction details.</>
                  )}
                </motion.p>
              </div>

              {/* Success Info Box */}
              {status === "SUCCESS" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 text-left"
                >
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-emerald-800">
                    Next Steps
                  </h3>
                  <p className="text-[15px] leading-relaxed text-emerald-900/80">
                    A confirmation email with your ticket and workshop details has been sent to your registered address.
                  </p>
                </motion.div>
              )}

              {/* Order ID & Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                {orderId && (
                  <div className="rounded-full bg-gray-50 px-4 py-1.5 text-xs font-medium text-gray-400">
                    Order ID: <span className="font-mono text-gray-600">{orderId}</span>
                  </div>
                )}

                <button
                  onClick={() => navigate("/")}
                  className={`group relative w-full overflow-hidden rounded-full py-4 text-center font-bold text-white shadow-lg transition-transform active:scale-[0.98] ${status === "SUCCESS"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/25 hover:shadow-emerald-500/40"
                      : status === "FAILED"
                        ? "bg-gray-900 hover:bg-black"
                        : "cursor-not-allowed bg-gray-300"
                    }`}
                  disabled={status === "PROCESSING"}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "FAILED" ? "Return to Home" : "Return to Home"}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </span>
                </button>

                <p className="text-xs text-gray-400">
                  Questions? <a href="mailto:support@focsera.in" className="font-medium text-gray-600 hover:text-emerald-600 underline decoration-gray-300 underline-offset-2">support@focsera.in</a>
                </p>
              </motion.div>

            </div>
          </TiltableCard>
        </AnimatePresence>
      </div>
    </div>
  );
}
