"use client";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, setDoc, getDoc, doc, serverTimestamp } from "firebase/firestore";

export default function UserPage() {
  const auth = getAuth();

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
  const [numberGrid, setNumberGrid] = useState([
    [12, 47, 3, 21, 8, 33, 59, 1],
    [27, 6, 40, 55, 19, 14, 62, 31],
    [5, 49, 28, 11, 36, 45, 23, 60],
    [32, 18, 7, 43, 25, 2, 48, 63],
    [22, 13, 61, 35, 9, 30, 41, 57],
    [4, 44, 10, 29, 15, 39, 24, 50],
    [52, 17, 42, 38, 20, 34, 56, 46],
    [26, 53, 16, 64, 54, 51, 37, 58],
  ]);
  const [showResult, setShowResult] = useState(false);

  // Load existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.name) setName(data.name);
        if (data.age) setAge(data.age);
        if (data.location) setLocation(data.location);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.numberPicked) {
          setNumberPicked(data.numberPicked);
          setSelectedNumbers(data.numberPicked);
        }
      }
    };
    fetchUserData();
  }, [auth]);

  // Shuffle Number Grid
  const shuffleGrid = () => {
    const flat = numberGrid.flat();
    const shuffled = [...flat].sort(() => Math.random() - 0.5);
    const newGrid = [];
    for (let i = 0; i < 8; i++) {
      newGrid.push(shuffled.slice(i * 8, (i + 1) * 8));
    }
    setNumberGrid(newGrid);
  };

  // Handle Number Selection
  const handleNumberClick = async (number) => {
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

    if (newSelected.length === 4) setShowResult(true);

    // Save selection in Firestore immediately
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { numberPicked: newSelected, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } catch (error) {
        console.error("Error saving numbers:", error);
      }
    }
  };

  const handleDone = () => setShowResult(false);

  // Submit User Details
  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    setDetailStatus("Submitting...");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not logged in");

      await setDoc(
        doc(db, "users", user.uid),
        { name, age, location, email, phone, numberPicked, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setDetailStatus("✅ Details Saved");
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
      const user = auth.currentUser;
      if (!user) throw new Error("Not logged in");

      await addDoc(collection(db, "testimonies"), {
        name,
        message: testimony,
        rating,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      setTestimonyStatus("✅ Submitted");
      setTestimony("");
      setRating(0);
    } catch (error) {
      console.error("Error saving testimony:", error);
      setTestimonyStatus("❌ Failed to Submit");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6 flex flex-col items-center">
      
      {/* New Main Heading */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-orange-700">
        Discover Your Life in 4 Numbers
      </h1>

      {/* Instruction Box Above Number Grid */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-orange-200 mb-6 max-w-3xl text-left">
        <p className="text-lg sm:text-xl font-extrabold mb-2">HOW IT WORKS</p>
        <ol className="list-decimal list-inside text-sm sm:text-base text-gray-700 font-bold space-y-1">
          <li>Look at the number chart below.</li>
          <li>Pick 4 numbers — one at a time.</li>
          <li>
            People choosing numbers are not just picking at random — they are entering a "realm" where numbers reveal
            their problems and solutions.
          </li>
          <li className="text-blue-600">Each selection reshuffles the realm — embrace the chaos!</li>
        </ol>
      </div>

      {/* Number Grid */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-3xl border-4 border-orange-300 w-full max-w-3xl mb-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-orange-700 drop-shadow-lg">
          SACRED NUMBER REALM
        </h3>

        <div className="grid grid-cols-8 sm:grid-cols-10 gap-3 sm:gap-8">
          {numberGrid.flat().map((number, index) => (
            <button
              key={index}
              onClick={() => handleNumberClick(number)}
              disabled={selectedNumbers.length >= 4 && !selectedNumbers.includes(number)}
              className={`aspect-square flex items-center justify-center text-lg sm:text-xl md:text-2xl font-extrabold rounded-xl transition-transform duration-300 transform hover:scale-105 active:scale-95 border-2 ${
                selectedNumbers.includes(number)
            ? "bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 text-white shadow-xl border-yellow-400"
            : "bg-gradient-to-br from-gray-100 to-gray-200 text-black hover:from-orange-300 hover:to-yellow-300 hover:shadow-2xl border-gray-300"

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
          <p className="text-xs sm:text-sm font-extrabold text-gray-700">
            {selectedNumbers.length}/4 numbers selected
          </p>
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

      {/* Details Heading Above Form */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 text-orange-700">
        Share Your Mystical Number ✨
      </h2>

      {/* User Details Form */}
      <form
        onSubmit={handleDetailSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl mb-6"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Selected Sacred Numbers"
          value={numberPicked.join(", ")}
          className="w-full mb-3 p-2 border rounded bg-gray-100 font-extrabold text-black"
          readOnly
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 sm:py-4 rounded-lg text-lg sm:text-xl transition"
          disabled={numberPicked.length !== 4}
        >
          Save Details
        </button>
        {detailStatus && <p className="mt-2 text-sm text-center">{detailStatus}</p>}
      </form>

      {/* Testimony Form */}
      <form
        onSubmit={handleTestimonySubmit}
        className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl"
      >
        <h2 className="text-lg font-bold mb-4 text-gray-800">Share Your Experience</h2>
        <textarea
          placeholder="Write your testimony..."
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded"
          min="1"
          max="5"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 sm:py-4 rounded-lg text-lg sm:text-xl transition"
               >
          Submit Testimony
        </button>
        {testimonyStatus && <p className="mt-2 text-sm text-center">{testimonyStatus}</p>}
      </form>
    </div>
  );
}

