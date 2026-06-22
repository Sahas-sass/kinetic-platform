import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-kinetic-dark text-white pt-20 pb-10 px-6 lg:px-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Massive CTA Section inside Footer */}
        <div className="bg-gradient-kinetic rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="text-left max-w-xl">
            <h3 className="text-3xl font-black tracking-tight mb-2">Ready to monetize your skills?</h3>
            <p className="text-white/80 font-medium text-sm">Join thousands of school and university students bridging the gap between learning and earning safely[cite: 1].</p>
          </div>
          <button className="bg-white hover:bg-gray-50 text-kinetic-dark font-bold px-8 py-4 rounded-xl shadow-md transition-colors whitespace-nowrap">
            Create Free Account
          </button>
        </div>

        {/* Footer Link Navigation Directories */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-kinetic-primary flex items-center justify-center text-white font-bold italic">
                K
              </div>
              <span className="text-xl font-black tracking-tight">KINETIC</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-xs font-medium">An AI-driven freelance transition ecosystem built for modern student digital workflows[cite: 1].</p>
          </div>

          <div className="flex gap-16 text-sm text-zinc-400 font-semibold">
            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-bold uppercase tracking-wider">Platform</span>
              <Link href="#how-it-works" className="hover:text-white transition-colors">Features</Link>
              <Link href="#workflow" className="hover:text-white transition-colors">Pathway</Link>
              <Link href="#simulator" className="hover:text-white transition-colors">AI Sandbox</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-bold uppercase tracking-wider">Institution</span>
              <span className="text-zinc-500 font-medium">Team Nexio 2.0[cite: 1]</span>
              <span className="text-zinc-500 font-medium">University of Moratuwa[cite: 1]</span>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} Kinetic Platform. All rights reserved.</p>
          <p>Built with Next.js & Supabase</p>
        </div>

      </div>
    </footer>
  );
}