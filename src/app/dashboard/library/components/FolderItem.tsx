import React from "react";
import { Folder } from "lucide-react";

interface FolderItemProps {
  name: string;
  onClick?: () => void;
}

const FolderItem: React.FC<FolderItemProps> = ({ name, onClick }) => {
  return (
    <div className="p-4 border rounded-lg bg-white flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Folder size={20} className="text-[#0890A8]" />
        <span className="text-[#444444]">{name}</span>
      </div>
      <button className="text-[#444444]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="6" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="18" r="1" />
        </svg>
      </button>
    </div>
  );
};

export default FolderItem;
