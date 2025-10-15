import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Eye, Compass, Sparkles, Heart, Target, Waves, AlertTriangle, Shield, BarChart3, Star, Quote, Users, Award, BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Index = () => {
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

  // Data arrays for sections
  const steps = [
    {
      icon: Eye,
      title: "Discover Your Path",
      description: "Begin your journey by exploring the ancient art of geomancy and understanding how it connects to your life's energy patterns.",
      step: "01"
    },
    {
      icon: Compass,
      title: "Receive Guidance", 
      description: "Get personalized insights based on geomantic principles that help you navigate life's important decisions with clarity.",
      step: "02"
    },
    {
      icon: Sparkles,
      title: "Align Your Energy",
      description: "Learn to recognize and work with the spiritual forces around you to maintain positive flow and avoid obstacles.", 
      step: "03"
    },
    {
      icon: Heart,
      title: "Transform Your Life",
      description: "Experience lasting peace, confidence, and balance as you integrate geomantic wisdom into your daily routine.",
      step: "04"
    }
  ];

  const benefits = [
    {
      icon: Eye,
      title: "See Clearly",
      description: "Find out the hidden things affecting your life.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Make Better Choices",
      description: "Get help when making important decisions.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Waves,
      title: "Stay in Tune",
      description: "Live in harmony with nature and spiritual forces.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: AlertTriangle,
      title: "Avoid Problems",
      description: "Get early warning before troubles come.",
      gradient: "from-red-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Trust Yourself",
      description: "Gain confidence in your own feelings and thoughts.",
      gradient: "from-gray-500 to-slate-600"
    },
    {
      icon: Heart,
      title: "Find Balance",
      description: "Bring peace to your mind, body, and spirit.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Grow Stronger",
      description: "Change challenges into new chances for success.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      location: "San Francisco, CA",
      rating: 5,
      text: "GeomancySolution completely transformed how I approach major life decisions. The clarity I've gained through their geomantic insights is incredible. I finally feel aligned with my true path.",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      location: "Austin, TX", 
      rating: 5,
      text: "I was skeptical at first, but the accuracy of the readings and the practical guidance provided has been remarkable. It's helped me avoid several potential problems and seize opportunities I might have missed.",
      avatar: "MR"
    },
    {
      name: "Dr. Emily Watson",
      location: "Boston, MA",
      rating: 5,
      text: "As a therapist, I appreciate the holistic approach GeomancySolution offers. It's provided my clients and me with deeper insights into energy patterns and life flow that complement traditional healing methods.",
      avatar: "EW"
    },
    {
      name: "David Kim",
      location: "Seattle, WA",
      rating: 5,
      text: "The step-by-step guidance and personalized approach made all the difference. I've found the balance and peace of mind I was searching for. The spiritual insights are both profound and practical.",
      avatar: "DK"
    }
  ];

  const faqs = [
    {
      question: "What exactly is Geomancy and how does it work?",
      answer: "Geomancy is an ancient divination practice that interprets patterns in the earth and cosmic energies to provide guidance. Our modern approach combines traditional geomantic principles with contemporary spiritual practices to help you understand the energy flows affecting your life and make aligned decisions."
    },
    {
      question: "How accurate are the geomantic readings?",
      answer: "Our geomantic interpretations have helped thousands of people gain clarity and make better life choices. While we can't guarantee specific outcomes, our clients consistently report improved decision-making, increased awareness of opportunities and challenges, and a stronger sense of alignment with their life path."
    },
    {
      question: "Do I need any prior knowledge or experience?",
      answer: "Not at all! GeomancySolution is designed for everyone, from complete beginners to those already familiar with spiritual practices. We provide clear, step-by-step guidance and explain everything in accessible terms. Your willingness to be open to new perspectives is all you need."
    },
    {
      question: "How is this different from other spiritual guidance services?",
      answer: "Our approach uniquely combines ancient geomantic wisdom with modern life applications. Unlike generic readings, we focus on practical guidance for real-world decisions while maintaining connection to deeper spiritual truths. We emphasize teaching you to recognize patterns and energy flows yourself."
    },
    {
      question: "What can I expect from a session?",
      answer: "Each session provides personalized insights into your current life energy patterns, guidance on specific questions or decisions you're facing, and practical tools for maintaining positive spiritual flow. Sessions typically last 60-90 minutes and include follow-up support materials."
    },
    {
      question: "Is this compatible with my religious beliefs?",
      answer: "Geomancy is a spiritual practice that focuses on understanding natural energy patterns rather than specific religious doctrines. Many people from various faith backgrounds find it complements their existing beliefs by providing additional perspective on life's patterns and spiritual connections."
    },
    {
      question: "How quickly will I see results?",
      answer: "Many clients report immediate insights and clarity during their first session. However, the full benefits of geomantic guidance often unfold over weeks and months as you apply the insights to your daily life. Lasting transformation happens through consistent practice and awareness."
    },
    {
      question: "What if I'm not satisfied with my experience?",
      answer: "We're committed to your spiritual growth and satisfaction. If you're not completely satisfied with your experience, we offer a 30-day money-back guarantee. We also provide ongoing support to ensure you get the maximum benefit from your geomantic journey."
    }
  ];

  const stats = [
    {
      icon: Users,
      number: "10,000+",
      label: "Spiritual Seekers Guided"
    },
    {
      icon: Award,
      number: "15+",
      label: "Years of Experience"
    },
    {
      icon: BookOpen,
      number: "50,000+",
      label: "Successful Readings"
    },
    {
      icon: Heart,
      number: "98%",
      label: "Client Satisfaction"
    }
  ];

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
<header className="fixed top-0 left-0 w-full z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-lg px-4 sm:px-8 md:px-12 py-4">
      
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 sm:gap-3" aria-label="GeomancySolution Home">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#00F0FF] to-[#C850C0]">
          <img src="/logo23.jpg" alt="GeomancySolution Logo" className="h-full w-full object-contain" />
        </div>
        <span className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent whitespace-nowrap">
          GeomancySolution
        </span>
      </a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
        <a href="#how-it-works" className="text-white/80 hover:text-[#00F0FF] transition-colors font-medium">How It Works</a>
        <a href="#benefits" className="text-white/80 hover:text-[#00F0FF] transition-colors font-medium">Benefits</a>
        <a href="#testimonials" className="text-white/80 hover:text-[#00F0FF] transition-colors font-medium">Testimonials</a>
        <a href="#faq" className="text-white/80 hover:text-[#00F0FF] transition-colors font-medium">FAQ</a>
        <a href="#about" className="text-white/80 hover:text-[#00F0FF] transition-colors font-medium">About</a>
      </nav>

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-3">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-all"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black font-semibold hover:shadow-lg transition-all"
        >
          Signup
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden px-3 py-2 border border-white/20 rounded-lg"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="absolute top-20 right-4 w-64 bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg p-4 flex flex-col gap-3 md:hidden">
      <a href="#how-it-works" className="px-3 py-2 rounded-md text-white/80 hover:text-[#00F0FF] hover:bg-white/5" onClick={() => setMenuOpen(false)}>How It Works</a>
      <a href="#benefits" className="px-3 py-2 rounded-md text-white/80 hover:text-[#00F0FF] hover:bg-white/5" onClick={() => setMenuOpen(false)}>Benefits</a>
      <a href="#testimonials" className="px-3 py-2 rounded-md text-white/80 hover:text-[#00F0FF] hover:bg-white/5" onClick={() => setMenuOpen(false)}>Testimonials</a>
      <a href="#faq" className="px-3 py-2 rounded-md text-white/80 hover:text-[#00F0FF] hover:bg-white/5" onClick={() => setMenuOpen(false)}>FAQ</a>
      <a href="#about" className="px-3 py-2 rounded-md text-white/80 hover:text-[#00F0FF] hover:bg-white/5" onClick={() => setMenuOpen(false)}>About</a>
      <hr className="border-white/10 my-2" />
      <button onClick={() => navigate("/login")} className="px-3 py-2 border border-white/20 rounded-md hover:bg-white/5">Login</button>
      <button
        onClick={() => navigate("/signup")}
        className="px-3 py-2 rounded-md bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black font-semibold hover:shadow-lg transition-all"
      >
        Signup
      </button>
    </div>
  )}
