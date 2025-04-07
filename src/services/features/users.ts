import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_ENDPOINTS } from "../endpoints";
import { apiRequest } from "../apiClient";

// Add these types if not already defined
interface User {
  _id: string;
  name: string;
  username?: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// Get all users
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiRequest<User[]>(USER_ENDPOINTS.GET_ALL_USERS);

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
  });
};

// Create user (admin function)
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      username: string;
      email: string;
      password: string;
    }) => {
      const response = await apiRequest<User>(USER_ENDPOINTS.CREATE_USER, {
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Get user by email
export const useUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["user", "email", email],
    queryFn: async () => {
      const response = await apiRequest<User>(
        USER_ENDPOINTS.GET_USER_BY_EMAIL(email)
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    enabled: !!email,
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: Partial<User>;
    }) => {
      const response = await apiRequest<User>(
        USER_ENDPOINTS.UPDATE_USER(userId),
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
      queryClient.invalidateQueries({ queryKey: ["user", data._id] });
      queryClient.invalidateQueries({
        queryKey: ["user", "email", data.email],
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await apiRequest(USER_ENDPOINTS.DELETE_USER(userId));

      if (response.error) {
        throw response.error;
      }

      return userId;
    },
    onSuccess: (userId) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
