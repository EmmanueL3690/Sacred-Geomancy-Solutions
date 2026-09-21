import React from 'react';

export const LoadingSkeleton = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
}) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-obsidian-800 via-obsidian-700 to-obsidian-800 border border-gold-500/10 ${width} ${height} ${className}`}
    />
  );
};