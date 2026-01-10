import React from 'react';

const EventCategory = ({ title, count }) => {
    return (
        <div className="event-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '16px', flex: '1 1 300px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'var(--color-cyan)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
        >
            <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>{title}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{count} Events</span>
                <span style={{ fontSize: '2rem' }}>→</span>
            </div>
        </div>
    );
}

const Events = () => {
    return (
        <section id="events" style={{ minHeight: '80vh', padding: '100px 5vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', marginBottom: '3rem', textAlign: 'left' }}>
                EVENTS
            </h2>
            <div className="events-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <EventCategory title="DANCE" count="12" />
                <EventCategory title="MUSIC" count="08" />
                <EventCategory title="DRAMATICS" count="05" />
                <EventCategory title="LITERARY" count="15" />
                <EventCategory title="GAMING" count="04" />
                <EventCategory title="FINE ARTS" count="10" />
            </div>
        </section>
    );
};

export default Events;
