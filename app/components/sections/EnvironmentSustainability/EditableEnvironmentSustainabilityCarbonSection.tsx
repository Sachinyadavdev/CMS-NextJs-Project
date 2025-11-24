"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
} from "@/app/components/EditableInputs";

interface CarbonMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  description: string;
  icon: string;
  trend: "up" | "down" | "stable";
}

interface ESGItem {
  id: string;
  category: "Environmental" | "Social" | "Governance";
  title: string;
  description: string;
  icon: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityCarbonSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Carbon, Climate & ESG Integration",
    description1 = "Our environmental services include in-depth carbon and climate risk assessments that help future-proof infrastructure against emerging environmental challenges. We evaluate emissions, climate vulnerabilities, and adaptation measures to create solutions that are resilient and forward-looking.",
    description2 = "We also develop ESG frameworks tailored to project and organizational goals, helping clients meet global expectations for environmental stewardship, social impact, and strong governance. Through these integrated strategies, RAUS ensures that sustainability objectives are measurable, actionable, and aligned with long-term development visions.",
    carbonMetrics = [
      {
        id: "1",
        title: "Carbon Footprint Reduction",
        value: "45",
        unit: "tons CO₂",
        description: "Annual emissions reduction achieved",
        icon: "🌱",
        trend: "down",
      },
      {
        id: "2",
        title: "Climate Risk Score",
        value: "2.1",
        unit: "/5",
        description: "Project resilience rating",
        icon: "🌡️",
        trend: "down",
      },
      {
        id: "3",
        title: "Renewable Energy Share",
        value: "78",
        unit: "%",
        description: "Clean energy integration",
        icon: "☀️",
        trend: "up",
      },
      {
        id: "4",
        title: "Water Usage Efficiency",
        value: "35",
        unit: "%",
        description: "Conservation improvement",
        icon: "💧",
        trend: "down",
      },
    ],
    esgItems = [
      {
        id: "1",
        category: "Environmental",
        title: "Climate Action",
        description: "Reducing carbon emissions and enhancing climate resilience",
        icon: "🌍",
      },
      {
        id: "2",
        category: "Social",
        title: "Community Impact",
        description: "Supporting local communities and stakeholder engagement",
        icon: "🤝",
      },
      {
        id: "3",
        category: "Governance",
        title: "Ethical Standards",
        description: "Transparent reporting and sustainable governance practices",
        icon: "⚖️",
      },
    ],
    backgroundColor = "#0f172a",
    textColor = "#f1f5f9",
    titleColor = "#f1f5f9",
    accentColor = "#dc2626",
    cardColor = "#1e293b",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleMetricUpdate = (index: number, patch: Partial<CarbonMetric>) => {
    const updated = carbonMetrics.map((m: any, i: number) =>
      i === index ? { ...m, ...patch } : m
    );
    handleUpdate({ carbonMetrics: updated });
  };

  const handleESGUpdate = (index: number, patch: Partial<ESGItem>) => {
    const updated = esgItems.map((item: any, i: number) =>
      i === index ? { ...item, ...patch } : item
    );
    handleUpdate({ esgItems: updated });
  };

  const handleAddMetric = () => {
    const newMetric = {
      id: Date.now().toString(),
      title: "New Metric",
      value: "0",
      unit: "",
      description: "Describe this metric...",
      icon: "📊",
      trend: "stable" as const,
    };
    handleUpdate({ carbonMetrics: [...carbonMetrics, newMetric] });
  };

  const handleAddESG = () => {
    const newESG = {
      id: Date.now().toString(),
      category: "Environmental" as const,
      title: "New ESG Item",
      description: "Describe this ESG aspect...",
      icon: "⭐",
    };
    handleUpdate({ esgItems: [...esgItems, newESG] });
  };

  const handleRemoveMetric = (index: number) => {
    handleUpdate({ carbonMetrics: carbonMetrics.filter((_: any, i: number) => i !== index) });
  };

  const handleRemoveESG = (index: number) => {
    handleUpdate({ esgItems: esgItems.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Dark Theme with Climate Focus
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
                className="border border-slate-600"
              />
            ))}
          </div>
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

