/**
 * Query Keys
 *
 * This file contains constants for all React Query key patterns used in the application.
 * Using these constants ensures consistency and makes invalidation easier.
 */

export const QUERY_KEYS = {
  // User related keys
  USERS: {
    all: ["users"] as const,
    details: (userId: string) => ["user", userId] as const,
    me: ["user", "me"] as const,
    byEmail: (email: string) => ["user", "email", email] as const,
  },

  // Authentication related keys
  AUTH: {
    me: ["user", "me"] as const,
  },

  // Quiz related keys
  QUIZZES: {
    all: ["quizzes"] as const,
    details: (quizId: string) => ["quiz", quizId] as const,
    myQuizzes: ["myQuizzes"] as const,
    byTag: (tag: string) => ["quizzes", "tag", tag] as const,
    search: (query: string) => ["quizSearch", query] as const,
    trash: ["quizzes", "trash"] as const,
  },

  // Folder related keys
  FOLDERS: {
    all: ["folders"] as const,
    byParent: (parentId?: string) => ["folders", parentId] as const,
    details: (folderId: string) => ["folder", folderId] as const,
    trash: ["folders", "trash"] as const,
  },

  // Class related keys
  CLASSES: {
    all: ["classes"] as const,
    myClasses: ["my-classes"] as const,
    details: (classId: string) => ["class", classId] as const,
    members: (classId: string) => ["class", classId, "members"] as const,
    quizzes: (classId: string) => ["class", classId, "quizzes"] as const,
    invitations: ["class-invitations"] as const,
  },

  // Upload related keys
  UPLOADS: {
    presignedUrl: (key: string) => ["presignedUrl", key] as const,
  },

  // Library related keys
  LIBRARY: {
    quizSets: (folderId?: string) => ["quizSets", folderId] as const,
  },
};

/**
 * Usage examples:
 *
 * // Querying:
 * useQuery({
 *   queryKey: QUERY_KEYS.USERS.details('123'),
 *   queryFn: () => fetchUser('123')
 * });
 *
 * // Invalidating:
 * queryClient.invalidateQueries({
 *   queryKey: QUERY_KEYS.USERS.all
 * });
 *
 * // Partial invalidation (all user queries):
 * queryClient.invalidateQueries({
 *   queryKey: ['user']
 * });
 */
