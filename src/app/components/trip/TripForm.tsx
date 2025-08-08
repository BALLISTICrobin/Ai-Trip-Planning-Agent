'use client';

import React, { useState } from 'react';
import { TripFormData } from '../../types/types';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Card from '../ui/Card';
import {
    CalendarIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    HeartIcon,
    ClockIcon
} from '@heroicons/react/24/outline';

interface TripFormProps {
    onSubmit: (formData: TripFormData) => Promise<void>;
    isLoading: boolean;
    validationErrors: string[];
}

const TripForm: React.FC<TripFormProps> = ({
    onSubmit,
    isLoading,
    validationErrors
}) => {
    const [formData, setFormData] = useState<TripFormData>({
        start_date: '',
        days: 7,
        current_location: '',
        destination: '',
        budget: 'mid-range',
        preferences: ''
    });

    const budgetOptions = [
        { value: 'budget' as const, label: 'Budget-Friendly', icon: '💰', description: 'Affordable options' },
        { value: 'mid-range' as const, label: 'Mid-Range', icon: '🏨', description: 'Comfortable experience' },
        { value: 'luxury' as const, label: 'Luxury', icon: '⭐', description: 'Premium experience' }
    ];

    const popularDestinations = [
        'Thailand', 'Japan', 'Italy', 'France', 'Spain', 'Greece',
        'Maldives', 'Dubai', 'Singapore', 'South Korea', 'Indonesia', 'Turkey'
    ];

    const preferenceOptions = [
        'Cultural', 'Adventure', 'Relaxation', 'Foodie', 'Nature', 'Shopping',
        'History', 'Beach', 'City', 'Mountains', 'Photography', 'Nightlife'
    ];

    const handleInputChange = (field: keyof TripFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    const handleDestinationSelect = (destination: string) => {
        setFormData(prev => ({ ...prev, destination }));
    };

    const togglePreference = (preference: string) => {
        const currentPrefs = formData.preferences.split(', ').filter(p => p.trim());
        const isSelected = currentPrefs.includes(preference);

        let newPrefs;
        if (isSelected) {
            newPrefs = currentPrefs.filter(p => p !== preference);
        } else {
            newPrefs = [...currentPrefs, preference];
        }

        setFormData(prev => ({ ...prev, preferences: newPrefs.join(', ') }));
    };

    // Get tomorrow's date as minimum
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // ...existing code...
    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card
                title="Plan Your Perfect Trip"
                subtitle="Tell us about your dream vacation and let AI create the perfect itinerary"
                shadow="xl"
                className="mb-8"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* ...rest of the existing form code remains the same... */}

                    {/* Validation Errors */}
                    {validationErrors.length > 0 && (
                        <div className="alert alert-error">
                            <ul className="list-disc list-inside">
                                {validationErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Trip Dates & Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Start Date"
                            type="date"
                            value={formData.start_date}
                            onChange={(e) => handleInputChange('start_date', e.target.value)}
                            required
                            min={getTomorrowDate()}
                            helperText="When do you want to start your trip?"
                        />

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium flex items-center">
                                    <ClockIcon className="w-5 h-5 mr-2" />
                                    Trip Duration *
                                </span>
                            </label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="range"
                                    min="1"
                                    max="30"
                                    value={formData.days}
                                    onChange={(e) => handleInputChange('days', parseInt(e.target.value))}
                                    className="range range-primary flex-1"
                                />
                                <div className="badge badge-primary badge-lg">
                                    {formData.days} day{formData.days > 1 ? 's' : ''}
                                </div>
                            </div>
                            <label className="label">
                                <span className="label-text-alt opacity-70">Slide to adjust duration</span>
                            </label>
                        </div>
                    </div>

                    {/* Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Current Location"
                            placeholder="e.g., New York, USA"
                            value={formData.current_location}
                            onChange={(e) => handleInputChange('current_location', e.target.value)}
                            required
                            helperText="Where will you be traveling from?"
                        />

                        <div className="form-control w-full">
                            <Input
                                label="Destination"
                                placeholder="e.g., Paris, France"
                                value={formData.destination}
                                onChange={(e) => handleInputChange('destination', e.target.value)}
                                required
                                helperText="Where do you want to go?"
                            />

                            {/* Popular Destinations */}
                            <div className="mt-2">
                                <label className="label">
                                    <span className="label-text-alt opacity-70">Popular destinations:</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {popularDestinations.map((dest) => (
                                        <button
                                            key={dest}
                                            type="button"
                                            onClick={() => handleDestinationSelect(dest)}
                                            className={`btn btn-xs ${formData.destination === dest ? 'btn-primary' : 'btn-outline'
                                                }`}
                                        >
                                            {dest}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget Selection */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium flex items-center">
                                <CurrencyDollarIcon className="w-5 h-5 mr-2" />
                                Budget Preference *
                            </span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {budgetOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className={`card cursor-pointer transition-all duration-200 ${formData.budget === option.value
                                        ? 'bg-primary text-primary-content shadow-lg scale-105'
                                        : 'bg-base-200 hover:bg-base-300'
                                        }`}
                                    onClick={() => handleInputChange('budget', option.value)}
                                >
                                    <div className="card-body items-center text-center p-4">
                                        <div className="text-2xl mb-2">{option.icon}</div>
                                        <h3 className="card-title text-sm">{option.label}</h3>
                                        <p className="text-xs opacity-70">{option.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium flex items-center">
                                <HeartIcon className="w-5 h-5 mr-2" />
                                Travel Preferences *
                            </span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {preferenceOptions.map((preference) => {
                                const isSelected = formData.preferences.includes(preference);
                                return (
                                    <button
                                        key={preference}
                                        type="button"
                                        onClick={() => togglePreference(preference)}
                                        className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'
                                            }`}
                                    >
                                        {preference}
                                    </button>
                                );
                            })}
                        </div>
                        <label className="label">
                            <span className="label-text-alt opacity-70">
                                Selected: {formData.preferences || 'None selected'}
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="card-actions justify-center pt-4">
                        <Button
                            type="submit"
                            size="lg"
                            loading={isLoading}
                            disabled={isLoading}
                            className="w-full md:w-auto px-12"
                        >
                            {isLoading ? 'Planning Your Trip...' : 'Create My Itinerary'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default TripForm;