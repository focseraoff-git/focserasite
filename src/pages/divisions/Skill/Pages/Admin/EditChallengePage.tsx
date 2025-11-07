// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Save } from "lucide-react";

export default function EditChallengePage({ supabase }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      const { data } = await supabase.from("code_challenges").select("*").eq("id", id).single();
      const { data: cases } = await supabase.from("test_cases").select("*").eq("challenge_id", id);
      setChallenge(data);
      setTestCases(cases || []);
      setLoading(false);
    };
    fetchChallenge();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    await supabase.from("code_challenges").update(challenge).eq("id", id);
    await supabase.from("test_cases").delete().eq("challenge_id", id);
    await supabase.from("test_cases").insert(
      testCases.map((t) => ({
        challenge_id: id,
        input: t.input,
        expected_output: t.expected_output,
      }))
    );
    alert("✅ Challenge updated!");
    navigate("/divisions/skill/admin/dashboard");
  };

  if (loading)
    return (
      <div className="flex justify-center p-10 text-blue-600">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Challenge</h1>

        <div className="space-y-4">
          <input
            className="w-full border px-4 py-2 rounded-lg"
            value={challenge.title}
            onChange={(e) => setChallenge({ ...challenge, title: e.target.value })}
          />
          <textarea
            className="w-full border px-4 py-2 rounded-lg h-24"
            value={challenge.description}
            onChange={(e) => setChallenge({ ...challenge, description: e.target.value })}
          />
          <textarea
            className="w-full border px-4 py-2 rounded-lg h-40 font-mono"
            value={challenge.default_code}
            onChange={(e) => setChallenge({ ...challenge, default_code: e.target.value })}
          />

          <h3 className="text-lg font-semibold">Test Cases</h3>
          {testCases.map((t, i) => (
            <div key={i} className="border p-3 rounded-lg mb-2 bg-gray-50">
              <input
                className="border px-3 py-2 rounded-lg mb-2 w-full"
                value={t.input}
                onChange={(e) =>
                  setTestCases(testCases.map((tc, idx) => (idx === i ? { ...tc, input: e.target.value } : tc)))
                }
                placeholder="Input"
              />
              <input
                className="border px-3 py-2 rounded-lg w-full"
                value={t.expected_output}
                onChange={(e) =>
                  setTestCases(testCases.map((tc, idx) => (idx === i ? { ...tc, expected_output: e.target.value } : tc)))
                }
                placeholder="Expected Output"
              />
            </div>
          ))}

          <button
            onClick={() => setTestCases([...testCases, { input: "", expected_output: "" }])}
            className="text-blue-600 mt-2"
          >
            + Add Test Case
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg mt-5"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
