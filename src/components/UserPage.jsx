"use client";

import { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function UserPage() {
  const auth = getAuth();

  // User Details State
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [numberPicked, setNumberPicked] = useState("");
  const [detailStatus, setDetailStatus] = useState("");

  // Testimony State
  const [testimony, setTestimony] = useState("");
  const [rating, setRating] = useState(0);
  const [testimonyStatus, setTestimonyStatus] = useState("");

  // ✅ Submit User Details
  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    setDetailStatus("Submitting...");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not logged in");

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        age,
        location,
        numberPicked,
        updatedAt: serverTimestamp(),
      });

      setDetailStatus("✅ Submitted Successfully!");
      // Reset form
      setName("");
      setAge("");
      setLocation("");
      setNumberPicked("");
    } catch (error) {
      console.error("Error saving details:", error);
      setDetailStatus("❌ Failed to Submit (Check Firestore rules)");
    }
  };

  // ✅ Submit User Testimony
  const handleTestimonySubmit = async (e) => {
    e.preventDefault();
    setTestimonyStatus("Submitting...");

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not logged in");

      await setDoc(doc(db, "testimonies", `${user.uid}_${Date.now()}`), {
        name,
        message: testimony,
        rating,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });

      setTestimonyStatus("✅ Submitted Successfully!");
      setTestimony("");
      setRating(0);
    } catch (error) {
      console.error("Error saving testimony:", error);
      setTestimonyStatus("❌ Failed to Submit (Check Firestore rules)");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-black text-orange-700 mb-6 text-center">
        Share Your Mystical Number ✨
      </h1>

      {/* User Details Form */}
      <form
        onSubmit={handleDetailSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg mb-6"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Your Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="text"
          placeholder="Number Picked"
          value={numberPicked}
          onChange={(e) => setNumberPicked(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-orange-400"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition-all"
        >
          Submit Details
        </button>
        {detailStatus && <p className="mt-2 text-sm text-center">{detailStatus}</p>}
      </form>

      {/* Testimony Form */}
      <form
        onSubmit={handleTestimonySubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Share Your Experience</h2>
        <textarea
          placeholder="Write your testimony..."
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded-md focus:ring-2 focus:ring-green-400"
          min="1"
          max="5"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl transition-all"
        >
          Share My Experience
        </button>
        {testimonyStatus && (
          <p className="mt-2 text-sm text-center">{testimonyStatus}</p>
        )}
      </form>
    </div>
  );
}

