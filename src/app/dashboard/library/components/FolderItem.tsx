import React from "react";
import { Folder, MoreVertical } from "lucide-react";
import { Dropdown } from "@/components/ui";

interface FolderItemProps {
  name: string;
  onClick?: () => void;
  onDelete?: () => void;
  onRename?: () => void;
}

const FolderItem: React.FC<FolderItemProps> = ({
  name,
  onClick,
  onDelete,
  onRename,
}) => {
  // Add double-click handler
  const handleDoubleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className="p-4 border rounded-lg bg-white flex justify-between items-center hover:bg-gray-50 cursor-pointer"
      onClick={() => {}} // Single click does nothing
      onDoubleClick={handleDoubleClick}
    >
      <div className="flex items-center gap-2">
        <Folder size={20} className="text-[#0890A8]" />
        <span className="text-[#444444]">{name}</span>
      </div>
      <Dropdown
        trigger={
          <button
            className="text-[#444444] p-1 rounded-full hover:bg-gray-100"
            onClick={(e) => e.stopPropagation()} // Prevent folder click when clicking menu
          >
            <MoreVertical size={18} />
          </button>
        }
        items={[
          {
            label: "Rename",
            onClick: (e) => {
              e.stopPropagation();
              if (onRename) onRename();
            },
          },
          {
            label: "Delete",
            onClick: (e) => {
              e.stopPropagation();
              if (onDelete) onDelete();
            },
            className: "text-red-500",
          },
        ]}
      />
    </div>
  );
};

export default FolderItem;
