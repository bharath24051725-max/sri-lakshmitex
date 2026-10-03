'use client';

import React, { useEffect, useRef } from 'react';
import { X, Phone, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={menuRef}
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl flex flex-col z-10 transition-transform duration-250 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div>
            <span className="text-base font-bold tracking-tight text-slate-900 block">
              SRI LAKSHMI TEX
            </span>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 -mr-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-6 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center py-3 text-base font-medium text-slate-800 hover:text-slate-950 border-b border-slate-100 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-3">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Send Enquiry
          </a>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 text-white rounded font-medium text-sm hover:bg-emerald-800 transition-colors"
          >
            <Phone className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
