import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/cursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        // Add global listeners for hoverables
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 1,
            mixBlendMode: "difference"
        },
        hover: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            scale: 2.5,
            backgroundColor: "var(--color-cyan)",
            mixBlendMode: "difference"
        }
    };

    const dotVariants = {
        default: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 1
        },
        hover: {
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: 0
        }
    }

    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        // Check if device supports hover (typically desktop)
        const checkDevice = () => {
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                setIsTouch(false);
            } else {
                setIsTouch(true);
            }
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    if (isTouch) return null;

    return (
        <>
            <motion.div
                className="cursor-ring"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            />
            <motion.div
                className="cursor-dot"
                variants={dotVariants}
                animate={isHovering ? "hover" : "default"}
                transition={{ type: "spring", stiffness: 500, damping: 28 }}
            />
        </>
    );
};

export default CustomCursor;
