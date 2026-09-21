import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const canvasRef = useRef(null);

  const faqs = [
    {
      question: "What is geomancy and how does it work?",
      answer:
        "Geomancy is an ancient divination practice that interprets symbolic patterns formed from earth energies to provide clarity and spiritual direction.",
    },
    {
      question: "How accurate are the readings?",
      answer:
        "Our readings are rooted in centuries-old geomantic traditions and tailored to your unique situation for grounded and practical insight.",
    },
    {
      question: "Can geomancy help with business decisions?",
      answer:
        "Yes. Many clients consult geomancy for financial strategy, partnerships, and life direction.",
    },
    {
      question: "Do I need prior spiritual knowledge?",
      answer:
        "No prior knowledge is required. Every session is explained clearly and guided step-by-step.",
    },
  ];

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  /* 🌠 STARFIELD */
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
      ctx.fillStyle = "rgba(234,179,8,0.7)";
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

  return (
    <section className="relative bg-[#0B0F1A] py-32 px-6 text-white overflow-hidden">

      {/* 🌠 Star Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 🌌 Floating Gold Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[140px] rounded-full animate-pulse" />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* FAQ Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-serif text-center mb-20 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="rounded-xl border border-yellow-500/20 bg-[#111111]/80 backdrop-blur-lg overflow-hidden hover:border-yellow-400/40 hover:shadow-[0_0_40px_rgba(234,179,8,0.2)] transition duration-500"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-medium text-lg">
                  {item.question}
                </span>

                <ChevronDown
                  className={`text-yellow-400 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6 text-white/60 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ===================== */}
        {/* 🔥 PREMIUM CTA BOX */}
        {/* ===================== */}

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-32 relative"
        >
          <div className="relative p-16 rounded-2xl border border-yellow-500/40 bg-gradient-to-br from-[#1a1408] to-[#0f0c06] text-center overflow-hidden">

            {/* ✨ Shimmer Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent blur-xl opacity-40 animate-pulse pointer-events-none" />

            <h3 className="text-4xl md:text-5xl font-serif mb-6">
              Your Problem Has a{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Solution
              </span>
            </h3>

            <p className="text-white/60 max-w-2xl mx-auto mb-10">
              Don't wait any longer. Begin your journey to clarity and peace today.
              Our experienced geomancers are ready to guide you.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-6 flex-wrap">


              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg border border-yellow-500/40 hover:border-yellow-400 flex items-center gap-2"
                onClick={() => navigate("/contact")}
              >
                <Phone size={18} />
                Contact Us
              </motion.button>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

