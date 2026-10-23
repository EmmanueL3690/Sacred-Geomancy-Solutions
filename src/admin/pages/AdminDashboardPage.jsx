import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle2, XCircle, Eye, Users, UserCheck, UserX, Search, Globe, Shield, Calendar, Phone } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    recentSubmissions: [],
  });

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      // ==========================================
      // 1. FETCH SUBMISSIONS
      // ==========================================
      const {
        data: submissions,
        error: submissionsError
      } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (submissionsError) throw submissionsError;

      // ==========================================
      // 2. FETCH ALL PROFILES INDEPENDENTLY
      // ==========================================
      const {
        data: profileData,
        error: profilesError
      } = await supabase
        .from('profiles')
        .select('id, full_name, phone, gender, avatar_url, role, is_active, created_at, preferred_language')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const allProfiles = profileData || [];

      // ==========================================
      // 3. CALCULATE USER STATISTICS
      // ==========================================
      const totalUsersCount = allProfiles.length;
      // Treat null/undefined is_active as active (true) by default
      const activeUsersCount = allProfiles.filter(p => p.is_active !== false).length;
      const inactiveUsersCount = allProfiles.filter(p => p.is_active === false).length;

      // ==========================================
      // 4. CREATE PROFILE MAP
      // ==========================================
      const profileMap = Object.fromEntries(
        allProfiles.map((profile) => [
          profile.id,
          {
            fullName: profile.full_name || 'Unknown User',
            phone: profile.phone || 'Not provided',
            gender: profile.gender || 'Not provided',
            preferredLanguage: profile.preferred_language || 'English',
          },
        ])
      );

      // ==========================================
      // 5. FORMAT RECENT SUBMISSIONS
      // ==========================================
      const formattedSubmissions = (submissions || []).map((submission) => {
        const userProfile = profileMap[submission.user_id] || {
          fullName: 'Unknown User',
          phone: 'Not provided',
          gender: 'Not provided',
          preferredLanguage: 'English',
        };

        return {
          ...submission,
          userName: userProfile.fullName,
          userPhone: userProfile.phone,
          userGender: userProfile.gender,
          userLanguage: userProfile.preferredLanguage,

          numbers: [
            submission.number_1,
            submission.number_2,
            submission.number_3,
            submission.number_4
          ],

          submittedAt: submission.created_at
            ? new Date(submission.created_at).toLocaleDateString()
            : 'Unknown Date',

          displayStatus: submission.status
            ? submission.status.charAt(0).toUpperCase() + submission.status.slice(1)
            : 'Pending'
        };
      });

      // ==========================================
      // 6. FORMAT REGISTERED USERS LIST
      // ==========================================
      const formattedUsers = allProfiles.map((user) => ({
        ...user,
        displayName: user.full_name || 'Unknown User',
        displayPhone: user.phone || 'Not provided',
        displayGender: user.gender || 'Not provided',
        displayLanguage: user.preferred_language || 'English',
        displayRole: user.role || 'user',
        isActive: user.is_active !== false,
        registeredAt: user.created_at
          ? new Date(user.created_at).toLocaleDateString()
          : 'Unknown Date',
      }));

      setUsers(formattedUsers);

      // ==========================================
      // 7. CALCULATE SUBMISSION STATISTICS
      // ==========================================
      const totalSubs = formattedSubmissions.length;
      const pending = formattedSubmissions.filter(s => s.status === 'pending').length;
      const approved = formattedSubmissions.filter(s => s.status === 'approved').length;
      const rejected = formattedSubmissions.filter(s => s.status === 'rejected').length;

      // ==========================================
      // 8. UPDATE STATE
      // ==========================================
      setStats({
        totalSubmissions: totalSubs,
        pending,
        approved,
        rejected,
        totalUsers: totalUsersCount,
        activeUsers: activeUsersCount,
        inactiveUsers: inactiveUsersCount,
        recentSubmissions: formattedSubmissions.slice(0, 5)
      });

    } catch (error) {
      console.error('FETCH DASHBOARD ERROR:', error);
      setErrorMsg(error.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter users by search query (name or phone)
  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = u.displayName.toLowerCase().includes(query);
    const phoneMatch = u.displayPhone.toLowerCase().includes(query);
    return nameMatch || phoneMatch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-neutral-800/80 pb-6">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Overview of submission activity, review status, and registered user directory.
        </p>
      </div>

      {/* Metric Cards - Submissions & Users */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Submissions */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Total Submissions
            </span>
            <div className="p-2 rounded-lg bg-neutral-800/80 text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold font-mono text-neutral-100">
            {stats.totalSubmissions}
          </div>
        </div>

        {/* Pending */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Pending
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold font-mono text-amber-400">
            {stats.pending}
          </div>
        </div>

        {/* Approved */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Approved
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold font-mono text-emerald-400">
            {stats.approved}
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Rejected
            </span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4 text-2xl font-bold font-mono text-red-400">
            {stats.rejected}
          </div>
        </div>
      </div>

      {/* Secondary Metric Cards: User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Total Registered Users
            </span>
            <div className="mt-2 text-xl font-bold font-mono text-neutral-100">
              {stats.totalUsers}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Active Users
            </span>
            <div className="mt-2 text-xl font-bold font-mono text-emerald-400">
              {stats.activeUsers}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Inactive Users
            </span>
            <div className="mt-2 text-xl font-bold font-mono text-red-400">
              {stats.inactiveUsers}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20">
            <UserX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Loading & Error Indicators */}
      {loading && (
        <div className="text-sm text-neutral-400">
          Loading dashboard data...
        </div>
      )}

      {errorMsg && (
        <div className="text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      {/* Recent Submissions Table */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800/80 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-200">Recent Submissions</h2>
          <Link
            to="/admin/submissions"
            className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/50 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Numbers Submitted</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-xs text-neutral-300 font-normal">
              {!loading && stats.recentSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-neutral-500">
                    No submissions found.
                  </td>
                </tr>
              ) : (
                stats.recentSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-neutral-200">
                      <div>{sub.userName}</div>
                      <div className="text-[10px] text-neutral-400 font-normal">
                        {sub.userPhone} • {sub.userGender} • <span className="text-amber-400/90">{sub.userLanguage}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-400">
                      {sub.numbers ? sub.numbers.join(', ') : ''}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      {sub.submittedAt}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                          sub.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : sub.status === 'rejected'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {sub.displayStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/admin/submissions?id=${sub.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-medium text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Review</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registered Users Section */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-neutral-200">Registered Users Directory</h2>
          </div>
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950/60 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/50 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Contact & Gender</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-xs text-neutral-300 font-normal">
              {!loading && filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-500">
                    No registered users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-neutral-200">
                      {u.displayName}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      <div className="flex items-center gap-1.5 text-neutral-300 font-mono text-[11px]">
                        <Phone className="w-3 h-3 text-neutral-500" />
                        {u.displayPhone}
                      </div>
                      <div className="text-[10px] text-neutral-500 mt-0.5">
                        Gender: {u.displayGender}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px]">
                        <Globe className="w-3 h-3 text-amber-400" />
                        {u.displayLanguage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] capitalize">
                        <Shield className="w-3 h-3 text-cyan-400" />
                        {u.displayRole}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                          u.isActive
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400">
                      <div className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        {u.registeredAt}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}