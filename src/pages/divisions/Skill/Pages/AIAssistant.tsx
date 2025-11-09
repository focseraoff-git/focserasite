// @ts-nocheck
import React, { useState } from "react";
import { Send, Loader2, Bot, MessageSquareX, MessageCircle } from "lucide-react";

/**
 * Retry fetch with exponential backoff for 429/5xx errors.
 */
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

export default function AIAssistant({ getCode }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  /**
   * Clean and format Gemini response text
   */
  const formatResponse = (text) => {
    if (!text) return "";
    return text
      // Remove markdown headings (#, ##, ###)
      .replace(/^#+\s?/gm, "")
      // Remove * and - bullets
      .replace(/^[\*\-]\s?/gm, "")
      // Clean numbered points formatting
      .replace(/(\d+)\.\s*/g, "<b>$1.</b> ")
      // Remove code markers
      .replace(/```([\s\S]*?)```/g, "<pre class='code-block'>$1</pre>")
      // Italics and bold cleanup
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "$1")
      // Convert newlines to <br> for HTML rendering
      .replace(/\n/g, "<br>");
  };

  const sendMessage = async () => {
    if (!GEMINI_API_KEY) {
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content:
            "⚠️ Missing Gemini API Key.\nAdd `VITE_GEMINI_API_KEY=your_key` to `.env` and restart.",
        },
      ]);
      return;
    }

    if (!input.trim()) return;

    const userMsg = input.trim();
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
                text: `You are a programming tutor. Give clean, formatted explanations without markdown symbols or stars.
Focus on clarity, numbered steps, and short points.

Code:
${getCode()}

Question:
${userMsg}`,
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
        const msg =
          err.error?.message ||
          `⚠️ API Error: ${res.status} ${res.statusText}`;
        setMessages((p) => [...p, { role: "assistant", content: msg }]);
        return;
      }

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text)
          ?.join("\n") || "⚠️ No response from Gemini.";

      setMessages((p) => [
        ...p,
        { role: "assistant", content: formatResponse(text) },
      ]);
    } catch (e) {
      console.error("❌ Gemini Error:", e);
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "⚠️ Network or API error." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Floating bubble view
  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white p-4 rounded-full shadow-2xl z-50 flex items-center justify-center"
      >
        <MessageCircle size={22} />
      </button>
    );

  return (
    <div className="fixed bottom-6 right-6 w-[400px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600/30 to-cyan-400/20 border-b border-white/10">
        <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
          <Bot size={16} /> FocserAI
        </div>
        <button
          onClick={() => setOpen(false)}
          className="p-1 rounded hover:bg-white/10 text-gray-300"
        >
          <MessageSquareX size={16} />
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto max-h-[340px] p-3 space-y-3 text-sm">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center">
            💬 Hi there! Ask me anything about your code.
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600/30 text-blue-100 ml-auto w-fit max-w-[85%]"
                : "bg-gray-800/60 text-gray-100 mr-auto w-fit max-w-[85%]"
            }`}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        ))}
        {loading && (
          <div className="text-center text-cyan-300 animate-pulse text-sm">
            Thinking...
          </div>
        )}
      </div>

      {/* Quick action buttons */}
      <div className="border-t border-white/10 px-3 py-2 bg-slate-900/70 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => {
            setInput("Explain my code clearly in short points");
            sendMessage();
          }}
          className="text-xs bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 px-3 py-1.5 rounded-lg transition"
        >
          💡 Explain
        </button>
        <button
          onClick={() => {
            setInput("Find and fix errors in my code");
            sendMessage();
          }}
          className="text-xs bg-green-600/20 hover:bg-green-600/30 border border-green-500/40 text-green-300 px-3 py-1.5 rounded-lg transition"
        >
          🧩 Fix Errors
        </button>
        <button
          onClick={() => {
            setInput("Optimize my code for readability and speed");
            sendMessage();
          }}
          className="text-xs bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 px-3 py-1.5 rounded-lg transition"
        >
          ⚡ Optimize
        </button>
        <button
          onClick={() => {
            setInput("Add helpful inline comments in my code");
            sendMessage();
          }}
          className="text-xs bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 px-3 py-1.5 rounded-lg transition"
        >
          ✏️ Comment
        </button>
      </div>

      {/* Input box */}
      <div className="border-t border-white/10 p-2 flex items-center gap-2 bg-slate-900/80">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          placeholder="Ask Gemini about your code..."
          className="flex-1 bg-transparent text-gray-200 outline-none text-sm px-2"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 px-3 py-2 rounded-lg text-white text-sm flex items-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </div>

      <style>{`
        .code-block {
          background: #1e293b;
          padding: 8px 12px;
          border-radius: 8px;
          font-family: 'Fira Code', monospace;
          font-size: 13px;
          white-space: pre-wrap;
          color: #a5f3fc;
          border: 1px solid rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}
