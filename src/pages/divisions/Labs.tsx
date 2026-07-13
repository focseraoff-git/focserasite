import ServicePage from '../../components/ServicePage';
import type { ServicePageData } from '../../components/ServicePage';
import {
  GraduationCap, Bot, Cpu, Lightbulb, Presentation, Wrench,
  ShieldCheck, Star, Users, Award, BookOpen, Headphones
} from 'lucide-react';
import videoBg from '../../components/PROMPTXfinale.mp4';

const labsData: ServicePageData = {
  heroTag: 'Focsera Learn',
  heroTitle: 'Future-ready education programs.',
  heroSubtitle: 'AI workshops, InnovateX skill labs, STEM programs, and technology training designed for schools, colleges, and institutions.',
  heroIcon: GraduationCap,
  heroVideoPath: videoBg,

  services: [
    {
      icon: Bot,
      title: 'AI & Machine Learning Workshops',
      description: 'Hands-on workshops covering AI fundamentals, prompt engineering, ChatGPT integration, and real-world AI applications.',
    },
    {
      icon: Cpu,
      title: 'InnovateX Skill Labs',
      description: 'Complete lab setup with hardware, curriculum, and trained instructors for robotics, IoT, 3D printing, and coding.',
    },
    {
      icon: Lightbulb,
      title: 'STEM Education Programs',
      description: 'Science, Technology, Engineering, and Math programs designed for K-12 with project-based learning methodologies.',
    },
    {
      icon: Presentation,
      title: 'Teacher Training',
      description: 'Faculty development programs on emerging technologies, EdTech tools, and modern pedagogical approaches.',
    },
    {
      icon: Wrench,
      title: 'Lab Infrastructure Setup',
      description: 'End-to-end lab setup: hardware procurement, software installation, network configuration, and lab management systems.',
    },
    {
      icon: BookOpen,
      title: 'Curriculum Design',
      description: 'Custom curriculum development aligned with NEP 2020, CBSE, and state board requirements for technology education.',
    },
  ],

  packages: [
    {
      name: 'PromptX AI Workshop',
      timeline: '1-Day Program',
      subtitle: 'For Classes 6–10',
      whatsIncluded: [
        'Session 1: Discovering the World of AI',
        'Session 2: Hands-On Prompt Engineering',
        'Ethical & safe AI use training',
        'AI tools for presentation/schoolwork',
        'Study materials & certificates for all',
      ],
    },
    {
      name: 'InnovateX Summit',
      timeline: '3-Day Flagship',
      subtitle: 'High School Summit',
      whatsIncluded: [
        'IPL Auction: Strategy & financial literacy',
        'Brand Battles: Campaign & logo design pitches',
        'Young Innovators: Presentation of solutions',
        'Echoes: Mentorship and counseling sessions',
        'Cash prizes, goodies & participation certificates',
      ],
      isPopular: true,
    },
    {
      name: 'Focsera Labs Year-Long',
      timeline: '60 Sessions / Year',
      subtitle: 'Classes 6–12 Saturday program',
      whatsIncluded: [
        'Track 1: Creative Exploration (Canva, Photography)',
        'Track 2: Skill Development (CapCut, Figma UI/UX)',
        'Track 3: Career Launch (DaVinci, Freelancing)',
        'Output-based portfolio evaluation, no exams',
        'Three distinct grade-level age groups',
      ],
    },
    {
      name: 'Basic Starter Subscription',
      timeline: 'Short Trial Pilot',
      subtitle: 'For schools looking to test',
      whatsIncluded: [
        'Trained expert trainer + Content curriculum',
        'Event posters & offline marketing setup',
        'Session-wise digital certificates',
      ],
    },
    {
      name: 'Standard Skill Subscription',
      timeline: 'Full Academic Year',
      subtitle: 'Complete skills experience',
      whatsIncluded: [
        'Everything in Basic Starter package',
        'Professional event photography coverage',
        'Social media reels & promotion content',
        'Gamified badges & school competitions',
      ],
    },
    {
      name: 'Premium Innovation Plan',
      timeline: 'Annual Partnership',
      subtitle: 'Maximum brand impact for schools',
      whatsIncluded: [
        'Everything in Standard Skill package',
        'Professional cinematic videography coverage',
        'Annual showcase event and project exhibition',
        'Free custom physical school corridor branding kit',
      ],
    },
  ],

  processSteps: [
    { number: '01', title: 'School Assessment', description: 'We assess your institution\'s needs, infrastructure, and goals.' },
    { number: '02', title: 'Custom Proposal', description: 'Receive a tailored program proposal with timeline and scope.' },
    { number: '03', title: 'Setup & Training', description: 'We install labs, train teachers, and launch the programs.' },
    { number: '04', title: 'Ongoing Support', description: 'Continuous support, content updates, and performance tracking.' },
  ],

  trustPoints: [
    { icon: ShieldCheck, title: 'Verified Trainers', description: 'Industry experts and certified educators deliver every session.' },
    { icon: Star, title: 'Proven Results', description: 'Programs running in multiple schools with measurable student outcomes.' },
    { icon: Users, title: 'Student Engagement', description: 'Hands-on, project-based learning that keeps students excited and involved.' },
    { icon: Award, title: 'NEP Aligned', description: 'Curriculum designed to align with National Education Policy 2020 guidelines.' },
    { icon: BookOpen, title: 'Complete Package', description: 'Hardware, software, curriculum, training, and support — all in one solution.' },
    { icon: Headphones, title: 'Dedicated Support', description: 'A dedicated education coordinator for your institution year-round.' },
  ],

  ctaTitle: 'Ready to transform your school?',
  ctaDescription: 'Get a customized education program proposal for your institution. Includes AI workshops, lab setup, and teacher training.',
  pdfPath: '/images/Focsera_School_Pitch.pdf',
  pdfLabel: 'Download School Pitch',
  whatsappMessage: 'Hi Focsera! I\'m from a school/institution and interested in your AI workshops and lab programs. Can you share more details?',
};

export default function Labs() {
  return <ServicePage data={labsData} />;
}
