// src/components/seo/SeoFaqAccordion.tsx
import type { FaqItem } from './types';
import { trackFaqOpen } from '../../lib/seoAnalytics';

interface Props {
  faqs: FaqItem[];
  slug: string;
  locationName: string;
}

export default function SeoFaqAccordion({ faqs, slug, locationName }: Props) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 bg-focsera-bg border-t border-focsera-border" id="faqs">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-label mb-3 block">FAQ</span>
          <h2 className="font-heading text-heading-2 sm:text-[2rem] text-focsera-text">
            Frequently Asked Questions
          </h2>
          {locationName && (
            <p className="text-sm text-focsera-muted mt-3">
              Common questions about booking services in {locationName}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="faq-item"
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) {
                  trackFaqOpen(faq.question, slug);
                }
              }}
            >
              <summary>{faq.question}</summary>
              <div className="faq-answer">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
