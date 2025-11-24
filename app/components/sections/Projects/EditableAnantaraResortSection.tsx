"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
} from "../../EditableInputs";

interface AnantaraResortContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  interiorImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  amenities?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type AnantaraResortSection = BaseSection<AnantaraResortContent>;

interface Props {
  section: AnantaraResortSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<AnantaraResortSection>) => void;
}

export default function EditableAnantaraResortSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Anantara Resort – High-End Hospitality Development",
    subtitle = "Luxury Resort & Spa Experience",
    description = "RAUS delivers custom furniture systems, interior fit-out management, and strategic spatial planning to enhance guest experience and operational flow while preserving environmental harmony and design identity.",
    location = "Dubai, UAE",
    year = "2024",
    status = "In Development",
    heroImage = "",
    interiorImages = ["", "", ""],
    features = [
      "Custom Furniture Systems",
      "Interior Fit-Out Management",
      "Spatial Planning",
      "Luxury Finishes",
      "Smart Technology Integration",
      "Sustainability Focus",
    ],
    highlights = [
      {
        title: "Guest Experience Enhancement",
        description:
          "Curated luxury experiences with personalized service and premium amenities",
        icon: "👑",
      },
      {
        title: "Design Identity Preservation",
        description:
          "Maintaining brand aesthetics while optimizing functionality and flow",
        icon: "🎨",
      },
      {
        title: "Environmental Harmony",
        description:
          "Sustainable materials and eco-friendly practices integrated into luxury design",
        icon: "🌿",
      },
      {
        title: "Operational Excellence",
        description:
          "Streamlined processes and smart systems for superior guest satisfaction",
        icon: "⚡",
      },
    ],
    amenities = [
      "Spa & Wellness Center",
      "Fine Dining Restaurants",
      "Infinity Pool",
      "Private Villas",
      "Beach Access",
      "Concierge Services",
    ],
    stats = [
      { value: "200+", label: "Luxury Rooms" },
      { value: "5-Star", label: "Rating" },
      { value: "24/7", label: "Concierge" },
      { value: "100%", label: "Sustainable" },
    ],
    backgroundColor = "#f8fafc",
    textColor = "#1f2937",
    accentColor = "#d97706",
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

  const handleAmenityUpdate = (index: number, value: string) => {
    const updated = amenities.map((a: string, i: number) =>
      i === index ? value : a
    );
    handleUpdate({ amenities: updated });
  };

  const handleInteriorImageUpdate = (index: number, url: string) => {
    const updated = interiorImages.map((img: string, i: number) =>
      i === index ? url : img
    );
    handleUpdate({ interiorImages: updated });
  };

  // ===================================================================
  // LIVE VIEW – Anantara Resort Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className="py-24 relative overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-2 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.01 }}
                className="bg-amber-400 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Floating Luxury Elements */}
        <motion.div
          animate={{
            x: [0, 70, 0],
            y: [0, -60, 0],
            rotate: [0, 30, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-12 left-6 text-8xl opacity-6 z-0"
        >
          🏖️
        </motion.div>
        <motion.div
          animate={{
            x: [0, -65, 0],
            y: [0, 65, 0],
            rotate: [0, -35, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-12 text-7xl opacity-5 z-0"
        >
          🥂
        </motion.div>
        <motion.div
          animate={{
            x: [0, 55, 0],
            y: [0, -55, 0],
            rotate: [0, 25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 right-6 text-6xl opacity-8 z-0"
        >
          🌴
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
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
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
                <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Interior Gallery */}
          {interiorImages.some((img) => img) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Interior Showcase
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {interiorImages.map(
                  (image, index) =>
                    image && (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative overflow-hidden rounded-2xl shadow-lg"
                      >
                        <img
                          src={image}
                          alt={`Interior ${index + 1}`}
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

          {/* Features & Amenities */}
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
                    className="flex items-center p-4 bg-amber-50 rounded-xl border border-amber-100"
                  >
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-800">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Premium Amenities
              </h3>
              <div className="space-y-4">
                {amenities.map((amenity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-4 bg-yellow-50 rounded-xl border border-yellow-100"
                  >
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="font-medium text-gray-800">{amenity}</span>
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
      <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <h1 className="text-2xl font-bold">Anantara Resort</h1>
        <p className="text-amber-100 mt-1">Luxury Hospitality Development</p>
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
                🏖️
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
                className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Anantara Resort Editor
          </h1>
          <p className="text-gray-600">
            Customize the luxury hospitality development showcase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse"></div>
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
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
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
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
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

            {/* Interior Images */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                Interior Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {interiorImages.map((image, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interior {index + 1}
                    </label>
                    <MediaUpload
                      label={`Interior Image ${index + 1}`}
                      type="image"
                      currentUrl={image}
                      onUpload={(url) => handleInteriorImageUpdate(index, url)}
                      onRemove={() => handleInteriorImageUpdate(index, "")}
                      placeholder="Upload interior image..."
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                Key Statistics
              </h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <EditableText
                      label={`Value-${index}`}
                      value={stat.value}
                      onChange={(v) => handleStatUpdate(index, { value: v })}
                    />
                    <EditableText
                      label={`Label-${index}`}
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
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                Project Highlights
              </h2>
              <div className="space-y-6">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="p-6 bg-amber-50 rounded-2xl border border-amber-100"
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
                <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
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

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                Premium Amenities
              </h2>
              <div className="space-y-3">
                {amenities.map((amenity, index) => (
                  <EditableText
                    key={index}
                    label={`Amenity ${index + 1}`}
                    value={amenity}
                    onChange={(e: any) =>
                      handleAmenityUpdate(index, e)
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
