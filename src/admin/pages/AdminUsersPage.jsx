import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Eye,
  Bell,
  UserX,
  UserCheck2,
  FileText,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import AdminPageHeader from '../components/ui/AdminPageHeader';
import AdminStatCard from '../components/ui/AdminStatCard';
import StatusBadge from '../components/ui/StatusBadge';
import { SearchInput, FilterDropdown } from '../components/ui/FilterControls';
import AdminTable from '../components/ui/AdminTable';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Prepared mock dataset (UI-ready for Supabase profiles query)
  const [users, setUsers] = useState([
    {
      id: 'usr_01',
      name: 'Adebayo Adeleke',
      email: 'adebayo.a@example.com',
      phone: '+234 803 123 4567',
      joined: '12 Aug 2026',
      submissionsCount: 3,
      status: 'Active'
    },
    {
      id: 'usr_02',
      name: 'Chioma Okafor',
      email: 'chioma.okafor@example.com',
      phone: '+234 812 987 6543',
      joined: '05 Aug 2026',
      submissionsCount: 5,
      status: 'Active'
    },
    {
      id: 'usr_03',
      name: 'Ibrahim Danfulani',
      email: 'i.danfulani@example.ng',
      phone: '+234 701 456 7890',
      joined: '28 Jul 2026',
      submissionsCount: 1,
      status: 'Active'
    },
    {
      id: 'usr_04',
      name: 'Grace Ekanem',
      email: 'grace.ekanem@example.com',
      phone: '+234 809 321 6549',
      joined: '15 Jul 2026',
      submissionsCount: 8,
      status: 'Active'
    },
    {
      id: 'usr_05',
      name: 'Samuel Chukwu',
      email: 'samuel.c@example.org',
      phone: '+234 814 555 0192',
      joined: '02 Jun 2026',
      submissionsCount: 0,
      status: 'Disabled'
    }
  ]);

  // Toggle user status (Active <-> Disabled)
  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'Active' ? 'Disabled' : 'Active' }
          : u
      )
    );
  };

  // Search & Filter Logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm);
    const matchesStatus = statusFilter ? u.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const tableHeaders = [
    { label: 'User' },
    { label: 'Email' },
    { label: 'Phone' },
    { label: 'Joined' },
    { label: 'Submissions', align: 'center' },
    { label: 'Status' },
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Header */}
      <AdminPageHeader
        title="Users Management"
        description="View registered accounts, monitor consultation activity, and manage access privileges."
      />

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard
          label="Total Users"
          value={users.length.toString()}
          subtext="Registered accounts"
          icon={Users}
        />
        <AdminStatCard
          label="Active Accounts"
          value={users.filter((u) => u.status === 'Active').length.toString()}
          subtext="In good standing"
          icon={UserCheck}
          trendType="positive"
        />
        <AdminStatCard
          label="New This Month"
          value="86"
          subtext="+14% growth"
          icon={UserPlus}
          trend="+14%"
          trendType="positive"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name, email, or phone..."
        />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <FilterDropdown
            label="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { label: 'Active', value: 'Active' },
              { label: 'Disabled', value: 'Disabled' }
            ]}
          />
          <FilterDropdown
            label="Sort"
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: 'Newest First', value: 'newest' },
              { label: 'Oldest First', value: 'oldest' },
              { label: 'Most Submissions', value: 'submissions' }
            ]}
          />
        </div>
      </div>

      {/* Main Users Data Table */}
      <AdminTable
        headers={tableHeaders}
        isEmpty={filteredUsers.length === 0}
        emptyTitle="No users found"
        emptyDescription="Try adjusting your search keywords or active status filters."
        pagination={{
          from: 1,
          to: filteredUsers.length,
          total: filteredUsers.length,
          hasPrev: false,
          hasNext: false
        }}
      >
        {filteredUsers.map((user) => (
          <tr key={user.id} className="hover:bg-neutral-800/30 transition-colors">
            {/* User Profile Info */}
            <td className="py-3.5 px-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-amber-500/20 flex items-center justify-center font-semibold text-xs text-amber-400">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-neutral-200">{user.name}</div>
                  <div className="text-[10px] text-neutral-500 font-mono">ID: {user.id}</div>
                </div>
              </div>
            </td>

            {/* Email */}
            <td className="py-3.5 px-4 text-neutral-300">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="truncate max-w-[180px]">{user.email}</span>
              </div>
            </td>

            {/* Phone */}
            <td className="py-3.5 px-4 text-neutral-300 font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{user.phone}</span>
              </div>
            </td>

            {/* Joined Date */}
            <td className="py-3.5 px-4 text-neutral-400 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>{user.joined}</span>
              </div>
            </td>

            {/* Submissions Count */}
            <td className="py-3.5 px-4 text-center font-mono">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 text-[11px]">
                <FileText className="w-3 h-3 text-amber-500" />
                {user.submissionsCount}
              </span>
            </td>

            {/* Status Badge */}
            <td className="py-3.5 px-4">
              <StatusBadge status={user.status} />
            </td>

            {/* Actions */}
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <button
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100 transition-colors"
                  title="View User Details"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 transition-colors"
                  title="Send Notification"
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleToggleStatus(user.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    user.status === 'Active'
                      ? 'bg-neutral-800 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400'
                      : 'bg-neutral-800 hover:bg-emerald-500/20 text-neutral-400 hover:text-emerald-400'
                  }`}
                  title={user.status === 'Active' ? 'Disable Account' : 'Enable Account'}
                >
                  {user.status === 'Active' ? (
                    <UserX className="w-3.5 h-3.5" />
                  ) : (
                    <UserCheck2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}