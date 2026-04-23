import { getSiteSettings } from "@/lib/site-content";

export type StoredChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sessionId: string;
};

function normalizeMessages(messages: StoredChatMessage[]) {
  return messages
    .filter((message) => message.content.trim())
    .slice(-20)
    .map((message) => ({
      role: message.role,
      content: message.content,
    }));
}

function keywordMatch(input: string, terms: string[]) {
  return terms.some((term) => input.includes(term));
}

function fallbackResponse(message: string, settings: Awaited<ReturnType<typeof getSiteSettings>>) {
  const input = message.toLowerCase();

  if (keywordMatch(input, ["price", "cost", "budget", "quote", "pricing"])) {
    return "Pricing depends on scope, integrations, design quality, and timeline. The best next step is our /estimator for a tailored range, then we can refine it together.";
  }

  if (keywordMatch(input, ["stack", "technology", "tech", "next", "react", "supabase"])) {
    return "We commonly work with Next.js, TypeScript, React, Supabase, PostgreSQL, Stripe, and modern cloud tooling. We pick the stack based on product goals, scale, and team needs.";
  }

  if (keywordMatch(input, ["mobile", "ios", "android", "app"])) {
    return "Yes, we build mobile products and companion apps when mobile is the right product surface. That includes design, backend integration, and launch planning.";
  }

  if (keywordMatch(input, ["timeline", "how long", "delivery", "weeks"])) {
    return "Timelines vary by scope. A focused marketing site may take a few weeks, while custom web apps or SaaS platforms often land in the 6 to 16 week range.";
  }

  if (keywordMatch(input, ["contact", "email", "phone", "call"])) {
    return `You can reach our team at ${settings.email} or ${settings.phone}. If you'd like, I can also point you to /contact so you can share your project details.`;
  }

  if (keywordMatch(input, ["services", "offer", "build", "what do you do"])) {
    return "We help with web development, mobile apps, SaaS platforms, AI solutions, UI/UX design, and API development. If you share what you're trying to build, I can help narrow the best starting point.";
  }

  return "Let me connect you with our team. The fastest path is to use /contact for project details or /estimator for a pricing range.";
}

export async function generateAssistantReply(messages: StoredChatMessage[]) {
  const settings = await getSiteSettings();
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return "How can I help you with your project today?";
  }

  const systemPrompt = settings.aiSystemPrompt
    .replace("[email from settings]", settings.email)
    .replace("[phone from settings]", settings.phone);

  if (!process.env.ANTHROPIC_API_KEY) {
    return fallbackResponse(latestUserMessage.content, settings);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: systemPrompt,
        messages: normalizeMessages(messages),
      }),
    });

    if (!response.ok) {
      return fallbackResponse(latestUserMessage.content, settings);
    }

    const data = (await response.json()) as {
      content?: Array<{ text?: string }>;
    };

    return data.content?.map((entry) => entry.text || "").join("\n").trim() || fallbackResponse(latestUserMessage.content, settings);
  } catch {
    return fallbackResponse(latestUserMessage.content, settings);
  }
}
