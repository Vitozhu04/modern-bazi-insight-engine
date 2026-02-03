import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatInputProps = {
  onSend: (message: string) => void;
  suggestions?: string[];
  disabled?: boolean;
};

const defaultSuggestions = ["事业发展", "财富趋势", "未来三年重点"];

const ChatInput = ({
  onSend,
  suggestions = defaultSuggestions,
  disabled,
}: ChatInputProps) => {
  const [value, setValue] = React.useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:border-slate-400"
            onClick={() => setValue(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={value}
          placeholder="问问AI"
          onChange={(event) => setValue(event.target.value)}
          disabled={disabled}
        />
        <Button
          type="button"
          onClick={handleSend}
          disabled={disabled}
          className="sm:self-auto"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
