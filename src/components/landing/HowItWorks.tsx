import { UserPlus, ClipboardList, Search, Lock, MapPin, BarChart4 } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Join the Ecosystem',
    description: 'Create an account as a farmer or buyer. Secure KYC ensures a trusted environment.',
  },
  {
    icon: ClipboardList,
    title: 'Direct Listing',
    description: 'Farmers list produce with verified batch details and transparent pricing.',
  },
  {
    icon: Search,
    title: 'Smart Matching',
    description: 'Buyers browse verified listings matched to quality local supply.',
  },
  {
    icon: Lock,
    title: 'On-Chain Escrow',
    description: 'Payments are locked in smart contracts and released only after quality confirmation.',
  },
  {
    icon: MapPin,
    title: 'Traceable Logistics',
    description: 'Real-time shipment tracking with blockchain-backed documentation.',
  },
  {
    icon: BarChart4,
    title: 'Agri-Analytics',
    description: 'Personalized insights on market trends and operational efficiency.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-background relative overflow-hidden" id="how-it-works">
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none -rotate-90 hidden lg:block">
        <span className="text-[12rem] font-bold leading-none uppercase tracking-tighter">Framework</span>
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            The Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Seamlessly Connecting the <br /> <span className="text-primary italic">Value Chain</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A robust 6-step framework designed to eliminate friction and maximize value globally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative"
            >
              <div className="flex flex-col items-start gap-4">
                {/* Step number and icon */}
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="w-1px h-12 bg-border group-hover:bg-primary/20 transition-colors" />
                  <step.icon className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted Partners / Logos Bar */}
        <div className="mt-32 pt-16 border-t border-border flex flex-wrap justify-between items-center gap-8 px-8 opacity-40">
          <span className="text-xl font-black uppercase tracking-widest">AGRI-TRUST</span>
          <span className="text-xl font-black uppercase tracking-widest">FAST-MATCH</span>
          <span className="text-xl font-black uppercase tracking-widest">GREEN-TRACE</span>
          <span className="text-xl font-black uppercase tracking-widest">BLOCK-FARMS</span>
        </div>
      </div>
    </section>
  );
}
