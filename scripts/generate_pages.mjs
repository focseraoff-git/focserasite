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

function toPascalCase(str) {
  if (!str) return 'SeoPage';
  return str
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
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

function getThemeColors(domainOrCategory) {
  const lower = (domainOrCategory || '').toLowerCase();
  if (lower.includes('event') || lower.includes('planner') || lower.includes('host')) {
    return { primary: 'from-orange-500 to-red-500', text: 'text-orange-500', bgGlow: 'bg-orange-500/10', border: 'border-orange-500/20' };
  }
  if (lower.includes('interior')) {
    return { primary: 'from-amber-500 to-yellow-600', text: 'text-amber-500', bgGlow: 'bg-amber-500/10', border: 'border-amber-500/20' };
  }
  if (lower.includes('media') || lower.includes('edit')) {
    return { primary: 'from-purple-600 to-pink-600', text: 'text-purple-500', bgGlow: 'bg-purple-500/10', border: 'border-purple-500/20' };
  }
  if (lower.includes('studio') || lower.includes('photo')) {
    return { primary: 'from-blue-600 to-cyan-500', text: 'text-blue-500', bgGlow: 'bg-blue-500/10', border: 'border-blue-500/20' };
  }
  if (lower.includes('web') || lower.includes('design') || lower.includes('coder')) {
    return { primary: 'from-indigo-600 to-teal-500', text: 'text-indigo-500', bgGlow: 'bg-indigo-500/10', border: 'border-indigo-500/20' };
  }
  return { primary: 'from-blue-600 to-indigo-600', text: 'text-blue-500', bgGlow: 'bg-blue-500/10', border: 'border-blue-500/20' };
}

function getPackageSchema(pkg) {
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
  const seoH1 = `${name} - ${categoryLabel} in ${locationName}`;
  
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
    specificText = `our premium custom ${name} solutions designed to elevate your standard delivery expectations.`;
  }

  let intro = "";
  if (cat.includes('event') || cat.includes('planner') || cat.includes('host')) {
    intro = `Looking for the best event organisers and party decorators in ${city}? Focsera matches you with verified specialists for ${name}. Our professional event coordinators specialize in spatial layouts, theme styling, balloon decoration, stage setups, sound management, and seamless vendor coordination. Planning a milestone celebration can be stressful, but our team is dedicated to handling all logistics, arriving 2 hours early to ensure every detail from the cake table to the main stage backdrop is perfect. Whether it's an intimate house gathering, a corporate social activation, or a major celebration, we align with the top local planners to provide premium end-to-end execution. We focus on creating unforgettable experiences, catering to custom layouts, specialized game segments, and high-energy guest hosting. Trust Focsera for structured event solutions in ${city} that fit your scale and target your guest's absolute comfort.`;
  } else if (cat.includes('interior') || cat.includes('makeover') || cat.includes('cabinet') || cat.includes('sourcing')) {
    intro = `Embarking on a home renovation or looking for modular kitchen designers in ${city}? Focsera provides high-quality residential and commercial interior design services tailored to your space. Our verified design partners for ${name} offer professional space planning, modular kitchen installations, premium wardrobe cabinetry, paint and wall finishing, and furniture sourcing. We bridge the gap between creative concepts and flawless execution, using state-of-the-art 3D layout renderings to preview your rooms before procurement. We understand that your home is a personal asset; that is why we use high-density, moisture-resistant materials and premium hardware to guarantee long-term durability. From a small bedroom refresh to a full-home commercial fit-out, Focsera ensures site supervision, strict timeline compliance, and escrow-protected milestones. Connect with top interior designers in ${city} and bring your dream living space to life with transparent rates and premium quality assurance.`;
  } else if (cat.includes('media') || cat.includes('editor') || cat.includes('edit')) {
    intro = `Need a professional video editor or reels creator in ${city} to level up your video marketing? Focsera offers verified editing agency services for ${name}, focusing on cinematic flow, color grading, sound design, and viral social media formatting. From YouTube shorts and TikTok reels to complete brand story films and podcast episodes, our experienced post-production editors deliver high-impact results. We leverage industry-standard software to assemble your raw clips, add custom motion graphics, animate lower thirds, and insert royalty-free background music to match modern viewership trends. Digital content moves fast, which is why Focsera ensures a standard 24-to-48 hour turnaround on content editing packs, helping you maintain a consistent upload schedule. Whether you are an independent influencer, a growing corporate brand, or coordinating a musical launch, explore our verified media services and secure expert editor support today.`;
  } else if (cat.includes('studio') || cat.includes('photo') || cat.includes('photographer') || cat.includes('video')) {
    intro = `Looking for professional photographers near me in ${city} to capture life's most precious milestones? Focsera connects you with top-rated photography and videography experts specializing in ${name}. We cover maternity shoots, newborn and baby portraits, half-saree ceremonies, weddings, fashion portfolios, and product catalog shoots. Our photographers are equipped with state-of-the-art cameras, advanced lighting setups, and creative backdrops to construct stunning visuals in any environment—whether at your doorstep, in a professional studio, or outdoors. We prioritize your comfort and punctuality, offering comprehensive sessions that include high-resolution edited files and raw photo access. A great photo is more than just a high-quality capture; it is an artistic expression. With secure escrow booking and verified reviews, Focsera ensures you receive professional digital gallery access and custom album layouts for your special days in ${city}.`;
  } else {
    // Web / Vibe Coder / general
    intro = `Searching for a top website development company in ${city} to build a custom online presence? Focsera offers verified development and design services for ${name}, specializing in high-performance landing pages, e-commerce stores, custom databases, and app UI/UX revamps. Our expert designers and front-end coders leverage cutting-edge tech stacks (including React, Next.js, and Node) to engineer secure, responsive, and search-optimized web applications. We prioritize visual excellence, fast page loads, and clear navigation paths to maximize your online user conversion. Whether you need a simple portfolio site to display your creative assets, a Shopify-powered online store with integrated payment gateways, or custom AI chatbot integrations for your CRM, Focsera provides structured project milestones and reliable post-launch maintenance. Build a high-ranking digital asset in ${city} with our certified independent developers.`;
  }

  return `${intro}\n\nOur verified professional partner services for ${name} are highly structured to match search query parameters in ${city}. Read our core inclusions, standard workflow milestones, localized testimonials, and FAQs below to configure your custom project and coordinate with our team today. ${specificText}`;
}

