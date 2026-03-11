import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        const navbarElements = document.querySelectorAll('.navbar, .mobile-menu, .nav-mobile-toggle');
        const previousDisplay = Array.from(navbarElements).map((el) => {
            const element = el as HTMLElement;
            return element.style.display;
        });

        navbarElements.forEach((el) => {
            (el as HTMLElement).style.display = 'none';
        });

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            navbarElements.forEach((el, index) => {
                (el as HTMLElement).style.display = previousDisplay[index] || '';
            });

            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, []);

    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor: 'rgba(122, 122, 122, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    padding: '20px',
                }}
            >
                <h3
                    style={{
                        fontSize: '1.25rem',
                        fontFamily: 'var(--font-vast)',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        color: '#ffffff',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    200+ Events
                </h3>
                <h3
                    style={{
                        fontSize: '1.25rem',
                        fontFamily: 'var(--font-vast)',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        color: '#ffffff',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    15,000+ Participants
                </h3>
                <h4
                    style={{
                        fontSize: '2.5rem',
                        fontFamily: 'var(--font-vast)',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        fontWeight: 900,
                        color: '#ffffff',
                        textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    Thanks for making{' '}
                    <span
                        style={{
                            fontSize: '2.8rem',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontFamily: 'var(--font-display)',
                            color: 'transparent',
                            WebkitTextStroke: '1px white',
                        }}
                    >
                        VIBRANCE'26
                    </span>{' '}
                    a grand success!!
                </h4>
            </div>
        </section>
    );
};

export default Home;