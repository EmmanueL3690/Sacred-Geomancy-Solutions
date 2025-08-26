"use client"

import { useState } from "react"

export default function NumberGrid({ selectedNumbers, onNumberSelect, onSaveTestimony }) {
  const [showResult, setShowResult] = useState(false)

  const initialGrid = [
    [12, 47, 3, 21, 8, 33, 59, 1],
    [27, 6, 40, 55, 19, 14, 62, 31],
    [5, 49, 28, 11, 36, 45, 23, 60],
    [32, 18, 7, 43, 25, 2, 48, 63],
    [22, 13, 61, 35, 9, 30, 41, 57],
    [4, 44, 10, 29, 15, 39, 24, 50],
    [52, 17, 42, 38, 20, 34, 56, 46],
    [26, 53, 16, 64, 54, 51, 37, 58],
  ];


  const [numberGrid, setNumberGrid] = useState(initialGrid)

  const shuffleGrid = () => {
    const flatNumbers = initialGrid.flat()
    const shuffled = [...flatNumbers].sort(() => Math.random() - 0.5)

    const newGrid = []
    for (let i = 0; i < 8; i++) {
      newGrid.push(shuffled.slice(i * 8, (i + 1) * 8))
    }
    setNumberGrid(newGrid)
  }

  const handleNumberClick = (number) => {
    let newSelected
    if (selectedNumbers.includes(number)) {
      newSelected = selectedNumbers.filter((n) => n !== number)
    } else if (selectedNumbers.length < 4) {
      newSelected = [...selectedNumbers, number]
    } else {
      return
    }

    onNumberSelect(newSelected)

    shuffleGrid()

    if (newSelected.length === 4) {
      setShowResult(true)
    } else {
      setShowResult(false)
    }
  }

  const handleDone = () => {
    // Save the selected numbers to testimonies
    if (onSaveTestimony) {
      onSaveTestimony(selectedNumbers)
    }
    setShowResult(false)
    onNumberSelect([])
    shuffleGrid()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
      <div className="p-2 sm:p-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black underline mb-4 sm:mb-6 text-white drop-shadow-lg">
          DISCOVER YOUR LIFE IN 4 NUMBERS
        </h2>

        {/* How It Works Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-orange-200 mb-4 sm:mb-6">
          <p className="text-lg sm:text-xl font-black mb-2">HOW IT WORKS</p>
          <ol className="list-decimal list-inside text-sm sm:text-base text-gray-700 font-black">
            <li>Look at the number chart below.</li>
            <li>Pick 4 numbers — one at a time.</li>
            <li>
              People choosing numbers are not just picking at random — they are entering a "realm" where numbers reveal
              their problems and solutions.
            </li>
            <li className="text-blue-600">Each selection reshuffles the realm — embrace the chaos!</li>
          </ol>
        </div>

        {/* Number Grid Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-6 shadow-2xl border-2 border-orange-200 mx-1 sm:mx-0">
          <h3 className="text-lg sm:text-xl font-black mb-4">SACRED NUMBER REALM</h3>

          <div className="grid grid-cols-8 gap-1 sm:gap-3 md:gap-3 max-w-full">
            {numberGrid.flat().map((number, index) => (
              <button
                key={`${Math.floor(index / 8)}-${index % 8}`}
                onClick={() => handleNumberClick(number)}
                className={`aspect-square flex items-center justify-center text-sm sm:text-base md:text-lg font-black rounded-lg transition-all duration-300 transform hover:scale-110 border-2 border-black ${
                  selectedNumbers.includes(number)
                    ? "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white shadow-lg scale-105 border-yellow-400"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-black hover:from-orange-100 hover:to-yellow-100 shadow-md"
                }`}
                disabled={selectedNumbers.length >= 4 && !selectedNumbers.includes(number)}
              >
                {number}
              </button>
            ))}
          </div>

          <div className="mt-4 sm:mt-6">
            <p className="text-sm sm:text-base font-black text-black mb-2">
              Selected Numbers: {selectedNumbers.join(", ") || "None"}
            </p>
            <p className="text-xs sm:text-sm font-black text-gray-600">{selectedNumbers.length}/4 numbers selected</p>
            {selectedNumbers.length > 0 && <p className="text-xs text-blue-600 font-black">✨ Realm reshuffled! ✨</p>}
          </div>
        </div>

        {/* Modal Popup */}
        {showResult && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
              <h3 className="text-xl font-bold mb-4">Your Sacred Revelation</h3>
              <p className="font-bold mb-4">Selected Numbers: {selectedNumbers.join(", ")}</p>
              <button
                className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

