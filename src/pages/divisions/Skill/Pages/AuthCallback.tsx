// @ts-nocheck
import { useEffect } from "react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // ✅ Exchange token and store session
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) throw new Error(error.message);

        if (data?.session) {
          console.log("✅ Logged in as:", data.session.user.email);

          // ✅ Clean up the URL immediately (before redirect)
          window.history.replaceState({}, document.title, "/divisions/skill/dashboard");

          // Small delay ensures Supabase fully stores the session
          setTimeout(() => {
            window.location.replace("/divisions/skill/dashboard");
          }, 300);
        } else {
          console.warn("⚠️ No session found after URL exchange");
          await lmsSupabaseClient.auth.signOut();
          window.location.replace("/divisions/skill/auth");
        }
      } catch (err) {
        console.error("❌ Auth callback error:", err.message);
        await lmsSupabaseClient.auth.signOut();
        window.location.replace("/divisions/skill/auth");
      }
    };

    handleAuthCallback();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
      <div className="text-center">
        <h1 className="text-xl font-semibold mb-2">Completing sign-in...</h1>
        <p className="text-sm text-gray-500">
          Please wait while we secure your session.
        </p>
      </div>
    </div>
  );
}
