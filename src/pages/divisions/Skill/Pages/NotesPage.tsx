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

        // ✅ 1️⃣ Fetch module info (simple flat query)
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

        // ✅ 2️⃣ Fetch program title separately
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

        // ✅ 3️⃣ Fetch content for this module
        const { data: contentData, error: contentError } = await supabase
          .from("content")
          .select("*")
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

  // 🚫 Error or missing module
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

  const notes = contents.filter((c) => c.type === "note");
  const assignments = contents.filter((c) => c.type === "assignment");
  const challenges = contents.filter((c) => c.type === "challenge");

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

        {/* 📝 Notes Section */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <BookOpen size={20} className="text-blue-600" /> Notes
          </h2>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm pl-1">No notes available.</p>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {note.title}
                  </h3>
                  <div
                    className="text-gray-600 leading-relaxed prose"
                    dangerouslySetInnerHTML={{ __html: note.body }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 📂 Assignments Section */}
        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <FileText size={20} className="text-green-600" /> Assignments
          </h2>
          {assignments.length === 0 ? (
            <p className="text-gray-500 text-sm pl-1">No assignments yet.</p>
          ) : (
            <div className="space-y-4">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {a.title}
                  </h3>
                  <div
                    className="text-gray-600 leading-relaxed mb-3 prose"
                    dangerouslySetInnerHTML={{ __html: a.body }}
                  />
                  <button
                    onClick={() =>
                      navigate(`/divisions/skill/assignment/${a.id}`)
                    }
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-all text-sm"
                  >
                    Open Assignment →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 💻 Challenges Section */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
            <Code2 size={20} className="text-purple-600" /> Coding Challenges
          </h2>
          {challenges.length === 0 ? (
            <p className="text-gray-500 text-sm pl-1">
              No challenges for this module.
            </p>
          ) : (
            <div className="space-y-4">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {c.title}
                  </h3>
                  <div
                    className="text-gray-600 leading-relaxed mb-3 prose"
                    dangerouslySetInnerHTML={{ __html: c.body }}
                  />
                  <button
                    onClick={() =>
                      navigate(`/divisions/skill/code/${c.id}`)
                    }
                    className="text-purple-600 font-semibold hover:text-purple-800 transition-all text-sm"
                  >
                    Solve Challenge →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
