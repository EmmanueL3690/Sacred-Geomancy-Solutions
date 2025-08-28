"use client"

import { useState, useRef } from "react"

export default function VideoPlayer() {
  const [currentLanguage, setCurrentLanguage] = useState("english")
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef(null)

const videos = {
  english: "/Sacred-Geomancy-Solutions/videos/video1.mp4",
  yoruba: "/Sacred-Geomancy-Solutions/videos/video_yo.mp4",
};




  const handleLanguageSwitch = (language) => {
    setIsLoading(true)
    setCurrentLanguage(language)

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      videoRef.current.load()

      const handleLoadedData = () => {
        setIsLoading(false)
        videoRef.current.play()
        videoRef.current.removeEventListener("loadeddata", handleLoadedData)
      }

      videoRef.current.addEventListener("loadeddata", handleLoadedData)

      // Fallback in case load event fails
      setTimeout(() => setIsLoading(false), 3000)
    }
  }

  return (
    <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-6 sm:p-8 mb-10 border-2 border-white/30 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-2xl text-center tracking-wide">
          LEARN ABOUT GEOMANCY
        </h3>

        {/* Language Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() => handleLanguageSwitch("english")}
            className={`px-8 py-4 font-black rounded-xl transition-all duration-300 text-base sm:text-lg shadow-2xl transform hover:scale-105 border-2 ${
              currentLanguage === "english"
                ? "bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white border-white/20"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
            }`}
          >
            🇺🇸 ENGLISH VERSION
          </button>

          <button
            onClick={() => handleLanguageSwitch("yoruba")}
            className={`px-8 py-4 font-black rounded-xl transition-all duration-300 text-base sm:text-lg shadow-2xl transform hover:scale-105 border-2 ${
              currentLanguage === "yoruba"
                ? "bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white border-white/20"
                : "bg-white/10 text-white border-white/30 hover:bg-white/20"
            }`}
          >
            🇳🇬 YORUBA VERSION
          </button>
        </div>

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
              <div className="text-white text-lg font-bold">Loading video...</div>
            </div>
          )}

          <video
            ref={videoRef}
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
            controls
            preload="metadata"
            key={currentLanguage} // Forces re-render when switching
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          >
            <source src={videos[currentLanguage]} type="video/mp4" />
            <p className="text-white p-4">
              Your browser does not support the video tag. Please update your browser.
            </p>
          </video>

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-bold text-sm sm:text-base">
              {currentLanguage === "english"
                ? "Understanding Geomancy - English"
                : "Geomancy ni Yoruba - Yoruba Version"}
            </p>
          </div>
        </div>

        {/* Video Description */}
        <div className="mt-6 bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
          <p className="text-white text-center font-medium text-base sm:text-lg leading-relaxed">
            {currentLanguage === "english"
              ? "Watch this comprehensive introduction to Geomancy and learn how ancient wisdom can guide you to solutions for your spiritual challenges."
              : "Wo eyi ti o ni imọran pipe si Geomancy ki o si kọ bi ọgbọn atijọ ṣe le ṣe itọsọna fun ọ si awọn ojutu fun awọn italaya ẹmi rẹ."}
          </p>
        </div>
      </div>
    </div>
  )
}
