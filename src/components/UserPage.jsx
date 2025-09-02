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

  // Number Grid State (use custom grid)
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

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [numberGrid, setNumberGrid] = useState(initialGrid.flat());

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

  // Submit Testimony (include name)
  const handleTestimonySubmit = async (e) => {
    e.preventDefault();
    setTestimonyStatus("Submitting...");

    try {
      await addDoc(collection(db, "testimonies"), {
        name,   // ✅ now admin can see who sent it
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-black-100 p-6 flex flex-col items-center">
      {/* Top Heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-orange-700">
        <b>Discover Your Life in 4 Numbers</b>
      </h1>

      {/* HOW IT WORKS SECTION */}
      <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-2xl shadow-xl w-full max-w-3xl mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-center">
          HOW IT WORKS
        </h2>
        <ol className="list-decimal list-inside space-y-2 font-medium">
          <li>Look at the number chart below.</li>
          <li>Pick 4 numbers — one at a time.</li>
          <li>
            People choosing numbers are not just picking at random — they are
            entering a "realm" where numbers reveal their problems and solutions.
          </li>
          <li className="font-bold text-blue-200">
            Each selection reshuffles the realm — embrace the chaos!
          </li>
        </ol>
      </div>

      {/* Number Grid */}
   <div
  className="relative z-10 rounded-3xl p-6 shadow-2xl border-2 border-orange-300 w-full max-w-3xl mb-6 bg-cover bg-center"
  style={{
    backgroundImage: `url(${import.meta.env.BASE_URL}dove.jpg)`
  }}
>
  <h3 className="text-2xl font-extrabold mb-4 text-center text-orange-700 drop-shadow-lg">
    Sacred Number Realm
  </h3>

  <div className="grid grid-cols-8 gap-3">
    {numberGrid.map((number) => (
<button
  key={number}
  onClick={() => handleNumberClick(number)}
  disabled={selectedNumbers.length >= 4 && !selectedNumbers.includes(number)}
  className={`aspect-square flex items-center justify-center text-lg font-extrabold rounded-xl transition-transform duration-300 hover:scale-105 border-2 backdrop-blur-md
    ${
      selectedNumbers.includes(number)
        ? "bg-gradient-to-br from-yellow-400/70 via-orange-500/70 to-red-500/70 text-white shadow-2xl ring-4 ring-yellow-300/70"
        : "bg-white/30 border-white/40 text-black hover:bg-white/50"
    }`}
>
  {number}
</button>

    ))}
  </div>

  <p className="mt-3 text-center font-bold text-gray-800">
    Selected: {selectedNumbers.join(", ") || "None"} (
    {selectedNumbers.length}/4)
  </p>
</div>



      {/* User Details Form */}
      <form
        onSubmit={handleDetailSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl mb-6"
      >
        <h2 className="text-xl font-bold mb-4 text-orange-700">
          Share Your Mystical Number
        </h2>

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
          Submit Details
        </button>
        {detailStatus && <p className="mt-2 text-sm text-center">{detailStatus}</p>}
      </form>

      {/* Testimony Form */}
      <form
        onSubmit={handleTestimonySubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Share Your Testimony</h2>
        <textarea placeholder="Write your testimony..." value={testimony} onChange={(e) => setTestimony(e.target.value)}
          className="w-full mb-3 p-2 border rounded" required />
        <input type="number" placeholder="Rating (1-5)" value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded" min="1" max="5" required />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg">
          Share Testimony
        </button>
        {testimonyStatus && <p className="mt-2 text-sm text-center">{testimonyStatus}</p>}
      </form>
    </div>
  );
}

