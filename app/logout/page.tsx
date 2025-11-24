'use client';

import { useEffect } from 'react';
import { useAuth } from '@/app/providers';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      router.push('/');
    };
    performLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Logging out...</h1>
        <p className="text-dark-300">Redirecting to home page</p>
      </div>
    </div>
  );
}
