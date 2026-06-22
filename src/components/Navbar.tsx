import Link from 'next/link';
import Image from 'next/image'; // 1. Import Next.js Image component
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3">
          {/* 2. Replace the div with the Next.js Image tag */}
          <Image 
            src="/logo.png" 
            alt="Kinetic Logo" 
            width={250}  /* Matches the w-9 class (9 * 4px = 36px) */
            height={36} /* Matches the h-9 class */
            className="object-contain drop-shadow-sm"
          />
          {/* <span className="text-2xl font-extrabold text-kinetic-primary tracking-tight">
            KINETIC
          </span> */}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <Link href="#how-it-works" className="hover:text-kinetic-primary transition-colors">
            How it Works
          </Link>
          <Link href="#opportunities" className="hover:text-kinetic-primary transition-colors">
            Opportunities
          </Link>
          <Link href="#simulator" className="hover:text-kinetic-primary transition-colors">
            AI Simulator
          </Link>
        </div>

        {/* Call to Action */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-kinetic-dark font-semibold hover:text-kinetic-primary transition-colors">
            Log In
          </button>
          <button className="bg-kinetic-dark hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-kinetic-dark">
          <Menu size={28} />
        </button>

      </div>
    </nav>
  );
}