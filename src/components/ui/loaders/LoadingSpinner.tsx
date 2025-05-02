import React from 'react';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'light';
  className?: string;
}

/**
 * A beautiful animated loading spinner component
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  // Size mappings
  const sizeMap = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  // Color mappings
  const colorMap = {
    primary: 'border-primary-blue/20 border-t-primary-blue',
    secondary: 'border-secondary-black/20 border-t-secondary-black',
    light: 'border-primary-white/30 border-t-primary-white',
  };

  return (
    <div
      className={`animate-spin rounded-full ${sizeMap[size]} ${colorMap[variant]} ${className}`}
      role="status"
      aria-label="loading"
    />
  );
};

export default LoadingSpinner;
