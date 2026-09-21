import React from 'react';

export default function AdminPageHeader({ title, description, actions, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800/80 pb-6 mb-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-100">{title}</h1>
        {description && <p className="text-xs sm:text-sm text-neutral-400 mt-1">{description}</p>}
      </div>
      {(actions || children) && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
          {children}
        </div>
      )}
    </div>
  );
}