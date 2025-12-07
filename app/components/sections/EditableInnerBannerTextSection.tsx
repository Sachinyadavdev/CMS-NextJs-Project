"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { InnerBannerTextSection } from "@/lib/db";
import MediaUpload from "../MediaUpload";

interface EditableInnerBannerTextProps {
  section: InnerBannerTextSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InnerBannerTextSection>) => void;
}

export default function EditableInnerBannerTextSection({ section, isEditing, onUpdate }: EditableInnerBannerTextProps) {
  const router = useRouter();
  const content = section.content || {};
  const overlayValue = Number(content.overlayOpacity ?? 0.6);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "Strategic Consulting & Advisory Solutions",
      description = "We offer expert guidance across real estate, infrastructure, urban planning and digital transformation—helping clients turn vision into strategic, actionable plans that drive sustainable and measurable growth.",
      titleColor = "#EF4130",
      descriptionColor = "#ffffff",
      titleFontSize = "48px",
      descriptionFontSize = "18px",
      alignment = "center",
      bannerBackgroundImage = "",
      bannerBackgroundVideo = "",
      overlayColor = "#000000",
      overlayOpacity = "0.5",
      height = "700px",
      paddingTop = "100px",
      paddingBottom = "100px",
      link = "",
    } = content;

    const handleBannerClick = () => {
      if (link) {
        router.push(link);
      }
    };

    return (
      <section
        className={`relative flex items-center justify-center overflow-hidden ${link ? "cursor-pointer" : ""}`}
        onClick={handleBannerClick}
        style={{
          height,
          paddingTop,
          paddingBottom,
        }}
      >
        {/* Background Media */}
        {bannerBackgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bannerBackgroundVideo} type="video/mp4" />
          </video>
        ) : bannerBackgroundImage ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: bannerBackgroundImage
                ? `url("${bannerBackgroundImage}")`
                : "none",
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800" />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div
            className={`${
              alignment === "center"
                ? "text-center"
                : alignment === "right"
                ? "text-right"
                : "text-left"
            } max-w-6xl w-full`}
          >
            {/* Title */}
            <h1
              className="font-bold mb-6 leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              style={{
                color: titleColor,
                fontSize: titleFontSize,
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                className={`leading-relaxed text-base sm:text-lg ${
                  alignment === "center" ? "mx-auto max-w-4xl" : "max-w-4xl"
                }`}
                style={{
                  color: descriptionColor,
                  fontSize: descriptionFontSize,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "Strategic Consulting & Advisory Solutions",
      description = "We offer expert guidance across real estate, infrastructure, urban planning and digital transformation—helping clients turn vision into strategic, actionable plans that drive sustainable and measurable growth.",
      titleColor = "#EF4130",
      descriptionColor = "#ffffff",
      titleFontSize = "48px",
      descriptionFontSize = "18px",
      alignment = "center",
      bannerBackgroundImage = "",
      bannerBackgroundVideo = "",
      overlayColor = "#000000",
      overlayOpacity = "0.5",
      height = "400px",
      paddingTop = "60px",
      paddingBottom = "60px",
      link = "",
    } = content;

    const handlePreviewClick = () => {
      if (link) {
        router.push(link);
      }
    };

    return (
      <section
        className={`relative flex items-center justify-center overflow-hidden rounded-lg ${link ? "cursor-pointer" : ""}`}
        onClick={handlePreviewClick}
        style={{
          height,
          paddingTop,
          paddingBottom,
        }}
      >
        {/* Background Media */}
        {bannerBackgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bannerBackgroundVideo} type="video/mp4" />
          </video>
        ) : bannerBackgroundImage ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: bannerBackgroundImage
                ? `url("${bannerBackgroundImage}")`
                : "none",
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800" />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
          <div
            className={`${
              alignment === "center"
                ? "text-center"
                : alignment === "right"
                ? "text-right"
                : "text-left"
            } max-w-4xl w-full`}
          >
            {/* Title */}
            <h1
              className="font-bold mb-4 leading-tight text-xl sm:text-2xl md:text-3xl"
              style={{
                color: titleColor,
                fontSize: `calc(${titleFontSize} * 0.6)`, // Scale down for preview
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                className={`leading-relaxed text-sm sm:text-base ${
                  alignment === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
                }`}
                style={{
                  color: descriptionColor,
                  fontSize: `calc(${descriptionFontSize} * 0.9)`, // Scale down for preview
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  };

  const handleSaveChanges = () => {
    onUpdate({ content });
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(event) => handleContentUpdate({ title: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter banner title..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={content.description || ""}
                onChange={(event) => handleContentUpdate({ description: event.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter banner description..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Link (Optional)</label>
              <input
                type="text"
                value={content.link || ""}
                onChange={(event) => handleContentUpdate({ link: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter link (e.g., /about or https://example.com)..."
              />
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2" />
            Background Media
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaUpload
                label="Background Image"
                type="image"
                currentUrl={content.bannerBackgroundImage}
                onUpload={(url) => handleContentUpdate({ bannerBackgroundImage: url })}
                onRemove={() => handleContentUpdate({ bannerBackgroundImage: '' })}
                placeholder="Upload background image or paste URL..."
              />
              <MediaUpload
                label="Background Video"
                type="video"
                currentUrl={content.bannerBackgroundVideo}
                onUpload={(url) => handleContentUpdate({ bannerBackgroundVideo: url })}
                onRemove={() => handleContentUpdate({ bannerBackgroundVideo: '' })}
                placeholder="Upload background video or paste URL..."
              />
            </div>
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title Color</label>
              <input
                type="color"
                value={content.titleColor || "#EF4130"}
                onChange={(event) => handleContentUpdate({ titleColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Description Color</label>
              <input
                type="color"
                value={content.descriptionColor || "#ffffff"}
                onChange={(event) => handleContentUpdate({ descriptionColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Overlay Color</label>
              <input
                type="color"
                value={content.overlayColor || "#000000"}
                onChange={(event) => handleContentUpdate({ overlayColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title Font Size</label>
              <input
                type="text"
                value={content.titleFontSize || "48px"}
                onChange={(event) => handleContentUpdate({ titleFontSize: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="48px"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Description Font Size</label>
              <input
                type="text"
                value={content.descriptionFontSize || "18px"}
                onChange={(event) => handleContentUpdate({ descriptionFontSize: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="18px"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
              <select
                value={content.alignment || "center"}
                onChange={(event) => handleContentUpdate({ alignment: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Overlay Opacity</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={overlayValue}
                onChange={(event) => handleContentUpdate({ overlayOpacity: parseFloat(event.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Height</label>
              <input
                type="text"
                value={content.height || "700px"}
                onChange={(event) => handleContentUpdate({ height: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="700px"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Padding Top</label>
              <input
                type="text"
                value={content.paddingTop || "100px"}
                onChange={(event) => handleContentUpdate({ paddingTop: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="100px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
