"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Bot } from "lucide-react";

const ChatFloatingButton = () => {
  const pathname = usePathname();

  // Don't show floating button if already on the chatbot page
  if (pathname === "/chatbot") return null;

  return (
    <aside aria-label="AI Shopping Assistant" className="fixed bottom-6 right-6 z-40">
      <Link
        href="/chatbot"
        className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-full shadow-[0_8px_30px_rgb(99,102,241,0.4)] hover:shadow-[0_8px_35px_rgb(99,102,241,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 border border-indigo-400/30 backdrop-blur-md"
        title="Chat with AI Shopping Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        
        <div className="flex items-center gap-1.5 font-medium text-sm tracking-wide">
          <Bot className="w-4 h-4 text-indigo-100 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-semibold">Ask AI</span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
        </div>
      </Link>
    </aside>
  );
};

export default ChatFloatingButton;
