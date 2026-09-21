import { useNavigate } from "react-router-dom";
import heroBg from "../../../assets/hero-bg.jpg"; 

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Optional Golden Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15),_transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Small Label */}
        <p className="text-sm tracking-[0.3em] text-yellow-500 mb-6">
          ANCIENT WISDOM · MODERN GUIDANCE
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-serif font-semibold mb-6 leading-tight text-white">
          Geomancy{" "}
          <span className="text-yellow-500">Solutions</span>
        </h1>

        {/* Description */}
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Unlock the secrets of the earth through the ancient art of geomancy.
          Discover your path, interpret the patterns, and find clarity in life’s
          deepest questions.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate("/services")}
            className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
