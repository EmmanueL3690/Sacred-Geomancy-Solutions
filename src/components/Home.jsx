"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NumberGrid from "./NumberGrid.jsx";
import SolutionModal from "./solutionsData.js";
import UserTestimonies from "./UserPage.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";

function Home({ user, onLogout }) {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  // 🔑 Redirect ONLY if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Services
  const services = [
    {
      id: "relationship",
      title: "Relationship Struggles & Family Conflicts",
      icon: "💕",
      color: "bg-red-500",
      explanation:
        "Misunderstandings, lack of trust, and family disputes can destroy harmony at home. Geomancy reveals the hidden causes and provides remedies to restore peace, rebuild love, and bring unity back into relationships.\n✨ Every problem has a solution — don’t wait any longer. Find clarity, peace, and progress today through Geomancy Solutions.",
    },
    {
      id: "business",
      title: "Business Setbacks & Financial Blocks",
      icon: "🛡️",
      color: "bg-green-500",
      explanation:
        "Repeated losses, debts, or lack of progress in business are signs of financial blockages. With geomancy, unseen obstacles are uncovered and solutions given to open doors for success, prosperity, and steady growth.\n✨ Every problem has a solution — don’t wait any longer. Find clarity, peace, and progress today through Geomancy Solutions.",
    },
    {
      id: "health",
      title: "Health Worries & Recurring Challenges",
      icon: "⚕️",
      color: "bg-blue-500",
      explanation:
        "Constant sickness or repeated life challenges may go beyond the physical. Geomancy exposes hidden patterns and offers remedies to break cycles of negativity, restore strength, and bring peace of mind.\n✨ Every problem has a solution — don’t wait any longer. Find clarity, peace, and progress today through Geomancy Solutions.",
    },
    {
      id: "protection",
      title: "Protection from Spiritual Negativity",
      icon: "🛡️",
      color: "bg-purple-500",
      explanation:
        "Jealousy, curses, or unseen negative forces can block progress and disturb peace. Geomancy identifies the source of negativity and provides spiritual protection to cleanse, shield, and restore balance to your life.\n✨ Every problem has a solution — don’t wait any longer. Find clarity, peace, and progress today through Geomancy Solutions.",
    },
    {
      id: "consultation",
      title: "Trusted & Confidential Consultations",
      icon: "✓",
      color: "bg-orange-500",
      explanation:
        "Your privacy is our priority. Every session is handled with honesty, respect, and complete confidentiality — giving you a safe space to share and receive true solutions.",
    },
    {
      id: "remedies",
      title: "Clear Answers with Practical Remedies",
      icon: "✓",
      color: "bg-teal-500",
      explanation:
        "We don’t just explain your problem — we guide you with simple, effective steps you can take to overcome it.\n✨ Spiritual Balance and Peace Restored.",
    },
  ];

  const openServiceModal = (service) => setSelectedService(service);
  const closeServiceModal = () => setSelectedService(null);

  const handleNumberClick = (num) => {
    let newSelection;
    if (selectedNumbers.includes(num)) {
      newSelection = selectedNumbers.filter((n) => n !== num);
    } else if (selectedNumbers.length < 4) {
      newSelection = [...selectedNumbers, num];
    } else {
      newSelection = selectedNumbers;
    }
    setSelectedNumbers(newSelection);
    if (newSelection.length === 4) setShowSolution(true);
  };

  // If user is null, return nothing (redirect handled by useEffect)
  if (!user) return null;

  return (
    <div className="min-h-screen relative">
      {/* Particle Background */}
      <div className="particle-bg absolute inset-0 -z-10"></div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Top Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* LOGO / NUMBERS */}
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-black flex items-center justify-center shadow-2xl">
                  {[1, 2, 3].map((num, idx) => {
                    const positions = [
                      { top: "-0.5rem", left: "50%", transform: "translateX(-50%)" },
                      { top: "50%", right: "-0.5rem", transform: "translateY(-50%)" },
                      { bottom: "-0.5rem", left: "50%", transform: "translateX(-50%)" },
                    ];
                    const selected = selectedNumbers.includes(num);
                    return (
                      <div
                        key={num}
                        className={`absolute text-white font-black text-2xl w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
                          selected ? "bg-yellow-400 text-black scale-110" : ""
                        }`}
                        style={positions[idx]}
                        onClick={() => handleNumberClick(num)}
                      >
                        {num}
                      </div>
                    );
                  })}
                  <div className="relative cursor-pointer" onClick={() => handleNumberClick(4)}>
                    <div className="w-16 h-10 border-2 border-white rounded-full flex items-center justify-center bg-white">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <span
                          className={`text-white font-black text-lg ${
                            selectedNumbers.includes(4) ? "bg-yellow-400 rounded-full p-1 text-black" : ""
                          }`}
                        >
                          4
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TITLE */}
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black leading-tight mb-2">
                  GEOMANCY SOLUTIONS
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
                  TO SPIRITUAL ISSUES
                </p>
              </div>
            </div>

            {/* Logout + Admin Dashboard */}
            <div className="flex flex-col gap-4">
              {user?.email === "emmanuelinnn13690@gmail.com" && (
                <button
                  onClick={() => navigate("/adminprofile")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-black rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
                >
                  ADMIN DASHBOARD
                </button>
              )}
              <button
                onClick={onLogout}
                className="px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-black rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300"
              >
                LOGOUT
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-black/60 rounded-3xl p-8 sm:p-12 mb-10 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Welcome {user?.email === "emmanuelinnn13690@gmail.com" ? "Admin" : user?.email}!
          </h2>
          <p className="text-xl">
            {user?.email === "emmanuelinnn13690@gmail.com"
              ? "You have admin access. Use the dashboard button above to manage the site."
              : "Your spiritual guidance awaits in 4 sacred numbers."}
          </p>
        </div>

        {/* Services */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">WE PROVIDE GUIDANCE FOR:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-black/50 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => openServiceModal(service)}
              >
                <div className={`text-4xl ${service.color} mb-4`}>{service.icon}</div>
                <h3 className="text-xl font-bold text-white">{service.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedService && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={closeServiceModal}
          >
            <div
              className="bg-white rounded-xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
              <p className="whitespace-pre-line mb-4">{selectedService.explanation}</p>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={closeServiceModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Number Grid */}
        <NumberGrid selectedNumbers={selectedNumbers} onNumberSelect={setSelectedNumbers} />

        {/* Solution Modal */}
        {showSolution && (
          <SolutionModal
            isOpen={showSolution}
            onClose={() => setShowSolution(false)}
            selectedNumbers={selectedNumbers}
            userData={user}
          />
        )}

        {/* Testimonials */}
        <UserTestimonies selectedNumbers={selectedNumbers} userData={user} />

        {/* Video Player */}
        <VideoPlayer />
      </div>
    </div>
  );
}

export default Home;
