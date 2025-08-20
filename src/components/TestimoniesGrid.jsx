import React, { useState } from "react";

// Correct:

import { Button } from "./ui/Button";  // file: Button.jsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";


const testimoniesData = {
  "1H": {
    id: "1H",
    title: "Section One - 1H",
    content: "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
    category: "Warning & Leadership",
  },
  "2H": {
    id: "2H",
    title: "Section Two - 2H",
    content: "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
    category: "Financial Recovery",
  },
  "3H": {
    id: "3H",
    title: "Section Three - 3H",
    content: "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
    category: "Friendship & Protection",
  },
  "4H": {
    id: "4H",
    title: "Section Four - 4H",
    content: "Mura tori wahala ota. Dukia wa kan nbe nita, ki a gba",
    category: "Enemy Warning & Wealth",
  },
  "5H": {
    id: "5H",
    title: "Section Five - 5H",
    content: "Ko belorun lori omo, enikan yoo saare, sugbon ko ni ku",
    category: "Child Protection & Safety",
  },
  "6H": {
    id: "6H",
    title: "Section Six - 6H",
    content: "Enikan yoo ku, ki a ma losi ibe",
    category: "Death Warning",
  },
  "7H": {
    id: "7H",
    title: "Section Seven - 7H",
    content: "Iyawo re yoo ko sile, Obinrin kan nje ni bebe iku",
    category: "Marriage & Relationship",
  },
  "8H": {
    id: "8H",
    title: "Section Eight - 8H",
    content: "Ija adugbo ti yoo kan iwo papa. Ki onibeere yi se saara lori iku",
    category: "Community Conflict",
  },
  "9H": {
    id: "9H",
    title: "Section Nine - 9H",
    content: "Ma paya irorun nbo, inawo tabi fifo nkan to robe lorun ki awon ota maa",
    category: "Peace & Enemy Protection",
  },
};

export default function TestimoniesGrid() {
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const numbers = Array.from({ length: 16 }, (_, i) => i + 1);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];

  const handleCellClick = (number, letter) => {
    const key = `${number}${letter}`;
    const testimony = testimoniesData[key];

    if (testimony) {
      setSelectedTestimony(testimony);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-4">
          Sacred Solutions Archive
        </h2>
        <p className="text-base sm:text-lg font-bold text-black drop-shadow-md">
          Discover wisdom through the mystical number-letter combinations
        </p>
      </div>

      <div className="overflow-x-auto bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-orange-200 shadow-xl p-4 sm:p-6">
        <div className="min-w-[800px]">
          {/* Header with letters */}
          <div className="grid grid-cols-17 gap-1 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12"></div>
            {letters.map((letter) => (
              <div
                key={letter}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-lg flex items-center justify-center font-black text-xs sm:text-sm shadow-lg"
              >
                {letter}
              </div>
            ))}
          </div>

          {/* Grid with numbers and cells */}
          {numbers.map((number) => (
            <div key={number} className="grid grid-cols-17 gap-1 mb-1">
              {/* Number header */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg flex items-center justify-center font-black text-xs sm:text-sm shadow-lg">
                {number}
              </div>

              {/* Letter cells */}
              {letters.map((letter) => {
                const key = `${number}${letter}`;
                const hasData = testimoniesData[key];

                return (
                  <button
                    key={key}
                    onClick={() => handleCellClick(number, letter)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center font-black text-xs transition-all duration-200 border-2 min-h-[40px] min-w-[40px] ${
                      hasData
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-600 hover:scale-110 hover:shadow-xl cursor-pointer"
                        : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    }`}
                    disabled={!hasData}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded border-2 border-green-600"></div>
          <span className="text-sm font-bold text-black">Available Solutions</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 bg-gray-100 rounded border-2 border-gray-300"></div>
          <span className="text-sm font-bold text-black">Coming Soon</span>
        </div>
      </div>

      {/* Solution Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl bg-gradient-to-br from-white via-orange-50 to-yellow-50 border-2 border-orange-300 mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-black bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent text-center">
              {selectedTestimony?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedTestimony && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-orange-200 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-black text-sm">{selectedTestimony.id}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full text-center">
                    {selectedTestimony.category}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-4 border-l-4 border-orange-500">
                  <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed">
                    {selectedTestimony.content}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-3 font-black shadow-xl min-h-[44px] w-full sm:w-auto"
                >
                  Close Sacred Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
