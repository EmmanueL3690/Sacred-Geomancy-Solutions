"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const canvasRef = useRef(null);

  // 🌠 STARFIELD BACKGROUND
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let stars = [];
    const numStars = 120;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        speed: Math.random() * 0.3,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(234,179,8,0.8)";
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const testimonials = [
    {
      text: "Geomancy Solutions completely transformed my approach to life decisions. The reading was precise and the guidance helped me navigate a difficult family situation.",
      name: "Amina T.",
      location: "Lagos, NG",
    },
    {
      text: "I was skeptical at first, but the accuracy of the readings and the practical guidance provided was truly remarkable.",
      name: "James O.",
      location: "San Francisco, CA",
    },
    {
      text: "An amazing and personalized approach to spiritual guidance. The remedies were practical and I've seen real improvements.",
      name: "Sarah K.",
      location: "London, UK",
    },
    {
      text: "By far the most grounded and results-oriented spiritual service I’ve experienced.",
      name: "David M.",
      location: "Accra, GH",
    },
  ];

  return (
    <section className="relative bg-black py-32 px-6 text-white overflow-hidden">
      
      {/* 🌠 Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* 🌌 Soft Parallax Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[140px] rounded-full animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.4em] text-yellow-500 uppercase mb-6"
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
        >
          What Our Community Says
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/60 max-w-2xl mx-auto mb-20"
        >
          Join the thousands who have discovered clarity, peace, and purpose.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-2xl border border-yellow-500/20 bg-[#111111]/80 backdrop-blur-lg hover:scale-[1.02] hover:border-yellow-400/40 hover:shadow-[0_0_60px_rgba(234,179,8,0.25)] transition duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent opacity-0 hover:opacity-100 blur-xl transition duration-700 pointer-events-none" />

              <p className="text-yellow-400 mb-4">★★★★★</p>

              <p className="text-white/70 leading-relaxed mb-6">
                “{item.text}”
              </p>

              <div>
                <p className="font-semibold text-yellow-400">{item.name}</p>
                <p className="text-white/50 text-sm">{item.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 Magnetic Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-20 px-10 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold shadow-[0_0_40px_rgba(234,179,8,0.4)]"
        >
          Start Your Journey
        </motion.button>

      </div>
    </section>
  );
}
