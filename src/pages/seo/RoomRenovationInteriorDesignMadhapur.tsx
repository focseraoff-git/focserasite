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

export default function RoomRenovationInteriorDesignMadhapur() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  const name = "Room Refresh Package";
  const subtitle = "Interiors Package";
  const rating = 5;
  const reviews = 120;
  const exp = 6;
  const bio = "A designer and painting team come to your home. Covers colour consultation, 2 coats of premium emulsion painting and basic room styling — furniture arrangement, décor and lighting suggestions. One room fully transformed and move-in ready in 2 days.";
  const price = 15000;
  const thumbnail = "https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Room%20REresh.png";
  const isVerified = false;
  
  const categoryDetails: any = {"id":"6ac5e337-648d-497d-b709-9309f3e004be","package_id":"interior-001","hero_description":"A designer and painting team come to your home — colour consultation, premium emulsion painting and basic room styling all in one package. One room fully refreshed and move-in ready in 2 days.","inclusions":["Interior designer colour consultation","Wall putty touchups and surface prep","2 coats of premium emulsion paint","Furniture arrangement guidance","Basic décor and lighting suggestions","Full cleanup after completion","Materials and tools brought on-site","Per room pricing available"],"styles":["Smooth Matt Emulsion","Satin and Eggshell Finish","Warm Tones","Cool and Neutral Tones","Bold Accent Wall"],"examples":["https://images.unsplash.com/photo-1563806229566-1cdaaaed81fa?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop"],"workflow":["1. Designer visits — colour consultation, paint brand and finish selected","2. Surface preparation — cracks filled, putty applied and sanded","3. Primer coat where needed","4. First emulsion coat applied","5. Second coat after drying","6. Furniture arrangement and basic styling done","7. Full cleanup — room handed over spotless"],"deliverables":["All walls freshly painted in chosen colour","Surface preparation completed","2 coats emulsion applied","Furniture rearranged for best layout","Basic décor and lighting suggestions provided","Full cleanup on completion"],"use_cases":["New flat owners painting before move-in","Homeowners refreshing a room after 3-5 years","Rental properties refreshed between tenants","Anyone wanting a quick room upgrade without full renovation","Office spaces being repainted during holiday periods"],"tips":["Choose your paint colour and confirm before we start — changes after primer add cost","Asian Paints Royale and Berger Silk are the best performers for durability","Test a small patch in natural daylight before committing to the full room","Keep windows open during and after painting for 48hrs — proper ventilation matters"],"faqs":[{"answer":"Asian Paints, Berger and Dulux — we work with your preferred brand or recommend the best for your budget.","question":"Which paint brands do you use?"},{"answer":"Typically 1-2 standard bedrooms per day depending on wall condition and room size.","question":"How many rooms can be done in one day?"},{"answer":"Yes — paint, rollers, brushes, tape and drop sheets all provided.","question":"Do you bring all the materials?"},{"answer":"Yes — with landlord permission for standard painting. We also offer no-damage solutions for renters.","question":"Can this be done in a rented flat?"}],"created_at":"2026-05-14T17:09:37.847677+00:00","updated_at":"2026-05-14T17:09:37.847677+00:00"};
  const themeColors = {"primary":"from-amber-500 to-yellow-600","text":"text-amber-500","bgGlow":"bg-amber-500/10","border":"border-amber-500/20"};
  const relatedItems: RelatedItem[] = [{"id":"44e75086-f26f-48c5-aedf-aadf6a2a7eb6","name":"Modular Kitchen Design","subtitle":"Interior Designer","description":"Kitchen design specialist who visits your home and designs your complete modular kitchen. Session 1: measures kitchen, discusses requirements and creates 3D layout with material and colour options. Session 2: finalises design, prepares BOQ and coordinates with modular kitchen vendor. Countertop, shutter, hardware and appliance placement all planned. Works with all major Hyderabad modular kitchen brands.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Modular%20Kitchen.png","slug":"modular-kitchen-designers-madhapur"},{"id":"91f0498a-18be-487d-bd2c-065d97d3d9ec","name":"Bedroom / Living Room Makeover","subtitle":"Interior Designer","description":"Interior design team of 2 who execute a complete bedroom or living room makeover at your home. Session 1: measurement, mood board and shopping list. Session 2+: execution — furniture arrangement, décor placement, curtains, cushions, wall art and accessories. Sources from Hyderabad markets and online within your budget. Works with both rented and owned homes. Transformation visible from day one.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Living%20Room%20Makeover.png","slug":"bedroom-living-room-interior-design-madhapur"},{"id":"e9847873-ca0b-4d29-927c-f65d6f89b46f","name":"Home Interior Consultation","subtitle":"Interior Designer","description":"Senior interior designer who visits your home for a full consultation session. Covers every room — living, bedroom, kitchen, bathrooms and balcony. Discusses your style, budget and timeline. Prepares a mood board, material palette, vendor list and room-wise action plan. 2D layout sketch provided. Consultation report delivered in 24 hrs. Perfect first step before any renovation or new home setup.","imageUrl":"https://pub-962ecf16eb9a4629a9bf8d004682ebc5.r2.dev/Home%20Interior%20Consultation.png","slug":"home-interior-design-consultation-madhapur"}];

  const seoH1 = "Room Refresh Package - Interior Design Services in Madhapur";
  const richIntro = "Embarking on a home renovation or looking for modular kitchen designers in Madhapur? Focsera provides high-quality residential and commercial interior design services tailored to your space. Our verified design partners for Room Refresh Package offer professional space planning, modular kitchen installations, premium wardrobe cabinetry, paint and wall finishing, and furniture sourcing. We bridge the gap between creative concepts and flawless execution, using state-of-the-art 3D layout renderings to preview your rooms before procurement. We understand that your home is a personal asset; that is why we use high-density, moisture-resistant materials and premium hardware to guarantee long-term durability. From a small bedroom refresh to a full-home commercial fit-out, Focsera ensures site supervision, strict timeline compliance, and escrow-protected milestones. Connect with top interior designers in Madhapur and bring your dream living space to life with transparent rates and premium quality assurance.\n\nOur verified professional partner services for Room Refresh Package are highly structured to match search query parameters in Madhapur. Read our core inclusions, standard workflow milestones, localized testimonials, and FAQs below to configure your custom project and coordinate with our team today. A designer and painting team come to your home. Covers colour consultation, 2 coats of premium emulsion painting and basic room styling — furniture arrangement, décor and lighting suggestions. One room fully transformed and move-in ready in 2 days.";
  const faqsList: { question: string; answer: string; }[] = [{"question":"What is the typical timeline for Room Refresh Package in Madhapur?","answer":"For modular kitchens or living room transformations in Madhapur, the timeline ranges from 21 to 35 days, including factory manufacturing of wood components and site installation."},{"question":"How do your interior designers charge for services in Madhapur?","answer":"We offer transparent, modular rates based on the scope of woodwork, paint finishes, and materials chosen, avoiding flat markups."},{"question":"Do you provide 3D visual designs before beginning work in Madhapur?","answer":"Yes, all our interior design packages in Madhapur include detailed 2D layouts and realistic 3D renderings so you can visualize the space before procurement."},{"question":"What wood and hardware brands do you use for wardrobes in Madhapur?","answer":"We use high-density moisture-resistant (HDMR) plywood and premium hardware brands like Hettich or Hafele for long-term durability on all installations in Madhapur."},{"question":"Is site supervision included in the Focsera interior package in Madhapur?","answer":"Yes, a dedicated project supervisor in Madhapur will manage the carpenters, painters, and electricians, providing you with daily photo updates."},{"question":"Can I customize the color scheme and laminate finishes?","answer":"Absolutely. We provide a wide catalog of laminates, acrylics, and paint swatches during the consultation phase in Madhapur."},{"question":"Do you help in selecting and sourcing furniture and lighting in Madhapur?","answer":"Yes, our designers accompany you to wholesale markets or coordinate with partner stores in Madhapur to source lighting, curtains, and furniture at competitive prices."},{"question":"What warranty do you offer on modular woodwork in Madhapur?","answer":"Focsera offers a 5-year warranty on modular wardrobe and kitchen woodwork in Madhapur against termites and manufacturing defects."},{"question":"How is the payment structured for home renovation in Madhapur?","answer":"We use an escrow-protected milestone system: 50% advance for design and factory start, 40% upon material delivery, and 10% post-installation."},{"question":"Do you handle paint, civil work, and electrical modifications in Madhapur?","answer":"Yes, we provide end-to-end services across Madhapur, including wall painting, tile laying, plumbing, and electrical socket repositioning."},{"question":"Can I request design revisions during the 3D phase?","answer":"Yes, we include up to 3 rounds of design revisions to perfect the layouts, colors, and layout configurations."},{"question":"Are post-installation cleanups handled by Focsera in Madhapur?","answer":"Yes, our team performs a professional deep cleaning of the rooms to ensure your home in Madhapur is ready to move in."},{"question":"Why should I book services through the Focsera platform?","answer":"Focsera offers pre-vetted creative professionals, milestone-based escrow payments, dedicated support, and strict quality checks, making project coordination hassle-free."},{"question":"How does the escrow payment model work?","answer":"Your funds are held securely by Focsera and only released to the professional partner after you review and approve their work milestones."},{"question":"What if the delivered service does not meet my quality expectations?","answer":"Focsera support coordinates mediation. If the work does not match the agreed-upon inclusions, you are covered by our refund and quality guarantee."}];
  const reviewsList: { name: string; location: string; rating: number; date: string; comment: string; }[] = [{"name":"Vikram K.","location":"Madhapur, Hyderabad","rating":5,"date":"May 20, 2026","comment":"Excellent modular kitchen design! The 3D layouts helped us visualize the space, and the actual woodwork installation is high quality and very durable in Madhapur."},{"name":"Sneha Reddy","location":"Hyderabad","rating":5,"date":"April 10, 2026","comment":"Focsera helped us revamp our living space on a budget. The material sourcing was very transparent and project coordination was top-notch."},{"name":"Kiran Dev","location":"Madhapur, Hyderabad","rating":4,"date":"March 24, 2026","comment":"Sleek wardrobe design and perfect color choices. Site supervisor was present daily in Madhapur and provided detailed photo updates."}];
  const slug = "room-renovation-interior-design-madhapur";
  const itemType = "package" as 'package' | 'partner';

  useEffect(() => {
    document.title = "Room Refresh Package in Madhapur - Premium Residential & Commercial Interior Designers in Madhapur | Focsera";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "A designer and painting team come to your home. Covers colour consultation, 2 coats of premium emulsion painting and basic room styling — furniture... Book verified creative professionals and custom packages for Room Refresh Package in Madhapur on Focsera.");

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
    ogTitle.setAttribute('content', "Room Refresh Package in Madhapur - Premium Residential & Commercial Interior Designers in Madhapur | Focsera");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', "A designer and painting team come to your home. Covers colour consultation, 2 coats of premium emulsion painting and basic room styling — furniture... Book verified creative professionals and custom packages for Room Refresh Package in Madhapur on Focsera.");

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
    script.text = JSON.stringify({"@context":"https://schema.org","@type":"Product","name":"Room Refresh Package","description":"A designer and painting team come to your home. Covers colour consultation, 2 coats of premium emulsion painting and basic room styling — furniture arrangement, décor and lighting suggestions. One room fully transformed and move-in ready in 2 days.","image":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Room%20REresh.png","brand":{"@type":"Brand","name":"Focsera"},"offers":{"@type":"Offer","price":"Enquire","priceCurrency":"INR","availability":"https://schema.org/InStock"}});
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
              to="/room-renovation-interior-design-hyderabad"
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
              to="/room-renovation-interior-design-gachibowli"
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
              to="/room-renovation-interior-design-secunderabad"
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
              to="/room-renovation-interior-design-kondapur"
              className="group p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-blue-500/20 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Kondapur
              </span>
            </Link>
            <Link
              to="/room-renovation-interior-design-jubilee-hills"
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
              to="/room-renovation-interior-design-madhapur"
              className="group p-4 rounded-2xl bg-slate-900 border border-blue-500/80 bg-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Madhapur
              </span>
            </Link>
            <Link
              to="/room-renovation-interior-design-banjara-hills"
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
              to="/room-renovation-interior-design-kukatpally"
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
