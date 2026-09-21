import { CheckCircle2, Clock, UserCheck, Calendar } from 'lucide-react';

export const testimonyStatsData = [
  {
    id: 'stat-approved',
    title: 'Approved',
    value: '128',
    icon: CheckCircle2,
  },
  {
    id: 'stat-pending',
    title: 'Pending',
    value: '6',
    icon: Clock,
  },
  {
    id: 'stat-my-testimonies',
    title: 'My Testimonies',
    value: '4',
    icon: UserCheck,
  },
  {
    id: 'stat-this-month',
    title: 'This Month',
    value: '12',
    icon: Calendar,
  },
];

export const featuredTestimonyData = {
  id: 'featured-1',
  quote: 'I received my breakthrough after following the spiritual guidance. My life changed completely.',
  name: 'John D.',
  memberSince: 'Member since July 2026',
  rating: 5,
};

export const mockTestimonies = [
  {
    id: 'test-101',
    name: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    title: 'A Wonderful Experience',
    message: 'I received my breakthrough after following the guidance provided through the numerical submission. Everything fell into place seamlessly.',
    rating: 5,
    status: 'Approved',
    createdAt: 'August 3, 2026',
    isUserSubmitted: true,
    adminFeedback: 'Thank you for sharing your experience! May your path remain illuminated.',
  },
  {
    id: 'test-102',
    name: 'Sarah M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    title: 'Peace and Clarity restored',
    message: 'The insights from my submission provided instant direction during a difficult life decision. Extremely grateful for Geomancy Solutions.',
    rating: 5,
    status: 'Approved',
    createdAt: 'August 1, 2026',
    isUserSubmitted: false,
  },
  {
    id: 'test-103',
    name: 'David O.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop',
    title: 'Transformative Spiritual Journey',
    message: 'Following the four-number guidance brought balance and tranquility to my daily routine. Highly recommend to anyone seeking clarity.',
    rating: 5,
    status: 'Approved',
    createdAt: 'July 28, 2026',
    isUserSubmitted: false,
  },
  {
    id: 'test-104',
    name: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    title: 'Guidance on New Venture',
    message: 'I submitted my sequence before launching my project, and the advice was spot on. Awaiting my full follow-up review.',
    rating: 5,
    status: 'Pending',
    createdAt: 'July 25, 2026',
    isUserSubmitted: true,
    adminFeedback: 'Currently undergoing second-tier review.',
  },
  {
    id: 'test-105',
    name: 'John D.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    title: 'Unclear initial draft',
    message: 'The initial submission felt too brief so I am writing a more detailed story.',
    rating: 3,
    status: 'Rejected',
    createdAt: 'July 10, 2026',
    isUserSubmitted: true,
    adminFeedback: 'Rejected due to insufficient detail. Please expand on your specific experience and submit again.',
  },
];