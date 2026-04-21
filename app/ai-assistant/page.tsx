"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, AlertTriangle } from "lucide-react";

// Keyword-based fallback responses when AI API is unavailable
function getFallbackResponse(text: string): string {
  const lower = text.toLowerCase();
  
  if (lower.includes("estimate") || lower.includes("cost") || lower.includes("price")) {
    return "Our projects typically start at ₹15,000 for static sites and scale up to ₹1,50,000+ for complex SaaS platforms. You can get a detailed breakdown using our Cost Estimator tool at /estimator.";
  } else if (lower.includes("tech") || lower.includes("stack") || lower.includes("technologies")) {
    return "We specialize in modern web and mobile technologies. Frontend: React, Next.js, Tailwind CSS. Backend: Node.js, Python, PostgreSQL, GraphQL. Deployment: AWS, Vercel, Docker. We choose the best stack based on your project needs.";
  } else if (lower.includes("time") || lower.includes("long") || lower.includes("timeline")) {
    return "Development timelines vary based on complexity:\n• Simple website: 2–4 weeks\n• Web application: 4–8 weeks\n• Full SaaS platform: 12–24 weeks\nWe work in agile sprints to deliver value continuously.";
  } else if (lower.includes("project") || lower.includes("portfolio") || lower.includes("work")) {
    return "We've built a Billing Web Application for enterprise finance teams, an E-Commerce platform with a headless storefront architecture, and a SaaS Dashboard with drag-and-drop Kanban and AI integration. Visit our Projects page for detailed case studies.";
  } else if (lower.includes("service") || lower.includes("offer") || lower.includes("what do you")) {
    return "DevMind Studio offers:\n• Custom Web Applications (Next.js, React)\n• SaaS Platform Development\n• Mobile App Development\n• UI/UX Design\n• API & Backend Engineering\n• Ongoing Maintenance & Support\n\nVisit /services for full details.";
  } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("reach")) {
    return "You can reach us via our Contact page at /contact. Fill out the form and our team will get back to you within 24 hours with a free consultation.";
  }
  
  return "Thanks for your question! I'm currently running in offline mode. For detailed inquiries, please use our Contact page at /contact, or try our Cost Estimator at /estimator for project pricing.";
}

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", role: "assistant", content: "Welcome to DevMind AI. I can answer questions about our services, process, technology stack, and provide rough estimates. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable, setApiAvailable] = useState(true);

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

      if (!res.ok) {
        throw new Error(`API returned ${res.status}`);
      }

      // Stream the response
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
          // Parse SSE data chunks from the Vercel AI SDK stream
          const lines = chunk.split("\n");
          for (const line of lines) {
            if (line.startsWith("0:")) {
              // Text chunk from AI SDK data stream protocol
              try {
                const textContent = JSON.parse(line.slice(2));
                aiContent += textContent;
                setMessages(prev => 
                  prev.map(m => m.id === aiMsgId ? { ...m, content: aiContent } : m)
                );
              } catch {
                // Skip non-JSON lines
              }
            }
          }
        }
      }
    } catch {
      // Fallback to keyword-based responses
      setApiAvailable(false);
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

  const suggestions = [
    "Estimate cost for a SaaS platform",
    "What technologies do you use?",
    "Show me your best projects",
    "How long does development take?"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] py-12 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4 flex-1 flex flex-col h-full">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-4">
            <Bot className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">AI Project Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">Ask questions and get instant answers about our services.</p>
        </div>

        {!apiAvailable && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl text-sm text-yellow-800 dark:text-yellow-300"
          >
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>AI service is temporarily unavailable. Using smart offline responses.</span>
          </motion.div>
        )}

        <div className="flex-1 bg-gray-50 dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col mb-8 min-h-[500px]">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" : "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800"
                }`}>
                  {msg.role === "user" ? <User className="w-4 h-4 text-gray-600 dark:text-gray-400" /> : <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-sm" 
                    : "bg-white dark:bg-[#0f131d] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-tl-sm shadow-sm"
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-[#0f131d] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-tl-sm shadow-sm flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-[#0f131d] border-t border-gray-200 dark:border-gray-800">
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((sug, i) => (
                  <button 
                    key={i}
                    onClick={() => sendMessage(sug)}
                    className="text-xs sm:text-sm px-4 py-2 rounded-full bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-3 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-full pl-6 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
