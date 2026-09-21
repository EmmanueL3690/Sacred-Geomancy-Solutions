import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, MessageSquareQuote } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { Button } from '../ui/Button';

export const TestimonyDetailsModal = ({ isOpen, onClose, testimony }) => {
  if (!isOpen || !testimony) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl bg-obsidian-900 border border-gold-500/30 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex items-start justify-between pb-4 border-b border-gold-500/15 gap-4">
            <div>
              <RatingStars rating={testimony.rating} size="md" />
              <h3 className="text-lg font-serif font-bold text-gold-300 mt-2">
                {testimony.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/15">
            <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-line">
              "{testimony.message}"
            </p>
          </div>

          {testimony.adminFeedback && (
            <div className="p-4 rounded-xl bg-gold-500/5 border border-gold-500/20 space-y-1">
              <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-wider">
                Admin Feedback
              </span>
              <p className="text-xs text-neutral-300">{testimony.adminFeedback}</p>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold-400" />
              <span>{testimony.createdAt}</span>
            </div>
            <span className="font-semibold text-gold-300">By {testimony.name}</span>
          </div>

          <Button variant="secondary" size="md" onClick={onClose} className="w-full justify-center">
            Close
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const TestimonySuccessModal = ({ isOpen, onClose, onViewMyTestimonies, onBackDashboard }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-2xl bg-obsidian-900 border border-gold-500/30 p-6 sm:p-8 shadow-2xl text-center space-y-5"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
              Thank You!
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Your testimony has been submitted successfully. It will be reviewed by our team before being published.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="primary" size="md" onClick={onViewMyTestimonies} className="w-full justify-center">
              View My Testimonies
            </Button>
            <Button variant="secondary" size="md" onClick={onBackDashboard} className="w-full justify-center">
              Back to Dashboard
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};