import React from 'react';

interface InputProps {
    label?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel';
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    className?: string;
    min?: string | number;
    max?: string | number;
    step?: string | number;
}

const Input: React.FC<InputProps> = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    disabled = false,
    error,
    helperText,
    size = 'md',
    className = '',
    min,
    max,
    step,
}) => {
    const baseClasses = 'input input-bordered w-full transition-all duration-200 focus:scale-[1.02]';

    const sizeClasses = {
        xs: 'input-xs',
        sm: 'input-sm',
        md: 'input-md',
        lg: 'input-lg',
    };

    const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${error ? 'input-error' : ''}
    ${disabled ? 'input-disabled' : ''}
    ${className}
  `.trim();

    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text font-medium">
                        {label}
                        {required && <span className="text-error ml-1">*</span>}
                    </span>
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={inputClasses}
                min={min}
                max={max}
                step={step}
            />

            {(error || helperText) && (
                <label className="label">
                    <span className={`label-text-alt ${error ? 'text-error' : 'text-base-content/70'}`}>
                        {error || helperText}
                    </span>
                </label>
            )}
        </div>
    );
};

export default Input;