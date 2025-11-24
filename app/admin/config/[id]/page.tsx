'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/providers';
import { Layout, PageMetadata } from '@/lib/db';
import Loader from '@/app/components/Loader';
import { useComponentLoading } from '@/app/contexts/LoadingContext';

export default function AdminConfigPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const id = params.id as string;

  const [layout, setLayout] = useState<Layout | null>(null);
  const [metadata, setMetadata] = useState<PageMetadata>({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
  });
  const [saving, setSaving] = useState(false);
  const { startLoading: startConfigLoading, stopLoading: stopConfigLoading } = useComponentLoading('config');

  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace('/login');
      return;
    }

    fetchLayout();
  }, [user, router, id]);

  const fetchLayout = async () => {
    try {
      startConfigLoading();
      const response = await fetch(`/api/layouts/${id}`);
      if (!response.ok) throw new Error('Layout not found');
      const data: Layout = await response.json();
      setLayout(data);
      setMetadata(data.metadata);
    } catch (error) {
      console.error('Error fetching layout:', error);
    } finally {
      stopConfigLoading();
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/layouts/${id}/metadata`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) throw new Error('Failed to save metadata');

      // Invalidate layout cache for all open tabs
      window.dispatchEvent(new Event('layout-cache-invalidate'));

      alert('SEO Metadata saved successfully!');
      router.push(`/${layout?.slug}`);
    } catch (error) {
      console.error('Error saving metadata:', error);
      alert('Error saving metadata');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof PageMetadata, value: string) => {
    setMetadata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <Loader message="Loading..." size="lg" />
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/admin" className="text-primary-600 hover:text-primary-500 font-semibold">
              ← Back to Admin
            </Link>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-600">The layout you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-primary-600 hover:text-primary-500 font-semibold">
            ← Back to Admin
          </Link>
          <h1 className="text-xl font-bold">SEO Configuration - {layout.title}</h1>
          <div />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Page SEO Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Page Title (SEO)
              </label>
              <input
                type="text"
                value={metadata.title}
                onChange={(e: any) => handleChange('title', e.target.value)}
                maxLength={60}
                placeholder="Recommended: 50-60 characters"
                className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-gray-300 focus:border-primary-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">{metadata.title.length}/60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={metadata.description}
                onChange={(e: any) => handleChange('description', e.target.value)}
                maxLength={160}
                placeholder="Recommended: 150-160 characters"
                rows={3}
                className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-gray-300 focus:border-primary-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">{(metadata.description || '').length}/160 characters</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={metadata.keywords || ''}
                onChange={(e: any) => handleChange('keywords', e.target.value)}
                placeholder="e.g., cms, website builder, no-code"
                className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-gray-300 focus:border-primary-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                OpenGraph Image URL
              </label>
              <input
                type="text"
                value={metadata.ogImage || ''}
                onChange={(e: any) => handleChange('ogImage', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white text-gray-900 px-4 py-3 rounded border border-gray-300 focus:border-primary-500 focus:outline-none"
              />
              {metadata.ogImage && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <img
                    src={metadata.ogImage}
                    alt="OG Image Preview"
                    className="max-w-xs rounded border border-gray-200"
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3">SEO Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Keep page title between 50-60 characters</li>
                <li>✓ Write descriptive meta description (150-160 chars)</li>
                <li>✓ Include 3-5 relevant keywords</li>
                <li>✓ Use a high-quality image (1200x630px recommended) for social sharing</li>
                <li>✓ Ensure all metadata is unique for each page</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save SEO Configuration'}
              </button>
              <Link
                href={`/${layout.slug}`}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
