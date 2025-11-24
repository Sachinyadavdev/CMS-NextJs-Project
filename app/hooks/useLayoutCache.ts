import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch, Layout } from '@/lib/store';
import { fetchLayoutsAsync, invalidateLayoutCache } from '@/lib/store';
import { useAuth } from '@/app/providers';

interface UseLayoutCacheReturn {
  layouts: Layout[];
  isLoading: boolean;
  isCacheValid: boolean;
  refetch: () => void;
  invalidateCache: () => void;
  getLayoutBySlug: (slug: string) => Layout | undefined;
}

export function useLayoutCache(): UseLayoutCacheReturn {
  const dispatch = useDispatch<AppDispatch>();
  const { token, user } = useAuth();
  const { layouts, layoutsFetched, cacheExpiry, needsRefresh, isFetching } = useSelector(
    (state: RootState) => state.layouts
  );

  const isCacheValid = useMemo(() => {
    if (needsRefresh) return false;
    if (!layoutsFetched || layouts.length === 0) return false;
    if (!cacheExpiry) return false;
    return Date.now() < cacheExpiry;
  }, [needsRefresh, layoutsFetched, layouts.length, cacheExpiry]);

  const shouldFetch = useCallback(() => {
    if (isFetching) return false;
    if (user?.isAdmin && needsRefresh) return true;
    if (isCacheValid) return false;
    if (!layoutsFetched || layouts.length === 0) return true;
    return false;
  }, [isFetching, user?.isAdmin, needsRefresh, isCacheValid, layoutsFetched, layouts.length]);

  useEffect(() => {
    if (shouldFetch()) {
      dispatch(fetchLayoutsAsync(token || undefined));
    }
  }, [shouldFetch, dispatch, token]);

  const refetch = useCallback(() => {
    dispatch(fetchLayoutsAsync(token || undefined));
  }, [dispatch, token]);

  const invalidateCacheLocal = useCallback(() => {
    dispatch(invalidateLayoutCache());
  }, [dispatch]);

  const getLayoutBySlug = useCallback(
    (slug: string) => {
      return layouts.find(layout => layout.slug === slug);
    },
    [layouts]
  );

  // Listen for cache invalidation events
  useEffect(() => {
    const handleInvalidateCache = () => {
      invalidateCacheLocal();
    };

    window.addEventListener('layout-cache-invalidate', handleInvalidateCache);
    return () => window.removeEventListener('layout-cache-invalidate', handleInvalidateCache);
  }, [invalidateCacheLocal]);

  return {
    layouts,
    isLoading: isFetching,
    isCacheValid,
    refetch,
    invalidateCache: invalidateCacheLocal,
    getLayoutBySlug,
  };
}
