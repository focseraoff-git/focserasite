// @ts-nocheck
import { useEffect, useState } from "react";
import { Play, Send, Loader2, Sun, Moon } from "lucide-react";
import Editor from "@monaco-editor/react";
import confetti from "canvas-confetti";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

const JUDGE0_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const JUDGE0_KEY = "ddad48de98mshcfa84bd23318ed6p1f81e1jsnbc11733943a9"; // Replace with your RapidAPI key

export default function CodeEditorPage({ user, supabase = lmsSupabaseClient }) {
  const [challenge, setChallenge] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [code, setCode] = useState("");
  const [languageId, setLanguageId] = useState(62); // Java
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

  // 🎉 Confetti Celebration
  const triggerConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    (function frame() {
      confetti({ particleCount: 6, spread: 70, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  // 🧩 Fetch Challenge + Test Cases
  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const { data, error } = await supabase
          .from("content")
          .select("*, code_challenges(id, language, default_code, title, body)")
          .limit(1)
          .single();

        if (error || !data) {
          console.warn("⚠️ No challenge found. Loading fallback Hello World...");
          const fallback = {
            id: "demo-content",
            code_challenges: {
              id: "demo-challenge",
              title: "Day 1 Challenge: Hello, World!",
              language: "java",
              default_code:
                'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
              body: "<p>Write a complete Java program that prints <strong>Hello, World!</strong> to the console.</p>",
            },
          };
          setChallenge(fallback);
          setCode(fallback.code_challenges.default_code);
          setTestCases([{ input: "", expected_output: "Hello, World!" }]);
          return;
        }

        setChallenge(data);
        setCode(data?.code_challenges?.default_code || "");
        setLanguageId(mapLanguage(data?.code_challenges?.language));

        const { data: tc, error: tcError } = await supabase
          .from("test_cases")
          .select("input, expected_output")
          .eq("challenge_id", data?.code_challenges?.id);

        if (tcError) console.warn("⚠️ Test case fetch failed:", tcError.message);
        setTestCases(tc?.length ? tc : [{ input: "", expected_output: "Hello, World!" }]);
      } catch (err) {
        console.error("❌ Error fetching challenge:", err.message);
      }
    };

    fetchChallenge();
  }, []);

  const mapLanguage = (lang) =>
    ({ java: 62, python: 71, cpp: 54, javascript: 63 }[lang] || 62);

  // Minimal HTML sanitizer to remove <script> tags and inline event handlers.
  const sanitizeHtml = (html = "") => {
    if (!html) return "";
    let cleaned = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
    cleaned = cleaned.replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "");
    cleaned = cleaned.replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");
    return cleaned;
  };

  // 🧠 Run or Submit Code
  const handleRunCode = async (isSubmit = false) => {
    if (!code.trim()) return alert("Write some code first!");
    if (!testCases.length) return alert("No test cases available for this challenge.");
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
      setStatus(percent === 100 ? "success" : percent >= 60 ? "partial" : "failed");

      if (percent === 100) triggerConfetti();

      // 🧾 Save only if Submit clicked
      if (isSubmit && user) {
        const contentId =
          challenge?.id && challenge.id !== "demo-content" ? challenge.id : null;
        const challengeId =
          challenge?.code_challenges?.id &&
          challenge.code_challenges.id !== "demo-challenge"
            ? challenge.code_challenges.id
            : null;

        const { error } = await supabase.from("submissions").insert({
          user_id: user.id,
          content_id: contentId,
          challenge_id: challengeId,
          source_code: code,
          score: percent,
          status:
            percent === 100
              ? "passed"
              : percent >= 60
              ? "partial"
              : "failed",
          submitted_at: new Date().toISOString(),
        });

        if (error) console.error("❌ Submission error:", error.message);
        else console.log("✅ Submission saved successfully.");
      }
    } catch (err) {
      console.error("⚠️ Run error:", err.message);
      setOutput(`⚠️ Error: ${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  // 🖥️ UI
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#0f172a] text-gray-100"
          : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* HEADER */}
      <div
        className={`sticky top-0 z-20 flex justify-between items-center px-8 py-4 shadow-sm backdrop-blur-lg ${
          theme === "dark" ? "bg-[#1e293b]/80" : "bg-white/80"
        }`}
      >
        <h1 className="font-semibold text-lg flex items-center gap-2">
          🚀 {challenge?.code_challenges?.title || "Loading Challenge..."}
        </h1>

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

      {/* BODY */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-70px)] overflow-hidden">
        {/* LEFT SIDE */}
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
              <div className="h-4 bg-slate-700/40 rounded w-2/3"></div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-3">
                {challenge.code_challenges?.title}
              </h2>
              <div
                className={`prose max-w-none text-[15px] leading-relaxed ${
                  theme === "dark" ? "prose-invert" : "prose-slate"
                }`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(challenge.code_challenges?.body || ""),
                }}
              />

              <div className="my-6 border-t border-slate-600/30"></div>

              <div className="p-5 rounded-2xl border border-slate-600/40 bg-slate-800/30">
                <h3 className="text-lg font-semibold mb-3">
                  🧩 Example Input & Output
                </h3>
                {testCases.length ? (
                  testCases.map((t, i) => (
                    <div key={i} className="text-sm mb-3">
                      <pre className="bg-slate-900/60 rounded-lg p-3 text-gray-200">
                        <strong>Input:</strong> {t.input || "—"}{"\n"}
                        <strong>Expected:</strong> {t.expected_output || "—"}
                      </pre>
                    </div>
                  ))
                ) : (
                  <p className="italic text-gray-400 text-sm">
                    No example test cases available yet.
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <Editor
            theme={theme === "dark" ? "vs-dark" : "light"}
            height="55%"
            value={code}
            onChange={setCode}
            language={challenge?.code_challenges?.language || "java"}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              fontFamily: "JetBrains Mono",
            }}
          />

          {/* BUTTONS */}
          <div className="p-4 flex justify-end gap-3 border-t border-slate-700 bg-slate-900/80">
            <button
              onClick={() => handleRunCode(false)}
              disabled={running}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium text-white transition"
            >
              {running ? <Loader2 className="animate-spin w-4 h-4" /> : <Play size={18} />}
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

          {/* OUTPUT */}
          <div className="p-4 font-mono text-sm overflow-auto bg-slate-950 text-green-400">
            {Array.isArray(output) ? (
              output.map((t, i) => (
                <div key={i} className="mb-2">
                  <span>
                    Test {i + 1}:{" "}
                    {t.success ? (
                      <span className="text-green-400 font-semibold">✅ Passed</span>
                    ) : (
                      <span className="text-red-400 font-semibold">❌ Failed</span>
                    )}
                  </span>
                  <pre className="text-gray-400 text-xs">
                    Expected: {t.expected_output}
                    {"\n"}
                    Got: {t.got || "(No output)"}
                  </pre>
                </div>
              ))
            ) : (
              <span>{output}</span>
            )}
          </div>
        </div>
      </div>

      {/* STATUS BAR */}
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
        </div>
      )}
    </div>
  );
}
