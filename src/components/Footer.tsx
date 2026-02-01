import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const socialLinks = [
        { name: 'facebook', href: 'https://www.facebook.com/VibranceVIT/', label: 'Facebook' },
        { name: 'instagram', href: 'https://www.instagram.com/vibrancevitchennai/', label: 'Instagram' },
        { name: 'youtube', href: 'https://www.youtube.com/@VITChennaic', label: 'YouTube' },
        { name: 'x', href: 'https://x.com/vibrancevit', label: 'LinkedIn' },
    ];

    return (
        <footer style={{
            position: 'relative',
            backgroundColor: 'rgba(122, 122, 122, 0.5)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            overflow: 'hidden'
        }}>
            {/* Background Glow Effect
            <div style={{
                position: 'absolute',
                top: 0,
                left: '25%',
                width: '16rem',
                height: '16rem',
                borderRadius: '9999px',
                filter: 'blur(120px)',
                opacity: 0.2
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: 0,
                right: '25%',
                width: '16rem',
                height: '16rem',
                backgroundColor: '#db2777',
                borderRadius: '9999px',
                filter: 'blur(120px)',
                opacity: 0.2
            }}></div> */}

            <div style={{
                position: 'relative',
                zIndex: -999,
                maxWidth: '80rem',
                margin: '0 auto',
                padding: '3rem 1rem',

            }}>
                {/* Top Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: isMobile ? '2rem' : '8rem',
                    marginBottom: '3rem'
                }}>

                    {/* Quick Links */}
                    <div style={{ display: isMobile ? 'none' : 'block' }}>

                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontFamily: 'var(--font-display)',
                            color: 'transparent',
                            WebkitTextStroke: '1px white'
                        }}>
                            Quick Links
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            {['Events', 'Sponsors', 'Team'].map((link) => (
                                <li key={link} style={{ marginBottom: '0.5rem' }}>
                                    <a
                                        href={`/${link.toLowerCase()}`}
                                        style={{
                                            color: 'white',
                                            textDecoration: 'none',
                                            textTransform: 'uppercase',
                                            fontSize: '0.875rem',
                                            letterSpacing: '0.05em',
                                            fontFamily: 'var(--font-main)',
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#c084fc'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <img
                            src="https://test-cdn-iota.vercel.app/images/assets/vibrance-transparent.webp"
                            alt="Vibrance Logo"
                            style={{
                                width: '18rem',
                                height: 'auto',
                                objectFit: 'contain',
                                marginBottom: '1rem'
                            }}
                        />
                        <h3 style={{
                            fontSize: '2.3rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontFamily: 'var(--font-display)',
                            color: 'transparent',
                            WebkitTextStroke: '1px white'
                        }}>
                            VIBRANCE'26
                        </h3>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontFamily: 'var(--font-display)',
                            color: 'transparent',
                            WebkitTextStroke: '1px white'
                        }}>
                            Get in Touch
                        </h3>
                        <div>
                            <a
                                href="mailto:vibrance@vit.ac.in"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                    marginBottom: '0.75rem',
                                    fontFamily: 'var(--font-main)',
                                    transition: 'color 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#c084fc'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                            >
                                <Mail size={16} />
                                <span style={{ fontSize: '0.875rem' }}>vibrance@vit.ac.in</span>
                            </a>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                                color: 'white',
                                fontFamily: 'var(--font-main)'
                            }}>
                                <MapPin size={16} style={{ marginTop: '0.25rem', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.875rem' }}>
                                    VIT Chennai Campus<br />
                                    Vandalur - Kelambakkam Road<br />
                                    Chennai, Tamil Nadu
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div style={{

                    paddingTop: '2rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1.5rem'
                    }}>


                        {socialLinks.map(({ name, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link-btn"
                                style={{
                                    width: '2.5rem',
                                    height: '2.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '9999px',
                                    transition: 'all 0.3s ease',
                                    textDecoration: 'none',
                                    border: '1px solid transparent'
                                }}

                            >
                                <img
                                    src={`https://test-cdn-iota.vercel.app/svgs/${name}.svg`}
                                    alt={label}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        transition: 'filter 0.3s ease',
                                        filter: 'grayscale(100%)',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.filter = 'none';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.filter = 'grayscale(100%)';
                                    }}
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div style={{
                    paddingTop: '2rem',
                    display: 'flex',
                    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <p style={{
                        fontSize: '0.875rem',
                        color: '#bbb',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        fontFamily: 'var(--font-main)',
                        margin: 0
                    }}>
                        © 2026 Vibrance VIT Chennai. All Rights Reserved.
                    </p>
                    {/* <div style={{
                        display: 'flex',
                        gap: '1.5rem'
                    }}>
                        {['Privacy Policy', 'Terms of Service'].map((item) => (
                        
                            <a
                                key={item}
                                href="#"
                                style={{
                                    fontSize: '0.75rem',
                                    color: '#6b7280',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em',
                                    fontFamily: 'var(--font-main)',
                                    transition: 'color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#c084fc'}
                                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                            >
                                {item}
                            </a>
                        ))}
                    </div> */}
                </div>
            </div>

            {/* Decorative Line at Bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(to right, transparent, #a855f7, transparent)'
            }}></div>
        </footer>
    );
};

export default Footer;