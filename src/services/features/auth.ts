import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginSuccess,
  loginFailure,
  loginStart,
  logout,
} from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";

// Type definitions
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  birthday?: string;
}

interface ResetPasswordData {
  email: string;
  otp: string;
  newPassword: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

// API functions
const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  // In a real app, this would be a fetch call to your API
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

// Hook for login mutation
export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: loginApi,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess({ user: data.user, token: data.token }));

      // Optional: Store token in localStorage or a secure cookie
      localStorage.setItem("auth_token", data.token);
    },
    onError: (error) => {
      dispatch(loginFailure(error.message));
    },
  });
};

// Hook for signup mutation
export const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Signup failed");
      }

      return response.json();
    },
  });
};

// Hook for user profile query
export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      return response.json();
    },
    enabled: !!userId, // Only run when userId is available
  });
};

// Hook for password reset
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Password reset failed");
      }

      return response.json();
    },
  });
};

// Hook for logout
export const useLogout = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      // In a real app, you might want to call an API to invalidate the token
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Even if the API call fails, we still want to clear the local state
      localStorage.removeItem("auth_token");

      return response.ok;
    },
    onSettled: () => {
      // Always dispatch logout, regardless of API success or failure
      dispatch(logout());
    },
  });
};
