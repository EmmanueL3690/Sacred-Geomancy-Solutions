import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { SettingsCard } from './SettingsCard';
import { Badge } from '../ui/Badge';
import { useTheme } from '../../context/ThemeContext';

export const AppearanceCard = ({ onThemeChangeSuccess }) => {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      id: 'dark',
      title: 'Dark Mode',
      icon: Moon,
      description: 'Recommended for comfortable viewing and the best Geomancy Solutions experience.',
      tag: 'Default',
    },
    {
      id: 'light',
      title: 'Light Mode',
      icon: Sun,
      description: 'Bright interface with high contrast for daytime use.',
    },
    {
      id: 'system',
      title: 'System',
      icon: Monitor,
      description: "Automatically follows your device's theme settings.",
    },
  ];

  const handleSelectTheme = (themeId) => {
    if (theme !== themeId) {
      setTheme(themeId);
      if (onThemeChangeSuccess) {
        onThemeChangeSuccess(`Theme changed to ${themeId.charAt(0).toUpperCase() + themeId.slice(1)} Mode`);
      }
    }
  };

  return (
    <SettingsCard
      title="Appearance"
      subtitle="Personalize how Geomancy Solutions looks on your device."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isActive = theme === option.id;

          return (
            <motion.div
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectTheme(option.id)}
              className={`relative cursor-pointer p-4 rounded-xl transition-all duration-300 flex flex-col justify-between border ${
                isActive
                  ? 'bg-obsidian-900 border-gold-500 shadow-lg shadow-gold-500/10 ring-1 ring-gold-500/50 dark:bg-obsidian-900 light:bg-amber-50/50 light:border-gold-500'
                  : 'bg-obsidian-950/80 border-gold-500/20 hover:border-gold-500/40 dark:bg-obsidian-950 light:bg-neutral-100 light:border-neutral-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      isActive
                        ? 'bg-gold-500/15 border-gold-500/40 text-gold-400'
                        : 'bg-obsidian-900 border-gold-500/10 text-neutral-400 dark:bg-obsidian-900 light:bg-neutral-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {isActive ? (
                    <Badge variant="gold" className="text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Active
                    </Badge>
                  ) : (
                    option.tag && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 dark:bg-neutral-800 light:bg-neutral-200 light:text-neutral-600">
                        {option.tag}
                      </span>
                    )
                  )}
                </div>

                {/* Info */}
                <div>
                  <h4 className="text-sm font-bold text-gold-300 light:text-neutral-900">
                    {option.title}
                  </h4>
                  <p className="text-xs text-neutral-400 light:text-neutral-600 mt-1 leading-relaxed">
                    {option.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SettingsCard>
  );
};