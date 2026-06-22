'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Direct session check from client storage
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Use replace instead of push so they can't click "back" into the dashboard
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();

    // Listen for real-time authentication state changes (e.g., token expiration, logging out)
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

  // Force a clean loading screen until the database confirms the active session
  if (isAuthenticated === null) {
    return (
      <div className="w-full min-h-screen bg-[#F0F6FE] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-[#0C83EF] animate-spin" />
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verifying Session...</p>
      </div>
    );
  }

  // Render the dashboard dashboard layout and child components safely if logged in
  return <>{children}</>;
}