import React from 'react';

export const SubmissionPreview = ({ numbers = ['', '', '', ''] }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-obsidian-950/80 border border-gold-500/20 my-4 shadow-inner">
      <span className="text-xs uppercase tracking-widest text-gold-500/70 font-semibold mb-3">
        Submission Live Preview
      </span>
      
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {numbers.map((num, idx) => (
          <React.Fragment key={idx}>
            <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-obsidian-900 border border-gold-500/40 flex items-center justify-center text-xl sm:text-2xl font-serif font-bold text-gold-300 shadow-md transition-all">
              {num !== '' ? num : '—'}
            </div>
            {idx < 3 && (
              <span className="text-gold-500/50 text-xl font-serif">·</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};