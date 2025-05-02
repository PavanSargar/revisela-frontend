import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiRequest } from '../api-client';
import { CLASS_ENDPOINTS } from '../endpoints';

// Types
interface ClassMember {
  _id: string;
  userId: string;
  user?: {
    name: string;
    email: string;
    username?: string;
  };
  role: 'admin' | 'member' | 'collaborator';
  status: 'invited' | 'active';
}

interface Class {
  _id: string;
  name: string;
  description: string;
  subject?: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  members?: ClassMember[];
}

interface ClassInvitation {
  _id: string;
  classId: string;
  class?: Class;
  role: 'admin' | 'member' | 'collaborator';
  invitedAt: string;
}

// Create class
export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      subject?: string;
      isPublic: boolean;
    }) => {
      const response = await apiRequest<Class>(CLASS_ENDPOINTS.CREATE_CLASS, {
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      queryClient.invalidateQueries({ queryKey: ['my-classes'] });
    },
  });
};

// Get all classes the current user is a member of
export const useMyClasses = () => {
  return useQuery({
    queryKey: ['my-classes'],
    queryFn: async () => {
      const response = await apiRequest<Class[]>(
        CLASS_ENDPOINTS.GET_MY_CLASSES
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
  });
};

// Get class by ID
export const useClass = (classId: string) => {
  return useQuery({
    queryKey: ['class', classId],
    queryFn: async () => {
      const response = await apiRequest<Class>(
        CLASS_ENDPOINTS.GET_CLASS(classId)
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    enabled: !!classId,
  });
};

// Update class
export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      data,
    }: {
      classId: string;
      data: Partial<Class>;
    }) => {
      const response = await apiRequest<Class>(
        CLASS_ENDPOINTS.UPDATE_CLASS(classId),
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
      queryClient.invalidateQueries({ queryKey: ['class', data._id] });
      queryClient.invalidateQueries({ queryKey: ['my-classes'] });
    },
  });
};

// Delete class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (classId: string) => {
      const response = await apiRequest(CLASS_ENDPOINTS.DELETE_CLASS(classId));

      if (response.error) {
        throw response.error;
      }

      return classId;
    },
    onSuccess: (classId) => {
      queryClient.invalidateQueries({ queryKey: ['class', classId] });
      queryClient.invalidateQueries({ queryKey: ['my-classes'] });
    },
  });
};

// Add member to class
export const useAddClassMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      data,
    }: {
      classId: string;
      data: { email: string; role: 'admin' | 'member' | 'collaborator' };
    }) => {
      const response = await apiRequest<ClassMember>(
        CLASS_ENDPOINTS.ADD_MEMBER(classId),
        {
          body: data,
        }
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({
        queryKey: ['class', classId, 'members'],
      });
      queryClient.invalidateQueries({ queryKey: ['class', classId] });
    },
  });
};

// Get class members
export const useClassMembers = (classId: string) => {
  return useQuery({
    queryKey: ['class', classId, 'members'],
    queryFn: async () => {
      const response = await apiRequest<ClassMember[]>(
        CLASS_ENDPOINTS.GET_MEMBERS(classId)
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    enabled: !!classId,
  });
};

// Remove member from class
export const useRemoveClassMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      memberId,
    }: {
      classId: string;
      memberId: string;
    }) => {
      const response = await apiRequest(
        CLASS_ENDPOINTS.REMOVE_MEMBER(classId, memberId)
      );

      if (response.error) {
        throw response.error;
      }

      return { classId, memberId };
    },
    onSuccess: ({ classId }) => {
      queryClient.invalidateQueries({
        queryKey: ['class', classId, 'members'],
      });
      queryClient.invalidateQueries({ queryKey: ['class', classId] });
    },
  });
};

// Accept class invitation
export const useAcceptClassInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (classId: string) => {
      const response = await apiRequest(
        CLASS_ENDPOINTS.ACCEPT_INVITATION(classId)
      );

      if (response.error) {
        throw response.error;
      }

      return classId;
    },
    onSuccess: (classId) => {
      queryClient.invalidateQueries({ queryKey: ['class-invitations'] });
      queryClient.invalidateQueries({ queryKey: ['my-classes'] });
    },
  });
};

// Get pending invitations
export const usePendingInvitations = () => {
  return useQuery({
    queryKey: ['class-invitations'],
    queryFn: async () => {
      const response = await apiRequest<ClassInvitation[]>(
        CLASS_ENDPOINTS.GET_PENDING_INVITATIONS
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
  });
};

// Add quiz to class
export const useAddQuizToClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      classId,
      quizId,
    }: {
      classId: string;
      quizId: string;
    }) => {
      const response = await apiRequest(
        CLASS_ENDPOINTS.ADD_QUIZ_TO_CLASS(classId, quizId)
      );

      if (response.error) {
        throw response.error;
      }

      return { classId, quizId };
    },
    onSuccess: ({ classId }) => {
      queryClient.invalidateQueries({
        queryKey: ['class', classId, 'quizzes'],
      });
    },
  });
};

// Get class quizzes
export const useClassQuizzes = (classId: string) => {
  return useQuery({
    queryKey: ['class', classId, 'quizzes'],
    queryFn: async () => {
      const response = await apiRequest(
        CLASS_ENDPOINTS.GET_CLASS_QUIZZES(classId)
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    enabled: !!classId,
  });
};
