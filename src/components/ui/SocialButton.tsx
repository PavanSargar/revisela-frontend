import { Button } from './Button';

interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  ...props
}) => {
  return (
    <Button variant="outline" {...props}>
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </Button>
  );
};
