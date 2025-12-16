// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    Play,
    Sun,
    Moon,
    ListChecks,
    Copy,
    Star,
    Sparkles,
    Clock,
    Zap,
    FileInput,
    FileOutput,
    Lightbulb,
    Keyboard,
    ShieldAlert,
    AlertTriangle,
    Lock,
    CheckCircle2,
    WifiOff,
    Send,
    Maximize2
} from "lucide-react";

import { lmsSupabaseClient } from "../../../../lib/ssupabase";

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?basencoded=false&wait=true";
const JUDGE0_KEY = "ddad48de98mshcfa84bd23f81e1jsnbc11733943a9"; // Replace with environmental variable in prod

// EXAM CONFIGURATION
const EXAM_DURATION_SEQ = 25 * 60; // 25 minutes
const MAX_WARNINGS = 3;
const LOCKOUT_DURATION = 5 * 60; // 5 minutes

export default function SolveChallengeStacked({ user, supabase = lmsSupabaseClient }) {
    const { challengeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isExamMode = searchParams.get("mode") === "exam";

    // --- Exam State ---
    const [examStarted, setExamStarted] = useState(false);
    const [examFinished, setExamFinished] = useState(false);
    const [instructionsAccepted, setInstructionsAccepted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SEQ);
    const [warnings, setWarnings] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockTimeLeft, setLockTimeLeft] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // --- Standard Challenge State ---
    const [challenge, setChallenge] = useState(null);
    const [descriptionHtml, setDescriptionHtml] = useState("");
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("java");
    const [languageId, setLanguageId] = useState(62);
    const [testCases, setTestCases] = useState([]);
    const [sampleTest, setSampleTest] = useState(null);
    const [visibleTests, setVisibleTests] = useState([]);
    const [hiddenLocked, setHiddenLocked] = useState(true);
    const [testResults, setTestResults] = useState([]);
    const [running, setRunning] = useState(false);
    const [output, setOutput] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [theme, setTheme] = useState("light");
    const [coins, setCoins] = useState(() => Number(localStorage.getItem("focsera_coins") || 0));
    const [openSections, setOpenSections] = useState({ sample: true, hint: false, tests: false });

    const mapLanguage = (lang) => ({ java: 62, python: 71, cpp: 54, javascript: 63 }[lang] || 62);

    const sanitizeHtml = (html = "") =>
        html
            .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
            .replace(/\son[a-z]+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)/gi, "")
            .replace(/(href|src)\s*=\s*(\"|')\s*javascript:[^\"']*(\"|')/gi, "");

    // ---------------------------------------------------------------------------
    // EXAM LOGIC: Strict Security (Conditional)
    // ---------------------------------------------------------------------------

    // Start Handling
    const startExam = () => {
        // 1. Enter Fullscreen
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.log(err));
        }
        setExamStarted(true);
    };

    // Security Monitoring
    useEffect(() => {
        // Only run strict security logic if in Exam Mode
        if (!isExamMode) return;

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        if (!examStarted || isLocked || examFinished) return;

        const triggerWarning = () => {
            setWarnings(prev => {
                const newCount = prev + 1;
                if (newCount >= MAX_WARNINGS) {
                    handleLockout();
                }
                return newCount;
            });
        };

        // 1. Visibility (Tab Switch)
        const handleVisibilityChange = () => {
            if (document.hidden) triggerWarning();
        };

        // 2. Blur (Loss of Focus / Alt+Tab)
        const handleBlur = () => {
            triggerWarning();
        };

        // 3. Fullscreen Exit
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                triggerWarning();
            }
        };

        // 4. Input Blocking (Copy/Paste/Keys)
        const preventSensitiveActions = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        const handleKeyDown = (e) => {
            // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, F12, Ctrl+Shift+I
            if (
                (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'a' || e.key === 'p')) ||
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I')
            ) {
                e.preventDefault();
                e.stopPropagation();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        // Aggressive Event Capture (UseCapture = true)
        document.addEventListener("copy", preventSensitiveActions, true);
        document.addEventListener("paste", preventSensitiveActions, true);
        document.addEventListener("cut", preventSensitiveActions, true);
        document.addEventListener("contextmenu", preventSensitiveActions, true); // Right click
        document.addEventListener("keydown", handleKeyDown, true);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);

            document.removeEventListener("copy", preventSensitiveActions, true);
            document.removeEventListener("paste", preventSensitiveActions, true);
            document.removeEventListener("cut", preventSensitiveActions, true);
            document.removeEventListener("contextmenu", preventSensitiveActions, true);
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [examStarted, isLocked, examFinished, isExamMode]);

    const handleLockout = () => {
        setIsLocked(true);
        setLockTimeLeft(LOCKOUT_DURATION);
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(e => { });
        }
    };



    // ---------------------------------------------------------------------------
    // TIMERS
    // ---------------------------------------------------------------------------
    useEffect(() => {
        let interval;
        // Only run countdown if strict exam mode
        if (isExamMode && examStarted && !isLocked && !examFinished && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        submitExam();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [examStarted, isLocked, examFinished, timeLeft, isExamMode]);

    useEffect(() => {
        let interval;
        if (isLocked && lockTimeLeft > 0) {
            interval = setInterval(() => {
                setLockTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsLocked(false);
                        setWarnings(0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isLocked, lockTimeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // ---------------------------------------------------------------------------
    // DATA FETCHING
    // ---------------------------------------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: cData, error: cErr } = await supabase
                    .from("code_challenges")
                    .select("*")
                    .eq("id", challengeId)
                    .single();
                if (cErr) throw cErr;
                setChallenge(cData);
                setDescriptionHtml(cData.description || "");
                setCode(cData.starter_code || cData.default_code || "");
                const initialLang = cData.language || "java";
                setLanguage(initialLang);
                setLanguageId(mapLanguage(initialLang));

                const { data: tests, error: tErr } = await supabase
                    .from("test_cases")
                    .select("id, input, expected_output, hidden, hint")
                    .eq("challenge_id", challengeId)
                    .order("id", { ascending: true });

                if (tErr) throw tErr;

                let preparedRaw = tests || [];

                // User Restriction: Strictly use Supabase tests only. No hardcoded fallbacks.
                if (preparedRaw.length === 0) {
                    console.warn("⚠️ No tests found in Supabase for this challenge.");
                }

                const prepared = preparedRaw.map((t) => ({ ...t, status: "idle", stdout: "" }));
                setTestCases(prepared);

                const firstVisible = prepared.find((t) => !t.hidden);
                setSampleTest(firstVisible || null);
                setVisibleTests(prepared.filter((t) => !t.hidden && t.id !== firstVisible?.id).slice(0, 4));
            } catch (err) {
                console.error("Error loading challenge:", err);
            }
        };
        if (challengeId) fetchData();
    }, [challengeId, supabase]);

    const awardCoins = (n = 20) => {
        const newCoins = coins + n;
        setCoins(newCoins);
        localStorage.setItem("focsera_coins", String(newCoins));
    };

    // PISTON API (Free Tier, No Key)
    const runPiston = async (stdin = "") => {
        const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

        // Map language IDs/Names to Piston versions
        // Piston expects { language: "java", version: "15.0.2" } etc.
        let pistonLang = (language || "java").toLowerCase();
        if (pistonLang === "cpp") pistonLang = "c++";
        if (pistonLang === "javascript") pistonLang = "javascript"; // Node

        console.log(`🚀 Executing Piston: Lang=[${pistonLang}] CodeLen=[${code.length}] Stdin=[${stdin}]`);

        // We can just pass "version": "*" to use latest

        // Determine filename based on language to avoid compiler errors (especially Java)
        let fileName = "source";
        if (pistonLang === "java") fileName = "Main.java";
        if (pistonLang === "python") fileName = "main.py";
        if (pistonLang === "c++" || pistonLang === "cpp") fileName = "main.cpp";
        if (pistonLang === "javascript") fileName = "index.js";

        try {
            const res = await fetch(PISTON_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: pistonLang,
                    version: "*",
                    files: [{ name: fileName, content: code }],
                    stdin: stdin || "",
                    args: [],
                    compile_timeout: 10000,
                    run_timeout: 3000,
                    compile_memory_limit: -1,
                    run_memory_limit: -1
                })
            });

            if (!res.ok) throw new Error(`Piston API Error ${res.status}`);
            const data = await res.json();
            // Piston returns { run: { stdout: "...", stderr: "...", code: 0 }, compile: { ... } }

            if (data.message) throw new Error(data.message); // API level error

            // Normalize response to match what our UI expects (stdout, stderr)
            const stdout = data.run.stdout || "";
            const stderr = data.run.stderr || "";
            const compileOut = data.compile ? (data.compile.stdout + data.compile.stderr) : "";

            return {
                stdout: stdout,
                stderr: stderr,
                compile_output: compileOut,
                // If both are empty and there's a compile error, usually stderr or compile_output has it
            };

        } catch (err) {
            console.warn("Piston Execution Failed:", err);
            // Fallback to Simulation if Piston fails too?
            // Or just throw to let runCode handle it
            throw err;
        }
    };

    // Wrapper to keep existing calls working
    const submitToJudge0 = async (stdin) => {
        return await runPiston(stdin);
    };

    const runCode = async () => {
        if (!code.trim()) return setOutput("⚠️ Please write some code first!");
        setRunning(true);
        setOutput("⏳ Running your code...");
        try {
            const result = await submitToJudge0(customInput);
            console.log("Judge0 Raw Response:", result); // Debugging

            if (result.message) {
                // Handle API Gateway errors (e.g., Limit Exceeded, Invalid Key)
                setOutput(`⚠️ API Error: ${result.message}`);
                return;
            }

            if (result.error) {
                setOutput(`⚠️ Judge Error: ${result.error}`);
                return;
            }

            const out = (result.stdout || result.stderr || result.compile_output || "").trim();
            setOutput(out || "No output returned from server.");
        } catch (err) {
            console.error("Run Error:", err);
            setOutput("⚠️ Client Error: " + err.message);
        } finally {
            setRunning(false);
        }
    };

    const runTests = async () => {
        const toRun = testCases.filter((t) => !t.hidden);
        if (!toRun.length) return setOutput("No visible test cases.");

        setRunning(true);
        setOutput("⏳ Running test cases...");
        setTestResults([]);
        let passed = 0;

        for (const t of toRun) {
            try {
                const res = await submitToJudge0(t.input);
                const stdout = (res.stdout || "").trim();
                const expected = (t.expected_output || "").trim();
                const status = stdout === expected ? "passed" : "failed";
                if (status === "passed") passed++;
                setTestResults((prev) => [...prev.filter(p => p.id !== t.id), { ...t, stdout, status }]);
            } catch (err) {
                setTestResults((prev) => [...prev.filter(p => p.id !== t.id), { ...t, stdout: "", status: "error" }]);
            }
        }

        setOutput(`✅ Passed ${passed}/${toRun.length} test cases.`);
        if (passed === toRun.length && toRun.length > 0) {
            awardCoins(30);
            setHiddenLocked(false);
        }
        setRunning(false);
    };


    // ---------------------------------------------------------------------------
    // EXAM SUBMISSION
    // ---------------------------------------------------------------------------
    // ---------------------------------------------------------------------------
    // EXAM SUBMISSION
    // ---------------------------------------------------------------------------
    const submitExam = async () => {
        try {
            if (!code.trim()) {
                alert("Please write some code first!");
                return;
            }
            setRunning(true);
            setOutput("📝 Grading your submission...");
            console.log("🚀 Starting Exam Submission Process...");

            // 1. AUTO-GRADE: Run all visible test cases fresh
            const testsToRun = testCases.filter(t => !t.hidden);
            console.log(`Running ${testsToRun.length} tests for grading...`);

            const checkApproximateMatch = (actual, expected) => {
                if (actual === expected) return true;
                const extractNums = (s) => (s.match(/-?\d+/g) || []).map(Number).sort((a, b) => a - b);
                const numsA = extractNums(actual);
                const numsB = extractNums(expected);
                if (numsA.length === 0 || numsB.length === 0) return false;
                if (numsA.length !== numsB.length) return false;
                return numsA.every((val, idx) => val === numsB[idx]);
            };

            let passCount = 0;
            const gradedResults = [];
            let report = "📝 GRADING REPORT:\n-------------------\n";

            for (const t of testsToRun) {
                try {
                    const res = await submitToJudge0(t.input);
                    const actualRaw = (res.stdout || "").trim();
                    const stderrRaw = (res.stderr || res.compile_output || "").trim();
                    const expectedRaw = (t.expected_output || "").trim();

                    const isPass = checkApproximateMatch(actualRaw, expectedRaw);

                    if (isPass) passCount++;

                    gradedResults.push({
                        ...t,
                        stdout: actualRaw || stderrRaw,
                        status: isPass ? "passed" : "failed"
                    });

                    report += `\nTest Case ${t.id}:\n`;
                    report += `Input: ${t.input.replace(/\n/g, ' ')}\n`;
                    report += `Your Output: "${actualRaw}"\n`;
                    if (stderrRaw) report += `⚠️ Error Output: "${stderrRaw}"\n`;
                    report += `Expected:  "${expectedRaw}"\n`;
                    report += `Status: ${isPass ? "✅ PASS" : "❌ FAIL"}\n`;

                } catch (e) {
                    console.error("Test Error", e);
                    gradedResults.push({ ...t, status: "error" });
                    report += `\nTest Case ${t.id}: ⚠️ ERROR (Execution Failed)\n`;
                }
            }

            // 2. Calculate Score
            const totalTests = testsToRun.length || 1;
            const score = Math.round((passCount / totalTests) * 100);
            console.log(`Grading Complete. Score: ${score}/100`);

            report += `\n-------------------\nFINAL SCORE: ${score}/100`;
            setOutput(report);
            setTestResults(prev => testCases.map(t => gradedResults.find(g => g.id === t.id) || t));

            // 3. Submit to Database
            console.log("Fetching User Session...");
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error("User session not found. Please log in again.");
            }
            console.log("User found:", user.id);
            console.log("Challenge ID from URL:", challengeId);

            if (!challengeId) {
                throw new Error("Challenge ID is missing from the URL.");
            }

            const payload = {
                user_id: user.id,
                challenge_id: challengeId, // Pass as string (Supabase handles UUID/Int conversion if string is valid)
                points_earned: score,
                status: score >= 80 ? "passed" : "failed",
                code: code,
                language: language,
                output: `Graded: ${passCount}/${totalTests} passed.`,
                execution_time: "0ms"
            };

            console.log("Submitting Payload to DB:", payload);

            const { data: insertData, error: insertError } = await supabase
                .from("challenge_history")
                .insert(payload)
                .select(); // Add .select() to see the returned row if successful

            if (insertError) {
                console.error("DB Insert Error:", insertError);
                throw new Error(`Database Error: ${insertError.message} (${insertError.code})`);
            }

            console.log("DB Insert Success:", insertData);

            // 4. Update Global User Stats (Total Score) & Local State
            if (score > 0) {
                // A. Local UI Update
                awardCoins(score);

                // B. Backend Stats Update (if `user_stats` exists)
                // This ensures the leaderboard/dashboard stays in sync without recalculating all history every time
                try {
                    const { data: statsData, error: statsFetchErr } = await supabase
                        .from("user_stats")
                        .select("total_score")
                        .eq("user_id", user.id)
                        .maybeSingle();

                    if (!statsFetchErr) {
                        const currentTotal = statsData?.total_score || 0;
                        const newTotal = currentTotal + score;

                        const { error: statsUpdateErr } = await supabase
                            .from("user_stats")
                            .upsert({
                                user_id: user.id,
                                total_score: newTotal,
                                last_active: new Date().toISOString()
                            }, { onConflict: 'user_id' });

                        if (statsUpdateErr) console.warn("Stats Update Warning:", statsUpdateErr);
                        else console.log("Global Stats Updated:", newTotal);
                    }
                } catch (statsErr) {
                    console.warn("Failed to update global stats table:", statsErr);
                }
            }

            // Success UI
            alert(`🎉 Submission Successful!\n\nYou scored: ${score} Points\nCoins Awarded: ${score}`);


            setExamFinished(true);
            setExamStarted(false);
            if (document.fullscreenElement) {
                document.exitFullscreen().catch(e => { });
            }

        } catch (err) {
            console.error("Critical Submission Error:", err);
            alert(`⚠️ SUBMISSION FAILED ⚠️\n\nReason: ${err.message}\n\nPlease check the console for details and try again. Do not close this page.`);
            setOutput((prev) => prev + `\n\n❌ SYSTEM ERROR: ${err.message}`);
        } finally {
            setRunning(false);
        }
    };

    const toggleSection = (section) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

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

    const handleSubmitClick = (e) => {
        if (e) e.preventDefault();
        console.log("🔘 Button Clicked: ", isExamMode ? "Submit Exam" : "Run Tests");

        if (isExamMode) {
            submitExam();
        } else {
            runTests();
        }
    };

    return (
        <div className={`min-h-screen p-6 ${bgColor} relative overflow-hidden ${isExamMode && examStarted && !isLocked ? "select-none" : ""}`}>

            {/* 1. Offline Warning - Only in Exam Mode? Or always? Always is good but maybe annoyance. Keep for Exam. */}
            {isExamMode && !isOnline && (
                <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white text-center py-2 font-bold flex items-center justify-center gap-2">
                    <WifiOff size={18} /> Internet Connection Lost! Please check your connection.
                </div>
            )}

            {/* 2. Instructions Modal - Only if isExamMode */}
            <AnimatePresence>
                {isExamMode && !examStarted && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-md flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl border border-blue-500/20 overflow-hidden">

                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
                                    <ShieldAlert size={32} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Strict Coding Round – Rules</h1>
                                    <p className="text-slate-500 font-medium">Full Screen Mode will be enforced.</p>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
                                {/* ... Instructions content ... */}
                                <section>
                                    <h3 className="font-bold text-lg text-slate-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 px-2 py-0.5 rounded text-sm">1</span> Environment Rules
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400 marker:text-blue-400">
                                        <li>The exam runs in <strong>strict full-screen mode</strong>. Exiting full-screen will trigger a warning.</li>
                                        <li>Total duration: <strong>{EXAM_DURATION_SEQ / 60} Minutes</strong>. Auto-submits on timeout.</li>
                                    </ul>
                                </section>
                                <section className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                    <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                                        <AlertTriangle size={20} /> Zero Tolerance Malpractice Policy
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-red-800/80 dark:text-red-300/80 marker:text-red-400">
                                        <li><strong>Clipboard Locked:</strong> Copy, Paste, Cut, Right-Click, and Selection are globally disabled.</li>
                                        <li><strong>One Window Policy:</strong> Switching tabs, minimizing, or clicking outside the window triggers a warning.</li>
                                        <li><strong>3 Strikes Rule:</strong> On the 3rd violation (tab switch / full screen exit / blur), the screen <strong>freezes for 5 minutes</strong>.</li>
                                    </ul>
                                </section>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer select-none group">
                                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${instructionsAccepted ? "bg-blue-600 border-blue-600" : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-blue-400"}`}>
                                        {instructionsAccepted && <CheckCircle2 size={16} className="text-white" />}
                                    </div>
                                    <input type="checkbox" className="hidden" checked={instructionsAccepted} onChange={(e) => setInstructionsAccepted(e.target.checked)} />
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">I agree to enter Full Screen Mode.</span>
                                </label>
                                <button
                                    disabled={!instructionsAccepted}
                                    onClick={startExam}
                                    className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform active:scale-95
                              ${instructionsAccepted
                                            ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 cursor-pointer"
                                            : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"}`}
                                >
                                    Start Challenge <ArrowRight size={18} />
                                </button>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. Locked Overlay */}
            <AnimatePresence>
                {isExamMode && isLocked && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-red-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mb-6 animate-pulse">
                            <Lock size={48} className="text-red-500" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">Exam Locked</h1>
                        <p className="text-xl text-red-200 max-w-md mb-8">
                            Strict Mode Violation Detected (Tab Switch / Fullscreen Exit).
                        </p>
                        <div className="text-6xl font-mono font-bold text-white tabular-nums tracking-widest bg-red-900/50 px-8 py-4 rounded-2xl border border-red-500/30">
                            {formatTime(lockTimeLeft)}
                        </div>
                        <div className="mt-8 flex gap-4">
                            <p className="text-sm text-red-400 font-medium uppercase tracking-widest">Penalty Active</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. Finished Overlay */}
            <AnimatePresence>
                {isExamMode && examFinished && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-blue-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">Challenge Submitted</h1>
                        <p className="text-xl text-blue-200 max-w-md mb-8">
                            Your solution has been submitted successfully.
                        </p>
                        <button onClick={() => navigate(-1)} className="px-8 py-3 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                            Return to Challenges
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Header */}
            <motion.div initial={{ y: -60 }} animate={{ y: 0 }} className="max-w-[1400px] mx-auto flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <motion.button whileHover={{ scale: 1.1 }} onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <ArrowLeft className={primaryText} size={24} />
                    </motion.button>

                    <div>
                        <h1 className={`text-2xl font-black ${primaryText}`}>{challenge.title}</h1>
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500 mt-0.5">
                            {isExamMode ? (
                                <>
                                    <span className={`px-2 py-0.5 rounded border ${warnings > 0 ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-green-100 text-green-700 border-green-200"}`}>
                                        WARNINGS: {warnings}/{MAX_WARNINGS}
                                    </span>
                                    {warnings > 0 && <span className="animate-pulse text-amber-500">Stay in Full Screen!</span>}
                                </>
                            ) : (
                                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">Practice Mode</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Timer: Only in Exam Mode? Or optional. Let's keep it for Exam Mode only to reduce anxiety in practice */}
                    {isExamMode && (
                        <div className={`px-5 py-2.5 rounded-xl border flex items-center gap-3 font-mono text-xl font-bold tracking-tight shadow-sm
                    ${timeLeft < 300 ? "bg-red-50 border-red-200 text-red-600 animate-pulse" : (isDark ? "bg-[#1e293b] border-blue-800 text-white" : "bg-white border-blue-100 text-blue-900")}`}>
                            <Clock size={20} className={timeLeft < 300 ? "text-red-500" : "text-blue-500"} />
                            {formatTime(timeLeft)}
                        </div>
                    )}

                    <motion.button whileHover={{ rotate: 180 }} onClick={() => setTheme(isDark ? "light" : "dark")} className={`p-3 rounded-full ${isDark ? "bg-blue-900/40 text-blue-200" : "bg-white text-blue-600 shadow-sm"}`}>
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>

                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

                    <div className="flex gap-2">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runCode} disabled={running}
                            className="px-5 py-2.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl font-bold flex items-center gap-2 border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all">
                            <Play size={18} fill="currentColor" /> {running ? "Running..." : "Run"}
                        </motion.button>

                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSubmitClick} disabled={running}
                            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all">
                            {isExamMode ? "Submit Challenge" : "Run Tests"} <Send size={18} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
                {/* Left: Vertical Stack */}
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-600/20 scrollbar-track-transparent">
                    {/* Description */}
                    <motion.div className={`${cardBg} rounded-2xl p-6 shadow-sm border ${cardBorder}`}>
                        <h2 className={`text-xl font-bold mb-4 ${primaryText} border-b border-gray-200 dark:border-gray-700 pb-2`}>Problem Statement</h2>
                        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptionHtml) }} className={`prose prose-sm ${secondaryText} max-w-none select-text`} />
                    </motion.div>

                    {/* Input & Output Format */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div className={`${cardBg} rounded-xl p-5 border ${cardBorder}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-3 ${primaryText}`}><FileInput size={16} /> Input Format</h3>
                            <div className={`text-sm ${secondaryText}`}>{challenge.input_format || "Standard input (stdin)"}</div>
                        </motion.div>

                        <motion.div className={`${cardBg} rounded-xl p-5 border ${cardBorder}`}>
                            <h3 className={`font-bold text-xs uppercase tracking-wider flex items-center gap-2 mb-3 text-emerald-600`}><FileOutput size={16} /> Output Format</h3>
                            <div className={`text-sm ${secondaryText}`}>{challenge.output_format || "Standard output (stdout)"}</div>
                        </motion.div>
                    </div>

                    {/* Sample Input/Output */}
                    {sampleTest && (
                        <motion.div className={`${cardBg} rounded-xl p-2 border ${cardBorder}`}>
                            <button onClick={() => toggleSection("sample")} className="w-full flex justify-between items-center p-3 hover:bg-black/5 rounded-lg transition-colors">
                                <h3 className={`font-bold text-sm flex items-center gap-2 ${primaryText}`}>Sample Cases</h3>
                                <span className="text-xl opacity-50">{openSections.sample ? "−" : "+"}</span>
                            </button>
                            <AnimatePresence>
                                {openSections.sample && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden px-4 pb-4">
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Input</div>
                                                <pre className={`p-3 rounded-lg bg-slate-100 dark:bg-black/20 font-mono text-xs ${secondaryText} whitespace-pre-wrap`}>{sampleTest.input}</pre>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Output</div>
                                                <pre className={`p-3 rounded-lg bg-slate-100 dark:bg-black/20 font-mono text-xs ${secondaryText} whitespace-pre-wrap`}>{sampleTest.expected_output}</pre>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* Test Cases */}
                    <motion.div className={`${cardBg} rounded-xl p-2 border ${cardBorder}`}>
                        <button onClick={() => toggleSection("tests")} className="w-full flex justify-between items-center p-3 hover:bg-black/5 rounded-lg transition-colors">
                            <h3 className={`font-bold text-sm flex items-center gap-2 ${primaryText}`}><ListChecks size={18} /> Run Results ({visibleTests.length})</h3>
                            <span className="text-xl opacity-50">{openSections.tests ? "−" : "+"}</span>
                        </button>
                        <AnimatePresence>
                            {openSections.tests && (
                                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden space-y-3 px-4 pb-4 pt-2">
                                    {visibleTests.map((t, i) => {
                                        const res = testResults.find(r => r.id === t.id) || t;
                                        const isPassed = res.status === "passed";
                                        return (
                                            <motion.div key={t.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                                                className={`p-3 rounded-lg border flex justify-between items-center ${isDark ? "bg-[#253047] border-blue-800" : "bg-white border-slate-200"}`}>
                                                <div className="text-xs">
                                                    <span className="font-bold opacity-70">Test Case {i + 1}</span>
                                                    {res.stdout && <span className={`ml-2 font-mono ${isPassed ? "text-green-500" : "text-red-500"}`}>{isPassed ? "Passed" : "Failed"}</span>}
                                                </div>
                                                {isPassed ? <CheckCircle2 size={16} className="text-green-500" /> : (res.status === "error" ? <AlertTriangle size={16} className="text-amber-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300" />)}
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>

                {/* Right: Editor + Terminal */}
                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4 h-full">
                    {/* Editor Header & Monaco */}
                    <div className={`rounded-xl overflow-hidden border ${isDark ? "border-blue-800 bg-[#0f172a]" : "border-slate-200 bg-white"} shadow-xl flex-grow flex flex-col`}>
                        <div className={`flex justify-between items-center px-4 py-3 border-b ${isDark ? "bg-[#1e293b] border-blue-800" : "bg-slate-50 border-slate-200"}`}>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                {/* ... Language Selector ... */}
                                <select value={language} onChange={(e) => { setLanguage(e.target.value); setLanguageId(mapLanguage(e.target.value)); }}
                                    className={`bg-transparent text-sm font-bold outline-none cursor-pointer ${primaryText}`}>
                                    <option value="java">Java (JDK 17)</option>
                                    <option value="python">Python 3</option>
                                    <option value="cpp">C++ (GCC)</option>
                                    <option value="javascript">JavaScript (Node)</option>
                                </select>
                            </div>
                            <div className="flex gap-2 items-center text-xs font-bold text-red-500 opacity-80">
                                {isExamMode ? <><ShieldAlert size={14} /> Strict Mode Active</> : <span className="text-green-500 flex items-center gap-1"><Sparkles size={14} /> Playground</span>}
                            </div>
                        </div>
                        <div className="flex-grow relative group" onKeyDown={(e) => isExamMode && e.stopPropagation()}>
                            <Editor height="100%" theme={isDark ? "vs-dark" : "light"} language={language} value={code} onChange={setCode}
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                    padding: { top: 20 },
                                    fontFamily: '"JetBrains Mono", monospace',
                                    scrollBeyondLastLine: false,
                                    smoothScrolling: true,
                                    contextmenu: !isExamMode, // Disable context menu ONLY in exam mode
                                    quickSuggestions: true,
                                    readOnly: isExamMode && isLocked,
                                }}
                            />
                        </div>
                    </div>

                    {/* Console & Custom Input */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-48 shrink-0">
                        <div className={`col-span-1 rounded-xl border flex flex-col overflow-hidden ${isDark ? "border-blue-800 bg-[#0f172a]" : "border-slate-200 bg-white"}`}>
                            <div className={`px-4 py-2 border-b text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? "border-blue-800 text-blue-400" : "border-slate-100 text-slate-400"}`}>
                                <Keyboard size={12} /> Custom Input
                            </div>
                            <textarea
                                value={customInput} onChange={(e) => setCustomInput(e.target.value)}
                                placeholder="Input..."
                                className={`w-full h-full p-3 bg-transparent outline-none font-mono text-xs resize-none ${isDark ? "text-gray-300 placeholder-gray-700" : "text-gray-800 placeholder-gray-300"}`}
                            />
                        </div>

                        <div className={`col-span-2 rounded-xl border flex flex-col overflow-hidden relative ${isDark ? "border-blue-800 bg-[#020617]" : "border-slate-800 bg-[#1e293b]"}`}>
                            <div className="flex justify-between items-center px-4 py-2 border-b border-white/10 bg-white/5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Console Output</span>
                                <button onClick={() => setOutput("")} className="text-[10px] text-slate-500 hover:text-white transition-colors">CLEAR</button>
                            </div>
                            <pre className="p-4 font-mono text-xs text-green-400 overflow-auto whitespace-pre-wrap h-full leading-relaxed">
                                {output || "// Output will appear here..."}
                            </pre>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div >
    );
}
