"use client";
import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableRange,
  EditableCheckbox,
  EditableColorPicker,
} from "../../EditableInputs";

interface ProjectsHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  overlayOpacity?: number;
  showFloatingElements?: boolean;
}

type ProjectsSectionType = BaseSection<ProjectsHeroContent>;

interface Props {
  section: ProjectsSectionType;
  isEditing: boolean;
  onUpdate: (updates: Partial<ProjectsSectionType>) => void;
}

export default function EditableProjectsHeroSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Landmark Projects",
    subtitle = "Transforming Visions into Reality",
    description = "From iconic architectural landmarks to innovative infrastructure solutions, RAUS has delivered award-winning projects that define industries and inspire communities.",
    primaryButtonText = "View Our Portfolio",
    primaryButtonLink = "#projects-portfolio",
    secondaryButtonText = "Start a Project",
    secondaryButtonLink = "/contact",
    backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920",
    backgroundColor = "#450a0a",
    textColor = "#ffffff",
    titleColor = "#ffffff",
    subtitleColor = "#ef4444",
    overlayOpacity = 0.75,
    showFloatingElements = true,
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor }} />
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/90 via-slate-900/85 to-black/90"
          style={{ opacity: overlayOpacity }}
        />

        {showFloatingElements && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-96 h-96 rounded-full blur-3xl bg-red-600/10"
                style={{
                  top: `${15 + i * 25}%`,
                  left: i === 1 ? "auto" : "-10%",
                  right: i === 1 ? "-10%" : "auto",
                }}
                animate={{ y: [0, -40, 20, 0] }}
                transition={{
                  duration: 18 + i * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight"
            style={{ color: titleColor }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-2xl md:text-4xl font-light"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-10 max-w-4xl mx-auto text-lg md:text-xl leading-relaxed"
              style={{ color: textColor }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </section>
    );
  }

  const PreviewCard = () => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-[680px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
    >
      <div className="absolute inset-0" style={{ backgroundColor }} />
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt="preview"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/90 via-slate-900/85 to-black/90"
        style={{ opacity: overlayOpacity }}
      />

      {showFloatingElements && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 rounded-full blur-3xl bg-red-600/10"
            animate={{ y: [0, -50, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl bg-red-700/10"
            animate={{ y: [0, 40, -30, 0] }}
            transition={{ duration: 24, repeat: Infinity }}
          />
        </div>
      )}

      <div className="relative h-full flex items-center justify-center px-10 text-center">
        <div>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ color: titleColor }}
          >
            {title || "Your Title"}
          </h1>
          {subtitle && (
            <p
              className="mt-5 text-2xl md:text-4xl font-light"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
          )}
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center">
            {primaryButtonText && (
              <button className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition">
                {primaryButtonText}
              </button>
            )}
            {secondaryButtonText && (
              <button className="px-8 py-4 border-2 border-white/40 rounded-full font-medium hover:bg-white/10 transition">
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-gray-800 font-medium text-sm">Live Preview</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Projects Hero Section Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time editing with instant preview
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <PreviewCard />
          </motion.div>

          <div className="space-y-8">
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
                <EditableText
                  label="Title"
                  value={title}
                  onChange={(v) => handleUpdate({ title: v })}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate({ subtitle: v })}
                />

                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(v) => handleUpdate({ description: v })}
                  rows={4}
                />

                <div className="grid grid-cols-2 gap-6">
                  <EditableText
                    label="Primary Button Text"
                    value={primaryButtonText}
                    onChange={(v) => handleUpdate({ primaryButtonText: v })}
                  />
                  <EditableText
                    label="Primary Button Link"
                    value={primaryButtonLink}
                    onChange={(v) => handleUpdate({ primaryButtonLink: v })}
                  />
                  <EditableText
                    label="Secondary Button Text"
                    value={secondaryButtonText}
                    onChange={(v) => handleUpdate({ secondaryButtonText: v })}
                  />
                  <EditableText
                    label="Secondary Button Link"
                    value={secondaryButtonLink}
                    onChange={(v) => handleUpdate({ secondaryButtonLink: v })}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Style & Media
              </h2>
              <div className="space-y-7">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Background Image
                  </label>
                  <MediaUpload
                    label="Background Image"
                    type="image"
                    currentUrl={backgroundImage}
                    onUpload={(url) => handleUpdate({ backgroundImage: url })}
                    onRemove={() => handleUpdate({ backgroundImage: "" })}
                  />
                </div>

                <EditableColorPicker
                  label="Fallback Background Color"
                  value={backgroundColor}
                  onChange={(v) => handleUpdate({ backgroundColor: v })}
                />

                <div className="grid grid-cols-3 gap-6">
                  <EditableColorPicker
                    label="Title"
                    value={titleColor}
                    onChange={(v) => handleUpdate({ titleColor: v })}
                  />
                  <EditableColorPicker
                    label="Subtitle"
                    value={subtitleColor}
                    onChange={(v) => handleUpdate({ subtitleColor: v })}
                  />
                  <EditableColorPicker
                    label="Text"
                    value={textColor}
                    onChange={(v) => handleUpdate({ textColor: v })}
                  />
                </div>

                <EditableRange
                  label="Overlay Opacity"
                  value={overlayOpacity}
                  onChange={(v) => handleUpdate({ overlayOpacity: v })}
                  min={0}
                  max={1}
                  step={0.05}
                  showValue
                />

                <EditableCheckbox
                  label="Show floating elements"
                  checked={showFloatingElements}
                  onChange={(v) => handleUpdate({ showFloatingElements: v })}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
