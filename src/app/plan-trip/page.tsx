'use client';

import React from 'react';
import Layout from '../components/layout/Layout';
import TripForm from '../components/trip/TripForm';
import ItineraryView from '../components/trip/ItineraryView';
import LoadingSpinner from '../components/common/LoadingSpinner';
import useTripPlanning from '../hooks/useTripPlanning';

export default function PlanTripPage() {
    const {
        isLoading,
        error,
        tripData,
        validationErrors,
        submitTripPlan,
        clearError,
        resetAll,
    } = useTripPlanning();

    const handlePlanAnother = () => {
        resetAll();
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-100">
                <div className="container mx-auto py-8">

                    {/* Header - Only show when not displaying results */}
                    {!tripData && (
                        <div className="text-center mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                                Plan Your Next Adventure
                            </h1>
                            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                                Fill out the form below and let our AI create a personalized itinerary just for you
                            </p>
                            <div className="badge badge-info badge-outline mt-2">
                                <span className="text-xs">Powered by Spring Boot AI Agent</span>
                            </div>
                        </div>
                    )}

                    {/* Error Display */}
                    {error && (
                        <div className="max-w-4xl mx-auto mb-6 px-6">
                            <div className="alert alert-error">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="flex-1">
                                    <h3 className="font-bold">Unable to Plan Trip</h3>
                                    <div className="text-xs">{error}</div>
                                    {error.includes('server not found') && (
                                        <div className="text-xs mt-1">
                                            Please make sure your Spring Boot server is running on http://localhost:8080
                                        </div>
                                    )}
                                </div>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={clearError}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-base-100 rounded-2xl p-8 max-w-md">
                                <LoadingSpinner
                                    size="large"
                                    message="AI Agent is analyzing your preferences and creating your perfect itinerary..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Trip Form */}
                    {!tripData && !isLoading && (
                        <TripForm
                            onSubmit={submitTripPlan}
                            isLoading={isLoading}
                            validationErrors={validationErrors}
                        />
                    )}

                    {/* Trip Results */}
                    {tripData && !isLoading && (
                        <ItineraryView
                            tripData={tripData}
                            onPlanAnother={handlePlanAnother}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}