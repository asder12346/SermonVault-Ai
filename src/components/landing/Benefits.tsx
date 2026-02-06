import { ShieldCheck, Cpu, Globe, CreditCard, BarChart3, Award } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Immutable Transparency',
    description: 'Every transaction and product movement is secured on the blockchain, providing a single source of truth from farm to table.',
  },
  {
    icon: Cpu,
    title: 'Precision Agriculture',
    description: 'Leverage AI-driven insights to optimize crop yield, monitor soil health, and predict market demand with unprecedented accuracy.',
  },
  {
    icon: Globe,
    title: 'Direct Global Trade',
    description: 'Bypass intermediaries and connect directly with premium global buyers. Maximize profits through our transparent marketplace.',
  },
  {
    icon: CreditCard,
    title: 'Instant Settlements',
    description: 'Secure, instant payments powered by decentralized finance ensure better cash flow for farmers and aggregators.',
  },
  {
    icon: BarChart3,
    title: 'Smart Scalability',
    description: 'Integrated tools for inventory management and logistics tracking help scale agricultural operations efficiently.',
  },
  {
    icon: Award,
    title: 'Verified Reputation',
    description: 'On-chain reputation rewards high-quality produce with better visibility and trust.',
  },
];

export function Benefits() {
  return (
    <section className="py-32 bg-primary/5 relative" id="benefits">
      <div className="section-container">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Engineered for Growth
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Smart Infrastructure for <br /> <span className="text-primary italic">Modern Food Systems</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We bridge the gap between traditional farming and modern technology to create a sustainable, profitable future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group bg-card border border-border p-8 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
