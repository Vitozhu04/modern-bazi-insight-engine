import React from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type UseStreamingChatOptions = {
  endpoint: string;
};

type UseStreamingChatReturn = {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  sendMessage: (content: string, context?: Record<string, unknown>) => Promise<void>;
  reset: () => void;
};

const normalizeLine = (line: string) => line.replace(/\r$/, "");

const parseSseLine = (line: string) => {
  const normalized = normalizeLine(line);
  if (!normalized) return null;
  if (normalized.startsWith("data:")) {
    return { text: normalized.replace(/^data:\s?/, ""), addNewline: false };
  }
  return { text: normalized, addNewline: true };
};

const extractErrorMessage = async (response: Response) => {
  const fallback = `Request failed (${response.status})`;
  try {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const data = (await response.json()) as {
        error?: string;
        message?: string;
        details?: string;
      };
      if (data.message) return data.message;
      if (data.details) return data.details;
      if (data.error) return data.error;
    }
    const text = await response.text();
    if (text) return text;
  } catch (error) {
    return fallback;
  }
  return fallback;
};

export const useStreamingChat = (
  options: UseStreamingChatOptions
): UseStreamingChatReturn => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const abortRef = React.useRef<AbortController | null>(null);

  const updateAssistantMessage = (text: string, addNewline = false) => {
    setMessages((prev) => {
      const next = [...prev];
      for (let index = next.length - 1; index >= 0; index -= 1) {
        const message = next[index];
        if (message.role === "assistant") {
          const separator = addNewline && message.content ? "\n" : "";
          next[index] = {
            ...message,
            content: `${message.content}${separator}${text}`,
          };
          return next;
        }
      }
      return [...next, { role: "assistant", content: text }];
    });
  };

  const reset = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setError(null);
    setIsStreaming(false);
  };

  const sendMessage = async (content: string, context?: Record<string, unknown>) => {
    if (!content.trim()) return;
    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setIsStreaming(true);
    setError(null);

    try {
      const response = await fetch(options.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userQuery: content, ...(context ?? {}) }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const message = await extractErrorMessage(response);
        throw new Error(message);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedContent = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split("\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const parsed = parseSseLine(part);
          if (!parsed?.text) continue;
          receivedContent = true;
          updateAssistantMessage(parsed.text, parsed.addNewline);
        }
      }

      if (buffer.trim()) {
        const parsed = parseSseLine(buffer);
        if (parsed?.text) {
          receivedContent = true;
          updateAssistantMessage(parsed.text, parsed.addNewline);
        }
      }

      if (!receivedContent) {
        updateAssistantMessage("没有收到返回结果，请稍后重试。", true);
      }
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        const message = err instanceof Error ? err.message : "服务暂时不可用，请稍后重试。";
        setError(message);
        updateAssistantMessage(message, true);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  return { messages, isStreaming, error, sendMessage, reset };
};
