import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// UI Primitives & Widgets
import { Badge } from '../../components/ui/Badge';
import { AccountSettingsCard } from '../../components/widgets/AccountSettingsCard';
import { NotificationSettings } from '../../components/widgets/NotificationSettings';
import { AppearanceCard } from '../../components/widgets/AppearanceCard';
import { PrivacySecurityCard } from '../../components/widgets/PrivacySecurityCard';
import { PreferenceCard } from '../../components/widgets/PreferenceCard';
import { SupportCard } from '../../components/widgets/SupportCard';
import { StorageInfoCard } from '../../components/widgets/StorageInfoCard';
import { DangerZone } from '../../components/widgets/DangerZone';
import { DeleteAccountModal } from '../../components/widgets/DeleteAccountModal';
import { ToastNotification } from '../../components/widgets/ToastNotification';


// Data
import { initialSettingsData } from '../../data/settings';

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

export const Settings = () => {
  const navigate = useNavigate();
  const [settingsState, setSettingsState] = useState(initialSettingsData);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg = 'Settings updated successfully.') => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Notification Toggles
  const handleNotificationToggle = (key, value) => {
    setSettingsState((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
    triggerToast();
  };

  // Preference Selects
  const handlePreferenceChange = (key, value) => {
    setSettingsState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
    triggerToast();
  };

  // Action handlers
  const handleGoToProfile = () => {
    navigate('/app/profile');
  };

  const handleChangePassword = () => {
    navigate('/app/profile');
  };

  const handleSupportAction = (title) => {
    triggerToast(`Opened ${title}`);
  };

  const handleLogout = () => {
    triggerToast('Logged out successfully.');
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    triggerToast('Account deletion request received.');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-6xl mx-auto pb-12"
    >
      {/* Section 1: Hero Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-gold-500 pl-4 py-1">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                Settings
              </h1>
              <Badge variant="gold" className="text-xs">
                Account Status: {settingsState.account.status}
              </Badge>
            </div>
            <p className="text-sm text-neutral-400 mt-1">
              Manage your account preferences, security and notifications.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section 2: Account Settings Card */}
      <motion.div variants={itemVariants}>
        <AccountSettingsCard
          account={settingsState.account}
          onGoToProfile={handleGoToProfile}
        />
      </motion.div>

      {/* Section 3: Notification Preferences */}
      <motion.div variants={itemVariants}>
        <NotificationSettings
          notifications={settingsState.notifications}
          onToggle={handleNotificationToggle}
        />
      </motion.div>

      {/* Section 4: Appearance */}
      <motion.div variants={itemVariants}>
      <AppearanceCard
        onThemeChangeSuccess={(msg) => triggerToast(msg)}
      />
    </motion.div>

      {/* Section 5: Privacy & Security */}
      <motion.div variants={itemVariants}>
        <PrivacySecurityCard
          lastChanged={settingsState.account.passwordLastChanged}
          onChangePassword={handleChangePassword}
        />
      </motion.div>

      {/* Section 6: Application Preferences */}
      <motion.div variants={itemVariants}>
        <PreferenceCard
          preferences={settingsState.preferences}
          onChange={handlePreferenceChange}
        />
      </motion.div>

      {/* Section 7: Support */}
      <motion.div variants={itemVariants}>
        <SupportCard onAction={handleSupportAction} />
      </motion.div>

      {/* Section 8: Storage Information */}
      <motion.div variants={itemVariants}>
        <StorageInfoCard storage={settingsState.storage} />
      </motion.div>

      {/* Section 9: Danger Zone */}
      <motion.div variants={itemVariants}>
        <DangerZone
          onLogout={handleLogout}
          onDeleteAccount={() => setShowDeleteModal(true)}
        />
      </motion.div>

      {/* Confirmation Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
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

export default Settings;