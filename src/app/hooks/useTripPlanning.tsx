'use client';

import { useState, useCallback } from 'react';
import { TripFormData, ApiResponse, TripItinerary } from '../types/types';
import { planTrip } from '../utils/api'; // Only import real API
import { validateTripForm } from '../utils/helper';

interface UseTripPlanningReturn {
    // State
    isLoading: boolean;
    error: string | null;
    tripData: TripItinerary | null;
    validationErrors: string[];

    // Actions
    submitTripPlan: (formData: TripFormData) => Promise<void>;
    clearError: () => void;
    clearTripData: () => void;
    resetAll: () => void;
}

export const useTripPlanning = (): UseTripPlanningReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tripData, setTripData] = useState<TripItinerary | null>(null);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const submitTripPlan = useCallback(async (formData: TripFormData) => {
        // Reset previous states
        setError(null);
        setValidationErrors([]);
        setTripData(null);

        // Validate form data
        const validation = validateTripForm(formData);
        if (!validation.isValid) {
            setValidationErrors(validation.errors);
            return;
        }

        setIsLoading(true);

        try {
            console.log('Submitting trip plan:', formData);

            // Only use real API - no mock API
            const response: ApiResponse = await planTrip(formData);

            console.log('Received response:', response);
            setTripData(response.output);
        } catch (err) {
            console.error('Trip planning error:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
        setValidationErrors([]);
    }, []);

    const clearTripData = useCallback(() => {
        setTripData(null);
    }, []);

    const resetAll = useCallback(() => {
        setIsLoading(false);
        setError(null);
        setTripData(null);
        setValidationErrors([]);
    }, []);

    return {
        isLoading,
        error,
        tripData,
        validationErrors,
        submitTripPlan,
        clearError,
        clearTripData,
        resetAll,
    };
};

export default useTripPlanning;