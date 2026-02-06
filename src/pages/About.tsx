import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Sprout, Database, Wifi, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="section-container text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-green-600 mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                Cultivating a <span className="italic text-green-600">Smarter Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We are on a mission to democratize agricultural technology, making it accessible, transparent, and profitable for farmers everywhere.
            </p>
        </div>
      </section>

      {/* Smart Farming Technology Section */}
      <section className="py-24">
        <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] relative group">
                        <img 
                            src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2796&auto=format&fit=crop" 
                            alt="Smart Farming Technology" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <Cpu className="w-6 h-6 text-white" />
                                </div>
                                <span className="font-bold text-lg">AI-Powered Analysis</span>
                            </div>
                            <p className="text-white/80">Real-time processing of thousands of data points per second.</p>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-100 rounded-full blur-3xl -z-10" />
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl -z-10" />
                </div>

                <div>
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">
                        Smart Farming <br />
                        <span className="italic text-green-600">Technology</span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        AgricLinkChain combines the immutable security of blockchain with the predictive power of artificial intelligence. Our technology stack ensures that every harvest is tracked, verified, and valued correctly.
                    </p>

                    <div className="space-y-6 mb-10">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                                <Database className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain Traceability</h3>
                                <p className="text-gray-600">Immutable records from seed to sale, ensuring 100% transparency.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                <Wifi className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">IoT Connectivity</h3>
                                <p className="text-gray-600">Seamless integration with field sensors for real-time environmental monitoring.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <Sprout className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Yield Optimization</h3>
                                <p className="text-gray-600">Machine learning models that predict and improve crop performance.</p>
                            </div>
                        </div>
                    </div>

                    <Button asChild size="lg" className="rounded-full bg-gray-900 text-white hover:bg-gray-800 px-8 py-6 text-lg">
                        <Link to="/signup">
                            Join the Revolution
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
