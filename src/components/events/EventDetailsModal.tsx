import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Trophy, BadgeCheck, ExternalLink, User, Users, Ticket, UserCheck2 } from 'lucide-react';
import { Asset, EventItem } from '@/interfaces/contentful';
import '../../styles/events.css';

interface EventDetailsModalProps {
    event: EventItem;
    assets: Asset[];
    onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ event, assets, onClose }) => {
    const { fields } = event;

    const getImageUrl = () => {
        if (!fields.poster || !fields.poster.sys) return null;
        const assetId = fields.poster.sys.id;
        const asset = assets.find(a => a.sys.id === assetId);
        return asset ? asset.fields.file.url : null;
    };

    const imageUrl = getImageUrl();

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // Lock scroll
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return {
            day: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const { day, time } = formatDate(fields.startDateAndTime);

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-image-container">
                    {imageUrl ? (
                        <img src={imageUrl} alt={fields.eventName} className="modal-image" />
                    ) : (
                        <div className="modal-image-placeholder" />
                    )}
                    <div className="modal-category-tag">
                        {fields.eventType}
                    </div>
                </div>

                <div className="modal-details text-white">
                    <div className="modal-header">
                        <h2 className="modal-title">{fields.eventName}</h2>
                        <div className="modal-club">{fields.clubName}</div>
                    </div>

                    <div className="modal-info-grid">
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
                                <div className="info-value">{fields.participationType}</div>
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

                    <div className="modal-description">
                        <h3>About Event</h3>
                        <p>{fields.longDescription || fields.shortDescription}</p>
                    </div>

                    <div className="modal-footer">
                        {fields.specialEvent && (
                            <div className="special-badge">
                                <BadgeCheck size={18} />
                                <span>Flagship Event</span>
                            </div>
                        )}
                        {fields.registrationLink && (
                            <a
                                href={fields.registrationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="register-btn"
                            >
                                Register Now <ExternalLink size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsModal;
