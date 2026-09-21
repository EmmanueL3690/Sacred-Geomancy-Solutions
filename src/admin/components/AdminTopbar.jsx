import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Shield, LogOut, User, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminTopbar({ onMenuToggle, adminUser, onLogout }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Fallback defaults if Supabase user object isn't provided yet
  const displayName = adminUser?.name || 'Admin User';
  const displayRole = adminUser?.role || 'Super Admin';
  const displayEmail = adminUser?.email || 'admin@geomancy.solutions';

  const handleLogout = async (e) => {
    e?.preventDefault();
    setIsProfileOpen(false);
    try {
      if (onLogout) {
        await onLogout();
      } else if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Admin logout error:', error);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 h-16 px-4 lg:px-8 flex items-center justify-between">
      {/* Mobile Menu Trigger & Context Heading */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 rounded-lg transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <Shield className="w-3.5 h-3.5 text-amber-500" />
          <span>Management Portal</span>
        </div>
      </div>

      {/* Right Side Actions / Profile Dropdown */}
      <div className="flex items-center gap-3 lg:gap-5">
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-neutral-900 transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-amber-500/30 flex items-center justify-center text-amber-400 font-semibold text-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-medium text-neutral-200 leading-tight">{displayName}</div>
              <div className="text-[10px] text-amber-500/90 font-medium">{displayRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          {/* Profile Menu Overlay */}
          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)} 
              />
              <div className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-20 text-xs text-neutral-300">
                <div className="px-4 py-2 border-b border-neutral-800">
                  <p className="font-medium text-neutral-100">{displayName}</p>
                  <p className="text-[11px] text-neutral-500 truncate">{displayEmail}</p>
                </div>
                
                {/* <a 
                  href="/admin/settings" 
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-neutral-800 text-neutral-300 hover:text-neutral-100 transition-colors"
                >
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>Account Settings</span>
                </a> */}
                
                <div className="my-1 border-t border-neutral-800" />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-red-500/10 text-red-400 transition-colors text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}