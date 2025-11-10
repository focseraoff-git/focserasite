// @ts-nocheck
import { useEffect } from "react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function AuthCallback() {
  useEffect(() => {
    const finalizeLogin = async () => {
      try {
        // ✅ Exchange the access_token from URL hash for a session
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("Error saving session:", error);
          window.location.replace("/divisions/skill/auth");
          return;
        }

        if (data?.session) {
          // ✅ Clean the URL (remove #access_token) and redirect to dashboard
          window.history.replaceState({}, document.title, "/divisions/skill/dashboard");
          window.location.replace("/divisions/skill/dashboard");
        } else {
          // ❌ No session — redirect to login
          window.location.replace("/divisions/skill/auth");
        }
      } catch (err) {
        console.error("Auth callback failed:", err);
        window.location.replace("/divisions/skill/auth");
      }
    };

    finalizeLogin();
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
