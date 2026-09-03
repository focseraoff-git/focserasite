// src/components/seo/SeoOfferBanner.tsx
import { ArrowRight } from 'lucide-react';
import { trackAppCtaClick } from '../../lib/seoAnalytics';

export default function SeoOfferBanner() {
  return (
    <section className="py-12 sm:py-14 bg-gradient-to-r from-focsera-text via-gray-900 to-focsera-text border-t border-focsera-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-focsera-secondary mb-2 block">
              Focsera App
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-heading mb-2">
              More services. Better discovery. Exclusive experiences.
            </h2>
            <p className="text-sm text-gray-400 max-w-md">
              Download the app and discover more professionals near you.
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-focsera-text font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => trackAppCtaClick('offer_banner', 'play_store')}
            id="offer-banner-cta"
          >
            Book on Focsera App
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
