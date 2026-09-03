// src/components/seo/AppPromotionSection.tsx
import { Smartphone, Zap, Heart, Bell, MessageCircle, Star, Gift, Search } from 'lucide-react';
import { trackAppCtaClick } from '../../lib/seoAnalytics';

const appFeatures = [
  { icon: Zap, label: 'Faster booking' },
  { icon: Heart, label: 'Personalized recommendations' },
  { icon: Gift, label: 'Exclusive offers' },
  { icon: Search, label: 'Discover more professionals' },
  { icon: Bell, label: 'Booking notifications' },
  { icon: MessageCircle, label: 'Easy communication' },
  { icon: Star, label: 'Rate & review services' },
  { icon: Smartphone, label: 'Manage all bookings' },
];

export default function AppPromotionSection() {
  return (
    <section className="py-16 sm:py-20 bg-focsera-bg border-t border-focsera-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div>
            <span className="section-label mb-3 block">Focsera App</span>
            <h2 className="font-heading text-heading-2 sm:text-[2rem] text-focsera-text mb-5">
              Unlock the full Focsera experience
            </h2>
            <p className="text-base text-focsera-muted leading-relaxed mb-8 max-w-md">
              Discover professionals, manage bookings, get offers and experience Focsera wherever you go.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {appFeatures.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-focsera-accent flex items-center justify-center shrink-0">
                    <feature.icon size={16} className="text-focsera-primary" />
                  </div>
                  <span className="text-sm font-medium text-focsera-text">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                onClick={() => trackAppCtaClick('app_section', 'play_store')}
                id="app-section-cta"
              >
                Book on Focsera App
              </a>
              <a href="#service-overview" className="btn-secondary">
                Continue on Web
              </a>
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-[220px] sm:w-[260px] rounded-[2.5rem] p-2 bg-gradient-to-b from-gray-200 to-gray-300 shadow-elevated">
                <div className="rounded-[2.2rem] overflow-hidden bg-black aspect-[9/19.5] relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />
                  <img
                    src="/images/Screenshot_20260518_134332.jpg.jpeg"
                    alt="Focsera app interface showing service booking"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={260}
                    height={563}
                  />
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-8 bg-focsera-primary/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