function get15Faqs(category, serviceName, locationName = 'Hyderabad') {
  const cat = (category || '').toLowerCase();
  const city = locationName;
  
  const eventFaqs = [
    { question: `What is included in the ${serviceName} packages in ${city}?`, answer: `Our packages include event planning, theme selection, balloon arches or customized backdrops, stage lighting, venue setup, and clean-up in ${city}. We also coordinate with third-party vendors for catering, sound, and MCs.` },
    { question: `How far in advance should I book event planners in ${city}?`, answer: `We recommend booking at least 2 to 3 weeks before the event date. This ensures ample time for theme coordination, backdrop customization, and securing the best verified vendors in ${city}.` },
    { question: `Can I customize the decoration theme for ${serviceName} in ${city}?`, answer: `Yes, Focsera provides 100% customizable themes for ${serviceName} setups in ${city}. You can share image references with our coordinators, and we will custom-build the balloon arches, backdrops, and table settings.` },
    { question: `Do you manage outdoor venues or house parties in ${city}?`, answer: `Yes, we cover get-togethers, terrace parties, banquet halls, and outdoor lawns across ${city}. We adapt the setup to the specific location requirements.` },
    { question: `Are catering and cake coordination covered?`, answer: `While our core package focuses on planning and decoration, Focsera coordinators can assist in cake customization and catering vendor selection upon request in ${city}.` },
    { question: `What is the cancellation and rescheduling policy in ${city}?`, answer: `You can reschedule the event up to 5 days before the scheduled date at no additional cost. Cancellations made within 48 hours of the event may incur a minor venue-setup fee.` },
    { question: `Do you provide game hosts, anchors, or magicians in ${city}?`, answer: `Yes, Focsera partners with high-energy party anchors, MCs, kids entertainers, and magicians in ${city} to keep your guests engaged throughout the segment.` },
    { question: `How many team members will arrive at the venue?`, answer: `Depending on the scale of the setup, a team of 3 to 6 coordinators will arrive at least 2 to 3 hours early to assemble the decoration and manage the event flow.` },
    { question: `How do I coordinate with the assigned Focsera event planner in ${city}?`, answer: `Once you place an inquiry, our lead coordinator will contact you via WhatsApp to align on the theme, color palette, schedule, and vendor logistics in ${city}.` },
    { question: `Are sound systems and microphones provided in ${city}?`, answer: `Standard PA sound systems with cordless mics can be added as an optional inclusion in your event setup in ${city}.` },
    { question: `Do you handle post-event pack-down and clean-up in ${city}?`, answer: `Yes, our crew handles the complete pack-down of the decoration, balloon removal, and general clean-up of the stage area across all venues in ${city}.` },
    { question: `Is there a surcharge for late-night event setups in ${city}?`, answer: `Setups occurring after 10 PM in ${city} may carry a minor operational surcharge, which will be discussed transparently during coordination.` }
  ];

  const interiorFaqs = [
    { question: `What is the typical timeline for ${serviceName} in ${city}?`, answer: `For modular kitchens or living room transformations in ${city}, the timeline ranges from 21 to 35 days, including factory manufacturing of wood components and site installation.` },
    { question: `How do your interior designers charge for services in ${city}?`, answer: `We offer transparent, modular rates based on the scope of woodwork, paint finishes, and materials chosen, avoiding flat markups.` },
    { question: `Do you provide 3D visual designs before beginning work in ${city}?`, answer: `Yes, all our interior design packages in ${city} include detailed 2D layouts and realistic 3D renderings so you can visualize the space before procurement.` },
    { question: `What wood and hardware brands do you use for wardrobes in ${city}?`, answer: `We use high-density moisture-resistant (HDMR) plywood and premium hardware brands like Hettich or Hafele for long-term durability on all installations in ${city}.` },
    { question: `Is site supervision included in the Focsera interior package in ${city}?`, answer: `Yes, a dedicated project supervisor in ${city} will manage the carpenters, painters, and electricians, providing you with daily photo updates.` },
    { question: `Can I customize the color scheme and laminate finishes?`, answer: `Absolutely. We provide a wide catalog of laminates, acrylics, and paint swatches during the consultation phase in ${city}.` },
    { question: `Do you help in selecting and sourcing furniture and lighting in ${city}?`, answer: `Yes, our designers accompany you to wholesale markets or coordinate with partner stores in ${city} to source lighting, curtains, and furniture at competitive prices.` },
    { question: `What warranty do you offer on modular woodwork in ${city}?`, answer: `Focsera offers a 5-year warranty on modular wardrobe and kitchen woodwork in ${city} against termites and manufacturing defects.` },
    { question: `How is the payment structured for home renovation in ${city}?`, answer: `We use an escrow-protected milestone system: 50% advance for design and factory start, 40% upon material delivery, and 10% post-installation.` },
    { question: `Do you handle paint, civil work, and electrical modifications in ${city}?`, answer: `Yes, we provide end-to-end services across ${city}, including wall painting, tile laying, plumbing, and electrical socket repositioning.` },
    { question: `Can I request design revisions during the 3D phase?`, answer: `Yes, we include up to 3 rounds of design revisions to perfect the layouts, colors, and layout configurations.` },
    { question: `Are post-installation cleanups handled by Focsera in ${city}?`, answer: `Yes, our team performs a professional deep cleaning of the rooms to ensure your home in ${city} is ready to move in.` }
  ];

  const mediaFaqs = [
    { question: `What raw video formats can I submit for ${serviceName} in ${city}?`, answer: `We support all standard digital formats including MP4, MOV, and AVI, shot on DSLRs, mirrorless cameras, or smartphones, and can collect files anywhere in ${city} digitally.` },
    { question: `What is the turnaround time for video editing in ${city}?`, answer: `For reels, shorts, and TikTok clips, delivery is within 24 to 48 hours. For longer podcast episodes and corporate promo films in ${city}, delivery takes 3 to 5 days.` },
    { question: `How many revision rounds are included in the package?`, answer: `All video editing projects include 3 rounds of revisions. We work closely with you to adjust text overlays, music, and cuts.` },
    { question: `Do you provide royalty-free music and sound effects?`, answer: `Yes, we source high-quality royalty-free background tracks and sound effects, ensuring your videos can be monetized without copyright strikes.` },
    { question: `Can you create motion graphics and title animations?`, answer: `Yes, we design custom lower thirds, text animations, transitions, and call-to-action buttons for clients in ${city}.` },
    { question: `How do I share my raw video files with the editors?`, answer: `You can upload your files to Google Drive, Dropbox, or WeTransfer and share the link with our editing team via WhatsApp or email.` },
    { question: `Do you offer monthly subscription packages for creators in ${city}?`, answer: `Yes, we provide content editing packs for monthly output (e.g., 4 long-form videos + 12 shorts) at discounted agency rates for creators in ${city}.` },
    { question: `Can you color correct and grade my footage?`, answer: `Yes, we perform professional color grading to match the theme, mood, and brand guidelines of your video.` },
    { question: `Do you edit audio and remove background noise for podcasts in ${city}?`, answer: `Yes, audio optimization, noise removal, and dialogue leveling are standard inclusions in our podcast editing services in ${city}.` },
    { question: `Can you deliver vertical formatting for Instagram Reels and YouTube Shorts?`, answer: `Yes, we specialize in converting horizontal footage to vertical with smart framing, captions, and zoom cuts.` },
    { question: `Is subtitle generation included in the package?`, answer: `Yes, we offer dynamic, animated subtitles (Alex Hormozi style) to boost social media engagement.` },
    { question: `What resolution is the final video delivered in?`, answer: `We deliver final assets in Full HD (1080p) or Ultra HD (4K) as per your platform preferences.` }
  ];

  const studioFaqs = [
    { question: `Where does the ${serviceName} photoshoot take place in ${city}?`, answer: `We offer flexibility: photoshoots can take place at your home (doorstep), in a rented professional studio, or at outdoor locations in ${city}.` },
    { question: `How many edited and raw pictures will I receive in ${city}?`, answer: `Typically, a standard 2-hour session in ${city} delivers 30-50 high-resolution edited photos and all raw files via a digital download link.` },
    { question: `What is the turnaround time for photo delivery in ${city}?`, answer: `Raw photos are shared within 24 hours. The final edited and retouched photos are delivered within 5 to 7 days.` },
    { question: `Do you provide outfits, props, and makeup in ${city}?`, answer: `For maternity and newborn baby shoots in ${city}, we can coordinate props and backdrops. Outfit and professional makeup artists can be arranged as an add-on.` },
    { question: `Can I reschedule my photoshoot if needed?`, answer: `Yes, you can reschedule up to 48 hours before the shoot. Rescheduling due to weather conditions or baby comfort is accommodated.` },
    { question: `Do you provide cinematic video reels during the shoot in ${city}?`, answer: `Yes, we offer combined packages that include both high-resolution photography and vertical cinematic video reels in ${city}.` },
    { question: `How do you ensure a newborn baby's safety during the shoot?`, answer: `Our newborn baby photographers in ${city} are trained in safe posing, sanitize all props, and maintain a warm, comfortable room temperature.` },
    { question: `Can we select the photos for retouching ourselves?`, answer: `Yes, we share a proofing gallery of raw files, allowing you to select your favorite frames for final editing.` },
    { question: `What cameras and lenses do your photographers use in ${city}?`, answer: `Our photographers in ${city} use professional Sony, Canon, or Nikon full-frame mirrorless cameras equipped with high-end portrait lenses.` },
    { question: `Is location permission or entry fee covered by the package in ${city}?`, answer: `No, any entry fees or shooting permissions for outdoor parks or private resorts in ${city} must be arranged and paid by the client.` },
    { question: `Can we request physical albums or frames in ${city}?`, answer: `Yes, we offer premium lay-flat photo books and acrylic frames as physical add-ons after delivery in ${city}.` },
    { question: `Do you cover family members in maternity and baby shoots?`, answer: `Yes, spouse and immediate siblings are always welcome to participate in the photoshoot segments.` }
  ];

  const webFaqs = [
    { question: `What technologies do you use for ${serviceName} in ${city}?`, answer: `We build using modern framework technologies including React, Next.js, Tailwind CSS, Node.js, Shopify, and Webflow depending on the project goals for ${city} businesses.` },
    { question: `Will my website be mobile-responsive and SEO-friendly?`, answer: `Yes, mobile optimization, clean semantic code structure, and foundational SEO setup are standard for every website we build in ${city}.` },
    { question: `Do you provide domain registration and web hosting setup in ${city}?`, answer: `Yes, we guide you through purchasing domain names and configure hosting on Vercel, Netlify, AWS, or Shopify.` },
    { question: `Can I update the content on the website myself after launch?`, answer: `Yes, we integrate headless Content Management Systems (CMS) or Shopify admin dashboards so you can easily edit text and products.` },
    { question: `Do you integrate payment gateways and shipping partners in ${city}?`, answer: `Yes, we set up Razorpay, Paytm, Stripe, and shipping coordinators for e-commerce store packages in ${city}.` },
    { question: `What is the timeline for custom website development in ${city}?`, answer: `Landing pages and portfolios take 5 to 7 days. Full e-commerce store setups and custom business sites in ${city} take 2 to 4 weeks.` },
    { question: `Do you offer post-launch maintenance and support in ${city}?`, answer: `Yes, Focsera provides 30 days of free technical support for bug fixes, server monitoring, and minor text updates in ${city}.` },
    { question: `Can you redesign or revamp an existing app or website in ${city}?`, answer: `Yes, we analyze your current user metrics, revamp UI/UX layouts, and rebuild frontend components to boost conversions in ${city}.` },
    { question: `Do you handle database architecture and optimization in ${city}?`, answer: `Yes, we build scalable PostgreSQL, MySQL, or MongoDB database schemas and optimize query speeds.` },
    { question: `Can you set up AI chatbots and automated customer support for my ${city} business?`, answer: `Yes, we integrate ChatGPT/LLM engines or third-party automated chat systems to resolve user queries instantly.` },
    { question: `Are SSL certificates and website security inclusions standard?`, answer: `Yes, we secure your site with HTTPS, configure security headers, and implement standard database protection.` },
    { question: `How is the code handed over after project completion?`, answer: `We push the final source code repository to your GitHub account and hand over full administrative credentials.` }
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

  const platformFaqs = [
    { question: "Why should I book services through the Focsera platform?", answer: `Focsera offers pre-vetted creative professionals, milestone-based escrow payments, dedicated support, and strict quality checks, making project coordination hassle-free.` },
    { question: "How does the escrow payment model work?", answer: `Your funds are held securely by Focsera and only released to the professional partner after you review and approve their work milestones.` },
    { question: "What if the delivered service does not meet my quality expectations?", answer: `Focsera support coordinates mediation. If the work does not match the agreed-upon inclusions, you are covered by our refund and quality guarantee.` }
  ];

  return [...chosenFaqs, ...platformFaqs];
}

function getReviews(category, locationName = 'Hyderabad') {
  const cat = (category || '').toLowerCase();
  
  const loc1 = locationName !== 'Hyderabad' ? `${locationName}, Hyderabad` : "Madhapur, Hyderabad";
  const loc2 = "Hyderabad";
  const loc3 = locationName !== 'Hyderabad' ? `${locationName}, Hyderabad` : "Jubilee Hills, Hyderabad";
  
  const eventReviews = [
    { name: "Ananya Sharma", location: loc1, rating: 5, date: "May 12, 2026", comment: `Outstanding event coordination! The team managed the balloon arches and backdrop decor beautifully in ${locationName}. Arrived early and handled vendor communication flawlessly.` },
    { name: "Rahul Verma", location: loc2, rating: 5, date: "April 28, 2026", comment: "We booked the kids birthday planning package and were blown away. The game MC kept the children engaged the entire time. Very professional." },
    { name: "Preethi K.", location: loc3, rating: 4, date: "March 15, 2026", comment: `Smooth event flow and excellent theme choices. Highly recommend Focsera for party coordination in ${locationName}.` }
  ];

  const interiorReviews = [
    { name: "Vikram K.", location: loc1, rating: 5, date: "May 20, 2026", comment: `Excellent modular kitchen design! The 3D layouts helped us visualize the space, and the actual woodwork installation is high quality and very durable in ${locationName}.` },
    { name: "Sneha Reddy", location: loc2, rating: 5, date: "April 10, 2026", comment: "Focsera helped us revamp our living space on a budget. The material sourcing was very transparent and project coordination was top-notch." },
    { name: "Kiran Dev", location: loc3, rating: 4, date: "March 24, 2026", comment: `Sleek wardrobe design and perfect color choices. Site supervisor was present daily in ${locationName} and provided detailed photo updates.` }
  ];

  const mediaReviews = [
    { name: "Aryan Mehta", location: loc1, rating: 5, date: "May 18, 2026", comment: `Super fast turnaround on video editing! The social media reels they cut for our ${locationName} startup had great pacing, professional color grading, and custom text animations.` },
    { name: "Nisha V.", location: loc2, rating: 5, date: "April 05, 2026", comment: "Focsera editors handle our monthly podcast episodes. Sound noise removal and transition cards are excellent. Highly reliable." },
    { name: "Aditya S.", location: loc3, rating: 4, date: "March 30, 2026", comment: `Creative youtube video editing with cool sound effects and captions. Revision rounds were handled quickly for our project in ${locationName}.` }
  ];

  const studioReviews = [
    { name: "Priya Sundaram", location: loc1, rating: 5, date: "May 14, 2026", comment: `Beautiful maternity shoot! The photographer was extremely patient, suggested great outdoor locations in ${locationName}, and delivered stunning high-res edited files.` },
    { name: "Rohit Nair", location: loc2, rating: 5, date: "April 22, 2026", comment: "The doorstep baby photoshoot was comfortable and safe. The sanitized props and warm setup made our baby very happy. Stunning pictures!" },
    { name: "Kavitha M.", location: loc3, rating: 4, date: "March 18, 2026", comment: `Creative couple photoshoot in ${locationName} with professional lighting and background editing. Turnaround time for digital gallery was fast.` }
  ];

  const webReviews = [
    { name: "Sanjay Shah", location: loc1, rating: 5, date: "May 10, 2026", comment: `Highly skilled web developers! They designed and launched our custom Shopify store in ${locationName} in less than two weeks. Transactions are smooth and page load is instant.` },
    { name: "Deepak AI", location: loc2, rating: 5, date: "April 15, 2026", comment: "Focsera revamped our startup's landing page and integrated custom chatbots. Mobile UI looks gorgeous and user conversion has doubled." },
    { name: "Meera K.", location: loc3, rating: 4, date: "March 02, 2026", comment: `Professional website revamp and clean codebase. They resolved our PostgreSQL database query slowdowns effectively in ${locationName}.` }
  ];

  if (cat.includes('event') || cat.includes('planner') || cat.includes('host')) {
    return eventReviews;
  } else if (cat.includes('interior') || cat.includes('makeover') || cat.includes('cabinet') || cat.includes('sourcing')) {
    return interiorReviews;
  } else if (cat.includes('media') || cat.includes('editor') || cat.includes('edit')) {
    return mediaReviews;
  } else if (cat.includes('studio') || cat.includes('photo') || cat.includes('photographer') || cat.includes('video')) {
    return studioReviews;
  } else {
    return webReviews;
  }
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

    const seoPagesPath = path.resolve(__dirname, '../src/pages/seo');
    if (fs.existsSync(seoPagesPath)) {
      // Clear out old generated files to avoid stale components and route mismatches
      fs.readdirSync(seoPagesPath).forEach(file => {
        if (file.endsWith('.tsx') && file !== 'SeoRoutes.tsx') {
          fs.unlinkSync(path.join(seoPagesPath, file));
        }
      });
    } else {
      fs.mkdirSync(seoPagesPath, { recursive: true });
    }

    const generatedPages = [];

    // ─── GENERATE PACKAGES ───
    for (const pkg of packages) {
      const baseSlug = getPackageSlug(pkg);
      if (!baseSlug) continue;

      for (const location of TARGET_LOCATIONS) {
        const slug = getLocationSlug(baseSlug, location.slug);
        const className = toPascalCase(slug);
        const details = packageDetails.find(d => d.package_id === pkg.id) || null;
        const themeColors = getThemeColors(pkg.domain);
        const schemaData = getPackageSchema(pkg);

        // Resolve related partners in same category/domain
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
        const reviewsList = getReviews(pkg.domain, location.name);

        const fileContent = generateComponentTemplate(
          className, 
          pkg.name, 
          `${pkg.domain} Package`, 
          pkg.description || '', 
          pkg.price || pkg.price_min || 'Enquire', 
          pkg.thumbnail || '', 
          false, 
          5.0, 
          120, 
          6, 
          details, 
          themeColors, 
          schemaData, 
          related, 
          'package',
          seoTitle,
          seoDescription,
          seoH1,
          richIntro,
          faqsList,
          reviewsList,
          slug,
          baseSlug
        );

        fs.writeFileSync(path.join(seoPagesPath, `${className}.tsx`), fileContent);
        generatedPages.push({ slug, className });
      }
    }

    // ─── GENERATE PARTNERS ───
    for (const partner of partners) {
      const baseSlug = getPartnerSlug(partner);
      if (!baseSlug) continue;

      for (const location of TARGET_LOCATIONS) {
        const slug = getLocationSlug(baseSlug, location.slug);
        const className = toPascalCase(slug);
        const details = partnerDetails.find(d => d.partner_id === partner.id) || null;
        const themeColors = getThemeColors(partner.category);
        const schemaData = getPartnerSchema(partner);

        // Resolve related packages in same category/domain
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
        const reviewsList = getReviews(partner.category, location.name);

        const fileContent = generateComponentTemplate(
          className,
          partnerName,
          partner.category || '',
          partner.bio || '',
          partner.price || 'Enquire',
          partner.avatar_url || '',
          partner.is_verified || false,
          partner.rating || 5.0,
          partner.reviews_count || 120,
          partner.experience_years || 5,
          details,
          themeColors,
          schemaData,
          related,
          'partner',
          seoTitle,
          seoDescription,
          seoH1,
          richIntro,
          faqsList,
          reviewsList,
          slug,
          baseSlug
        );

        fs.writeFileSync(path.join(seoPagesPath, `${className}.tsx`), fileContent);
        generatedPages.push({ slug, className });
      }
    }

    // ─── GENERATE SeoRoutes.tsx ───
    let routesContent = `// src/pages/seo/SeoRoutes.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

`;

    // Deduplicate generated pages list just in case of any overlap
    const uniquePages = [];
    const seenSlugs = new Set();
    generatedPages.forEach(p => {
      if (!seenSlugs.has(p.slug)) {
        seenSlugs.add(p.slug);
        uniquePages.push(p);
      }
    });

    // Add lazy imports
    uniquePages.forEach(page => {
      routesContent += `const ${page.className} = React.lazy(() => import('./${page.className}'));\n`;
    });

    routesContent += `
export default function SeoRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
          <p className="text-base font-semibold">Loading Page Details...</p>
        </div>
      }
    >
      <Routes>
`;

    uniquePages.forEach(page => {
      routesContent += `        <Route path="/${page.slug}" element={<${page.className} />} />\n`;
    });

    routesContent += `      </Routes>
    </Suspense>
  );
}
`;

    fs.writeFileSync(path.join(seoPagesPath, 'SeoRoutes.tsx'), routesContent);
    console.log(`Successfully generated ${uniquePages.length} separate webpages under src/pages/seo/ and updated SeoRoutes.tsx router!`);

  } catch (error) {
    console.error('Failed to generate pages:', error);
    process.exit(1);
  }
}

