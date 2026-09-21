import React from 'react';
import { Search, Filter, ArrowUpDown, CheckCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const NotificationFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  selectedSort,
  onSortChange,
  onMarkAllAsRead,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 rounded-2xl bg-obsidian-900 border border-gold-500/20 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search notifications..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/20 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-500/50 transition-all"
        />
      </div>

      {/* Dropdown Filters & Actions */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
        {/* Category Filter */}
        <div className="relative flex-1 sm:flex-none">
          <div className="flex items-center gap-2 pl-3 bg-obsidian-950 border border-gold-500/20 rounded-xl pr-2">
            <Filter className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <select
              value={selectedFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="py-2.5 text-xs text-neutral-200 bg-transparent focus:outline-none cursor-pointer pr-2"
            >
              <option value="All" className="bg-obsidian-950 text-neutral-200">All Types</option>
              <option value="Unread" className="bg-obsidian-950 text-neutral-200">Unread</option>
              <option value="Read" className="bg-obsidian-950 text-neutral-200">Read</option>
              <option value="announcement" className="bg-obsidian-950 text-neutral-200">Announcements</option>
              <option value="submission_update" className="bg-obsidian-950 text-neutral-200">Submission Updates</option>
              <option value="testimony_approved" className="bg-obsidian-950 text-neutral-200">Testimonies</option>
              <option value="personal_message" className="bg-obsidian-950 text-neutral-200">Personal Messages</option>
            </select>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="relative flex-1 sm:flex-none">
          <div className="flex items-center gap-2 pl-3 bg-obsidian-950 border border-gold-500/20 rounded-xl pr-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="py-2.5 text-xs text-neutral-200 bg-transparent focus:outline-none cursor-pointer pr-2"
            >
              <option value="Newest" className="bg-obsidian-950 text-neutral-200">Newest</option>
              <option value="Oldest" className="bg-obsidian-950 text-neutral-200">Oldest</option>
            </select>
          </div>
        </div>

        {/* Mark All As Read */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onMarkAllAsRead}
          className="whitespace-nowrap shrink-0 text-xs py-2.5"
        >
          <CheckCheck className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
          Mark All As Read
        </Button>
      </div>
    </div>
  );
};