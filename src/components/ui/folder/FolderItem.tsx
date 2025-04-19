import React from "react";
import { Folder, MoreVertical } from "lucide-react";
import { Dropdown } from "@/components/ui";

export interface FolderItemProps {
  id: string;
  name: string;
  onClick?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
  customIcon?: React.ReactNode;
  className?: string;
}

const FolderItem: React.FC<FolderItemProps> = ({
  id,
  name,
  onClick,
  onDelete,
  onRename,
  customIcon,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) onClick(id, name);
  };

  return (
    <div
      className={`p-4 border rounded-lg bg-white flex justify-between items-center hover:bg-gray-50 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {customIcon || <Folder size={20} className="text-[#0890A8]" />}
        <span className="text-[#444444]">{name}</span>
      </div>
      {(onDelete || onRename) && (
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
            ...(onRename
              ? [
                  {
                    label: "Rename",
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      onRename(id);
                    },
                  },
                ]
              : []),
            ...(onDelete
              ? [
                  {
                    label: "Delete",
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      onDelete(id);
                    },
                    className: "text-red-500",
                  },
                ]
              : []),
          ]}
        />
      )}
    </div>
  );
};

export default FolderItem;
