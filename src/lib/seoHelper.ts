// src/lib/seoHelper.ts

/**
 * Generates a clean, SEO-friendly URL slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove all non-word characters except dashes and spaces
    .replace(/[-\s]+/g, '-')    // Replace spaces and multiple dashes with a single dash
    .replace(/(^-|-$)+/g, '')   // Trim dashes from start and end
    .trim();
}

/**
 * Custom requested URL slug overrides mapping to exact package/partner database IDs.
 */
export const ALIAS_MAPPING: Record<string, { type: 'package' | 'partner'; id: string }> = {
  'birthday-event-planning': { type: 'package', id: 'event-001' },
  'logo-brand-design': { type: 'partner', id: 'e5f92832-bc21-49e4-ae01-334f20fc724d' },
  'photography-services': { type: 'package', id: 'studio-001' },
  'video-editing-services': { type: 'partner', id: 'f76e4eb4-f73d-46e8-b3c9-2c9c5f659b25' },
  'business-website-development': { type: 'package', id: 'web-002' },
};

/**
 * Local neighborhood variations targeting in Hyderabad.
 */
export const TARGET_LOCATIONS = [
  { slug: 'hyderabad', name: 'Hyderabad' },
  { slug: 'gachibowli', name: 'Gachibowli' },
  { slug: 'secunderabad', name: 'Secunderabad' },
  { slug: 'kondapur', name: 'Kondapur' },
  { slug: 'jubilee-hills', name: 'Jubilee Hills' },
  { slug: 'madhapur', name: 'Madhapur' },
  { slug: 'banjara-hills', name: 'Banjara Hills' },
  { slug: 'kukatpally', name: 'Kukatpally' }
];

/**
 * Replaces the 'hyderabad' suffix or appends the neighborhood slug to construct hyper-local URLs.
 */
export function getLocationSlug(baseSlug: string, locationSlug: string): string {
  if (locationSlug === 'hyderabad') {
    return baseSlug;
  }

  if (baseSlug.endsWith('-hyderabad-telangana')) {
    return baseSlug.replace('-hyderabad-telangana', `-${locationSlug}`);
  }

  if (baseSlug.endsWith('-hyderabad')) {
    return baseSlug.replace('-hyderabad', `-${locationSlug}`);
  }

  return `${baseSlug}-${locationSlug}`;
}

/**
 * Maps any package name or partner sub-category to a highly optimized search-intent slug.
 */
