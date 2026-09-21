import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const SecurityCard = ({ onPasswordUpdateSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!currentPassword) newErrors.currentPassword = 'Current password is required.';
    if (!newPassword) {
      newErrors.newPassword = 'New password is required.';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters.';
    }
    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onPasswordUpdateSuccess();
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  return (
    <Card className="space-y-6">
      <div className="pb-3 border-b border-gold-500/15">
        <h3 className="text-lg font-serif font-bold text-gold-300 flex items-center gap-2">
          <Lock className="w-5 h-5 text-gold-400" />
          Security & Password
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Change your account password to ensure maximum security.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 focus:outline-none transition-all ${
                errors.currentPassword ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-gold-400"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-[10px] text-red-400 font-medium">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 focus:outline-none transition-all ${
                errors.newPassword ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-gold-400"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Strength Meter */}
          {newPassword && (
            <div className="space-y-1 pt-1">
              <div className="flex gap-1 h-1.5 w-full bg-obsidian-950 rounded-full overflow-hidden p-0.5 border border-gold-500/10">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    strengthScore <= 1
                      ? 'w-1/4 bg-red-500'
                      : strengthScore === 2
                      ? 'w-2/4 bg-amber-500'
                      : strengthScore === 3
                      ? 'w-3/4 bg-emerald-500'
                      : 'w-full bg-gold-400'
                  }`}
                />
              </div>
              <p className="text-[10px] text-neutral-400 text-right">
                Strength:{' '}
                <span className="font-semibold text-gold-300">
                  {strengthScore <= 1 ? 'Weak' : strengthScore === 2 ? 'Medium' : strengthScore === 3 ? 'Strong' : 'Very Strong'}
                </span>
              </p>
            </div>
          )}
          {errors.newPassword && (
            <p className="text-[10px] text-red-400 font-medium">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 focus:outline-none transition-all ${
                errors.confirmPassword ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-gold-400"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[10px] text-red-400 font-medium">{errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" variant="primary" size="sm" className="w-full justify-center py-2.5 cursor-pointer">
          <ShieldCheck className="w-4 h-4 mr-1.5" />
          Update Password
        </Button>
      </form>
    </Card>
  );
};