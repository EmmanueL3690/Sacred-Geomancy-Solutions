import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminUsersPage from '../pages/AdminUsersPage';
import AdminSubmissionsPage from '../pages/AdminSubmissionsPage';
import AdminPaymentsPage from '../pages/AdminPaymentsPage';
import AdminTestimonialsPage from '../pages/AdminTestimonialsPage';
import AdminNotificationsPage from '../pages/AdminNotificationsPage';
import AdminActivityLogsPage from '../pages/AdminActivityLogsPage';
import AdminSettingsPage from '../pages/AdminSettingsPage';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="submissions" element={<AdminSubmissionsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="activity-logs" element={<AdminActivityLogsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
}