"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
} from "@/app/components/EditableInputs";

interface BuildingFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  buildingType: "residential" | "commercial" | "mixed";
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}


export default function EditableEnvironmentSustainabilityBuildingSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Green Building & Urban Design",
    description1 = "We design high-performance buildings and urban environments that enhance air quality, reduce energy demand, and elevate the experience of occupants. Our green building solutions incorporate biophilic design, natural ventilation strategies, efficient façades, and advanced sustainability technologies — creating modern spaces that prioritize comfort, safety, and environmental integrity.",
    description2 = "Our urban design approach integrates green corridors, public spaces, and nature-based solutions that enrich the urban fabric and foster strong, resilient communities.",
    features = [
      {
        id: "1",
        title: "Biophilic Design",
        description: "Integrating natural elements and patterns into building design for enhanced well-being",
        icon: "🌿",
        buildingType: "residential",
      },
      {
        id: "2",
        title: "Natural Ventilation",
        description: "Passive cooling and fresh air systems that reduce energy consumption",
        icon: "💨",
        buildingType: "commercial",
      },
      {
        id: "3",
        title: "Efficient Façades",
        description: "Smart building envelopes that optimize thermal performance and daylight",
        icon: "🏢",
        buildingType: "mixed",
      },
      {
        id: "4",
        title: "Green Corridors",
        description: "Connected green spaces that promote biodiversity and pedestrian movement",
        icon: "🌳",
        buildingType: "residential",
      },
      {
        id: "5",
        title: "Public Spaces",
        description: "Inclusive community areas that foster social interaction and recreation",
        icon: "🏞️",
        buildingType: "commercial",
      },
      {
        id: "6",
        title: "Nature-Based Solutions",
        description: "Ecological approaches to urban challenges including stormwater management",
        icon: "🌊",
        buildingType: "mixed",
      },
    ],
    backgroundColor = "#ecfdf5",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    accentColor = "#16a34a",
    buildingColor = "#22c55e",
    skyColor = "#dbeafe",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleFeatureUpdate = (index: number, patch: Partial<BuildingFeature>) => {
    const updated = features.map((f: any, i: number) =>
      i === index ? { ...f, ...patch } : f
    );
    handleUpdate({ features: updated });
  };

  const handleAddFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Describe this building feature...",
      icon: "🏗️",
      buildingType: "mixed" as const,
    };
    handleUpdate({ features: [...features, newFeature] });
  };

  const handleRemoveFeature = (index: number) => {
    handleUpdate({ features: features.filter((_: any, i: number) => i !== index) });
  };

  // Building illustration component
  const BuildingIllustration = ({ type, color }: { type: string; color: string }) => {
    const getBuildingShape = () => {
      switch (type) {
        case "residential":
          return (
            <div className="relative">
              {/* Building base */}
              <div
                className="w-16 h-20 rounded-t-lg relative"
                style={{ backgroundColor: color }}
              >
                {/* Windows */}
                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-yellow-200 rounded-sm opacity-80"
                      style={{
                        backgroundColor: i % 3 === 0 ? "#fbbf24" : "#ffffff",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Roof */}
              <div
                className="w-20 h-3 mx-auto"
                style={{
                  backgroundColor: "#8b4513",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              />
            </div>
          );
        case "commercial":
          return (
            <div className="relative">
              {/* Building base */}
              <div
                className="w-20 h-24 rounded-t-lg relative"
                style={{ backgroundColor: color }}
              >
                {/* Windows in grid */}
                <div className="absolute inset-2 grid grid-cols-3 gap-1">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-blue-100 rounded-sm"
                      style={{
                        backgroundColor: i % 4 === 0 ? "#3b82f6" : "#ffffff",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Flat roof */}
              <div
                className="w-20 h-2 mx-auto"
                style={{ backgroundColor: "#374151" }}
              />
            </div>
          );
        case "mixed":
          return (
            <div className="relative">
              {/* Building base */}
              <div
                className="w-18 h-22 rounded-t-lg relative"
                style={{ backgroundColor: color }}
              >
                {/* Mixed windows */}
                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-sm"
                      style={{
                        backgroundColor: i % 2 === 0 ? "#10b981" : "#ffffff",
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Modern roof */}
              <div
                className="w-18 h-3 mx-auto rounded-t-lg"
                style={{ backgroundColor: "#6b7280" }}
              />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="flex justify-center items-end h-32">
        {getBuildingShape()}
      </div>
    );
  };

  // ===================================================================
  // LIVE VIEW – Building Illustrations with Features
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor }}>
        {/* Sky background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: skyColor }}
        />

        {/* Floating clouds */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white opacity-30"
              style={{
                left: `${10 + i * 20}%`,
                top: `${10 + (i % 2) * 10}%`,
                fontSize: `${30 + i * 10}px`,
              }}
              animate={{
                x: [0, 50, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5,
              }}
            >
              ☁️
            </motion.div>
          ))}
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

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature: BuildingFeature, index: number) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Building Illustration Header */}
                <div
                  className="p-6 text-center relative"
                  style={{ backgroundColor: `${accentColor}10` }}
                >
                  <BuildingIllustration type={feature.buildingType} color={buildingColor} />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                    }}
                    className="text-3xl mb-2"
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
                    className="text-xl font-bold mb-4"
                    style={{ color: titleColor }}
                  >
                    {feature.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.7 }}
                    className="text-gray-600 leading-relaxed mb-4"
                  >
                    {feature.description}
                  </motion.p>

                  {/* Building type badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.9 }}
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                    }}
                  >
                    {feature.buildingType} Design
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 + 1.1 }}
                  className="h-1 w-full origin-left"
                  style={{ backgroundColor: accentColor }}
                />
              </motion.div>
            ))}
          </div>

          {/* Urban skyline illustration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 flex justify-center"
          >
            <div className="relative">
              {/* Simple skyline */}
              <div className="flex items-end gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${20 + i * 8}px` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                    className="w-6 rounded-t"
                    style={{ backgroundColor: buildingColor }}
                  />
                ))}
              </div>
              {/* Sun */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-8 -right-8 text-4xl"
              >
                ☀️
              </motion.div>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(0, 6).map((feature: any, i: number) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden"
            >
              <div className="p-4 text-center" style={{ backgroundColor: `${accentColor}10` }}>
                <BuildingIllustration type={feature.buildingType} color={buildingColor} />
                <div className="text-xl">{feature.icon}</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{feature.description.substring(0, 50)}...</p>
                <span className="text-xs px-2 py-1 rounded-full capitalize" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  {feature.buildingType}
                </span>
              </div>
            </div>
          ))}
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
            Green Building & Urban Design Editor
          </h1>
          <p className="text-gray-600 mt-1">Building illustrations with urban design features</p>
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

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Building Features</h2>
                <button
                  onClick={handleAddFeature}
                  className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                >
                  + Add Feature
                </button>
              </div>

              <div className="space-y-6">
                {features.map((feature: any, i: number) => (
                  <motion.div
                    key={feature.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Feature {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveFeature(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={feature.icon}
                        onChange={(v) => handleFeatureUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={feature.title}
                        onChange={(v) => handleFeatureUpdate(i, { title: v })}
                      />
                      <EditableSelect
                        label="Building Type"
                        value={feature.buildingType}
                        onChange={(v) => handleFeatureUpdate(i, { buildingType: v as "residential" | "commercial" | "mixed" })}
                        options={[
                          { value: "residential", label: "Residential" },
                          { value: "commercial", label: "Commercial" },
                          { value: "mixed", label: "Mixed Use" },
                        ]}
                      />
                      <EditableTextarea
                        label="Description"
                        value={feature.description}
                        onChange={(v) => handleFeatureUpdate(i, { description: v })}
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
                <EditableColorPicker
                  label="Building Color"
                  value={buildingColor}
                  onChange={(v) => handleUpdate({ buildingColor: v })}
                />
                <EditableColorPicker
                  label="Sky Color"
                  value={skyColor}
                  onChange={(v) => handleUpdate({ skyColor: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}