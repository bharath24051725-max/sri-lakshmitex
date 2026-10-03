'use client';

import React, { useState } from 'react';
import { Product, GalleryItem } from '@/types/product';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductSection from './ProductSection';
import ServicesSection from './ServicesSection';
import PhotoGallery from './PhotoGallery';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

interface MainLandingProps {
  products: Product[];
  galleryItems: GalleryItem[];
}

export default function MainLanding({ products, galleryItems }: MainLandingProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('General Enquiry');

  const handleProductSelectForEnquiry = (productName: string) => {
    setSelectedProduct(productName);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Top Navigation */}
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Products Section */}
        <ProductSection
          products={products}
          onSelectProductForEnquiry={handleProductSelectForEnquiry}
        />

        {/* Services & Commercial Overview */}
        <ServicesSection />

        {/* Photo Gallery & Lightbox */}
        <PhotoGallery items={galleryItems} />

        {/* About Company */}
        <AboutSection />

        {/* Contact & Enquiry Section */}
        <ContactSection selectedProduct={selectedProduct} />
      </main>

      {/* Floating WhatsApp Quick Contact Button */}
      <WhatsAppButton productName={selectedProduct} variant="floating" />

      {/* Footer */}
      <Footer />
    </div>
  );
}
