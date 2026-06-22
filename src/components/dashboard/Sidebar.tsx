'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
import { LayoutDashboard, Bot, LineChart, Settings, LogOut, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Define your dashboard navigation routes here
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Simulator', href: '/dashboard/simulator', icon: Bot },
    { name: 'Analytics', href: '/dashboard/analytics', icon: LineChart },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-blue-900/5 min-h-screen flex flex-col p-6 sticky top-0">
      
      {/* Brand / Logo */}
      <div className="flex items-center gap-3 mb-10 pl-2">
        <Image 
          src="/logo.png" 
          alt="Kinetic Logo" 
          width={170} 
          height={40} 
          className="object-contain drop-shadow-sm"
        />
        {/* <span className="text-xl font-black text-gray-900 tracking-tight uppercase">KINETIC</span> */}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive 
                  ? 'bg-[#0C83EF] text-white shadow-md shadow-blue-500/20' 
                  : 'text-gray-500 hover:bg-[#F0F6FE] hover:text-[#0C83EF]'
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="pt-6 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}