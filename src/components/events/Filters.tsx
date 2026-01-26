import React, { useState, useEffect } from 'react';
import { Calendar, LayoutGrid, Users, DollarSign, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import '../../styles/events.css';

type FilterState = {
    eventType: string[];
    priceRange: number[];
    dates: string[];
    teamSize: string[];
};

interface EventFilterProps {
    onFilterChange: (filters: FilterState) => void;
    availableDates: string[];
}

const EVENT_TYPES = ['VITIAN', 'NON-VITIAN', 'BOTH'];
const TEAM_SIZES = ['Solo', 'Duo', 'Trio', 'Squad', 'Team'];

const EventFilter: React.FC<EventFilterProps> = ({ onFilterChange, availableDates }) => {
    const [filters, setFilters] = useState<FilterState>({
        eventType: [],
        priceRange: [0, 2500],
        dates: [],
        teamSize: [],
    });

    const [isExpanded, setIsExpanded] = useState(true);

    const [collapsed, setCollapsed] = useState({
        date: false,
        type: false,
        size: false,
        price: false
    });

    const toggleCollapse = (section: keyof typeof collapsed) => {
        setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleSelectionChange = (category: keyof FilterState, value: string) => {
        setFilters(prev => {
            const current = prev[category] as string[];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const renderSectionHeader = (title: string, icon: React.ReactNode, sectionKey: keyof typeof collapsed) => (
        <div
            className="filter-title"
            onClick={() => toggleCollapse(sectionKey)}
            style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {icon}
                <span>{title}</span>
            </div>
            <span style={{ transform: collapsed[sectionKey] ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
                ▼
            </span>
        </div>
    );

    return (
        <div className="filters-container">
            <div 
                className="filters-header" 
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={20} color="var(--color-cyan)" />
                    <h2>FILTERS</h2>
                </div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>

            <div className={`filters-content ${isExpanded ? 'expanded ' : 'collapsed'}`}>
                {/* Date Filter */}
                <div className="filter-section">
                    {renderSectionHeader('Date', <Calendar size={18} />, 'date')}
                    {!collapsed.date && (
                        <div className="button-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                            {availableDates.map(date => {
                                const isSelected = filters.dates.includes(date);
                                return (
                                    <button
                                        key={date}
                                        onClick={() => handleSelectionChange('dates', date)}
                                        className={isSelected ? 'filter-btn active' : 'filter-btn'}
                                        style={{
                                            background: isSelected ? 'var(--color-cyan)' : 'rgba(255,255,255,0.05)',
                                            color: isSelected ? 'black' : 'white',
                                            border: `1px solid ${isSelected ? 'var(--color-cyan)' : 'rgba(255,255,255,0.1)'}`,
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-main)',
                                            fontSize: '0.9rem',
                                            textTransform: 'uppercase',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {date}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Event Type Filter */}
                <div className="filter-section">
                    {renderSectionHeader('Event Type', <LayoutGrid size={18} />, 'type')}
                    {!collapsed.type && (
                        <div className="button-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                            {EVENT_TYPES.map(type => {
                                const isSelected = filters.eventType.includes(type);
                                return (
                                    <button
                                        key={type}
                                        onClick={() => handleSelectionChange('eventType', type)}
                                        className={isSelected ? 'filter-btn active' : 'filter-btn'}
                                        style={{
                                            background: isSelected ? 'var(--color-purple)' : 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            border: `1px solid ${isSelected ? 'var(--color-purple)' : 'rgba(255,255,255,0.1)'}`,
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-main)',
                                            fontSize: '0.8rem',
                                            textTransform: 'uppercase',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {type === 'NON-VITIAN' ? 'External' : type === 'VITIAN' ? 'Internal' : 'All'}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Participation Filter */}
                <div className="filter-section">
                    {renderSectionHeader('Participation', <Users size={18} />, 'size')}
                    {!collapsed.size && (
                        <div className="button-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                            {TEAM_SIZES.map(size => {
                                const isSelected = filters.teamSize.includes(size);
                                return (
                                    <button
                                        key={size}
                                        onClick={() => handleSelectionChange('teamSize', size)}
                                        className={isSelected ? 'filter-btn active' : 'filter-btn'}
                                        style={{
                                            background: isSelected ? 'var(--color-pink)' : 'rgba(255,255,255,0.05)',
                                            color: 'white',
                                            border: `1px solid ${isSelected ? 'var(--color-pink)' : 'rgba(255,255,255,0.1)'}`,
                                            padding: '0.5rem 1rem',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-main)',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s'
                                        }}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Price Range Filter */}
                <div className="filter-section">
                    {renderSectionHeader('Price Range', <DollarSign size={18} />, 'price')}
                    {!collapsed.price && (
                        <>
                            <div className="price-display">
                                <span className="current-price">₹{filters.priceRange[0]}</span>
                                <span className="current-price">₹{filters.priceRange[1]}</span>
                            </div>
                            <div className="range-slider-container">
                                <div
                                    className="slider-track"
                                    style={{
                                        left: `${(filters.priceRange[0] / 2500) * 100}%`,
                                        right: `${100 - (filters.priceRange[1] / 2500) * 100}%`
                                    }}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="2500"
                                    step="100"
                                    value={filters.priceRange[0]}
                                    onChange={(e) => {
                                        const val = Math.min(parseInt(e.target.value), filters.priceRange[1] - 100);
                                        setFilters(prev => ({ ...prev, priceRange: [val, prev.priceRange[1]] }));
                                    }}
                                    className="price-slider thumb-z-index-3"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="2500"
                                    step="100"
                                    value={filters.priceRange[1]}
                                    onChange={(e) => {
                                        const val = Math.max(parseInt(e.target.value), filters.priceRange[0] + 100);
                                        setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], val] }));
                                    }}
                                    className="price-slider thumb-z-index-4"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventFilter;