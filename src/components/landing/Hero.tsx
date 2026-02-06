import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Leaf } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/youth-farming.jpg" 
          alt="Smart Farming" 
          className="w-full h-full object-cover opacity-80"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="section-container relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-medium mb-8 animate-fade-in">
            <Leaf className="w-4 h-4 text-green-400" />
            <span>Sustainable Agriculture</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-8 animate-slide-up tracking-tight">
            Smart Farming for <br />
            <span className="font-serif italic text-green-400">Future Generations</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-200 max-w-xl mb-12 animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
            Our platform supports farmers, agribusinesses, and innovators by delivering practical tools that respect the land while improving productivity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-green-500 hover:bg-green-600 text-white px-10 py-8 text-lg font-bold transition-all hover:scale-105 border-0"
            >
              <Link to="/signup">
                Start Farming
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white px-10 py-8 text-lg font-semibold backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span>Watch Video</span>
              </div>
            </Button>
          </div>

          {/* Stats/Social Proof */}
          <div className="mt-16 flex items-center gap-8 text-white/80 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-300 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium">Trusted by 500k+ Farmers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
