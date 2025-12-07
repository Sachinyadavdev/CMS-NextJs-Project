"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Edit } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

interface RelatedBlog {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
      fetchRelatedBlogs(params.id as string);
    }
    checkAdminStatus();
  }, [params.id]);

  const checkAdminStatus = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setIsAdmin(user.isAdmin);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  };

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/resources/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (currentBlogId: string) => {
    try {
      const response = await fetch("/api/resources");
      if (response.ok) {
        const allBlogs = await response.json();
        const sortedBlogs = allBlogs.blogs?.filter((blog: RelatedBlog) => blog.id !== currentBlogId)
          .sort(
            (a: RelatedBlog, b: RelatedBlog) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setRelatedBlogs(sortedBlogs.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching related resources:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Resource not found</h1>
        <Link
          href="/resources"
          className="text-gray-600 hover:text-red-600 flex items-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-gray-100 pb-8">
          <Link
            href="/resources"
            className="inline-flex items-center text-gray-500 hover:text-red-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Resources
          </Link>

          <div className="flex justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              {blog.title}
            </h1>
            {isAdmin && (
              <Link
                href={`/resources/${blog.id}/edit`}
                className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors ml-4 flex-shrink-0"
                title="Edit Resource"
              >
                <Edit className="w-5 h-5" />
              </Link>
            )}
          </div>

          {blog.subtitle && (
            <p className="text-xl text-gray-600 mb-6 font-light leading-relaxed">
              {blog.subtitle}
            </p>
          )}

          <div className="flex items-center text-red-600 text-sm font-medium bg-red-50 inline-flex px-4 py-2 rounded-full">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(blog.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {blog.imageUrl && (
          <div className="aspect-video w-full relative rounded-2xl overflow-hidden mb-12 shadow-lg">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-red-500 prose-blockquote:bg-red-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-100">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">
              Related Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/resources/${relatedBlog.id}`}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 flex flex-col h-full"
                >
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    {relatedBlog.imageUrl ? (
                      <img
                        src={relatedBlog.imageUrl}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-red-50">
                        <span className="text-red-300 font-medium">
                          No Image
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-red-600 mb-2 font-medium">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(relatedBlog.createdAt).toLocaleDateString()}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    {relatedBlog.subtitle && (
                      <p className="text-gray-600 mb-3 line-clamp-2 flex-grow">
                        {relatedBlog.subtitle}
                      </p>
                    )}
                    <div className="flex items-center text-red-600 font-semibold text-sm group-hover:translate-x-2 transition-transform mt-auto">
                      Read More
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
