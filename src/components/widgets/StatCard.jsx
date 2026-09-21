import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  description = 'vs last cycle',
  className = '',
}) => {
  return (
    <Card className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase font-medium tracking-wider text-neutral-400">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-2xl bg-gold-500/10 border border-gold-500/20 text-gold-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="my-3">
        <span className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
          {value}
        </span>
      </div>

      {change !== undefined && (
        <div className="flex items-center gap-1.5 text-xs">
          <span
            className={`inline-flex items-center font-medium ${
              isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {change}
          </span>
          <span className="text-neutral-500">{description}</span>
        </div>
      )}
    </Card>
  );
};