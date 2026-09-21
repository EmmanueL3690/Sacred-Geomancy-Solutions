"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B0F1A] text-white border-t border-white/10">

      {/* 🌌 Floating Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 md:px-16 py-16">

        {/* Grid - 3 Columns */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-yellow-500/30 bg-yellow-500/10 shrink-0 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                <img
                  src="/logo23.jpg"
                  alt="Geomancy Solutions Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent block leading-none">
                  GEOMANCY
                </span>
                <span className="text-[10px] uppercase tracking-widest text-yellow-500/70 font-medium block mt-1">
                  Solutions
                </span>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed">
              Bridging ancient wisdom with modern spiritual guidance for seekers worldwide.
            </p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-yellow-400">
              Services
            </h4>
            <ul className="space-y-3 text-white/70">
              {[
                "Personal Readings",
                "Group Sessions",
                "Online Courses",
                "Workshops",
                "Consultation",
              ].map((item, i) => (
                <li key={i}>
                  <a className="hover:text-yellow-400 transition-colors duration-300 cursor-pointer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-yellow-400">
              Contact
            </h4>

            <div className="space-y-4 text-white/70">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-500 shrink-0" />
                <span>geomancysolution@gmail.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-500 shrink-0" />
                <span>+1 (306) 999-4564</span>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-500 shrink-0" />
                <span>Saskatoon, Canada</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>© 2026 GeomancySolution. All rights reserved.</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a className="hover:text-yellow-400 transition-colors cursor-pointer">
              Privacy Policy
            </a>
            <a className="hover:text-yellow-400 transition-colors cursor-pointer">
              Terms of Service
            </a>
            <a className="hover:text-yellow-400 transition-colors cursor-pointer">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}