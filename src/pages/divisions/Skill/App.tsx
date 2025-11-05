// @ts-nocheck
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { lmsSupabaseClient } from "../../../lib/ssupabase";

// ✅ Correct import casing (Pages with capital P)
// ✅ Correct (notice capital P)
import HomePage from "./Pages/HomePage";
import DashboardPage from "./Pages/DashboardPage";
import SyllabusPage from "./Pages/SyllabusPage";
import NotesPage from "./Pages/NotesPage";
import AssignmentPage from "./Pages/AssignmentPage";
import CodeEditorPage from "./Pages/CodeEditorPage";
import AuthPage from "./Pages/AuthPage";
import CertificatePage from "./Pages/CertificatePage";

// ✅ Correct components
import Header from "./components/Header";
import Footer from "./components/Footer";
import FullPageLoader from "./components/FullPageLoader";


export default function SkillApp() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 🔹 Listen to Supabase Auth changes
  useEffect(() => {
    const { data: listener } = lmsSupabaseClient.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);
        setAuthLoading(false);
      }
    );

    // Fetch current session on mount
    lmsSupabaseClient.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setAuthLoading(false);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (authLoading) return <FullPageLoader />;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Shared Header */}
      <Header
        user={user}
        onLogout={async () => {
          await lmsSupabaseClient.auth.signOut();
          setUser(null);
        }}
      />

      {/* Skill Routes */}
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/dashboard" element={<DashboardPage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/syllabus/:programId" element={<SyllabusPage user={user} supabase={lmsSupabaseClient} />} />
          {/* ✅ Fixed param name */}
          <Route path="/notes/:moduleId" element={<NotesPage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/assignment/:contentId" element={<AssignmentPage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/code/:contentId" element={<CodeEditorPage user={user} supabase={lmsSupabaseClient} />} />
          <Route path="/auth" element={<AuthPage supabase={lmsSupabaseClient} />} />
          <Route path="/certificate/:programName" element={<CertificatePage user={user} />} />
        </Routes>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  );
}
