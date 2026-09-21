import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, FileText, Hash } from 'lucide-react';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';
import { Button } from '../ui/Button';

export const SubmissionDetailsModal = ({ isOpen, onClose, submission }) => {
  if (!isOpen || !submission) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl bg-obsidian-900 border border-gold-500/30 p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gold-500/15">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-gold-400" />
              <h3 className="text-lg font-serif font-bold text-gold-300">
                Submission {submission.id}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Numbers Sequence Preview */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-obsidian-950 border border-gold-500/20">
            <span className="text-[10px] uppercase tracking-widest text-gold-500/70 font-semibold mb-3">
              Submitted Four-Digit Sequence
            </span>
            <div className="flex items-center gap-3">
              {submission.numbers.map((num, i) => (
                <React.Fragment key={i}>
                  <div className="w-12 h-14 rounded-xl bg-obsidian-900 border border-gold-500/40 flex items-center justify-center text-xl font-serif font-bold text-gold-300 shadow-inner">
                    {num}
                  </div>
                  {i < 3 && <span className="text-gold-500/50 font-serif">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 py-2 border-y border-gold-500/10 text-xs">
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
              <div>
                <p className="text-[10px] text-neutral-500 uppercase">Date</p>
                <p className="font-medium">{submission.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-neutral-300">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <div>
                <p className="text-[10px] text-neutral-500 uppercase">Time</p>
                <p className="font-medium">{submission.time}</p>
              </div>
            </div>
          </div>

          {/* Review Status & Admin Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Current Status</span>
              <SubmissionStatusBadge status={submission.status} />
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/15 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold-400">
                <FileText className="w-3.5 h-3.5" />
                <span>Admin Review Notes</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {submission.notes || "No additional comments attached."}
              </p>
            </div>
          </div>

          <Button variant="secondary" size="md" onClick={onClose} className="w-full justify-center">
            Close Details
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};