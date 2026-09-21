import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Camera, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export const ProfileCard = ({ user, onEditPhoto }) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 border-gold-500/30 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar with Edit Overlay */}
        <div className="relative group shrink-0">
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gold-500/50 shadow-xl shadow-black/60"
          />
          <button
            onClick={onEditPhoto}
            className="absolute inset-0 bg-obsidian-950/70 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer text-gold-300"
            title="Change Profile Picture"
          >
            <Camera className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">Change</span>
          </button>
        </div>

        {/* User Info Overview */}
        <div className="flex-1 text-center sm:text-left space-y-3">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-gold-300">
                {user.fullName}
              </h2>
              <span className="inline-flex items-center gap-1 self-center sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <ShieldCheck className="w-3 h-3 text-gold-400" />
                {user.membershipStatus}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 max-w-xl">
              {user.bio || 'No bio specified.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gold-500/15 text-xs text-neutral-300">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>Member since {user.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Change Photo Button for Mobile/Tablet */}
        <div className="sm:hidden w-full">
          <Button variant="secondary" size="sm" onClick={onEditPhoto} className="w-full justify-center">
            <Camera className="w-3.5 h-3.5 mr-2" />
            Edit Photo
          </Button>
        </div>
      </div>
    </Card>
  );
};