import React from "react";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderMarkdown = (value: string) => {
  const escaped = escapeHtml(value);
  const withStrong = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  const withBreaks = withStrong.replace(/\n/g, "<br />");
  return { __html: withBreaks };
};

const ChatMessage = ({ role, content, isLoading }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[560px] gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {!isUser && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            AI
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-800"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              Typing
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:300ms]" />
              </span>
            </div>
          ) : isUser ? (
            <p>{content}</p>
          ) : (
            <p
              className="prose prose-sm max-w-none prose-p:my-2 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={renderMarkdown(content)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
