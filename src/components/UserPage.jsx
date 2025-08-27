"use client"

import { useState } from "react"
import { db } from "../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import NumberGrid from "./NumberGrid"

export default function UserPage() {
  // Numbers selected from NumberGrid
  const [selectedNumbers, setSelectedNumbers] = useState([])

  // User details
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [detailStatus, setDetailStatus] = useState("")

  // Testimony
  const [testimony, setTestimony] = useState("")
  const [rating, setRating] = useState(5)
  const [testimonyStatus, setTestimonyStatus] = useState("")

  // Numbers finalized after popup Done
  const [finalNumbers, setFinalNumbers] = useState("")

  // ✅ Called when NumberGrid popup Done is clicked
  const handleNumbersFinalized = (numbers) => {
    setSelectedNumbers(numbers)
    setFinalNumbers(numbers.join(", ")) // auto-fill input
  }

  // Submit user details
  const handleDetailSubmit = async (e) => {
    e.preventDefault()
    if (!finalNumbers || finalNumbers.split(",").length !== 4) {
      setDetailStatus("❌ Please pick 4 mystical numbers first")
      return
    }

    setDetailStatus("Submitting...")

    try {
      await addDoc(collection(db, "users"), {
        name,
        age,
        location,
        numberPicked: finalNumbers,
        createdAt: serverTimestamp(),
      })

      setDetailStatus("✅ Details Submitted")
      setName("")
      setAge("")
      setLocation("")
      setFinalNumbers("")
      setSelectedNumbers([])
    } catch (error) {
      console.error("Error saving details:", error)
      setDetailStatus("❌ Failed to Submit")
    }
  }

  // Submit testimony
  const handleTestimonySubmit = async (e) => {
    e.preventDefault()
    setTestimonyStatus("Submitting...")

    try {
      await addDoc(collection(db, "testimonies"), {
        name: name || "Anonymous",
        testimony,
        rating,
        createdAt: serverTimestamp(),
      })

      setTestimonyStatus("✅ Testimony Submitted")
      setTestimony("")
      setRating(5)
    } catch (error) {
      console.error("Error saving testimony:", error)
      setTestimonyStatus("❌ Failed to Submit")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6 flex flex-col items-center space-y-8">
      <h1 className="text-2xl sm:text-3xl font-black text-center mb-6 text-orange-700">
        Share Your Mystical Number ✨
      </h1>

      {/* Number Grid (selection + popup logic inside) */}
      <NumberGrid onNumbersFinalized={handleNumbersFinalized} />

      {/* ----------- User Details Form ----------- */}
      <form onSubmit={handleDetailSubmit} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Your Details</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Auto-filled Selected Numbers */}
        <input
          type="text"
          value={finalNumbers}
          readOnly
          placeholder="Pick 4 numbers first"
          className="w-full mb-3 p-2 border rounded bg-gray-100 font-bold"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
        >
          Submit Details
        </button>
        {detailStatus && <p className="mt-2 text-sm text-center">{detailStatus}</p>}
      </form>

      {/* ----------- Testimony Form ----------- */}
      <form onSubmit={handleTestimonySubmit} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Share Your Experience</h2>
        <textarea
          placeholder="Your experience..."
          value={testimony}
          onChange={(e) => setTestimony(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded resize-none"
          rows={4}
        />
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded"
        >
          <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
          <option value={4}>⭐⭐⭐⭐ Very Good</option>
          <option value={3}>⭐⭐⭐ Good</option>
          <option value={2}>⭐⭐ Fair</option>
          <option value={1}>⭐ Poor</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
        >
          Submit Testimony
        </button>
        {testimonyStatus && <p className="mt-2 text-sm text-center">{testimonyStatus}</p>}
      </form>
    </div>
  )
}

