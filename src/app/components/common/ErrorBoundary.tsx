'use client';

import React, { Component, ReactNode } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
                    <Card shadow="xl" className="max-w-md w-full">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto">
                                <ExclamationTriangleIcon className="w-10 h-10 text-error" />
                            </div>

                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-error">Oops! Something went wrong</h2>
                                <p className="text-base-content/70">
                                    We encountered an unexpected error. Don't worry, our team has been notified.
                                </p>
                            </div>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="bg-base-300 p-4 rounded-lg text-left">
                                    <p className="text-sm font-mono text-error break-all">
                                        {this.state.error.message}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col space-y-3">
                                <Button onClick={this.handleReset} size="lg" className="w-full">
                                    <ArrowPathIcon className="w-5 h-5 mr-2" />
                                    Try Again
                                </Button>

                                <Button
                                    variant="ghost"
                                    onClick={() => window.location.href = '/'}
                                    className="w-full"
                                >
                                    Go to Homepage
                                </Button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-base-content/50">
                                    If this problem persists, please{' '}
                                    <a href="/contact" className="link text-primary">
                                        contact our support team
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook version for functional components
export const useErrorHandler = () => {
    const handleError = (error: Error, errorInfo?: React.ErrorInfo) => {
        console.error('Error caught by useErrorHandler:', error, errorInfo);
        // You can send error to logging service here
    };

    return { handleError };
};

export default ErrorBoundary;