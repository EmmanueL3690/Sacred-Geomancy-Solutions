import React from 'react';
import { SettingsCard } from './SettingsCard';
import { HardDrive, Image, Folder } from 'lucide-react';

export const StorageInfoCard = ({ storage }) => {
  return (
    <SettingsCard
      title="Storage Information"
      subtitle="Overview of cached media and resources"
      icon={HardDrive}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-obsidian-950 border border-gold-500/15">
          <Image className="w-4 h-4 text-gold-400" />
          <div>
            <p className="text-[10px] text-neutral-400">Profile Image Usage</p>
            <p className="text-xs font-bold text-neutral-200">{storage.profileImageUsage}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-obsidian-950 border border-gold-500/15">
          <Folder className="w-4 h-4 text-gold-400" />
          <div>
            <p className="text-[10px] text-neutral-400">Documents</p>
            <p className="text-xs font-bold text-neutral-200">{storage.documents}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-obsidian-950 border border-gold-500/15">
          <HardDrive className="w-4 h-4 text-gold-400" />
          <div>
            <p className="text-[10px] text-neutral-400">Application Version</p>
            <p className="text-xs font-bold text-gold-300">{storage.appVersion}</p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};