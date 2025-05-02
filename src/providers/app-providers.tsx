'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ToastProvider } from '@/components/ui/toast';

import { initAuth } from '@/store/slices/authSlice';

import { queryClient } from '@/services';
import { store, useAppDispatch } from '@/store';

function AuthInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);

  return null;
}

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ToastProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthInitializer />
          {children}
          {/* Temporarily comment out the SessionTimeoutHandler */}
          {/* <SessionTimeoutHandler /> */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ToastProvider>
  );
}
