// src/components/seo/types.ts
// Shared type definitions for the SEO page template system

export interface RelatedItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  name: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CategoryDetails {
  id?: string;
  package_id?: string;
  partner_id?: string;
  hero_description?: string;
  inclusions?: string[];
  styles?: string[];
  examples?: string[];
  workflow?: string[];
  deliverables?: string[];
  use_cases?: string[];
  tips?: string[];
  faqs?: FaqItem[];
}

export interface ThemeColors {
  primary: string;
  text: string;
  bgGlow: string;
  border: string;
}

export interface PageData {
  slug: string;
  baseSlug: string;
  name: string;
  subtitle: string;
  bio: string;
  price: number | string;
  thumbnail: string;
  isVerified: boolean;
  rating: number;
  reviews: number;
  exp: number;
  categoryDetails: CategoryDetails | null;
  themeColors: ThemeColors;
  relatedItems: RelatedItem[];
  itemType: 'package' | 'partner';
  seoTitle: string;
  seoDescription: string;
  seoH1: string;
  richIntro: string;
  faqsList: FaqItem[];
  reviewsList: ReviewItem[];
  locationName: string;
  schemaData: Record<string, any>;
}

/** Resolve the category accent color class from theme/domain context */
export function getCategoryAccent(subtitle: string): string {
  const lower = (subtitle || '').toLowerCase();
  if (lower.includes('event') || lower.includes('planner') || lower.includes('host')) return 'text-category-event';
  if (lower.includes('interior') || lower.includes('makeover')) return 'text-category-interior';
  if (lower.includes('media') || lower.includes('editor') || lower.includes('edit')) return 'text-category-media';
  if (lower.includes('studio') || lower.includes('photo')) return 'text-category-photo';
  if (lower.includes('web') || lower.includes('design') || lower.includes('coder')) return 'text-category-web';
  return 'text-focsera-primary';
}

export function getCategoryBgAccent(subtitle: string): string {
  const lower = (subtitle || '').toLowerCase();
  if (lower.includes('event') || lower.includes('planner') || lower.includes('host')) return 'bg-orange-50';
  if (lower.includes('interior') || lower.includes('makeover')) return 'bg-amber-50';
  if (lower.includes('media') || lower.includes('editor') || lower.includes('edit')) return 'bg-purple-50';
  if (lower.includes('studio') || lower.includes('photo')) return 'bg-blue-50';
  if (lower.includes('web') || lower.includes('design') || lower.includes('coder')) return 'bg-teal-50';
  return 'bg-focsera-accent';
}
