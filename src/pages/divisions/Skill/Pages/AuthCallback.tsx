// @ts-nocheck
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import { Loader2 } from "lucide-react";

export default function SkillAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });
        if (error) throw error;

        // 🧭 Detect correct environment safely
        const currentUrl = window.location.href;
        const isLocal =
          currentUrl.includes("localhost") ||
          currentUrl.includes("127.0.0.1") ||
          window.location.origin.includes("localhost");

        const dashboardUrl = isLocal
          ? "http://localhost:5173/divisions/skill/dashboard"
          : "https://www.focsera.in/divisions/skill/dashboard";

        const authUrl = isLocal
          ? "http://localhost:5173/divisions/skill/auth"
          : "https://www.focsera.in/divisions/skill/auth";

        if (data?.session) {
          // ✅ Session exists → redirect to dashboard
          window.location.replace(dashboardUrl);
        } else {
          // 🚫 No session → go back to login
          window.location.replace(authUrl);
        }
      } catch (err) {
        console.error("⚠️ Auth callback error:", err);

        const isLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        const fallbackUrl = isLocal
          ? "http://localhost:5173/divisions/skill/auth"
          : "https://www.focsera.in/divisions/skill/auth";

        window.location.replace(fallbackUrl);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-700">
      <div className="bg-white px-8 py-6 rounded-2xl shadow-md border border-blue-100 flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <h1 className="text-lg font-semibold">Completing sign-in...</h1>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we redirect you to your Skill Dashboard.
        </p>
      </div>
    </div>
  );
}
