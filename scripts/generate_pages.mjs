// scripts/generate_pages.mjs
// REDESIGNED: Instead of generating 553 full component files,
// this now generates a single data manifest file (seoPageData.ts)
// and a lightweight SeoRoutes.tsx with one dynamic route.

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
    "Family Photography": "family-portrait-photographers-hyderabad-telangana",
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

function getPackageSlug(pkg) {
  return getOptimizedSlug(pkg.name, 'package', pkg.id);
}

function getPartnerSlug(partner) {
  return getOptimizedSlug(partner.sub_category || partner.name || '', 'partner', partner.id);
}

function getPackageSchema(pkg) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': pkg.name,
    'description': pkg.description || `Focsera premium curated package for ${pkg.domain}.`,
    'image': pkg.thumbnail || '',
    'brand': { '@type': 'Brand', 'name': 'Focsera' },
    'offers': {
      '@type': 'Offer',
      'price': 'Enquire',
      'priceCurrency': 'INR',
      'availability': 'https://schema.org/InStock',
    },
  };
}

function getPartnerSchema(partner) {
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

function getSeoMetadata(name, category, bio, itemType, locationName = 'Hyderabad') {
  const cleanCategory = (category || '').toLowerCase();
  let titleSuffix = `Premium Focsera Services in ${locationName}`;
  let categoryLabel = 'Services';
  
  if (cleanCategory.includes('event') || cleanCategory.includes('planner') || cleanCategory.includes('host')) {
    titleSuffix = `Best Event Planning & Coordination Services in ${locationName}`;
    categoryLabel = 'Event Planners & Decorators';
  } else if (cleanCategory.includes('interior') || cleanCategory.includes('makeover')) {
    titleSuffix = `Premium Residential & Commercial Interior Designers in ${locationName}`;
    categoryLabel = 'Interior Design Services';
  } else if (cleanCategory.includes('media') || cleanCategory.includes('editor') || cleanCategory.includes('edit')) {
    titleSuffix = `Professional Video Editing & Content Creation in ${locationName}`;
    categoryLabel = 'Video Editing & Post-Production';
  } else if (cleanCategory.includes('studio') || cleanCategory.includes('photo') || cleanCategory.includes('photographer')) {
    titleSuffix = `Creative Photography & Cinematic Videos in ${locationName}`;
    categoryLabel = 'Photography & Videography';
  } else if (cleanCategory.includes('web') || cleanCategory.includes('design') || cleanCategory.includes('developer') || cleanCategory.includes('coder')) {
    titleSuffix = `Top Website Development & UI/UX Design in ${locationName}`;
    categoryLabel = 'Website Development & UI/UX Design';
  }

  const seoTitle = `${name} in ${locationName} - ${titleSuffix} | Focsera`;
  const seoH1 = `${name} — ${categoryLabel} in ${locationName}`;
  
  let cleanBio = (bio || '').trim().replace(/\r?\n|\r/g, ' ');
  if (cleanBio.length > 150) {
    cleanBio = cleanBio.slice(0, 147) + '...';
  }
  const seoDescription = `${cleanBio} Book verified creative professionals and custom packages for ${name} in ${locationName} on Focsera.`;

  return { seoTitle, seoDescription, seoH1 };
}

function getRichIntroText(name, category, bio, locationName = 'Hyderabad') {
  const cat = (category || '').toLowerCase();
  const city = locationName;
  let specificText = bio || '';
  if (specificText.length < 20) {
    specificText = `Our premium custom ${name} solutions are designed to elevate your standard delivery expectations.`;
  }

  let intro = "";
  if (cat.includes('event') || cat.includes('planner') || cat.includes('host')) {
    intro = `Looking for trusted event organisers in ${city}? Focsera connects you with verified specialists for ${name}. Our professional event coordinators handle everything from spatial layouts and theme styling to balloon decoration, stage setups, sound management, and vendor coordination.\n\nWhether it's an intimate house gathering, a corporate activation, or a milestone celebration, our partners deliver premium end-to-end execution. We focus on creating unforgettable experiences with custom layouts, game segments, and professional hosting in ${city}.`;
  } else if (cat.includes('interior') || cat.includes('makeover') || cat.includes('cabinet') || cat.includes('sourcing')) {
    intro = `Planning a home renovation or looking for interior designers in ${city}? Focsera provides quality residential and commercial interior design services for ${name}. Our verified design partners offer professional space planning, modular installations, premium cabinetry, paint finishing, and furniture sourcing.\n\nWe use 3D layout renderings so you can preview your rooms before any work begins. From a small bedroom refresh to a complete home fit-out, Focsera ensures site supervision, timeline compliance, and milestone-protected payments in ${city}.`;
  } else if (cat.includes('media') || cat.includes('editor') || cat.includes('edit')) {
    intro = `Need a professional video editor in ${city}? Focsera offers verified editing services for ${name}, covering cinematic flow, color grading, sound design, and social media formatting. From YouTube content and Instagram reels to brand films and podcast episodes, our editors deliver polished results.\n\nWe use industry-standard software for assembly, motion graphics, animated lower thirds, and royalty-free music. Typical turnaround is 24-to-48 hours for short-form content, helping you maintain a consistent publishing schedule in ${city}.`;
  } else if (cat.includes('studio') || cat.includes('photo') || cat.includes('photographer') || cat.includes('video')) {
    intro = `Looking for professional photographers in ${city}? Focsera connects you with top-rated photography and videography experts for ${name}. We cover maternity shoots, newborn portraits, half-saree ceremonies, weddings, corporate headshots, and product photography.\n\nOur photographers use professional-grade cameras, advanced lighting, and creative backdrops to capture stunning visuals — at your doorstep, in a studio, or outdoors. Sessions include high-resolution edited files with digital gallery access in ${city}.`;
  } else {
    intro = `Looking for website development or design services in ${city}? Focsera offers verified development and design services for ${name}. Our expert designers and developers build high-performance landing pages, e-commerce stores, custom databases, and app UI/UX revamps.\n\nWe use modern tech stacks including React, Next.js, and Node.js to engineer secure, responsive, and search-optimized web applications. From a simple portfolio site to a full Shopify store with payment gateways, Focsera provides structured project milestones and post-launch support in ${city}.`;
  }

  return `${intro}\n\n${specificText}`;
}

function get15Faqs(category, serviceName, locationName = 'Hyderabad') {
  const cat = (category || '').toLowerCase();
  const city = locationName;
  
  const eventFaqs = [
    { question: `What is included in the ${serviceName} packages in ${city}?`, answer: `Our packages include event planning, theme selection, balloon arches or customized backdrops, stage lighting, venue setup, and clean-up in ${city}. We also coordinate with third-party vendors for catering, sound, and MCs.` },
    { question: `How far in advance should I book event planners in ${city}?`, answer: `We recommend booking at least 2 to 3 weeks before the event date. This ensures time for theme coordination, backdrop customization, and securing verified vendors in ${city}.` },
    { question: `Can I customize the decoration theme for ${serviceName} in ${city}?`, answer: `Yes, Focsera provides fully customizable themes for ${serviceName} setups in ${city}. Share image references with our coordinators and we will custom-build the setup.` },
    { question: `Do you manage outdoor venues or house parties in ${city}?`, answer: `Yes, we cover get-togethers, terrace parties, banquet halls, and outdoor lawns across ${city}. We adapt the setup to the specific location.` },
    { question: `What is the cancellation and rescheduling policy?`, answer: `You can reschedule up to 5 days before the scheduled date at no additional cost. Cancellations within 48 hours may incur a minor venue-setup fee.` },
    { question: `Do you provide game hosts, anchors, or magicians in ${city}?`, answer: `Yes, Focsera partners with party anchors, MCs, kids entertainers, and magicians in ${city} to keep your guests engaged.` },
    { question: `How do I coordinate with the assigned Focsera event planner?`, answer: `Once you place an inquiry, our coordinator contacts you via WhatsApp to align on theme, color palette, schedule, and vendor logistics.` },
    { question: `How does the booking and payment process work?`, answer: `Book through WhatsApp or the Focsera app. Payments are held securely and released after you review and approve the work.` },
  ];

  const interiorFaqs = [
    { question: `What is the typical timeline for ${serviceName} in ${city}?`, answer: `For modular kitchens or living room transformations in ${city}, the timeline ranges from 21 to 35 days, including factory manufacturing and site installation.` },
    { question: `How do your interior designers charge for services in ${city}?`, answer: `We offer transparent, modular rates based on the scope of woodwork, paint finishes, and materials chosen.` },
    { question: `Do you provide 3D visual designs before beginning work?`, answer: `Yes, all our interior design packages include detailed 2D layouts and realistic 3D renderings so you can visualize the space before procurement.` },
    { question: `What wood and hardware brands do you use?`, answer: `We use high-density moisture-resistant (HDMR) plywood and premium hardware brands like Hettich or Hafele for long-term durability.` },
    { question: `Is site supervision included?`, answer: `Yes, a dedicated project supervisor manages carpenters, painters, and electricians, providing daily photo updates.` },
    { question: `Do you help in selecting and sourcing furniture in ${city}?`, answer: `Yes, our designers coordinate with partner stores in ${city} to source lighting, curtains, and furniture at competitive prices.` },
    { question: `How is the payment structured for home renovation?`, answer: `We use a milestone-based system: 50% advance for design and factory start, 40% upon material delivery, and 10% post-installation.` },
    { question: `How does booking through Focsera work?`, answer: `Book through WhatsApp or the Focsera app. Your funds are held securely and only released after you approve the work milestones.` },
  ];

  const mediaFaqs = [
    { question: `What raw video formats can I submit for ${serviceName}?`, answer: `We support all standard formats including MP4, MOV, and AVI from DSLRs, mirrorless cameras, or smartphones.` },
    { question: `What is the turnaround time for video editing in ${city}?`, answer: `Reels and shorts are delivered within 24 to 48 hours. Longer podcast episodes and corporate films take 3 to 5 days.` },
    { question: `How many revision rounds are included?`, answer: `All video editing projects include 3 rounds of revisions. We work closely to adjust overlays, music, and cuts.` },
    { question: `Do you provide royalty-free music?`, answer: `Yes, we source quality royalty-free background tracks and sound effects for monetization-safe content.` },
    { question: `Can you create motion graphics and title animations?`, answer: `Yes, we design custom lower thirds, text animations, transitions, and call-to-action elements.` },
    { question: `Can you deliver vertical formatting for Reels and Shorts?`, answer: `Yes, we specialize in converting horizontal footage to vertical with smart framing, captions, and zoom cuts.` },
    { question: `What resolution is the final video delivered in?`, answer: `We deliver in Full HD (1080p) or Ultra HD (4K) as per your platform preferences.` },
    { question: `How does booking through Focsera work?`, answer: `Book through WhatsApp or the Focsera app. Your funds are held securely and only released after you approve the work.` },
  ];

  const studioFaqs = [
    { question: `Where does the ${serviceName} photoshoot take place in ${city}?`, answer: `Photoshoots can take place at your home, in a professional studio, or at outdoor locations in ${city}.` },
    { question: `How many edited photos will I receive?`, answer: `A standard 2-hour session delivers 30-50 high-resolution edited photos and all raw files via digital download.` },
    { question: `What is the turnaround time for photo delivery?`, answer: `Raw photos are shared within 24 hours. Final edited photos are delivered within 5 to 7 days.` },
    { question: `Do you provide outfits, props, and makeup?`, answer: `For maternity and newborn shoots, we coordinate props and backdrops. Makeup artists can be arranged as add-ons.` },
    { question: `Can I reschedule my photoshoot?`, answer: `Yes, reschedule up to 48 hours before the shoot. Weather or baby comfort rescheduling is accommodated.` },
    { question: `What cameras do your photographers use?`, answer: `Our photographers use professional Sony, Canon, or Nikon full-frame mirrorless cameras with portrait lenses.` },
    { question: `Can we request physical albums or frames?`, answer: `Yes, we offer premium lay-flat photo books and acrylic frames as add-ons after delivery.` },
    { question: `How does booking through Focsera work?`, answer: `Book through WhatsApp or the Focsera app. Your funds are held securely and only released after you approve the work.` },
  ];

  const webFaqs = [
    { question: `What technologies do you use for ${serviceName}?`, answer: `We build using React, Next.js, Tailwind CSS, Node.js, Shopify, and Webflow depending on project goals.` },
    { question: `Will my website be mobile-responsive and SEO-friendly?`, answer: `Yes, mobile optimization and foundational SEO setup are standard for every website we build.` },
    { question: `Do you provide domain registration and hosting setup?`, answer: `Yes, we guide you through purchasing domains and configure hosting on Vercel, Netlify, AWS, or Shopify.` },
    { question: `What is the timeline for custom website development?`, answer: `Landing pages take 5 to 7 days. Full e-commerce stores and custom sites take 2 to 4 weeks.` },
    { question: `Do you offer post-launch maintenance?`, answer: `Yes, Focsera provides 30 days of free technical support for bug fixes, monitoring, and minor updates.` },
    { question: `Can you redesign an existing app or website?`, answer: `Yes, we analyze user metrics, revamp UI/UX layouts, and rebuild components to boost conversions.` },
    { question: `How is the code handed over after completion?`, answer: `We push final source code to your GitHub account and hand over all administrative credentials.` },
    { question: `How does booking through Focsera work?`, answer: `Book through WhatsApp or the Focsera app. Your funds are held securely and only released after you approve the work.` },
  ];

  let chosenFaqs = [];
  if (cat.includes('event') || cat.includes('planner') || cat.includes('host')) {
    chosenFaqs = eventFaqs;
  } else if (cat.includes('interior') || cat.includes('makeover') || cat.includes('cabinet') || cat.includes('sourcing')) {
    chosenFaqs = interiorFaqs;
  } else if (cat.includes('media') || cat.includes('editor') || cat.includes('edit')) {
    chosenFaqs = mediaFaqs;
  } else if (cat.includes('studio') || cat.includes('photo') || cat.includes('photographer') || cat.includes('video')) {
    chosenFaqs = studioFaqs;
  } else {
    chosenFaqs = webFaqs;
  }

  return chosenFaqs;
}

async function generatePages() {
  console.log('Connecting and pulling data from Supabase...');
  try {
    const [
      packagesRes,
      partnersRes,
      packageDetailsRes,
      partnerDetailsRes
    ] = await Promise.all([
      supabase.from('unified_packages').select('*').eq('is_active', true),
      supabase.from('partner_profiles').select('*').not('name', 'is', null).neq('name', 'Uday'),
      supabase.from('package_category_details').select('*'),
      supabase.from('partner_category_details').select('*')
    ]);

    if (packagesRes.error) throw packagesRes.error;
    if (partnersRes.error) throw partnersRes.error;
    if (packageDetailsRes.error) throw packageDetailsRes.error;
    if (partnerDetailsRes.error) throw partnerDetailsRes.error;

    const packages = packagesRes.data || [];
    const partners = partnersRes.data || [];
    const packageDetails = packageDetailsRes.data || [];
    const partnerDetails = partnerDetailsRes.data || [];

    // ── BUILD DATA MANIFEST ──
    const pageDataMap = {};

    // ─── PACKAGES ───
    for (const pkg of packages) {
      const baseSlug = getPackageSlug(pkg);
      if (!baseSlug) continue;

      for (const location of TARGET_LOCATIONS) {
        const slug = getLocationSlug(baseSlug, location.slug);
        const details = packageDetails.find(d => d.package_id === pkg.id) || null;
        const schemaData = getPackageSchema(pkg);

        // Resolve related partners
        let categorySearch = '';
        if (pkg.domain.toLowerCase() === 'event') categorySearch = 'Event';
        else if (pkg.domain.toLowerCase() === 'interiors') categorySearch = 'Interior';
        else if (pkg.domain.toLowerCase() === 'media') categorySearch = 'Editor';
        else if (pkg.domain.toLowerCase() === 'studio') categorySearch = 'Photographer';
        else if (pkg.domain.toLowerCase() === 'web') categorySearch = 'Design';

        const related = partners
          .filter(p => p.category.toLowerCase().includes(categorySearch.toLowerCase()))
          .slice(0, 3)
          .map(p => ({
            id: p.id,
            name: p.sub_category || p.category || 'Focsera Partner',
            subtitle: p.category,
            description: p.bio || '',
            imageUrl: p.avatar_url || '',
            slug: getLocationSlug(getPartnerSlug(p), location.slug)
          }));
        
        const { seoTitle, seoDescription, seoH1 } = getSeoMetadata(pkg.name, pkg.domain, pkg.description || '', 'package', location.name);
        const richIntro = getRichIntroText(pkg.name, pkg.domain, pkg.description || '', location.name);
        const faqsList = get15Faqs(pkg.domain, pkg.name, location.name);

        pageDataMap[slug] = {
          slug,
          baseSlug,
          name: pkg.name,
          subtitle: `${pkg.domain} Package`,
          bio: pkg.description || '',
          price: pkg.price || pkg.price_min || 'Enquire',
          thumbnail: pkg.thumbnail || '',
          isVerified: false,
          rating: 5,
          reviews: 120,
          exp: 6,
          categoryDetails: details,
          themeColors: { primary: '', text: '', bgGlow: '', border: '' },
          relatedItems: related,
          itemType: 'package',
          seoTitle,
          seoDescription,
          seoH1,
          richIntro,
          faqsList,
          reviewsList: [],
          locationName: location.name,
          schemaData,
        };
      }
    }

    // ─── PARTNERS ───
    for (const partner of partners) {
      const baseSlug = getPartnerSlug(partner);
      if (!baseSlug) continue;

      for (const location of TARGET_LOCATIONS) {
        const slug = getLocationSlug(baseSlug, location.slug);
        const details = partnerDetails.find(d => d.partner_id === partner.id) || null;
        const schemaData = getPartnerSchema(partner);

        // Resolve related packages
        let domainSearch = '';
        const cat = partner.category.toLowerCase();
        if (cat.includes('event') || cat.includes('host') || cat.includes('planner')) domainSearch = 'Event';
        else if (cat.includes('interior')) domainSearch = 'Interiors';
        else if (cat.includes('editor') || cat.includes('reel')) domainSearch = 'Media';
        else if (cat.includes('photographer') || cat.includes('photo')) domainSearch = 'Studio';
        else if (cat.includes('design') || cat.includes('web') || cat.includes('coder')) domainSearch = 'Web';

        const related = packages
          .filter(p => p.domain === domainSearch)
          .slice(0, 3)
          .map(p => ({
            id: p.id,
            name: p.name,
            subtitle: `${p.domain} Package`,
            description: p.description || '',
            imageUrl: p.thumbnail || '',
            slug: getLocationSlug(getPackageSlug(p), location.slug)
          }));

        const partnerName = partner.sub_category || partner.category || 'Focsera Partner';
        const { seoTitle, seoDescription, seoH1 } = getSeoMetadata(partnerName, partner.category, partner.bio || '', 'partner', location.name);
        const richIntro = getRichIntroText(partnerName, partner.category, partner.bio || '', location.name);
        const faqsList = get15Faqs(partner.category, partnerName, location.name);

        pageDataMap[slug] = {
          slug,
          baseSlug,
          name: partnerName,
          subtitle: partner.category || '',
          bio: partner.bio || '',
          price: partner.price || 'Enquire',
          thumbnail: partner.avatar_url || '',
          isVerified: partner.is_verified || false,
          rating: partner.rating || 5.0,
          reviews: partner.reviews_count || 0,
          exp: partner.experience_years || 5,
          categoryDetails: details,
          themeColors: { primary: '', text: '', bgGlow: '', border: '' },
          relatedItems: related,
          itemType: 'partner',
          seoTitle,
          seoDescription,
          seoH1,
          richIntro,
          faqsList,
          reviewsList: [],
          locationName: location.name,
          schemaData,
        };
      }
    }

    // ── Write data manifest ──
    const dataPath = path.resolve(__dirname, '../src/data');
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath, { recursive: true });
    }

    const dataContent = `// AUTO-GENERATED — Do not edit manually.
// Generated by scripts/generate_pages.mjs
// Contains page data for all SEO landing pages.

import type { PageData } from '../components/seo/types';

export const seoPageDataMap: Record<string, PageData> = ${JSON.stringify(pageDataMap, null, 0)};

export const seoPageSlugs: string[] = ${JSON.stringify(Object.keys(pageDataMap))};
`;

    fs.writeFileSync(path.join(dataPath, 'seoPageData.ts'), dataContent);
    console.log(`Generated data manifest with ${Object.keys(pageDataMap).length} page entries.`);

    // ── Write SeoRoutes.tsx ──
    const seoPagesPath = path.resolve(__dirname, '../src/pages/seo');
    if (!fs.existsSync(seoPagesPath)) {
      fs.mkdirSync(seoPagesPath, { recursive: true });
    }

    // Clean old generated files (keep SeoRoutes.tsx which we're about to overwrite)
    fs.readdirSync(seoPagesPath).forEach(file => {
      if (file.endsWith('.tsx') && file !== 'SeoRoutes.tsx') {
        fs.unlinkSync(path.join(seoPagesPath, file));
      }
    });

    const routesContent = `// src/pages/seo/SeoRoutes.tsx
// AUTO-GENERATED — Do not edit manually.
// Single dynamic route replaces 553+ static routes.

import { Routes, Route, useParams } from 'react-router-dom';
import SeoPageTemplate from '../../components/seo/SeoPageTemplate';
import { seoPageDataMap } from '../../data/seoPageData';

function SeoPageResolver() {
  const params = useParams();
  const slug = params['*'] || '';
  const pageData = seoPageDataMap[slug];

  if (!pageData) {
    return (
      <div className="min-h-screen bg-focsera-bg flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-focsera-text mb-4 font-heading">Page Not Found</h1>
        <p className="text-focsera-muted mb-8 max-w-md">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    );
  }

  return <SeoPageTemplate data={pageData} />;
}

export default function SeoRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<SeoPageResolver />} />
    </Routes>
  );
}
`;

    fs.writeFileSync(path.join(seoPagesPath, 'SeoRoutes.tsx'), routesContent);
    console.log(`Generated SeoRoutes.tsx with single dynamic route.`);
    console.log(`Total pages: ${Object.keys(pageDataMap).length}`);
    console.log('Done!');

  } catch (error) {
    console.warn('Warning: Failed to generate pages from Supabase (network/DNS/credentials error). Using pre-generated files.', error);
    process.exit(0);
  }
}

generatePages();
export default generatePages;
