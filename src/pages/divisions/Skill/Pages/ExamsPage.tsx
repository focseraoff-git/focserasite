// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  ArrowRight,
  Search,
  Terminal,
  Trophy,
  BrainCircuit,
  Cpu,
  Database,
  ShieldCheck,
  Layers,
  FileCode,
  Coffee,
  Hash,
  Laptop,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Target
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

// ----------------------------------------------------------------------
// MOCK DATA FOR MCQ MODULES
// ----------------------------------------------------------------------
const MCQ_TOPICS = [
  { id: "os", title: "Operating Systems", icon: <Cpu />, count: 50, color: "text-blue-500", grad: "from-blue-500/20 to-blue-500/5", border: "group-hover:border-blue-500/50" },
  { id: "sql", title: "SQL & Databases", icon: <Database />, count: 45, color: "text-emerald-500", grad: "from-emerald-500/20 to-emerald-500/5", border: "group-hover:border-emerald-500/50" },
  { id: "java-oops", title: "Java OOPs", icon: <Coffee />, count: 60, color: "text-orange-500", grad: "from-orange-500/20 to-orange-500/5", border: "group-hover:border-orange-500/50" },
  { id: "co", title: "Comp. Organization", icon: <Layers />, count: 30, color: "text-purple-500", grad: "from-purple-500/20 to-purple-500/5", border: "group-hover:border-purple-500/50" },
  { id: "cyber", title: "Cybersecurity", icon: <ShieldCheck />, count: 25, color: "text-red-500", grad: "from-red-500/20 to-red-500/5", border: "group-hover:border-red-500/50" },
  { id: "se", title: "Software Eng.", icon: <Laptop />, count: 40, color: "text-indigo-500", grad: "from-indigo-500/20 to-indigo-500/5", border: "group-hover:border-indigo-500/50" },
  { id: "python", title: "Python Basics", icon: <FileCode />, count: 55, color: "text-yellow-500", grad: "from-yellow-500/20 to-yellow-500/5", border: "group-hover:border-yellow-500/50" },
  { id: "cpp", title: "C++ Fundamentals", icon: <Hash />, count: 50, color: "text-cyan-500", grad: "from-cyan-500/20 to-cyan-500/5", border: "group-hover:border-cyan-500/50" },
  { id: "java", title: "Java Core", icon: <Coffee />, count: 65, color: "text-orange-600", grad: "from-orange-600/20 to-orange-600/5", border: "group-hover:border-orange-600/50" },
];

