import { useState, useEffect } from 'react';
import EventsPage from '../components/events/EventsPage';
import { Asset, EventItem } from '@/interfaces/contentful';
import { contentfulClient } from '@/utils/contentfulClient';

const Events = () => {
    const [eventData, setEventData] = useState<EventItem[]>([]);
    const [assetData, setAssetData] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        contentfulClient.withoutLinkResolution
            .getEntries({ content_type: 'event' })
            .then((response) => {
                // @ts-ignore - response structure matches our need but SDK types are strict
                setEventData(response.items);
                // @ts-ignore - response.includes is present in withoutLinkResolution
                setAssetData(response.includes?.Asset || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load events from Contentful", err);
                // Fallback to local JSON if Contentful fails (e.g. missing credentials)
                console.log("Falling back to local JSON");
                fetch('/data/events.json')
                    .then(res => res.json())
                    .then(data => {
                        setEventData(data.items);
                        setAssetData(data.includes.Asset);
                        setLoading(false);
                    })
                    .catch(e => console.error("Local fallback failed", e));
            });
    }, []);

    if (loading) return <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>LOADING EVENTS...</div>;

    return (
        <section id="events" style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor: '#0a0a0a' }}>
            <h2 style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', marginBottom: '1rem', textAlign: 'center', color: '#fff', textTransform: 'uppercase' }}>
                Events
            </h2>
            <EventsPage eventData={eventData} assetData={assetData} />
        </section>
    );
};

export default Events;
