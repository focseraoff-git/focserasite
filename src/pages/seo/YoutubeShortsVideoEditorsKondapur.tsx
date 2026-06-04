import React, { useState, useEffect } from 'react';
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

export default function YoutubeShortsVideoEditorsKondapur() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  const name = "YouTube Shorts";
  const subtitle = "Reel Maker";
  const rating = 4.9;
  const reviews = 187;
  const exp = 5;
  const bio = "2-person YouTube Shorts team — shooter and editor. Comes to your home studio, office or outdoor spot. iPhone Pro for quick b-roll, mirrorless for talking head, lav mic for crisp audio. Shoots and edits 5 vertical YouTube Shorts in one session. Hook, content and CTA structure built into every short. Subtitles, end cards and thumbnail stills included. Delivered in 24 hrs, upload-ready.";
  const price = 3500;
  const thumbnail = "https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/partner_videographer.png";
  const isVerified = true;
  
  const categoryDetails: any = {"partner_id":"3e1c5038-b781-4b9e-abd0-25b7183abb5a","hero_description":"5 vertical YouTube Shorts shot and fully produced at your home studio or chosen location — hook, content, CTA and thumbnail ready to upload.","inclusions":["iPhone Pro for quick b-roll","Mirrorless for talking head","Lav mic for crisp audio","Hook-content-CTA structure built in","Subtitles and end cards included"],"styles":["Educational Tutorial Short","Talking Head Opinion Short","Product or Review Short","Behind-the-Scenes Short","Trending Challenge or Format"],"examples":["https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"],"workflow":["1. Booking: Share your channel niche and 5 short topics","2. Team arrives with full YouTube Shorts kit","3. All 5 Shorts shot in structured sequence — hook, content, CTA","4. On-site edit: All 5 assembled with subtitles and end cards","5. Delivery: 5 upload-ready YouTube Shorts in 24 hrs with thumbnail stills"],"deliverables":["5 fully produced YouTube Shorts","Thumbnail still for each Short","Auto-captions cleaned manually","End cards and subscribe prompt included","YouTube upload-ready MP4 files"],"use_cases":["YouTubers expanding into Shorts for algorithm growth","Creators batch-producing a week of content","Businesses launching educational content series","Influencers repurposing long-form into Shorts","New channels wanting a fast-growth content strategy"],"tips":["Prepare a one-sentence hook for each Short — the first 2 seconds determine watch time","Keep each Short to 50–60 seconds for maximum completion rate","Wear consistent clothing across multiple Shorts for series cohesion","Batch all 5 Shorts in one session — it saves time and maintains energy"],"faqs":[{"answer":"We help structure the hook, content and CTA. You provide the expertise and talking points.","question":"Do you help write the Short scripts?"},{"answer":"Yes — all Shorts are delivered in both 9:16 formats for cross-posting.","question":"Can these also be used as Instagram Reels?"},{"answer":"Yes — extended sessions covering 8–10 Shorts are available.","question":"Can we shoot more than 5 in one session?"},{"answer":"Yes — product demos, tutorials and B-roll only Shorts are all covered.","question":"Can non-talking-head content be included?"}],"created_at":"2026-03-21T18:38:40.101933+00:00","updated_at":"2026-03-21T18:38:40.101933+00:00"};
  const themeColors = {"primary":"from-blue-600 to-indigo-600","text":"text-blue-500","bgGlow":"bg-blue-500/10","border":"border-blue-500/20"};
  const relatedItems: RelatedItem[] = [{"id":"media-001","name":"Design & Marketing Pack","subtitle":"Media Package","description":"A designer works remotely and delivers everything your business needs to look professional — logo, poster, social media templates or menu, whichever you need most. 2 design concepts delivered in 24 hours, print and digital ready files, 2 revision rounds included.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Design%20and%20Marketing.png","slug":"graphic-design-marketing-services-kondapur"},{"id":"media-002","name":"Content Editing Pack","subtitle":"Media Package","description":"An editor works remotely and receives your raw footage or photos via Google Drive. Delivers fully edited reels, YouTube videos or retouched photos within 24 hours. Colour correction, audio cleanup, captions, transitions and music all included.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Content%20Editing.png","slug":"content-editing-services-kondapur"},{"id":"media-003","name":"Full Media Kit","subtitle":"Media Package","description":"A designer and editor work remotely together and deliver everything you need to look professional online. Includes logo, 10 branded social media templates, 5 edited reels and a poster design. Everything a business or creator needs to launch their brand presence.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Fulll%20Media%20Kit.png","slug":"full-media-production-services-kondapur"}];

  const seoH1 = "YouTube Shorts - Services in Kondapur";
  const richIntro = "Searching for a top website development company in Kondapur to build a custom online presence? Focsera offers verified development and design services for YouTube Shorts, specializing in high-performance landing pages, e-commerce stores, custom databases, and app UI/UX revamps. Our expert designers and front-end coders leverage cutting-edge tech stacks (including React, Next.js, and Node) to engineer secure, responsive, and search-optimized web applications. We prioritize visual excellence, fast page loads, and clear navigation paths to maximize your online user conversion. Whether you need a simple portfolio site to display your creative assets, a Shopify-powered online store with integrated payment gateways, or custom AI chatbot integrations for your CRM, Focsera provides structured project milestones and reliable post-launch maintenance. Build a high-ranking digital asset in Kondapur with our certified independent developers.\n\nOur verified professional partner services for YouTube Shorts are highly structured to match search query parameters in Kondapur. Read our core inclusions, standard workflow milestones, localized testimonials, and FAQs below to configure your custom project and coordinate with our team today. 2-person YouTube Shorts team — shooter and editor. Comes to your home studio, office or outdoor spot. iPhone Pro for quick b-roll, mirrorless for talking head, lav mic for crisp audio. Shoots and edits 5 vertical YouTube Shorts in one session. Hook, content and CTA structure built into every short. Subtitles, end cards and thumbnail stills included. Delivered in 24 hrs, upload-ready.";
  const faqsList: { question: string; answer: string; }[] = [{"question":"What technologies do you use for YouTube Shorts in Kondapur?","answer":"We build using modern framework technologies including React, Next.js, Tailwind CSS, Node.js, Shopify, and Webflow depending on the project goals for Kondapur businesses."},{"question":"Will my website be mobile-responsive and SEO-friendly?","answer":"Yes, mobile optimization, clean semantic code structure, and foundational SEO setup are standard for every website we build in Kondapur."},{"question":"Do you provide domain registration and web hosting setup in Kondapur?","answer":"Yes, we guide you through purchasing domain names and configure hosting on Vercel, Netlify, AWS, or Shopify."},{"question":"Can I update the content on the website myself after launch?","answer":"Yes, we integrate headless Content Management Systems (CMS) or Shopify admin dashboards so you can easily edit text and products."},{"question":"Do you integrate payment gateways and shipping partners in Kondapur?","answer":"Yes, we set up Razorpay, Paytm, Stripe, and shipping coordinators for e-commerce store packages in Kondapur."},{"question":"What is the timeline for custom website development in Kondapur?","answer":"Landing pages and portfolios take 5 to 7 days. Full e-commerce store setups and custom business sites in Kondapur take 2 to 4 weeks."},{"question":"Do you offer post-launch maintenance and support in Kondapur?","answer":"Yes, Focsera provides 30 days of free technical support for bug fixes, server monitoring, and minor text updates in Kondapur."},{"question":"Can you redesign or revamp an existing app or website in Kondapur?","answer":"Yes, we analyze your current user metrics, revamp UI/UX layouts, and rebuild frontend components to boost conversions in Kondapur."},{"question":"Do you handle database architecture and optimization in Kondapur?","answer":"Yes, we build scalable PostgreSQL, MySQL, or MongoDB database schemas and optimize query speeds."},{"question":"Can you set up AI chatbots and automated customer support for my Kondapur business?","answer":"Yes, we integrate ChatGPT/LLM engines or third-party automated chat systems to resolve user queries instantly."},{"question":"Are SSL certificates and website security inclusions standard?","answer":"Yes, we secure your site with HTTPS, configure security headers, and implement standard database protection."},{"question":"How is the code handed over after project completion?","answer":"We push the final source code repository to your GitHub account and hand over full administrative credentials."},{"question":"Why should I book services through the Focsera platform?","answer":"Focsera offers pre-vetted creative professionals, milestone-based escrow payments, dedicated support, and strict quality checks, making project coordination hassle-free."},{"question":"How does the escrow payment model work?","answer":"Your funds are held securely by Focsera and only released to the professional partner after you review and approve their work milestones."},{"question":"What if the delivered service does not meet my quality expectations?","answer":"Focsera support coordinates mediation. If the work does not match the agreed-upon inclusions, you are covered by our refund and quality guarantee."}];
  const reviewsList: { name: string; location: string; rating: number; date: string; comment: string; }[] = [{"name":"Sanjay Shah","location":"Kondapur, Hyderabad","rating":5,"date":"May 10, 2026","comment":"Highly skilled web developers! They designed and launched our custom Shopify store in Kondapur in less than two weeks. Transactions are smooth and page load is instant."},{"name":"Deepak AI","location":"Hyderabad","rating":5,"date":"April 15, 2026","comment":"Focsera revamped our startup's landing page and integrated custom chatbots. Mobile UI looks gorgeous and user conversion has doubled."},{"name":"Meera K.","location":"Kondapur, Hyderabad","rating":4,"date":"March 02, 2026","comment":"Professional website revamp and clean codebase. They resolved our PostgreSQL database query slowdowns effectively in Kondapur."}];
  const slug = "youtube-shorts-video-editors-kondapur";
  const itemType = "partner" as 'package' | 'partner';

  useEffect(() => {
    document.title = "YouTube Shorts in Kondapur - Premium Focsera Services in Kondapur | Focsera";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "2-person YouTube Shorts team — shooter and editor. Comes to your home studio, office or outdoor spot. iPhone Pro for quick b-roll, mirrorless for t... Book verified creative professionals and custom packages for YouTube Shorts in Kondapur on Focsera.");

    // Canonical link tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://focsera.in/${slug}`);

    // OpenGraph
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', "YouTube Shorts in Kondapur - Premium Focsera Services in Kondapur | Focsera");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', "2-person YouTube Shorts team — shooter and editor. Comes to your home studio, office or outdoor spot. iPhone Pro for quick b-roll, mirrorless for t... Book verified creative professionals and custom packages for YouTube Shorts in Kondapur on Focsera.");

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', `https://focsera.in/${slug}`);

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
    script.text = JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"YouTube Shorts","image":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/partner_videographer.png","description":"2-person YouTube Shorts team — shooter and editor. Comes to your home studio, office or outdoor spot. iPhone Pro for quick b-roll, mirrorless for talking head, lav mic for crisp audio. Shoots and edits 5 vertical YouTube Shorts in one session. Hook, content and CTA structure built into every short. Subtitles, end cards and thumbnail stills included. Delivered in 24 hrs, upload-ready.","address":{"@type":"PostalAddress","addressLocality":"Hyderabad","addressRegion":"Telangana","addressCountry":"IN"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"187"}});
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
    const text = `*Booking Inquiry for ${name}*%0A%0AHi Focsera, I want to book this service. Please share details.`;
    window.open(`https://wa.me/919515803954?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 relative pb-20">
      
      {/* Background Decorative Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${themeColors.bgGlow} rounded-full blur-[140px] opacity-40`} />
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
              <span className={`px-3.5 py-1 rounded-full bg-gradient-to-r ${themeColors.primary} text-white text-[10px] font-extrabold uppercase tracking-wider`}>
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
                className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'overview' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Overview & Styles
              </button>
              <button
                onClick={() => setActiveTab('inclusions')}
                className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'inclusions' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                What's Included
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`px-5 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'faqs' 
                    ? 'border-blue-500 text-blue-400' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
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
                    onClick={() => navigate(`/${item.slug}`)}
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
            <Link
              to="/youtube-shorts-video-editors"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Hyderabad
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-gachibowli"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Gachibowli
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-secunderabad"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Secunderabad
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-kondapur"
              className="group p-4 rounded-2xl bg-slate-900 border border-blue-500/80 bg-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Kondapur
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-jubilee-hills"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Jubilee Hills
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-madhapur"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Madhapur
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-banjara-hills"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Banjara Hills
              </span>
            </Link>
            <Link
              to="/youtube-shorts-video-editors-kukatpally"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Kukatpally
              </span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
