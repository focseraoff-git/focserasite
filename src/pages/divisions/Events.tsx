import ServicePage from '../../components/ServicePage';
import type { ServicePageData } from '../../components/ServicePage';
import {
  PartyPopper, Camera, Music, Mic2, UtensilsCrossed, Palette,
  ShieldCheck, Users, Clock, HeartHandshake, Star, Headphones
} from 'lucide-react';
import videoBg from '../../assets/yoshnareel.mp4';

const eventsData: ServicePageData = {
  heroTag: 'Focsera Celebrate',
  heroTitle: 'Make every milestone unforgettable.',
  heroSubtitle: 'From intimate birthdays to grand weddings and corporate galas — we plan, manage, and execute every detail so you can enjoy the moment.',
  heroIcon: PartyPopper,
  heroVideoPath: videoBg,

  services: [
    {
      icon: PartyPopper,
      title: 'Birthday Celebrations',
      description: 'Thematic decorations, balloon arrangements, lighting setups, and complete birthday event management for all ages.',
    },
    {
      icon: Camera,
      title: 'Event Photography & Videography',
      description: 'Cinematic event coverage with professional photographers and videographers. Edited albums and highlight reels delivered.',
    },
    {
      icon: Music,
      title: 'DJ & Sound Setup',
      description: 'Professional DJ services with high-quality sound systems, lighting rigs, and playlist customization for your event.',
    },
    {
      icon: Mic2,
      title: 'MC & Hosting',
      description: 'Experienced emcees to host your event, manage the flow, engage guests, and ensure every moment is memorable.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Catering Coordination',
      description: 'We coordinate with trusted catering partners to arrange menus, setup, and service for events of any scale.',
    },
    {
      icon: Palette,
      title: 'Custom Decorations',
      description: 'Bespoke event decoration — themed setups, floral arrangements, stage design, entrance arches, and photo booths.',
    },
  ],

  packages: [
    {
      name: 'Sweet Beginnings',
      guests: 'Up to 50 Guests',
      whatsIncluded: [
        'Balloon backdrop decor',
        'Catering coordination for all guests',
        'Basic setup & management',
      ],
    },
    {
      name: 'Classic Celebration',
      guests: 'Up to 70 Guests',
      whatsIncluded: [
        'Themed backdrop decor',
        '2 edited reels (3-hr coverage)',
        'Catering coordination for all guests',
        'Standard event flow management',
      ],
      isPopular: true,
    },
    {
      name: 'Premium Party',
      guests: 'Up to 100 Guests',
      whatsIncluded: [
        'Themed backdrop decor',
        'Sparkle entry for the star',
        'Photography & Reels (4 hrs - edited)',
        'Catering coordination for all guests',
        'Full event execution support',
      ],
    },
    {
      name: 'Grand Celebration',
      guests: 'Up to 100 Guests',
      whatsIncluded: [
        'Premium themed decor',
        'Grand entry arrangement',
        'Photography & Reels (4 hrs - edited)',
        'Catering coordination for all guests',
        'End-to-end event coordinator',
      ],
    },
    {
      name: 'Magic Moments',
      guests: 'Up to 150 Guests',
      whatsIncluded: [
        'Themed backdrop decor',
        'Live magician show performance',
        'Photography & Reels (3 hrs - edited)',
        'Catering coordination for all guests',
        'Full event management',
      ],
    },
    {
      name: 'Entertainment Zone Bundle',
      guests: 'Any Crowd Size',
      whatsIncluded: [
        'Fog entry + Caricature artist',
        'Live magician + Tattoo artist',
        'Live music + Chocolate fountain',
        'Cartoon mascot + Popcorn stall',
        'Face painting + Pottery station',
      ],
    },
  ],

  addons: [
    { name: 'Balloon Decor', description: 'Basic birthday balloon backdrop' },
    { name: 'Themed Backdrop Decor', description: 'Custom themed backdrop' },
    { name: 'Premium Themed Decor', description: 'Elaborate premium themed setup' },
    { name: 'Sparkle Entry', description: 'Special sparkle entry for the birthday star' },
    { name: 'Fog / Grand Entry', description: 'Fog machine or grand entry arrangement' },
    { name: 'Photography Only', description: 'Edited photos, 3-4 hrs coverage' },
    { name: 'Photography & Videography', description: 'Edited photos + video, 4 hrs coverage' },
    { name: 'Event Reels', description: '2 edited reels, 3-hr coverage' },
    { name: 'Magician', description: 'Live magic show performance' },
    { name: 'Caricature Artist', description: 'Live caricature drawing for guests' },
    { name: 'Tattoo Artist', description: 'Temporary tattoo art station' },
    { name: 'Live Music', description: 'Live music performance' },
    { name: 'Chocolate Fountain', description: 'Chocolate fountain station with dippers' },
    { name: 'Cartoon Mascot', description: 'Cartoon mascot character appearance' },
    { name: 'Popcorn Stall', description: 'Stall attendant + 100 packets' },
    { name: 'Face Painting', description: 'For 25-30 guests' },
    { name: 'Pottery Station', description: 'Approx. 20-25 pottery models created' },
  ],

  processSteps: [
    { number: '01', title: 'Share Your Vision', description: 'Tell us about your event — type, date, budget, and preferences.' },
    { number: '02', title: 'Get a Custom Plan', description: 'Receive a tailored event plan with transparent quotation.' },
    { number: '03', title: 'We Execute Everything', description: 'Our team manages vendors, logistics, and setup on event day.' },
    { number: '04', title: 'Enjoy Your Event', description: 'Relax and celebrate while Focsera handles every detail.' },
  ],

  trustPoints: [
    { icon: ShieldCheck, title: 'Verified Vendors', description: 'Every decorator, photographer, and vendor is vetted and reviewed.' },
    { icon: Users, title: 'Dedicated Coordinator', description: 'A personal event coordinator manages your entire project end-to-end.' },
    { icon: Clock, title: 'On-Time Execution', description: 'Strict timelines with setup completion well before your event begins.' },
    { icon: HeartHandshake, title: 'Transparent Pricing', description: 'Detailed quotations with no hidden charges. You know exactly what you pay for.' },
    { icon: Star, title: 'Premium Quality', description: 'High-quality materials, professional equipment, and experienced teams.' },
    { icon: Headphones, title: '24/7 Support', description: 'Reach us anytime before, during, and after your event.' },
  ],

  ctaTitle: 'Ready to plan your celebration?',
  ctaDescription: 'Share your event details and get a personalized quotation within 24 hours. No commitments, no hidden costs.',
  pdfPath: '/images/Focsera_Events_Birthday_Packages (1).pdf',
  pdfLabel: 'Download Events Brochure',
  whatsappMessage: 'Hi Focsera! I\'d like to plan an event. Can you share more details about your celebration packages?',
};

export default function Events() {
  return <ServicePage data={eventsData} />;
}
