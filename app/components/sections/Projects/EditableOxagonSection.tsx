"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
} from "../../EditableInputs";

interface OxagonContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  conceptImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  innovations?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type OxagonSection = BaseSection<OxagonContent>;

interface Props {
  section: OxagonSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<OxagonSection>) => void;
}

export default function EditableOxagonSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Oxagon – NEOM, Saudi Arabia",
    subtitle = "World's First Floating Industrial City",
    description = "The world's first floating industrial city, powered by clean energy and built on circular economic principles. RAUS supports development that integrates smart logistics, Industry 4.0 systems, autonomous transport and AI-enabled operations for global trade and industrial innovation.",
    location = "NEOM, Saudi Arabia",
    year = "2024",
    status = "In Development",
    heroImage = "",
    conceptImages = ["", "", ""],
    features = [
      "Floating Infrastructure",
      "Clean Energy Systems",
      "Circular Economy Design",
      "Smart Logistics",
      "Industry 4.0 Integration",
      "Autonomous Transport",
    ],
    highlights = [
      {
        title: "Floating Innovation",
        description:
          "Revolutionary floating city concept that adapts to rising sea levels and provides flexible industrial space",
        icon: "🏝️",
      },
      {
        title: "Clean Energy Powered",
        description:
          "100% renewable energy systems including solar, wind and wave energy technologies",
        icon: "🌊",
      },
      {
        title: "Circular Economy",
        description:
          "Zero-waste industrial processes with complete material recycling and resource optimization",
        icon: "♻️",
      },
      {
        title: "AI-Enabled Operations",
        description:
          "Intelligent automation and predictive maintenance systems for optimal performance",
        icon: "🤖",
      },
    ],
    innovations = [
      "Floating Platform Technology",
      "Wave Energy Harvesting",
      "Autonomous Cargo Ships",
      "AI Logistics Optimization",
      "Modular Industrial Units",
      "Smart Grid Systems",
    ],
    stats = [
      { value: "1.5", label: "sq km Platform" },
      { value: "100%", label: "Renewable Energy" },
      { value: "0", label: "Carbon Footprint" },
      { value: "500+", label: "Jobs Created" },
    ],
    backgroundColor = "#fef2f2",
    textColor = "#1f2937",
    accentColor = "#dc2626",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleHighlightUpdate = (
    index: number,
    patch: Partial<(typeof highlights)[0]>
  ) => {
    const updated = highlights.map((h: any, i: number) =>
      i === index ? { ...h, ...patch } : h
    );
    handleUpdate({ highlights: updated });
  };

  const handleStatUpdate = (
    index: number,
    patch: Partial<(typeof stats)[0]>
  ) => {
    const updated = stats.map((s: any, i: number) =>
      i === index ? { ...s, ...patch } : s
    );
    handleUpdate({ stats: updated });
  };

  const handleFeatureUpdate = (index: number, value: string) => {
    const updated = features.map((f: string, i: number) =>
      i === index ? value : f
    );
    handleUpdate({ features: updated });
  };

  const handleInnovationUpdate = (index: number, value: string) => {
    const updated = innovations.map((i: string, idx: number) =>
      idx === index ? value : i
    );
    handleUpdate({ innovations: updated });
  };

  const handleConceptImageUpdate = (index: number, url: string) => {
    const updated = conceptImages.map((img: string, i: number) =>
      i === index ? url : img
    );
    handleUpdate({ conceptImages: updated });
  };

  // ===================================================================
  // LIVE VIEW – Oxagon Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        id="OxagonID"
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 gap-1 h-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
                className="bg-red-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Floating Ocean Elements */}
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -80, 0],
            rotate: [0, 50, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-6 left-2 text-10xl opacity-3 z-0"
        >
          🌊
        </motion.div>
        <motion.div
          animate={{
            x: [0, -85, 0],
            y: [0, 85, 0],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 34,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-12 right-6 text-9xl opacity-2 z-0"
        >
          ⚓
        </motion.div>
        <motion.div
          animate={{
            x: [0, 75, 0],
            y: [0, -75, 0],
            rotate: [0, 40, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-2 text-8xl opacity-5 z-0"
        >
          🚢
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
            <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
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
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Concept Gallery */}
          {conceptImages.some((img) => img) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Concept Visualization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {conceptImages.map(
                  (image, index) =>
                    image && (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-2xl shadow-lg"
                      >
                        <img
                          src={image}
                          alt={`Concept ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </motion.div>
                    )
                )}
              </div>
            </motion.div>
          )}

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
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

          {/* Features & Innovations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Features */}
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
                    className="flex items-center p-4 bg-red-50 rounded-xl border border-red-100"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-800">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Innovations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Technological Innovations
              </h3>
              <div className="space-y-4">
                {innovations.map((innovation, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 bg-red-50 rounded-xl border border-red-100"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-800">
                      {innovation}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITING MODE
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-cyan-500 text-white">
        <h1 className="text-2xl font-bold">Oxagon Floating City</h1>
        <p className="text-red-100 mt-1">Revolutionary Industrial Platform</p>
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
                🏝️
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
                className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-cyan-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Oxagon Floating City Editor
          </h1>
          <p className="text-gray-600">
            Customize the revolutionary floating industrial platform showcase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <Preview />
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
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

            {/* Hero Image */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></span>
                Hero Image
              </h2>
              <MediaUpload
                label="Project Hero Image"
                type="image"
                currentUrl={heroImage}
                onUpload={(url) => handleUpdate({ heroImage: url })}
                onRemove={() => handleUpdate({ heroImage: "" })}
                placeholder="Upload project hero image..."
              />
            </div>

            {/* Concept Images */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Concept Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conceptImages.map((image, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Concept {index + 1}
                    </label>
                    <MediaUpload
                      label={`Concept Image ${index + 1}`}
                      type="image"
                      currentUrl={image}
                      onUpload={(url) => handleConceptImageUpdate(index, url)}
                      onRemove={() => handleConceptImageUpdate(index, "")}
                      placeholder="Upload concept image..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Key Statistics
              </h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
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
                <span className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></span>
                Project Highlights
              </h2>
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="p-6 bg-red-50 rounded-2xl border border-red-100"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <EditableText
                        label={`Title-${index}`}
                        value={highlight.title}
                        onChange={(v) =>
                          handleHighlightUpdate(index, { title: v })
                        }
                      />
                      <EditableText
                        label={`Icon-${index}`}
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
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
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

            {/* Innovations */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Technological Innovations
              </h2>
              <div className="space-y-3">
                {innovations.map((innovation, index) => (
                  <EditableText
                    key={index}
                    label={`Innovation ${index + 1}`}
                    value={innovation}
                    onChange={(e: any) =>
                      handleInnovationUpdate(index, e)
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
