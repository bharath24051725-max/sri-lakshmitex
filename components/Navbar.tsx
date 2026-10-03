'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '@/lib/utils';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3">
              <Link
                href="/#home"
                className="flex items-center gap-3 focus:rounded focus:outline-hidden"
                aria-label="SRI LAKSHMI TEX - Home"
              >
                {/* Official Company Logo */}
                <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden flex items-center justify-center">
                  <Image
                    src="/logo/company-logo.png"
                    alt="SRI LAKSHMI TEX logo"
                    width={48}
                    height={48}
                    priority
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                    SRI LAKSHMI TEX
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors py-2 border-b-2 border-transparent hover:border-slate-900"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop Action Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors shadow-xs"
              >
                Send Enquiry
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -mr-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
      />
    </>
  );
}
