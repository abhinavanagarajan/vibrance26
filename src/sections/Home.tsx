"use client";
import React from 'react';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, Draggable } from 'gsap/all';
import { FocusRail } from '@/components/FocusRail';
import { ContainerScroll } from '@/components/ContainerScroll';
import FlowingMenu from '@/components/FlowingMenu';
import Masonry from '@/components/Masonry';
import CurvedLoop from '@/components/CurvedLoop';
import MovingText from '@/components/MovingText';
import { FocusRailItem } from '@/components/FocusRail';
import ValedictoryGuest from '@/components/ValedictoryGuest';

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


    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile(); // Check on mount
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const focusRailImages: FocusRailItem[] = [
        {
            id: 1,
            title: "Mainstage Madness",
            description: "Feel the ground shake as the headliners take the stage.",
            meta: "Concert • Live",
            imageSrc: "https://cdn.a2ys.dev/images/photos/09b0a901-3993-409b-a1b6-5dd545313a6b-IMG_3348.webp",
            href: "#proshows",
        },
        {
            id: 2,
            title: "Decade Celebration",
            description: "A 10-year legacy of culture and passion unfolding in every corner.",
            meta: "Legacy • Festival",
            imageSrc: "https://cdn.a2ys.dev/images/photos/e0192b63-e31e-4c25-8f2e-05fe1387dd4a-IMG_3366.webp",
            href: "#legacy",
        },
        {
            id: 3,
            title: "Golden Hour Vibes",
            description: "Capturing the magic of the festival as the sun sets over the campus.",
            meta: "Aesthetic • Mood",
            imageSrc: "https://cdn.a2ys.dev/images/photos/7e705d98-62b3-499d-a46c-2855b45eeb71-IMG_3360.webp",
            href: "#vibes",
        },
        {
            id: 4,
            title: "The Energy Hub",
            description: "Where technology meets the human spirit in a technological singularity.",
            meta: "Tech • Innovation",
            imageSrc: "https://cdn.a2ys.dev/images/photos/feb27b4f-0277-4e21-a93d-672cca40d39f-IMG_3359.webp",
            href: "#tech",
        },
        {
            id: 5,
            title: "Underworld Beats",
            description: "Deep rhythms from the underground scene hitting the frequency of the extraordinary.",
            meta: "Music • Deep",
            imageSrc: "https://cdn.a2ys.dev/images/photos/6731955b-feb6-4e55-96f5-da644c1a4b14-IMG_3351.webp",
            href: "#beats",
        },
    ];

    const proshowsImages = [
        { link: '', text: 'Premgi Amaren & Mohan Sisters', image: 'https://cdn.abhinavio.xyz/images/proshows/backgrounds/premgi.webp' },
        { link: '', text: 'Santosh Narayanan & Pineapple Express', image: 'https://cdn.abhinavio.xyz/images/proshows/backgrounds/santhosh.webp' },
        { link: '', text: 'Makka Band ft. Sublahshini & Raftaar', image: 'https://cdn.abhinavio.xyz/images/proshows/backgrounds/raftaar.webp' },
        { link: '', text: 'DJ Camilla Lynx & DJ Deepika', image: 'https://cdn.abhinavio.xyz/images/proshows/backgrounds/deepika.webp' }
    ];


    const galleryImages = [
        {
            id: "1",
            img: "https://cdn.a2ys.dev/images/photos/09b0a901-3993-409b-a1b6-5dd545313a6b-IMG_3348.webp",
            url: "#",
            height: 400,
        },
        {
            id: "2",
            img: "https://cdn.a2ys.dev/images/photos/d25c7bbf-9722-4860-b134-4c9f18330fd5-IMG_3364.webp",
            url: "#",
            height: 250,
        },
        {
            id: "3",
            img: "https://cdn.a2ys.dev/images/photos/192eb0b7-1fd4-4a89-9375-2c765b0239d7-IMG_3361.webp",
            url: "#",
            height: 600,
        },
        {
            id: "4",
            img: "https://cdn.a2ys.dev/images/photos/3e2a3f7f-6983-44f6-8d2f-8d8dafda47a3-IMG_3350.webp",
            url: "#",
            height: 450,
        },
        {
            id: "5",
            img: "https://cdn.a2ys.dev/images/photos/5e868414-9348-44b9-b2cd-290463fdad18-IMG_3346.webp",
            url: "#",
            height: 300,
        },
        {
            id: "6",
            img: "https://cdn.a2ys.dev/images/photos/6731955b-feb6-4e55-96f5-da644c1a4b14-IMG_3351.webp",
            url: "#",
            height: 550,
        },
        {
            id: "7",
            img: "https://cdn.a2ys.dev/images/photos/6c565eb5-12c0-43a7-9ffe-75b7a1e2655b-IMG_3347.webp",
            url: "#",
            height: 350,
        },
        {
            id: "8",
            img: "https://cdn.a2ys.dev/images/photos/7e705d98-62b3-499d-a46c-2855b45eeb71-IMG_3360.webp",
            url: "#",
            height: 500,
        },
        {
            id: "9",
            img: "https://cdn.a2ys.dev/images/photos/8807ffbf-60bb-41d7-aad2-6981dee6909e-IMG_3349.webp",
            url: "#",
            height: 400,
        },
        {
            id: "10",
            img: "https://cdn.a2ys.dev/images/photos/aaac7cc1-e41f-4851-8be7-0685acfb4edc-IMG_3358.webp",
            url: "#",
            height: 480,
        },
        {
            id: "12",
            img: "https://cdn.a2ys.dev/images/photos/c99f83f4-cd2e-4c08-8aff-d8c41b82fa01-IMG_3354.webp",
            url: "#",
            height: 600,
        },
        {
            id: "13",
            img: "https://cdn.a2ys.dev/images/photos/d25c7bbf-9722-4860-b134-4c9f18330fd5-IMG_3364.webp",
            url: "#",
            height: 280,
        },
        {
            id: "14",
            img: "https://cdn.a2ys.dev/images/photos/d89e0fc9-44ba-470e-9ba5-5abaa172193c-IMG_3363.webp",
            url: "#",
            height: 420,
        },
        {
            id: "15",
            img: "https://cdn.a2ys.dev/images/photos/e0192b63-e31e-4c25-8f2e-05fe1387dd4a-IMG_3366.webp",
            url: "#",
            height: 310,
        },
        {
            id: "16",
            img: "https://cdn.a2ys.dev/images/photos/f4aa92ac-7c90-437b-b83c-c46d39921f6a-IMG_3356.webp",
            url: "#",
            height: 470,
        },
        {
            id: "17",
            img: "https://cdn.a2ys.dev/images/photos/fbdc15b3-ff90-4e8a-af0f-b5fcd40b36fb-IMG_3362.webp",
            url: "#",
            height: 520,
        },
        {
            id: "18",
            img: "https://cdn.a2ys.dev/images/photos/feb0d20e-406b-417e-a7b0-c64b8341a8e0-IMG_3357.webp",
            url: "#",
            height: 380,
        },
        {
            id: "19",
            img: "https://cdn.a2ys.dev/images/photos/feb27b4f-0277-4e21-a93d-672cca40d39f-IMG_3359.webp",
            url: "#",
            height: 440,
        }
    ];


    // Hype Section Animations Scope
    useGSAP(() => {
        const tl = gsap.timeline();

        // Hero Animations
        if (titleRef.current && subRef.current) {
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 100 },
                { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
            )
                .fromTo(subRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                    "-=1"
                );
        }

        // Hype Section Animations
        if (hypeSectionRef.current) {
            const hypeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: hypeSectionRef.current,
                    start: "top 85%", // Slightly earlier for mobile
                    end: "bottom bottom",
                    toggleActions: "play none none reverse" // Reverse on scroll back up to replay if needed, or just none
                }
            });

            // Animate Text
            // Filter out nulls first
            const validTextRefs = hypeTextRefs.current.filter(el => el !== null);
            if (validTextRefs.length > 0) {
                validTextRefs.forEach((el, index) => {
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
                });
            }

            // Animate Marquee Entrance (Only once/play)
            if (marqueeContainerRef.current) {
                // Ensure marquee elements are visible but animate in
                gsap.set(marqueeContainerRef.current.children, { opacity: 1 });
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

        // Initialize Draggables inside same context for auto-cleanup
        draggableRefs.current.forEach((el) => {
            if (el) {
                Draggable.create(el, {
                    type: "x,y",
                    bounds: marqueeContainerRef.current, // Constrain to container
                    inertia: true,
                    edgeResistance: 0.65,
                });
            }
        });

    }, { scope: containerRef, dependencies: [] });

    // Sticker Refs & Magnet Effect
    const draggableRefs = useRef<(HTMLDivElement | null)[]>([]); // For Draggable
    const magnetRefs = useRef<(HTMLDivElement | null)[]>([]);    // For Magnet Effect
    const stickerCenters = useRef<{ x: number, y: number }[]>([]);

    useEffect(() => {
        // Magnet Logic (Centers) - Keep this in useEffect as it adds specific window listeners
        const calculateCenters = () => {
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

        const handleMouseMove = (e: MouseEvent) => {
            magnetRefs.current.forEach((el, _) => {
                if (!el) return;

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
            <section ref={containerRef} id="home" className="section-home" style={{ backgroundColor: '#000', height: '100vh', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: 1,
                        opacity: 0.9 // Adjust to make text more readable
                    }}
                >
                    <source src="https://cdn.abhinavio.xyz/videos/vibrance-trailer.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                <div className="home-content" style={{ marginTop: '10rem', zIndex: 10, justifyContent: 'center', alignItems: 'center', textAlign: 'center', mixBlendMode: 'difference' }}>
                    <h1 ref={titleRef} style={{ fontSize: '15vw', lineHeight: 0.5, fontFamily: 'var(--font-display)', letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '2px white' }}>
                        VIBRANCE <br />
                        <span style={{ fontSize: '10vw', color: 'white', WebkitTextStroke: '0' }}>2026</span>
                    </h1>
                    <div style={{ marginTop: '0.01rem', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '0.2rem', opacity: 0.8 }}>
                        <MovingText />
                    </div>
                    <p ref={subRef} style={{ marginTop: '1.5rem', fontSize: '2rem', textTransform: 'uppercase', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', color: 'white', opacity: 0.85 }}>18 Feb - 21 Feb </p>

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
                    overflow: 'hidden',
                    /* The gradient: starts solid black at the top, ends transparent at the bottom */
                    background: 'linear-gradient(to bottom, #000000 0%, transparent 100%)'
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto items-center px-[5%] mb-12 ">

                    {/* Left Side: Styled Text */}
                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: 'var(--font-display)' }}>
                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)', fontWeight: 500, lineHeight: 1.4 }}>
                            <span style={{ color: '#00d26a', fontWeight: 700 }}>Vibrance’26</span> is a grand celebration that brings together the spirit of sportsmanship and cultural creativity. The fest features a host of dynamic sports events including powerlifting, volleyball, and cricket.
                        </p>

                        <p ref={addToHypeRefs} style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)', fontWeight: 500, lineHeight: 1.4 }}>
                            With more than <span style={{ color: '#f8312f', fontWeight: 700 }}>20,000 expected participants</span>, including <span style={{ color: '#2f8af8ff', fontWeight: 700 }}>5,000+ inter-university entrants</span> and international students, Vibrance'26 fosters a joyful environment for talents to shine. Our renowned <span style={{ color: '#dcfce7', fontWeight: 700 }}>ProShow evenings</span> turn the campus into a vibrant hub of excitement and camaraderie.
                        </p>
                    </div>

                    {/* Right Side: Stickers Graphic */}
                    <div className="relative h-[400px] w-full flex items-center justify-center" ref={marqueeContainerRef} style={{ perspective: '1000px' }}>
                        {[
                            { text: "Four Days.", color: "#00d26a", top: "8%", left: "5%", rotate: "-12deg", z: 5 },
                            { text: "Energy", color: "#00f3ff", top: "22%", left: "12%", rotate: "15deg", z: 2, textColor: "#1a1a1a" },

                            { text: "Music", color: "#bc13fe", top: "7%", right: "8%", rotate: "14deg", z: 3 },
                            { text: "Stars", color: "#eEFFbb", top: "25%", right: "15%", rotate: "-8deg", z: 4, textColor: "#1a1a1a" },

                            { text: "Vibrance", color: "white", top: "45%", left: "35%", rotate: "5deg", z: 10, textColor: "black" },
                            { text: "2026", color: "#fcd53f", top: "38%", right: "30%", rotate: "-5deg", z: 1 },
                            { text: "Vibe", color: "#f8312f", top: "55%", right: "40%", rotate: "10deg", z: 6 },

                            { text: "Proshows", color: "#ff0055", top: "50%", left: "2%", rotate: "-18deg", z: 4 },
                            { text: "Food", color: "#dcfce7", top: "48%", right: "2%", rotate: "12deg", z: 2, textColor: "#1a1a1a" },

                            { text: "Merch", color: "#f8312f", bottom: "15%", left: "8%", rotate: "-10deg", z: 7 },
                            { text: "Dance", color: "#00f3ff", bottom: "5%", left: "25%", rotate: "8deg", z: 3, textColor: "#1a1a1a" },

                            { text: "Events", color: "#fcd53f", bottom: "18%", right: "10%", rotate: "15deg", z: 5 },
                            { text: "Games", color: "#00d26a", bottom: "8%", right: "30%", rotate: "-12deg", z: 2 }
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




            <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1
                                className="text-black dark:text-white text-center tracking-tight"
                                style={{
                                    fontSize: '3rem',
                                    fontWeight: 900,
                                    fontFamily: 'var(--font-display)',
                                    lineHeight: 1.2
                                }}
                            >
                                This year with more energy to <br /><span style={{ fontSize: '10vw', lineHeight: 0.9, fontFamily: 'var(--font-display)', letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '2px white' }}
                                    className="text-white bg-magenta bg-gradient-to-r from-purple-500 to-pink-500">live the beats</span>
                            </h1>
                        </>
                    }
                >
                    <video
                        src="https://cdn.abhinavio.xyz/videos/cardvideo.webm"
                        autoPlay
                        loop
                        muted
                        playsInline // Added for better mobile support
                        className="mx-auto rounded-2xl object-cover h-full w-full object-center" // Changed object-left-top to center
                        draggable={false}
                    />
                </ContainerScroll>
            </div>

            <div style={{ marginBottom: '200px', position: 'relative', width: '100%' }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 10
                }}>
                    {/* TOP MARQUEE (Top 13.3%) */}
                    <div style={{
                        height: '13.3%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                        borderBottom: '2px solid #000'
                    }}>
                        <div className="marquee-content">
                            🤙 ✨ 💃 🫂 ❤️ 🔥 🎸 🔊 🙌 🤟 🎆 ✨ 🤙 ✨ 🌈 🫂 ❤️ 🔥 🎸 🔊 💃 🙌 🤟 🎆 ✨ 💃 🫂 ❤️ 🔥 🎸 🔊 🙌 🤟 🎆 ✨ 🤙 ✨ 🎸 🔊 💃 🙌 🤟 🎆
                        </div>
                    </div>

                    {/* MIDDLE (The 73.4% Black/Transparent Gap) */}
                    <div style={{
                        flex: 1,
                        background: 'rgba(0,0,0,0.4)', // Semi-transparent black so the rail shows
                    }}></div>

                    {/* BOTTOM MARQUEE (Bottom 13.3%) */}
                    <div style={{
                        height: '13.3%',
                        background: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                        borderTop: '2px solid #000'
                    }}>
                        <div className="marquee-content marquee-reverse">
                            🎹 🎆 💃 🕺 👯 💥 ⚡ 🎼 🎵 🎶  💖 ✨ 💃 🕺 👯  🎹 🎧 🎼 🎵 🎶 🔊 💖 ✨ 💃 🕺 👯 🎆 💥 ⚡ 🎹 🎆 💥 ⚡ 🎼 🎵 🎶  💖 ✨ 💃 🕺 👯  🎹 🎧 🎼 🎵 🎶 🔊 💖 ✨ 💃 🕺 👯 🎆 💥 ⚡
                        </div>
                    </div>

                    <style>{`
                    .marquee-content {
                        white-space: nowrap;
                        display: inline-block;
                        font-family: var(--font-display, sans-serif);
                        font-weight: 900;
                        font-size: 2.5rem;
                        color: #000;
                    }

                    

                    
                `}</style>
                </div>

                {/* The Gradient Overlay (if you want the black to be on top of the images) */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '100%',
                    pointerEvents: 'none', // Allows clicking through to the rail
                    background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 13.3%, #333 13.3%, #333 86.7%, #ffffff 86.7%, #ffffff 100%)'
                }}> </div>

                <FocusRail
                    items={focusRailImages}
                    autoPlay={true}
                    loop={true}
                />

            </div>

            <ValedictoryGuest
                imageSrc="https://cdn.a2ys.dev/images/photos/aeeaaec5-7783-464e-8fb3-a27e860c9b22-IMG_3742.webp"
                guestName="Sreeleela"
                role="Valedictory Chief Guest"
            />

            <div style={{ background: 'linear-gradient(to bottom, transparent, #060010)', paddingBottom: '2rem' }}>
                <h2
                    className="text-black dark:text-white text-center tracking-tight"
                    style={{
                        fontSize: '3rem',
                        fontWeight: 900,
                        fontFamily: 'var(--font-display)',
                        lineHeight: 1.2,
                        paddingTop: '3rem'
                    }}
                >
                    ProShows like <span className="text-white bg-magenta bg-gradient-to-r from-purple-500 to-pink-500">never before</span>
                </h2>
            </div>

            <div style={{ height: '600px', position: 'relative', borderBottom: '1px solid #ffffff' }}>
                <FlowingMenu items={proshowsImages}
                    speed={15}
                    textColor="#ffffff"
                    bgColor="transparent"
                    marqueeBgColor="#ffffff"
                    marqueeTextColor="#060010"
                    borderColor="#ffffff"
                />
            </div>

            <section className="relative z-20 w-full bg-transparent py-20 flex flex-col items-center">
                {/* 1. Masonry Container */}
                <div className="relative w-full" style={{ paddingBottom: isMobile ? '40px' : '128px' }}>
                    <Masonry
                        items={galleryImages}
                        ease="power3.out"
                        duration={0.6}
                        stagger={0.05}
                        animateFrom="center"
                        scaleOnHover
                        hoverScale={0.95}
                        blurToFocus={false}
                        colorShiftOnHover
                    />
                </div>

                {/* 2. Visual Separation - Inline Hidden on Mobile */}
                <div
                    style={{
                        display: isMobile ? 'none' : 'block',
                        width: '100%',
                        height: '15vh',
                        pointerEvents: 'none'
                    }}
                    aria-hidden="true"
                />

                {/* 3. Curved Loop Section - Inline Hidden on Mobile */}
                <div
                    style={{
                        display: isMobile ? 'none' : 'flex',
                        position: 'relative',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: '6rem',
                        paddingBottom: '6rem'
                    }}
                >
                    <div style={{
                        fontSize: '10vw',
                        width: '100%',
                        lineHeight: 0.9,
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.05em',
                        color: 'transparent',
                        WebkitTextStroke: '2px white'
                    }}>
                        <CurvedLoop
                            marqueeText="Vibrance ✦ 2026 ✦ Decade ✦ Edition ✦"
                            speed={2}
                            curveAmount={350}
                            direction="right"
                            interactive
                            className="z-30"
                        />
                    </div>
                </div>
            </section>



        </div >
    );
};

export default Home;