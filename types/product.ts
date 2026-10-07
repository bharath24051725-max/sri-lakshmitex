export interface ProductColor {
  id: string;
  productId: string;
  colorName: string;
  colorCode: string; // Hex code, e.g. #000000
  imageUrl?: string;
  createdAt?: string;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  altText: string;
  sortOrder: number;
  createdAt?: string;
}

export type ProductCategory =
  | 'Leggings'
  | 'Palazzo Pants'
  | 'Patiala Pants'
  | 'Shimmer Leggings'
  | 'Pajama Sets'
  | 'Kids Wear';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory | string;
  description: string;
  mainImage: string;
  active: boolean;
  colors: ProductColor[];
  additionalImages?: ProductImage[];
  composition?: string;
  features?: string[];
  fit?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'All' | ProductCategory | 'Manufacturing & Fabric' | string;
  altText: string;
  sortOrder: number;
  createdAt?: string;
}

export interface EnquiryFormData {
  name: string;
  companyName?: string;
  phoneNumber: string;
  email?: string;
  productInterestedIn: string;
  message: string;
}

export interface BusinessConfig {
  companyName: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsAppNumber: string;
  email: string;
  address: string;
  workingHours?: string;
}
