// @ts-nocheck
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

// ✅ Admin Pages
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddProgramPage from "./Pages/Admin/AddProgramPage";
import AddChallengePage from "./Pages/Admin/AddChallengePage";

// ✅ Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import FullPageLoader from "./components/FullPageLoader";

export default function SkillApp() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  /* ===========================================================
     🔹 Initialize Authentication and Role
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

        // 🚀 Auto Redirect Admin
        if (userRole === "admin") {
          navigate("/divisions/skill/admin/dashboard", { replace: true });
        }
      }

      setAuthLoading(false);
    };

    // Supabase Auth Listener
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

          if (userRole === "admin") {
            navigate("/divisions/skill/admin/dashboard", { replace: true });
          }
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
     🔒 Protected Route Guards
  =========================================================== */
  const PrivateRoute = ({ element }) => {
    if (!user) return <Navigate to="/divisions/skill/auth" />;
    return element;
  };

  const AdminRoute = ({ element }) => {
    if (!user) return <Navigate to="/divisions/skill/auth" />;
    if (role !== "admin") return <Navigate to="/divisions/skill/dashboard" />;
    return element;
  };

  /* ===========================================================
     🚀 Render Application
  =========================================================== */
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <ScrollToTop />

      {/* Hide header/footer for admin */}
      {role !== "admin" && (
        <Header
          user={user}
          onLogout={async () => {
            await lmsSupabaseClient.auth.signOut();
            setUser(null);
            setRole(null);
            navigate("/divisions/skill/dashboard");
          }}
        />
      )}

      <main className={role !== "admin" ? "pt-20" : ""}>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<HomePage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/auth" element={<AuthPage supabase={lmsSupabaseClient} />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* 👩‍🎓 User Routes */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<DashboardPage user={user} supabase={lmsSupabaseClient} />} />}
          />
          <Route
            path="/syllabus/:programId"
            element={<PrivateRoute element={<SyllabusPage user={user} supabase={lmsSupabaseClient} />} />}
          />
          <Route
            path="/module/:moduleId"
            element={<PrivateRoute element={<ModulePage user={user} supabase={lmsSupabaseClient} />} />}
          />
          <Route
            path="/code/:challengeId"
            element={<PrivateRoute element={<CodeEditorPage user={user} supabase={lmsSupabaseClient} />} />}
          />
          <Route
            path="/assignment/:contentId"
            element={<PrivateRoute element={<AssignmentPage user={user} supabase={lmsSupabaseClient} />} />}
          />
          <Route
            path="/certificate/:programName"
            element={<PrivateRoute element={<CertificatePage user={user} />} />}
          />

          {/* 🧩 Admin Routes */}
          <Route path="/admin" element={<AdminRoute element={<AdminLayout />} />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-program" element={<AddProgramPage />} />
            <Route path="add-challenge" element={<AddChallengePage />} />
          </Route>

          {/* 🚫 Fallback */}
          <Route path="*" element={<HomePage user={user} supabase={lmsSupabaseClient} />} />
        </Routes>
      </main>

      {role !== "admin" && <Footer />}
    </div>
  );
}
