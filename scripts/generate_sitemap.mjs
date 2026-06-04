import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

// Standard Fallback Supabase Credentials
let SUPABASE_URL = 'https://gyjedezyhdlpwzeyixwg.supabase.co';
let SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amVkZXp5aDRscHd6ZXlpeHdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDA5NDcsImV4cCI6MjA3NjExNjk0N30.6hsjkGN5ojE0jkLnO9qX5fRAGIQABLzlLoqagcNrm1s';

// Parse .env if it exists in the workspace root
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envLines = envContent.split('\n');
  for (const line of envLines) {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key === 'VITE_SUPABASE_URL') SUPABASE_URL = val;
      if (key === 'VITE_SUPABASE_ANON_KEY') SUPABASE_ANON_KEY = val;
    }
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .trim();
}

const ALIAS_MAPPING = {
  'birthday-event-planning': { type: 'package', id: 'event-001' },
  'logo-brand-design': { type: 'partner', id: 'e5f92832-bc21-49e4-ae01-334f20fc724d' },
  'photography-services': { type: 'package', id: 'studio-001' },
  'video-editing-services': { type: 'partner', id: 'f76e4eb4-f73d-46e8-b3c9-2c9c5f659b25' },
  'business-website-development': { type: 'package', id: 'web-002' },
};

function getOptimizedSlug(nameOrSubcategory, type, id) {
  const cleanName = (nameOrSubcategory || '').trim().replace(/\s+/g, ' ');

  // Check ALIAS_MAPPING first
  if (id) {
    const aliasEntry = Object.entries(ALIAS_MAPPING).find(([alias, target]) => target.type === type && target.id === id);
    if (aliasEntry) return aliasEntry[0];
  }

  // Direct exact matches dictionary for maximum SEO competitiveness
  const mapping = {
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

const TARGET_LOCATIONS = [
  { slug: 'hyderabad', name: 'Hyderabad' },
  { slug: 'gachibowli', name: 'Gachibowli' },
  { slug: 'secunderabad', name: 'Secunderabad' },
  { slug: 'kondapur', name: 'Kondapur' },
  { slug: 'jubilee-hills', name: 'Jubilee Hills' },
  { slug: 'madhapur', name: 'Madhapur' },
  { slug: 'banjara-hills', name: 'Banjara Hills' },
  { slug: 'kukatpally', name: 'Kukatpally' }
];

function getLocationSlug(baseSlug, locationSlug) {
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

const BASE_URL = 'https://focsera.in';

const staticRoutes = [
  '/',
  '/about',
  '/mission',
  '/contact',
  '/studios',
  '/media',
  '/events',
  '/web',
  '/interiors',
  '/labs',
  '/journey',
  '/promptx',
  '/ai-workshop',
  '/terms',
  '/privacy',
  '/refund-policy',
  '/terms-of-use',
  '/refund-cancellation-policy',
  '/privacy-policy',
];

async function generateSitemap() {
  console.log('Fetching active packages & partners from Supabase...');
  
  try {
    const [packagesRes, partnersRes] = await Promise.all([
      supabase.from('unified_packages').select('id, name, is_active').eq('is_active', true),
      supabase.from('partner_profiles').select('id, name, sub_category').not('name', 'is', null).neq('name', 'Uday')
    ]);

    if (packagesRes.error) throw packagesRes.error;
    if (partnersRes.error) throw partnersRes.error;

    const packages = packagesRes.data || [];
    const partners = partnersRes.data || [];

    const packagePrimaryUrls = new Set();
    const packageLocalUrls = new Set();
    const partnerUrls = new Set();
    const staticUrls = new Set();

    // 1. Add Static Routes
    staticRoutes.forEach(route => {
      staticUrls.add(`${BASE_URL}${route}`);
    });

    // 2. Add Package Slugs (8 variants each)
    packages.forEach(pkg => {
      const baseSlug = getOptimizedSlug(pkg.name, 'package', pkg.id);
      if (baseSlug) {
        TARGET_LOCATIONS.forEach(loc => {
          const slug = getLocationSlug(baseSlug, loc.slug);
          const fullUrl = `${BASE_URL}/${slug}`;
          if (loc.slug === 'hyderabad') {
            packagePrimaryUrls.add(fullUrl);
          } else {
            packageLocalUrls.add(fullUrl);
          }
        });
      }
    });

    // 3. Add Partner Slugs (8 variants each)
    partners.forEach(partner => {
      const baseSlug = getOptimizedSlug(partner.sub_category || partner.name || '', 'partner', partner.id);
      if (baseSlug) {
        TARGET_LOCATIONS.forEach(loc => {
          const slug = getLocationSlug(baseSlug, loc.slug);
          const fullUrl = `${BASE_URL}/${slug}`;
          partnerUrls.add(fullUrl);
        });
      }
    });

    // Merge into list of unique urls to output
    const allUrls = new Set([
      ...staticUrls,
      ...packagePrimaryUrls,
      ...packageLocalUrls,
      ...partnerUrls
    ]);

    const getUrlPriority = (url) => {
      const pathPart = url.replace(BASE_URL, '');
      if (pathPart === '/' || pathPart === '') {
        return '1.0';
      }

      const coreCategories = ['/events', '/interiors', '/studios', '/web', '/media'];
      if (coreCategories.includes(pathPart)) {
        return '0.9';
      }

      const policies = [
        '/about', '/contact', '/mission', '/journey', '/labs', '/promptx', '/ai-workshop',
        '/terms', '/privacy', '/refund-policy', '/terms-of-use', '/refund-cancellation-policy', '/privacy-policy'
      ];
      if (policies.includes(pathPart)) {
        return '0.5';
      }

      if (packagePrimaryUrls.has(url)) {
        return '0.8';
      }

      // Package local variants, partner primary pages, and partner local variants get 0.7
      return '0.7';
    };

    // 4. Generate XML Structure
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    Array.from(allUrls).forEach(url => {
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${getUrlPriority(url)}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;

    const publicPath = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), xml);
    console.log(`Successfully generated sitemap.xml with ${allUrls.size} URLs in public/sitemap.xml!`);

  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
