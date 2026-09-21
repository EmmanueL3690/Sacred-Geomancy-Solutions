import React from 'react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Star } from 'lucide-react';

export const TestimonyCard = ({
  authorName,
  authorRole,
  avatarSrc,
  testimony,
  rating = 5,
  className = '',
}) => {
  return (
    <Card className={`flex flex-col justify-between ${className}`}>
      <div>
        <div className="flex items-center gap-1 mb-3 text-gold-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? 'fill-gold-400 text-gold-400' : 'text-neutral-700'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-neutral-300 italic leading-relaxed">
          "{testimony}"
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gold-500/10">
        <Avatar src={avatarSrc} alt={authorName} fallback={authorName?.substring(0, 2)} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-neutral-100 truncate">
            {authorName}
          </p>
          {authorRole && (
            <p className="text-[10px] text-gold-500/70 truncate">{authorRole}</p>
          )}
        </div>
      </div>
    </Card>
  );
};