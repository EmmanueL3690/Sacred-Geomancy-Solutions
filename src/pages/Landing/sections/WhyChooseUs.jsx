import {
  HeartHandshake,
  TrendingUp,
  Shield,
  Brain,
  Scale,
  Sparkles,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <HeartHandshake size={28} />,
      title: "Relationship & Family",
      desc: "Heal conflicts and strengthen bonds with loved ones.",
      gradient: "from-[#3a1212] to-[#1c0d0d]",
    },
    {
      icon: <TrendingUp size={28} />,
      title: "Business & Financial",
      desc: "Overcome setbacks and unlock financial breakthroughs.",
      gradient: "from-[#0f2d1f] to-[#081a13]",
    },
    {
      icon: <Shield size={28} />,
      title: "Spiritual Protection",
      desc: "Guard against negativity and spiritual disturbances.",
      gradient: "from-[#1e1433] to-[#120a21]",
    },
    {
      icon: <Brain size={28} />,
      title: "Health & Wellness",
      desc: "Address recurring health worries with spiritual clarity.",
      gradient: "from-[#111f3a] to-[#0a1324]",
    },
    {
      icon: <Scale size={28} />,
      title: "Find Balance",
      desc: "Restore peace in a chaotic world and recenter yourself.",
      gradient: "from-[#3a250f] to-[#1f1408]",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Grow Stronger",
      desc: "Channel your inner strength to overcome any obstacle.",
      gradient: "from-[#3a2a0f] to-[#1f1608]",
    },
  ];

  return (
    <section className="relative bg-black py-32 px-6 text-white overflow-hidden">
      
      {/* Radial Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Top Label */}
        <p className="text-xs tracking-[0.4em] text-yellow-500 uppercase mb-6">
          Areas of Guidance
        </p>

        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
          Why Check Yourself{" "}
          <span className="text-yellow-400">Geomantically?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-white/60 max-w-3xl mx-auto mb-20 text-lg">
          Discover the transformative power of ancient wisdom applied to
          resolve life's toughest challenges.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl border border-yellow-500/20 bg-gradient-to-br ${item.gradient} transition duration-500 hover:scale-[1.03] hover:border-yellow-400/40 hover:shadow-[0_0_40px_rgba(234,179,8,0.25)]`}
            >
              {/* Soft Inner Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 hover:opacity-100 transition duration-500 pointer-events-none" />

              {/* Icon */}
              <div className="text-yellow-400 mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-serif mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Accent Line */}
        <p className="mt-20 text-white/70 text-lg">
          Geomancy is your guide to{" "}
          <span className="text-yellow-400 font-semibold">
            clarity, peace,
          </span>{" "}
          and{" "}
          <span className="text-yellow-400 font-semibold">
            progress.
          </span>
        </p>
      </div>
    </section>
  );
}

