// @ts-nocheck
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, Save } from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";

export default function AddModulePage({ user }) {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await lmsSupabaseClient
        .from("modules")
        .insert([{ program_id: programId, title, day }]);

      if (error) throw error;
      alert("✅ Module added successfully!");
      navigate("/divisions/skill/admin/programs");
    } catch (err) {
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center text-red-600 p-10">Access Denied 🚫</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Module to Program</h1>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Module Title</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Day Number</label>
            <input
              type="number"
              className="w-full border px-4 py-2 rounded-lg"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
              min={1}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={16} />}
            Save Module
          </button>
        </form>
      </div>
    </div>
  );
}
