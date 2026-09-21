import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">

      {/* 🌌 Floating Glow Orbs */}
      <div className="absolute top-24 left-10 w-72 h-72 bg-[#C9A227]/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600/20 blur-[120px] rounded-full animate-pulse" />

      {/* subtle star texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

      <div className="relative z-10">

        {/* NAVBAR SPACING */}
        <div className="h-24" />

        <section className="max-w-6xl mx-auto px-6 pb-24">

          {/* SMALL LABEL */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm tracking-[0.35em] text-[#C9A227]"
          >
            GET IN TOUCH
          </motion.p>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-4xl md:text-6xl font-semibold mt-4"
          >
            Contact{" "}
            <span className="bg-gradient-to-r from-[#C9A227] to-yellow-500 bg-clip-text text-transparent">
              Us
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-400 mt-6"
          >
            Have questions? We're here to help on your spiritual journey.
          </motion.p>

          {/* CONTACT CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {[
              {
                icon: Mail,
                title: "Email",
                text: "geomancysolutions@gmail.com",
              },
              {
                icon: Phone,
                title: "Phone",
                text: "+234 803 321 3897",
              },
              {
                icon: MapPin,
                title: "Location",
                text: "Global Online Service",
              },
            ].map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#2a2a2a] rounded-xl p-8 text-center hover:border-[#C9A227]/60 transition"
                >
                  <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-lg border border-[#C9A227] text-[#C9A227] mb-4">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-[#2a2a2a] rounded-2xl p-8 md:p-12 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

            <form className="space-y-5">
              {/* name + email */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227]"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227]"
              />

              <textarea
                placeholder="Your Message *"
                rows="5"
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#C9A227]"
              />

              {/* MAGNETIC BUTTON */}
              <button
                type="submit"
                className="group relative w-full py-4 rounded-lg font-medium overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#C9A227] to-yellow-500 transition group-hover:scale-105"></span>

                <span className="relative flex items-center justify-center gap-2 text-black font-semibold">
                  <Send size={18} />
                  Send Message
                </span>
              </button>
            </form>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
