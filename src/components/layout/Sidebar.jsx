import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Binary, History, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const minimalNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/app' },
  { label: 'Submit Numbers', icon: Binary, path: '/app/submit' },
  { label: 'Submission History', icon: History, path: '/app/history' },
];

export const Sidebar = ({ navItems = minimalNavItems, onLogout, className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      if (onLogout) {
        await onLogout();
      } else if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      navigate('/login', { replace: true });
    }
  };

  return (
    <aside
      className={`hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-obsidian-950 border-r border-gold-500/20 p-5 justify-between select-none overflow-y-auto ${className}`}
    >
      {/* Brand Header & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2 mb-6">
          <div className="w-10 h-10 rounded-2xl overflow-hidden border border-gold-500/30 bg-gold-500/10 shrink-0 flex items-center justify-center">
            <img
              src="/logo23.jpg"
              alt="Geomancy Solutions Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wider">
              GEOMANCY
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-gold-500/60 font-medium">
              Solutions
            </p>
          </div>
        </div>

        <div className="my-4 border-t border-gold-500/20" />

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'} // Prevents Dashboard from highlighting on sub-routes
                className={({ isActive }) =>
                  `relative flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-gold-500/15 to-transparent text-gold-300 border-l-2 border-gold-500 shadow-md shadow-gold-500/5'
                      : 'text-neutral-400 hover:text-gold-400 hover:bg-obsidian-900/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="pt-4 border-t border-gold-500/20 flex flex-col gap-3 mt-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-medium text-red-400/80 hover:text-red-400 hover:bg-red-950/30 border border-transparent hover:border-red-500/20 transition-all cursor-pointer w-full text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;