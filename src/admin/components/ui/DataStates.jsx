import React from 'react';
import { Inbox, AlertCircle, RefreshCw } from 'lucide-react';

export function LoadingState({ rows = 5, columns = 5 }) {
  return (
    <div className="w-full space-y-3 p-4 animate-pulse">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex items-center gap-4 py-2 border-b border-neutral-800/40">
          {Array.from({ length: columns }).map((_, cIdx) => (
            <div
              key={cIdx}
              className="h-4 bg-neutral-800/60 rounded flex-1"
              style={{ opacity: 1 - cIdx * 0.15 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title = 'No records found',
  description = 'There are no items matching your criteria at this time.',
  icon: Icon = Inbox,
  action
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-medium text-neutral-200">{title}</h3>
      <p className="text-xs text-neutral-500 mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = 'Failed to load data', description = 'An error occurred while fetching information.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-medium text-neutral-200">{title}</h3>
      <p className="text-xs text-neutral-500 mt-1 max-w-sm">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}