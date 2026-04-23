import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";
import { generateAssistantReply, type StoredChatMessage } from "@/lib/chat";

export const maxDuration = 30;

async function getChatRecord(sessionId: string) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return null;
  }

  const tableNames = ["chat_sessions"];

  for (const tableName of tableNames) {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (!error && data) {
      return data as { id: string; session_id: string; messages: StoredChatMessage[] };
    }
  }

  return null;
}

async function upsertChatRecord(sessionId: string, messages: StoredChatMessage[]) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return;
  }

  const record = await getChatRecord(sessionId);

  if (record) {
    await supabase
      .from("chat_sessions")
      .update({ messages, updated_at: new Date().toISOString() })
      .eq("session_id", sessionId);
    return;
  }

  await supabase.from("chat_sessions").insert({
    session_id: sessionId,
    messages,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ messages: [] });
  }

  const record = await getChatRecord(sessionId);
  return NextResponse.json({ messages: record?.messages || [] });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      sessionId?: string;
      messages?: StoredChatMessage[];
    };

    if (!body.sessionId || !body.messages?.length) {
      return NextResponse.json(
        { error: "sessionId and messages are required." },
        { status: 400 }
      );
    }

    const assistantMessage: StoredChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: await generateAssistantReply(body.messages),
      timestamp: new Date().toISOString(),
      sessionId: body.sessionId,
    };

    const allMessages = [...body.messages, assistantMessage];
    await upsertChatRecord(body.sessionId, allMessages);

    return NextResponse.json({ message: assistantMessage, messages: allMessages });
  } catch (error) {
    console.error("Chat API error", error);
    return NextResponse.json(
      { error: "AI service temporarily unavailable." },
      { status: 500 }
    );
  }
}
