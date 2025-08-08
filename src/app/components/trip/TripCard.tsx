'use client';

import React from 'react';
import { TripItinerary } from '../../types/types';
import Card from '../ui/Card';
import { formatDate, formatCurrency, getStarRating, calculateTripCost, formatTime } from '../../utils/helper';
import {
    CalendarDaysIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    StarIcon,
    ClockIcon,
    EyeIcon,
    TrashIcon,
    ShareIcon
} from '@heroicons/react/24/outline';

interface TripCardProps {
    trip: TripItinerary;
    onView?: () => void;
    onDelete?: () => void;
    onShare?: () => void;
    compact?: boolean;
    className?: string;
}

const TripCard: React.FC<TripCardProps> = ({
    trip,
    onView,
    onDelete,
    onShare,
    compact = false,
    className = ''
}) => {
    const tripDuration = trip.daily_highlights.length;
    // Calculate total cost using the helper function
    const totalEstimatedCost = calculateTripCost(
        trip.flights,
        trip.hotels,
        tripDuration,
        30 // Average daily food budget
    );

    // Get primary options (first in arrays)
    const primaryFlight = trip.flights[0];
    const primaryHotel = trip.hotels[0];

    if (compact) {
        return (
            <Card
                hoverable
                shadow="md"
                className={`transition-all duration-300 hover:shadow-xl ${className}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="text-3xl">✈️</div>
                        <div>
                            <h3 className="font-bold text-lg">{trip.destination}</h3>
                            <p className="text-sm text-base-content/70">
                                {formatDate(trip.start_date || '')} • {tripDuration} days
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-primary">{formatCurrency(totalEstimatedCost)}</p>
                        <div className="flex space-x-2">
                            {onView && (
                                <button onClick={onView} className="btn btn-xs btn-ghost">
                                    <EyeIcon className="w-4 h-4" />
                                </button>
                            )}
                            {onShare && (
                                <button onClick={onShare} className="btn btn-xs btn-ghost">
                                    <ShareIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card
            hoverable
            shadow="lg"
            className={`transition-all duration-300 hover:shadow-xl ${className}`}
        >
            <div className="space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="text-4xl">🌍</div>
                        <div>
                            <h2 className="text-2xl font-bold text-primary">{trip.destination}</h2>
                            <p className="text-base-content/70 flex items-center">
                                <CalendarDaysIcon className="w-4 h-4 mr-1" />
                                {formatDate(trip.start_date || '')} - {formatDate(trip.end_date || '')}
                            </p>
                        </div>
                    </div>
                    <div className="badge badge-primary badge-lg">
                        {tripDuration} Days
                    </div>
                </div>

                {/* Trip Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="stat bg-base-200/50 rounded-lg p-3">
                        <div className="stat-figure text-primary">
                            <CurrencyDollarIcon className="w-6 h-6" />
                        </div>
                        <div className="stat-title text-xs">Total Cost</div>
                        <div className="stat-value text-lg text-primary">
                            {formatCurrency(totalEstimatedCost)}
                        </div>
                    </div>

                    <div className="stat bg-base-200/50 rounded-lg p-3">
                        <div className="stat-figure text-secondary">
                            <StarIcon className="w-6 h-6" />
                        </div>
                        <div className="stat-title text-xs">Hotel</div>
                        <div className="stat-value text-lg text-secondary">
                            {primaryHotel.star_rating}★
                        </div>
                    </div>

                    <div className="stat bg-base-200/50 rounded-lg p-3">
                        <div className="stat-figure text-accent">
                            <ClockIcon className="w-6 h-6" />
                        </div>
                        <div className="stat-title text-xs">Duration</div>
                        <div className="stat-value text-lg text-accent">
                            {tripDuration}d
                        </div>
                    </div>

                    <div className="stat bg-base-200/50 rounded-lg p-3">
                        <div className="stat-figure text-info">
                            <MapPinIcon className="w-6 h-6" />
                        </div>
                        <div className="stat-title text-xs">Flights</div>
                        <div className="stat-value text-sm text-info">
                            {trip.flights.length} options
                        </div>
                    </div>
                </div>

                {/* Quick Preview */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Trip Highlights</h3>

                    {/* Flight */}
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl">✈️</div>
                        <div className="flex-1">
                            <p className="font-medium">{primaryFlight.airline}</p>
                            <p className="text-sm text-base-content/70">
                                {primaryFlight.departure.airport} → {primaryFlight.arrival.airport}
                            </p>
                            <p className="text-xs text-base-content/50">
                                {formatTime(primaryFlight.departure.time)} - {formatTime(primaryFlight.arrival.time)}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-primary">{primaryFlight.estimated_price}</p>
                        </div>
                    </div>

                    {/* Hotel */}
                    <div className="flex items-center space-x-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <div className="text-2xl">🏨</div>
                        <div className="flex-1">
                            <p className="font-medium">{primaryHotel.name}</p>
                            <p className="text-sm text-base-content/70">
                                {getStarRating(primaryHotel.star_rating)} • Premium Hotel
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-secondary">
                                {primaryHotel.price_per_night}/night
                            </p>
                        </div>
                    </div>

                    {/* Sample Day */}
                    {trip.daily_highlights[0] && (
                        <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl">🗓️</div>
                            <div className="flex-1">
                                <p className="font-medium">Day 1: {trip.daily_highlights[0].place}</p>
                                <p className="text-sm text-base-content/70">
                                    {trip.daily_highlights[0].restaurant.name}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-base-300">
                    {onView && (
                        <button
                            onClick={onView}
                            className="btn btn-primary btn-sm flex-1 min-w-0"
                        >
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View Full Itinerary
                        </button>
                    )}

                    {onShare && (
                        <button
                            onClick={onShare}
                            className="btn btn-outline btn-sm"
                        >
                            <ShareIcon className="w-4 h-4 mr-1" />
                            Share
                        </button>
                    )}

                    {onDelete && (
                        <button
                            onClick={onDelete}
                            className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default TripCard;