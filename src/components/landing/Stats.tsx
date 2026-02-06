export function Stats() {
  const stats = [
    { value: '1.5M+', label: 'Acres Monitored' },
    { value: '500K+', label: 'Farmers Empowered' },
    { value: '2M+', label: 'Tons Produce Traded' },
    { value: '750K+', label: 'Successful Harvests' },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
