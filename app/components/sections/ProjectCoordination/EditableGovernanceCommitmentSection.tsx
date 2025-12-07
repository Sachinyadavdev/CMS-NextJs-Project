"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GovernanceCommitmentSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface EditableGovernanceCommitmentProps {
  section: GovernanceCommitmentSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<GovernanceCommitmentSection>) => void;
}

interface GovernancePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function EditableGovernanceCommitmentSection({
  section,
  isEditing,
  onUpdate,
}: EditableGovernanceCommitmentProps) {
  const content = section.content || {};
  const {
    title = "Governance, Transparency & Compliance",
    subtitle = "Ensuring Every Approval Meets the Highest Standards",
    description = "Our governance principles drive accountability, quality and credibility throughout the approval lifecycle. With integrated oversight and transparent reporting, we maintain clarity from documentation to final sign-off.",
    pillars = [
      {
        id: "1",
        title: "Integrated Approvals",
        description: "Design and engineering are aligned with regulatory requirements, creating a seamless and efficient approval process.",
        icon: "🔗"
      },
      {
        id: "2",
        title: "Transparent Oversight",
        description: "Every detail—from documentation to inspection—is tracked with full clarity and structured reporting.",
        icon: "📊"
      },
      {
        id: "3",
        title: "Risk-Managed Compliance",
        description: "Approval risks are anticipated and addressed early to maintain schedule fidelity and reduce delays.",
        icon: "🛡️"
      }
    ],
    backgroundColor = "#f9fafb",
    subtitleColor = "#EF4130"
  } = content;

  const [animatedPillars, setAnimatedPillars] = useState<number[]>([]);
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pillarIndex = parseInt(entry.target.getAttribute('data-pillar-index') || '0');
            setTimeout(() => {
              setAnimatedPillars(prev => [...prev, pillarIndex]);
            }, pillarIndex * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const pillarElements = document.querySelectorAll('[data-pillar-index]');
    pillarElements.forEach(pillar => observer.observe(pillar));

    return () => observer.disconnect();
  }, []);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePillarUpdate = (index: number, patch: Partial<GovernancePillar>) => {
    const updatedPillars = pillars.map((pillar, idx) =>
      idx === index ? { ...pillar, ...patch } : pillar
    );
    handleContentUpdate({ pillars: updatedPillars });
  };

  const handleAddPillar = () => {
    const newPillar: GovernancePillar = {
      id: Date.now().toString(),
      title: "New Pillar",
      description: "Pillar description",
      icon: "✨"
    };
    handleContentUpdate({ pillars: [...pillars, newPillar] });
  };

  const handleRemovePillar = (index: number) => {
    const updatedPillars = pillars.filter((_, idx) => idx !== index);
    handleContentUpdate({ pillars: updatedPillars });
  };

  if (!isEditing) {
    return (
      <section
        ref={sectionRef}
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl sm:text-2xl mb-6" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.id}
                data-pillar-index={index}
                className={`relative group cursor-pointer ${
                  animatedPillars.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } transition-all duration-700`}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full border border-gray-100">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-4xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-red-300 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {pillar.description}
                  </p>

                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom decorative elements */}
          <div className="flex justify-center mt-16">
            <div className="flex space-x-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render preview
  const renderPreview = () => {
    return (
      <section className="relative py-12 overflow-hidden rounded-lg" style={{ backgroundColor }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg mb-4" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pillars.slice(0, 3).map((pillar, index) => (
              <div
                key={pillar.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-2xl text-white mb-4">
                  {pillar.icon}
                </div>
                <h3 className="font-bold mb-2 text-sm text-gray-900">
                  {pillar.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const PreviewCard = () => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
    >
      {renderPreview()}
      <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-gray-800 font-medium text-sm">Live Preview</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Light Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Governance Commitment Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time editing with instant preview
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
            {/* Content Card */}
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
                  onChange={(v) => handleContentUpdate({ title: v })}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleContentUpdate({ subtitle: v })}
                />
                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(v) =>
                    handleContentUpdate({ description: v })
                  }
                  rows={4}
                />
              </div>
            </motion.div>

            {/* Pillars Management Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Governance Pillars
                </h2>
                <button
                  type="button"
                  onClick={handleAddPillar}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                >
                  + Add Pillar
                </button>
              </div>
              <div className="space-y-4">
                {pillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-semibold text-gray-800">
                        Pillar {index + 1}
                      </h5>
                      <button
                        onClick={() => handleRemovePillar(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <EditableText
                        label="Title"
                        value={pillar.title || ''}
                        onChange={(v) =>
                          handlePillarUpdate(index, { title: v })
                        }
                      />
                      <EditableText
                        label="Icon"
                        value={pillar.icon || ''}
                        onChange={(v) =>
                          handlePillarUpdate(index, { icon: v })
                        }
                      />
                      <EditableTextarea
                        label="Description"
                        value={pillar.description || ''}
                        onChange={(v) =>
                          handlePillarUpdate(index, {
                            description: v,
                          })
                        }
                        rows={2}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Colors Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Colors
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <EditableColorPicker
                  label="Background Color"
                  value={backgroundColor}
                  onChange={(v) =>
                    handleContentUpdate({ backgroundColor: v })
                  }
                />
                <EditableColorPicker
                  label="Subtitle Color"
                  value={subtitleColor}
                  onChange={(v) =>
                    handleContentUpdate({ subtitleColor: v })
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}