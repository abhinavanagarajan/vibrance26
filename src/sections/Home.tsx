import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Home = () => {
    const containerRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
        )
            .fromTo(subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=1"
            );

    }, []);

    return (
        <section ref={containerRef} id="home" className="section-home" style={{ height: '100vh', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="home-content" style={{ zIndex: 10, textAlign: 'center', mixBlendMode: 'difference' }}>
                <h1 ref={titleRef} style={{ fontSize: '10vw', lineHeight: 0.9, fontFamily: 'var(--font-display)', letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '2px white' }}>
                    VIBRANCE <br />
                    <span style={{ color: 'white', WebkitTextStroke: '0' }}>2026</span>
                </h1>
                <p style={{ marginTop: '1rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.3rem', opacity: 0.8 }}>
                    Live the <span style={{ color: 'var(--color-cyan)' }}>Beats</span>
                </p>
                <p ref={subRef} style={{ marginTop: '2rem', fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'white', letterSpacing: '0.1em' }}>
                    18 Feb  - 21 Feb
                </p>
            </div>

            <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.7 }}>
                <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2rem' }}></p>
            </div>
        </section>
    );
};

export default Home;
