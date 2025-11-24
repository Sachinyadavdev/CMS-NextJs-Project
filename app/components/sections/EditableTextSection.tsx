"use client";

import React from "react";
import { TextSection } from "@/lib/db";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect } from "@/app/components/EditableInputs";

interface EditableTextProps {
  section: TextSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<TextSection>) => void;
}

export default function EditableTextSection({
  section,
  isEditing,
  onUpdate,
}: EditableTextProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const renderPreview = () => {
    const {
      title = "",
      text = "",
      alignment = "left",
      fontSize = "2rem",
      color = "#1f2937",
    } = content;

    const alignmentClass =
      alignment === "center"
        ? "text-center"
        : alignment === "right"
        ? "text-right"
        : "text-left";

    return (
      <section className={`px-4 py-12 ${alignmentClass}`}>
        <div
          className="mx-auto max-w-4xl space-y-4"
          style={{ color }}
        >
          {title && (
            <h2
              className="font-semibold"
              style={{ fontSize }}
            >
              {title}
            </h2>
          )}
          {text && (
            <p className="leading-relaxed text-base md:text-lg">
              {text}
            </p>
          )}
        </div>
      </section>
    );
  };

  if (!isEditing) {
    const {
      title = "",
      text = "",
      alignment = "left",
      fontSize = "2rem",
      color = "#1f2937",
    } = content;

    return renderPreview();
  }

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
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Section Title"
              value={content.title || ""}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Enter section title..."
            />
            <EditableTextarea
              label="Body Text"
              value={content.text || ""}
              onChange={(val) => handleContentUpdate({ text: val })}
              rows={5}
              placeholder="Enter body text..."
            />
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Layout
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EditableText
              label="Font Size"
              value={content.fontSize || ""}
              onChange={(val) => handleContentUpdate({ fontSize: val })}
              placeholder="e.g. 1.5rem"
            />
            <EditableColorPicker
              label="Text Color"
              value={content.color || "#1f2937"}
              onChange={(val) => handleContentUpdate({ color: val })}
            />
            <EditableSelect
              label="Alignment"
              value={content.alignment || "left"}
              onChange={(val) => handleContentUpdate({ alignment: val })}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
