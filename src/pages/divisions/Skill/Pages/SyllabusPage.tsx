// @ts-nocheck
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Award,
  Layers,
  ArrowRight,
  Loader2,
  BarChart3,
  Lock
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SyllabusPage({ user, supabase = lmsSupabaseClient }) {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -----------------------------------------
        FETCH PROGRAMS + LOCK STATUS
  ------------------------------------------*/
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")          // include is_locked column
          .order("created_at", { ascending: true });

        if (error) throw error;

        setPrograms(data || []);

        if (programId) {
          const selected = data.find(
            (p) => p.id === programId || p.slug === programId
          );
          setSelectedProgram(selected);
          if (selected) fetchModules(selected.id);
        }
      } catch (err) {
        console.error("Error fetching programs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchModules = async (progId) => {
      try {
        const { data, error } = await supabase
          .from("modules")
          .select("*")
          .eq("program_id", progId)
          .order("day", { ascending: true });

        if (error) throw error;
        setModules(data || []);
      } catch (err) {
        console.error("Error fetching modules:", err.message);
      }
    };

    fetchPrograms();
  }, [programId]);

  const openProgram = (program) => {
    if (program.is_locked) return; // prevent navigation if locked
    navigate(`/divisions/skill/syllabus/${program.id}`);
    setSelectedProgram(program);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg font-semibold">
        <Loader2 className="animate-spin mr-2" /> Loading Courses...
      </div>
    );

  const diffColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
    Default: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-10 text-center"
        >
          Explore Skill Programs
        </motion.h1>

        {/* PROGRAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program) => {
            const difficultyClass =
              diffColors[program.difficulty] || diffColors.Default;

            const locked = program.is_locked === true;

            return (
              <motion.div
                key={program.id}
                whileHover={!locked ? { y: -6, scale: 1.02 } : {}}
                onClick={() => openProgram(program)}
                className={`relative bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition cursor-pointer 
                ${locked ? "opacity-50 grayscale cursor-not-allowed" : ""}
              `}
              >
                {/* COMING SOON BADGE */}
                {locked && (
                  <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Lock size={12} /> Coming Soon
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="text-blue-600 w-6 h-6" />
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyClass}`}>
                    {program.difficulty || "Beginner"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {program.description}
                </p>

                {/* INFO */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Clock size={15} className="mr-1" /> {program.duration_days} Days
                  <Layers size={15} className="ml-4 mr-1" />
                  {program.modules_count || 0} Modules
                </div>

                {/* CTA */}
                {!locked && (
                  <div className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-800">
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* SELECTED PROGRAM DETAIL VIEW */}
        {selectedProgram && !selectedProgram.is_locked && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedProgram.title}
              </h2>
              <span className="text-sm text-gray-500">
                {modules.length} Modules
              </span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedProgram.long_description}
            </p>

            {/* MODULES LIST */}
            <div className="space-y-3">
              {modules.map((mod, index) => (
                <motion.div
                  key={mod.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 border border-gray-200 rounded-xl flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      Day {index + 1}: {mod.title}
                    </p>
                    <p className="text-gray-500 text-sm">{mod.description}</p>
                  </div>

                  <button
                    onClick={() => navigate(`../module/${mod.id}`)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Open →
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
