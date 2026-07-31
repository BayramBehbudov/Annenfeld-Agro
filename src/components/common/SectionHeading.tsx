import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  heading: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  heading,
  subtitle,
  align = 'center',
  theme = 'light',
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  const headingColor = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subtitleColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`flex flex-col mb-12 sm:mb-16 ${alignClass}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
          {badge}
        </span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${headingColor}`}>
        {heading}
      </h2>
      <div className={`w-20 h-1.5 mt-4 rounded-full bg-gradient-to-r from-primary-500 to-emerald-400 ${align === 'center' ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg max-w-2xl font-normal leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
