import { Bell, CheckCircle2, Megaphone, Mail, Heart, Clock } from 'lucide-react';

export const notificationStatsData = [
  {
    id: 'stat-unread',
    title: 'Unread',
    value: '3',
    icon: Bell,
  },
  {
    id: 'stat-read',
    title: 'Read',
    value: '12',
    icon: CheckCircle2,
  },
  {
    id: 'stat-announcements',
    title: 'Announcements',
    value: '6',
    icon: Megaphone,
  },
  {
    id: 'stat-private',
    title: 'Private Messages',
    value: '9',
    icon: Mail,
  },
];

export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'announcement',
    title: 'New Weekly Prayer Session',
    message: 'Join us this Friday at 7:00 PM GMT for our weekly online prayer and spiritual guidance meeting. All members are welcome to participate.',
    read: false,
    date: 'August 3, 2026',
    time: '2:30 PM',
  },
  {
    id: 'notif-2',
    type: 'submission_update',
    title: 'Submission Reviewed',
    message: 'Your submitted numbers [4, 7, 2, 9] have been successfully reviewed by our guidance team. Detailed guidance is now ready in your portal.',
    read: false,
    date: 'August 3, 2026',
    time: '11:15 AM',
  },
  {
    id: 'notif-3',
    type: 'testimony_approved',
    title: 'Testimony Approved',
    message: 'Congratulations! Your shared testimony has been approved and published to the community board. Thank you for sharing your experience.',
    read: false,
    date: 'August 2, 2026',
    time: '4:45 PM',
  },
  {
    id: 'notif-4',
    type: 'reminder',
    title: 'Daily Submission Reminder',
    message: "Don't forget to submit your four numbers today to keep your spiritual guidance sequence updated for this review cycle.",
    read: true,
    date: 'August 1, 2026',
    time: '09:00 AM',
  },
  {
    id: 'notif-5',
    type: 'personal_message',
    title: 'Message from Administration',
    message: 'The administrator has sent you a private message regarding your member profile update request. Please review your account settings.',
    read: true,
    date: 'July 30, 2026',
    time: '3:20 PM',
  },
  {
    id: 'notif-6',
    type: 'announcement',
    title: 'Monthly Community Guidance Notes',
    message: 'The new spiritual guidance newsletter for the month of August has been published. Check your email or resources tab.',
    read: true,
    date: 'July 28, 2026',
    time: '10:00 AM',
  },
];