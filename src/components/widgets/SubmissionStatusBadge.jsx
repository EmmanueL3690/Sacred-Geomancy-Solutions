import React from 'react';

const STATUS_STYLES = {
  'Pending Review': 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  'Approved': 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  'Completed': 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  'Rejected': 'bg-red-500/10 border-red-500/30 text-red-400',
};

export const SubmissionStatusBadge = ({ status = 'Pending Review', className = '' }) => {
  const currentStyle =
    STATUS_STYLES[status] || 'bg-gold-500/10 border-gold-500/30 text-gold-400';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${currentStyle} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {status}
    </span>
  );
};