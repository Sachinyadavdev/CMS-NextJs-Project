"use client";

import React from "react";
import { CardSection } from "@/lib/db";
import MediaUpload from "../MediaUpload";
import { EditableText, EditableTextarea } from "@/app/components/EditableInputs";

interface EditableCardProps {
  section: CardSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<CardSection>) => void;
}

export default function EditableCardSection({ section, isEditing, onUpdate }: EditableCardProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "",
      subtitle = "",
      text = "",
      imageUrl = "",
      mediaUrl = "",
      mediaType = "",
    } = content;

    return (
      <section className="px-4 py-10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
          {imageUrl && (
            <div className="overflow-hidden rounded-xl">
              <img src={imageUrl} alt={title || "Card image"} className="h-64 w-full object-cover" />
            </div>
          )}
          <div className="space-y-4">
            {title && <h3 className="text-2xl font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm uppercase tracking-wide text-red-400">{subtitle}</p>}
            {text && <p className="text-base leading-relaxed text-gray-200">{text}</p>}
          </div>
        </div>
      </section>
    );
  }

  // Render compact preview
  const renderPreview = () => {
    const {
      title = "",
      subtitle = "",
      text = "",
      imageUrl = "",
    } = content;

    return (
      <section className="px-4 py-10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur">
          {imageUrl && (
            <div className="overflow-hidden rounded-xl">
              <img src={imageUrl} alt={title || "Card image"} className="h-32 w-full object-cover" />
            </div>
          )}
          <div className="space-y-4">
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm uppercase tracking-wide text-red-400">{subtitle}</p>}
            {text && <p className="text-sm leading-relaxed text-gray-200">{text.substring(0, 100)}...</p>}
          </div>
        </div>
      </section>
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
        {/* Content Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Card Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Enter card title..."
            />
            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(val) => handleContentUpdate({ subtitle: val })}
              placeholder="Enter card subtitle..."
            />
            <EditableTextarea
              label="Description"
              value={content.text || ""}
              onChange={(val) => handleContentUpdate({ text: val })}
              rows={4}
              placeholder="Enter card description..."
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2" />
            Media & Assets
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Card Image"
              type="image"
              currentUrl={content.imageUrl}
              onUpload={(url) => handleContentUpdate({ imageUrl: url })}
              onRemove={() => handleContentUpdate({ imageUrl: "" })}
              placeholder="Upload or paste image URL..."
            />
            {content.imageUrl && (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img src={content.imageUrl} alt="Preview" className="h-32 w-full object-cover" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableText
                label="Media URL"
                value={content.mediaUrl || ""}
                onChange={(val) => handleContentUpdate({ mediaUrl: val })}
                placeholder="Enter media URL..."
              />
              <EditableText
                label="Media Type"
                value={content.mediaType || ""}
                onChange={(val) => handleContentUpdate({ mediaType: val })}
                placeholder="image / video"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
