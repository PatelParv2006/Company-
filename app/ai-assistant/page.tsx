"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Bot, User, Send, Loader2, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AIAssistantPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let sid = localStorage.getItem("devmind_chat_session");
    if (!sid) {
      sid = "session_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("devmind_chat_session", sid);
    }
    setSessionId(sid);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: { sessionId }
  });

  useEffect(() => {
    const saved = localStorage.getItem(`chat_history_${sessionId}`);
    if (saved && messages.length === 0) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, [sessionId, setMessages, messages.length]);

  useEffect(() => {
    if (messages.length > 0 && sessionId) {
      localStorage.setItem(`chat_history_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[80vh] flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-500 dark:text-gray-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">DevMind AI Assistant</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Always online
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                  <Bot className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">Welcome to DevMind Studio</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  I'm your AI guide. Ask me about our services, past projects, pricing estimates, or technical capabilities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
                  {[
                    "How much does a custom SaaS cost?",
                    "What technologies do you use?",
                    "Can you build a mobile app?",
                    "How long does a project take?"
                  ].map(q => (
                    <button
                      key={q}
                      onClick={() => handleInputChange({ target: { value: q } } as any)}
                      className="p-3 text-sm text-left rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, index) => (
                <div
                  key={index}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] md:max-w-[75%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"} gap-3 md:gap-4`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                      m.role === "user" 
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700" 
                        : "bg-gradient-to-br from-blue-500 to-violet-600 text-white"
                    }`}>
                      {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                    </div>
                    <div
                      className={`px-5 py-4 rounded-2xl text-[15px] leading-relaxed ${
                        m.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm shadow-md"
                          : "bg-gray-50 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm rounded-tl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[75%]">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="px-5 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm rounded-tl-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800">
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Message DevMind AI..."
                className="w-full bg-gray-100 dark:bg-gray-900 rounded-2xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-gray-900 dark:text-white placeholder-gray-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 translate-x-px translate-y-px" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
