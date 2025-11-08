// OnlineCompilerPage.tsx
// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Play,
  Loader2,
  Maximize2,
  Minimize2,
  FileEdit,
  Save,
  Undo,
  Redo,
  Pencil,
  Eraser,
  Palette,
  Sparkles,
  Menu,
  Plus,
  Minus,
  RotateCcw,
  X,
  Terminal as TerminalIcon,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import AIAssistant from "./AIAssistant";
import clsx from "clsx"; // You may need to install this: npm install clsx

/**
 * Refactored Playground
 *
 * - Fixed canvas positioning (now relative to editor, not viewport)
 * - Componentized UI (TopToolbar, Workspace, EditorPanel, NotesPanel, etc.)
 * - Workspace grid now responsive to 'showNotes' toggle
 * - Improved Fullscreen mode
 * - Cleaner, more stable layout
 */

/* ======================= Main Component ======================= */
export default function OnlineCompilerPage() {
  /* ---------------- Core state ---------------- */
  const [language, setLanguage] = useState(localStorage.getItem("playground_language") || "cpp");
  const [code, setCode] = useState(localStorage.getItem("playground_code") || "");
  const [inputBuffer, setInputBuffer] = useState(localStorage.getItem("playground_input") || "");
  const [outputLines, setOutputLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(Number(localStorage.getItem("playground_fontSize")) || 14);
  const [showNotes, setShowNotes] = useState(true);
  const [notes, setNotes] = useState(localStorage.getItem("playground_notes") || "");
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ---------------- Drawing state ---------------- */
  const [drawMode, setDrawMode] = useState(false);
  const [penColor, setPenColor] = useState(localStorage.getItem("playground_penColor") || "#60A5FA");
  const [penSize, setPenSize] = useState(Number(localStorage.getItem("playground_penSize")) || 3);
  const [eraseMode, setEraseMode] = useState(false);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("playground_history") || "[]"));
  const [redoStack, setRedoStack] = useState([]);

  /* ---------------- Terminal state ---------------- */
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [terminalHeight, setTerminalHeight] = useState(Number(localStorage.getItem("playground_terminalHeight")) || 220);
  const terminalMin = 120;
  const terminalMax = 640;
  const [terminalDocked, setTerminalDocked] = useState(false);

  /* ---------------- user / refs ---------------- */
  const [user, setUser] = useState(null);
  const editorAreaRef = useRef<HTMLDivElement | null>(null); // editor box only (for canvas size)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);
  const pointsRef = useRef([]);
  const editorRef = useRef<any>(null);
  const terminalInputRef = useRef<HTMLTextAreaElement | null>(null);
  const terminalScrollRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false); // for terminal resize
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);

  /* ---------------- language templates ---------------- */
  const templates = {
    cpp: `#include <iostream>\nusing namespace std;\nint main(){\n  int a; cin >> a; cout << "You entered: " << a; return 0;\n}`,
    c: `#include <stdio.h>\nint main(){\n  int a; scanf("%d",&a); printf("You entered: %d", a); return 0;\n}`,
    java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args){\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    System.out.println("You entered: " + a);\n  }\n}`,
    python: `n = input()\nprint("You entered:", n)`,
    javascript: `const fs = require("fs");\nconst input = fs.readFileSync(0, "utf8");\nconsole.log("You entered:", input.trim());`,
  };

  /* ---------------- inject Fira Code ---------------- */
  useEffect(() => {
    const id = "fira-code-playground-font";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  /* ---------------- load session ---------------- */
  useEffect(() => {
    lmsSupabaseClient.auth.getSession().then(({ data }) => setUser(data?.session?.user || null)).catch(() => {});
  }, []);

  /* ---------------- persist state ---------------- */
  useEffect(() => localStorage.setItem("playground_code", code), [code]);
  useEffect(() => localStorage.setItem("playground_input", inputBuffer), [inputBuffer]);
  useEffect(() => localStorage.setItem("playground_fontSize", String(fontSize)), [fontSize]);
  useEffect(() => localStorage.setItem("playground_notes", notes), [notes]);
  useEffect(() => localStorage.setItem("playground_penColor", penColor), [penColor]);
  useEffect(() => localStorage.setItem("playground_penSize", String(penSize)), [penSize]);
  useEffect(() => localStorage.setItem("playground_history", JSON.stringify(history)), [history]);
  useEffect(() => localStorage.setItem("playground_language", language), [language]);
  useEffect(() => localStorage.setItem("playground_terminalHeight", String(terminalHeight)), [terminalHeight]);

  /* ---------------- auto apply template ---------------- */
  useEffect(() => {
    const tpl = templates[language] || "";
    setCode(tpl);
  }, [language]);

  /* ---------------- Canvas setup & resize ---------------- */
  const resizeCanvas = useCallback(() => {
    const editorBox = editorAreaRef.current;
    const canvas = canvasRef.current;
    if (!editorBox || !canvas) return;

    // Get dimensions from the *editor container*
    const rect = editorBox.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    // Set canvas drawing buffer size (for HiDPI)
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);

    // Set canvas display size (CSS pixels)
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctxRef.current = ctx;

    // Redraw last history state
    const last = history.length ? history[history.length - 1] : null;
    if (last) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = last;
    } else {
      ctx.clearRect(0, 0, rect.width, rect.height);
    }
  }, [history]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    // Also resize when notes are toggled, as this changes editor size
  }, [resizeCanvas, showNotes, isFullscreen]);

  /* ---------------- Pointer drawing ---------------- */
  const toLocal = (clientX: number, clientY: number) => {
    const rect = editorAreaRef.current!.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const prepareStroke = (pressure = 1) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (eraseMode) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = penSize * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = Math.max(1, penSize * pressure);
    }
  };

  const processStrokeSegment = (p1: any, p2: any, pressure = 1) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    if (eraseMode) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = penSize * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = Math.max(1, penSize * pressure);
    }
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (!drawMode) return;
    drawingRef.current = true;
    const p = toLocal(e.clientX, e.clientY);
    pointsRef.current = [p];
    prepareStroke((e as any).pressure ?? 1);
    (e.target as HTMLElement).setPointerCapture?.((e as any).pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!drawMode || !drawingRef.current) return;
    const p = toLocal(e.clientX, e.clientY);
    const arr = pointsRef.current;
    arr.push(p);
    if (arr.length >= 2) {
      const [p1, p2] = arr.slice(-2);
      processStrokeSegment(p1, p2, (e as any).pressure ?? 1);
    }
  };

  const handlePointerUp = () => {
    if (!drawMode) return;
    drawingRef.current = false;
    pointsRef.current = [];
    const canvas = canvasRef.current;
    const rect = editorAreaRef.current!.getBoundingClientRect();
    const tmp = document.createElement("canvas");
    tmp.width = rect.width;
    tmp.height = rect.height;
    const tctx = tmp.getContext("2d")!;
    tctx.drawImage(canvas!, 0, 0, rect.width, rect.height);
    const url = tmp.toDataURL("image/png");
    setHistory((h: any) => {
      const next = [...h, url];
      localStorage.setItem("playground_history", JSON.stringify(next));
      localStorage.setItem("playground_sketch", url);
      return next;
    });
    setRedoStack([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [drawMode, penColor, penSize, eraseMode]);

  /* ---------------- draw helpers ---------------- */
  const redrawFromDataUrl = (url: string | null) => {
    const ctx = ctxRef.current;
    const container = editorAreaRef.current;
    if (!ctx || !container) return;
    const rect = container.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (!url) return;
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
    img.src = url;
  };

  const handleUndo = () => {
    if (!history.length) return;
    const newHist = history.slice(0, -1);
    const popped = history[history.length - 1];
    setHistory(newHist);
    setRedoStack((r) => [...r, popped]);
    localStorage.setItem("playground_history", JSON.stringify(newHist));
    if (newHist.length) {
      localStorage.setItem("playground_sketch", newHist[newHist.length - 1]);
      redrawFromDataUrl(newHist[newHist.length - 1]);
    } else {
      localStorage.removeItem("playground_sketch");
      const rect = editorAreaRef.current!.getBoundingClientRect();
      ctxRef.current!.clearRect(0, 0, rect.width, rect.height);
    }
  };

  const handleRedo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setHistory((h) => {
      const nh = [...h, next];
      localStorage.setItem("playground_history", JSON.stringify(nh));
      localStorage.setItem("playground_sketch", next);
      return nh;
    });
    redrawFromDataUrl(next);
  };

  const handleClear = () => {
    if (!confirm("Clear current drawing layer?")) return;
    const rect = editorAreaRef.current!.getBoundingClientRect();
    ctxRef.current!.clearRect(0, 0, rect.width, rect.height);
    setHistory([]);
    setRedoStack([]);
    localStorage.removeItem("playground_history");
    localStorage.removeItem("playground_sketch");
  };

  const handleSaveSketch = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `playground-sketch-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  /* ---------------- Terminal & run ---------------- */
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [outputLines, loading]);

  const pushLine = (line: string) => setOutputLines((l: string[]) => [...l, String(line)]);
  const clearOutput = () => setOutputLines([]);

  const getLanguageId = (lang: string) => ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

  const runCode = async () => {
    setOutputLines([]);
    pushLine("⏳ Running...");
    setLoading(true);

    try {
      const payload = { source_code: code, language_id: getLanguageId(language), stdin: inputBuffer || "" };
      const res = await axios.post("/api/compile", payload, { headers: { "Content-Type": "application/json" } });
      const data = res.data || {};
      const stdout = data.stdout ?? data.stdout_raw ?? null;
      const stderr = data.stderr ?? data.stderr_raw ?? null;
      const compile_output = data.compile_output ?? null;
      const time = data.time ?? data.execution_time ?? null;

      setOutputLines([]);
      if (stdout && stdout.toString().trim()) pushLine(stdout.toString().trim());
      else if (stderr && stderr.toString().trim()) pushLine(stderr.toString().trim());
      else if (compile_output && compile_output.toString().trim()) pushLine(compile_output.toString().trim());
      else pushLine("No output");

      if (time) pushLine(`\nExecution Time: ${time}s`);

      // save to supabase
      if (user) {
        try {
          await lmsSupabaseClient.from("submissions").insert([{
            user_id: user.id,
            title: "Playground Run",
            language,
            code,
            input: inputBuffer || "",
            output: stdout || stderr || compile_output || "",
            status: stderr || compile_output ? "error" : "success",
            execution_time: time || null,
            submitted_at: new Date().toISOString(),
          }]);
        } catch (err) {
          console.warn("Failed to save submission:", err?.message || err);
        }
      }
    } catch (err: any) {
      console.error("Run error:", err);
      setOutputLines([]);
      pushLine("⚠️ Error executing code — check server or network.");
      if (err?.response?.data) pushLine(JSON.stringify(err.response.data).slice(0, 1000));
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Keyboard shortcuts ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        localStorage.setItem("playground_code", code);
        pushLine("✅ Code saved locally");
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        setDrawMode((d) => !d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [code, inputBuffer, language, user]);

  /* ---------------- Terminal drag ---------------- */
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientY = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const delta = dragStartY.current - clientY;
      let next = Math.min(terminalMax, Math.max(terminalMin, dragStartHeight.current + delta));
      setTerminalHeight(next);
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("mousemove", onMove as any);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove as any, { passive: false });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove as any);
      window.removeEventListener("touchend", onUp);
    };
  }, [terminalHeight]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    draggingRef.current = true;
    const clientY = (e as React.TouchEvent).touches ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    dragStartY.current = clientY;
    dragStartHeight.current = terminalHeight;
    document.body.style.cursor = "ns-resize";
  };

  /* ---------------- cursor while drawing ---------------- */
  useEffect(() => {
    document.body.style.cursor = drawMode ? "crosshair" : "";
    return () => { document.body.style.cursor = ""; };
  }, [drawMode]);

  /* ======================= JSX UI ======================= */
  return (
    <div
      className={clsx(
        "min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black/80 text-gray-100 antialiased",
        isFullscreen && "fixed inset-0 z-[999] overflow-y-auto"
      )}
    >
      <TopToolbar
        language={language}
        setLanguage={setLanguage}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        drawMode={drawMode}
        setDrawMode={setDrawMode}
        runCode={runCode}
        loading={loading}
        terminalOpen={terminalOpen}
        setTerminalOpen={setTerminalOpen}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
      />

      <Workspace
        showNotes={showNotes}
        // EditorPanel props
        editorAreaRef={editorAreaRef}
        isFullscreen={isFullscreen}
        language={language}
        code={code}
        setCode={setCode}
        fontSize={fontSize}
        editorRef={editorRef}
        pushLine={pushLine}
        // Canvas props
        canvasRef={canvasRef}
        drawMode={drawMode}
        // NotesPanel props
        notes={notes}
        setNotes={setNotes}
      />

      <DrawPalette
        drawMode={drawMode}
        setDrawMode={setDrawMode}
        penColor={penColor}
        setPenColor={setPenColor}
        penSize={penSize}
        setPenSize={setPenSize}
        eraseMode={eraseMode}
        setEraseMode={setEraseMode}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleSaveSketch={handleSaveSketch}
        handleClear={handleClear}
      />

      <Terminal
        open={terminalOpen}
        docked={terminalDocked}
        setDocked={setTerminalDocked}
        height={terminalHeight}
        setOpen={setTerminalOpen}
        setHeight={setTerminalHeight}
        terminalMin={terminalMin}
        terminalMax={terminalMax}
        startDrag={startDrag}
        terminalScrollRef={terminalScrollRef}
        terminalInputRef={terminalInputRef}
        outputLines={outputLines}
        clearOutput={clearOutput}
        setInputBuffer={setInputBuffer}
        inputBuffer={inputBuffer}
        runCode={runCode}
        loading={loading}
      />

      <AIAssistant editorRef={editorRef} getCode={() => code} />
    </div>
  );
}

