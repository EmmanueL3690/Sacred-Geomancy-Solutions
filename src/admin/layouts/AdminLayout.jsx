import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopbar from '../components/AdminTopbar';

export default function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Sidebar Navigation */}
      <AdminSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={() => setIsMobileSidebarOpen(false)} 
      />

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminTopbar 
          onMenuToggle={() => setIsMobileSidebarOpen(true)} 
        />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}