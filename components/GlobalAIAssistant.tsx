"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useDevMindChat } from "@/components/chat/useDevMindChat";
import type { SiteSettings } from "@/lib/site-content";

const promptSuggestions = [
  "How much does a SaaS cost?",
  "What's your tech stack?",
  "Can you build mobile apps?",
  "How long does a project take?",
];

type GlobalAIAssistantProps = {
  settings: SiteSettings;
};

export default function GlobalAIAssistant({
  settings,
}: GlobalAIAssistantProps) {
  const [open, setOpen] = useState(false);
  const { input, isLoading, messages, sendMessage, setInput } = useDevMindChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, open]);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-2xl shadow-blue-500/30 transition hover:scale-105"
          aria-label="Open AI assistant"
        >
          <span className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl animate-pulse" />
          {open ? <X className="relative h-6 w-6" /> : <MessageSquare className="relative h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="fixed bottom-[6.5rem] right-4 z-50 flex h-[72vh] w-[min(26rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#090b12] text-white shadow-2xl shadow-blue-500/10 sm:right-6"
          >
            <div className="border-b border-white/10 bg-gradient-to-r from-blue-500/15 to-violet-500/15 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/10 p-3 text-blue-200">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold">DevMind AI</h3>
                    <p className="text-sm text-slate-300">Ask about services, timelines, and getting started.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-blue-500/10 p-4 text-blue-300">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h4 className="mt-5 font-heading text-2xl font-bold">How can we help?</h4>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-slate-300">
                    We can explain services, timelines, project fit, and the best next step.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {promptSuggestions.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => setInput(prompt)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.35rem] px-4 py-3 text-sm leading-7 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                          : "border border-white/10 bg-white/5 text-slate-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="flex items-center gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about your project..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </form>
              <div className="mt-3 text-center text-xs text-slate-400">
                Need a human?{" "}
                <Link href="/contact" className="text-blue-300 hover:text-white">
                  Contact the team
                </Link>
                {" · "}
                <a href={`mailto:${settings.email}`} className="text-blue-300 hover:text-white">
                  {settings.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
