'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import RichTextEditor from '@/app/components/RichTextEditor';
import MediaUpload from '@/app/components/MediaUpload';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthModal } from '@/app/contexts/AuthModalContext';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const { apiFetch } = useAuthModal();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        imageUrl: '',
        content: '',
    });

    useEffect(() => {
        const checkAuth = () => {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                router.push('/resources');
                return false;
            }
            try {
                const user = JSON.parse(userStr);
                if (!user.isAdmin) {
                    router.push('/resources');
                    return false;
                }
            } catch (e) {
                router.push('/resources');
                return false;
            }
            return true;
        };

        if (checkAuth() && params.id) {
            fetchBlog(params.id as string);
        }
    }, [params.id, router]);

    const fetchBlog = async (id: string) => {
        try {
            const data = await apiFetch(`/api/resources/${id}`);
            setFormData({
                title: data.title,
                subtitle: data.subtitle || '',
                imageUrl: data.imageUrl || '',
                content: data.content,
            });
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await apiFetch(`/api/resources/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            router.push(`/resources/${params.id}`);
        } catch (error) {
            console.error('Error updating blog:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
            return;
        }

        setDeleting(true);
        try {
            await apiFetch(`/api/resources/${params.id}`, {
                method: 'DELETE',
            });

            router.push('/resources');
        } catch (error) {
            console.error('Error deleting resource:', error);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-red-600">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <Link
                            href={`/resources/${params.id}`}
                            className="mr-4 p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <h1 className="text-3xl font-bold text-red-700">Edit Resource</h1>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 border border-red-100"
                    >
                        {deleting ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600 mr-2"></div>
                        ) : (
                            <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        Delete
                    </button>
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
                                placeholder="Enter blog subtitle"
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
                            disabled={saving}
                            className="inline-flex items-center px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
