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

export default function KidsPartyEntertainersMagiciansSecunderabad() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'inclusions' | 'faqs'>('overview');
  const [faqOpenIndices, setFaqOpenIndices] = useState<Record<number, boolean>>({});

  const name = "Kids Party Entertainer";
  const subtitle = "Event Host";
  const rating = 5;
  const reviews = 198;
  const exp = 6;
  const bio = "Professional kids party entertainer who comes to your home or hall with a complete entertainment kit — magic show props, balloon twisting, face painting and interactive games. Keeps children aged 3–12 engaged for 90 minutes. Bilingual Telugu and English. Themed characters available — superhero, princess, clown. Parents love it, kids remember it forever. Book 5 days in advance.";
  const price = 5500;
  const thumbnail = "https://pub-962ecf16eb9a4629a9bf8d004682ebc5.r2.dev/Kids%20Party.png";
  const isVerified = true;
  
  const categoryDetails: any = {"partner_id":"0a1ed02a-5064-4a3f-ab8c-a6c6f7ffafef","hero_description":"A professional kids party entertainer who comes to your home or hall with magic, balloon twisting, face painting and games — 90 minutes of pure engagement.","inclusions":["Magic show props and performance","Balloon twisting for all children","Face painting kit","Interactive games facilitation","Themed character costume available"],"styles":["Classic Magic Show","Superhero Character Visit","Princess / Fairy Character Visit","Clown Entertainment","Interactive Science Show"],"examples":["https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"],"workflow":["1. Booking: Confirm child's age, number of children and theme preference","2. Pre-event call: Entertainment programme tailored to age group","3. Arrives 20 minutes before for setup","4. 90-minute programme: magic show, balloon twisting, face painting, games","5. Post-programme: character photos with all children"],"deliverables":["Full 90-minute entertainment programme","Magic show performance","Balloon animal/flower twisting for all children","Face painting for all children","Character photo opportunity at the end"],"use_cases":["Kids birthday party at home or hall (ages 3–12)","School classroom party","Housing society kids event","Festival celebration kids entertainment","Family event with children present"],"tips":["Brief the entertainer on any shy or anxious children — they will approach these children gently and involve them last","Set up a designated entertainment area with enough space for all children to sit in a circle","Parents: step back and let the children engage with the entertainer — parental hovering makes children self-conscious","Keep the entertainment slot early in the party — children engage best when they are not yet tired or overstimulated by food and sugar"],"faqs":[{"answer":"Ages 3–12. The programme is completely tailored to the age group attending.","question":"What age range do you cover?"},{"answer":"Yes — we use only certified hypoallergenic, skin-safe face paints approved for children.","question":"Is the face painting safe for young children?"},{"answer":"Yes — outdoor garden and terrace performances are covered with portable setup.","question":"Can you perform outdoors?"},{"answer":"We always read the room and adjust immediately. No child is ever put on the spot or made uncomfortable.","question":"What if some children are scared of the clown or character?"}],"created_at":"2026-03-21T18:38:40.101933+00:00","updated_at":"2026-03-21T18:38:40.101933+00:00"};
  const themeColors = {"primary":"from-orange-500 to-red-500","text":"text-orange-500","bgGlow":"bg-orange-500/10","border":"border-orange-500/20"};
  const relatedItems: RelatedItem[] = [{"id":"event-001","name":"Birthday & Celebration Package","subtitle":"Event Package","description":"A planning team comes to your home or hall and handles everything — décor, balloon arch, cake coordination, games, vendor management and pack-down. Covers birthdays, anniversaries, surprise parties and house parties. Arrives 2 hours early, manages the full event.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Birthday.png","slug":"birthday-event-planning-secunderabad"},{"id":"event-002","name":"Kids Party Package","subtitle":"Event Package","description":"A specialist team comes to your home or hall with a complete themed setup — any theme, any age 1-12. Includes themed balloon décor, entertainer with magic and games, activity stations and return gift bags. Fully managed from setup to pack-down.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Kids%20Party.png","slug":"kids-birthday-party-planners-secunderabad"},{"id":"event-003","name":"Corporate & Social Event Package","subtitle":"Event Package","description":"End-to-end planning and execution for office parties, product launches, team outings, engagements and weddings. A dedicated team handles venue, AV, catering coordination, décor, on-site management and pack-down. Up to 100 guests.","imageUrl":"https://pub-df95b17401684b1eb607a6eef8f48b4d.r2.dev/Corporate%20and%20Social.png","slug":"corporate-event-planners-secunderabad"}];

  const seoH1 = "Kids Party Entertainer - Event Planners & Decorators in Secunderabad";
  const richIntro = "Looking for the best event organisers and party decorators in Secunderabad? Focsera matches you with verified specialists for Kids Party Entertainer. Our professional event coordinators specialize in spatial layouts, theme styling, balloon decoration, stage setups, sound management, and seamless vendor coordination. Planning a milestone celebration can be stressful, but our team is dedicated to handling all logistics, arriving 2 hours early to ensure every detail from the cake table to the main stage backdrop is perfect. Whether it's an intimate house gathering, a corporate social activation, or a major celebration, we align with the top local planners to provide premium end-to-end execution. We focus on creating unforgettable experiences, catering to custom layouts, specialized game segments, and high-energy guest hosting. Trust Focsera for structured event solutions in Secunderabad that fit your scale and target your guest's absolute comfort.\n\nOur verified professional partner services for Kids Party Entertainer are highly structured to match search query parameters in Secunderabad. Read our core inclusions, standard workflow milestones, localized testimonials, and FAQs below to configure your custom project and coordinate with our team today. Professional kids party entertainer who comes to your home or hall with a complete entertainment kit — magic show props, balloon twisting, face painting and interactive games. Keeps children aged 3–12 engaged for 90 minutes. Bilingual Telugu and English. Themed characters available — superhero, princess, clown. Parents love it, kids remember it forever. Book 5 days in advance.";
  const faqsList: { question: string; answer: string; }[] = [{"question":"What is included in the Kids Party Entertainer packages in Secunderabad?","answer":"Our packages include event planning, theme selection, balloon arches or customized backdrops, stage lighting, venue setup, and clean-up in Secunderabad. We also coordinate with third-party vendors for catering, sound, and MCs."},{"question":"How far in advance should I book event planners in Secunderabad?","answer":"We recommend booking at least 2 to 3 weeks before the event date. This ensures ample time for theme coordination, backdrop customization, and securing the best verified vendors in Secunderabad."},{"question":"Can I customize the decoration theme for Kids Party Entertainer in Secunderabad?","answer":"Yes, Focsera provides 100% customizable themes for Kids Party Entertainer setups in Secunderabad. You can share image references with our coordinators, and we will custom-build the balloon arches, backdrops, and table settings."},{"question":"Do you manage outdoor venues or house parties in Secunderabad?","answer":"Yes, we cover get-togethers, terrace parties, banquet halls, and outdoor lawns across Secunderabad. We adapt the setup to the specific location requirements."},{"question":"Are catering and cake coordination covered?","answer":"While our core package focuses on planning and decoration, Focsera coordinators can assist in cake customization and catering vendor selection upon request in Secunderabad."},{"question":"What is the cancellation and rescheduling policy in Secunderabad?","answer":"You can reschedule the event up to 5 days before the scheduled date at no additional cost. Cancellations made within 48 hours of the event may incur a minor venue-setup fee."},{"question":"Do you provide game hosts, anchors, or magicians in Secunderabad?","answer":"Yes, Focsera partners with high-energy party anchors, MCs, kids entertainers, and magicians in Secunderabad to keep your guests engaged throughout the segment."},{"question":"How many team members will arrive at the venue?","answer":"Depending on the scale of the setup, a team of 3 to 6 coordinators will arrive at least 2 to 3 hours early to assemble the decoration and manage the event flow."},{"question":"How do I coordinate with the assigned Focsera event planner in Secunderabad?","answer":"Once you place an inquiry, our lead coordinator will contact you via WhatsApp to align on the theme, color palette, schedule, and vendor logistics in Secunderabad."},{"question":"Are sound systems and microphones provided in Secunderabad?","answer":"Standard PA sound systems with cordless mics can be added as an optional inclusion in your event setup in Secunderabad."},{"question":"Do you handle post-event pack-down and clean-up in Secunderabad?","answer":"Yes, our crew handles the complete pack-down of the decoration, balloon removal, and general clean-up of the stage area across all venues in Secunderabad."},{"question":"Is there a surcharge for late-night event setups in Secunderabad?","answer":"Setups occurring after 10 PM in Secunderabad may carry a minor operational surcharge, which will be discussed transparently during coordination."},{"question":"Why should I book services through the Focsera platform?","answer":"Focsera offers pre-vetted creative professionals, milestone-based escrow payments, dedicated support, and strict quality checks, making project coordination hassle-free."},{"question":"How does the escrow payment model work?","answer":"Your funds are held securely by Focsera and only released to the professional partner after you review and approve their work milestones."},{"question":"What if the delivered service does not meet my quality expectations?","answer":"Focsera support coordinates mediation. If the work does not match the agreed-upon inclusions, you are covered by our refund and quality guarantee."}];
  const reviewsList: { name: string; location: string; rating: number; date: string; comment: string; }[] = [{"name":"Ananya Sharma","location":"Secunderabad, Hyderabad","rating":5,"date":"May 12, 2026","comment":"Outstanding event coordination! The team managed the balloon arches and backdrop decor beautifully in Secunderabad. Arrived early and handled vendor communication flawlessly."},{"name":"Rahul Verma","location":"Hyderabad","rating":5,"date":"April 28, 2026","comment":"We booked the kids birthday planning package and were blown away. The game MC kept the children engaged the entire time. Very professional."},{"name":"Preethi K.","location":"Secunderabad, Hyderabad","rating":4,"date":"March 15, 2026","comment":"Smooth event flow and excellent theme choices. Highly recommend Focsera for party coordination in Secunderabad."}];
  const slug = "kids-party-entertainers-magicians-secunderabad";
  const itemType = "partner" as 'package' | 'partner';

  useEffect(() => {
    document.title = "Kids Party Entertainer in Secunderabad - Best Event Planning & Coordination Services in Secunderabad | Focsera";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', "Professional kids party entertainer who comes to your home or hall with a complete entertainment kit — magic show props, balloon twisting, face pai... Book verified creative professionals and custom packages for Kids Party Entertainer in Secunderabad on Focsera.");

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
    ogTitle.setAttribute('content', "Kids Party Entertainer in Secunderabad - Best Event Planning & Coordination Services in Secunderabad | Focsera");

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', "Professional kids party entertainer who comes to your home or hall with a complete entertainment kit — magic show props, balloon twisting, face pai... Book verified creative professionals and custom packages for Kids Party Entertainer in Secunderabad on Focsera.");

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
    script.text = JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"Kids Party Entertainer","image":"https://pub-962ecf16eb9a4629a9bf8d004682ebc5.r2.dev/Kids%20Party.png","description":"Professional kids party entertainer who comes to your home or hall with a complete entertainment kit — magic show props, balloon twisting, face painting and interactive games. Keeps children aged 3–12 engaged for 90 minutes. Bilingual Telugu and English. Themed characters available — superhero, princess, clown. Parents love it, kids remember it forever. Book 5 days in advance.","address":{"@type":"PostalAddress","addressLocality":"Hyderabad","addressRegion":"Telangana","addressCountry":"IN"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"198"}});
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
              to="/kids-party-entertainers-magicians"
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
              to="/kids-party-entertainers-magicians-gachibowli"
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
              to="/kids-party-entertainers-magicians-secunderabad"
              className="group p-4 rounded-2xl bg-slate-900 border border-blue-500/80 bg-blue-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-400 transition-colors line-clamp-1">
                {name}
              </span>
              <span className="text-sm font-bold text-white mt-1">
                in Secunderabad
              </span>
            </Link>
            <Link
              to="/kids-party-entertainers-magicians-kondapur"
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
              to="/kids-party-entertainers-magicians-jubilee-hills"
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
              to="/kids-party-entertainers-magicians-madhapur"
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
              to="/kids-party-entertainers-magicians-banjara-hills"
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
              to="/kids-party-entertainers-magicians-kukatpally"
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
