// src/lib/seoAnalytics.ts
// Lightweight analytics event dispatcher for SEO landing pages

type EventName =
  | 'app_cta_click'
  | 'book_now_click'
  | 'whatsapp_click'
  | 'provider_profile_click'
  | 'category_click'
  | 'location_click'
  | 'faq_open'
  | 'scroll_depth';

interface AnalyticsEvent {
  event: EventName;
  properties: Record<string, string | number>;
}

function dispatch(evt: AnalyticsEvent) {
  // Google Analytics 4 (gtag) integration
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', evt.event, evt.properties);
  }

  // Custom event for any other listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('focsera_analytics', { detail: evt }));
  }
}

export function trackAppCtaClick(location: string, source: string) {
  dispatch({
    event: 'app_cta_click',
    properties: { location, source, timestamp: Date.now() },
  });
}

export function trackBookNowClick(service: string, slug: string) {
  dispatch({
    event: 'book_now_click',
    properties: { service, slug, timestamp: Date.now() },
  });
}

export function trackWhatsAppClick(service: string) {
  dispatch({
    event: 'whatsapp_click',
    properties: { service, timestamp: Date.now() },
  });
}

export function trackProviderClick(providerId: string, providerName: string) {
  dispatch({
    event: 'provider_profile_click',
    properties: { providerId, providerName, timestamp: Date.now() },
  });
}

export function trackCategoryClick(category: string) {
  dispatch({
    event: 'category_click',
    properties: { category, timestamp: Date.now() },
  });
}

export function trackLocationClick(location: string) {
  dispatch({
    event: 'location_click',
    properties: { location, timestamp: Date.now() },
  });
}

export function trackFaqOpen(question: string, slug: string) {
  dispatch({
    event: 'faq_open',
    properties: { question: question.slice(0, 100), slug, timestamp: Date.now() },
  });
}

export function trackScrollDepth(percentage: number, slug: string) {
  dispatch({
    event: 'scroll_depth',
    properties: { percentage, slug, timestamp: Date.now() },
  });
}
