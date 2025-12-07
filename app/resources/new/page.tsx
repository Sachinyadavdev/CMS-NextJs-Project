'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/app/components/RichTextEditor';
import MediaUpload from '@/app/components/MediaUpload';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useAuthModal } from '@/app/contexts/AuthModalContext';

export default function NewBlogPage() {
    const router = useRouter();
    const { apiFetch } = useAuthModal();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imageUrl: '',
        content: '',
    });

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            router.push('/resources');
            return;
        }
        try {
            const user = JSON.parse(userStr);
            if (!user.isAdmin) {
                router.push('/resources');
            }
        } catch (e) {
            router.push('/resources');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiFetch('/api/resources', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            router.push('/resources');
        } catch (error) {
            console.error('Error creating resource:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <Link
                        href="/resources"
                        className="mr-4 p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold text-red-700">Create New Resource</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
                                placeholder="Enter resource title"
                            />
                        </div>

                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                                Subtitle
                            </label>
                            <input
                                type="text"
                                id="subtitle"
                                value={formData.subtitle}
                                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
                                placeholder="Enter resource subtitle"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cover Image
                            </label>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <MediaUpload
                                    label="Cover Image"
                                    type="image"
                                    currentUrl={formData.imageUrl}
                                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                                    onRemove={() => setFormData({ ...formData, imageUrl: '' })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <div className="prose-editor-wrapper">
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(content) => setFormData({ ...formData, content })}
                                    placeholder="Write your resource content here..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Publish Resource
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
