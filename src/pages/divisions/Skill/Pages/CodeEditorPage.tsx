// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Play,
  Loader2,
  CheckCircle2,
  Sun,
  Moon,
  BookOpen,
  FileText,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

const JUDGE0_URL =
  "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const JUDGE0_KEY = "ddad48de98mshcfa84bd23318ed6p1f81e1jsnbc11733943a9";

export default function CodeWorkspace({ user, supabase = lmsSupabaseClient }) {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const terminalRef = useRef();

  const [challenge, setChallenge] = useState(null);
  const [content, setContent] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [terminalInput, setTerminalInput] = useState("");
  const [languageId, setLanguageId] = useState(62);
  const [running, setRunning] = useState(false);
  const [theme, setTheme] = useState("light");

  const mapLanguage = (lang) =>
    ({ java: 62, python: 71, cpp: 54, javascript: 63 }[lang] || 62);

  const triggerConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    (function frame() {
      confetti({ particleCount: 7, spread: 60, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        // 1️⃣ Load main challenge
        const { data: cData, error: cError } = await supabase
          .from("code_challenges")
          .select("*")
          .eq("id", challengeId)
          .single();
        if (cError) throw cError;

        setChallenge(cData);
        setCode(cData.starter_code || cData.default_code || "");
        setLanguageId(mapLanguage(cData.language));

        // 2️⃣ Load related content (notes, assignments, challenges)
        const { data: contentData } = await supabase
          .from("content")
          .select("*")
          .eq("code_challenge_id", challengeId)
          .order("created_at", { ascending: true });
        setContent(contentData || []);

        // 3️⃣ Load test cases
        const { data: tests } = await supabase
          .from("test_cases")
          .select("input, expected_output")
          .eq("challenge_id", challengeId);
        setTestCases(tests || []);
      } catch (err) {
        console.error("Error fetching challenge:", err.message);
      }
    };
    fetchChallengeData();
  }, [challengeId]);

  // Unified run
  const runCode = async () => {
    if (!code.trim()) return setOutput("⚠️ Please write some code first!");

    setRunning(true);
    setOutput("⏳ Running your code...");
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
          stdin: terminalInput.trim() + "\n",
        }),
      });
      const result = await res.json();
      setOutput(
        (result.stdout || result.stderr || result.compile_output || "No output")
          .trim()
      );
    } catch (err) {
      setOutput("⚠️ Error: " + err.message);
    } finally {
      setRunning(false);
    }
  };

  // Run test cases
  const runTests = async () => {
    if (!testCases?.length) return runCode();

    setRunning(true);
    setOutput("⏳ Running test cases...");
    let passed = 0;

    for (const t of testCases) {
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
            stdin: t.input + "\n",
          }),
        });
        const r = await res.json();
        if ((r.stdout || "").trim() === t.expected_output.trim()) passed++;
      } catch {
        continue;
      }
    }

    setOutput(`✅ Passed ${passed}/${testCases.length} test cases.`);
    if (passed === testCases.length) triggerConfetti();
    setRunning(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      runCode();
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!challenge)
    return (
      <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg">
        <Loader2 className="animate-spin mr-2" /> Loading Challenge...
      </div>
    );

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-[#0f172a] text-gray-100"
          : "bg-[#f8fbff] text-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`sticky top-0 z-20 flex justify-between items-center px-6 py-4 shadow-sm border-b ${
          theme === "dark"
            ? "bg-[#1e293b]/90 border-slate-700"
            : "bg-white/80 backdrop-blur-md border-blue-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer hover:text-blue-600"
          />
          <h1 className="text-xl font-bold text-blue-700">
            {challenge.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={runTests}
            disabled={running}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded flex items-center gap-2 shadow-sm"
          >
            {running ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            Run Tests
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)]">
        {/* Left - Challenge Info */}
        <div
          className={`p-8 overflow-y-auto border-r ${
            theme === "dark" ? "border-slate-800" : "border-blue-100 bg-white"
          }`}
        >
          <motion.h2
            className="text-3xl font-extrabold mb-4 text-blue-700"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {challenge.title}
          </motion.h2>

          <p className="text-slate-700 leading-relaxed mb-6 text-base">
            {challenge.description}
          </p>

          {content
            .filter((c) => c.type === "note")
            .map((note) => (
              <div
                key={note.id}
                className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="text-blue-600 w-5 h-5" />
                  <h3 className="font-semibold text-blue-700">{note.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {note.body}
                </p>
              </div>
            ))}

          {content
            .filter((c) => c.type === "assignment")
            .map((a) => (
              <div
                key={a.id}
                className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-indigo-600 w-5 h-5" />
                  <h3 className="font-semibold text-indigo-700">{a.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {a.body}
                </p>
              </div>
            ))}

          {testCases.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-blue-500" /> Sample Test
                Cases
              </h3>
              <div className="space-y-3">
                {testCases.map((t, i) => (
                  <div
                    key={i}
                    className="bg-blue-50 border border-blue-100 rounded-lg p-3"
                  >
                    <p className="text-xs text-blue-700">
                      <strong>Input:</strong> {t.input}
                    </p>
                    <p className="text-xs text-green-700">
                      <strong>Expected:</strong> {t.expected_output}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right - Editor + Terminal */}
        <div className="flex flex-col border-l border-blue-100">
          <Editor
            height="55%"
            theme={theme === "dark" ? "vs-dark" : "light"}
            value={code}
            onChange={setCode}
            language={challenge.language || "java"}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              automaticLayout: true,
              padding: { top: 16 },
            }}
          />

          {/* Unified terminal */}
          <div className="flex flex-col flex-1 bg-[#0b1220] text-green-400 font-mono text-sm p-4">
            <div className="flex-1 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{output}</pre>
            </div>
            <div className="mt-3 border-t border-green-700/30 pt-2 flex items-center gap-2">
              <span className="text-green-400 text-xs">›</span>
              <input
                ref={terminalRef}
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type input here and press Enter to run..."
                className="flex-1 bg-transparent outline-none text-green-300 placeholder-green-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
