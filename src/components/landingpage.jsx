"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const layerFarRef = useRef(null);
  const layerNearRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // smooth cursor motion
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 40 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 40 });

  // particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const DPR = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(DPR, DPR);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? "#C850C0" : "#00F0FF", // pink or cyan
    }));

    let raf = null;
    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        g.addColorStop(0, p.color + "cc"); // bright
        g.addColorStop(1, "transparent");

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    function onResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(DPR, DPR);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // parallax layers
  useEffect(() => {
    let raf = null;
    function onMove(e) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (layerFarRef.current) {
          layerFarRef.current.style.transform = `translate(${nx * 10}px, ${ny * 8}px)`;
        }
        if (layerNearRef.current) {
          layerNearRef.current.style.transform = `translate(${nx * 22}px, ${ny * 18}px)`;
        }
      });
    }
    function onMouse(e) {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onMouse);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="landing-portal relative min-h-screen overflow-hidden text-white">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#2C003E] via-[#1F4068] to-[#0B0C10] animate-gradient" />

      {/* Particles Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />

      {/* parallax layers */}
      <div ref={layerFarRef} className="absolute inset-0 -z-10" aria-hidden />
      <div ref={layerNearRef} className="absolute inset-0 -z-5" aria-hidden />

      {/* glowing cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#C850C0] shadow-[0_8px_30px_rgba(200,80,192,0.3)] opacity-90"
        style={{ translateX: springX, translateY: springY }}
        aria-hidden
      />

      {/* Header */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 md:px-16 py-6">
        <a href="/" className="flex items-center gap-2 sm:gap-3">
          <img src="\logo23.jpg" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
          <span className="text-base sm:text-lg md:text-2xl font-semibold">
            GeomancySolution
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black font-semibold"
          >
            Signup
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden px-3 py-2 border border-white/20 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute top-16 right-4 bg-black/80 backdrop-blur-lg rounded-lg p-4 flex flex-col gap-3 md:hidden">
            <button onClick={() => navigate("/login")} className="px-4 py-2 border border-white/20 rounded-lg">
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black font-semibold"
            >
              Signup
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative z-30 flex items-center justify-center px-4 sm:px-8 md:px-16 py-12">
        <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 text-center md:text-left">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Welcome to  GeomancySolution
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
              Discover how Geomancy can guide your life <br />
              Unlock hidden truths, make better choices, and stay connected to the 
              positive spiritual flow surrounding you. Geomancy helps you find balance, 
              avoid unseen problems, gain confidence, and bring peace to your journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-full bg-white/10 border border-white/20">
                Login
              </button>
              <button
              onClick={() => navigate("/signup")}
               className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black font-semibold">
                Enter Portal
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img src="/sacred-numbers.jpg" alt="Portal" className="w-full h-full object-cover" />
          </motion.div>
        </section>
      </main>

      {/* Features Section */}
    {/* Why Check Yourself Geomantically Section */}
<section className="relative z-30 px-4 sm:px-8 md:px-16 py-12 sm:py-16 space-y-10">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
    Why Check Yourself Geomantically?
  </h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    { icon: "/icons/eye.svg", title: "See Clearly", text: "Find out the hidden things affecting your life." },
    { icon: "/icons/compass.svg", title: "Make Better Choices", text: "Get help when making important decisions." },
    { icon: "/icons/music.svg", title: "Stay in Tune", text: "Live in harmony with nature and spiritual forces." },
    { icon: "/icons/warning.svg", title: "Avoid Problems", text: "Get early warning before troubles come." },
    { icon: "/icons/handshake.svg", title: "Trust Yourself", text: "Gain confidence in your own feelings and thoughts." },
    { icon: "/icons/yin-yang.svg", title: "Find Balance", text: "Bring peace to your mind, body, and spirit." },
    { icon: "/icons/plant.svg", title: "Grow Stronger", text: "Change challenges into new chances for success." },
  ].map((f) => (
    <div
      key={f.title}
      className="p-6 rounded-2xl bg-white/10 backdrop-blur-md 
                 border border-white/20 shadow-lg 
                 hover:scale-[1.03] hover:shadow-xl 
                 transition-transform duration-300"
    >
      <img src={f.icon} alt={f.title} className="w-12 h-12 mb-4 mx-auto" />
      <h3 className="text-lg sm:text-xl font-semibold mb-3">{f.title}</h3>
      <p className="text-sm sm:text-base text-white/80">{f.text}</p>
    </div>
  ))}
</div>

  {/* Closing Statement */}
  <div className="text-center max-w-3xl mx-auto mt-8">
<p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
  🌍 Geomancy is your guide to <span className="text-[#00F0FF] font-semibold">clarity</span>, 
  <span className="text-[#C850C0] font-semibold"> peace</span>, and 
  <span className="text-[#FFD700] font-semibold"> progress</span>, all while keeping you aligned 
  with the <span className="text-[#00F0FF] font-semibold">positive spiritual flow</span> surrounding you.
</p>

  </div>
</section>

      {/* Footer */}
      <footer className="relative z-30 px-4 sm:px-8 md:px-16 py-8 text-center text-white/80 border-t border-white/10">
        <p>© 2025 GeomancySolution. All rights reserved.</p>
      </footer>
    </div>
  );
}
