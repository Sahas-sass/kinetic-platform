import { GraduationCap, School, ArrowRight } from 'lucide-react';

const personas = [
  {
    name: 'Sahas Samuditha, 21',
    role: '2nd-Year IT Undergraduate',
    location: 'Colombo, Sri Lanka',
    quote: '"I know I’m good at design, but I don’t know how to turn it into real money."[cite: 1]',
    icon: <GraduationCap size={24} className="text-kinetic-primary" />,
    frustrations: [
      'Feels completely ignored on global freelance platforms due to zero ratings[cite: 1].',
      'Confused about market pricing and how much to charge local clients[cite: 1].',
      'Anxious about professional communication and managing scope[cite: 1].'
    ],
    solution: 'Kinetic’s AI Client Simulator gives him a safe space to fail, learn, and build iron-clad confidence before pitching real clients[cite: 1].'
  },
  {
    name: 'Dilan Fernando, 18',
    role: 'G.C.E. A/L Student & Coder',
    location: 'Galle, Sri Lanka',
    quote: '"I can build things, but I don’t know where to start earning from it."[cite: 1]',
    icon: <School size={24} className="text-kinetic-secondary" />,
    frustrations: [
      'Global platforms are too complex and competitive for a beginner self-taught coder[cite: 1].',
      'No local space tailored to showcase raw technical skills to immediate buyers[cite: 1].',
      'Lacks structured guidance on project timelines and client standard expectations[cite: 1].'
    ],
    solution: 'Kinetic bypasses the "no reviews" loop by matching him directly with local, entry-level milestone-based digital gigs[cite: 1].'
  }
];

export default function TargetAudience() {
  return (
    <section id="students" className="w-full py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-sm font-bold tracking-widest text-kinetic-primary uppercase block mb-3">
            Built For The Next Generation
          </span>
          <h2 className="text-4xl font-extrabold text-kinetic-dark tracking-tight">
            Designed explicitly for those left behind <br />
            by hyper-competitive global marketplaces[cite: 1].
          </h2>
        </div>

        {/* Personas Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {personas.map((persona, index) => (
            <div 
              key={index} 
              className="bg-kinetic-bg border border-gray-100 rounded-3xl p-8 lg:p-10 flex flex-col justify-between hover:border-kinetic-secondary/30 transition-all duration-300 shadow-xs"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-xs">
                    {persona.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-kinetic-dark">{persona.name}</h3>
                    <p className="text-sm text-gray-500 font-semibold">{persona.role} • {persona.location}</p>
                  </div>
                </div>

                {/* Core Quote */}
                <blockquote className="text-base italic font-medium text-gray-700 border-l-4 border-kinetic-primary pl-4 mb-6">
                  {persona.quote}
                </blockquote>

                {/* Frustrations List */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Core Hurdles</h4>
                  <ul className="space-y-2.5 text-sm text-gray-600 font-medium">
                    {persona.frustrations.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Kinetic Impact Block */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 mt-auto">
                <h5 className="text-xs font-bold uppercase tracking-wider text-kinetic-primary mb-1.5">How Kinetic Empowers Them</h5>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{persona.solution}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}