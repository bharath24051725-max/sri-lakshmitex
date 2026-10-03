import { BusinessConfig } from '@/types/product';

/**
 * SRI LAKSHMI TEX - Business Information Configuration
 * 
 * NOTE FOR CLIENT/ADMIN:
 * Replace the placeholder values below with your verified business details.
 * When real values are added here, they will automatically reflect across
 * the entire website (Navbar, Footer, Contact Section, WhatsApp button).
 */
export const BUSINESS_CONFIG: BusinessConfig = {
  companyName: 'SRI LAKSHMI TEX',
  tagline: 'Ladies Bottom Wear Manufacturer & Supplier',
  
  phone: '9566611813',
  phoneRaw: '+919566611813',
  
  whatsAppNumber: '919566611813',
  
  email: 'Srilakshmitex@outlook.com',
  
  address: '2/384 U, Morarji Desai Nagar, Poondi Ring Road, Opposite to ESIC Hospital, Tirupur - 641603.',
};

/**
 * Generate a WhatsApp chat URL with pre-filled product enquiry text
 */
export function getWhatsAppUrl(
  productName?: string,
  userMessage?: string
): string {
  const number = BUSINESS_CONFIG.whatsAppNumber.replace(/[^0-9]/g, '');
  
  let text = '';
  if (productName && productName !== 'General Enquiry') {
    text = `Hello, I am interested in your ${productName} collection. Please share the available product details, catalogue, and colors.`;
  } else {
    text = `Hello SRI LAKSHMI TEX, I would like to make a business enquiry regarding your ladies' bottom wear products.`;
  }

  if (userMessage) {
    text += `\n\nSpecific requirement: ${userMessage}`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/**
 * Navigation links for Header and Footer
 */
export const NAV_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'Products & Services', href: '/#products' },
  { name: 'Photos', href: '/#photos' },
  { name: 'About Us', href: '/#about' },
  { name: 'Contact Us', href: '/#contact' },
];

/**
 * Helper to combine CSS class names conditionally
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

