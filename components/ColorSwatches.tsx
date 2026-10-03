'use client';

import React, { useState } from 'react';
import { ProductColor } from '@/types/product';
import { Check } from 'lucide-react';

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

  const activeColor = colors.find((c) => c.id === selectedColorId) || null;
  const displayColor = hoveredColor || activeColor;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-9 h-9',
  };

  if (!colors || colors.length === 0) {
    return (
      <div className="text-xs text-slate-500 italic">
        [Color palette to be updated by client]
      </div>
    );
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Available Colors
          </span>
          <span className="text-xs text-slate-600 font-medium truncate max-w-[180px]">
            {displayColor ? displayColor.colorName : `${colors.length} shades available`}
          </span>
        </div>
      )}

      {/* Swatches List */}
      <div
        className="flex flex-wrap items-center gap-2"
        role="radiogroup"
        aria-label="Available product colors"
      >
        {colors.map((color) => {
          const isSelected = selectedColorId === color.id;
          const isWhiteOrLight =
            color.colorCode.toLowerCase() === '#ffffff' ||
            color.colorCode.toLowerCase() === '#f8fafc' ||
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
                group relative rounded-full transition-all duration-150 flex items-center justify-center
                ${sizeClasses[size]}
                ${isWhiteOrLight ? 'border border-slate-300' : 'border border-black/10'}
                ${isSelected ? 'ring-2 ring-slate-900 ring-offset-2 scale-105' : 'hover:scale-110'}
                ${onSelectColor ? 'cursor-pointer' : 'cursor-default'}
              `}
              style={{ backgroundColor: color.colorCode }}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 ${isWhiteOrLight ? 'text-slate-900' : 'text-white'}`}
                  strokeWidth={3}
                />
              )}

              {/* Accessible hover/focus tooltip */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex group-focus:flex items-center px-2 py-0.5 text-[11px] font-medium text-white bg-slate-900 rounded whitespace-nowrap z-20 shadow-md">
                {color.colorName}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-1.5 text-[11px] text-slate-400">
        * Exact color shades verified from client shade cards upon enquiry.
      </p>
    </div>
  );
}
