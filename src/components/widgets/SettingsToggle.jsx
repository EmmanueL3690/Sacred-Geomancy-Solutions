import React from 'react';
import { motion } from 'framer-motion';

export const SettingsToggle = ({ enabled, onChange, label, description, disabled = false }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-gold-500/10 last:border-0">
      <div className="space-y-0.5">
        <label className="text-xs font-semibold text-neutral-200 block">
          {label}
        </label>
        {description && (
          <p className="text-[11px] text-neutral-400 leading-snug">
            {description}
          </p>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={() => !disabled && onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        } ${enabled ? 'bg-gold-500' : 'bg-obsidian-950 border-gold-500/20'}`}
      >
        <motion.span
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="pointer-events-none inline-block h-5 w-5 rounded-full bg-obsidian-950 shadow-md ring-0"
        />
      </button>
    </div>
  );
};