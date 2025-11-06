// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, FileText, Code2, Loader2, ArrowLeft } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function NotesPage({ user, supabase = lmsSupabaseClient }) {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  const [module, setModule] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!moduleId) {
        setErrorMsg("Invalid module ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMsg("");

      try {
        console.log("🔹 Fetching module + content for:", moduleId);

        // ✅ 1️⃣ Fetch module info
        const { data: moduleData, error: moduleError } = await supabase
          .from("modules")
          .select("*")
          .eq("id", moduleId)
          .single();

        if (moduleError) {
          console.error("❌ Module fetch error:", moduleError.message);
          setErrorMsg("Failed to load module details.");
          return;
        }

        // ✅ 2️⃣ Fetch program title
        let programTitle = null;
        if (moduleData?.program_id) {
          const { data: programData, error: programError } = await supabase
            .from("programs")
            .select("title")
            .eq("id", moduleData.program_id)
            .single();

          if (!programError) programTitle = programData?.title;
        }

        setModule({ ...moduleData, program_title: programTitle });

        // ✅ 3️⃣ Fetch related content (include code_challenges)
        const { data: contentData, error: contentError } = await supabase
          .from("content")
          .select(`
            id,
            module_id,
            type,
            title,
            body,
            created_at,
            code_challenges:code_challenge_id (
              id,
              title,
              description,
              default_code,
              language
            )
          `)
          .eq("module_id", moduleId)
          .order("created_at", { ascending: true });

        if (contentError) {
          console.error("❌ Content fetch error:", contentError.message);
          setErrorMsg("Failed to load module contents.");
          return;
        }

        setContents(contentData || []);
      } catch (err) {
        console.error("❌ Unexpected error:", err.message);
        setErrorMsg("Something went wrong while loading this module.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [moduleId, supabase]);

  // 🔄 Loading spinner
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );

  // 🚫 Error handler
  if (errorMsg || !module)
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-center px-4">
        <div>
          <p className="text-lg font-semibold mb-2">
            {errorMsg || "Module not found."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm mt-3"
          >
            ← Back to Syllabus
          </button>
        </div>
      </div>
    );

  // ✅ Categorize contents
  const notes = contents.filter((c) => c.type === "note");
  const assignments = contents.filter((c) => c.type === "assignment");

  // ✅ Build challenge list safely
  const challenges = contents
    .filter((c) => c.type === "challenge" && c.code_challenges)
    .map((c) => ({
      id: c.code_challenges.id,
      title: c.code_challenges.title,
      body: c.code_challenges.description || c.body || "",
    }));

  // ✅ Sanitizer
  const sanitizeHtml = (html = "") => {
    if (!html) return "";
    return html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 🔙 Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6"
        >
          <ArrowLeft size={18} />
          Back to Syllabus
        </button>

        {/* 📘 Module Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {module.title}
          </h1>
          <p className="text-gray-500">
            {module.program_title
              ? `Part of ${module.program_title}`
              : "Learning Module"}
          </p>
        </div>

        {/* 📝 Notes */}
        <Section
          icon={<BookOpen size={20} className="text-blue-600" />}
          title="Notes"
          items={notes}
          emptyMessage="No notes available."
          renderItem={(note) => (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {note.title}
              </h3>
              <div
                className="text-gray-600 leading-relaxed prose"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(note.body) }}
              />
            </>
          )}
        />

        {/* 📂 Assignments */}
        <Section
          icon={<FileText size={20} className="text-green-600" />}
          title="Assignments"
          items={assignments}
          emptyMessage="No assignments yet."
          renderItem={(a) => (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {a.title}
              </h3>
              <div
                className="text-gray-600 leading-relaxed mb-3 prose"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(a.body) }}
              />
              <button
                onClick={() =>
                  navigate(`/divisions/skill/assignment/${a.id}`)
                }
                className="text-blue-600 font-semibold hover:text-blue-800 transition-all text-sm"
              >
                Open Assignment →
              </button>
            </>
          )}
        />

        {/* 💻 Challenges */}
        <Section
          icon={<Code2 size={20} className="text-purple-600" />}
          title="Coding Challenges"
          items={challenges}
          emptyMessage="No challenges for this module."
          renderItem={(c) => (
            <>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {c.title}
              </h3>
              <div
                className="text-gray-600 leading-relaxed mb-3 prose"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(c.body) }}
              />
              <button
                onClick={() => navigate(`/divisions/skill/code/${c.id}`)}
                className="text-purple-600 font-semibold hover:text-purple-800 transition-all text-sm"
              >
                Solve Challenge →
              </button>
            </>
          )}
        />
      </div>
    </div>
  );
}

/* 🔧 Reusable Section Component */
function Section({ icon, title, items, emptyMessage, renderItem }) {
  return (
    <section className="mb-8">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
        {icon} {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm pl-1">{emptyMessage}</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
