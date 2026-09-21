import { ScrollText, MessageSquareQuote, UserCog, Bell } from 'lucide-react';

export const mockActivities = [
  {
    id: 'act-1',
    title: 'Submitted Numbers [4, 7, 2, 9]',
    type: 'submission',
    icon: ScrollText,
    date: 'August 3, 2026',
    time: '10:45 AM',
  },
  {
    id: 'act-2',
    title: 'Submitted Testimony "A Wonderful Experience"',
    type: 'testimony',
    icon: MessageSquareQuote,
    date: 'August 3, 2026',
    time: '09:15 AM',
  },
  {
    id: 'act-3',
    title: 'Updated Profile Information',
    type: 'profile_update',
    icon: UserCog,
    date: 'August 1, 2026',
    time: '04:30 PM',
  },
  {
    id: 'act-4',
    title: 'Received Notification "Submission Reviewed"',
    type: 'notification',
    icon: Bell,
    date: 'July 28, 2026',
    time: '02:00 PM',
  },
];