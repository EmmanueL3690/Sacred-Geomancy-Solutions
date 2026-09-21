import React, { useState } from 'react';
import {
  Bell,
  Send,
  Users,
  User,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Trash2,
  Info,
  Sparkles
} from 'lucide-react';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminStatCard from '../components/ui/AdminStatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { SearchInput, FilterDropdown } from '../components/ui/FilterControls';
import AdminTable from '../components/ui/AdminTable';

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');
  const [notificationType, setNotificationType] = useState('info');

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Mock notification history
  const [notifications, setNotifications] = useState([
    {
      id: 'ntf_101',
      title: 'Scheduled System Maintenance',
      message: 'Platform maintenance will take place on Aug 20 from 2:00 AM to 4:00 AM WAT.',
      audience: 'All Users',
      type: 'Warning',
      sentAt: '18 Aug 2026, 10:00',
      deliveredCount: 1420,
      status: 'Sent'
    },
    {
      id: 'ntf_102',
      title: 'New Number Consultation Feature',
      message: 'You can now view detailed historic trends for your submitted numbers in the app dashboard!',
      audience: 'Active Users',
      type: 'Info',
      sentAt: '15 Aug 2026, 14:30',
      deliveredCount: 980,
      status: 'Sent'
    },
    {
      id: 'ntf_103',
      title: 'Consultation Completed',
      message: 'Your submitted numbers GS-00341 consultation report has been published.',
      audience: 'Single User (usr_02)',
      type: 'Success',
      sentAt: '12 Aug 2026, 11:20',
      deliveredCount: 1,
      status: 'Sent'
    }
  ]);

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newNtf = {
      id: `ntf_${Date.now().toString().slice(-3)}`,
      title,
      message,
      audience: audience === 'all' ? 'All Users' : audience === 'active' ? 'Active Users' : 'Targeted User',
      type: notificationType === 'info' ? 'Info' : notificationType === 'warning' ? 'Warning' : 'Success',
      sentAt: 'Just now',
      deliveredCount: audience === 'all' ? 1450 : 1,
      status: 'Sent'
    };

    setNotifications([newNtf, ...notifications]);
    setTitle('');
    setMessage('');
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.audience.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? n.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  const tableHeaders = [
    { label: 'Title & Preview' },
    { label: 'Audience' },
    { label: 'Type' },
    { label: 'Dispatched Date' },
    { label: 'Recipients', align: 'center' },
    { label: 'Status' },
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <AdminPageHeader
        title="Notifications Center"
        description="Broadcast system updates, deliver consultation alerts, and review notification activity logs."
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Total Broadcasts"
          value={notifications.length.toString()}
          subtext="Alerts dispatched"
          icon={Bell}
        />
        <AdminStatCard
          label="Total Deliveries"
          value={notifications.reduce((acc, curr) => acc + curr.deliveredCount, 0).toLocaleString()}
          subtext="In-app & push messages"
          icon={Users}
          trendType="positive"
        />
        <AdminStatCard
          label="System Health"
          value="100%"
          subtext="Notification gateway active"
          icon={CheckCircle2}
          trendType="positive"
        />
      </div>

      {/* Compose Notification Form Card */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Compose & Broadcast Notification
        </h3>

        <form onSubmit={handleSendNotification} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Title Input */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Notification Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scheduled System Maintenance Notice"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
              >
                <option value="all">All Registered Users</option>
                <option value="active">Active Users Only</option>
                <option value="targeted">Specific User ID</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Message Body */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Message Content</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write message details that will appear in user notifications..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50 resize-none"
              />
            </div>

            {/* Notification Priority / Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-400">Notification Type</label>
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
              >
                <option value="info">Informational (Blue)</option>
                <option value="warning">System Warning (Amber)</option>
                <option value="success">Success / Alert (Green)</option>
              </select>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors shadow-md shadow-amber-500/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Notification</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search notification title or message..."
        />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FilterDropdown
            label="Type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: 'Info', value: 'Info' },
              { label: 'Warning', value: 'Warning' },
              { label: 'Success', value: 'Success' }
            ]}
          />
        </div>
      </div>

      {/* Notification Log History Table */}
      <AdminTable
        headers={tableHeaders}
        isEmpty={filteredNotifications.length === 0}
        emptyTitle="No notification logs found"
        emptyDescription="Try clearing search terms or selecting a different filter."
        pagination={{
          from: 1,
          to: filteredNotifications.length,
          total: filteredNotifications.length,
          hasPrev: false,
          hasNext: false
        }}
      >
        {filteredNotifications.map((ntf) => (
          <tr key={ntf.id} className="hover:bg-neutral-800/30 transition-colors">
            {/* Title & Preview */}
            <td className="py-3.5 px-4 max-w-xs">
              <div className="font-medium text-neutral-200 text-xs">{ntf.title}</div>
              <div className="text-[11px] text-neutral-400 truncate mt-0.5">{ntf.message}</div>
            </td>

            {/* Audience */}
            <td className="py-3.5 px-4 text-xs text-neutral-300">
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3 text-neutral-500" />
                {ntf.audience}
              </span>
            </td>

            {/* Type */}
            <td className="py-3.5 px-4">
              <StatusBadge status={ntf.type} />
            </td>

            {/* Dispatched Date */}
            <td className="py-3.5 px-4 text-neutral-400 text-[11px] whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{ntf.sentAt}</span>
              </div>
            </td>

            {/* Recipients */}
            <td className="py-3.5 px-4 text-center font-mono text-xs text-neutral-300">
              {ntf.deliveredCount}
            </td>

            {/* Status */}
            <td className="py-3.5 px-4">
              <StatusBadge status={ntf.status} />
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <button
                onClick={() => handleDelete(ntf.id)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-rose-500/20 text-neutral-500 hover:text-rose-400 transition-colors"
                title="Delete Notification Record"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}