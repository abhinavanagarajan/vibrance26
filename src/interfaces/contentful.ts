export interface ContentfulSys {
    id: string;
    type?: string;
    linkType?: string;
    contentType?: {
        sys: {
            id: string;
        };
    };
}

export interface Asset {
    sys: ContentfulSys;
    fields: {
        title: string;
        file: {
            url: string;
            details?: {
                size: number;
                image: {
                    width: number;
                    height: number;
                };
            };
            fileName: string;
            contentType: string;
        };
    };
}

export interface EventFields {
    eventName: string;
    clubName: string;
    eventType: string;
    poster: {
        sys: ContentfulSys;
    };
    startDateAndTime: string; // ISO string
    endDateAndTime?: string; // ISO string
    pricePerPerson: number;
    participationType: string;
    eventVenue: string;
    shortDescription: string;
    longDescription?: string;
    specialEvent?: boolean;
    registrationLink?: string;
}

export interface EventItem {
    metadata?: {
        tags: any[];
        concepts: any[];
    };
    sys: ContentfulSys;
    fields: EventFields;
}

export interface EventsResponse {
    sys: { type: string };
    total: number;
    skip: number;
    limit: number;
    items: EventItem[];
    includes: {
        Asset: Asset[];
    };
}
