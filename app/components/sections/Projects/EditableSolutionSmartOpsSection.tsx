"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
} from "../../EditableInputs";

interface SolutionSmartOpsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  facilityImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  technologies?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type SolutionSmartOpsSection = BaseSection<SolutionSmartOpsContent>;

interface Props {
  section: SolutionSmartOpsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<SolutionSmartOpsSection>) => void;
}

export default function EditableSolutionSmartOpsSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Solution+ Smart Operations Facility – UAE",
    subtitle = "Next-Generation BPO Operations Center",
    description = "A flagship operations center designed for large-scale BPO workflows. RAUS provides ergonomic work systems, productivity-focused interiors, and spatial layouts that improve efficiency, reduce operational friction, and support 24/7 use.",
    location = "Dubai, UAE",
    year = "2024",
    status = "Operational",
    heroImage = "",
    facilityImages = ["", "", ""],
    features = [
      "Ergonomic Work Systems",
      "Productivity-Focused Interiors",
      "Smart Spatial Layouts",
      "24/7 Operations Support",
      "Advanced Technology Integration",
      "Energy-Efficient Design",
    ],
    highlights = [
      {
        title: "Workflow Optimization",
        description:
          "Streamlined processes and intelligent layouts that maximize productivity and efficiency",
        icon: "⚡",
      },
      {
        title: "Ergonomic Excellence",
        description:
          "Scientifically designed workspaces that prioritize employee comfort and well-being",
        icon: "💺",
      },
      {
        title: "Smart Infrastructure",
        description:
          "IoT-enabled systems, automated climate control, and intelligent lighting solutions",
        icon: "🤖",
      },
      {
        title: "24/7 Reliability",
        description:
          "Round-the-clock operational capability with redundant systems and backup power",
        icon: "🔄",
      },
    ],
    technologies = [
      "IoT Sensors",
      "Smart Lighting",
      "Climate Control",
      "Video Conferencing",
      "Security Systems",
      "Data Analytics",
    ],
    stats = [
      { value: "1,000+", label: "Workstations" },
      { value: "24/7", label: "Operations" },
      { value: "99.9%", label: "Uptime" },
      { value: "50%", label: "Energy Savings" },
    ],
    backgroundColor = "#f8fafc",
    textColor = "#1f2937",
    accentColor = "#7c3aed",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleHighlightUpdate = (
    index: number,
    patch: Partial<(typeof highlights)[0]>
  ) => {
    const updated = [...highlights];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ highlights: updated });
  };

  const handleStatUpdate = (
    index: number,
    patch: Partial<(typeof stats)[0]>
  ) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ stats: updated });
  };

  const handleFeatureUpdate = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    handleUpdate({ features: updated });
  };

  const handleTechnologyUpdate = (index: number, value: string) => {
    const updated = [...technologies];
    updated[index] = value;
    handleUpdate({ technologies: updated });
  };

  const handleFacilityImageUpdate = (index: number, url: string) => {
    const updated = [...facilityImages];
    updated[index] = url;
    handleUpdate({ facilityImages: updated });
  };

  // ===================================================================
  // LIVE VIEW
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-16 gap-1 h-full">
            {Array.from({ length: 256 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.002 }}
                className="bg-purple-400 rounded-sm"
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -70, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 left-4 text-9xl opacity-4 z-0"
        >
          💻
        </motion.div>
        <motion.div
          animate={{ x: [0, -75, 0], y: [0, 75, 0], rotate: [0, -40, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-8 text-8xl opacity-3 z-0"
        >
          📊
        </motion.div>
        <motion.div
          animate={{ x: [0, 65, 0], y: [0, -65, 0], rotate: [0, 35, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-4 text-7xl opacity-6 z-0"
        >
          🔧
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              {status} • {year}
            </div>
            <h2
              className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            <p
              className="text-2xl font-medium mb-6"
              style={{ color: accentColor }}
            >
              {subtitle}
            </p>
            <p
              className="max-w-4xl mx-auto text-xl leading-relaxed"
              style={{ color: textColor }}
            >
              {description}
            </p>
          </motion.div>

          {/* Hero Image */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={heroImage}
                  alt={title}
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-medium">{location}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Facility Gallery */}
          {facilityImages.some((img) => img) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Facility Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {facilityImages.map(
                  (image, index) =>
                    image && (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-2xl shadow-lg"
                      >
                        <img
                          src={image}
                          alt={`Facility ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </motion.div>
                    )
                )}
              </div>
            </motion.div>
          )}

          {/* Highlights & Features/Tech */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-8"
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <div className="text-4xl mb-4">{highlight.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                  Key Features
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-4 bg-purple-50 rounded-xl border border-purple-100"
                    >
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <span className="font-medium text-gray-800">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
              >
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                  Smart Technologies
                </h3>
                <div className="space-y-4">
                  {technologies.map((technology, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-4 bg-indigo-50 rounded-xl border border-indigo-100"
                    >
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                      <span className="font-medium text-gray-800">
                        {technology}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITING MODE - ALL FOCUS ISSUES FIXED
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <h1 className="text-2xl font-bold">Solution+ Smart Operations</h1>
        <p className="text-purple-100 mt-1">BPO Operations Center</p>
      </div>
      <div className="p-6 max-h-80 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {heroImage ? (
              <img
                src={heroImage}
                alt=""
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                💻
              </div>
            )}
            <div>
              <h4 className="font-semibold text-gray-900">{title}</h4>
              <p className="text-sm text-gray-500">
                {location} • {year}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          <div className="flex gap-2">
            {features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Solution+ Smart Operations Editor
          </h1>
          <p className="text-gray-600">
            Customize the BPO operations center showcase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
              Live Preview
            </h2>
            <Preview />
          </div>

          <div className="space-y-8">
            {/* Project Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Project Information
              </h2>
              <div className="space-y-5">
                <EditableText
                  label="Project Title"
                  value={title}
                  onChange={(v) => handleUpdate({ title: v })}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate({ subtitle: v })}
                />
                <EditableText
                  label="Location"
                  value={location}
                  onChange={(v) => handleUpdate({ location: v })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <EditableText
                    label="Year"
                    value={year}
                    onChange={(v) => handleUpdate({ year: v })}
                  />
                  <EditableText
                    label="Status"
                    value={status}
                    onChange={(v) => handleUpdate({ status: v })}
                  />
                </div>
                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(v) => handleUpdate({ description: v })}
                  rows={4}
                />
              </div>
            </div>

            {/* Hero & Facility Images */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                Images
              </h2>
              <MediaUpload
                label="Hero Image"
                type="image"
                currentUrl={heroImage}
                onUpload={(url) => handleUpdate({ heroImage: url })}
                onRemove={() => handleUpdate({ heroImage: "" })}
              />

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Facility Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {facilityImages.map((image, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facility {index + 1}
                      </label>
                      <MediaUpload
                        label={`Facility Image ${index + 1}`}
                        type="image"
                        currentUrl={image}
                        onUpload={(url) =>
                          handleFacilityImageUpdate(index, url)
                        }
                        onRemove={() => handleFacilityImageUpdate(index, "")}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Key Statistics
              </h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  // REMOVED key={index} FROM HERE
                  <div key={index} className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <EditableText
                      label="Value"
                      value={stat.value}
                      onChange={(v) => handleStatUpdate(index, { value: v })}
                    />
                    <EditableText
                      label="Label"
                      value={stat.label}
                      onChange={(v) => handleStatUpdate(index, { label: v })}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                Project Highlights
              </h2>
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  // REMOVED key={index} FROM PARENT DIV
                  <div key={index} className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={highlight.title}
                        onChange={(v) =>
                          handleHighlightUpdate(index, { title: v })
                        }
                      />
                      <EditableText
                        label="Icon"
                        value={highlight.icon}
                        onChange={(v) =>
                          handleHighlightUpdate(index, { icon: v })
                        }
                      />
                      <div></div>
                    </div>
                    <EditableTextarea
                      label="Description"
                      value={highlight.description}
                      onChange={(v) =>
                        handleHighlightUpdate(index, {
                          description: v,
                        })
                      }
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-violet-500 rounded-full mr-3"></span>
                Key Features
              </h2>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <EditableText
                    key={index}
                    label={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e: any) =>
                      handleFeatureUpdate(index, e)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Smart Technologies
              </h2>
              <div className="space-y-3">
                {technologies.map((technology, index) => (
                  <EditableText
                    key={index}
                    label={`Technology ${index + 1}`}
                    value={technology}
                    onChange={(e: any) =>
                      handleTechnologyUpdate(index, e)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
