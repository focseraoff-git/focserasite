// src/pages/divisions/Skill/Pages/AIAssistant.tsx
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, X, Bot, Loader2, MessageSquare, GripVertical } from "lucide-react";

export default function AIAssistant({ editorRef, getCode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const chatRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  /* Auto-scroll */
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  /* Shortcut — Ctrl + Shift + C */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Dragging (move window) */
  const handleDragStart = (e) => {
    setDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };
  const handleDragMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
  };
  const handleDragEnd = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [dragging]);

  /* Send message */
  const sendMessage = async (customPrompt = null) => {
    const prompt = customPrompt || input.trim();
    if (!prompt) return;
    const newMsg = [...messages, { role: "user", content: prompt }];
    setMessages(newMsg);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("/api/chat", { messages: newMsg, code: getCode() });
      const reply = res.data.reply || "No response.";
      setMessages([...newMsg, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsg, { role: "assistant", content: "⚠️ Error: unable to reach AI." }]);
    } finally {
      setLoading(false);
    }
  };

  /* Add context menu in Monaco: Ask AI about this */
  useEffect(() => {
    if (!editorRef?.current) return;
    const editor = editorRef.current;
    const monaco = window.monaco;
    if (!monaco) return;

    editor.addAction({
      id: "ask-ai",
      label: "Ask Focsera AI about this",
      contextMenuGroupId: "navigation",
      run: () => {
        const selection = editor.getModel().getValueInRange(editor.getSelection());
        if (!selection.trim()) return alert("Select code to ask AI about!");
        setOpen(true);
        sendMessage(`Explain this selected code:\n${selection}`);
      },
    });
  }, [editorRef]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-8 right-8 z-[999] bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-full shadow-lg"
      >
        {open ? <X size={20} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-8 w-96 max-h-[75vh] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[999]"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-3 border-b border-white/10 cursor-move select-none"
            onMouseDown={handleDragStart}
          >
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              <Bot size={18} /> Focsera AI
            </div>
            <GripVertical size={16} className="text-gray-400" />
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-auto p-3 space-y-3 text-sm">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">
                💡 Ask me to explain, fix, or optimize your code!
              </div>
            ) : (
              messages.map((m, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-blue-600/40 text-white ml-10"
                      : "bg-white/10 text-gray-100 mr-10"
                  }`}
                >
                  {m.content}
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-center">
                <Loader2 size={20} className="animate-spin text-blue-400" />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask anything about your code..."
              className="flex-1 bg-white/10 text-gray-100 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
