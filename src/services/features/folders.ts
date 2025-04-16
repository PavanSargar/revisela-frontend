import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FOLDER_ENDPOINTS } from "../endpoints";
import { apiRequest } from "../apiClient";

interface Folder {
  _id: string;
  name: string;
  description?: string;
  parentFolder?: string;
  owner: string;
  subFolders?: string[];
  quizzes?: string[];
  sharedWith?: string[];
  publicAccess?: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateFolderRequest {
  name: string;
  parentId?: string;
  description?: string;
  publicAccess?: string;
}

interface FolderResponse {
  data: Folder[];
}

// Fetch user's folders
export const useFolders = (parentId?: string) => {
  return useQuery({
    queryKey: ["folders", parentId],
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
        queryKey: ["folders", data?.data?.[0]?.owner],
      });
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
