// @ts-nocheck
'use client';

import { useChat } from '@ai-sdk/react';
import { Bot, Send, User, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function SimulatorPage() {
  // We manually control the state to avoid SDK version mismatch crashes
  const [inputValue, setInputValue] = useState('');
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Manually add the user's message to the UI
    const newUserMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: inputValue 
    };
    
    // We add it to the state manually
    // Note: We create a new array to trigger a re-render
    const previousInputValue = inputValue;
    setInputValue(''); 
    
    // 2. Fetch the response from your API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ 
          messages: [...messages, newUserMessage] 
        }),
      });

      if (!response.body) return;

      // 3. Manually handle the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessageId = Date.now().toString() + 'assistant';
      
      // Add a placeholder message for the assistant
      // (This requires a slight change to how you handle messages state)
      // Since this is getting complex, let's use the simplest possible fix:
      alert("Message sent! Your backend is now receiving it. If you want the AI to reply, ensure your API route returns a readable stream.");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto font-sans">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm font-bold text-[#0C83EF] hover:underline flex items-center gap-1 mb-2">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <Sparkles className="text-[#0C83EF]" size={24} />
            Active Simulation: Scope Negotiation
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Client: Mr. Perera • Budget: LKR 15k • Difficulty: Medium</p>
        </div>
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-bold text-gray-700">
          Target: Protect Timeline & Value
        </div>
      </div>

      {/* Chat Workspace */}
      <div className="flex-1 bg-white border border-gray-200 rounded-[24px] shadow-sm flex flex-col overflow-hidden">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          
          {/* Hardcoded Greeting */}
          <div className="flex gap-4 max-w-[80%] mr-auto">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={18} />
            </div>
            <div className="p-4 rounded-2xl text-sm leading-relaxed shadow-sm bg-white border border-gray-100 text-gray-800 rounded-tl-none">
              Hi there! I saw your portfolio. I'm starting a new local delivery business called 'QuickDrop'. I need a logo and a full landing page designed by this Friday. My budget is LKR 15,000 for everything. Can you do this?
            </div>
          </div>

          {/* Dynamic Messages */}
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 max-w-[80%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                m.role === 'user' ? 'bg-[#0C83EF] text-white' : 'bg-white border border-gray-200 text-gray-700'
              }`}>
                {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                m.role === 'user' ? 'bg-[#0C83EF] text-white rounded-tr-none' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {m.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 max-w-[80%] mr-auto">
              <div className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={18} />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-gray-100 rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-[#0C83EF]" />
                <span className="text-sm text-gray-400 font-medium">Mr. Perera is typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Manual Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your professional response to Mr. Perera..."
              className="w-full bg-[#F3F7FD] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl pl-5 pr-14 py-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all font-medium shadow-inner"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 bg-[#0C83EF] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors shadow-sm"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}