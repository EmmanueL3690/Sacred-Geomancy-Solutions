import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({
  rating = 5,
  maxRating = 5,
  interactive = false,
  onChange,
  size = 'sm',
}) => {
  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;

        return (
          <button
            key={index}
            type={interactive ? 'button' : undefined}
            onClick={() => interactive && onChange && onChange(starValue)}
            disabled={!interactive}
            className={`${
              interactive
                ? 'cursor-pointer transform transition-transform hover:scale-125 focus:outline-none'
                : 'cursor-default'
            }`}
          >
            <Star
              className={`${starSizes[size]} ${
                isFilled
                  ? 'text-gold-400 fill-gold-400 drop-shadow-[0_0_6px_rgba(234,179,8,0.4)]'
                  : 'text-neutral-600 fill-transparent'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};