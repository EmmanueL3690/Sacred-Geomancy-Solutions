import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const SubmissionSuccessModal = ({
  isOpen,
  onClose,
  onViewHistory,
  onSubmitAnother,
  submittedNumbers = [4, 7, 2, 9],
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-2xl bg-obsidian-900 border border-gold-500/30 p-6 sm:p-8 shadow-2xl shadow-black/80 text-center overflow-hidden"
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon Badge */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
            Submission Successful
          </h3>

          <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
            Your four numbers have been submitted successfully and are now awaiting review. You will receive a notification once guidance is available.
          </p>

          {/* Sequence Preview */}
          <div className="my-6 py-3 px-4 rounded-xl bg-obsidian-950 border border-gold-500/20 inline-flex items-center justify-center gap-3">
            {submittedNumbers.map((num, i) => (
              <span key={i} className="text-lg font-serif font-bold text-gold-300">
                {num} {i < 3 ? '•' : ''}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              variant="primary"
              size="md"
              onClick={onViewHistory}
              className="w-full justify-center"
            >
              View Submission History
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onSubmitAnother}
              className="w-full justify-center"
            >
              Submit Another
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};