export function getOptimizedSlug(nameOrSubcategory: string, type: 'package' | 'partner', id?: string): string {
  const cleanName = (nameOrSubcategory || '').trim().replace(/\s+/g, ' ');

  // Check ALIAS_MAPPING first
  if (id) {
    const aliasEntry = Object.entries(ALIAS_MAPPING).find(([alias, target]) => target.type === type && target.id === id);
    if (aliasEntry) return aliasEntry[0];
  }

  // Direct exact matches dictionary for maximum SEO competitiveness
  const mapping: Record<string, string> = {
    // Packages
    "Birthday & Celebration Package": "birthday-event-planning",
    "Doorstep Photography Session": "photography-services",
    "Kids Party Package": "kids-birthday-party-planners-hyderabad",
    "Corporate & Social Event Package": "corporate-event-planners-hyderabad",
    "Room Refresh Package": "room-renovation-interior-design-hyderabad",
    "Living Space Makeover": "living-room-interior-design-hyderabad",
    "Full Home Transformation": "interior-designers-hyderabad",
    "Reels & Video Session": "reels-video-shoot-services-hyderabad",
    "Brand Content Session": "brand-content-creation-photography",
    "Brand Identity Kit": "brand-identity-design-services",
    "Business Website": "business-website-development",
    "Design & Marketing Pack": "graphic-design-marketing-services",
    "Content Editing Pack": "content-editing-services",
    "Full Media Kit": "full-media-production-services",
    "Online Store": "ecommerce-website-development",

    // Partners sub_category
    "Maternity Shoot": "best-maternity-photographers-hyderabad",
    "First Birthday": "first-birthday-party-photographers-hyderabad",
    "Newborn & Baby Shoot": "newborn-baby-photography-services-hyderabad",
    "Mehndi / Haldi Shoot": "mehndi-haldi-function-photographers-hyderabad",
    "Half Saree Ceremony": "half-saree-ceremony-photographers-hyderabad",
    "Birthday Party": "birthday-party-photographers-hyderabad",
    "Corporate Event Planning": "event-planners-hyderabad",
    "Family Photography": "family-portrait-photographers-hyderabad",
    "Graduation Shoot": "graduation-portrait-photographers-hyderabad",
    "Kids & Children": "kids-children-photographers-hyderabad",
    "Cinematic/Themed Shoot": "cinematic-themed-photoshoots-hyderabad",
    "Anniversary Shoot": "anniversary-party-photographers-hyderabad",
    "Pet Photography": "professional-pet-photographers-hyderabad",
    "Fitness / Physique Shoot": "fitness-sports-photographers-hyderabad",
    "Business": "corporate-business-photography-hyderabad",
    "Couple Shoot": "pre-wedding-couple-photoshoots-hyderabad",
    "Product Shoot": "commercial-product-photographers-hyderabad",
    "Baby Milestone Video": "baby-milestone-video-production-hyderabad",
    "Birthday / Event Film": "birthday-event-videographers-hyderabad",
    "Brand Story Video": "corporate-brand-story-video-production",
    "Fitness & Gym Video": "fitness-gym-promo-videos-hyderabad",
    "Interview / Talking Head": "interview-talking-head-video-services",
    "Restaurant / Food Video": "restaurant-food-promotional-videos-hyderabad",
    "E-commerce Store Setup": "ecommerce-shopify-store-setup",
    "Music Video / Song Reel": "music-video-song-reel-production",
    "Professional": "professional-creative-services-agency",
    "Corporate Promo Video": "corporate-promo-video-production",
    "Database Setup & Optimisation": "database-setup-and-optimization-services",
    "Landing Page / Portfolio Site": "landing-page-portfolio-website-design",
    "UI/UX Design + Prototype": "ui-ux-design-prototyping-services",
    "Website Development": "custom-website-development-services",
    "YouTube Shorts": "youtube-shorts-video-editors",
    "Business Promo Reel": "business-promo-reels-creation",
    "Fitness Transformation Reel": "fitness-transformation-reels-editing",
    "Instagram Feed Reels": "instagram-feed-reels-video-editing",
    "Personal Portfolio Reel": "personal-portfolio-reels-creation",
    "Podcast / Interview Clips": "podcast-interview-clips-editing",
    "Product / Brand Reel": "product-brand-reels-production",
    "Restaurant / Food Reel": "restaurant-food-reels-production",
    "Wedding / Event Highlight Reel": "wedding-event-highlight-reels",
    "Birthday Party Planning": "birthday-party-planning-services-hyderabad",
    "Surprise Party Planning": "surprise-party-planning-services",
    "AI Chatbot Integration": "ai-chatbot-integration-services",
    "Get Together / House Party": "house-party-event-planning-services",
    "Logo & Brand Identity": "logo-design-services",
    "Modular Kitchen Design": "modular-kitchen-designers-hyderabad",
    "Bedroom / Living Room Makeover": "bedroom-living-room-interior-design",
    "Home Interior Consultation": "home-interior-design-consultation",
    "Motion Graphics / Titles": "motion-graphics-title-animation",
    "Podcast Editing": "podcast-video-editors-hyderabad",
    "Video Editing / Reels & YouTube": "video-editing-services",
    "Wedding / Event Video Edit": "wedding-event-video-editing",
    "Birthday Party Host": "birthday-party-anchors-hosts",
    "Office / Commercial Interior": "office-commercial-interior-design",
    "Furniture Selection & Sourcing": "furniture-selection-and-sourcing",
    "Kids Party Entertainer": "kids-party-entertainers-magicians",
    "Painting & Wall Finish": "home-wall-painting-services",
    "Budget Makeover": "budget-home-interior-makeover",
    "Wardrobe & Storage Design": "wardrobe-storage-cabinet-design",
    "Lighting Design": "residential-commercial-lighting-design",
    "App UI Revamp": "mobile-app-ui-ux-revamp",
    "Wedding / Sangeet MC": "wedding-sangeet-mc-anchors"
  };

  return mapping[cleanName] || slugify(cleanName);
}

