import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  label,
  ...props
}) => {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        className="form-checkbox w-[15px] h-[15px] border-[1px] border-[#000]"
        {...props}
      />
      <span className={cn("text-[18px] text-[#444444]", className)}>
        {label}
      </span>
    </label>
  );
};
