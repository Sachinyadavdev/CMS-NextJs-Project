"use client";

import React from "react";
import { RealEstateArchitecturalSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";
import { EditableText, EditableTextarea, EditableColorPicker } from "../../EditableInputs";

interface EditableRealEstateArchitecturalProps {
  section: RealEstateArchitecturalSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateArchitecturalSection>) => void;
}

export default function EditableRealEstateArchitecturalSection({ section, isEditing, onUpdate }: EditableRealEstateArchitecturalProps) {
  const content = section.content || {};
  const {
    title = "Architectural Approach",
    subtitle = "Innovation Implementation",
    description = "Real estate at RAUS is our promise of vision, precision, and performance. It's the foundation that empowers us to shape future-ready spaces, deliver transformative value, and build environments where people thrive and businesses grow.",
    backgroundImage,
    backgroundVideo,
    backgroundColor = '#0a0e27',
    textColor = '#e5e7eb',
    titleColor = '#ffffff',
    subtitleColor = '#EF4130'
  } = content;

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    return (
      <section
        className="relative pt-20 pb-16 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Background Media */}
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {backgroundImage && !backgroundVideo && (
          <img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              backgroundColor: subtitleColor,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div
            className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
            style={{ animation: 'float 10s ease-in-out infinite 2s' }}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(${subtitleColor}20 1px, transparent 1px), linear-gradient(90deg, ${subtitleColor}20 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-30px) translateX(15px); }
            50% { transform: translateY(-60px) translateX(-15px); }
            75% { transform: translateY(-30px) translateX(10px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full border backdrop-blur-md"
              style={{
                borderColor: `${subtitleColor}40`,
                backgroundColor: `${subtitleColor}10`
              }}
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: subtitleColor }}
              />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: titleColor, animation: 'fadeInUp 1s ease-out' }}
            >
              {title}
            </h2>

            {/* Decorative line */}
            <div
              className="h-1 w-24 mx-auto rounded-full mb-8"
              style={{
                backgroundColor: subtitleColor,
                animation: 'scaleIn 0.8s ease-out 0.3s both'
              }}
            />
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto">
            {description && (
              <p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed text-center"
                style={{ color: textColor, animation: 'fadeInUp 1s ease-out 0.4s both' }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Preview for editing mode
  const renderPreview = () => {
    return (
      <section
        className="py-12 rounded-lg overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Background Media */}
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {backgroundImage && !backgroundVideo && (
          <img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border backdrop-blur-md"
              style={{
                borderColor: `${subtitleColor}40`,
                backgroundColor: `${subtitleColor}10`
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subtitleColor }} />
              <span className="text-xs font-bold uppercase" style={{ color: subtitleColor }}>
                {subtitle}
              </span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: titleColor }}>
              {title}
            </h2>
          </div>

          {/* Content */}
          {description && (
            <p className="text-base leading-relaxed text-center" style={{ color: textColor }}>
              {description}
            </p>
          )}
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
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
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
              value={title}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Architectural Approach"
            />
            <EditableText
              label="Subtitle"
              value={subtitle}
              onChange={(val) => handleContentUpdate({ subtitle: val })}
              placeholder="Innovation Implementation"
            />
            <EditableTextarea
              label="Description"
              value={description}
              onChange={(val) => handleContentUpdate({ description: val })}
              rows={4}
              placeholder="Real estate at RAUS is our promise..."
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Media
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
              onRemove={() => handleContentUpdate({ backgroundImage: undefined })}
              placeholder="Or paste image URL..."
            />
            <MediaUpload
              label="Background Video"
              type="video"
              currentUrl={backgroundVideo}
              onUpload={(url) => handleContentUpdate({ backgroundVideo: url })}
              onRemove={() => handleContentUpdate({ backgroundVideo: undefined })}
              placeholder="Or paste video URL..."
            />
          </div>
        </div>

        {/* Colors & Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Colors & Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={(val) => handleContentUpdate({ backgroundColor: val })}
            />
            <EditableColorPicker
              label="Text Color"
              value={textColor}
              onChange={(val) => handleContentUpdate({ textColor: val })}
            />
            <EditableColorPicker
              label="Title Color"
              value={titleColor}
              onChange={(val) => handleContentUpdate({ titleColor: val })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={subtitleColor}
              onChange={(val) => handleContentUpdate({ subtitleColor: val })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}