import React from 'react';
import { BellOff } from 'lucide-react';
import { Button } from '../ui/Button';

export const EmptyNotificationState = ({ onReturnDashboard }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-obsidian-900 border border-gold-500/20 my-6 space-y-4">
      <div className="p-4 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 shadow-lg shadow-gold-500/5">
        <BellOff className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-serif font-bold text-gold-300">
        No Notifications
      </h3>
      <p className="text-sm text-neutral-400 max-w-md">
        You currently have no notifications. All announcements, updates, and private messages will appear here.
      </p>
      <Button variant="primary" size="md" onClick={onReturnDashboard} className="mt-2">
        Return to Dashboard
      </Button>
    </div>
  );
};