/* ======================= Child Components ======================= */

/* ---------------- Top Toolbar ---------------- */
function TopToolbar({
  language, setLanguage, fontSize, setFontSize, showNotes, setShowNotes,
  drawMode, setDrawMode, runCode, loading, terminalOpen, setTerminalOpen,
  isFullscreen, setIsFullscreen,
}) {
  const btnPrimary = "inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-300 text-white font-semibold rounded-lg px-4 py-2 shadow-lg transition-all duration-150 active:scale-[0.99]";
  const btnGhost = "inline-flex items-center gap-2 bg-white/6 hover:bg-white/8 text-gray-100 font-medium rounded-lg px-3 py-2 transition";

  return (
<div className="fixed left-1/2 -translate-x-1/2 top-24 z-50 w-[92%] max-w-7xl">
      <div className="backdrop-blur-md bg-white/6 border border-white/6 rounded-2xl shadow-2xl p-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-400" />
            <div style={{ fontFamily: "'Fira Code', Consolas, monospace" }} className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Playground
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-gray-200 border border-white/6 px-3 py-1 rounded-md"
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
            <div className="flex items-center gap-1 bg-white/6 px-2 py-1 rounded-md">
              <button onClick={() => setFontSize((s) => Math.max(8, s - 1))} className="p-1 text-gray-100"><Minus size={14} /></button>
              <div className="px-2 text-sm">{fontSize}px</div>
              <button onClick={() => setFontSize((s) => Math.min(30, s + 1))} className="p-1 text-gray-100"><Plus size={14} /></button>
              <button onClick={() => setFontSize(14)} className="p-1 text-gray-100"><RotateCcw size={14} /></button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button whileHover={{ y: -2 }} onClick={() => setShowNotes((s) => !s)} className={btnGhost}>
            <FileEdit size={16} /> {showNotes ? "Hide Notes" : "Notes"}
          </motion.button>
          <motion.button whileHover={{ y: -2 }} onClick={() => setDrawMode((d) => !d)} className={clsx(btnGhost, drawMode && "bg-pink-600 text-white")}>
            <Pencil size={16} /> {drawMode ? "Drawing" : "Draw"}
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={runCode} disabled={loading} className={btnPrimary}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />} <span>{loading ? "Running..." : "Run"}</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => setTerminalOpen((o) => !o)} className={btnGhost}>
            <Terminal size={16} /> {terminalOpen ? "Hide" : "Show"}
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} onClick={() => setIsFullscreen((s) => !s)} className={btnGhost}>
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Main Workspace (Editor + Notes) ---------------- */
function Workspace({
  showNotes,
  editorAreaRef, isFullscreen, language, code, setCode, fontSize, editorRef, pushLine,
  canvasRef, drawMode,
  notes, setNotes,
}) {
  return (
    <div className="w-full min-h-screen flex items-start justify-center pt-24 pb-8 px-6">
      <div className="w-full max-w-7xl bg-transparent">
        <div
          className={clsx(
            "relative grid grid-cols-1 gap-6",
            showNotes ? "md:grid-cols-[1fr_360px]" : "md:grid-cols-1"
          )}
        >
          <EditorPanel
            editorAreaRef={editorAreaRef}
            isFullscreen={isFullscreen}
            language={language}
            code={code}
            setCode={setCode}
            fontSize={fontSize}
            editorRef={editorRef}
            pushLine={pushLine}
            canvasRef={canvasRef}
            drawMode={drawMode}
          />

          {showNotes && <NotesPanel notes={notes} setNotes={setNotes} />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Editor Panel (Monaco + Canvas) ---------------- */
function EditorPanel({
  editorAreaRef, isFullscreen, language, code, setCode, fontSize, editorRef, pushLine,
  canvasRef, drawMode,
}) {
  const editorHeight = isFullscreen ? "calc(100vh - 500px)" : "600px";

  return (
    <div
      ref={editorAreaRef}
      className="relative rounded-xl overflow-hidden shadow-2xl border border-white/6 bg-slate-900/30"
      style={{ minHeight: editorHeight }}
    >
      <MonacoEditor
        height={editorHeight}
        language={language === "javascript" ? "javascript" : language}
        value={code}
        theme="vs-dark"
        onChange={(v) => setCode(v)}
        options={{
          fontSize,
          minimap: { enabled: false },
          automaticLayout: true,
          fontFamily: "'Fira Code', Consolas, monospace",
        }}
        editorDidMount={(editor, monaco) => {
          editorRef.current = editor;
          try {
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
              localStorage.setItem("playground_code", editor.getValue());
              pushLine("✅ Code saved locally");
            });
          } catch (e) {
            // ignore
          }
        }}
      />
      
      {/* ** THIS IS THE FIX **
        The canvas is now *inside* the relative parent,
        and positioned absolutely to fill it.
      */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{
          zIndex: drawMode ? 60 : 10,
          pointerEvents: drawMode ? "auto" : "none",
        }}
      />
    </div>
  );
}

/* ---------------- Notes Panel ---------------- */
function NotesPanel({ notes, setNotes }) {
  return (
    <div className="w-full md:w-[360px] rounded-xl bg-slate-900/60 border border-white/6 overflow-hidden flex flex-col">
      <div className="px-4 py-3 bg-gradient-to-b from-white/3 to-transparent flex items-center justify-between">
        <div className="text-sm font-medium">Notes</div>
        <div className="flex gap-2">
          <button onClick={() => { localStorage.setItem("playground_notes", notes); alert("✅ Notes saved"); }} className="bg-green-500 px-3 py-1 rounded text-sm flex items-center gap-2"><Save size={14} /> Save</button>
          <button onClick={() => setNotes("")} className="bg-white/6 px-3 py-1 rounded text-sm">Clear</button>
        </div>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-1 p-4 bg-transparent text-sm text-gray-100 resize-none outline-none"
        style={{ fontFamily: "'Fira Code', Consolas, monospace", minHeight: '480px' }}
      />
    </div>
  );
}

/* ---------------- Floating Draw Palette ---------------- */
function DrawPalette({
  drawMode, setDrawMode, penColor, setPenColor, penSize, setPenSize,
  eraseMode, setEraseMode, handleUndo, handleRedo, handleSaveSketch, handleClear,
}) {
  if (!drawMode) return null;

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="fixed top-28 right-8 z-60">
      <div className="backdrop-blur-md bg-white/6 border border-white/6 rounded-2xl p-3 w-64 shadow-2xl text-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium flex items-center gap-2"><Menu size={14} /> Tools</div>
          <button onClick={() => setDrawMode(false)} className="p-1 bg-white/6 rounded"><X size={14} /></button>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Palette size={14} />
          <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} className="cursor-pointer" />
          <input type="range" min="1" max="30" value={penSize} onChange={(e) => setPenSize(Number(e.target.value))} className="flex-1" />
          <div className="text-xs">{penSize}px</div>
        </div>
        <div className="flex gap-2 mb-2">
          <button onClick={() => setEraseMode((em) => !em)} className={`flex-1 px-3 py-2 rounded-lg text-sm ${eraseMode ? "bg-gray-700" : "bg-white/6"}`}><Eraser size={14} /> {eraseMode ? "Eraser" : "Pen"}</button>
          <button onClick={handleUndo} className="px-3 py-2 bg-white/6 rounded-lg"><Undo size={14} /></button>
          <button onClick={handleRedo} className="px-3 py-2 bg-white/6 rounded-lg"><Redo size={14} /></button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSaveSketch} className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-500 text-white">Save Sketch</button>
          <button onClick={handleClear} className="px-3 py-2 rounded-lg bg-red-600 text-white">Clear</button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Terminal (Floating/Docked) ---------------- */
