import React from 'react';
import { SettingsCard } from './SettingsCard';
import { Button } from '../ui/Button';
import { Shield, Key, Lock, Clock } from 'lucide-react';

export const PrivacySecurityCard = ({ lastChanged, onChangePassword }) => {
  return (
    <SettingsCard
      title="Privacy & Security"
      subtitle="Manage your credentials and active sessions"
      icon={Shield}
    >
      <div className="space-y-4">
        {/* 2FA Item */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-gold-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-200">Two-Factor Authentication (2FA)</h4>
              <p className="text-[11px] text-neutral-400">Add an extra layer of protection to your account.</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
            Coming Soon
          </span>
        </div>

        {/* Session Management */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian-950 border border-gold-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-200">Active Sessions</h4>
              <p className="text-[11px] text-neutral-400">Current device: Chrome on macOS (Lagos, Nigeria)</p>
            </div>
          </div>
          <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
            Active Now
          </span>
        </div>

        {/* Change Password */}
        <div className="flex items-center justify-between pt-2 border-t border-gold-500/10">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-gold-500/70" />
            <span>Password Last Changed: <strong className="text-neutral-200">{lastChanged}</strong></span>
          </div>
          <Button variant="secondary" size="sm" onClick={onChangePassword} className="cursor-pointer">
            Change Password
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};