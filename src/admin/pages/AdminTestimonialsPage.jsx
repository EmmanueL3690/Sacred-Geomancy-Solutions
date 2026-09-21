import React, { useState } from 'react';
import {
  MessageSquare,
  CheckCircle2,
  XCircle,
  Star,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminStatCard from '../components/ui/AdminStatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { SearchInput, FilterDropdown } from '../components/ui/FilterControls';
import AdminTable from '../components/ui/AdminTable';

export default function AdminTestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  // Mock dataset for customer testimonials
  const [testimonials, setTestimonials] = useState([
    {
      id: 'tst_01',
      authorName: 'Adebayo Adeleke',
      authorEmail: 'adebayo.a@example.com',
      rating: 5,
      content: 'The consultation analysis was incredibly insightful and spot on! Highly recommend their prompt service.',
      status: 'Approved',
      isFeatured: true,
      submittedAt: '10 Aug 2026'
    },
    {
      id: 'tst_02',
      authorName: 'Chioma Okafor',
      authorEmail: 'chioma.okafor@example.com',
      rating: 5,
      content: 'Clear explanation of my submitted numbers. Fast response time and professional guidance.',
      status: 'Pending',
      isFeatured: false,
      submittedAt: '12 Aug 2026'
    },
    {
      id: 'tst_03',
      authorName: 'Ibrahim Danfulani',
      authorEmail: 'i.danfulani@example.ng',
      rating: 4,
      content: 'Very good service overall, though I had to wait a bit longer than expected for my report.',
      status: 'Pending',
      isFeatured: false,
      submittedAt: '11 Aug 2026'
    },
    {
      id: 'tst_04',
      authorName: 'Grace Ekanem',
      authorEmail: 'grace.ekanem@example.com',
      rating: 5,
      content: 'Submitting my numbers was seamless. The insights given helped guide our decisions tremendously.',
      status: 'Approved',
      isFeatured: false,
      submittedAt: '08 Aug 2026'
    },
    {
      id: 'tst_05',
      authorName: 'Anonymous User',
      authorEmail: 'anon.user@example.org',
      rating: 1,
      content: 'Spam review containing unrelated advertising links and irrelevant text.',
      status: 'Rejected',
      isFeatured: false,
      submittedAt: '05 Aug 2026'
    }
  ]);

  // Handle status changes (Approved / Rejected)
  const handleUpdateStatus = (id, newStatus) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  // Toggle Featured state on public landing page
  const handleToggleFeatured = (id) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isFeatured: !t.isFeatured } : t))
    );
  };

  // Delete testimonial record
  const handleDelete = (id) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // Filtering logic
  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch =
      t.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.authorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? t.status === statusFilter : true;
    const matchesRating = ratingFilter ? t.rating.toString() === ratingFilter : true;

    return matchesSearch && matchesStatus && matchesRating;
  });

  const tableHeaders = [
    { label: 'Author' },
    { label: 'Rating' },
    { label: 'Testimonial Content' },
    { label: 'Submitted Date' },
    { label: 'Status' },
    { label: 'Featured' },
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <AdminPageHeader
        title="Testimonials Moderation"
        description="Review customer feedback, approve testimonials for display, and select featured reviews for the landing page."
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          label="Total Feedback"
          value={testimonials.length.toString()}
          subtext="Submitted reviews"
          icon={MessageSquare}
        />
        <AdminStatCard
          label="Pending Moderation"
          value={testimonials.filter((t) => t.status === 'Pending').length.toString()}
          subtext="Awaiting review"
          icon={Clock}
          trendType="warning"
        />
        <AdminStatCard
          label="Approved Public"
          value={testimonials.filter((t) => t.status === 'Approved').length.toString()}
          subtext="Visible to visitors"
          icon={CheckCircle2}
          trendType="positive"
        />
        <AdminStatCard
          label="Featured Reviews"
          value={testimonials.filter((t) => t.isFeatured).length.toString()}
          subtext="Promoted on homepage"
          icon={Sparkles}
          trendType="positive"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search author, email, or feedback text..."
        />
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Pending', value: 'Pending' },
              { label: 'Approved', value: 'Approved' },
              { label: 'Rejected', value: 'Rejected' }
            ]}
          />
          <FilterDropdown
            label="Rating"
            value={ratingFilter}
            onChange={setRatingFilter}
            options={[
              { label: '5 Stars', value: '5' },
              { label: '4 Stars', value: '4' },
              { label: '3 Stars', value: '3' },
              { label: '2 Stars', value: '2' },
              { label: '1 Star', value: '1' }
            ]}
          />
        </div>
      </div>

      {/* Table Section */}
      <AdminTable
        headers={tableHeaders}
        isEmpty={filteredTestimonials.length === 0}
        emptyTitle="No testimonials found"
        emptyDescription="Try clearing your search query or choosing different moderation filters."
        pagination={{
          from: 1,
          to: filteredTestimonials.length,
          total: filteredTestimonials.length,
          hasPrev: false,
          hasNext: false
        }}
      >
        {filteredTestimonials.map((item) => (
          <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors">
            {/* Author */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <div>
                  <div className="font-medium text-neutral-200 text-xs">{item.authorName}</div>
                  <div className="text-[10px] text-neutral-500 truncate max-w-[140px]">
                    {item.authorEmail}
                  </div>
                </div>
              </div>
            </td>

            {/* Star Rating */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < item.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </td>

            {/* Content preview */}
            <td className="py-3.5 px-4 max-w-xs">
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                "{item.content}"
              </p>
            </td>

            {/* Date */}
            <td className="py-3.5 px-4 text-neutral-400 text-[11px] whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{item.submittedAt}</span>
              </div>
            </td>

            {/* Moderation Status */}
            <td className="py-3.5 px-4">
              <StatusBadge status={item.status} />
            </td>

            {/* Featured Switch */}
            <td className="py-3.5 px-4">
              <button
                onClick={() => handleToggleFeatured(item.id)}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                  item.isFeatured
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-neutral-800 text-neutral-500 border-neutral-700 hover:text-neutral-300'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {item.isFeatured ? 'Featured' : 'Standard'}
              </button>
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleUpdateStatus(item.id, 'Approved')}
                  disabled={item.status === 'Approved'}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-emerald-500/20 text-neutral-400 hover:text-emerald-400 disabled:opacity-30 transition-colors"
                  title="Approve Testimonial"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleUpdateStatus(item.id, 'Rejected')}
                  disabled={item.status === 'Rejected'}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400 disabled:opacity-30 transition-colors"
                  title="Reject Testimonial"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-500/20 text-neutral-500 hover:text-rose-400 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}