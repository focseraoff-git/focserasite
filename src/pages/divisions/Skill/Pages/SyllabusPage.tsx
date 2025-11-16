// @ts-nocheck
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ModuleItem from "../components/ModuleItem";
import {
  BookOpen,
  Clock,
  Layers,
  ArrowRight,
  Loader2,
  Lock,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SyllabusPage({ user, supabase = lmsSupabaseClient }) {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;

        const sorted = [...(data || [])].sort((a, b) =>
          a.is_locked === b.is_locked ? 0 : a.is_locked ? 1 : -1
        );
        setPrograms(sorted);

        if (programId) {
          const selected = sorted.find(
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

        const mods = data || [];
        if (user?.id) {
          const moduleIds = mods.map((m) => m.id);
          const { data: completedData } = await supabase
            .from("completed_modules")
            .select("module_id")
            .eq("user_id", user.id)
            .in("module_id", moduleIds);

          const completedSet = new Set(
            (completedData || []).map((c) => c.module_id)
          );
          const annotated = mods.map((m) => ({
            ...m,
            completed: completedSet.has(m.id),
          }));
          setModules(annotated);
        } else {
          setModules(mods);
        }
      } catch (err) {
        console.error("Error fetching modules:", err.message);
      }
    };

    fetchPrograms();
  }, [programId]);

  const openProgram = (program) => {
    if (program.is_locked) return;
    navigate(`/divisions/skill/syllabus/${program.slug}`);
    setSelectedProgram(program);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg font-semibold">
        <Loader2 className="animate-spin mr-2" /> Loading Programs...
      </div>
    );

  const diffColors = {
    Beginner: "bg-blue-100 text-blue-700",
    Intermediate: "bg-indigo-100 text-indigo-700",
    Advanced: "bg-sky-100 text-sky-700",
    Default: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] to-[#eef4ff] pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-700 to-indigo-600 text-transparent bg-clip-text mb-14"
        >
          Explore Skill Programs
        </motion.h1>

        {/* PROGRAM GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {programs.map((program) => {
            const difficultyClass =
              diffColors[program.difficulty] || diffColors.Default;
            const locked = program.is_locked === true;

            return (
              <motion.div
                key={program.id}
                whileHover={!locked ? { y: -6, scale: 1.02 } : {}}
                onClick={() => openProgram(program)}
                className={`relative bg-white rounded-2xl shadow-sm border border-blue-100 p-6 transition-all duration-200 ${
                  locked
                    ? "opacity-60 grayscale cursor-not-allowed"
                    : "cursor-pointer hover:shadow-xl hover:border-blue-300"
                }`}
              >
                {locked && (
                  <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md flex items-center gap-1 font-semibold shadow-sm">
                    <Lock size={12} /> Coming Soon
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="text-blue-600 w-6 h-6" />
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyClass}`}
                  >
                    {program.difficulty || "Beginner"}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {program.description}
                </p>

                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <Clock size={15} className="mr-1" /> {program.duration_days}{" "}
                  Days
                  <Layers size={15} className="ml-4 mr-1" />
                  {program.modules_count || 0} Modules
                </div>

                {!locked && (
                  <div className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-700">
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* SELECTED PROGRAM DETAILS */}
        {selectedProgram && !selectedProgram.is_locked && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md border border-blue-100 p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                {selectedProgram.title}
              </h2>
              <span className="text-sm text-slate-500">
                {modules.length} Modules
              </span>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {selectedProgram.long_description}
            </p>

            <div className="space-y-3">
              {modules.map((mod, index) => {
                const prevCompleted =
                  index === 0 ? true : !!modules[index - 1]?.completed;
                const locked = !prevCompleted && !mod.completed;
                return (
                  <ModuleItem
                    key={mod.id}
                    module={mod}
                    onOpen={() =>
                      navigate(`/divisions/skill/module/${mod.id}`)
                    }
                    locked={locked}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
