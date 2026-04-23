"use client";

import { useEffect, useRef, useState } from "react";
import type { StoredChatMessage } from "@/lib/chat";

function createId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Math.random().toString(36).slice(2)}`;
}

function getTabId() {
  const existing = sessionStorage.getItem("devmind_chat_tab_id");
  if (existing) {
    return existing;
  }

  const next = createId("tab");
  sessionStorage.setItem("devmind_chat_tab_id", next);
  return next;
}

function getSessionStorageKey(tabId: string) {
  return `devmind_chat_session_${tabId}`;
}

function getHistoryStorageKey(sessionId: string) {
  return `devmind_chat_history_${sessionId}`;
}

export function useDevMindChat() {
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const tabId = getTabId();
    const sessionKey = getSessionStorageKey(tabId);
    let activeSessionId = localStorage.getItem(sessionKey);

    if (!activeSessionId) {
      activeSessionId = createId("session");
      localStorage.setItem(sessionKey, activeSessionId);
    }

    return activeSessionId;
  });
  const [messages, setMessages] = useState<StoredChatMessage[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const tabId = getTabId();
    const sessionKey = getSessionStorageKey(tabId);
    const activeSessionId = localStorage.getItem(sessionKey);

    if (!activeSessionId) {
      return [];
    }

    const localHistory = localStorage.getItem(getHistoryStorageKey(activeSessionId));
    if (!localHistory) {
      return [];
    }

    try {
      return JSON.parse(localHistory) as StoredChatMessage[];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || hasLoadedRef.current) {
      return;
    }

    hasLoadedRef.current = true;

    void fetch(`/api/chat?sessionId=${encodeURIComponent(sessionId)}`)
      .then((response) => response.json())
      .then((data: { messages?: StoredChatMessage[] }) => {
        if (data.messages?.length) {
          setMessages(data.messages);
        }
      })
      .catch(() => undefined);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) {
      return;
    }

    localStorage.setItem(getHistoryStorageKey(sessionId), JSON.stringify(messages));
  }, [messages, sessionId]);

  async function sendMessage(prefilled?: string) {
    const content = (prefilled ?? input).trim();
    if (!content || !sessionId || isLoading) {
      return;
    }

    const nextMessage: StoredChatMessage = {
      id: createId("user"),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
      sessionId,
    };

    const nextMessages = [...messages, nextMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages: nextMessages }),
      });

      const data = (await response.json()) as {
        message?: StoredChatMessage;
        messages?: StoredChatMessage[];
      };

      if (response.ok && data.messages) {
        setMessages(data.messages);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function clearMessages() {
    if (!sessionId) {
      return;
    }

    setMessages([]);
    localStorage.removeItem(getHistoryStorageKey(sessionId));
  }

  return {
    clearMessages,
    input,
    isLoading,
    messages,
    sendMessage,
    sessionId,
    setInput,
  };
}
