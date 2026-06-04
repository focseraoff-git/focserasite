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

export default function MusicVideoSongReelProductionGachibowli() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  const name = "Music Video / Song Reel";
  const subtitle = "Videographer";
  const rating = 5;
  const reviews = 167;
  const exp = 7;
  const bio = "3-person music video team — director, videographer and editor. LED colour gels, iPhone on gimbal for movement shots and mirrorless for cinematic stills. Comes to your home, rooftop or chosen single location. Shoots and edits a 60–90 second music video or song reel on-site. Delivered in 24 hrs. Instagram Reels, YouTube Shorts and Spotify Canvas ready. Indie artists and creators.";
  const price = 5500;
  const thumbnail = "https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/partner_videographer.png";
  const isVerified = true;
  
  const categoryDetails: any = {"partner_id":"c15fc282-dae6-4a19-b73f-1fb43f11e734","hero_description":"A short-form music video or song reel shot at your home, rooftop or chosen single location — cinematic LED gels, iPhone gimbal movement and on-site editing in one session.","inclusions":["LED colour gels for dramatic lighting","iPhone on gimbal for smooth movement","Mirrorless for cinematic stills","3-person team: director, videographer, editor","60–90 second music video delivered"],"styles":["Indie Artist Single Reel","Hip-Hop Performance Video","Acoustic Singer-Songwriter Film","Dance Performance Video","Lyric Visualiser with Artist Footage"],"examples":["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"],"workflow":["1. Booking: Share your song and visual references","2. Director develops a simple shot list and location plan","3. Team arrives: LED gel lighting setup in 20 minutes","4. Shoot: Performance, B-roll and narrative sequences captured","5. On-site edit: Music video assembled and graded on-site","6. Delivery: 60–90 second music video in 24 hrs — Reels, Shorts and Spotify Canvas ready"],"deliverables":["1 music video / song reel (60–90 seconds)","Instagram Reels format (9:16)","YouTube Shorts format","Spotify Canvas format (8 seconds loop)","Full-resolution MP4 files"],"use_cases":["Independent artist launching a single","Musician building Instagram presence","Dance group performance documentation","Band or duo collaboration reel","Singer-songwriter acoustic session film"],"tips":["Wear an outfit that matches the song's mood — this single wardrobe decision elevates every shot","Choose a location that tells a story — your room, a rooftop, a meaningful wall","Know your song inside out — mouthing lyrics confidently on camera is a learnable skill","The best music videos have one strong visual concept — simple executed well always beats complex done poorly"],"faqs":[{"answer":"Yes — if you own the rights to the song, it is cleared for use on all platforms.","question":"Can we use our own released song in the video?"},{"answer":"Standard session covers one location. Multi-location sessions available as extended bookings.","question":"Can the video be shot at multiple locations?"},{"answer":"Yes — up to 6 performers can be covered in a standard session.","question":"Can we include a dance or performance group?"},{"answer":"Instagram Reels, YouTube Shorts and Spotify Canvas — all three delivered in one package.","question":"What platforms is the video formatted for?"}],"created_at":"2026-03-21T18:38:40.101933+00:00","updated_at":"2026-03-21T18:38:40.101933+00:00"};
  const themeColors = {"primary":"from-blue-600 to-indigo-600","text":"text-blue-500","bgGlow":"bg-blue-500/10","border":"border-blue-500/20"};
  const relatedItems: RelatedItem[] = [];

  const seoH1 = "Music Video / Song Reel - Services in Gachibowli";
  const richIntro = "Looking for professional photographers near me in Gachibowli to capture life's most precious milestones? Focsera connects you with top-rated photography and videography experts specializing in Music Video / Song Reel. We cover maternity shoots, newborn and baby portraits, half-saree ceremonies, weddings, fashion portfolios, and product catalog shoots. Our photographers are equipped with state-of-the-art cameras, advanced lighting setups, and creative backdrops to construct stunning visuals in any environment—whether at your doorstep, in a professional studio, or outdoors. We prioritize your comfort and punctuality, offering comprehensive sessions that include high-resolution edited files and raw photo access. A great photo is more than just a high-quality capture; it is an artistic expression. With secure escrow booking and verified reviews, Focsera ensures you receive professional digital gallery access and custom album layouts for your special days in Gachibowli.\n\nOur verified professional partner services for Music Video / Song Reel are highly structured to match search query parameters in Gachibowli. Read our core inclusions, standard workflow milestones, localized testimonials, and FAQs below to configure your custom project and coordinate with our team today. 3-person music video team — director, videographer and editor. LED colour gels, iPhone on gimbal for movement shots and mirrorless for cinematic stills. Comes to your home, rooftop or chosen single location. Shoots and edits a 60–90 second music video or song reel on-site. Delivered in 24 hrs. Instagram Reels, YouTube Shorts and Spotify Canvas ready. Indie artists and creators.";
  const faqsList: { question: string; answer: string; }[] = [{"question":"Where does the Music Video / Song Reel photoshoot take place in Gachibowli?","answer":"We offer flexibility: photoshoots can take place at your home (doorstep), in a rented professional studio, or at outdoor locations in Gachibowli."},{"question":"How many edited and raw pictures will I receive in Gachibowli?","answer":"Typically, a standard 2-hour session in Gachibowli delivers 30-50 high-resolution edited photos and all raw files via a digital download link."},{"question":"What is the turnaround time for photo delivery in Gachibowli?","answer":"Raw photos are shared within 24 hours. The final edited and retouched photos are delivered within 5 to 7 days."},{"question":"Do you provide outfits, props, and makeup in Gachibowli?","answer":"For maternity and newborn baby shoots in Gachibowli, we can coordinate props and backdrops. Outfit and professional makeup artists can be arranged as an add-on."},{"question":"Can I reschedule my photoshoot if needed?","answer":"Yes, you can reschedule up to 48 hours before the shoot. Rescheduling due to weather conditions or baby comfort is accommodated."},{"question":"Do you provide cinematic video reels during the shoot in Gachibowli?","answer":"Yes, we offer combined packages that include both high-resolution photography and vertical cinematic video reels in Gachibowli."},{"question":"How do you ensure a newborn baby's safety during the shoot?","answer":"Our newborn baby photographers in Gachibowli are trained in safe posing, sanitize all props, and maintain a warm, comfortable room temperature."},{"question":"Can we select the photos for retouching ourselves?","answer":"Yes, we share a proofing gallery of raw files, allowing you to select your favorite frames for final editing."},{"question":"What cameras and lenses do your photographers use in Gachibowli?","answer":"Our photographers in Gachibowli use professional Sony, Canon, or Nikon full-frame mirrorless cameras equipped with high-end portrait lenses."},{"question":"Is location permission or entry fee covered by the package in Gachibowli?","answer":"No, any entry fees or shooting permissions for outdoor parks or private resorts in Gachibowli must be arranged and paid by the client."},{"question":"Can we request physical albums or frames in Gachibowli?","answer":"Yes, we offer premium lay-flat photo books and acrylic frames as physical add-ons after delivery in Gachibowli."},{"question":"Do you cover family members in maternity and baby shoots?","answer":"Yes, spouse and immediate siblings are always welcome to participate in the photoshoot segments."},{"question":"Why should I book services through the Focsera platform?","answer":"Focsera offers pre-vetted creative professionals, milestone-based escrow payments, dedicated support, and strict quality checks, making project coordination hassle-free."},{"question":"How does the escrow payment model work?","answer":"Your funds are held securely by Focsera and only released to the professional partner after you review and approve their work milestones."},{"question":"What if the delivered service does not meet my quality expectations?","answer":"Focsera support coordinates mediation. If the work does not match the agreed-upon inclusions, you are covered by our refund and quality guarantee."}];
  const reviewsList: { name: string; location: string; rating: number; date: string; comment: string; }[] = [{"name":"Priya Sundaram","location":"Gachibowli, Hyderabad","rating":5,"date":"May 14, 2026","comment":"Beautiful maternity shoot! The photographer was extremely patient, suggested great outdoor locations in Gachibowli, and delivered stunning high-res edited files."},{"name":"Rohit Nair","location":"Hyderabad","rating":5,"date":"April 22, 2026","comment":"The doorstep baby photoshoot was comfortable and safe. The sanitized props and warm setup made our baby very happy. Stunning pictures!"},{"name":"Kavitha M.","location":"Gachibowli, Hyderabad","rating":4,"date":"March 18, 2026","comment":"Creative couple photoshoot in Gachibowli with professional lighting and background editing. Turnaround time for digital gallery was fast."}];
  const slug = "music-video-song-reel-production-gachibowli";
  const itemType = "partner" as 'package' | 'partner';

  useEffect(() => {
    document.title = "Music Video / Song Reel in Gachibowli - Premium Focsera Services in Gachibowli | Focsera";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "3-person music video team — director, videographer and editor. LED colour gels, iPhone on gimbal for movement shots and mirrorless for cinematic st... Book verified creative professionals and custom packages for Music Video / Song Reel in Gachibowli on Focsera.");

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
    ogTitle.setAttribute('content', "Music Video / Song Reel in Gachibowli - Premium Focsera Services in Gachibowli | Focsera");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', "3-person music video team — director, videographer and editor. LED colour gels, iPhone on gimbal for movement shots and mirrorless for cinematic st... Book verified creative professionals and custom packages for Music Video / Song Reel in Gachibowli on Focsera.");

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
    script.text = JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"Music Video / Song Reel","image":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/partner_videographer.png","description":"3-person music video team — director, videographer and editor. LED colour gels, iPhone on gimbal for movement shots and mirrorless for cinematic stills. Comes to your home, rooftop or chosen single location. Shoots and edits a 60–90 second music video or song reel on-site. Delivered in 24 hrs. Instagram Reels, YouTube Shorts and Spotify Canvas ready. Indie artists and creators.","address":{"@type":"PostalAddress","addressLocality":"Hyderabad","addressRegion":"Telangana","addressCountry":"IN"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"167"}});
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
              to="/music-video-song-reel-production"
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
              to="/music-video-song-reel-production-gachibowli"
              className="group p-4 rounded-2xl bg-slate-900 border border-blue-500/80 bg-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Gachibowli
              </span>
            </Link>
            <Link
              to="/music-video-song-reel-production-secunderabad"
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
              to="/music-video-song-reel-production-kondapur"
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
              to="/music-video-song-reel-production-jubilee-hills"
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
              to="/music-video-song-reel-production-madhapur"
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
              to="/music-video-song-reel-production-banjara-hills"
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
              to="/music-video-song-reel-production-kukatpally"
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
