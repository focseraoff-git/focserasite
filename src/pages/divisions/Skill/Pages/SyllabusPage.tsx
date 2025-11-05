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
  Star,
  BarChart3,
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

        setPrograms(data || []);
        if (programId) {
          const selected = data.find((p) => p.id === programId || p.slug === programId);
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
  }, [programId, supabase]);

  const openProgram = (program) => {
    navigate(`/divisions/skill/syllabus/${program.id}`);
    setSelectedProgram(program);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg font-semibold">
        <Loader2 className="animate-spin mr-2" /> Loading Courses...
      </div>
    );

  // Difficulty & progress mock data for visual richness
  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const getDifficultyColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

        {/* COURSE GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {programs.map((program, i) => {
            const diff = difficulties[i % difficulties.length];
            const progress = Math.floor(Math.random() * 90 + 10);

            return (
              <motion.div
                key={program.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => openProgram(program)}
                className={`bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all p-6 cursor-pointer ${
                  selectedProgram?.id === program.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                  <BookOpen className="text-blue-600 w-6 h-6" />
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                      diff
                    )}`}
                  >
                    {diff}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {program.description || "Structured learning through projects and challenges."}
                </p>

                {/* INFO */}
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Clock size={15} className="mr-1" /> 30 Days
                  <Layers size={15} className="ml-4 mr-1" /> {program.modules_count || 30} Modules
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  {progress}% completed by learners
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-800">
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* SELECTED PROGRAM DETAIL VIEW */}
        {selectedProgram && (
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
              {selectedProgram.long_description ||
                "A complete guided 30-day program covering real-world examples, coding practice, and hands-on learning modules."}
            </p>

            <div className="flex items-center text-gray-600 text-sm gap-4 mb-8">
              <span className="flex items-center gap-1">
                <Clock size={15} /> 30 Days
              </span>
              <span className="flex items-center gap-1">
                <Award size={15} /> Certificate on Completion
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 size={15} /> Skill Level:{" "}
                <span className="font-semibold text-gray-800">Intermediate</span>
              </span>
            </div>

            {/* MODULE LIST */}
            <div className="space-y-3">
              {modules.length > 0 ? (
                modules.map((mod, index) => (
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
                      onClick={() => navigate(`/divisions/skill/notes/${mod.id}`)}
                      className="text-blue-600 font-semibold hover:text-blue-800 text-sm"
                    >
                      Open →
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  No modules found for this program.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
