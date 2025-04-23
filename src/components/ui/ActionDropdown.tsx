"use client";

import React from "react";
import { MoreVertical } from "lucide-react";
import { Dropdown } from "./Dropdown";

export interface ActionDropdownItem {
  label: string;
  icon: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface ActionDropdownProps {
  items: ActionDropdownItem[];
  align?: "start" | "center" | "end";
  className?: string;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  items,
  align = "end",
  className,
}) => {
  // Transform action items to dropdown items
  const dropdownItems = items.map((item) => ({
    label: (
      <div className="flex items-center">
        {item.icon && <span className="mr-2">{item.icon}</span>}
        <span>{item.label}</span>
      </div>
    ),
    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      item.onClick(e);
    },
    className: item.variant === "danger" ? "text-red-500" : "",
    disabled: item.disabled,
  }));

  return (
    <Dropdown
      trigger={
        <button
          className="text-[#444444] p-1 rounded-full hover:bg-gray-100"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical size={18} />
        </button>
      }
      items={dropdownItems}
      align={align}
      className={className}
    />
  );
};
