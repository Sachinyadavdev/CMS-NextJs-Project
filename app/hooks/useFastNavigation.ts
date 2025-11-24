import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useFastNavigation() {
  const router = useRouter();

  const prefetchPage = useCallback((slug: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/${slug}`;
    document.head.appendChild(link);
  }, []);

  const navigate = useCallback((slug: string) => {
    prefetchPage(slug);
    router.push(`/${slug}`);
  }, [router, prefetchPage]);

  const navigateWithOptimization = useCallback((slug: string) => {
    router.prefetch(`/${slug}`);
    navigate(slug);
  }, [router, navigate]);

  return {
    navigate,
    navigateWithOptimization,
    prefetchPage,
  };
}
