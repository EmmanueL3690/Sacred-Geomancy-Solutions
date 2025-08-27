// "use client"

// import { useState } from "react"
// import { Card } from "./ui/Card.jsx"

// export default function AdminSacredSolutions({ user, onLogout }) {
//   const [selectedCell, setSelectedCell] = useState(null)

//   // Full solutions data including H and A solutions
//   const solutionsData = {
//     // H solutions
//     "1H": "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
//     "2H": "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
//     "3H": "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
//     "4H": "Mura tori wahala ota. Dukia wa kan nbe nita, ki a gba",
//     "5H": "Ko belorun lori omo, enikan yoo saare, sugbon ko ni ku",
//     "6H": "Enikan yoo ku, ki a ma losi ibe",
//     "7H": "Iyawo re yoo ko sile, Obinrin kan nje ni bebe iku",
//     "8H": "Ija adugbo ti yoo kan iwo papa. Ki onibeere yi se saara lori iku",
//     "9H": "Ma paya irorun nbo, inawo tabi fifo nkan to robe lorun ki awon ota maa",

//     // A solutions
//     "1A": "Oro obinrin, ki Olorun bo asiri, on nwa nkan lo si ibikan, onse iranlowo fun enikan. Emi Onibeere yoo gun",
//     "2A": "Alakala, ounje oju orun, alawada, timo fi eeyan se yeye, ti ko serious, ro eyan pin, A LE DA NI IMORAN PE KO MA SE TIATA",
//     "3A": "Oro Awe, oro obinrin kan nbe ni emi re, o nro pe nkan kolo dede,awon agba nse",
//     "4A": "O NRI AWON NKANKAN TI NDUN MO NINU, YALA NINU ILE TABI NITA nkankan ndun ninu.KI O MA TE ASO FUNFUN SORI BED RE TO BA FE SUN",
//     "5A": "Ironu nipa omo, irin ajo lilo, O FE KURO NIBIKAN BO SI IBIKAN",
//     "6A": "Ohun ibinu. Aare okan nda onibeere laamu, OKAN RE KO BALE YALA LORI OWO TABI ALAAFIA, nurse arun kan ninu ara, NGBERO LATI RA NKAN BI IRIN, ERO",
//     "7A": "Owa ninu ibanuje airi owo na. Ao ma la alakala, awon agba ndaamu, awon aje ntele kakiri, won ko jeki oni isinmi monitor",
//     "8A": "Nkan ibanuje, ipaya AIFI OKAN BALE NBE FUN ONIBERE",
//     "9A": "Okan onibeere gba igbe, IRONU TO JINNA TI EYAN TI GBA GBE RA ironu ti ma sori eyan kodo ti o le fa iku lojiji, on ronu gan, ba soro pe ko ma ronu",
//     "10A": "Ko gbadura tori aare, okan re kun fun ironu ALANIYAN NFI OKAN SI ARANSE KAN, ORE",
//     "11A": "Royiroyi, ibi ti o fi kan te si adua ko le dara, kama gbero dara si ara wa. Okan re wa lori nkankan, ao wo ile omo, ise, ile irinajo. O NRI IRORUN SUGBON IRORUN YEN KO PO",
//     "12A": "Ota po, yoo ri iwosi, sora fun ibinu papa lori owo. ONIBEERE ORE DIEDIE NI WOLE FUN",
//     "13A": "Nkan ibinu, ti okan ko, ki ise ma dojuru, Alaniyan ngbero moto nla jeep lati ra",
//     "14A": "(ALFA, ALADUA, TI MA NGBAWE, ONI MIMO,) Aya onibere nja aya lori ogun to fe se, yio je eniti Olorun fun lebun, onimimo ni, emi ti onse ogun. [Further details truncated for brevity]",
//     "15A": "ONI GBESE LORUN TI NPALAYA, Oni gbese lorun ti o npa laya, ma se lo aso to riri, aso alakowe",
//     "16A": "Inu bibi abiju, Igbona okan, Oro ti a nba o leru, yio dara, Oro ara eni sisu, OKAN ENI KUN FUN ERO ORISIRISI okan",
//     "17A": "1@5 and,6 Oyun ibeji/oyun ti ko ni se see se",
//     "18A": "1&2 1,1: Eti yio ba adawole re yio maa gbero nkan Kan ko ni seese. Yio ri wahala die, ko be Olorun Yio maa banujje",
//     "19A": "1&2,2,1: Yio maa banuje lori awon isesi kan agbaana",
//     "20A": "1&2,3,1: Nkan re yio maa baje loju emi re (Adura gidiidi) ko be Olorun fun Aseyori rere. Sora fun akoba",
//     "21A": "1&2,4,1: Aare yio see. Awon Agba ti pin aran re",
//     "22A": "1&2,5,1: Omo yio je Adanwo fun un",
//     "23A": "1&2,6,1: Ko mase ba enian Da owo po, yio run yio padaanu dukia",
//     "24A": "1&2,7,1: Ko sora fun ole. Ko loni ibelorun fun aseyori rere",
//     "25A": "1&2,8,1: Emi kukuru nbe Fun. Ko si Aseyori Kankan fun ko be Olorun gidigidi",
//     "26A": "1&2,9,1: Owo jijo, Ai ni akojo Ko be OLorun gigigidi Ki ijanba mabaa see",
//     "27A": "1&2,10,1: Oore jinna si alaniyan Yi ki o gbiyanju lati toju ara tori awon adi majeni gberu",
//     "28A": "1&2,11,1: Ki alufaa sora fun Sina, ki ifaseyin Ma baa de baa",
//     "29A": "1&2,12,1: Owo kan nbo wa sugbon ki o be Olorun ki o le baa tewo",
//     "30A": "1&2,14,1: Irin ajo to dara To si mu idunnu Lowo. Ori rere ni orin ajo",
//     "31A": "1&2,15,1: Ko sora fun gbese Ki alufaa baa be Olorun",
//     "32A": "1&2,16,1: Aise deede nbe Fun lori dukia Ati awon omo ki o se adua",
//     "33A": "1A. Nkan re yoo ma fale, eti lori adawole, sora tori ki ota ma be si le larinfamily tabi iyawo, ota nwa isubu re, ota ni ibujoko, o fe gbe igbese kan, ajosepo pelu eletan obinrin ati okunrin [...]",
//     "34A": "1b. O je eda, ti ko nini ore otito ti yoo wa pelu lo titi, o ma tete fura tabi ri asise eniyan maa nronun ipa iwa ti eniyan le hu. Ko beru lati so otito, o ma nse gbogbo nkan re lona toto toye [...]"
//   }

