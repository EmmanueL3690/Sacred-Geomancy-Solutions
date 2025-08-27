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


  // Full solutions data including H and A solutions


export const solutionsData = {
 "1H": "Ewu nla ti yio sele. Aare yoo se enikan, sugbon yoo gbadun",
    "2H": "Nkan ti o lo lowo re yoo pada. Onibeere yo ma se inawo anadanu",
    "3H": "Yoo ri ore ni ojo kewa osu ti n bo, ki o beloun ki ewu nla masele si o",
    "4H": "Mura tori wahala ota. Dukia wa kan nbe nita, ki a gba",
    "5H": "Ko belorun lori omo, enikan yoo saare, sugbon ko ni ku",
    "6H": "Enikan yoo ku, ki a ma losi ibe",
    "7H": "Iyawo re yoo ko sile, Obinrin kan nje ni bebe iku",
    "8H": "Ija adugbo ti yoo kan iwo papa. Ki onibeere yi se saara lori iku",
    "9H": "Ma paya irorun nbo, inawo tabi fifo nkan to robe lorun ki awon ota maa",

    // A solutions
    "1A": "Oro obinrin, ki Olorun bo asiri, on nwa nkan lo si ibikan, onse iranlowo fun enikan. Emi Onibeere yoo gun",
    "2A": "Alakala, ounje oju orun, alawada, timo fi eeyan se yeye, ti ko serious, ro eyan pin, A LE DA NI IMORAN PE KO MA SE TIATA",
    "3A": "Oro Awe, oro obinrin kan nbe ni emi re, o nro pe nkan kolo dede,awon agba nse",
    "4A": "O NRI AWON NKANKAN TI NDUN MO NINU, YALA NINU ILE TABI NITA nkankan ndun ninu.KI O MA TE ASO FUNFUN SORI BED RE TO BA FE SUN",
    "5A": "Ironu nipa omo, irin ajo lilo, O FE KURO NIBIKAN BO SI IBIKAN",
    "6A": "Ohun ibinu. Aare okan nda onibeere laamu, OKAN RE KO BALE YALA LORI OWO TABI ALAAFIA, nurse arun kan ninu ara, NGBERO LATI RA NKAN BI IRIN, ERO",
    "7A": "Owa ninu ibanuje airi owo na. Ao ma la alakala, awon agba ndaamu, awon aje ntele kakiri, won ko jeki oni isinmi monitor",
    "8A": "Nkan ibanuje, ipaya AIFI OKAN BALE NBE FUN ONIBERE",
    "9A": "Okan onibeere gba igbe, IRONU TO JINNA TI EYAN TI GBA GBE RA ironu ti ma sori eyan kodo ti o le fa iku lojiji, on ronu gan, ba soro pe ko ma ronu",
    "10A": "Ko gbadura tori aare, okan re kun fun ironu ALANIYAN NFI OKAN SI ARANSE KAN, ORE",
    "11A": "Royiroyi, ibi ti o fi kan te si adua ko le dara, kama gbero dara si ara wa. Okan re wa lori nkankan, ao wo ile omo, ise, ile irinajo. O NRI IRORUN SUGBON IRORUN YEN KO PO",
    "12A": "Ota po, yoo ri iwosi, sora fun ibinu papa lori owo. ONIBEERE ORE DIEDIE NI WOLE FUN",
    "13A": "Nkan ibinu, ti okan ko, ki ise ma dojuru, Alaniyan ngbero moto nla jeep lati ra",
    "14A": "(ALFA, ALADUA, TI MA NGBAWE, ONI MIMO,) Aya onibere nja aya lori ogun to fe se, yio je eniti Olorun fun lebun, onimimo ni, emi ti onse ogun. [Further details truncated for brevity]",
    "15A": "ONI GBESE LORUN TI NPALAYA, Oni gbese lorun ti o npa laya, ma se lo aso to riri, aso alakowe",
    "16A": "Inu bibi abiju, Igbona okan, Oro ti a nba o leru, yio dara, Oro ara eni sisu, OKAN ENI KUN FUN ERO ORISIRISI okan",
    "17A": "1@5 and,6 Oyun ibeji/oyun ti ko ni se see se",
    "18A": "1&2 1,1: Eti yio ba adawole re yio maa gbero nkan Kan ko ni seese. Yio ri wahala die, ko be Olorun Yio maa banujje",
    "19A": "1&2,2,1: Yio maa banuje lori awon isesi kan agbaana",
    "20A": "1&2,3,1: Nkan re yio maa baje loju emi re (Adura gidiidi) ko be Olorun fun Aseyori rere. Sora fun akoba",
    "21A": "1&2,4,1: Aare yio see. Awon Agba ti pin aran re",
    "22A": "1&2,5,1: Omo yio je Adanwo fun un",
    "23A": "1&2,6,1: Ko mase ba enian Da owo po, yio run yio padaanu dukia",
    "24A": "1&2,7,1: Ko sora fun ole. Ko loni ibelorun fun aseyori rere",
    "25A": "1&2,8,1: Emi kukuru nbe Fun. Ko si Aseyori Kankan fun ko be Olorun gidigidi",
    "26A": "1&2,9,1: Owo jijo, Ai ni akojo Ko be OLorun gigigidi Ki ijanba mabaa see",
    "27A": "1&2,10,1: Oore jinna si alaniyan Yi ki o gbiyanju lati toju ara tori awon adi majeni gberu",
    "28A": "1&2,11,1: Ki alufaa sora fun Sina, ki ifaseyin Ma baa de baa",
    "29A": "1&2,12,1: Owo kan nbo wa sugbon ki o be Olorun ki o le baa tewo",
    "30A": "1&2,14,1: Irin ajo to dara To si mu idunnu Lowo. Ori rere ni orin ajo",
    "31A": "1&2,15,1: Ko sora fun gbese Ki alufaa baa be Olorun",
    "32A": "1&2,16,1: Aise deede nbe Fun lori dukia Ati awon omo ki o se adua",
    "33A": "1A. Nkan re yoo ma fale, eti lori adawole, sora tori ki ota ma be si le larinfamily tabi iyawo, ota nwa isubu re, ota ni ibujoko, o fe gbe igbese kan, ajosepo pelu eletan obinrin ati okunrin [...]",
    "34A": "1b. O je eda, ti ko nini ore otito ti yoo wa pelu lo titi, o ma tete fura tabi ri asise eniyan maa nronun ipa iwa ti eniyan le hu. Ko beru lati so otito, o ma nse gbogbo nkan re lona toto toye [...]"
};
