'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Sparkles, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isSignUp) {
        if (!agreeTerms) {
          throw new Error('You must agree to the Terms and Conditions.');
        }
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              market_readiness_level: 1,
              negotiation_skill_score: 50,
            },
          },
        });

        if (error) throw error;
        
        alert('Registration successful! Check your email for verification link.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        router.push('/'); 
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F6FE] flex items-center justify-center p-4 lg:p-8 font-sans">
      
      {/* Central Interactive Card */}
      <div className="w-full max-w-[1024px] bg-white rounded-[32px] overflow-hidden shadow-xl shadow-blue-900/5 flex flex-col md:flex-row min-h-[600px] relative">
        
        {/* LEFT PANEL: Branding & Mission Statement */}
        <div className="w-full md:w-[45%] bg-[#0C83EF] text-white p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden z-10">
          
          {/* Subtle Abstract Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent pointer-events-none"></div>

          {/* Central Logo Disk Graphic */}
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg shadow-black/10 mb-6 transition-transform hover:scale-105">
              <Sparkles className="w-12 h-12 text-[#0C83EF]" />
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-4">
              Welcome to Kinetic
            </h2>
            <p className="text-sm text-blue-50/90 leading-relaxed max-w-[280px]">
              Create your account to unlock premium features, evaluate your technical skills, and embark on an exciting freelancing journey with us![cite: 1]
            </p>
          </div>
        </div>

        {/* WAVY DIVIDER VECTOR LAYER */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[45%] w-[60px] -ml-[30px] z-20 pointer-events-none overflow-hidden">
          <svg className="h-full w-full text-white fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 C30,15 40,5 70,30 C90,48 60,65 80,80 C90,90 70,95 100,100 L100,0 Z" className="text-white" />
            <path d="M0,0 C15,20 25,15 45,40 C60,60 40,75 55,90 C60,95 45,98 100,100 L100,0 Z" className="text-white/20" />
            <path d="M0,0 C10,25 15,30 30,50 C40,70 20,80 35,95 C40,98 25,99 100,100 L100,0 Z" className="text-white/10" />
          </svg>
        </div>

        {/* RIGHT PANEL: Form Inputs */}
        <div className="w-full md:w-[55%] bg-white p-8 lg:p-12 flex flex-col justify-center z-10">
          <div className="max-w-[400px] w-full mx-auto">
            
            {/* Form Headers */}
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
              {isSignUp ? 'Create you account' : 'Sign in to platform'}
            </h1>
            <p className="text-xs text-gray-400 font-medium mb-6">
              Please enter your details to keep monitoring your freelance analytics.
            </p>

            {/* Error Message banner */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Native Submit Form */}
            <form onSubmit={handleAuth} className="space-y-4">
              
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full name</label>
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter Full name"
                    className="w-full bg-[#F3F7FD] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email</label>
                <input 
                  type="auto" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full bg-[#F3F7FD] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full bg-[#F3F7FD] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 pr-10 outline-none transition-all font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Checkbox module */}
              {isSignUp && (
                <div className="flex items-center gap-2.5 pt-1">
                  <input 
                    type="checkbox" 
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#0C83EF] focus:ring-[#0C83EF]"
                  />
                  <label htmlFor="terms" className="text-[11px] font-medium text-gray-400 select-none">
                    I agree to the <span className="text-[#0C83EF] hover:underline cursor-pointer">terms and Conditions</span>
                  </label>
                </div>
              )}

              {/* Primary Action Dispatcher */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#0C83EF] to-[#6793F4] hover:from-blue-600 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/10 transition-colors mt-6 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            {/* Spacing adjustments for Context Switcher Link */}
            <p className="text-center text-xs font-semibold text-gray-400 mt-8">
              {isSignUp ? 'Already have an account? ' : "Don't have an account yet? "}
              <button 
                type="button" 
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg(null);
                }}
                className="text-[#0C83EF] font-bold hover:underline ml-1"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}