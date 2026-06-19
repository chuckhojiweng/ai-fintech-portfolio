"use client";

import { useState, useRef, useEffect } from "react";
import { useEditorStore } from "@/stores/editorStore";

interface ChatMessage {
  role: "child" | "coco";
  text: string;
  timestamp: number;
}

const SUGGESTED_QUESTIONS = [
  "What does this block do?",
  "Help me fix my code!",
  "What is a loop?",
  "How do I make CoCo move?",
  "Read my code to me!",
];

export default function CoCoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "coco",
      text: "Hi there! I'm CoCo! Tap me anytime you need help with your code! 🦎",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const workspaceXml = useEditorStore((s) => s.workspaceXml);
  const execution = useEditorStore((s) => s.execution);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const childMsg: ChatMessage = {
      role: "child",
      text: text.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, childMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "session-" + Date.now(),
          childMessage: text.trim(),
          workspaceDescription: workspaceXml
            ? "Child has blocks in their workspace"
            : "Empty workspace",
          executionResult:
            execution.status === "error"
              ? execution.error
              : execution.status === "idle" && execution.currentStep > 0
                ? "Code ran successfully"
                : undefined,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "coco", text: data.message, timestamp: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "coco",
          text: "Oops, I got a little dizzy! Try asking me again! 🌀",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
        aria-label="Open CoCo chat"
      >
        <span className="text-3xl group-hover:scale-110 transition-transform">
          🦎
        </span>
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-yellow-900 animate-bounce">
          ?
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 h-[420px] bg-white rounded-3xl shadow-2xl border-2 border-green-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white">
        <span className="text-2xl">🦎</span>
        <div className="flex-1">
          <h3 className="font-bold text-sm">CoCo</h3>
          <p className="text-xs text-green-100">Your coding buddy!</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 rounded-full hover:bg-green-600 flex items-center justify-center transition-colors"
          aria-label="Close chat"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.5 4.5L11.5 11.5M4.5 11.5L11.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "child" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                msg.role === "child"
                  ? "bg-indigo-500 text-white rounded-br-md"
                  : "bg-green-50 text-gray-800 border border-green-200 rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-green-50 border border-green-200 px-3 py-2 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      <div className="px-3 py-1 flex gap-1.5 overflow-x-auto scrollbar-hide">
        {SUGGESTED_QUESTIONS.slice(0, 3).map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={isLoading}
            className="flex-shrink-0 px-2.5 py-1 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-full text-xs text-yellow-800 font-medium transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask CoCo anything..."
            className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 8L7 2V6H15V10H7V14L1 8Z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
