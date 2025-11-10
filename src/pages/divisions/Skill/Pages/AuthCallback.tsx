// @ts-nocheck
import { useEffect } from "react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function AuthCallback() {
  useEffect(() => {
    const handleAuth = async () => {
      try {
        // ✅ If Supabase needs to parse tokens from URL hash (e.g., #access_token)
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) {
          console.error("Error storing session:", error);
          // Try manually refreshing the session
          const session = await lmsSupabaseClient.auth.getSession();
          if (session?.data?.session) {
            window.location.replace("/divisions/skill/dashboard");
            return;
          }
          throw error;
        }

        if (data?.session) {
          // ✅ Success! Session stored, now redirect to dashboard
          window.location.replace("/divisions/skill/dashboard");
        } else {
          // ❌ No session → fallback to login
          window.location.replace("/divisions/skill/auth");
        }
      } catch (err) {
        console.error("AuthCallback failed:", err);
        window.location.replace("/divisions/skill/auth");
      }
    };

    handleAuth();
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
