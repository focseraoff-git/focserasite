// @ts-nocheck
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await lmsSupabaseClient.auth.getSessionFromUrl({
          storeSession: true,
        });

        if (error) throw error;

        if (data?.session) {
          // ✅ Redirect to dashboard
          window.location.href = "/divisions/skill/dashboard";
        } else {
          navigate("/divisions/skill/auth", { replace: true });
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        navigate("/divisions/skill/auth", { replace: true });
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-700">
      <h1 className="text-xl font-semibold">Completing sign-in...</h1>
    </div>
  );
}
