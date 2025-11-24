import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface SustainabilityCoreContent {
  title?: string;
  subtitle?: string;
  description?: string;
  pillars?: Array<{
    title: string;
    description: string;
    icon: string;
    initiatives: string[];
  }>;
  impactStats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  certifications?: string[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type SustainabilityCoreSection = BaseSection<SustainabilityCoreContent>;

interface Props {
  section: SustainabilityCoreSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<SustainabilityCoreSection>) => void;
}

export default function EditableSustainabilityCoreSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Sustainability at the Core",
    subtitle = "Environmental Responsibility & Long-term Value",
    description = "Sustainable design, low-carbon material strategies, green building standards, circular resource use, and environmental performance monitoring guide every development to protect communities, ecosystems, and long-term asset value.",
    pillars = [
      {
        title: "Sustainable Design",
        description: "Eco-friendly architectural solutions",
        icon: "🌱",
        initiatives: [
          "Energy-efficient systems",
          "Natural lighting optimization",
          "Passive solar design",
        ],
      },
      {
        title: "Low-Carbon Materials",
        description: "Environmentally conscious material selection",
        icon: "♻️",
        initiatives: [
          "Recycled content materials",
          "Low embodied carbon",
          "Sustainable sourcing",
        ],
      },
      {
        title: "Green Building Standards",
        description: "International certification compliance",
        icon: "🏆",
        initiatives: [
          "LEED certification",
          "BREEAM standards",
          "Green Star rating",
        ],
      },
      {
        title: "Circular Resource Use",
        description: "Waste reduction and resource optimization",
        icon: "🔄",
        initiatives: [
          "Waste minimization",
          "Material reuse",
          "Resource recovery",
        ],
      },
    ],
    impactStats = [
      { value: "40%", label: "Carbon Reduction", icon: "🌍" },
      { value: "60%", label: "Energy Savings", icon: "⚡" },
      { value: "30%", label: "Waste Reduction", icon: "🗑️" },
      { value: "50%", label: "Water Conservation", icon: "💧" },
    ],
    certifications = [
      "LEED Platinum",
      "BREEAM Excellent",
      "Green Building Council",
      "ISO 14001",
    ],
    backgroundColor = "from-teal-50 to-cyan-100",
    textColor = "text-gray-800",
    accentColor = "teal",
  } = content;

  const [localContent, setLocalContent] = useState(content);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...localContent, [field]: value };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const handlePillarUpdate = (index: number, field: string, value: any) => {
    const updatedPillars = [...(localContent.pillars || pillars)];
    if (field === "initiatives") {
      updatedPillars[index] = { ...updatedPillars[index], initiatives: value };
    } else {
      updatedPillars[index] = { ...updatedPillars[index], [field]: value };
    }
    handleUpdate("pillars", updatedPillars);
  };

  const handleStatUpdate = (index: number, field: string, value: any) => {
    const updatedStats = [...(localContent.impactStats || impactStats)];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleUpdate("impactStats", updatedStats);
  };

  const handleCertificationUpdate = (index: number, value: string) => {
    const updatedCerts = [...(localContent.certifications || certifications)];
    updatedCerts[index] = value;
    handleUpdate("certifications", updatedCerts);
  };

  // ===================================================================
  // LIVE VIEW – Modern Sustainability Core Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}
      >
      {/* Nature-inspired animated background */}
      <div className="absolute inset-0">
        {/* Floating leaves */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 text-6xl opacity-20"
        >
          🍃
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-20 text-5xl opacity-25"
        >
          🌿
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/4 text-4xl opacity-15"
        >
          🌸
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={localContent.title || title}
                onChange={(e: any) => handleUpdate("title", e.target.value)}
                className="text-4xl font-bold text-center w-full bg-transparent border-b-2 border-teal-300 focus:border-teal-500 outline-none"
                placeholder="Section Title"
              />
              <input
                type="text"
                value={localContent.subtitle || subtitle}
                onChange={(e: any) => handleUpdate("subtitle", e.target.value)}
                className="text-xl text-center w-full bg-transparent border-b-2 border-teal-300 focus:border-teal-500 outline-none"
                placeholder="Section Subtitle"
              />
              <textarea
                value={localContent.description || description}
                onChange={(e: any) => handleUpdate("description", e.target.value)}
                className="text-lg text-center w-full bg-transparent border-2 border-teal-300 focus:border-teal-500 outline-none rounded p-2 min-h-[100px]"
                placeholder="Section Description"
              />
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}
              >
                {title}
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-xl md:text-2xl font-semibold text-${accentColor}-600 mb-6`}
              >
                {subtitle}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-lg ${textColor} max-w-3xl mx-auto leading-relaxed`}
              >
                {description}
              </motion.p>
            </>
          )}
        </div>

        {/* Sustainability Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {(localContent.pillars || pillars).map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={pillar.icon}
                    onChange={(e: any) =>
                      handlePillarUpdate(index, "icon", e.target.value)
                    }
                    className="text-4xl text-center w-full bg-transparent border-b border-teal-300 focus:border-teal-500 outline-none"
                  />
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e: any) =>
                      handlePillarUpdate(index, "title", e.target.value)
                    }
                    className="text-2xl font-bold text-center w-full bg-transparent border-b border-teal-300 focus:border-teal-500 outline-none"
                  />
                  <textarea
                    value={pillar.description}
                    onChange={(e: any) =>
                      handlePillarUpdate(index, "description", e.target.value)
                    }
                    className="text-base w-full bg-transparent border border-teal-300 focus:border-teal-500 outline-none rounded p-2 min-h-[60px]"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initiatives:
                    </label>
                    <textarea
                      value={pillar.initiatives.join("\n")}
                      onChange={(e: any) =>
                        handlePillarUpdate(
                          index,
                          "initiatives",
                          e.target.value.split("\n")
                        )
                      }
                      className="text-sm w-full bg-transparent border border-teal-300 focus:border-teal-500 outline-none rounded p-2 min-h-[80px]"
                      placeholder="Enter initiatives (one per line)"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="text-4xl mr-4"
                    >
                      {pillar.icon}
                    </motion.span>
                    <h4 className="text-2xl font-bold text-gray-800">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">{pillar.description}</p>
                  <div className="space-y-2">
                    {pillar.initiatives.map((initiative, initiativeIndex) => (
                      <div
                        key={initiativeIndex}
                        className="flex items-center text-sm text-teal-700"
                      >
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                        {initiative}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Impact Stats & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Environmental Impact Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-6`}>
              Environmental Impact
            </h4>
            <div className="grid grid-cols-2 gap-6">
              {(localContent.impactStats || impactStats).map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={stat.icon}
                        onChange={(e: any) =>
                          handleStatUpdate(index, "icon", e.target.value)
                        }
                        className="text-3xl text-center w-full bg-transparent border-b border-teal-300 focus:border-teal-500 outline-none"
                      />
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e: any) =>
                          handleStatUpdate(index, "value", e.target.value)
                        }
                        className="text-3xl font-bold text-teal-600 text-center w-full bg-transparent border-b border-teal-300 focus:border-teal-500 outline-none"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e: any) =>
                          handleStatUpdate(index, "label", e.target.value)
                        }
                        className="text-sm text-center w-full bg-transparent border-b border-teal-300 focus:border-teal-500 outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.3,
                        }}
                        className="text-4xl mb-2"
                      >
                        {stat.icon}
                      </motion.div>
                      <div className="text-3xl font-bold text-teal-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-6`}>
              Certifications & Standards
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {(localContent.certifications || certifications).map(
                (cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                    className="text-center p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={cert}
                        onChange={(e: any) =>
                          handleCertificationUpdate(index, e.target.value)
                        }
                        className="text-sm font-semibold text-center w-full bg-transparent border-b border-teal-300 focus:border-teal-500 outline-none"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-teal-800">
                        {cert}
                      </span>
                    )}
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }

  // ===================================================================
  // EDITING MODE
  // ===================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainability Core Editor</h1>
          <p className="text-gray-600">Customize your sustainability core showcase with dynamic emerald-green styling</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                <h1 className="text-2xl font-bold">Sustainability Core</h1>
                <p className="text-emerald-100 mt-1">Environmental responsibility showcase</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(localContent.pillars || pillars).slice(0, 2).map((pillar: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{pillar.icon}</span>
                          <h5 className="font-medium text-gray-900">{pillar.title}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{pillar.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                Header Settings
              </h2>
              <div className="space-y-5">
                <EditableText
                  label="Main Title"
                  value={title}
                  onChange={(v) => handleUpdate("title", v)}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate("subtitle", v)}
                />
                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(v) => handleUpdate("description", v)}
                  rows={3}
                />
              </div>
            </div>

            {/* Pillars */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  Pillars ({(localContent.pillars || pillars).length})
                </h2>
                <button
                  onClick={() => {
                    const newPillar = {
                      title: "New Pillar",
                      description: "Describe this pillar...",
                      icon: "🌱",
                      initiatives: ["Initiative 1", "Initiative 2"],
                    };
                    handleUpdate("pillars", [...(localContent.pillars || pillars), newPillar]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all font-medium shadow-lg"
                >
                  + Add Pillar
                </button>
              </div>

              <AnimatePresence>
                {(localContent.pillars || pillars).map((pillar: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Pillar {i + 1}: {pillar.title}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedPillars = (localContent.pillars || pillars).filter((_: any, index: number) => index !== i);
                          handleUpdate("pillars", updatedPillars);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={pillar.title}
                        onChange={(v) => handlePillarUpdate(i, "title", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={pillar.icon}
                        onChange={(v) => handlePillarUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={pillar.description}
                          onChange={(v) => handlePillarUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Initiatives */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Key Initiatives</label>
                      <div className="space-y-2">
                        {pillar.initiatives.map((initiative: string, initiativeIndex: number) => (
                          <div key={initiativeIndex} className="flex gap-3">
                            <input
                              type="text"
                              value={initiative}
                              onChange={(e: any) => {
                                const updatedInitiatives = [...pillar.initiatives];
                                updatedInitiatives[initiativeIndex] = e.target.value;
                                handlePillarUpdate(i, "initiatives", updatedInitiatives);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                              placeholder="Enter initiative..."
                            />
                            <button
                              onClick={() => {
                                const updatedInitiatives = pillar.initiatives.filter(
                                  (_: string, fi: number) => fi !== initiativeIndex
                                );
                                handlePillarUpdate(i, "initiatives", updatedInitiatives);
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handlePillarUpdate(i, "initiatives", [...pillar.initiatives, "New initiative"]);
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors text-sm font-medium"
                        >
                          + Add Initiative
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Impact Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-teal-500 rounded-full mr-3"></span>
                Impact Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(localContent.impactStats || impactStats).map((stat: any, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200">
                    <div className="space-y-3">
                      <EditableText
                        label="Value"
                        value={stat.value}
                        onChange={(v) => handleStatUpdate(index, "value", v)}
                      />
                      <EditableText
                        label="Label"
                        value={stat.label}
                        onChange={(v) => handleStatUpdate(index, "label", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={stat.icon}
                        onChange={(v) => handleStatUpdate(index, "icon", v)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></span>
                Certifications
              </h2>
              <div className="space-y-3">
                {(localContent.certifications || certifications).map((cert: string, index: number) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={cert}
                      onChange={(e: any) => handleCertificationUpdate(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter certification..."
                    />
                    <button
                      onClick={() => {
                        const updatedCerts = (localContent.certifications || certifications).filter((_: string, i: number) => i !== index);
                        handleUpdate("certifications", updatedCerts);
                      }}
                      className="px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    handleUpdate("certifications", [...(localContent.certifications || certifications), "New Certification"]);
                  }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors font-medium"
                >
                  + Add Certification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
