"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCoordinationCoreSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface CoreSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

interface Props {
  section: ProjectCoordinationCoreSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ProjectCoordinationCoreSection>) => void;
}

export default function EditableProjectCoordinationCoreSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section as any) || {};

  const {
    title = "Core Coordination Framework",
    subtitle = "Driving Consistency Across Teams, Timelines, and Deliverables",
    description = "Our coordination model ensures transparent communication, disciplined execution, and rigorous control across the full lifecycle of every project.",
    sections: coreSections = [
      {
        id: "1",
        title: "Centralized Management Across Phases",
        description:
          "Oversight of planning, design, execution, and delivery under one framework—ensuring consistency, clarity, and quality across every stage.",
        icon: "📋",
        color: "#EF4130",
        features: [
          "Unified oversight structure",
          "Integrated planning-to-delivery model",
          "Consolidated project communication",
        ],
      },
      {
        id: "2",
        title: "Stakeholder Alignment & Communication",
        description:
          "Transparent collaboration across clients, consultants, contractors, and vendors to maintain clarity and reduce friction.",
        icon: "🤝",
        color: "#d63324",
        features: [
          "Clear communication channels",
          "Structured collaboration routines",
          "Accountability across all parties",
        ],
      },
      {
        id: "3",
        title: "Risk, Quality & Timeline Assurance",
        description:
          "Rigorous controls that reduce risks, reinforce standards, and maintain predictable schedules.",
        icon: "🛡️",
        color: "#b52a1f",
        features: [
          "Risk-controlled review cycles",
          "Quality validation checkpoints",
          "Schedule and budget adherence",
        ],
      },
    ],
    backgroundColor = "#f9fafb",
    textColor = "#111827",
    subtitleColor = "#EF4130",
  } = content;

  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isEditing) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(
                entry.target.getAttribute("data-index") || "0",
                10
              );
              setTimeout(
                () => setAnimatedCards((prev) => [...prev, index]),
                index * 200
              );
            }
          });
        },
        { threshold: 0.2 }
      );

      document
        .querySelectorAll("[data-index]")
        .forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, [isEditing]);

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleSectionUpdate = (index: number, patch: Partial<CoreSection>) => {
    const updated = coreSections.map((s: any, i: number) =>
      i === index ? { ...s, ...patch } : s
    );
    handleUpdate({ sections: updated });
  };

  const handleAddSection = () => {
    const newSection: CoreSection = {
      id: Date.now().toString(),
      title: "New Core Pillar",
      description:
        "Describe the value this pillar brings to project coordination.",
      icon: "⭐",
      color: "#EF4130",
      features: ["Key benefit 1", "Key benefit 2", "Key benefit 3"],
    };
    handleUpdate({ sections: [...coreSections, newSection] });
  };

  const handleRemoveSection = (index: number) => {
    handleUpdate({
      sections: coreSections.filter((_: any, i: number) => i !== index),
    });
  };

  // LIVE SITE VIEW
  if (!isEditing) {
    return (
      <section ref={sectionRef} className="py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl font-bold tracking-tight"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-2xl" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="mt-6 max-w-4xl mx-auto text-lg leading-relaxed opacity-80"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {coreSections.map((sec: any, i: number) => (
              <motion.div
                key={sec.id}
                data-index={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: animatedCards.includes(i) ? 1 : 0,
                  y: animatedCards.includes(i) ? 0 : 50,
                }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4"
                style={{ borderLeftColor: sec.color }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${sec.color}15` }}
                >
                  {sec.icon}
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: textColor }}
                >
                  {sec.title}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {sec.description}
                </p>
                <ul className="space-y-3">
                  {sec.features.map((f: any, fi: number) => (
                    <motion.li
                      key={fi}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + fi * 0.1 }}
                      className="flex items-center text-gray-700"
                    >
                      <div
                        className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: sec.color }}
                      />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // PREVIEW COMPONENT
  const Preview = () => (
    <motion.section
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative py-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: textColor }}>
            {title || "Core Framework"}
          </h2>
          {subtitle && (
            <p className="mt-2 text-xl" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreSections.slice(0, 6).map((sec: any, i: number) => (
            <motion.div
              key={sec.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 border-l-4"
              style={{ borderLeftColor: sec.color }}
            >
              <div className="text-3xl mb-3">{sec.icon}</div>
              <h3
                className="font-bold text-lg mb-2"
                style={{ color: textColor }}
              >
                {sec.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {sec.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Live Preview
      </div>
    </motion.section>
  );

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
            Core Sections Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Build powerful coordination pillars with real-time preview
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <Preview />
          </motion.div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Header
              </h2>
              <div className="space-y-5">
                <EditableText
                  label="Main Title"
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
                  onChange={(v) =>
                    handleUpdate({ description: v })
                  }
                  rows={3}
                />
              </div>
            </motion.div>

            {/* Core Sections */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Core Pillars
                </h2>
                <button
                  onClick={handleAddSection}
                  className="px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg transition font-medium"
                >
                  + Add Pillar
                </button>
              </div>

              <AnimatePresence>
                {coreSections.map((sec: any, i: number) => (
                  <motion.div
                    key={sec.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Pillar {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveSection(i)}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <EditableText
                        label="Title"
                        value={sec.title}
                        onChange={(v) => handleSectionUpdate(i, { title: v })}
                      />
                      <EditableText
                        label="Icon (Emoji)"
                        value={sec.icon}
                        onChange={(v) => handleSectionUpdate(i, { icon: v })}
                      />
                      <div className="col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={sec.description}
                          onChange={(v) =>
                            handleSectionUpdate(i, {
                              description: v,
                            })
                          }
                          rows={2}
                        />
                      </div>
                      <EditableColorPicker
                        label="Accent Color"
                        value={sec.color}
                        onChange={(v) =>
                          handleSectionUpdate(i, { color: v })
                        }
                      />
                      <div className="col-span-2">
                        <EditableTextarea
                          label="Features (one per line)"
                          value={sec.features.join("\n")}
                          onChange={(v) =>
                            handleSectionUpdate(i, {
                              features: v
                                .split("\n")
                                .filter(Boolean),
                            })
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Global Colors */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Global Colors
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <EditableColorPicker
                  label="Background"
                  value={backgroundColor}
                  onChange={(v) => handleUpdate({ backgroundColor: v })}
                />
                <EditableColorPicker
                  label="Text"
                  value={textColor}
                  onChange={(v) => handleUpdate({ textColor: v })}
                />
                <EditableColorPicker
                  label="Subtitle"
                  value={subtitleColor}
                  onChange={(v) => handleUpdate({ subtitleColor: v })}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
