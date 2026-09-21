import React from 'react';

export const SectionTitle = ({
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignment = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={`flex flex-col ${alignment[align]} ${className}`}>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 tracking-wide">
        {title}
      </h2>
      <div className="h-0.5 w-12 bg-gradient-to-r from-gold-500 to-transparent my-2 rounded-full" />
      {subtitle && (
        <p className="text-sm text-neutral-400 max-w-xl">{subtitle}</p>
      )}
    </div>
  );
};