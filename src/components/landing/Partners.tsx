import { Shield, Leaf, Tractor, Anchor, CloudSun } from 'lucide-react';

export function Partners() {
  return (
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="section-container">
        <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Shield className="w-8 h-8" />
            <span>AGRI-TRUST</span>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
             <Leaf className="w-8 h-8" />
            <span>GROW-TECH</span>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Tractor className="w-8 h-8" />
            <span>JOHN DEERE</span>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <Anchor className="w-8 h-8" />
            <span>E-Loader</span>
          </div>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
            <CloudSun className="w-8 h-8" />
            <span>AGRIVEST</span>
          </div>
        </div>
        <div className="mt-8 text-center">
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
                Our platform is built to support farmers, agribusinesses, and agricultural innovators by delivering <span className="font-semibold text-green-600">practical tools</span> that respect the land while improving productivity.
            </p>
        </div>
      </div>
    </section>
  );
}
