// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import {
  Play,
  Loader2,
  Terminal,
  Pencil,
  Eraser,
  RotateCcw,
  RotateCw,
  Trash2,
  Brush,
  Send,
  Bot,
  MessageSquareX,
  MessageCircle,
} from "lucide-react";

/* ===========================================================
   Combined Online Compiler + AI Assistant
   - AIAssistant is embedded below and accepts two props:
     getCode() -> returns current editor code
     applyCode(newCode) -> replaces editor code with suggestion
   - Assistant will try to extract code blocks from the model
     response and offer an "Apply" button next to each assistant
     message to replace the editor content automatically.

   Usage: drop this file into your React app and ensure .env
   contains VITE_GEMINI_API_KEY and VITE_JUDGE0_API_KEY.
   =========================================================== */

/* ======================= AIAssistant ======================= */
function extractCodeFromText(text) {
  if (!text) return null;
  // Try to find ```code fences first
  const fence = text.match(/```(?:\w+)?\n([\s\S]*?)```/);
  if (fence && fence[1]) return fence[1].trim();
  // Try <pre> blocks inserted by assistant formatting
  const pre = text.match(/<pre[^>]*>([\s\S]*?)<\/pre>/);
  if (pre && pre[1]) return pre[1].replace(/<br\/?\s*>/g, "\n").trim();
  // Fallback: If the whole text looks like code (multiple lines with semicolons or braces), return it
  const lines = text.split(/\r?\n/).slice(0, 200);
  const codeLike = lines.filter((l) => /[;{}=()<>:\[\]]/.test(l)).length / Math.max(lines.length, 1) > 0.25;
  return codeLike ? text.trim() : null;
}

function AIAssistant({ getCode, applyCode }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const fetchWithBackoff = async (url, options, retries = 4, delay = 800) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok && (res.status === 429 || res.status >= 500) && retries > 0) {
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithBackoff(url, options, retries - 1, delay * 2);
      }
      return res;
    } catch (err) {
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, delay));
        return fetchWithBackoff(url, options, retries - 1, delay * 2);
      }
      throw err;
    }
  };

  const formatResponse = (text) => {
    if (!text) return "";
    return text
      .replace(/^#+\s?/gm, "")
      .replace(/^[\*\-]\s?/gm, "")
      .replace(/(\d+)\.\s*/g, "<b>$1.</b> ")
      .replace(/```([\s\S]*?)```/g, "<pre class='code-block'>$1</pre>")
      .replace(/```/g, "")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\n/g, "<br>");
  };

  const sendMessage = async (overrideText = null) => {
    const userMsg = (overrideText || input).trim();
    if (!GEMINI_API_KEY) {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content:
            "⚠️ Missing Gemini API Key. Add `VITE_GEMINI_API_KEY=your_key` to `.env` and restart.",
        },
      ]);
      return;
    }
    if (!userMsg) return;

    setMessages((p) => [...p, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a programming tutor and code assistant. Give clear, short suggestions and, when possible, include corrected code inside a code block using triple backticks. Do NOT include long disclaimers.\n\nCurrent code:\n${getCode()}\n\nQuestion:\n${userMsg}`,
              },
            ],
          },
        ],
      };

      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

      const res = await fetchWithBackoff(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.error?.message || `⚠️ API Error: ${res.status} ${res.statusText}`;
        setMessages((p) => [...p, { role: "assistant", content: msg }]);
        return;
      }

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("\n") ||
        "⚠️ No response from Gemini.";

      const formatted = formatResponse(text);
      setMessages((p) => [...p, { role: "assistant", content: formatted, raw: text }]);
    } catch (e) {
      console.error("❌ Gemini Error:", e);
      setMessages((p) => [...p, { role: "assistant", content: "⚠️ Network or API error." }]);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = (rawText) => {
    const code = extractCodeFromText(rawText);
    if (!code) {
      // if not code found, put suggestion into editor as comment wrapper
      const wrapped = `/* AI suggestion:\n${rawText.split('\n').slice(0,200).join('\n')} */\n\n` + getCode();
      applyCode(wrapped);
      return;
    }
    applyCode(code);
  };

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center"
        title="Open code assistant"
      >
        <MessageCircle size={22} />
      </button>
    );

  return (
    <div className="fixed bottom-6 right-6 w-[420px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/30 to-cyan-400/20 border-b border-white/10">
        <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
          <Bot size={16} /> FocserAI
        </div>
        <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10 text-gray-300">
          <MessageSquareX size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[340px] p-3 space-y-3 text-sm">
        {messages.length === 0 && <div className="text-gray-400 text-center">💬 Hi! Ask me to explain, fix or optimize your code.</div>}

        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded-lg ${msg.role === "user" ? "bg-blue-600/30 text-blue-100 ml-auto w-fit max-w-[85%]" : "bg-gray-800/60 text-gray-100 mr-auto w-fit max-w-[85%]"}`}>
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            {msg.role === "assistant" && msg.raw && (
              <div className="mt-2 flex gap-2 justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(msg.raw).catch(() => {});
                  }}
                  className="text-xs px-2 py-1 rounded border border-white/10 text-gray-300"
                >
                  Copy
                </button>
                <button
                  onClick={() => applySuggestion(msg.raw)}
                  className="text-xs px-2 py-1 rounded bg-green-600/80 text-white"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        ))}

        {loading && <div className="text-center text-cyan-300 animate-pulse text-sm">Thinking...</div>}
      </div>

      <div className="border-t border-white/10 px-3 py-2 bg-slate-900/70 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Ask: fix errors / explain / optimize"
          className="flex-1 bg-transparent text-gray-200 outline-none text-sm px-2"
          disabled={loading}
        />
        <button onClick={() => sendMessage()} disabled={loading} className="bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        </button>
      </div>

      <style>{`.code-block{background:#0f172a;padding:8px;border-radius:6px;font-family:'Fira Code', monospace;font-size:13px;color:#a5f3fc;border:1px solid rgba(255,255,255,0.06);white-space:pre-wrap}`}</style>
    </div>
  );
}

