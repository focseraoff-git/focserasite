// src/components/seo/SeoPageTemplate.tsx
// Master template for all SEO landing pages.
// Replaces 553 individual generated .tsx files with one reusable component.

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, BookOpen, Layers } from 'lucide-react';
import type { PageData } from './types';
import { getCategoryAccent, getCategoryBgAccent } from './types';

import SeoHero from './SeoHero';
import ServiceProviderCard from './ServiceProviderCard';
import WhyFocseraSection from './WhyFocseraSection';
import AppPromotionSection from './AppPromotionSection';
import SeoFaqAccordion from './SeoFaqAccordion';
import LocalDiscoveryGrid from './LocalDiscoveryGrid';
import SeoOfferBanner from './SeoOfferBanner';
import FinalCtaSection from './FinalCtaSection';
import MobileStickyBar from './MobileStickyBar';

interface Props {
  data: PageData;
}

export default function SeoPageTemplate({ data }: Props) {
  // ── SEO Head Management ──
  useEffect(() => {
    // Title
    document.title = data.seoTitle;

    // Meta description
    setMeta('description', data.seoDescription);

    // Canonical
    setLink('canonical', `https://focsera.in/${data.slug}`);

    // Open Graph
    setMetaProperty('og:title', data.seoTitle);
    setMetaProperty('og:description', data.seoDescription);
    setMetaProperty('og:url', `https://focsera.in/${data.slug}`);
    setMetaProperty('og:type', 'website');
    if (data.thumbnail) {
      setMetaProperty('og:image', data.thumbnail);
    }
    setMetaProperty('og:site_name', 'Focsera');
    setMetaProperty('og:locale', 'en_IN');

    // Schema JSON-LD
    const existingScript = document.getElementById('focsera-seo-ld-json');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = 'focsera-seo-ld-json';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data.schemaData);
    document.head.appendChild(script);

    // FAQ Schema (if FAQs exist)
    const existingFaqScript = document.getElementById('focsera-faq-ld-json');
    if (existingFaqScript) existingFaqScript.remove();

    if (data.faqsList && data.faqsList.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': data.faqsList.slice(0, 10).map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
          },
        })),
      };
      const faqScript = document.createElement('script');
      faqScript.id = 'focsera-faq-ld-json';
      faqScript.type = 'application/ld+json';
      faqScript.text = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
    }

    // Cleanup on unmount
    return () => {
      const s1 = document.getElementById('focsera-seo-ld-json');
      if (s1) s1.remove();
      const s2 = document.getElementById('focsera-faq-ld-json');
      if (s2) s2.remove();
    };
  }, [data]);

  const accent = getCategoryAccent(data.subtitle);
  const bgAccent = getCategoryBgAccent(data.subtitle);

  return (
    <article className="min-h-screen bg-focsera-bg text-focsera-text font-sans selection:bg-blue-100 selection:text-focsera-text">
      {/* ── SECTION 1: Hero ── */}
      <SeoHero data={data} />

      {/* ── SECTION 2: Discover Professionals / Related Items ── */}
      {data.relatedItems.length > 0 && (
        <section className="py-16 sm:py-20 bg-white border-t border-focsera-border">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="section-label mb-2 block">
                  {data.itemType === 'package' ? 'Verified Professionals' : 'Curated Packages'}
                </span>
                <h2 className="font-heading text-heading-2 text-focsera-text">
                  {data.itemType === 'package'
                    ? `Professionals for ${data.name}`
                    : 'Related Service Packages'}
                </h2>
              </div>
              <Link
                to="/"
                className="text-sm font-semibold text-focsera-primary hover:underline inline-flex items-center gap-1 shrink-0"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.relatedItems.map((item) => (
                <ServiceProviderCard
                  key={item.id}
                  item={item}
                  itemType={data.itemType === 'package' ? 'partner' : 'package'}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 3: Why Focsera ── */}
      <WhyFocseraSection />

      {/* ── SECTION 4: App Promotion ── */}
      <AppPromotionSection />

      {/* ── SECTION 5: Service Overview / Inclusions / Use Cases ── */}
      <section className="py-16 sm:py-20 bg-white border-t border-focsera-border" id="service-overview">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Main content */}
            <div className="lg:col-span-8">
              {/* Service explanation */}
              <div className="mb-12">
                <span className="section-label mb-3 block">About This Service</span>
                <h2 className="font-heading text-heading-2 text-focsera-text mb-6">
                  {data.name} {data.locationName ? `in ${data.locationName}` : ''}
                </h2>

                {data.categoryDetails?.hero_description && (
                  <div className={`p-5 rounded-xl ${bgAccent} border border-focsera-border/50 mb-6`}>
                    <p className={`text-sm leading-relaxed ${accent} italic`}>
                      "{data.categoryDetails.hero_description}"
                    </p>
                  </div>
                )}

                <div className="prose prose-sm max-w-none text-focsera-muted leading-relaxed">
                  {data.richIntro.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              {data.categoryDetails?.inclusions && data.categoryDetails.inclusions.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-heading-3 text-focsera-text mb-5 font-sans flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-500" />
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.categoryDetails.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-focsera-bg">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-focsera-text">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables */}
              {data.categoryDetails?.deliverables && data.categoryDetails.deliverables.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-heading-3 text-focsera-text mb-5 font-sans flex items-center gap-2">
                    <Layers size={18} className="text-focsera-primary" />
                    Deliverables
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.categoryDetails.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-focsera-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-focsera-primary shrink-0" />
                        <span className="font-medium">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Workflow */}
              {data.categoryDetails?.workflow && data.categoryDetails.workflow.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-heading-3 text-focsera-text mb-5 font-sans flex items-center gap-2">
                    <BookOpen size={18} className="text-focsera-primary" />
                    How It Works
                  </h3>
                  <div className="space-y-4">
                    {data.categoryDetails.workflow.map((step, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-7 h-7 rounded-full bg-focsera-accent text-focsera-primary border border-focsera-primary/10 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-focsera-muted leading-relaxed pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Use Cases & Styles */}
            <aside className="lg:col-span-4">
              {/* Use Cases */}
              {data.categoryDetails?.use_cases && data.categoryDetails.use_cases.length > 0 && (
                <div className="marketplace-card p-6 mb-6">
                  <h3 className="text-sm font-bold text-focsera-text mb-4 font-sans uppercase tracking-wider">
                    Use Cases
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.categoryDetails.use_cases.map((useCase, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgAccent} ${accent} border border-current/10`}
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Styles / Formats */}
              {data.categoryDetails?.styles && data.categoryDetails.styles.length > 0 && (
                <div className="marketplace-card p-6 mb-6">
                  <h3 className="text-sm font-bold text-focsera-text mb-4 font-sans uppercase tracking-wider">
                    Available Styles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.categoryDetails.styles.map((style, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-focsera-bg text-focsera-text border border-focsera-border"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {data.categoryDetails?.tips && data.categoryDetails.tips.length > 0 && (
                <div className="marketplace-card p-6">
                  <h3 className="text-sm font-bold text-focsera-text mb-4 font-sans uppercase tracking-wider">
                    💡 Tips
                  </h3>
                  <ul className="space-y-3">
                    {data.categoryDetails.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-focsera-muted leading-relaxed pl-4 border-l-2 border-focsera-accent">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Offer Banner ── */}
      <SeoOfferBanner />

      {/* ── SECTION 7: Local Discovery ── */}
      <LocalDiscoveryGrid
        baseSlug={data.baseSlug}
        currentSlug={data.slug}
        serviceName={data.name}
      />

      {/* ── SECTION 8: FAQ ── */}
      <SeoFaqAccordion
        faqs={data.faqsList}
        slug={data.slug}
        locationName={data.locationName}
      />

      {/* ── SECTION 9: Final CTA ── */}
      <FinalCtaSection />

      {/* ── Mobile Sticky Bar ── */}
      <MobileStickyBar serviceName={data.name} />
    </article>
  );
}

// ── Helper functions for SEO head management ──

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
