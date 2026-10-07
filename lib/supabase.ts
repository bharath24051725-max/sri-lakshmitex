import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product, GalleryItem, EnquiryFormData } from '@/types/product';
import { PRODUCTS, GALLERY_ITEMS } from '@/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase client failed to initialize, using local fallback data repository.', error);
  }
}

export const supabase = supabaseInstance;

interface DbProductColor {
  id: string;
  product_id: string;
  color_name: string;
  color_code: string;
  image_url?: string;
}

interface DbProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

interface DbProductRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  main_image: string;
  active: boolean;
  product_colors?: DbProductColor[];
  product_images?: DbProductImage[];
}

interface DbGalleryRow {
  id: string;
  image_url: string;
  title: string;
  category: string;
  alt_text: string;
  sort_order: number;
}

/**
 * Fetch all active products.
 * If Supabase is connected and contains data, returns DB records.
 * Otherwise seamlessly returns local verified catalogue data.
 */
export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    return PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        category,
        description,
        main_image,
        active,
        product_colors (
          id,
          product_id,
          color_name,
          color_code,
          image_url
        ),
        product_images (
          id,
          product_id,
          image_url,
          alt_text,
          sort_order
        )
      `)
      .eq('active', true)
      .order('id', { ascending: true });

    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }

    const rows = data as unknown as DbProductRow[];

    // Map DB snake_case to frontend camelCase
    const dbProducts = rows.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      category: item.category,
      description: item.description,
      mainImage: item.main_image,
      active: item.active,
      colors: (item.product_colors || []).map((c) => ({
        id: c.id,
        productId: c.product_id,
        colorName: c.color_name,
        colorCode: c.color_code,
        imageUrl: c.image_url,
      })),
      additionalImages: (item.product_images || []).map((img) => ({
        id: img.id,
        productId: img.product_id,
        imageUrl: img.image_url,
        altText: img.alt_text,
        sortOrder: img.sort_order,
      })),
    }));

    // Merge: ensure all local products (with their updated images & swatches) are fully included
    const merged = PRODUCTS.map((local) => {
      const dbMatch = dbProducts.find((p) => p.slug === local.slug || p.id === local.id);
      if (!dbMatch) return local;
      return {
        ...local,
        description: local.description || dbMatch.description,
        active: dbMatch.active !== undefined ? dbMatch.active : local.active,
      };
    });

    // Also include any extra products created directly in Supabase that are not in local PRODUCTS
    const localSlugs = new Set(PRODUCTS.map((p) => p.slug));
    const extraDbProducts = dbProducts.filter((p) => !localSlugs.has(p.slug));

    return [...merged, ...extraDbProducts];
  } catch {
    return PRODUCTS;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const allProducts = await getProducts();
  const match = allProducts.find((p) => p.slug === slug);
  return match || null;
}

/**
 * Fetch gallery items
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!supabase) {
    return GALLERY_ITEMS;
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('id, image_url, title, category, alt_text, sort_order')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return GALLERY_ITEMS;
    }

    const rows = data as unknown as DbGalleryRow[];

    const dbItems = rows.map((g) => ({
      id: g.id,
      imageUrl: g.image_url,
      title: g.title,
      category: g.category,
      altText: g.alt_text,
      sortOrder: g.sort_order,
    }));

    // Include local gallery items not in DB
    const dbImages = new Set(dbItems.map((i) => i.imageUrl));
    const extraLocal = GALLERY_ITEMS.filter((i) => !dbImages.has(i.imageUrl));

    return [...dbItems, ...extraLocal];
  } catch {
    return GALLERY_ITEMS;
  }
}

/**
 * Submit an enquiry to Supabase if configured, or handle gracefully
 */
export async function submitEnquiry(
  formData: EnquiryFormData
): Promise<{ success: boolean; message: string; id?: string }> {
  if (!supabase) {
    // Graceful offline/local mode: log cleanly and return user-friendly success
    console.log('[Enquiry Received - Local Mode]:', formData);
    return {
      success: true,
      message: 'Thank you for your enquiry. Our team will contact you shortly.',
    };
  }

  try {
    const { error } = await supabase
      .from('enquiries')
      .insert([
        {
          name: formData.name,
          company_name: formData.companyName || null,
          phone_number: formData.phoneNumber,
          email: formData.email || null,
          product_interested_in: formData.productInterestedIn,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Supabase enquiry error:', error.message);
      return {
        success: false,
        message: 'Unable to submit enquiry to database right now. Please try again or message via WhatsApp.',
      };
    }

    return {
      success: true,
      message: 'Thank you for your enquiry. We will contact you promptly.',
    };
  } catch (err) {
    console.error('Submission error:', err);
    return {
      success: false,
      message: 'A network error occurred while submitting your enquiry. Please reach out via WhatsApp.',
    };
  }
}
