'use client';

import React, { useState } from 'react';
import { ProductColor } from '@/types/product';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ColorSwatchesProps {
  colors: ProductColor[];
  selectedColorId?: string;
  onSelectColor?: (color: ProductColor) => void;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ColorSwatches({
  colors,
  selectedColorId,
  onSelectColor,
  size = 'md',
  showLabel = true,
}: ColorSwatchesProps) {
  const [hoveredColor, setHoveredColor] = useState<ProductColor | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const activeColor = colors.find((c) => c.id === selectedColorId) || null;
  const displayColor = hoveredColor || activeColor;

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  };

  if (!colors || colors.length === 0) {
    return (
      <div className="text-xs text-slate-500 italic">
        [Color palette to be updated by client]
      </div>
    );
  }

  const hasManyColors = colors.length > 14;
  const initialDisplayCount = size === 'sm' ? 14 : 20;
  const visibleColors = hasManyColors && !isExpanded ? colors.slice(0, initialDisplayCount) : colors;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            {hasManyColors ? 'Available Shades' : 'Available Colors'}
          </span>
          <span className="text-xs text-slate-700 font-semibold truncate max-w-[200px] text-right">
            {displayColor
              ? displayColor.colorName
              : hasManyColors
              ? `48 Commercial Shades`
              : `${colors.length} designs available`}
          </span>
        </div>
      )}

      {/* Swatches List */}
      <div
        className="flex flex-wrap items-center gap-1.5"
        role="radiogroup"
        aria-label="Available product colors"
      >
        {visibleColors.map((color) => {
          const isSelected = selectedColorId === color.id;
          const isWhiteOrLight =
            color.colorCode.toLowerCase() === '#ffffff' ||
            color.colorCode.toLowerCase() === '#f8fafc' ||
            color.colorCode.toLowerCase() === '#f3f4f6' ||
            color.colorCode.toLowerCase() === '#f0f2f5' ||
            color.colorCode.toLowerCase() === '#f8f5e4' ||
            color.colorCode.toLowerCase() === '#f1f5f9';

          return (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Color shade: ${color.colorName}`}
              onClick={() => onSelectColor && onSelectColor(color)}
              onMouseEnter={() => setHoveredColor(color)}
              onMouseLeave={() => setHoveredColor(null)}
              onFocus={() => setHoveredColor(color)}
              onBlur={() => setHoveredColor(null)}
              className={`
                group relative rounded-full transition-all duration-150 flex items-center justify-center shrink-0
                ${sizeClasses[size]}
                ${isWhiteOrLight ? 'border border-slate-300' : 'border border-black/15'}
                ${isSelected ? 'ring-2 ring-slate-900 ring-offset-1 scale-105 z-10' : 'hover:scale-115'}
                ${onSelectColor ? 'cursor-pointer' : 'cursor-default'}
              `}
              style={{ backgroundColor: color.colorCode }}
            >
              {isSelected && (
                <Check
                  className={`w-3 h-3 ${isWhiteOrLight ? 'text-slate-900' : 'text-white'}`}
                  strokeWidth={3}
                />
              )}

              {/* Accessible hover/focus tooltip */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex group-focus:flex items-center px-2 py-0.5 text-[11px] font-semibold text-white bg-slate-900 rounded whitespace-nowrap z-30 shadow-md">
                {color.colorName}
              </span>
            </button>
          );
        })}

        {/* Toggle button for expanding all 48 colors */}
        {hasManyColors && !isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full transition-colors cursor-pointer"
            aria-label={`Show all ${colors.length} shades`}
          >
            <span>+{colors.length - initialDisplayCount} More</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        )}

        {hasManyColors && isExpanded && (
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full transition-colors cursor-pointer"
            aria-label="Show fewer shades"
          >
            <span>Show Fewer</span>
            <ChevronUp className="w-3 h-3 text-slate-500" />
          </button>
        )}
      </div>

      {hasManyColors ? (
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px]">
          <span className="text-slate-500 font-medium">
            * All 48 official colour shades available
          </span>
          <a
            href="#colour-palette"
            className="font-semibold text-slate-900 hover:text-indigo-600 hover:underline inline-flex items-center gap-0.5"
          >
            View Shade Card &rarr;
          </a>
        </div>
      ) : (
        <p className="mt-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
          * Available in the verified catalogue designs shown above.
        </p>
      )}
    </div>
  );
}
