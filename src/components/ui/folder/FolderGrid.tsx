import React from "react";
import FolderItem, { FolderItemProps } from "./FolderItem";

export interface Folder {
  _id: string;
  name: string;
  parentFolder?: string;
  [key: string]: any;
}

interface FolderGridProps {
  folders: Folder[];
  isLoading: boolean;
  emptyMessage?: string;
  onFolderClick?: (id: string, name: string) => void;
  onFolderDelete?: (id: string) => void;
  folderIcon?: React.ReactNode;
  className?: string;
  gridClassName?: string;
}

const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  isLoading,
  emptyMessage = "No folders found",
  onFolderClick,
  onFolderDelete,
  folderIcon,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
}) => {
  return (
    <div className={className}>
      {isLoading ? (
        <div className="text-center py-4">Loading folders...</div>
      ) : folders && folders.length > 0 ? (
        <div className={`grid ${gridClassName}`}>
          {folders.map((folder) => (
            <FolderItem
              key={folder._id}
              id={folder._id}
              name={folder.name}
              onClick={onFolderClick}
              onDelete={onFolderDelete}
              customIcon={folderIcon}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">{emptyMessage}</div>
      )}
    </div>
  );
};

export default FolderGrid;
