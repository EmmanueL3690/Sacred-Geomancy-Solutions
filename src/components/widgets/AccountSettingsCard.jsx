import React from 'react';
import { SettingsCard } from './SettingsCard';
import { Button } from '../ui/Button';
import { User, Mail, Phone, Calendar, ArrowRight } from 'lucide-react';

export const AccountSettingsCard = ({ account, onGoToProfile }) => {
  return (
    <SettingsCard
      title="Account Overview"
      subtitle="Your essential account details"
      icon={User}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/15 space-y-1">
          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
            <User className="w-3 h-3 text-gold-400" /> Full Name
          </span>
          <p className="text-xs font-semibold text-neutral-200">{account.fullName}</p>
        </div>

        <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/15 space-y-1">
          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
            <Mail className="w-3 h-3 text-gold-400" /> Email Address
          </span>
          <p className="text-xs font-semibold text-neutral-200 truncate">{account.email}</p>
        </div>

        <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/15 space-y-1">
          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
            <Phone className="w-3 h-3 text-gold-400" /> Phone Number
          </span>
          <p className="text-xs font-semibold text-neutral-200">{account.phone}</p>
        </div>

        <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/15 space-y-1">
          <span className="text-[10px] text-neutral-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gold-400" /> Member Since
          </span>
          <p className="text-xs font-semibold text-neutral-200">{account.memberSince}</p>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button variant="secondary" size="sm" onClick={onGoToProfile} className="cursor-pointer">
          Go To Profile
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-gold-400" />
        </Button>
      </div>
    </SettingsCard>
  );
};