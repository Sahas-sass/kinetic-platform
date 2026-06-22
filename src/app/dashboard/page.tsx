'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  Wallet, 
  ArrowUpRight, 
  Briefcase, 
  CheckCircle,
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
        // Fallback profile metrics if profile entry row creation is processing
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

  if (loading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0C83EF]/20 animate-spin border-4 border-t-[#0C83EF] border-transparent"></div>
          <p className="text-sm font-bold text-gray-400">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Dynamic Greeting Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Hello, {userProfile?.full_name.split(' ')[0]}!
          </h1>
          <p className="text-sm text-gray-400 font-medium mt-0.5">
            Welcome back to your career transition engine. Let’s evaluate your skills today.
          </p>
        </div>
        <div className="inline-block px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
          Domain: <span className="text-[#0C83EF] capitalize">{userProfile?.domain?.replace('_', ' ') || 'Graphic Design'}</span>
        </div>
      </div>

      {/* LEVEL 1 METRICS HUB: 4 Core Metric Parameter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Market Readiness Level */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-hover hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0C83EF] shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Readiness Level</p>
            <h4 className="text-xl font-black text-gray-900 mt-0.5">Lvl {userProfile?.market_readiness_level || 1}</h4>
          </div>
        </div>

        {/* Card 2: Negotiation Index */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-hover hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Negotiation Index</p>
            <h4 className="text-xl font-black text-gray-900 mt-0.5">{userProfile?.negotiation_skill_score || 50}/100</h4>
          </div>
        </div>

        {/* Card 3: Active Escrow Contracts */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-hover hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Gigs</p>
            <h4 className="text-xl font-black text-gray-900 mt-0.5">0 Active</h4>
          </div>
        </div>

        {/* Card 4: Local Escrow Wallet Balance */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4 transition-hover hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Escrow Balance</p>
            <h4 className="text-xl font-black text-gray-900 mt-0.5">LKR 0.00</h4>
          </div>
        </div>

      </div>

      {/* LEVEL 2 CORE ACTION HUB LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Action Blocks (Left 2/3 wide column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* CTA Core Feature Entry Box: AI Simulator Sandbox */}
          <div className="bg-gradient-to-r from-gray-900 to-zinc-800 text-white rounded-3xl p-6 lg:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#0C83EF]/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="space-y-2 max-w-md z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 border border-white/10 text-[#6793F4] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} />
                Core Practice Arena
              </div>
              <h2 className="text-2xl font-black tracking-tight">AI Client Simulator</h2>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                Practice scope negotiation, clear milestone setup, and pricing confidence drills within a safe sandbox ecosystem.
              </p>
            </div>

            <button 
              onClick={() => router.push('/dashboard/simulator')}
              className="bg-[#0C83EF] hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-colors flex items-center gap-2 whitespace-nowrap self-end md:self-center z-10"
            >
              Launch Sandbox
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Assessment Hub Module */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 space-y-6 shadow-sm">
            <div>
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Pricing & Skill Validation</h3>
              <p className="text-xs text-gray-400 font-medium">Verify your assets and establish calculated market price bounds.</p>
            </div>

            <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center bg-gray-50/50">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 mb-3">
                <CheckCircle size={20} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">No Active Service Offerings Set Up</h4>
              <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto mb-4">
                Upload your creative project samples or sample code artifacts to initiate your first AI pricing structure evaluation.
              </p>
              <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
                Upload Creative Asset
              </button>
            </div>
          </div>

        </div>

        {/* Side Context Track Module (Right 1/3 narrow column) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-black text-gray-900 tracking-tight">Your Launch Pathway</h3>
            <p className="text-xs text-gray-400 font-medium">Complete tasks to level up market readiness.</p>
          </div>

          {/* Simulated progress step tracking stack list */}
          <div className="space-y-4">
            <div className="flex gap-3 items-start opacity-100">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-gray-900">Verify Account Credentials</p>
                <p className="text-[11px] text-gray-400 font-medium">Authentication handshake complete via Supabase.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start opacity-60">
              <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">2</div>
              <div>
                <p className="text-xs font-bold text-gray-900">Complete Your First Simulation</p>
                <p className="text-[11px] text-gray-400 font-medium">Achieve a communication rating above 70% in any scenario.</p>
              </div>
            </div>

            <div className="flex gap-3 items-start opacity-60">
              <div className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">3</div>
              <div>
                <p className="text-xs font-bold text-gray-900">Publish Validated Gig Tier</p>
                <p className="text-[11px] text-gray-400 font-medium">Configure pricing limits approved by the AI assistant.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}