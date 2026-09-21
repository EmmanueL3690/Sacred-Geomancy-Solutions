import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export const MobileHeader = ({ onOpenMenu, onLogout, className = '' }) => {
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
    <header
      className={`lg:hidden flex items-center justify-between h-16 px-4 bg-obsidian-950/90 border-b border-gold-500/20 backdrop-blur-md sticky top-0 z-40 ${className}`}
    >
      {/* Logo & Brand Title */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl overflow-hidden border border-gold-500/30 bg-gold-500/10 shrink-0 flex items-center justify-center">
          <img
            src="/logo23.jpg"
            alt="Geomancy Solutions Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <span className="font-serif font-bold text-base text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 block leading-tight">
            GEOMANCY
          </span>
          <p className="text-[8px] uppercase tracking-widest text-gold-500/60 font-medium">
            Solutions
          </p>
        </div>
      </div>

      {/* Right Actions / Logout & Mobile Menu */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleLogout}
          aria-label="Logout"
          className="p-2 rounded-2xl bg-obsidian-900 border border-gold-500/20 text-red-400 hover:text-red-300 hover:border-red-500/30 hover:bg-red-950/20 cursor-pointer transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>

        {onOpenMenu && (
          <button
            onClick={onOpenMenu}
            aria-label="Open Menu"
            className="p-2 rounded-2xl bg-obsidian-900 border border-gold-500/20 text-gold-400 cursor-pointer hover:border-gold-500/40 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;