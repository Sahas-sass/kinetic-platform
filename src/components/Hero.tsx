export default function Hero() {
  return (
    <section className="relative w-full pt-32 pb-20 px-6 lg:px-12 min-h-screen flex items-center bg-kinetic-bg overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-kinetic opacity-10 blur-3xl pointer-events-none rounded-bl-full"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center w-full gap-12 z-10">
        
        {/* Left Content Area */}
        <div className="lg:w-1/2 flex flex-col items-start space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-kinetic-primary/10 border border-kinetic-primary/20 text-kinetic-primary text-sm font-bold tracking-wide">
            DESIGNED FOR STUDENTS
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-kinetic-dark leading-tight tracking-tight">
            From Talent <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-kinetic">to Income.</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg font-medium leading-relaxed">
            The AI-driven transition platform for student creatives. Build your portfolio, master client communication, and land your first gig without the friction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <button className="bg-kinetic-primary hover:bg-kinetic-secondary text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-xl shadow-kinetic-primary/30 flex items-center justify-center gap-2">
              Start Your Journey
            </button>
            <button className="bg-white hover:bg-gray-50 text-kinetic-dark border border-gray-200 px-8 py-3.5 rounded-xl font-semibold transition-all shadow-sm">
              Explore Platform
            </button>
          </div>
        </div>

        {/* Right Image/Mockup Area */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-[4/5] bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-6 flex flex-col">
            {/* Mockup Header */}
            <div className="w-full flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            
            {/* Mockup Body Container */}
            <div className="flex-1 w-full bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden relative">
               {/* Visual Placeholder for Dashboard/Simulator */}
               <div className="text-center p-6">
                 <div className="w-16 h-16 bg-kinetic-primary/20 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-kinetic-primary font-bold text-xl">AI</span>
                 </div>
                 <h3 className="font-bold text-kinetic-dark mb-2">Client Simulator Ready</h3>
                 <p className="text-sm text-gray-500">Practice negotiating your first graphic design project safely.</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}