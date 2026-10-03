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

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Leggings' | 'Palazzo Pants' | 'Patiala Pants';
  description: string;
  mainImage: string;
  active: boolean;
  colors: ProductColor[];
  additionalImages?: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'All' | 'Leggings' | 'Palazzo Pants' | 'Patiala Pants' | 'Manufacturing & Fabric';
  altText: string;
  sortOrder: number;
  createdAt?: string;
}

export interface EnquiryFormData {
  name: string;
  companyName?: string;
  phoneNumber: string;
  email?: string;
  productInterestedIn: 'Leggings' | 'Palazzo Pants' | 'Patiala Pants' | 'General Enquiry';
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
