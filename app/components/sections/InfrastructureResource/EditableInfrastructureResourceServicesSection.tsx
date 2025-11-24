"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfrastructureResourceServicesSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

interface Props {
  section: InfrastructureResourceServicesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InfrastructureResourceServicesSection>) => void;
}

export default function EditableInfrastructureResourceServicesSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Our Infrastructure Services",
    subtitle = "Comprehensive Solutions for Modern Infrastructure",
    description = "From planning to execution, we deliver end-to-end infrastructure services that meet the highest standards of quality, safety, and innovation.",
    services = [
      {
        id: "1",
        title: "Transportation Infrastructure",
        description: "Building roads, bridges, and transit systems that connect communities and drive economic growth.",
        icon: "🚗",
        color: "#3b82f6",
        features: [
          "Highway construction",
          "Bridge engineering",
          "Public transit systems",
          "Traffic management",
        ],
      },
      {
        id: "2",
        title: "Water & Wastewater",
        description: "Advanced water management solutions for clean water supply and efficient wastewater treatment.",
        icon: "💧",
        color: "#06b6d4",
        features: [
          "Water treatment plants",
          "Sewage systems",
          "Storm water management",
          "Water distribution networks",
        ],
      },
      {
        id: "3",
        title: "Energy Infrastructure",
        description: "Powering the future with reliable energy infrastructure and advanced power solutions.",
        icon: "⚡",
        color: "#f59e0b",
        features: [
          "Power plant construction",
          "Transmission lines",
          "Energy distribution",
          "Smart grid systems",
        ],
      },
      {
        id: "4",
        title: "Urban Development",
        description: "Creating modern urban environments with innovative infrastructure and smart city solutions.",
        icon: "🏙️",
        color: "#8b5cf6",
        features: [
          "City planning",
          "Smart infrastructure",
          "Public spaces",
          "Urban development",
        ],
      },
      {
        id: "5",
        title: "Digital Infrastructure",
        description: "Connecting communities with advanced telecommunications and digital infrastructure.",
        icon: "📡",
        color: "#10b981",
        features: [
          "Fiber optic networks",
          "5G infrastructure",
          "Data centers",
          "IoT integration",
        ],
      },
    ],
    backgroundColor = "#ffffff",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    subtitleColor = "#EF4130",
    layout = "mosaic",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleServiceUpdate = (index: number, patch: Partial<Service>) => {
    const updated = services.map((s: any, i: number) =>
      i === index ? { ...s, ...patch } : s
    );
    handleUpdate({ services: updated });
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Describe this infrastructure service...",
      icon: "🔧",
      color: "#6b7280",
      features: ["Feature 1", "Feature 2"],
    };
    handleUpdate({ services: [...services, newService] });
  };

  const handleRemoveService = (index: number) => {
    handleUpdate({ services: services.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Mosaic Layout with Staggered Animation
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

          {/* Construction-Themed Services Blueprint Layout */}
          <div className="relative">
            {/* Blueprint Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="blueprint" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 L40 20 M20 0 L20 40" stroke="#EF4130" strokeWidth="0.5" opacity="0.3"/>
                    <circle cx="20" cy="20" r="1" fill="#EF4130" opacity="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint)"/>
              </svg>
            </div>

            {/* Construction Tools Floating */}
            <motion.div
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 right-10 text-3xl opacity-30"
            >
              🔧
            </motion.div>
            <motion.div
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 left-10 text-2xl opacity-25"
            >
              📐
            </motion.div>

            <div className="relative max-w-5xl mx-auto space-y-6">
              {services.map((service: Service, index: number) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -100, rotateY: -15 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="relative"
                >
                  {/* Construction Blueprint Frame */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    className="absolute -inset-2 border-2 border-primary-200 rounded-2xl opacity-20"
                    style={{ borderStyle: 'dashed' }}
                  />

                  {/* Blueprint Corners */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.5 }}
                    className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-primary-400"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.6 }}
                    className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-primary-400"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.7 }}
                    className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-primary-400"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.8 }}
                    className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-primary-400"
                  />

                  {/* Service Card */}
                  <motion.div
                    className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 overflow-hidden relative"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Construction Stamp */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 1, type: "spring" }}
                      className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-10"
                    >
                      ✓
                    </motion.div>

                    {/* Accordion Header with Construction Theme */}
                    <motion.div
                      className="p-8 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 transition-all duration-300 relative overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-12 gap-1 h-full">
                          {Array.from({ length: 48 }).map((_, i) => (
                            <div key={i} className="bg-gray-400 rounded-sm"></div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                          {/* Construction Icon Container */}
                          <motion.div
                            className="relative"
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.6 }}
                          >
                            <div
                              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg relative"
                              style={{ backgroundColor: `${service.color}15`, border: `2px solid ${service.color}30` }}
                            >
                              {service.icon}
                              {/* Rivets */}
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></div>
                              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gray-500 rounded-full border-2 border-white"></div>
                            </div>
                            {/* Construction lines */}
                            <motion.div
                              animate={{ x: [0, 20, 0] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index }}
                              className="absolute -right-2 top-1/2 w-4 h-0.5 bg-orange-400 -translate-y-1/2"
                            />
                          </motion.div>

                          <div className="flex-1">
                            <motion.h3
                              className="text-2xl font-bold mb-2 relative"
                              style={{ color: titleColor }}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                            >
                              {service.title}
                              {/* Underline animation */}
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 origin-left"
                              />
                            </motion.h3>
                            <motion.p
                              className="text-gray-600 text-base leading-relaxed"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                            >
                              {service.description}
                            </motion.p>
                          </div>
                        </div>

                        {/* Construction-themed Expand Icon */}
                        <motion.div
                          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative"
                          style={{ backgroundColor: `${service.color}10`, border: `2px solid ${service.color}20` }}
                          whileHover={{
                            rotate: 180,
                            scale: 1.1,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ rotate: [0, 90, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                          {/* Gear icon overlay */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 flex items-center justify-center text-xs opacity-50"
                          >
                            ⚙️
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Accordion Content with Construction Details */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      className="border-t border-gray-200 relative overflow-hidden"
                    >
                      {/* Construction grid background */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="grid grid-cols-20 gap-1 h-full">
                          {Array.from({ length: 100 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: i * 0.01 }}
                              className="bg-primary-400 rounded-sm"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="p-8 pt-6 relative z-10">
                        <motion.p
                          className="text-gray-700 leading-relaxed mb-8 text-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                        >
                          {service.description}
                        </motion.p>

                        {/* Features Grid with Construction Theme */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {service.features.map((feature: string, featureIndex: number) => (
                            <motion.div
                              key={featureIndex}
                              initial={{ opacity: 0, x: -30, scale: 0.8 }}
                              whileInView={{ opacity: 1, x: 0, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.5,
                                delay: featureIndex * 0.1 + index * 0.2 + 0.8,
                                type: "spring",
                              }}
                              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-orange-50 transition-all duration-300 border border-gray-100 relative overflow-hidden group"
                            >
                              {/* Construction rivet */}
                              <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: featureIndex * 0.1 + index * 0.2 + 1 }}
                                className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full border border-white shadow-sm"
                              />

                              {/* Feature indicator with construction hammer effect */}
                              <motion.div
                                className="relative flex-shrink-0"
                                whileHover={{ rotate: [0, -20, 20, 0] }}
                                transition={{ duration: 0.6 }}
                              >
                                <div
                                  className="w-4 h-4 rounded-full flex-shrink-0 mt-1 shadow-md"
                                  style={{ backgroundColor: service.color }}
                                />
                                {/* Mini hammer */}
                                <motion.div
                                  animate={{
                                    rotate: [0, 45, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: featureIndex * 0.5,
                                  }}
                                  className="absolute -top-1 -right-1 text-xs opacity-60"
                                >
                                  🔨
                                </motion.div>
                              </motion.div>

                              <motion.span
                                className="text-sm text-gray-700 font-medium leading-relaxed"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {feature}
                              </motion.span>

                              {/* Progress line animation */}
                              <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: featureIndex * 0.1 + index * 0.2 + 1.2 }}
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 origin-left"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
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
          {services.slice(0, 6).map((service: any, i: number) => (
            <div
              key={service.id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
              style={{
                background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
              }}
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {service.description}
              </p>
              <div className="space-y-1">
                {service.features.slice(0, 2).map((feature: string, j: number) => (
                  <div key={j} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: service.color }}
                    />
                    <span className="text-xs text-gray-600">{feature}</span>
                  </div>
                ))}
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
            Infrastructure Services Editor
          </h1>
          <p className="text-gray-600 mt-1">Mosaic layout with varied card sizes</p>
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

            {/* Services */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Services</h2>
                <button
                  onClick={handleAddService}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  + Add Service
                </button>
              </div>

              <AnimatePresence>
                {services.map((service: any, i: number) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Service {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveService(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={service.icon}
                        onChange={(v) => handleServiceUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={service.title}
                        onChange={(v) => handleServiceUpdate(i, { title: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={service.description}
                        onChange={(e: any) => handleServiceUpdate(i, { description: e })}
                        rows={2}
                        className="md:col-span-2"
                      />
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {service.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e: any) => {
                                const updatedFeatures = [...service.features];
                                updatedFeatures[featureIndex] = e.target.value;
                                handleServiceUpdate(i, { features: updatedFeatures });
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button
                              onClick={() => {
                                const updatedFeatures = service.features.filter(
                                  (_: string, fi: number) => fi !== featureIndex
                                );
                                handleServiceUpdate(i, { features: updatedFeatures });
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 text-sm"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleServiceUpdate(i, {
                              features: [...service.features, "New feature"],
                            });
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition text-sm"
                        >
                          + Add Feature
                        </button>
                      </div>
                    </div>

                    {/* Color */}
                    <EditableColorPicker
                      label="Accent Color"
                      value={service.color}
                      onChange={(v) => handleServiceUpdate(i, { color: v })}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}