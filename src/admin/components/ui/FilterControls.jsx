import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-8 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export function FilterDropdown({ label, value, onChange, options = [] }) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-amber-500/50 transition-colors cursor-pointer appearance-none pr-8"
      >
        <option value="">{label}: All</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      <SlidersHorizontal className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-neutral-500" />
    </div>
  );
}