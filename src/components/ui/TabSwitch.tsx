// src/components/ui/TabSwitch.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface TabOption {
  value: string;
  label: string;
  color?: string;
}

interface TabSwitchProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const TabSwitch: React.FC<TabSwitchProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={cn("flex bg-gray-100 p-1 rounded-lg w-full", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`flex-1 py-2 px-4 font-medium rounded-md transition-colors ${
            value === option.value
              ? `bg-[${option.color || "#0890A8"}] text-white`
              : "text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
