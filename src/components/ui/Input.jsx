import React from 'react';

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium tracking-wide uppercase text-gold-400/80">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-2xl bg-obsidian-950 border border-gold-500/30 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 transition-all duration-300 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 disabled:opacity-50 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400 mt-0.5">{error}</span>}
    </div>
  );
};