"use client";

import { useEffect } from "react";
import { store, useAppDispatch } from "@/store";
import { initAuth } from "@/store/slices/authSlice";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { queryClient } from "@/services";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionTimeoutHandler } from "@/components/auth/SessionTimeoutHandler";

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        {children}
        {/* Temporarily comment out the SessionTimeoutHandler */}
        {/* <SessionTimeoutHandler /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
