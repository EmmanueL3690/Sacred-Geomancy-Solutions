import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import { NotificationBadge, NOTIFICATION_TYPES } from './NotificationBadge';
import { Button } from '../ui/Button';

export const NotificationModal = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) return null;

  const config = NOTIFICATION_TYPES[notification.type] || {};
  const IconComponent = config.icon;

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
          <div className="flex items-start justify-between pb-4 border-b border-gold-500/15 gap-4">
            <div className="flex items-center gap-3">
              {IconComponent && (
                <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
              )}
              <div>
                <NotificationBadge type={notification.type} />
                <h3 className="text-lg font-serif font-bold text-gold-200 mt-1">
                  {notification.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-gold-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Full Message Body */}
          <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/15">
            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
              {notification.message}
            </p>
          </div>

          {/* Timestamp Info */}
          <div className="flex items-center gap-6 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{notification.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{notification.time}</span>
            </div>
          </div>

          <Button variant="secondary" size="md" onClick={onClose} className="w-full justify-center">
            Close Notification
          </Button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};