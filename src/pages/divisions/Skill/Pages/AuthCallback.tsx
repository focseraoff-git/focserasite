// @ts-nocheck
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SkillAuthCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hash.get("access_token");
        const refreshToken = hash.get("refresh_token");

        if (accessToken) {
          const { error } = await lmsSupabaseClient.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
          window.location.replace("/divisions/skill/dashboard");
          return;
        }

        const { data } = await lmsSupabaseClient.auth.getSession();
        if (data?.session) {
          window.location.replace("/divisions/skill/dashboard");
          return;
        }

        window.location.replace("/divisions/skill/auth?error=no_session");
      } catch (err) {
        console.error("OAuth callback error:", err);
        window.location.replace(
          `/divisions/skill/auth?error=${encodeURIComponent(err.message)}`
        );
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600 mt-3">Completing sign-in...</p>
    </div>
  );
}
