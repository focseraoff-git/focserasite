// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  CheckCircle,
  Trophy,
  Flame,
  FileText,
  Award,
  Camera,
  Upload,
  X,
  Edit3,
  Rocket,
  PenTool,
  Play,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

/* ===========================================================
   📊 Dashboard Page
=========================================================== */
export default function DashboardPage({ user, supabase = lmsSupabaseClient }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_modules: 0,
    daily_streak: 0,
    badges: [],
    total_score: 0,
  });
  const [recentSubs, setRecentSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const fileInputRef = useRef(null);

  /* ===========================================================
     🔹 Auto Redirect if Admin
  =========================================================== */
  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;
      try {
        const { data } = await supabase
          .from("users")
          .select("role")
          .eq("email", user.email)
          .single();

        if (data?.role === "admin") {
          navigate("/divisions/skill/admin/dashboard");
        }
      } catch (err) {
        console.warn("Error checking admin role:", err.message);
      }
    };
    checkAdminRole();
  }, [user]);

  /* ===========================================================
     🔹 Fetch Programs (always) + User Data (if logged in)
  =========================================================== */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // ✅ Always fetch available programs
        const { data: programsData, error: progErr } = await supabase
          .from("programs")
          .select("id, slug, title, description, created_at")
          .order("created_at", { ascending: true });
        if (progErr) console.error("Error fetching programs:", progErr.message);
        setPrograms(programsData || []);

        // ✅ Fetch profile, stats, and submissions only if logged in
        if (user) {
          const { data: freshProfile } = await supabase
            .from("users")
            .select("full_name, avatar_url, email")
            .eq("id", user.id)
            .single();
          if (freshProfile) {
            setProfile(freshProfile);
            setNewName(freshProfile.full_name || "");
          }

          const { data: statsRes } = await supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();
          if (statsRes) setStats(statsRes);

          const { data: subsRes } = await supabase
            .from("submissions")
            .select("*")
            .eq("user_id", user.id)
            .order("submitted_at", { ascending: false })
            .limit(5);
          setRecentSubs(subsRes || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  /* ===========================================================
     🔹 Avatar Upload
  =========================================================== */
  const handleAvatarChange = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploading(true);
      const ext = file.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${ext}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      const avatarUrl = publicUrlData.publicUrl;

      await supabase.from("users").update({ avatar_url: avatarUrl }).eq("id", user.id);

      const updated = { ...profile, avatar_url: avatarUrl };
      setProfile(updated);
      localStorage.setItem("user_profile", JSON.stringify(updated));
      alert("✅ Avatar updated!");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setUploading(false);
    }
  };

  /* ===========================================================
     🔹 Update Name
  =========================================================== */
  const handleSaveProfile = async () => {
    if (!newName.trim()) return alert("Enter a valid name!");
    try {
      await supabase.from("users").update({ full_name: newName.trim() }).eq("id", user.id);
      const updated = { ...profile, full_name: newName.trim() };
      setProfile(updated);
      localStorage.setItem("user_profile", JSON.stringify(updated));
      setShowModal(false);
      alert("✅ Name updated!");
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  /* ===========================================================
     🔹 Guest View (Before Login)
  =========================================================== */
  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Hero */}
        <section className="relative overflow-hidden text-center py-32 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-24 left-[15%]"
          >
            <Rocket className="w-10 h-10 text-yellow-300 opacity-70" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-24 right-[10%]"
          >
            <PenTool className="w-9 h-9 text-pink-300 opacity-70" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Learn. Create. Grow.</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Master coding, design, and creative skills through 30-day challenges — powered by{" "}
            <strong>Focsera SkillVerse</strong>.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/divisions/skill/auth")}
            className="px-8 py-3 bg-white text-blue-700 rounded-full font-semibold text-lg shadow-md hover:bg-gray-100 transition"
          >
            Start Learning Free →
          </motion.button>
        </section>

        {/* Public Courses */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Available Courses</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading courses...</p>
          ) : programs.length === 0 ? (
            <p className="text-center text-gray-500">Courses will be available soon!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{p.description}</p>
                  <button
                    onClick={() => navigate("/divisions/skill/auth")}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Join Free →
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    );

  /* ===========================================================
     🔹 Dashboard After Login
  =========================================================== */
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg font-semibold">
        Loading your dashboard...
      </div>
    );

  const streak = stats?.daily_streak || 0;
  const badges = stats?.badges?.length || 0;
  const totalScore = stats?.total_score || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center md:items-end justify-between bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12"
        >
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={profile?.avatar_url || "https://i.pravatar.cc/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full shadow-md object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
                title="Change avatar"
              >
                {uploading ? <Upload size={14} className="animate-spin" /> : <Camera size={14} />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                Welcome back,{" "}
                <span className="text-blue-600">{profile?.full_name || "Learner"}</span> 👋
                <button
                  onClick={() => setShowModal(true)}
                  className="p-1 rounded hover:bg-blue-100 text-blue-600 transition"
                >
                  <Edit3 size={18} />
                </button>
              </h1>
              <p className="text-gray-500 text-sm">{profile?.email}</p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-6 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer shadow-md"
            onClick={() => navigate("/divisions/skill/certificate/Java")}
          >
            <Award size={18} /> View Certificates
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={BookOpen} title="Modules Completed" value={stats?.total_modules || 0} color="bg-blue-500" />
          <StatCard icon={Flame} title="Daily Streak" value={streak} color="bg-orange-500" />
          <StatCard icon={Trophy} title="Badges" value={badges} color="bg-yellow-500" />
          <StatCard icon={CheckCircle} title="XP Points" value={`${totalScore} XP`} color="bg-green-500" />
        </div>

        {/* Continue Learning */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Continue Learning</h2>
          {programs.length === 0 ? (
            <p className="text-gray-500 text-sm">No courses available yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <CourseCard
                  key={p.id}
                  title={p.title}
                  desc={p.description}
                  onClick={() => navigate(`/divisions/skill/syllabus/${p.id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-blue-500" /> Recent Submissions
          </h2>
          {recentSubs.length === 0 ? (
            <p className="text-gray-500 text-sm">You haven’t submitted any assignments yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700 border-t border-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left">
                    <th className="p-3">Challenge</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Submitted On</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubs.map((sub) => (
                    <tr key={sub.id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-3 font-medium">{sub.title || "Untitled Task"}</td>
                      <td
                        className={`p-3 font-semibold ${
                          sub.status === "success"
                            ? "text-green-600"
                            : sub.status === "error"
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {sub.status}
                      </td>
                      <td className="p-3">{sub.score ?? "—"}</td>
                      <td className="p-3">
                        {sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Online Compiler */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PenTool className="text-blue-500" /> Try Code Online
          </h2>
          <OnlineCompiler user={user} supabase={supabase} setRecentSubs={setRecentSubs} />
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Name</h3>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                onClick={handleSaveProfile}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===========================================================
   🧠 Online Compiler Component
=========================================================== */
function OnlineCompiler({ user, supabase, setRecentSubs }) {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main(){\n  cout << "Hello World!";\n  return 0;\n}`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const getLanguageId = (lang) => {
    switch (lang) {
      case "cpp": return 54;
      case "c": return 50;
      case "java": return 62;
      case "python": return 71;
      case "javascript": return 63;
      default: return 63;
    }
  };

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");
    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: getLanguageId(language),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "ddad48de98mshcfa84bd23318ed6p1f81e1jsnbc11733943a9",
          },
        }
      );
      const { stdout, stderr, compile_output, time } = res.data;
      const resultOutput =
        stdout ? `${stdout}\n\nExecution Time: ${time}s` : stderr || compile_output || "No output";

      setOutput(resultOutput);

      // Save to Supabase
      if (user) {
        await supabase.from("submissions").insert([
          {
            user_id: user.id,
            title: "Online Code Run",
            language,
            code,
            output: resultOutput,
            status: stderr || compile_output ? "error" : "success",
            execution_time: time || null,
            submitted_at: new Date().toISOString(),
          },
        ]);

        setRecentSubs((prev) => [
          {
            id: Math.random().toString(36),
            title: "Online Code Run",
            status: stderr || compile_output ? "error" : "success",
            score: null,
            submitted_at: new Date().toISOString(),
          },
          ...prev.slice(0, 4),
        ]);
      }
    } catch (err) {
      console.error(err);
      setOutput("⚠️ Error executing code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm"
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <button
          onClick={handleRun}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
          {loading ? "Running..." : "Run Code"}
        </button>
      </div>

      <MonacoEditor
        height="320"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        theme="vs-dark"
        onChange={setCode}
        options={{ fontSize: 14, automaticLayout: true }}
      />

      <div className="bg-gray-900 text-green-400 p-3 text-sm overflow-auto min-h-[120px]">
        <pre>{output}</pre>
      </div>
    </div>
  );
}

/* ===========================================================
   📊 Stats & Course Cards
=========================================================== */
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition"
    >
      <div className={`p-4 rounded-full text-white ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      </div>
    </motion.div>
  );
}

function CourseCard({ title, desc, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-gray-50 p-5 rounded-xl border border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:bg-gray-100 transition"
    >
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{desc}</p>
      <button className="text-blue-600 font-semibold hover:text-blue-800 text-sm">
        View Program →
      </button>
    </motion.div>
  );
}
