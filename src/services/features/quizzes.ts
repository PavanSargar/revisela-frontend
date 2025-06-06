import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiRequest } from '../api-client';
import { QUIZ_ENDPOINTS } from '../endpoints';
import { QUERY_KEYS } from '../query-keys';

// Define the QuizSet interface
interface QuizSet {
  id: string;
  title: string;
  description?: string;
  questions?: any[];
  isBookmarked?: boolean;
  // Add other relevant properties based on your application's data model
}

// Add a type definition for quizzes
interface QuizData {
  _id: string;
  title: string;
  description?: string;
  questions?: unknown[];
  createdBy?: string;
  isBookmarked?: boolean;
  // Add other properties as needed
}

// Define response interfaces
interface ApiResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

interface QuizResponse {
  data: {
    success: boolean;
    count: number;
    data: QuizData[];
  };
}

// Get bookmarked quizzes
export const useBookmarkedQuizzes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.QUIZZES.bookmarked,
    queryFn: async () => {
      const response = await apiRequest<QuizResponse>(
        QUIZ_ENDPOINTS.GET_BOOKMARKED_QUIZZES
      );

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};

// Bookmark/unbookmark quiz
export const useBookmarkQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quizId,
      bookmarked,
    }: {
      quizId: string;
      bookmarked: boolean;
    }) => {
      const response = await apiRequest(QUIZ_ENDPOINTS.BOOKMARK_QUIZ(quizId), {
        body: { bookmarked },
      });

      if (response.error) {
        throw response.error;
      }

      return { quizId, bookmarked };
    },
    onSuccess: ({ quizId, bookmarked }) => {
      // Update the specific quiz data in the cache
      queryClient.setQueryData(
        QUERY_KEYS.QUIZZES.details(quizId),
        (oldData: any) => {
          if (!oldData) return oldData;
          return { ...oldData, isBookmarked: bookmarked };
        }
      );

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.QUIZZES.bookmarked,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZZES.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZZES.myQuizzes });

      // Also invalidate library queries to update UI state across the app
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.LIBRARY.quizSets(),
      });
    },
  });
};

// Get quizzes by tag
export const useQuizzesByTag = (tag: string) => {
  return useQuery({
    queryKey: ['quizzes', 'tag', tag],
    queryFn: async () => {
      const response = await apiRequest(QUIZ_ENDPOINTS.GET_QUIZZES_BY_TAG(tag));

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    enabled: !!tag,
  });
};

// Update quiz
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quizId,
      data,
    }: {
      quizId: string;
      data: Partial<QuizSet>;
    }) => {
      const response = await apiRequest(QUIZ_ENDPOINTS.UPDATE_QUIZ(quizId), {
        body: data,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['quiz', data.id] });
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['myQuizzes'] });
    },
  });
};

// Delete quiz
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: string) => {
      const response = await apiRequest<{ success: boolean }>(
        QUIZ_ENDPOINTS.DELETE_QUIZ(quizId)
      );

      if (response.error) {
        throw response.error;
      }

      return quizId;
    },
    onSuccess: (quizId) => {
      queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['myQuizzes'] });
    },
  });
};

// Get quizzes in trash
export const useTrashQuizzes = () => {
  return useQuery({
    queryKey: QUERY_KEYS.QUIZZES.trash,
    queryFn: async () => {
      const response = await apiRequest<QuizSet[]>(
        QUIZ_ENDPOINTS.GET_QUIZZES_TRASH
      );

      if (response.error) {
        throw response.error;
      }

      return response.data!;
    },
  });
};

// Restore quiz from trash
export const useRestoreQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: string) => {
      const response = await apiRequest(QUIZ_ENDPOINTS.RESTORE_QUIZ(quizId));

      if (response.error) {
        throw response.error;
      }

      return quizId;
    },
    onSuccess: (quizId) => {
      // Invalidate both trash and regular quizzes queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZZES.trash });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZZES.all });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZZES.myQuizzes });
    },
  });
};

// Permanently delete quiz
export const usePermanentlyDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (quizId: string) => {
      const response = await apiRequest(
        QUIZ_ENDPOINTS.PERMANENTLY_DELETE_QUIZ(quizId)
      );

      if (response.error) {
        throw response.error;
      }

      return quizId;
    },
    onSuccess: (quizId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.QUIZZES.trash });
    },
  });
};
