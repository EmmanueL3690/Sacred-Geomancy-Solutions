import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Sparkles } from 'lucide-react';

export const GreetingCard = ({
  userName = 'Member',
  greeting = 'Welcome back',
  badgeText = 'Geometric Node Active',
  message = 'Your cosmic grid alignments are operating at peak efficiency today.',
  className = '',
}) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="gold" className="text-[10px]">
              <Sparkles className="w-3 h-3 mr-1 inline" /> {badgeText}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
            {greeting}, {userName}
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">{message}</p>
        </div>
      </div>
    </Card>
  );
};