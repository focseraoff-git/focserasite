// @ts-nocheck
import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Trophy,
  Flame,
  FileText,
  Code2,
  Award,
  Rocket,
  Laptop,
  PenTool,
  Camera,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function DashboardPage({ user, supabase = lmsSupabaseClient }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentSubs, setRecentSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const { data: programsData } = await supabase
          .from("programs")
          .select("*")
          .order("created_at", { ascending: true });

        setPrograms(programsData || []);

        if (user) {
          const [statsRes, subsRes] = await Promise.all([
            supabase
              .from("user_stats")
              .select("*")
              .eq("user_id", user.id)
              .single(),
            supabase
              .from("submissions")
              .select("*, content(title)")
              .eq("user_id", user.id)
              .order("submitted_at", { ascending: false })
              .limit(5),
          ]);

          if (!statsRes.error) setStats(statsRes.data);
          if (!subsRes.error) setRecentSubs(subsRes.data || []);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user, supabase]);

  /* ===================================================
     🧭 PUBLIC (NOT LOGGED IN) DASHBOARD LANDING PAGE
     =================================================== */
  if (!user)
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden text-center py-32 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          {/* Floating Icons */}
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
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
            className="absolute top-[40%] left-[5%]"
          >
            <Camera className="w-9 h-9 text-blue-200 opacity-60" />
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            Learn. Create. Grow.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-100 max-w-2xl mx-auto mb-10"
          >
            Master coding, design, and creative skills through 30-day
            interactive programs — powered by Focsera Skill.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/divisions/skill/auth")}
            className="px-8 py-3 bg-white text-blue-700 rounded-full font-semibold text-lg shadow-md hover:bg-gray-100 transition"
          >
            Start Learning Free →
          </motion.button>
        </section>

        {/* FEATURED COURSES */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-white"
        >
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-10">
              Explore Our 30-Day Skill Challenges
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((p) => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate("/divisions/skill/auth")}
                    className="bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all p-6 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {p.description}
                    </p>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 mx-auto">
                      Join Challenge <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* WHY JOIN SECTION */}
        <section className="bg-gray-50 py-20 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-12"
            >
              Why Join Focsera Skill?
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10">
              <Benefit
                icon={Code2}
                title="Real Coding Practice"
                desc="Run code in browser and get instant feedback on challenges."
              />
              <Benefit
                icon={BookOpen}
                title="Structured Learning Path"
                desc="Follow guided 30-day lessons designed for students & beginners."
              />
              <Benefit
                icon={Award}
                title="Earn Verified Certificates"
                desc="Get recognized for every completed course with shareable proof."
              />
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-20 text-center bg-white border-t border-gray-200"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of learners upgrading their skills every day.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/divisions/skill/auth")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
          >
            Join Now →
          </motion.button>
        </motion.section>
      </div>
    );

  /* ===================================================
     ✅ LOGGED-IN DASHBOARD (same as before)
     =================================================== */
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
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user.email?.split("@")[0]} 👋
        </h1>
        <p className="text-gray-600 mb-10">
          Track your progress and continue your learning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={BookOpen}
            title="Modules Completed"
            value={stats?.total_modules || 0}
            color="bg-blue-500"
          />
          <StatCard
            icon={Flame}
            title="Daily Streak"
            value={`${streak}`}
            color="bg-orange-500"
          />
          <StatCard icon={Trophy} title="Badges" value={badges} color="bg-yellow-500" />
          <StatCard
            icon={CheckCircle}
            title="XP Points"
            value={`${totalScore} XP`}
            color="bg-green-500"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Continue Learning
          </h2>
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
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-blue-500" /> Recent Submissions
          </h2>
          {recentSubs.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You haven’t submitted any assignments yet.
            </p>
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
                      <td className="p-3 font-medium">
                        {sub.content?.title || "Untitled Task"}
                      </td>
                      <td
                        className={`p-3 font-semibold ${
                          sub.status === "passed"
                            ? "text-green-600"
                            : sub.status === "failed"
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {sub.status}
                      </td>
                      <td className="p-3">{sub.score}</td>
                      <td className="p-3">
                        {new Date(sub.submitted_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* === Small Components === */
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
      whileHover={{ y: -5, scale: 1.02 }}
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

function Benefit({ icon: Icon, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center"
    >
      <div className="p-4 rounded-full bg-blue-100 text-blue-600 mb-3">
        <Icon size={28} />
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm max-w-xs">{desc}</p>
    </motion.div>
  );
}
