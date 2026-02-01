import React from 'react';

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => (
    <div className="team-card" style={{
        width: '300px',
        // Removed fixed height to allow the card to collapse if no image exists
        minHeight: '100px',
        background: '#111',
        border: '1px solid #333',
        borderRadius: '8px', // Added a slight radius for a "nicer" look
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        flexShrink: 0
    }}

    >
        {image && (
            <div className="team-img-container" style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                overflow: 'hidden',
            }}>
                <div className="team-img-bg" style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease'
                }}></div>
            </div>
        )}

        <div className="team-content" style={{
            backgroundColor: 'white',
            width: '100%',
            padding: '1.2rem', // Added padding so text isn't hitting the edges
            boxSizing: 'border-box',
            flexGrow: 1, // Ensures it fills the remaining space
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center' // Centers text vertically in the white box
        }}>
            <h3 style={{
                color: '#444', // Darkened for better contrast on white background
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                margin: '0 0 0.4rem 0',
                lineHeight: '1.2'
            }}>
                {name}
            </h3>
            <p className="role" style={{
                color: '#a65454ff',
                textAlign: 'left', // Switched to left for a more standard clean look
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 700,
                margin: 0,
                transition: 'color 0.3s ease'
            }}>
                {role}
            </p>
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


        </section>
    );
};

export default Team;
