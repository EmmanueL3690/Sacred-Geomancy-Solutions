"use client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Award, BookOpen, Heart } from "lucide-react";

export default function AboutSection() {
  const navigate = useNavigate();
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  const stats = [
    {
      icon: <Users size={28} />,
      value: "10,000+",
      label: "Spiritual Seekers Guided",
    },
    {
      icon: <Award size={28} />,
      value: "15+",
      label: "Years of Experience",
    },
    {
      icon: <BookOpen size={28} />,
      value: "50,000+",
      label: "Successful Readings",
    },
    {
      icon: <Heart size={28} />,
      value: "98%",
      label: "Client Satisfaction",
    },
  ];

  return (
    <section className="relative bg-black text-white py-32 px-6 overflow-hidden">
      
      {/* 🌌 Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full top-20 left-20 animate-pulse opacity-50" />
        <div className="absolute w-1 h-1 bg-yellow-300 rounded-full bottom-32 right-40 animate-ping opacity-40" />
        <div className="absolute w-1.5 h-1.5 bg-yellow-500 rounded-full top-1/2 left-1/3 animate-pulse opacity-30" />
      </div>

      {/* 🌑 Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Gold Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <div className="fade-in opacity-0 translate-y-10 transition duration-1000">
          <p className="text-xs tracking-[0.4em] text-yellow-500 uppercase mb-6">
            About GeomancySolution
          </p>

          {/* 💎 Real Gold Gradient Text */}
          <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-8 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Ancient Wisdom.
            <br />
            Modern Clarity.
          </h2>

          <p className="text-white/70 leading-relaxed mb-6 text-lg">
            Pamist Kunle Ishola blends science and spirit to help people
            create spaces aligned with universal energies. With a background
            in Physics and Scientific Palmistry, he integrates traditional
            geomancy with modern energy awareness.
          </p>

          <p className="text-white/60 leading-relaxed text-lg">
            Today, GeomancySolution serves a global community of seekers —
            restoring balance, removing blockages, and guiding individuals
            toward clarity, peace, and growth.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mt-10">
            <button 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold hover:scale-105 transition duration-300 shadow-[0_0_25px_rgba(234,179,8,0.4)]"
            onClick={() => navigate("/signup")}
            >
              Start Your Journey
            </button>

          </div>
        </div>

        {/* RIGHT SIDE STATS */}
        <div className="grid grid-cols-2 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="fade-in opacity-0 translate-y-10 transition duration-1000 relative p-8 rounded-2xl border border-yellow-500/20 bg-[#111111] hover:scale-105 hover:border-yellow-400/40 hover:shadow-[0_0_50px_rgba(234,179,8,0.25)]"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              
              {/* ✨ Shimmer Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent opacity-0 hover:opacity-100 blur-xl transition duration-700 pointer-events-none" />

              {/* Icon */}
              <div className="text-yellow-400 mb-4">
                {item.icon}
              </div>

              {/* Number */}
              <h3 className="text-3xl font-serif bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                {item.value}
              </h3>

              <p className="text-white/60 mt-2 text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

