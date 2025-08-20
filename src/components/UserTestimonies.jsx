"use client"

import { useState, useEffect } from "react"
import { Card } from "./ui/Card.jsx"

export default function UserTestimonies({ selectedNumbers, userData }) {
  const [testimonies, setTestimonies] = useState([])
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    location: "",
    numbers: "",
    rating: 5,
    testimony: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load testimonies from localStorage on mount
  useEffect(() => {
    const savedTestimonies = localStorage.getItem("userTestimonies")
    if (savedTestimonies) {
      setTestimonies(JSON.parse(savedTestimonies))
    }
  }, [])

  // Auto-fill numbers when 4 are selected
  useEffect(() => {
    if (selectedNumbers && selectedNumbers.length === 4) {
      setFormData((prev) => ({
        ...prev,
        numbers: selectedNumbers.join(", "),
      }))
    }
  }, [selectedNumbers])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create new testimony
    const newTestimony = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString(),
      timestamp: Date.now(),
    }

    // Add to testimonies list
    const updatedTestimonies = [newTestimony, ...testimonies]
    setTestimonies(updatedTestimonies)

    // Save to localStorage
    localStorage.setItem("userTestimonies", JSON.stringify(updatedTestimonies))

    // Reset form (except name and auto-filled numbers)
    setFormData({
      name: userData?.name || "",
      location: "",
      numbers: selectedNumbers?.length === 4 ? selectedNumbers.join(", ") : "",
      rating: 5,
      testimony: "",
    })

    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
          Share Your Experience
        </h2>
        <p className="text-base sm:text-lg font-bold text-gray-800">
          Tell others about your mystical number solution results
        </p>
      </div>

      {/* Testimony Submission Form */}
      <Card className="mb-8 p-4 sm:p-6 bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border-2 border-orange-200">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">
                Numbers Used *
                {selectedNumbers?.length === 4 && (
                  <span className="text-green-600 text-xs ml-2">✓ Auto-filled from selection</span>
                )}
              </label>
              <input
                type="text"
                name="numbers"
                value={formData.numbers}
                onChange={handleInputChange}
                required
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border-2 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 ${
                  selectedNumbers?.length === 4 ? "bg-green-50 border-green-300" : "bg-white/80 border-orange-300"
                }`}
                placeholder="e.g., 2, 16, 44, 76"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Rating *</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80"
              >
                <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                <option value={4}>⭐⭐⭐⭐ Very Good</option>
                <option value={3}>⭐⭐⭐ Good</option>
                <option value={2}>⭐⭐ Fair</option>
                <option value={1}>⭐ Poor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Your Experience *</label>
            <textarea
              name="testimony"
              value={formData.testimony}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80 resize-none"
              placeholder="Share how the number solution helped you..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-black rounded-lg hover:from-red-700 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 min-h-[44px]"
            >
              {isSubmitting ? "Submitting..." : "✨ Share My Experience ✨"}
            </button>

            {showSuccess && (
              <div className="text-green-600 font-bold text-sm sm:text-base">
                ✓ Thank you! Your testimony has been shared successfully!
              </div>
            )}
          </div>
        </form>
      </Card>

      {/* Display Testimonies */}
      {testimonies.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 text-center">
            Community Experiences ({testimonies.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonies.map((testimony) => (
              <Card
                key={testimony.id}
                className="p-4 sm:p-6 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border-2 border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-gray-800 text-sm sm:text-base">{testimony.name}</h4>
                      {testimony.location && (
                        <p className="text-xs sm:text-sm text-gray-600 font-bold">{testimony.location}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">{renderStars(testimony.rating)}</div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-2 sm:p-3">
                    <p className="text-xs sm:text-sm font-bold text-purple-800">Numbers: {testimony.numbers}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                    "{testimony.testimony}"
                  </p>

                  <p className="text-xs text-gray-500 font-bold">{testimony.date}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
