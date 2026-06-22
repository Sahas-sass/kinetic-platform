import { Bot, BadgeDollarSign, Map, Briefcase } from 'lucide-react';

const features = [
  {
    title: 'AI Client Simulation',
    description: 'Practice negotiating and handling project scenarios with an AI client to build confidence before talking to real people.',
    icon: <Bot size={32} className="text-kinetic-primary" />,
  },
  {
    title: 'Smart Pricing Assistant',
    description: 'Never guess your rates. Get personalized, beginner-friendly pricing strategies based on your actual skill level and local demand.',
    icon: <BadgeDollarSign size={32} className="text-kinetic-primary" />,
  },
  {
    title: 'Guided Project Workflow',
    description: 'Step-by-step task breakdowns, communication tips, and deadline tracking so you never feel overwhelmed on your first gig.',
    icon: <Map size={32} className="text-kinetic-primary" />,
  },
  {
    title: 'Beginner-Friendly Matching',
    description: 'Connect with entry-level local freelance opportunities that prioritize fairness for newcomers over established platform ratings.',
    icon: <Briefcase size={32} className="text-kinetic-primary" />,
  },
];

export default function Features() {
  return (
    <section id="how-it-works" className="w-full py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-kinetic-dark mb-4">
            Bridging the gap between <br className="hidden sm:block" /> 
            <span className="text-kinetic-primary">learning and earning.</span>
          </h2>
          <p className="text-lg text-gray-500 font-medium">
            Existing platforms are built for the pros. Kinetic is engineered to guide students through the hardest part: landing and surviving that very first client.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-kinetic-bg border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-kinetic-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}