export default function StatsSection() {
  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <section className="bg-[#0F172A] py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          Trusted by Thousands Worldwide
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Our numbers speak for themselves. We are committed to delivering
          excellence and measurable results.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-16">
          {stats.map((item, index) => (
            <div
              key={index}
              className="hover:scale-105 transition duration-300"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-blue-500">
                {item.number}
              </h3>
              <p className="mt-3 text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
