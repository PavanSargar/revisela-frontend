import { QueryClient } from "@tanstack/react-query";

// Export endpoints and API client
export * from "./endpoints";
export * from "./apiClient";

// Create a client with default settings
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
