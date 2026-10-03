'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/types/product';
import Lightbox from './Lightbox';
import SectionHeading from './SectionHeading';
import { Maximize2 } from 'lucide-react';

interface PhotoGalleryProps {
  items: GalleryItem[];
}

export default function PhotoGallery({ items }: PhotoGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const categories = [
    'All',
    'Leggings',
    'Palazzo Pants',
    'Patiala Pants',
    'Shimmer Leggings',
    'Pajama Sets',
    'Kids Wear',
    'Manufacturing & Fabric',
  ];

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory);

  const openLightbox = (item: GalleryItem) => {
    // Find index in overall items or filtered list
    const index = filteredItems.findIndex((i) => i.id === item.id);
    setSelectedPhotoIndex(index !== -1 ? index : 0);
    setLightboxOpen(true);
  };

  return (
    <section id="photos" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Photography"
          title="Garment &amp; Quality Showcase"
          subtitle="Explore product silhouettes, stitching details, fabric textures, and facility operations across our ladies' bottom wear lines."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-50 border border-slate-200 rounded overflow-hidden flex flex-col hover:border-slate-300 transition-colors shadow-2xs"
            >
              <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.altText}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-3 transition-transform duration-200 group-hover:scale-103"
                />

                {/* Accessible Zoom Trigger */}
                <button
                  type="button"
                  onClick={() => openLightbox(item)}
                  className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center cursor-pointer"
                  aria-label={`Open photo in lightbox: ${item.title}`}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/90 text-white p-2 rounded-full shadow">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>
              </div>

              {/* Photo Caption */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    {item.category}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  [PHOTO]
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Accessible Lightbox Modal */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          items={filteredItems}
          currentIndex={selectedPhotoIndex}
          onNavigate={(newIdx) => setSelectedPhotoIndex(newIdx)}
        />
      </div>
    </section>
  );
}
