import { ClipboardCheck, ShieldAlert, Sparkles, Coins } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Onboarding & AI Analysis',
    description: 'Select your creative domain (Graphic Design, UI/UX, or Dev) and upload sample work[cite: 1]. Our AI analyzes your technical strengths and suggests beginner-friendly service tiers and smart pricing strategies so you never underprice yourself[cite: 1].',
    icon: <ClipboardCheck size={24} className="text-white" />,
    badge: 'Step 1 & 2'
  },
  {
    number: '02',
    title: 'The AI Client Simulator',
    description: 'Enter a risk-free training arena[cite: 1]. Interact with simulated AI clients who act like real-world customers—negotiating scope, changing deadlines, or requesting modifications[cite: 1]. Get real-time feedback on your professional tone, pricing confidence, and soft skills[cite: 1].',
    icon: <Sparkles size={24} className="text-white" />,
    badge: 'Core Feature'
  },
  {
    number: '03',
    title: 'Fair Opportunity Matching',
    description: 'Once cleared through simulation, gain access to an open marketplace designed for newcomers[cite: 1]. Our algorithm prioritizes matching local student talent with entry-level digital gigs, completely removing the traditional "no reviews, no jobs" barrier[cite: 1].',
    icon: <ShieldAlert size={24} className="text-white" />,
    badge: 'Guaranteed Visibility'
  },
  {
    number: '04',
    title: 'Guided Projects & Secure Payouts',
    description: 'When you secure a gig, the platform breaks down the project into modular milestones with micro-contracts[cite: 1]. Payments are held safely in escrow and disbursed locally through LKR channels seamlessly upon milestone delivery, keeping you protected from exploitation[cite: 1].',
    icon: <Coins size={24} className="text-white" />,
    badge: 'Milestone Guard'
  }
];

export default function Workflow() {
  return (
    <section id="workflow" className="w-full py-24 bg-kinetic-bg relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-kinetic-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-kinetic-primary/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-20">
          <span className="text-sm font-bold tracking-widest text-kinetic-primary uppercase block mb-3">
            The Kinetic Pathway
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-kinetic-dark tracking-tight">
            How we turn your potential <br />
            into verifiable economic power.
          </h2>
        </div>

        {/* Steps Timeline Grid */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
            >
              {/* Left Side: Number and Title */}
              <div className="flex items-center gap-6 lg:w-1/3">
                <span className="text-5xl lg:text-6xl font-black text-gray-200/80 font-mono select-none">
                  {step.number}
                </span>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-kinetic-primary/10 text-kinetic-primary text-xs font-bold mb-2">
                    {step.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-kinetic-dark tracking-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Middle Side: Description */}
              <div className="lg:w-1/2">
                <p className="text-gray-600 leading-relaxed text-base font-medium">
                  {step.description}
                </p>
              </div>

              {/* Right Side: Icon Circle */}
              <div className="hidden lg:flex w-14 h-14 rounded-2xl bg-gradient-kinetic items-center justify-center shadow-md shadow-kinetic-primary/20 shrink-0">
                {step.icon}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}