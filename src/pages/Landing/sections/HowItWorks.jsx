import { Search, BookOpen, Sparkles, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={28} className="text-yellow-500" />,
      title: "Discover Your Path",
      desc: "Share your question or life situation to begin your journey.",
    },
    {
      icon: <BookOpen size={28} className="text-yellow-500" />,
      title: "Receive Guidance",
      desc: "Our sacred geomantic interpretation reveals hidden insights.",
    },
    {
      icon: <Sparkles size={28} className="text-yellow-500" />,
      title: "Align Your Energy",
      desc: "Understand patterns and align yourself with balanced energy.",
    },
    {
      icon: <Heart size={28} className="text-yellow-500" />,
      title: "Transform Your Life",
      desc: "Move forward with clarity, confidence, and direction.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-28 px-6 border-t border-white/5 text-center"
    >
      <div className="max-w-6xl mx-auto">

        <p className="text-sm tracking-[0.3em] text-yellow-500 mb-4">
          THE PROCESS
        </p>

        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          How Geomancy Works
        </h2>

        <p className="text-white/70 max-w-2xl mx-auto mb-16">
          A step-by-step journey to uncover hidden truths and bring sacred
          wisdom into your modern life.
        </p>

        <div className="grid md:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-yellow-500/20 flex items-center justify-center mb-4 backdrop-blur-md">
                {step.icon}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
