// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "./ui/Card.jsx"

// export default function UserTestimonies({ selectedNumbers, userData }) {
//   const [testimonies, setTestimonies] = useState([])
//   const [formData, setFormData] = useState({
//     name: userData?.name || "",
//     location: "",
//     numbers: "",
//     rating: 5,
//     testimony: "",
//   })
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [showSuccess, setShowSuccess] = useState(false)

//   // Load testimonies from localStorage on mount
//   useEffect(() => {
//     const savedTestimonies = localStorage.getItem("userTestimonies")
//     if (savedTestimonies) {
//       setTestimonies(JSON.parse(savedTestimonies))
//     }
//   }, [])

//   // Auto-fill numbers when 4 are selected
//   useEffect(() => {
//     if (selectedNumbers && selectedNumbers.length === 4) {
//       setFormData((prev) => ({
//         ...prev,
//         numbers: selectedNumbers.join(", "),
//       }))
//     }
//   }, [selectedNumbers])

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     const newTestimony = {
//       id: Date.now(),
//       ...formData,
//       date: new Date().toLocaleDateString(),
//       timestamp: Date.now(),
//     }

//     // Update local testimonies
//     const updatedTestimonies = [newTestimony, ...testimonies]
//     setTestimonies(updatedTestimonies)
//     localStorage.setItem("userTestimonies", JSON.stringify(updatedTestimonies))

//     // Send data to admin server/API
//     try {
//       await fetch("/api/admin/testimonies", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newTestimony),
//       })
//     } catch (err) {
//       console.error("Error sending testimony to admin:", err)
//     }

//     // Reset form (keep name and auto-filled numbers)
//     setFormData({
//       name: userData?.name || "",
//       location: "",
//       numbers: selectedNumbers?.length === 4 ? selectedNumbers.join(", ") : "",
//       rating: 5,
//       testimony: "",
//     })

//     setIsSubmitting(false)
//     setShowSuccess(true)
//     setTimeout(() => setShowSuccess(false), 3000)
//   }

//   const renderStars = (rating) =>
//     Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
//         ⭐
//       </span>
//     ))

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4">
//           Share Your Mystical Number
//         </h2>
//         <p className="text-base sm:text-lg font-bold text-gray-800">
//           Tell others about your mystical number solution results
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* 🟢 Card 1: Your Details */}
//         <Card className="p-4 sm:p-6 bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border-2 border-orange-200">
//           <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4">👤 Your Details</h3>
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold text-gray-800 mb-2">Age *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80"
//                   placeholder="Enter your AGE"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-gray-800 mb-2">Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80"
//                   placeholder="City, Country"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-800 mb-2">
//                 Numbers picked*
//                 {selectedNumbers?.length === 4 && (
//                   <span className="text-green-600 text-xs ml-2">✓ Auto-filled from selection</span>
//                 )}
//               </label>
//               <input
//                 type="text"
//                 name="numbers"
//                 value={formData.numbers}
//                 onChange={handleInputChange}
//                 required
//                 className={`w-full px-3 py-2 sm:px-4 sm:py-3 border-2 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 ${
//                   selectedNumbers?.length === 4
//                     ? "bg-green-50 border-green-300"
//                     : "bg-white/80 border-orange-300"
//                 }`}
//                 placeholder="e.g., 2, 16, 44, 76"
//               />
//             </div>
//           </div>
//         </Card>

//         {/* 🟣 Card 2: Your Testimony */}
//         <Card className="p-4 sm:p-6 bg-gradient-to-br from-white/90 to-orange-50/90 backdrop-blur-sm border-2 border-orange-200">
//           <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4">📝 Your Testimony</h3>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-bold text-gray-800 mb-2">Rating *</label>
//               <select
//                 name="rating"
//                 value={formData.rating}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80"
//               >
//                 <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
//                 <option value={4}>⭐⭐⭐⭐ Very Good</option>
//                 <option value={3}>⭐⭐⭐ Good</option>
//                 <option value={2}>⭐⭐ Fair</option>
//                 <option value={1}>⭐ Poor</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-bold text-gray-800 mb-2">Your Experience *</label>
//               <textarea
//                 name="testimony"
//                 value={formData.testimony}
//                 onChange={handleInputChange}
//                 required
//                 rows={4}
//                 className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none font-bold text-gray-800 bg-white/80 resize-none"
//                 placeholder="Share how the number solution helped you..."
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 items-center">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-black rounded-lg hover:from-red-700 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 min-h-[44px]"
//               >
//                 {isSubmitting ? "Submitting..." : "✨ Share My Experience ✨"}
//               </button>

//               {showSuccess && (
//                 <div className="text-green-600 font-bold text-sm sm:text-base">
//                   ✓ Thank you! Your testimony has been shared successfully!
//                 </div>
//               )}
//             </div>
//           </div>
//         </Card>
//       </form>