//   const numbers = Array.from({ length: 16 }, (_, i) => i + 1)
//   const letters = Array.from({ length: 16 }, (_, i) => String.fromCharCode(65 + i))

//   const handleCellClick = (number, letter) => setSelectedCell(`${number}${letter}`)
//   const closeModal = () => setSelectedCell(null)

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Admin Header */}
//       <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow sticky top-0 z-10">
//         <h1 className="text-xl font-bold">Admin Profile</h1>
//         <div className="flex items-center gap-4">
//           <span className="text-sm sm:text-base">👤 {user.email}</span>
//           <button
//             onClick={onLogout}
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow p-4 sm:p-6 overflow-auto">
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-md">
//           Sacred Solutions Archive
//         </h2>

//         <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-orange-200 overflow-hidden">
//           <div className="p-4 sm:p-6 overflow-x-auto">
//             <div className="min-w-[800px]">
//               {/* Header Row */}
//               <div className="grid grid-cols-17 gap-1 mb-2">
//                 <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center rounded">
//                   #
//                 </div>
//                 {letters.map((letter) => (
//                   <div
//                     key={letter}
//                     className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 text-white font-black text-xs flex items-center justify-center rounded"
//                   >
//                     {letter}
//                   </div>
//                 ))}
//               </div>

//               {/* Data Rows */}
//               {numbers.map((number) => (
//                 <div key={number} className="grid grid-cols-17 gap-1 mb-1">
//                   <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 text-white font-black text-xs flex items-center justify-center rounded">
//                     {number}
//                   </div>

//                   {letters.map((letter) => {
//                     const cellKey = `${number}${letter}`
//                     const hasSolution = solutionsData[cellKey]
//                     const isA = cellKey.endsWith("A")

//                     return (
//                       <button
//                         key={cellKey}
//                         onClick={() => handleCellClick(number, letter)}
//                         className={`aspect-square text-xs font-bold rounded transition-all duration-200 hover:scale-105 ${
//                           hasSolution
//                             ? isA
//                               ? "bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-md hover:from-pink-500 hover:to-red-600"
//                               : "bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-md hover:from-green-500 hover:to-emerald-500"
//                             : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 hover:from-gray-300 hover:to-gray-400"
//                         }`}
//                       >
//                         {hasSolution ? "✓" : "○"}
//                       </button>
//                     )
//                   })}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>
//       </main>

