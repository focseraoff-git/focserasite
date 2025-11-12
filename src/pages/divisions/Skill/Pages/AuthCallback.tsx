// @ts-nocheck
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SkillAuthCallback() {
  const baseUrl = window.location.origin;
  const dashboardUrl = `${baseUrl}/divisions/skill/dashboard`;
  const adminUrl = `${baseUrl}/divisions/skill/admin/dashboard`;
  const authUrl = `${baseUrl}/divisions/skill/auth`;

  useEffect(() => {
    const processLogin = async () => {
      try {
        // ✅ 1. Wait for Supabase to hydrate the session
        const { data: sessionData, error } = await lmsSupabaseClient.auth.getSession();
        if (error) throw error;

        const user = sessionData?.session?.user;
        if (!user) {
          console.warn("⚠️ No session found, redirecting to auth...");
          window.location.replace(`${authUrl}?error=session_not_found`);
          return;
        }

        // ✅ 2. Check if user exists in your 'users' table
        const { data: existingUser, error: fetchError } = await lmsSupabaseClient
          .from("users")
          .select("id, role")
          .eq("email", user.email)
          .maybeSingle();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("❌ User fetch error:", fetchError.message);
        }

        let userRole = existingUser?.role || "user";

        // ✅ 3. Auto-insert new user if not exists
        if (!existingUser) {
          const { error: insertError } = await lmsSupabaseClient.from("users").insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email.split("@")[0],
              avatar_url: user.user_metadata?.avatar_url || null,
              role: "user",
            },
          ]);
          if (insertError) console.error("❌ Insert user error:", insertError.message);
        }

        // ✅ 4. If admin, redirect to admin dashboard
        if (userRole === "admin") {
          window.location.replace(adminUrl);
        } else {
          window.location.replace(dashboardUrl);
        }
      } catch (err) {
        console.error("❌ Auth callback error:", err.message);
        window.location.replace(`${authUrl}?error=auth_failed`);
      }
    };

    processLogin();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-gray-800">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-3" />
      <p className="text-sm text-gray-600">Verifying your account...</p>
    </div>
  );
}
