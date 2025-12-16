// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { lmsSupabaseClient } from "../../../lib/ssupabase";
import ScrollToTop from "./components/ScrollToTop";
import SkillAuthGate from "./Pages/Admin/AuthGate";

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
import OnlineCompilerPage from "./Pages/OnlineCompilerPage";
import ExamsPage from "./Pages/ExamsPage";
import ExamEnvironmentPage from "./Pages/ExamEnvironmentPage";
import SubmissionHistoryPage from "./Pages/SubmissionHistoryPage"; // 👈 NEW IMPORT

// ✅ Admin Pages
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddProgramPage from "./Pages/Admin/AddProgramPage";
import AddChallengePage from "./Pages/Admin/AddChallengePage";
import AdminEditPage from "./Pages/Admin/AdminEditPage";

// ✅ Shared
import Header from "./components/Header";
import Footer from "./components/Footer";

/* ============================================================
   🧠 Error Boundary
============================================================ */
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  return error ? (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="mb-4">{error?.message || "Unknown error occurred."}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Refresh Page
      </button>
    </div>
  ) : (
    <ErrorBoundaryHandler setError={setError}>{children}</ErrorBoundaryHandler>
  );
}

class ErrorBoundaryHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error) {
    this.props.setError(error);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/* ============================================================
   🚀 Main SkillApp (Recommended Final Version)
============================================================ */
export default function SkillApp() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // 🧠 Keep user + role synced
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
          .maybeSingle();
        const userRole = profile?.role || "user";
        setRole(userRole);
        localStorage.setItem("user_role", userRole);
      }
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
            .maybeSingle();
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

  /* ============================================================
      ⚙️ Routes
  ============================================================ */
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 font-inter">
        <ScrollToTop />

        {/* Hide Header/Footer on admin routes */}
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
            {/* 🔹 Public Routes */}
            <Route path="/" element={<HomePage user={user} />} />
            {/* 🆕 History Route */}
            <Route path="/history/:challengeId" element={<SubmissionHistoryPage />} />

            <Route path="auth" element={<AuthPage />} />
            <Route path="auth/callback" element={<AuthCallback />} />


            {/* 🔹 User Routes */}
            <Route path="dashboard" element={<DashboardPage user={user} />} />
            <Route path="syllabus/:programId" element={<SyllabusPage />} />
            <Route path="module/:moduleId" element={<ModulePage />} />
            <Route path="code/:challengeId" element={<CodeEditorPage user={user} />} />
            <Route path="assignment/:contentId" element={<AssignmentPage />} />
            <Route path="certificate/:programName" element={<CertificatePage />} />
            <Route path="online-compiler" element={<OnlineCompilerPage />} />

            <Route path="exams" element={<ExamsPage />} />

            {/* 👈 2. THIS IS THE MISSING ROUTE THAT FIXES THE REDIRECT */}
            <Route path="exam/:examId" element={<ExamEnvironmentPage />} />


            {/* 🔹 Admin Routes (Protected with SkillAuthGate) */}
            <Route
              path="admin/*"
              element={
                <SkillAuthGate>
                  <AdminLayout />
                </SkillAuthGate>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="add-program" element={<AddProgramPage />} />
              <Route path="add-challenge" element={<AddChallengePage />} />
              <Route path="edit/:table/:id" element={<AdminEditPage />} />
            </Route>

            {/* 🔹 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {role !== "admin" && <Footer />}
      </div>
    </ErrorBoundary>
  );
}
