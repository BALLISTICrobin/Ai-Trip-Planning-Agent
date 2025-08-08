'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    MapIcon,
    HomeIcon,
    InformationCircleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Plan Trip', href: '/plan-trip', icon: MapIcon }, // Fixed path to match your folder structure
        { name: 'About', href: '/about', icon: InformationCircleIcon },
    ];

    const isActivePath = (path: string) => {
        return pathname === path;
    };

    const handleMobileNavClick = () => {
        setIsMenuOpen(false); // Close mobile menu when clicking on a link
    };

    return (
        <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
            <div className="navbar-start">
                {/* Mobile menu button */}
                <div className="dropdown lg:hidden">
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>

                    {isMenuOpen && (
                        <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={handleMobileNavClick}
                                            className={`flex items-center space-x-2 ${isActivePath(item.href) ? 'active' : ''
                                                }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                {/* Logo/Brand */}
                <Link
                    href="/"
                    className="btn btn-ghost text-xl font-bold text-primary hover:scale-105 transition-transform"
                >
                    <span className="text-2xl">✈️</span>
                    <span className="hidden sm:inline">TripPlanner</span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${isActivePath(item.href)
                                            ? 'bg-primary text-primary-content'
                                            : 'hover:bg-primary/10'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Right side actions */}
            <div className="navbar-end">
                <div className="hidden sm:flex items-center space-x-2">
                    <div className="badge badge-primary badge-outline">
                        <span className="text-xs">Beta</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;