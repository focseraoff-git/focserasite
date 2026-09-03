// src/components/seo/FinalCtaSection.tsx
import { ArrowRight } from 'lucide-react';
import { trackAppCtaClick } from '../../lib/seoAnalytics';

export default function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-focsera-border">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <span className="section-label mb-4 block">Ready to Book?</span>
        <h2 className="font-heading text-heading-1 sm:text-display text-focsera-text mb-5">
          Find your next professional on Focsera
        </h2>
        <p className="text-base text-focsera-muted mb-10 max-w-md mx-auto leading-relaxed">
          Whether it's a photographer, event planner, interior designer, or web developer — Focsera connects you with verified experts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            onClick={() => trackAppCtaClick('final_cta', 'play_store')}
            id="final-cta-app"
          >
            Book on Focsera App
            <ArrowRight size={16} />
          </a>
          <a href="/" className="btn-secondary">
            Explore on Web
          </a>
        </div>
      </div>
    </section>
  );
}