/**
 * Finds a matching package or partner profile based on a URL slug.
 */
export function findMatchingItem(slug: string, packages: any[], partners: any[]): { type: 'package' | 'partner'; data: any } | null {
  const cleanSlug = slug.toLowerCase().trim();

  // Helper to extract base slug by removing target location suffixes
  const getBaseFromLocationSlug = (s: string) => {
    if (ALIAS_MAPPING[s]) return s;

    for (const loc of TARGET_LOCATIONS) {
      if (loc.slug === 'hyderabad') continue;

      if (s.endsWith(`-${loc.slug}`)) {
        const hyphed = s.slice(0, -`-${loc.slug}`.length);
        const testBase = hyphed + '-hyderabad';
        const pkgExist = packages.some(p => getOptimizedSlug(p.name, 'package', p.id) === testBase);
        const partnerExist = partners.some(p => p.sub_category && getOptimizedSlug(p.sub_category, 'partner', p.id) === testBase);
        if (pkgExist || partnerExist) {
          return testBase;
        }
        const testBase2 = hyphed;
        const pkgExist2 = packages.some(p => getOptimizedSlug(p.name, 'package', p.id) === testBase2);
        const partnerExist2 = partners.some(p => p.sub_category && getOptimizedSlug(p.sub_category, 'partner', p.id) === testBase2);
        if (pkgExist2 || partnerExist2) {
          return testBase2;
        }
      }
    }
    return s;
  };

  const lookupSlug = getBaseFromLocationSlug(cleanSlug);

  // 1. Check custom aliases first
  const alias = ALIAS_MAPPING[lookupSlug];
  if (alias) {
    if (alias.type === 'package') {
      const match = packages.find(p => p.id === alias.id);
      if (match) return { type: 'package', data: match };
    } else {
      const match = partners.find(p => p.id === alias.id);
      if (match) return { type: 'partner', data: match };
    }
  }

  // 2. Try matching package optimized slugs
  const pkgMatch = packages.find(p => getOptimizedSlug(p.name, 'package', p.id) === lookupSlug);
  if (pkgMatch) return { type: 'package', data: pkgMatch };

  // 3. Try matching partner optimized slugs (based on sub_category)
  const partnerSubMatch = partners.find(p => p.sub_category && getOptimizedSlug(p.sub_category, 'partner', p.id) === lookupSlug);
  if (partnerSubMatch) return { type: 'partner', data: partnerSubMatch };

  // 4. Try matching partner name slugs (fallback)
  const partnerNameMatch = partners.find(p => p.name && slugify(p.name) === lookupSlug);
  if (partnerNameMatch) return { type: 'partner', data: partnerNameMatch };

  return null;
}

/**
 * Generates JSON-LD Structured Data Schema for a Package.
 */
export function getPackageSchema(pkg: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': pkg.name,
    'description': pkg.description || `Focsera premium curated package for ${pkg.domain}.`,
    'image': pkg.thumbnail || '',
    'brand': {
      '@type': 'Brand',
      'name': 'Focsera',
    },
    'offers': {
      '@type': 'Offer',
      'price': 'Enquire',
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
    },
  };
}

/**
 * Generates JSON-LD Structured Data Schema for a Partner Profile.
 */
export function getPartnerSchema(partner: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': partner.sub_category || partner.category || 'Focsera Partner',
    'image': partner.avatar_url || '',
    'description': partner.bio || `Verified expert in ${partner.sub_category || partner.category}.`,
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Hyderabad',
      'addressRegion': 'Telangana',
      'addressCountry': 'IN',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': partner.rating ? partner.rating.toString() : '5.0',
      'reviewCount': partner.reviews_count ? partner.reviews_count.toString() : '1',
    },
  };
}


