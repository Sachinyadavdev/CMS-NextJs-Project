"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./providers";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import { useComponentLoading } from "./contexts/LoadingContext";
import AdminNavbar from "./components/AdminNavbar";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const { startLoading: startHomeLoading, stopLoading: stopHomeLoading } =
    useComponentLoading("home");

  useEffect(() => {
    if (user !== undefined) {
      setAuthLoading(false);
    }
  }, [user, startHomeLoading, stopHomeLoading]);

  const navigateToAdmin = () => {
    router.push("/admin");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Loader message="Loading..." size="lg" />
        </div>
      </div>
    );
  }

  // Redirect non-admin users to /home
  if (!user?.isAdmin) {
    router.push("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Admin Navigation */}
      <AdminNavbar user={user} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-200 shadow-sm mb-6">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">
              Admin Portal
            </span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Content Management Dashboard
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage your website content, layouts and blog posts from one central location.
          </p>
        </div>

        {/* Three Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Page Layout Section */}
          <div
            onClick={() => router.push("/home")}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:border-primary-300 transition-all duration-300 group hover:-translate-y-2 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-50"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">
                Page Layouts
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                View and manage all published page layouts. Preview your live pages and navigate to different sections.
              </p>

              <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                <span>View Layouts</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Layout Management Section */}
          <div
            onClick={navigateToAdmin}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:border-primary-300 transition-all duration-300 group hover:-translate-y-2 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">
                Layout Management
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Create, edit and organize your page layouts. Manage sections, components and content structure.
              </p>

              <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors">
                <span>Manage Layouts</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Blogs Section */}
          <div
            onClick={() => router.push("/blogs")}
            className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 hover:shadow-2xl hover:border-primary-300 transition-all duration-300 group hover:-translate-y-2 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-transparent rounded-bl-full opacity-50"></div>

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-rose-700 transition-colors">
                Blogs
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Create and manage blog posts. Write, edit and publish articles with rich text formatting and media.
              </p>

              <div className="flex items-center text-rose-600 font-semibold group-hover:text-rose-700 transition-colors">
                <span>Manage Blogs</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
