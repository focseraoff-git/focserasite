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
  Rocket,
  PenTool,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function DashboardPage({ user, supabase = lmsSupabaseClient }) {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_modules: 0,
    daily_streak: 0,
    badges: [],
    total_score: 0,
  });

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  /* ===========================================================
     FETCH DATA
  =========================================================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data: programsData } = await supabase
          .from("programs")
          .select("*")
          .order("created_at", { ascending: true });

        setPrograms(programsData || []);

        if (user) {
          const { data: profileData } = await supabase
            .from("users")
            .select("full_name, avatar_url, email")
            .eq("id", user.id)
            .single();

          setProfile(profileData);

          const { data: statsData } = await supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle();

          setStats(statsData || stats);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  /* ===========================================================
     AVATAR UPLOAD
  =========================================================== */
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const ext = file.name.split(".").pop();
      const path = `avatars/${user.id}_${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data } = supabase.storage.from("avatars").getPublicUrl(path);

      await supabase
        .from("users")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);

      setProfile({ ...profile, avatar_url: data.publicUrl });
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  /* ===========================================================
     BEFORE LOGIN PAGE
  =========================================================== */
  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 text-white relative overflow-hidden">

        <section className="text-center pt-40 md:pt-48 pb-24 relative overflow-hidden">

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-28 left-[15%] opacity-40"
          >
            <Rocket className="w-16 h-16 text-yellow-300" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute bottom-28 right-[12%] opacity-40"
          >
            <PenTool className="w-14 h-14 text-pink-300" />
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Learn. Create. Grow.
          </h1>

          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Learn coding, editing, design & filmmaking with
            <span className="text-yellow-300 font-bold"> Focsera SkillVerse</span>.
          </p>

          {/* CTA BUTTON */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            onClick={() => navigate("/divisions/skill/auth")}
            className="px-10 py-3 bg-white text-blue-700 rounded-full font-semibold shadow-xl hover:bg-gray-100 transition"
          >
            Start Learning Free →
          </motion.button>
        </section>

        {/* COURSES */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Courses</h2>

          {loading ? (
            <p className="text-center text-gray-200 text-lg">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {programs.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.03, y: -6 }}
                  className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-200 text-sm mb-6">{p.description}</p>

                  <button
                    onClick={() => navigate("/divisions/skill/auth")}
                    className="text-yellow-300 font-semibold hover:text-white"
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
     LOGGED-IN DASHBOARD
  =========================================================== */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6faff] via-[#eef4ff] to-[#e6ebff] pt-20 md:pt-24 pb-20 px-4 relative overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute top-10 right-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* PROFILE HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-3xl p-10 mb-16 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 blur-2xl"></div>

          <div className="flex items-center gap-6 relative z-10">

            {/* Avatar */}
            <div className="relative group">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  className="w-28 h-28 rounded-full object-cover shadow-lg"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
                  <Camera className="text-blue-600" size={40} />
                </div>
              )}

              {/* Upload */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition shadow-md"
              >
                <Camera size={15} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
                {profile?.full_name}
                <button className="p-1 hover:bg-blue-100 rounded">
                  <Edit3 size={20} />
                </button>
              </h1>

              <p className="text-gray-500 mt-1">{profile?.email}</p>
            </div>
          </div>

          {/* Certificates */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/divisions/skill/certificate/Java")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold shadow-md flex items-center gap-2"
          >
            <Award size={18} /> Certificates
          </motion.button>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <StatCard
            icon={BookOpen}
            title="Modules Completed"
            value={stats.total_modules}
            color="from-blue-500 to-blue-600"
          />

          <StatCard
            icon={Flame}
            title="Daily Streak"
            value={stats.daily_streak}
            color="from-orange-500 to-orange-600"
          />

          <StatCard
            icon={Trophy}
            title="Badges Earned"
            value={stats.badges?.length}
            color="from-yellow-500 to-yellow-600"
          />

          <StatCard
            icon={CheckCircle}
            title="XP Points"
            value={`${stats.total_score} XP`}
            color="from-green-500 to-green-600"
          />
        </div>

      </div>
    </div>
  );
}

/* ===========================================================
   STAT CARD COMPONENT
=========================================================== */
function StatCard({ icon: Icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
        bg-white 
        rounded-3xl 
        shadow-xl 
        p-8 
        border border-gray-100 
        hover:shadow-2xl 
        transition-all 
        duration-300 
        flex 
        flex-col 
        items-start 
        gap-4 
        relative 
        overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute top-0 right-0 
          w-28 h-28 
          bg-gradient-to-br ${color} 
          opacity-20 
          blur-2xl 
          rounded-full
        `}
      />

      {/* Icon */}
      <div
        className={`
          p-4 rounded-2xl 
          bg-gradient-to-br ${color} 
          text-white shadow-md relative z-10
        `}
      >
        <Icon size={28} />
      </div>

      <p className="text-gray-500 text-sm relative z-10">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-800 relative z-10">{value}</h3>
    </motion.div>
  );
}
