import { useState } from 'react';
import { Leaf, Droplets, Sun, Activity, Sprout, Tractor } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    id: 'overview',
    icon: Activity,
    label: 'Overview',
    title: 'Real-Time Farm Monitoring',
    description: 'Get a complete bird\'s-eye view of your agricultural operations. Our dashboard aggregates data from soil sensors, weather stations, and market feeds to give you actionable insights instantly.',
    stats: [
      { label: 'Humidity', value: '65%' },
      { label: 'Temp', value: '24°C' },
      { label: 'Soil', value: 'Optimal' }
    ]
  },
  {
    id: 'planting',
    icon: Sprout,
    label: 'Smart Planting',
    title: 'Precision Seeding Tech',
    description: 'Optimize your planting density and timing based on AI-driven weather patterns and soil analysis. Maximize yield potential before the first seed even touches the ground.',
    stats: [
      { label: 'Seed Depth', value: '2.5cm' },
      { label: 'Spacing', value: '15cm' },
      { label: 'Viability', value: '98%' }
    ]
  },
  {
    id: 'harvest',
    icon: Tractor,
    label: 'Harvest Aid',
    title: 'Automated Harvest Planning',
    description: 'Predict the perfect harvest window with machine learning algorithms. Coordinate logistics and storage automatically to reduce post-harvest losses.',
    stats: [
      { label: 'Readiness', value: '85%' },
      { label: 'Est. Yield', value: '4.2T' },
      { label: 'Quality', value: 'Grade A' }
    ]
  },
  {
    id: 'water',
    icon: Droplets,
    label: 'Water Mgmt',
    title: 'Smart Irrigation Control',
    description: 'Save water and energy with precision irrigation. Our system ensures every drop counts by targeting root zones based on real-time moisture levels.',
    stats: [
      { label: 'Saved', value: '12k L' },
      { label: 'Moisture', value: '42%' },
      { label: 'Efficiency', value: '+30%' }
    ]
  }
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState('overview');
  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <section className="py-24 bg-gray-50" id="features">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">Our Workflow</span>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
              Smart Farming Made <br />
              <span className="italic text-green-600">Simple and Efficient</span>
            </h2>
          </div>
          <p className="text-gray-600 max-w-md text-right md:text-left">
            A smart technological ecosystem designed to help farmers grow more efficiently and sustainably.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 inline-flex flex-wrap gap-2 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                activeTab === feature.id 
                  ? "bg-green-100 text-green-800 shadow-inner" 
                  : "bg-transparent text-gray-500 hover:bg-gray-50"
              )}
            >
              <feature.icon className="w-4 h-4" />
              {feature.label}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="relative rounded-3xl overflow-hidden bg-black aspect-[16/9] md:aspect-[21/9] shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" 
            alt="Farm Field" 
            className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 top-0 p-8 md:p-16 flex flex-col justify-center max-w-xl">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white">
              <div className="flex items-center gap-3 mb-4 text-green-400">
                 <activeFeature.icon className="w-6 h-6" />
                 <span className="text-sm font-bold uppercase tracking-wider">{activeFeature.label} Active</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">{activeFeature.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-8">
                {activeFeature.description}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {activeFeature.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Weather Widget (Decorative) */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur text-gray-900 p-4 rounded-xl shadow-lg hidden md:block animate-fade-in">
             <div className="flex items-center gap-4">
                <Sun className="w-8 h-8 text-yellow-500" />
                <div>
                   <div className="text-xl font-bold">24°C</div>
                   <div className="text-xs text-gray-500">Sunny, Low Humidity</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
