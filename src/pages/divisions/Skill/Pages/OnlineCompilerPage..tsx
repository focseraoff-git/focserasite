// @ts-nocheck
import { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { Play, Loader2, Maximize2, Minimize2 } from "lucide-react";
import { lmsSupabaseClient } from "../../../../lib/ssupabase";

export default function OnlineCompilerPage() {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 🧠 Load logged-in user
  useEffect(() => {
    const session = lmsSupabaseClient.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
    });
  }, []);

  // 🔁 Default code for each language
  const codeTemplates = {
    cpp: `#include <iostream>
using namespace std;
int main(){
  cout << "Hello World!";
  return 0;
}`,
    c: `#include <stdio.h>
int main(){
  printf("Hello World!");
  return 0;
}`,
    java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}`,
    python: `print("Hello World!")`,
    javascript: `console.log("Hello World!");`,
  };

  // 🧩 Set initial code when language changes
  useEffect(() => {
    setCode(codeTemplates[language]);
  }, [language]);

  // 🔢 Judge0 Language IDs
  const getLanguageId = (lang) => {
    switch (lang) {
      case "cpp": return 54;
      case "c": return 50;
      case "java": return 62;
      case "python": return 71;
      case "javascript": return 63;
      default: return 63;
    }
  };

  // ▶ Run Code
  const handleRun = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: getLanguageId(language),
          stdin: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "ddad48de98mshcfa84bd23318ed6p1f81e1jsnbc11733943a9", // Replace with env key later
          },
        }
      );

      const { stdout, stderr, compile_output, time } = response.data;
      const resultOutput =
        stdout
          ? `${stdout}\n\nExecution Time: ${time}s`
          : stderr || compile_output || "No output";

      setOutput(resultOutput);

      // ✅ Save to Supabase
      if (user) {
        await lmsSupabaseClient.from("submissions").insert([
          {
            user_id: user.id,
            title: "SkillLab Online Run",
            language,
            code,
            output: resultOutput,
            status: stderr || compile_output ? "error" : "success",
            execution_time: time || null,
            submitted_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (err) {
      setOutput("⚠️ Error executing code");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🧭 Toggle fullscreen mode
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div
      className={`${
        isFullscreen
          ? "fixed inset-0 bg-gray-900 z-50"
          : "min-h-screen bg-gray-100 p-6"
      } font-inter transition-all`}
    >
      <div
        className={`${
          isFullscreen
            ? "w-full h-full flex flex-col"
            : "max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6"
        }`}
      >
        {/* Top Toolbar */}
        <div
          className={`flex justify-between items-center mb-4 ${
            isFullscreen ? "bg-gray-800 px-4 py-3 rounded-t-xl text-white" : ""
          }`}
        >
          <h2 className="text-xl font-semibold">
            SkillLab Online Compiler
          </h2>

          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`border rounded-lg px-3 py-2 text-sm ${
                isFullscreen ? "text-black" : ""
              }`}
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
              className={`flex items-center gap-2 ${
                isFullscreen
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } px-5 py-2 rounded-lg transition`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Play size={16} />
              )}
              {loading ? "Running..." : "Run"}
            </button>

            <button
              onClick={toggleFullscreen}
              className={`flex items-center gap-2 ${
                isFullscreen
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              } px-3 py-2 rounded-lg transition`}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 size={16} /> Exit
                </>
              ) : (
                <>
                  <Maximize2 size={16} /> Fullscreen
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex-1 border rounded-xl overflow-hidden">
          <MonacoEditor
            height={isFullscreen ? "calc(100vh - 220px)" : "400"}
            language={language === "cpp" ? "cpp" : language}
            value={code}
            theme={isFullscreen ? "vs-dark" : "vs-dark"}
            onChange={setCode}
            options={{
              fontSize: 14,
              automaticLayout: true,
              minimap: { enabled: false },
            }}
          />
        </div>

        {/* Output Section */}
        <div
          className={`mt-4 ${
            isFullscreen
              ? "bg-gray-950 text-green-400 border border-gray-700 p-4 rounded-lg overflow-auto h-[25vh]"
              : "bg-gray-900 text-green-400 p-3 rounded-lg overflow-auto min-h-[120px]"
          }`}
        >
          <h3
            className={`font-semibold mb-2 ${
              isFullscreen ? "text-white" : "text-gray-200"
            }`}
          >
            Output:
          </h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}
