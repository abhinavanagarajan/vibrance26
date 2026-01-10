import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import CustomCursor from './CustomCursor';
import Navbar from './Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
        });

        lenisRef.current = lenis;

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        const update = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <div className="layout-wrapper">
            {/* <CustomCursor /> */}
            <Navbar />
            {children}
        </div>
    );
};

export default Layout;
