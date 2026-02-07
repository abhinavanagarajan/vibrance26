import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ValedictoryGuestProps {
    imageSrc?: string;
    guestName?: string;
    role?: string;
}

const ValedictoryGuest: React.FC<ValedictoryGuestProps> = ({
    imageSrc = "https://cdn.a2ys.dev/images/photos/ed45fb04-5597-438f-93a4-d976c9349a6d-sreeleela.webp", // detailed default
    guestName = "Sreeleela",
    role = "Valedictory Chief Guest"
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const confettiContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;
        const image = imageRef.current;
        const glow = glowRef.current;

        if (!container || !text || !image || !glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();

            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            // 3D Text Rotation
            gsap.to(text, {
                rotationX: -y * 20, // Tilt vertically
                rotationY: x * 20, // Tilt horizontally
                x: x * 30,
                y: y * 30,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000
            });

            // Image Parallax & Tilt
            gsap.to(image, {
                rotationX: y * 10,
                rotationY: -x * 10,
                x: x * -40, // Move opposite to text for depth
                y: y * -40,
                duration: 0.8,
                ease: "power2.out",
                transformPerspective: 1000
            });

            // Glow Follow
            gsap.to(glow, {
                x: x * 200,
                y: y * 200,
                duration: 1,
                ease: "power1.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to([text, image], {
                rotationX: 0,
                rotationY: 0,
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.3)"
            });
            gsap.to(glow, {
                x: 0,
                y: 0,
                duration: 1
            });
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Confetti Animation
    useEffect(() => {
        if (!confettiContainerRef.current) return;

        const colors = ['#ff0055', '#00f3ff', '#bc13fe', '#fcd53f', '#ffffff'];
        const particleCount = 60; // Increased count

        // Clear previous confetti if any
        confettiContainerRef.current.innerHTML = '';

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');

            // Random styles
            const bg = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4 + 'px';

            particle.style.background = bg;
            particle.style.width = size;
            particle.style.height = size;
            particle.style.position = 'absolute';
            // Start at a random random position ABOVE the viewport to simulate rainfall entering
            // Actually, for continuous effect, we initiall set them top: -20px.
            particle.style.top = '-20px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() + 0.5 + '';
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

            confettiContainerRef.current.appendChild(particle);

            // Randomized Duration & Delay
            const duration = Math.random() * 3 + 4; // 4 to 7 seconds

            // To make it look "already raining", we'd ideally simulate past time, 
            // but simple negative delay works well in CSS animations. 
            // In GSAP, negative delay at start of timeline works, but for simple tweens:
            // We can just use `gsap.fromTo` or just `delay`.
            // Actually, `delay: -Math.random() * 5` will skip the first 0-5s of animation!
            // This is perfect for "already raining" effect.

            // Vertical Fall
            gsap.to(particle, {
                y: '110vh',
                duration: duration,
                ease: "none", // Linear for continuous rain
                repeat: -1,
                delay: -Math.random() * 5 // Start immediately at random progress
            });

            // Horizontal Sway
            gsap.to(particle, {
                x: (Math.random() - 0.5) * 100, // Random sway amount
                duration: Math.random() * 2 + 1,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });

            // Rotation
            gsap.to(particle, {
                rotation: Math.random() * 360,
                duration: Math.random() * 2 + 1,
                ease: "none",
                repeat: -1
            });
        }

    }, []);

    return (
        <section
            ref={containerRef}
            className="valedictory-section"
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                overflow: 'hidden',
                perspective: '1500px',
                background: 'transparent',
                padding: '4rem 2rem'
            }}
        >
            {/* Background Elements */}
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* Global Confetti Container - Lifted zIndex and ensured positioning */}
            <div
                ref={confettiContainerRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 50, // Higher than everything else
                    pointerEvents: 'none',
                    overflow: 'hidden'
                }}
            />

            <div className="content-wrapper">
                {/* Role Text on top of image */}
                <p style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: '#fff',
                    textTransform: 'uppercase',
                    fontSize: '0.9rem',
                    letterSpacing: '0.2em',
                    fontWeight: 500,
                    width: '100%',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
                    {role}
                </p>

                <div className="center-image-container">
                    <div
                        ref={imageRef}
                        className="guest-image"
                        style={{
                            width: 'clamp(300px, 40vw, 500px)',
                            height: 'clamp(400px, 50vw, 600px)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            position: 'relative',
                            zIndex: 2
                        }}
                    >
                        <img
                            src={imageSrc}
                            alt={guestName}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'grayscale(10%) contrast(1.1)'
                            }}
                        />
                        {/* Overlay Gradient for text readability
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 100%)'
                        }} /> */}


                    </div>

                    {/* Guest Name overlapping bottom */}
                    <div className="name-wrapper">
                        <h2
                            ref={textRef}
                            className="guest-name-elegant"
                            style={{
                                fontSize: 'clamp(120px, 20vw, 250px)',
                                fontFamily: 'var(--font-cursive)', // Fleur De Leah
                                color: '#ff0055',
                                position: 'relative',
                                display: 'inline-block',
                                zIndex: 10
                            }}
                            data-text={guestName}
                        >
                            {guestName}
                        </h2>
                    </div>
                </div>

            </div>

            <style>{`
                .valedictory-section {
                     /* Base layout adjustments if needed */
                }

                .content-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    max-width: 1200px;
                    z-index: 10;
                }

                .center-image-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                
                .name-wrapper {
                    margin-top: -60px; /* Overlap the image */
                    z-index: 10;
                    text-align: center;
                    pointer-events: none;
                }

                .guest-name-elegant {
                    font-size: clamp(4rem, 12vw, 8rem);
                    font-weight: 400; /* Cursive fonts usually don't need bold */
                    line-height: 1.1;
                    /* Elegant golden glow effect */
                    color: transparent;
                    background: linear-gradient(135deg, #fcd53f 0%, #ff0055 50%, #bc13fe 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
                    transform: rotate(-3deg);
                }

                .guest-name-elegant::before {
                    content: attr(data-text);
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: -1;
                    color: #ffffff; /* Blue offset text */
                    transform: translate(-6px, -6px);
                    opacity: 0.8;
                    -webkit-background-clip: border-box;
                    background-clip: border-box;
                    background: none;
                }

                .guest-name-elegant::after {
                    content: attr(data-text);
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: -1;
                    color: rgba(255, 0, 85, 0.4); /* Pinkish shadow */
                    transform: translate(8px, 8px);
                    filter: blur(4px);
                    opacity: 0.6;
                    /* Ensure the shadow doesn't inherit background clip if expected */
                    -webkit-background-clip: border-box;
                    background-clip: border-box;
                    background: none;
                }
                
                /* Mobile tweaks */
                @media (max-width: 768px) {
                    .name-wrapper {
                        margin-top: -40px;
                    }
                }

            `}</style>
        </section>
    );
};

export default ValedictoryGuest;
