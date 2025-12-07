"use client";

import React from "react";
import { motion } from "framer-motion";
import MediaUpload from "@/app/components/MediaUpload";

interface InfraParagraphContent {
  title?: string;
  content?: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  accentColor?: string;
  highlightColor?: string;
  showDivider?: boolean;
  alignment?: "left" | "center" | "right";
  layout?: "centered" | "side-by-side";
  imagePosition?: "left" | "right";
  buttonText?: string;
  buttonLink?: string;
}

interface InfraParagraphContProps {
  section: { content?: InfraParagraphContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: InfraParagraphContent }>) => void;
}

export default function InfraParagraphCont({
  section,
  isEditing,
  onUpdate,
}: InfraParagraphContProps) {
  const content = {
    title: "About Us",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at fermentum felis. Phasellus eget vehicula sem. Duis malesuada sapien nec quam gravida accumsan. Nam vel quam in turpis ultrices consectetur ut nec orci.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=600&fit=crop",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    titleColor: "#1f2937",
    descriptionColor: "#6b7280",
    accentColor: "#EF4130",
    highlightColor: "#FEE2E2",
    showDivider: false,
    alignment: "left",
    layout: "side-by-side",
    imagePosition: "left",
    buttonText: "About Us",
    buttonLink: "#",
    ...section.content,
  } as InfraParagraphContent;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    if (content.layout === "side-by-side" && content.imageUrl) {
      const contentJsx = (
        <motion.div
          initial={{ opacity: 0, x: content.imagePosition === "left" ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center"
        >
          {content.title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-bold mb-8"
              style={{ color: content.titleColor || content.textColor }}
            >
              {content.title}
            </motion.h2>
          )}

          {content.content && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl leading-relaxed font-light mb-8"
              style={{ color: content.descriptionColor || content.textColor }}
            >
              {content.content}
            </motion.p>
          )}

          {content.buttonText && (
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ y: -2 }}
              transition={{ duration: 0.3 }}
              href={content.buttonLink || "#"}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium w-fit"
              style={{ backgroundColor: content.accentColor, color: "#ffffff" }}
            >
              <span>{content.buttonText}</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.a>
          )}
        </motion.div>
      );

      const imageJsx = (
        <motion.div
          initial={{ opacity: 0, x: content.imagePosition === "left" ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 sm:h-full min-h-96 rounded-2xl overflow-hidden group"
        >
          <motion.img
            src={content.imageUrl}
            alt={content.title || "Section image"}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/10 rounded-2xl"
          />
        </motion.div>
      );

      return (
        <section
          className="relative py-24 overflow-hidden min-h-screen"
          style={{ backgroundColor: content.backgroundColor }}
        >
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center min-h-96">
              {content.imagePosition === "left" ? (
                <>
                  {imageJsx}
                  {contentJsx}
                </>
              ) : (
                <>
                  {contentJsx}
                  {imageJsx}
                </>
              )}
            </div>
          </div>
        </section>
      );
    }

    return (
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: content.backgroundColor }}
      >
        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500 to-transparent rounded-full blur-3xl"
          style={{ opacity: 0.1 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-500 to-transparent rounded-full blur-3xl"
          style={{ opacity: 0.1 }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Title */}
          {content.title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center"
              style={{ color: content.titleColor || content.textColor }}
            >
              {content.title}
            </motion.h2>
          )}

          {/* Top Divider */}
          {content.showDivider && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 w-20 mx-auto mb-8 rounded-full"
              style={{ backgroundColor: content.accentColor }}
            />
          )}

          {/* Content Paragraph */}
          {content.content && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Highlight Background */}
              <div
                className="absolute inset-0 rounded-2xl opacity-30"
                style={{ backgroundColor: content.highlightColor }}
              />

              <p
                className={`relative text-lg sm:text-xl lg:text-2xl leading-relaxed font-light p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-sm ${content.alignment === "left"
                  ? "text-left"
                  : content.alignment === "right"
                    ? "text-right"
                    : "text-center"
                  }`}
                style={{ color: content.descriptionColor || content.textColor }}
              >
                {/* Animated Quote Mark */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-5xl opacity-20 block mb-4"
                  style={{ color: content.accentColor }}
                >
                  "
                </motion.span>

                {content.content}

                {/* Closing Quote Mark */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-5xl opacity-20 block mt-4"
                  style={{ color: content.accentColor }}
                >
                  "
                </motion.span>
              </p>
            </motion.div>
          )}

          {/* Bottom Divider */}
          {content.showDivider && (
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-1 w-20 mx-auto mt-8 rounded-full"
              style={{ backgroundColor: content.accentColor }}
            />
          )}
        </div>
      </section>
    );
  }

  // ========================= EDIT MODE =========================
  const PreviewCard = () => {
    if (content.layout === "side-by-side" && content.imageUrl) {
      return (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
        >
          <section
            className="relative py-8 overflow-hidden"
            style={{ backgroundColor: content.backgroundColor }}
          >
            <div className="relative z-10 px-6">
              <div className="grid grid-cols-2 gap-6">
                {content.imagePosition === "left" ? (
                  <>
                    <motion.div
                      className="relative h-48 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={content.imageUrl}
                        alt={content.title || "Section image"}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="flex flex-col justify-center gap-3">
                      {content.title && (
                        <motion.h2
                          className="text-lg font-bold"
                          style={{ color: content.titleColor || content.textColor }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {content.title}
                        </motion.h2>
                      )}
                      {content.content && (
                        <motion.p
                          className="text-xs leading-relaxed font-light"
                          style={{ color: content.descriptionColor || content.textColor }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {content.content.substring(0, 100)}...
                        </motion.p>
                      )}
                      {content.buttonText && (
                        <motion.button
                          className="inline-flex items-center gap-1 px-4 py-2 rounded text-xs font-medium text-white w-fit"
                          style={{ backgroundColor: content.accentColor }}
                          whileHover={{ y: -2, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
                          whileTap={{ y: 0 }}
                        >
                          {content.buttonText}
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col justify-center gap-3">
                      {content.title && (
                        <motion.h2
                          className="text-lg font-bold"
                          style={{ color: content.titleColor || content.textColor }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {content.title}
                        </motion.h2>
                      )}
                      {content.content && (
                        <motion.p
                          className="text-xs leading-relaxed font-light"
                          style={{ color: content.descriptionColor || content.textColor }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {content.content.substring(0, 100)}...
                        </motion.p>
                      )}
                      {content.buttonText && (
                        <motion.button
                          className="inline-flex items-center gap-1 px-4 py-2 rounded text-xs font-medium text-white w-fit"
                          style={{ backgroundColor: content.accentColor }}
                          whileHover={{ y: -2, boxShadow: "0 8px 16px rgba(0,0,0,0.15)" }}
                          whileTap={{ y: 0 }}
                        >
                          {content.buttonText}
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </motion.button>
                      )}
                    </div>
                    <motion.div
                      className="relative h-48 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={content.imageUrl}
                        alt={content.title || "Section image"}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </section>

          <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-gray-800 font-medium text-sm">Live Preview</span>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
      >
        <section
          className="relative py-12 overflow-hidden"
          style={{ backgroundColor: content.backgroundColor }}
        >
          <div className="relative z-10 max-w-3xl mx-auto px-6">
            {content.title && (
              <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: content.titleColor || content.textColor }}>
                {content.title}
              </h2>
            )}

            {content.showDivider && (
              <div
                className="h-0.5 w-12 mx-auto mb-6 rounded-full"
                style={{ backgroundColor: content.accentColor }}
              />
            )}

            {content.content && (
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-xl opacity-20"
                  style={{ backgroundColor: content.highlightColor }}
                />
                <p
                  className={`relative text-sm leading-relaxed font-light p-6 rounded-xl ${content.alignment === "left"
                    ? "text-left"
                    : content.alignment === "right"
                      ? "text-right"
                      : "text-center"
                    }`}
                  style={{ color: content.descriptionColor || content.textColor }}
                >
                  "{content.content}"
                </p>
              </div>
            )}
          </div>
        </section>

        <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-gray-800 font-medium text-sm">Live Preview</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Infrastructure Paragraph Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Edit content with real-time preview
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <PreviewCard />
          </motion.div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Title & Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Content
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={content.title || ""}
                    onChange={(e: any) => handleUpdate({ title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                    placeholder="Section title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={content.content || ""}
                    onChange={(e: any) => handleUpdate({ content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition resize-none"
                    placeholder="Enter your paragraph content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alignment
                  </label>
                  <select
                    value={content.alignment || "center"}
                    onChange={(e: any) =>
                      handleUpdate({ alignment: e.target.value as "left" | "center" | "right" })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Layout
                  </label>
                  <select
                    value={content.layout || "centered"}
                    onChange={(e: any) =>
                      handleUpdate({ layout: e.target.value as "centered" | "side-by-side" })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  >
                    <option value="centered">Centered (Text Only)</option>
                    <option value="side-by-side">Side by Side (With Image)</option>
                  </select>
                </div>

                {content.layout === "side-by-side" && (
                  <>
                    <div>
                      <MediaUpload
                        label="Upload Image"
                        type="image"
                        currentUrl={content.imageUrl}
                        onUpload={(url) => handleUpdate({ imageUrl: url })}
                        onRemove={() => handleUpdate({ imageUrl: "" })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Position
                      </label>
                      <select
                        value={content.imagePosition || "left"}
                        onChange={(e: any) =>
                          handleUpdate({ imagePosition: e.target.value as "left" | "right" })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={content.buttonText || ""}
                        onChange={(e: any) => handleUpdate({ buttonText: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        placeholder="e.g., Learn More"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={content.buttonLink || ""}
                        onChange={(e: any) => handleUpdate({ buttonLink: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        placeholder="https://example.com"
                      />
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Colors Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Styling
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.backgroundColor}
                      onChange={(e: any) => handleUpdate({ backgroundColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <code className="text-sm text-gray-500 font-mono flex-1">
                      {content.backgroundColor}
                    </code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color (Fallback)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.textColor}
                      onChange={(e: any) => handleUpdate({ textColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <code className="text-sm text-gray-500 font-mono flex-1">
                      {content.textColor}
                    </code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.titleColor || content.textColor}
                      onChange={(e: any) => handleUpdate({ titleColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <code className="text-sm text-gray-500 font-mono flex-1">
                      {content.titleColor || content.textColor}
                    </code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.descriptionColor || content.textColor}
                      onChange={(e: any) => handleUpdate({ descriptionColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <code className="text-sm text-gray-500 font-mono flex-1">
                      {content.descriptionColor || content.textColor}
                    </code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.accentColor}
                      onChange={(e: any) => handleUpdate({ accentColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <code className="text-sm text-gray-500 font-mono flex-1">
                      {content.accentColor}
                    </code>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highlight Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={content.highlightColor}
                      onChange={(e: any) => handleUpdate({ highlightColor: e.target.value })}
                      className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <code className="text-sm text-gray-500 font-mono flex-1">
                      {content.highlightColor}
                    </code>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Options Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Options
              </h2>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={content.showDivider || false}
                  onChange={(e: any) => handleUpdate({ showDivider: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Show Dividers
                </span>
              </label>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
