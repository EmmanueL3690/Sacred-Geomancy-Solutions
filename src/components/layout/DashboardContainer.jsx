import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileHeader } from './MobileHeader';
import { BottomNavigation } from './BottomNavigation';

export const DashboardContainer = ({
  pageTitle = 'Dashboard',
  pageSubtitle,
  onLogout,
  className = '',
}) => {
  return (
    <div className="min-h-screen bg-obsidian-950 text-neutral-100 flex flex-col lg:flex-row font-sans">
      {/* Desktop Sidebar */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Mobile Header */}
        <MobileHeader />

        {/* Desktop Top Header */}
        <TopHeader title={pageTitle} subtitle={pageSubtitle} />

        {/* Main Section Canvas for Nested Routes */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto ${className}`}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};