import React from 'react';

export const Avatar = ({ src, alt = 'Avatar', fallback, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-gold-500/40 bg-obsidian-800 text-gold-400 font-semibold shadow-inner shrink-0 ${sizes[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback || alt?.substring(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
};