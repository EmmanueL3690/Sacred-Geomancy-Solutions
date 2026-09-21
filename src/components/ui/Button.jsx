import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-semibold shadow-lg shadow-gold-500/10 hover:shadow-gold-500/25 hover:brightness-110 active:scale-[0.98]',
    secondary:
      'bg-obsidian-900 border border-gold-500/30 text-gold-400 hover:border-gold-500 hover:bg-obsidian-800 hover:shadow-md hover:shadow-gold-500/10 active:scale-[0.98]',
    ghost:
      'bg-transparent text-gold-400 hover:text-gold-300 hover:bg-gold-500/10 active:scale-[0.98]',
    danger:
      'bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/50 hover:border-red-500 active:scale-[0.98]',
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};