-- ==============================================================================
-- SRI LAKSHMI TEX — Database Schema & Initial Migrations
-- Product Showcase & Business Enquiry
-- ==============================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Leggings', 'Palazzo Pants', 'Patiala Pants')),
  description TEXT NOT NULL,
  main_image TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Index for fast lookup by slug and active status
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products (active);

-- 2. PRODUCT COLORS TABLE
CREATE TABLE IF NOT EXISTS public.product_colors (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  color_name TEXT NOT NULL,
  color_code TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_colors_product_id ON public.product_colors (product_id);

-- 3. PRODUCT ADDITIONAL IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  sort_order INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images (product_id);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  sort_order INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON public.gallery (sort_order);

-- 5. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company_name TEXT,
  phone_number TEXT NOT NULL,
  email TEXT,
  product_interested_in TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Public can read active products
CREATE POLICY "Public users can view active products" 
ON public.products FOR SELECT 
TO anon, authenticated 
USING (active = TRUE);

-- Public can view colors for active products
CREATE POLICY "Public users can view product colors" 
ON public.product_colors FOR SELECT 
TO anon, authenticated 
USING (EXISTS (SELECT 1 FROM public.products WHERE products.id = product_colors.product_id AND products.active = TRUE));

-- Public can view product images for active products
CREATE POLICY "Public users can view product images" 
ON public.product_images FOR SELECT 
TO anon, authenticated 
USING (EXISTS (SELECT 1 FROM public.products WHERE products.id = product_images.product_id AND products.active = TRUE));

-- Public can view gallery items
CREATE POLICY "Public users can view gallery" 
ON public.gallery FOR SELECT 
TO anon, authenticated 
USING (TRUE);

-- Public can insert new enquiries
CREATE POLICY "Public users can submit enquiries" 
ON public.enquiries FOR INSERT 
TO anon, authenticated 
WITH CHECK (TRUE);

-- ==============================================================================
-- SEED INITIAL DATA (Matches the 3 confirmed product categories & official photos)
-- ==============================================================================

INSERT INTO public.products (id, name, slug, category, description, main_image, active)
VALUES 
  ('prod-leggings', 'Ladies Leggings', 'leggings', 'Leggings', 'Ladies'' bottom wear leggings product line. Detailed specifications, fabric parameters, and color shade cards to be provided upon business enquiry.', '/products/leggings.jpg', TRUE),
  ('prod-palazzo', 'Ladies Palazzo Pants', 'palazzo-pants', 'Palazzo Pants', 'Ladies'' wide-leg palazzo pants product line. Detailed specifications, dimensions, and color shade cards to be provided upon business enquiry.', '/products/palazzo-pants.jpg', TRUE),
  ('prod-patiala', 'Ladies Patiala Pants', 'patiala-pants', 'Patiala Pants', 'Ladies'' pleated patiala pants product line. Detailed specifications, pleat design, and color shade cards to be provided upon business enquiry.', '/products/patiala-pants.jpg', TRUE)
ON CONFLICT (id) DO UPDATE SET
  main_image = EXCLUDED.main_image;

-- Initial colors
INSERT INTO public.product_colors (id, product_id, color_name, color_code, image_url)
VALUES
  ('leg-c1', 'prod-leggings', 'Jet Black (Placeholder)', '#111827', '/products/leggings.jpg'),
  ('leg-c2', 'prod-leggings', 'Deep Maroon (Placeholder)', '#831843', '/products/leggings.jpg'),
  ('leg-c3', 'prod-leggings', 'Navy Blue (Placeholder)', '#1E3A8A', '/products/leggings.jpg'),
  ('leg-c4', 'prod-leggings', 'Off White (Placeholder)', '#F1F5F9', '/products/leggings.jpg'),
  ('pal-c1', 'prod-palazzo', 'Classic Black (Placeholder)', '#18181B', '/products/palazzo-pants.jpg'),
  ('pal-c2', 'prod-palazzo', 'Royal Navy (Placeholder)', '#172554', '/products/palazzo-pants.jpg'),
  ('pal-c3', 'prod-palazzo', 'Cream Ivory (Placeholder)', '#F8FAFC', '/products/palazzo-pants.jpg'),
  ('pat-c1', 'prod-patiala', 'Deep Black (Placeholder)', '#09090B', '/products/patiala-pants.jpg'),
  ('pat-c2', 'prod-patiala', 'Crimson Red (Placeholder)', '#B91C1C', '/products/patiala-pants.jpg'),
  ('pat-c3', 'prod-patiala', 'Golden Mustard (Placeholder)', '#CA8A04', '/products/patiala-pants.jpg')
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url;

-- Official gallery items
INSERT INTO public.gallery (id, image_url, title, category, alt_text, sort_order)
VALUES
  ('gal-1', '/products/leggings.jpg', 'Ladies Leggings', 'Leggings', 'Official ladies leggings product photograph', 1),
  ('gal-2', '/products/palazzo-pants.jpg', 'Ladies Palazzo Pants', 'Palazzo Pants', 'Official ladies palazzo pants product photograph', 2),
  ('gal-3', '/products/patiala-pants.jpg', 'Ladies Patiala Pants', 'Patiala Pants', 'Official ladies patiala pants product photograph', 3),
  ('gal-4', '/gallery/fabric-details.png', 'Fabric & Material Details', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX fabric and material details', 4),
  ('gal-5', '/gallery/waistband-details.png', 'Waistband Construction Detail', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX waistband and material construction detail', 5),
  ('gal-6', '/gallery/packaging-details.png', 'Packaging & Inspection', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX garment packaging and inspection process', 6),
  ('gal-7', '/gallery/facility-production.jpeg', 'Facility & Production', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX manufacturing facility in Tirupur', 7),
  ('gal-8', '/gallery/color-palette.jpeg', 'Available Colour Shades', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX available colour shades palette', 8)
ON CONFLICT (id) DO UPDATE SET
  image_url = EXCLUDED.image_url,
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  alt_text = EXCLUDED.alt_text,
  sort_order = EXCLUDED.sort_order;
