import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`relative rounded-2xl bg-obsidian-900/90 border border-gold-500/20 p-6 backdrop-blur-md shadow-xl shadow-black/50 transition-all duration-300 hover:border-gold-500/40 overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle gold ambient backdrop glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-gold-500/5 to-transparent opacity-50 z-0" />
      
      {/* Children rendered directly */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};