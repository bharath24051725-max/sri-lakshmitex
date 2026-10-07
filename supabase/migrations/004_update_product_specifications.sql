-- ====================================================================
-- SRI LAKSHMI TEX — Migration 004: Update Product Names & Specifications
-- Aligns database with updated catalog posters and official spec sheets
-- ====================================================================

-- 1. Lycra Anklefit Leggings
UPDATE products
SET name = 'Lycra Anklefit Leggings',
    description = 'Everyday comfort and perfect fit crafted from 95% Cotton and 5% Spandex cotton-rich lycra with resilient 4-way stretch. Features a comfortable wide waistband that stays in place and clean modern anklefit finish across all 48 commercial palette shades.'
WHERE id = 'prod-leggings';

-- 2. Palazzo Pants with Pockets & Rope
UPDATE products
SET name = 'Palazzo Pants with Pockets & Rope',
    description = 'Comfortable and stylish ladies'' palazzo pants crafted from 100% natural cotton rib material with functional side pockets and an adjustable rope waistband. Breathable drape perfect for casual wear, yoga, college, and travel across all 48 commercial palette shades.'
WHERE id = 'prod-palazzo';

-- 3. Patiala Pant with Rope
UPDATE products
SET name = 'Patiala Pant with Rope',
    description = 'Traditional pleated patiala pants tailored from 95% Lycra Viscose and 5% Spandex for supreme softness, breathability, and 4-way stretch. Features convenient side pockets, relaxed gathers, and an adjustable rope waistband across all 48 commercial palette shades.'
WHERE id = 'prod-patiala';

-- 4. Shimmer Ankle Leggings
UPDATE products
SET name = 'Shimmer Ankle Leggings',
    description = 'Glamorous shimmer ankle leggings engineered with 90% Spun Polyester and 10% Spandex for a radiant subtle shine and premium look. Features resilient 4-way stretch, comfortable non-rolling waistband, and clean ankle fit across all 48 commercial palette shades.'
WHERE id = 'prod-shimmer';

-- 5. Ladies Pyjama Set
UPDATE products
SET name = 'Ladies Pyjama Set',
    description = 'Ultra-comfortable 100% natural cotton rib loungewear pyjama set featuring a stylish classic Henley button neck, single utility chest pocket, and flexible leg cuff elastic. Designed for cool, breathable, all-day comfort in assorted verified prints.'
WHERE id = 'prod-pajama-set';

-- Update gallery titles
UPDATE gallery SET title = 'Lycra Anklefit Leggings' WHERE id = 'gal-1';
UPDATE gallery SET title = 'Palazzo Pants with Pockets & Rope' WHERE id = 'gal-2';
UPDATE gallery SET title = 'Patiala Pant with Rope' WHERE id = 'gal-3';
UPDATE gallery SET title = 'Shimmer Ankle Leggings' WHERE id = 'gal-4';
UPDATE gallery SET title = 'Ladies Pyjama Set' WHERE id = 'gal-5';
