'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
    showNavbar?: boolean;
    showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    className = '',
    showNavbar = true,
    showFooter = true,
}) => {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            {/* Navbar */}
            {showNavbar && <Navbar />}

            {/* Main Content */}
            <main className={`flex-1 ${className}`}>
                {children}
            </main>

            {/* Footer */}
            {showFooter && <Footer />}
        </div>
    );
};

export default Layout;