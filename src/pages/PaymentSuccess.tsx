import { useSearchParams, useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const orderId = params.get("order_id");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-white px-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center overflow-hidden">

        {/* Decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-100 rounded-full blur-3xl opacity-70" />

        {/* Icon */}
        <div className="relative z-10 mx-auto mb-6 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
          <span className="text-3xl">🎟️</span>
        </div>

        {/* Title */}
        <h2 className="relative z-10 text-2xl font-extrabold text-gray-900 mb-2">
          Booking Received
        </h2>

        {/* Message */}
        <p className="relative z-10 text-gray-700 mb-4 leading-relaxed">
          Thank you for registering for <strong>PromptX</strong>.
          <br />
          Your booking has been recorded successfully.
        </p>

        {/* What happens next */}
        <div className="relative z-10 bg-blue-50 rounded-xl p-4 text-sm text-gray-700 mb-6">
          <p className="font-medium mb-1">What happens next?</p>
          <ul className="space-y-1 text-left">
            <li>📧 You will receive your ticket by email</li>
            <li>⏱️ This may take a few minutes</li>
            <li>📁 Please check spam/promotions if needed</li>
          </ul>
        </div>

        {/* Order ID */}
        {orderId && (
          <div className="relative z-10 text-xs text-gray-500 mb-6">
            Order ID:
            <div className="mt-1 font-mono text-gray-700 bg-gray-100 rounded-lg px-3 py-1 inline-block">
              {orderId}
            </div>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => navigate("/")}
          className="relative z-10 w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
