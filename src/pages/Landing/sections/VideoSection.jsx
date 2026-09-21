import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";

export default function VideoSection() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
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
          className="mt-8 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
          onClick={() => navigate("/services")}>
            Get Started
          </button>
        </div>

        {/* RIGHT VIDEO */}
        <div className="relative group">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src="/videos/video1.mp4"
              className="w-full h-[350px] object-cover"
              controls={isPlaying}
            />
          </div>

          {/* Play Button Overlay (Before Play) */}
          {!isPlaying && (
            <div
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            >
              <div className="bg-blue-600 p-6 rounded-full hover:scale-110 transition">
                <Play size={32} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
