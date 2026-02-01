import React from 'react';

const MovingText = () => {
    const words = ["Live", "the", "beats"];

    return (
        <div className="container">
            <h1 className="fun-text">
                {words.map((word, i) => (
                    <span
                        key={i}
                        className={`word word-${i + 1}`}
                        style={{ '--delay': `${i * 0.2}s` } as React.CSSProperties}
                    >
                        {word}
                    </span>
                ))}
            </h1>

            <style>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 20vh;
                    width: 100%;
                    overflow: hidden;
                    padding: 20px;
                }

                .fun-text {
                    font-weight: 900;
                    font-size: clamp(2.5rem, 8vw, 4.5rem); 
                    font-family: var(--font-display);
                    text-transform: uppercase;
                    letter-spacing: -0.02em;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0.2em;
                    text-align: center;
                }

                .word {
                    display: inline-block;
                    opacity: 0;
                    /* ADDED 'colorCycle' to the end of your animation list */
                    animation: 
                        popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards var(--delay),
                        float 3s ease-in-out infinite alternate,
                        colorCycle 4s linear infinite; 
                    animation-delay: var(--delay), calc(var(--delay) + 1s), 2s;
                    will-change: transform, opacity, filter;
                }

                .word-1 { font-family: var(--font-transparent); color: #FF007A; text-shadow: 0.05em 0.05em 0px #5F0A87; }
                .word-2 { font-family: var(--font-transparent); color: #00E5FF; text-shadow: 0.05em 0.05em 0px #0051AD; }
                .word-3 { font-family: var(--font-transparent); color: #78FF00; text-shadow: 0.05em 0.05em 0px #1A6100; }

                /* NEW: Recurring Hue Rotation Effect */
                @keyframes colorCycle {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }

                @keyframes popIn {
                    0% {
                        transform: scale(14) rotate(-5deg);
                        opacity: 0;
                        filter: blur(10px);
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                        filter: blur(0);
                    }
                }

                @keyframes float {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-10px); }
                }

                @media (max-width: 600px) {
                    .fun-text {
                        letter-spacing: 0.05em;
                        gap: 0.1em;
                    }
                    .word {
                        text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
                    }
                }
            `}</style>
        </div>
    );
};

export default MovingText;