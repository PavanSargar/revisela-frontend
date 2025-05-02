import React, { useState } from 'react';

import { ChevronLeft, Folder, Plus } from 'lucide-react';

import { CreateFolderModal } from '@/components/modals';
import { Button } from '@/components/ui';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

import { FolderGrid } from './';
import { useFolderSystem } from './FolderContext';

interface FolderExplorerProps {
  title?: string;
  allowCreateFolder?: boolean;
  onFolderClick?: (id: string, name: string) => void;
  renderContent?: (currentFolderId: string | undefined) => React.ReactNode;
  className?: string;
}

const FolderExplorer: React.FC<FolderExplorerProps> = ({
  title = 'Folders',
  allowCreateFolder = true,
  onFolderClick,
  renderContent,
  className = '',
}) => {
  const {
    currentFolderId,
    folders,
    subFolders,
    currentFolder,
    isLoading,
    folderDetailsLoading,
    breadcrumbs,
    navigateToFolder,
    navigateUp,
  } = useFolderSystem();

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);

  const handleFolderClick = (folderId: string, folderName: string) => {
    navigateToFolder(folderId, folderName);
    if (onFolderClick) onFolderClick(folderId, folderName);
  };

  // Convert breadcrumbs to expected format
  const formattedBreadcrumbs = breadcrumbs.map((item, index) => ({
    label: item.name,
    href: item.path,
    icon:
      index > 0 ? <Folder size={20} className="text-[#0890A8]" /> : undefined,
    isCurrent: index === breadcrumbs.length - 1,
    onClick: () => navigateToFolder(item.id || undefined, item.name),
  }));

  // Determine which folders to display - root folders or subfolders
  const displayFolders = currentFolderId
    ? subFolders.map((sf) => ({
        _id: sf._id,
        name: sf.name,
      }))
    : folders;

  const isLoadingFolders = currentFolderId ? folderDetailsLoading : isLoading;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          {currentFolderId && (
            <Button
              variant="outline"
              onClick={navigateUp}
              className="flex items-center gap-1 text-gray-600 hover:text-[#0890A8]"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          )}
          <Breadcrumb items={formattedBreadcrumbs} />
        </div>

        {allowCreateFolder && (
          <Button
            onClick={() => setIsFolderModalOpen(true)}
            className="flex items-center gap-2 bg-[#0890A8] text-white"
          >
            <Plus size={16} />
            New Folder
          </Button>
        )}
      </div>

      {/* Folder Info */}
      {currentFolder && (
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#444444]">
            {currentFolder.name}
          </h1>
          {currentFolder.description && (
            <p className="text-gray-500 mt-1">{currentFolder.description}</p>
          )}
        </div>
      )}

      {/* Folders Section */}
      <section className="mb-8">
        <h2 className="text-xl font-medium text-[#444444] mb-4">{title}</h2>
        <FolderGrid
          folders={displayFolders}
          isLoading={isLoadingFolders}
          onFolderClick={handleFolderClick}
          emptyMessage={
            currentFolderId
              ? 'This folder is empty'
              : "You don't have any folders yet"
          }
        />
      </section>

      {/* Custom content section - show quizzes if in a folder */}
      {currentFolderId ? (
        <div>{renderContent && renderContent(currentFolderId)}</div>
      ) : (
        renderContent && renderContent(undefined)
      )}

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onOpenChange={setIsFolderModalOpen}
        parentId={currentFolderId}
        onSuccess={() => {
          // Modal will handle the refresh through invalidating queries
          setIsFolderModalOpen(false);
        }}
      />
    </div>
  );
};

export default FolderExplorer;
