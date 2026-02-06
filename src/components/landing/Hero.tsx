import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Shield, Globe, Zap, BarChart3, TrendingUp, Cpu } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-background">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/youth-farming.jpg" 
          alt="Youth farming" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="section-container relative z-10 py-20 lg:py-32">
        {/* Hero navigation (Sign In / Login) */}
        <div className="absolute right-0 top-6 flex items-center gap-3">
          <Button asChild variant="outline" className="text-foreground border-foreground/20">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to="/signup">Login</Link>
          </Button>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in shadow-sm">
              <Cpu className="w-4 h-4" />
              <span>Next-Gen AgTech Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6 animate-slide-up">
              Cultivating the <br />
              <span className="text-primary italic">Future of Agriculture</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl max-w-xl mb-10 animate-slide-up" style={{ color: '#ff6900', animationDelay: '0.1s' }}>
              Farmers like Aisha Mahama are sharing live soil data during sign-up so they can connect with buyers this harvest—Blockchain verified, transparent, and ready to trade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-7 text-lg font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-105"
              >
                <Link to="/signup">
                  Secure My Farm Profile
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-primary/20 hover:bg-primary/5 text-foreground px-8 py-7 text-lg font-semibold"
              >
                <Link to="#features">
                  Watch How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Tags */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm font-medium text-muted-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>Modern Tech</span>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative lg:block animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative z-10 glass border border-white/20 rounded-3xl p-8 shadow-2xl max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Market Status</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-lg font-bold">Trade Verified</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-500 font-bold text-xl">+$2.4k</div>
                  <div className="text-xs text-muted-foreground">Gain Today</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Yield Forecast</span>
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">+15%</div>
                  <div className="text-xs text-muted-foreground mt-1">AI Optimization Active</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-accent/5 border border-accent/10">
                    <TrendingUp className="w-5 h-5 text-accent mb-2" />
                    <div className="text-sm font-bold">5.2k</div>
                    <div className="text-[10px] text-muted-foreground">Transactions</div>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <Shield className="w-5 h-5 text-primary mb-2" />
                    <div className="text-sm font-bold">Secure</div>
                    <div className="text-[10px] text-muted-foreground">Encryption</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-bold">AgricLinkChain</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Modern Agriculture</div>
                </div>
              </div>
            </div>

            {/* Background blur blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[100px] z-0" />
            <div className="absolute top-1/4 right-0 w-60 h-60 bg-accent/20 rounded-full blur-[80px] z-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
