import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Create Groq provider using the OpenAI compatible protocol
const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are a helpful, professional, and concise AI assistant for DevMind Studio, a premium software development agency. 
Your goal is to answer questions about the agency's services (Web Apps, SaaS, Mobile Apps, UI/UX), pricing (usually starting around ₹15,000 for simple sites to ₹1,50,000+ for SaaS), and project timelines. 
Keep your answers brief and focused. If you don't know the answer, recommend using the contact form to speak with a human engineer.`;

  // Check if API key is configured
  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
    return Response.json(
      { error: "Groq API key not configured. Please add your GROQ_API_KEY to .env.local" },
      { status: 500 }
    );
  }

  try {
    const result = streamText({
      model: groq("llama-3.3-70b-versatile") as any,
      system: systemPrompt,
      messages,
      maxRetries: 0,
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Groq API error:", message);
    return Response.json(
      { error: "AI service temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }
}
