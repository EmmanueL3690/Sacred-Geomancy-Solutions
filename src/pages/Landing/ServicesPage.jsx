import {
  Eye,
  Compass,
  Shield,
  Sparkles,
  BookOpen,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: Eye,
    title: "Personal Geomantic Reading",
    description:
      "Receive a detailed, personalized reading that interprets sacred geomantic figures.",
    price: "₦5,000",
  },
  {
    icon: Compass,
    title: "Life Direction Consultation",
    description:
      "Navigate major life decisions with ancient earth wisdom guiding your choices.",
    price: "₦5,000",
  },
  {
    icon: Shield,
    title: "Spiritual Protection",
    description:
      "Identify negative spiritual influences and receive protective remedies.",
    price: "₦5,000",
  },
  {
    icon: Sparkles,
    title: "Problem Resolution",
    description:
      "Resolve financial, health, or family issues with targeted remedies.",
    price: "₦5,000",
  },
  {
    icon: BookOpen,
    title: "Learn Geomancy",
    description:
      "Master geomantic figures and chart interpretation with guided training.",
    price: "₦5,000",
  },
  {
    icon: Star,
    title: "Premium Consultation",
    description:
      "Full spiritual advisory package with priority access & ongoing support.",
    price: "₦5,000",
  },
  {
    icon: Sparkles,
    title: "Custom Consultation",
    description:
      "Describe your situation and receive personalized guidance tailored to your needs.",
    price: "₦5,000",
    custom: true,
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [ripple, setRipple] = useState(null);

  const phoneNumber = "2348154550969";

  // ✅ Sort so custom always last
  const sortedServices = [
    ...services.filter((s) => !s.custom),
    ...services.filter((s) => s.custom),
  ];

  const generateWhatsAppMessage = () => {
    if (!selectedService) return "";

    const detailText =
      selectedService.custom && customMessage
        ? `\nDetails: ${customMessage}`
        : "";

    return encodeURIComponent(
      `Hello, I would like to book a consultation.\n\nService: ${selectedService.title}\nPrice: ${selectedService.price}${detailText}\n\nPlease guide me on the next steps.`
    );
  };

  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
    setTimeout(() => setRipple(null), 500);
  };

  const closeModal = () => {
    setSelectedService(null);
    setCustomMessage("");
  };

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* glow orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-24">
        <h1 className="text-center text-5xl font-semibold mb-4">
          Sacred <span className="text-yellow-400">Services</span>
        </h1>

        <p className="text-center text-gray-400 mb-16 max-w-xl mx-auto">
          Choose a service and begin your spiritual journey today.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-">
          {sortedServices.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className={`group relative rounded-2xl p-8 transition ${
                  service.custom
                    ? "border-yellow-400 bg-[#111] shadow-[0_0_25px_rgba(255,215,0,0.25)] lg:col-span-3"
                    : "bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#2a2a2a] hover:border-yellow-400/60 hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]"
                }`}
              >
                {/* Custom Badge */}
                {service.custom && (
                  <div className="text-yellow-400 text-xs mb-2 uppercase tracking-wider">
                    Flexible Option
                  </div>
                )}

                {/* icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-yellow-400 text-yellow-400 mb-6">
                  <Icon size={22} />
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4">
                  {service.description}
                </p>

                <div className="text-yellow-400 font-semibold mb-6">
                  {service.price}
                </div>

                {/* BUTTON */}
                <button
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty(
                      "--x",
                      `${e.clientX - rect.left}px`
                    );
                    e.currentTarget.style.setProperty(
                      "--y",
                      `${e.clientY - rect.top}px`
                    );
                  }}
                  onClick={(e) => {
                    handleRipple(e);
                    setSelectedService(service);
                  }}
                  className="relative w-full py-3 rounded-lg border border-yellow-400 text-yellow-400 font-medium overflow-hidden"
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at var(--x) var(--y), rgba(255,215,0,0.35), transparent 40%)",
                    }}
                  />

                  {ripple && (
                    <span
                      className="absolute bg-yellow-400/40 rounded-full animate-ping"
                      style={{
                        top: ripple.y,
                        left: ripple.x,
                        width: 20,
                        height: 20,
                      }}
                    />
                  )}

                  <span className="relative z-10">Get Started</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0a] border border-yellow-400/30 rounded-2xl p-8 max-w-md w-full text-center"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {selectedService.title}
            </h2>

            <p className="text-yellow-400 text-xl mb-4">
              {selectedService.price}
            </p>

            <p className="text-gray-400 mb-6">
              {selectedService.custom
                ? "Please describe your situation below before proceeding."
                : "Choose how you want to proceed."}
            </p>

            {/* Custom Textarea */}
            {selectedService.custom && (
              <textarea
                placeholder="Describe your problem in detail (e.g. business, relationship, health)..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3 rounded-lg bg-black border border-gray-700 text-white mb-4 focus:border-yellow-400 outline-none transition"
                rows="4"
              />
            )}

            {/* signup */}
            <button
              onClick={() =>
                navigate("/signup", {
                  state: {
                    service: selectedService.title,
                    details: customMessage,
                  },
                })
              }
              className="w-full py-3 mb-3 rounded-lg bg-yellow-400 text-black font-semibold hover:scale-105 transition"
            >
              Continue to Signup
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 mb-3 rounded-lg border border-green-500 text-green-400 hover:bg-green-500/10 transition text-center"
            >
              Book via WhatsApp
            </a>

            <button
              onClick={closeModal}
              className="text-gray-400 mt-2 hover:text-white"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}