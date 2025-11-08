// @ts-nocheck
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { lmsSupabaseClient } from "../../../lib/ssupabase";
import ScrollToTop from "./components/ScrollToTop";

// ✅ User Pages
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import SyllabusPage from "./Pages/SyllabusPage";
import ModulePage from "./Pages/ModulePage";
import CodeEditorPage from "./Pages/CodeEditorPage";
import AuthPage from "./Pages/AuthPage";
import CertificatePage from "./Pages/CertificatePage";
import AuthCallback from "./Pages/AuthCallback";
import AssignmentPage from "./Pages/AssignmentPage";
import OnlineCompilerPage from "./Pages/OnlineCompilerPage.";

// ✅ Admin Pages
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddProgramPage from "./Pages/Admin/AddProgramPage";
import AddChallengePage from "./Pages/Admin/AddChallengePage";
import AdminEditPage from "./Pages/Admin/AdminEditPage";

// ✅ Shared
import Header from "./components/Header";
import Footer from "./components/Footer";
import FullPageLoader from "./components/FullPageLoader";

export default function SkillApp() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  /* ===========================================================
     🔹 Initialize Authentication (Optional)
  =========================================================== */
  useEffect(() => {
    const initAuth = async () => {
      const { data } = await lmsSupabaseClient.auth.getSession();
      const sessionUser = data?.session?.user || null;
      setUser(sessionUser);

      if (sessionUser) {
        const { data: profile } = await lmsSupabaseClient
          .from("users")
          .select("role")
          .eq("email", sessionUser.email)
          .single();

        const userRole = profile?.role || "user";
        setRole(userRole);
        localStorage.setItem("user_role", userRole);
      }

      setAuthLoading(false);
    };

    const { data: listener } = lmsSupabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        const newUser = session?.user || null;
        setUser(newUser);

        if (newUser) {
          const { data: profile } = await lmsSupabaseClient
            .from("users")
            .select("role")
            .eq("email", newUser.email)
            .single();

          const userRole = profile?.role || "user";
          setRole(userRole);
          localStorage.setItem("user_role", userRole);
        } else {
          setRole(null);
          localStorage.removeItem("user_role");
        }
      }
    );

    initAuth();
    return () => listener?.subscription.unsubscribe();
  }, []);

  if (authLoading) return <FullPageLoader />;

  /* ===========================================================
     🚀 Render
  =========================================================== */
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <ScrollToTop />

      {role !== "admin" && (
        <Header
          user={user}
          onLogout={async () => {
            await lmsSupabaseClient.auth.signOut();
            navigate("/divisions/skill/auth");
          }}
        />
      )}

      <main className={role !== "admin" ? "pt-20" : ""}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* User */}
          <Route path="/dashboard" element={<DashboardPage user={user} />} />
          <Route path="/syllabus/:programId" element={<SyllabusPage />} />
          <Route path="/module/:moduleId" element={<ModulePage />} />
          <Route path="/code/:challengeId" element={<CodeEditorPage />} />
          <Route path="/assignment/:contentId" element={<AssignmentPage />} />
          <Route path="/certificate/:programName" element={<CertificatePage />} />
          <Route path="/online-compiler" element={<OnlineCompilerPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-program" element={<AddProgramPage />} />
            <Route path="add-challenge" element={<AddChallengePage />} />
            <Route path="edit/:table/:id" element={<AdminEditPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {role !== "admin" && <Footer />}
    </div>
  );
}
