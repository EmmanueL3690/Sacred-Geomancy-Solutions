import React, { useState } from 'react';
import {
  Activity,
  ShieldAlert,
  UserCheck,
  FileText,
  Bell,
  Clock,
  Terminal,
  Search,
  Filter,
  User,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminStatCard from '../components/ui/AdminStatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { SearchInput, FilterDropdown } from '../components/ui/FilterControls';
import AdminTable from '../components/ui/AdminTable';

export default function AdminActivityLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Mock activity audit dataset
  const [logs] = useState([
    {
      id: 'log_901',
      adminName: 'Super Admin',
      adminEmail: 'admin@example.com',
      action: 'Updated Consultation Status to Completed',
      target: 'Submission GS-00341 (Chioma Okafor)',
      category: 'Submissions',
      ipAddress: '197.210.44.12',
      timestamp: '19 Aug 2026, 12:45',
      severity: 'Info'
    },
    {
      id: 'log_902',
      adminName: 'Super Admin',
      adminEmail: 'admin@example.com',
      action: 'Dispatched System Broadcast Notification',
      target: 'All Registered Users',
      category: 'Notifications',
      ipAddress: '197.210.44.12',
      timestamp: '18 Aug 2026, 10:00',
      severity: 'Info'
    },
    {
      id: 'log_903',
      adminName: 'Moderator Alpha',
      adminEmail: 'mod1@example.com',
      action: 'Disabled Account Access',
      target: 'User Samuel Chukwu (usr_05)',
      category: 'Users',
      ipAddress: '102.89.23.88',
      timestamp: '17 Aug 2026, 16:10',
      severity: 'Warning'
    },
    {
      id: 'log_904',
      adminName: 'Moderator Alpha',
      adminEmail: 'mod1@example.com',
      action: 'Approved Customer Testimonial',
      target: 'Testimonial tst_01 (Adebayo A.)',
      category: 'Moderation',
      ipAddress: '102.89.23.88',
      timestamp: '16 Aug 2026, 09:30',
      severity: 'Info'
    },
    {
      id: 'log_905',
      adminName: 'System Gateway',
      adminEmail: 'system@internal',
      action: 'Failed Admin Authentication Attempt',
      target: 'Admin Login Portal',
      category: 'Security',
      ipAddress: '41.190.12.5',
      timestamp: '15 Aug 2026, 23:14',
      severity: 'Alert'
    }
  ]);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesCategory = categoryFilter ? log.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const tableHeaders = [
    { label: 'Timestamp' },
    { label: 'Admin User' },
    { label: 'Action Performed' },
    { label: 'Target Entity' },
    { label: 'Category' },
    { label: 'IP Address' },
    { label: 'Severity' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <AdminPageHeader
        title="Activity Audit Logs"
        description="Immutable system audit trail monitoring administrator updates, status overrides, and security events."
      />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Total Audit Logs"
          value={logs.length.toString()}
          subtext="Logged system events"
          icon={Activity}
        />
        <AdminStatCard
          label="Admin Actions Today"
          value="1"
          subtext="Operational events"
          icon={Clock}
          trendType="positive"
        />
        <AdminStatCard
          label="Security Flagged"
          value={logs.filter((l) => l.severity === 'Alert').length.toString()}
          subtext="Unrecognized IP attempts"
          icon={ShieldAlert}
          trendType="warning"
        />
      </div>

      {/* Controls Bar */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search action, target, admin, or IP..."
        />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FilterDropdown
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[
              { label: 'Submissions', value: 'Submissions' },
              { label: 'Users', value: 'Users' },
              { label: 'Notifications', value: 'Notifications' },
              { label: 'Moderation', value: 'Moderation' },
              { label: 'Security', value: 'Security' }
            ]}
          />
        </div>
      </div>

      {/* Main Table */}
      <AdminTable
        headers={tableHeaders}
        isEmpty={filteredLogs.length === 0}
        emptyTitle="No audit logs found"
        emptyDescription="Try broadening your search term or clearing the active category filters."
        pagination={{
          from: 1,
          to: filteredLogs.length,
          total: filteredLogs.length,
          hasPrev: false,
          hasNext: false
        }}
      >
        {filteredLogs.map((log) => (
          <tr key={log.id} className="hover:bg-neutral-800/30 transition-colors">
            {/* Timestamp */}
            <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400 whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{log.timestamp}</span>
              </div>
            </td>

            {/* Admin User */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <div>
                  <div className="font-medium text-neutral-200 text-xs">{log.adminName}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">{log.adminEmail}</div>
                </div>
              </div>
            </td>

            {/* Action */}
            <td className="py-3.5 px-4 text-xs font-medium text-neutral-200">
              {log.action}
            </td>

            {/* Target */}
            <td className="py-3.5 px-4 text-xs text-neutral-400 font-mono">
              {log.target}
            </td>

            {/* Category */}
            <td className="py-3.5 px-4 text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px]">
                <Terminal className="w-3 h-3 text-amber-500" />
                {log.category}
              </span>
            </td>

            {/* IP Address */}
            <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-400">
              {log.ipAddress}
            </td>

            {/* Severity */}
            <td className="py-3.5 px-4">
              <StatusBadge status={log.severity} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}