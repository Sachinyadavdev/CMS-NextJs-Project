"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfrastructureResourceSustainabilitySection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

interface Initiative {
  id: string;
  title: string;
  description: string;
  icon: string;
  impact: string;
}

interface Metric {
  label: string;
  value: string;
  unit: string;
}

interface Props {
  section: InfrastructureResourceSustainabilitySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InfrastructureResourceSustainabilitySection>) => void;
}

export default function EditableInfrastructureResourceSustainabilitySection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Environmental & Social Impact",
    subtitle = "Building Better Communities",
    description = "Our commitment to responsible infrastructure development drives innovation in environmental protection, community well-being and long-term value creation.",
    initiatives = [
      {
        id: "1",
        title: "Carbon Neutral Operations",
        description: "Achieving net-zero carbon emissions across all project operations and supply chains.",
        icon: "🌱",
        impact: "50% reduction in CO2 emissions by 2030",
      },
      {
        id: "2",
        title: "Renewable Energy Integration",
        description: "Incorporating solar, wind and other renewable energy sources in infrastructure projects.",
        icon: "☀️",
        impact: "75% renewable energy usage in operations",
      },
      {
        id: "3",
        title: "Water Conservation",
        description: "Implementing advanced water management systems and conservation technologies.",
        icon: "💧",
        impact: "40% reduction in water usage",
      },
      {
        id: "4",
        title: "Biodiversity Protection",
        description: "Preserving and enhancing local ecosystems through sustainable development practices.",
        icon: "🦋",
        impact: "Protected 500+ hectares of natural habitats",
      },
      {
        id: "5",
        title: "Circular Economy",
        description: "Designing infrastructure with material reuse, recycling and lifecycle management.",
        icon: "♻️",
        impact: "85% material recycling rate",
      },
      {
        id: "6",
        title: "Community Engagement",
        description: "Working with local communities to ensure sustainable development benefits all stakeholders.",
        icon: "🤝",
        impact: "100+ community partnership programs",
      },
    ],
    backgroundColor = "#f0f9ff",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    subtitleColor = "#EF4130",
    showMetrics = true,
    metrics = [
      { label: "Carbon Footprint Reduced", value: "250,000", unit: "tons CO2/year" },
      { label: "Renewable Energy Generated", value: "50", unit: "MW" },
      { label: "Water Saved", value: "2.5", unit: "million liters/day" },
      { label: "Green Certifications", value: "150", unit: "projects" },
    ],
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleInitiativeUpdate = (index: number, patch: Partial<Initiative>) => {
    const updated = initiatives.map((i: any, idx: number) =>
      idx === index ? { ...i, ...patch } : i
    );
    handleUpdate({ initiatives: updated });
  };

  const handleMetricUpdate = (index: number, patch: Partial<Metric>) => {
    const updated = metrics.map((m: any, idx: number) =>
      idx === index ? { ...m, ...patch } : m
    );
    handleUpdate({ metrics: updated });
  };

  const handleAddInitiative = () => {
    const newInitiative = {
      id: Date.now().toString(),
      title: "New Initiative",
      description: "Describe this sustainability initiative...",
      icon: "🌍",
      impact: "Positive environmental impact",
    };
    handleUpdate({ initiatives: [...initiatives, newInitiative] });
  };

  const handleAddMetric = () => {
    const newMetric = {
      label: "New Metric",
      value: "0",
      unit: "units",
    };
    handleUpdate({ metrics: [...metrics, newMetric] });
  };

  const handleRemoveInitiative = (index: number) => {
    handleUpdate({ initiatives: initiatives.filter((_: any, i: number) => i !== index) });
  };

  const handleRemoveMetric = (index: number) => {
    handleUpdate({ metrics: metrics.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Circular Layout with Central Metrics
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor }}>
        {/* Construction-Themed Eco Background */}
        <div className="absolute inset-0 opacity-10">
          {/* Blueprint grid */}
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="ecoBlueprint" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M0 25 L50 25 M25 0 L25 50" stroke="#EF4130" strokeWidth="0.5" opacity="0.3"/>
                <circle cx="25" cy="25" r="2" fill="#ff6b6b" opacity="0.4"/>
                <circle cx="25" cy="25" r="8" fill="none" stroke="#EF4130" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ecoBlueprint)"/>
          </svg>

          {/* Floating eco-construction elements */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-16 left-16 text-4xl opacity-40"
          >
            🌱
          </motion.div>
          <motion.div
            animate={{
              x: [0, -25, 0],
              y: [0, 20, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-32 right-20 text-3xl opacity-35"
          >
            ♻️
          </motion.div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-24 left-20 text-2xl opacity-30"
          >
            ⚡
          </motion.div>
          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-16 right-32 text-3xl opacity-25"
          >
            🌿
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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

          {/* Construction-Themed Sustainability Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Construction Timeline Beam */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute left-8 top-0 bottom-0 w-3 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 rounded-full shadow-lg"
            />

            {/* Timeline construction joints */}
            {initiatives.map((initiative: Initiative, index: number) => (
              <div key={`joint-${index}`}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.3 + 0.5, type: "spring" }}
                  className="absolute left-8 w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full border-4 border-white shadow-xl z-20 flex items-center justify-center"
                  style={{ top: `${(index * 100) / (initiatives.length - 1)}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </motion.div>
              </div>
            ))}

            {initiatives.map((initiative: Initiative, index: number) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: index % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.3,
                  type: "spring",
                  stiffness: 100,
                }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Construction Blueprint Frame */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                  className={`absolute w-80 h-48 border-2 border-primary-300 rounded-2xl opacity-20 ${index % 2 === 0 ? '-left-4' : '-right-4'}`}
                  style={{ borderStyle: 'dashed' }}
                />

                {/* Blueprint Corners */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.3 + 0.4 }}
                  className={`absolute w-4 h-4 border-l-2 border-t-2 border-primary-500 ${index % 2 === 0 ? '-top-2 -left-2' : '-top-2 -right-2'}`}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.3 + 0.5 }}
                  className={`absolute w-4 h-4 border-r-2 border-t-2 border-primary-500 ${index % 2 === 0 ? '-top-2 left-72' : '-top-2 right-72'}`}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.3 + 0.6 }}
                  className={`absolute w-4 h-4 border-l-2 border-b-2 border-primary-500 ${index % 2 === 0 ? '-bottom-2 -left-2' : '-bottom-2 -right-2'}`}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.3 + 0.7 }}
                  className={`absolute w-4 h-4 border-r-2 border-b-2 border-primary-500 ${index % 2 === 0 ? '-bottom-2 left-72' : '-bottom-2 right-72'}`}
                />

                {/* Content card with construction theme */}
                <div className={`ml-20 w-full max-w-lg ${index % 2 === 1 ? 'ml-0 mr-20' : ''}`}>
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      rotateY: index % 2 === 0 ? 2 : -2
                    }}
                    className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Construction grid background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="grid grid-cols-8 gap-1 h-full">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.01 }}
                            className="bg-green-400 rounded-sm"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Eco Construction Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.3 + 0.8, type: "spring" }}
                      className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                    >
                      🌱
                    </motion.div>

                    {/* Icon and title with construction animation */}
                    <div className="flex items-center gap-6 mb-6 relative z-10">
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg relative"
                          style={{ backgroundColor: `${subtitleColor}20`, border: `2px solid ${subtitleColor}30` }}
                        >
                          {initiative.icon}
                          {/* Construction rivets */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full border-2 border-white"></div>
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></div>
                        </div>
                        {/* Energy beam */}
                        <motion.div
                          animate={{ x: [0, 30, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index }}
                          className="absolute -right-4 top-1/2 w-6 h-0.5 bg-gradient-to-r from-green-400 to-transparent -translate-y-1/2"
                        />
                      </motion.div>

                      <div className="flex-1">
                        <motion.h3
                          className="text-xl font-bold mb-3 relative"
                          style={{ color: titleColor }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                        >
                          {initiative.title}
                          {/* Underline animation */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.3 + 1 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 origin-left"
                          />
                        </motion.h3>
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.3 + 0.6, type: "spring" }}
                          className="text-sm font-bold px-4 py-2 rounded-full inline-block shadow-md"
                          style={{
                            backgroundColor: `${subtitleColor}20`,
                            color: subtitleColor,
                            border: `1px solid ${subtitleColor}30`,
                          }}
                        >
                          {initiative.impact}
                        </motion.div>
                      </div>
                    </div>

                    {/* Description with eco-construction theme */}
                    <motion.p
                      className="text-gray-700 leading-relaxed text-base relative z-10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.7 }}
                    >
                      {initiative.description}
                    </motion.p>

                    {/* Progress indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.3 + 1.2 }}
                      className="mt-6 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-full"
                    />

                    {/* Construction completion marker */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.3 + 1.8, type: "spring" }}
                      className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
                    >
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="text-white text-xs"
                      >
                        ✓
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Metrics Summary */}
          {showMetrics && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
            >
              <h3 className="text-2xl font-bold text-center mb-8" style={{ color: titleColor }}>
                Key Sustainability Metrics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric: Metric, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.1,
                    }}
                    className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{ color: subtitleColor }}
                    >
                      {metric.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {metric.unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
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

        {/* Mini circular preview */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {showMetrics && (
              <div className="bg-white rounded-full shadow-lg border border-gray-100 p-6">
                <div className="grid grid-cols-2 gap-4">
                  {metrics.slice(0, 4).map((metric: any, i: number) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold" style={{ color: subtitleColor }}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500">{metric.unit}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.slice(0, 6).map((initiative: any, i: number) => (
            <div
              key={initiative.id}
              className="bg-white rounded-2xl p-4 border border-gray-200"
            >
              <div className="text-2xl mb-2 flex justify-center">{initiative.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1 text-center text-sm">
                {initiative.title}
              </h3>
              <p className="text-xs text-gray-600 mb-2 text-center line-clamp-2">
                {initiative.description}
              </p>
              <div
                className="text-xs font-medium px-2 py-1 rounded-full text-center"
                style={{
                  backgroundColor: `${subtitleColor}20`,
                  color: subtitleColor,
                }}
              >
                {initiative.impact}
              </div>
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
            Infrastructure Sustainability Editor
          </h1>
          <p className="text-gray-600 mt-1">Circular layout with central metrics and orbiting initiatives</p>
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

            {/* Metrics */}
            {showMetrics && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Key Metrics</h2>
                  <button
                    onClick={handleAddMetric}
                    className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                  >
                    + Add Metric
                  </button>
                </div>

                <AnimatePresence>
                  {metrics.map((metric: any, i: number) => (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-gray-800">
                          Metric {i + 1}
                        </h4>
                        <button
                          onClick={() => handleRemoveMetric(i)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <EditableText
                          label="Label"
                          value={metric.label}
                          onChange={(v) => handleMetricUpdate(i, { label: v })}
                        />
                        <EditableText
                          label="Value"
                          value={metric.value}
                          onChange={(v) => handleMetricUpdate(i, { value: v })}
                        />
                        <EditableText
                          label="Unit"
                          value={metric.unit}
                          onChange={(v) => handleMetricUpdate(i, { unit: v })}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Initiatives */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Sustainability Initiatives</h2>
                <button
                  onClick={handleAddInitiative}
                  className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                >
                  + Add Initiative
                </button>
              </div>

              <AnimatePresence>
                {initiatives.map((initiative: any, i: number) => (
                  <motion.div
                    key={initiative.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Initiative {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveInitiative(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={initiative.icon}
                        onChange={(v) => handleInitiativeUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={initiative.title}
                        onChange={(v) => handleInitiativeUpdate(i, { title: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={initiative.description}
                        onChange={(e: any) => handleInitiativeUpdate(i, { description: e })}
                        rows={2}
                        className="md:col-span-2"
                      />
                      <EditableText
                        label="Impact Statement"
                        value={initiative.impact}
                        onChange={(v) => handleInitiativeUpdate(i, { impact: v })}
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
                  label="Show Central Metrics"
                  checked={showMetrics}
                  onChange={(value: any) => handleUpdate({ showMetrics: value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}