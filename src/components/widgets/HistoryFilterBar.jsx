import React from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export const HistoryFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedSort,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-4 rounded-2xl bg-obsidian-900 border border-gold-500/20 backdrop-blur-md">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by numbers..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-950 border border-gold-500/20 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-gold-500/50 transition-all"
        />
      </div>

      {/* Filters Container */}
      <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
        {/* Status Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <div className="flex items-center gap-2 pl-3 bg-obsidian-950 border border-gold-500/20 rounded-xl pr-2">
            <Filter className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="py-2.5 text-xs text-neutral-200 bg-transparent focus:outline-none cursor-pointer pr-4"
            >
              <option value="All" className="bg-obsidian-950 text-neutral-200">All Statuses</option>
              <option value="Pending Review" className="bg-obsidian-950 text-neutral-200">Pending Review</option>
              <option value="Approved" className="bg-obsidian-950 text-neutral-200">Approved</option>
              <option value="Completed" className="bg-obsidian-950 text-neutral-200">Completed</option>
              <option value="Rejected" className="bg-obsidian-950 text-neutral-200">Rejected</option>
            </select>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-1 sm:flex-none">
          <div className="flex items-center gap-2 pl-3 bg-obsidian-950 border border-gold-500/20 rounded-xl pr-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="py-2.5 text-xs text-neutral-200 bg-transparent focus:outline-none cursor-pointer pr-4"
            >
              <option value="Newest First" className="bg-obsidian-950 text-neutral-200">Newest First</option>
              <option value="Oldest First" className="bg-obsidian-950 text-neutral-200">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};