import { useState } from 'react';
import { ChevronDown, ChevronUp, Sprout, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const solutions = [
  {
    id: 'precision',
    icon: Sprout,
    title: 'Precision Productivity',
    content: 'Leverage AI-driven insights to optimize crop yield, monitor soil health, and predict market demand with unprecedented accuracy.',
  },
  {
    id: 'irrigation',
    icon: Globe,
    title: 'Intelligent Water Distribution',
    content: 'Our automated irrigation analysis tools help farmers conserve water resources while ensuring crops get exactly what they need for optimal growth.',
    active: true,
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Seamless Farm Operations',
    content: 'Integrated tools for inventory management and logistics tracking help scale agricultural operations efficiently.',
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Smart Crop Protection',
    content: 'Early warning systems for pests and diseases help you take action before it affects your bottom line.',
  },
];

export function Benefits() {
  const [activeId, setActiveId] = useState('irrigation');

  return (
    <section className="py-24 bg-white" id="solutions">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div>
            <div className="mb-12">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">Our Strategies</span>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4">
                Smart Farming Solutions <br />
                <span className="italic text-gray-600">That Deliver Real Results</span>
              </h2>
            </div>

            <div className="space-y-4">
              {solutions.map((item) => (
                <div 
                  key={item.id}
                  className={cn(
                    "border rounded-xl transition-all duration-300 overflow-hidden",
                    activeId === item.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <button
                    onClick={() => setActiveId(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                        activeId === item.id ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className={cn(
                        "text-lg font-bold transition-colors",
                        activeId === item.id ? "text-gray-900" : "text-gray-600"
                      )}>
                        {item.title}
                      </span>
                    </div>
                    {activeId === item.id ? (
                      <ChevronUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div className={cn(
                    "px-6 pb-6 pt-0 text-gray-600 leading-relaxed transition-all duration-300",
                    activeId === item.id ? "block opacity-100" : "hidden opacity-0"
                  )}>
                    <div className="pl-14">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-551e50519938?q=80&w=2864&auto=format&fit=crop" 
                alt="Smart Farming Technology" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              
              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Crop Health Analysis</h4>
                    <p className="text-sm text-gray-500">Real-time monitoring active</p>
                  </div>
                  <div className="ml-auto text-green-600 font-bold text-lg">98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
