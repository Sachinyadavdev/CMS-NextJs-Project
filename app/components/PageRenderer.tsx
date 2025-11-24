"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import { useAuth } from "@/app/providers";
import Loader from "./Loader";
import {
  Layout,
  PageSection,
  GenericSection,
  LayoutVersion,
} from "@/lib/db";
import { getSectionComponent, getDefaultComponent } from "./sectionLoaders";
import Header from "./Header";
import Footer from "./Footer";

interface PageRendererProps {
  layout: Layout;
}

function PageRenderer({ layout }: PageRendererProps) {
  const { user, token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [sections, setSections] = useState<PageSection[]>(
    layout.sections || []
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versions, setVersions] = useState<LayoutVersion[]>(
    layout.versions || []
  );
  const [draftNotes, setDraftNotes] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingSaveType, setPendingSaveType] = useState<
    "publish" | "draft" | null
  >(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showShortcutTooltip, setShowShortcutTooltip] = useState(false);

  const isAdmin = Boolean(user?.isAdmin);

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      if (typeof window !== "undefined") {
        const hasSeenTooltip = localStorage.getItem("hasSeenEditModeTooltip");
        if (!hasSeenTooltip) {
          setShowShortcutTooltip(true);
          localStorage.setItem("hasSeenEditModeTooltip", "true");
        }
      }
      return;
    }
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setIsLoggedIn(!!storedToken);
      if (storedToken) {
        const hasSeenTooltip = localStorage.getItem("hasSeenEditModeTooltip");
        if (!hasSeenTooltip) {
          setShowShortcutTooltip(true);
          localStorage.setItem("hasSeenEditModeTooltip", "true");
        }
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [token, user]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    setSections(layout.sections || []);
    setVersions(layout.versions || []);
  }, [layout]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof window !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);
      const isMetaKey = isMac ? e.metaKey : e.ctrlKey;
      
      if (isMetaKey && e.key === "e") {
        e.preventDefault();
        setIsEditing(!isEditing);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isEditing]);

  const handleSectionUpdate = useCallback((
    sectionId: string,
    updates: Partial<PageSection>
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? ({ ...section, ...updates } as PageSection)
          : section
      )
    );
  }, []);

  const handleSave = useCallback((isDraft: boolean = false) => {
    setPendingSaveType(isDraft ? "draft" : "publish");
    setShowConfirmModal(true);
  }, []);

  const confirmSave = async () => {
    const isDraft = pendingSaveType === "draft";
    setShowConfirmModal(false);
    setPendingSaveType(null);
    setIsSaving(true);

    try {
      const authToken =
        token ||
        (typeof window !== "undefined" ? localStorage.getItem("token") : null);

      if (!authToken) {
        setToast({
          message:
            "You must be logged in to save changes. Please log in and try again.",
          type: "error",
        });
        setIsSaving(false);
        return;
      }

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const response = await fetch(`/api/layouts/${layout.id}/version`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          sections,
          isDraft,
          notes: isDraft ? draftNotes : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Save error response:", errorData);
        throw new Error(
          `Failed to save version: ${response.status} - ${errorData}`
        );
      }

      const savedLayout = await response.json();
      setSections(savedLayout.sections || []);
      setVersions(savedLayout.versions || []);
      setDraftNotes("");

      if (!isDraft) {
        setIsEditing(false);
        window.dispatchEvent(new Event('layout-cache-invalidate'));
      }

      setToast({
        message: isDraft
          ? "Draft saved successfully!"
          : "Page published successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error saving page:", error);
      setToast({
        message: `Error saving page: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRevert = async (versionId: string) => {
    if (!confirm("Are you sure you want to revert to this version?")) return;

    try {
      const authToken =
        token ||
        (typeof window !== "undefined" ? localStorage.getItem("token") : null);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(`/api/layouts/${layout.id}/revert`, {
        method: "POST",
        headers,
        body: JSON.stringify({ versionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to revert");
      }

      const revertedLayout = await response.json();
      setSections(revertedLayout.sections || []);
      setVersions(revertedLayout.versions || []);
      setShowVersionHistory(false);
      window.dispatchEvent(new Event('layout-cache-invalidate'));
      alert("Reverted successfully!");
    } catch (error) {
      console.error("Error reverting:", error);
      alert("Error reverting to version");
    }
  };

  const renderSection = useCallback((section: PageSection) => {
    const onUpdate = (updates: Partial<PageSection>) =>
      handleSectionUpdate(section.id, updates);

    const Component = getSectionComponent(section.type) || getDefaultComponent();
    
    return (
      <Component
        key={section.id}
        section={section}
        isEditing={isEditing}
        onUpdate={onUpdate}
      />
    );
  }, [isEditing, handleSectionUpdate]);

  return (
    <div className="bg-white text-white">
      {isSaving && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Loader message="Saving changes..." size="lg" />
        </div>
      )}

      <Header
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isSaving={isSaving}
        handleSave={handleSave}
        showVersionHistory={showVersionHistory}
        setShowVersionHistory={setShowVersionHistory}
        versions={versions}
        handleRevert={handleRevert}
        draftNotes={draftNotes}
        setDraftNotes={setDraftNotes}
        isLoggedIn={isLoggedIn}
      />

      <div className="min-h-screen bg-white">
        {sections.filter((section) => !section.hidden).map((section) => renderSection(section))}
      </div>
      <Footer />

      {showConfirmModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm {pendingSaveType === "draft" ? "Draft Save" : "Publish"}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{" "}
              {pendingSaveType === "draft"
                ? "save this draft"
                : "publish this page"}
              ?
              {pendingSaveType === "publish" &&
                " This will make the changes live."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmSave}
                disabled={isSaving}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
              >
                {isSaving
                  ? "Saving..."
                  : pendingSaveType === "draft"
                  ? "Save Draft"
                  : "Publish"}
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingSaveType(null);
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {showShortcutTooltip && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💡 Keyboard Shortcut
            </h3>
            <p className="text-gray-700 mb-4">
              Press{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded border border-gray-200">
                {typeof window !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform) ? "Cmd+E" : "Ctrl+E"}
              </span>{" "}
              to toggle edit mode anytime.
            </p>
            <button
              onClick={() => setShowShortcutTooltip(false)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 rounded transition"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(PageRenderer, (prevProps, nextProps) => {
  return prevProps.layout.id === nextProps.layout.id && 
         prevProps.layout.slug === nextProps.layout.slug &&
         prevProps.layout.sections?.length === nextProps.layout.sections?.length;
});
