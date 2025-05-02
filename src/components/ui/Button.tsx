import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 font-medium transition-colors rounded-[0.625rem]',
        variant === 'solid'
          ? 'bg-primary text-white'
          : 'border border-primary text-primary',
        disabled
          ? 'bg-[rgba(8,144,168,0.40)] text-white cursor-not-allowed opacity-80'
          : 'cursor-pointer',
        className
      )}
      disabled={disabled}
      {...props}
    />
  );
};
