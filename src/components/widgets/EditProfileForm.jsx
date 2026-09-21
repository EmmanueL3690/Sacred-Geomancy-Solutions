import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { User, Phone, Globe, MapPin, FileText, Mail, Save, RotateCcw } from 'lucide-react';

export const EditProfileForm = ({ user, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    phone: user.phone || '',
    gender: user.gender || '',
    country: user.country || '',
    city: user.city || '',
    bio: user.bio || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: user.fullName || '',
      phone: user.phone || '',
      gender: user.gender || '',
      country: user.country || '',
      city: user.city || '',
      bio: user.bio || '',
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSaveSuccess(formData);
  };

  return (
    <Card className="space-y-6">
      <div className="pb-3 border-b border-gold-500/15">
        <h3 className="text-lg font-serif font-bold text-gold-300">
          Personal Details
        </h3>
        <p className="text-xs text-neutral-400 mt-0.5">
          Update your personal details and location.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold-400" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 focus:outline-none transition-all ${
                errors.fullName ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
              }`}
            />
            {errors.fullName && <p className="text-[10px] text-red-400 font-medium">{errors.fullName}</p>}
          </div>

          {/* Email (Read Only) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-400 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              Email Address (Read-only)
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950/50 border border-neutral-800 text-xs text-neutral-500 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              Phone Number *
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border text-xs text-neutral-200 focus:outline-none transition-all ${
                errors.phone ? 'border-red-500' : 'border-gold-500/30 focus:border-gold-500'
              }`}
            />
            {errors.phone && <p className="text-[10px] text-red-400 font-medium">{errors.phone}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">
              Gender (Optional)
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500 cursor-pointer"
            >
              <option value="" className="bg-obsidian-950 text-neutral-200">Select Gender</option>
              <option value="Male" className="bg-obsidian-950 text-neutral-200">Male</option>
              <option value="Female" className="bg-obsidian-950 text-neutral-200">Female</option>
              <option value="Prefer not to say" className="bg-obsidian-950 text-neutral-200">Prefer not to say</option>
            </select>
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              Country
            </label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              placeholder="e.g. United States"
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold-400" />
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="e.g. Los Angeles"
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* Short Bio */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gold-400" />
            Short Bio (Optional)
          </label>
          <textarea
            rows={3}
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="Tell us a little about your spiritual journey..."
            className="w-full p-3.5 rounded-xl bg-obsidian-950 border border-gold-500/30 text-xs text-neutral-200 focus:outline-none focus:border-gold-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-gold-500/10">
          <Button type="button" variant="secondary" size="sm" onClick={handleReset} className="cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset
          </Button>
          <Button type="submit" variant="primary" size="sm" className="cursor-pointer">
            <Save className="w-3.5 h-3.5 mr-1.5" />
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};