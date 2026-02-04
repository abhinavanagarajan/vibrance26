import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, BadgeCheck, ExternalLink, User, Users, Ticket, UserCheck2, ArrowLeft } from 'lucide-react';
import { Asset, EventItem } from '@/interfaces/contentful';
import '../../styles/events.css';

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventItem | null>(null);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);

        fetch('/data/events.json')
            .then(res => {
                if (!res.ok) throw new Error("Failed to load events.");
                return res.json();
            })
            .then((data: EventItem[]) => {
                const found = data.find(e => String(e.fields.eventId) === eventId);
                setEvent(found || null);
                setAssets([]);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching event:", err);
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a', color: 'white' }}>
                LOADING...
            </div>
        );
    }

    if (!event) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a0a0a', color: 'white', gap: '1rem' }}>
                <h2>Event not found</h2>
                <button onClick={() => navigate('/events')} className="register-btn" style={{ padding: '0.5rem 1rem' }}>
                    Back to Events
                </button>
            </div>
        );
    }

    const { fields } = event;

    const getImageUrl = () => {
        if (!fields.poster || !fields.poster.sys) return null;
        const assetId = fields.poster.sys.id;
        const asset = assets.find(a => a.sys.id === assetId);
        return asset ? asset.fields.file.url : null;
    };

    const imageUrl = getImageUrl();

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return {
            day: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const { day, time } = formatDate(fields.startDateAndTime);

    const handleRegisterFlow = (eventName: string) => {
        // Navigate to login page with event details
        //window.open("https://chennaievents.vit.ac.in/vitchennai_vibrance/studentLogin", "_blank");
        navigate('/login', { state: { eventId: fields.eventId, eventName: eventName } });
    };

    return (
        <section style={{ minHeight: '100vh', color: '#fff', paddingTop: '80px', paddingBottom: '40px' }}>
            <div className="container mx-auto px-4 mt-8" style={{ maxWidth: '90%' }}> {/* Increased max-width to accomodate side-by-side */}

                <button
                    onClick={() => navigate('/events')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        fontSize: '1rem'
                    }}
                    className="hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} /> Back to Events
                </button>

                <div className="event-page-card">

                    <div className="event-page-poster">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={fields.eventName}
                            />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://cdn.abhinavio.xyz/images/assets/vibrancelogo.webp" alt="Vibrance" style={{ width: '50%', height: 'auto', opacity: 0.5 }} />
                            </div>
                        )}
                        <div className="modal-category-tag">
                            {fields.eventType}
                        </div>
                    </div>

                    <div className="event-page-info">
                        <div className="event-page-header-row">
                            <div>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', marginBottom: '0.5rem', lineHeight: 1.2 }}>{fields.eventName}</h1>
                                <div className="modal-club" style={{ fontSize: '1.2rem', color: 'cyan' }}>{fields.clubName}</div>
                            </div>

                            {fields.registrationLink && (
                                <button
                                    onClick={() => handleRegisterFlow(fields.eventName)}
                                    className="register-btn"
                                    style={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        backgroundColor: '#06b6d4',
                                        color: 'black',
                                        border: 'none',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    Register Now <ExternalLink size={18} />
                                </button>
                            )}
                        </div>

                        {fields.specialEvent && (
                            <div className="special-badge" style={{ marginBottom: '1.5rem', color: '#fbbf24' }}>
                                <BadgeCheck size={20} />
                                <span style={{ fontWeight: 'bold' }}>Flagship Event</span>
                            </div>
                        )}

                        <div className="modal-info-grid" style={{ marginBottom: '2rem' }}>
                            <div className="modal-info-item">
                                <Calendar className="text-cyan-400" size={20} />
                                <div>
                                    <div className="info-label">Date</div>
                                    <div className="info-value">{day}</div>
                                </div>
                            </div>
                            <div className="modal-info-item">
                                <Clock className="text-cyan-400" size={20} />
                                <div>
                                    <div className="info-label">Time</div>
                                    <div className="info-value">{time}</div>
                                </div>
                            </div>
                            <div className="modal-info-item">
                                <MapPin className="text-cyan-400" size={20} />
                                <div>
                                    <div className="info-label">Venue</div>
                                    <div className="info-value">{fields.eventVenue}</div>
                                </div>
                            </div>
                            <div className="modal-info-item">
                                {fields.participationType.toLowerCase().includes('team') ? (
                                    <Users className="text-cyan-400" size={20} />
                                ) : (
                                    <User className="text-cyan-400" size={20} />
                                )}
                                <div>
                                    <div className="info-label">Type</div>
                                    <div className="info-value">{fields.participationType} ({fields.teamSize})</div>
                                </div>
                            </div>
                            <div className="modal-info-item">
                                <Ticket className="text-cyan-400" size={20} />
                                <div>
                                    <div className="info-label">Price</div>
                                    <div className="info-value">
                                        {fields.pricePerPerson === 0 ? 'FREE' : `₹${fields.pricePerPerson}`}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-info-item">
                                <UserCheck2 className="text-cyan-400" size={20} />
                                <div>
                                    <div className="info-label">Participation</div>
                                    <div className="info-value">
                                        {fields.eventFor === "Both" ? 'All Participants' : `${fields.eventFor}s only`}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="" style={{ marginTop: '1rem' }}>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff', fontFamily: 'var(--font-display)' }}>At a glance</h3>
                                <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>{fields.shortDescription}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="event-page-description-section">
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff', fontFamily: 'var(--font-display)' }}>Everything you need to know</h3>
                    <p style={{ lineHeight: '1.8', color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>{fields.longDescription}</p>
                </div>
            </div>
        </section>
    );
};

export default EventDetails;
