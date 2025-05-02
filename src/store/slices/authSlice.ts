import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { safeLocalStorage } from '@/lib/utils';

import { RootState } from '@/store';

// Add a utility function to get profile image
export const getProfileImageFromStorage = (): string => {
  try {
    const userDetailsStr = safeLocalStorage.getItem('userDetails');
    if (userDetailsStr) {
      const userDetails = JSON.parse(userDetailsStr);
      return userDetails.profileImage || '';
    }
  } catch (error) {
    console.error('Error reading profile image from storage', error);
  }
  return '';
};

interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initAuth: (state) => {
      const token = safeLocalStorage.getItem('authToken');
      const userDetailsStr = safeLocalStorage.getItem('userDetails');

      if (token) {
        state.token = token;
        state.isAuthenticated = true;

        if (userDetailsStr) {
          try {
            const userDetails = JSON.parse(userDetailsStr);
            state.user = userDetails;
          } catch (error) {
            console.error('Failed to parse user details', error);
          }
        }
      }
    },
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateProfileImage: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.profileImage = action.payload;
      }

      try {
        const userDetailsStr = safeLocalStorage.getItem('userDetails');
        if (userDetailsStr) {
          const userDetails = JSON.parse(userDetailsStr);
          userDetails.profileImage = action.payload;
          safeLocalStorage.setItem('userDetails', JSON.stringify(userDetails));
        }
      } catch (error) {
        console.error('Failed to update profile image in storage', error);
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  initAuth,
  updateProfileImage,
} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectProfileImage = (state: RootState) =>
  state.auth.user?.profileImage || getProfileImageFromStorage();
