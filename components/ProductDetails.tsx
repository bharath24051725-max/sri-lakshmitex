'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, ProductColor } from '@/types/product';
import ColorSwatches from './ColorSwatches';
import { X, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
  isOpen?: boolean;
  onClose?: () => void;
  onEnquire?: (productName: string) => void;
  isModal?: boolean;
}

export default function ProductDetails({
  product,
  isOpen = true,
  onClose,
  onEnquire,
  isModal = false,
}: ProductDetailsProps) {
  const [prevProductId, setPrevProductId] = useState(product.id);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  const [activeImage, setActiveImage] = useState<string>(product.mainImage);

  // Synchronize state when product prop changes without cascading effect
  if (product.id !== prevProductId) {
    setPrevProductId(product.id);
    setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : null);
    setActiveImage(product.mainImage);
  }

  // When color is selected, if that color has a dedicated image, switch to it
  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.imageUrl) {
      setActiveImage(color.imageUrl);
    }
  };

  // Keyboard escape for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModal && onClose) {
        onClose();
      }
    };

    if (isModal && isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModal, isOpen, onClose]);

  if (isModal && !isOpen) return null;

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      {/* Product Imagery Column */}
      <div className="lg:col-span-6 flex flex-col gap-4">
        {/* Main Display Image */}
        <div className="relative aspect-square w-full bg-white border border-slate-200 rounded overflow-hidden shadow-2xs">
          <Image
            src={activeImage}
            alt={`${product.name} detail view`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        {/* Thumbnails (Main + Additional Images) */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {/* Main image thumbnail */}
          <button
            type="button"
            onClick={() => setActiveImage(product.mainImage)}
            className={`relative w-16 h-16 shrink-0 rounded border bg-white overflow-hidden ${
              activeImage === product.mainImage
                ? 'border-slate-900 ring-1 ring-slate-900'
                : 'border-slate-200 hover:border-slate-400'
            }`}
            aria-label="View primary product photograph"
          >
            <Image
              src={product.mainImage}
              alt="Primary photo"
              fill
              className="object-contain"
            />
          </button>

          {/* Additional images */}
          {product.additionalImages?.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveImage(img.imageUrl)}
              className={`relative w-16 h-16 shrink-0 rounded border bg-white overflow-hidden ${
                activeImage === img.imageUrl
                  ? 'border-slate-900 ring-1 ring-slate-900'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
              aria-label={img.altText}
            >
              <Image
                src={img.imageUrl}
                alt={img.altText}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details Column */}
      <div className="lg:col-span-6 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
              {product.category}
            </span>
            {product.composition && (
              <span className="text-xs font-semibold text-slate-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                {product.composition}
              </span>
            )}
            {product.fit && (
              <span className="text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
                {product.fit}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {product.name}
          </h2>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Key Product Features from Catalog */}
          {product.features && product.features.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Features &amp; Highlights
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Color Palette Section */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <ColorSwatches
              colors={product.colors}
              selectedColorId={selectedColor?.id}
              onSelectColor={handleColorSelect}
              size="md"
            />
            {selectedColor && (
              <p className="mt-2 text-xs text-slate-600">
                Selected shade: <span className="font-semibold text-slate-900">{selectedColor.colorName}</span>
              </p>
            )}
          </div>

          {/* Business & Enquiry Notes (Verified) */}
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Enquiry Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Wholesale &amp; Bulk Enquiries</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Color Shade Info on Enquiry</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              * Product specifications, fabric composition, and commercial terms to be provided directly by SRI LAKSHMI TEX upon enquiry.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              if (onEnquire) {
                e.preventDefault();
                onEnquire(product.name);
              }
              if (onClose) onClose();
            }}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded font-medium text-sm hover:bg-slate-800 transition-colors shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            Send Enquiry For This Product
          </a>

          <a
            href={getWhatsAppUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 text-white rounded font-medium text-sm hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
      >
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Close product details dialog"
          >
            <X className="w-5 h-5" />
          </button>
          {content}
        </div>
      </div>
    );
  }

  return <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8">{content}</div>;
}
