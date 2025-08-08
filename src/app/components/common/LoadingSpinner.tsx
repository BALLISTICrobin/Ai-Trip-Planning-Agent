import React from 'react';
import { LoadingSpinnerProps } from '../../types/types';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    message = 'Planning your perfect trip...'
}) => {
    const sizeClasses = {
        small: 'w-6 h-6',
        medium: 'w-12 h-12',
        large: 'w-20 h-20'
    };

    const spinnerSizeClasses = {
        small: 'loading-sm',
        medium: 'loading-md',
        large: 'loading-lg'
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            {/* Primary Spinner */}
            <div className="relative">
                <span className={`loading loading-spinner loading-primary ${spinnerSizeClasses[size]}`}></span>

                {/* Decorative ring animation */}
                <div className={`absolute inset-0 ${sizeClasses[size]} border-2 border-primary/20 rounded-full animate-pulse`}></div>
            </div>

            {/* Loading Message */}
            {message && (
                <div className="text-center space-y-2">
                    <p className="text-base-content/80 font-medium">{message}</p>
                    <div className="flex space-x-1 justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            )}

            {/* Travel-themed icons animation */}
            <div className="flex space-x-4 opacity-60">
                <div className="animate-bounce" style={{ animationDelay: '0s' }}>✈️</div>
                <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🏨</div>
                <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>🗺️</div>
                <div className="animate-bounce" style={{ animationDelay: '0.6s' }}>🎒</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;