//       {/* Display Testimonies */}
//       {testimonies.length > 0 && (
//         <div>
//           <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 text-center">
//             Community Experiences ({testimonies.length})
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {testimonies.map((testimony) => (
//               <Card
//                 key={testimony.id}
//                 className="p-4 sm:p-6 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border-2 border-blue-200 hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-black text-gray-800 text-sm sm:text-base">{testimony.name}</h4>
//                       {testimony.location && (
//                         <p className="text-xs sm:text-sm text-gray-600 font-bold">{testimony.location}</p>
//                       )}
//                     </div>
//                     <div className="flex items-center space-x-1">{renderStars(testimony.rating)}</div>
//                   </div>

//                   <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-2 sm:p-3">
//                     <p className="text-xs sm:text-sm font-bold text-purple-800">Numbers: {testimony.numbers}</p>
//                   </div>

//                   <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
//                     "{testimony.testimony}"
//                   </p>

//                   <p className="text-xs text-gray-500 font-bold">{testimony.date}</p>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
// src/components/UserTestimonies.jsx
// src/components/UserPage.jsx
"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Card } from "./ui/Card.jsx";

export default function UserTestimonies({ selectedNumbers, userData }) {
  const [detailsForm, setDetailsForm] = useState({
    name: userData?.name || "",
    age: "",
    location: "",
    numbers: "",
  });
  const [testimonyForm, setTestimonyForm] = useState({
    rating: 5,
    testimony: "",
  });
  const [submittingDetails, setSubmittingDetails] = useState(false);
  const [submittingTestimony, setSubmittingTestimony] = useState(false);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [testimonySubmitted, setTestimonySubmitted] = useState(false);
  const [allDetails, setAllDetails] = useState([]);
  const [allTestimonies, setAllTestimonies] = useState([]);

  // Auto-fill numbers
  useEffect(() => {
    if (selectedNumbers && selectedNumbers.length === 4) {
      setDetailsForm((prev) => ({
        ...prev,
        numbers: selectedNumbers.join(", "),
      }));
    }
  }, [selectedNumbers]);

  // Fetch details from Firestore
  useEffect(() => {
    const q = query(collection(db, "userDetails"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAllDetails(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  // Fetch testimonies from Firestore
  useEffect(() => {
    const q = query(collection(db, "userTestimonies"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setAllTestimonies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetailsForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonyChange = (e) => {
    const { name, value } = e.target;
    setTestimonyForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    setSubmittingDetails(true);
    try {
      await addDoc(collection(db, "userDetails"), {
        ...detailsForm,
        timestamp: Date.now(),
      });
      setDetailsSubmitted(true);
      setDetailsForm({
        name: userData?.name || "",
        age: "",
        location: "",
        numbers: selectedNumbers?.length === 4 ? selectedNumbers.join(", ") : "",
      });
      setTimeout(() => setDetailsSubmitted(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setSubmittingDetails(false);
  };

  const submitTestimony = async (e) => {
    e.preventDefault();
    setSubmittingTestimony(true);
    try {
      await addDoc(collection(db, "userTestimonies"), {
        ...testimonyForm,
        timestamp: Date.now(),
      });
      setTestimonySubmitted(true);
      setTestimonyForm({ rating: 5, testimony: "" });
      setTimeout(() => setTestimonySubmitted(false), 3000);
    } catch (err) {
      console.error(err);
    }
    setSubmittingTestimony(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-2">
          Share Your mystical Number
        </h2>
        <p className="text-base sm:text-lg font-bold text-gray-800">
          Tell others about your mystical number solution results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Details Form */}
        <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border-2 border-orange-200">
          <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4">👤 Your Details</h3>
          <form className="space-y-4" onSubmit={submitDetails}>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={detailsForm.name}
                onChange={handleDetailsChange}
                required
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none bg-white/80"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Age *</label>
              <input
                type="text"
                name="age"
                value={detailsForm.age}
                onChange={handleDetailsChange}
                required
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none bg-white/80"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={detailsForm.location}
                onChange={handleDetailsChange}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none bg-white/80"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Numbers picked *</label>
              <input
                type="text"
                name="numbers"
                value={detailsForm.numbers}
                onChange={handleDetailsChange}
                required
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none bg-white/80"
              />
            </div>

            <button
              type="submit"
              disabled={submittingDetails}
              className="w-full py-3 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-white font-bold rounded-lg hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300"
            >
              {submittingDetails ? "Submitting..." : detailsSubmitted ? "Submitted!" : "Submit Details"}
            </button>
          </form>
        </Card>

        {/* User Testimony Form */}
        <Card className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm border-2 border-orange-200">
          <h3 className="text-lg sm:text-xl font-black text-gray-800 mb-4">📝 Your Testimony</h3>
          <form className="space-y-4" onSubmit={submitTestimony}>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Rating *</label>
              <select
                name="rating"
                value={testimonyForm.rating}
                onChange={handleTestimonyChange}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none bg-white/80"
              >
                <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                <option value={4}>⭐⭐⭐⭐ Very Good</option>
                <option value={3}>⭐⭐⭐ Good</option>
                <option value={2}>⭐⭐ Fair</option>
                <option value={1}>⭐ Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 mb-1">Your Experience *</label>
              <textarea
                name="testimony"
                value={testimonyForm.testimony}
                onChange={handleTestimonyChange}
                required
                rows={4}
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:border-red-500 focus:outline-none bg-white/80"
              />
            </div>

            <button
              type="submit"
              disabled={submittingTestimony}
              className="w-full py-3 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white font-bold rounded-lg hover:from-red-700 hover:via-orange-600 hover:to-yellow-600 transition-all duration-300"
            >
              {submittingTestimony ? "Submitting..." : testimonySubmitted ? "Submitted!" : "Share My Experience"}
            </button>
          </form>
        </Card>
      </div>

      {/* Display Submitted Data */}
      <div className="mt-8 space-y-6">
        {allDetails.length > 0 && (
          <div>
            <h3 className="text-xl font-black text-gray-800 mb-4">Community Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allDetails.map((detail) => (
                <Card key={detail.id} className="p-4 bg-white/90 border border-gray-300">
                  <p className="font-bold">{detail.name} ({detail.age})</p>
                  <p>Location: {detail.location}</p>
                  <p>Numbers: {detail.numbers}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {allTestimonies.length > 0 && (
          <div>
            <h3 className="text-xl font-black text-gray-800 mb-4">Community Experiences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allTestimonies.map((t) => (
                <Card key={t.id} className="p-4 bg-white/90 border border-gray-300">
                  <p className="font-bold">Rating: {renderStars(t.rating)}</p>
                  <p>{t.testimony}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


