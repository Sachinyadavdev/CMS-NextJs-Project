"use client";

import React from "react";
import { RealEstateDesignBuildSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

interface EditableRealEstateDesignBuildProps {
  section: RealEstateDesignBuildSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateDesignBuildSection>) => void;
}

export default function EditableRealEstateDesignBuildSection({
  section,
  isEditing,
  onUpdate,
}: EditableRealEstateDesignBuildProps) {
  const content = section.content || {};
  const {
    title = "We Build Brands With Purposeful Minimalism",
    subtitle = "",
    description =
      "At Craftive, we’re a team of passionate designers and strategists who bring ideas to life through impactful visuals. With a focus on branding, UI/UX and digital storytelling, we help businesses essence.",
    additionalText = "With every collaboration, we emphasize intention, clarity and the balance between aesthetics and functionality.",
    backgroundImage,
    backgroundVideo,
    backgroundColor = "#f5f5f7",
    textColor = "#4b5563",
    titleColor = "#0f172a",
    subtitleColor = "#6b7280",
    badgeLabel = "",
  } = content;

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const renderMediaContent = () => (
    <div className="group relative flex h-full min-h-[420px] w-full overflow-hidden rounded-[32px] bg-gray-200 shadow-2xl">
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <img
          src={backgroundImage}
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm font-medium text-gray-400">
          Upload an image or video
        </div>
      )}
      {(backgroundImage || backgroundVideo) && (
        <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition duration-500 group-hover:opacity-100" />
      )}
    </div>
  );

  const LayoutContent = () => (
    <div className="grid gap-16 md:grid-cols-2 md:items-stretch">
      <div className="flex h-full items-stretch">
        {renderMediaContent()}
      </div>
      <div className="flex h-full flex-col justify-center space-y-6">
        {badgeLabel && (
          <p
            className="text-sm font-semibold uppercase tracking-[0.3em]"
            style={{ color: subtitleColor }}
          >
            {badgeLabel}
          </p>
        )}
        <h2
          className="text-4xl font-semibold leading-tight md:text-5xl"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: subtitleColor }}
          >
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-base leading-relaxed" style={{ color: textColor }}>
            {description}
          </p>
        )}
        {additionalText && (
          <p className="text-base leading-relaxed" style={{ color: textColor }}>
            {additionalText}
          </p>
        )}
      </div>
    </div>
  );

  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <LayoutContent />
        </div>
      </section>
    );
  }

  const renderPreview = () => {
    return (
      <section className="py-12" style={{ backgroundColor }}>
        <div className="px-4">
          <LayoutContent />
        </div>
      </section>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-xl lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 lg:col-span-1"
      >
        <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-4">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
            Live Preview
          </h3>
          <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
        </div>
        <div className="sticky top-8 rounded-2xl border border-white/50 bg-white/80 shadow-2xl backdrop-blur-sm">
          {renderPreview()}
        </div>
      </motion.div>

      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            Text Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Badge Label
              </label>
              <input
                type="text"
                value={badgeLabel}
                onChange={(e) => handleContentUpdate({ badgeLabel: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="// ABOUT US"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="We Build Brands With Purposeful Minimalism"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => handleContentUpdate({ subtitle: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Integrated Solutions"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => handleContentUpdate({ description: e.target.value })}
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="At Craftive, we’re a team of passionate designers..."
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Additional Text
              </label>
              <textarea
                value={additionalText}
                onChange={(e) =>
                  handleContentUpdate({ additionalText: e.target.value })
                }
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="By managing both design and construction..."
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
            Media
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Hero Image"
              type="image"
              currentUrl={backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
              onRemove={() => handleContentUpdate({ backgroundImage: undefined })}
              placeholder="Or paste image URL..."
            />
            <MediaUpload
              label="Hero Video"
              type="video"
              currentUrl={backgroundVideo}
              onUpload={(url) => handleContentUpdate({ backgroundVideo: url })}
              onRemove={() => handleContentUpdate({ backgroundVideo: undefined })}
              placeholder="Or paste video URL..."
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
            Colors & Settings
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Background Color
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) =>
                  handleContentUpdate({ backgroundColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Body Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => handleContentUpdate({ textColor: e.target.value })}
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title Color
              </label>
              <input
                type="color"
                value={titleColor}
                onChange={(e) => handleContentUpdate({ titleColor: e.target.value })}
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Accent Color
              </label>
              <input
                type="color"
                value={subtitleColor}
                onChange={(e) =>
                  handleContentUpdate({ subtitleColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  