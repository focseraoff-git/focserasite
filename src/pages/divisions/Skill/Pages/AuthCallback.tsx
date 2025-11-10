// @ts-nocheck
import { useEffect } from "react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import { Loader2 } from "lucide-react";

export default function SkillAuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("🔄 Processing Supabase OAuth callback...");

        // Generate and verify state parameter to prevent CSRF
        const urlParams = new URLSearchParams(window.location.hash.substring(1));
        const stateParam = urlParams.get("state");
        const storedState = sessionStorage.getItem("oauth_state");
        
        if (!stateParam || !storedState || stateParam !== storedState) {
          throw new Error("Invalid state parameter - possible CSRF attack");
        }

        // Clear state after verification
        sessionStorage.removeItem("oauth_state");

        // Supabase will parse the access token from URL hash automatically
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("❌ Supabase auth error:", error);
          throw error;
        }

        // ✅ Determine environment and build URLs
        const baseUrl = window.location.origin;
        const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;
        const authUrl = `${baseUrl}/divisions/skill/auth`;

        // ✅ Verify session and handle redirect
        if (data?.session) {
          // Store refresh token securely
          if (data.session.refresh_token) {
            sessionStorage.setItem("skill_refresh_token", data.session.refresh_token);
          }

          console.log("✅ Session established:", data.session.user?.email);
          
          // Clean URL hash before redirect
          window.location.hash = "";
          window.location.replace(dashboardUrl);
        } else {
          console.warn("⚠️ No session found. Redirecting to login...");
          window.location.replace(authUrl);
        }
      } catch (err) {
        console.error("⚠️ Auth callback failed:", err);

        // Clear any sensitive data on error
        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("skill_refresh_token");

        const baseUrl = window.location.origin;
        const fallbackUrl = `${baseUrl}/divisions/skill/auth`;

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
