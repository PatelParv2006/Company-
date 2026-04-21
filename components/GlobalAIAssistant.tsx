"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

// Keyword-based fallback responses
function getFallbackResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("estimate") || lower.includes("cost") || lower.includes("price") || lower.includes("saas")) {
    return "Our projects start at ₹15,000 for simple sites and go up to ₹1,50,000+ for SaaS. Try our Cost Estimator at /estimator for a detailed breakdown.";
  } else if (lower.includes("tech") || lower.includes("stack")) {
    return "We use React, Next.js, Tailwind CSS, Node.js, PostgreSQL, and deploy on AWS/Vercel. We pick the best stack for your needs.";
  } else if (lower.includes("time") || lower.includes("long")) {
    return "Simple sites: 2-4 weeks. Web apps: 4-8 weeks. Full SaaS: 12-24 weeks. We work in agile sprints.";
  } else if (lower.includes("project") || lower.includes("portfolio")) {
    return "Check out our Projects page for case studies including a Billing App, E-Commerce platform, and SaaS Dashboard.";
  }
  return "Thanks for reaching out! For detailed answers, please visit our Contact page at /contact or try the full AI Assistant at /ai-assistant.";
}

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

export default function GlobalAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    let initialMessage = "Hello! How can I help you today? Ask me about our services or projects.";
    
    if (pathname === "/estimator") {
      initialMessage = "Hello! I notice you're configuring a project estimate. I can help you choose the right features and complexity level.";
    } else if (pathname === "/") {
      initialMessage = "Hello! I'm the DevMind AI assistant. Ask me anything about our services, projects, or pricing.";
    }
    
    if (messages.length === 0) {
      setMessages([{ id: "initial", role: "assistant", content: initialMessage }]);
    }
  }, [pathname]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        }),
      });

      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiContent = "";
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMsgId, role: "assistant", content: "" }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const textContent = JSON.parse(line.slice(2));
                aiContent += textContent;
                setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, content: aiContent } : m));
              } catch { /* skip */ }
            }
          }
        }
      }
    } catch {
      const fallback = getFallbackResponse(text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: fallback }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (!mounted) return null;

  return (
    <>
      <motion.button
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full transition-all ${
          theme === "dark" 
            ? "bg-[#111827] border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.6)]" 
            : "bg-blue-600 shadow-xl"
        }`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 z-50 flex flex-col bg-white dark:bg-[#111827] shadow-2xl border-l border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0b0f19]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white leading-tight">DevMind AI</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Powered by DevMind Studio</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-[#111827]">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div 
                      className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        msg.role === "user" 
                          ? "bg-blue-600 text-white rounded-tr-sm" 
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-200 dark:border-gray-700 whitespace-pre-wrap"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                     <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-sm border border-gray-200 dark:border-gray-700 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                     </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-white dark:bg-[#111827] border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-wrap gap-2 mb-3">
                  <button onClick={() => sendMessage("Estimate for SaaS?")} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-700">Estimate for SaaS?</button>
                  <button onClick={() => sendMessage("What's your tech stack?")} className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border border-gray-200 dark:border-gray-700">Tech Stack?</button>
                </div>
                
                <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask DevMind AI..."
                    className="w-full bg-gray-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
