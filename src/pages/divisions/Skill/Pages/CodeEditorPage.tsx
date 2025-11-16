// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Loader2, Sun, Moon, ArrowLeft } from "lucide-react";
import { Editor } from "@monaco-editor/react";
import confetti from "canvas-confetti";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

const JUDGE0_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const JUDGE0_KEY = "ddad48de98mshcfa84bd23318ed6p1f81e1jsnbc11733943a9";

export default function CodeEditorPage({ user, supabase = lmsSupabaseClient }) {
  const { challengeId } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState(62);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [stdin, setStdin] = useState(""); // TERMINAL INPUT

  // Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Confetti on success (if needed)
  const triggerConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    (function frame() {
      confetti({ particleCount: 6, spread: 70, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // Fallback challenge
  const loadFallback = () => {
    const fallback = {
      id: "demo-challenge",
      title: "Day 1: Hello World Challenge",
      language: "java",
      default_code:
        'import java.util.*;\npublic class Main {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    String s = sc.nextLine();\n    System.out.println(s);\n  }\n}',
      body: "<p>This is fallback mode.</p>",
    };

    setChallenge(fallback);
    setCode(fallback.default_code);
  };

  // Fetch challenge
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        if (!challengeId) return loadFallback();

        const { data: challengeData, error } = await supabase
          .from("code_challenges")
          .select("id, title, description, language, starter_code, default_code")
          .eq("id", challengeId)
          .single();

        if (error || !challengeData) return loadFallback();

        setChallenge(challengeData);
        setCode(challengeData.starter_code || challengeData.default_code);
        setLanguageId(mapLanguage(challengeData.language));
      } catch (err) {
        loadFallback();
      }
    };

    fetchChallenge();
  }, [challengeId]);

  // Map language to Judge0 ID
  const mapLanguage = (lang) =>
    ({ java: 62, python: 71, cpp: 54, javascript: 63 }[lang] || 62);

  // Sanitize HTML
  const sanitizeHtml = (html = "") =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

  // SINGLE TERMINAL RUN
  const runTerminal = async () => {
    if (!code.trim()) return alert("Write some code first!");

    setRunning(true);
    setOutput("⏳ Running…");

    try {
      const res = await fetch(JUDGE0_URL, {
        method: "POST",
        headers: {
          "x-rapidapi-key": JUDGE0_KEY,
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: stdin, // SINGLE INPUT SENT
        }),
      });

      const r = await res.json();

      setOutput(
        (r.stdout || r.stderr || r.compile_output || "No Output").trim()
      );
    } catch (err) {
      setOutput("⚠️ Error: " + err.message);
    }

    setRunning(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#0f172a] text-gray-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-0 z-20 flex justify-between items-center px-8 py-4 shadow-sm backdrop-blur-lg ${
          theme === "dark" ? "bg-[#1e293b]/80" : "bg-white/80"
        }`}
      >
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer hover:text-blue-500"
            size={20}
          />
          <h1 className="font-semibold text-lg">
            🚀 {challenge?.title || "Loading Challenge..."}
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-slate-700/30 hover:bg-slate-600/50 transition"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] overflow-hidden">
        {/* Left (Challenge Description) */}
        <div
          className={`w-full lg:w-1/2 p-8 overflow-y-auto border-r ${
            theme === "dark"
              ? "bg-[#0f172a] border-slate-800 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          {challenge ? (
            <>
              <h2 className="text-2xl font-bold mb-3">{challenge.title}</h2>
              <div
                className={`prose max-w-none text-[15px] leading-relaxed ${
                  theme === "dark" ? "prose-invert" : "prose-slate"
                }`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(challenge.body || ""),
                }}
              />
            </>
          ) : (
            <p>Loading…</p>
          )}
        </div>

        {/* Right (Editor + Terminal) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Editor */}
          <Editor
            theme={theme === "dark" ? "vs-dark" : "light"}
            height="55%"
            value={code}
            onChange={setCode}
            language={challenge?.language || "java"}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              wordWrap: "on",
              lineNumbers: "on",
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
            }}
          />

          {/* Terminal Input */}
          <div className="p-4 border-t border-slate-700 bg-slate-900/80 flex gap-2">
            <input
              type="text"
              placeholder="Enter input (press Enter)…"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runTerminal()}
              className="flex-1 px-3 py-2 rounded bg-slate-800 text-gray-200 outline-none"
            />

            <button
              onClick={runTerminal}
              disabled={running}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2"
            >
              {running ? <Loader2 className="animate-spin w-4 h-4" /> : <Play />}
              Run
            </button>
          </div>

          {/* Terminal Output */}
          <div className="p-4 font-mono text-sm overflow-auto bg-black text-green-400 h-full">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
