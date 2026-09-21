import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const navigationItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Submissions', path: '/admin/submissions', icon: FileText }
];

export default function AdminSidebar({ isOpen, onClose, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isLinkActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = async (e) => {
    e?.preventDefault();
    try {
      if (onLogout) {
        await onLogout();
      } else if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Admin logout error:', error);
    } finally {
      if (onClose) onClose();
      navigate('/login', { replace: true });
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-neutral-950 text-neutral-200 border-r border-neutral-800/80">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-800/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30 bg-amber-500/10 shrink-0 flex items-center justify-center">
            <img
              src="/logo23.jpg"
              alt="Geomancy Admin Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-semibold text-sm tracking-wide text-neutral-100">GEOMANCY ADMIN</h1>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-neutral-400 hover:text-neutral-100 transition-colors p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isLinkActive(item);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  active
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : 'text-neutral-400'}`} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout Action */}
      <div className="p-4 border-t border-neutral-800/80">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <aside className="relative w-72 max-w-[80vw] h-full z-10 shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}