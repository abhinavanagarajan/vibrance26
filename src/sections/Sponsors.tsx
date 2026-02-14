import React from 'react';

interface SponsorProps {
    name: string;
    logo: string;
}

const SponsorLogo: React.FC<SponsorProps> = ({ name, logo }) => (
    <div style={{
        padding: '1rem',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: '3/2',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
        width: '300px', // Fixed basis for consistent sizing
        maxWidth: '100%', // Responsive shrink

    }}

    >
        <img src={logo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'brightness(1.2)', transition: 'filter 0.3s' }} />
    </div>
);

interface SponsorTier {
    tierName: string;
    sponsors: SponsorProps[];
}

const Sponsors = () => {
    const [sponsorData, setSponsorData] = React.useState<SponsorTier[]>([]);

    React.useEffect(() => {
        fetch('/data/sponsors.json')
            // fetch('/data/temp-sponsors.json') // Fallback or testing
            .then(res => res.json())
            .then(data => setSponsorData(data))
            .catch(err => console.error("Failed to load sponsors", err));
    }, []);

    return (
        <section id="sponsors" style={{ minHeight: '60vh', padding: '100px 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <style>{`
                .sponsors-grid {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 2rem;
                    width: 100%;
                }
            `}</style>
            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '4rem', textAlign: 'center', opacity: 0.8 }}>
                POWERED BY
            </h2>

            <div className="sponsors-wrapper" style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {sponsorData.map((tier, index) => (
                    <div key={index} className="sponsor-tier" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontFamily: 'var(--font-main)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            marginBottom: '2rem',
                            color: 'var(--color-cyan)',
                            opacity: 0.9,
                            textAlign: 'center'
                        }}>
                            {tier.tierName}
                        </h3>

                        <div className="sponsors-grid">
                            {tier.sponsors.map((sponsor, sIndex) => (
                                <SponsorLogo key={sIndex} name={sponsor.name} logo={sponsor.logo} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Sponsors;
