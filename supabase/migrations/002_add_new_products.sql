-- ====================================================================
-- SRI LAKSHMI TEX — Migration 002: Add New Products & Update Images
-- ====================================================================

-- 1. Update Existing Products with New Photographs & Names
UPDATE products
SET name = '4 Way Golden Angel Legging',
    main_image = '/products/leggings.jpg',
    description = 'Premium 4-way stretch golden angel ladies leggings engineered for supreme flexibility, softness, and contour fit. Tailored with high-grade elastane combed cotton knit.'
WHERE id = 'prod-leggings';

UPDATE products
SET name = 'Ladies Patiala Pants',
    main_image = '/products/patiala-pants.jpg',
    description = 'Traditional pleated ladies patiala pants featuring rich gathers, relaxed comfortable fit, and breathable cotton fabric.'
WHERE id = 'prod-patiala';

-- 2. Insert 3 New Products
INSERT INTO products (id, name, slug, category, description, main_image, active)
VALUES
  ('prod-shimmer', 'Shimmer Ankle Leggings', 'shimmer-ankle-leggings', 'Shimmer Leggings', 'Glamorous shimmer finish ankle-length leggings tailored for festive celebrations and evening wear with radiant luster and resilient 4-way stretch.', '/products/shimmer-leggings.jpg', true),
  ('prod-pajama-set', 'Ladies Pajama Set', 'ladies-pajama-set', 'Pajama Sets', 'Ultra-comfortable ladies printed loungewear pajama set featuring breathable soft knit cotton, half-sleeve button-down tops, and matching pajama bottoms in assorted all-over prints.', '/products/ladies-pajama-set.jpg', true),
  ('prod-kids-coord', 'Kids Coord Set', 'kids-coord-set', 'Kids Wear', 'Vibrant and cheerful kids printed loungewear coord pajama set made from soft, hypoallergenic 100% combed cotton knit for boys and girls.', '/products/kids-coord-set.jpg', true)
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    main_image = EXCLUDED.main_image,
    active = EXCLUDED.active;

-- 3. Delete old colors for leggings and patiala to insert verified swatches
DELETE FROM product_colors WHERE product_id IN ('prod-leggings', 'prod-patiala', 'prod-shimmer', 'prod-pajama-set', 'prod-kids-coord');

-- 4. Insert Verified Colours for all products
INSERT INTO product_colors (id, product_id, color_name, color_code, image_url)
VALUES
  -- 4 Way Golden Angel Legging
  ('leg-c1', 'prod-leggings', 'Matte Pink', '#B3586D', '/products/leggings.jpg'),
  ('leg-c2', 'prod-leggings', 'Beige', '#D3BCA2', '/products/leggings.jpg'),
  ('leg-c3', 'prod-leggings', 'Turquoise', '#087994', '/products/leggings.jpg'),
  ('leg-c4', 'prod-leggings', 'Fuchsia', '#AB084E', '/products/leggings.jpg'),
  ('leg-c5', 'prod-leggings', 'Black', '#18181B', '/products/leggings.jpg'),

  -- Ladies Patiala Pants
  ('pat-c1', 'prod-patiala', 'Blue', '#1B65C4', '/products/patiala-pants.jpg'),
  ('pat-c2', 'prod-patiala', 'Beige', '#DDC5A2', '/products/patiala-pants.jpg'),
  ('pat-c3', 'prod-patiala', 'Black', '#18181B', '/products/patiala-pants.jpg'),
  ('pat-c4', 'prod-patiala', 'Fuchsia', '#C4166E', '/products/patiala-pants.jpg'),
  ('pat-c5', 'prod-patiala', 'Turquoise', '#0E859E', '/products/patiala-pants.jpg'),

  -- Shimmer Ankle Leggings
  ('shim-c1', 'prod-shimmer', 'Blue', '#1A64C2', '/products/shimmer-leggings.jpg'),
  ('shim-c2', 'prod-shimmer', 'Beige', '#DDC5A2', '/products/shimmer-leggings.jpg'),
  ('shim-c3', 'prod-shimmer', 'Black', '#18181B', '/products/shimmer-leggings.jpg'),
  ('shim-c4', 'prod-shimmer', 'Fuchsia', '#C4166E', '/products/shimmer-leggings.jpg'),
  ('shim-c5', 'prod-shimmer', 'Turquoise', '#0D829B', '/products/shimmer-leggings.jpg'),

  -- Ladies Pajama Set
  ('paj-c1', 'prod-pajama-set', 'Teal Flowers', '#166E68', '/products/ladies-pajama-set.jpg'),
  ('paj-c2', 'prod-pajama-set', 'Blue Stars', '#5879A2', '/products/ladies-pajama-set.jpg'),
  ('paj-c3', 'prod-pajama-set', 'Mint Leaves', '#7CB7A3', '/products/ladies-pajama-set.jpg'),
  ('paj-c4', 'prod-pajama-set', 'Red Dots', '#6D1B28', '/products/ladies-pajama-set.jpg'),
  ('paj-c5', 'prod-pajama-set', 'Grey Pinstripes', '#6B7280', '/products/ladies-pajama-set.jpg'),

  -- Kids Coord Set
  ('kid-c1', 'prod-kids-coord', 'Maroon Forest', '#6B2335', '/products/kids-coord-set.jpg'),
  ('kid-c2', 'prod-kids-coord', 'Cyan Butterfly', '#0FA2B8', '/products/kids-coord-set.jpg'),
  ('kid-c3', 'prod-kids-coord', 'Pink Geometric', '#B8255F', '/products/kids-coord-set.jpg'),
  ('kid-c4', 'prod-kids-coord', 'Olive Moons', '#6C7A33', '/products/kids-coord-set.jpg'),
  ('kid-c5', 'prod-kids-coord', 'Navy Stars', '#1B2E56', '/products/kids-coord-set.jpg');

-- 5. Insert Gallery Items for new products
INSERT INTO gallery (id, image_url, title, category, alt_text, sort_order)
VALUES
  ('gal-4', '/products/shimmer-leggings.jpg', 'Shimmer Ankle Leggings', 'Shimmer Leggings', 'Shimmer ankle leggings showcase with available colours', 4),
  ('gal-5', '/products/ladies-pajama-set.jpg', 'Ladies Pajama Set', 'Pajama Sets', 'Ladies printed pajama loungewear set', 5),
  ('gal-6', '/products/kids-coord-set.jpg', 'Kids Coord Pajama Set', 'Kids Wear', 'Kids printed coord loungewear pajama set', 6)
ON CONFLICT (id) DO UPDATE
SET image_url = EXCLUDED.image_url,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    alt_text = EXCLUDED.alt_text,
    sort_order = EXCLUDED.sort_order;
