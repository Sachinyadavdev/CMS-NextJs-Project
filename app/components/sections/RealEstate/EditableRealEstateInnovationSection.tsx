"use client";

import React from "react";
import { RealEstateInnovationSection, RealEstateInnovationItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";


interface EditableRealEstateInnovationProps {
  section: RealEstateInnovationSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateInnovationSection>) => void;
}

export default function EditableRealEstateInnovationSection({ section, isEditing, onUpdate }: EditableRealEstateInnovationProps) {
  const content = section.content || {};
  const {
    title = "Design & Build Solution",
    subtitle = "Industry",
    sections = [
      {
        id: "immersive-visualization",
        title: "Immersive Visualization",
        bulletPoints: [
          "Life-scale mixed-reality walkthroughs",
          "Real-time stakeholder collaboration",
          "Early-stage design refinements"
        ]
      },
      {
        id: "digital-twin-analytics",
        title: "Digital Twin Analytics",
        bulletPoints: [
          "Live-data monitoring of cost, schedule, quality",
          "Predictive 'what-if' simulations",
          "Automated anomaly alerts"
        ]
      },
      {
        id: "sustainable-tech-integration",
        title: "Sustainable Tech Integration",
        bulletPoints: [
          "Low-carbon materials modeling",
          "AI-optimized resource allocation",
          "Net-zero performance tracking"
        ]
      }
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

  const handleSectionUpdate = (index: number, patch: Partial<RealEstateInnovationItem>) => {
    const updatedSections = sections.map((section, idx) => (idx === index ? { ...section, ...patch } : section));
    handleContentUpdate({ sections: updatedSections });
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

          {/* Innovation Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sections.map((section: RealEstateInnovationItem, index: number) => (
              <div
                key={section.id}
                className="group"
                style={{ animation: `fadeInUp 1s ease-out ${0.2 + index * 0.1}s both` }}
              >
                <div
                  className="relative h-full p-8 rounded-3xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-white/30 overflow-hidden"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  {/* Glowing effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at center, ${subtitleColor}30, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10">
                    {/* Title */}
                    <h3
                      className="text-xl lg:text-2xl font-bold mb-6 leading-tight"
                      style={{ color: titleColor }}
                    >
                      {section.title}
                    </h3>

                    {/* Bullet Points */}
                    <ul className="space-y-4">
                      {section.bulletPoints?.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: subtitleColor }}
                          />
                          <span
                            className="text-base leading-relaxed"
                            style={{ color: textColor }}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{
                      background: `linear-gradient(90deg, ${subtitleColor}, transparent)`
                    }}
                  />
                </div>
              </div>
            ))}
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
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
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

          {/* Innovation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.slice(0, 3).map((section: RealEstateInnovationItem, index: number) => (
              <div
                key={section.id}
                className="p-6 rounded-2xl backdrop-blur-xl border border-white/10"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: titleColor }}>
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.bulletPoints?.slice(0, 3).map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: subtitleColor }} />
                      <span className="text-sm" style={{ color: textColor }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
                placeholder="Design & Build Solution"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e: any) => handleContentUpdate({ subtitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Industry"
              />
            </div>
          </div>
        </div>

        {/* Innovation Sections */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-2" />
              Innovation Sections
            </h3>
            <button
              onClick={() => {
                const newSection: RealEstateInnovationItem = {
                  id: Date.now().toString(),
                  title: "New Section",
                  bulletPoints: [""]
                };
                handleContentUpdate({ sections: [...sections, newSection] });
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Section
            </button>
          </div>
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={section.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">Section {index + 1}</h5>
                  <button
                    onClick={() => {
                      const updated = sections.filter((_, i) => i !== index);
                      handleContentUpdate({ sections: updated });
                    }}
                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
                    <input
                      type="text"
                      placeholder="Section Title"
                      value={section.title || ""}
                      onChange={(e: any) => handleSectionUpdate(index, { title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Bullet Points</label>
                    <div className="space-y-2">
                      {section.bulletPoints?.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={point}
                            onChange={(e: any) => {
                              const updated = [...(section.bulletPoints || [])];
                              updated[pointIndex] = e.target.value;
                              handleSectionUpdate(index, { bulletPoints: updated });
                            }}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            placeholder="Enter bullet point..."
                          />
                          <button
                            onClick={() => {
                              const updated = (section.bulletPoints || []).filter((_, i) => i !== pointIndex);
                              handleSectionUpdate(index, { bulletPoints: updated });
                            }}
                            className="px-3 py-3 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const updated = [...(section.bulletPoints || []), ""];
                        handleSectionUpdate(index, { bulletPoints: updated });
                      }}
                      className="mt-3 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                    >
                      Add Bullet Point
                    </button>
                  </div>
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