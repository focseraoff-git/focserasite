// src/components/seo/WhyFocseraSection.tsx
import { Shield, Search, FileText, Calendar, Lock, Layers, MapPin, Users } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Verified Service Partners', desc: 'Every professional is vetted for quality and reliability.' },
  { icon: Search, title: 'Easy Discovery', desc: 'Find the right professional for your exact requirements.' },
  { icon: FileText, title: 'Transparent Information', desc: 'Clear service details, inclusions, and pricing upfront.' },
  { icon: Calendar, title: 'Simple Booking', desc: 'Book services in minutes through the Focsera app.' },
  { icon: Lock, title: 'Secure Payments', desc: 'Protected transactions with milestone-based releases.' },
  { icon: Layers, title: 'Dedicated Experience', desc: 'Personal coordination from inquiry to completion.' },
  { icon: Users, title: 'Multiple Categories', desc: 'Photography, events, interiors, web, design and more.' },
  { icon: MapPin, title: 'Local Professionals', desc: 'Connect with trusted experts in your area.' },
];

export default function WhyFocseraSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-focsera-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="section-label mb-3 block">Why Focsera</span>
          <h2 className="font-heading text-heading-2 sm:text-[2rem] text-focsera-text mb-4">
            Discover the right professional without the hassle
          </h2>
          <p className="text-sm sm:text-base text-focsera-muted max-w-lg mx-auto leading-relaxed">
            Focsera brings together verified professionals, transparent booking, and dedicated support — all in one platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-focsera-bg border border-focsera-border/50 hover:border-focsera-primary/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-focsera-accent flex items-center justify-center mb-4 group-hover:bg-focsera-primary/10 transition-colors">
                <feature.icon size={20} className="text-focsera-primary" />
              </div>
              <h3 className="text-sm font-bold text-focsera-text mb-1.5 font-sans">{feature.title}</h3>
              <p className="text-xs text-focsera-muted leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
