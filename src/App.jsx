import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm.jsx";
import NumberGrid from "./components/NumberGrid.jsx";
import SolutionModal from "./components/SolutionModal.jsx";
// import TestimoniesGrid from "./components/TestimoniesGrid.jsx";
import UserTestimonies from "./components/UserTestimonies.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Login / Logout
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedNumbers([]);
    setShowSolution(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

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
        "Your privacy is our priority. Every session is handled with honesty, respect, and complete confidentiality — giving you a safe space to share and receive true solutions.\n• Safe space → A private, judgment-free, and respectful environment where you can openly talk about your struggles without fear of exposure or criticism.\n• To share → You can express your personal, family, business, health, or spiritual concerns honestly.\n• To receive true solutions → You won’t just be listened to — you’ll also be given clear, practical, and spiritually guided remedies that address the real root of your problems.",
    },
    {
      id: "remedies",
      title: "Clear Answers with Practical Remedies",
      icon: "✓",
      color: "bg-teal-500",
      explanation:
        "We don’t just explain your problem — we guide you with simple, effective steps you can take to overcome it.\n✨ Spiritual Balance and Peace Restored: Through geomancy, hidden causes of life’s struggles are uncovered and corrected, helping you regain harmony, inner peace, and lasting stability.",
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

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="particle-bg absolute inset-0 -z-10"></div>
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  // Main App
  return (
    <div className="min-h-screen relative">
      {/* Particle Background */}
      <div className="particle-bg absolute inset-0 -z-10"></div>

      <div className="container mx-auto px-4 py-6 sm:py-8 relative z-10">
        {/* Top Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-black flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 relative">
                  {[1, 2, 3].map((num, idx) => {
                    const positions = [
                      { top: "-0.5rem", left: "50%", transform: "-translate-x-1/2" },
                      { top: "50%", right: "-0.5rem", transform: "-translate-y-1/2" },
                      { bottom: "-0.5rem", left: "50%", transform: "-translate-x-1/2" },
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
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-xl animate-pulse"></div>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-work-sans text-black drop-shadow-2xl leading-tight mb-2 tracking-wider">
                  GEOMANCY
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-work-sans text-black drop-shadow-2xl leading-tight mb-2 tracking-wider">
                  SOLUTIONS
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-black drop-shadow-lg tracking-widest">
                  TO SPIRITUAL ISSUES
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-black rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 text-base sm:text-lg shadow-2xl transform hover:scale-105 border-2 border-white/20"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 sm:p-12 mb-10 border-2 border-white/30 shadow-2xl relative overflow-hidden text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl leading-tight">
            Are life's challenges weighing you down?
          </h2>
          <p className="text-xl sm:text-2xl text-white mb-8 leading-relaxed max-w-4xl mx-auto">
            Discover the ancient art of Geomancy—a powerful system that interprets numbers and symbols to uncover
            problems and reveal lasting solutions.
          </p>
          <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center">
            <p className="text-xl sm:text-2xl font-bold text-white">
              Welcome {user.name}! Your spiritual guidance awaits in 4 sacred numbers
            </p>
          </div>
        </div>

        {/* Services Section */}
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

          {selectedService && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={closeServiceModal}
            >
              <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-4">{selectedService.title}</h3>
                <p className="whitespace-pre-line mb-4">{selectedService.explanation}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={closeServiceModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-black/60 rounded-2xl p-8 sm:p-10 shadow-2xl border-2 border-white/20 relative overflow-hidden mb-10 text-center">
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-wide">
            YOUR PROBLEM HAS A SOLUTION—
          </h4>
          <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 tracking-wide">
            DON'T WAIT ANY LONGER!
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-colors"
            >
              +234 801 234 5678
            </a>
            <a
              href="https://wa.me/2348098765432"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition-colors"
            >
              +234 809 876 5432
            </a>
          </div>
        </div>

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

        {/* <TestimoniesGrid selectedNumbers={selectedNumbers} /> */}
        <UserTestimonies selectedNumbers={selectedNumbers} userData={user} />

        {/* Video Player */}
        <VideoPlayer />
      </div>
    </div>
  );
}

export default App;
