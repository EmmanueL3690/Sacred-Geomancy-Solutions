import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const DeleteAccountModal = ({ isOpen, onClose, onConfirmDelete }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-md rounded-2xl bg-obsidian-900 border border-red-500/30 p-6 shadow-2xl space-y-5 text-center"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-neutral-400 hover:text-red-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-red-400">
              Delete Your Account?
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Are you sure you want to delete your account? This action cannot be undone and all your submitted guidance history will be permanently erased.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onClose}
              className="w-full justify-center"
            >
              Cancel
            </Button>
            <button
              onClick={onConfirmDelete}
              className="w-full px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-all shadow-lg shadow-red-600/20 cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};