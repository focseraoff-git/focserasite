import ServicePage from '../../components/ServicePage';
import type { ServicePageData } from '../../components/ServicePage';
import {
  Megaphone, TrendingUp, PenTool, BarChart3, Share2, Target,
  ShieldCheck, Zap, Users, Star, LineChart, Headphones
} from 'lucide-react';

const marketingData: ServicePageData = {
  heroTag: 'Focsera Market',
  heroTitle: 'Grow your brand, amplify your reach.',
  heroSubtitle: 'Strategic digital marketing, social media management, Google Ads, content creation, and brand campaigns that drive real results.',
  heroIcon: Megaphone,

  services: [
    {
      icon: Share2,
      title: 'Social Media Management',
      description: 'Complete social media handling — content planning, posting schedules, engagement management, and analytics across all platforms.',
    },
    {
      icon: Target,
      title: 'Google & Meta Ads',
      description: 'Performance-driven ad campaigns on Google, Facebook, and Instagram with A/B testing, audience targeting, and ROI tracking.',
    },
    {
      icon: PenTool,
      title: 'Content Creation',
      description: 'Engaging posts, stories, carousels, blog articles, and video content tailored to your brand voice and audience.',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Growth',
      description: 'Search engine optimization, keyword strategy, backlink building, and organic growth tactics for sustained visibility.',
    },
    {
      icon: BarChart3,
      title: 'Brand Strategy',
      description: 'Market research, competitive analysis, brand positioning, and go-to-market strategy for new and existing brands.',
    },
    {
      icon: Megaphone,
      title: 'Influencer Marketing',
      description: 'Connect with relevant influencers for product launches, brand awareness campaigns, and authentic audience engagement.',
    },
  ],

  packages: [
    {
      name: 'Digital Marketing Package',
      timeline: 'Monthly Retainer',
      subtitle: 'Build strong digital presence',
      whatsIncluded: [
        'Logo & Brand Identity (Custom logo, brand colors, font guide)',
        'Responsive Website (up to 6 pages with basic SEO)',
        '6 short-form Reels/month (shoot, edit, captions, trending audio)',
        'Meta Ads Management (campaign setup, targeting, weekly optimization)',
      ],
    },
    {
      name: 'Offline Marketing Bundle',
      timeline: 'One-Time Setup',
      subtitle: 'Premium on-ground and print presence',
      whatsIncluded: [
        '500 pcs Premium Double-Sided Business Cards',
        '1,000 pcs A5 Full-Colour Double-Sided Flyers',
        '2 units Roll-Up Standees (85 x 200 cm, print + stands)',
        '100 sets Branded Merchandise (pens, notepads, tote bags)',
        '500 pcs Tri-Fold Premium Product Brochures',
        '500 sets Branded Letterheads & Envelopes',
        '50 pcs A2 Full-Colour Posters',
      ],
      isPopular: true,
    },
    {
      name: 'Complete Brand Package (Digital + Offline)',
      timeline: 'Complete Package',
      subtitle: 'The full omni-channel setup',
      whatsIncluded: [
        'Full Digital Marketing Setup & Retainer',
        'Full Offline Print, Design & Merchandise Bundle',
        'All design assets and source files delivered',
        'Discounted bundle pricing model',
      ],
    },
  ],

  processSteps: [
    { number: '01', title: 'Brand Audit', description: 'We analyze your current brand, competitors, and market positioning.' },
    { number: '02', title: 'Strategy Design', description: 'Receive a custom marketing strategy with channel recommendations.' },
    { number: '03', title: 'Campaign Execution', description: 'Our team creates content, runs ads, and manages your channels.' },
    { number: '04', title: 'Report & Optimize', description: 'Monthly reports with insights, optimizations, and growth recommendations.' },
  ],

  trustPoints: [
    { icon: ShieldCheck, title: 'Certified Marketers', description: 'Google and Meta certified professionals managing your campaigns.' },
    { icon: Zap, title: 'Results-Driven', description: 'Data-backed strategies focused on conversions, not just impressions.' },
    { icon: Users, title: 'Dedicated Team', description: 'A dedicated marketing manager and content creator for your brand.' },
    { icon: Star, title: 'Premium Content', description: 'High-quality visuals, copy, and creatives that match premium brands.' },
    { icon: LineChart, title: 'Transparent Reports', description: 'Monthly performance reports with clear metrics and actionable insights.' },
    { icon: Headphones, title: 'Always Available', description: 'Direct communication with your marketing team via WhatsApp and calls.' },
  ],

  ctaTitle: 'Ready to grow your brand?',
  ctaDescription: 'Get a free brand audit and custom marketing proposal. No commitments — just actionable insights for your growth.',
  pdfPath: '/images/Marketing_Packages_Proposal.pdf',
  pdfLabel: 'Download Marketing Brochure',
  whatsappMessage: 'Hi Focsera! I\'m interested in your marketing services. Can you share more details about your packages?',
};

export default function Marketing() {
  return <ServicePage data={marketingData} />;
}
