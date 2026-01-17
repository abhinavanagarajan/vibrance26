import React, { useState, useEffect } from 'react';
import { Calendar, LayoutGrid, Users, DollarSign, Filter } from 'lucide-react';
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

const EVENT_TYPES = ['DANCE', 'MUSIC', 'DRAMATICS', 'LITERARY', 'GAMING', 'FINE ARTS', 'TECHNICAL'];
const TEAM_SIZES = ['Solo', 'Team']; // Simplified matching

const EventFilter: React.FC<EventFilterProps> = ({ onFilterChange, availableDates }) => {
    const [filters, setFilters] = useState<FilterState>({
        eventType: [],
        priceRange: [0, 2500],
        dates: [],
        teamSize: [],
    });

    const handleCheckboxChange = (category: keyof FilterState, value: string) => {
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

    return (
        <div className="filters-container">
            <div className="filters-header">
                <Filter size={20} color="var(--color-cyan)" />
                <h2>FILTERS</h2>
            </div>

            <div className="filter-section">
                <div className="filter-title">
                    <Calendar size={18} />
                    <span>Date</span>
                </div>
                <div className="checkbox-group">
                    {availableDates.map(date => (
                        <label key={date} className="checkbox-label">
                            <input
                                type="checkbox"
                                className="hidden-checkbox"
                                checked={filters.dates.includes(date)}
                                onChange={() => handleCheckboxChange('dates', date)}
                            />
                            <div className="custom-checkbox" />
                            <span className="checkbox-text">{date}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-title">
                    <LayoutGrid size={18} />
                    <span>Event Type</span>
                </div>
                <div className="checkbox-group">
                    {EVENT_TYPES.map(type => (
                        <label key={type} className="checkbox-label">
                            <input
                                type="checkbox"
                                className="hidden-checkbox"
                                checked={filters.eventType.includes(type)}
                                onChange={() => handleCheckboxChange('eventType', type)}
                            />
                            <div className="custom-checkbox" />
                            <span className="checkbox-text">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-title">
                    <Users size={18} />
                    <span>Participation</span>
                </div>
                <div className="checkbox-group">
                    {TEAM_SIZES.map(size => (
                        <label key={size} className="checkbox-label">
                            <input
                                type="checkbox"
                                className="hidden-checkbox"
                                checked={filters.teamSize.includes(size)}
                                onChange={() => handleCheckboxChange('teamSize', size)}
                            />
                            <div className="custom-checkbox" />
                            <span className="checkbox-text">{size}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <div className="filter-title">
                    <DollarSign size={18} />
                    <span>Price Range</span>
                </div>
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
            </div>
        </div>
    );
};

export default EventFilter;
