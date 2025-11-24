"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "./providers";
import { useState, useEffect } from "react";
import RAUSLogo from "./assets/raus-logo.png";
import { Layout } from "@/lib/db";
import Loader from "./components/Loader";
import { useComponentLoading } from "./contexts/LoadingContext";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { startLoading: startHomeLoading, stopLoading: stopHomeLoading } =
    useComponentLoading("home");

  useEffect(() => {
    if (user !== undefined) {
      setAuthLoading(false);
      if (user?.isAdmin) {
        fetchLayouts();
      }
    }
  }, [user, startHomeLoading, stopHomeLoading]);

  const fetchLayouts = async () => {
    try {
      startHomeLoading();
      const response = await fetch("/api/layouts", {
        headers: {
          "Cache-Control": "max-age=1800",
        },
      });
      const data = await response.json();
      setLayouts(data);
    } catch (error) {
      console.error("Error fetching layouts:", error);
    } finally {
      stopHomeLoading();
    }
  };

  const navigateToAdmin = () => {
    router.push("/admin");
  };

  const navigateToLogout = () => {
    router.push("/logout");
  };

  const navigateToLayout = (slug: string) => {
    router.push(`/${slug}`);
  };

  const navigateToHome = () => {
    router.push("/home");
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
      {/* Enhanced Navigation */}
      <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push("/")}
            >
              <div className="flex-shrink-0 bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <Image src={RAUSLogo} alt="RAUS Logo" className="h-8 w-auto" />
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user && (
                <>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                    <span className="text-sm text-gray-200 font-medium">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={navigateToAdmin}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Admin Dashboard</span>
                  </button>
                  <button
                    onClick={navigateToLogout}
                    className="text-gray-300 hover:text-white transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/5 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-300 focus:outline-none transition-all duration-200 bg-white/10 p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && user && (
          <div className="md:hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-white/10 animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-3 pb-4 space-y-3">
              <div className="px-3 py-2 text-sm text-gray-300 bg-white/5 rounded-lg">
                {user.email}
              </div>
              <button
                onClick={() => {
                  navigateToAdmin();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Admin Dashboard</span>
              </button>
              <button
                onClick={() => {
                  navigateToLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

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
            Content Management
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Manage and preview your published layouts with real-time updates and
            seamless navigation.
          </p>
        </div>

        {/* Layouts Grid */}
        {layouts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No layouts published yet
            </h3>
            <p className="text-slate-600 mb-8 text-lg max-w-md mx-auto">
              Start building amazing pages by creating your first layout in the
              admin panel.
            </p>
            <button
              onClick={navigateToAdmin}
              className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2 mx-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Create First Layout</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {layouts.map((layout) => (
              <div
                key={layout.id}
                onClick={() => navigateToLayout(layout.slug)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 hover:shadow-2xl hover:border-primary-300 transition-all duration-300 group hover:-translate-y-2 cursor-pointer relative overflow-hidden"
              >
                {/* Active Indicator */}
                <div className="absolute top-4 right-4 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-500 font-medium">
                    Live
                  </span>
                </div>

                {/* Layout Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1 pr-8">
                      {layout.title}
                    </h3>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                        {layout.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Layout Content */}
                <div className="mb-6">
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {layout.metadata?.description ||
                      "No description available for this layout."}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500 font-medium">
                      URL:
                    </span>
                    <code className="font-mono bg-slate-50 px-3 py-1.5 rounded-lg text-slate-700 text-sm border group-hover:bg-primary-50 group-hover:border-primary-200 transition-colors">
                      /{layout.slug}
                    </code>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 group-hover:border-primary-100 transition-colors">
                  <span className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-colors">
                    Preview Layout
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                  <div className="w-8 h-8 bg-primary-50 group-hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {layouts.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 border border-slate-200 shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">
                  {layouts.length}
                </div>
                <div className="text-sm text-slate-600">Total Layouts</div>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {layouts.length}
                </div>
                <div className="text-sm text-slate-600">Active</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
