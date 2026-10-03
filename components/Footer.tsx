import React from 'react';
import Image from 'next/image';
import { BUSINESS_CONFIG, getWhatsAppUrl, NAV_LINKS } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded overflow-hidden flex items-center justify-center bg-white p-0.5">
                  <Image
                    src="/logo/company-logo.png"
                    alt="SRI LAKSHMI TEX logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  SRI LAKSHMI TEX
                </span>
              </div>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                Garment &amp; Bottom Wear Manufacturer &amp; Supplier
              </p>
              <p className="mt-4 text-xs text-slate-400 leading-relaxed max-w-sm">
                Manufacturer and supplier specializing in premium bottom wear and loungewear: Leggings, Palazzo Pants, Patiala Pants, Shimmer Leggings, Ladies Pajama Sets, and Kids Coord Sets.
              </p>
            </div>
            <div className="mt-6 text-xs text-slate-500">
              Product Showcase &amp; Commercial Enquiry Portal
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors py-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#products"
                  className="text-slate-400 hover:text-white transition-colors py-1 inline-block"
                >
                  Product Catalogue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Contact &amp; Wholesale Desk
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-slate-500">
                  Phone
                </span>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="text-slate-300 font-mono hover:text-white hover:underline"
                >
                  {BUSINESS_CONFIG.phone}
                </a>
              </li>

              <li className="flex flex-col pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500">
                  WhatsApp
                </span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Chat with Wholesale Desk (+{BUSINESS_CONFIG.whatsAppNumber})
                </a>
              </li>

              <li className="flex flex-col pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500">
                  Email
                </span>
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="text-slate-300 font-mono hover:text-white hover:underline"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </li>

              <li className="flex flex-col pt-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500">
                  Address
                </span>
                <span className="text-slate-300 font-mono">
                  {BUSINESS_CONFIG.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 SRI LAKSHMI TEX. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">
            Ladies Bottom Wear Specialist • Simple, Clean &amp; Product-Focused
          </p>
        </div>
      </div>
    </footer>
  );
}
