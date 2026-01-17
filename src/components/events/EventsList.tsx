import React from 'react';
import { Asset, EventItem } from '@/interfaces/contentful';
import '../../styles/events.css';
import { Calendar, Users, Tag, Search } from 'lucide-react';

interface EventsListProps {
    events: EventItem[];
    assets: Asset[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onEventClick: (event: EventItem) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, assets, searchTerm, onSearchChange, onEventClick }) => {
    const getImageUrl = (event: EventItem) => {
        if (!event.fields.poster || !event.fields.poster.sys) return null;
        const assetId = event.fields.poster.sys.id;
        const asset = assets.find(a => a.sys.id === assetId);
        return asset ? asset.fields.file.url : null;
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="events-main-content">
            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search events or clubs..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="events-list">
                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '2rem' }}>
                        No events found matching your criteria.
                    </div>
                ) : (
                    events.map(event => {
                        const imageUrl = getImageUrl(event);
                        return (
                            <div
                                key={event.sys.id}
                                className="event-card"
                                onClick={() => onEventClick(event)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="event-image-container">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt={event.fields.eventName} className="event-image" />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#222' }} />
                                    )}
                                </div>
                                <div className="event-details">
                                    <div>
                                        <div className="event-header">
                                            <div>
                                                <h3 className="event-title">{event.fields.eventName}</h3>
                                                <div className="event-club">{event.fields.clubName}</div>
                                            </div>
                                            <div className="event-price">
                                                {event.fields.pricePerPerson === 0 ? 'FREE' : `₹${event.fields.pricePerPerson}`}
                                            </div>
                                        </div>
                                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {event.fields.shortDescription}
                                        </p>
                                    </div>
                                    <div className="event-info-grid">
                                        <div className="event-info-item">
                                            <Calendar size={16} className="text-cyan-400" />
                                            {formatDate(event.fields.startDateAndTime)}
                                        </div>
                                        <div className="event-info-item">
                                            <Users size={16} className="text-cyan-400" />
                                            {event.fields.participationType}
                                        </div>
                                        <div className="event-info-item">
                                            <Tag size={16} className="text-cyan-400" />
                                            {event.fields.eventType}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default EventsList;
