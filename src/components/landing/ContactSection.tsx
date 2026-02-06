import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactSection() {
    return (
        <section className="py-32 bg-background relative overflow-hidden" id="contact">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            Get In Touch
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
                            Let's Cultivate <br /> <span className="text-primary italic">Growth Together</span>
                        </h2>

                        <div className="space-y-8 mt-12">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Email Us</h3>
                                    <a href="mailto:support@agriclinkchain.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        support@agriclinkchain.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Call Us</h3>
                                    <a href="tel:+234800AGRILINK" className="text-muted-foreground hover:text-primary transition-colors">
                                        +234 (0) 800 AGRILINK
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">Our Headquarters</h3>
                                    <p className="text-muted-foreground">
                                        Lagos, Nigeria
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="glass border border-white/20 rounded-3xl p-8 shadow-xl">
                            <form className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-foreground/70 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/70 ml-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+234..."
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-foreground/70 ml-1">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your interest in AgricLinkChain..."
                                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    ></textarea>
                                </div>
                                <Button className="w-full rounded-xl py-6 text-lg font-bold">
                                    Send Message
                                    <Send className="w-5 h-5 ml-2" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
