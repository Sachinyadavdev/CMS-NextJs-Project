"use client";

import React from "react";
import { RealEstateHeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";
import { EditableText, EditableTextarea, EditableColorPicker, EditableRange, EditableCheckbox } from "../../EditableInputs";

interface EditableRealEstateHeroProps {
  section: RealEstateHeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateHeroSection>) => void;
}

export default function EditableRealEstateHeroSection({ section, isEditing, onUpdate }: EditableRealEstateHeroProps) {
  const content = section.content || {};
  const {
    title = "Real Estate & Construction",
    subtitle = "Building Tomorrow's Landscapes Today",
    description = "Transforming visions into reality through innovative design, sustainable construction, and unparalleled expertise in real estate development.",
    buttonText = "Explore Our Projects",
    buttonLink = "/projects",
    stats = [],
    backgroundImage,
    backgroundVideo,
    backgroundColor = '#0a0e27',
    textColor = '#ffffff',
    titleColor = '#EF4130',
    subtitleColor = '#EF4130',
    alignment = 'center',
    overlay = true,
    overlayOpacity = 0.5
  } = content;

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Default background */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor }}
        />

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

        {/* Advanced Overlay with gradient */}
        {overlay && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" style={{ animation: 'float 6s ease-in-out infinite 1s' }} />

          {/* Floating particles */}
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-400/40 rounded-full" style={{ animation: 'float 5s ease-in-out infinite, twinkle 3s ease-in-out infinite' }} />
          <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full" style={{ animation: 'float 7s ease-in-out infinite 1s, twinkle 4s ease-in-out infinite 1s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/20 rounded-full" style={{ animation: 'float 6s ease-in-out infinite 2s, twinkle 2s ease-in-out infinite' }} />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-300/30 rounded-full" style={{ animation: 'float 8s ease-in-out infinite 0.5s, twinkle 3.5s ease-in-out infinite 0.5s' }} />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(239, 65, 48, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 65, 48, 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* Content Container */}
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div className="lg:col-span-12 text-center">
                {/* Title Section with staggered animation */}
                <div className="space-y-3 mb-8">
                  <h1 className="font-bold leading-tight tracking-tight">
                    <span
                      style={{ color: titleColor, animation: 'fadeInUp 1s ease-out 0.2s both' }}
                      className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
                    >
                      {title}
                    </span>
                  </h1>
                  {subtitle && (
                    <p
                      style={{ color: subtitleColor, animation: 'fadeInUp 1s ease-out 0.4s both' }}
                      className="text-xl sm:text-2xl lg:text-3xl font-light"
                    >
                      {subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                {description && (
                  <div className="max-w-4xl mx-auto mb-12">
                    <p
                      style={{ color: textColor, animation: 'fadeInUp 1s ease-out 0.6s both' }}
                      className="text-lg sm:text-xl lg:text-2xl leading-relaxed opacity-90"
                    >
                      {description}
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                {buttonText && (
                  <div className="mb-16" style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}>
                    <a
                      href={buttonLink}
                      className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group"
                    >
                      {buttonText}
                      <svg
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Stats Section */}
                {stats && stats.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {stats.map((stat, index) => (
                      <div
                        key={index}
                        className="text-center group cursor-pointer"
                        style={{ animation: `fadeInUp 1s ease-out ${0.8 + index * 0.1}s both` }}
                      >
                        <div className="relative">
                          <div
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 transform group-hover:scale-110 transition-transform duration-300"
                            style={{ color: titleColor }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300"
                            style={{ backgroundColor: titleColor }}
                          />
                        </div>
                        <div
                          className="text-sm sm:text-base font-medium uppercase tracking-wider"
                          style={{ color: textColor, opacity: 0.8 }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    return (
      <section className="relative min-h-[500px] flex items-center overflow-hidden rounded-lg">
        {/* Default background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor }}
        />

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

        {/* Overlay */}
        {overlay && (
          <div
            className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Floating elements preview */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-48 h-48 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full p-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-12 text-center">
              <div className="space-y-3 mb-6">
                <h1 className="font-bold leading-tight">
                  <span
                    style={{ color: titleColor }}
                    className="block text-4xl"
                  >
                    {title}
                  </span>
                </h1>
                {subtitle && (
                  <p
                    style={{ color: subtitleColor }}
                    className="text-lg font-light"
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {description && (
                <div className="max-w-2xl mx-auto mb-6">
                  <p
                    style={{ color: textColor }}
                    className="text-sm leading-relaxed opacity-90"
                  >
                    {description}
                  </p>
                </div>
              )}

              {buttonText && (
                <div className="mb-6">
                  <button
                    className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                  >
                    {buttonText}
                  </button>
                </div>
              )}

              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: titleColor }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: textColor, opacity: 0.8 }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
            <EditableText
              label="Title"
              value={title}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Real Estate & Construction"
            />
            <EditableText
              label="Subtitle"
              value={subtitle}
              onChange={(val) => handleContentUpdate({ subtitle: val })}
              placeholder="Building Tomorrow's Landscapes Today"
            />
            <EditableTextarea
              label="Description"
              value={description}
              onChange={(val) => handleContentUpdate({ description: val })}
              placeholder="Transforming visions into reality..."
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableText
                label="CTA Button Text"
                value={buttonText}
                onChange={(val) => handleContentUpdate({ buttonText: val })}
                placeholder="Explore Our Projects"
              />
              <EditableText
                label="CTA Button Link"
                value={buttonLink}
                onChange={(val) => handleContentUpdate({ buttonLink: val })}
                placeholder="/projects"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-2" />
              Statistics
            </h3>
            <button
              type="button"
              onClick={() => {
                const newStats = [...(stats || []), { label: '', value: '' }];
                handleContentUpdate({ stats: newStats });
              }}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Statistic
            </button>
          </div>
          <div className="space-y-4">
            {(stats || []).map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">Stat {index + 1}</h5>
                  <button
                    onClick={() => {
                      const newStats = (stats || []).filter((_, i) => i !== index);
                      handleContentUpdate({ stats: newStats });
                    }}
                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableText
                    label="Label"
                    value={stat.label || ''}
                    onChange={(val) => {
                      const newStats = [...(stats || [])];
                      newStats[index] = { ...newStats[index], label: val };
                      handleContentUpdate({ stats: newStats });
                    }}
                    placeholder="e.g., Projects Completed"
                  />
                  <EditableText
                    label="Value"
                    value={stat.value || ''}
                    onChange={(val) => {
                      const newStats = [...(stats || [])];
                      newStats[index] = { ...newStats[index], value: val };
                      handleContentUpdate({ stats: newStats });
                    }}
                    placeholder="e.g., 500+"
                  />
                </div>
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
          <div className="mt-6 space-y-4">
            <EditableCheckbox
              label="Enable Overlay"
              checked={overlay}
              onChange={(val) => handleContentUpdate({ overlay: val })}
            />
            {overlay && (
              <EditableRange
                label="Overlay Opacity"
                min={0}
                max={1}
                step={0.1}
                value={overlayOpacity}
                onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}