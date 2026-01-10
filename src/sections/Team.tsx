import React from 'react';

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => (
    <div className="team-card" style={{ width: '250px', height: '350px', background: '#111', border: '1px solid #333', borderRadius: '12px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', transition: 'all 0.3s ease', flexShrink: 0 }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.borderColor = 'var(--color-cyan)';
            const roleEl = e.currentTarget.querySelector('.role') as HTMLElement;
            if (roleEl) roleEl.style.color = 'var(--color-cyan)';
            const imgEl = e.currentTarget.querySelector('.team-img-bg') as HTMLElement;
            if (imgEl) imgEl.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#333';
            const roleEl = e.currentTarget.querySelector('.role') as HTMLElement;
            if (roleEl) roleEl.style.color = '#888';
            const imgEl = e.currentTarget.querySelector('.team-img-bg') as HTMLElement;
            if (imgEl) imgEl.style.transform = 'scale(1)';
        }}
    >
        {/* Image Background */}
        <div className="team-img-bg" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.5s ease'
        }}></div>

        {/* Gradient Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 40%, #0a0a0a 95%)', zIndex: 1 }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{name}</h3>
            <p className="role" style={{ color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s', fontWeight: 600 }}>{role}</p>
        </div>
    </div>
);

interface TeamTier {
    tier: string;
    showTitle: boolean;
    members: TeamMemberProps[];
}

const Team = () => {
    const [teamData, setTeamData] = React.useState<TeamTier[]>([]);

    React.useEffect(() => {
        fetch('/data/team.json')
            .then(res => res.json())
            .then(data => setTeamData(data))
            .catch(err => console.error("Failed to load team data", err));
    }, []);

    return (
        <section id="team" style={{ minHeight: '80vh', padding: '100px 5vw', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', marginBottom: '3rem', textAlign: 'right' }}>
                THE <span style={{ color: 'var(--color-purple)' }}>CREW</span>
            </h2>

            <div className="team-tiers" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {teamData.map((tier, index) => (
                    <div key={index} className="team-tier">
                        {tier.showTitle && (
                            <h3 style={{
                                fontSize: '2rem',
                                fontFamily: 'var(--font-display)',
                                marginBottom: '2rem',
                                color: 'rgba(255,255,255,0.8)',
                                textAlign: 'center'
                            }}>
                                {tier.tier}
                            </h3>
                        )}
                        <div className="team-grid" style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '2rem',
                            justifyContent: 'center'
                        }}>
                            {tier.members.map((member, mIndex) => (
                                <TeamMember key={mIndex} name={member.name} role={member.role} image={member.image} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <footer style={{ marginTop: 'auto', paddingTop: '5rem', display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: '0.9rem' }}>
                <p>&copy; 2026 VIBRANCE VIT CHENNAI. ALL RIGHTS RESERVED.</p>
                <p>VIT CHENNAI</p>
            </footer>
        </section>
    );
};

export default Team;
