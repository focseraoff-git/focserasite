// @ts-nocheck
import { useEffect } from "react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // ✅ Exchange the access token from the URL for a Supabase session
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("Auth exchange error:", error.message);
          window.location.replace("/divisions/skill/auth");
          return;
        }

        if (data?.session) {
          console.log("✅ Session stored successfully:", data.session.user.email);

          // ✅ Clean up the URL (remove access_token hash)
          window.history.replaceState({}, document.title, "/divisions/skill/dashboard");

          // ✅ Redirect to the dashboard
          window.location.replace("/divisions/skill/dashboard");
        } else {
          console.warn("⚠️ No session found after exchange");
          window.location.replace("/divisions/skill/auth");
        }
      } catch (err) {
        console.error("Callback error:", err);
        window.location.replace("/divisions/skill/auth");
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Completing sign-in...</h1>
        <p className="text-sm text-gray-500">Please wait while we secure your session.</p>
      </div>
    </div>
  );
}
