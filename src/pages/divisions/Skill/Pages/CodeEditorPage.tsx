// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Send, Loader2, Sun, Moon, ArrowLeft } from "lucide-react";
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
  const [testCases, setTestCases] = useState([]);
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState(62);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // 🌗 Toggle Theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // 🎉 Confetti on success
  const triggerConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    (function frame() {
      confetti({ particleCount: 6, spread: 70, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // 🧱 Fallback challenge (offline)
  const loadFallback = () => {
    const fallback = {
      id: "demo-challenge",
      title: "Day 1: Hello World Challenge",
      language: "java",
      default_code:
        'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
      body: "<p>Write a Java program that prints <strong>Hello, World!</strong> to the console.</p>",
    };
    setChallenge(fallback);
    setCode(fallback.default_code);
    setTestCases([{ input: "", expected_output: "Hello, World!" }]);
  };

  // 🧠 Fetch Challenge Data
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        if (!challengeId) {
          console.warn("⚠️ No challengeId — using fallback");
          return loadFallback();
        }

        const { data: challengeData, error } = await supabase
          .from("code_challenges")
          .select(
            "id, title, description, language, starter_code, default_code"
          )
          .eq("id", challengeId)
          .single();

        if (error || !challengeData) {
          console.warn("⚠️ Challenge not found:", error?.message);
          return loadFallback();
        }

        setChallenge(challengeData);
        setCode(challengeData.starter_code || challengeData.default_code);
        setLanguageId(mapLanguage(challengeData.language));

        const { data: tcData } = await supabase
          .from("test_cases")
          .select("input, expected_output")
          .eq("challenge_id", challengeData.id);

        setTestCases(
          tcData?.length
            ? tcData
            : [{ input: "", expected_output: "Hello, World!" }]
        );
      } catch (err) {
        console.error("❌ Error fetching challenge:", err.message);
        loadFallback();
      }
    };

    fetchChallenge();
  }, [challengeId, supabase]);

  // 🔤 Map language to Judge0 ID
  const mapLanguage = (lang) =>
    ({ java: 62, python: 71, cpp: 54, javascript: 63 }[lang] || 62);

  // 🧼 Sanitize HTML safely
  const sanitizeHtml = (html = "") =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

  // ▶️ Run or Submit Code
  const handleRunCode = async (isSubmit = false) => {
    if (!code.trim()) return alert("Write some code first!");
    if (!testCases.length) return alert("No test cases available.");

    setRunning(true);
    setOutput("⏳ Running your code...");
    setStatus("");
    let passed = 0;

    try {
      const results = await Promise.all(
        testCases.map(async (t) => {
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
              stdin: t.input || "",
            }),
          });

          const r = await res.json();
          const out = (r.stdout || r.stderr || r.compile_output || "").trim();
          const expected = (t.expected_output || "").trim();
          const success = out === expected;
          if (success) passed++;
          return { ...t, got: out, success };
        })
      );

      const percent = Math.round((passed / testCases.length) * 100);
      setScore(percent);
      setOutput(results);
      setStatus(
        percent === 100 ? "success" : percent >= 60 ? "partial" : "failed"
      );

      if (percent === 100) triggerConfetti();
    } catch (err) {
      setOutput(`⚠️ Error: ${err.message}`);
    } finally {
      setRunning(false);
    }
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

        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-slate-700/30 hover:bg-slate-600/50 transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              theme === "dark"
                ? "bg-blue-600/20 text-blue-300"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            Score: {score}%
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] overflow-hidden">
        {/* Left Panel */}
        <div
          className={`w-full lg:w-1/2 p-8 overflow-y-auto border-r ${
            theme === "dark"
              ? "bg-[#0f172a] border-slate-800 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }`}
        >
          {!challenge ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-slate-700/40 rounded w-1/2"></div>
              <div className="h-4 bg-slate-700/40 rounded w-3/4"></div>
            </div>
          ) : (
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

              <div className="my-6 border-t border-slate-600/30"></div>

              <h3 className="text-lg font-semibold mb-3">
                🧩 Example Input & Output
              </h3>
              {testCases.length ? (
                testCases.map((t, i) => (
                  <pre
                    key={i}
                    className="bg-slate-900/60 rounded-lg p-3 text-gray-200 text-sm mb-3"
                  >
                    <strong>Input:</strong> {t.input || "—"}
                    {"\n"}
                    <strong>Expected:</strong> {t.expected_output || "—"}
                  </pre>
                ))
              ) : (
                <p className="italic text-gray-400 text-sm">
                  No example test cases.
                </p>
              )}
            </>
          )}
        </div>

        {/* Right Panel (Editor + Output) */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <Editor
            theme={theme === "dark" ? "vs-dark" : "light"}
            height="55%"
            value={code}
            onChange={setCode}
            language={challenge?.language || "java"}
            options={{
              fontSize: 15,
              fontFamily: "JetBrains Mono, monospace",
              minimap: { enabled: false },
              wordWrap: "on",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
              renderWhitespace: "none",
              smoothScrolling: true,
              scrollbar: { horizontal: "hidden" },
            }}
          />

          <div className="p-4 flex justify-end gap-3 border-t border-slate-700 bg-slate-900/80">
            <button
              onClick={() => handleRunCode(false)}
              disabled={running}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium text-white transition"
            >
              {running ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Play size={18} />
              )}
              Run
            </button>
            <button
              onClick={() => handleRunCode(true)}
              disabled={running}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium text-white transition"
            >
              <Send size={18} /> Submit
            </button>
          </div>

          <div className="p-4 font-mono text-sm overflow-auto bg-slate-950 text-green-400">
            {Array.isArray(output)
              ? output.map((t, i) => (
                  <div key={i} className="mb-2">
                    Test {i + 1}:{" "}
                    {t.success ? (
                      <span className="text-green-400">✅ Passed</span>
                    ) : (
                      <span className="text-red-400">❌ Failed</span>
                    )}
                    <pre className="text-gray-400 text-xs">
                      Expected: {t.expected_output}
                      {"\n"}
                      Got: {t.got || "(No output)"}
                    </pre>
                  </div>
                ))
              : output}
          </div>
        </div>
      </div>

      {/* Status Footer */}
      {status && (
        <div
          className={`w-full text-center py-3 font-medium ${
            status === "success"
              ? "bg-green-600/20 text-green-300"
              : status === "failed"
              ? "bg-red-600/20 text-red-300"
              : "bg-yellow-600/20 text-yellow-300"
          }`}
        >
          {status === "success"
            ? "🎉 All test cases passed!"
            : status === "failed"
            ? "❌ Test cases failed. Try again."
            : "⚠️ Partial success — review your code."}

          {/* 💡 Optional Show Solution Button */}
          {status === "success" && (
            <button
              onClick={() => setCode(challenge.default_code)}
              className="ml-3 px-3 py-1 text-sm bg-blue-700 hover:bg-blue-800 rounded-md text-white"
            >
              💡 Show Solution
            </button>
          )}
        </div>
      )}
    </div>
  );
}
