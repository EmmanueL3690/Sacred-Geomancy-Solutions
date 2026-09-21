import { ScrollText, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const historyStatsData = [
  {
    id: 'stat-total',
    title: 'Total Submissions',
    value: '15',
    icon: ScrollText,
  },
  {
    id: 'stat-pending',
    title: 'Pending Review',
    value: '4',
    icon: Clock,
  },
  {
    id: 'stat-completed',
    title: 'Completed',
    value: '9',
    icon: CheckCircle2,
  },
  {
    id: 'stat-rejected',
    title: 'Rejected',
    value: '2',
    icon: XCircle,
  },
];

export const mockSubmissions = [
  {
    id: 'sub-9001',
    numbers: [4, 7, 2, 9],
    status: 'Pending Review',
    date: 'August 3, 2026',
    time: '10:45 AM',
    notes: 'Your submission has been safely received and is currently in queue for review by our guidance team.',
  },
  {
    id: 'sub-8982',
    numbers: [1, 8, 3, 6],
    status: 'Completed',
    date: 'August 1, 2026',
    time: '02:15 PM',
    notes: 'Guidance review completed. Divine insights have been dispatched to your primary notification portal.',
  },
  {
    id: 'sub-8950',
    numbers: [9, 9, 0, 4],
    status: 'Approved',
    date: 'July 28, 2026',
    time: '09:30 AM',
    notes: 'Approved for processing. Full guidance synthesis will be published shortly.',
  },
  {
    id: 'sub-8912',
    numbers: [5, 2, 8, 1],
    status: 'Completed',
    date: 'July 20, 2026',
    time: '11:10 AM',
    notes: 'Guidance completed successfully.',
  },
  {
    id: 'sub-8890',
    numbers: [0, 0, 7, 3],
    status: 'Rejected',
    date: 'July 15, 2026',
    time: '04:50 PM',
    notes: 'Rejected due to duplicate numerical sequence submitted within the same review window.',
  },
  {
    id: 'sub-8821',
    numbers: [3, 6, 9, 2],
    status: 'Completed',
    date: 'July 10, 2026',
    time: '08:05 AM',
    notes: 'Guidance review completed.',
  },
];