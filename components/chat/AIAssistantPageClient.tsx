"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Loader2, Send, Sparkles } from "lucide-react";
import { useDevMindChat } from "@/components/chat/useDevMindChat";
import type { SiteSettings } from "@/lib/site-content";

const promptSuggestions = [
  "How much does a SaaS cost?",
  "What's your tech stack?",
  "Can you build mobile apps?",
  "How long does a project take?",
];

type AIAssistantPageClientProps = {
  settings: SiteSettings;
};

export default function AIAssistantPageClient({
  settings,
}: AIAssistantPageClientProps) {
  const { input, isLoading, messages, sendMessage, setInput } = useDevMindChat();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">AI Assistant</p>
            <h1 className="mt-1 font-heading text-4xl font-bold text-white md:text-5xl">
              Ask about services, timelines, and what to build next.
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 p-3 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">DevMind AI</h2>
                <p className="text-sm text-slate-300">Quick answers from our studio playbook</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">
              Ask about project types, timelines, tech stack, or how to get started. For pricing specifics, we&apos;ll point you to the estimator rather than guessing.
            </p>
            <div className="mt-8 space-y-3">
              {promptSuggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="w-full rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-left text-sm text-slate-200 transition hover:border-blue-400/30 hover:bg-blue-500/10"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0d1120] p-4 text-sm leading-7 text-slate-300">
              Need a human?
              <br />
              <a href={`mailto:${settings.email}`} className="text-blue-300 hover:text-white">
                {settings.email}
              </a>
              {" · "}
              <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="text-blue-300 hover:text-white">
                {settings.phone}
              </a>
            </div>
          </div>

          <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="border-b border-white/10 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-white/10 p-3 text-blue-200">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white">Conversation</h2>
                  <p className="text-sm text-slate-300">Your chat history is kept per browser tab.</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-blue-500/10 p-5 text-blue-300">
                    <Bot className="h-10 w-10" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-white">
                    Start with one of the suggestions or type your own question.
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
                    We can cover services, delivery timelines, tech choices, and what the right first step looks like for your project.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[1.4rem] px-5 py-4 text-sm leading-7 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                          : "border border-white/10 bg-[#0d1120] text-slate-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-[1.4rem] border border-white/10 bg-[#0d1120] px-5 py-4 text-slate-200">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                {promptSuggestions.map((prompt) => (
                  <button
                    key={`chip-${prompt}`}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="flex items-center gap-3 rounded-[1.6rem] border border-white/10 bg-[#0d1120] p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about your project, stack, timeline, or next steps..."
                  className="flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-4 text-white shadow-lg shadow-blue-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
