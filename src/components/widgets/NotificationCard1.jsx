import React from 'react';
import { Card } from '../ui/Card';
import { NotificationBadge, NOTIFICATION_TYPES } from './NotificationBadge';
import { Calendar, Clock, Bell } from 'lucide-react';

export const NotificationCard = ({ notification, onClick }) => {
  const { title, message, date, time, read, type } = notification;
  const config = NOTIFICATION_TYPES[type] || { icon: Bell };
  const IconComponent = config.icon;

  return (
    <div onClick={onClick} className="cursor-pointer group">
      <Card
        className={`transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-gold-500/50 ${
          !read
            ? 'border-l-4 border-l-gold-500 bg-obsidian-900/95 shadow-gold-500/5'
            : 'opacity-85 hover:opacity-100'
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Notification Icon Bubble */}
          <div
            className={`p-3 rounded-2xl shrink-0 mt-0.5 ${
              !read
                ? 'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                : 'bg-obsidian-950 text-neutral-400 border border-gold-500/10'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h4
                  className={`text-sm sm:text-base font-serif ${
                    !read ? 'font-bold text-gold-200' : 'font-medium text-neutral-200'
                  }`}
                >
                  {title}
                </h4>
                {!read && (
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse shrink-0" />
                )}
              </div>
              <NotificationBadge type={type} />
            </div>

            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
              {message}
            </p>

            <div className="flex items-center gap-4 pt-1 text-[11px] text-neutral-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gold-500/70" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gold-500/70" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};