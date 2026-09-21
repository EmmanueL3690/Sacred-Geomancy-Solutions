import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LoadingState, EmptyState } from './DataStates';

export default function AdminTable({
  headers = [],
  children,
  isLoading = false,
  isEmpty = false,
  emptyTitle,
  emptyDescription,
  pagination
}) {
  return (
    <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-hidden flex flex-col">
      <div className="overflow-x-auto min-h-[300px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-800 bg-neutral-950/50 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              {headers.map((h, idx) => (
                <th
                  key={idx}
                  className={`py-3.5 px-4 ${h.align === 'right' ? 'text-right' : h.align === 'center' ? 'text-center' : ''}`}
                >
                  {h.label || h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800/60 text-xs text-neutral-300">
            {isLoading ? (
              <tr>
                <td colSpan={headers.length}>
                  <LoadingState rows={5} columns={headers.length} />
                </td>
              </tr>
            ) : isEmpty ? (
              <tr>
                <td colSpan={headers.length}>
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pagination && !isLoading && !isEmpty && (
        <div className="px-4 py-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 bg-neutral-950/30">
          <span>
            Showing <strong className="text-neutral-200">{pagination.from || 1}</strong> to{' '}
            <strong className="text-neutral-200">{pagination.to || 10}</strong> of{' '}
            <strong className="text-neutral-200">{pagination.total || 0}</strong> entries
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={!pagination.hasPrev}
              onClick={pagination.onPrev}
              className="p-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-transparent text-neutral-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={!pagination.hasNext}
              onClick={pagination.onNext}
              className="p-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800 disabled:opacity-40 disabled:hover:bg-transparent text-neutral-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}