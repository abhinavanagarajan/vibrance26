import React from 'react';
import {
    HoverSlider,
    HoverSliderImage,
    HoverSliderImageWrap,
    TextStaggerHover
} from "@/components/AnimatedSlideShow"

const SLIDES = [
    {
        id: "slide-1",
        title: "Premgi Amaren & Mohan Sisters",
        imageUrl: "https://test-cdn-iota.vercel.app/images/proshows/premgi.webp",
        day: "Day 1"
    },
    {
        id: "slide-2",
        title: "Santhosh Narayanan & Pineapple Express",
        imageUrl: "https://test-cdn-iota.vercel.app/images/proshows/santhosh.webp",
        day: "Day 2"
    },
    {
        id: "slide-3",
        title: "Makka Band ft. Sublahshini & Raftaar",
        imageUrl: "https://test-cdn-iota.vercel.app/images/proshows/raftaar.webp",
        day: "Day 3"
    },
    {
        id: "slide-4",
        title: "DJ Camilla Lynx & DJ Deepika",
        imageUrl: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1974&auto=format&fit=crop",
        day: "Day 4"
    },
]

export function ProShows() {
    return (
        <section style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <HoverSlider style={{
                minHeight: '100vh',
                width: '100%',
                padding: '0 5vw',
                backgroundColor: '#000',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'clip' // Changed from hidden to clip/visible to allow sticky children
            }}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .proshows-content {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        width: 100%;
                        gap: 2rem;
                        margin-top: 15vh;
                        margin-bottom: 15vh;
                        max-width: 1400px; /* Ensure max-width is respected */
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .proshows-col {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 4rem;
                    }
                    .proshows-col.left {
                        text-align: right;
                        padding-right: 1rem;
                    }
                    .proshows-col.right {
                        text-align: left;
                        padding-left: 1rem;
                    }
                    .proshows-center {
                        flex: 0 0 400px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .proshows-img-wrapper {
                        width: 100%;
                        max-width: 400px;
                        aspect-ratio: 4/5;
                        border-radius: 20px;
                        overflow: hidden;
                        border: 1px solid rgba(255,255,255,0.2);
                        box-shadow: 0 20px 50px rgba(0,0,0,0.8);
                        background-color: rgba(255,255,255,0.05);
                    }

                    @media (max-width: 1024px) {
                        .proshows-content {
                            flex-direction: column;
                            gap: 3rem;
                            margin-top: 150px; 
                            margin-bottom: 100px; 
                            padding-top: 0;
                        }
                        .proshows-col.left, .proshows-col.right {
                            text-align: center !important;
                            padding: 0 !important;
                            width: 100%;
                        }
                        .proshows-center {
                            flex: 0 0 auto;
                            width: 100%;
                            order: -1; 
                            position: sticky;
                            top: 120px; /* Offset to sit below navbar */
                            z-index: 50;
                            padding-bottom: 20px;
                            /* Optional: Add a subtle backdrop or pointer-events logic if needed */
                            pointer-events: none; /* Let clicks pass through to text if overlapping heavily? No, images might be interactive. Keep clicks. */
                        }
                        .proshows-img-wrapper {
                            max-width: 300px; 
                            box-shadow: 0 10px 40px rgba(0,0,0,0.9);
                        }
                    }
                `}} />

                <div style={{
                    width: '100%',
                    maxWidth: '1400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                }}>

                    {/* Main Flex Container using Classes */}
                    <div className="proshows-content">

                        {/* Left Column: Days 1 & 2 */}
                        <div className="proshows-col left">
                            {SLIDES.slice(0, 2).map((slide, index) => (
                                <div key={slide.id} style={{ position: 'relative', cursor: 'pointer' }}>
                                    <span style={{
                                        display: 'block',
                                        fontSize: '1.3rem',
                                        color: '#fff',
                                        marginBottom: '0.5rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em'
                                    }}>{slide.day}</span>

                                    <TextStaggerHover
                                        index={index}
                                        style={{
                                            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                            fontWeight: '900',
                                            textTransform: 'uppercase',
                                            letterSpacing: '-0.02em',
                                            lineHeight: '1.1',
                                            fontFamily: 'var(--font-display)',
                                            display: 'block',
                                            color: '#fff',
                                            textShadow: '10px 10px 10px rgba(0,0,0,0.5)'
                                        }}
                                        text={slide.title}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Center Column: Image Display */}
                        <div className="proshows-center">
                            <HoverSliderImageWrap className="proshows-img-wrapper">
                                {SLIDES.map((slide, index) => (
                                    <div key={slide.id} style={{ width: '100%', height: '100%' }}>
                                        <HoverSliderImage
                                            index={index}
                                            imageUrl={slide.imageUrl}
                                            src={slide.imageUrl}
                                            alt={slide.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            loading="eager"
                                            decoding="async"
                                        />
                                    </div>
                                ))}
                            </HoverSliderImageWrap>
                        </div>

                        {/* Right Column: Days 3 & 4 */}
                        <div className="proshows-col right">
                            {SLIDES.slice(2, 4).map((slide, i) => {
                                const index = i + 2;
                                return (
                                    <div key={slide.id} style={{ position: 'relative', cursor: 'pointer' }}>
                                        <span style={{
                                            display: 'block',
                                            fontSize: '1.3rem',
                                            color: '#fff',
                                            marginBottom: '0.5rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.2em'
                                        }}>{slide.day}</span>

                                        <TextStaggerHover
                                            index={index}
                                            style={{
                                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                                fontWeight: '900',
                                                textTransform: 'uppercase',
                                                letterSpacing: '-0.02em',
                                                lineHeight: '1.1',
                                                fontFamily: 'var(--font-display)',
                                                display: 'block',
                                                color: '#fff',
                                                textShadow: '10px 10px 10px rgba(0,0,0,0.5)'
                                            }}
                                            text={slide.title}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </HoverSlider>
        </section>
    )
}

// const ProShows: React.FC = () => {
//     return (
//         <section id="proshows" style={{ width: "100%", minHeight: "100vh", backgroundColor: "black" }}>
//             <HoverSliderDemo />
//         </section>
//     )
// };

export default ProShows;