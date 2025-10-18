import React from "react";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "../../app/context/UserContext";

// Create a test QueryClient with disabled retry and caching for faster tests
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Mock user data for testing
export const mockUser = {
  id: "test-user-id",
  email: "test@example.com",
  storeName: "test-store",
  template_name: "modern",
  isActive: true,
  onboarded: true,
};

// Custom render function that includes all providers
export const renderWithProviders = (
  ui,
  {
    queryClient = createTestQueryClient(),
    user = mockUser,
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <UserProvider initialData={user}>{children}</UserProvider>
    </QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
};

// Helper to render components that only need QueryClient (no user context)
export const renderWithQueryClient = (ui, options = {}) => {
  const queryClient = createTestQueryClient();
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient,
  };
};

// Helper to wait for React Query mutations/queries to settle
export const waitForQueryToSettle = (queryClient) => {
  return new Promise((resolve) => {
    const unsub = queryClient.getQueryCache().subscribe(() => {
      if (queryClient.isFetching() === 0 && queryClient.isMutating() === 0) {
        unsub();
        resolve();
      }
    });
  });
};

// Mock Next.js router for components that use navigation
export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};
