import ServicePage from '../../components/ServicePage';
import type { ServicePageData } from '../../components/ServicePage';
import {
  Globe, Smartphone, Search, Palette, Code2, Server,
  ShieldCheck, Zap, HeartHandshake, Users, Layers, Headphones
} from 'lucide-react';
import videoBg from '../../components/WhatsApp Video 2026-06-05 at 8.01.38 PM.mp4';

const webData: ServicePageData = {
  heroTag: 'Focsera Grow',
  heroTitle: 'Build your digital presence.',
  heroSubtitle: 'Custom websites, mobile apps, SEO optimization, and complete digital solutions to help your business grow and scale online.',
  heroIcon: Globe,
  heroVideoPath: videoBg,

  services: [
    {
      icon: Globe,
      title: 'Website Development',
      description: 'High-converting responsive websites built with modern technologies. E-commerce, portfolios, landing pages, and business websites.',
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications for Android and iOS. Custom UI/UX, backend integration, and Play Store deployment.',
    },
    {
      icon: Palette,
      title: 'Logo & Brand Identity',
      description: 'Professional logo design, brand guidelines, color palettes, typography systems, and complete brand identity kits.',
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Search engine optimization with keyword research, on-page SEO, technical audits, and Google Business profile setup.',
    },
    {
      icon: Code2,
      title: 'Custom Software',
      description: 'Tailored software solutions — CRM systems, inventory management, booking platforms, and workflow automation tools.',
    },
    {
      icon: Server,
      title: 'Hosting & Maintenance',
      description: 'Domain registration, cloud hosting setup, SSL certificates, and ongoing maintenance with performance monitoring.',
    },
  ],

  packageCategories: [
    {
      title: 'Website Packages',
      packages: [
        {
          name: 'Starter Site',
          timeline: '5-7 Days',
          whatsIncluded: [
            'Static website (1-3 pages)',
            'WhatsApp chat integration',
            'Domain registration (1 year)',
            '1 year support & maintenance',
            'Basic layout and style setup',
          ],
        },
        {
          name: 'Business Site',
          timeline: '10-14 Days',
          whatsIncluded: [
            'Starter Site + additional pages',
            'About, Services, Gallery, Contact pages',
            'On-page SEO optimization setup',
            'Google Search Console indexing',
            'Domain registration & support',
          ],
          isPopular: true,
        },
        {
          name: 'Dynamic Site',
          timeline: '2-3 Weeks',
          whatsIncluded: [
            'Everything in Business Site',
            'Database integration & setup',
            'User authentication (login/signup)',
            'Admin dashboard control panel',
            'Dynamic content management tool',
          ],
        },
        {
          name: 'E-Commerce Site',
          timeline: '3-4 Weeks',
          whatsIncluded: [
            'Full online store setup',
            'Product catalog & inventory display',
            'Shopping cart & checkout flow',
            'Payment gateway (Razorpay/Stripe)',
            'Order management admin panel',
          ],
        },
      ],
    },
    {
      title: 'App Packages',
      packages: [
        {
          name: 'Basic App',
          timeline: '2-3 Weeks',
          whatsIncluded: [
            'Single platform (Android or iOS)',
            'Up to 5 screens',
            'Static / informational content',
            'No backend requirement',
            'App store listing setup',
          ],
        },
        {
          name: 'Standard App',
          timeline: '4-6 Weeks',
          whatsIncluded: [
            'Cross-platform (Android + iOS)',
            'Up to 10 screens',
            'Backend & database integration',
            'Web admin panel',
            'Push notifications system',
          ],
          isPopular: true,
        },
        {
          name: 'Advanced App',
          timeline: '6-8 Weeks',
          whatsIncluded: [
            'Everything in Standard App',
            'User authentication (login/signup)',
            'Payment gateway integration',
            'Real-time features (chat/updates)',
          ],
        },
        {
          name: 'Enterprise App',
          timeline: '10-12 Weeks',
          whatsIncluded: [
            'Everything in Advanced App',
            'Third-party API integrations',
            'Analytics dashboard panel',
            'Multi-role admin panel',
            'Scalable cloud architecture',
          ],
        },
      ],
    },
  ],

  addons: [
    { name: 'Extra Pages', description: 'Per additional page/screen beyond standard scope' },
    { name: 'Monthly Maintenance', description: 'SSL setup, domain renewal help, minor text edits, server monitoring' },
    { name: 'Google Maps & API integration', description: 'Dynamic map setup, custom contact forms, custom charts' },
    { name: 'On-Page SEO Optimization', description: 'Keyword configuration, meta tags descriptions, site speed tuning' },
    { name: 'Payment Gateway Setup', description: 'Razorpay / Stripe / PayU checkout setup' },
    { name: 'Admin Dashboard CMS', description: 'Dynamic control panel to manage content and upload products' },
  ],

  processSteps: [
    { number: '01', title: 'Share Requirements', description: 'Tell us about your business and what you need built.' },
    { number: '02', title: 'Get a Proposal', description: 'Receive wireframes, tech stack recommendation, and transparent quote.' },
    { number: '03', title: 'Development Sprint', description: 'Our team builds your product with regular progress updates.' },
    { number: '04', title: 'Launch & Support', description: 'We deploy, test, and provide ongoing support post-launch.' },
  ],

  trustPoints: [
    { icon: ShieldCheck, title: 'Verified Developers', description: 'Experienced, vetted developers with proven portfolios and client reviews.' },
    { icon: Zap, title: 'Fast Delivery', description: 'Agile development with quick turnarounds. Most projects delivered in 2-6 weeks.' },
    { icon: HeartHandshake, title: 'Transparent Pricing', description: 'Detailed quotations with milestone-based payments. No surprises.' },
    { icon: Users, title: 'Dedicated Manager', description: 'A project manager coordinates everything from design to deployment.' },
    { icon: Layers, title: 'Full Stack', description: 'Frontend, backend, database, hosting, and deployment — all handled by us.' },
    { icon: Headphones, title: 'Post-Launch Support', description: 'Bug fixes, updates, and maintenance support after your product goes live.' },
  ],

  ctaTitle: 'Ready to build your custom website?',
  ctaDescription: 'Share your project idea and get a detailed proposal with timeline and transparent pricing within 48 hours.',
  pdfPath: '/images/Web_Development_Packages.pdf',
  pdfLabel: 'Download Web Brochure',
  whatsappMessage: 'Hi Focsera! I need a website built for my business. Can you share more details about your Web Development packages?',
};

export default function Web() {
  return <ServicePage data={webData} />;
}
