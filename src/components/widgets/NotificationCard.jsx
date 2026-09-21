import React from 'react';
import { Card } from '../ui/Card';
import { Bell, Check, X } from 'lucide-react';

export const NotificationCard = ({
  title,
  message,
  timestamp,
  unread = false,
  onDismiss,
  onRead,
  className = '',
}) => {
  return (
    <Card
      className={`relative border-l-4 ${
        unread ? 'border-l-gold-500 bg-obsidian-900' : 'border-l-gold-500/20 bg-obsidian-950/60'
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-2xl bg-gold-500/10 text-gold-400 shrink-0">
          <Bell className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4
              className={`text-sm font-medium truncate ${
                unread ? 'text-gold-300 font-semibold' : 'text-neutral-200'
              }`}
            >
              {title}
            </h4>
            {timestamp && (
              <span className="text-[10px] text-neutral-500 shrink-0">
                {timestamp}
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {unread && onRead && (
            <button
              onClick={onRead}
              title="Mark as Read"
              className="p-1 rounded-xl text-neutral-400 hover:text-gold-400 hover:bg-obsidian-800 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              title="Dismiss"
              className="p-1 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-obsidian-800 transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};