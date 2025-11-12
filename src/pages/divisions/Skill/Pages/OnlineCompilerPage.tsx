// @ts-nocheck
import { useState, useEffect, useRef } from "react";
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
  Palette,
} from "lucide-react";

export default function OnlineCompilerPage() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const terminalRef = useRef(null);

  // 🎨 Drawing state
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#00b4ff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [tool, setTool] = useState("draw");
  const [drawingHistory, setDrawingHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // 🧠 Code templates
  const templates = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Enter a number: ";
    int n;
    cin >> n;
    cout << "You entered: " << n << endl;
    return 0;
}`,
    c: `#include <stdio.h>
int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    printf("You entered: %d\\n", n);
    return 0;
}`,
    java: `import java.util.*;
class Hello {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name + "!");
    }
}`,
    python: `name = input("Enter your name: ")
print("Hello,", name)`,
    javascript: `let name = prompt("Enter your name:");
console.log("Hello, " + name);`,
  };

  // 🧠 Load default template on language change
  useEffect(() => {
    setCode(templates[language]);
    setOutput("");
  }, [language]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  // 🎨 Initialize canvas overlay
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
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [strokeColor, strokeWidth]);

  const startDrawing = (e) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.beginPath();
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    const rect = canvasRef.current.getBoundingClientRect();
    if (tool === "erase") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 20;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = strokeColor;
    }
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    setDrawingHistory((prev) => [...prev, canvasRef.current.toDataURL()]);
    setRedoStack([]);
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

  const getLanguageId = (lang) =>
    ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

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
      const result =
        stdout
          ? `🟢 Output:\n${stdout}\n\n⏱ Execution Time: ${time}s`
          : stderr || compile_output || "⚠️ No output.";
      setOutput(result);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error executing code.");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     💻 VS Code UI with Canvas Overlay
  =========================================================== */
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 flex flex-col relative">
      {/* 🧭 Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Terminal size={16} className="text-blue-400" />
            Playground
          </h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#2d2d2d] text-gray-200 px-2 py-1 rounded text-sm border border-[#3c3c3c]"
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Play size={16} />
            )}
            {loading ? "Running..." : "Run"}
          </button>
          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="text-gray-300 hover:text-gray-100 px-2 text-sm"
          >
            {terminalOpen ? "▾ Terminal" : "▸ Terminal"}
          </button>
        </div>
      </div>

      {/* 🧠 Editor + Canvas overlay */}
      <div className="relative flex-1">
        <Editor
          height={terminalOpen ? "70vh" : "85vh"}
          language={language === "cpp" ? "cpp" : language}
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v || "")}
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
          }}
        />
        {/* 🎨 Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair z-10 pointer-events-auto"
        />

        {/* 🧰 Floating Toolbar */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#252526]/80 backdrop-blur-sm border border-[#333] rounded-lg p-2 z-20">
          <button
            onClick={() => setTool("draw")}
            className={`p-2 rounded ${tool === "draw" ? "bg-blue-600" : "hover:bg-[#333]"}`}
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => setTool("erase")}
            className={`p-2 rounded ${tool === "erase" ? "bg-orange-600" : "hover:bg-[#333]"}`}
          >
            <Eraser size={16} />
          </button>
          <button onClick={undo} className="p-2 rounded hover:bg-[#333]">
            <RotateCcw size={16} />
          </button>
          <button onClick={redo} className="p-2 rounded hover:bg-[#333]">
            <RotateCw size={16} />
          </button>
          <button onClick={clearCanvas} className="p-2 rounded hover:bg-[#333] text-red-400">
            <Trash2 size={16} />
          </button>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            className="w-7 h-7 rounded cursor-pointer bg-transparent border-none"
          />
          <input
            type="range"
            min="1"
            max="10"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            className="w-20 accent-blue-500"
          />
        </div>
      </div>

      {/* 🖥 Terminal */}
      {terminalOpen && (
        <div
          ref={terminalRef}
          className="bg-[#1e1e1e] border-t border-[#333] p-3 text-sm font-mono text-[#c6c6c6] max-h-[35vh] overflow-auto"
        >
          <div className="text-xs text-gray-400 mb-1">TERMINAL</div>
          <pre className="whitespace-pre-wrap text-gray-100 mb-3">{output}</pre>
          <div className="text-gray-400 text-xs mb-1">
            Enter your input below (stdin):
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type input here and press Run..."
            rows={3}
            className="w-full bg-[#252526] text-gray-100 p-2 rounded border border-[#333] focus:outline-none resize-none"
          />
        </div>
      )}
    </div>
  );
}
