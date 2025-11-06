// @ts-nocheck
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { lmsSupabaseClient } from "../../../lib/ssupabase";
import ScrollToTop from "./components/ScrollToTop";

// ✅ Pages
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import SyllabusPage from "./Pages/SyllabusPage";
import ModulePage from "./Pages/ModulePage";
import CodeEditorPage from "./Pages/CodeEditorPage";
import AuthPage from "./Pages/AuthPage";
import CertificatePage from "./Pages/CertificatePage";
import AuthCallback from "./Pages/AuthCallback";
import AssignmentPage from "./Pages/AssignmentPage";

// ✅ Layout components
import Header from "./components/Header";
import Footer from "./components/Footer";
import FullPageLoader from "./components/FullPageLoader";

export default function SkillApp() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Manage Supabase Auth state
  useEffect(() => {
    const initAuth = async () => {
      const { data } = await lmsSupabaseClient.auth.getSession();
      setUser(data?.session?.user || null);
      setAuthLoading(false);
    };

    // Realtime listener (login/logout)
    const { data: listener } = lmsSupabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);
      }
    );

    initAuth();
    return () => listener?.subscription.unsubscribe();
  }, []);

  if (authLoading) return <FullPageLoader />;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* ✅ ScrollToTop ensures you always start at top on route change */}
      <ScrollToTop />

      {/* Shared Header */}
      <Header
        user={user}
        onLogout={async () => {
          await lmsSupabaseClient.auth.signOut();
          setUser(null);
          navigate("/divisions/skill/dashboard");
        }}
      />

      {/* Skill Routes */}
      <main className="pt-20">
        <Routes>
          {/* Public */}
          <Route
            path="/"
            element={<HomePage user={user} supabase={lmsSupabaseClient} />}
          />
          <Route
            path="/auth"
            element={<AuthPage supabase={lmsSupabaseClient} />}
          />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Core Pages */}
          <Route
            path="/dashboard"
            element={<DashboardPage user={user} supabase={lmsSupabaseClient} />}
          />

          {/* Learning Flow */}
          <Route
            path="/syllabus/:programId"
            element={<SyllabusPage user={user} supabase={lmsSupabaseClient} />}
          />

          <Route
            path="/module/:moduleId"
            element={<ModulePage user={user} supabase={lmsSupabaseClient} />}
          />
          <Route
            path="/code/:challengeId"
            element={<CodeEditorPage user={user} supabase={lmsSupabaseClient} />}
          />

          {/* Optional: Direct assignment route */}
          <Route
            path="/assignment/:contentId"
            element={<AssignmentPage user={user} supabase={lmsSupabaseClient} />}
          />

          {/* Certificates */}
          <Route
            path="/certificate/:programName"
            element={<CertificatePage user={user} />}
          />

          {/* Catch-all redirect */}
          <Route
            path="*"
            element={<HomePage user={user} supabase={lmsSupabaseClient} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
