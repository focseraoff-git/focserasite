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
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchModuleAndContents = async () => {
      if (!moduleId) {
        setErrorMsg("Invalid module id.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setErrorMsg("");

      try {
        // fetch module
        const { data: modData, error: modErr } = await supabase
          .from("modules")
          .select("*")
          .eq("id", moduleId)
          .single();

        if (modErr || !modData) {
          console.error("Module fetch error:", modErr);
          setErrorMsg("Failed to load module details.");
          setLoading(false);
          return;
        }
        setModule(modData);

        // fetch program title (if present)
        if (modData.program_id) {
          const { data: progData, error: progErr } = await supabase
            .from("programs")
            .select("id, title, slug, long_description")
            .eq("id", modData.program_id)
            .single();
          if (!progErr) setProgram(progData);
        }

        // fetch content rows for this module and include code_challenges (via foreign key)
        // Assumes `content` table has optional relationship to `code_challenges` via a column `code_challenge_id`
        const { data: contentData, error: contentErr } = await supabase
          .from("content")
          .select(`
            id,
            module_id,
            type,
            title,
            body,
            created_at,
            code_challenge_id,
            code_challenges (
              id,
              title,
              description,
              default_code,
              language,
              topic_id,
              difficulty_id
            )
          `)
          .eq("module_id", moduleId)
          .order("created_at", { ascending: true });

        if (contentErr) {
          console.error("Content fetch error:", contentErr);
          setErrorMsg("Failed to load module contents.");
          setLoading(false);
          return;
        }

        setContents(contentData || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setErrorMsg("Something went wrong while loading the module.");
      } finally {
        setLoading(false);
      }
    };

    fetchModuleAndContents();
  }, [moduleId, supabase]);

  // Loading UI
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );

  // Error UI
  if (errorMsg || !module)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-center px-4">
        <div>
          <p className="text-lg font-semibold mb-2">{errorMsg || "Module not found."}</p>
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 font-semibold text-sm mt-3">
            ← Back
          </button>
        </div>
      </div>
    );

  // categorize contents
  const notes = contents.filter((c) => c.type === "note");
  const assignments = contents.filter((c) => c.type === "assignment");
  const challenges = contents
    .filter((c) => c.type === "challenge")
    .map((c) => {
      // if content links to code_challenges via relationship, prefer that object
      if (c.code_challenges && c.code_challenges.id) {
        return {
          id: c.code_challenges.id,
          title: c.code_challenges.title || c.title,
          description: c.code_challenges.description || c.body,
          default_code: c.code_challenges.default_code,
          language: c.code_challenges.language,
        };
      }
      // fallback: use content row itself (assuming it has code_challenge_id)
      return {
        id: c.code_challenge_id || c.id,
        title: c.title,
        description: c.body,
      };
    });

  // safe html sanitizer (very basic)
  const sanitizeHtml = (html = "") =>
    (html || "")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6">
          <ArrowLeft size={18} />
          Back to Program
        </button>

        {/* header card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{module.title}</h1>
          <p className="text-gray-500 mb-4">
            {program ? `Part of ${program.title}` : "Learning Module"}
          </p>
          <div className="text-gray-600 text-sm mb-4">
            <span className="mr-4"><BookOpen size={14} /> {module.day ? `Day ${module.day}` : ""}</span>
            <span className="mr-4">{module.duration ? `${module.duration} mins` : ""}</span>
          </div>
          {module.description && (
            <div className="text-gray-700 prose mb-2" dangerouslySetInnerHTML={{ __html: sanitizeHtml(module.description) }} />
          )}
          <div className="flex gap-4 pt-2">
            <button onClick={() => document.getElementById("notes-section")?.scrollIntoView({ behavior: "smooth" })} className="px-3 py-2 bg-blue-600 text-white rounded-md">Notes</button>
            <button onClick={() => document.getElementById("assignments-section")?.scrollIntoView({ behavior: "smooth" })} className="px-3 py-2 bg-green-600 text-white rounded-md">Assignments</button>
            <button onClick={() => document.getElementById("challenges-section")?.scrollIntoView({ behavior: "smooth" })} className="px-3 py-2 bg-purple-600 text-white rounded-md">Challenges</button>
          </div>
        </div>

        {/* Notes */}
        <section id="notes-section" className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4"><BookOpen size={18} /> Notes</h2>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes available.</p>
          ) : (
            <div className="space-y-4">
              {notes.map((n) => (
                <div key={n.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{n.title}</h3>
                  <div className="text-gray-600 prose" dangerouslySetInnerHTML={{ __html: sanitizeHtml(n.body) }} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Assignments */}
        <section id="assignments-section" className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4"><FileText size={18} /> Assignments</h2>
          {assignments.length === 0 ? (
            <p className="text-gray-500 text-sm">No assignments yet.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((a) => (
                <div key={a.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{a.title}</h3>
                  <div className="text-gray-600 prose mb-3" dangerouslySetInnerHTML={{ __html: sanitizeHtml(a.body) }} />
                  <button onClick={() => navigate(`/divisions/skill/assignment/${a.id}`)} className="text-blue-600 font-semibold hover:text-blue-800">Open Assignment →</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Challenges */}
        <section id="challenges-section">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4"><Code2 size={18} /> Coding Challenges</h2>
          {challenges.length === 0 ? (
            <p className="text-gray-500 text-sm">No challenges for this module.</p>
          ) : (
            <div className="space-y-4">
              {challenges.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{c.title}</h3>
                  {c.description && <div className="text-gray-600 prose mb-3" dangerouslySetInnerHTML={{ __html: sanitizeHtml(c.description) }} />}
                  <div className="flex gap-3">
                    <button onClick={() => navigate(`/divisions/skill/code/${c.id}`)} className="text-purple-600 font-semibold hover:text-purple-800">Solve Challenge →</button>
                    <button onClick={() => {
                      // If you want a detail page for challenge info:
                      navigate(`/divisions/skill/challenge/${c.id}`);
                    }} className="text-gray-600 font-medium hover:text-gray-800">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
