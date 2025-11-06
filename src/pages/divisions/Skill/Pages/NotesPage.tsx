// @ts-nocheck
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Loader2, ArrowLeft, BookOpen } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function NotesPage({ user, supabase = lmsSupabaseClient }) {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchChallenges = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        console.log("🔹 Fetching all challenges...");
        const { data, error } = await supabase
          .from("code_challenges")
          .select(`
            id,
            title,
            description,
            language,
            default_code,
            created_at,
            topics (name),
            difficulties (level)
          `)
          .order("created_at", { ascending: true });

        if (error) throw error;

        setChallenges(data || []);
      } catch (err) {
        console.error("❌ Error fetching challenges:", err.message);
        setErrorMsg("Failed to load coding challenges.");
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [supabase]);

  // 🔄 Loading spinner
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );

  // 🚫 Error state
  if (errorMsg)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-center px-4">
        <div>
          <p className="text-lg font-semibold mb-2">{errorMsg}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm mt-3"
          >
            ← Back
          </button>
        </div>
      </div>
    );

  // ✅ Safe HTML
  const sanitizeHtml = (html = "") =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Coding Challenges
          </h1>
          <p className="text-gray-500">
            Explore challenges by topic and difficulty
          </p>
        </div>

        {/* 💻 Challenges List */}
        {challenges.length === 0 ? (
          <p className="text-gray-500 text-sm pl-1">
            No coding challenges available yet.
          </p>
        ) : (
          <div className="space-y-6">
            {challenges.map((c) => (
              <div
                key={c.id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {c.title}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      c.difficulties?.level === "Hard"
                        ? "bg-red-100 text-red-700"
                        : c.difficulties?.level === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {c.difficulties?.level || "Easy"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Topic: {c.topics?.name || "General"}
                </p>
                <div
                  className="text-gray-600 leading-relaxed mt-3 prose"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(c.description),
                  }}
                />
                <button
                  onClick={() => navigate(`/divisions/skill/code/${c.id}`)}
                  className="mt-4 text-purple-600 font-semibold hover:text-purple-800 transition-all text-sm"
                >
                  Solve Challenge →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
