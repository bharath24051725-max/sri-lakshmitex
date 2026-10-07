-- ====================================================================
-- SRI LAKSHMI TEX — Migration 005: Kids Coord Set & Detail Banners
-- Aligns database with verified catalog poster and detail banners
-- ====================================================================

-- 1. Update Kids Coord Set description
UPDATE products
SET description = 'Vibrant and cheerful kids printed loungewear coord set tailored from 100% natural cotton rib material with a classic Henley button neck, utility chest pocket, and flexible leg cuff elastic. Hypoallergenic, breathable, and designed for all-day comfort.'
WHERE id = 'prod-kids-coord';

-- 2. Update Kids Coord Set verified colours (6 catalog shades)
DELETE FROM product_colors WHERE product_id = 'prod-kids-coord';

INSERT INTO product_colors (id, product_id, color_name, color_code, image_url)
VALUES
  ('kid-c1', 'prod-kids-coord', 'Maroon', '#6B2335', '/products/kids-coord-set.jpg'),
  ('kid-c2', 'prod-kids-coord', 'Cyan', '#0FA2B8', '/products/kids-coord-set.jpg'),
  ('kid-c3', 'prod-kids-coord', 'Pink', '#E33582', '/products/kids-coord-set.jpg'),
  ('kid-c4', 'prod-kids-coord', 'Olive', '#6C7A33', '/products/kids-coord-set.jpg'),
  ('kid-c5', 'prod-kids-coord', 'Navy', '#1B2E56', '/products/kids-coord-set.jpg'),
  ('kid-c6', 'prod-kids-coord', 'Grey', '#6B7280', '/products/kids-coord-set.jpg');

-- 3. Update gallery items
UPDATE gallery SET title = 'Kids Coord Set', alt_text = 'Kids Coord Set official catalog sheet' WHERE id = 'gal-6';
UPDATE gallery SET title = 'Fabric & Material Details', alt_text = 'SRI LAKSHMI TEX fabric and material details' WHERE id = 'gal-7';
UPDATE gallery SET title = 'Waistband Construction Detail', alt_text = 'SRI LAKSHMI TEX waistband detail' WHERE id = 'gal-8';
UPDATE gallery SET title = 'Packaging & Inspection', alt_text = 'SRI LAKSHMI TEX packaging and inspection detail' WHERE id = 'gal-9';
