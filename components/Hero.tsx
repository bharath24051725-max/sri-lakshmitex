import React from 'react';
import Image from 'next/image';
import { ArrowDown, MessageSquare, ShieldCheck, Factory, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative bg-slate-50 border-b border-slate-200 py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Business Headline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Minimal Business Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 rounded text-xs font-semibold tracking-wide text-slate-700 uppercase mb-4 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Manufacturer &amp; Wholesale Supplier
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              SRI LAKSHMI TEX
            </h1>

            <p className="mt-3 text-lg sm:text-xl font-medium text-slate-700">
              Ladies Bottom Wear Manufacturer &amp; Supplier
            </p>

            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
              A specialized clothing business focused on ladies&apos; bottom wear products. Explore our product showcase for Leggings, Palazzo Pants, and Patiala Pants, or contact us directly for business enquiries.
            </p>

            {/* Key Verified Business Highlights */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">
              <div className="flex items-center gap-2 bg-white px-3 py-2 border border-slate-200 rounded">
                <CheckCircle2 className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-medium text-slate-800">3 Product Categories</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 border border-slate-200 rounded">
                <Factory className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-medium text-slate-800">Wholesale Enquiries</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 border border-slate-200 rounded">
                <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-medium text-slate-800">Product Showcase</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
              >
                View Products
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 rounded hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Column: Hero Product Preview Box */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md lg:max-w-none bg-white p-3 border border-slate-200 rounded-md shadow-xs">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100 rounded border border-slate-200">
                <Image
                  src="/products/hero-showcase.png"
                  alt="SRI LAKSHMI TEX product showcase"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-slate-500">
                <span>Showcase: Leggings • Palazzo • Patiala</span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Official Showcase
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
