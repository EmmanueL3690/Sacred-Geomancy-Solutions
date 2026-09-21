import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    recentSubmissions: [],
  });

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
        .order('created_at', {
          ascending: false
        });

      if (submissionsError) {
        throw submissionsError;
      }

      console.log(
        'DASHBOARD SUBMISSIONS:',
        submissions
      );

      // ==========================================
      // 2. FETCH PROFILES
      // ==========================================
      const userIds = [
        ...new Set(
          (submissions || [])
            .map((submission) => submission.user_id)
            .filter(Boolean)
        )
      ];

      let profiles = [];
      if (userIds.length > 0) {
        const {
          data: profileData,
          error: profilesError
        } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', userIds);

        if (profilesError) {
          throw profilesError;
        }

        profiles = profileData || [];
      }

      console.log('DASHBOARD PROFILES:', profiles);

      // ==========================================
      // 3. CREATE PROFILE MAP
      // ==========================================
      const profileMap = Object.fromEntries(
        profiles.map((profile) => [
          profile.id,
          profile.full_name
        ])
      );

      console.log('PROFILE MAP:', profileMap);

      // ==========================================
      // 4. MATCH PROFILE TO SUBMISSION
      // ==========================================
      const formattedSubmissions = (
        submissions || []
      ).map((submission) => {
        const userName =
          profileMap[submission.user_id] ||
          'Unknown User';

        console.log(
          'MATCHING SUBMISSION:',
          submission.id,
          'USER ID:',
          submission.user_id,
          'USER NAME:',
          userName
        );

        return {
          ...submission,

          userName,

          numbers: [
            submission.number_1,
            submission.number_2,
            submission.number_3,
            submission.number_4
          ],

          submittedAt:
            submission.created_at
              ? new Date(
                  submission.created_at
                ).toLocaleDateString()
              : 'Unknown Date',

          displayStatus:
            submission.status
              ? submission.status.charAt(0).toUpperCase() +
                submission.status.slice(1)
              : 'Pending'
        };
      });

      console.log(
        'FORMATTED DASHBOARD SUBMISSIONS:',
        formattedSubmissions
      );

      // ==========================================
      // 5. CALCULATE STATISTICS
      // ==========================================
      const total = formattedSubmissions.length;

      const pending = formattedSubmissions.filter(
        (submission) => submission.status === 'pending'
      ).length;

      const approved = formattedSubmissions.filter(
        (submission) => submission.status === 'approved'
      ).length;

      const rejected = formattedSubmissions.filter(
        (submission) => submission.status === 'rejected'
      ).length;

      // ==========================================
      // 6. UPDATE DASHBOARD
      // ==========================================
      setStats({
        totalSubmissions: total,
        pending,
        approved,
        rejected,

        recentSubmissions: formattedSubmissions.slice(0, 5)
      });

    } catch (error) {
      console.error(
        'FETCH DASHBOARD ERROR:',
        error
      );

      setErrorMsg(
        error.message ||
        'Failed to load dashboard data.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-neutral-800/80 pb-6">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100">
          Admin Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Overview of submission activity and review status.
        </p>
      </div>

      {/* 4 Metric Cards */}
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

      {/* Loading & Error Indicators */}
      {loading && (
        <div className="text-sm text-neutral-400">
          Loading dashboard...
        </div>
      )}

      {errorMsg && (
        <div className="text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      {/* Submissions Table */}
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
                      {sub.userName}
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
    </div>
  );
}