function generateComponentTemplate(className, name, subtitle, bio, price, thumbnail, isVerified, rating, reviews, exp, categoryDetails, themeColors, schemaData, relatedItems, itemType, seoTitle, seoDescription, seoH1, richIntro, faqsList, reviewsList, slug, baseSlug) {
  const linksHtml = TARGET_LOCATIONS.map(loc => {
    const locSlug = getLocationSlug(baseSlug, loc.slug);
    const activeClass = locSlug === slug 
      ? 'border-blue-500/80 bg-blue-500/5' 
      : 'border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80';
    return `            <Link
              to="/${locSlug}"
              className="group p-4 rounded-2xl bg-slate-900 border ${activeClass} transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in ${loc.name}
              </span>
            </Link>`;
  }).join('\n');

  return `import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  CheckCircle2, 
  Award, 
  Clock, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Sliders,
  Layers
} from 'lucide-react';

interface RelatedItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  slug: string;
}

export default function ${className}() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  const name = ${JSON.stringify(name)};
  const subtitle = ${JSON.stringify(subtitle)};
  const rating = ${JSON.stringify(rating)};
  const reviews = ${JSON.stringify(reviews)};
  const exp = ${JSON.stringify(exp)};
  const bio = ${JSON.stringify(bio)};
  const price = ${JSON.stringify(price)};
  const thumbnail = ${JSON.stringify(thumbnail)};
  const isVerified = ${JSON.stringify(isVerified)};
  
  const categoryDetails: any = ${JSON.stringify(categoryDetails)};
  const themeColors = ${JSON.stringify(themeColors)};
  const relatedItems: RelatedItem[] = ${JSON.stringify(relatedItems)};

  const seoH1 = ${JSON.stringify(seoH1)};
  const richIntro = ${JSON.stringify(richIntro)};
  const faqsList: { question: string; answer: string; }[] = ${JSON.stringify(faqsList)};
  const reviewsList: { name: string; location: string; rating: number; date: string; comment: string; }[] = ${JSON.stringify(reviewsList)};
  const slug = ${JSON.stringify(slug)};
  const itemType = ${JSON.stringify(itemType)} as 'package' | 'partner';

  useEffect(() => {
    document.title = ${JSON.stringify(seoTitle)};

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', ${JSON.stringify(seoDescription)});

    // Canonical link tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', \`https://focsera.in/\${slug}\`);

    // OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', ${JSON.stringify(seoTitle)});

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', ${JSON.stringify(seoDescription)});

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', \`https://focsera.in/\${slug}\`);

    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    if (thumbnail) {
      ogImage.setAttribute('content', thumbnail);
    }

    // Schema JSON-LD Injection
    const existingScript = document.getElementById('focsera-seo-ld-json');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'focsera-seo-ld-json';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(${JSON.stringify(schemaData)});
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('focsera-seo-ld-json');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setFaqOpenIndices(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleWhatsAppBooking = () => {
    const text = \`*Booking Inquiry for \${name}*%0A%0AHi Focsera, I want to book this service. Please share details.\`;
    window.open(\`https://wa.me/919515803954?text=\${text}\`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 relative pb-20">
      
      {/* Background Decorative Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={\`absolute top-0 left-1/4 w-[600px] h-[600px] \${themeColors.bgGlow} rounded-full blur-[140px] opacity-40\`} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-900 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-36 relative z-10">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-xs font-semibold text-slate-400">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={12} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="capitalize">{subtitle}</span>
          <span>/</span>
          <span className="text-white line-clamp-1">{name}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3.5 mb-6">
              <span className={\`px-3.5 py-1 rounded-full bg-gradient-to-r \${themeColors.primary} text-white text-[10px] font-extrabold uppercase tracking-wider\`}>
                {subtitle}
              </span>
              {isVerified && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                  <ShieldCheck size={11} fill="currentColor" className="text-emerald-500 fill-emerald-500/10" />
                  <span>Verified Professional</span>
                </div>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] leading-tight text-white mb-6">
              {seoH1}
            </h1>

            {/* Ratings & Metadata Row */}
            <div className="flex flex-wrap items-center gap-5 mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 text-xs font-bold border border-yellow-500/20">
                <Star size={12} fill="currentColor" />
                <span>{rating}</span>
                <span className="text-slate-400 font-medium">({reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-slate-350 text-xs font-semibold border border-white/5">
                <Award size={12} />
                <span>{exp} Years Experience</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 text-slate-350 text-xs font-semibold border border-white/5">
                <Clock size={12} />
                <span>24-48hr Delivery</span>
              </div>
            </div>

            {/* Main Featured Image (Thumbnail / Avatar) */}
            {thumbnail && (
              <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5 bg-slate-900 relative">
                <img src={thumbnail} alt={name} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Content Tabs Navigation */}
            <div className="flex border-b border-white/5 bg-slate-900/40 rounded-t-2xl px-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={\`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all \${
                  activeTab === 'overview' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }\`}
              >
                Overview & Styles
              </button>
              <button
                onClick={() => setActiveTab('inclusions')}
                className={\`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all \${
                  activeTab === 'inclusions' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }\`}
              >
                What's Included
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={\`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all \${
                  activeTab === 'faqs' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }\`}
              >
                Process & FAQs
              </button>
            </div>

            {/* Tabs Body Content */}
            <div className="bg-slate-900/20 border-x border-b border-white/5 rounded-b-2xl p-6 sm:p-8">
              
              {/* 1. OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2">
                      <BookOpen size={14} /> Service Overview
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-6">
                      {richIntro}
                    </p>
                  </div>

                  {categoryDetails?.hero_description && (
                    <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                      <p className="text-blue-300/80 text-sm leading-relaxed italic">
                        "{categoryDetails.hero_description}"
                      </p>
                    </div>
                  )}

                  {/* Specialty Styles */}
                  {categoryDetails?.styles && (categoryDetails.styles || []).length > 0 && (
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <Sliders size={14} /> Speciality Formats & Options
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {(categoryDetails.styles || []).map((style: string, i: number) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-white/5 text-slate-200 text-xs font-semibold border border-white/5 hover:border-white/10 transition-colors">
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Use Cases */}
                  {categoryDetails?.use_cases && (categoryDetails.use_cases || []).length > 0 && (
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <TrendingUp size={14} /> Recommended Use Cases
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {(categoryDetails.use_cases || []).map((useCase: string, i: number) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-blue-500/5 text-blue-300 text-xs font-semibold border border-blue-500/10">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Localized Testimonials */}
                  <div className="mt-12 pt-10 border-t border-white/5">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
                      <Star size={14} className="text-yellow-500" /> Customer Testimonials in Hyderabad
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {reviewsList.map((rev, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                          <p className="text-slate-350 text-sm italic mb-4">"{rev.comment}"</p>
                          <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                            <div>
                              <span className="text-white block font-bold">{rev.name}</span>
                              <span className="text-slate-500 text-[10px]">{rev.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                              <Star size={10} fill="currentColor" />
                              <span>{rev.rating}.0</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* 2. INCLUSIONS TAB */}
              {activeTab === 'inclusions' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4">
                      Core Inclusions Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {categoryDetails?.inclusions ? (
                        (categoryDetails.inclusions || []).map((inc: string, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="text-slate-350 text-sm">{inc}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500">Fully curated service setup aligned upon direct engagement request.</p>
                      )}
                    </div>
                  </div>

                  {categoryDetails?.deliverables && (categoryDetails.deliverables || []).length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4">
                        Standard Deliverables
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(categoryDetails.deliverables || []).map((del: string, i: number) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                            <span className="text-slate-350 text-sm font-medium">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3. PROCESS & FAQS TAB */}
              {activeTab === 'faqs' && (
                <div className="space-y-8">
                  {/* Process timeline */}
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-5">
                      Operational Workflow
                    </h3>
                    <div className="space-y-5">
                      {categoryDetails?.workflow ? (
                        (categoryDetails.workflow || []).map((step: string, i: number) => (
                          <div key={i} className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                            <p className="text-slate-300 text-sm">Select service or package option inside Focsera mobile portal.</p>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                            <p className="text-slate-300 text-sm">Coordinate parameters and timelines directly with verified partners.</p>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                            <p className="text-slate-300 text-sm">Review quality work and finalize payouts upon standard delivery.</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* FAQs */}
                  {faqsList && faqsList.length > 0 && (
                    <div className="pt-6 border-t border-white/5">
                      <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                        <MessageSquare size={14} /> Frequently Asked Questions
                      </h3>
                      <div className="space-y-3.5">
                        {faqsList.map((faq, idx) => (
                          <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
                            <button
                              onClick={() => toggleFaq(idx)}
                              className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-bold text-white text-sm"
                            >
                              <span>{faq.question}</span>
                              {faqOpenIndices[idx] ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                            </button>
                            <AnimatePresence initial={false}>
                              {faqOpenIndices[idx] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="px-5 pb-5 pt-1 text-slate-400 text-sm leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Hero CTA card Right */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-slate-900 border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
              
              <h3 className="text-lg font-bold text-white mb-2">Book Service Offer</h3>
              <p className="text-xs text-slate-400 mb-6">Choose direct WhatsApp coordinate booking or get Focsera App.</p>

              {/* Price Details */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">RATE CARD</span>
                <div className="text-2xl font-black text-white">
                  Contact for Pricing
                </div>
              </div>

              {/* Inclusions summary preview */}
              <div className="space-y-3 mb-8">
                <div className="flex gap-2.5 items-center text-xs text-slate-350">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>100% Quality Guarantee</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs text-slate-350">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>Verified Focsera Support</span>
                </div>
                <div className="flex gap-2.5 items-center text-xs text-slate-350">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>Secure Escrow Payments</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Zap size={15} />
                  <span>Book via WhatsApp</span>
                </button>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Download Play Store App</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Related Section */}
        {relatedItems.length > 0 && (
          <div className="pt-12 border-t border-white/5 mt-16">
            <div className="flex items-center justify-between gap-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {itemType === 'package' ? 'Verified Partner Experts' : 'Curated Packages'}
              </h2>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Related Solutions</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((item, idx) => {
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => navigate(\`/\${item.slug}\`)}
                    className="group bg-slate-900 border border-white/5 hover:border-white/10 rounded-2xl p-5 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
                          <Layers className="text-slate-600" size={28} />
                        </div>
                      )}
                      
                      <h4 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {item.description || "Premium verified service provider option."}
                      </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-bold text-slate-400">
                      <span>Rate Card: Enquire</span>
                      <span className="text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Areas Served in Hyderabad Local Directory Mesh */}
        <div className="pt-12 border-t border-white/5 mt-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <Sparkles size={18} className="text-blue-400" />
                Areas Served in Hyderabad
              </h2>
              <p className="text-xs text-slate-400 mt-1">Get local verified professionals and customized packages near you.</p>
            </div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Local Directory</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
${linksHtml}
          </div>
        </div>

      </div>
    </div>
  );
}
`;
}

generatePages();
export default generatePages;
