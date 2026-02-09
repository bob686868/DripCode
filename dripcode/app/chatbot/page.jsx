"use client";

import { useChat } from "@ai-sdk/react";
import {
  Send,
  Bot,
  User,
  Loader2,
  Trash2,
  ShoppingBag,
  Sparkles,
  Box,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [chatInput, setChatInput] = useState("");
  const { messages, sendMessage, status, setMessages } = useChat({
    api: "/api/chat",
    onError: (err) => console.error("Chat Error:", err),
  });


const isCurrentlyLoading = status === 'streaming' || status === 'submitted';
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput?.trim() || isCurrentlyLoading) return;
    try {
      await sendMessage({ text: chatInput });
      setChatInput("");
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto h-[750px] border border-slate-800 rounded-3xl bg-[#0f172a] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden  font-sans text-slate-200">
      {/* Header: Dark Acme Branding */}
      <div className="px-6 py-5 bg-[#1e293b]/50 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <ShoppingBag size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white tracking-tight text-lg italic">
              ACME <span className="text-indigo-400">OS</span>
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                System Active
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setMessages([])}
          className="p-2.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-200"
          title="Reset System"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* Message Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>
              <div className="relative p-6 bg-slate-800/50 border border-slate-700 rounded-full">
                <Sparkles className="text-indigo-400 w-10 h-10" />
              </div>
            </div>
            <div>
              <h3 className="text-white text-2xl font-black italic tracking-tighter">
                INITIAL ACME_PROTO
              </h3>
              <p className="text-slate-400 max-w-[300px] mt-2 leading-relaxed text-sm font-medium">
                Scanning inventory... Query the database for high-performance
                gear.
              </p>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-3 duration-300`}
          >
            <div
              className={`flex gap-4 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 border ${
                  m.role === "user"
                    ? "bg-slate-800 border-slate-700 text-slate-400"
                    : "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                }`}
              >
                {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>

              <div
                className={`p-4 rounded-2xl text-[15px] leading-relaxed border transition-colors ${
                  m.role === "user"
                    ? "bg-slate-800 text-slate-100 border-slate-700 rounded-tr-none"
                    : "bg-[#1e293b] text-slate-200 border-slate-700 rounded-tl-none shadow-xl"
                }`}
              >
                <div className="whitespace-pre-wrap font-normal selection:bg-indigo-500 selection:text-white">
                  {m.parts
                    ?.filter((p) => p.type === "text")
                    .map((p) => p.text)
                    .join("") || m.content}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isCurrentlyLoading && (
          <div className="flex justify-start items-center gap-4 animate-pulse">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Loader2 size={16} className="animate-spin text-white" />
            </div>
            <div className="bg-[#1e293b] border border-slate-700 px-5 py-3 rounded-2xl rounded-tl-none shadow-lg">
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">
                Processing Data...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-6 bg-[#1e293b]/30 border-t border-slate-800">
        <form
          onSubmit={handleFormSubmit}
          className="relative flex items-center group"
        >
          <input
            className="w-full pl-6 pr-16 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-slate-900 transition-all text-white placeholder:text-slate-500 font-medium"
            value={chatInput}
            placeholder="Command the AI assistant..."
            onChange={(e)=>setChatInput(e.target.value)}
          />
          <button
            type="submit"
disabled={isCurrentlyLoading || !chatInput.trim()}
            className="absolute right-2 p-3 bg-indigo-600 text-white rounded-xl disabled:bg-slate-800 disabled:text-slate-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-95 flex items-center justify-center shadow-lg"
          >
            <Send size={18} />
          </button>
        </form>
        <div className="flex justify-between items-center mt-4 px-2">
          <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em] flex items-center gap-2">
            <Box size={10} /> Vector-Engine-01
          </span>
          <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">
            Acme Corporation © 2026
          </span>
        </div>
      </div>
    </div>
  );
}
