import React from 'react';
import Link from 'next/link';
import {
    HeartIcon,
    GlobeAltIcon,
    EnvelopeIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Plan Trip', href: '/plan-trip' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const supportLinks = [
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'FAQ', href: '/faq' },
    ];

    return (
        <footer className="footer footer-center bg-base-200 text-base-content p-10 mt-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

                {/* Brand Section */}
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl">✈️</span>
                        <span className="text-2xl font-bold text-primary">TripPlanner</span>
                    </div>
                    <p className="text-center md:text-left text-sm opacity-70 max-w-xs">
                        Your AI-powered travel companion for creating unforgettable journeys around the world.
                    </p>
                    <div className="flex items-center space-x-2 text-sm opacity-60">
                        <GlobeAltIcon className="w-4 h-4" />
                        <span>Explore • Plan • Experience</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col items-center space-y-4">
                    <h3 className="font-semibold text-lg">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="link link-hover text-sm opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Support & Contact */}
                <div className="flex flex-col items-center md:items-end space-y-4">
                    <h3 className="font-semibold text-lg">Support</h3>
                    <div className="flex flex-col space-y-2 text-center md:text-right">
                        {supportLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="link link-hover text-sm opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col space-y-2 text-sm opacity-60">
                        <div className="flex items-center space-x-2">
                            <EnvelopeIcon className="w-4 h-4" />
                            <span>support@tripplanner.com</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <PhoneIcon className="w-4 h-4" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="divider opacity-20"></div>

            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-sm opacity-60">
                    <span>© {currentYear} TripPlanner. All rights reserved.</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                    <span className="opacity-60">Made with</span>
                    <HeartIcon className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                    <span className="opacity-60">for travelers</span>
                </div>

                <div className="flex space-x-4">
                    <div className="badge badge-outline badge-sm">
                        <span>AI Powered</span>
                    </div>
                    <div className="badge badge-outline badge-sm">
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;