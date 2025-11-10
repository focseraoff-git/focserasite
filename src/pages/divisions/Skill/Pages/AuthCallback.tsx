// @ts-nocheck
import { useEffect } from "react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import { Loader2 } from "lucide-react";

export default function SkillAuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("🔄 Processing Supabase OAuth callback...");

        // Supabase will parse the access token from URL hash automatically
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("❌ Supabase auth error:", error);
          throw error;
        }

        // ✅ Determine environment
        const currentHost = window.location.hostname;
        const isLocal = currentHost === "localhost" || currentHost === "127.0.0.1";

        // ✅ Correct dashboard URLs
        const dashboardUrl = isLocal
          ? "http://localhost:5173/divisions/skill/dashboard"
          : "https://www.focsera.in/divisions/skill/dashboard";

        const authUrl = isLocal
          ? "http://localhost:5173/divisions/skill/auth"
          : "https://www.focsera.in/divisions/skill/auth";

        // ✅ Redirect based on session presence
        if (data?.session) {
          console.log("✅ Session established:", data.session.user?.email);
          window.location.replace(dashboardUrl);
        } else {
          console.warn("⚠️ No session found. Redirecting to login...");
          window.location.replace(authUrl);
        }
      } catch (err) {
        console.error("⚠️ Auth callback failed:", err);

        // Fallback redirect if anything fails
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-700">
      <div className="bg-white px-8 py-6 rounded-2xl shadow-md border border-blue-100 flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <h1 className="text-lg font-semibold">Completing sign-in...</h1>
        <p className="text-sm text-gray-500 mt-1 text-center max-w-sm">
          Please wait while we securely connect your FOCSERA Skill Portal account.
        </p>
      </div>
    </div>
  );
}
