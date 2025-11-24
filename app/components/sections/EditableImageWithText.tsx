"use client";

import React from "react";
import { ImageWithTextSection } from "@/lib/db";
import MediaUpload from "../MediaUpload";

interface EditableImageWithTextProps {
  section: ImageWithTextSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ImageWithTextSection>) => void;
}

export default function EditableImageWithText({
  section,
  isEditing,
  onUpdate,
}: EditableImageWithTextProps) {
  const content = section.content || {};

  if (!isEditing) {
    const {
      heading = "Default Heading",
      text = "Default text content",
      image = "",
      imagePosition = "left",
      backgroundColor = "#ffffff",
      textColor = "#000000"
    } = content;

    return (
      <div
        className="py-16 px-4"
        style={{ backgroundColor }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              imagePosition === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`${
                imagePosition === "right" ? "md:order-2" : ""
              } group`}
            >
              <img
                src={image}
                alt={heading}
                className="w-full rounded-xl shadow-xl group-hover:shadow-2xl transition-all duration-300 object-cover"
              />
            </div>

            <div
              className={`${
                imagePosition === "right" ? "md:order-1" : ""
              } animate-fade-in-up`}
              style={{ color: textColor }}
            >
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {heading}
              </h2>
              <p className="text-xl mb-10 leading-relaxed opacity-90 max-w-lg">
                {text}
              </p>
              {content.buttonText && (
                <button
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (content.buttonLink?.startsWith("#")) {
                      document
                        .querySelector(content.buttonLink)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20"
                >
                  {content.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  // Render compact preview
  const renderPreview = () => {
    const {
      heading = "Default Heading",
      text = "Default text content",
      image = "",
      imagePosition = "left",
      backgroundColor = "#ffffff",
      textColor = "#000000"
    } = content;

    return (
      <div
        className="relative min-h-[250px] flex items-center rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="max-w-md mx-auto px-4 py-6">
          <div
            className={`flex flex-col gap-4 ${imagePosition === "right" ? "items-end" : "items-start"}`}
          >
            {image && (
              <img
                src={image}
                alt={heading}
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
            )}
            <div style={{ color: textColor }}>
              <h3 className="text-lg font-bold mb-2">{heading}</h3>
              <p className="text-sm opacity-90 line-clamp-3">{text}</p>
            </div>
          </div>
        </div>
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
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Heading</label>
              <input
                type="text"
                value={content.heading || ""}
                onChange={(event) => handleContentUpdate({ heading: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter section heading"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Content</label>
              <textarea
                value={content.text || ""}
                onChange={(event) => handleContentUpdate({ text: event.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter section text content"
              />
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2" />
            Media & Background
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Image"
              type="image"
              currentUrl={content.image}
              onUpload={(url) => handleContentUpdate({ image: url })}
              onRemove={() => handleContentUpdate({ image: "" })}
              placeholder="Upload or paste image URL..."
            />
            {content.image && (
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={content.image}
                  alt="Preview"
                  className="h-32 w-full object-cover"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image Position</label>
              <select
                value={content.imagePosition || "left"}
                onChange={(event) =>
                  handleContentUpdate({ imagePosition: event.target.value as "left" | "right" })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                <option value="left">Image on Left</option>
                <option value="right">Image on Right</option>
              </select>
            </div>
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={content.backgroundColor || "#ffffff"}
                  onChange={(event) => handleContentUpdate({ backgroundColor: event.target.value })}
                  className="h-12 w-12 rounded-xl border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={content.backgroundColor || "#ffffff"}
                  onChange={(event) => handleContentUpdate({ backgroundColor: event.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="#ffffff"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={content.textColor || "#000000"}
                  onChange={(event) => handleContentUpdate({ textColor: event.target.value })}
                  className="h-12 w-12 rounded-xl border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={content.textColor || "#000000"}
                  onChange={(event) => handleContentUpdate({ textColor: event.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Features & Options
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text (Optional)</label>
              <input
                type="text"
                value={content.buttonText || ""}
                onChange={(event) => handleContentUpdate({ buttonText: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Enter button text"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link</label>
              <input
                type="text"
                value={content.buttonLink || ""}
                onChange={(event) => handleContentUpdate({ buttonLink: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="https://example.com or #section-id"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
