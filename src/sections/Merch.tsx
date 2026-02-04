import { useRef } from 'react';

const Merch = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    return (
        <section ref={sectionRef} id="merch" style={{ minHeight: '100vh', padding: '100px 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', background: 'transparent' }}>
            {/* Inline styles for media queries (simple solution for this component) */}
            <style>
                {`
                    .merch-content {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 3rem;
                        max-width: 1300px;
                        width: 100%;
                        background: rgba(255, 255, 255, 0.47);
                        backdrop-filter: blur(10px);
                        border-radius: 20px;
                        padding: 2rem;
                    }
                    .merch-images {
                        display: flex;
                        gap: 2rem;
                        flex: 2;
                    }
                    .merch-info {
                        flex: 1;
                        text-align: left;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: flex-start;
                    }
                    .merch-image-wrapper {
                        flex: 1;
                        width: 300px;
                        aspect-ratio: 1/1;
                        border-radius: 20px;
                        overflow: hidden;
                    }

                    @media (max-width: 768px) {
                        .merch-content {
                            flex-direction: column;
                            gap: 2rem;
                        }
                        /* On mobile, this container becomes the "single box" */
                        .merch-images {
                            width: 100%;
                            max-width: 400px; /* Restrict max size on mobile */
                            aspect-ratio: 1/1;
                            overflow-x: auto;
                            display: flex;
                            gap: 0; /* No gap, images slide directly */
                            scroll-snap-type: x mandatory;
                            
                            /* "Box" styling moves here on mobile */
                            background: rgba(255,255,255,0.05);
                            border-radius: 20px;
                            border: 1px solid rgba(255,255,255,0.1);
                        }
                        .merch-image-wrapper {
                            min-width: 100%; /* Full width of the parent box */
                            height: 100%;
                            flex: 0 0 auto;
                            scroll-snap-align: center;
                            
                            /* Remove individual box styling on mobile */
                            background: none;
                            border: none;
                            border-radius: 0;
                            max-width: none;
                        }
                        .merch-info {
                            width: 100%;
                            align-items: center;
                            text-align: center;
                        }
                    }
                `}
            </style>

            <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', marginBottom: '4rem', textAlign: 'center', color: '#fff' }}>
                VIBRANCE <span style={{ color: 'var(--color-pink)' }}>DROPS</span>
            </h2>

            <div className="merch-content">

                {/* Images Container */}
                <div className="merch-images">
                    {/* Front View */}
                    <div className="merch-image-wrapper">
                        <img
                            src="https://cdn.abhinavio.xyz/images/merch/merch-front.png"
                            alt="Vibrance 26 T-Shirt Front"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Back View */}
                    <div className="merch-image-wrapper">
                        <img
                            src="https://cdn.abhinavio.xyz/images/merch/merch-back.png"
                            alt="Vibrance 26 T-Shirt Back"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="merch-info">
                    {/* <p style={{ fontFamily: 'var(--font-display)', color: 'red', fontSize: '1.2rem', opacity: 0.8, marginBottom: '0.5rem' }}>Only at</p>
                    <p style={{ fontSize: '3rem', color: 'var(--color-pink)', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>₹ 499</p> */}
                    <p style={{ fontSize: '3rem', color: 'var(--color-pink)', fontWeight: 'bold', marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>Coming Soon</p>

                    {/* <button style={{
                        padding: '1rem 3rem',
                        fontSize: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        background: 'cyan',
                        color: 'black',
                        border: '1px solid var(--color-cyan)',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
                        transition: 'transform 0.2s ease',
                        whiteSpace: 'nowrap'
                    }}>
                        BUY NOW
                    </button> */}
                </div>

            </div>
        </section>
    );
};

export default Merch;
