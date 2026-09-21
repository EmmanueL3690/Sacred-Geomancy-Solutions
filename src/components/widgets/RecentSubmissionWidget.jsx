import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const RecentSubmissionWidget = ({
  numbers = [4, 7, 2, 9],
  submittedDate = "August 3, 2026",
  status = "Pending Review",
  onViewHistory,
  className = "",
}) => {
  return (
    <Card className={`flex flex-col gap-5 ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-gold-500/10">
        <h3 className="text-base font-serif font-bold text-gold-300">
          Recent Submission
        </h3>
        <Badge variant="gold" className="text-[10px]">
          {status}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Submitted Number Sequence */}
        <div className="flex items-center gap-3">
          {numbers.map((num, idx) => (
            <div
              key={idx}
              className="w-12 h-12 rounded-2xl bg-obsidian-950 border border-gold-500/40 flex items-center justify-center text-gold-300 font-serif font-bold text-lg shadow-inner shadow-gold-500/5"
            >
              {num}
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            Submitted On
          </span>
          <span className="text-xs text-neutral-300 font-medium">
            {submittedDate}
          </span>
        </div>
      </div>

      {onViewHistory && (
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={onViewHistory} className="w-full sm:w-auto">
            View History
          </Button>
        </div>
      )}
    </Card>
  );
};