</header>


      {/* Hero Section */}
      <main className="relative z-30 flex items-center justify-center px-4 sm:px-8 md:px-16 py-12 pt-32">
        <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 text-center md:text-left">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">
                GeomancySolution
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
              Discover how Geomancy can guide your life. Unlock hidden truths, make better choices, and stay connected to the 
              positive spiritual flow surrounding you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black font-semibold hover:shadow-xl transition-all"
              >
                Enter Portal
              </button>
              <button 
                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
              >
                Learn More
              </button>
            </div>


          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src="/sacred-numbers.jpg" 
              alt="Mystical geomancy portal with spiritual energy" 
              className="relative z-10 w-full h-full object-cover rounded-full border border-white/20 shadow-2xl"
            />
          </motion.div>
        </section>
      </main>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-30 py-24 cosmic-bg">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              How <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">Geomancy</span> Works
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A step-by-step journey to unlock the secrets of space and time, 
              bringing ancient wisdom into your modern life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="p-8 text-center rounded-2xl relative group bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:scale-[1.03] hover:shadow-xl transition-transform duration-300"
                >
                  <div className="absolute -top-4 left-4 text-6xl font-bold text-[#00F0FF]/20 group-hover:text-[#00F0FF]/40 transition-colors">
                    {step.step}
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-black" />
                    </div>
                    
                    <h3 className="text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-lg text-white/80">
              <Sparkles className="h-5 w-5 text-[#00F0FF]" />
              <span>Ready to begin your transformation?</span>
              <Sparkles className="h-5 w-5 text-[#C850C0]" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative z-30 py-24 cosmic-bg">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Why Check Yourself <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">Geomantically?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Discover the transformative power of ancient wisdom applied to modern life challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl text-center group hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                >
                  <div className="mb-6 mx-auto w-16 h-16 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] rounded-2xl flex items-center justify-center group-hover:shadow-2xl transition-all duration-300">
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-white/80 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <p className="text-2xl font-semibold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent max-w-4xl mx-auto">
              🔮 Geomancy is your guide to <span className="text-[#00F0FF]">clarity</span>, <span className="text-[#C850C0]">peace</span>, and <span className="text-[#FFD700]">progress</span>, all while keeping you aligned with the <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">positive spiritual flow</span> surrounding you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-30 py-24 cosmic-bg">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              What Our <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">Community</span> Says
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Join thousands who have discovered clarity, peace, and purpose through geomantic wisdom.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl relative group bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
              >
                <div className="absolute top-4 right-4 text-[#00F0FF]/20 group-hover:text-[#00F0FF]/40 transition-colors">
                  <Quote className="h-12 w-12" />
                </div>
                
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 fill-[#FFD700] text-[#FFD700]"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg leading-relaxed text-white relative z-10">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] rounded-full flex items-center justify-center font-bold text-black">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/80">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 text-lg text-white/80">
              <Star className="h-5 w-5 fill-[#FFD700] text-[#FFD700]" />
              <span>Trusted by over 10,000+ spiritual seekers worldwide</span>
              <Star className="h-5 w-5 fill-[#FFD700] text-[#FFD700]" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-30 py-24 cosmic-bg">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              Frequently Asked <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to know about your geomantic journey
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl px-8 border-0 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-[#00F0FF] hover:no-underline py-8 text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 leading-relaxed pb-8 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-white/80 mb-6">
              Still have questions? We're here to help on your spiritual journey.
            </p>
            <button className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black hover:shadow-xl transition-all">
              Contact Our Guides
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-30 py-24 cosmic-bg">
        <div className="container px-4 mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
                  About <span className="bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">GeomancySolution</span>
                </h2>
                {/* <p className="text-xl text-white/80 leading-relaxed">
                  Founded on the belief that ancient wisdom can illuminate modern paths, 
                  GeomancySolution bridges the gap between traditional geomantic practices 
                  and contemporary spiritual guidance.
                </p> */}
              </div>

              <div className="space-y-6">
                <p className="text-lg text-white leading-relaxed">
                 Pamist Kunle Ishola, founder of Geomancy Solutions, blends science and spirit to help people create spaces that truly support their lives. With a B.Sc. in Physics and a Diploma in Scientific Palmistry (New Delhi), he combines traditional geomancy with modern energy awareness to clear hidden blockages, restore balance, and promote clarity, peace, and wellbeing in homes, workplaces, and communities.
                </p>

                <p className="text-lg text-white leading-relaxed">
                  Today, we're proud to serve a global community of spiritual seekers, 
                  helping them navigate life's complexities with wisdom, confidence, and 
                  deep connection to the universal energies that surround us all.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] text-black hover:shadow-xl transition-all">
                  Start Your Journey
                </button>
                <button className="px-8 py-4 rounded-full font-semibold bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white">
                  Meet Our Team
                </button>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-8 rounded-2xl text-center group bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <div className="mb-6 mx-auto w-16 h-16 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] rounded-2xl flex items-center justify-center group-hover:shadow-2xl transition-all duration-300">
                      <Icon className="h-8 w-8 text-black" />
                    </div>
                    
                    <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    
                    <div className="text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="mt-24 text-center max-w-4xl mx-auto">
            <div className="p-12 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <h3 className="text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">
                Our Mission
              </h3>
              <p className="text-xl text-white leading-relaxed">
                "To empower every individual with the ancient wisdom of geomancy, 
                helping them discover their true path, make aligned decisions, and 
                live in harmony with the cosmic forces that guide us all. We believe 
                that when people are connected to their spiritual flow, they create 
                ripples of positive change throughout the world."
              </p>
              <div className="mt-8 text-lg text-white/80">
                — Pamist Kunle Ishola, Founder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-30 px-4 sm:px-8 md:px-16 py-16 text-white border-t border-white/10 cosmic-bg border-t border-border/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-[#00F0FF] to-[#C850C0] rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">G</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#C850C0] bg-clip-text text-transparent">
                  GeomancySolution
                </span>
              </div>
              <p className="text-white/80 mb-6">
                Bridging ancient wisdom with modern spiritual guidance for seekers worldwide.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1YdZLzhdEZ/" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00F0FF]/20 transition-colors">
                  <Facebook className="h-5 w-5 text-white/80" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00F0FF]/20 transition-colors">
                  <Twitter className="h-5 w-5 text-white/80" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00F0FF]/20 transition-colors">
                  <Instagram className="h-5 w-5 text-white/80" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00F0FF]/20 transition-colors">
                  <Youtube className="h-5 w-5 text-white/80" />
                </a>
              </div>
            </div>

            {/* Services Section
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Personal Readings</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Group Sessions</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Online Courses</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Workshops</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Consultation</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            {/* <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Beginner's Guide</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Blog & Articles</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Community Forum</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Video Library</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00F0FF] transition-colors">Free Resources</a></li>
              </ul>
            </div> */} 

            {/* Contact Section */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-[#00F0FF]" />
                  <span className="text-white/80">geomancysolution@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-[#00F0FF]" />
                  <span className="text-white/80">+1 (306) 999-4564</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-[#00F0FF]" />
                  <span className="text-white/80">Saskatoon, Canada</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/60">
                © 2025 GeomancySolution. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-white/60 hover:text-[#00F0FF] transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-white/60 hover:text-[#00F0FF] transition-colors text-sm">Terms of Service</a>
                <a href="#" className="text-white/60 hover:text-[#00F0FF] transition-colors text-sm">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;