import AIAssistantPageClient from "@/components/chat/AIAssistantPageClient";
import { getSiteSettings, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "AI Assistant",
    description:
      "Chat with DevMind Studio's AI assistant to understand services, timelines, tech stack choices, and the best next step for your project.",
    openGraph: {
      title: "DevMind Studio AI Assistant",
      description:
        "Ask about project planning, services, timelines, and technical direction.",
      url: `${getSiteUrl()}/ai-assistant`,
    },
  };
}

export default async function AIAssistantPage() {
  const settings = await getSiteSettings();

  return <AIAssistantPageClient settings={settings} />;
}
