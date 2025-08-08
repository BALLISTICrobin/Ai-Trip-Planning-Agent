'use client';

import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    className?: string;
    actions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    className = '',
    actions
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (closeOnEscape && event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeOnEscape, onClose]);

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === backdropRef.current) {
            onClose();
        }
    };

    // Size classes
    const sizeClasses = {
        sm: 'modal-box w-11/12 max-w-md',
        md: 'modal-box w-11/12 max-w-2xl',
        lg: 'modal-box w-11/12 max-w-4xl',
        xl: 'modal-box w-11/12 max-w-6xl',
        full: 'modal-box w-11/12 max-w-7xl h-full max-h-[90vh]'
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div
                ref={backdropRef}
                className="modal-backdrop absolute inset-0 bg-black/50 cursor-pointer"
                onClick={handleBackdropClick}
            >
                <div
                    ref={modalRef}
                    className={`
            ${sizeClasses[size]}
            relative cursor-auto
            animate-in fade-in zoom-in-95 duration-200
            ${className}
          `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between mb-6">
                            {title && (
                                <h2 className="text-2xl font-bold text-base-content">
                                    {title}
                                </h2>
                            )}

                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                                    aria-label="Close modal"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className={`${size === 'full' ? 'flex-1 overflow-y-auto' : ''}`}>
                        {children}
                    </div>

                    {/* Actions */}
                    {actions && (
                        <div className="modal-action mt-6 flex justify-end space-x-3">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Predefined modal variants for common use cases
export const ConfirmModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
}> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmVariant = 'primary'
}) => {
        const handleConfirm = () => {
            onConfirm();
            onClose();
        };

        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                size="sm"
                actions={
                    <>
                        <Button variant="ghost" onClick={onClose}>
                            {cancelText}
                        </Button>
                        <Button
                            variant={confirmVariant}
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </Button>
                    </>
                }
            >
                <p className="text-base-content/80">{message}</p>
            </Modal>
        );
    };

export const AlertModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
}> = ({
    isOpen,
    onClose,
    title,
    message,
    type = 'info'
}) => {
        const getIcon = () => {
            switch (type) {
                case 'success': return '✅';
                case 'warning': return '⚠️';
                case 'error': return '❌';
                default: return 'ℹ️';
            }
        };

        const getAlertClass = () => {
            switch (type) {
                case 'success': return 'alert-success';
                case 'warning': return 'alert-warning';
                case 'error': return 'alert-error';
                default: return 'alert-info';
            }
        };

        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={title}
                size="sm"
                actions={
                    <Button onClick={onClose}>
                        OK
                    </Button>
                }
            >
                <div className={`alert ${getAlertClass()}`}>
                    <span className="text-2xl">{getIcon()}</span>
                    <span>{message}</span>
                </div>
            </Modal>
        );
    };

export const LoadingModal: React.FC<{
    isOpen: boolean;
    title?: string;
    message?: string;
}> = ({
    isOpen,
    title = 'Loading',
    message = 'Please wait...'
}) => {
        return (
            <Modal
                isOpen={isOpen}
                onClose={() => { }} // No close function for loading modal
                title={title}
                size="sm"
                showCloseButton={false}
                closeOnBackdropClick={false}
                closeOnEscape={false}
            >
                <div className="flex flex-col items-center space-y-4 py-8">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="text-base-content/70">{message}</p>
                </div>
            </Modal>
        );
    };

export default Modal;