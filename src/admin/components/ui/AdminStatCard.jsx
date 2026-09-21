import React from 'react';

export default function AdminStatCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendType = 'neutral',
  accent = false
}) {
  const getTrendColor = () => {
    if (trendType === 'positive') return 'text-emerald-400';
    if (trendType === 'negative') return 'text-rose-400';
    if (trendType === 'warning') return 'text-amber-400';
    return 'text-neutral-400';
  };

  return (
    <div className={`border rounded-xl p-5 transition-all ${
      accent 
        ? 'bg-neutral-900 border-amber-500/30 shadow-lg shadow-amber-500/5' 
        : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{label}</span>
        {Icon && (
          <div className={`p-2 rounded-lg ${
            accent ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-neutral-800/80 text-amber-400'
          }`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <div className={`text-2xl font-bold font-mono ${accent ? 'text-amber-400' : 'text-neutral-100'}`}>
          {value}
        </div>
        {(subtext || trend) && (
          <div className="text-[11px] text-right truncate">
            {trend && <span className={`font-medium ${getTrendColor()} mr-1`}>{trend}</span>}
            {subtext && <span className="text-neutral-500 font-normal">{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
}