//       {/* Solution Modal */}
//       {selectedCell && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full shadow-2xl border-2 border-orange-200">
//             <div className="p-6">
//               <div className="text-center mb-4">
//                 <h3
//                   className={`text-xl font-black bg-clip-text text-transparent mb-2 ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-500 to-red-500"
//                       : "bg-gradient-to-r from-green-500 to-emerald-500"
//                   }`}
//                 >
//                   Sacred Solution {selectedCell}
//                 </h3>
//                 <div
//                   className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
//                       : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
//                   }`}
//                 >
//                   Ancient Wisdom
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
//                 <p className="text-black font-medium text-sm leading-relaxed">
//                   {solutionsData[selectedCell] ||
//                     "This sacred solution is being prepared by the ancient spirits. Please check back soon for your divine message."}
//                 </p>
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }
// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "./ui/Card.jsx"

// export default function AdminSacredSolutions({ user, onLogout }) {
//   const [selectedCell, setSelectedCell] = useState(null)
//   const [testimonies, setTestimonies] = useState([])

//   // Load testimonies from localStorage on mount
//   useEffect(() => {
//     const savedTestimonies = localStorage.getItem("userTestimonies")
//     if (savedTestimonies) {
//       setTestimonies(JSON.parse(savedTestimonies))
//     }
//   }, [])

//   // Full solutions data including H and A solutions
//   const solutionsData = {
//     "1H": "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
//     "2H": "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
//     "3H": "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
//     "4H": "Mura tori wahala ota. Dukia wa kan nbe nita, ki a gba",
//     "5H": "Ko belorun lori omo, enikan yoo saare, sugbon ko ni ku",
//     "6H": "Enikan yoo ku, ki a ma losi ibe",
//     "7H": "Iyawo re yoo ko sile, Obinrin kan nje ni bebe iku",
//     "8H": "Ija adugbo ti yoo kan iwo papa. Ki onibeere yi se saara lori iku",
//     "9H": "Ma paya irorun nbo, inawo tabi fifo nkan to robe lorun ki awon ota maa",

//     "1A": "Oro obinrin, ki Olorun bo asiri, on nwa nkan lo si ibikan, onse iranlowo fun enikan. Emi Onibeere yoo gun",
//     "2A": "Alakala, ounje oju orun, alawada, timo fi eeyan se yeye, ti ko serious, ro eyan pin, A LE DA NI IMORAN PE KO MA SE TIATA",
//     "3A": "Oro Awe, oro obinrin kan nbe ni emi re, o nro pe nkan kolo dede,awon agba nse",
//     "4A": "O NRI AWON NKANKAN TI NDUN MO NINU, YALA NINU ILE TABI NITA nkankan ndun ninu.KI O MA TE ASO FUNFUN SORI BED RE TO BA FE SUN",
//     "5A": "Ironu nipa omo, irin ajo lilo, O FE KURO NIBIKAN BO SI IBIKAN",
//     "6A": "Ohun ibinu. Aare okan nda onibeere laamu, OKAN RE KO BALE YALA LORI OWO TABI ALAAFIA, nurse arun kan ninu ara, NGBERO LATI RA NKAN BI IRIN, ERO",
//     "7A": "Owa ninu ibanuje airi owo na. Ao ma la alakala, awon agba ndaamu, awon aje ntele kakiri, won ko jeki oni isinmi monitor",
//     "8A": "Nkan ibanuje, ipaya AIFI OKAN BALE NBE FUN ONIBERE",
//     "9A": "Okan onibeere gba igbe, IRONU TO JINNA TI EYAN TI GBA GBE RA ironu ti ma sori eyan kodo ti o le fa iku lojiji, on ronu gan, ba soro pe ko ma ronu",
//     "10A": "Ko gbadura tori aare, okan re kun fun ironu ALANIYAN NFI OKAN SI ARANSE KAN, ORE"
//     // ... add more A solutions as needed
//   }

//   const numbers = Array.from({ length: 16 }, (_, i) => i + 1)
//   const letters = Array.from({ length: 16 }, (_, i) => String.fromCharCode(65 + i))

