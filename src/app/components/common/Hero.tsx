'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';
import {
    MapPinIcon,
    ClockIcon,
    CurrencyDollarIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';

const Hero: React.FC = () => {
    const router = useRouter();

    const features = [
        {
            icon: MapPinIcon,
            title: 'Smart Destinations',
            description: 'AI-curated locations based on your preferences'
        },
        {
            icon: ClockIcon,
            title: 'Instant Planning',
            description: 'Get complete itineraries in seconds'
        },
        {
            icon: CurrencyDollarIcon,
            title: 'Budget Optimization',
            description: 'Plans that fit your budget perfectly'
        },
        {
            icon: SparklesIcon,
            title: 'Personalized Experience',
            description: 'Tailored to your travel style'
        }
    ];

    return (
        <div className="hero min-h-[80vh] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
            <div className="hero-content text-center max-w-6xl px-4">
                <div className="space-y-8">

                    {/* Main Hero Content */}
                    <div className="space-y-6">
                        <div className="flex justify-center mb-6">
                            <div className="text-6xl md:text-8xl animate-bounce">✈️</div>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Plan Your Perfect Trip
                        </h1>

                        <p className="text-lg md:text-xl lg:text-2xl text-base-content/70 max-w-3xl mx-auto">
                            Let AI create personalized travel itineraries just for you.
                            From flights to restaurants, we&apos;ve got your journey covered.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                            <Button
                                size="lg"
                                onClick={() => router.push('/plan-trip')}
                                className="w-full sm:w-auto text-lg px-8 py-4"
                            >
                                Start Planning Now
                                <SparklesIcon className="w-6 h-6 ml-2" />
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => router.push('/about')}
                                className="w-full sm:w-auto text-lg px-8 py-4"
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="card bg-base-100/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    <div className="card-body items-center text-center p-6">
                                        <div className="p-3 bg-primary/10 rounded-full mb-4">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <h3 className="card-title text-lg">{feature.title}</h3>
                                        <p className="text-sm opacity-70">{feature.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Stats Section */}
                    <div className="stats stats-horizontal shadow-lg bg-base-100 mt-12">
                        <div className="stat">
                            <div className="stat-title">Happy Travelers</div>
                            <div className="stat-value text-primary">10K+</div>
                            <div className="stat-desc">And counting</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Destinations</div>
                            <div className="stat-value text-secondary">200+</div>
                            <div className="stat-desc">Worldwide coverage</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">Success Rate</div>
                            <div className="stat-value text-accent">99%</div>
                            <div className="stat-desc">Satisfied customers</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;