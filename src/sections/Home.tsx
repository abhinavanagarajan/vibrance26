import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import InteractiveBento, { BentoItem } from '@/components/InteractiveBento';

gsap.registerPlugin(ScrollTrigger, Draggable);

const Home = () => {
    // ... existing refs ...
    const containerRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subRef = useRef<HTMLParagraphElement | null>(null);

    // Hype Section Refs
    const hypeSectionRef = useRef<HTMLElement | null>(null);
    const hypeTextRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const marqueeContainerRef = useRef<HTMLDivElement | null>(null);

    // ... existing useEffects (Hero, Hype Animations, Magnet Logic) ...
    // (omitted for brevity, assume they are preserved if I use exact match for replacement or just append/replace imports and usage)

    // NOTE: I will only replace the top import area and the bottom rendering area to avoid modifying the complex logic in between.

    // ...

    const BENTO_ITEMS: BentoItem[] = [
        {
            id: 1,
            type: 'image',
            title: "Neon Tokyo",
            description: "Experience the vibrant nightlife and illuminated streets of Shinjuku.",
            src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
            colSpan: 2,
            rowSpan: 1
        },
        {
            id: 2,
            type: 'image',
            title: "Nordic Silence",
            description: "Minimalist architecture meeting the raw beauty of the Icelandic coast.",
            src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1000&auto=format&fit=crop",
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 3,
            type: 'video',
            title: "Live Energy",
            description: "Feel the pulse of the crowd and the bass of the beat.",
            src: "https://assets.mixkit.co/videos/preview/mixkit-concert-crowd-with-lights-2423-large.mp4", // Free stock video
            colSpan: 1,
            rowSpan: 2
        },
        {
            id: 4,
            type: 'image',
            title: "Cyber Future",
            description: "A glimpse into a technological singularity where AI meets humanity.",
            src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
            colSpan: 2,
            rowSpan: 1
        },
        {
            id: 5,
            type: 'image',
            title: "Deep Ocean",
            description: "The crushing pressure and alien beauty of the Mariana Trench.",
            src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop",
            colSpan: 1,
            rowSpan: 1
        },
        {
            id: 6,
            type: 'video',
            title: "Rhythm & Soul",
            description: "Dance like nobody's watching.",
            src: "https://assets.mixkit.co/videos/preview/mixkit-people-dancing-at-a-concert-4578-large.mp4",
            colSpan: 2,
            rowSpan: 1
        },

    ];

    // ... render ...


    useEffect(() => {
        const tl = gsap.timeline();

        // Hero Animations
        tl.fromTo(titleRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
        )
            .fromTo(subRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=1"
            );

        // Hype Section Animations
        if (hypeSectionRef.current) {
            const hypeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: hypeSectionRef.current,
                    start: "top 60%", // Start animation when section is partially visible
                    end: "bottom bottom",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate Text
            hypeTextRefs.current.forEach((el, index) => {
                if (el) {
                    hypeTl.fromTo(el,
                        {
                            opacity: 0,
                            y: 50,
                            skewY: 10,
                            rotationX: 45,
                            filter: 'blur(10px)'
                        },
                        {
                            opacity: 1,
                            y: 0,
                            skewY: 0,
                            rotationX: 0,
                            filter: 'blur(0px)',
                            duration: 1,
                            ease: "back.out(1.7)"
                        },
                        index * 0.15 // Stagger delay
                    );
                }
            });

            // Animate Marquee Entrance (Only once/play)
            if (marqueeContainerRef.current) {
                // Ensure marquee elements are visible but animate in
                gsap.set(marqueeContainerRef.current.children, { opacity: 1 }); // Ensure visibility logic is handled by fromTo
                hypeTl.fromTo(marqueeContainerRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    },
                    "-=0.5"
                );
            }
        }

    }, []);

    // Sticker Refs
    const draggableRefs = useRef<(HTMLDivElement | null)[]>([]); // For Draggable
    const magnetRefs = useRef<(HTMLDivElement | null)[]>([]);    // For Magnet Effect
    const stickerCenters = useRef<{ x: number, y: number }[]>([]);

    useEffect(() => {
        // Initialize Draggables
        const draggables: Draggable[] = [];
        draggableRefs.current.forEach((el) => {
            if (el) {
                const d = Draggable.create(el, {
                    type: "x,y",
                    bounds: marqueeContainerRef.current, // Constrain to container
                    inertia: true,
                    edgeResistance: 0.65,
                })[0];
                draggables.push(d);
            }
        });

        // Magnet Logic (Centers)
        const calculateCenters = () => {
            // We calculate centers based on the MAGNET refs (visual center), 
            // but we need to account for the fact that the parent might have moved.
            // Actually, getBoundingClientRect() works regardless of transforms!
            if (!magnetRefs.current.length) return;
            stickerCenters.current = magnetRefs.current.map(el => {
                if (!el) return { x: 0, y: 0 };
                const rect = el.getBoundingClientRect();
                return {
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                };
            });
        };

        calculateCenters();
        window.addEventListener('resize', calculateCenters);

        // Update centers periodically or on drag end to ensure accuracy?
        // Actually mousemove checks clientRect every time? No, expensive.
        // We cached it. The cache becomes invalid if we Drag.
        // So we should update `stickerCenters` during/after drag?
        // Or just use `getBoundingClientRect` inside the loop (might be heavy but accurate)?

        // Optimization: Updates centers on mouse move (throttle?) or just assume static if not dragging.
        // Since we allow dragging, let's just make the loop check live positions EFFICIENTLY?
        // No, checking 13 Rects per mousemove is OK on modern Desktops.

        const handleMouseMove = (e: MouseEvent) => {
            // Need live centers because dragging moves them
            magnetRefs.current.forEach((el, i) => {
                if (!el) return;

                // Live Rect check for accuracy with dragging
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = e.clientX - centerX;
                const dy = e.clientY - centerY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 300;
                const maxMove = 60;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    // Move the MAGNET ref, not the Draggable ref
                    const moveX = -(dx / dist) * force * maxMove;
                    const moveY = -(dy / dist) * force * maxMove;

                    gsap.to(el, {
                        x: moveX,
                        y: moveY,
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                } else {
                    gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', calculateCenters);
            window.removeEventListener('mousemove', handleMouseMove);
            draggables.forEach(d => d.kill());
        };
    }, []);

    const addToHypeRefs = (el: HTMLParagraphElement | null) => {
        if (el && !hypeTextRefs.current.includes(el)) {
            hypeTextRefs.current.push(el);
        }
    };







    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            {/* HERO SECTION */}
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

            {/* HYPE SECTION */}
            <section
                ref={hypeSectionRef}
                style={{
                    width: '100%',
                    minHeight: '80vh',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    padding: '4rem 0',
                    overflow: 'hidden'
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto items-center px-[5%] mb-12">

                    {/* Left Side: Styled Text */}
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-display)' }}>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.8rem, 3vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
                            <span style={{ color: '#00d26a' }}>Four Incredible Days.</span>
                        </p>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2 }}>
                            <span style={{ color: '#dcfce7' }}>Shimmering Stars</span> Lighting Up Every Corner.
                        </p>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2 }}>
                            <span style={{ color: '#fcd53f' }}>Epic Events</span> That Leave You Breathless.
                        </p>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2 }}>
                            <span style={{ color: '#f8312f' }}>Celebrities</span> Bringing Charisma And Flair.
                        </p>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2 }}>
                            This Is More Than An Experience.
                        </p>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.8rem, 3vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, marginTop: '0.5rem' }}>
                            A Wave Of <span style={{ color: '#00d26a' }}>Pure,</span> <span style={{ color: '#fcd53f' }}>Unfiltered</span> <span style={{ color: '#f8312f' }}>Passion.</span>
                        </p>
                    </div>

                    {/* Right Side: Stickers Graphic */}
                    <div className="relative h-[400px] w-full flex items-center justify-center" ref={marqueeContainerRef} style={{ perspective: '1000px' }}>
                        {[
                            { text: "Four Days.", color: "#00d26a", top: "10%", left: "10%", rotate: "-15deg", z: 2 },
                            { text: "Stars", color: "#eEFFbb", top: "30%", right: "5%", rotate: "10deg", z: 1, textColor: "#1a1a1a" },
                            { text: "Merch", color: "#f8312f", bottom: "30%", left: "5%", rotate: "-5deg", z: 3 },
                            { text: "Events", color: "#fcd53f", bottom: "10%", right: "20%", rotate: "5deg", z: 2 },
                            { text: "Music", color: "#bc13fe", top: "5%", right: "15%", rotate: "15deg", z: 1 },
                            { text: "Dance", color: "#00f3ff", bottom: "5%", left: "20%", rotate: "-10deg", z: 1, textColor: "#1a1a1a" },
                            { text: "Proshows", color: "#ff0055", top: "50%", left: "0%", rotate: "-20deg", z: 2 },
                            { text: "Vibrance", color: "white", top: "40%", right: "0%", rotate: "20deg", z: 3, textColor: "black" },
                            { text: "2026", color: "#fcd53f", top: "20%", left: "30%", rotate: "5deg", z: 0 },
                            { text: "Food", color: "#dcfce7", bottom: "45%", right: "10%", rotate: "-15deg", z: 1, textColor: "#1a1a1a" },
                            { text: "Games", color: "#00d26a", bottom: "20%", left: "35%", rotate: "12deg", z: 1 },
                            { text: "Vibe", color: "#f8312f", top: "15%", right: "40%", rotate: "-8deg", z: 0 },
                            { text: "Energy", color: "#00f3ff", bottom: "55%", left: "15%", rotate: "18deg", z: 1, textColor: "#1a1a1a" }


                        ].map((sticker, i) => (
                            <div key={i}
                                className="sticker-wrapper"
                                style={{
                                    position: 'absolute',
                                    top: sticker.top,
                                    left: sticker.left,
                                    right: sticker.right,
                                    bottom: sticker.bottom,
                                    transform: `rotate(${sticker.rotate})`,
                                    zIndex: sticker.z,
                                }}
                            >
                                {/* Draggable Target */}
                                <div
                                    ref={(el) => { if (el) draggableRefs.current[i] = el; }} // Draggable Ref
                                    style={{ display: 'inline-block' }}
                                >
                                    {/* Magnet Target */}
                                    <div
                                        ref={(el) => { if (el) magnetRefs.current[i] = el; }} // Magnet Ref
                                        className="sticker-repel"
                                        style={{ display: 'inline-block' }}
                                    >
                                        {/* Content & Float Animation */}
                                        <div style={{
                                            background: sticker.color,
                                            color: sticker.textColor || 'white',
                                            padding: '0.8rem 2rem',
                                            borderRadius: '9999px',
                                            fontSize: 'clamp(1.2rem, 1.5vw, 1.8rem)',
                                            fontWeight: 700,
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                            border: '2px solid white',
                                            whiteSpace: 'nowrap',
                                            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                                            animationDelay: `${Math.random() * 2}s`,
                                            cursor: 'grab' // Draggable cursor
                                        }}>
                                            {sticker.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Marquees */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', zIndex: 10 }}>
                    {/* Line 1 */}
                    <div style={{
                        background: 'white',
                        color: 'black',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        padding: '0.5rem 0',
                        transform: 'rotate(-2deg) scale(1.05)',
                        borderTop: '2px solid black',
                        borderBottom: '2px solid black'
                    }}>
                        <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
                            {Array(8).fill("THE DECADE EDITION • ").map((text, i) => (
                                <span key={i} style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginRight: '2rem' }}>{text}</span>
                            ))}
                        </div>
                    </div>

                    {/* Line 2 */}
                    <div style={{
                        background: 'var(--color-cyan)',
                        color: 'black',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        padding: '0.5rem 0',
                        transform: 'rotate(2deg) scale(1.05)',
                        marginTop: '-1.5rem',

                    }}>
                        <div style={{ display: 'inline-block', animation: 'marquee-reverse 20s linear infinite' }}>
                            {Array(8).fill("LIVE THE BEATS • ").map((text, i) => (
                                <span key={i} style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'var(--font-display)', marginRight: '2rem' }}>{text}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(var(--r)); }
                        50% { transform: translateY(-20px) rotate(var(--r)); }
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes marquee-reverse {
                        0% { transform: translateX(-50%); }
                        100% { transform: translateX(0); }
                    }
                `}</style>
            </section >

            {/* <InteractiveBento items={BENTO_ITEMS} /> */}




        </div >
    );
};

export default Home;