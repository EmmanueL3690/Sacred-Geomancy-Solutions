import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export const ToastNotification = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-obsidian-900 border border-gold-500/40 text-gold-300 shadow-2xl shadow-black/80"
      >
        <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
        <span className="text-xs font-semibold">{message}</span>
        <button onClick={onClose} className="text-neutral-400 hover:text-gold-300 ml-2">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};