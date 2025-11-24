"use client";

import React, { useEffect, useState } from "react";
import { GenericSection } from "@/lib/db";

interface EditableGenericProps {
  section: GenericSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<GenericSection>) => void;
}

export default function EditableGenericSection({ section, isEditing, onUpdate }: EditableGenericProps) {
  const content = section.content || {};
  const [draft, setDraft] = useState(() => JSON.stringify(content, null, 2));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDraft(JSON.stringify(content, null, 2));
  }, [content]);

  if (!isEditing) {
    return (
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-200">
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(content, null, 2)}</pre>
        </div>
      </section>
    );
  }

  const handleBlur = () => {
    try {
      const parsed = JSON.parse(draft);
      onUpdate({ content: parsed });
      setError(null);
    } catch (parseError) {
      setError("Invalid JSON: please fix the syntax before saving.");
    }
  };

  // Render compact preview
  const renderPreview = () => {
    return (
      <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
        <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">{JSON.stringify(content, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* JSON Editor Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            JSON Editor
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Edit {section.type} Content</label>
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onBlur={handleBlur}
                rows={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono text-sm resize-none"
              />
              {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
