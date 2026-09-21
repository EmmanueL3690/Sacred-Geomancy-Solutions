import React from 'react';
import { SettingsCard } from './SettingsCard';
import { SettingsToggle } from './SettingsToggle';
import { Bell } from 'lucide-react';

export const NotificationSettings = ({ notifications, onToggle }) => {
  return (
    <SettingsCard
      title="Notification Preferences"
      subtitle="Choose what notifications you want to receive across channels"
      icon={Bell}
    >
      <SettingsToggle
        label="General Announcements"
        description="Receive updates on weekly meetings, community newsletters, and events."
        enabled={notifications.announcements}
        onChange={(val) => onToggle('announcements', val)}
      />
      <SettingsToggle
        label="Submission Updates"
        description="Get notified when your numerical submissions are reviewed and updated."
        enabled={notifications.submissionUpdates}
        onChange={(val) => onToggle('submissionUpdates', val)}
      />
      <SettingsToggle
        label="Testimony Updates"
        description="Receive alerts when your submitted testimonies are approved or published."
        enabled={notifications.testimonyUpdates}
        onChange={(val) => onToggle('testimonyUpdates', val)}
      />
      <SettingsToggle
        label="Reminder Notifications"
        description="Receive reminders to submit your sequence for spiritual guidance cycle reviews."
        enabled={notifications.reminders}
        onChange={(val) => onToggle('reminders', val)}
      />
      <SettingsToggle
        label="Email Notifications"
        description="Send a copy of all important updates directly to your registered email address."
        enabled={notifications.emailNotifications}
        onChange={(val) => onToggle('emailNotifications', val)}
      />
    </SettingsCard>
  );
};