'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface Destination {
    name: string;
    country: string;
    continent: string;
    popular: boolean;
    description?: string;
}

interface DestinationSearchProps {
    value: string;
    onChange: (destination: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
}

const DestinationSearch: React.FC<DestinationSearchProps> = ({
    value,
    onChange,
    placeholder = "Where do you want to go?",
    required = false,
    error,
    helperText
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(value);
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    // Popular destinations database
    const destinations: Destination[] = [
        // Asia
        { name: 'Tokyo', country: 'Japan', continent: 'Asia', popular: true, description: 'Modern metropolis with ancient culture' },
        { name: 'Bangkok', country: 'Thailand', continent: 'Asia', popular: true, description: 'Street food paradise and cultural hub' },
        { name: 'Singapore', country: 'Singapore', continent: 'Asia', popular: true, description: 'Garden city with world-class attractions' },
        { name: 'Seoul', country: 'South Korea', continent: 'Asia', popular: true, description: 'K-culture and technology center' },
        { name: 'Bali', country: 'Indonesia', continent: 'Asia', popular: true, description: 'Tropical paradise with rich culture' },
        { name: 'Dubai', country: 'UAE', continent: 'Asia', popular: true, description: 'Luxury shopping and modern architecture' },
        { name: 'Hong Kong', country: 'China', continent: 'Asia', popular: true, description: 'East meets West cultural blend' },
        { name: 'Kyoto', country: 'Japan', continent: 'Asia', popular: false, description: 'Traditional temples and gardens' },

        // Europe  
        { name: 'Paris', country: 'France', continent: 'Europe', popular: true, description: 'City of love and lights' },
        { name: 'London', country: 'United Kingdom', continent: 'Europe', popular: true, description: 'Historic city with royal heritage' },
        { name: 'Rome', country: 'Italy', continent: 'Europe', popular: true, description: 'Ancient history and incredible cuisine' },
        { name: 'Barcelona', country: 'Spain', continent: 'Europe', popular: true, description: 'Art, architecture and beaches' },
        { name: 'Amsterdam', country: 'Netherlands', continent: 'Europe', popular: true, description: 'Canals, culture and vibrant nightlife' },
        { name: 'Santorini', country: 'Greece', continent: 'Europe', popular: true, description: 'Stunning sunsets and white architecture' },
        { name: 'Prague', country: 'Czech Republic', continent: 'Europe', popular: false, description: 'Fairy tale architecture' },
        { name: 'Vienna', country: 'Austria', continent: 'Europe', popular: false, description: 'Imperial palaces and classical music' },

        // Americas
        { name: 'New York', country: 'USA', continent: 'North America', popular: true, description: 'The city that never sleeps' },
        { name: 'Los Angeles', country: 'USA', continent: 'North America', popular: true, description: 'Hollywood glamour and beaches' },
        { name: 'Toronto', country: 'Canada', continent: 'North America', popular: false, description: 'Multicultural city with CN Tower' },
        { name: 'Rio de Janeiro', country: 'Brazil', continent: 'South America', popular: true, description: 'Beaches, mountains and carnival' },
        { name: 'Buenos Aires', country: 'Argentina', continent: 'South America', popular: false, description: 'Tango, steaks and European charm' },

        // Oceania
        { name: 'Sydney', country: 'Australia', continent: 'Oceania', popular: true, description: 'Iconic harbor and opera house' },
        { name: 'Auckland', country: 'New Zealand', continent: 'Oceania', popular: false, description: 'Adventure sports and natural beauty' },

        // Africa
        { name: 'Cape Town', country: 'South Africa', continent: 'Africa', popular: true, description: 'Wine lands and Table Mountain' },
        { name: 'Marrakech', country: 'Morocco', continent: 'Africa', popular: true, description: 'Exotic markets and desert adventures' },
    ];

    // Filter destinations based on search term
    useEffect(() => {
        if (searchTerm.length === 0) {
            setFilteredDestinations(destinations.filter(d => d.popular).slice(0, 8));
        } else {
            const filtered = destinations.filter(destination =>
                destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                destination.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                destination.continent.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 10);
            setFilteredDestinations(filtered);
        }
    }, [searchTerm]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        onChange(newValue);
        setIsOpen(true);
    };

    const handleDestinationSelect = (destination: Destination) => {
        const destinationName = `${destination.name}, ${destination.country}`;
        setSearchTerm(destinationName);
        onChange(destinationName);
        setIsOpen(false);
    };

    const getContinentIcon = (continent: string) => {
        const icons: { [key: string]: string } = {
            'Asia': '🏯',
            'Europe': '🏰',
            'North America': '🗽',
            'South America': '🌎',
            'Africa': '🦁',
            'Oceania': '🏄‍♂️'
        };
        return icons[continent] || '🌍';
    };

    return (
        <div className="form-control w-full" ref={searchRef}>
            <label className="label">
                <span className="label-text font-medium flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2" />
                    Destination
                    {required && <span className="text-error ml-1">*</span>}
                </span>
            </label>

            <div className="relative">
                <div className="relative">
                    <input
                        type="text"
                        className={`input input-bordered w-full pl-12 transition-all duration-200 focus:scale-[1.02] ${error ? 'input-error' : ''
                            }`}
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleInputChange}
                        onFocus={() => setIsOpen(true)}
                        required={required}
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 bg-base-100 border border-base-300 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto mt-1">
                        {filteredDestinations.length > 0 ? (
                            <>
                                {searchTerm.length === 0 && (
                                    <div className="p-3 border-b border-base-300">
                                        <h4 className="text-sm font-semibold text-base-content/70 flex items-center">
                                            <GlobeAltIcon className="w-4 h-4 mr-2" />
                                            Popular Destinations
                                        </h4>
                                    </div>
                                )}

                                {filteredDestinations.map((destination, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleDestinationSelect(destination)}
                                        className="w-full p-3 text-left hover:bg-base-200 transition-colors duration-200 border-b border-base-300 last:border-b-0"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <span className="text-2xl mt-1">
                                                {getContinentIcon(destination.continent)}
                                            </span>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-semibold">{destination.name}</span>
                                                    <span className="text-sm text-base-content/60">{destination.country}</span>
                                                    {destination.popular && (
                                                        <span className="badge badge-primary badge-xs">Popular</span>
                                                    )}
                                                </div>
                                                {destination.description && (
                                                    <p className="text-sm text-base-content/70 mt-1">
                                                        {destination.description}
                                                    </p>
                                                )}
                                                <p className="text-xs text-base-content/50 mt-1">
                                                    {destination.continent}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </>
                        ) : (
                            <div className="p-4 text-center text-base-content/70">
                                <GlobeAltIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No destinations found for "{searchTerm}"</p>
                                <p className="text-sm mt-1">Try searching for a city or country name</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {(error || helperText) && (
                <label className="label">
                    <span className={`label-text-alt ${error ? 'text-error' : 'text-base-content/70'}`}>
                        {error || helperText}
                    </span>
                </label>
            )}
        </div>
    );
};

export default DestinationSearch;