// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  CheckCircle,
  Trophy,
  Flame,
  Award,
  Camera,
  Upload,
  Edit3,
  Rocket,
  PenTool,
  Play,
  Loader2,
  BrainCircuit,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import AIAssistant from "../Pages/AIAssistant";

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
  const hasNavigated = useRef(false);

  /* ===========================================================
     🔹 Role Check (NO redirect to /auth)
  =========================================================== */
  useEffect(() => {
    const checkRole = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const currentUser = sessionData?.session?.user || null;
        if (!currentUser) return; // guest handled below

        const { data: dbUser } = await supabase
          .from("users")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        // ✅ Optional: redirect admin users only once
        if (dbUser?.role === "admin" && !hasNavigated.current) {
          hasNavigated.current = true;
          navigate("/divisions/skill/admin/dashboard");
        }
      } catch (err) {
        console.warn("Auth role check failed:", err.message);
      }
    };
    checkRole();
  }, [navigate, supabase]);

  /* ===========================================================
     🔹 Fetch Programs + Profile Data
  =========================================================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch programs (public)
        const { data: allPrograms, error: progErr } = await supabase
          .from("programs")
          .select("id, slug, title, description, created_at")
          .order("created_at", { ascending: true });
        if (progErr) console.error("Program fetch error:", progErr.message);
        setPrograms(allPrograms || []);

        // Fetch user-specific data if logged in
        if (user) {
          const { data: profile } = await supabase
            .from("users")
            .select("full_name, avatar_url, email")
            .eq("id", user.id)
            .single();

          if (profile) {
            setProfile(profile);
            setNewName(profile.full_name || "");
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

    fetchData();
  }, [user, supabase]);

  /* ===========================================================
     🔹 Avatar Upload + Name Edit
  =========================================================== */
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const ext = file.name.split(".").pop();
      const path = `avatars/${user.id}_${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);

      await supabase
        .from("users")
        .update({ avatar_url: publicUrl.publicUrl })
        .eq("id", user.id);

      setProfile({ ...profile, avatar_url: publicUrl.publicUrl });
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!newName.trim()) return alert("Enter a valid name");
    await supabase.from("users").update({ full_name: newName }).eq("id", user.id);
    setProfile({ ...profile, full_name: newName });
    setShowModal(false);
  };

  /* ===========================================================
     🔹 Guest View (Before Login)
  =========================================================== */
  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
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
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Learn. Create. Grow.
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
            Master coding, design, and creative skills through{" "}
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
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Explore Our Courses
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading courses...</p>
          ) : programs.length === 0 ? (
            <p className="text-center text-gray-500">
              Courses will be available soon!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {p.title}
                  </h3>
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
          className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-lg border p-8 mb-12"
        >
          <div className="flex items-center gap-5">
            <div className="relative group">
              <img
                src={profile?.avatar_url || "https://i.pravatar.cc/100"}
                className="w-24 h-24 rounded-full object-cover shadow-md"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
              >
                {uploading ? (
                  <Upload size={14} className="animate-spin" />
                ) : (
                  <Camera size={14} />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                Welcome,{" "}
                <span className="text-blue-600">{profile?.full_name}</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="p-1 hover:bg-blue-100 rounded"
                >
                  <Edit3 size={18} />
                </button>
              </h1>
              <p className="text-gray-500">{profile?.email}</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-6 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer"
            onClick={() => navigate("/divisions/skill/certificate/Java")}
          >
            <Award size={18} /> View Certificates
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={BookOpen} title="Modules Completed" value={stats.total_modules} color="bg-blue-500" />
          <StatCard icon={Flame} title="Daily Streak" value={streak} color="bg-orange-500" />
          <StatCard icon={Trophy} title="Badges" value={badges} color="bg-yellow-500" />
          <StatCard icon={CheckCircle} title="XP Points" value={`${totalScore} XP`} color="bg-green-500" />
        </div>

        {/* Online Compiler */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PenTool className="text-blue-500" /> Online Code Editor
          </h2>
          <OnlineCompiler user={user} supabase={supabase} setRecentSubs={setRecentSubs} />
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   🧠 Online Compiler
=========================================================== */
function OnlineCompiler({ user, supabase, setRecentSubs }) {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`#include <iostream>\nusing namespace std;\nint main(){\n  cout << "Hello World!";\n  return 0;\n}`);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const getLanguageId = (lang) =>
    ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

  const runCode = async () => {
    setLoading(true);
    setOutput("⏳ Running code...");
    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        { source_code: code, language_id: getLanguageId(language) },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
          },
        }
      );
      const { stdout, stderr, compile_output, time } = res.data;
      const result =
        stdout ? `${stdout}\n\nExecution Time: ${time}s` : stderr || compile_output || "⚠️ No output";
      setOutput(result);
    } catch {
      setOutput("❌ Error executing code.");
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

        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            {loading ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={() => document.querySelector("#ai_explain").click()}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg"
          >
            <Lightbulb size={16} /> Explain
          </button>
          <button
            onClick={() => document.querySelector("#ai_fix").click()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
          >
            <BrainCircuit size={16} /> Fix
          </button>
        </div>
      </div>

      <Editor
        height="320px"
        language={language === "cpp" ? "cpp" : language}
        theme="vs-dark"
        value={code}
        onChange={(v) => setCode(v || "")}
        options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
      />

      <div className="bg-black text-green-400 p-3 text-sm overflow-auto min-h-[120px] font-mono">
        <pre>{output}</pre>
      </div>

      <button id="ai_explain" className="hidden" onClick={() => window.askAI("Explain my code", code)} />
      <button id="ai_fix" className="hidden" onClick={() => window.askAI("Fix errors in my code", code)} />
      <AIAssistant getCode={() => code} />
    </div>
  );
}

/* ===========================================================
   📊 Stat Card
=========================================================== */
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
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
