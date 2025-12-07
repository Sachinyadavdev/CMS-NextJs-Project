"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/providers";
import { useRouter, useParams } from "next/navigation";
import MediaUpload from "@/app/components/MediaUpload";
import Loader from "@/app/components/Loader";
import SectionManager from "@/app/components/SectionManager";
import { useComponentLoading } from "@/app/contexts/LoadingContext";
import { useAuthModal } from "@/app/contexts/AuthModalContext";
import type { PageSection } from "@/lib/db";

interface LayoutResponse {
  id: string;
  name: string;
  title: string;
  slug: string;
  sections?: PageSection[];
  metadata?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
  };
}

export default function EditLayoutPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { apiFetch } = useAuthModal();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    slug: "",
    description: "",
    keywords: "",
    ogImage: "",
  });
  const [sections, setSections] = useState<PageSection[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { startLoading: startLayoutLoading, stopLoading: stopLayoutLoading } =
    useComponentLoading("layout");

  const fetchLayout = useCallback(async () => {
    try {
      startLayoutLoading();
      setError("");
      const data: LayoutResponse = await apiFetch(`/api/layouts/${id}`);
      setFormData({
        name: data.name || "",
        title: data.title || "",
        slug: data.slug || "",
        description: data.metadata?.description || "",
        keywords: data.metadata?.keywords || "",
        ogImage: data.metadata?.ogImage || "",
      });
      setSections(data.sections || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching layout");
    } finally {
      stopLayoutLoading();
    }
  }, [id, apiFetch, startLayoutLoading, stopLayoutLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!user?.isAdmin) {
      router.replace("/");
      return;
    }
    fetchLayout();
  }, [fetchLayout, isLoading, router, user]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    setShowConfirmModal(false);

    setSaving(true);

    try {
      await apiFetch(`/api/layouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          slug: formData.slug,
          sections: sections,
          metadata: {
            title: formData.title,
            description: formData.description,
            keywords: formData.keywords,
            ogImage: formData.ogImage,
          },
        }),
      });

      setToast({ message: "Layout updated successfully!", type: "success" });

      // Invalidate layout cache for all open tabs
      window.dispatchEvent(new Event("layout-cache-invalidate"));

      setTimeout(() => router.push("/admin"), 2000);
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Error updating layout",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const navigateToAdmin = () => {
    router.push("/admin");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Loader message="Loading..." size="lg" />
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={navigateToAdmin}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Edit Layout</h1>
                <p className="text-sm text-gray-500">
                  Update your page structure and content
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToAdmin}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-25">
                <h2 className="text-lg font-semibold text-gray-900">
                  Layout Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Update the structure and metadata for your layout
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-red-800 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Layout Name & Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Layout Name
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                        placeholder="e.g., Homepage"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Title
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="e.g., Welcome to Our Site"
                      required
                    />
                  </div>
                </div>

                {/* URL Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 font-medium">/</span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="home"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Full URL:{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                      /{formData.slug || "your-slug"}
                    </code>
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-none"
                    placeholder="Describe this page for search engines and social media..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Recommended: 150-160 characters. Current:{" "}
                    {formData.description.length}
                  </p>
                </div>

                {/* Meta Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="e.g., cms, marketing, sustainability"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Separate keywords with commas
                  </p>
                </div>

                {/* Open Graph Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Open Graph Image
                  </label>
                  <MediaUpload
                    label=""
                    type="image"
                    currentUrl={formData.ogImage}
                    onUpload={(url) =>
                      setFormData((prev) => ({ ...prev, ogImage: url }))
                    }
                    onRemove={() =>
                      setFormData((prev) => ({ ...prev, ogImage: "" }))
                    }
                    placeholder="Upload or paste Open Graph image URL..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Recommended: 1200×630 pixels for social media sharing
                  </p>
                </div>
              </form>
            </div>

            {/* Section Manager */}
            <div className="mt-8">
              <SectionManager sections={sections} onUpdate={setSections} />
            </div>
          </div>

          {/* Preview & Actions Sidebar */}
          <div className="lg:col-span-1">
            {/* Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Save Changes
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Review your changes before updating. All modifications will be
                applied immediately.
              </p>

              <div className="space-y-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={saving}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>

                <button
                  onClick={navigateToAdmin}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Values
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500 font-medium">Name:</span>
                  <p className="text-gray-900 font-medium">
                    {formData.name || "Not set"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">URL:</span>
                  <p className="text-gray-900 font-mono">
                    /{formData.slug || "your-slug"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">Title:</span>
                  <p className="text-gray-900">{formData.title || "Not set"}</p>
                </div>
                {formData.description && (
                  <div>
                    <span className="text-gray-500 font-medium">
                      Description:
                    </span>
                    <p className="text-gray-900 line-clamp-2">
                      {formData.description}
                    </p>
                  </div>
                )}
                {formData.ogImage && (
                  <div>
                    <span className="text-gray-500 font-medium">OG Image:</span>
                    <div className="mt-2">
                      <img
                        src={formData.ogImage}
                        alt="OG Preview"
                        className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-auto shadow-xl">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Update Layout?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to save these changes? This will update the
              layout immediately.
            </p>

            <div className="flex gap-3">
              <button
                onClick={confirmSubmit}
                disabled={saving}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Update Layout"
                )}
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-500">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg border ${
              toast.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  toast.type === "success" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    toast.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {toast.type === "success" ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  )}
                </svg>
              </div>
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
