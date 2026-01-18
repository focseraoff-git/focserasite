import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Rocket, Camera, Utensils, GraduationCap } from 'lucide-react';

const slides = [
    {
        id: 'fuel-up',
        title: 'Fuel-Up Kit',
        subtitle: 'Launch Your Professional Identity',
        description: 'The ultimate starter kit for new businesses. Visiting cards, branding, and a website starting at ₹1,999.',
        bgClass: 'bg-gradient-to-br from-blue-900 via-black to-cyan-900',
        accentColor: 'text-cyan-400',
        buttonColor: 'bg-cyan-500 hover:bg-cyan-400',
        icon: Rocket,
        link: '/web#fuel-up-kit'
    },
    {
        id: 'elevate',
        title: 'Elevate Digital Presence',
        subtitle: 'Premium Website Offer',
        description: 'Unlock a cinematic, high-performance website for just ₹999. Limited time Sankranthi offer.',
        bgClass: 'bg-gradient-to-br from-orange-900 via-black to-red-900',
        accentColor: 'text-orange-400',
        buttonColor: 'bg-orange-500 hover:bg-orange-400',
        icon: Sparkles,
        link: '/web#sankranthi-offer'
    },
    {
        id: 'creator-boost',
        title: 'Creator Boost',
        subtitle: 'Amplify Your Reach',
        description: 'Professional media production and strategy to skyrocket your engagement. Let\'s create something viral.',
        bgClass: 'bg-gradient-to-br from-purple-900 via-black to-pink-900',
        accentColor: 'text-pink-400',
        buttonColor: 'bg-pink-500 hover:bg-pink-400',
        icon: Camera,
        link: '/media'
    },
    {
        id: 'dine-qr',
        title: 'Restaurant DineQR',
        subtitle: 'Smart Dining Revolution',
        description: 'Seamless QR ordering, kitchen management, and waiter systems. Modernize your restaurant today.',
        bgClass: 'bg-gradient-to-br from-green-900 via-black to-emerald-900',
        accentColor: 'text-green-400',
        buttonColor: 'bg-green-500 hover:bg-green-400',
        icon: Utensils,
        link: '/product-services'
    },
    {
        id: 'skill-verse',
        title: 'Skill Verse',
        subtitle: 'Future-Ready Learning',
        description: 'Master in-demand creative and digital skills. Join a community of learners and distinct creators.',
        bgClass: 'bg-gradient-to-br from-indigo-900 via-black to-blue-900',
        accentColor: 'text-indigo-400',
        buttonColor: 'bg-indigo-500 hover:bg-indigo-400',
        icon: GraduationCap,
        link: '/divisions/skill/dashboard'
    }
];

export default function HomeCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const handleLink = (link: string) => {
        if (link.includes('#')) {
            const [path, hash] = link.split('#');
            navigate(path);
            // Small timeout to allow navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            navigate(link);
        }
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative h-[500px] sm:h-[600px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl group">

                {/* Slides */}
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Background Poster */}
                        <div className={`absolute inset-0 ${slide.bgClass}`}>
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                            {/* Abstract Glows */}
                            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 ${slide.accentColor.replace('text-', 'bg-')}`}></div>
                            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-white`}></div>
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 sm:px-16 md:px-24 max-w-4xl">

                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 ${slide.accentColor} font-bold text-sm mb-6 backdrop-blur-md animate-fade-in-up`}>
                                <slide.icon size={16} /> {slide.title}
                            </div>

                            <h2 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight leading-none animate-fade-in-up delay-100">
                                {slide.subtitle}
                            </h2>

                            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
                                {slide.description}
                            </p>

                            <button
                                onClick={() => handleLink(slide.link)}
                                className={`px-8 py-4 ${slide.buttonColor} text-white rounded-xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-lg animate-fade-in-up delay-300`}
                            >
                                Explore Now <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Controls */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 z-20 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 z-20 transition-all opacity-0 group-hover:opacity-100"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => { setCurrent(idx); setIsAutoPlaying(false); }}
                            className={`h-1 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
