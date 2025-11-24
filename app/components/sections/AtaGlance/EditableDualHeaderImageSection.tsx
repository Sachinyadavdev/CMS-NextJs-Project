"use client";

import React from "react";
import { DualHeaderImageSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableSelect,
  EditableColorPicker,
  EditableCheckbox,
  EditableRange,
} from "../../EditableInputs";
import { motion } from "framer-motion";

interface EditableDualHeaderImageProps {
  section: DualHeaderImageSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<DualHeaderImageSection>) => void;
}

export default function EditableDualHeaderImageSection({
  section,
  isEditing,
  onUpdate,
}: EditableDualHeaderImageProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const textAlignment = content.textAlignment || "right";
    const textPosition = content.textPosition || "bottom-right";
    const overlayOpacity = content.overlayOpacity || 0.5;
    const showOverlay = content.showOverlay !== false;

    // Position mapping
    const positionClasses = {
      "top-left": "top-8 left-8",
      "top-center": "top-8 left-1/2 -translate-x-1/2",
      "top-right": "top-8 right-8",
      "center-left": "top-1/2 -translate-y-1/2 left-8",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "center-right": "top-1/2 -translate-y-1/2 right-8",
      "bottom-left": "bottom-8 left-8",
      "bottom-center": "bottom-8 left-1/2 -translate-x-1/2",
      "bottom-right": "bottom-8 right-8",
    };

    const textAlignmentClass =
      textAlignment === "center"
        ? "text-center"
        : textAlignment === "right"
        ? "text-right"
        : "text-left";

    return (
      <section
        className="relative py-0 bg-cover bg-center bg-no-repeat min-h-[70vh] lg:min-h-[80vh] overflow-hidden"
        style={{
          backgroundImage: content.imageUrl
            ? `url(${content.imageUrl})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Animated overlay with gradient */}
        {showOverlay && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Animated decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-1/3 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            style={{ animation: "float 10s ease-in-out infinite 2s" }}
          />
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-40px) translateX(-10px);
            }
            75% {
              transform: translateY(-20px) translateX(5px);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>

        {/* Content container */}
        <div
          className={`absolute ${
            positionClasses[textPosition as keyof typeof positionClasses] ||
            positionClasses["bottom-right"]
          } z-10 max-w-2xl ${textAlignmentClass}`}
          style={{ animation: "fadeInUp 1s ease-out" }}
        >
          {/* Glass card container */}
          <div className="relative p-8 lg:p-10 rounded-3xl backdrop-blur-sm border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl overflow-hidden">
            {/* Glowing accent in corner */}
            <div
              className="absolute -top-1 -right-1 w-32 h-32 rounded-3xl blur-2xl"
              style={{
                backgroundColor: content.smallHeaderColor || "#f87171",
                opacity: 0.3,
              }}
            />
            <div
              className="absolute top-0 right-0 w-24 h-24 rounded-bl-3xl"
              style={{
                background: `linear-gradient(135deg, ${
                  content.smallHeaderColor || "#f87171"
                }30, transparent)`,
              }}
            />

            <div className="relative space-y-4">
              {/* Small header with decorative line */}
              {content.smallHeader && (
                <div className="space-y-3">
                  <div
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-sm"
                    style={{
                      borderColor: `${content.smallHeaderColor || "#f87171"}40`,
                      backgroundColor: `${
                        content.smallHeaderColor || "#f87171"
                      }10`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        backgroundColor: content.smallHeaderColor || "#f87171",
                      }}
                    />
                    <p
                      className="uppercase tracking-[0.2em] font-bold text-sm"
                      style={{
                        fontSize: content.smallHeaderFontSize || "0.875rem",
                        color: content.smallHeaderColor || "#f87171",
                      }}
                    >
                      {content.smallHeader}
                    </p>
                  </div>
                </div>
              )}

              {/* Big header */}
              {content.bigHeader && (
                <div>
                  <h2
                    className="font-bold leading-tight tracking-tight mb-4"
                    style={{
                      fontSize: content.bigHeaderFontSize || "3rem",
                      color: content.bigHeaderColor || "#ffffff",
                    }}
                  >
                    {content.bigHeader}
                  </h2>
                  {/* Decorative accent line */}
                  <div
                    className={`h-1 w-24 rounded-full ${
                      textAlignment === "center"
                        ? "mx-auto"
                        : textAlignment === "right"
                        ? "ml-auto"
                        : ""
                    }`}
                    style={{
                      backgroundColor: content.smallHeaderColor || "#f87171",
                      animation: "slideIn 0.8s ease-out 0.3s both",
                    }}
                  />
                </div>
              )}

              {/* Optional description */}
              {content.description && (
                <p
                  className="text-lg leading-relaxed opacity-90 pt-2"
                  style={{
                    color: content.descriptionColor || "#e5e7eb",
                    fontSize: content.descriptionFontSize || "1.125rem",
                  }}
                >
                  {content.description}
                </p>
              )}

              {/* Optional CTA button */}
              {content.showButton && content.buttonText && (
                <div className="pt-4">
                  <button
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
                    style={{
                      backgroundColor: content.smallHeaderColor || "#f87171",
                    }}
                  >
                    <span className="relative z-10">{content.buttonText}</span>
                    <svg
                      className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom gradient line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, ${
                  content.smallHeaderColor || "#f87171"
                }, transparent)`,
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  const renderPreview = () => {
    const textAlignment = content.textAlignment || "right";
    const textPosition = content.textPosition || "bottom-right";

    const positionClasses = {
      "bottom-right": "bottom-6 right-6",
      "bottom-left": "bottom-6 left-6",
      "top-right": "top-6 right-6",
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    };

    const textAlignmentClass =
      textAlignment === "center"
        ? "text-center"
        : textAlignment === "right"
        ? "text-right"
        : "text-left";

    return (
      <section
        className="relative py-12 bg-cover bg-center bg-no-repeat min-h-[400px] rounded-lg overflow-hidden"
        style={{
          backgroundImage: content.imageUrl
            ? `url(${content.imageUrl})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />

        <div
          className={`absolute ${
            positionClasses[textPosition as keyof typeof positionClasses] ||
            positionClasses["bottom-right"]
          } max-w-md ${textAlignmentClass}`}
        >
          <div className="p-6 rounded-2xl backdrop-blur-xl border border-white/20 bg-white/10">
            {content.smallHeader && (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full border"
                style={{
                  borderColor: `${content.smallHeaderColor || "#f87171"}40`,
                  backgroundColor: `${content.smallHeaderColor || "#f87171"}10`,
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: content.smallHeaderColor || "#f87171",
                  }}
                />
                <p
                  className="uppercase tracking-wider font-bold text-xs"
                  style={{
                    color: content.smallHeaderColor || "#f87171",
                  }}
                >
                  {content.smallHeader}
                </p>
              </div>
            )}
            {content.bigHeader && (
              <h2
                className="font-bold leading-tight"
                style={{
                  fontSize: "1.5rem",
                  color: content.bigHeaderColor || "#ffffff",
                }}
              >
                {content.bigHeader}
              </h2>
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
              label="Small Header (Badge Text)"
              value={content.smallHeader || ""}
              onChange={(val) => handleContentUpdate({ smallHeader: val })}
              placeholder="e.g., WHO WE ARE"
            />

            <EditableText
              label="Big Header (Main Title)"
              value={content.bigHeader || ""}
              onChange={(val) => handleContentUpdate({ bigHeader: val })}
              placeholder="e.g., Innovative Solutions"
            />

            <EditableTextarea
              label="Description (Optional)"
              value={content.description || ""}
              onChange={(val) => handleContentUpdate({ description: val })}
              rows={3}
              placeholder="Add additional description text..."
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
              label="Background Image"
              type="image"
              currentUrl={content.imageUrl}
              onUpload={(url) => handleContentUpdate({ imageUrl: url })}
              onRemove={() => handleContentUpdate({ imageUrl: "" })}
              placeholder="Upload or paste image URL..."
            />
          </div>
        </div>

        {/* Layout Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Layout & Positioning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EditableSelect
              label="Text Position"
              value={content.textPosition || "bottom-right"}
              onChange={(val) => handleContentUpdate({ textPosition: val })}
              options={[
                { label: "Top Left", value: "top-left" },
                { label: "Top Center", value: "top-center" },
                { label: "Top Right", value: "top-right" },
                { label: "Center Left", value: "center-left" },
                { label: "Center", value: "center" },
                { label: "Center Right", value: "center-right" },
                { label: "Bottom Left", value: "bottom-left" },
                { label: "Bottom Center", value: "bottom-center" },
                { label: "Bottom Right", value: "bottom-right" },
              ]}
            />

            <EditableSelect
              label="Text Alignment"
              value={content.textAlignment || "right"}
              onChange={(val) => handleContentUpdate({ textAlignment: val })}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />

            <EditableRange
              label="Overlay Opacity"
              value={content.overlayOpacity || 0.5}
              onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
              min={0}
              max={1}
              step={0.1}
              unit="%"
              showValue
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
                Small Header Styles
              </h4>
              <EditableText
                label="Font Size"
                value={content.smallHeaderFontSize || ""}
                onChange={(val) => handleContentUpdate({ smallHeaderFontSize: val })}
                placeholder="0.875rem"
              />
              <EditableColorPicker
                label="Text Color"
                value={content.smallHeaderColor || "#f87171"}
                onChange={(val) => handleContentUpdate({ smallHeaderColor: val })}
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                Big Header Styles
              </h4>
              <EditableText
                label="Font Size"
                value={content.bigHeaderFontSize || ""}
                onChange={(val) => handleContentUpdate({ bigHeaderFontSize: val })}
                placeholder="3rem"
              />
              <EditableColorPicker
                label="Text Color"
                value={content.bigHeaderColor || "#ffffff"}
                onChange={(val) => handleContentUpdate({ bigHeaderColor: val })}
              />
            </div>
          </div>
          <div className="mt-6">
            <EditableColorPicker
              label="Description Color"
              value={content.descriptionColor || "#e5e7eb"}
              onChange={(val) => handleContentUpdate({ descriptionColor: val })}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Features & Options
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EditableCheckbox
                label="Show Dark Overlay"
                checked={content.showOverlay !== false}
                onChange={(val) => handleContentUpdate({ showOverlay: val })}
              />

              <EditableCheckbox
                label="Show CTA Button"
                checked={content.showButton || false}
                onChange={(val) => handleContentUpdate({ showButton: val })}
              />

              {content.showButton && (
                <div className="md:col-span-2">
                  <EditableText
                    label="Button Text"
                    value={content.buttonText || ""}
                    onChange={(val) => handleContentUpdate({ buttonText: val })}
                    placeholder="Learn More"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
