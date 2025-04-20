import React, { useState } from "react";
import { Folder, MoreVertical } from "lucide-react";
import { Dropdown, Modal, Button } from "@/components/ui";
import { ConfirmationModal } from "@/components/modals";
import {
  useDeleteFolder,
  usePermanentlyDeleteFolder,
} from "@/services/features/folders";
import { useToast } from "@/components/ui/toast";

export interface FolderItemProps {
  id: string;
  name: string;
  onClick?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
  customIcon?: React.ReactNode;
  className?: string;
  isInTrash?: boolean;
}

const FolderItem: React.FC<FolderItemProps> = ({
  id,
  name,
  onClick,
  onDelete,
  onRename,
  customIcon,
  className = "",
  isInTrash = false,
}) => {
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);

  const deleteFolder = useDeleteFolder();
  const { toast } = useToast();
  const permanentlyDeleteFolder = usePermanentlyDeleteFolder();

  const handleClick = () => {
    if (onClick) onClick(id, name);
  };

  const handleDuplicate = () => {
    setDuplicateModalOpen(false);
    console.log("Duplicate folder:", id);
  };

  const handleBookmark = () => {
    console.log("Bookmark folder:", id);
  };

  const handleMove = () => {
    setMoveModalOpen(false);
    console.log("Move folder:", id);
  };

  const handleRemove = () => {
    if (isInTrash) {
      permanentlyDeleteFolder.mutate(id, {
        onSuccess: () => {
          setRemoveModalOpen(false);
          toast({
            title: "Folder permanently deleted",
          });
          if (onDelete) onDelete(id);
        },
        onError: (error) => {
          setRemoveModalOpen(false);
          toast({
            title: "Failed to permanently delete folder",
          });
          console.error("Failed to permanently delete folder:", error);
        },
      });
    } else {
      deleteFolder.mutate(id, {
        onSuccess: () => {
          setRemoveModalOpen(false);
          toast({
            title: "Folder moved to trash",
          });
          if (onDelete) onDelete(id);
        },
        onError: (error) => {
          setRemoveModalOpen(false);
          toast({
            title: "Failed to remove folder",
          });
          console.error("Failed to delete folder:", error);
        },
      });
    }
  };

  const isLoading = isInTrash
    ? permanentlyDeleteFolder.isPending
    : deleteFolder.isPending;

  return (
    <>
      <div
        className={`p-4 border rounded-lg bg-white flex justify-between items-center hover:bg-gray-50 cursor-pointer ${className}`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {customIcon || <Folder size={20} className="text-[#0890A8]" />}
          <span className="text-[#444444]">{name}</span>
        </div>
        <Dropdown
          trigger={
            <button
              className="text-[#444444] p-1 rounded-full hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical size={18} />
            </button>
          }
          items={[
            ...(isInTrash
              ? []
              : [
                  {
                    label: "Duplicate",
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      setDuplicateModalOpen(true);
                    },
                  },
                  {
                    label: "Bookmark",
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      handleBookmark();
                    },
                  },
                  {
                    label: "Move",
                    onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                      e.stopPropagation();
                      setMoveModalOpen(true);
                    },
                  },
                ]),
            {
              label: isInTrash ? "Delete Permanently" : "Remove",
              onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                setRemoveModalOpen(true);
              },
              className: "text-red-500",
            },
          ]}
        />
      </div>

      {!isInTrash && (
        <ConfirmationModal
          isOpen={duplicateModalOpen}
          onOpenChange={setDuplicateModalOpen}
          title="Duplicate Folder"
          description="Are you sure you want to duplicate this folder?"
          confirmText="Duplicate"
          onConfirm={handleDuplicate}
        />
      )}

      {!isInTrash && (
        <Modal
          isOpen={moveModalOpen}
          onOpenChange={setMoveModalOpen}
          title="Move Folder"
          description="Choose a destination for this folder."
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setMoveModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMove}>Move</Button>
            </div>
          }
        >
          <div className="text-center text-gray-500">
            Move destination interface will be implemented later.
          </div>
        </Modal>
      )}

      <ConfirmationModal
        isOpen={removeModalOpen}
        onOpenChange={setRemoveModalOpen}
        title={isInTrash ? "Delete Folder Permanently" : "Remove Folder"}
        description={
          isInTrash
            ? "This action cannot be undone. Are you sure you want to permanently delete this folder?"
            : "Are you sure you want to remove this folder?"
        }
        confirmText={isInTrash ? "Delete Permanently" : "Remove"}
        confirmButtonClass="bg-red-500 hover:bg-red-600 text-white"
        onConfirm={handleRemove}
        isLoading={isLoading}
      />
    </>
  );
};

export default FolderItem;
