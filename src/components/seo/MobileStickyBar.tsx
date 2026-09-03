// src/components/seo/MobileStickyBar.tsx
import { useState, useEffect } from 'react';
import { ArrowRight, X, Smartphone } from 'lucide-react';
import { trackAppCtaClick } from '../../lib/seoAnalytics';

interface Props {
  serviceName: string;
}

export default function MobileStickyBar({ serviceName }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only show on mobile
    if (window.innerWidth > 768) return;

    // Check if already dismissed this session
    if (sessionStorage.getItem('focsera_sticky_dismissed') === '1') {
      setDismissed(true);
      return;
    }

    const onScroll = () => {
      // Show after scrolling past 600px (past hero)
      setVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('focsera_sticky_dismissed', '1');
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden animate-fade-in-up">
      <div className="bg-white/95 backdrop-blur-lg border-t border-focsera-border shadow-elevated px-4 py-3 flex items-center gap-3">
        {/* Dismiss */}
        <button
          onClick={handleDismiss}
          className="p-1.5 rounded-lg text-focsera-muted hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>

        {/* Book on App */}
        <a
          href="https://play.google.com/store/apps/details?id=com.focsera.focsera"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 bg-focsera-primary text-white text-sm font-bold rounded-lg text-center flex items-center justify-center gap-2 shadow-cta"
          onClick={() => trackAppCtaClick('mobile_sticky', 'play_store')}
        >
          <Smartphone size={16} />
          <span>Book on Focsera App</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
