import { getProducts, getGalleryItems } from '@/lib/supabase';
import MainLanding from '@/components/MainLanding';

export const revalidate = 60; // Incremental Static Regeneration every 60s

export default async function HomePage() {
  const [products, galleryItems] = await Promise.all([
    getProducts(),
    getGalleryItems(),
  ]);

  return <MainLanding products={products} galleryItems={galleryItems} />;
}
