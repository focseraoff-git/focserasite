// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  CheckCircle,
  Trophy,
  Flame,
  Award,
  Camera,
  Edit3,
  Activity,
  Star,
  Layers,
  Zap,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

/* ============================================================
  LandingVariant (BEFORE LOGIN) — content kept functionally same
  — small motion added but layout preserved
  ============================================================ */
function LandingVariant({ navigate, programs, loading }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white relative overflow-hidden">
      <section className="text-center pt-40 md:pt-48 pb-24 relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Learn. Create. Grow.
        </motion.h1>

        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
          Learn coding, editing, design & filmmaking with
          <span className="text-yellow-300 font-bold"> Focsera SkillVerse</span>.
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={() => navigate("/divisions/skill/auth")}
          className="px-12 py-4 bg-white text-blue-700 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition"
        >
          Start Learning Free →
        </motion.button>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-12">Explore Courses</h2>

        {loading ? (
          <p className="text-center text-gray-200 text-lg">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {programs?.map((p) => {
              const muted = p.role === true || String(p.role) === "true";
              return (
                <motion.div
                  key={p.id}
                  whileHover={muted ? {} : { scale: 1.03 }}
                  className={`relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl ${muted ? 'filter grayscale opacity-70' : ''}`}
                >
                  {muted && (
                    <div className="absolute top-3 right-3 bg-yellow-300 text-slate-900 text-xs px-2 py-1 rounded-md font-semibold">
                      Coming Soon
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-gray-200 text-sm mb-6">{p.description}</p>

                  {muted ? (
                    <button
                      disabled
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                      title="This program is coming soon"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/divisions/skill/auth")}
                      className="text-yellow-300 font-semibold text-lg hover:text-white"
                    >
                      Join Free →
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* ============================================================
  DashboardPage (AFTER LOGIN) — A2 scaling applied
  - Larger profile card
  - Bigger stat cards
  - Taller progress bar
  - Larger activity & programs blocks
  ============================================================ */
export default function DashboardPage({ user, supabase = lmsSupabaseClient }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_modules: 0,
    daily_streak: 0,
    badges: [], // <-- This is related to Bug #2
    total_score: 0,
    level: 1,
    progress_percentage: 0,
    programs_enrolled: 0,
    challenges_solved: 0,
    recent_modules: [],
    recent_challenges: [],
    recent_badges: [],
  });

  /* ---------------- fetch programs always (before + after login) ---------------- */
  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const { data } = await supabase
          .from("programs")
          .select("id,title,slug,description,is_locked")
          .order("created_at", { ascending: true });
        setPrograms(data || []);
      } catch (err) {
        console.error("Programs fetch error:", err);
      }
    };
    loadPrograms();
  }, [supabase]);

  /* ---------------- fetch user-specific data ---------------- */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        if (user) {
          // profile
          const { data: profileData } = await supabase
            .from("users")
            .select("full_name,avatar_url,email")
            .eq("id", user.id)
            .single();
          setProfile(profileData || { full_name: user.email?.split?.("@")?.[0] || "Learner", email: user.email });

          // user stats
          const { data: userStats } = await supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          // recent activity
          const [modsRes, chRes, badgesRes] = await Promise.all([
            supabase
              .from("completed_modules")
              .select("title,completed_at")
              .eq("user_id", user.id)
              .order("completed_at", { ascending: false })
              .limit(8),
            supabase
              .from("challenge_history")
              .select("title,score,created_at")
              .eq("user_id", user.id)
              .order("created_at", { ascending: false })
              .limit(8),
            
            // =================================================================
            // START OF FIX #1: The '400 Bad Request' Error
            // =================================================================
            //
            // The query you've written here is SYNTACTICALLY CORRECT.
            // If it still fails with a '400 Bad Request', the problem is 
            // a MISMATCH between this code and your database schema.
            //
            // YOU MUST CHECK YOUR SUPABASE DASHBOARD:
            // 1. Is the table (or view) name *exactly* `badge_history`?
            //    (The schema image you sent shows a table named `badges`)
            //
            // 2. Does `badge_history` have a column *exactly* named `name`?
            //
            // 3. Does `badge_history` have a column *exactly* named `earned_at`?
            //    (Your `ActivityCard` needs this!)
            //
            // 4. Does `badge_history` have a column *exactly* named `user_id`?
            //
            // The error means the server doesn't understand your request, 
            // almost always because the table or column names are wrong.
            // The schema image you provided only shows a `badges` table 
            // with `id` and `name`, which would not work with this query.
            //
            supabase
              .from("badge_history") 
              .select("name,earned_at") 
              .eq("user_id", user.id) 
              .order("earned_at", { ascending: false })
              .limit(8),
            //
            // =================================================================
            // END OF FIX #1
            // =================================================================
          ]);

          const recentModules = modsRes?.data || [];
          const recentChallenges = chRes?.data || [];
          const recentBadges = badgesRes?.data || [];

          // compute level/progress (simple example)
          const xp = (userStats?.total_score ?? 0);
          const level = Math.floor(Math.sqrt(xp / 100)) + 1;
          const progress_percentage = Math.min(100, Math.round(((xp - (level - 1) * (level - 1) * 100) / (level * 100)) * 100)) || 0;

          setStats((prev) => ({
            ...prev,
            ...userStats,
            // =================================================================
            // START OF FIX #2: "Badges Earned" Stat is 0
            // =================================================================
            //
            // The `...userStats` spread *tries* to set the `badges` array,
            // but your `user_stats` table (based on the schema) does not 
            // have a `badges` column.
            //
            // This means `stats.badges` is always the default empty `[]`.
            //
            // A simple fix is to query for the *count* of badges.
            // You would need to add a new query in `fetchAll` like:
            //
            // const { count, error } = await supabase
            //   .from("badge_history")
            //   .select('*', { count: 'exact', head: true })
            //   .eq("user_id", user.id);
            //
            // And then set it here:
            // badges_count: count, // (You'd need to add `badges_count: 0` to useState)
            //
            // And change the NeoStat to use `value={stats.badges_count ?? 0}`.
            //
            // For now, `stats.badges` will remain `[]` as per your code.
            //
            // =================================================================
            // END OF FIX #2
            // =================================================================
            total_score: xp,
            level,
            progress_percentage,
            recent_modules: recentModules,
            recent_challenges: recentChallenges,
            recent_badges: recentBadges,
            programs_enrolled: userStats?.programs_enrolled ?? 0,
            challenges_solved: userStats?.challenges_solved ?? 0,
            daily_streak: userStats?.daily_streak ?? 0,
          }));
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase]);

  /* ---------------- avatar upload ---------------- */
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    try {
      setLoading(true);
      const ext = file.name.split(".").pop();
      const path = `avatars/${user.id}_${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (error) throw error;
      const { data } = await supabase.storage.from("avatars").getPublicUrl(path);
      await supabase.from("users").update({ avatar_url: data.publicUrl }).eq("id", user.id);
      setProfile((p) => ({ ...p, avatar_url: data.publicUrl }));
    } catch (err) {
      console.error("Avatar upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- show landing if no user ---------------- */
  if (!user) return <LandingVariant navigate={navigate} programs={programs} loading={loading} />;

  /* ---------------- final render ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef4ff] via-[#f8fbff] to-[#f3f6ff] pt-24 pb-20 relative overflow-x-hidden">
      {/* decorative blobs (soft) */}
      <div className="absolute -left-36 -top-24 w-[420px] h-[420px] bg-gradient-to-br from-blue-200 to-indigo-300 opacity-30 rounded-full filter blur-3xl transform rotate-12" />
      <div className="absolute right-[-80px] bottom-[-60px] w-[420px] h-[420px] bg-gradient-to-br from-purple-200 to-blue-200 opacity-28 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        {/* profile header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative bg-[rgba(255,255,255,0.86)] backdrop-blur-md rounded-2xl p-8 shadow-neu mb-10 border border-white/60"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-white to-slate-100 shadow-inner flex items-center justify-center overflow-hidden">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
                        <User className="w-10 h-10 text-slate-400" />
                      </div>
                    )}
                </div>

                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute -right-2 -bottom-2 bg-blue-600 p-3 rounded-full text-white shadow-md border border-white/30"
                  title="Upload avatar"
                >
                  <Camera size={16} />
                </button>

                <input ref={fileInputRef} type="file" className="hidden" onChange={handleAvatarChange} />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{profile?.full_name || "Learner"}</h2>
                  <button className="text-slate-500 hover:bg-slate-100 p-1 rounded-md"><Edit3 size={18} /></button>
                </div>
                <p className="text-sm md:text-base text-slate-500 mt-1">{profile?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/divisions/skill/certificate/Java")}
                className="px-4 py-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white font-semibold shadow"
              >
                <Award size={16} className="inline mr-2" /> Certificates
              </button>

              <div className="text-right">
                <p className="text-xs text-slate-500">Level</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <CircularXP value={stats.progress_percentage || 0} label={stats.level || 1} />
                  </div>
                  <div>
                    <p className="text-sm md:text-base font-semibold text-slate-700">{(stats.total_score ?? 0) + " XP"}</p>
                    <p className="text-xs md:text-sm text-slate-500">Streak: <span className="font-medium text-slate-700">{stats.daily_streak ?? 0}d</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* stats row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <NeoStat icon={BookOpen} title="Modules Completed" value={stats.total_modules ?? 0} gradient="from-blue-400 to-blue-600" />
          <NeoStat icon={Flame} title="Daily Streak" value={stats.daily_streak ?? 0} gradient="from-orange-400 to-orange-500" />
          
          {/* This is Bug #2. This will show 0 because `stats.badges` is an empty array that never gets populated. */}
          <NeoStat icon={Trophy} title="Badges Earned" value={(stats.badges || []).length ?? 0} gradient="from-yellow-400 to-yellow-600" />
          
          <NeoStat icon={CheckCircle} title="XP Points" value={(stats.total_score ?? 0) + " XP"} gradient="from-green-400 to-green-600" />
        </div>

        {/* mid + programs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <motion.div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-neu border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Overall Progress</h3>
                <div className="text-sm md:text-base text-slate-600 font-medium">{stats.progress_percentage ?? 0}%</div>
              </div>

              <div className="w-full bg-white/20 rounded-full h-6 md:h-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.max(0, stats.progress_percentage || 0))}%` }}
                  transition={{ duration: 0.9 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                />
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/60 border border-white/40 shadow-inner">
                  <p className="text-xs md:text-sm text-slate-600">Programs Enrolled</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-800">{stats.programs_enrolled ?? 0}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/60 border border-white/40 shadow-inner">
                  <p className="text-xs md:text-sm text-slate-600">Challenges Solved</p>
                  <p className="text-2xl md:text-3xl font-bold text-slate-800">{stats.challenges_solved ?? 0}</p>
                </div>
              </div>
            </motion.div>
          </div>
{/* Active Programs Section */}
<motion.div className="bg-white shadow-md rounded-2xl p-6 md:p-8 border border-gray-100">
  <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4">
    Active Programs
  </h3>

  {programs?.length ? (
    <div className="space-y-4 max-h-64 overflow-auto pr-2">
      {[...programs]
        // ✅ Unlocked programs first, locked later
        .sort((a, b) =>
          a.is_locked === b.is_locked ? 0 : a.is_locked ? 1 : -1
        )
        .slice(0, 6)
        .map((p) => {
          const isLocked =
            p.is_locked === true || String(p.is_locked) === "true";

          return (
            <div
              key={p.id}
              className={`relative flex items-center justify-between gap-4 p-4 md:p-5 rounded-xl border border-gray-100 bg-white transition-all ${
                isLocked
                  ? "filter grayscale opacity-60"
                  : "hover:shadow-lg hover:border-blue-200"
              }`}
            >
              {/* 🟡 "Coming Soon" label for locked programs */}
              {isLocked && (
                <div className="absolute top-2 right-3 bg-yellow-300 text-slate-900 text-[10px] md:text-xs px-2 py-1 rounded-md font-semibold shadow-sm">
                  Coming Soon
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold text-slate-800">
                  {p.title}
                </p>
                <p className="text-xs md:text-sm text-slate-500 line-clamp-1">
                  {p.description}
                </p>
              </div>

              {/* 🟢 Open or Disabled Buttons */}
              {!isLocked ? (
                <button
                  onClick={() => navigate(`/divisions/skill/syllabus/${p.slug}`)}
                  className="text-xs md:text-sm bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition"
                >
                  Open
                </button>
              ) : (
                <button
                  disabled
                  className="text-xs md:text-sm bg-gray-200 text-gray-600 px-4 py-2 rounded-md cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          );
        })}
    </div>
  ) : (
    <p className="text-sm md:text-base text-slate-500">
      No active programs yet. Join a program to see progress here.
    </p>
  )}
</motion.div>

        </div>

        {/* recent activity header */}
        <div className="mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800">Recent Activity</h3>
        </div>

        {/* recent activity cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ActivityCard title="Completed Modules" items={stats.recent_modules} empty="No recent modules." accent="blue" />
          <ActivityCard title="Code Challenges" items={stats.recent_challenges} empty="No recent challenges." accent="purple" />
          
          {/* This card relies on `stats.recent_badges` which comes from the failing query */}
          <ActivityCard title="Achievements" items={stats.recent_badges} empty="No achievements yet." accent="yellow" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
  Helper components (scaled A2)
  ============================================================ */

function NeoStat({ icon: Icon, title, value, gradient = "from-blue-400 to-blue-600" }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 shadow-neu">
      <div className="flex items-center gap-4">
        <div className={`p-4 md:p-5 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-sm`}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-sm md:text-base text-slate-600">{title}</p>
          <p className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

function CircularXP({ value = 0, label = 1 }) {
  const safe = Math.min(100, Math.max(0, value));
  const size = 64; // larger for A2
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safe / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2},${size / 2})`}>
        <circle r={radius} cx="0" cy="0" stroke="rgba(255,255,255,0.6)" strokeWidth={stroke} fill="none" />
        <circle
          r={radius}
          cx="0"
          cy="0"
          stroke="url(#g1)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90)"
        />
        <foreignObject x={-radius} y={-radius} width={size} height={size}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm md:text-base font-semibold text-slate-900">{label}</div>
              <div className="text-[10px] text-slate-500 -mt-0.5">Lv</div>
            </div>
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}

function MiniProg({ percent = 0 }) {
  const safe = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full">
      <div className="w-full bg-white/40 h-3 md:h-4 rounded-full overflow-hidden">
        <div style={{ width: `${safe}%` }} className="h-full bg-gradient-to-r from-indigo-400 to-blue-500" />
      </div>
      <div className="text-xs md:text-sm text-slate-600 text-right mt-1">{safe}%</div>
    </div>
  );
}

function ActivityCard({ title, items, empty = "No items", accent = "blue" }) {
  const colors = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <motion.div whileHover={{ y: -6 }} className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/50 shadow-neu min-h-[320px]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg md:text-xl font-semibold text-slate-800">{title}</h4>
        <div className={`p-2 rounded-md bg-gradient-to-br ${colors[accent]} text-white text-xs md:text-sm`}>{items?.length ?? 0}</div>
      </div>

      <div className="space-y-3 max-h-72 overflow-auto pr-2">
        {items && items.length > 0 ? (
          items.map((it, i) => (
            <div key={i} className="rounded-lg p-4 md:p-5 bg-white/60 border border-white/40">
              <p className="text-base md:text-lg font-medium text-slate-800">{it.title || it.name}</p>
              <p className="text-sm md:text-sm text-slate-500 mt-1">
                {/* This part looks correct, it needs `earned_at` for badges */}
                {it.score ? `Score: ${it.score}` : it.completed_at ? new Date(it.completed_at).toLocaleDateString() : (it.earned_at ? new Date(it.earned_at).toLocaleDateString() : "")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-base md:text-lg text-slate-500">{empty}</p>
        )}
      </div>
    </motion.div>
  );
}