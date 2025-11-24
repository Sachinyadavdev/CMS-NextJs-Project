"use client";

import React from "react";
import { HomeAboutSection } from "@/lib/db";
import MediaUpload from "../MediaUpload";
import aboutButtonImage from "../../assets/raus_about_button.png"; // Using existing logo as placeholder
import Link from "next/link";

interface EditableHomeAboutProps {
  section: HomeAboutSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HomeAboutSection>) => void;
}

export default function EditableHomeAboutSection({
  section,
  isEditing,
  onUpdate,
}: EditableHomeAboutProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const alignment = content.alignment || "left";
    const layout = content.layout || "image-left";
    const backgroundColor = content.backgroundColor || "#ffffff";
    const textColor = content.textColor || "#333333";
    const titleColor = content.titleColor || "#EF4130";
    const subtitleColor = content.subtitleColor || "#333333";

    // Default content values matching the reference
    const title = content.title || "Redefining the Future of";
    const subtitle =
      content.subtitle || "Built Environments with Integrated Precision";
    const description =
      content.description ||
      "RAUS Integrated Project Management Services LLC is a dynamic, multi-disciplinary solutions partner founded in 2021 and headquartered in the UAE. We are purpose-built to redefine how future-ready environments are imagined and developed.";
    const additionalText =
      content.additionalText ||
      "Our expertise connects ambition with precision across state-of-the-art infrastructure, digital ecosystems, sustainable architecture, ergonomic design and comprehensive fit-out services";

    return (
      <section className="py-16 lg:py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch ${
              layout === "image-right" ? "lg:grid-cols-2" : ""
            }`}
          >
            {/* Logo/Media Section */}
            <div
              className={`${
                layout === "image-right" ? "order-2" : "order-1"
              } flex justify-center lg:justify-start`}
            >
              {content.logoVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                >
                  <source src={content.logoVideo} type="video/mp4" />
                </video>
              ) : content.logoImage ? (
                <img
                  src={content.logoImage}
                  alt="RAUS Logo"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              ) : (
                /* Default RAUS Logo */
                <div className="relative w-full h-full">
                  <div
                    className="w-full h-full rounded-2xl shadow-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#EF4130" }}
                  >
                    {/* Large R Letter with architectural pattern background */}
                    <div className="relative">
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="arch" patternUnits="userSpaceOnUse" width="20" height="20"><path d="M0 10L10 0L20 10L10 20Z" fill="white" fill-opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23arch)"/></svg>')`,
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <span
                        className="text-8xl font-bold text-white relative z-10"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        R
                      </span>
                    </div>
                  </div>
                  {/* Shadow effect */}
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-400 rounded-2xl -z-10"></div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div
              className={`${
                layout === "image-right" ? "order-1" : "order-2"
              } space-y-6`}
            >
              <div
                className={`${
                  alignment === "center"
                    ? "text-center"
                    : alignment === "right"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {/* Title */}
                <h2 className="leading-tight">
                  <span
                    style={{
                      color: titleColor,
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                    className="block"
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      color: subtitleColor,
                      fontSize: "28px",
                      fontWeight: "300",
                    }}
                    className="block mt-2"
                  >
                    {subtitle}
                  </span>
                </h2>

                {/* Main Description */}
                <p
                  style={{ color: textColor }}
                  className="text-lg leading-relaxed mt-6"
                >
                  {description}
                </p>

                {/* Additional Text */}
                {additionalText && (
                  <p
                    style={{ color: textColor }}
                    className="text-lg leading-relaxed mt-4"
                  >
                    {additionalText}
                  </p>
                )}

                {/* About Us Image Button */}
                <div className="mt-8">
                  <Link href="/at-a-glance">
                    <img
                      src={aboutButtonImage.src}
                      alt="About Us"
                      className="h-auto max-h-8 object-contain cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const alignment = content.alignment || "left";
    const layout = content.layout || "image-left";
    const backgroundColor = content.backgroundColor || "#ffffff";
    const textColor = content.textColor || "#333333";
    const titleColor = content.titleColor || "#EF4130";
    const subtitleColor = content.subtitleColor || "#333333";

    // Default content values matching the reference
    const title = content.title || "Redefining the Future of";
    const subtitle =
      content.subtitle || "Built Environments with Integrated Precision";
    const description =
      content.description ||
      "RAUS Integrated Project Management Services LLC is a dynamic, multi-disciplinary solutions partner founded in 2021 and headquartered in the UAE. We are purpose-built to redefine how future-ready environments are imagined and developed.";
    const additionalText =
      content.additionalText ||
      "Our expertise connects ambition with precision across state-of-the-art infrastructure, digital ecosystems, sustainable architecture, ergonomic design and comprehensive fit-out services";

    return (
      <section className="py-8 rounded-lg" style={{ backgroundColor }}>
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`grid lg:grid-cols-2 gap-8 items-stretch ${
              layout === "image-right" ? "lg:grid-cols-2" : ""
            }`}
          >
            {/* Logo/Media Section */}
            <div
              className={`${
                layout === "image-right" ? "order-2" : "order-1"
              } flex justify-center lg:justify-start`}
            >
              {content.logoVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
                >
                  <source src={content.logoVideo} type="video/mp4" />
                </video>
              ) : content.logoImage ? (
                <img
                  src={content.logoImage}
                  alt="RAUS Logo"
                  className="w-full h-64 object-cover rounded-2xl shadow-xl"
                />
              ) : (
                /* Default RAUS Logo */
                <div className="relative w-full h-64">
                  <div
                    className="w-full h-full rounded-2xl shadow-xl flex items-center justify-center"
                    style={{ backgroundColor: "#EF4130" }}
                  >
                    <div className="relative">
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="arch" patternUnits="userSpaceOnUse" width="20" height="20"><path d="M0 10L10 0L20 10L10 20Z" fill="white" fill-opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23arch)"/></svg>')`,
                          backgroundSize: "40px 40px",
                        }}
                      />
                      <span
                        className="text-6xl font-bold text-white relative z-10"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        R
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div
              className={`${
                layout === "image-right" ? "order-1" : "order-2"
              } space-y-4`}
            >
              <div
                className={`${
                  alignment === "center"
                    ? "text-center"
                    : alignment === "right"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {/* Title */}
                <h2 className="leading-tight">
                  <span
                    style={{
                      color: titleColor,
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                    className="block"
                  >
                    {title}
                  </span>
                  <span
                    style={{
                      color: subtitleColor,
                      fontSize: "24px",
                      fontWeight: "300",
                    }}
                    className="block mt-1"
                  >
                    {subtitle}
                  </span>
                </h2>

                {/* Main Description */}
                <p
                  style={{ color: textColor }}
                  className="text-base leading-relaxed mt-4"
                >
                  {description}
                </p>

                {/* Additional Text */}
                {additionalText && (
                  <p
                    style={{ color: textColor }}
                    className="text-base leading-relaxed mt-3"
                  >
                    {additionalText}
                  </p>
                )}

                {/* About Us Image Button */}
                <div className="mt-6">
                  <img
                    src={aboutButtonImage.src}
                    alt="About Us"
                    className="h-auto max-h-6 object-contain cursor-pointer hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                </div>
              </div>
            </div>
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
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(event) =>
                  handleContentUpdate({ title: event.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(event) =>
                  handleContentUpdate({ subtitle: event.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter subtitle..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={content.description || ""}
                onChange={(event) =>
                  handleContentUpdate({ description: event.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter description..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Text
              </label>
              <textarea
                value={content.additionalText || ""}
                onChange={(event) =>
                  handleContentUpdate({ additionalText: event.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter additional text..."
              />
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2" />
            Logo & Media
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaUpload
                label="Logo Image"
                type="image"
                currentUrl={content.logoImage}
                onUpload={(url) =>
                  handleContentUpdate({ logoImage: url, logoVideo: "" })
                }
                onRemove={() => handleContentUpdate({ logoImage: "" })}
                placeholder="Upload or paste logo image URL..."
              />
              <MediaUpload
                label="Logo Video"
                type="video"
                currentUrl={content.logoVideo}
                onUpload={(url) =>
                  handleContentUpdate({ logoVideo: url, logoImage: "" })
                }
                onRemove={() => handleContentUpdate({ logoVideo: "" })}
                placeholder="Upload or paste logo video URL..."
              />
            </div>
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Layout
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={content.backgroundColor || "#ffffff"}
                onChange={(event) =>
                  handleContentUpdate({ backgroundColor: event.target.value })
                }
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={content.textColor || "#333333"}
                onChange={(event) =>
                  handleContentUpdate({ textColor: event.target.value })
                }
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Title Color
              </label>
              <input
                type="color"
                value={content.titleColor || "#EF4130"}
                onChange={(event) =>
                  handleContentUpdate({ titleColor: event.target.value })
                }
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Subtitle Color
              </label>
              <input
                type="color"
                value={content.subtitleColor || "#333333"}
                onChange={(event) =>
                  handleContentUpdate({ subtitleColor: event.target.value })
                }
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Alignment
              </label>
              <select
                value={content.alignment || "left"}
                onChange={(event) =>
                  handleContentUpdate({ alignment: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Layout
              </label>
              <select
                value={content.layout || "image-left"}
                onChange={(event) =>
                  handleContentUpdate({ layout: event.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="image-left">Image Left</option>
                <option value="image-right">Image Right</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