export default function ExamsPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState({}); // { challengeId: { count: 0, last: null, solved: false } }
  const [totalScore, setTotalScore] = useState(0); // [NEW] User Global Score

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  // UI States
  const [activeTab, setActiveTab] = useState("coding");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [theme, setTheme] = useState(() => localStorage.getItem("focsera_theme") || "dark");

  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("focsera_theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchChallenges();
    fetchUserHistory();
  }, []);

  const fetchUserHistory = async () => {
    try {
      const { data: { user } } = await lmsSupabaseClient.auth.getUser();
      if (!user) return;

      // 2. Fetch History & Calculate Score
      const { data: historyData } = await lmsSupabaseClient
        .from("challenge_history")
        // We need all history to sum points correctly
        // Note: For duplicate valid submissions, we should ideally only count the max score per challenge.
        // But simplified logic: Sum of points_earned (assuming we usually want unique bests? 
        // Or if user claims same challenge twice? claimPoints updates existing row? 
        // claimPoints uses .eq('id', item.id), so it updates that specific attempt. 
        // If a user has 5 attempts for Challenge A, one is passed (100). Sum is 100. Correct.
        // If they have 2 passed attempts? Logic below counts BOTH. 
        // Correct logic: Sum of MAX points per challenge_id.
        .select("challenge_id, status, created_at, points_earned")
        .eq("user_id", user.id);

      if (historyData) {
        const stats = {};

        // Group by challenge to find MAX score per challenge (avoid double counting)
        const bestScores = {};

        historyData.forEach(h => {
          if (!stats[h.challenge_id]) {
            stats[h.challenge_id] = { count: 0, last: null, solved: false };
          }
          stats[h.challenge_id].count += 1;
          const attemptTime = new Date(h.created_at);
          if (!stats[h.challenge_id].last || attemptTime > new Date(stats[h.challenge_id].last)) {
            stats[h.challenge_id].last = h.created_at;
          }

          if (h.status === 'passed' || h.points_earned >= 80) {
            stats[h.challenge_id].solved = true;
          }

          // Track best score for this challenge
          const currentPoints = h.points_earned || 0;
          if (!bestScores[h.challenge_id] || currentPoints > bestScores[h.challenge_id]) {
            bestScores[h.challenge_id] = currentPoints;
          }
        });

        setHistory(stats);

        // Sum up the BEST score from each challenge
        const total = Object.values(bestScores).reduce((a, b) => a + b, 0);
        setTotalScore(total);
      }
    } catch (err) {
      console.error("Error loading history:", err);
    }
  };

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const { data, error } = await lmsSupabaseClient
        .from("code_challenges")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (diff) => {
    const d = (diff || "medium").toLowerCase();
    if (isDark) {
      if (d === "easy") return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      if (d === "hard") return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    }
    if (d === "easy") return "text-emerald-800 bg-emerald-50 border-emerald-200";
    if (d === "hard") return "text-rose-800 bg-rose-50 border-rose-200";
    return "text-amber-800 bg-amber-50 border-amber-200";
  };

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  // THEME CONFIGURATION
  const bgColor = isDark ? "bg-[#020617]" : "bg-[#eff6ff]";
  const textColor = isDark ? "text-blue-50" : "text-blue-950";

  const cardBg = isDark ? "bg-[#0f172a]/60" : "bg-white/80";
  const cardBorder = isDark ? "border-blue-900/30" : "border-blue-100";
  const cardShadow = isDark ? "shadow-none" : "shadow-lg shadow-blue-500/5";

  // Grouping Logic
  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const diff = (c.difficulty || "medium").toLowerCase();
    const matchesDiff = difficultyFilter === "all" || diff === difficultyFilter;
    return matchesSearch && matchesDiff;
  });

  const getGroupedChallenges = () => {
    if (difficultyFilter !== "all") return { [difficultyFilter]: filteredChallenges };

    // Default groups
    const groups = { easy: [], medium: [], hard: [] };
    filteredChallenges.forEach(c => {
      const d = (c.difficulty || "medium").toLowerCase();
      if (groups[d]) groups[d].push(c);
      else groups.medium.push(c); // Fallback
    });
    return groups;
  };

  const grouped = getGroupedChallenges();

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} relative overflow-hidden font-sans transition-colors duration-700 selection:bg-blue-500/30`}>

      {/* Background Ambience */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none ${isDark ? "opacity-10" : "opacity-30"}`} />
      <div className={`absolute top-[-10%] right-[0%] w-[800px] h-[800px] rounded-full blur-[130px] opacity-25 animate-pulse-slow ${isDark ? "bg-blue-800" : "bg-blue-400"}`} />
      <div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-pulse-slow delay-2000 ${isDark ? "bg-indigo-900" : "bg-indigo-300"}`} />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-2xl backdrop-blur-xl border shadow-2xl ${isDark ? "bg-blue-950/30 border-blue-800/30" : "bg-white border-blue-100 ring-4 ring-blue-50"}`}>
                <Terminal size={32} className={`drop-shadow-sm ${isDark ? "text-blue-400" : "text-blue-700"}`} />
              </div>
              <h1 className={`text-6xl font-black tracking-tight leading-none
                  ${isDark
                  ? "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-300 bg-clip-text text-transparent"
                  : "text-[#172554] drop-shadow-sm"}`}>
                Skill Assessment
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-xl max-w-2xl font-medium leading-relaxed ${isDark ? "text-blue-200/60" : "text-blue-900/60"}`}>
              Level up your coding prowess. Tackle real-world problems.
            </motion.div>
          </div>

          <div className="flex gap-5 items-center">
            {/* NEW: Total Score Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className={`px-8 py-5 rounded-3xl border backdrop-blur-xl flex items-center gap-6 ${cardBg} ${cardBorder} ${cardShadow}`}
            >
              <div className={`p-3 rounded-2xl ${isDark ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-700"}`}>
                <Trophy size={28} />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold uppercase tracking-wider opacity-60`}>Total XP</span>
                <span className={`text-4xl font-black tabular-nums tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  {totalScore.toLocaleString()}
                </span>
              </div>

              {/* Divider */}
              <div className={`w-px h-10 ${isDark ? "bg-blue-800" : "bg-blue-100"}`} />

              <div className="text-center group cursor-default">
                <div className={`text-4xl font-black tracking-tighter ${isDark ? "text-blue-50" : "text-blue-950"}`}>{challenges.length}</div>
                <div className={`text-[11px] uppercase tracking-[0.2em] font-bold mt-1 group-hover:text-blue-500 transition-colors ${isDark ? "text-blue-400/60" : "text-blue-900/40"}`}>Coding</div>
              </div>
              <div className={`w-px h-10 ${isDark ? "bg-blue-800" : "bg-blue-100"}`} />
              <div className="text-center group cursor-default">
                <div className={`text-4xl font-black tracking-tighter ${isDark ? "text-blue-50" : "text-blue-950"}`}>{MCQ_TOPICS.length}</div>
                <div className={`text-[11px] uppercase tracking-[0.2em] font-bold mt-1 group-hover:text-purple-500 transition-colors ${isDark ? "text-blue-400/60" : "text-blue-900/40"}`}>Quizzes</div>
              </div>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.95 }} onClick={toggleTheme}
              className={`w-14 h-14 rounded-full flex items-center justify-center border shadow-xl transition-all duration-300
                    ${isDark ? "bg-blue-950 border-blue-800 text-amber-400 hover:bg-blue-900" : "bg-white border-blue-50 text-blue-900 hover:text-blue-600 ring-4 ring-blue-50"}`}
            >
              <Sun size={22} className={`absolute transition-all duration-500 ${isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
              <Moon size={22} className={`absolute transition-all duration-500 ${isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
            </motion.button>
          </div>
        </div>

        {/* CONTROLS */}
        <div className={`sticky top-6 z-40 backdrop-blur-2xl p-2.5 rounded-3xl border mb-12 flex flex-col md:flex-row gap-4 items-center justify-between transition-all duration-500
            ${isDark ? "bg-[#0f172a]/80 border-blue-900/20 shadow-2xl shadow-black/20" : "bg-white/80 border-white shadow-2xl shadow-blue-500/5 ring-1 ring-white/50"}`}>

          <div className={`flex p-1.5 rounded-2xl w-full md:w-auto relative ${isDark ? "bg-[#020617]/50" : "bg-blue-50/50"}`}>
            <button
              onClick={() => setActiveTab("coding")}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-300 
                ${activeTab === "coding" ? (isDark ? "bg-blue-600 text-white shadow-lg" : "bg-white text-blue-700 shadow-md ring-1 ring-blue-100") : (isDark ? "text-blue-400/60 hover:text-blue-200" : "text-blue-900/50 hover:text-blue-900")}`}
            >
              <Code2 size={18} weight="bold" /> Coding
            </button>
            <button
              onClick={() => setActiveTab("mcq")}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-300
                ${activeTab === "mcq" ? (isDark ? "bg-purple-600 text-white shadow-lg" : "bg-white text-purple-700 shadow-md ring-1 ring-purple-50") : (isDark ? "text-blue-400/60 hover:text-blue-200" : "text-blue-900/50 hover:text-blue-900")}`}
            >
              <BrainCircuit size={18} weight="bold" /> MCQs
            </button>
          </div>

          <div className="relative w-full md:w-[450px] group">
            <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isDark ? "text-blue-500" : "text-blue-400"}`} size={20} />
            <input
              type="text"
              placeholder={activeTab === 'coding' ? "Search problems..." : "Search topics..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-5 py-3.5 rounded-2xl border bg-transparent outline-none transition-all font-medium tracking-wide
                ${isDark ? "border-blue-900/30 text-blue-100 focus:border-blue-500/50 placeholder-blue-700" : "border-blue-100 text-blue-950 focus:border-blue-400/50 placeholder-blue-300"}`}
            />
          </div>
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === "coding" && (
            <motion.div
              key="coding"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
            >
              {/* Visual Filter Tabs */}
              <div className="flex gap-4 mb-8 items-center overflow-x-auto pb-2 scrollbar-hide">
                <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-blue-500" : "text-blue-400"}`}>Filter:</span>
                {["all", "easy", "medium", "hard"].map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficultyFilter(level)}
                    className={`px-5 py-2 rounded-lg text-xs font-bold capitalize border transition-all duration-300 whitespace-nowrap
                        ${difficultyFilter === level
                        ? (isDark ? "bg-white text-blue-950 border-white" : "bg-[#1e3a8a] text-white border-[#1e3a8a]")
                        : (isDark ? "bg-transparent text-blue-400 border-blue-900" : "bg-transparent text-blue-400 border-blue-200")}`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              {errorMsg && (
                <div className="bg-red-500/5 text-red-500 p-6 rounded-2xl mb-8 border border-red-500/10 flex items-center gap-4">
                  <ShieldCheck size={24} /> {errorMsg}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map(i => <div key={i} className={`h-72 rounded-3xl animate-pulse ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`} />)}
                </div>
              ) : (
                <div className="flex flex-col gap-16">
                  {/* GROUPED RENDERING */}
                  {["easy", "medium", "hard"].map((level) => {
                    const levelChallenges = grouped[level];
                    if (difficultyFilter !== "all" && difficultyFilter !== level) return null; // Hide if specific filter active
                    if (!levelChallenges || levelChallenges.length === 0) return null;

                    return (
                      <div key={level}>
                        {/* Section Header */}
                        {difficultyFilter === "all" && ( // Only show header if showing all
                          <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-6">
                            <div className={`p-2 rounded-lg ${isDark ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-800"}`}>
                              {level === "easy" && <Sparkles size={18} />}
                              {level === "medium" && <Zap size={18} />}
                              {level === "hard" && <Target size={18} />}
                            </div>
                            <h2 className={`text-2xl font-black capitalize tracking-tight ${isDark ? "text-blue-50" : "text-blue-950"}`}>{level} Challenges</h2>
                            <div className={`h-px flex-1 ${isDark ? "bg-blue-900/50" : "bg-blue-100"}`} />
                          </motion.div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {levelChallenges.map((challenge) => {
                            const stat = history[challenge.id];
                            return (
                              <motion.div
                                layout
                                key={challenge.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6 }}
                                className={`rounded-3xl p-[1px] relative group transition-all duration-500 ${isDark ? "hover:shadow-2xl hover:shadow-blue-900/20" : "hover:shadow-2xl hover:shadow-blue-200/50"}`}
                              >
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-blue-500/30 transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none`} />
                                <div className={`relative h-full rounded-[23px] p-7 flex flex-col backdrop-blur-md transition-all duration-300 ${cardBg} ${cardBorder} border`}>
                                  <div className="flex justify-between items-start mb-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getDifficultyColor(challenge.difficulty)}`}>
                                      {challenge.difficulty || "Medium"}
                                    </span>
                                    <div className="flex gap-2">
                                      {stat?.solved && <div className="bg-green-500/20 text-green-500 p-1 rounded-full"><ShieldCheck size={16} /></div>}
                                      <span className={`w-8 h-8 flex items-center justify-center rounded-full border ${isDark ? "bg-blue-950 border-blue-900 text-blue-400" : "bg-white border-blue-100 text-blue-600"}`}>
                                        <Code2 size={14} />
                                      </span>
                                    </div>
                                  </div>
                                  <div className="mb-4">
                                    <h3 className={`text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors leading-tight ${isDark ? "text-blue-50" : "text-blue-950"}`}>
                                      {challenge.title}
                                    </h3>
                                    <div className={`w-10 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50`} />
                                  </div>
                                  <div className={`text-sm mb-6 leading-7 line-clamp-2 ${isDark ? "text-blue-200/60" : "text-blue-900/60"}`}>
                                    {challenge.description ? challenge.description.replace(/<[^>]*>/g, '') : "Test your skills with this algorithmic challenge."}
                                  </div>

                                  {/* NEW HISTORY SECTION */}
                                  {stat ? (
                                    <div className={`mb-6 p-3 rounded-xl border flex items-center justify-between text-xs font-mono
                                        ${isDark ? "bg-blue-950/40 border-blue-900/50 text-blue-300" : "bg-blue-50 border-blue-100 text-blue-800"}`}>
                                      <div>
                                        <div className="opacity-60 uppercase text-[10px] font-bold">Submissions</div>
                                        <div className="font-bold text-lg">{stat.count}</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="opacity-60 uppercase text-[10px] font-bold">Last Attempt</div>
                                        <div>{new Date(stat.last).toLocaleDateString()}</div>
                                        <div className="opacity-70 text-[10px]">{new Date(stat.last).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className={`mb-6 text-xs italic ${isDark ? "text-blue-500/40" : "text-blue-400"}`}>No submissions yet</div>
                                  )}

                                  <div className={`mt-auto pt-6 border-t flex items-center justify-between ${isDark ? "border-blue-900/30" : "border-blue-50"}`}>
                                    <div className="flex items-center gap-2">
                                      <Trophy size={18} className="text-amber-500 mb-0.5" />
                                      <span className={`font-black text-lg ${isDark ? "text-blue-100" : "text-blue-900"}`}>{challenge.points || 50}</span>
                                    </div>
                                    <div className="flex gap-3">
                                      <button
                                        onClick={() => navigate(`/divisions/skill/history/${challenge.id}`)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors flex items-center gap-2 ${isDark
                                          ? "border-blue-800 text-blue-400 hover:bg-blue-900/50 hover:text-blue-200"
                                          : "border-blue-200 text-blue-600 hover:bg-blue-50"
                                          }`}
                                      >
                                        Submissions
                                        {stat?.count > 0 && <span className="bg-blue-500/20 px-1.5 py-0.5 rounded text-[10px]">{stat.count}</span>}
                                      </button>
                                      {stat?.solved ? (
                                        <button
                                          onClick={() => navigate(`/divisions/skill/code/${challenge.id}?mode=exam`)}
                                          className="px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 cursor-default"
                                        >
                                          <span>Completed</span> <ShieldCheck size={16} />
                                        </button>
                                      ) : (
                                        <button onClick={() => navigate(`/divisions/skill/code/${challenge.id}?mode=exam`)} className={`group/btn px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${isDark ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-[#172554] text-white hover:bg-blue-800"}`}>
                                          <span>Solve</span> <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {filteredChallenges.length === 0 && (
                    <div className={`col-span-full flex flex-col items-center justify-center py-24 rounded-3xl border border-dashed ${isDark ? "border-blue-900/30 text-blue-500/50" : "border-blue-200 text-blue-300"}`}>
                      <div className={`p-4 rounded-full mb-4 ${isDark ? "bg-blue-900/20" : "bg-blue-50"}`}><Search size={32} /></div>
                      <p className="font-semibold text-lg">No challenges found</p>
                      <button onClick={() => { setSearchQuery(""); setDifficultyFilter("all") }} className="mt-2 text-blue-500 font-bold hover:underline text-sm">Clear search filters</button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "mcq" && (
            <motion.div
              key="mcq"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {MCQ_TOPICS.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).map((topic, i) => (
                <motion.div
                  layout
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className={`p-8 rounded-[24px] border backdrop-blur-md cursor-pointer group relative overflow-hidden transition-all duration-300
                        ${isDark ? "bg-[#0f172a]/40 border-blue-900/30 hover:border-blue-500/30" : "bg-white/80 border-white hover:border-blue-200 shadow-xl shadow-blue-900/5"}`}
                  onClick={() => navigate(`/divisions/skill/exam/${topic.id}`)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3
                            ${isDark ? "bg-blue-900/30 text-white" : "bg-white text-blue-950"}`}>
                      <span className={topic.color.replace('text-', 'text-opacity-80 text-')}>{topic.icon}</span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform ${isDark ? "text-blue-50" : "text-blue-950"}`}>{topic.title}</h3>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-6 opacity-60 ${isDark ? "text-blue-300" : "text-blue-800"}`}>{topic.count}+ Questions</p>
                    <div className="flex items-center justify-between pt-4 border-t border-dashed border-current border-opacity-10">
                      <span className={`text-xs font-black uppercase ${topic.color}`}>Start Quiz</span>
                      <div className={`p-2 rounded-full ${isDark ? "bg-white/5" : "bg-blue-50"} group-hover:bg-blue-500 group-hover:text-white transition-colors`}><ArrowRight size={14} /></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div >
  );
}