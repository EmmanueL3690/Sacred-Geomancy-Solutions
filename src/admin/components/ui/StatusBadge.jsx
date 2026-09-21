import React from 'react';

const statusStyles = {
  // Payment Statuses
  Paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Failed: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Refunded: 'bg-purple-500/10 text-purple-400 border-purple-500/20',

  // Consultation Statuses
  'In Review': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Rejected: 'bg-rose-500/10 text-rose-400 border-rose-500/20',

  // Account / General Statuses
  Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Disabled: 'bg-neutral-800 text-neutral-400 border-neutral-700',
  Approved: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
};

export default function StatusBadge({ status, className = '' }) {
  const style = statusStyles[status] || 'bg-neutral-800 text-neutral-300 border-neutral-700';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${style} ${className}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 opacity-75" />
      {status}
    </span>
  );
}