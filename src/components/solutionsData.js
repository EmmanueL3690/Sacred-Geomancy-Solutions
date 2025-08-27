// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";
// import { Button } from "./ui/Button";
// import { Card, CardContent } from "./ui/Card";

// // Generate solution based on selected numbers
// const generateSolution = (numbers) => {
//   const sum = numbers.reduce((a, b) => a + b, 0);
//   const solutions = [
//     {
//       category: "Life Path",
//       message: "Your numbers reveal a journey of transformation and growth. Embrace change as your greatest ally.",
//       insight: "The universe is aligning opportunities for your personal evolution.",
//       icon: "🌟",
//     },
//     {
//       category: "Career & Business",
//       message: "Success flows through collaboration and innovative thinking. Trust your intuition in professional matters.",
//       insight: "A significant opportunity will present itself within the next lunar cycle.",
//       icon: "💼",
//     },
//     {
//       category: "Relationships",
//       message: "Deep connections are strengthened through honest communication. Open your heart to vulnerability.",
//       insight: "Someone from your past may return with important wisdom to share.",
//       icon: "💕",
//     },
//     {
//       category: "Health & Wellness",
//       message: "Balance is your key to vitality. Listen to your body's wisdom and honor its needs.",
//       insight: "Focus on grounding activities that connect you with nature's healing energy.",
//       icon: "🌿",
//     },
//     {
//       category: "Spiritual Growth",
//       message: "Your spiritual awareness is expanding. Trust the signs and synchronicities around you.",
//       insight: "Meditation and reflection will unlock profound insights about your purpose.",
//       icon: "🔮",
//     },
//   ];

//   return solutions[sum % solutions.length];
// };

// // Format long addresses
// const formatAddress = (address) => {
//   if (address.length <= 30) return address;
//   const parts = address.split(",");
//   if (parts.length >= 2) return `...${parts.slice(-2).join(",").trim()}`;
//   return address.substring(0, 25) + "...";
// };

// export default function SolutionModal({ isOpen, onClose, selectedNumbers, onReset, userData }) {
//   const solution = generateSolution(selectedNumbers);
//   const [isSaved, setIsSaved] = useState(false);
//   const [showSaveAnimation, setShowSaveAnimation] = useState(false);

//   const handleNewReading = () => {
//     onReset();
//     onClose();
//     setIsSaved(false);
//     setShowSaveAnimation(false);
//   };

//   const handleSaveReading = () => {
//     const readingData = {
//       userData,
//       selectedNumbers,
//       solution,
//       timestamp: new Date().toISOString(),
//       id: Date.now(),
//     };

//     const existingReadings = JSON.parse(localStorage.getItem("savedReadings") || "[]");
//     existingReadings.push(readingData);
//     localStorage.setItem("savedReadings", JSON.stringify(existingReadings));

//     setShowSaveAnimation(true);
//     setTimeout(() => setIsSaved(true), 500);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[95vh] flex flex-col mx-4 sm:mx-auto">
//         <DialogHeader>
//           <DialogTitle className="font-heading text-xl sm:text-2xl font-black bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent text-center mb-1">
//             ✨ Your Mystical Reading ✨
//           </DialogTitle>
//         </DialogHeader>

//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto overflow-x-hidden space-y-4 sm:space-y-6 px-1">
//             {/* User Info Card */}
//             <Card className="border-2 border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg relative">
//               <CardContent className="p-3 sm:p-4 text-center">
//                 <div className="inline-flex items-center gap-2 font-black bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent text-sm sm:text-base mb-3">
//                   <span className="text-lg sm:text-xl">👤</span>
//                   Reading for {userData.name}
//                 </div>
//                 <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
//                   <div className="text-center">
//                     <p className="text-black font-bold mb-1">📞 Phone</p>
//                     <p className="text-black font-black">{userData.phone}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-black font-bold mb-1">📍 Location</p>
//                     <p className="text-black font-black" title={userData.address}>
//                       {formatAddress(userData.address)}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Sacred Numbers */}
//             <div className="text-center">
//               <h3 className="text-lg sm:text-xl font-black bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-4 sm:mb-6">
//                 ✨ Your Sacred Numbers ✨
//               </h3>
//               <div className="flex justify-center gap-3">
//                 {selectedNumbers.map((num, i) => (
//                   <div
//                     key={i}
//                     className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 via-orange-600 to-yellow-500 text-white rounded-full flex items-center justify-center font-black text-sm sm:text-xl shadow-2xl border-2 sm:border-4 animate-pulse"
//                   >
//                     {num}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Solution Card */}
//             <Card className="border-2 border-orange-300 bg-white/90 backdrop-blur-sm shadow-xl relative">
//               <CardContent className="p-4 sm:p-6 text-center">
//                 <div className="text-3xl sm:text-4xl mb-3">{solution.icon}</div>
//                 <h3 className="font-heading text-lg sm:text-xl font-black bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent mb-3">
//                   {solution.category}
//                 </h3>
//                 <div className="bg-white/50 rounded-2xl p-3 sm:p-4 mb-3">
//                   <p className="text-black leading-relaxed font-bold text-sm sm:text-base">{solution.message}</p>
//                 </div>
//                 <div className="bg-gradient-to-r from-orange-100 to-yellow-50 rounded-2xl p-3 border border-orange-200">
//                   <p className="text-black italic font-bold text-xs sm:text-sm">🌙 {solution.insight}</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 justify-center items-center">
//               <Button onClick={handleSaveReading} className="bg-gradient-to-r from-red-500 via-orange-600 to-yellow-500 text-white font-black px-6 py-3 rounded-2xl w-full sm:w-auto">
//                 Save Reading
//               </Button>
//               <Button onClick={handleNewReading} className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-black px-6 py-3 rounded-2xl w-full sm:w-auto">
//                 New Reading
//               </Button>
//               <Button onClick={onClose} className="border-2 border-orange-400 text-black px-6 py-3 rounded-2xl w-full sm:w-auto">
//                 Close
//               </Button>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
// src/components/solutionsData.js

export const solutionsData = {
  "1H": "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
  "2H": "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
  "3H": "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
  // ... paste the rest of your massive object here ...
};
