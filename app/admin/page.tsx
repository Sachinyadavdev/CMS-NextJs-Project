"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import { useComponentLoading } from "@/app/contexts/LoadingContext";
import { useAuthModal } from "@/app/contexts/AuthModalContext";
import AdminNavbar from "../components/AdminNavbar";

interface Layout {
  id: string;
  name: string;
  title: string;
  slug: string;
  createdAt: string;
}

export default function AdminPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const { apiFetch } = useAuthModal();
  const [layouts, setLayouts] = useState<Layout[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { startLoading, stopLoading } = useComponentLoading("layouts");

  const fetchLayouts = useCallback(async () => {
    try {
      startLoading();
      setError("");
      const data = await apiFetch("/api/layouts");

      const cleaned = Array.isArray(data)
        ? data.filter((item) => item.sections && item.sections.length > 0)
        : [];

      setLayouts(cleaned);
    } catch (err) {
      setError("Failed to load layouts. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      stopLoading();
    }
  }, [apiFetch, startLoading, stopLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!user?.isAdmin) {
      router.replace("/");
      return;
    }
    fetchLayouts();
  }, [isLoading, user, router, fetchLayouts]);

  const deleteLayout = async (id: string) => {
    try {
      setDeletingId(id);
      setError("");
      await apiFetch(`/api/layouts/${id}`, {
        method: "DELETE",
      });

      setLayouts((prev) => prev.filter((l) => l.id !== id));
      setShowDeleteModal(null);
      window.dispatchEvent(new CustomEvent("layouts-refetch"));
    } catch (err) {
      setError("Failed to delete layout");
    } finally {
      setDeletingId(null);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(layouts.length / pageSize);
  const paginatedLayouts = layouts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const navigateToCreate = () => router.push("/admin/create");
  const navigateToEdit = (id: string) => router.push(`/admin/edit/${id}`);
  const navigateToSite = () => router.push("/");
  const navigateToLogout = () => router.push("/logout");

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <Loader message="Loading admin panel..." size="lg" />
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <AdminNavbar user={user} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-24 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Layout Management
            </h2>
            <p className="mt-1 text-gray-600">Manage all website layouts</p>
          </div>
          <button
            onClick={navigateToCreate}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:from-orange-700 hover:to-red-700 transition transform hover:-translate-y-0.5"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Layout
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Layout
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedLayouts.map((layout) => (
                  <tr
                    key={layout.id}
                    className="hover:bg-orange-50/50 transition-colors cursor-pointer"
                    onClick={() => navigateToEdit(layout.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-5 h-5 text-orange-600"
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
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {layout.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {layout.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg font-mono">
                        {layout.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(layout.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div
                        className="flex justify-end items-center space-x-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => navigateToEdit(layout.id)}
                          className="text-orange-600 hover:text-orange-800 font-medium px-3 py-2 rounded-lg hover:bg-orange-100 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(layout.id)}
                          disabled={deletingId === layout.id}
                          className="text-red-600 hover:text-red-800 font-medium px-3 py-2 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                        >
                          {deletingId === layout.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {layouts.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold">
                  {(currentPage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(currentPage * pageSize, layouts.length)}
                </span>{" "}
                of <span className="font-semibold">{layouts.length}</span>{" "}
                layouts
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {[10, 25, 50].map((size) => (
                    <option key={size} value={size}>
                      {size} per page
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span className="text-sm font-medium px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition"
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {layouts.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <svg
              className="mx-auto h-16 w-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900">
              No layouts found
            </h3>
            <p className="mt-2 text-gray-500">
              Get started by creating your first layout.
            </p>
            <button
              onClick={navigateToCreate}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition"
            >
              Create Layout
            </button>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Layout?
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              This action <strong>cannot be undone</strong>. This will
              permanently delete the layout and all its content.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-5 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteLayout(showDeleteModal)}
                disabled={deletingId === showDeleteModal}
                className="px-5 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-70 transition flex items-center"
              >
                {deletingId === showDeleteModal ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Deleting...
                  </>
                ) : (
                  "Delete Permanently"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
