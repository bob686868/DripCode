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
  ArrowLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [chatInput, setChatInput] = useState("");
  const { messages, sendMessage, status, setMessages } = useChat({
    api: "/api/chat",
    onError: (err) => console.error("Chat Error:", err),
  });

  const isCurrentlyLoading = status === "streaming" || status === "submitted";
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
    if (e) e.preventDefault();
    if (!chatInput?.trim() || isCurrentlyLoading) return;
    const textToSend = chatInput;
    setChatInput("");
    try {
      await sendMessage({ text: textToSend });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleQuickPrompt = async (promptText) => {
    if (isCurrentlyLoading) return;
    try {
      await sendMessage({ text: promptText });
    } catch (err) {
      console.error("Quick prompt error:", err);
    }
  };

  const starterPrompts = [
    "Recommend lightweight sneakers & running shoes",
    "Show me warm jackets & hoodies for winter",
    "What tech backpacks or sling bags are available?",
    "Tell me about noise-cancelling headphones",
  ];

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center p-2 sm:p-4 font-sans text-slate-200">
      <div className="flex flex-col w-full max-w-4xl h-[90vh] max-h-[850px] border border-slate-800 rounded-3xl bg-[#0f172a]/95 backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(99,102,241,0.25)] overflow-hidden">
        {/* Header: Acme Branding & Navigation */}
        <div className="px-5 py-4 bg-[#1e293b]/70 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs font-medium transition"
              title="Return to Store"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Store</span>
            </Link>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <ShoppingBag size={20} className="text-white" />
            </div>

            <div>
              <h2 className="font-bold text-white tracking-tight text-base flex items-center gap-2">
                ACME <span className="text-indigo-400">AI Assistant</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v2.0 Flash
                </span>
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                  384-Dim Vector Search Online
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setMessages([])}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all duration-200 flex items-center gap-1 text-xs border border-transparent hover:border-rose-500/20"
            title="Clear Conversation"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Message Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in fade-in zoom-in duration-500 px-4">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-25 rounded-full"></div>
                <div className="relative p-5 bg-slate-800/80 border border-indigo-500/30 rounded-2xl shadow-xl">
                  <Sparkles className="text-indigo-400 w-9 h-9 animate-pulse" />
                </div>
              </div>
              <div className="max-w-md">
                <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                  How can I help you shop today?
                </h3>
                <p className="text-slate-400 mt-2 text-sm leading-relaxed">
                  Ask me for product recommendations, styles, sizes, or matching gear across all store categories.
                </p>
              </div>

              {/* Starter Prompt Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg pt-2">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="flex items-center gap-2 p-3 text-left bg-slate-800/60 hover:bg-indigo-600/20 border border-slate-700 hover:border-indigo-500/40 rounded-xl text-xs text-slate-300 hover:text-white transition group"
                  >
                    <Zap size={14} className="text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="truncate">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`flex gap-3 max-w-[90%] sm:max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                    m.role === "user"
                      ? "bg-slate-800 border-slate-700 text-slate-300"
                      : "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                  }`}
                >
                  {m.role === "user" ? <User size={15} /> : <Bot size={15} />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed border transition-colors shadow-lg ${
                    m.role === "user"
                      ? "bg-indigo-600/30 text-slate-100 border-indigo-500/40 rounded-tr-none"
                      : "bg-[#1e293b] text-slate-200 border-slate-700 rounded-tl-none"
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
            <div className="flex justify-start items-center gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Loader2 size={15} className="animate-spin" />
              </div>
              <div className="bg-[#1e293b] border border-slate-700 px-4 py-2.5 rounded-2xl rounded-tl-none shadow-md flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
                <span className="text-xs text-indigo-300 font-medium">
                  Finding best gear...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 sm:p-5 bg-[#1e293b]/40 border-t border-slate-800">
          <form onSubmit={handleFormSubmit} className="relative flex items-center group">
            <input
              className="w-full pl-5 pr-14 py-3.5 bg-slate-900/80 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-white placeholder:text-slate-500 text-sm font-medium transition"
              value={chatInput}
              placeholder="Ask about streetwear, footwear, hoodies, bags..."
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={isCurrentlyLoading || !chatInput.trim()}
              className="absolute right-2 p-2.5 bg-indigo-600 text-white rounded-xl disabled:bg-slate-800 disabled:text-slate-600 hover:bg-indigo-500 hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all active:scale-95 flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </form>
          <div className="flex justify-between items-center mt-3 px-2">
            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5">
              <Box size={11} className="text-indigo-400" /> Powered by Gemini Flash & pgvector
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              ACME Store © 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

