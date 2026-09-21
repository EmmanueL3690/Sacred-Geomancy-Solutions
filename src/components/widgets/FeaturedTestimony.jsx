import React from 'react';
import { Card } from '../ui/Card';
import { RatingStars } from './RatingStars';
import { Quote } from 'lucide-react';

export const FeaturedTestimony = ({ quote, name, memberSince, rating = 5 }) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border-gold-500/40 p-6 sm:p-8 shadow-2xl">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <RatingStars rating={rating} size="md" />
          <Quote className="w-8 h-8 text-gold-500/20" />
        </div>

        <p className="text-lg sm:text-2xl font-serif italic text-gold-200 leading-relaxed max-w-3xl">
          "{quote}"
        </p>

        <div className="pt-2 border-t border-gold-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <span className="text-sm font-bold text-gold-300">{name}</span>
          <span className="text-xs text-neutral-400">{memberSince}</span>
        </div>
      </div>
    </Card>
  );
};