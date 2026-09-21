import React from 'react';
import { Card } from '../ui/Card';
import { ChevronRight } from 'lucide-react';

export const QuickActionCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  actionLabel = 'Execute',
  className = '',
}) => {
  return (
    <Card
      onClick={onClick}
      className={`group cursor-pointer hover:bg-obsidian-800/80 transition-all ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400 group-hover:scale-105 group-hover:bg-gold-500/20 transition-all">
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <ChevronRight className="w-5 h-5 text-neutral-500 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold text-neutral-100 group-hover:text-gold-300 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      <div className="mt-4 text-xs font-medium uppercase tracking-wider text-gold-500/80 group-hover:text-gold-400">
        {actionLabel} &rarr;
      </div>
    </Card>
  );
};