import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

// UI Primitives & Components
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/widgets/StatCard';
import { ProfileCard } from '../../components/widgets/ProfileCard';
import { EditProfileForm } from '../../components/widgets/EditProfileForm';
import { SecurityCard } from '../../components/widgets/SecurityCard';
import { ActivityList } from '../../components/widgets/ActivityList';
import { DeleteAccountModal } from '../../components/widgets/DeleteAccountModal';
import { ToastNotification } from '../../components/widgets/ToastNotification';

// Data
import { mockUserProfile, profileStatsData } from '../../data/profile1';
import { mockActivities } from '../../data/activity';

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

export const Profile = () => {
  const [userProfile, setUserProfile] = useState(mockUserProfile);
  const [activitiesList, setActivitiesList] = useState(mockActivities);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Profile Save
  const handleProfileSave = (updatedData) => {
    setUserProfile((prev) => ({ ...prev, ...updatedData }));
    
    // Add new activity log
    const newAct = {
      id: `act-${Date.now()}`,
      title: 'Updated Profile Information',
      date: 'August 3, 2026',
      time: '05:46 PM',
    };
    setActivitiesList((prev) => [newAct, ...prev]);

    triggerToast('Profile updated successfully.');
  };

  // Password Update
  const handlePasswordUpdate = () => {
    triggerToast('Password updated successfully.');
  };

  // Change Photo Placeholder
  const handleEditPhoto = () => {
    triggerToast('Profile photo selection triggered.');
  };

  // Confirm Account Delete
  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    triggerToast('Account deletion request queued.');
  };

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
                My Profile
              </h1>
              <Badge variant="gold" className="text-xs">
                Member Since: {userProfile.memberSince}
              </Badge>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Manage your account information and personalize your experience.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Profile Summary Card */}
      <motion.div variants={itemVariants}>
        <ProfileCard user={userProfile} onEditPhoto={handleEditPhoto} />
      </motion.div>

      {/* Section 3: Account Statistics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {profileStatsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </motion.div>

      {/* Section 4 & 5 & 6 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: Edit Profile Form */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <EditProfileForm user={userProfile} onSaveSuccess={handleProfileSave} />
        </motion.div>

        {/* Right Column: Security & Activity */}
        <motion.div variants={itemVariants} className="space-y-6">
          <SecurityCard onPasswordUpdateSuccess={handlePasswordUpdate} />
          <ActivityList activities={activitiesList} />

          {/* Section 7: Danger Zone */}
          <Card className="border-red-500/20 bg-red-950/10 space-y-3">
            <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider">
              Danger Zone
            </h4>
            <p className="text-xs text-neutral-400">
              Permanently remove your account and all associated submissions.
            </p>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 font-semibold text-xs transition-all cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </Card>
        </motion.div>
      </div>

      {/* Section 7 Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleConfirmDelete}
      />

      {/* Success Toast */}
      <ToastNotification
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </motion.div>
  );
};

export default Profile;