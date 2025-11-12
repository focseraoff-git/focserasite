// AuthCallback (Simplified and Corrected)
// @ts-nocheck
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SkillAuthCallback() {
  const dashboardUrl = "/divisions/skill/dashboard";
  const authUrl = "/divisions/skill/auth";

  useEffect(() => {
    // The Supabase SDK automatically processes tokens on page load.
    // We just need to listen for the resulting state change.

    const { data: { subscription } } = lmsSupabaseClient.auth.onAuthStateChange(
      (event, session) => {
        // If the session is successfully established, redirect to the dashboard.
        if (session) {
         window.location.replace("/divisions/skill/dashboard");

        } else if (event === 'SIGNED_OUT' || event === 'AUTH_ERROR') {
          // If the auth process results in an error, redirect back to the sign-in page.
          window.location.replace("/divisions/skill/dashboard");

        }
      }
    );

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <p className="text-gray-600 mt-3">Completing sign-in...</p>
    </div>
  );
}