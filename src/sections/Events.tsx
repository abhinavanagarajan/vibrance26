import { useState, useEffect } from 'react';
import EventsPage from '../components/events/EventsPage';
import { Asset, EventItem } from '@/interfaces/contentful';
// import { contentfulClient } from '@/utils/contentfulClient';

const Events = () => {
    const [eventData, setEventData] = useState<EventItem[]>([]);
    const [assetData, setAssetData] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // contentfulClient.withoutLinkResolution
        //     .getEntries({ content_type: 'event' })
        //     .then((response) => {
        //         // @ts-ignore - response structure matches our need but SDK types are strict
        //         setEventData(response.items);
        //         console.log("Fetched events from Contentful:", response.items);
        //         // @ts-ignore - response.includes is present in withoutLinkResolution
        //         setAssetData(response.includes?.Asset || []);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         console.error("Failed to load events from Contentful", err);
        //         // Fallback to local JSON if Contentful fails (e.g. missing credentials)
        //         console.log("Falling back to local JSON");
        //         fetch('/data/events.json')
        //             .then(res => res.json())
        //             .then(data => {
        //                 setEventData(data.items);
        //                 setAssetData(data.includes.Asset);
        //                 setLoading(false);
        //             })
        //             .catch(e => console.error("Local fallback failed", e));
        //     });

        fetch('/data/events.json')
            .then(res => {
                if (!res.ok) throw new Error("Failed to load events.json");
                return res.json();
            })
            .then(data => {
                // Since data is an ARRAY [], we use it directly
                setEventData(data);
                // If assets aren't in this file, set to empty array to avoid errors
                setAssetData([]);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching events:", err);
                setLoading(false);
            });

    }, []);

    if (loading) return <div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>LOADING EVENTS...</div>;

    return (
        <section
            id="events"
            style={{
                minHeight: '100vh',
                paddingTop: '100px',

            }}
        >
            <h2
                style={{
                    fontSize: '3rem',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '1rem',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontWeight: 900,
                    color: '#ffffff', // Set text to white so it stands out
                    textShadow: '2px 2px 10px rgba(0,0,0,0.5)' // Optional: helps readability
                }}
            >
                Events
            </h2>
            <EventsPage eventData={eventData} assetData={assetData} />
        </section>
    );
};

export default Events;
