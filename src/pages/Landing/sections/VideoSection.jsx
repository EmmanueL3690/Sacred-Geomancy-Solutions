import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, AlertCircle } from "lucide-react";

export default function VideoSection() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const handleOverlayClick = async () => {
    if (videoRef.current && !videoError) {
      try {
        if (videoRef.current.paused) {
          await videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Playback failed:", error);
        }
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="bg-[#111827] py-24 px-6 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="text-sm text-blue-400 font-semibold uppercase tracking-wider">
            Watch Our Story
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            See How We Transform Ideas Into Reality
          </h2>

          <p className="text-gray-400 mt-6">
            Discover how our solutions help businesses scale, innovate,
            and achieve outstanding results across industries.
          </p>

          <button 
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold cursor-pointer"
            onClick={() => navigate("/services")}
          >
            Get Started
          </button>
        </div>

        {/* RIGHT VIDEO */}
        <div className="relative group">
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-black h-[350px] flex items-center justify-center">
            {!videoError ? (
              <video
                ref={videoRef}
                src="/video1.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={(e) => {
                  console.error("Video error code:", e.currentTarget.error?.code);
                  console.error("Video error message:", e.currentTarget.error?.message);
                  setVideoError(true);
                }}
              />
            ) : (
              // Fallback UI if video fails to load or path is wrong
              <div className="flex flex-col items-center justify-center p-6 text-center text-gray-400">
                <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
                <p className="text-sm font-medium">Video preview unavailable</p>
                <p className="text-xs text-gray-500 mt-1">Please check if video1.mp4 exists in your public folder.</p>
              </div>
            )}
          </div>

          {/* Play Button Overlay (Hides once playing or if there's an error) */}
          {!isPlaying && !videoError && (
            <div
              onClick={handleOverlayClick}
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/20 transition rounded-2xl"
            >
              <div className="bg-blue-600 p-6 rounded-full hover:scale-110 transition shadow-lg">
                <Play size={32} />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}