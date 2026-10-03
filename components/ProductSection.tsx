'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import ProductDetails from './ProductDetails';
import SectionHeading from './SectionHeading';

interface ProductSectionProps {
  products: Product[];
  onSelectProductForEnquiry?: (productName: string) => void;
}

export default function ProductSection({
  products,
  onSelectProductForEnquiry,
}: ProductSectionProps) {
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  const handleEnquire = (productName: string) => {
    if (onSelectProductForEnquiry) {
      onSelectProductForEnquiry(productName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Line"
          title="Ladies' Bottom Wear Collection"
          subtitle="Explore our three confirmed product categories: Leggings, Palazzo Pants, and Patiala Pants. Detailed specifications and shade options provided upon business enquiry."
        />

        {/* 3 cards per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEnquire={handleEnquire}
              onViewDetails={(prod) => setSelectedProductForModal(prod)}
            />
          ))}
        </div>

        {/* Official Available Colour Shades Palette */}
        <div id="colour-palette" className="mt-14 bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Colour Options
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
                Available Colour Shades
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
                Commercial shade card available across our ladies&apos; bottom wear range.
              </p>
            </div>
            <div className="text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded font-medium self-start sm:self-auto shadow-2xs">
              48 Colour Shades
            </div>
          </div>

          <div className="relative w-full aspect-3/2 rounded-md overflow-hidden bg-white border border-slate-200 shadow-2xs">
            <Image
              src="/gallery/color-palette.jpeg"
              alt="SRI LAKSHMI TEX Available Colour Shades"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Modal for Quick Product Details */}
        {selectedProductForModal && (
          <ProductDetails
            product={selectedProductForModal}
            isOpen={true}
            isModal={true}
            onClose={() => setSelectedProductForModal(null)}
            onEnquire={handleEnquire}
          />
        )}
      </div>
    </section>
  );
}
