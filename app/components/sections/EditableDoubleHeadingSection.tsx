"use client";

import React from "react";
import { DoubleHeadingSection } from "@/lib/db";
import { EditableText, EditableColorPicker, EditableSelect } from "@/app/components/EditableInputs";

interface EditableDoubleHeadingProps {
  section: DoubleHeadingSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<DoubleHeadingSection>) => void;
}

export default function EditableDoubleHeadingSection({ section, isEditing, onUpdate }: EditableDoubleHeadingProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "",
      subtitle = "",
      alignment = "center",
      backgroundColor = "transparent",
      marginTop = "0px",
      marginBottom = "0px",
      titleColor = "#ef4130",
      titleFontSize = "2rem",
      subtitleColor = "#333333",
      subtitleFontSize = "1.5rem",
    } = content;

    const alignmentClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";

    return (
      <section
        className={`px-4 py-12 ${alignmentClass}`}
        style={{
          backgroundColor,
          marginTop,
          marginBottom,
        }}
      >
        <div className="mx-auto max-w-5xl space-y-4">
          {title && (
            <h2
              className="font-semibold"
              style={{ color: titleColor, fontSize: titleFontSize }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className="text-lg mt-2"
              style={{ color: subtitleColor, fontSize: subtitleFontSize, fontWeight: '300' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "",
      subtitle = "",
      alignment = "center",
      backgroundColor = "transparent",
      marginTop = "0px",
      marginBottom = "0px",
      titleColor = "#ef4130",
      titleFontSize = "2rem",
      subtitleColor = "#333333",
      subtitleFontSize = "1.5rem",
    } = content;

    const alignmentClass = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";

    return (
      <section
        className={`px-4 py-8 rounded-lg ${alignmentClass}`}
        style={{
          backgroundColor,
          marginTop,
          marginBottom,
        }}
      >
        <div className="mx-auto max-w-5xl space-y-4">
          <h2
            className="font-semibold"
            style={{ color: titleColor, fontSize: titleFontSize }}
          >
            {title || "Your Title Here"}
          </h2>
          <p
            className="text-lg mt-2"
            style={{ color: subtitleColor, fontSize: subtitleFontSize, fontWeight: '300' }}
          >
            {subtitle || "Your subtitle here"}
          </p>
        </div>
      </section>
    );
  };

  const handleSaveChanges = () => {
    onUpdate({ content });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Live Preview */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-indigo-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Edit Double Heading Section</h3>
          <span className="h-3 w-3 rounded-full bg-indigo-400/40" />
        </div>
      <div className="space-y-6">
        <EditableText
          label="Title"
          value={content.title || ""}
          onChange={(val) => handleContentUpdate({ title: val })}
        />
        <EditableText
          label="Subtitle"
          value={content.subtitle || ""}
          onChange={(val) => handleContentUpdate({ subtitle: val })}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableText
            label="Title Font Size"
            value={content.titleFontSize || ""}
            onChange={(val) => handleContentUpdate({ titleFontSize: val })}
            placeholder="e.g. 28px"
          />
          <EditableText
            label="Subtitle Font Size"
            value={content.subtitleFontSize || ""}
            onChange={(val) => handleContentUpdate({ subtitleFontSize: val })}
            placeholder="e.g. 24px"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableColorPicker
            label="Title Color"
            value={content.titleColor || "#EF4130"}
            onChange={(val) => handleContentUpdate({ titleColor: val })}
          />
          <EditableColorPicker
            label="Subtitle Color"
            value={content.subtitleColor || "#333333"}
            onChange={(val) => handleContentUpdate({ subtitleColor: val })}
          />
        </div>
        <EditableSelect
          label="Alignment"
          value={content.alignment || "center"}
          onChange={(val) => handleContentUpdate({ alignment: val })}
          options={[
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ]}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableText
            label="Margin Top"
            value={content.marginTop || ""}
            onChange={(val) => handleContentUpdate({ marginTop: val })}
            placeholder="e.g. 0px"
          />
          <EditableText
            label="Margin Bottom"
            value={content.marginBottom || ""}
            onChange={(val) => handleContentUpdate({ marginBottom: val })}
            placeholder="e.g. 0px"
          />
        </div>
        <EditableColorPicker
          label="Background Color"
          value={content.backgroundColor || "#ffffff"}
          onChange={(val) => handleContentUpdate({ backgroundColor: val })}
        />

        {/* Save Button */}
        <div className="mt-6 border-t border-indigo-100 pt-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