//   const handleCellClick = (number, letter) => setSelectedCell(`${number}${letter}`)
//   const closeModal = () => setSelectedCell(null)

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Admin Header */}
//       <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow sticky top-0 z-10">
//         <h1 className="text-xl font-bold">Admin Profile</h1>
//         <div className="flex items-center gap-4">
//           <span className="text-sm sm:text-base">👤 {user.email}</span>
//           <button
//             onClick={onLogout}
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow p-4 sm:p-6 overflow-auto space-y-8">
//         {/* Sacred Solutions */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-md">
//             Sacred Solutions Archive
//           </h2>

//           <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-orange-200 overflow-auto">
//             <div className="p-4 sm:p-6">
//               <div className="min-w-[900px]">
//                 {/* Header Row */}
//                 <div className="grid grid-cols-17 gap-1 mb-2">
//                   <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center rounded">
//                     #
//                   </div>
//                   {letters.map((letter) => (
//                     <div
//                       key={letter}
//                       className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 text-white font-black text-xs flex items-center justify-center rounded"
//                     >
//                       {letter}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Data Rows */}
//                 {numbers.map((number) => (
//                   <div key={number} className="grid grid-cols-17 gap-1 mb-1">
//                     <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 text-white font-black text-xs flex items-center justify-center rounded">
//                       {number}
//                     </div>

//                     {letters.map((letter) => {
//                       const cellKey = `${number}${letter}`
//                       const hasSolution = solutionsData[cellKey]
//                       const isA = cellKey.endsWith("A")

//                       return (
//                         <button
//                           key={cellKey}
//                           onClick={() => handleCellClick(number, letter)}
//                           className={`aspect-square text-xs font-bold rounded transition-all duration-200 hover:scale-105 ${
//                             hasSolution
//                               ? isA
//                                 ? "bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-md hover:from-pink-500 hover:to-red-600"
//                                 : "bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-md hover:from-green-500 hover:to-emerald-500"
//                               : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 hover:from-gray-300 hover:to-gray-400"
//                           }`}
//                         >
//                           {hasSolution ? "✓" : "○"}
//                         </button>
//                       )
//                     })}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Card>
//         </section>

//         {/* User Testimonies */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-md">
//             User Testimonies ({testimonies.length})
//           </h2>

