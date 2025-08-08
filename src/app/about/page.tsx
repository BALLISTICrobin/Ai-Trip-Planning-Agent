'use client';

import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import {
    SparklesIcon,
    GlobeAltIcon,
    UserGroupIcon,
    LightBulbIcon,
    ShieldCheckIcon,
    HeartIcon
} from '@heroicons/react/24/outline';

export default function AboutPage() {
    const features = [
        {
            icon: SparklesIcon,
            title: 'AI-Powered Planning',
            description: 'Our advanced AI algorithms analyze thousands of travel options to create the perfect itinerary tailored to your preferences and budget.'
        },
        {
            icon: GlobeAltIcon,
            title: 'Global Coverage',
            description: 'From bustling cities to hidden gems, we cover 200+ destinations worldwide with detailed local insights and recommendations.'
        },
        {
            icon: UserGroupIcon,
            title: 'Personalized Experience',
            description: 'Every traveler is unique. We consider your interests, budget, and travel style to create truly personalized adventures.'
        },
        {
            icon: LightBulbIcon,
            title: 'Smart Recommendations',
            description: 'Get intelligent suggestions for flights, accommodations, restaurants, and activities based on real traveler reviews and data.'
        },
        {
            icon: ShieldCheckIcon,
            title: 'Trusted & Reliable',
            description: 'Our recommendations are backed by verified data and trusted partners, ensuring quality and reliability for your journey.'
        },
        {
            icon: HeartIcon,
            title: 'Made for Travelers',
            description: 'Built by passionate travelers for fellow adventurers. We understand what makes a trip truly memorable and special.'
        }
    ];

    const stats = [
        { number: '10,000+', label: 'Happy Travelers' },
        { number: '200+', label: 'Destinations' },
        { number: '50,000+', label: 'Trips Planned' },
        { number: '99%', label: 'Success Rate' }
    ];

    return (
        <Layout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <div className="hero min-h-[60vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
                    <div className="hero-content text-center max-w-4xl">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                About TripPlanner
                            </h1>
                            <p className="text-xl md:text-2xl text-base-content/80 max-w-3xl">
                                We're revolutionizing travel planning with AI-powered itineraries that turn your dream destinations into unforgettable adventures.
                            </p>
                            <div className="flex justify-center text-4xl space-x-4 animate-bounce">
                                <span>✈️</span>
                                <span>🌍</span>
                                <span>🎒</span>
                                <span>📸</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="py-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <Card shadow="lg" className="mb-16">
                            <div className="text-center space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Mission</h2>
                                <p className="text-lg text-base-content/80 max-w-4xl mx-auto leading-relaxed">
                                    At TripPlanner, we believe that everyone deserves to explore the world without the stress of complicated planning.
                                    Our mission is to democratize travel by making personalized, intelligent trip planning accessible to all.
                                    We combine cutting-edge AI technology with deep travel expertise to create itineraries that are not just efficient,
                                    but truly magical.
                                </p>
                                <div className="flex justify-center">
                                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                                </div>
                            </div>
                        </Card>

                        {/* Features Grid */}
                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
                                Why Choose TripPlanner?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <Card
                                            key={index}
                                            hoverable
                                            shadow="md"
                                            className="h-full hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="text-center space-y-4">
                                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                                    <Icon className="w-8 h-8 text-primary" />
                                                </div>
                                                <h3 className="text-xl font-bold">{feature.title}</h3>
                                                <p className="text-base-content/70 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
                                Trusted by Thousands
                            </h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <Card key={index} shadow="md" className="text-center">
                                        <div className="space-y-2">
                                            <div className="text-4xl md:text-5xl font-bold text-primary">
                                                {stat.number}
                                            </div>
                                            <div className="text-base-content/70 font-medium">
                                                {stat.label}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* How It Works */}
                        <Card shadow="lg" className="mb-16">
                            <div className="text-center space-y-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-primary text-primary-content rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                                            1
                                        </div>
                                        <h3 className="text-xl font-bold">Tell Us Your Dreams</h3>
                                        <p className="text-base-content/70">
                                            Share your destination, preferences, budget, and travel dates. The more you tell us, the better we can plan!
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-secondary text-secondary-content rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                                            2
                                        </div>
                                        <h3 className="text-xl font-bold">AI Works Its Magic</h3>
                                        <p className="text-base-content/70">
                                            Our AI analyzes millions of data points to create a personalized itinerary with flights, hotels, and activities.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-accent text-accent-content rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                                            3
                                        </div>
                                        <h3 className="text-xl font-bold">Start Your Adventure</h3>
                                        <p className="text-base-content/70">
                                            Receive your complete itinerary in seconds and embark on the trip of a lifetime!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Call to Action */}
                        <div className="text-center">
                            <Card shadow="xl" className="bg-gradient-to-r from-primary/10 to-secondary/10">
                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                        Ready to Plan Your Next Adventure?
                                    </h2>
                                    <p className="text-lg text-base-content/80">
                                        Join thousands of happy travelers and let AI create your perfect itinerary today!
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            className="btn btn-primary btn-lg"
                                            onClick={() => window.location.href = '/PlanTrip'}
                                        >
                                            Start Planning Now
                                            <SparklesIcon className="w-6 h-6 ml-2" />
                                        </button>
                                        <button className="btn btn-outline btn-lg">
                                            Contact Us
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}