import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MerchProduct {
    id: string;
    title: string;
    price: string;
    images: string[];
    sizeChart: string;
}

const SizeChartModal = ({ isOpen, onClose, image }: { isOpen: boolean; onClose: () => void; image: string }) => {
    if (!isOpen) return null;
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={onClose}>
            <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }} onClick={e => e.stopPropagation()}>
                <button onClick={onClose} style={{ position: 'absolute', top: -40, right: 0, background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}>&times;</button>
                <img src={image} alt="Size Chart" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }} />
            </div>
        </div>
    );
};

const MerchItem = ({ product }: { product: MerchProduct }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [showSizeChart, setShowSizeChart] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <>
            <div className="merch-card" style={{ width: '300px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                {/* Image Carousel */}
                <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden', background: '#000' }}>
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentImage}
                            src={product.images[currentImage]}
                            alt={product.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </AnimatePresence>

                    {/* Controls */}
                    {product.images.length > 1 && (
                        <>
                            <button onClick={prevImage} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}>&lt;</button>
                            <button onClick={nextImage} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}>&gt;</button>

                            {/* Dots */}
                            <div style={{ position: 'absolute', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', gap: '5px' }}>
                                {product.images.map((_, idx) => (
                                    <div key={idx} style={{ width: '6px', height: '6px', borderRadius: '50%', background: idx === currentImage ? 'var(--color-cyan)' : 'rgba(255,255,255,0.5)' }}></div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="card-info" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>{product.title}</h3>
                    <p style={{ color: 'var(--color-cyan)', fontWeight: 'bold', fontSize: '1.2rem' }}>{product.price}</p>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button style={{ flex: 1, padding: '0.8rem', background: 'var(--color-purple)', border: 'none', color: 'white', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', borderRadius: '4px' }}>
                            Pre-Order
                        </button>
                        <button onClick={() => setShowSizeChart(true)} style={{ padding: '0.8rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', borderRadius: '4px' }} title="Size Chart">
                            📏
                        </button>
                    </div>
                </div>
            </div>

            <SizeChartModal isOpen={showSizeChart} onClose={() => setShowSizeChart(false)} image={product.sizeChart} />
        </>
    );
};

const Merch = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [products, setProducts] = useState<MerchProduct[]>([]);

    useEffect(() => {
        fetch('/data/merch.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to load merch", err));
    }, []);

    return (
        <section ref={sectionRef} id="merch" style={{ minHeight: '100vh', padding: '100px 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', background: '#0a0a0a' }}>
            <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', marginBottom: '4rem', textAlign: 'center' }}>
                VIBRANCE <span style={{ color: 'var(--color-pink)' }}>DROPS</span>
            </h2>

            <div className="merch-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>
                {products.map((product) => (
                    <MerchItem key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default Merch;
