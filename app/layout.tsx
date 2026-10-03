import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.srilakshmitextup.in'),
  title: "SRI LAKSHMI TEX | Garment & Bottom Wear Manufacturer & Supplier",
  description: "SRI LAKSHMI TEX is a textile manufacturer in Tirupur specializing in 4-Way Leggings, Palazzo Pants, Patiala Pants, Shimmer Leggings, Ladies Pajama Sets, and Kids Coord Sets.",
  keywords: [
    "SRI LAKSHMI TEX",
    "Ladies Bottom Wear Manufacturer",
    "Leggings Supplier",
    "Palazzo Pants",
    "Patiala Pants",
    "Shimmer Leggings",
    "Ladies Pajama Set",
    "Kids Coord Set",
    "Tirupur Garments Wholesale",
  ],
  authors: [{ name: "SRI LAKSHMI TEX" }],
  creator: "SRI LAKSHMI TEX",
  publisher: "SRI LAKSHMI TEX",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.srilakshmitextup.in",
    title: "SRI LAKSHMI TEX | Garment & Bottom Wear Manufacturer & Supplier",
    description: "Specialized manufacturer and supplier of premium bottom wear and loungewear: 4-Way Leggings, Palazzo Pants, Patiala Pants, Shimmer Leggings, Pajama Sets, and Kids Coord Sets.",
    siteName: "SRI LAKSHMI TEX",
    images: [
      {
        url: "/logo/company-logo.png",
        width: 1200,
        height: 960,
        alt: "SRI LAKSHMI TEX logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SRI LAKSHMI TEX | Garment & Bottom Wear Manufacturer & Supplier",
    description: "Specialized manufacturer and supplier of quality garments: Leggings, Palazzo Pants, Patiala Pants, Shimmer Leggings, Pajama Sets, and Kids Coord Sets.",
    images: ["/logo/company-logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-slate-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
