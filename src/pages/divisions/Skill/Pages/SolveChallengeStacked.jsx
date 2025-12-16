// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Sun,
  Moon,
  ListChecks,
  Star,
  Sparkles,
  Clock,
  Zap,
  FileInput,
  FileOutput,
  Lightbulb,
  Keyboard,
  ShieldAlert
} from "lucide-react";

import { lmsSupabaseClient } from "../../../../lib/ssupabase"; // Verify path

// ----------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?basencoded=false&wait=true";
const JUDGE0_KEY = "ddad48de98mshcfa84bd23318ed6p1f81e1jsnbc11733943a9"; // Replace with your key

export default function SolveChallengeStacked({ user, supabase = lmsSupabaseClient }) {
  const { challengeId } = useParams();
  const navigate = useNavigate();

  // --------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------
  const [challenge, setChallenge] = useState(null);
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("java");
  const [languageId, setLanguageId] = useState(62);

  // Test Case State
  const [testCases, setTestCases] = useState([]);
  const [sampleTest, setSampleTest] = useState(null);
  const [visibleTests, setVisibleTests] = useState([]);
  const [hiddenLocked, setHiddenLocked] = useState(true);
  const [testResults, setTestResults] = useState([]);

  // Execution State
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [customInput, setCustomInput] = useState("");

  // UI State
  const [theme, setTheme] = useState("light");
  const [coins, setCoins] = useState(() => Number(localStorage.getItem("focsera_coins") || 0));
  const [openSections, setOpenSections] = useState({ sample: true, hint: false, tests: true });

  // --------------------------------------------------------------------
  // 🔥 ANTI-CHEAT: PREVENT COPY / PASTE / CONTEXT MENU
  // --------------------------------------------------------------------
  const preventCheating = (e) => {
    e.preventDefault();
    // Optional: You can show a toast or alert here
    // alert("⚠️ Anti-Cheating Mode Enabled: Action Disabled.");
    return false;
  };

  // --------------------------------------------------------------------
  // HELPERS
  // --------------------------------------------------------------------
  const mapLanguage = (lang) => ({ java: 62, python: 71, cpp: 54, javascript: 63 }[lang] || 62);

  const sanitizeHtml = (html = "") =>
    html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
      .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

  // --------------------------------------------------------------------
  // DATA FETCHING (Using the SQL structure we created)
  // --------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      if (!challengeId) return;

      try {
        // 1. Fetch Challenge Details
        const { data: cData, error: cErr } = await supabase
          .from("code_challenges")
          .select("*")
          .eq("id", challengeId)
          .single();

        if (cErr) throw cErr;

        setChallenge(cData);
        setDescriptionHtml(cData.description || "");

        // Set starter code only if editor is empty
        if (!code) {
          setCode(cData.default_code || cData.starter_code || "");
        }

        const initialLang = cData.language || "java";
        setLanguage(initialLang);
        setLanguageId(mapLanguage(initialLang));

        // 2. Fetch Test Cases
        const { data: tests, error: tErr } = await supabase
          .from("test_cases")
          .select("id, input, expected_output, hidden, hint")
          .eq("challenge_id", challengeId)
          .order("hidden", { ascending: true })
          .order("id", { ascending: true });

        if (tErr) console.warn("Test case fetch warning:", tErr);

        // 3. Process Test Cases
        const prepared = (tests || []).map((t) => ({
          ...t,
          status: "idle",
          stdout: "",
          // Ensure inputs are strings and trim whitespace safely
          input: typeof t.input === 'object' ? JSON.stringify(t.input) : String(t.input || ""),
          expected_output: String(t.expected_output || "").trim()
        }));

        setTestCases(prepared);

        // Separate Sample vs Hidden
        const firstVisible = prepared.find((t) => !t.hidden);
        const otherVisible = prepared
          .filter((t) => !t.hidden && t.id !== firstVisible?.id)
          .slice(0, 4);

        setSampleTest(firstVisible || null);
        setVisibleTests(otherVisible);

      } catch (err) {
        console.error("Critical Error:", err);
        setOutput(`Error loading challenge: ${err.message}`);
      }
    };

    fetchData();
  }, [challengeId, supabase]);

  // --------------------------------------------------------------------
  // CODE EXECUTION LOGIC
  // --------------------------------------------------------------------
  const awardCoins = (n = 20) => {
    const newCoins = coins + n;
    setCoins(newCoins);
    localStorage.setItem("focsera_coins", String(newCoins));
  };

  const submitToJudge0 = async (stdin = "") => {
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
        stdin: (stdin || "").trim() + "\n", // Trim stdin to avoid trailing newline issues
      }),
    });
    return await res.json();
  };

  const runCode = async () => {
    if (!code.trim()) return setOutput("⚠️ Please write some code first!");
    setRunning(true);
    setOutput("⏳ Running your code...");
    try {
      const result = await submitToJudge0(customInput);
      const out = (result.stdout || result.stderr || result.compile_output || "").trim();
      setOutput(out || "No output returned.");
    } catch (err) {
      setOutput("⚠️ Execution Error: " + err.message);
    } finally {
      setRunning(false);
    }
  };

  const runTests = async () => {
    const toRun = testCases.filter((t) => !t.hidden);
    if (!toRun.length) return setOutput("No visible test cases to run.");

    setRunning(true);
    setOutput("⏳ Running test cases...");
    setTestResults([]);
    let passed = 0;

    for (const t of toRun) {
      try {
        const res = await submitToJudge0(t.input);
        const stdout = (res.stdout || "").trim();
        const expected = (t.expected_output || "").trim();

        // Simple string comparison
        const status = stdout === expected ? "passed" : "failed";
        if (status === "passed") passed++;

        setTestResults((prev) => [...prev.filter(p => p.id !== t.id), { ...t, stdout, status }]);
      } catch (err) {
        setTestResults((prev) => [...prev.filter(p => p.id !== t.id), { ...t, stdout: "Error", status: "error" }]);
      }
    }

    setOutput(`✅ Passed ${passed}/${toRun.length} visible test cases.`);

    if (passed === toRun.length && toRun.length > 0) {
      if (hiddenLocked) {
        awardCoins(50);
        setHiddenLocked(false); // Unlock hidden tests
      }
    }
    setRunning(false);
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // --------------------------------------------------------------------
  // STYLES
  // --------------------------------------------------------------------
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#07143a]" : "bg-[#f8fbff]";
  const cardBg = isDark ? "bg-[#1e293b]" : "bg-white/60";
  const cardBorder = isDark ? "border-blue-800" : "border-blue-100";
  const primaryText = isDark ? "text-blue-300" : "text-blue-700";
  const secondaryText = isDark ? "text-gray-400" : "text-slate-700";

  if (!challenge) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <Star className="w-16 h-16 text-yellow-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 ${bgColor} relative overflow-hidden select-none`}
      // 🔥 ANTI-CHEAT EVENT HANDLERS ON MAIN WRAPPER
      onCopy={preventCheating}
      onCut={preventCheating}
      onPaste={preventCheating}
      onContextMenu={preventCheating}
    >
      {/* Header */}
      <motion.div initial={{ y: -60 }} animate={{ y: 0 }} className="max-w-[1400px] mx-auto flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/10 transition">
            <ArrowLeft className={primaryText} size={24} />
          </motion.button>
          <div>
            <h1 className={`text-2xl font-bold ${primaryText}`}>{challenge.title}</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mt-1">
              <ShieldAlert size={12} className="text-red-500" /> Anti-Cheating Enabled
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} className={`px-4 py-2 rounded-lg ${cardBg} border ${cardBorder} flex items-center gap-2 shadow-sm`}>
            <Star className="text-yellow-400 w-5 h-5" /><span className="font-bold text-lg">{coins}</span>
          </motion.div>
          <motion.button whileHover={{ rotate: 180 }} onClick={() => setTheme(isDark ? "light" : "dark")} className="p-3 rounded-full bg-blue-600 shadow-lg shadow-blue-500/30 text-white">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runCode} disabled={running}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/30">
            <Play size={20} fill="currentColor" /> {running ? "Running..." : "Run Code"}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">

        {/* LEFT PANEL: Problem Statement & Test Cases */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600/20">

          {/* Description Card */}
          <div className={`${cardBg} rounded-2xl p-6 shadow-sm border ${cardBorder}`}>
            <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${primaryText}`}>
              Problem Statement
            </h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptionHtml) }} className={`prose prose-sm max-w-none ${isDark ? "prose-invert" : ""}`} />
          </div>

          {/* I/O Format Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`${cardBg} rounded-xl p-4 border ${cardBorder}`}>
              <h3 className={`font-semibold text-sm flex items-center gap-2 mb-2 ${primaryText}`}><FileInput size={16} /> Input Format</h3>
              <div className={`text-xs ${secondaryText}`}>{challenge.input_format || "Standard input (stdin)"}</div>
            </div>

            <div className={`${cardBg} rounded-xl p-4 border ${cardBorder}`}>
              <h3 className={`font-semibold text-sm flex items-center gap-2 mb-2 text-green-600`}><FileOutput size={16} /> Output Format</h3>
              <div className={`text-xs ${secondaryText}`}>{challenge.output_format || "Standard output (stdout)"}</div>
            </div>
          </div>

          {/* Sample Input/Output */}
          {sampleTest && (
            <motion.div className={`${cardBg} rounded-xl p-6 border ${cardBorder}`}>
              <button onClick={() => toggleSection("sample")} className="w-full flex justify-between items-center mb-3">
                <h3 className={`font-semibold flex items-center gap-2 ${primaryText}`}>Sample Input & Output</h3>
                <span className="text-2xl">{openSections.sample ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {openSections.sample && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-blue-600 mb-1">Sample Input</div>
                      <pre className={`p-3 rounded bg-black/10 font-mono text-sm ${secondaryText} whitespace-pre-wrap`}>{sampleTest.input}</pre>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-green-600 mb-1">Sample Output</div>
                      <pre className={`p-3 rounded bg-black/10 font-mono text-sm ${secondaryText} whitespace-pre-wrap`}>{sampleTest.expected_output}</pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Hint */}
          {sampleTest?.hint && (
            <div className={`${cardBg} rounded-xl p-4 border ${cardBorder} flex items-start gap-3`}>
              <Lightbulb className="text-yellow-500 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-yellow-600 mb-1">Hint</h4>
                <p className={`text-xs ${secondaryText} italic`}>{sampleTest.hint}</p>
              </div>
            </div>
          )}

          {/* Test Cases List */}
          <div className={`${cardBg} rounded-xl p-6 border ${cardBorder}`}>
            <button onClick={() => toggleSection("tests")} className="w-full flex justify-between items-center mb-3">
              <h3 className={`font-semibold flex items-center gap-2 ${primaryText}`}><ListChecks size={20} /> Test Cases</h3>
              <span className="text-2xl">{openSections.tests ? "−" : "+"}</span>
            </button>
            <AnimatePresence>
              {openSections.tests && (
                <div className="space-y-3">
                  {/* Visible Tests */}
                  {visibleTests.map((t, i) => {
                    const res = testResults.find(r => r.id === t.id) || t;
                    const isPassed = res.status === "passed";
                    const isFailed = res.status === "failed";

                    return (
                      <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className={`p-3 rounded-lg border flex items-center justify-between text-xs
                        ${isPassed ? "bg-green-500/10 border-green-500/30" : isFailed ? "bg-red-500/10 border-red-500/30" : isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>

                        <div className="flex flex-col gap-1">
                          <span className="font-bold">Test Case {i + 1}</span>
                          <span className="opacity-70">Input: {t.input}</span>
                          {res.stdout && <span className={`${isPassed ? "text-green-500" : "text-red-500"}`}>Output: {res.stdout}</span>}
                        </div>

                        {isPassed && <Sparkles size={16} className="text-green-500" />}
                        {isFailed && <span className="text-red-500 font-bold">FAILED</span>}
                      </motion.div>
                    );
                  })}

                  {/* Hidden Tests */}
                  {testCases.filter(t => t.hidden).map((t, i) => (
                    <div key={t.id} className={`p-3 rounded-lg border text-xs flex items-center gap-3 transition-all duration-300
                        ${hiddenLocked
                        ? "bg-gray-800/50 border-gray-600 text-gray-400"
                        : "bg-purple-900/10 border-purple-500/30 text-purple-600"}`}>

                      {hiddenLocked ? (
                        <>
                          <span>🔒</span>
                          <strong>Hidden Test Case {i + 1}</strong>
                        </>
                      ) : (
                        <>
                          <span>🔓</span>
                          <div>
                            <strong>Hidden Test Case {i + 1} Unlocked!</strong>
                            <div className="opacity-70 mt-1">Input: {t.input}</div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* RIGHT PANEL: Editor + Terminal */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4 h-full">

          {/* Editor Container */}
          <div className={`rounded-xl overflow-hidden border shadow-sm flex flex-col flex-grow ${cardBorder} ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}>
            {/* Editor Toolbar */}
            <div className="flex justify-between p-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white shrink-0">
              <select value={language} onChange={(e) => { setLanguage(e.target.value); setLanguageId(mapLanguage(e.target.value)); }}
                className="bg-white/10 text-xs rounded px-3 py-1 outline-none border border-white/10 hover:bg-white/20 transition">
                <option value="java">Java (JDK 17)</option>
                <option value="python">Python 3</option>
                <option value="cpp">C++ (GCC)</option>
                <option value="javascript">JavaScript (Node)</option>
              </select>
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.05 }} onClick={runTests} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium border border-white/10 transition">
                  Run All Tests
                </motion.button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-grow relative">
              <Editor
                height="100%"
                theme={isDark ? "vs-dark" : "light"}
                language={language}
                value={code}
                onChange={setCode}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 10 },
                  contextmenu: false // Disable right click inside editor
                }}
              />
            </div>
          </div>

          {/* Custom Input */}
          <div className={`rounded-xl border flex flex-col overflow-hidden shrink-0 ${cardBorder} ${isDark ? "bg-[#0f172a]" : "bg-white"}`}>
            <div className={`px-4 py-2 border-b text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? "border-slate-700 text-blue-400" : "border-gray-200 text-gray-500"}`}>
              <Keyboard size={14} /> Custom Input (stdin)
            </div>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter custom input here..."
              className={`w-full h-20 p-3 bg-transparent outline-none font-mono text-sm resize-none ${isDark ? "text-gray-300 placeholder-gray-600" : "text-gray-800 placeholder-gray-400"}`}
            />
          </div>

          {/* Output Console */}
          <div className="bg-[#0c0c0c] text-green-400 p-4 rounded-xl font-mono h-40 border border-gray-800 overflow-auto shrink-0 shadow-inner relative">
            <div className="flex justify-between text-xs text-gray-500 mb-2 sticky top-0 bg-[#0c0c0c]/90 backdrop-blur-sm pb-2 border-b border-gray-800">
              <span>Console Output</span>
              <button onClick={() => setOutput("")} className="hover:text-white transition-colors">Clear</button>
            </div>
            <pre className="whitespace-pre-wrap text-sm">{output || <span className="text-gray-600 italic">Run your code to see output...</span>}</pre>
          </div>

        </motion.div>
      </div>
    </div>
  );
}