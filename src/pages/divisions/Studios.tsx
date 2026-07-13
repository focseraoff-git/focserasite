import ServicePage from '../../components/ServicePage';
import type { ServicePageData } from '../../components/ServicePage';
import {
  Camera, Film, Image, Clapperboard, Aperture, MonitorPlay,
  ShieldCheck, Star, Clock, Users, Sparkles, Headphones
} from 'lucide-react';
import videoBg from '../../components/IMG_3286.MOV';

const studiosData: ServicePageData = {
  heroTag: 'Focsera Create',
  heroTitle: 'Visual stories that captivate.',
  heroSubtitle: 'Professional photography, cinematic videography, content creation, and studio services. From product shoots to brand campaigns.',
  heroIcon: Camera,
  heroVideoPath: videoBg,

  services: [
    {
      icon: Camera,
      title: 'Product Photography',
      description: 'High-quality product shoots with professional lighting, styling, and post-production for e-commerce and catalogs.',
    },
    {
      icon: Aperture,
      title: 'Portrait & Headshots',
      description: 'Professional portraits, corporate headshots, and personal branding photography with studio or outdoor setups.',
    },
    {
      icon: Film,
      title: 'Event Videography',
      description: 'Cinematic event coverage with multi-camera setups, drone footage, and professionally edited highlight films.',
    },
    {
      icon: Clapperboard,
      title: 'Reels & Short-form Content',
      description: 'Trending social media reels, short videos, and promotional clips optimized for Instagram, YouTube Shorts, and TikTok.',
    },
    {
      icon: Image,
      title: 'Photo Editing & Retouching',
      description: 'Professional color grading, retouching, background removal, and batch editing for commercial-grade output.',
    },
    {
      icon: MonitorPlay,
      title: 'Video Editing & Post-Production',
      description: 'Full post-production: color correction, sound design, motion graphics, subtitles, and format optimization.',
    },
  ],

  packages: [
    {
      name: 'Quick Photo Shoot',
      timeline: '1 Hour Session',
      whatsIncluded: [
        'All raw photos delivered',
        '20-30 professionally edited images',
        'Single setup/location',
      ],
    },
    {
      name: 'Standard Photo Shoot',
      timeline: '3 Hours Session',
      whatsIncluded: [
        'All raw photos delivered',
        '40-50 professionally edited images',
        'Multiple setups/looks',
      ],
      isPopular: true,
    },
    {
      name: 'Half-Day Photo Shoot',
      timeline: '6 Hours Session',
      whatsIncluded: [
        'All raw photos delivered',
        '60-90 professionally edited images',
        'Full creative styling support',
      ],
    },
    {
      name: 'Full-Day Photo Shoot',
      timeline: '8 Hours Session',
      whatsIncluded: [
        'All raw photos delivered',
        '90-120 professionally edited images',
        'Dedicated photographer team',
      ],
    },
    {
      name: 'Starter Reel Package',
      timeline: '3 Hours Session',
      whatsIncluded: [
        'Raw video clips delivered',
        '2 professionally edited reels',
        'Captions, editing, and trending music included',
      ],
    },
    {
      name: 'Double Reel Package',
      timeline: '6 Hours Session',
      whatsIncluded: [
        'Raw video clips delivered',
        '4 professionally edited reels',
        'Full post-production support',
      ],
    },
    {
      name: 'Content Bundle',
      timeline: '6 Hours Combo',
      whatsIncluded: [
        '3 Hours Photography + 3 Hours Reels',
        'Raw photos + 40-50 edited photos',
        'Raw clips + 2 edited reels',
      ],
    },
    {
      name: 'Creator Day',
      timeline: '10 Hours Combo',
      whatsIncluded: [
        '6 Hours Photography + 4 Hours Reels',
        'Raw photos + 60-90 edited photos',
        'Raw clips + 3 edited reels',
      ],
    },
    {
      name: 'Ultimate Studio Day',
      timeline: '14 Hours Combo',
      whatsIncluded: [
        '8 Hours Photography + 6 Hours Reels',
        'Full-day shoot coverage',
        'Raw photos/clips + 4 edited reels',
      ],
    },
  ],

  processSteps: [
    { number: '01', title: 'Brief & Concept', description: 'Share your creative brief — style, purpose, and references.' },
    { number: '02', title: 'Planning & Scheduling', description: 'We plan the shoot: location, props, models, and timeline.' },
    { number: '03', title: 'Shoot Day', description: 'Our creative team executes the shoot with professional equipment.' },
    { number: '04', title: 'Deliver Finals', description: 'Edited, color-graded deliverables within agreed timelines.' },
  ],

  trustPoints: [
    { icon: ShieldCheck, title: 'Verified Creatives', description: 'Every photographer and editor is vetted with portfolio review.' },
    { icon: Star, title: 'Premium Equipment', description: 'Industry-standard cameras, lighting, drones, and editing suites.' },
    { icon: Clock, title: 'Fast Turnaround', description: 'Quick delivery with rush options available for urgent projects.' },
    { icon: Users, title: 'Creative Direction', description: 'A creative director ensures your vision is perfectly captured.' },
    { icon: Sparkles, title: 'Commercial Grade', description: 'Output ready for print, web, social media, and advertising.' },
    { icon: Headphones, title: 'Revision Support', description: 'Unlimited revisions until you are 100% satisfied with the output.' },
  ],

  ctaTitle: 'Ready to create stunning visuals?',
  ctaDescription: 'Share your creative brief and get a tailored quotation for your photography or videography project.',
  pdfPath: '/images/Focsera_Studios_Packages.pdf',
  pdfLabel: 'Download Studios Brochure',
  whatsappMessage: 'Hi Focsera! I\'m interested in your photography/videography services. Can you share more details?',
};

export default function Studios() {
  return <ServicePage data={studiosData} />;
}
