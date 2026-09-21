import { Eye, Leaf, Sparkles, BookOpen } from "lucide-react";

export default function Offerings() {
  const offerings = [
    {
      icon: <Eye size={32} className="text-yellow-400" />,
      title: "Divination Readings",
      desc: "Receive personalized geomantic readings based on ancient earth patterns and sacred figures.",
    },
    {
      icon: <Leaf size={32} className="text-yellow-400" />,
      title: "Life Guidance",
      desc: "Navigate life's challenges with wisdom drawn from centuries of geomantic tradition.",
    },
    {
      icon: <Sparkles size={32} className="text-yellow-400" />,
      title: "Spiritual Solutions",
      desc: "Find clarity and solutions through the interpretation of sacred geomantic symbols.",
    },
    {
      icon: <BookOpen size={32} className="text-yellow-400" />,
      title: "Learn Geomancy",
      desc: "Understand the 16 geomantic figures, their meanings, and how to create your own charts.",
    },
  ];

  return (
    <section
      id="offerings"
      className="relative py-32 px-6 bg-black overflow-hidden"
    >
      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-yellow-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">

        {/* Top Label */}
        <p className="text-sm tracking-[0.4em] text-yellow-500 mb-6">
          WHAT WE OFFER
        </p>

        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-serif mb-6 text-white">
          The Art of{" "}
          <span className="text-yellow-400">Earth Reading</span>
        </h2>

        {/* Description */}
        <p className="text-white/70 max-w-3xl mx-auto mb-20 leading-relaxed text-lg">
          Geomancy — meaning “divination by earth” — is one of the oldest forms of
          spiritual guidance. Through the creation and interpretation of sacred
          figures drawn in sand or on paper, we unlock answers to life’s most
          profound questions.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {offerings.map((item, index) => (
            <div
              key={index}
              className="relative bg-[#111111] border border-yellow-500/20 rounded-xl p-8 text-left transition duration-500 hover:border-yellow-400/50 hover:shadow-[0_0_40px_rgba(234,179,8,0.2)]"
            >
              {/* Subtle Card Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 hover:opacity-100 transition duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif text-white mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
