// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";

export default function AddModulePage() {
  const navigate = useNavigate();

  const [programs, setPrograms] = useState([]);
  const [programId, setProgramId] = useState("");
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(1);
  const [description, setDescription] = useState("");

  const [saving, setSaving] = useState(false);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [message, setMessage] = useState("");

  /* ===========================================================
     Fetch Programs First
  =========================================================== */
  useEffect(() => {
    const loadPrograms = async () => {
      const { data, error } = await lmsSupabaseClient
        .from("programs")
        .select("id, title")
        .order("created_at");

      if (!error) setPrograms(data || []);
      setLoadingPrograms(false);
    };

    loadPrograms();
  }, []);

  /* ===========================================================
     Handle Insert
  =========================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!programId || !title.trim()) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const { error } = await lmsSupabaseClient.from("modules").insert({
        title,
        day,
        description,
        program_id: programId,
      });

      if (error) throw error;

      setMessage("Module added successfully!");

      setTimeout(() => {
        navigate("/divisions/skill/admin/dashboard");
      }, 800);
    } catch (err) {
      setMessage("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  /* ===========================================================
     UI
  =========================================================== */
  if (loadingPrograms)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto bg-white border p-8 rounded-xl shadow-sm">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Module</h1>

      {message && (
        <div className="mb-4 p-3 rounded-md bg-blue-50 text-blue-700 text-sm flex items-center gap-2">
          <CheckCircle size={16} />
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Program Select */}
        <div>
          <label className="block mb-1 font-medium">Select Program *</label>
          <select
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          >
            <option value="">Choose a program</option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Module Title *</label>
          <input
            type="text"
            placeholder="e.g. Basics - Hello World"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Day Number */}
        <div>
          <label className="block mb-1 font-medium">Day Number *</label>
          <input
            type="number"
            min={1}
            value={day}
            onChange={(e) => setDay(parseInt(e.target.value))}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            rows="4"
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
        >
          {saving ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin" /> Saving...
            </div>
          ) : (
            "Add Module"
          )}
        </button>
      </form>
    </div>
  );
}
