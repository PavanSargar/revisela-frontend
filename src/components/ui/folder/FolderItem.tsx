import React, { useState } from 'react';

import {
  BookmarkIcon,
  Copy,
  Folder,
  FolderSymlink,
  MoreVertical,
  RefreshCw,
  Trash2,
} from 'lucide-react';

import {
  useDeleteFolder,
  usePermanentlyDeleteFolder,
} from '@/services/features/folders';

import {
  ConfirmationModal,
  DuplicateFolderModal,
  MoveFolderModal,
} from '@/components/modals';
import { ActionDropdown, Button, Modal } from '@/components/ui';
import { useToast } from '@/components/ui/toast';

export interface FolderItemProps {
  id: string;
  name: string;
  onClick?: (id: string, name: string) => void;
  onDelete?: (id: string) => void;
  onRestore?: (id: string) => void;
  customIcon?: React.ReactNode;
  className?: string;
  isInTrash?: boolean;
  handleDeleteInParent?: boolean;
}

const FolderItem: React.FC<FolderItemProps> = ({
  id,
  name,
  onClick,
  onDelete,
  onRestore,
  customIcon,
  className = '',
  isInTrash = false,
  handleDeleteInParent = false,
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
    setDuplicateModalOpen(true);
  };

  const handleBookmark = () => {
    console.log('Bookmark folder:', id);
  };

  const handleMove = () => {
    setMoveModalOpen(true);
  };

  const handleRemove = () => {
    if (handleDeleteInParent && onDelete) {
      setRemoveModalOpen(false);
      onDelete(id);
      return;
    }

    if (isInTrash) {
      permanentlyDeleteFolder.mutate(id, {
        onSuccess: () => {
          setRemoveModalOpen(false);
          toast({
            title: 'Folder permanently deleted',
          });
          if (onDelete) onDelete(id);
        },
        onError: (error) => {
          setRemoveModalOpen(false);
          toast({
            title: 'Failed to permanently delete folder',
          });
          console.error('Failed to permanently delete folder:', error);
        },
      });
    } else {
      deleteFolder.mutate(id, {
        onSuccess: () => {
          setRemoveModalOpen(false);
          toast({
            title: 'Folder moved to trash',
          });
          if (onDelete) onDelete(id);
        },
        onError: (error) => {
          setRemoveModalOpen(false);
          toast({
            title: 'Failed to remove folder',
          });
          console.error('Failed to delete folder:', error);
        },
      });
    }
  };

  const isLoading =
    !handleDeleteInParent &&
    (isInTrash ? permanentlyDeleteFolder.isPending : deleteFolder.isPending);

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
        {isInTrash ? (
          <ActionDropdown
            items={[
              {
                label: 'Restore',
                icon: <RefreshCw size={16} />,
                onClick: (e) => {
                  e.stopPropagation();
                  if (onRestore) onRestore(id);
                },
              },
              {
                label: 'Delete Permanently',
                icon: <Trash2 size={16} />,
                onClick: (e) => {
                  e.stopPropagation();
                  setRemoveModalOpen(true);
                },
                variant: 'danger',
              },
            ]}
          />
        ) : (
          <ActionDropdown
            items={[
              {
                label: 'Duplicate',
                icon: <Copy size={16} />,
                onClick: (e) => {
                  e.stopPropagation();
                  setDuplicateModalOpen(true);
                },
              },
              {
                label: 'Bookmark',
                icon: <BookmarkIcon size={16} />,
                onClick: (e) => {
                  e.stopPropagation();
                  handleBookmark();
                },
              },
              {
                label: 'Move',
                icon: <FolderSymlink size={16} />,
                onClick: (e) => {
                  e.stopPropagation();
                  setMoveModalOpen(true);
                },
              },
              {
                label: 'Remove',
                icon: <Trash2 size={16} />,
                onClick: (e) => {
                  e.stopPropagation();
                  setRemoveModalOpen(true);
                },
                variant: 'danger',
              },
            ]}
          />
        )}
      </div>

      {!isInTrash && (
        <DuplicateFolderModal
          isOpen={duplicateModalOpen}
          onOpenChange={setDuplicateModalOpen}
          folderId={id}
          originalName={name}
          onSuccess={() => {
            toast({
              title: 'Success',
              description: 'Folder duplicated successfully',
            });
          }}
        />
      )}

      {!isInTrash && (
        <MoveFolderModal
          isOpen={moveModalOpen}
          onOpenChange={setMoveModalOpen}
          folderId={id}
          folderName={name}
          onSuccess={() => {
            toast({
              title: 'Success',
              description: 'Folder moved successfully',
            });
          }}
        />
      )}

      <ConfirmationModal
        isOpen={removeModalOpen}
        onOpenChange={setRemoveModalOpen}
        title={isInTrash ? 'Delete Folder Permanently' : 'Remove Folder'}
        description={
          isInTrash
            ? 'This action cannot be undone. Are you sure you want to permanently delete this folder?'
            : 'Are you sure you want to remove this folder?'
        }
        confirmText={isInTrash ? 'Delete Permanently' : 'Remove'}
        confirmButtonClass="bg-red-500 hover:bg-red-600 text-white"
        onConfirm={handleRemove}
        isLoading={isLoading}
      />
    </>
  );
};

export default FolderItem;
