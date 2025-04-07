import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FOLDER_ENDPOINTS } from "../endpoints";
import { apiRequest } from "../apiClient";

interface Folder {
  id: string;
  name: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch user's folders
export const useFolders = (parentId?: string) => {
  return useQuery({
    queryKey: ["folders", parentId],
    queryFn: async () => {
      const response = await apiRequest<Folder[]>(
        FOLDER_ENDPOINTS.GET_FOLDERS,
        {
          params: parentId ? { parentId } : undefined,
        }
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
  });
};

// Create a new folder
export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; parentId?: string }) => {
      const response = await apiRequest<Folder>(
        FOLDER_ENDPOINTS.CREATE_FOLDER,
        {
          body: data,
        }
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    onSuccess: (data) => {
      // Invalidate the folders query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ["folders", data.parentId],
      });
    },
  });
};

// Update a folder
export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Folder> }) => {
      const response = await apiRequest<Folder>(
        FOLDER_ENDPOINTS.UPDATE_FOLDER(id),
        {
          body: data,
        }
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    onSuccess: (data) => {
      // Invalidate the folders query to refetch the list
      queryClient.invalidateQueries({
        queryKey: ["folders", data.parentId],
      });
      queryClient.invalidateQueries({
        queryKey: ["folders", data.id],
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
