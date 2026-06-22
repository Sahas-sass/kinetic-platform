'use client';

import { useState } from 'react';
import { Bot, User, Send, Sparkles, CheckCircle, MessageSquare } from 'lucide-react';

const MOCK_CONVERSATION = [
  {
    sender: 'client',
    text: "Hi Sahas, I saw your design portfolio. I need a logo and a landing page layout for my local delivery business. Can you do it by this Friday? My budget is LKR 15,000.",
    feedback: null
  },
  {
    sender: 'student',
    text: "Hi Mr. Perera, thanks for reaching out! Friday is a bit tight for both a logo and a landing page web design. If we focus on just the logo first, I can deliver a high-quality asset by Friday for LKR 10,000. Alternatively, we can do both by next Tuesday for LKR 25,000. Let me know what works best!",
    feedback: {
      score: 95,
      tone: 'Professional & Assertive',
      tip: 'Excellent scope management! You protected your timeline and successfully counter-offered without sounding dismissive[cite: 1].'
    }
  },
  {
    sender: 'client',
    text: "Hmm, okay. Let's do the full package by next Tuesday. But can we settle on LKR 20,000? I am just starting out.",
    feedback: null
  }
];

export default function Simulator() {
  const [step, setStep] = useState(0);
  const [userInput, setUserInput] = useState('');

  const handleNextMessage = () => {
    if (step < MOCK_CONVERSATION.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const currentMessage = MOCK_CONVERSATION[step];

  return (
    <section id="simulator" className="w-full py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-sm font-bold tracking-widest text-kinetic-primary uppercase block mb-3">
            Core Feature Sandbox
          </span>
          <h2 className="text-4xl font-extrabold text-kinetic-dark mb-4">
            The AI Client Simulator[cite: 1]
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            Train your negotiation, communication, and business management muscles before talking to real-world clients[cite: 1].
          </p>
        </div>

        {/* Interactive Workspace Split-Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left & Center: The Chat Interface (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col bg-kinetic-bg border border-gray-100 rounded-3xl overflow-hidden shadow-sm min-h-[500px]">
            {/* Chat App Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">
                  MP
                </div>
                <div>
                  <h4 className="font-bold text-kinetic-dark text-sm">Mr. Perera (Simulated Client)[cite: 1]</h4>
                  <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                    Active Scenario: Scope Negotiation[cite: 1]
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-md bg-gray-100 text-xs text-gray-600 font-bold">
                Difficulty: Medium
              </div>
            </div>

            {/* Chat Body Bubble stream */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[350px]">
              {MOCK_CONVERSATION.slice(0, step + 1).map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'student' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'student' ? 'bg-kinetic-primary text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {msg.sender === 'student' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'student' ? 'bg-kinetic-primary text-white rounded-tr-none' : 'bg-white text-kinetic-dark shadow-xs rounded-tl-none border border-gray-100'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Controller / Bottom Bar */}
            <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
              <input 
                type="text" 
                disabled
                placeholder={step === 1 ? "Click 'Simulate Response' to see counter-offer..." : "Type your negotiation strategy here..."}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none cursor-not-allowed"
              />
              {step < MOCK_CONVERSATION.length - 1 ? (
                <button 
                  onClick={handleNextMessage}
                  className="bg-kinetic-dark hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 shadow-md shrink-0"
                >
                  <Send size={16} />
                  Simulate Response
                </button>
              ) : (
                <button 
                  onClick={() => setStep(0)}
                  className="bg-gray-100 hover:bg-gray-200 text-kinetic-dark px-5 py-3 rounded-xl font-semibold text-sm transition-colors shrink-0"
                >
                  Reset Scenario
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: The AI Coaching Real-Time Feedback (1/3 width) */}
          <div className="bg-gradient-to-b from-kinetic-dark to-zinc-900 text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-kinetic-primary/20 blur-3xl pointer-events-none rounded-full"></div>
            
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={20} className="text-kinetic-secondary animate-pulse" />
                <h4 className="font-bold text-sm tracking-wide uppercase text-gray-300">Kinetic AI Coach Feedback[cite: 1]</h4>
              </div>

              {currentMessage.feedback ? (
                <div className="space-y-6">
                  {/* Score circle layout */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-kinetic-secondary flex items-center justify-center font-black text-xl text-kinetic-secondary">
                      {currentMessage.feedback.score}%
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold">Detected Tone</p>
                      <p className="text-lg font-bold text-white">{currentMessage.feedback.tone}</p>
                    </div>
                  </div>

                  {/* Tips Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                    <CheckCircle size={18} className="text-kinetic-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {currentMessage.feedback.tip}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageSquare size={40} className="mb-4 opacity-40" />
                  <p className="text-sm">Awaiting student response to analyze pricing confidence, client courtesy, and professional clarity[cite: 1].</p>
                </div>
              )}
            </div>

            {/* Simulated Stats Tracker Footer */}
            <div className="border-t border-white/10 pt-6 mt-6 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 font-bold">Market Readiness</p>
                <p className="text-base font-extrabold text-kinetic-secondary">Level 1 (Beginner)[cite: 1]</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold">Negotiation Skill</p>
                <p className="text-base font-extrabold text-white">78 / 100</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}