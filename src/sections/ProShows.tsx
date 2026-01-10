import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ShowData {
    day: string;
    artist: string;
    genre: string;
    color: string;
}

const showList: ShowData[] = [
    { day: "Day 1", artist: "RITVIZ", genre: "Indie Pop / Electronic", color: "#00f3ff" },
    { day: "Day 2", artist: "NUCLEYA", genre: "Bass Raja", color: "#ff0055" },
    { day: "Day 3", artist: "SALIM-SULAIMAN", genre: "Bollywood Symphony", color: "#bc13fe" },
    { day: "Day 4", artist: "ALAN WALKER", genre: "International Headliner", color: "#ffffff" },
];

const ProShows: React.FC = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const bgRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>('.show-slide');
        const bg = bgRef.current;
        const totalSlides = sections.length;

        // Set initial state
        gsap.set(sections, { autoAlpha: 0, y: 50 });
        gsap.set(sections[0], { autoAlpha: 1, y: 0 });
        if (bg) gsap.set(bg, { backgroundColor: showList[0].color, opacity: 0.1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${totalSlides * 100}%`,
                pin: true,
                scrub: 1,
            }
        });

        sections.forEach((section, i) => {
            if (i === sections.length - 1) return; // No transition after last slide

            const nextSection = sections[i + 1];
            const nextColor = showList[i + 1].color;

            // Step 1: Current Slide Out
            tl.to(section, {
                autoAlpha: 0,
                y: -50,
                duration: 1,
                ease: "power2.inOut"
            })

                // Step 2: Background Change (happens during the transition)
                .to(bg, {
                    backgroundColor: nextColor,
                    duration: 1,
                    ease: "power1.inOut"
                }, "<0.5") // Start halfway through fade out

                // Step 3: Next Slide In
                .to(nextSection, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }, ">-0.5"); // Overlap slightly with background change, but mostly after prev is gone
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="proshows" style={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Dynamic Background */}
            <div ref={bgRef} className="proshows-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at center, transparent 0%, #0a0a0a 90%)' }}></div>
            </div>

            {/* Slides */}
            <div className="slides-container" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
                {showList.map((show, index) => (
                    <div key={index} className="show-slide" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>

                        <div className="slide-content" style={{ position: 'relative', textAlign: 'center' }}>
                            {/* Giant Background Text */}
                            <h1 style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '20vw',
                                fontFamily: 'var(--font-display)',
                                color: 'transparent',
                                WebkitTextStroke: `2px ${show.color}`,
                                opacity: 0.1,
                                whiteSpace: 'nowrap',
                                zIndex: -1
                            }}>
                                {show.day}
                            </h1>

                            <h3 style={{ color: show.color, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.5rem', marginBottom: '1rem' }}>{show.day}</h3>
                            <h2 style={{ fontSize: '8vw', fontFamily: 'var(--font-display)', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '2rem' }}>
                                {show.artist}
                            </h2>
                            <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-main)', opacity: 0.8, letterSpacing: '0.1rem' }}>
                                {show.genre}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="scroll-hint" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}>
                Scroll for Lineup
            </div>
        </section>
    );
};

export default ProShows;
