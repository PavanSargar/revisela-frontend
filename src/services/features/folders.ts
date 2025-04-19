import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FOLDER_ENDPOINTS } from "../endpoints";
import { apiRequest } from "../api-client";
import { QUERY_KEYS } from "@/services/query-keys";

interface SubFolder {
  _id: string;
  name: string;
}

interface Folder {
  _id: string;
  name: string;
  description?: string;
  parentFolder?: string;
  owner: string;
  subFolders?: SubFolder[];
  quizzes?: string[];
  sharedWith?: string[];
  publicAccess?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateFolderRequest {
  name: string;
  parentFolder?: string;
  description?: string;
  publicAccess?: string;
}

interface FolderResponse {
  data: Folder[];
}

// Fetch user's folders
export const useFolders = (parentId?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLDERS.byParent(parentId),
    queryFn: async () => {
      const response = await apiRequest<FolderResponse>(
        FOLDER_ENDPOINTS.GET_FOLDERS,
        {
          params: parentId ? { parentId } : undefined,
        }
      );

      if (response.error) {
        throw response.error;
      }

      return response.data?.data || [];
    },
  });
};

// Create a new folder
export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFolderRequest) => {
      const response = await apiRequest<FolderResponse>(
        FOLDER_ENDPOINTS.CREATE_FOLDER,
        {
          body: data,
        }
      );

      if (response.error) {
        throw response.error;
      }

      return { data: response.data?.data || [] };
    },
    onSuccess: (data: FolderResponse) => {
      // Invalidate the folders query to refetch the list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.FOLDERS.all,
      });

      if (data?.data?.[0]?.parentFolder) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.FOLDERS.byParent(data.data[0].parentFolder),
        });
      }
    },
  });
};

// Update a folder
export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Pick<Folder, "name" | "description">;
    }) => {
      const response = await apiRequest<FolderResponse>(
        FOLDER_ENDPOINTS.UPDATE_FOLDER(id),
        {
          body: data,
        }
      );

      if (response.error || !response.data) {
        throw new Error("Failed to update folder");
      }

      // Return the response directly as a FolderResponse
      return response.data;
    },
    onSuccess: (data: FolderResponse) => {
      // Invalidate the folders query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ["folders", data.data[0]?.owner],
      });
      queryClient.invalidateQueries({
        queryKey: ["folders", data.data[0]?.parentFolder],
      });
    },
  });
};

// Delete a folder
export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (folderId: string) => {
      const response = await apiRequest(
        FOLDER_ENDPOINTS.DELETE_FOLDER(folderId)
      );

      if (response.error) {
        throw response.error;
      }

      return folderId;
    },
    onSuccess: (_, folderId) => {
      // Invalidate the folders query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ["folders"],
      });
    },
  });
};

// Get details for a single folder
export const useFolderDetails = (folderId?: string, enabled = true) => {
  return useQuery({
    queryKey: QUERY_KEYS.FOLDERS.details(folderId || ""),
    queryFn: async () => {
      if (!folderId) return null;

      const response = await apiRequest<{ data: Folder }>(
        FOLDER_ENDPOINTS.GET_FOLDER(folderId)
      );

      if (response.error) {
        throw response.error;
      }

      return response.data?.data;
    },
    enabled: enabled && !!folderId,
  });
};
