'use client';

import { useState } from 'react';
import { useAuth } from '@/app/providers';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(email, password, name);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-800 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-primary-500 mb-6 text-center">Register</h1>

          {error && (
            <div className="bg-primary-600 text-white p-4 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-dark-300 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-dark-700 text-white rounded border border-dark-600 focus:border-primary-500 focus:outline-none"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-dark-700 text-white rounded border border-dark-600 focus:border-primary-500 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-dark-300 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-dark-700 text-white rounded border border-dark-600 focus:border-primary-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center text-dark-300 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-primary-500 hover:text-primary-400">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
