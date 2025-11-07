// @ts-nocheck
import { useState, useEffect } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { lmsSupabaseClient } from "../../../../../lib/ssupabase";


export default function AddChallengePage() {
  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [moduleId, setModuleId] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      const { data } = await lmsSupabaseClient.from("modules").select("id, title");
      setModules(data || []);
    };
    fetchModules();
  }, []);

  const handleAddChallenge = async (e) => {
    e.preventDefault();
    if (!title || !description || !moduleId) return alert("Please fill all required fields!");
    setLoading(true);

    try {
      const { error } = await lmsSupabaseClient.from("code_challenges").insert([
        {
          title,
          description,
          difficulty,
          module_id: moduleId,
          test_cases: testCases,
        },
      ]);

      if (error) throw error;
      alert("✅ Challenge added successfully!");

      // Reset
      setTitle("");
      setDescription("");
      setDifficulty("Easy");
      setModuleId("");
      setTestCases([{ input: "", output: "" }]);
    } catch (err) {
      alert("❌ Error adding challenge: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newCases = [...testCases];
    newCases[index][field] = value;
    setTestCases(newCases);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-3xl font-bold mb-6">Add Coding Challenge</h1>

      <form onSubmit={handleAddChallenge} className="space-y-5">
        <div>
          <label className="block font-semibold mb-2">Challenge Title</label>
          <input
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="e.g. Reverse a String"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            className="w-full border px-4 py-2 rounded-lg h-28"
            placeholder="Write the problem statement..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Difficulty</label>
            <select
              className="w-full border px-4 py-2 rounded-lg"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Module</label>
            <select
              className="w-full border px-4 py-2 rounded-lg"
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
              required
            >
              <option value="">Select module</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Test Cases</label>
          {testCases.map((tc, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                type="text"
                className="border px-3 py-2 rounded-lg flex-1"
                placeholder="Input"
                value={tc.input}
                onChange={(e) => handleTestCaseChange(i, "input", e.target.value)}
              />
              <input
                type="text"
                className="border px-3 py-2 rounded-lg flex-1"
                placeholder="Expected Output"
                value={tc.output}
                onChange={(e) => handleTestCaseChange(i, "output", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestCase}
            className="text-blue-600 font-semibold flex items-center gap-1 mt-2"
          >
            <PlusCircle size={16} /> Add another test case
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlusCircle className="w-5 h-5" />}
          {loading ? "Adding..." : "Add Challenge"}
        </button>
      </form>
    </div>
  );
}
