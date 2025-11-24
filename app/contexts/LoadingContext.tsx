"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  registerLoader: (id: string) => void;
  unregisterLoader: (id: string) => void;
  setLoading: (id: string, loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loaders, setLoaders] = useState<Record<string, boolean>>({});

  const registerLoader = useCallback((id: string) => {
    setLoaders(prev => {
      if (id in prev) return prev;
      return { ...prev, [id]: false };
    });
  }, []);

  const unregisterLoader = useCallback((id: string) => {
    setLoaders(prev => {
      if (!(id in prev)) return prev;
      const newLoaders = { ...prev };
      delete newLoaders[id];
      return newLoaders;
    });
  }, []);

  const setLoading = useCallback((id: string, loading: boolean) => {
    setLoaders(prev => {
      if (prev[id] === loading) return prev;
      return { ...prev, [id]: loading };
    });
  }, []);

  const isLoading = useMemo(() => Object.values(loaders).some(loading => loading), [loaders]);

  const contextValue = useMemo(() => ({
    isLoading,
    registerLoader,
    unregisterLoader,
    setLoading
  }), [isLoading, registerLoader, unregisterLoader, setLoading]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// Hook for components to manage their own loading state
export function useComponentLoading(id: string) {
  const { registerLoader, unregisterLoader, setLoading } = useLoading();

  React.useEffect(() => {
    registerLoader(id);
    return () => unregisterLoader(id);
  }, [id, registerLoader, unregisterLoader]);

  const startLoading = useCallback(() => setLoading(id, true), [id, setLoading]);
  const stopLoading = useCallback(() => setLoading(id, false), [id, setLoading]);

  return { startLoading, stopLoading };
}