import React from 'react';

interface SponsorProps {
    name: string;
    logo: string;
}

const SponsorLogo: React.FC<SponsorProps> = ({ name, logo }) => (
    <div style={{
        padding: '1rem',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(5px)',
        aspectRatio: '3/2',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s'
    }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
    >
        <img src={logo} alt={name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain', filter: 'grayscale(100%) brightness(1.2)', transition: 'filter 0.3s' }}
            onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%) brightness(1)'}
            onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%) brightness(1.2)'}
        />
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
            .then(res => res.json())
            .then(data => setSponsorData(data))
            .catch(err => console.error("Failed to load sponsors", err));
    }, []);

    return (
        <section id="sponsors" style={{ minHeight: '60vh', padding: '100px 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', marginBottom: '4rem', textAlign: 'center', opacity: 0.8 }}>
                POWERED BY
            </h2>

            <div className="sponsors-wrapper" style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {sponsorData.map((tier, index) => (
                    <div key={index} className="sponsor-tier" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontFamily: 'var(--font-main)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            marginBottom: '2rem',
                            color: 'var(--color-cyan)',
                            opacity: 0.8
                        }}>
                            {tier.tierName}
                        </h3>

                        <div className="sponsors-grid" style={{
                            display: 'grid',
                            flexDirection: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '2rem',
                            width: '100%',
                            justifyItems: 'center'
                        }}>
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