          {/* Carbon Metrics */}
          <div className="mb-20">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold mb-12 text-center"
              style={{ color: accentColor }}
            >
              Carbon & Climate Metrics
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {carbonMetrics.map((metric: CarbonMetric, index: number) => (
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
                  className="text-center relative"
                  style={{ backgroundColor: cardColor }}
                >
                  <div className="p-8 rounded-2xl shadow-2xl border border-slate-700">
                    {/* Trend Indicator */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                      style={{
                        backgroundColor: metric.trend === "down" ? "#10b981" :
                                       metric.trend === "up" ? "#ef4444" : "#6b7280"
                      }}
                    >
                      {metric.trend === "down" ? "↓" : metric.trend === "up" ? "↑" : "→"}
                    </motion.div>

                    {/* Icon with glow effect */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          `0 0 20px ${accentColor}20`,
                          `0 0 40px ${accentColor}40`,
                          `0 0 20px ${accentColor}20`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-full"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      {metric.icon}
                    </motion.div>

                    {/* Value */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.15 + 0.5,
                        type: "spring",
                      }}
                      className="mb-4"
                    >
                      <div className="text-3xl font-bold mb-1" style={{ color: accentColor }}>
                        {metric.value}
                        <span className="text-lg" style={{ color: textColor }}>
                          {metric.unit}
                        </span>
                      </div>
                      <h4 className="text-lg font-semibold" style={{ color: textColor }}>
                        {metric.title}
                      </h4>
                    </motion.div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                      {metric.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ESG Framework */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold mb-12 text-center"
              style={{ color: accentColor }}
            >
              ESG Framework Integration
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {esgItems.map((item: ESGItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                  }}
                  className="text-center"
                  style={{ backgroundColor: cardColor }}
                >
                  <div className="p-8 rounded-2xl shadow-2xl border border-slate-700 h-full">
                    {/* Category Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
                      style={{
                        backgroundColor: item.category === "Environmental" ? "#10b98120" :
                                       item.category === "Social" ? "#3b82f620" : "#f59e0b20",
                        color: item.category === "Environmental" ? "#10b981" :
                              item.category === "Social" ? "#3b82f6" : "#f59e0b"
                      }}
                    >
                      {item.category}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      whileInView={{ rotate: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.2 + 0.4,
                        type: "spring",
                      }}
                      className="text-4xl mb-6"
                    >
                      {item.icon}
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                      <h4 className="text-xl font-bold mb-4" style={{ color: textColor }}>
                        {item.title}
                      </h4>
                      <p className="leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
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

        {/* Metrics Preview */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: accentColor }}>
            Carbon & Climate Metrics
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {carbonMetrics.slice(0, 4).map((metric: any, i: number) => (
              <div
                key={metric.id}
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: cardColor }}
              >
                <div className="text-2xl mb-2">{metric.icon}</div>
                <div className="text-lg font-bold" style={{ color: accentColor }}>
                  {metric.value}{metric.unit}
                </div>
                <div className="text-sm font-medium" style={{ color: textColor }}>
                  {metric.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESG Preview */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: accentColor }}>
            ESG Framework
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {esgItems.slice(0, 3).map((item: any, i: number) => (
              <div
                key={item.id}
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: cardColor }}
              >
                <div className="text-lg mb-2">{item.icon}</div>
                <div className="text-sm font-bold" style={{ color: textColor }}>
                  {item.title}
                </div>
                <div className="text-xs" style={{ color: textColor, opacity: 0.8 }}>
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
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
            Carbon & ESG Integration Editor
          </h1>
          <p className="text-gray-600 mt-1">Dark theme with climate metrics and ESG framework</p>
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

            {/* Carbon Metrics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Carbon & Climate Metrics</h2>
                <button
                  onClick={handleAddMetric}
                  className="px-5 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition font-medium"
                >
                  + Add Metric
                </button>
              </div>

              <div className="space-y-6">
                {carbonMetrics.map((metric: any, i: number) => (
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
                        label="Icon (Emoji)"
                        value={metric.icon}
                        onChange={(v) => handleMetricUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={metric.title}
                        onChange={(v) => handleMetricUpdate(i, { title: v })}
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
                      <EditableSelect
                        label="Trend"
                        value={metric.trend}
                        onChange={(v) => handleMetricUpdate(i, { trend: v as "up" | "down" | "stable" })}
                        options={[
                          { value: "up", label: "Up (Increasing)" },
                          { value: "down", label: "Down (Decreasing)" },
                          { value: "stable", label: "Stable" },
                        ]}
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

            {/* ESG Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">ESG Framework Items</h2>
                <button
                  onClick={handleAddESG}
                  className="px-5 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition font-medium"
                >
                  + Add ESG Item
                </button>
              </div>

              <div className="space-y-6">
                {esgItems.map((item: any, i: number) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        ESG Item {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveESG(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={item.icon}
                        onChange={(v) => handleESGUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={item.title}
                        onChange={(v) => handleESGUpdate(i, { title: v })}
                      />
                      <EditableSelect
                        label="Category"
                        value={item.category}
                        onChange={(v) => handleESGUpdate(i, { category: v as "Environmental" | "Social" | "Governance" })}
                        options={[
                          { value: "Environmental", label: "Environmental" },
                          { value: "Social", label: "Social" },
                          { value: "Governance", label: "Governance" },
                        ]}
                      />
                      <EditableTextarea
                        label="Description"
                        value={item.description}
                        onChange={(v) => handleESGUpdate(i, { description: v })}
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
                  label="Card Background"
                  value={cardColor}
                  onChange={(v) => handleUpdate({ cardColor: v })}
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