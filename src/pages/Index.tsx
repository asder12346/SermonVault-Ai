import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Benefits } from '@/components/landing/Benefits';
import { ContactSection } from '@/components/landing/ContactSection';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />

        {/* Why Choose Section (Benefits) */}
        <Benefits />

        {/* 6-Step Framework (HowItWorks) */}
        <HowItWorks />

        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[120px]" />
          </div>

          <div className="section-container relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                Join the Agri-Revolution
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground mb-8">
                Start Scaling Your <br /> <span className="text-accent italic">Agric Legacy Today</span>
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-12">
                Join over 5,000+ verified farmers and global buyers trading securely on the world's most transparent agricultural marketplace.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button asChild size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105">
                  <Link to="/signup">
                    Create Your Free Account
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white/10 px-10 py-8 text-xl font-bold">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
