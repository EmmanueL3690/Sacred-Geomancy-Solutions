"use client";

import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function UserPage() {
  // User Details State
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numberPicked, setNumberPicked] = useState([]);
  const [detailStatus, setDetailStatus] = useState("");

  // Testimony State
  const [testimony, setTestimony] = useState("");
  const [rating, setRating] = useState(0);
  const [testimonyStatus, setTestimonyStatus] = useState("");

  // Number Grid State
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [numberGrid, setNumberGrid] = useState(
    Array.from({ length: 64 }, (_, i) => i + 1)
  );

  // Shuffle Number Grid
  const shuffleGrid = () => {
    const shuffled = [...numberGrid].sort(() => Math.random() - 0.5);
    setNumberGrid(shuffled);
  };

  // Handle Number Selection
  const handleNumberClick = (number) => {
    if (selectedNumbers.length >= 4 && !selectedNumbers.includes(number)) return;

    let newSelected;
    if (selectedNumbers.includes(number)) {
      newSelected = selectedNumbers.filter((n) => n !== number);
    } else {
      newSelected = [...selectedNumbers, number];
    }

    setSelectedNumbers(newSelected);
    setNumberPicked(newSelected);
    shuffleGrid();
  };

  // Submit User Details
  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    setDetailStatus("Submitting...");

    try {
      await addDoc(collection(db, "userDetails"), {
        name,
        age,
        location,
        email,
        phone,
        numberPicked,
        createdAt: serverTimestamp(),
      });

      setDetailStatus("✅ Details Saved");
      setName(""); setAge(""); setLocation(""); setEmail(""); setPhone("");
      setSelectedNumbers([]); setNumberPicked([]);
    } catch (error) {
      console.error("Error saving details:", error);
      setDetailStatus("❌ Failed to Submit");
    }
  };

  // Submit Testimony
  const handleTestimonySubmit = async (e) => {
    e.preventDefault();
    setTestimonyStatus("Submitting...");

    try {
      await addDoc(collection(db, "testimonies"), {
        name,
        message: testimony,
        rating,
        createdAt: serverTimestamp(),
      });

      setTestimonyStatus("✅ Submitted");
      setTestimony(""); setRating(0);
    } catch (error) {
      console.error("Error saving testimony:", error);
      setTestimonyStatus("❌ Failed to Submit");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-orange-700">
        Discover Your Life in 4 Numbers
      </h1>

      {/* Number Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-orange-300 w-full max-w-3xl mb-6">
        <h3 className="text-2xl font-extrabold mb-4 text-center text-orange-700">
          Sacred Number Realm
        </h3>

        <div className="grid grid-cols-8 gap-3">
          {numberGrid.map((number) => (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              disabled={selectedNumbers.length >= 4 && !selectedNumbers.includes(number)}
              className={`aspect-square flex items-center justify-center text-lg font-extrabold rounded-xl transition-transform duration-300 hover:scale-105 border-2 ${
                selectedNumbers.includes(number)
                  ? "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white shadow-xl"
                  : "bg-gradient-to-br from-gray-100 to-gray-200 text-black hover:from-orange-300 hover:to-yellow-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <p className="mt-3 text-center font-bold text-gray-700">
          Selected: {selectedNumbers.join(", ") || "None"} ({selectedNumbers.length}/4)
        </p>
      </div>

      {/* User Details Form */}
      <form onSubmit={handleDetailSubmit} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl mb-6">
        <h2 className="text-xl font-bold mb-4 text-orange-700">Your Details</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="text" value={numberPicked.join(", ")} readOnly
          className="w-full mb-3 p-2 border rounded bg-gray-100 font-bold" />
        <button type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg"
          disabled={numberPicked.length !== 4}>
          Save Details
        </button>
        {detailStatus && <p className="mt-2 text-sm text-center">{detailStatus}</p>}
      </form>

      {/* Testimony Form */}
      <form onSubmit={handleTestimonySubmit} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Share Your Testimony</h2>
        <textarea placeholder="Write your testimony..." value={testimony} onChange={(e) => setTestimony(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="number" placeholder="Rating (1-5)" value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded" min="1" max="5" required />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg">
          Submit Testimony
        </button>
        {testimonyStatus && <p className="mt-2 text-sm text-center">{testimonyStatus}</p>}
      </form>
    </div>
  );
}
