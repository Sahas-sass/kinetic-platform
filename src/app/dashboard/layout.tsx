'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Loader2 } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar'; // <-- Import the new Sidebar

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        router.replace('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="w-full min-h-screen bg-[#F0F6FE] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-[#0C83EF] animate-spin" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verifying Session...</p>
      </div>
    );
  }

  // 👇 Update the layout structure here to include the Sidebar
  return (
    <div className="flex min-h-screen bg-[#F0F6FE]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}