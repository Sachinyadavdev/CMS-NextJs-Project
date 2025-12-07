"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableRange,
} from "@/app/components/EditableInputs";

interface CSRSectionContent {
  title: string;
  description: string;
  backgroundImage?: string;
  accentColor: string;
  textColor: string;
  overlayColor: string;
}

interface CSRSectionProps {
  section: { content?: Partial<CSRSectionContent> };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content: Partial<CSRSectionContent> }>) => void;
}

const DEFAULT_CONTENT: CSRSectionContent = {
  title: "CSR & Governance Integration",
  description:
    "For RAUS, governance and social responsibility are inseparable. Every project integrates community welfare, local partnerships and sustainable development. From ethical sourcing to inclusive urban design, we ensure that corporate success aligns with societal progress.",
  accentColor: "#EF4130",
  textColor: "#ffffff",
  overlayColor: "rgba(10,10,10,0.20)",
};

export default function CSRSection({
  section,
  isEditing,
  onUpdate,
}: CSRSectionProps) {
  const content = section.content || {};
  const merged = { ...DEFAULT_CONTENT, ...content };
  const [localContent, setLocalContent] = useState(merged);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    const updated = { ...localContent, ...patch };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const Preview = (props?: { useLocal?: boolean }) => {
    const data = props?.useLocal ? localContent : merged;
    return (
      <section
        className="relative w-full py-24 lg:py-32 flex items-center justify-center overflow-hidden"
        style={{ minHeight: 400, backgroundColor: data.overlayColor }}
      >
        {/* Background Image */}
        {data.backgroundImage && (
          <div className="absolute inset-0">
            <img
              src={data.backgroundImage}
              alt="CSR Background"
              className="w-full h-full object-cover opacity-1"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${data.overlayColor}, ${data.overlayColor} 40%)`,
              }}
            />
          </div>
        )}
        {/* Decorative Accent Bar */}
        <div
          className="absolute left-0 top-0 h-full w-2 lg:w-4"
          style={{ backgroundColor: data.accentColor, opacity: 0.8 }}
        />
        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: data.textColor }}
          >
            {data.title}
          </h2>
          <p
            className="text-lg md:text-xl leading-relaxed mb-0"
            style={{ color: data.textColor, opacity: 0.92 }}
          >
            {data.description}
          </p>
        </div>
        {/* Subtle overlay for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 60%, ${data.overlayColor} 100%)`,
          }}
        />
      </section>
    );
  };

  if (!isEditing) {
    return <Preview />;
  }

  const getOverlayOpacity = (color: string) => {
    const match = color.match(/rgba\(\d+,\d+,\d+,(\d*\.?\d+)\)/);
    return match ? parseFloat(match[1]) : 0.2;
  };

  const setOverlayOpacity = (opacity: number) => {
    handleContentUpdate({ overlayColor: `rgba(10,10,10,${opacity})` });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-red-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8">
          <Preview useLocal />
        </div>
      </motion.div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Content Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={localContent.title}
              onChange={(value: any) => handleContentUpdate({ title: value })}
              placeholder="CSR & Governance Integration"
            />
            <EditableTextarea
              label="Description"
              value={localContent.description}
              onChange={(value: any) =>
                handleContentUpdate({ description: value })
              }
              rows={4}
              placeholder="For RAUS, governance and social responsibility are inseparable..."
            />
          </div>
        </div>

        {/* Colors & Background */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Colors & Styling
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EditableColorPicker
              label="Accent Color"
              value={localContent.accentColor}
              onChange={(value: any) =>
                handleContentUpdate({ accentColor: value })
              }
            />
            <EditableColorPicker
              label="Text Color"
              value={localContent.textColor}
              onChange={(value: any) =>
                handleContentUpdate({ textColor: value })
              }
            />
            <EditableColorPicker
              label="Overlay Color"
              value={localContent.overlayColor}
              onChange={(value: any) =>
                handleContentUpdate({ overlayColor: value })
              }
            />
          </div>
          <div className="mt-6">
            <EditableRange
              label="Overlay Opacity"
              value={getOverlayOpacity(localContent.overlayColor)}
              onChange={setOverlayOpacity}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        {/* Background Image Upload */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Media & Background
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={localContent.backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
              onRemove={() => handleContentUpdate({ backgroundImage: undefined })}
              placeholder="Upload or paste image URL..."
            />
            {localContent.backgroundImage && (
              <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={localContent.backgroundImage}
                  alt="Preview"
                  className="h-40 w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
