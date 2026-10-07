-- ====================================================================
-- SRI LAKSHMI TEX — Migration 006: Reorder Garment & Quality Showcase
-- Aligns database with the client's official 11-item showcase order
-- ====================================================================

-- Clear and replace gallery records with exact verified sequence
DELETE FROM gallery WHERE id IN ('gal-1', 'gal-2', 'gal-3', 'gal-4', 'gal-5', 'gal-6', 'gal-7', 'gal-8', 'gal-9', 'gal-10', 'gal-11');

INSERT INTO gallery (id, image_url, title, category, alt_text, sort_order)
VALUES
  ('gal-1', '/products/leggings.jpg', '4 Way Golden Legging', 'Leggings', '4 Way Golden Legging official catalog sheet', 1),
  ('gal-2', '/products/patiala-pants.jpg', 'Patiala Pant', 'Patiala Pants', 'Patiala Pant official catalog sheet', 2),
  ('gal-3', '/products/palazzo-pants.jpg', 'Palazzo Pants', 'Palazzo Pants', 'Palazzo Pants official catalog sheet', 3),
  ('gal-4', '/products/shimmer-leggings.jpg', 'Shimmer Ankle Leggings', 'Shimmer Leggings', 'Shimmer Ankle Leggings official catalog sheet', 4),
  ('gal-5', '/products/ladies-pajama-set.jpg', 'Ladies Pyjama Set', 'Pajama Sets', 'Ladies Pyjama Set official catalog sheet', 5),
  ('gal-6', '/products/kids-coord-set.jpg', 'Kids Coord Set', 'Kids Wear', 'Kids Coord Set official catalog sheet', 6),
  ('gal-7', '/gallery/color-palette.jpeg', 'Colour Palette (48 Shades)', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX 48 available colour shades palette', 7),
  ('gal-8', '/gallery/fabric-details.png', 'Fabric & Material Detail', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX fabric and material details', 8),
  ('gal-9', '/gallery/waistband-details.png', 'Waistband Detail', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX waistband detail', 9),
  ('gal-10', '/gallery/packaging-details.png', 'Packaging & Inspection Detail', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX packaging and inspection detail', 10),
  ('gal-11', '/gallery/facility-production.jpeg', 'Facility & Production', 'Manufacturing & Fabric', 'SRI LAKSHMI TEX manufacturing facility in Tirupur', 11)
ON CONFLICT (id) DO UPDATE
SET image_url = EXCLUDED.image_url,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    alt_text = EXCLUDED.alt_text,
    sort_order = EXCLUDED.sort_order;
