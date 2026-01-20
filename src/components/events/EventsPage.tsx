import { useState, useMemo, useCallback } from "react";
import EventsList from "./EventsList";
import EventFilter from "./Filters";
import Pagination from "./Pagination";
import EventDetailsModal from "./EventDetailsModal";
import { Asset, EventItem } from "@/interfaces/contentful";
import '../../styles/events.css';

type FilterState = {
    eventType: string[];
    priceRange: number[];
    dates: string[];
    teamSize: string[];
};

const EVENTS_PER_PAGE = 5;

const formatDateForFilter = (isoString: string): string => {
    const dateObj = new Date(isoString);
    const day = dateObj.toLocaleDateString("en-US", {
        day: "numeric",
        timeZone: "UTC", // Use UTC to avoid timezone shifts on dates
    });
    const month = dateObj
        .toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
        .toUpperCase();

    return `${day} ${month}`;
};

interface EventsPageProps {
    eventData: EventItem[];
    assetData: Asset[];
}

const EventsPage = ({ eventData, assetData }: EventsPageProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

    const { uniqueDates, dateMap } = useMemo(() => {
        const staticDates = ["18 FEB", "19 FEB", "20 FEB", "21 FEB"];

        const staticDateMap: Record<string, string> = {
            "18 FEB": "2026-02-18",
            "19 FEB": "2026-02-19",
            "20 FEB": "2026-02-20",
            "21 FEB": "2026-02-21",
        };

        return { uniqueDates: staticDates, dateMap: staticDateMap };
    }, []);

    const [filters, setFilters] = useState<FilterState>({
        eventType: [],
        priceRange: [0, 2500],
        dates: [],
        teamSize: [],
    });

    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }, []);

    const handleSearchChange = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleEventClick = (event: EventItem) => {
        setSelectedEvent(event);
    };

    const filteredEvents = useMemo(() => {
        return eventData.filter((event) => {
            const searchMatch =
                event.fields.eventName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                event.fields.clubName.toLowerCase().includes(searchTerm.toLowerCase());
            const eventTypeMatch =
                filters.eventType.length === 0 ||
                filters.eventType.includes(event.fields.eventFor.toUpperCase());
            const priceMatch =
                event.fields.pricePerPerson >= filters.priceRange[0] &&
                event.fields.pricePerPerson <= filters.priceRange[1];
            const teamSizeMatch =
                filters.teamSize.length === 0 ||
                filters.teamSize.some((size) =>
                    event.fields.participationType.includes(size) // Changed to simple includes for my dummy matching
                );
            const dateMatch =
                filters.dates.length === 0 ||
                filters.dates
                    .map((dateLabel) => dateMap[dateLabel])
                    .includes(event.fields.startDateAndTime.substring(0, 10));
            return (
                searchMatch &&
                eventTypeMatch &&
                priceMatch &&
                teamSizeMatch &&
                dateMatch
            );
        });
    }, [searchTerm, filters, eventData, dateMap]);

    const currentEvents = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * EVENTS_PER_PAGE;
        const lastPageIndex = firstPageIndex + EVENTS_PER_PAGE;
        return filteredEvents.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredEvents]);

    return (
        <>
            <div className="events-page-container">
                <div className="filters-sidebar">
                    <EventFilter
                        onFilterChange={handleFilterChange}
                        availableDates={uniqueDates}
                    />
                </div>
                <div className="events-main">
                    <EventsList
                        events={currentEvents}
                        assets={assetData}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        onEventClick={handleEventClick}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalCount={filteredEvents.length}
                        pageSize={EVENTS_PER_PAGE}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>
            {selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    assets={assetData}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </>
    );
};

export default EventsPage;
