import React from 'react';

export const EmptyState = ({
  icon,
  title = 'No Data Found',
  description = 'There are no items to display at this moment.',
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-gold-500/20 bg-obsidian-950/50 ${className}`}
    >
      {icon ? (
        <div className="mb-4 text-gold-400">{icon}</div>
      ) : (
        /* Default Sacred Geometry Pattern SVG */
        <svg
          className="w-12 h-12 mb-4 text-gold-500/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <polygon
            points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="5" strokeWidth="1" />
        </svg>
      )}
      <h3 className="text-lg font-semibold text-gold-300 mb-1">{title}</h3>
      <p className="text-sm text-neutral-400 max-w-md mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};