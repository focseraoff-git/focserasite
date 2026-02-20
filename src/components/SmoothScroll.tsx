import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisOptions = {
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: false, // Keep native touch feeling but smooth
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children}
        </ReactLenis>
    );
}
