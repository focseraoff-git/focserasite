// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback } from "react";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
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
  ImageDown,
  Trash2,
  Sparkles,
  Menu,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function OnlineCompilerPage() {
  const [language, setLanguage] = useState(localStorage.getItem("playground_language") || "cpp");
  const [code, setCode] = useState(localStorage.getItem("playground_code") || "");
  const [notes, setNotes] = useState(localStorage.getItem("playground_notes") || "");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [drawMode, setDrawMode] = useState(false);
  const [penColor, setPenColor] = useState("#3B82F6");
  const [penSize, setPenSize] = useState(3);
  const [eraseMode, setEraseMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const [fontSize, setFontSize] = useState(Number(localStorage.getItem("playground_fontSize")) || 14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const pointsRef = useRef([]);

  const templates = {
    cpp: `#include <iostream>\nusing namespace std;\nint main(){\n  cout << "Hello World!";\n  return 0;\n}`,
    c: `#include <stdio.h>\nint main(){\n  printf("Hello World!");\n  return 0;\n}`,
    java: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World!");\n  }\n}`,
    python: `print("Hello World!")`,
    javascript: `console.log("Hello World!");`,
  };

  useEffect(() => {
    lmsSupabaseClient.auth.getSession().then(({ data }) => setUser(data?.session?.user || null));
  }, []);

  useEffect(() => setCode(templates[language]), [language]);

  const resizeCanvas = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const rect = container.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // 🖊️ Tablet + Stylus Drawing Support (Pointer Events)
  const handlePointerDown = (e) => {
    if (!drawMode) return;
    drawingRef.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointsRef.current = [{ x, y }];
  };

  const handlePointerMove = (e) => {
    if (!drawingRef.current || !drawMode) return;
    const ctx = ctxRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const arr = pointsRef.current;
    arr.push({ x, y });
    if (arr.length >= 2) {
      const [p1, p2] = arr.slice(-2);
      ctx.beginPath();
      ctx.globalCompositeOperation = eraseMode ? "destination-out" : "source-over";
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize * (e.pressure ? Math.max(0.5, e.pressure * 1.5) : 1);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    const snapshot = canvasRef.current.toDataURL();
    setHistory((h) => [...h, snapshot]);
    setRedoStack([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, [drawMode, penColor, penSize, eraseMode]);

  const redraw = (url) => {
    const ctx = ctxRef.current;
    const img = new Image();
    const rect = containerRef.current.getBoundingClientRect();
    img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (url) img.src = url;
  };

  const handleUndo = () => {
    if (!history.length) return;
    const newHist = [...history];
    const last = newHist.pop();
    setRedoStack((r) => [...r, last]);
    setHistory(newHist);
    redraw(newHist[newHist.length - 1]);
  };

  const handleRedo = () => {
    if (!redoStack.length) return;
    const next = redoStack.pop();
    setRedoStack([...redoStack]);
    setHistory((h) => [...h, next]);
    redraw(next);
  };

  const handleClear = () => {
    const ctx = ctxRef.current;
    const rect = containerRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHistory([]);
    setRedoStack([]);
  };

  const handleClearAll = () => {
    if (!confirm("Clear ALL drawings and reset history?")) return;
    handleClear();
  };

  const saveCanvas = () => {
    const link = document.createElement("a");
    link.download = "playground-sketch.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  useEffect(() => {
    if (!drawMode) document.body.style.cursor = "auto";
    else document.body.style.cursor = "crosshair";
  }, [drawMode]);

  const getLanguageId = (lang) =>
    ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");
    try {
  const res = await axios.post("/api/compile", {
  source_code: code,
  language_id: getLanguageId(language),
  stdin: input || "",
});

      const { stdout, stderr, compile_output } = res.data;
      setOutput(stdout || stderr || compile_output || "No output");
    } catch {
      setOutput("⚠️ Error executing code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isFullscreen ? "fixed inset-0 bg-gray-900 z-50" : "min-h-screen bg-gray-100 p-6"
      } font-inter`}
    >
      <div
        className={`${
          isFullscreen
            ? "w-full h-full flex flex-col"
            : "max-w-8xl mx-auto bg-white rounded-3xl shadow-2xl p-6"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" />
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent tracking-tight">
              Playground
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowNotes((s) => !s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                showNotes ? "bg-yellow-400 text-black" : "bg-gray-200 text-gray-800"
              }`}
            >
              <FileEdit size={16} /> {showNotes ? "Hide Notes" : "Notes"}
            </button>

            <button
              onClick={() => setDrawMode((d) => !d)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                drawMode ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <Pencil size={16} /> {drawMode ? "Drawing On" : "Draw"}
            </button>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white border px-3 py-2 rounded-lg"
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>

            <button
              onClick={handleRun}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}{" "}
              {loading ? "Running..." : "Run"}
            </button>

            <button
              onClick={() => setIsFullscreen((s) => !s)}
              className="bg-gray-200 px-3 py-2 rounded-lg"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Editor + Notes */}
        <div ref={containerRef} className="relative flex gap-6" style={{ minHeight: 520 }}>
          <div className={`${showNotes ? "flex-[2]" : "flex-1"} border rounded-xl overflow-hidden`}>
            <MonacoEditor
              height={isFullscreen ? "calc(100vh - 200px)" : "520"}
              language={language}
              value={code}
              theme="vs-dark"
              onChange={setCode}
              options={{ fontSize, minimap: { enabled: false }, automaticLayout: true }}
            />
          </div>

          {showNotes && (
            <div className="flex flex-col flex-1 bg-gray-50 border rounded-xl">
              <div className="flex justify-between items-center bg-yellow-100 px-3 py-2 border-b">
                <span className="font-semibold text-gray-700">Notes</span>
                <button
                  onClick={() => {
                    localStorage.setItem("playground_notes", notes);
                    alert("✅ Notes saved!");
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  <Save size={14} /> Save
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-1 p-3 outline-none resize-none text-sm font-mono bg-yellow-50"
              />
            </div>
          )}

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 40,
              pointerEvents: drawMode ? "auto" : "none",
              touchAction: "none",
            }}
          />
        </div>

        {/* Draw Toolbar */}
        {drawMode && (
          <div className="fixed top-6 right-6 bg-gray-800 text-white rounded-xl p-3 shadow-lg z-50 w-64 border border-gray-700">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Menu size={16} /> Tools
              </div>
              <div className="flex gap-1">
                <button onClick={saveCanvas} title="Save" className="p-1 hover:bg-gray-700 rounded">
                  <ImageDown size={15} />
                </button>
                <button onClick={handleClear} title="Clear" className="p-1 hover:bg-gray-700 rounded">
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={handleClearAll}
                  title="Clear All"
                  className="p-1 bg-red-600 hover:bg-red-700 rounded"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Palette size={14} />
              <input
                type="color"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
                className="cursor-pointer"
              />
              <input
                type="range"
                min="1"
                max="30"
                value={penSize}
                onChange={(e) => setPenSize(Number(e.target.value))}
                className="flex-1"
              />
            </div>

            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setEraseMode((em) => !em)}
                className={`flex-1 px-3 py-1 rounded-md text-sm ${
                  eraseMode ? "bg-gray-600" : "bg-gray-700/40"
                }`}
              >
                <Eraser size={14} /> {eraseMode ? "Eraser" : "Pen"}
              </button>
              <button onClick={handleUndo} className="px-2 bg-gray-700/40 rounded-md">
                <Undo size={14} />
              </button>
              <button onClick={handleRedo} className="px-2 bg-gray-700/40 rounded-md">
                <Redo size={14} />
              </button>
            </div>

            <button
              onClick={() => setDrawMode(false)}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-md py-1 font-semibold"
            >
              Stop Drawing
            </button>
          </div>
        )}

        {/* Output */}
        <div className="mt-6 bg-gray-900 text-green-300 p-4 rounded-xl overflow-auto min-h-[100px] font-mono border border-gray-800">
          <h3 className="text-white font-semibold mb-2">Output</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}
