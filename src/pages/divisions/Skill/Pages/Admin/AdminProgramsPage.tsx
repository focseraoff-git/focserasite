// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit3, Trash2, BookOpen, Loader2, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminProgramsPage({ user, supabase }) {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all programs
  useEffect(() => {
    const fetchPrograms = async () => {
      const { data, error } = await supabase.from("programs").select("*").order("created_at", { ascending: false });
      if (!error) setPrograms(data || []);
      setLoading(false);
    };
    fetchPrograms();
  }, []);

  const deleteProgram = async (id) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    const { error } = await supabase.from("programs").delete().eq("id", id);
    if (!error) {
      setPrograms(programs.filter((p) => p.id !== id));
      alert("✅ Program deleted successfully!");
    } else {
      alert("❌ " + error.message);
    }
  };

  if (!user) return <p className="text-center text-red-600 p-10">Access Denied 🚫</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Manage Programs
          </h1>
          <button
            onClick={() => navigate("/divisions/skill/admin/add-program")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <PlusCircle size={18} /> Add Program
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center p-10 text-blue-600">
            <Loader2 className="animate-spin w-6 h-6" />
          </div>
        ) : programs.length === 0 ? (
          <p className="text-gray-500">No programs available yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <h2 className="font-semibold text-lg text-gray-800 mb-1">{p.title}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{p.description}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/divisions/skill/admin/add-module/${p.id}`)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <Layers size={14} /> Modules
                  </button>
                  <button
                    onClick={() => deleteProgram(p.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
