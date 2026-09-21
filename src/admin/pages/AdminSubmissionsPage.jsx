import React, { useEffect, useState } from 'react';
import {
  Eye,
  Search,
  Check,
  X,
  Loader2,
  Trash2
} from 'lucide-react';

import { supabase } from '../../lib/supabaseClient';

export default function AdminSubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // DELETE STATE
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [errorMsg, setErrorMsg] = useState('');

  // ================================
  // FETCH SUBMISSIONS
  // ================================

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const { data, error } = await supabase
        .from('submissions')
        .select(`
          *,
          profiles (
            full_name
          )
        `)
        .order('created_at', {
          ascending: false
        });

      if (error) {
        console.error('FETCH ERROR:', error);
        throw error;
      }

      console.log('RAW DATABASE DATA:', data);

      const formattedData = (data || []).map((sub) => ({
        ...sub,
        userName: sub.profiles?.full_name || 'Unknown User',
        numbers: [
          sub.number_1,
          sub.number_2,
          sub.number_3,
          sub.number_4
        ],
        submittedAt: sub.created_at
          ? new Date(sub.created_at).toLocaleString()
          : 'Unknown Date',
        status: sub.status
          ? sub.status.charAt(0).toUpperCase() + sub.status.slice(1)
          : 'Pending'
      }));

      console.log('FETCHED SUBMISSIONS:', formattedData);

      setSubmissions(formattedData);
    } catch (error) {
      console.error('FETCH SUBMISSIONS ERROR:', error);
      setErrorMsg(error.message || 'Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // LOAD DATA
  // ================================

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // ================================
  // UPDATE STATUS
  // ================================

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setUpdating(true);

      console.log('==============================');
      console.log('UPDATING SUBMISSION');
      console.log('SUBMISSION ID:', id);
      console.log('NEW STATUS:', newStatus);

      if (!id) {
        throw new Error('Submission ID is missing.');
      }

      // Get currently logged in user
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error('No user is currently logged in.');
      }

      console.log('LOGGED IN USER:', user.id);

      // Check profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('PROFILE ERROR:', profileError);
        throw profileError;
      }

      console.log('CURRENT PROFILE:', profile);

      // Make sure user is admin
      if (!profile) {
        throw new Error('User profile not found.');
      }

      if (profile.role !== 'admin') {
        throw new Error(
          'You are not authorized to update submissions.'
        );
      }

      console.log('ADMIN VERIFIED');

      // Prepare update
      const updateData = {
        status: newStatus.toLowerCase(),
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id
      };

      console.log('UPDATE DATA:', updateData);

      // Update submission
      const { data, error } = await supabase
        .from('submissions')
        .update(updateData)
        .eq('id', id)
        .select('*');

      if (error) {
        console.error('SUPABASE UPDATE ERROR:', error);
        throw error;
      }

      console.log('UPDATE RESPONSE:', data);

      // Check if row was actually updated
      if (!data || data.length === 0) {
        throw new Error(
          'No submission was updated. Check your RLS policy and admin permissions.'
        );
      }

      console.log('SUBMISSION UPDATED SUCCESSFULLY');

      // Update UI immediately
      const updatedSubmission = data[0];

      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id
            ? {
                ...sub,
                status:
                  updatedSubmission.status.charAt(0).toUpperCase() +
                  updatedSubmission.status.slice(1),
                reviewed_at: updatedSubmission.reviewed_at,
                reviewed_by: updatedSubmission.reviewed_by
              }
            : sub
        )
      );

      // Update modal if open
      if (selectedSubmission?.id === id) {
        setSelectedSubmission((prev) => ({
          ...prev,
          status:
            updatedSubmission.status.charAt(0).toUpperCase() +
            updatedSubmission.status.slice(1),
          reviewed_at: updatedSubmission.reviewed_at,
          reviewed_by: updatedSubmission.reviewed_by
        }));
      }

      console.log('STATUS UPDATE COMPLETED');
      console.log('==============================');

      return true;
    } catch (error) {
      console.error('UPDATE STATUS ERROR:', error);

      alert(error.message || 'Failed to update submission.');

      return false;
    } finally {
      setUpdating(false);
    }
  };

  // ================================
  // DELETE SUBMISSION
  // ================================

  const handleDeleteSubmission = async (submission) => {
    try {
      setDeleting(true);
      setErrorMsg('');

      console.log('==============================');
      console.log('DELETING SUBMISSION');
      console.log('SUBMISSION ID:', submission.id);
      console.log('USER:', submission.userName);

      if (!submission?.id) {
        throw new Error('Submission ID is missing.');
      }

      // Make sure an authenticated user exists
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error('No user is currently logged in.');
      }

      console.log('LOGGED IN USER:', user.id);

      // Check admin profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('PROFILE ERROR:', profileError);
        throw profileError;
      }

      console.log('CURRENT PROFILE:', profile);

      if (!profile) {
        throw new Error('User profile not found.');
      }

      if (profile.role !== 'admin') {
        throw new Error(
          'You are not authorized to delete submissions.'
        );
      }

      console.log('ADMIN VERIFIED FOR DELETE');

      // Delete selected submission
      const { data, error } = await supabase
        .from('submissions')
        .delete()
        .eq('id', submission.id)
        .select('id');

      if (error) {
        console.error('SUPABASE DELETE ERROR:', error);
        throw error;
      }

      console.log('DELETE RESPONSE:', data);

      // Make sure something was actually deleted
      if (!data || data.length === 0) {
        throw new Error(
          'No submission was deleted. Check your RLS policy and admin permissions.'
        );
      }

      console.log('SUBMISSION DELETED SUCCESSFULLY');

      // Remove from UI immediately
      setSubmissions((prev) =>
        prev.filter((sub) => sub.id !== submission.id)
      );

      // Close confirmation modal
      setDeleteConfirm(null);

      // Close review modal if this submission was open
      if (selectedSubmission?.id === submission.id) {
        setSelectedSubmission(null);
      }

      console.log('DELETE COMPLETED');
      console.log('==============================');
    } catch (error) {
      console.error('DELETE SUBMISSION ERROR:', error);

      alert(error.message || 'Failed to delete submission.');
    } finally {
      setDeleting(false);
    }
  };

  // ================================
  // FILTER SUBMISSIONS
  // ================================

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      String(sub.id)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      String(sub.userName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (sub.numbers || [])
        .join(', ')
        .includes(searchTerm);

    const matchesStatus = statusFilter
      ? sub.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="border-b border-neutral-800/80 pb-6">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100">
          Review Submissions
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Manage user submissions, evaluate sequences, and update approval statuses.
        </p>
      </div>

      {/* ================================
          SUMMARY CARDS
      ================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* TOTAL */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
          <div className="text-xs text-neutral-400 uppercase">
            Total
          </div>

          <div className="text-xl font-bold font-mono text-neutral-100 mt-1">
            {submissions.length}
          </div>
        </div>

        {/* PENDING */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
          <div className="text-xs text-amber-400 uppercase">
            Pending
          </div>

          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            {submissions.filter((s) => s.status === 'Pending').length}
          </div>
        </div>

        {/* APPROVED */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
          <div className="text-xs text-emerald-400 uppercase">
            Approved
          </div>

          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
            {submissions.filter((s) => s.status === 'Approved').length}
          </div>
        </div>

        {/* REJECTED */}
        <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
          <div className="text-xs text-red-400 uppercase">
            Rejected
          </div>

          <div className="text-xl font-bold font-mono text-red-400 mt-1">
            {submissions.filter((s) => s.status === 'Rejected').length}
          </div>
        </div>
      </div>

      {/* ================================
          FILTER CONTROLS
      ================================= */}

      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">

        {/* SEARCH */}
        <div className="relative w-full sm:w-80">

          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search user or numbers..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
          />

        </div>

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* ================================
          LOADING
      ================================= */}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading submissions...
        </div>
      )}

      {/* ================================
          ERROR
      ================================= */}

      {errorMsg && (
        <div className="text-sm text-red-400">
          {errorMsg}
        </div>
      )}

      {/* ================================
          SUBMISSIONS TABLE
      ================================= */}

      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left border-collapse">

            {/* TABLE HEADER */}

            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-950/50 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">

                <th className="py-3 px-4">
                  Ref ID
                </th>

                <th className="py-3 px-4">
                  User
                </th>

                <th className="py-3 px-4">
                  Numbers Submitted
                </th>

                <th className="py-3 px-4">
                  Date
                </th>

                <th className="py-3 px-4">
                  Status
                </th>

                <th className="py-3 px-4 text-right">
                  Actions
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody className="divide-y divide-neutral-800/60 text-xs text-neutral-300 font-normal">

              {!loading && filteredSubmissions.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-neutral-500 text-xs"
                  >
                    No submissions matching criteria.
                  </td>
                </tr>

              ) : (

                filteredSubmissions.map((sub) => (

                  <tr
                    key={sub.id}
                    className="hover:bg-neutral-800/30 transition-colors"
                  >

                    {/* ID */}

                    <td className="py-3.5 px-4 font-mono font-medium text-amber-400">
                      {sub.id}
                    </td>

                    {/* USER */}

                    <td className="py-3.5 px-4 font-medium text-neutral-200">
                      {sub.userName}
                    </td>

                    {/* NUMBERS */}

                    <td className="py-3.5 px-4 font-mono">

                      <div className="flex gap-1">

                        {(sub.numbers || []).map((num, idx) => (

                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-neutral-800 text-amber-300 rounded border border-neutral-700 text-[11px]"
                          >
                            {num}
                          </span>

                        ))}

                      </div>

                    </td>

                    {/* DATE */}

                    <td className="py-3.5 px-4 text-neutral-400">
                      {sub.submittedAt}
                    </td>

                    {/* STATUS */}

                    <td className="py-3.5 px-4">

                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                          sub.status === 'Approved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : sub.status === 'Rejected'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {sub.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="py-3.5 px-4 text-right">

                      <div className="flex items-center justify-end gap-1.5">

                        {/* VIEW */}

                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-amber-400 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* APPROVE */}

                        <button
                          onClick={async () => {
                            await handleUpdateStatus(
                              sub.id,
                              'Approved'
                            );
                          }}
                          disabled={
                            sub.status === 'Approved' ||
                            updating ||
                            deleting
                          }
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-emerald-500/20 text-neutral-400 hover:text-emerald-400 disabled:opacity-30 transition-colors"
                          title="Approve"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>

                        {/* REJECT */}

                        <button
                          onClick={async () => {
                            await handleUpdateStatus(
                              sub.id,
                              'Rejected'
                            );
                          }}
                          disabled={
                            sub.status === 'Rejected' ||
                            updating ||
                            deleting
                          }
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 disabled:opacity-30 transition-colors"
                          title="Reject"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() => setDeleteConfirm(sub)}
                          disabled={updating || deleting}
                          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 disabled:opacity-30 transition-colors"
                          title="Delete Submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================
          REVIEW MODAL
      ================================= */}

      {selectedSubmission && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-md w-full space-y-4">

            {/* MODAL HEADER */}

            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">

              <h3 className="text-sm font-semibold text-neutral-100">
                Review Submission
              </h3>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-neutral-400 hover:text-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            {/* DETAILS */}

            <div className="space-y-3 text-xs text-neutral-300">

              <p>
                <strong className="text-neutral-400">
                  Ref ID:{' '}
                </strong>

                <span className="font-mono text-amber-400">
                  {selectedSubmission.id}
                </span>
              </p>

              <p>
                <strong className="text-neutral-400">
                  User:{' '}
                </strong>

                {selectedSubmission.userName}
              </p>

              <p>
                <strong className="text-neutral-400">
                  Numbers:{' '}
                </strong>

                <span className="font-mono text-amber-400">
                  {selectedSubmission.numbers?.join(', ') ||
                    'No numbers available'}
                </span>
              </p>

              <p>
                <strong className="text-neutral-400">
                  Current Status:{' '}
                </strong>

                {selectedSubmission.status}
              </p>

            </div>

            {/* MODAL ACTIONS */}

            <div className="flex gap-2 pt-2 border-t border-neutral-800">

              {/* APPROVE */}

              <button
                onClick={async () => {
                  const success =
                    await handleUpdateStatus(
                      selectedSubmission.id,
                      'Approved'
                    );

                  if (success) {
                    setSelectedSubmission(null);
                  }
                }}
                disabled={updating || deleting}
                className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-medium text-xs transition-colors"
              >
                {updating ? 'Updating...' : 'Approve'}
              </button>

              {/* REJECT */}

              <button
                onClick={async () => {
                  const success =
                    await handleUpdateStatus(
                      selectedSubmission.id,
                      'Rejected'
                    );

                  if (success) {
                    setSelectedSubmission(null);
                  }
                }}
                disabled={updating || deleting}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-400 disabled:opacity-50 text-neutral-100 font-medium text-xs transition-colors"
              >
                {updating ? 'Updating...' : 'Reject'}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================================
          DELETE CONFIRMATION MODAL
      ================================= */}

      {deleteConfirm && (

        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 max-w-sm w-full space-y-5 shadow-2xl">

            {/* DELETE ICON */}

            <div className="flex justify-center">

              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">

                <Trash2 className="w-5 h-5 text-red-400" />

              </div>

            </div>

            {/* HEADER */}

            <div className="text-center">

              <h3 className="text-base font-semibold text-neutral-100">
                Delete Submission?
              </h3>

              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Are you sure you want to permanently delete this
                submission?
              </p>

            </div>

            {/* SUBMISSION INFO */}

            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs space-y-2">

              <div className="flex justify-between gap-3">

                <span className="text-neutral-500">
                  User
                </span>

                <span className="text-neutral-200 font-medium">
                  {deleteConfirm.userName}
                </span>

              </div>

              <div className="flex justify-between gap-3">

                <span className="text-neutral-500">
                  Numbers
                </span>

                <span className="font-mono text-amber-400">
                  {deleteConfirm.numbers?.join('')}
                </span>

              </div>

              <div className="flex justify-between gap-3">

                <span className="text-neutral-500">
                  Status
                </span>

                <span className="text-neutral-300">
                  {deleteConfirm.status}
                </span>

              </div>

            </div>

            {/* WARNING */}

            <p className="text-[11px] text-red-400 text-center">
              This action cannot be undone.
            </p>

            {/* BUTTONS */}

            <div className="flex gap-2">

              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-200 font-medium text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleDeleteSubmission(deleteConfirm)
                }
                disabled={deleting}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}