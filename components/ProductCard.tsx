'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductColor } from '@/types/product';
import ColorSwatches from './ColorSwatches';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEnquire?: (productName: string) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onEnquire,
  onViewDetails,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );

  // If the selected color has a specific image, display it; otherwise display main product image
  const displayImage = selectedColor?.imageUrl || product.mainImage;

  const handleEnquireClick = (e: React.MouseEvent) => {
    if (onEnquire) {
      e.preventDefault();
      onEnquire(product.name);
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(product);
    }
  };

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-md overflow-hidden hover:border-slate-300 transition-colors shadow-2xs">
      {/* Product Image Area */}
      <div className="relative aspect-4/5 w-full bg-slate-50 border-b border-slate-200 overflow-hidden">
        <Image
          src={displayImage}
          alt={`${product.name} - SRI LAKSHMI TEX`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4 transition-transform duration-200 hover:scale-102"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-slate-700 bg-white/95 px-2.5 py-1 rounded border border-slate-200">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {product.description}
          </p>

          {/* Color Swatch Section */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <ColorSwatches
              colors={product.colors}
              selectedColorId={selectedColor?.id}
              onSelectColor={(color) => setSelectedColor(color)}
              size="sm"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
          {onViewDetails ? (
            <button
              type="button"
              onClick={handleDetailsClick}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 rounded hover:bg-slate-200 transition-colors"
            >
              View Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <a
            href="#contact"
            onClick={handleEnquireClick}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}
