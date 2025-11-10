// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";
import { Loader2, Play, Sparkles, Terminal, Settings, FileText } from "lucide-react";
import AIAssistant from "../Pages/AIAssistant";

/**
 * DashboardPage
 * - Monaco Editor (code editor)
 * - Run Code via Judge0 API
 * - Integrated AI Assistant
 * - Terminal-style output
 * - Supabase User Session
 */

export default function DashboardPage({ user, supabase = lmsSupabaseClient }) {
  const [code, setCode] = useState(
    localStorage.getItem("focsera_code") ||
      `#include <iostream>
using namespace std;
int main() {
  int n;
  cin >> n;
  cout << "You entered: " << n << endl;
  return 0;
}`
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("focsera_lang") || "cpp"
  );
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const terminalRef = useRef(null);

  const templates = {
    cpp: `#include <iostream>\nusing namespace std;\nint main(){\n  int a; cin >> a; cout << "You entered: " << a; return 0;\n}`,
    java: `import java.util.*;\npublic class Main {\n  public static void main(String[] args){\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    System.out.println("You entered: " + a);\n  }\n}`,
    python: `n = input()\nprint("You entered:", n)`,
    c: `#include <stdio.h>\nint main(){\n  int a; scanf("%d", &a); printf("You entered: %d", a); return 0;\n}`,
    javascript: `const fs = require("fs");\nconst input = fs.readFileSync(0, "utf8").trim();\nconsole.log("You entered:", input);`,
  };

  // Save code and language to localStorage
  useEffect(() => {
    localStorage.setItem("focsera_code", code);
    localStorage.setItem("focsera_lang", language);
  }, [code, language]);

  // Scroll output to bottom automatically
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const getLanguageId = (lang) =>
    ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

  /** 🧠 Run code using Judge0 API */
  const runCode = async () => {
    setOutput("⏳ Running code...\n");
    setLoading(true);
    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: getLanguageId(language),
          stdin: input,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key": import.meta.env.VITE_JUDGE0_API_KEY,
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      const data = response.data;
      let result = "";

      if (data.stdout) result = data.stdout;
      else if (data.stderr) result = data.stderr;
      else if (data.compile_output) result = data.compile_output;
      else result = "⚠️ No output";

      setOutput(result);
    } catch (err) {
      console.error(err);
      setOutput("❌ Error running code. Check API key or network.");
    } finally {
      setLoading(false);
    }
  };

  /** 🧩 Auto-detect input requirement */
  const detectInputRequirement = () => {
    const needsInput =
      code.includes("cin >>") ||
      code.includes("Scanner") ||
      code.includes("input(") ||
      code.includes("scanf(");
    if (needsInput && !input.trim()) {
      setOutput(
        "⚠️ Detected code that expects input.\n💡 Enter input below before running."
      );
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-gray-200 flex flex-col items-center p-6 pt-24">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-6xl mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-400" />
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            SkillVerse Playground
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm"
          >
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button
            onClick={() => setCode(templates[language])}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm rounded-lg text-white"
          >
            Load Template
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/80 mb-4">
        <Editor
          height="60vh"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize,
            minimap: { enabled: false },
            automaticLayout: true,
            fontFamily: "'Fira Code', Consolas, monospace",
          }}
        />
      </div>

      {/* Input Section */}
      <div className="w-full max-w-6xl bg-slate-900/60 rounded-xl p-4 border border-white/10 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium text-sm flex items-center gap-2 text-cyan-300">
            <Terminal size={14} /> Input
          </label>
          <button
            onClick={() => setInput("")}
            className="text-xs text-gray-400 hover:text-red-400"
          >
            Clear
          </button>
        </div>
        <textarea
          className="w-full h-24 bg-black/50 rounded-md p-2 text-sm outline-none font-mono text-gray-200 resize-none"
          placeholder="Enter custom input (if program expects it)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => {
            if (!detectInputRequirement()) runCode();
          }}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Play size={16} />}
          {loading ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={() => setFontSize((s) => Math.min(s + 1, 30))}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm"
        >
          + Font
        </button>
        <button
          onClick={() => setFontSize((s) => Math.max(s - 1, 8))}
          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm"
        >
          - Font
        </button>
      </div>

      {/* Output Terminal */}
      <div className="w-full max-w-6xl bg-black/80 rounded-xl p-4 border border-white/10 font-mono text-sm text-green-400">
        <div className="flex items-center gap-2 mb-2 text-cyan-300">
          <FileText size={14} /> Output
        </div>
        <div
          ref={terminalRef}
          className="max-h-[300px] overflow-y-auto whitespace-pre-wrap"
        >
          {output || "💡 Output will appear here after you run your code."}
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant getCode={() => code} />
    </div>
  );
}
