"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SimulatorPage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I need a logo and a landing page for 'QuickDrop' by Friday for 15k. Can you do this?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEndSimulation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await response.json();
      setFeedback(data.analysis); // Store the AI response
      setShowModal(true); // Open the pop-up
    } catch (error) {
      console.error("Evaluation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: assistantContent }
              : m,
          ),
        );
      }
    } catch (error) {
      console.error("Streaming error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4 md:p-6 font-sans">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto w-full mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
            <Sparkles className="text-blue-600" /> Kinetic Simulator
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Negotiating with Mr. Perera • Budget: 15k • Deadline: Friday
          </p>
        </div>
        <button
          onClick={handleEndSimulation}
          disabled={isLoading}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors disabled:opacity-50"
        >
          End Simulation & Get Feedback
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role !== "user" && (
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
              )}
              <div className={`px-5 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                m.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}>
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 items-center text-gray-400 text-sm italic animate-pulse">
              <Bot className="w-8 h-8" /> Mr. Perera is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <form onSubmit={sendMessage} className="relative flex items-center">
            <input
              className="w-full bg-white border border-gray-200 rounded-full pl-6 pr-16 py-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Craft your professional response..."
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors disabled:bg-gray-300"
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Feedback Card - Integrated into UI Theme */}
      {showModal && (
        <div className="fixed bottom-6 right-6 max-w-sm w-full bg-white rounded-3xl p-6 shadow-xl border border-gray-100 z-50 animate-in slide-in-from-right duration-500">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Simulation Review</h2>
          <div className="max-h-60 overflow-y-auto whitespace-pre-line text-xs text-gray-600 leading-relaxed mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
            {feedback}
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="w-full bg-gray-900 hover:bg-black text-white font-bold py-2.5 rounded-xl text-sm transition-all"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
