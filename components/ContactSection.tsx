'use client';

import React from 'react';
import SectionHeading from './SectionHeading';
import EnquiryForm from './EnquiryForm';
import { BUSINESS_CONFIG, getWhatsAppUrl } from '@/lib/utils';
import { Phone, MessageSquare, Mail, MapPin } from 'lucide-react';

interface ContactSectionProps {
  selectedProduct?: string;
}

export default function ContactSection({ selectedProduct }: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Direct Communication"
          title="Get In Touch"
          subtitle="Reach our sales and manufacturing desk for bulk catalogue enquiries, sample orders, and wholesale supply terms."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Verified Contact Details */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
                SRI LAKSHMI TEX
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Ladies Bottom Wear Manufacturer &amp; Supplier
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Phone / Mobile
                    </span>
                    <a
                      href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                      className="text-sm font-medium text-slate-800 font-mono hover:text-slate-950 hover:underline"
                    >
                      {BUSINESS_CONFIG.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      WhatsApp Business
                    </span>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-emerald-800 hover:underline inline-block mt-0.5"
                    >
                      Chat on WhatsApp (+{BUSINESS_CONFIG.whatsAppNumber})
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </span>
                    <a
                      href={`mailto:${BUSINESS_CONFIG.email}`}
                      className="text-sm font-medium text-slate-800 font-mono hover:text-slate-950 hover:underline"
                    >
                      {BUSINESS_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Company Address
                    </span>
                    <address className="not-italic text-sm font-medium text-slate-800 leading-relaxed font-mono">
                      {BUSINESS_CONFIG.address}
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm key={selectedProduct} initialProduct={selectedProduct} />
          </div>
        </div>
      </div>
    </section>
  );
}
