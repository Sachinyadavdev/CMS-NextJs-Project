"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface VisionPoint {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface VisionSectionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  visionPoints?: VisionPoint[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  accentColor?: string;
  pointBgColor?: string;
}

interface Props {
  section: { content?: VisionSectionContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: VisionSectionContent }>) => void;
}

export default function EditableInfraVisionSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const [expandedPoint, setExpandedPoint] = useState<string | null>(null);

  const content = {
    title: "Our Vision for Infrastructure",
    subtitle: "Shaping Tomorrow's Intelligent Ecosystems",
    description: "We envision infrastructure as more than concrete and steel: it's an intelligent, adaptive ecosystem. Whether we're planning transport networks, power systems, or water and resource utilities, we approach each project holistically — aligning technical performance with environmental stewardship and socio-economic resilience. Our infrastructure solutions are not standalone; they form part of a broader vision where every system is connected, sustainable, and scalable.",
    visionPoints: [
      {
        id: "1",
        title: "Intelligent Systems",
        description: "Infrastructure that adapts, learns, and optimizes itself through advanced analytics and AI integration.",
        icon: "🧠",
      },
      {
        id: "2",
        title: "Sustainable Design",
        description: "Environmentally conscious solutions that reduce carbon footprint and promote ecological resilience.",
        icon: "🌍",
      },
      {
        id: "3",
        title: "Socio-Economic Impact",
        description: "Infrastructure that strengthens communities, creates opportunities, and improves quality of life.",
        icon: "👥",
      },
      {
        id: "4",
        title: "System Integration",
        description: "Connected ecosystems where transport, energy, and utilities work seamlessly together.",
        icon: "🔗",
      },
    ],
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    titleColor: "#1f2937",
    subtitleColor: "#EF4130",
    accentColor: "#EF4130",
    pointBgColor: "#FEE2E2",
    ...section.content,
  } as VisionSectionContent;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePointUpdate = (index: number, patch: Partial<VisionPoint>) => {
    const updated = (content.visionPoints || []).map((p, i) =>
      i === index ? { ...p, ...patch } : p
    );
    handleUpdate({ visionPoints: updated });
  };

  if (!isEditing) {
    return (
      <section
        className="relative py-32 overflow-hidden"
        style={{ backgroundColor: content.backgroundColor }}
      >
        {/* Animated Background Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-500 to-transparent rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center max-w-3xl mx-auto"
          >
            {content.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg font-semibold mb-4"
                style={{ color: content.subtitleColor }}
              >
                {content.subtitle}
              </motion.p>
            )}

            {content.title && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                style={{ color: content.titleColor }}
              >
                {content.title}
              </motion.h1>
            )}

            {content.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg sm:text-xl leading-relaxed font-light"
                style={{ color: content.textColor }}
              >
                {content.description}
              </motion.p>
            )}
          </motion.div>

          {/* Vision Points Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(content.visionPoints || []).map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setExpandedPoint(point.id)}
                onHoverEnd={() => setExpandedPoint(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative h-full rounded-2xl p-8 transition-all"
                  style={{ backgroundColor: content.pointBgColor }}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {point.icon}
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: content.titleColor }}
                  >
                    {point.title}
                  </h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: expandedPoint === point.id ? 1 : 0.7,
                      height: "auto",
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm leading-relaxed"
                    style={{ color: content.textColor }}
                  >
                    {point.description}
                  </motion.p>

                  {/* Decorative Line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ backgroundColor: content.accentColor }}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==================== EDIT MODE ====================
  const PreviewCard = () => (
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
        <div className="relative z-10 px-6">
          {content.title && (
            <h2
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: content.titleColor }}
            >
              {content.title}
            </h2>
          )}

          {content.description && (
            <p
              className="text-xs leading-relaxed mb-6 text-center line-clamp-3"
              style={{ color: content.textColor }}
            >
              {content.description}
            </p>
          )}

          {content.visionPoints && (
            <div className="grid grid-cols-2 gap-3">
              {content.visionPoints.slice(0, 4).map((point) => (
                <motion.div
                  key={point.id}
                  className="rounded-lg p-3"
                  style={{ backgroundColor: content.pointBgColor }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-2xl mb-1">{point.icon}</div>
                  <p
                    className="text-xs font-semibold"
                    style={{ color: content.titleColor }}
                  >
                    {point.title}
                  </p>
                </motion.div>
              ))}
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
            Infrastructure Vision Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Customize your vision section with real-time preview
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <PreviewCard />
          </motion.div>

          {/* Controls */}
          <div className="space-y-8">
            {/* Main Content */}
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
                  value={content.title || ""}
                  onChange={(value: any) => handleUpdate({ title: value })}
                  placeholder="Section title"
                />

                <EditableText
                  label="Subtitle"
                  value={content.subtitle || ""}
                  onChange={(value: any) => handleUpdate({ subtitle: value })}
                  placeholder="Section subtitle"
                />

                <EditableTextarea
                  label="Description"
                  value={content.description || ""}
                  onChange={(value: any) => handleUpdate({ description: value })}
                  rows={5}
                  placeholder="Enter description..."
                />
              </div>
            </motion.div>

            {/* Vision Points */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Vision Points
              </h2>

              <div className="space-y-6">
                {(content.visionPoints || []).map((point, index) => (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 border border-gray-200 rounded-xl space-y-4"
                  >
                    <div className="grid grid-cols-4 gap-3">
                      <div className="col-span-1">
                        <EditableText
                          label="Icon"
                          value={point.icon}
                          onChange={(value: any) =>
                            handlePointUpdate(index, { icon: value })
                          }
                          placeholder="Icon"
                        />
                      </div>
                      <div className="col-span-3">
                        <EditableText
                          label="Title"
                          value={point.title}
                          onChange={(value: any) =>
                            handlePointUpdate(index, { title: value })
                          }
                          placeholder="Title"
                        />
                      </div>
                    </div>
                    <EditableTextarea
                      label="Description"
                      value={point.description}
                      onChange={(value: any) =>
                        handlePointUpdate(index, { description: value })
                      }
                      rows={2}
                      placeholder="Description"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Colors */}
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
                {[
                  { key: "backgroundColor", label: "Background Color" },
                  { key: "titleColor", label: "Title Color" },
                  { key: "subtitleColor", label: "Subtitle Color" },
                  { key: "textColor", label: "Text Color" },
                  { key: "accentColor", label: "Accent Color" },
                  { key: "pointBgColor", label: "Point Background Color" },
                ].map((item) => (
                  <EditableColorPicker
                    key={item.key}
                    label={item.label}
                    value={(content[item.key as keyof VisionSectionContent] as string) || "#ffffff"}
                    onChange={(value: any) =>
                      handleUpdate({ [item.key]: value })
                    }
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
