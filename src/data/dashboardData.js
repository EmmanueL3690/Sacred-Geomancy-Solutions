import { Binary, History, Heart, Sparkles } from 'lucide-react';

export const mockDashboardData = {
  user: {
    name: 'Aurelius Vance',
    role: 'Sacred Geometry Architect',
    location: 'Alexandria Node',
    tier: 'Adept Member',
    avatarSrc: '', // Optional image URL
    stats: [
      { label: 'Grids', value: '142' },
      { label: 'Accuracy', value: '98.4%' },
      { label: 'Rank', value: 'Tier 1' },
    ],
  },
  stats: [
    {
      id: 'stat-1',
      title: 'Active Alignments',
      value: '1,284',
      change: '+12.5%',
      isPositive: true,
      icon: Binary,
      description: 'vs last cycle',
    },
    {
      id: 'stat-2',
      title: 'Geomancy Rating',
      value: '99.2%',
      change: '+0.8%',
      isPositive: true,
      icon: Sparkles,
      description: 'optimal harmony',
    },
    {
      id: 'stat-3',
      title: 'Submissions',
      value: '48',
      change: '-2.4%',
      isPositive: false,
      icon: History,
      description: 'this month',
    },
  ],
  quickActions: [
    {
      id: 'qa-1',
      title: 'Submit Numbers',
      description: 'Calculate matrix parameters and align new geometric nodes.',
      icon: Binary,
      actionLabel: 'Calculate',
      path: '/app/submit',
    },
    {
      id: 'qa-2',
      title: 'View History',
      description: 'Inspect past numerical submissions and spatial logs.',
      icon: History,
      actionLabel: 'Inspect',
      path: '/app/history',
    },
    {
      id: 'qa-3',
      title: 'Share Testimony',
      description: 'Document breakthroughs and cosmic realignments.',
      icon: Heart,
      actionLabel: 'Publish',
      path: '/app/testimonies',
    },
  ],
  submissions: [
    {
      id: 'sub-101',
      title: 'Phi Grid Harmonic Delta #882',
      date: 'Aug 03, 2026',
      status: 'Completed',
    },
    {
      id: 'sub-102',
      title: 'Vortex Vector Calculation #901',
      date: 'Aug 02, 2026',
      status: 'Pending',
    },
    {
      id: 'sub-103',
      title: 'Metatron Cube Convergence #740',
      date: 'Jul 29, 2026',
      status: 'Approved',
    },
  ],
  notifications: [
    {
      id: 'notif-1',
      title: 'Grid Alignment Synchronized',
      message: 'Node 074 successfully verified by the central matrix core.',
      timestamp: '10m ago',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'New Harmonic Insight Available',
      message: 'Weekly geometric resonance reports are ready for review.',
      timestamp: '2h ago',
      unread: false,
    },
  ],
  testimony: {
    authorName: 'Lady Eleanor Vance',
    authorRole: 'High Alchemist',
    testimony:
      'The precise alignment vectors unlocked unprecedented harmony in our spatial grid. A masterclass in sacred geometry.',
    rating: 5,
  },
  dailyInspiration: {
    quote: 'Geometry existed before the creation; it is co-eternal with the mind of God.',
    author: 'Johannes Kepler',
    date: 'Daily Contemplation',
  },
};