import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// UI Primitives & Widgets
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/widgets/StatCard';
import { NotificationCard } from '../../components/widgets/NotificationCard';
import { NotificationFilterBar } from '../../components/widgets/NotificationFilterBar';
import { NotificationModal } from '../../components/widgets/NotificationModal';
import { EmptyNotificationState } from '../../components/widgets/EmptyNotificationState';

// Data
import { notificationStatsData, mockNotifications } from '../../data/Notifications1';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const Notifications = () => {
  const navigate = useNavigate();

  // Notifications State
  const [notificationsList, setNotificationsList] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [activeNotification, setActiveNotification] = useState(null);

  // Unread Count calculation
  const unreadCount = useMemo(() => {
    return notificationsList.filter((n) => !n.read).length;
  }, [notificationsList]);

  // Mark single as read when clicked
  const handleSelectNotification = (item) => {
    setActiveNotification(item);

    if (!item.read) {
      setNotificationsList((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
      );
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Filter & Sort Logic
  const filteredNotifications = useMemo(() => {
    return notificationsList
      .filter((n) => {
        // Dropdown filter
        if (selectedFilter === 'Unread') return !n.read;
        if (selectedFilter === 'Read') return n.read;
        if (selectedFilter !== 'All' && n.type !== selectedFilter) return false;

        // Search query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          return (
            n.title.toLowerCase().includes(q) ||
            n.message.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (selectedSort === 'Oldest') {
          return a.id.localeCompare(b.id);
        }
        return b.id.localeCompare(a.id); // Newest
      });
  }, [notificationsList, searchQuery, selectedFilter, selectedSort]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-6xl mx-auto"
    >
      {/* Section 1: Hero Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-gold-500 pl-4 py-1">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                Notifications
              </h1>
              <Badge variant="gold" className="text-xs">
                Unread: {unreadCount}
              </Badge>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Stay updated with announcements, submission updates and personal messages.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Statistics Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {notificationStatsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.id === 'stat-unread' ? String(unreadCount) : stat.value}
            icon={stat.icon}
          />
        ))}
      </motion.div>

      {/* Section 3: Notification Toolbar */}
      <motion.div variants={itemVariants}>
        <NotificationFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          onMarkAllAsRead={handleMarkAllAsRead}
        />
      </motion.div>

      {/* Section 4: Notification List or Empty State */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <EmptyNotificationState onReturnDashboard={() => navigate('/app')} />
        ) : (
          <AnimatePresence mode="wait">
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleSelectNotification(notification)}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </motion.div>

      {/* Section 5: Notification Details Modal */}
      <NotificationModal
        isOpen={Boolean(activeNotification)}
        onClose={() => setActiveNotification(null)}
        notification={activeNotification}
      />
    </motion.div>
  );
};

export default Notifications;