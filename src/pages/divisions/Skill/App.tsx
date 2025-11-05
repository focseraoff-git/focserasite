// @ts-nocheck
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { lmsSupabaseClient } from "../../../lib/ssupabase";

// ✅ Pages
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import SyllabusPage from "./Pages/SyllabusPage";
import NotesPage from "./Pages/NotesPage";
import AssignmentPage from "./Pages/AssignmentPage";
import CodeEditorPage from "./Pages/CodeEditorPage";
import AuthPage from "./Pages/AuthPage";
import CertificatePage from "./Pages/CertificatePage";
import AuthCallback from "./Pages/AuthCallback"; // ✅ New callback page

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

  // ✅ Protected Route Wrapper
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/divisions/skill/auth" replace />;
  };

  // ✅ Auth Route Redirect
  const AuthRoute = ({ element }) => {
    return user ? <Navigate to="/divisions/skill/dashboard" replace /> : element;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Shared Header */}
      <Header
        user={user}
        onLogout={async () => {
          await lmsSupabaseClient.auth.signOut();
          setUser(null);
          navigate("/divisions/skill/auth");
        }}
      />

      {/* Skill Routes */}
      <main className="pt-20">
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/auth" element={<AuthRoute element={<AuthPage supabase={lmsSupabaseClient} />} />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected */}
          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage user={user} supabase={lmsSupabaseClient} />} />} />
          <Route path="/syllabus/:programId" element={<ProtectedRoute element={<SyllabusPage user={user} supabase={lmsSupabaseClient} />} />} />
          <Route path="/notes/:moduleId" element={<ProtectedRoute element={<NotesPage user={user} supabase={lmsSupabaseClient} />} />} />
          <Route path="/assignment/:contentId" element={<ProtectedRoute element={<AssignmentPage user={user} supabase={lmsSupabaseClient} />} />} />
          <Route path="/code/:contentId" element={<ProtectedRoute element={<CodeEditorPage user={user} supabase={lmsSupabaseClient} />} />} />
          <Route path="/certificate/:programName" element={<ProtectedRoute element={<CertificatePage user={user} />} />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
