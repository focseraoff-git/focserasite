// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Code2,
    Terminal,
    ChevronDown,
    ChevronUp,
    Copy
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function SubmissionHistoryPage() {
    const { challengeId } = useParams();
    const navigate = useNavigate();

    const [challenge, setChallenge] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [user, setUser] = useState(null);

    // Theme Logic (match existing pages)
    const theme = localStorage.getItem("focsera_theme") || "dark";
    const isDark = theme === "dark";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: { user } } = await lmsSupabaseClient.auth.getUser();
                if (!user) {
                    navigate('/divisions/skill/auth');
                    return;
                }
                setUser(user);

                // 1. Fetch Challenge Details
                const { data: chall } = await lmsSupabaseClient
                    .from("code_challenges")
                    .select("title, difficulty")
                    .eq("id", challengeId)
                    .single();
                setChallenge(chall);

                console.log("Fetching history for:", user.id, "Challenge:", challengeId);

                // 2. Fetch History
                const { data: hist, error } = await lmsSupabaseClient
                    .from("challenge_history")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });

                if (error) console.error("Supabase Error:", error);

                // Filter in memory to ensure type mismatch isn't the cause (keeping this safe)
                const filteredHist = (hist || []).filter(h => String(h.challenge_id) === String(challengeId));

                setHistory(filteredHist);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [challengeId, navigate]);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        alert("Code copied to clipboard!");
    };

    // MANUAL OVERRIDE: Allow user to self-correct grading errors
    const claimPoints = async (e, item) => {
        e.stopPropagation();
        console.log("Claiming points for:", item.id);

        if (!user) {
            alert("Security Error: User session missing. Please refresh.");
            return;
        }

        if (!window.confirm("Mark this submission as correct? (Use this only if the grader was wrong)")) return;

        try {
            // 1. Update History Record
            const { error: histError } = await lmsSupabaseClient
                .from("challenge_history")
                .update({ status: "passed", points_earned: 100 })
                .eq("id", item.id);

            if (histError) throw histError;

            // 2. Update Global Stats (XP)
            // Fetch current stats to increment
            const { data: statsData, error: statsFetchErr } = await lmsSupabaseClient
                .from("user_stats")
                .select("total_score")
                .eq("user_id", user.id)
                .single();

            if (!statsFetchErr && statsData) {
                const newScore = (statsData.total_score || 0) + 100;
                await lmsSupabaseClient
                    .from("user_stats")
                    .update({ total_score: newScore })
                    .eq("user_id", user.id);
            } else {
                // If no stats row exists yet, create one
                await lmsSupabaseClient
                    .from("user_stats")
                    .insert({ user_id: user.id, total_score: 100 });
            }

            alert("Points claimed successfully! Your Global Score has been updated. \n\nRefreshing page to sync data...");
            window.location.reload();

        } catch (err) {
            console.error(err);
            alert("Error updating score: " + err.message);
        }
    };

    // Styles
    const bgMain = isDark ? "bg-[#020617]" : "bg-[#f8fafc]";
    const textMain = isDark ? "text-slate-100" : "text-slate-900";
    const cardBg = isDark ? "bg-[#0f172a]/80" : "bg-white";
    const borderColor = isDark ? "border-slate-800" : "border-slate-200";

    if (loading) return <div className={`h-screen flex items-center justify-center ${bgMain} ${textMain}`}>Loading history...</div>;

    return (
        <div className={`min-h-screen ${bgMain} ${textMain} font-sans p-6 md:p-12 relative overflow-hidden`}>

            {/* Background Ambience */}
            <div className={`fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none ${isDark ? "bg-blue-900" : "bg-blue-200"}`} />

            <div className="max-w-4xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className={`p-3 rounded-xl border transition-all hover:scale-105 ${isDark ? "bg-slate-900 border-slate-700 hover:bg-slate-800" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">{challenge?.title || "Challenge History"}</h1>
                        <p className={`text-sm font-medium opacity-60 flex items-center gap-2 mt-1`}>
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${(challenge?.difficulty || 'medium') === 'easy' ? 'border-green-500/30 text-green-500' :
                                (challenge?.difficulty || 'medium') === 'medium' ? 'border-amber-500/30 text-amber-500' :
                                    'border-rose-500/30 text-rose-500'
                                }`}>
                                {challenge?.difficulty || "Medium"}
                            </span>
                            • {history.length} Submissions
                        </p>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">

                    {history.length === 0 ? (
                        <div className={`p-12 rounded-3xl border border-dashed flex flex-col items-center justify-center opacity-60 ${borderColor}`}>
                            <Terminal size={48} className="mb-4 opacity-50" />
                            <p>No submissions found for this challenge.</p>
                        </div>
                    ) : (
                        history.map((item, index) => {
                            const passed = item.status === 'passed' || item.points_earned >= 80;
                            const isExpanded = expandedId === item.id;

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={item.id}
                                    className={`rounded-2xl border overflow-hidden transition-all ${cardBg} ${borderColor} ${isExpanded ? 'shadow-xl ring-1 ring-blue-500/20' : 'hover:border-blue-500/30'}`}
                                >
                                    {/* Summary Row */}
                                    <div
                                        onClick={() => toggleExpand(item.id)}
                                        className="p-5 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer relative"
                                    >
                                        {/* Status Icon */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${passed ? "bg-green-500/10 text-green-500" : "bg-rose-500/10 text-rose-500"}`}>
                                            {passed ? <CheckCircle size={24} weight="fill" /> : <XCircle size={24} />}
                                        </div>

                                        {/* Meta Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`text-lg font-bold ${passed ? "text-green-500" : "text-rose-500"}`}>
                                                    {passed ? "Passed" : "Failed"}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold ${passed ? "bg-green-500/10 text-green-600" : "bg-rose-500/10 text-rose-600"}`}>
                                                    {item.points_earned}% Score
                                                </span>

                                                {!passed && (
                                                    <button
                                                        onClick={(e) => claimPoints(e, item)}
                                                        className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full hover:bg-blue-200 transition-colors border border-blue-200"
                                                        title="Grader wrong? Click to override."
                                                    >
                                                        Review & Claim Points
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-mono opacity-60">
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(item.created_at).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><Clock size={12} /> {new Date(item.created_at).toLocaleTimeString()}</span>
                                                <span className="hidden md:inline">• ID: {item.id.slice(0, 8)}</span>
                                            </div>
                                        </div>

                                        {/* Action Icon */}
                                        <div className={`p-2 rounded-full transition-transform duration-300 ${isDark ? "bg-slate-800" : "bg-slate-100"} ${isExpanded ? "rotate-180" : ""}`}>
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>

                                    {/* Expanded Content (Code Viewer) */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-dashed border-slate-700/20"
                                            >
                                                <div className="p-4 bg-slate-950 relative group">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); copyCode(item.code); }}
                                                        className="absolute top-4 right-4 z-10 p-2 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Copy Code"
                                                    >
                                                        <Copy size={14} />
                                                    </button>

                                                    <div className="text-xs font-mono text-slate-500 mb-2 select-none">Submitted Code:</div>
                                                    <div className="rounded-lg overflow-hidden border border-slate-800">
                                                        <Editor
                                                            height="300px"
                                                            defaultLanguage="javascript" // Simple default, ideally detect from item or challenge
                                                            defaultValue={item.code}
                                                            theme="vs-dark"
                                                            options={{
                                                                readOnly: true,
                                                                minimap: { enabled: false },
                                                                scrollBeyondLastLine: false,
                                                                fontSize: 13,
                                                                padding: { top: 16 }
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </motion.div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}
