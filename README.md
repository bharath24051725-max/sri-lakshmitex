# SRI LAKSHMI TEX — Product Showcase & Business Enquiry Website

A clean, modern, and production-ready web platform for **SRI LAKSHMI TEX**, a textile business specializing exclusively in **ladies' bottom wear products** (Leggings, Palazzo Pants, and Patiala Pants).

This is a **B2B product showcase and business enquiry website**, intentionally engineered for clarity, fast loading, mobile usability, and direct conversion via enquiry forms and WhatsApp.

---

## 1. Project Purpose & Core Design Philosophy

- **Specialization**: Ladies' bottom wear manufacturing and wholesale supply.
- **Three Product Lines**:
  1. **Leggings** (stretchable, shape retention)
  2. **Palazzo Pants** (wide-leg flare, breathable drape)
  3. **Patiala Pants** (traditional voluminous cowl pleats)
- **Design Rule**: *"THE UI MUST BE SIMPLE, CLEAN AND USER-FRIENDLY — NOT DECORATIVE."*
  - No bloated animations, heavy gradients, or gimmicks.
  - High-contrast typography, neutral borders, and clear product photography focus.

---

## 2. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components + ISR)
- **Library**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Backend**: [Supabase](https://supabase.com/) (PostgreSQL with RLS, resilient offline fallback)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) ready

---

## 3. Project Structure

```text
sri-lakshmi-tex/
├── app/
│   ├── layout.tsx              # SEO root layout, fonts, skip links
│   ├── page.tsx                # ISR Home page (Server Component)
│   ├── globals.css             # Tailwind v4 configuration & base styles
│   ├── robots.ts               # Robots.txt metadata generator
│   ├── sitemap.ts              # XML Sitemap generator
│   ├── not-found.tsx           # Friendly 404 page
│   └── products/
│       └── [slug]/
│           └── page.tsx        # Dynamic product detail page with static params
│
├── components/
│   ├── Navbar.tsx              # Minimal header with logo placeholder
│   ├── MobileMenu.tsx          # Accessible drawer with Escape key support
│   ├── Hero.tsx                # Verified company intro & CTA buttons
│   ├── SectionHeading.tsx      # Standardized heading component
│   ├── ProductSection.tsx      # 3-column product showcase
│   ├── ProductCard.tsx         # Product card with color preview & enquiry CTA
│   ├── ProductDetails.tsx      # Reusable detail modal / view with color switcher
│   ├── ColorSwatches.tsx       # Accessible swatch circles with color labels
│   ├── ServicesSection.tsx     # Wholesale and supply capabilities
│   ├── PhotoGallery.tsx        # Filterable photo grid
│   ├── Lightbox.tsx            # Accessible image viewer with ESC / arrow controls
│   ├── AboutSection.tsx        # Company focus with placeholder slots
│   ├── ContactSection.tsx      # Contact details & enquiry form
│   ├── EnquiryForm.tsx         # Validated enquiry form with loading & success states
│   ├── WhatsAppButton.tsx      # WhatsApp link generator with pre-filled message
│   ├── MainLanding.tsx         # Client coordinator managing section state
│   └── Footer.tsx              # Clean footer with quick links & copyright
│
├── data/
│   └── products.ts             # Verified product catalogue & placeholder definitions
│
├── lib/
│   ├── supabase.ts             # Supabase client with graceful local fallback
│   └── utils.ts                # WhatsApp message builder & business configuration
│
├── types/
│   └── product.ts              # TypeScript interfaces
│
├── public/
│   ├── logo/                   # Client logo placeholder SVG
│   ├── products/               # Product image placeholder SVGs
│   └── gallery/                # High-res gallery placeholder SVGs
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql # Database schema, RLS policies, seed data
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. Getting Started

### Prerequisites

- Node.js (v18.17.0 or later; Node.js v20+ / v22+ / v24+ supported)
- npm or pnpm or yarn

### Installation

```bash
# Navigate to the project root
cd sri-lakshmi-tex

# Install dependencies
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 5. Environment Variables & Supabase Setup

### 1. Copy Environment File

```bash
cp .env.example .env.local
```

### 2. Configure Values

```env
# Optional: Connect to your live Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Client Business Configuration
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
NEXT_PUBLIC_SITE_URL=https://sri-lakshmi-tex.vercel.app
```

> **Resilient Fallback**: The website is 100% functional even without Supabase environment variables. If Supabase is not configured or offline, it seamlessly falls back to the verified data in `data/products.ts` without throwing raw errors to visitors.

### 3. Database Migration

To run the SQL migration in your Supabase project:
1. Open the **SQL Editor** in your Supabase dashboard.
2. Open `supabase/migrations/001_initial_schema.sql`.
3. Copy and run the SQL query to create tables, enable Row-Level Security (RLS), and seed the initial catalogue.

---

## 6. Updating Pending Client Assets

When the client provides official assets, replace the placeholders without changing application code:

1. **Company Logo**: Replace `public/logo/logo-placeholder.svg` with the client's PNG/SVG logo.
2. **Product Photography**:
   - `public/products/leggings-main.svg` → Real Leggings photo
   - `public/products/palazzo-main.svg` → Real Palazzo Pants photo
   - `public/products/patiala-main.svg` → Real Patiala Pants photo
   - `public/products/hero-product.svg` → Real Hero banner photography
3. **Color Palette**: Update the `colors` array in `data/products.ts` or in the Supabase `product_colors` table with real shade names and hex codes.
4. **Contact Details**: Update `BUSINESS_CONFIG` in `lib/utils.ts` with verified phone, email, WhatsApp, and factory address.

---

## 7. Production Build & Verification

```bash
# Run production build
npm run build

# Start production server locally
npm start
```

---

## 8. Deployment on Vercel

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project into **Vercel**.
3. Set the Root Directory to `sri-lakshmi-tex` (if stored in a subdirectory) or project root.
4. Add the environment variables from `.env.example` in Vercel Project Settings.
5. Deploy. The platform will automatically optimize images and serve static pages with ISR.

---

© 2026 SRI LAKSHMI TEX. All Rights Reserved.
