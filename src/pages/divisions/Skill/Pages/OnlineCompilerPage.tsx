// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { Play, Loader2, Terminal } from "lucide-react";

export default function OnlineCompilerPage() {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const terminalRef = useRef(null);

  // 🧠 Sample code templates
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

  const getLanguageId = (lang) =>
    ({ cpp: 54, c: 50, java: 62, python: 71, javascript: 63 }[lang] || 63);

  /* ===========================================================
     🧩 Run Code (Java dynamic class support)
  =========================================================== */
  const runCode = async () => {
    setLoading(true);
    setTerminalOpen(true);
    setOutput("⏳ Compiling and running your code...");

    try {
      let payload = {
        language_id: getLanguageId(language),
        stdin: input,
      };

      // 🧠 For Java — detect class name and compile accordingly
      if (language === "java") {
        const match = code.match(/class\s+([A-Za-z_]\w*)/);
        const className = match ? match[1] : "Main"; // Default fallback
        payload = {
          ...payload,
          source_code: code,
          command: `javac ${className}.java && java ${className}`,
          files: [
            {
              name: `${className}.java`,
              content: code,
            },
          ],
        };
      } else {
        // Other languages (C, C++, Python, JS)
        payload.source_code = code;
      }

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

      const { stdout, stderr, compile_output, message, time } = res.data;
      const result =
        stdout
          ? `🟢 Output:\n${stdout}\n\n⏱ Execution Time: ${time}s`
          : stderr || compile_output || message || "⚠️ No output.";

      setOutput(result);
    } catch (err) {
      console.error("Execution error:", err);
      setOutput("❌ Error executing code. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  /* ===========================================================
     💻 VS Code UI
  =========================================================== */
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-200 flex flex-col">
      {/* 🧭 Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#252526] border-b border-[#333]">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Terminal size={16} className="text-blue-400" />
            PlayGround
          </h1>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#2d2d2d] text-gray-200 px-2 py-1 rounded text-sm border border-[#3c3c3c] focus:outline-none"
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
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Play size={16} />}
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

      {/* 🧠 Editor */}
      <div className="flex-1">
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
      </div>

      {/* 🖥 Terminal */}
      {terminalOpen && (
        <div
          ref={terminalRef}
          className="bg-[#1e1e1e] border-t border-[#333] p-3 text-sm font-mono text-[#c6c6c6] max-h-[35vh] overflow-auto"
        >
          <div className="text-xs text-gray-400 mb-1">TERMINAL</div>
          <pre className="whitespace-pre-wrap text-gray-100 mb-3">{output}</pre>
          <div className="text-gray-400 text-xs mb-1"> Enter your input below (stdin):</div>
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
