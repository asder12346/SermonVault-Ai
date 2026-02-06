import { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: "Does AgricLinkChain work for small-scale farming?",
    answer: "Absolutely. Our platform is designed to scale from small family plots to large commercial operations. We offer specific tools tailored for smallholder farmers to improve yield and market access."
  },
  {
    question: "Can I monitor multiple fields at one time?",
    answer: "Yes, our dashboard allows you to add and manage multiple field locations, each with its own specific data stream and crop profile."
  },
  {
    question: "How do I get paid for my produce?",
    answer: "We use secure escrow smart contracts. Once a buyer confirms receipt and quality of your goods, funds are released instantly to your wallet."
  },
  {
    question: "Is AgricLinkChain compatible with my existing sensors?",
    answer: "We support a wide range of IoT devices and standard agricultural sensor protocols. You can easily integrate your existing hardware into our dashboard."
  },
  {
    question: "Can AgricLinkChain help reduce farming costs?",
    answer: "By optimizing input usage (water, fertilizer, seeds) through data-driven insights, our farmers typically see a cost reduction of 15-20% in the first season."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
            Common Farmer <span className="italic text-green-600">Questions</span>
          </h2>
          <p className="text-gray-600 mt-4">Find answers to help you get the most out of our platform.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white rounded-2xl overflow-hidden transition-all duration-300",
                openIndex === index ? "shadow-md" : "shadow-sm hover:shadow"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  openIndex === index ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"
                )}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <div className={cn(
                "px-6 text-gray-600 leading-relaxed overflow-hidden transition-all duration-300",
                openIndex === index ? "max-h-48 pb-6 opacity-100" : "max-h-0 opacity-0"
              )}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <h3 className="text-3xl font-serif font-medium text-gray-900 mb-4">
                Make farming smarter, <br />
                <span className="italic text-gray-600">stronger, and simpler</span>
            </h3>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                Join thousands of farmers who are already using data to transform their agricultural business.
            </p>
            <Button asChild size="lg" className="rounded-full bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                <Link to="/signup">
                    Get Started
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
