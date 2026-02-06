import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The platform was easy to implement and delivered value fast. Within the first month, we improved irrigation planning and reduced input costs significantly.",
    author: "Aisha Tanson",
    role: "Agronomist",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2942&auto=format&fit=crop"
  },
  {
    quote: "Real-time field data completely changed how we manage our crops. We're making smarter decisions and seeing healthier yields season after season.",
    author: "Gary Bature",
    role: "Commercial Farmer",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2942&auto=format&fit=crop"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900">
            Real Stories Shared <br />
            <span className="italic text-gray-600">by Our Farmers</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-3xl flex gap-6 items-start hover:shadow-lg transition-shadow">
               <div className="w-1/3 shrink-0">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                     <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                  </div>
               </div>
               <div className="flex flex-col h-full justify-between">
                  <div>
                    <Quote className="w-8 h-8 text-green-200 mb-4 fill-current" />
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                      "{item.quote}"
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.author}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{item.role}</div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
