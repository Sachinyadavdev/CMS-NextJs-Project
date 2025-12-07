"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityHeroSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "🌿 Environment & Sustainability",
    subtitle = "Building a Sustainable Legacy, Today and Beyond",
    description1 = "At RAUS, sustainability is not an added feature — it is a foundational philosophy that shapes every decision, every design and every project we deliver. Our work is guided by a deep commitment to environmental responsibility, social well-being and long-term resilience. From planning and material selection to construction and operations, we approach sustainability with purpose, precision and future-focused insight.",
    description2 = "We see sustainable development as a collective responsibility and our mission is to create spaces and systems that support both people and the planet. By integrating innovation, resource awareness and ecological sensitivity, RAUS ensures that every project contributes to a healthier environment and a stronger community.",
    backgroundColor = "#fef2f2",
    textColor = "#1f2937",
    titleColor = "#dc2626",
    subtitleColor = "#ef4444",
    showLeaves = true,
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  // ===================================================================
  // LIVE VIEW – Nature-Themed Hero with Floating Leaves
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor }}>
        {/* Floating Leaves Background */}
        {showLeaves && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-green-200 opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 40 + 20}px`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  x: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                🍃
              </motion.div>
            ))}
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ color: titleColor }}
            >
              {title}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl md:text-4xl font-semibold mb-8"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <p
                className="text-xl leading-relaxed"
                style={{ color: textColor }}
              >
                {description1}
              </p>
              <p
                className="text-xl leading-relaxed"
                style={{ color: textColor }}
              >
                {description2}
              </p>
            </motion.div>

            {/* Earth Icon Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8, type: "spring" }}
              className="mt-12 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-8xl"
                >
                  🌍
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 text-8xl opacity-50"
                >
                  🌱
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <svg viewBox="0 0 1200 120" className="w-full h-20">
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              fill={backgroundColor}
            />
          </svg>
        </motion.div>
      </section>
    );
  }

  // ===================================================================
  // EDITOR MODE
  // ===================================================================
  const Preview = () => (
    <div
      className="py-16 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden relative"
      style={{ backgroundColor }}
    >
      {showLeaves && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-300"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
                fontSize: '24px',
              }}
            >
              🍃
            </div>
          ))}
        </div>
      )}
      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: titleColor }}>
            {title}
          </h1>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: subtitleColor }}>
            {subtitle}
          </h2>
          <p className="text-lg mb-4" style={{ color: textColor }}>
            {description1.substring(0, 100)}...
          </p>
          <p className="text-lg" style={{ color: textColor }}>
            {description2.substring(0, 100)}...
          </p>
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Live Preview
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Environment Sustainability Hero Editor
          </h1>
          <p className="text-gray-600 mt-1">Nature-themed hero section with floating leaves</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <Preview />
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Content</h2>
              <div className="space-y-5">
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
                  label="Description 1"
                  value={description1}
                  onChange={(v) => handleUpdate({ description1: v })}
                  rows={4}
                />
                <EditableTextarea
                  label="Description 2"
                  value={description2}
                  onChange={(v) => handleUpdate({ description2: v })}
                  rows={4}
                />
              </div>
            </div>

            {/* Colors & Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Colors & Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <EditableColorPicker
                    label="Background"
                    value={backgroundColor}
                    onChange={(v) => handleUpdate({ backgroundColor: v })}
                  />
                  <EditableColorPicker
                    label="Title Color"
                    value={titleColor}
                    onChange={(v) => handleUpdate({ titleColor: v })}
                  />
                  <EditableColorPicker
                    label="Subtitle Color"
                    value={subtitleColor}
                    onChange={(v) => handleUpdate({ subtitleColor: v })}
                  />
                  <EditableColorPicker
                    label="Text Color"
                    value={textColor}
                    onChange={(v) => handleUpdate({ textColor: v })}
                  />
                </div>

                <EditableCheckbox
                  label="Show Floating Leaves"
                  checked={showLeaves}
                  onChange={(v) => handleUpdate({ showLeaves: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}