"use client";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function NumberGrid({ onNumberSelect }) {
  const auth = getAuth();
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);

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

  const [numberGrid, setNumberGrid] = useState(initialGrid);

  // Shuffle numbers
  const shuffleGrid = () => {
    const flat = initialGrid.flat();
    const shuffled = [...flat].sort(() => Math.random() - 0.5);
    const newGrid = [];
    for (let i = 0; i < 8; i++) {
      newGrid.push(shuffled.slice(i * 8, (i + 1) * 8));
    }
    setNumberGrid(newGrid);
  };

  // Load existing numbers for returning user
  useEffect(() => {
    const fetchUserNumbers = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.numberPicked) {
          setSelectedNumbers(data.numberPicked);
          if (onNumberSelect) onNumberSelect(data.numberPicked);
        }
      }
    };
    fetchUserNumbers();
  }, [auth, onNumberSelect]);

  const handleNumberClick = async (number) => {
    if (selectedNumbers.length >= 4 && !selectedNumbers.includes(number)) return;

    let newSelected;
    if (selectedNumbers.includes(number)) {
      newSelected = selectedNumbers.filter((n) => n !== number);
    } else {
      newSelected = [...selectedNumbers, number];
    }

    setSelectedNumbers(newSelected);
    shuffleGrid();

    if (newSelected.length === 4) {
      setShowResult(true);
      const user = auth.currentUser;
      if (user) {
        try {
          await setDoc(
            doc(db, "users", user.uid),
            {
              numberPicked: newSelected,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
          if (onNumberSelect) onNumberSelect(newSelected);
        } catch (error) {
          console.error("Error saving selected numbers:", error);
        }
      }
    }
  };

  const handleDone = () => {
    setShowResult(false);
    shuffleGrid();
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-3xl border-4 border-orange-300 w-full max-w-3xl">
  <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-orange-700 drop-shadow-lg">
    SACRED NUMBER REALM
  </h3>

  <div className="grid grid-cols-8 gap-3 sm:gap-4">
    {numberGrid.flat().map((number, index) => (
      <button
        key={index}
        onClick={() => handleNumberClick(number)}
        disabled={selectedNumbers.length >= 4 && !selectedNumbers.includes(number)}
        className={`aspect-square flex items-center justify-center text-lg sm:text-xl md:text-2xl font-extrabold rounded-lg transition-all duration-300 transform hover:scale-110 border-2 ${
          selectedNumbers.includes(number)
            ? "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white shadow-2xl border-yellow-400"
            : "bg-gradient-to-br from-gray-100 to-gray-200 text-black hover:from-orange-200 hover:to-yellow-200 shadow-lg"
        }`}
      >
        {number}
      </button>
    ))}
  </div>

  <div className="mt-4 sm:mt-6 text-center">
    <p className="text-sm sm:text-base font-extrabold text-black mb-1">
      Selected Numbers: {selectedNumbers.join(", ") || "None"}
    </p>
    <p className="text-xs sm:text-sm font-extrabold text-gray-700">{selectedNumbers.length}/4 numbers selected</p>
    {selectedNumbers.length > 0 && (
      <p className="text-xs sm:text-sm font-extrabold text-blue-600">✨ Realm reshuffled! ✨</p>
    )}
  </div>

  {showResult && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-3xl w-full max-w-md text-center">
        <h3 className="text-2xl font-extrabold mb-4">Your Sacred Revelation</h3>
        <p className="text-lg sm:text-xl font-extrabold mb-4">{selectedNumbers.join(", ")}</p>
        <button
          onClick={handleDone}
          className="px-6 py-3 sm:px-8 sm:py-4 bg-green-600 text-white font-extrabold rounded-lg hover:bg-green-700 transition text-lg sm:text-xl"
        >
          Done
        </button>
      </div>
    </div>
  )}
</div>

  );
}
