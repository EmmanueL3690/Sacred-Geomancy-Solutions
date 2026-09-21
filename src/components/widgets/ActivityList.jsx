import React from 'react';
import { Card } from '../ui/Card';
import { Calendar, Clock, Activity } from 'lucide-react';

export const ActivityCard = ({ activity }) => {
  const IconComponent = activity.icon || Activity;

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-gold-500/15 hover:border-gold-500/40 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
          <IconComponent className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-neutral-200">{activity.title}</p>
          <div className="flex items-center gap-3 text-[10px] text-neutral-500 mt-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gold-500/70" />
              {activity.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gold-500/70" />
              {activity.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityList = ({ activities }) => {
  return (
    <Card className="space-y-4">
      <div className="pb-3 border-b border-gold-500/15">
        <h3 className="text-lg font-serif font-bold text-gold-300 flex items-center gap-2">
          <Activity className="w-5 h-5 text-gold-400" />
          Recent Activity
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Your recent actions and events within your account.
        </p>
      </div>

      {!activities || activities.length === 0 ? (
        <div className="text-center py-8 text-neutral-500 text-xs">
          No Recent Activity
        </div>
      ) : (
        <div className="space-y-2.5">
          {activities.map((item) => (
            <ActivityCard key={item.id} activity={item} />
          ))}
        </div>
      )}
    </Card>
  );
};