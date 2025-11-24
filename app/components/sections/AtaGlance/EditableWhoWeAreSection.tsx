"use client";

import React from "react";
import { WhoWeAreSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableSelect,
  EditableColorPicker,
} from "../../EditableInputs";
import { motion } from "framer-motion";

interface EditableWhoWeAreProps {
  section: WhoWeAreSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<WhoWeAreSection>) => void;
}

export default function EditableWhoWeAreSection({
  section,
  isEditing,
  onUpdate,
}: EditableWhoWeAreProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const titleAlignment = content.titleAlignment || "left";
    const titleAlignmentClass =
      titleAlignment === "center"
        ? "text-center"
        : titleAlignment === "right"
        ? "text-right"
        : "text-left";

    const textAlignment = content.textAlignment || "left";
    const textAlignmentClass =
      textAlignment === "center"
        ? "text-center"
        : textAlignment === "right"
        ? "text-right"
        : "text-left";

    const sectionAlignment = content.sectionAlignment || "left";
    const accentColor = content.accentColor || "#EF4130";

    return (
      <section className="relative px-4 py-10 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ 
              backgroundColor: accentColor,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" 
            style={{ animation: 'float 10s ease-in-out infinite 2s' }}
          />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-2">
            {/* Text Content */}
            <div
              className={`space-y-8 ${
                sectionAlignment === "left" ? "lg:order-1" : "lg:order-2"
              }`}
              style={{ 
                animation: sectionAlignment === "left" ? 'slideInLeft 1s ease-out' : 'slideInRight 1s ease-out'
              }}
            >
              {content.title && (
                <div style={{ animation: 'fadeInUp 1s ease-out 0.2s both' }}>
                  <h2
                    className={`font-bold leading-tight tracking-tight ${titleAlignmentClass}`}
                    style={{
                      fontSize: content.titleFontSize || "3rem",
                      color: content.titleColor || "#ffffff",
                    }}
                  >
                    {content.title}
                  </h2>
                  {/* Decorative line under title */}
                  <div 
                    className={`h-1 w-20 mt-6 rounded-full ${
                      titleAlignment === "center" ? "mx-auto" :
                      titleAlignment === "right" ? "ml-auto" : ""
                    }`}
                    style={{ 
                      backgroundColor: accentColor,
                      animation: 'scaleIn 0.8s ease-out 0.4s both'
                    }}
                  />
                </div>
              )}

              {content.text && (
                <div 
                  className="space-y-6"
                  style={{ animation: 'fadeInUp 1s ease-out 0.4s both' }}
                >
                  <p
                    className={`leading-relaxed ${textAlignmentClass}`}
                    style={{
                      fontSize: content.textFontSize || "1.125rem",
                      color: content.textColor || "#e5e7eb",
                      lineHeight: "1.8",
                    }}
                  >
                    {content.text}
                  </p>
                </div>
              )}
            </div>

            {/* Image Section */}
            {content.imageUrl && (
              <div
                className={`relative ${
                  sectionAlignment === "left" ? "lg:order-2" : "lg:order-1"
                }`}
                style={{ 
                  animation: sectionAlignment === "left" ? 'slideInRight 1s ease-out 0.3s both' : 'slideInLeft 1s ease-out 0.3s both'
                }}
              >
                <div className="relative group">
                  {/* Main image container */}
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02]">
                    <img
                      src={content.imageUrl}
                      alt={content.title || "Who we are"}
                      className="h-full w-full object-cover aspect-square lg:aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Decorative floating element */}
                  <div 
                    className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ 
                      backgroundColor: accentColor,
                      animation: 'float 6s ease-in-out infinite'
                    }}
                  />

                  {/* Pattern overlay on corner */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-3xl"
                    style={{ 
                      backgroundColor: accentColor,
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '10px 10px'
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Render compact preview
  const renderPreview = () => {
    const titleAlignment = content.titleAlignment || "left";
    const titleAlignmentClass =
      titleAlignment === "center"
        ? "text-center"
        : titleAlignment === "right"
        ? "text-right"
        : "text-left";

    const textAlignment = content.textAlignment || "left";
    const textAlignmentClass =
      textAlignment === "center"
        ? "text-center"
        : textAlignment === "right"
        ? "text-right"
        : "text-left";

    const sectionAlignment = content.sectionAlignment || "left";
    const accentColor = content.accentColor || "#EF4130";

    return (
      <section className="relative px-4 py-8 overflow-hidden rounded-lg">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 items-center lg:grid-cols-2">
            {/* Text Content */}
            <div
              className={`space-y-4 ${
                sectionAlignment === "left" ? "lg:order-1" : "lg:order-2"
              }`}
            >
              {content.title && (
                <div>
                  <h2
                    className={`font-bold leading-tight tracking-tight ${titleAlignmentClass}`}
                    style={{
                      fontSize: "1.5rem",
                      color: content.titleColor || "#ffffff",
                    }}
                  >
                    {content.title}
                  </h2>
                  <div
                    className={`h-1 w-12 mt-2 rounded-full ${
                      titleAlignment === "center" ? "mx-auto" :
                      titleAlignment === "right" ? "ml-auto" : ""
                    }`}
                    style={{
                      backgroundColor: accentColor,
                    }}
                  />
                </div>
              )}

              {content.text && (
                <p
                  className={`leading-relaxed ${textAlignmentClass}`}
                  style={{
                    fontSize: "0.875rem",
                    color: content.textColor || "#e5e7eb",
                    lineHeight: "1.6",
                  }}
                >
                  {content.text.substring(0, 150)}...
                </p>
              )}
            </div>

            {/* Image Section */}
            {content.imageUrl && (
              <div
                className={`relative ${
                  sectionAlignment === "left" ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative overflow-hidden rounded-xl border border-white/10 shadow-lg">
                  <img
                    src={content.imageUrl}
                    alt={content.title || "Who we are"}
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  // Editing Mode
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
          {renderPreview()}
        </div>
      </motion.div>

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
              label="Title"
              value={content.title || ""}
              onChange={(val) => handleContentUpdate({ title: val })}
            />
            <EditableTextarea
              label="Description"
              value={content.text || ""}
              onChange={(val) => handleContentUpdate({ text: val })}
              rows={6}
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Media & Background
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Image"
              type="image"
              currentUrl={content.imageUrl}
              onUpload={(url) => handleContentUpdate({ imageUrl: url })}
              onRemove={() => handleContentUpdate({ imageUrl: "" })}
              placeholder="Upload or paste image URL..."
            />
            {content.imageUrl && (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={content.imageUrl}
                  alt="Preview"
                  className="h-32 w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Layout Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Layout & Positioning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableSelect
              label="Section Alignment"
              value={content.sectionAlignment || "left"}
              onChange={(val) => handleContentUpdate({ sectionAlignment: val })}
              options={[
                { label: "Text Left, Image Right", value: "left" },
                { label: "Image Left, Text Right", value: "right" },
              ]}
            />
            <EditableColorPicker
              label="Accent Color"
              value={content.accentColor || "#EF4130"}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Title Styles
              </h4>
              <EditableText
                label="Font Size"
                value={content.titleFontSize || ""}
                onChange={(val) => handleContentUpdate({ titleFontSize: val })}
                placeholder="e.g. 3rem"
              />
              <EditableColorPicker
                label="Text Color"
                value={content.titleColor || "#ffffff"}
                onChange={(val) => handleContentUpdate({ titleColor: val })}
              />
              <EditableSelect
                label="Alignment"
                value={content.titleAlignment || "left"}
                onChange={(val) => handleContentUpdate({ titleAlignment: val })}
                options={[
                  { label: "Left", value: "left" },
                  { label: "Center", value: "center" },
                  { label: "Right", value: "right" },
                ]}
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                Description Styles
              </h4>
              <EditableText
                label="Font Size"
                value={content.textFontSize || ""}
                onChange={(val) => handleContentUpdate({ textFontSize: val })}
                placeholder="e.g. 1.125rem"
              />
              <EditableColorPicker
                label="Text Color"
                value={content.textColor || "#e5e7eb"}
                onChange={(val) => handleContentUpdate({ textColor: val })}
              />
              <EditableSelect
                label="Alignment"
                value={content.textAlignment || "left"}
                onChange={(val) => handleContentUpdate({ textAlignment: val })}
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
    </div>
  );
}