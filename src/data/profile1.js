import { ScrollText, Heart, Bell, ShieldCheck } from 'lucide-react';

export const mockUserProfile = {
  id: 'usr-78901',
  fullName: 'John Doe',
  email: 'john.doe@geomancy.com',
  phone: '+1 (555) 234-5678',
  gender: 'Male',
  country: 'United States',
  city: 'Los Angeles',
  bio: 'Exploring spiritual alignment and four-digit sequence synthesis.',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  memberSince: 'July 2026',
  membershipStatus: 'Premium Member',
};

export const profileStatsData = [
  {
    id: 'stat-submissions',
    title: 'Total Submissions',
    value: '15',
    icon: ScrollText,
  },
  {
    id: 'stat-testimonies',
    title: 'Approved Testimonies',
    value: '4',
    icon: Heart,
  },
  {
    id: 'stat-notifications',
    title: 'Unread Notifications',
    value: '3',
    icon: Bell,
  },
  {
    id: 'stat-status',
    title: 'Account Status',
    value: 'Active',
    icon: ShieldCheck,
  },
];