import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AlertOctagon, LogOut, Trash2 } from 'lucide-react';

export const DangerZone = ({ onLogout, onDeleteAccount }) => {
  return (
    <Card className="border-red-500/30 bg-red-950/10 space-y-4">
      <div className="pb-3 border-b border-red-500/20 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
          <AlertOctagon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-serif font-bold text-red-400">
            Danger Zone
          </h3>
          <p className="text-xs text-neutral-400">
            Irreversible actions regarding your account session and data
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-xs font-bold text-neutral-200">Account Actions</h4>
          <p className="text-[11px] text-neutral-400">Sign out or request permanent account deletion.</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onLogout}
            className="w-full sm:w-auto justify-center cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            Logout
          </Button>

          <button
            type="button"
            onClick={onDeleteAccount}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-semibold transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Account
          </button>
        </div>
      </div>
    </Card>
  );
};