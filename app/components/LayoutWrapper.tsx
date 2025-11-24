"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch, Layout } from "@/lib/store";
import { fetchLayoutsAsync, invalidateLayoutCache } from "@/lib/store";
import { useAuth } from "@/app/providers";
import PageRenderer from "./PageRenderer";

interface LayoutWrapperProps {
  initialLayout: Layout;
  slug: string;
}

export default function LayoutWrapper({ initialLayout, slug }: LayoutWrapperProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useAuth();
  const { layouts, layoutsFetched, cacheExpiry, needsRefresh, isFetching } = useSelector((state: RootState) => state.layouts);
  const [currentLayout, setCurrentLayout] = useState<Layout>(initialLayout);

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
  }, [dispatch, token, shouldFetch]);

  // Update current layout when Redux layouts change or slug changes
  useEffect(() => {
    if (layoutsFetched && layouts.length > 0) {
      const layoutFromRedux = layouts.find(layout => layout.slug === slug);
      if (layoutFromRedux) {
        setCurrentLayout(layoutFromRedux);
      } else {
        // Fallback to initial layout if not found in Redux
        setCurrentLayout(initialLayout);
      }
    }
  }, [layouts, slug, layoutsFetched, initialLayout]);

  // Listen for cache invalidation events (from admin publish)
  useEffect(() => {
    const handleInvalidateCache = () => {
      dispatch(invalidateLayoutCache());
    };

    window.addEventListener('layout-cache-invalidate', handleInvalidateCache);
    return () => window.removeEventListener('layout-cache-invalidate', handleInvalidateCache);
  }, [dispatch]);

  return <PageRenderer layout={currentLayout} />;
}