/* =================== OnlineCompilerPage =================== */
export default function OnlineCompilerPage() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [drawMode, setDrawMode] = useState(false);

  const terminalRef = useRef(null);

  // Canvas refs
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#00b4ff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [tool, setTool] = useState("draw");
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const templates = {
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Enter a number: \";\n    int n;\n    cin >> n;\n    cout << \"You entered: \" << n << endl;\n    return 0;\n}`,
    c: `#include <stdio.h>\nint main() {\n    int n;\n    printf(\"Enter a number: \" );\n    scanf(\"%d\", &n);\n    printf(\"You entered: %d\\n\", n);\n    return 0;\n}`,
    java: `import java.util.*;\nclass Hello {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print(\"Enter your name: \" );\n        String name = sc.nextLine();\n        System.out.println(\"Hello, \" + name + \"!\");\n    }\n}`,
    python: `name = input(\"Enter your name: \")\nprint(\"Hello,\", name)`,
    javascript: `let name = prompt(\"Enter your name:\");\nconsole.log(\"Hello, \" + name);`,
  };

  useEffect(() => {
    setCode(templates[language]);
    setOutput("");
  }, [language]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctxRef.current = ctx;

    const resizeCanvas = () => {
      const parent = canvas.parentElement || document.body;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      // redraw last state if present
      const last = drawingHistory[drawingHistory.length - 1];
      if (last) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = last;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [strokeColor, strokeWidth, drawMode, drawingHistory]);

  const pointerDown = (e) => {
    if (!drawMode) return;
    e.preventDefault();
    const ctx = ctxRef.current;
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    // capture pointer for pointer events
    if (e.pointerId) canvasRef.current.setPointerCapture(e.pointerId);
  };

  const pointerMove = (e) => {
    if (!isDrawing || !drawMode) return;
    const ctx = ctxRef.current;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    if (tool === "erase") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const pointerUp = (e) => {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    ctx.closePath();
    setIsDrawing(false);
    if (e && e.pointerId && canvasRef.current.releasePointerCapture) canvasRef.current.releasePointerCapture(e.pointerId);
    setDrawingHistory((prev) => {
      const newH = [...prev, canvasRef.current.toDataURL()];
      setRedoStack([]);
      return newH;
    });
  };

  const clearCanvas = () => {
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawingHistory([]);
    setRedoStack([]);
  };

  const undo = () => {
    if (drawingHistory.length === 0) return;
    const newHistory = [...drawingHistory];
    const last = newHistory.pop();
    setRedoStack((r) => [...r, last]);
    const ctx = ctxRef.current;
    const img = new Image();
    const prev = newHistory[newHistory.length - 1];
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0);
    };
    if (prev) img.src = prev;
    else ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setDrawingHistory(newHistory);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const newRedo = [...redoStack];
    const restore = newRedo.pop();
    setRedoStack(newRedo);
    const ctx = ctxRef.current;
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = restore;
    setDrawingHistory((h) => [...h, restore]);
  };

  const getLanguageId = (lang) => ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

  const runCode = async () => {
    setLoading(true);
    setTerminalOpen(true);
    setOutput("⏳ Compiling and running your code...");
    try {
      const payload = {
        language_id: getLanguageId(language),
        source_code: code,
        stdin: input,
      };
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
          },
        }
      );
      const { stdout, stderr, compile_output, time } = res.data;
      const result = stdout ? `🟢 Output:\n${stdout}\n\n⏱ Execution Time: ${time}s` : stderr || compile_output || "⚠️ No output.";
      setOutput(result);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error executing code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 flex flex-col relative select-none">
      <div className="flex justify-between items-center px-4 py-2 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Terminal size={16} className="text-blue-400" /> Playground
          </h1>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-[#2d2d2d] text-gray-200 px-2 py-1 rounded text-sm border border-[#3c3c3c]">
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={runCode} disabled={loading} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition">
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
            {loading ? "Running..." : "Run"}
          </button>

          <button onClick={() => setDrawMode(!drawMode)} className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md ${drawMode ? "bg-green-600 hover:bg-green-700 text-white" : "bg-[#333] hover:bg-[#444] text-gray-200"}`}>
            <Brush size={16} /> {drawMode ? "Close Draw" : "Draw"}
          </button>

          <button onClick={() => setTerminalOpen(!terminalOpen)} className="text-gray-300 hover:text-gray-100 px-2 text-sm">{terminalOpen ? "▾ Terminal" : "▸ Terminal"}</button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <Editor height={terminalOpen ? "70vh" : "85vh"} language={language === "cpp" ? "cpp" : language} theme="vs-dark" value={code} onChange={(v) => setCode(v || "")} options={{ fontSize: 15, minimap: { enabled: false }, automaticLayout: true, wordWrap: "on" }} />

        {drawMode && (
          <>
            <canvas ref={canvasRef} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} className="absolute top-0 left-0 w-full h-full z-10 cursor-crosshair" />

            <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#252526]/90 backdrop-blur-md border border-[#333] rounded-lg p-2 z-20 shadow-lg">
              <button onClick={() => setTool("draw")} className={`p-2 rounded ${tool === "draw" ? "bg-blue-600" : "hover:bg-[#333]"}`}><Pencil size={16} /></button>
              <button onClick={() => setTool("erase")} className={`p-2 rounded ${tool === "erase" ? "bg-orange-600" : "hover:bg-[#333]"}`}><Eraser size={16} /></button>
              <button onClick={undo} className="p-2 rounded hover:bg-[#333]"><RotateCcw size={16} /></button>
              <button onClick={redo} className="p-2 rounded hover:bg-[#333]"><RotateCw size={16} /></button>
              <button onClick={clearCanvas} className="p-2 rounded hover:bg-[#333] text-red-400"><Trash2 size={16} /></button>
              <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} className="w-7 h-7 rounded cursor-pointer bg-transparent border-none" />
              <input type="range" min="1" max="10" value={strokeWidth} onChange={(e) => setStrokeWidth(parseInt(e.target.value))} className="w-20 accent-blue-500" />
            </div>
          </>
        )}
      </div>

      {terminalOpen && (
        <div ref={terminalRef} className="bg-[#1e1e1e] border-t border-[#333] p-3 text-sm font-mono text-[#c6c6c6] max-h-[35vh] overflow-auto">
          <div className="text-xs text-gray-400 mb-1">TERMINAL</div>
          <pre className="whitespace-pre-wrap text-gray-100 mb-3">{output}</pre>
          <div className="text-gray-400 text-xs mb-1">Enter your input below (stdin):</div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type input here and press Run..." rows={3} className="w-full bg-[#252526] text-gray-100 p-2 rounded border border-[#333] focus:outline-none resize-none" />
        </div>
      )}

      {/* Embedded AI assistant */}
      <AIAssistant getCode={() => code} applyCode={(newCode) => setCode(newCode)} />
    </div>
  );
}
