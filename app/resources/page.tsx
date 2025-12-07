'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Calendar, ArrowRight } from 'lucide-react';

interface Blog {
    id: string;
    title: string;
    subtitle: string;
    imageUrl: string;
    createdAt: string;
}

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const blogsPerPage = 9;

    useEffect(() => {
        fetchBlogs(currentPage);
        checkAdminStatus();
    }, [currentPage]);

    const checkAdminStatus = () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                setIsAdmin(user.isAdmin);
            } catch (e) {
                console.error('Error parsing user data:', e);
            }
        }
    };

    const fetchBlogs = async (page: number) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/resources?page=${page}&limit=${blogsPerPage}`);
            if (response.ok) {
                const data = await response.json();
                setBlogs(data.blogs);
                setTotalBlogs(data.total);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12 border-b-2 border-red-100 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-red-700">Our Resources</h1>
                        <p className="text-gray-600">Latest insights and updates</p>
                    </div>
                    {isAdmin && (
                        <Link
                            href="/resources/new"
                            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Resource
                        </Link>
                    )}
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
                        <h3 className="text-xl font-medium text-red-800 mb-2">No resources found</h3>
                        <p className="text-gray-600 mb-6">Get started by creating your first resource.</p>
                        {isAdmin && (
                            <Link
                                href="/resources/new"
                                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create New Resource
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link
                                key={blog.id}
                                href={`/resources/${blog.id}`}
                                className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 flex flex-col h-full"
                            >
                                <div className="aspect-video relative overflow-hidden bg-gray-100">
                                    {blog.imageUrl ? (
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-red-50">
                                            <span className="text-red-300 font-medium">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center text-sm text-red-600 mb-3 font-medium">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </div>
                                    <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    {blog.subtitle && (
                                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{blog.subtitle}</p>
                                    )}
                                    <div className="flex items-center text-red-600 font-semibold text-sm group-hover:translate-x-2 transition-transform mt-auto pt-4 border-t border-gray-50">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        currentPage === page
                                            ? 'text-white bg-red-600 border border-red-600'
                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
