import { cn } from '@/lib/utils';

import { LoadingSpinner } from './loaders/LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  className,
  disabled,
  loading,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 font-medium transition-colors rounded-[0.625rem] inline-flex items-center justify-center gap-2',
        variant === 'solid'
          ? 'bg-primary text-white'
          : 'border border-primary text-primary',
        disabled || loading
          ? 'bg-[rgba(8,144,168,0.40)] text-white cursor-not-allowed opacity-80'
          : 'cursor-pointer',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <LoadingSpinner
          size="sm"
          variant={variant === 'solid' ? 'light' : 'primary'}
        />
      )}
    </button>
  );
};
