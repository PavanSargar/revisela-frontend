import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginSuccess,
  loginFailure,
  loginStart,
  logout,
  updateUser,
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { AUTH_ENDPOINTS, USER_ENDPOINTS } from "../endpoints";
import { apiRequest } from "../api-client";

// Type definitions
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
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

interface UserData {
  _id: string;
  name: string;
  email: string;
  username?: string;
  birthday?: string;
  role?: string;
  profileImage?: string;
  // Add other properties as needed
}

interface LoginResponse {
  statusCode: number;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      username?: string;
      role: string;
      birthday: string;
      profileImage?: string;
      // Add other user properties if needed
    };
    access_token: string;
  };
}

// API functions
const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data, error } = await apiRequest<LoginResponse>(
    AUTH_ENDPOINTS.LOGIN,
    { body: credentials, withAuth: false }
  );

  if (error) {
    throw error;
  }

  return data!;
};

// Hook for login mutation
export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginApi,
    onMutate: () => {
      dispatch(loginStart());
    },
    onSuccess: ({ data }) => {
      const user = {
        id: data?.user._id,
        name: data?.user.name,
        email: data?.user.email,
        username: data?.user.username,
        profileImage: data?.user.profileImage,
      };

      dispatch(loginSuccess({ user, token: data?.access_token }));

      // Store token in localStorage with the correct name
      localStorage.setItem("authToken", data?.access_token);

      localStorage.setItem("userDetails", JSON.stringify(user));
    },
    onError: (error) => {
      dispatch(loginFailure(error.message));
    },
  });
};

// Hook for signup mutation
export const useSignup = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await apiRequest(AUTH_ENDPOINTS.SIGNUP, {
        body: data,
        withAuth: false,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: (data: any) => {
      // Check if the signup API returns a token and user data
      if (data?.result?.access_token && data?.result?.user) {
        // Format user data to match the expected structure
        const user = {
          id: data?.result.user._id,
          name: data?.result.user.name,
          email: data?.result.user.email,
          username: data?.result.user.username,
          profileImage: data?.result.user.profileImage,
        };

        // Store token in localStorage
        localStorage.setItem("authToken", data?.result.access_token);

        localStorage.setItem("userDetails", JSON.stringify(user));

        // Update Redux state
        dispatch(loginSuccess({ user, token: data?.result.access_token }));
      }
    },
  });
};

// Hook for user profile query
export const useUserProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => {
      const response = await apiRequest(
        USER_ENDPOINTS.GET_USER(user?.id || "")
      );

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    enabled: !!user?.id, // Only run when userId is available
  });
};

// Hook for password reset
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordData) => {
      const response = await apiRequest(AUTH_ENDPOINTS.RESET_PASSWORD, {
        body: data,
        withAuth: false,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};

// Hook for logout
export const useLogout = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest(AUTH_ENDPOINTS.LOGOUT);

      // Even if the API call fails, we still want to clear the local state
      localStorage.removeItem("authToken");
      localStorage.removeItem("userDetails");

      return response.status === 200;
    },
    onSettled: () => {
      // Always dispatch logout, regardless of API success or failure
      dispatch(logout());
    },
  });
};

// Hook for requesting password reset (forgot password)
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        body: { email },
        withAuth: false,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};

// Hook for verifying OTP
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async (data: { email: string; otp: string }) => {
      const response = await apiRequest(AUTH_ENDPOINTS.VERIFY_OTP, {
        body: data,
        withAuth: false,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
};

export const useInitAuthUser = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async (): Promise<UserData> => {
      const response = await apiRequest(USER_ENDPOINTS.GET_PROFILE);
      if (response.error) throw response.error;
      return response.data?.data as UserData;
    },
    enabled: isAuthenticated && !!token,
    meta: {
      onSuccess: (data: UserData) => {
        dispatch(updateUser(data));
      },
      onError: () => {
        // If fetching user fails, token might be invalid
        dispatch(logout());
      },
    },
  });
};

// Hook for refreshing token
export const useRefreshToken = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async () => {
      const response = await apiRequest(AUTH_ENDPOINTS.REFRESH_TOKEN);

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: (data: any) => {
      // Assuming the same response structure as login
      const user = {
        id: data.result.user._id,
        name: data.result.user.name,
        email: data.result.user.email,
        username: data.result.user.username,
      };

      dispatch(loginSuccess({ user, token: data.result.access_token }));
      localStorage.setItem("authToken", data.result.access_token);
    },
  });
};
