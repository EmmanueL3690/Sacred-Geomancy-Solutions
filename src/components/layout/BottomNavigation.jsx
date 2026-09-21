import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Binary, History } from 'lucide-react';

const defaultNavItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/app' },
  { label: 'Submit Numbers', icon: Binary, path: '/app/submit' },
  { label: 'Submission History', icon: History, path: '/app/history' },
];

export const BottomNavigation = ({ navItems = defaultNavItems, className = '' }) => {
  return (
    <nav
      className={`lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-obsidian-950/95 border-t border-gold-500/20 backdrop-blur-lg flex items-center justify-around px-2 z-40 ${className}`}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/app'} // Ensures exact matching for Dashboard link
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'text-gold-300 font-medium'
                  : 'text-neutral-500 hover:text-gold-400/70'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`p-1 rounded-2xl transition-all ${
                    isActive ? 'bg-gold-500/15 border border-gold-500/40' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-wider whitespace-nowrap">{item.label}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;