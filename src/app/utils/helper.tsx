// Format date to readable string
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Format time from 24-hour format to 12-hour format
export const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
};

// Format currency - handle string prices from backend
export const formatCurrency = (amount: string | number, currency: string = 'USD'): string => {
    // If it's already a formatted string with currency symbol, return as is
    if (typeof amount === 'string' && (amount.includes('$') || amount.includes('₹') || amount.includes('€') || amount.includes('BDT'))) {
        return amount;
    }

    // Convert to number if it's a string number
    const numericAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, "")) : amount;

    if (isNaN(numericAmount)) {
        return amount.toString(); // Return original string if can't parse
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(numericAmount);
};

// Calculate total trip cost - updated for new structure with flight and hotel arrays
export const calculateTripCost = (
    flights: any[],
    hotels: any[],
    days: number,
    dailyFoodBudget: number = 30
): number => {
    // Use the first (presumably cheapest) flight option
    const flightCost = flights.length > 0 ?
        parseFloat(flights[0].estimated_price.replace(/[^0-9.-]+/g, "")) || 0 : 0;

    // Use the first hotel option
    const hotelCostPerNight = hotels.length > 0 && hotels[0].price_per_night !== 'mid-range' ?
        parseFloat(hotels[0].price_per_night.toString().replace(/[^0-9.-]+/g, "")) || 0 : 150; // Default for mid-range

    const hotelTotal = hotelCostPerNight * days;
    const foodTotal = dailyFoodBudget * days;
    return flightCost + hotelTotal + foodTotal;
};

// Get star rating display - handle number rating
export const getStarRating = (rating: string | number): string => {
    let numRating: number;
    if (typeof rating === 'string') {
        const match = rating.match(/(\d+)/);
        numRating = match ? parseInt(match[1]) : 5;
    } else {
        numRating = rating;
    }

    const fullStars = '★'.repeat(Math.floor(numRating));
    const emptyStars = '☆'.repeat(5 - Math.floor(numRating));
    return fullStars + emptyStars;
};

// Get hotel price display for mid-range
export const getHotelPriceDisplay = (pricePerNight: string): string => {
    if (pricePerNight === 'mid-range') {
        return '$150/night'; // Default mid-range price
    }
    return pricePerNight;
};

// Format flight duration (if needed later)
export const calculateFlightDuration = (departureTime: string, arrivalTime: string): string => {
    // This is a simple calculation - you might want to make it more sophisticated
    const [depHours, depMinutes] = departureTime.split(':').map(Number);
    const [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);

    let durationMinutes = (arrHours * 60 + arrMinutes) - (depHours * 60 + depMinutes);

    // Handle next day arrivals
    if (durationMinutes < 0) {
        durationMinutes += 24 * 60;
    }

    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return `${hours}h ${minutes}m`;
};

// Rest of helper functions remain the same...
export const validateTripForm = (formData: any): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formData.start_date) {
        errors.push('Start date is required');
    } else {
        const startDate = new Date(formData.start_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (startDate < today) {
            errors.push('Start date cannot be in the past');
        }
    }

    if (!formData.days || formData.days < 1) {
        errors.push('Trip duration must be at least 1 day');
    } else if (formData.days > 30) {
        errors.push('Trip duration cannot exceed 30 days');
    }

    if (!formData.current_location?.trim()) {
        errors.push('Current location is required');
    }

    if (!formData.destination?.trim()) {
        errors.push('Destination is required');
    }

    if (!formData.budget) {
        errors.push('Budget preference is required');
    }

    if (!formData.preferences?.trim()) {
        errors.push('Travel preferences are required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Get budget display text
export const getBudgetDisplayText = (budget: string): string => {
    const budgetMap: { [key: string]: string } = {
        'budget': 'Budget-Friendly',
        'mid-range': 'Mid-Range',
        'luxury': 'Luxury Experience'
    };
    return budgetMap[budget] || budget;
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

// Get day ordinal (1st, 2nd, 3rd, etc.)
export const getDayOrdinal = (day: number | string): string => {
    const dayNum = typeof day === 'string' ? parseInt(day) : day;
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = dayNum % 100;
    return dayNum + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
};