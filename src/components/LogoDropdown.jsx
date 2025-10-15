import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import logo from "../assets/auth/logo23.jpg";

export default function LogoDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img src={logo} alt="Geomancy Logo" className="w-10 h-10 rounded-full" />
        <span className="font-semibold text-white">Geomancy</span>
        <ChevronDown className={`text-white w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 right-0 w-40 bg-white/10 backdrop-blur-lg text-white rounded-xl shadow-lg overflow-hidden border border-white/20"
          >
            <a href="/" className="block px-4 py-2 hover:bg-white/20">About Geomancy</a>
            <a href="/contact" className="block px-4 py-2 hover:bg-white/20">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