//           {testimonies.length === 0 ? (
//             <p className="text-center text-gray-500 font-bold">No testimonies submitted yet.</p>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {testimonies.map((testimony) => (
//                 <Card
//                   key={testimony.id}
//                   className="p-4 sm:p-6 bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm border-2 border-blue-200 hover:shadow-lg transition-all duration-300"
//                 >
//                   <div className="space-y-3">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-black text-gray-800 text-sm sm:text-base">{testimony.name}</h4>
//                         {testimony.location && (
//                           <p className="text-xs sm:text-sm text-gray-600 font-bold">{testimony.location}</p>
//                         )}
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         {Array.from({ length: 5 }, (_, i) => (
//                           <span
//                             key={i}
//                             className={`text-lg ${i < testimony.rating ? "text-yellow-400" : "text-gray-300"}`}
//                           >
//                             ⭐
//                           </span>
//                         ))}
//                       </div>
//                     </div>

//                     <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-2 sm:p-3">
//                       <p className="text-xs sm:text-sm font-bold text-purple-800">
//                         Numbers: {testimony.numbers}
//                       </p>
//                     </div>

//                     <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
//                       "{testimony.testimony}"
//                     </p>

//                     <p className="text-xs text-gray-500 font-bold">{testimony.date}</p>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </section>
//       </main>

//       {/* Solution Modal */}
//       {selectedCell && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full shadow-2xl border-2 border-orange-200">
//             <div className="p-6">
//               <div className="text-center mb-4">
//                 <h3
//                   className={`text-xl font-black bg-clip-text text-transparent mb-2 ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-500 to-red-500"
//                       : "bg-gradient-to-r from-green-500 to-emerald-500"
//                   }`}
//                 >
//                   Sacred Solution {selectedCell}
//                 </h3>
//                 <div
//                   className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
//                       : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
//                   }`}
//                 >
//                   Ancient Wisdom
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
//                 <p className="text-black font-medium text-sm leading-relaxed">
//                   {solutionsData[selectedCell] ||
//                     "This sacred solution is being prepared by the ancient spirits. Please check back soon for your divine message."}
//                 </p>
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }
// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "./ui/Card.jsx"

// export default function AdminSacredSolutions({ user, onLogout }) {
//   const [selectedCell, setSelectedCell] = useState(null)
//   const [userData, setUserData] = useState([])
//   const [testimonies, setTestimonies] = useState([])

//   // Full solutions data including H and A solutions
//   const solutionsData = {
//     "1H": "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
//     "2H": "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
//     "3H": "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
//     "4H": "Mura tori wahala ota. Dukia wa kan nbe nita, ki a gba",
//     "5H": "Ko belorun lori omo, enikan yoo saare, sugbon ko ni ku",
//     "6H": "Enikan yoo ku, ki a ma losi ibe",
//     "7H": "Iyawo re yoo ko sile, Obinrin kan nje ni bebe iku",
//     "8H": "Ija adugbo ti yoo kan iwo papa. Ki onibeere yi se saara lori iku",
//     "9H": "Ma paya irorun nbo, inawo tabi fifo nkan to robe lorun ki awon ota maa",
//     "1A": "Oro obinrin, ki Olorun bo asiri, on nwa nkan lo si ibikan, onse iranlowo fun enikan. Emi Onibeere yoo gun",
//     "2A": "Alakala, ounje oju orun, alawada, timo fi eeyan se yeye, ti ko serious, ro eyan pin, A LE DA NI IMORAN PE KO MA SE TIATA",
//     "3A": "Oro Awe, oro obinrin kan nbe ni emi re, o nro pe nkan kolo dede,awon agba nse",
//     // ... (add remaining A solutions here)
//   }

//   const numbers = Array.from({ length: 16 }, (_, i) => i + 1)
//   const letters = Array.from({ length: 16 }, (_, i) => String.fromCharCode(65 + i))

//   // Load user data from localStorage
//   const loadData = () => {
//     const savedData = localStorage.getItem("userTestimonies")
//     if (savedData) {
//       const allData = JSON.parse(savedData)

//       const detailsOnly = allData.map(({ id, name, location, numbers, date }) => ({
//         id,
//         name,
//         location,
//         numbers,
//         date,
//       }))

//       const testimonyOnly = allData.map(({ id, name, rating, testimony, date }) => ({
//         id,
//         name,
//         rating,
//         testimony,
//         date,
//       }))

//       setUserData(detailsOnly)
//       setTestimonies(testimonyOnly)
//     }
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "userTestimonies") loadData()
//     }
//     window.addEventListener("storage", handleStorageChange)
//     return () => window.removeEventListener("storage", handleStorageChange)
//   }, [])

//   const handleCellClick = (number, letter) => setSelectedCell(`${number}${letter}`)
//   const closeModal = () => setSelectedCell(null)

//   const renderStars = (rating) =>
//     Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
//         ⭐
//       </span>
//     ))

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Admin Header */}
//       <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow sticky top-0 z-10">
//         <h1 className="text-xl font-bold">Admin Profile</h1>
//         <div className="flex items-center gap-4">
//           <span className="text-sm sm:text-base">👤 {user.email}</span>
//           <button
//             onClick={onLogout}
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="flex-grow p-4 sm:p-6 space-y-8 overflow-auto">
//         {/* Sacred Solutions Grid */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 sm:mb-8 drop-shadow-md">
//             Sacred Solutions Archive
//           </h2>
//           <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-orange-200 overflow-auto">
//             <div className="p-4 sm:p-6 min-w-[800px]">
//               <div className="grid grid-cols-17 gap-1 mb-2">
//                 <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center rounded">
//                   #
//                 </div>
//                 {letters.map((letter) => (
//                   <div
//                     key={letter}
//                     className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 text-white font-black text-xs flex items-center justify-center rounded"
//                   >
//                     {letter}
//                   </div>
//                 ))}
//               </div>

//               {numbers.map((number) => (
//                 <div key={number} className="grid grid-cols-17 gap-1 mb-1">
//                   <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 text-white font-black text-xs flex items-center justify-center rounded">
//                     {number}
//                   </div>
//                   {letters.map((letter) => {
//                     const cellKey = `${number}${letter}`
//                     const hasSolution = solutionsData[cellKey]
//                     const isA = cellKey.endsWith("A")
//                     return (
//                       <button
//                         key={cellKey}
//                         onClick={() => handleCellClick(number, letter)}
//                         className={`aspect-square text-xs font-bold rounded transition-all duration-200 hover:scale-105 ${
//                           hasSolution
//                             ? isA
//                               ? "bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-md hover:from-pink-500 hover:to-red-600"
//                               : "bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-md hover:from-green-500 hover:to-emerald-500"
//                             : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 hover:from-gray-300 hover:to-gray-400"
//                         }`}
//                       >
//                         {hasSolution ? "✓" : "○"}
//                       </button>
//                     )
//                   })}
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </section>

