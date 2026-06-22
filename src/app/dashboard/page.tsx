'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { 
  Sparkles, 
  Bot, 
  TrendingUp, 
  Award, 
  Wallet, 
  ArrowUpRight, 
  Briefcase, 
  CheckCircle,
  LogOut,
  Sliders
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to auth if no active secure token session exists
        router.push('/auth');
        return;
      }

      // Fetch corresponding app metadata profile from our public table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setUserProfile(data);
      } else {
        // Fallback fallback profile metrics if profile entry row creation is processing
        setUserProfile({
          full_name: user.user_metadata?.full_name || 'Student Creator',
          market_readiness_level: 1,
          negotiation_skill_score: 65,
          domain: 'graphic_design'
        });
      }
      setLoading(false);
    };

    fetchProfile();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-kinetic-bg flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-kinetic-primary/20 animate-spin border-4 border-t-kinetic-primary border-transparent"></div>
          <p className="text-sm font-bold text-gray-400">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-kinetic-bg font-sans flex">
      
      {/* SIDE NAVIGATION BAR */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Logo Area */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-kinetic-primary flex items-center justify-center text-white font-bold italic shadow-sm">
              K
            </div>
            <span className="text-xl font-extrabold text-kinetic-primary tracking-tight">KINETIC</span>
          </div>

          {/* Navigation Tab Links */}
          <nav className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold bg-kinetic-primary/10 text-kinetic-primary text-left">
              <Sliders size={18} />
              Overview Hub
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-kinetic-dark transition-all text-left">
              <Bot size={18} />
              AI Simulators
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-kinetic-dark transition-all text-left">
              <Briefcase size={18} />
              My Opportunities
            </button>
          </nav>
        </div>

        {/* User profile actions bottom dock */}
        <div className="border-t border-gray-100 pt-4">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all text-left"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT DASHBOARD REGION */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
        
        {/* Dynamic Greeting Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black text-kinetic-dark tracking-tight">
              Hello, {userProfile?.full_name.split(' ')[0]}!
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              Welcome back to your career transition engine. Let’s evaluate your skills today.
            </p>
          </div>
          <div className="inline-block px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-700 shadow-2xs">
            Domain: <span className="text-kinetic-primary capitalize">{userProfile?.domain?.replace('_', ' ') || 'Graphic Design'}</span>
          </div>
        </div>

        {/* LEVEL 1 METRICS HUB: 4 Core Metric Parameter Cards  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Market Readiness Level */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-kinetic-primary shrink-0">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Readiness Level</p>
              <h4 className="text-xl font-black text-kinetic-dark mt-0.5">Lvl {userProfile?.market_readiness_level || 1}</h4>
            </div>
          </div>

          {/* Card 2: Negotiation Index */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Negotiation Index</p>
              <h4 className="text-xl font-black text-kinetic-dark mt-0.5">{userProfile?.negotiation_skill_score || 50}/100</h4>
            </div>
          </div>

          {/* Card 3: Active Escrow Contracts */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Gigs</p>
              <h4 className="text-xl font-black text-kinetic-dark mt-0.5">0 Active</h4>
            </div>
          </div>

          {/* Card 4: Local Escrow Wallet Balance */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Escrow Balance</p>
              <h4 className="text-xl font-black text-kinetic-dark mt-0.5">LKR 0.00</h4>
            </div>
          </div>

        </div>

        {/* LEVEL 2 CORE ACTION HUB LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Action Blocks (Left 2/3 wide column) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* CTA Core Feature Entry Box: AI Simulator Sandbox */}
            <div className="bg-gradient-to-r from-kinetic-dark to-zinc-900 text-white rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-kinetic-primary/10 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="space-y-2 max-w-md">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 border border-white/10 text-kinetic-secondary text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  Core Practice Arena
                </div>
                <h2 className="text-2xl font-black tracking-tight">AI Client Simulator</h2>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">
                  Practice scope negotiation, clear milestone setup, and pricing confidence drills within a safe sandbox ecosystem[cite: 241, 284].
                </p>
              </div>

              <button className="bg-kinetic-primary hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-colors flex items-center gap-2 whitespace-nowrap self-end md:self-center">
                Launch Sandbox
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Assessment Hub Module */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xs">
              <div>
                <h3 className="text-lg font-black text-kinetic-dark tracking-tight">Pricing & Skill Validation [cite: 271]</h3>
                <p className="text-xs text-gray-400 font-medium">Verify your assets and establish calculated market price bounds[cite: 279, 281].</p>
              </div>

              <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center bg-gray-50/50">
                <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-gray-400 mb-3">
                  <CheckCircle size={20} />
                </div>
                <h4 className="text-sm font-bold text-kinetic-dark mb-1">No Active Service Offerings Set Up</h4>
                <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto mb-4">
                  Upload your creative project samples or sample code artifacts to initiate your first AI pricing structure evaluation[cite: 245, 249].
                </p>
                <button className="bg-white border border-gray-200 hover:bg-gray-50 text-kinetic-dark text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-2xs">
                  Upload Creative Asset
                </button>
              </div>
            </div>

          </div>

          {/* Side Context Track Module (Right 1/3 narrow column) */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6 shadow-2xs">
            <div>
              <h3 className="text-base font-black text-kinetic-dark tracking-tight">Your Launch Pathway</h3>
              <p className="text-xs text-gray-400 font-medium">Complete tasks to level up market readiness[cite: 311].</p>
            </div>

            {/* Simulated progress step tracking stack list */}
            <div className="space-y-4">
              <div className="flex gap-3 items-start opacity-100">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</div>
                <div>
                  <p className="text-xs font-bold text-kinetic-dark">Verify Account Credentials</p>
                  <p className="text-[11px] text-gray-400 font-medium">Authentication handshake complete via Supabase.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start opacity-60">
                <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">2</div>
                <div>
                  <p className="text-xs font-bold text-kinetic-dark">Complete Your First Simulation</p>
                  <p className="text-[11px] text-gray-400 font-medium">Achieve a communication rating above 70% in any scenario[cite: 287].</p>
                </div>
              </div>

              <div className="flex gap-3 items-start opacity-60">
                <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">3</div>
                <div>
                  <p className="text-xs font-bold text-kinetic-dark">Publish Validated Gig Tier</p>
                  <p className="text-[11px] text-gray-400 font-medium">Configure pricing limits approved by the AI assistant[cite: 250].</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}