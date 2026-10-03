import React from 'react';
import SectionHeading from './SectionHeading';
import { Package, MessageSquareCheck, CheckCircle2 } from 'lucide-react';

export default function ServicesSection() {
  const confirmedProducts = [
    {
      name: 'Leggings',
      detail: 'Ladies bottom wear product category.',
    },
    {
      name: 'Palazzo Pants',
      detail: 'Ladies wide-leg bottom wear product category.',
    },
    {
      name: 'Patiala Pants',
      detail: 'Ladies pleated bottom wear product category.',
    },
  ];

  const confirmedServices = [
    {
      icon: Package,
      title: 'Wholesale & Bulk Enquiries',
      description:
        'We accept wholesale and bulk supply inquiries for retail stores, distributors, and bulk purchasers.',
    },
    {
      icon: MessageSquareCheck,
      title: 'Product Enquiries & Shade Availability',
      description:
        'Detailed specifications, confirmed color shade palettes, and order terms provided upon direct business enquiry.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Scope"
          title="Products &amp; Services"
          subtitle="Confirmed product lines and business enquiry options offered by SRI LAKSHMI TEX."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Confirmed Products Column */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded p-6 shadow-2xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
              Confirmed Product Categories
            </h3>
            <div className="space-y-4">
              {confirmedProducts.map((p) => (
                <div key={p.name} className="flex items-start gap-3 p-3 bg-slate-50 rounded border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmed Services Column */}
          <div className="lg:col-span-6 space-y-4">
            {confirmedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded p-6 shadow-2xs flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {service.title}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
