import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface AgilityAdaptabilityContent {
  title?: string;
  subtitle?: string;
  description?: string;
  capabilities?: Array<{
    title: string;
    description: string;
    icon: string;
    adaptability: string;
  }>;
  methodologies?: Array<{
    name: string;
    description: string;
    benefits: string[];
  }>;
  flexibilityStats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type AgilityAdaptabilitySection = BaseSection<AgilityAdaptabilityContent>;

interface Props {
  section: AgilityAdaptabilitySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<AgilityAdaptabilitySection>) => void;
}

export default function EditableAgilityAdaptabilitySection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Agility & Adaptability",
    subtitle = "Flexible Solutions for Complex Challenges",
    description = "RAUS embraces project complexity with flexible methodologies, responsive design logic and scalable solutions adaptable to diverse industries, operating environments and evolving market demands.",
    capabilities = [
      {
        title: "Flexible Methodologies",
        description: "Adaptive project management approaches",
        icon: "🔄",
        adaptability: "Customizable to project needs",
      },
      {
        title: "Responsive Design Logic",
        description: "Quick adaptation to changing requirements",
        icon: "⚡",
        adaptability: "Real-time requirement adjustments",
      },
      {
        title: "Scalable Solutions",
        description: "Grow and shrink based on project scope",
        icon: "📈",
        adaptability: "Dynamic resource allocation",
      },
      {
        title: "Industry Versatility",
        description: "Cross-sector expertise and experience",
        icon: "🏢",
        adaptability: "Multi-industry adaptability",
      },
    ],
    methodologies = [
      {
        name: "Agile Development",
        description: "Iterative and incremental delivery",
        benefits: [
          "Faster delivery",
          "Continuous improvement",
          "Client feedback integration",
        ],
      },
      {
        name: "Lean Principles",
        description: "Eliminate waste, maximize value",
        benefits: [
          "Efficiency optimization",
          "Cost reduction",
          "Quality enhancement",
        ],
      },
      {
        name: "Modular Design",
        description: "Flexible component-based architecture",
        benefits: ["Easy modifications", "Scalability", "Future-proofing"],
      },
    ],
    flexibilityStats = [
      { value: "85%", label: "Project Adaptability", icon: "🎯" },
      { value: "24/7", label: "Response Time", icon: "⏱️" },
      { value: "50+", label: "Industries Served", icon: "🌍" },
      { value: "99%", label: "Change Success Rate", icon: "✅" },
    ],
    backgroundColor = "from-red-50 to-rose-100",
    textColor = "text-gray-800",
    accentColor = "red",
  } = content;

  const [localContent, setLocalContent] = useState(content);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...localContent, [field]: value };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const handleCapabilityUpdate = (index: number, field: string, value: any) => {
    const updatedCapabilities = [
      ...(localContent.capabilities || capabilities),
    ];
    updatedCapabilities[index] = {
      ...updatedCapabilities[index],
      [field]: value,
    };
    handleUpdate("capabilities", updatedCapabilities);
  };

  const handleMethodologyUpdate = (
    index: number,
    field: string,
    value: any
  ) => {
    const updatedMethodologies = [
      ...(localContent.methodologies || methodologies),
    ];
    if (field === "benefits") {
      updatedMethodologies[index] = {
        ...updatedMethodologies[index],
        benefits: value,
      };
    } else {
      updatedMethodologies[index] = {
        ...updatedMethodologies[index],
        [field]: value,
      };
    }
    handleUpdate("methodologies", updatedMethodologies);
  };

  const handleStatUpdate = (index: number, field: string, value: any) => {
    const updatedStats = [
      ...(localContent.flexibilityStats || flexibilityStats),
    ];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleUpdate("flexibilityStats", updatedStats);
  };

  // ===================================================================
  // LIVE VIEW – Modern Agility & Adaptability Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}
      >
        {/* Morphing geometric shapes background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              borderRadius: ["50%", "0%", "25%", "50%"],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-red-200 opacity-20"
          />
          <motion.div
            animate={{
              borderRadius: ["0%", "50%", "25%", "0%"],
              rotate: [360, 270, 180, 90, 0],
              scale: [0.8, 1, 1.2, 0.8],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
            className="absolute bottom-20 right-20 w-24 h-24 bg-rose-300 opacity-25"
          />
          <motion.div
            animate={{
              borderRadius: ["25%", "0%", "50%", "25%"],
              x: [0, 50, -50, 0],
              y: [0, -30, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10,
            }}
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-red-300 opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
          </div>

          {/* Core Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {(localContent.capabilities || capabilities).map(
              (capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                >
                  {/* Morphing background shape */}
                  <motion.div
                    animate={{
                      borderRadius: ["0%", "50%", "25%", "0%"],
                      rotate: [0, 90, 180, 270],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 2,
                    }}
                    className="absolute top-4 right-4 w-16 h-16 bg-red-100 opacity-50"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                        className="text-4xl mr-4"
                      >
                        {capability.icon}
                      </motion.span>
                      <h4 className="text-2xl font-bold text-gray-800">
                        {capability.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 mb-3">
                      {capability.description}
                    </p>
                    <p className="text-sm italic text-red-600">
                      {capability.adaptability}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* Methodologies & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Methodologies */}
            <div className="space-y-6">
              <h4 className={`text-2xl font-bold ${textColor} text-center mb-6`}>
                Our Methodologies
              </h4>
              {(localContent.methodologies || methodologies).map(
                (methodology, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h5 className="text-xl font-semibold text-red-600 mb-2">
                      {methodology.name}
                    </h5>
                    <p className="text-gray-600 mb-3">
                      {methodology.description}
                    </p>
                    <div className="space-y-1">
                      {methodology.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center text-sm text-black"
                        >
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Flexibility Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
                Flexibility Metrics
              </h4>
              <div className="grid grid-cols-2 gap-6">
                {(localContent.flexibilityStats || flexibilityStats).map(
                  (stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
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
                            className="text-3xl text-center w-full bg-transparent border-b border-red-300 focus:border-red-500 outline-none"
                          />
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e: any) =>
                              handleStatUpdate(index, "value", e.target.value)
                            }
                            className="text-3xl font-bold text-red-600 text-center w-full bg-transparent border-b border-red-300 focus:border-red-500 outline-none"
                          />
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e: any) =>
                              handleStatUpdate(index, "label", e.target.value)
                            }
                            className="text-sm text-center w-full bg-transparent border-b border-red-300 focus:border-red-500 outline-none"
                          />
                        </div>
                      ) : (
                        <>
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                            className="text-4xl mb-2"
                          >
                            {stat.icon}
                          </motion.div>
                          <div className="text-3xl font-bold text-red-600 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600">
                            {stat.label}
                          </div>
                        </>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agility & Adaptability Editor</h1>
          <p className="text-gray-600">Customize your agility and adaptability showcase with dynamic red-rose styling</p>
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500 text-white">
                <h1 className="text-2xl font-bold">Agility & Adaptability</h1>
                <p className="text-red-100 mt-1">Flexible solutions showcase</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(localContent.capabilities || capabilities).slice(0, 2).map((capability: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{capability.icon}</span>
                          <h5 className="font-medium text-gray-900">{capability.title}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{capability.description}</p>
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
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
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

            {/* Capabilities */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-rose-500 rounded-full mr-3"></span>
                  Capabilities ({(localContent.capabilities || capabilities).length})
                </h2>
                <button
                  onClick={() => {
                    const newCapability = {
                      title: "New Capability",
                      description: "Describe this capability...",
                      icon: "⚡",
                      adaptability: "Adaptability description",
                    };
                    handleUpdate("capabilities", [...(localContent.capabilities || capabilities), newCapability]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-medium shadow-lg"
                >
                  + Add Capability
                </button>
              </div>

              <AnimatePresence>
                {(localContent.capabilities || capabilities).map((capability: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        Capability {i + 1}: {capability.title}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedCapabilities = (localContent.capabilities || capabilities).filter((_: any, index: number) => index !== i);
                          handleUpdate("capabilities", updatedCapabilities);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={capability.title}
                        onChange={(v) => handleCapabilityUpdate(i, "title", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={capability.icon}
                        onChange={(v) => handleCapabilityUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={capability.description}
                          onChange={(v) => handleCapabilityUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Adaptability"
                          value={capability.adaptability}
                          onChange={(v) => handleCapabilityUpdate(i, "adaptability", v)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Methodologies */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-red-400 rounded-full mr-3"></span>
                  Methodologies ({(localContent.methodologies || methodologies).length})
                </h2>
                <button
                  onClick={() => {
                    const newMethodology = {
                      name: "New Methodology",
                      description: "Describe this methodology...",
                      benefits: ["Benefit 1", "Benefit 2"],
                    };
                    handleUpdate("methodologies", [...(localContent.methodologies || methodologies), newMethodology]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-medium shadow-lg"
                >
                  + Add Methodology
                </button>
              </div>

              <AnimatePresence>
                {(localContent.methodologies || methodologies).map((methodology: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-rose-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                        Methodology {i + 1}: {methodology.name}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedMethodologies = (localContent.methodologies || methodologies).filter((_: any, index: number) => index !== i);
                          handleUpdate("methodologies", updatedMethodologies);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label={`Name-${i}`}
                        value={methodology.name}
                        onChange={(v) => handleMethodologyUpdate(i, "name", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={methodology.description}
                          onChange={(v) => handleMethodologyUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Key Benefits</label>
                      <div className="space-y-2">
                        {methodology.benefits.map((benefit: string, benefitIndex: number) => (
                          <div key={benefitIndex} className="flex gap-3">
                            <input
                              key={`benefit-${i}-${benefitIndex}`}
                              type="text"
                              value={benefit}
                              onChange={(e: any) => {
                                const updatedBenefits = [...methodology.benefits];
                                updatedBenefits[benefitIndex] = e.target.value;
                                handleMethodologyUpdate(i, "benefits", updatedBenefits);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                              placeholder="Enter benefit..."
                            />
                            <button
                              onClick={() => {
                                const updatedBenefits = methodology.benefits.filter(
                                  (_: string, fi: number) => fi !== benefitIndex
                                );
                                handleMethodologyUpdate(i, "benefits", updatedBenefits);
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleMethodologyUpdate(i, "benefits", [...methodology.benefits, "New benefit"]);
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors text-sm font-medium"
                        >
                          + Add Benefit
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Flexibility Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Flexibility Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(localContent.flexibilityStats || flexibilityStats).map((stat: any, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl border border-gray-200">
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
