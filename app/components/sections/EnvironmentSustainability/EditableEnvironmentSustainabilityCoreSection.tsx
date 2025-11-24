"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableRange,
} from "@/app/components/EditableInputs";

interface SustainabilityMetric {
  id: string;
  title: string;
  description: string;
  value: number;
  unit: string;
  color: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityCoreSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Sustainability at the Core of Every Project",
    description1 = "Our approach to sustainability goes beyond compliance. We focus on creating high-performance environments that balance human needs with ecological preservation. Each solution is designed to perform today while remaining adaptable for tomorrow—ensuring long-lasting value, lower impacts, and improved operational efficiency.",
    description2 = "We align environmental, social, and economic goals across the full project lifecycle, designing infrastructure and built environments that reduce carbon footprints, minimize waste, and elevate overall well-being. Smart material choices, energy-efficient systems, and circular practices are embedded into our planning and execution methodologies, ensuring low-impact, high-value outcomes.",
    metrics = [
      {
        id: "1",
        title: "Carbon Footprint Reduction",
        description: "Average reduction in CO2 emissions per project",
        value: 85,
        unit: "%",
        color: "#dc2626",
      },
      {
        id: "2",
        title: "Waste Minimization",
        description: "Reduction in construction waste through circular practices",
        value: 92,
        unit: "%",
        color: "#ef4444",
      },
      {
        id: "3",
        title: "Energy Efficiency",
        description: "Improvement in energy performance ratings",
        value: 78,
        unit: "%",
        color: "#f87171",
      },
      {
        id: "4",
        title: "Water Conservation",
        description: "Reduction in water usage through efficient systems",
        value: 88,
        unit: "%",
        color: "#fca5a5",
      },
    ],
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    accentColor = "#dc2626",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleMetricUpdate = (index: number, patch: Partial<SustainabilityMetric>) => {
    const updated = metrics.map((m: any, i: number) =>
      i === index ? { ...m, ...patch } : m
    );
    handleUpdate({ metrics: updated });
  };

  const handleAddMetric = () => {
    const newMetric = {
      id: Date.now().toString(),
      title: "New Metric",
      description: "Describe this sustainability metric...",
      value: 75,
      unit: "%",
      color: "#dc2626",
    };
    handleUpdate({ metrics: [...metrics, newMetric] });
  };

  const handleRemoveMetric = (index: number) => {
    handleUpdate({ metrics: metrics.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Circular Progress Metrics
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
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
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
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric: SustainabilityMetric, index: number) => (
              <motion.div
                key={metric.id}
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
                {/* Circular Progress */}
                <div className="relative w-32 h-32 mb-6">
                  {/* Background circle */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="60"
                      cy="60"
                      r="50"
                      stroke={metric.color}
                      strokeWidth="8"
                      fill="transparent"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: metric.value / 100 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 2,
                        delay: index * 0.15 + 0.5,
                        ease: "easeOut",
                      }}
                      style={{
                        strokeDasharray: `${2 * Math.PI * 50}`,
                      }}
                    />
                  </svg>

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15 + 1,
                        type: "spring",
                      }}
                      className="text-2xl font-bold"
                      style={{ color: metric.color }}
                    >
                      {metric.value}{metric.unit}
                    </motion.div>
                  </div>

                  {/* Animated dots */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: metric.color,
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-58px)`,
                          opacity: 0.6,
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.8 }}
                  className="max-w-xs"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {metric.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {metric.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <div
              className="h-1 w-24 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </motion.div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITOR MODE
  // ===================================================================
  const Preview = () => (
    <div
      className="py-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: titleColor }}>
            {title}
          </h2>
          <p className="mt-3 text-lg" style={{ color: textColor }}>
            {description1.substring(0, 80)}...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.slice(0, 4).map((metric: any, i: number) => (
            <div
              key={metric.id}
              className="text-center"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={metric.color}
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 50}`,
                      strokeDashoffset: `${2 * Math.PI * 50 * (1 - metric.value / 100)}`,
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: metric.color }}>
                  {metric.value}{metric.unit}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{metric.title}</h3>
              <p className="text-xs text-gray-600">{metric.description.substring(0, 40)}...</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
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
            Sustainability Core Section Editor
          </h1>
          <p className="text-gray-600 mt-1">Circular progress indicators for sustainability metrics</p>
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
                <EditableTextarea
                  label="Description 1"
                  value={description1}
                  onChange={(v) => handleUpdate({ description1: v })}
                  rows={3}
                />
                <EditableTextarea
                  label="Description 2"
                  value={description2}
                  onChange={(v) => handleUpdate({ description2: v })}
                  rows={3}
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Sustainability Metrics</h2>
                <button
                  onClick={handleAddMetric}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  + Add Metric
                </button>
              </div>

              <div className="space-y-6">
                {metrics.map((metric: any, i: number) => (
                  <motion.div
                    key={metric.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={metric.title}
                        onChange={(v) => handleMetricUpdate(i, { title: v })}
                      />
                      <EditableText
                        label="Unit"
                        value={metric.unit}
                        onChange={(v) => handleMetricUpdate(i, { unit: v })}
                      />
                      <EditableRange
                        label="Value (%)"
                        value={metric.value.toString()}
                        onChange={(v: any) => handleMetricUpdate(i, { value: parseInt(v) })}
                        min={0}
                        max={100}
                      />
                      <EditableColorPicker
                        label="Color"
                        value={metric.color}
                        onChange={(v) => handleMetricUpdate(i, { color: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={metric.description}
                        onChange={(v) => handleMetricUpdate(i, { description: v })}
                        rows={2}
                        className="md:col-span-2"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Colors</h2>
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
                  label="Text Color"
                  value={textColor}
                  onChange={(v) => handleUpdate({ textColor: v })}
                />
                <EditableColorPicker
                  label="Accent Color"
                  value={accentColor}
                  onChange={(v) => handleUpdate({ accentColor: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}