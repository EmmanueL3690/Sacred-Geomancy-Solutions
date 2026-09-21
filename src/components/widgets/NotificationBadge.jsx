import React from 'react';
import { Megaphone, CheckCircle2, Heart, Clock, Mail, Bell } from 'lucide-react';

export const NOTIFICATION_TYPES = {
  announcement: {
    label: 'Announcement',
    icon: Megaphone,
    colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  submission_update: {
    label: 'Submission Update',
    icon: CheckCircle2,
    colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  testimony_approved: {
    label: 'Testimony Approved',
    icon: Heart,
    colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  },
  reminder: {
    label: 'Reminder',
    icon: Clock,
    colorClass: 'text-gold-400 bg-gold-500/10 border-gold-500/30',
  },
  personal_message: {
    label: 'Personal Message',
    icon: Mail,
    colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
};

export const NotificationBadge = ({ type }) => {
  const config = NOTIFICATION_TYPES[type] || {
    label: 'Notification',
    icon: Bell,
    colorClass: 'text-gold-400 bg-gold-500/10 border-gold-500/30',
  };

  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.colorClass}`}>
      <IconComponent className="w-3 h-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
};