import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { Button } from '../ui/Button';

export const EmptyTestimonyState = ({ onShareFirst }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl bg-obsidian-900 border border-gold-500/20 my-6 space-y-4">
      <div className="p-4 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400">
        <MessageSquareQuote className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-serif font-bold text-gold-300">
        No Testimonies Yet
      </h3>
      <p className="text-sm text-neutral-400 max-w-md">
        You haven't shared your experience yet. Submit your first story to inspire others in the community.
      </p>
      <Button variant="primary" size="md" onClick={onShareFirst} className="mt-2">
        Share Your First Testimony
      </Button>
    </div>
  );
};