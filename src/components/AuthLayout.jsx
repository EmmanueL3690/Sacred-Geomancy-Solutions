
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthImageSlider from "./AuthImageSlider";
import LogoDropdown from "./LogoDropdown";

import spirit1 from "../assets/auth/spirit1.jpg";
import dove from "../assets/auth/dove.jpg";
import spirit3 from "../assets/auth/spirit3.jpg";
import spirit4 from "../assets/auth/spirit4.jpg";

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const images = [spirit1, dove, spirit3, spirit4];

  return (
    <div className="min-h-screen flex bg-[#05060A] text-white overflow-hidden">
      {/* 🌅 Left Section with Image Slider */}
      <div className="relative hidden lg:flex w-1/2 items-center justify-center">
        <AuthImageSlider images={images} />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

        {/* 🔹 Header (Logo + Back Button) */}
        <div className="absolute top-6 left-6 flex justify-between w-[90%] items-center z-20">
          <LogoDropdown />
          <button
            onClick={() => navigate("/")}
            className="text-sm bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full transition-all"
          >
            Back to website →
          </button>
        </div>

        {/* 🕊️ Center Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute text-center text-white px-6"
        >
          <h1 className="text-4xl font-bold mb-3 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-teal-300">
            Numbers to Solutions
          </h1>
          <p className="text-base text-gray-200 max-w-sm mx-auto leading-relaxed">
            Capturing your spiritual essence, unlocking divine messages, and guiding your path.
          </p>
        </motion.div>
      </div>

      {/* 🌠 Right Section (Form Side) */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 md:px-12 lg:px-16 bg-gradient-to-br from-[#0B0C10] via-[#0E1A2B] to-[#1F4068] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
