import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  useFolders as useApiFolder,
  useCreateFolder,
  useDeleteFolder,
  useFolderDetails,
  useUpdateFolder,
} from '@/services/features/folders';

export interface SubFolder {
  _id: string;
  name: string;
  isBookmarked?: boolean;
}

export interface Folder {
  _id: string;
  name: string;
  description?: string;
  parentFolder?: string;
  owner: string;
  subFolders?: SubFolder[];
  quizzes?: any[];
  sharedWith?: any[];
  publicAccess?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

interface BreadcrumbItem {
  id: string;
  name: string;
  path: string;
}

interface FolderContextProps {
  currentFolderId: string | undefined;
  folders: Folder[];
  subFolders: SubFolder[];
  isLoading: boolean;
  folderDetailsLoading: boolean;
  currentFolder: Folder | null;
  breadcrumbs: BreadcrumbItem[];
  setCurrentFolder: (id: string | undefined) => void;
  navigateToFolder: (id: string | undefined, folderName?: string) => void;
  navigateUp: () => void;
  createFolder: (name: string, description?: string) => Promise<any>;
  updateFolder: (id: string, name: string) => Promise<any>;
  deleteFolder: (id: string) => Promise<any>;
  rootName: string;
  rootPath: string;
  folderPath: string[];
}

const FolderContext = createContext<FolderContextProps | undefined>(undefined);

export interface FolderProviderProps {
  children: ReactNode;
  initialFolderId?: string;
  rootName?: string;
  rootPath: string;
}

export const FolderProvider: React.FC<FolderProviderProps> = ({
  children,
  initialFolderId,
  rootName = 'Root',
  rootPath,
}) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
    initialFolderId
  );
  const [folderHistory, setFolderHistory] = useState<string[]>(
    initialFolderId ? [initialFolderId] : []
  );

  // Keep track of folder path for breadcrumb
  const [folderPath, setFolderPath] = useState<string[]>([rootName]);

  // Get root folders or folder details if we're viewing a specific folder
  const { data: folders, isLoading } = useApiFolder(undefined); // Always get root folders
  const { data: currentFolder, isLoading: folderDetailsLoading } =
    useFolderDetails(currentFolderId, !!currentFolderId);

  // Extracted subfolders from current folder (if any)
  const subFolders = currentFolder?.subFolders || [];

  const createFolderMutation = useCreateFolder();
  const updateFolderMutation = useUpdateFolder();
  const deleteFolderMutation = useDeleteFolder();

  // Keep track of breadcrumb path
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: '', name: rootName, path: rootPath },
  ]);

  // Navigate to a specific folder and update history
  const navigateToFolder = useCallback(
    (folderId: string | undefined, folderName?: string) => {
      setCurrentFolderId(folderId);

      // Update folder path for breadcrumb
      if (folderId && folderName) {
        setFolderPath((prev) => [...prev, folderName]);
      } else {
        // Reset to root
        setFolderPath([rootName]);
      }

      // Add to history if it's a new folder
      if (folderId) {
        setFolderHistory((prev) => [...prev, folderId]);
      } else {
        // Reset history if going to root
        setFolderHistory([]);
      }
    },
    [rootName]
  );

  // Navigate up one level in the folder hierarchy
  const navigateUp = useCallback(() => {
    if (folderPath.length <= 1) {
      // Already at root
      setCurrentFolderId(undefined);
      setFolderPath([rootName]);
      setFolderHistory([]);
      return;
    }

    // Remove current folder from path
    setFolderPath((prev) => prev.slice(0, -1));

    // Go to parent or root
    if (folderHistory.length > 1) {
      const parentId = folderHistory[folderHistory.length - 2];
      setCurrentFolderId(parentId);
      setFolderHistory((prev) => prev.slice(0, -1));
    } else {
      // Go to root
      setCurrentFolderId(undefined);
      setFolderHistory([]);
    }
  }, [folderPath, folderHistory, rootName]);

  // Build breadcrumb path when folder path changes
  React.useEffect(() => {
    const updatedBreadcrumbs: BreadcrumbItem[] = [];

    // Add root
    updatedBreadcrumbs.push({
      id: '',
      name: folderPath[0],
      path: rootPath,
    });

    // Add path items
    for (let i = 1; i < folderPath.length; i++) {
      const id = i < folderHistory.length ? folderHistory[i - 1] : '';
      updatedBreadcrumbs.push({
        id,
        name: folderPath[i],
        path: `${rootPath}?folderId=${id}`,
      });
    }

    setBreadcrumbs(updatedBreadcrumbs);
  }, [folderPath, folderHistory, rootPath]);

  // Create a folder (potentially a subfolder)
  const createFolder = async (name: string, description?: string) => {
    return createFolderMutation.mutateAsync({
      name,
      description,
      parentFolder: currentFolderId, // Will be undefined for root folders
    });
  };

  const updateFolder = async (id: string, name: string) => {
    return updateFolderMutation.mutateAsync({
      id,
      data: { name },
    });
  };

  const deleteFolder = async (id: string) => {
    return deleteFolderMutation.mutateAsync(id);
  };

  return (
    <FolderContext.Provider
      value={{
        currentFolderId,
        folders: currentFolderId ? [] : folders || [], // Only show root folders when at root
        subFolders, // Show subfolders of current folder when viewing a folder
        isLoading,
        folderDetailsLoading,
        currentFolder: currentFolder || null,
        breadcrumbs,
        setCurrentFolder: setCurrentFolderId,
        navigateToFolder,
        navigateUp,
        createFolder,
        updateFolder,
        deleteFolder,
        rootName,
        rootPath,
        folderPath,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderSystem = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolderSystem must be used within a FolderProvider');
  }
  return context;
};
