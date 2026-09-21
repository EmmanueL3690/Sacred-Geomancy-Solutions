import React from 'react';
import { SettingsCard } from './SettingsCard';
import { Globe, MapPin, Calendar } from 'lucide-react';

export const PreferenceCard = ({ preferences, onChange }) => {
  return (
    <SettingsCard
      title="Application Preferences"
      subtitle="Configure regional formatting and language settings"
      icon={Globe}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Language */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            Language
          </label>
          <select
            value={preferences.language}
            onChange={(e) => onChange('language', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500 cursor-pointer"
          >
            <option value="English" className="bg-obsidian-950">English (US)</option>
            <option value="French" className="bg-obsidian-950">French (Français)</option>
            <option value="Spanish" className="bg-obsidian-950">Spanish (Español)</option>
          </select>
        </div>

        {/* Timezone */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            Timezone
          </label>
          <select
            value={preferences.timezone}
            onChange={(e) => onChange('timezone', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500 cursor-pointer"
          >
            <option value="Africa/Lagos" className="bg-obsidian-950">Africa/Lagos (WAT +01:00)</option>
            <option value="UTC" className="bg-obsidian-950">Coordinated Universal Time (UTC)</option>
            <option value="America/New_York" className="bg-obsidian-950">America/New_York (EST)</option>
            <option value="Europe/London" className="bg-obsidian-950">Europe/London (GMT)</option>
          </select>
        </div>

        {/* Date Format */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            Date Format
          </label>
          <select
            value={preferences.dateFormat}
            onChange={(e) => onChange('dateFormat', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500 cursor-pointer"
          >
            <option value="DD/MM/YYYY" className="bg-obsidian-950">DD/MM/YYYY (e.g. 03/08/2026)</option>
            <option value="MM/DD/YYYY" className="bg-obsidian-950">MM/DD/YYYY (e.g. 08/03/2026)</option>
            <option value="YYYY-MM-DD" className="bg-obsidian-950">YYYY-MM-DD (ISO standard)</option>
          </select>
        </div>
      </div>
    </SettingsCard>
  );
};