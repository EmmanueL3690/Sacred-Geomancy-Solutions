import React from 'react';
import { Card } from '../ui/Card';
import { RatingStars } from './RatingStars';
import { Button } from '../ui/Button';
import { Calendar } from 'lucide-react';

const STATUS_CLASSES = {
  Approved: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  Pending: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  Rejected: 'bg-red-500/10 border-red-500/30 text-red-400',
};

export const TestimonyCard = ({ testimony, onReadMore }) => {
  const { name, avatar, title, message, rating, createdAt, status, isUserSubmitted } = testimony;

  return (
    <Card className="flex flex-col justify-between h-full space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50">
      <div className="space-y-3">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <img
              src={avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'}
              alt={name}
              className="w-10 h-10 rounded-full object-cover border border-gold-500/40 shadow-sm"
            />
            <div>
              <h4 className="text-sm font-bold text-gold-200">{name}</h4>
              <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                <Calendar className="w-3 h-3 text-gold-500/70" />
                <span>{createdAt}</span>
              </div>
            </div>
          </div>

          {isUserSubmitted && status && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                STATUS_CLASSES[status] || 'bg-gold-500/10 text-gold-400 border-gold-500/30'
              }`}
            >
              {status}
            </span>
          )}
        </div>

        {/* Rating & Title */}
        <div className="space-y-1">
          <RatingStars rating={rating} size="sm" />
          <h3 className="text-base font-serif font-bold text-gold-300 pt-1">
            {title}
          </h3>
        </div>

        {/* Message Snippet */}
        <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
          "{message}"
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-gold-500/10">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onReadMore(testimony)}
          className="w-full justify-center text-xs cursor-pointer"
        >
          Read More
        </Button>
      </div>
    </Card>
  );
};