import React from 'react';
import Image from 'next/image';
import SectionHeading from './SectionHeading';
import { Building2, Target } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Company Profile"
          title="About SRI LAKSHMI TEX"
          subtitle="Specialized manufacturing and wholesale supply of women's bottom wear essentials."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Official Facility Photograph */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 border border-slate-200 rounded-md shadow-xs">
              <div className="relative aspect-3/4 sm:aspect-4/5 w-full bg-slate-100 rounded overflow-hidden border border-slate-200">
                <Image
                  src="/gallery/facility-production.jpeg"
                  alt="SRI LAKSHMI TEX manufacturing facility in Tirupur"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain"
                />
              </div>
              <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Facility &amp; Production</span>
                <span className="text-[11px] font-mono text-slate-500">Tirupur, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Company Story & Verified Details */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Manufacturer &amp; Wholesale Supplier of Ladies Bottom Wear
            </h3>

            <div className="mt-4 space-y-3 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>SRI LAKSHMI TEX</strong> is a specialized textile manufacturing and supply enterprise dedicated exclusively to ladies&apos; bottom wear garments. Our operational focus is centered on three core product lines: <strong>Leggings, Palazzo Pants, and Patiala Pants</strong>.
              </p>

              <div className="p-4 bg-white border border-slate-200 rounded-md">
                <p className="text-sm text-slate-800 leading-relaxed">
                  SRI LAKSHMI TEX is a manufacturer and wholesale supplier of ladies&apos; bottom wear, offering Leggings, Palazzo Pants and Patiala Pants based in Tirupur.
                </p>
              </div>

              <p>
                We accept wholesale orders and business enquiries for our three dedicated ladies&apos; bottom wear product lines: Leggings, Palazzo Pants, and Patiala Pants.
              </p>
            </div>

            {/* Business Focus Pillars */}
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white p-3.5 border border-slate-200 rounded">
                <Building2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Business Model
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    B2B Manufacturing, Wholesale Distribution, and Commercial Bulk Enquiries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-3.5 border border-slate-200 rounded">
                <Target className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Specialized Focus
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Exclusively Ladies Bottom Wear (Leggings, Palazzo, Patiala).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
