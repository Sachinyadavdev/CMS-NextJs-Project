"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfrastructureResourceCapabilitiesSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
  EditableRange,
} from "@/app/components/EditableInputs";

interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: number;
  category: string;
}

interface Props {
  section: InfrastructureResourceCapabilitiesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InfrastructureResourceCapabilitiesSection>) => void;
}

export default function EditableInfrastructureResourceCapabilitiesSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Our Core Capabilities",
    subtitle = "Excellence in Infrastructure Development",
    description = "We combine technical expertise, innovative solutions and proven methodologies to deliver infrastructure projects that exceed expectations and create lasting value.",
    capabilities = [
      {
        id: "1",
        title: "Project Management",
        description: "Advanced project management methodologies ensuring timely delivery and quality control.",
        icon: "📊",
        level: 95,
        category: "Management",
      },
      {
        id: "2",
        title: "Engineering Design",
        description: "State-of-the-art engineering design using latest software and industry standards.",
        icon: "⚙️",
        level: 90,
        category: "Technical",
      },
      {
        id: "3",
        title: "Environmental Engineering",
        description: "Advanced environmental engineering practices and infrastructure solutions.",
        icon: "🌱",
        level: 88,
        category: "Technical",
      },
      {
        id: "4",
        title: "Digital Innovation",
        description: "Integration of digital technologies, IoT and smart infrastructure solutions.",
        icon: "💡",
        level: 85,
        category: "Technology",
      },
      {
        id: "5",
        title: "Risk Management",
        description: "Comprehensive risk assessment and mitigation strategies for complex projects.",
        icon: "🛡️",
        level: 92,
        category: "Management",
      },
      {
        id: "6",
        title: "Quality Assurance",
        description: "Rigorous quality control processes ensuring compliance and excellence.",
        icon: "✅",
        level: 96,
        category: "Quality",
      },
    ],
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    subtitleColor = "#EF4130",
    showProgress = true,
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleCapabilityUpdate = (index: number, patch: Partial<Capability>) => {
    const updated = capabilities.map((c: any, i: number) =>
      i === index ? { ...c, ...patch } : c
    );
    handleUpdate({ capabilities: updated });
  };

  const handleAddCapability = () => {
    const newCapability = {
      id: Date.now().toString(),
      title: "New Capability",
      description: "Describe this capability...",
      icon: "⭐",
      level: 75,
      category: "General",
    };
    handleUpdate({ capabilities: [...capabilities, newCapability] });
  };

  const handleRemoveCapability = (index: number) => {
    handleUpdate({ capabilities: capabilities.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Progress Bars with Animated Counters
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-6xl font-extrabold tracking-tight"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="mt-5 text-2xl font-medium"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="mt-6 max-w-4xl mx-auto text-xl leading-relaxed"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </motion.div>

          {/* Construction-Themed Capabilities Grid */}
          <div className="relative">
            {/* Background Construction Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
                    className="border border-gray-300"
                  />
                ))}
              </div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {capabilities.map((capability: Capability, index: number) => (
                <motion.div
                  key={capability.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Construction Frame */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                    className="absolute -inset-4 border-2 border-primary-300 rounded-2xl opacity-20"
                  />

                  {/* Structural Beams Around Circle */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                    className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 + 0.7 }}
                    className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-400 to-transparent"
                  />

                  {/* Circular Progress Ring with Construction Theme */}
                  <div className="relative w-32 h-32 mb-6">
                    {/* Construction Gear Background */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-40 h-40 border-4 border-gray-100 rounded-full opacity-30">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-6 bg-gray-200 rounded"
                            style={{
                              top: '50%',
                              left: '50%',
                              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-18px)`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>

                    {/* Background circle */}
                    <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      {/* Progress circle with construction gradient */}
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="url(#constructionGradient)"
                        strokeWidth="8"
                        fill="transparent"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: capability.level / 100 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 2.5,
                          delay: index * 0.15 + 0.8,
                          ease: "easeOut",
                        }}
                        style={{
                          strokeDasharray: `${2 * Math.PI * 50}`,
                        }}
                      />
                      <defs>
                        <linearGradient id="constructionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#EF4130" />
                          <stop offset="50%" stopColor="#ff6b6b" />
                          <stop offset="100%" stopColor="#ff9999" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Center content with construction hammer effect */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                      <motion.div
                        animate={{
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                        className="text-2xl mb-1"
                      >
                        {capability.icon}
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: index * 0.15 + 1.5,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="text-lg font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent"
                      >
                        {capability.level}%
                      </motion.div>
                    </div>

                    {/* Construction rivets */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 2 }}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-primary-500 rounded-full border-2 border-white shadow-lg"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 2.2 }}
                      className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-600 rounded-full border-2 border-white shadow-lg"
                    />
                  </div>

                  {/* Content with construction styling */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 1.2 }}
                    className="max-w-xs relative"
                  >
                    {/* Construction badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 1.8, type: "spring" }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    >
                      ✓
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 relative">
                      {capability.title}
                      {/* Underline animation */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.15 + 2.5 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 origin-left"
                      />
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                      {capability.description}
                    </p>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 rounded-full text-xs font-medium border border-primary-300"
                    >
                      {capability.category}
                    </motion.span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITOR MODE – Clean & Functional
  // ===================================================================
  const Preview = () => (
    <div
      className="py-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: titleColor }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-xl" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.slice(0, 6).map((capability: any, i: number) => (
            <div
              key={capability.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 relative"
            >
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {capability.category}
                </span>
              </div>
              <div className="text-3xl mb-3 flex justify-center">{capability.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 text-center">{capability.title}</h3>
              <p className="text-sm text-gray-600 mb-4 text-center line-clamp-2">
                {capability.description}
              </p>
              {showProgress && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Proficiency</span>
                    <span className="font-bold text-blue-600">{capability.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${capability.level}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
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
            Infrastructure Capabilities Editor
          </h1>
          <p className="text-gray-600 mt-1">Progress bars with animated proficiency indicators</p>
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
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Header</h2>
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
                  label="Description"
                  value={description}
                  onChange={(e: any) => handleUpdate({ description: e })}
                  rows={3}
                />
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Capabilities</h2>
                <button
                  onClick={handleAddCapability}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  + Add Capability
                </button>
              </div>

              <AnimatePresence>
                {capabilities.map((capability: any, i: number) => (
                  <motion.div
                    key={capability.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Capability {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveCapability(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={capability.icon}
                        onChange={(v) => handleCapabilityUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={capability.title}
                        onChange={(v) => handleCapabilityUpdate(i, { title: v })}
                      />
                      <EditableText
                        label="Category"
                        value={capability.category}
                        onChange={(v) => handleCapabilityUpdate(i, { category: v })}
                      />
                      <EditableRange
                        label={`Proficiency Level (%): ${capability.level}%`}
                        value={capability.level}
                        min={0}
                        max={100}
                        onChange={(value: any) => handleCapabilityUpdate(i, { level: value })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={capability.description}
                        onChange={(e: any) => handleCapabilityUpdate(i, { description: e })}
                        rows={2}
                        className="md:col-span-2"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
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
                  label="Show Progress Bars"
                  checked={showProgress}
                  onChange={(value: any) => handleUpdate({ showProgress: value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}