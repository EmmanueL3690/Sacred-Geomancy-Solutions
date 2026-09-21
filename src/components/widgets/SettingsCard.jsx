import React from 'react';
import { Card } from '../ui/Card';

export const SettingsCard = ({ title, subtitle, icon: Icon, children, className = '' }) => {
  return (
    <Card className={`space-y-4 ${className}`}>
      {(title || subtitle) && (
        <div className="pb-3 border-b border-gold-500/15 flex items-center gap-3">
          {Icon && (
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-base font-serif font-bold text-gold-300">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </Card>
  );
};