//         {/* User Details */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 sm:mb-8">
//             User Details
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {userData.map((user) => (
//               <Card
//                 key={user.id}
//                 className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-blue-200 hover:shadow-lg transition-all duration-300"
//               >
//                 <h4 className="font-black text-gray-800 text-sm sm:text-base">{user.name}</h4>
//                 {user.location && <p className="text-xs sm:text-sm text-gray-600 font-bold">{user.location}</p>}
//                 {user.numbers && <p className="text-xs sm:text-sm text-purple-800 font-bold">Numbers: {user.numbers}</p>}
//                 <p className="text-xs text-gray-500 font-bold">{user.date}</p>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* User Testimonies */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-6 sm:mb-8">
//             User Testimonies
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {testimonies.map((test) => (
//               <Card
//                 key={test.id}
//                 className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-pink-200 hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <h4 className="font-black text-gray-800">{test.name}</h4>
//                   <div className="flex items-center space-x-1">{renderStars(test.rating)}</div>
//                 </div>
//                 <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
//                   "{test.testimony}"
//                 </p>
//                 <p className="text-xs text-gray-500 font-bold mt-2">{test.date}</p>
//               </Card>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Solution Modal */}
//       {selectedCell && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full shadow-2xl border-2 border-orange-200">
//             <div className="p-6">
//               <div className="text-center mb-4">
//                 <h3
//                   className={`text-xl font-black bg-clip-text text-transparent mb-2 ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-500 to-red-500"
//                       : "bg-gradient-to-r from-green-500 to-emerald-500"
//                   }`}
//                 >
//                   Sacred Solution {selectedCell}
//                 </h3>
//                 <div
//                   className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
//                       : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
//                   }`}
//                 >
//                   Ancient Wisdom
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
//                 <p className="text-black font-medium text-sm leading-relaxed">
//                   {solutionsData[selectedCell] ||
//                     "This sacred solution is being prepared by the ancient spirits. Please check back soon for your divine message."}
//                 </p>
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }
// "use client"

// import { useState, useEffect } from "react"
// import { Card } from "./ui/Card.jsx"
// import { db } from "../firebase"
// import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

// export default function AdminSacredSolutions({ user, onLogout }) {
//   const [detailsList, setDetailsList] = useState([])
//   const [testimoniesList, setTestimoniesList] = useState([])
//   const [selectedCell, setSelectedCell] = useState(null)

//   // Sacred Solutions data
//   const solutionsData = {
//     "1H": "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
//     "2H": "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
//     "3H": "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
//     "1A": "Oro obinrin, ki Olorun bo asiri, on nwa nkan lo si ibikan, onse iranlowo fun enikan",
//     "2A": "Alakala, ounje oju orun, alawada, timo fi eeyan se yeye, ti ko serious, ro eyan pin"
//     // Add other solutions here...
//   }

//   const numbers = Array.from({ length: 16 }, (_, i) => i + 1)
//   const letters = Array.from({ length: 16 }, (_, i) => String.fromCharCode(65 + i))

//   const handleCellClick = (number, letter) => setSelectedCell(`${number}${letter}`)
//   const closeModal = () => setSelectedCell(null)

//   const renderStars = rating =>
//     Array.from({ length: 5 }, (_, i) => (
//       <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
//     ))

//   // Listen for User Details
//   useEffect(() => {
//     const detailsQuery = query(collection(db, "userDetails"), orderBy("timestamp", "desc"))
//     const unsubscribe = onSnapshot(detailsQuery, snapshot => {
//       setDetailsList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
//     })
//     return () => unsubscribe()
//   }, [])

//   // Listen for User Testimonies
//   useEffect(() => {
//     const testimoniesQuery = query(collection(db, "userTestimonies"), orderBy("timestamp", "desc"))
//     const unsubscribe = onSnapshot(testimoniesQuery, snapshot => {
//       setTestimoniesList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
//     })
//     return () => unsubscribe()
//   }, [])

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Admin Header */}
//       <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow sticky top-0 z-10">
//         <h1 className="text-xl font-bold">Admin Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <span className="text-sm sm:text-base">👤 {user.email}</span>
//           <button
//             onClick={onLogout}
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="flex-grow p-4 sm:p-6 space-y-8 overflow-auto">
//         {/* User Details Section */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
//             User Details ({detailsList.length})
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {detailsList.map(detail => (
//               <Card key={detail.id} className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-green-200 shadow-md">
//                 <h3 className="font-bold text-gray-800 text-base">{detail.name}</h3>
//                 {detail.location && <p className="text-sm text-gray-600 font-medium">{detail.location}</p>}
//                 {detail.numbers && <p className="text-sm text-green-800 font-bold mt-2">Numbers: {detail.numbers}</p>}
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* User Testimonies Section */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
//             User Testimonies ({testimoniesList.length})
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {testimoniesList.map(testimony => (
//               <Card key={testimony.id} className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-blue-200 shadow-md">
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-bold text-gray-800">{testimony.name}</h3>
//                   <div className="flex items-center">{renderStars(testimony.rating)}</div>
//                 </div>
//                 {testimony.numbers && <p className="text-sm text-purple-800 font-bold mb-2">Numbers: {testimony.numbers}</p>}
//                 <p className="text-sm text-gray-700">{testimony.testimony}</p>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Sacred Solutions Section */}
//         <section>
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
//             Sacred Solutions
//           </h2>
//           <Card className="p-4 sm:p-6 bg-white/95 backdrop-blur-sm border-2 border-orange-200 shadow-md overflow-x-auto">
//             <div className="min-w-[500px]">
//               <div className="grid grid-cols-17 gap-1 mb-2">
//                 <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center rounded">#</div>
//                 {letters.map(letter => (
//                   <div key={letter} className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 text-white font-black text-xs flex items-center justify-center rounded">
//                     {letter}
//                   </div>
//                 ))}
//               </div>

//               {numbers.map(number => (
//                 <div key={number} className="grid grid-cols-17 gap-1 mb-1">
//                   <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 text-white font-black text-xs flex items-center justify-center rounded">{number}</div>
//                   {letters.map(letter => {
//                     const cellKey = `${number}${letter}`
//                     const hasSolution = solutionsData[cellKey]
//                     const isA = cellKey.endsWith("A")
//                     return (
//                       <button
//                         key={cellKey}
//                         onClick={() => handleCellClick(number, letter)}
//                         className={`aspect-square text-xs font-bold rounded transition-all duration-200 hover:scale-105 ${
//                           hasSolution
//                             ? isA
//                               ? "bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-md hover:from-pink-500 hover:to-red-600"
//                               : "bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-md hover:from-green-500 hover:to-emerald-500"
//                             : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 hover:from-gray-300 hover:to-gray-400"
//                         }`}
//                       >
//                         {hasSolution ? "✓" : "○"}
//                       </button>
//                     )
//                   })}
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </section>
//       </main>

//       {/* Solution Modal */}
//       {selectedCell && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full shadow-2xl border-2 border-orange-200">
//             <div className="p-6">
//               <div className="text-center mb-4">
//                 <h3
//                   className={`text-xl font-black bg-clip-text text-transparent mb-2 ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-500 to-red-500"
//                       : "bg-gradient-to-r from-green-500 to-emerald-500"
//                   }`}
//                 >
//                   Sacred Solution {selectedCell}
//                 </h3>
//                 <div
//                   className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
//                     selectedCell.endsWith("A")
//                       ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
//                       : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
//                   }`}
//                 >
//                   Ancient Wisdom
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
//                 <p className="text-black font-medium text-sm leading-relaxed">
//                   {solutionsData[selectedCell] || "This sacred solution is being prepared. Check back soon!"}
//                 </p>
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   )
// }

// src/components/UserTestimonies.jsx
// src/components/AdminProfile.jsx
"use client";

import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card } from "./ui/Card.jsx";
import { solutionsData } from "./solutionsData.js"; // ✅ import your full solutionsData

// Sacred Numbers Setup (1–16 × A–P)
const letters = "ABCDEFGHIJKLMNOP".split("");
const numbers = Array.from({ length: 16 }, (_, i) => i + 1);

export default function AdminProfile() {
  const [users, setUsers] = useState([]);
  const [testimonies, setTestimonies] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);

  // Fetch Users
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("updatedAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  // Fetch Testimonies
  useEffect(() => {
    const q = query(collection(db, "testimonies"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setTestimonies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  const handleDelete = async (collectionName, id) => {
    await deleteDoc(doc(db, collectionName, id));
  };

  const handleCellClick = (number, letter) => {
    setSelectedCell(`${number}${letter}`);
  };

  const closeModal = () => setSelectedCell(null);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>⭐</span>
    ));

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      {/* Users */}
      <section>
        <h2 className="text-xl font-black mb-4">👥 User Details</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No user details yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <Card key={user.id} className="p-4 relative bg-gradient-to-br from-yellow-50 to-orange-100 shadow-lg rounded-xl border-2 border-orange-200">
                <p className="font-bold text-lg">{user.name} ({user.age})</p>
                <p className="text-sm text-gray-700">{user.location}</p>
                <p className="mt-2 font-semibold text-orange-600">
                  Picked Number: {user.numberPicked}
                </p>
                <button
                  onClick={() => handleDelete("users", user.id)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Testimonies */}
      <section>
        <h2 className="text-xl font-black mb-4">💬 User Testimonies</h2>
        {testimonies.length === 0 ? (
          <p className="text-gray-600">No testimonies yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testimonies.map((t) => (
              <Card key={t.id} className="p-4 relative bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg rounded-xl border-2 border-emerald-200">
                <div className="mb-2">{renderStars(t.rating)}</div>
                <p className="text-gray-800">{t.message}</p>
                <p className="text-sm text-gray-600 mt-2">— {t.name}</p>
                <button
                  onClick={() => handleDelete("testimonies", t.id)}
                  className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Sacred Solutions Grid */}
      <section>
        <h2 className="text-xl sm:text-2xl font-black text-center mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Sacred Solutions Archive
        </h2>

        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-orange-200 overflow-hidden">
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-17 gap-1 mb-2">
                <div className="aspect-square bg-gradient-to-br from-purple-500 to-pink-500 text-white font-black text-xs flex items-center justify-center rounded">#</div>
                {letters.map((letter) => (
                  <div key={letter} className="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 text-white font-black text-xs flex items-center justify-center rounded">{letter}</div>
                ))}
              </div>

              {/* Data Rows */}
              {numbers.map((number) => (
                <div key={number} className="grid grid-cols-17 gap-1 mb-1">
                  <div className="aspect-square bg-gradient-to-br from-green-500 to-emerald-500 text-white font-black text-xs flex items-center justify-center rounded">{number}</div>
                  {letters.map((letter) => {
                    const cellKey = `${number}${letter}`;
                    const hasSolution = solutionsData[cellKey];

                    return (
                      <button
                        key={cellKey}
                        onClick={() => handleCellClick(number, letter)}
                        className={`aspect-square text-xs font-bold rounded transition-all duration-200 hover:scale-105 ${
                          hasSolution
                            ? cellKey.endsWith("A")
                              ? "bg-gradient-to-br from-pink-400 to-red-500 text-white shadow-md hover:from-pink-500 hover:to-red-600"
                              : "bg-gradient-to-br from-green-400 to-emerald-400 text-white shadow-md hover:from-green-500 hover:to-emerald-500"
                            : "bg-gray-200 text-gray-600 hover:from-gray-300 hover:to-gray-400"
                        }`}
                      >
                        {hasSolution ? "✓" : "○"}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Solution Modal */}
      {selectedCell && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="bg-white/95 backdrop-blur-sm max-w-md w-full shadow-2xl border-2 border-orange-200">
            <div className="p-6 text-center">
              <h3 className={`text-xl font-black bg-clip-text text-transparent mb-2 ${
                selectedCell.endsWith("A")
                  ? "bg-gradient-to-r from-pink-500 to-red-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              }`}>
                Sacred Solution {selectedCell}
              </h3>

              <div className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                selectedCell.endsWith("A")
                  ? "bg-gradient-to-r from-pink-400 to-red-500 text-white"
                  : "bg-gradient-to-r from-green-400 to-emerald-400 text-white"
              }`}>
                Ancient Wisdom
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 my-6 border border-orange-200">
                <p className="text-black font-medium text-sm leading-relaxed">
                  {solutionsData[selectedCell] || "This sacred solution is being prepared. Please check back soon."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
