import React from 'react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Mail, Phone, Calendar } from 'lucide-react';

export const ProfileSummaryCard = ({
  name,
  role = "Member",
  email,
  phone,
  memberSince,
  avatarSrc,
  onEditProfile,
  className = "",
}) => {
  return (
    <Card className={`flex flex-col items-center text-center ${className}`}>
      <Avatar
        src={avatarSrc}
        alt={name}
        fallback={name?.substring(0, 2)}
        size="lg"
        className="mb-3 ring-2 ring-gold-500/30"
      />

      <h3 className="text-lg font-serif font-bold text-neutral-100">{name}</h3>
      <Badge variant="gold" className="mt-1 text-[10px]">
        {role}
      </Badge>

      <div className="w-full my-5 py-3 border-y border-gold-500/10 flex flex-col gap-2.5 text-xs text-left">
        {email && (
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Mail className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="truncate">{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Phone className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{phone}</span>
          </div>
        )}
        {memberSince && (
          <div className="flex items-center gap-2.5 text-neutral-300">
            <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Member since {memberSince}</span>
          </div>
        )}
      </div>

      {onEditProfile && (
        <Button variant="secondary" size="sm" onClick={onEditProfile} className="w-full">
          Edit Profile
        </Button>
      )}
    </Card>
  );
};