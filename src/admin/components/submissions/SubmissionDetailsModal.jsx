import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Save,
  FileText,
  Hash,
  MessageSquare
} from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function SubmissionDetailsModal({
  submission,
  onClose,
  onUpdateStatus,
  onSaveNotes
}) {
  if (!submission) return null;

  const [notes, setNotes] = useState(submission.notes || '');
  const [currentStatus, setCurrentStatus] = useState(
    submission.consultationStatus || 'Pending'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(submission.id, newStatus);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSaveNotes) {
      onSaveNotes(submission.id, notes, currentStatus);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-950/80 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-2xl h-full bg-neutral-900 border-l border-neutral-800 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {submission.id}
              </span>
              <StatusBadge status={currentStatus} />
            </div>
            <h2 className="text-lg font-semibold text-neutral-100 mt-1">
              Submission Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer Overview */}
          <div className="bg-neutral-950/40 border border-neutral-800/80 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <User className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="font-medium">{submission.userName}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="truncate">{submission.userEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Submitted: {submission.submittedAt}</span>
              </div>
            </div>
          </div>

          {/* Submitted Number Sequences */}
          <div className="bg-neutral-950/40 border border-neutral-800/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-amber-500" />
                Submitted Numbers
              </h3>
              <span className="text-[11px] text-neutral-500 font-mono">
                {submission.numbers.length} digits
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {submission.numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-xl bg-neutral-800/90 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-base shadow-sm"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-neutral-950/40 border border-neutral-800/80 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-neutral-500" />
              Payment Summary
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-neutral-500 block">Amount Paid</span>
                <span className="font-mono text-neutral-200 font-semibold text-sm">
                  {submission.amount}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block">Payment Status</span>
                <div className="mt-0.5">
                  <StatusBadge status={submission.paymentStatus} />
                </div>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 block">Payment Reference</span>
                <span className="font-mono text-neutral-400 text-[11px]">
                  PAY-{submission.id}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Status Setter Buttons */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
              Update Consultation Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('Pending')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  currentStatus === 'Pending'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Pending
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('In Progress')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  currentStatus === 'In Progress'
                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                    : 'bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                In Progress
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('Completed')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  currentStatus === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('Rejected')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-lg text-xs font-medium border transition-colors ${
                  currentStatus === 'Rejected'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:text-neutral-200'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                Rejected
              </button>
            </div>
          </div>

          {/* Admin Consultation Notes */}
          <div className="space-y-2">
            <label
              htmlFor="consultationNotes"
              className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
              Admin Consultation Notes & Findings
            </label>
            <textarea
              id="consultationNotes"
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write internal consultation analysis, customer feedback, or instructions..."
              className="w-full rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-200 focus:outline-none focus:border-amber-500/50 resize-none font-sans"
            />
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors shadow-lg shadow-amber-500/10"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved Changes!' : 'Save Notes & Status'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}