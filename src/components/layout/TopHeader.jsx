import React from 'react';
import { Bell } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const TopHeader = ({ title = 'Overview', subtitle, className = '' }) => {
  return (
    <header
      className={`hidden lg:flex items-center justify-between h-20 px-8 bg-obsidian-950/80 border-b border-gold-500/10 backdrop-blur-md sticky top-0 z-30 ${className}`}
    >
      {/* Dynamic Section Header */}
      <div>
        <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-neutral-400 mt-0.5">{subtitle}</p>}
      </div>

      {/* Right Actions: Geomancy Solution Name & Notification Bell */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-serif tracking-widest uppercase text-gold-300/90 font-medium px-3 py-1.5 rounded-lg border border-gold-500/20 bg-obsidian-900/60 backdrop-blur">
          Sacred Geomancy Solutions
        </span>

        <button
          aria-label="Notifications"
          className="relative p-2.5 rounded-2xl bg-obsidian-900 border border-gold-500/20 text-gold-400 hover:border-gold-500/50 hover:bg-obsidian-800 transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gold-500" />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;