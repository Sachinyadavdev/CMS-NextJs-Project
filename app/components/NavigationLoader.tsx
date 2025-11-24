"use client";

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Loader from './Loader';
import { useLoading, useComponentLoading } from '../contexts/LoadingContext';

export default function NavigationLoader() {
  const { isLoading: globalLoading } = useLoading();
  const [pageTransition, setPageTransition] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Register navigation loading
  const { startLoading: startNavLoading, stopLoading: stopNavLoading } = useComponentLoading('navigation');

  useEffect(() => {
    startNavLoading();
    setPageTransition(true);

    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setPageTransition(false);
      stopNavLoading();
    }, 300);

    return () => {
      clearTimeout(timer);
      stopNavLoading();
    };
  }, [pathname, searchParams, startNavLoading, stopNavLoading]);

  // Show loader if either global loading or page transition is active
  if (!globalLoading && !pageTransition) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <Loader message="Loading page..." size="lg" />
    </div>
  );
}