// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, FileText, Code2, ArrowLeft, Loader2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function ModulePage({ user, supabase = lmsSupabaseClient }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);
  const [program, setProgram] = useState(null);
  const [notes, setNotes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const sanitizeHtml = (html = "") =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId) {
        setErrorMsg("Invalid module ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // ✅ 1. Fetch module
        const { data: modData, error: modErr } = await supabase
          .from("modules")
          .select("*")
          .eq("id", moduleId)
          .single();

        if (modErr) throw modErr;
        setModule(modData);

        // ✅ 2. Fetch program
        if (modData.program_id) {
          const { data: progData } = await supabase
            .from("programs")
            .select("id, title, long_description")
            .eq("id", modData.program_id)
            .single();
          setProgram(progData);
        }

        // ✅ 3. Fetch content
        const { data: contentData, error: contentErr } = await supabase
          .from("content")
          .select("*")
          .eq("module_id", moduleId)
          .order("created_at", { ascending: true });

        if (contentErr) throw contentErr;

        // ✅ 4. Fetch related code challenges manually
        const challengeRefs = contentData
          .filter((c) => c.code_challenge_id)
          .map((c) => c.code_challenge_id);

        let challengeData = [];
        if (challengeRefs.length > 0) {
          const { data: challengeRows, error: chalErr } = await supabase
            .from("code_challenges")
            .select("id, title, description, language, default_code")
            .in("id", challengeRefs);

          if (chalErr) console.warn("⚠ Challenge fetch warning:", chalErr);
          else challengeData = challengeRows || [];
        }

        // ✅ 5. Categorize content
        const noteList = contentData.filter(
          (c) => c.type === "theory" || c.type === "note"
        );
        const assignList = contentData.filter((c) => c.type === "assignment");
        const challengeList = contentData
          .filter((c) => c.type === "challenge")
          .map((c) => {
            const relatedChallenge = challengeData.find(
              (ch) => ch.id === c.code_challenge_id
            );
            return {
              id: relatedChallenge?.id || c.code_challenge_id,
              title: relatedChallenge?.title || c.title,
              description:
                relatedChallenge?.description || c.body || "No description.",
              language: relatedChallenge?.language || "java",
            };
          });

        setNotes(noteList);
        setAssignments(assignList);
        setChallenges(challengeList);
      } catch (err) {
        console.error("❌ Error fetching module:", JSON.stringify(err, null, 2));
        setErrorMsg(err.message || "Failed to load module data.");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  // 🌀 Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );

  // ⚠ Error or not found
  if (errorMsg || !module)
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-600 text-center">
        <p className="text-lg font-semibold mb-3">
          {errorMsg || "Module not found."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    );

  // ✅ Render UI
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6"
        >
          <ArrowLeft size={18} /> Back to Program
        </button>

        {/* Module Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            {module.title}
          </h1>
          <p className="text-gray-500 mb-4">
            {program ? `Part of ${program.title}` : "Learning Module"}
          </p>
          {module.description && (
            <div
              className="text-gray-700 prose mb-4"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(module.description),
              }}
            />
          )}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() =>
                document
                  .getElementById("notes-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-3 py-2 bg-blue-600 text-white rounded-md"
            >
              Notes
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("assignments-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-3 py-2 bg-green-600 text-white rounded-md"
            >
              Assignments
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("challenges-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-3 py-2 bg-purple-600 text-white rounded-md"
            >
              Challenges
            </button>
          </div>
        </div>

        {/* Notes */}
        <section id="notes-section" className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <BookOpen size={18} /> Notes
          </h2>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes available.</p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="bg-white p-5 mb-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {n.title}
                </h3>
                <div
                  className="text-gray-600 prose"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(n.body) }}
                />
              </div>
            ))
          )}
        </section>

        {/* Assignments */}
        <section id="assignments-section" className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <FileText size={18} /> Assignments
          </h2>
          {assignments.length === 0 ? (
            <p className="text-gray-500 text-sm">No assignments yet.</p>
          ) : (
            assignments.map((a) => (
              <div
                key={a.id}
                className="bg-white p-5 mb-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {a.title}
                </h3>
                <div
                  className="text-gray-600 prose mb-3"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(a.body) }}
                />
              </div>
            ))
          )}
        </section>

        {/* Coding Challenges */}
        <section id="challenges-section">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <Code2 size={18} /> Coding Challenges
          </h2>
          {challenges.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No challenges for this module.
            </p>
          ) : (
            challenges.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 mb-4 rounded-xl border border-gray-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {c.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{c.description}</p>
                <button
                  onClick={() => navigate(`/divisions/skill/code/${c.id}`)}
                  className="text-purple-600 hover:text-purple-800 font-semibold"
                >
                  Solve Challenge →
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
