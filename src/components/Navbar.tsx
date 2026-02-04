import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import '../styles/navbar.css';

interface NavItem {
    name: string;
    path: string;
}

const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Merch', path: '/merch' },
    { name: 'ProShows', path: '/proshows' },
    { name: 'Events', path: '/events' },
    { name: 'Sponsors', path: '/sponsors' },
    { name: 'Team', path: '/team' },
];

const menuVariants: Variants = {
    closed: {
        opacity: 0,
        y: "-100%",
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    },
    open: {
        opacity: 1,
        y: "0%",
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
};

const linkVariants: Variants = {
    closed: {
        y: 80,
        opacity: 0
    },
    open: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.1 * i,
            ease: "easeInOut"
        }
    })
};

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-logo" style={{ zIndex: 1002 }}>
                    <Link to="/" className="flex items-center gap-6">
                        <img src="https://cdn.abhinavio.xyz/images/assets/vit-logo.webp" alt="VIT Chennai" className="nav-links w-[140px] object-contain" />
                        <img src="https://cdn.abhinavio.xyz/images/assets/vibrance-transparent.webp" className="ml-8 w-[130px] object-contain" />

                    </Link>
                </div>

                {/* Desktop Links */}
                <ul className="nav-links">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link to={item.path} className="nav-link" data-cursor="hover">
                                {item.name}
                                <span className="link-underline"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Toggle */}
                <div className="nav-mobile-toggle" onClick={toggleMenu} style={{ zIndex: 1002, cursor: 'pointer' }}>
                    <div className={`hamburger ${isOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu"
                        variants={menuVariants}
                        onClick={() => { setIsOpen(false) }}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="mobile-nav-links">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    custom={i}
                                    variants={linkVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                >
                                    <Link to={item.path} className="mobile-nav-link" onClick={() => setIsOpen(false)}>
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
