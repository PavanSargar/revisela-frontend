import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Home, Loader2 } from 'lucide-react';

import { useMoveFolder } from '@/services/features/folders';
import { QUERY_KEYS } from '@/services/query-keys';

import { Button, Modal } from '@/components/ui';
import {
  FolderExplorer,
  FolderProvider,
  useFolderSystem,
} from '@/components/ui/folder';
import { useToast } from '@/components/ui/toast';

interface MoveFolderModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  folderId: string;
  onSuccess?: () => void;
  folderName?: string;
  parentFolderId?: string;
}

// Custom FolderExplorer wrapper that filters out the folder being moved
const FilteredFolderExplorer = ({
  folderId,
  onFolderClick,
  className,
}: {
  folderId: string;
  onFolderClick: (id: string, name: string) => void;
  className?: string;
}) => {
  const {
    currentFolderId,
    folders,
    subFolders,
    isLoading,
    folderDetailsLoading,
    breadcrumbs,
    navigateToFolder,
    navigateUp,
  } = useFolderSystem();

  // Custom folder click handler that prevents navigation into the folder being moved
  const handleFolderClick = useCallback(
    (id: string, name: string) => {
      // Don't allow navigation into the folder being moved
      if (id === folderId) {
        return;
      }

      // Call the parent's onFolderClick
      onFolderClick(id, name);

      // Navigate to the folder in the explorer
      navigateToFolder(id, name);
    },
    [folderId, navigateToFolder, onFolderClick]
  );

  // Filter out the folder being moved from the display folders
  const filteredFolders = currentFolderId
    ? subFolders
        .filter((sf) => sf._id !== folderId)
        .map((sf) => ({
          _id: sf._id,
          name: sf.name,
        }))
    : folders.filter((f) => f._id !== folderId);

  const isLoadingFolders = currentFolderId ? folderDetailsLoading : isLoading;

  return (
    <div className={className}>
      <div className="flex items-center mb-3">
        <div className="flex items-center space-x-2">
          {currentFolderId && (
            <Button
              variant="outline"
              onClick={navigateUp}
              className="flex items-center gap-1 text-gray-600 hover:text-teal-600"
            >
              <span className="text-sm">Back</span>
            </Button>
          )}

          {/* Simple breadcrumb display */}
          <div className="flex items-center text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-1">/</span>}
                <button
                  onClick={() =>
                    navigateToFolder(crumb.id || undefined, crumb.name)
                  }
                  className={`hover:text-teal-600 ${
                    index === breadcrumbs.length - 1
                      ? 'font-medium text-teal-700'
                      : ''
                  }`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Folder Grid */}
      <div className="border rounded overflow-hidden">
        {isLoadingFolders ? (
          <div className="p-6 text-center text-gray-500">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
            </div>
          </div>
        ) : filteredFolders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2">
            {filteredFolders.map((folder) => (
              <div
                key={folder._id}
                className="p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer border rounded-md min-w-[200px]"
                onClick={() => handleFolderClick(folder._id, folder.name)}
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  <span className="font-medium truncate">{folder.name}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <p className="text-sm">
              {currentFolderId
                ? 'This folder is empty'
                : 'No folders available'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Inner component that has access to FolderContext
const MoveFolderContent = ({
  folderId,
  onOpenChange,
  onSuccess,
  folderName,
}: {
  folderId: string;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  folderName: string;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const moveFolder = useMoveFolder();

  // Get current context from FolderSystem
  const { currentFolderId: explorerCurrentFolderId, breadcrumbs } =
    useFolderSystem();

  // State to track selected folder
  const [selectedFolderId, setSelectedFolderId] = useState<string | undefined>(
    undefined
  );
  const [selectedFolderName, setSelectedFolderName] = useState<string>('');

  // Store the folder path for invalidation later
  const folderPathRef = useRef<string[]>([]);

  // Update folderPathRef when breadcrumbs change
  useEffect(() => {
    folderPathRef.current = breadcrumbs
      .map((b) => b.id)
      .filter(Boolean) as string[];
  }, [breadcrumbs]);

  // Handle folder selection
  const handleFolderClick = useCallback(
    (id: string, name: string) => {
      // Cannot select the folder being moved
      if (id === folderId) return;

      // Toggle selection if clicking the same folder again
      if (id === selectedFolderId) {
        setSelectedFolderId(undefined);
        setSelectedFolderName('');
      } else {
        setSelectedFolderId(id);
        setSelectedFolderName(name);
      }
    },
    [selectedFolderId, folderId]
  );

  // Invalidate all necessary queries
  const invalidateAllQueries = useCallback(() => {
    // Always invalidate the main folders list
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.FOLDERS.all,
    });

    // Invalidate the current folder's subfolders in explorer
    if (explorerCurrentFolderId) {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLDERS.byParent(explorerCurrentFolderId),
      });
    }

    // Invalidate all folders in the breadcrumb path to ensure UI is updated at all levels
    folderPathRef.current.forEach((id) => {
      if (id) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.FOLDERS.byParent(id),
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.FOLDERS.details(id),
        });
      }
    });

    // Invalidate the folder being moved and its details
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.FOLDERS.details(folderId),
    });

    // Invalidate root folders (displayed when no specific folder is selected)
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.FOLDERS.byParent(undefined),
    });

    console.log('Invalidated queries for folders:', {
      folderId,
      currentExplorerFolder: explorerCurrentFolderId,
      breadcrumbPath: folderPathRef.current,
    });
  }, [queryClient, folderId, explorerCurrentFolderId]);

  // Move folder to selected destination
  const handleMove = useCallback(() => {
    if (!selectedFolderId) return;

    moveFolder.mutate(
      { folderId, targetFolderId: selectedFolderId },
      {
        onSuccess: () => {
          // Invalidate all necessary queries
          invalidateAllQueries();

          toast({
            title: 'Success',
            description: `Folder moved to "${selectedFolderName}"`,
            type: 'success',
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message || 'Failed to move folder',
            type: 'error',
          });
        },
      }
    );
  }, [
    folderId,
    moveFolder,
    onOpenChange,
    onSuccess,
    selectedFolderId,
    selectedFolderName,
    toast,
    invalidateAllQueries,
  ]);

  // Move to root folder (My Library)
  const handleMoveToRoot = useCallback(() => {
    moveFolder.mutate(
      { folderId, targetFolderId: 'root' },
      {
        onSuccess: () => {
          // Invalidate all necessary queries
          invalidateAllQueries();

          toast({
            title: 'Success',
            description: 'Folder moved to My Library',
            type: 'success',
          });
          onOpenChange(false);
          if (onSuccess) onSuccess();
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: error.message || 'Failed to move folder',
            type: 'error',
          });
        },
      }
    );
  }, [
    folderId,
    moveFolder,
    onOpenChange,
    onSuccess,
    toast,
    invalidateAllQueries,
  ]);

  return (
    <div className="py-3">
      <p className="text-base font-medium mb-3 text-gray-700">
        Select a destination for "{folderName}":
      </p>

      <div className="border rounded-md overflow-hidden mb-4 p-4">
        {/* Using our custom filtered folder explorer */}
        <FilteredFolderExplorer
          folderId={folderId}
          onFolderClick={handleFolderClick}
          className="h-[350px] overflow-y-auto"
        />

        {/* Selection indicator */}
        {selectedFolderId && (
          <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-md">
            <p className="text-sm font-medium text-teal-700">
              Selected destination:{' '}
              <span className="font-bold">{selectedFolderName}</span>
            </p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleMoveToRoot}
          disabled={moveFolder.isPending}
          className="flex items-center gap-1 border-gray-300"
        >
          {moveFolder.isPending &&
          moveFolder.variables?.targetFolderId === 'root' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Home size={16} />
          )}
          <span>Move to Root</span>
        </Button>

        <Button
          disabled={!selectedFolderId || moveFolder.isPending}
          onClick={handleMove}
          className={`flex items-center gap-1 ${
            selectedFolderId && !moveFolder.isPending
              ? 'bg-teal-600 hover:bg-teal-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {moveFolder.isPending &&
          moveFolder.variables?.targetFolderId !== 'root' ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ArrowRight size={16} />
          )}
          <span>{moveFolder.isPending ? 'Moving...' : 'Move'}</span>
        </Button>
      </div>
    </div>
  );
};

export const MoveFolderModal: React.FC<MoveFolderModalProps> = ({
  isOpen,
  onOpenChange,
  folderId,
  onSuccess,
  folderName = 'Folder 1',
  parentFolderId,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Move Folder"
      contentClassName="max-w-3xl"
      showCloseButton
    >
      <FolderProvider rootName="My Library" rootPath="/folders">
        <MoveFolderContent
          folderId={folderId}
          onOpenChange={onOpenChange}
          onSuccess={onSuccess}
          folderName={folderName}
        />
      </FolderProvider>
    </Modal>
  );
};
