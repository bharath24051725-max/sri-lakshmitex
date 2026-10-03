'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface WhatsAppButtonProps {
  productName?: string;
  variant?: 'floating' | 'inline';
  className?: string;
}

export default function WhatsAppButton({
  productName,
  variant = 'floating',
  className = '',
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(productName);

  if (variant === 'inline') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-sm font-medium transition-colors shadow-xs ${className}`}
        aria-label="Contact SRI LAKSHMI TEX on WhatsApp"
      >
        <Phone className="w-4 h-4" />
        WhatsApp Enquiry
      </a>
    );
  }

  // Floating Action Button
  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        aria-label="Direct WhatsApp Business Enquiry"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          WhatsApp Enquiry
        </span>
      </a>
    </aside>
  );
}