function Terminal({
  open, docked, setDocked, height, setOpen, setHeight, terminalMin, terminalMax,
  startDrag, terminalScrollRef, terminalInputRef, outputLines, clearOutput,
  setInputBuffer, inputBuffer, runCode, loading,
}) {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 }); // for manual drag when floating
  const dragOffset = useRef({ x: 0, y: 0 });

  // Auto-scroll
  useEffect(() => {
    if (terminalScrollRef?.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight;
    }
  }, [outputLines]);

  // Manual drag handlers for floating terminal
  const handleDragStart = (e: React.MouseEvent) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    document.body.style.userSelect = "none";
  };
  const handleDragMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
  };
  const handleDragEnd = () => {
    setDragging(false);
    document.body.style.userSelect = "";
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [dragging]);

  if (!open) return null;

  const terminalContent = (
    <>
      <div
        className="flex items-center justify-center cursor-row-resize select-none"
        onMouseDown={(e) => { startDrag(e as any); }}
        style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))" }}
      >
        <div className="py-2">
          <div className="flex items-center gap-1 justify-center">
            <div className="w-2 h-2 bg-white/30 rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
      <motion.div animate={{ height: height }} transition={{ duration: 0.15 }} style={{ overflow: "hidden" }}>
        <div className="px-4 py-3 bg-black text-green-300 font-mono" style={{ fontFamily: "'Fira Code', Consolas, monospace" }}>
          <div ref={terminalScrollRef} className="max-h-[40vh] overflow-auto pb-2">
            {outputLines.length === 0 ? (
              <div className="text-gray-500">Terminal cleared. Type input and press Ctrl+Enter or Run.</div>
            ) : (
              outputLines.map((ln: string, i: number) => <div key={i} className="whitespace-pre-wrap text-sm">{ln}</div>)
            )}
          </div>
          <div className="mt-3 border-t border-white/6 pt-3">
            <div className="flex items-start gap-3">
              <div className="text-white/60 select-none">{'>'}</div>
              <textarea
                ref={terminalInputRef}
                value={inputBuffer}
                onChange={(e) => setInputBuffer(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                    e.preventDefault();
                    runCode();
                  }
                }}
                placeholder="Type input here. Use Enter for new lines. Press Ctrl+Enter to Run."
                className="flex-1 bg-transparent resize-none outline-none text-white text-sm"
                rows={4}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-400">Multi-line input supported</div>
              <div className="flex gap-2">
                <button onClick={() => clearOutput()} className="bg-white/6 px-3 py-1 rounded text-sm">Clear Output</button>
                <button onClick={() => { setInputBuffer(""); localStorage.removeItem("playground_input"); }} className="bg-white/6 px-3 py-1 rounded text-sm">Clear Input</button>
                <button onClick={() => runCode()} className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-1 rounded text-sm">{loading ? "Running..." : "Run"}</button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );

  if (docked) {
    return (
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.18 }}>
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 w-[92%] max-w-7xl z-50">
          <div className="bg-gradient-to-b from-slate-900/95 to-slate-900/90 border border-white/6 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-white/3 backdrop-blur text-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-3 text-sm font-medium">Terminal (Docked)</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-300 mr-3">Ctrl+Enter to Run</div>
                <button onClick={() => setDocked(false)} className="bg-white/6 px-3 py-1 rounded text-sm hover:bg-white/8">Undock</button>
                <button onClick={() => setOpen(false)} className="bg-white/6 px-3 py-1 rounded text-sm">Close</button>
              </div>
            </div>
            {terminalContent}
          </div>
        </div>
      </motion.div>
    );
  }

  // Floating mode
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.18 }}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`  }}
      className="fixed right-8 bottom-8 w-[78%] max-w-4xl z-50"
    >
      <div className="bg-gradient-to-b from-slate-900/95 to-slate-900/90 border border-white/6 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-white/3 backdrop-blur text-gray-100 cursor-move" onMouseDown={handleDragStart}>
<div className="flex items-center justify-between px-4 py-2 bg-white/3 backdrop-blur text-gray-100 cursor-move">            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-3 text-sm font-medium">Terminal</div>
          </div>
          <div className="flex items-center gap-2">
<button onClick={() => setDocked(true)} className="bg-white/6 px-3 py-1 rounded text-sm hover:bg-white/8">Dock</button>            <div className="text-xs text-gray-300 mr-3">Drag header to move</div>
            <button onClick={() => setOpen(false)} className="bg-white/6 px-3 py-1 rounded text-sm">Close</button>
          </div>
        </div>
        {terminalContent}
      </div>
    </motion.div>
  );
}