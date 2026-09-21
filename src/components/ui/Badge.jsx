import React from 'react';

export const Badge = ({ children, variant = 'gold', className = '', ...props }) => {
  const baseStyles =
    'inline-flex items-center px-3 py-1 rounded-2xl text-xs font-medium border tracking-wider uppercase backdrop-blur-sm';

  const variants = {
    gold: 'bg-gold-500/10 border-gold-500/40 text-gold-400',
    obsidian: 'bg-obsidian-800 border-obsidian-700 text-neutral-300',
    outline: 'bg-transparent border-gold-500/30 text-gold-500',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};