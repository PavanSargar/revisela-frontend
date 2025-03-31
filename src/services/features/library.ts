import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface QuizSet {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
}

// Fetch user's quiz sets
export const useQuizSets = () => {
  return useQuery({
    queryKey: ["quizSets"],
    queryFn: async () => {
      const response = await fetch("/api/quiz-sets");

      if (!response.ok) {
        throw new Error("Failed to fetch quiz sets");
      }

      return response.json() as Promise<QuizSet[]>;
    },
  });
};

// Get a specific quiz set
export const useQuizSet = (id: string) => {
  return useQuery({
    queryKey: ["quizSet", id],
    queryFn: async () => {
      const response = await fetch(`/api/quiz-sets/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch quiz set");
      }

      return response.json() as Promise<QuizSet>;
    },
    enabled: !!id, // Only run when id is available
  });
};

// Create a new quiz set
export const useCreateQuizSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: Omit<QuizSet, "id" | "createdAt" | "updatedAt">
    ) => {
      const response = await fetch("/api/quiz-sets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create quiz set");
      }

      return response.json() as Promise<QuizSet>;
    },
    onSuccess: () => {
      // Invalidate the quiz sets query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["quizSets"] });
    },
  });
};
