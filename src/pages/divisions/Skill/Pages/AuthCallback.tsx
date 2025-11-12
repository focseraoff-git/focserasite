// @ts-nocheck
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SkillAuthCallback() {
  // ✅ Dynamic base URLs (works on localhost and focsera.in)
  const baseUrl = window.location.origin;
  const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;
  const adminUrl = `${baseUrl}/divisions/skill/admin/dashboard`;
  const authUrl = `${baseUrl}/divisions/skill/auth`;

  useEffect(() => {
    const processLogin = async () => {
      try {
        // ✅ Wait for Supabase to hydrate session
        const { data: sessionData, error } = await lmsSupabaseClient.auth.getSession();
        if (error) throw error;

        const user = sessionData?.session?.user;
        if (!user) {
          console.warn("No user found, redirecting to Auth page");
          window.location.replace(`${authUrl}?error=session_not_found`);
          return;
        }

        // ✅ Get user's role from your Supabase 'users' table
        const { data: userRecord, error: userErr } = await lmsSupabaseClient
          .from("users")
          .select("role")
          .eq("email", user.email)
          .maybeSingle();

        if (userErr) console.error("Role fetch error:", userErr.message);

        const role = userRecord?.role || "user";

        // ✅ Redirect based on role
        if (role === "admin") {
          window.location.replace(adminUrl);
        } else {
          window.location.replace(dashboardUrl);
        }
      } catch (err) {
        console.error("Auth callback error:", err.message);
        window.location.replace(`${authUrl}?error=auth_failed`);
      }
    };

    processLogin();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
      <p className="text-gray-600 text-sm">Finalizing login... Please wait.</p>
    </div>
  );
}
