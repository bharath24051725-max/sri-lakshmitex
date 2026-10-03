'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '@/types/product';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation: Escape to close, Arrow keys for prev/next
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${currentItem.title}`}
    >
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Lightbox Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center z-10">
        {/* Top bar controls */}
        <div className="w-full flex items-center justify-between text-white pb-3 px-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              {currentItem.category}
            </span>
            <span className="text-sm font-medium text-slate-200 truncate">
              {currentItem.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              {currentIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              aria-label="Close photo viewer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative w-full h-[65vh] sm:h-[75vh] max-h-[750px] bg-slate-900 rounded border border-slate-800 overflow-hidden flex items-center justify-center">
          <Image
            src={currentItem.imageUrl}
            alt={currentItem.altText}
            fill
            sizes="100vw"
            priority
            className="object-contain p-2 sm:p-4"
          />

          {/* Navigation Controls */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-lg transition-transform hover:scale-105"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 shadow-lg transition-transform hover:scale-105"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        <div className="w-full text-center pt-3 px-4">
          <p className="text-xs text-slate-300">
            {currentItem.altText}
          </p>
        </div>
      </div>
    </div>
  );
}
