'use client';

import React from 'react';
import { TripItinerary } from '../../types/types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import {
    formatDate,
    formatTime,
    formatCurrency,
    getStarRating,
    calculateTripCost,
    getHotelPriceDisplay,
    getDayOrdinal
} from '../../utils/helper';
import {
    PaperAirplaneIcon,
    BuildingOffice2Icon,
    CalendarDaysIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    StarIcon,
    ArrowPathIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

interface ItineraryViewProps {
    tripData: TripItinerary;
    onPlanAnother: () => void;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({
    tripData,
    onPlanAnother
}) => {
    const totalCost = calculateTripCost(
        tripData.flights,
        tripData.hotels,
        tripData.daily_highlights.length,
        30 // Average daily food budget
    );

    // Get primary flight and hotel (first options)
    const primaryFlight = tripData.flights[0];
    const primaryHotel = tripData.hotels[0];

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">

            {/* Header */}
            <div className="text-center space-y-4">
                <div className="flex justify-center items-center space-x-2 text-4xl">
                    <span>🎉</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-primary">
                        Your Perfect Trip to {tripData.destination}
                    </h1>
                    <span>✈️</span>
                </div>
                <p className="text-lg text-base-content/70">
                    {formatDate(tripData.start_date || '')} - {formatDate(tripData.end_date || '')}
                </p>
                <div className="badge badge-primary badge-lg">
                    {tripData.daily_highlights.length} Days Adventure
                </div>
            </div>

            {/* Trip Overview Stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow-xl w-full">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <CurrencyDollarIcon className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Estimated Total Cost</div>
                    <div className="stat-value text-primary">{formatCurrency(totalCost)}</div>
                    <div className="stat-desc">Per person (approximate)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <CalendarDaysIcon className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Duration</div>
                    <div className="stat-value text-secondary">{tripData.daily_highlights.length}</div>
                    <div className="stat-desc">Days of adventure</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-accent">
                        <StarIcon className="w-8 h-8" />
                    </div>
                    <div className="stat-title">Hotel Rating</div>
                    <div className="stat-value text-accent">{primaryHotel.star_rating}★</div>
                    <div className="stat-desc">Premium accommodation</div>
                </div>
            </div>

            {/* Flight Options */}
            <Card
                title="✈️ Flight Options"
                shadow="lg"
                className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20"
            >
                <div className="space-y-4">
                    {tripData.flights.map((flight, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border ${index === 0
                                    ? 'bg-primary/10 border-primary/30'
                                    : 'bg-base-100 border-base-300'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <PaperAirplaneIcon className="w-6 h-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-lg">{flight.airline}</h3>
                                        {index === 0 && (
                                            <span className="badge badge-primary badge-sm">Recommended</span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary">
                                        {flight.estimated_price}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-base-content/70">Departure</p>
                                        <p className="font-bold">{flight.departure.airport}</p>
                                        <p className="text-sm flex items-center justify-center space-x-1">
                                            <ClockIcon className="w-4 h-4" />
                                            <span>{formatTime(flight.departure.time)}</span>
                                        </p>
                                        <p className="text-xs text-base-content/60">
                                            {formatDate(flight.departure.date)}
                                        </p>
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="text-2xl">✈️</div>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-base-content/70">Arrival</p>
                                        <p className="font-bold">{flight.arrival.airport}</p>
                                        <p className="text-sm flex items-center justify-center space-x-1">
                                            <ClockIcon className="w-4 h-4" />
                                            <span>{formatTime(flight.arrival.time)}</span>
                                        </p>
                                        <p className="text-xs text-base-content/60">
                                            {formatDate(flight.arrival.date)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Hotel Options */}
            <Card
                title="🏨 Accommodation Options"
                shadow="lg"
                className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {tripData.hotels.map((hotel, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border ${index === 0
                                    ? 'bg-secondary/10 border-secondary/30'
                                    : 'bg-base-100 border-base-300'
                                }`}
                        >
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <BuildingOffice2Icon className="w-6 h-6 text-secondary" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-yellow-500">
                                                {getStarRating(hotel.star_rating)}
                                            </span>
                                            <span className="text-sm text-base-content/70">
                                                ({hotel.star_rating} Star)
                                            </span>
                                        </div>
                                        {index === 0 && (
                                            <span className="badge badge-secondary badge-sm mt-1">
                                                Recommended
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-base-content/70">Price Range</p>
                                    <p className="text-xl font-bold text-secondary">
                                        {getHotelPriceDisplay(hotel.price_per_night)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Daily Itinerary */}
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        📅 Daily Highlights
                    </h2>
                    <p className="text-base-content/70">Your day-by-day adventure guide</p>
                </div>

                <div className="space-y-4">
                    {tripData.daily_highlights.map((day, index) => (
                        <Card
                            key={day.day}
                            shadow="md"
                            hoverable
                            className={`transition-all duration-300 ${index % 2 === 0
                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
                                : 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                                }`}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Day Info */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="badge badge-primary badge-lg">
                                            Day {day.day}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-primary">
                                        {getDayOrdinal(day.day)} Day Highlight
                                    </h3>

                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-sm text-base-content/70">
                                            Places to Visit:
                                        </h4>
                                        <div className="flex items-center space-x-2 text-sm">
                                            <MapPinIcon className="w-4 h-4 text-accent" />
                                            <span>{day.place}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Restaurant Info */}
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-base flex items-center space-x-2">
                                        <span>🍽️</span>
                                        <span>Featured Restaurant</span>
                                    </h4>
                                    <div className="space-y-1">
                                        <p className="font-bold text-secondary">{day.restaurant.name}</p>
                                        <p className="text-sm text-base-content/70">{day.restaurant.specialty}</p>
                                    </div>
                                </div>

                                {/* Day Number Circle */}
                                <div className="flex justify-center lg:justify-end items-center">
                                    <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold">{day.day}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button
                    size="lg"
                    onClick={onPlanAnother}
                    className="w-full sm:w-auto px-8"
                >
                    <ArrowPathIcon className="w-5 h-5 mr-2" />
                    Plan Another Trip
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-8"
                >
                    📄 Print Itinerary
                </Button>

                <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => navigator.share?.({
                        title: `My trip to ${tripData.destination}`,
                        text: `Check out my amazing trip itinerary!`
                    })}
                    className="w-full sm:w-auto px-8"
                >
                    📱 Share Trip
                </Button>
            </div>
        </div>
    );
};

export default ItineraryView;