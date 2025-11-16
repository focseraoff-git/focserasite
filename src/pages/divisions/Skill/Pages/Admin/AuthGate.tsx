// @ts-nocheck
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";

export default function SkillAuthGate({ children }) {
  const [status, setStatus] = useState<"loading" | "admin" | "user" | "none">("loading");

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await lmsSupabaseClient.auth.getSession();
      if (!session) return setStatus("none");

      const { data, error } = await lmsSupabaseClient
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error || !data) return setStatus("user");
      setStatus(data.role === "admin" ? "admin" : "user");
    };

    check();

    const { data: sub } = lmsSupabaseClient.auth.onAuthStateChange(() => check());
    return () => sub?.subscription?.unsubscribe();
  }, []);

  if (status === "loading")
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Checking access…
      </div>
    );

  if (status === "none") return <Navigate to="/divisions/skill/auth" replace />;
  if (status === "user") return <Navigate to="/divisions/skill/dashboard" replace />;

  return children; // ✅ admin content
}
