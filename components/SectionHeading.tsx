import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 md:mb-12 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
