export interface TripFormData {
    start_date: string;
    days: number;
    current_location: string;
    destination: string;
    budget: 'budget' | 'mid-range' | 'luxury';
    preferences: string;
}

// Updated to match your new backend response structure
export interface FlightDetails {
    airline: string;
    departure: {
        airport: string;
        time: string;
        date: string;
    };
    arrival: {
        airport: string;
        time: string;
        date: string;
    };
    estimated_price: string;
}

export interface HotelDetails {
    name: string;
    star_rating: number; // Now it's a number instead of string
    price_per_night: string;
    coordinates: {
        lat: number;
        long: number;
    };
}

export interface DailyHighlight {
    day: string; // Now it's a string instead of number
    place: string;
    restaurant: {
        name: string;
        specialty: string;
    };
}

export interface TripItinerary {
    flights: FlightDetails[];      // Array of flights
    hotels: HotelDetails[];        // Array of hotels
    daily_highlights: DailyHighlight[]; // Changed from daily_itinerary
    // These will be derived from form data and response
    start_date?: string;
    end_date?: string;
    destination?: string;
}

export interface ApiResponse {
    output: TripItinerary;
}

export interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}