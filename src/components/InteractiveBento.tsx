import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface BentoItem {
    id: string | number;
    type: 'image' | 'video';
    src: string;
    title: string;
    description: string;
    colSpan?: number; // 1 or 2
    rowSpan?: number; // 1 or 2
}

interface InteractiveBentoProps {
    items: BentoItem[];
}

const InteractiveBento: React.FC<InteractiveBentoProps> = ({ items }) => {
    // Track clicked item for mobile or click-interaction preference
    const [activeId, setActiveId] = useState<string | number | null>(null);

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 grid-flow-dense">
                {items.map((item) => (
                    <BentoCard
                        key={item.id}
                        item={item}
                        isActive={activeId === item.id}
                        onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                    />
                ))}
            </div>
        </div>
    );
};

const BentoCard = ({ item, isActive, onClick }: { item: BentoItem; isActive: boolean; onClick: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Combine hover and active state
    const showInfo = isHovered || isActive;

    return (
        <motion.div
            className={`relative overflow-hidden rounded-xl border border-white/10 group cursor-pointer w-full h-full min-h-[250px]
                ${item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}
                ${item.rowSpan === 2 ? 'md:row-span-2' : 'row-span-1'}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Background Material */}
            <div className="absolute inset-0 bg-black/50 z-0" />

            {/* Media Content */}
            <div className="absolute inset-0 w-full h-full">
                {item.type === 'video' ? (
                    <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}
            </div>

            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-60'}`} />

            {/* Content Info */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end z-10">
                <motion.h3
                    className="text-2xl font-bold text-white font-[var(--font-display)] uppercase tracking-wider mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    {item.title}
                </motion.h3>

                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <p className="text-gray-300 text-sm leading-relaxed mb-2">
                                {item.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Decorative Line */}
                <motion.div
                    className="h-1 bg-[var(--color-cyan)] mt-2 w-0 group-hover:w-full transition-all duration-500"
                />
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border-2 border-[var(--color-cyan)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />

        </motion.div>
    );
};

export default InteractiveBento;
