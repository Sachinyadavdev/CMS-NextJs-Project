"use client";

import React from "react";
import { RealEstateIntegrationSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";


interface EditableRealEstateIntegrationProps {
  section: RealEstateIntegrationSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateIntegrationSection>) => void;
}

export default function EditableRealEstateIntegrationSection({ section, isEditing, onUpdate }: EditableRealEstateIntegrationProps) {
  const content = section.content || {};
  const {
    title = "Integration in Infrastructure",
    subtitle = "",
    description = "At the heart of every thriving community lies a commitment to excellence in real estate and construction. Our approach is more than building structures—it's about shaping sustainable, inclusive, and future-ready environments that empower people and organizations to thrive.",
    bulletPoints = [
      "We blend architecture, engineering, and construction management into a seamless process, ensuring projects move from vision to reality efficiently.",
      "Our approach leverages digital tools like BIM and computational fluid dynamics to enhance precision, optimize resources, and accelerate timelines.",
      "Integrated approvals processes streamline delivery, reducing bottlenecks and ensuring every milestone aligns with client goals."
    ],
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
                className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 text-center"
                style={{ color: textColor, animation: 'fadeInUp 1s ease-out 0.4s both' }}
              >
                {description}
              </p>
            )}

            {/* Bullet Points */}
            {bulletPoints && bulletPoints.length > 0 && (
              <div className="grid gap-0">
                {bulletPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-2xl backdrop-blur-xl border border-white/10"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      animation: `fadeInUp 1s ease-out ${0.6 + index * 0.1}s both`
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: subtitleColor }}
                    />
                    <p
                      className="text-base md:text-lg leading-relaxed"
                      style={{ color: textColor }}
                    >
                      {point}
                    </p>
                  </div>
                ))}
              </div>
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
          <div className="space-y-4">
            {description && (
              <p className="text-base leading-relaxed text-center" style={{ color: textColor }}>
                {description}
              </p>
            )}

            {bulletPoints && bulletPoints.length > 0 && (
              <div className="space-y-3">
                {bulletPoints.slice(0, 3).map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: subtitleColor }} />
                    <p className="text-sm" style={{ color: textColor }}>{point}</p>
                  </div>
                ))}
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e: any) => handleContentUpdate({ title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Integration in Infrastructure"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e: any) => handleContentUpdate({ subtitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Seamless Solutions"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e: any) => handleContentUpdate({ description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="At the heart of every thriving community..."
              />
            </div>
          </div>
        </div>

        {/* Bullet Points Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2" />
              Bullet Points
            </h3>
            <button
              onClick={() => handleContentUpdate({ bulletPoints: [...bulletPoints, ""] })}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Point
            </button>
          </div>
          <div className="space-y-3">
            {bulletPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e: any) => {
                    const updated = [...bulletPoints];
                    updated[index] = e.target.value;
                    handleContentUpdate({ bulletPoints: updated });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Enter bullet point..."
                />
                <button
                  onClick={() => {
                    const updated = bulletPoints.filter((_, i) => i !== index);
                    handleContentUpdate({ bulletPoints: updated });
                  }}
                  className="px-3 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e: any) => handleContentUpdate({ backgroundColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e: any) => handleContentUpdate({ textColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title Color</label>
              <input
                type="color"
                value={titleColor}
                onChange={(e: any) => handleContentUpdate({ titleColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle Color</label>
              <input
                type="color"
                value={subtitleColor}
                onChange={(e: any) => handleContentUpdate({ subtitleColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}