import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

// Default array of high-quality spiritual/nature background images
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", // Ocean Sunrise
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", // Starry Night / Mountain
  "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1200&auto=format&fit=crop", // Dawn Rays
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop", // Golden Hour Horizon
];

export const DailyInspirationCard = ({
  title = "Daily Inspiration",
  quote = "Success belongs to those who persevere.",
  ctaText = "Read More →",
  images = DEFAULT_IMAGES,
  onReadMore,
  className = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate images every 25 seconds (25000 ms)
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 25000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Card className={`relative overflow-hidden min-h-[220px] !p-0 ${className}`}>
      {/* 1. Full-bleed background image with 25s rotation animation */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Spiritual Inspiration Background"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* 2. Luxury Obsidian Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/80 to-obsidian-950/30 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-transparent to-transparent pointer-events-none z-0" />

      {/* 3. Card Content Container (with restored internal padding) */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            ✨ {title}
          </div>
          <p className="text-xl sm:text-2xl font-serif italic text-gold-200 leading-relaxed max-w-2xl drop-shadow-md">
            "{quote}"
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            size="sm"
            onClick={onReadMore}
            className="shadow-gold-500/20 shadow-md hover:shadow-gold-500/40 transition-all cursor-pointer"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </Card>
  );
};