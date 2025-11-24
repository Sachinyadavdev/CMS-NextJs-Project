import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface InnovationExecutionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  technologies?: Array<{
    name: string;
    description: string;
    icon: string;
    benefits: string[];
  }>;
  stats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type InnovationExecutionSection = BaseSection<InnovationExecutionContent>;

interface Props {
  section: InnovationExecutionSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InnovationExecutionSection>) => void;
}

export default function EditableInnovationExecutionSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Innovation-Driven Execution",
    subtitle = "Advanced Technologies for Superior Results",
    description = "Advanced technologies including BIM, IoT, automation, AI analytics, and digital twins enhance accuracy, reduce risk, accelerate decision-making, and provide real-time operational insight throughout the project lifecycle.",
    technologies = [
      {
        name: "BIM Technology",
        description: "Building Information Modeling for precise planning",
        icon: "🏗️",
        benefits: [
          "Enhanced accuracy",
          "Reduced errors",
          "Better collaboration",
        ],
      },
      {
        name: "IoT Integration",
        description: "Internet of Things for smart monitoring",
        icon: "📡",
        benefits: [
          "Real-time data",
          "Predictive maintenance",
          "Operational efficiency",
        ],
      },
      {
        name: "AI Analytics",
        description: "Artificial Intelligence for intelligent insights",
        icon: "🤖",
        benefits: [
          "Data-driven decisions",
          "Risk reduction",
          "Performance optimization",
        ],
      },
      {
        name: "Digital Twins",
        description: "Virtual replicas for simulation and testing",
        icon: "🔄",
        benefits: [
          "Scenario testing",
          "Lifecycle management",
          "Cost optimization",
        ],
      },
    ],
    stats = [
      { value: "99%", label: "Accuracy Improvement", icon: "🎯" },
      { value: "40%", label: "Risk Reduction", icon: "🛡️" },
      { value: "60%", label: "Faster Decisions", icon: "⚡" },
      { value: "24/7", label: "Real-time Monitoring", icon: "📊" },
    ],
    backgroundColor = "from-purple-50 to-indigo-100",
    textColor = "text-gray-800",
    accentColor = "purple",
  } = content;

  const [localContent, setLocalContent] = useState(content);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...localContent, [field]: value };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const handleTechUpdate = (index: number, field: string, value: any) => {
    const updatedTech = [...(localContent.technologies || technologies)];
    if (field === "benefits") {
      updatedTech[index] = { ...updatedTech[index], benefits: value };
    } else {
      updatedTech[index] = { ...updatedTech[index], [field]: value };
    }
    handleUpdate("technologies", updatedTech);
  };

  const handleStatUpdate = (index: number, field: string, value: any) => {
    const updatedStats = [...(localContent.stats || stats)];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleUpdate("stats", updatedStats);
  };

  // ===================================================================
  // LIVE VIEW – Modern Innovation Execution Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}
      >
      {/* Circuit-like animated background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <motion.path
            d="M100,200 L300,200 L300,400 L500,400 L500,200 L700,200"
            stroke="#8B5CF6"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.path
            d="M200,300 L400,300 L400,500 L600,500 L600,300 L800,300"
            stroke="#A855F7"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
          <motion.circle
            cx="300"
            cy="200"
            r="8"
            fill="#8B5CF6"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="500"
            cy="400"
            r="8"
            fill="#A855F7"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={localContent.title || title}
                onChange={(e: any) => handleUpdate("title", e.target.value)}
                className="text-4xl font-bold text-center w-full bg-transparent border-b-2 border-purple-300 focus:border-purple-500 outline-none"
                placeholder="Section Title"
              />
              <input
                type="text"
                value={localContent.subtitle || subtitle}
                onChange={(e: any) => handleUpdate("subtitle", e.target.value)}
                className="text-xl text-center w-full bg-transparent border-b-2 border-purple-300 focus:border-purple-500 outline-none"
                placeholder="Section Subtitle"
              />
              <textarea
                value={localContent.description || description}
                onChange={(e: any) => handleUpdate("description", e.target.value)}
                className="text-lg text-center w-full bg-transparent border-2 border-purple-300 focus:border-purple-500 outline-none rounded p-2 min-h-[100px]"
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

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {(localContent.technologies || technologies).map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Tech icon animation */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-4 text-6xl opacity-10"
              >
                {tech.icon}
              </motion.div>

              {isEditing ? (
                <div className="space-y-4 relative z-10">
                  <input
                    type="text"
                    value={tech.icon}
                    onChange={(e: any) =>
                      handleTechUpdate(index, "icon", e.target.value)
                    }
                    className="text-4xl text-center w-full bg-transparent border-b border-purple-300 focus:border-purple-500 outline-none"
                  />
                  <input
                    type="text"
                    value={tech.name}
                    onChange={(e: any) =>
                      handleTechUpdate(index, "name", e.target.value)
                    }
                    className="text-2xl font-bold text-center w-full bg-transparent border-b border-purple-300 focus:border-purple-500 outline-none"
                  />
                  <textarea
                    value={tech.description}
                    onChange={(e: any) =>
                      handleTechUpdate(index, "description", e.target.value)
                    }
                    className="text-base w-full bg-transparent border border-purple-300 focus:border-purple-500 outline-none rounded p-2 min-h-[60px]"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Benefits:
                    </label>
                    <textarea
                      value={tech.benefits.join("\n")}
                      onChange={(e: any) =>
                        handleTechUpdate(
                          index,
                          "benefits",
                          e.target.value.split("\n")
                        )
                      }
                      className="text-sm w-full bg-transparent border border-purple-300 focus:border-purple-500 outline-none rounded p-2 min-h-[80px]"
                      placeholder="Enter benefits (one per line)"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{tech.icon}</span>
                    <h4 className="text-2xl font-bold text-gray-800">
                      {tech.name}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">{tech.description}</p>
                  <div className="space-y-2">
                    {tech.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center text-sm text-purple-700"
                      >
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
            Performance Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(localContent.stats || stats).map((stat, index) => (
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
                      className="text-3xl text-center w-full bg-transparent border-b border-purple-300 focus:border-purple-500 outline-none"
                    />
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e: any) =>
                        handleStatUpdate(index, "value", e.target.value)
                      }
                      className="text-3xl font-bold text-purple-600 text-center w-full bg-transparent border-b border-purple-300 focus:border-purple-500 outline-none"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e: any) =>
                        handleStatUpdate(index, "label", e.target.value)
                      }
                      className="text-sm text-center w-full bg-transparent border-b border-purple-300 focus:border-purple-500 outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="text-4xl mb-2"
                    >
                      {stat.icon}
                    </motion.div>
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </>
                )}
              </motion.div>
            ))}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Innovation Execution Editor</h1>
          <p className="text-gray-600">Customize your innovation execution showcase with dynamic blue-indigo styling</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <h1 className="text-2xl font-bold">Innovation Execution</h1>
                <p className="text-blue-100 mt-1">Advanced technologies showcase</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(localContent.technologies || technologies).slice(0, 2).map((tech: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{tech.icon}</span>
                          <h5 className="font-medium text-gray-900">{tech.name}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{tech.description}</p>
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
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
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

            {/* Technologies */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                  Technologies ({(localContent.technologies || technologies).length})
                </h2>
                <button
                  onClick={() => {
                    const newTech = {
                      name: "New Technology",
                      description: "Describe this technology...",
                      icon: "⚡",
                      benefits: ["Benefit 1", "Benefit 2"],
                    };
                    handleUpdate("technologies", [...(localContent.technologies || technologies), newTech]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-medium shadow-lg"
                >
                  + Add Technology
                </button>
              </div>

              <AnimatePresence>
                {(localContent.technologies || technologies).map((tech: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        Technology {i + 1}: {tech.name}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedTechs = (localContent.technologies || technologies).filter((_: any, index: number) => index !== i);
                          handleUpdate("technologies", updatedTechs);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Name"
                        value={tech.name}
                        onChange={(v) => handleTechUpdate(i, "name", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={tech.icon}
                        onChange={(v) => handleTechUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={tech.description}
                          onChange={(v) => handleTechUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Key Benefits</label>
                      <div className="space-y-2">
                        {tech.benefits.map((benefit: string, benefitIndex: number) => (
                          <div key={benefitIndex} className="flex gap-3">
                            <input
                              type="text"
                              value={benefit}
                              onChange={(e: any) => {
                                const updatedBenefits = [...tech.benefits];
                                updatedBenefits[benefitIndex] = e.target.value;
                                handleTechUpdate(i, "benefits", updatedBenefits);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                              placeholder="Enter benefit..."
                            />
                            <button
                              onClick={() => {
                                const updatedBenefits = tech.benefits.filter(
                                  (_: string, fi: number) => fi !== benefitIndex
                                );
                                handleTechUpdate(i, "benefits", updatedBenefits);
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleTechUpdate(i, "benefits", [...tech.benefits, "New benefit"]);
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm font-medium"
                        >
                          + Add Benefit
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Innovation Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(localContent.stats || stats).map((stat: any, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
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
          </div>
        </div>
      </div>
    </div>
  );
}
