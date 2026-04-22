"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, MinusCircle } from "lucide-react";
import { useChat } from "ai/react";

export default function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize session ID
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    // Check for existing session or create new one
    let sid = localStorage.getItem("devmind_chat_session");
    if (!sid) {
      sid = "session_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("devmind_chat_session", sid);
    }
    setSessionId(sid);
  }, []);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: { sessionId },
    onError: (err) => {
      console.error("Chat error:", err);
    }
  });

  // Load initial messages if available
  useEffect(() => {
    const saved = localStorage.getItem(`chat_history_${sessionId}`);
    if (saved && messages.length === 0) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {}
    }
  }, [sessionId, setMessages, messages.length]);

  // Save messages locally as backup
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasUnread(false);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`chat_history_${sessionId}`);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {!isOpen && hasUnread && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-4 mr-2 mb-2 max-w-[250px] relative"
            >
              <button 
                onClick={() => setHasUnread(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hi! I'm DevMind AI. How can I help you with your project today?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative ${
            isOpen 
              ? "bg-gray-900 text-white dark:bg-gray-800" 
              : "btn-glow bg-blue-600 text-white hover:scale-110"
          }`}
          aria-label="Toggle AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          {!isOpen && hasUnread && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-[#030712] rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg leading-tight">DevMind AI</h3>
                  <div className="flex items-center gap-1.5 text-xs text-blue-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button onClick={clearChat} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-100 hover:text-white" title="Clear chat">
                    <MinusCircle className="w-4 h-4" />
                  </button>
                )}
                <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/20">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-heading font-bold text-gray-900 dark:text-white mb-2">How can I help?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                    I can answer questions about our services, pricing, technical capabilities, and project timelines.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    {["What services do you offer?", "How much does a SaaS cost?", "What is your tech stack?"].map(q => (
                      <button 
                        key={q}
                        onClick={() => handleInputChange({ target: { value: q } } as any)}
                        className="text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-full text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors"
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
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2`}
                  >
                    <div className={`flex max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"} gap-2`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        m.role === "user" 
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300" 
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      }`}>
                        {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div
                        className={`px-4 py-3 rounded-2xl text-sm ${
                          m.role === "user"
                            ? "bg-blue-600 text-white rounded-tr-sm"
                            : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 shadow-sm rounded-tl-sm"
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
                  <div className="flex gap-2 max-w-[85%]">
                     <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-tl-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 shrink-0">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-full p-1 border border-transparent focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shrink-0"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 translate-x-px" />}
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">Powered by DevMind AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
