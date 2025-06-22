export interface LL2ListResponse<T> {
    count: number; // Total number of results
    next: string | null; // URL for the next page of results
    previous: string | null; // URL for the previous page of results
    results: T[]; // The array of actual data items (e.g., array of LaunchListItem)
}

// Interface for a simplified Launch item, suitable for display in the list view (left column)
export interface LaunchListItem {
    id: string; // Launch Library 2 uses UUIDs (strings) for many IDs
    name: string; // The primary name of the launch
    net: string; // "No Earlier Than" date/time (ISO 8601 string)
    status: { // Information about the launch status
        id: number;
        name: string;
        description: string; // A longer description of the status
    };
    launch_service_provider: {
        id: number;
        url: string;
        name: string;
        type: string; // "Commercial", "Government", etc.
    };
    image?: string; // Optional URL to an image related to the launch
}

// Interface for a detailed Launch item, suitable for display in the detail view (right column)
// It extends LaunchListItem, meaning it includes all properties from LaunchListItem
// plus additional detailed information.
export interface LaunchDetail extends LaunchListItem {
    slug: string; // A URL-friendly identifier
    url: string; // API URL for this specific launch
    hashtag: string | null; // Related hashtag
    orbital_launch_attempt_count: number;
    mission?: {
        id: number;
        name: string;
        description: string;
        type: string;
        orbit?: { // Details about the target orbit
            id: number;
            name: string;
            abbrev: string;
        };
    };
    // Pad details - where the launch takes place
    pad?: {
        id: number;
        url: string;
        agency_id: number | null;
        name: string;
        info_url: string | null;
        wiki_url: string | null;
        map_url: string;
        latitude: string;
        longitude: string;
        location: {
            id: number;
            url: string;
            name: string; // Name of the launch pad location
            country_code: string;
            map_image: string;
            total_launch_count: number;
            total_landing_count: number;
        };
        total_launch_count: number;
    };
    // Rocket details
    rocket?: {
        id: number;
        configuration: { // Configuration of the rocket used
            id: number;
            launch_library_id: number;
            url: string;
            name: string;
            family: string;
            full_name: string; // Eg: xyz Block V
            variant: string;
        };
    };
}

// Interface for an Astronaut item
export interface Astronaut {
    id: number;
    name: string;
    status: { id: number; name: string; };
    type: { id: number; name: string; };
    age: number;
    agency: { id: number; name: string; };
    bio: string;
    profile_image: string; // URL to profile image
}

// Interface for a Spacecraft item
export interface Spacecraft {
    id: number;
    url: string;
    name: string;
    serial_number: string;
    status: { id: number; name: string; };
    description: string;
    spacecraft_config: {
        id: number;
        url: string;
        name: string;
        type: { id: number; name: string; };
        agency: { id: number; name: string; };
    };
}
