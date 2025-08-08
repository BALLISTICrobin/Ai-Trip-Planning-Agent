import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'compact' | 'side' | 'bordered';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    title,
    subtitle,
    variant = 'default',
    shadow = 'md',
    className = '',
    onClick,
    hoverable = false,
}) => {
    const baseClasses = 'card bg-base-100 transition-all duration-300';

    const variantClasses = {
        default: 'card-normal',
        compact: 'card-compact',
        side: 'card-side',
        bordered: 'card-bordered',
    };

    const shadowClasses = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl',
    };

    const hoverClasses = hoverable || onClick
        ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer'
        : '';

    const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${shadowClasses[shadow]}
    ${hoverClasses}
    ${className}
  `.trim();

    const cardContent = (
        <>
            {(title || subtitle) && (
                <div className="card-body">
                    {title && (
                        <h2 className="card-title text-lg font-bold">
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <p className="text-base-content/70 text-sm">
                            {subtitle}
                        </p>
                    )}
                    {children}
                </div>
            )}
            {!title && !subtitle && (
                <div className="card-body">
                    {children}
                </div>
            )}
        </>
    );

    if (onClick) {
        return (
            <div
                className={cardClasses}
                onClick={onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        onClick();
                    }
                }}
            >
                {cardContent}
            </div>
        );
    }

    return (
        <div className={cardClasses}>
            {cardContent}
        </div>
    );
};

export default Card;