import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetails from '@/components/ProductDetails';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getProductBySlug, getProducts } from '@/lib/supabase';
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: 'Product Not Found | SRI LAKSHMI TEX',
    };
  }

  return {
    title: `${product.name} | SRI LAKSHMI TEX`,
    description: product.description,
    openGraph: {
      title: `${product.name} | SRI LAKSHMI TEX`,
      description: product.description,
      images: [
        {
          url: product.mainImage,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
            <Link href="/#products" className="hover:text-slate-900 transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
            <span className="font-semibold text-slate-800" aria-current="page">
              {product.name}
            </span>
          </nav>

          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/#products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to All Products
            </Link>
          </div>

          {/* Product Details Component */}
          <ProductDetails product={product} isModal={false} />
        </div>
      </main>

      <WhatsAppButton productName={product.name} variant="floating" />
      <Footer />
    </div>
  );
}
