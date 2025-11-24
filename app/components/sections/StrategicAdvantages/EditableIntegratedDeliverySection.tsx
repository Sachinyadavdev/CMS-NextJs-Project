import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface IntegratedDeliveryContent {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  processSteps?: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type IntegratedDeliverySection = BaseSection<IntegratedDeliveryContent>;

interface Props {
  section: IntegratedDeliverySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<IntegratedDeliverySection>) => void;
}

export default function EditableIntegratedDeliverySection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Integrated Delivery Model",
    subtitle = "Unified Framework for Excellence",
    description = "Architecture, engineering, construction, digital systems, and delivery oversight are unified under one framework, eliminating fragmentation and enabling cohesive project outcomes.",
    features = [
      {
        title: "Unified Framework",
        description: "Single integrated operating model",
        icon: "🔗"
      },
      {
        title: "Cohesive Outcomes",
        description: "Eliminated fragmentation in delivery",
        icon: "🎯"
      },
      {
        title: "End-to-End Oversight",
        description: "Complete project lifecycle management",
        icon: "👁️"
      }
    ],
    processSteps = [
      {
        step: "01",
        title: "Planning & Design",
        description: "Integrated architectural and engineering planning"
      },
      {
        step: "02",
        title: "Construction",
        description: "Unified construction management"
      },
      {
        step: "03",
        title: "Digital Systems",
        description: "Integrated technology implementation"
      },
      {
        step: "04",
        title: "Delivery Oversight",
        description: "Complete project delivery management"
      }
    ],
    backgroundColor = "from-blue-50 to-indigo-100",
    textColor = "text-gray-800",
    accentColor = "blue"
  } = content;

  const [localContent, setLocalContent] = useState(content);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...localContent, [field]: value };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const handleFeatureUpdate = (index: number, field: string, value: any) => {
    const updatedFeatures = [...(localContent.features || features)];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    handleUpdate('features', updatedFeatures);
  };

  const handleStepUpdate = (index: number, field: string, value: any) => {
    const updatedSteps = [...(localContent.processSteps || processSteps)];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    handleUpdate('processSteps', updatedSteps);
  };

  // ===================================================================
  // LIVE VIEW – Modern Integrated Delivery Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-indigo-300 rounded-full opacity-30"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={localContent.title || title}
                onChange={(e: any) => handleUpdate('title', e.target.value)}
                className="text-4xl font-bold text-center w-full bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none"
                placeholder="Section Title"
              />
              <input
                type="text"
                value={localContent.subtitle || subtitle}
                onChange={(e: any) => handleUpdate('subtitle', e.target.value)}
                className="text-xl text-center w-full bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none"
                placeholder="Section Subtitle"
              />
              <textarea
                value={localContent.description || description}
                onChange={(e: any) => handleUpdate('description', e.target.value)}
                className="text-lg text-center w-full bg-transparent border-2 border-blue-300 focus:border-blue-500 outline-none rounded p-2 min-h-[100px]"
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

        {/* Process Flow Visualization */}
        <div className="mb-16">
          <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>Our Integrated Process</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(localContent.processSteps || processSteps).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection line */}
                {index < (localContent.processSteps || processSteps).length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-blue-300 transform -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={step.step}
                        onChange={(e: any) => handleStepUpdate(index, 'step', e.target.value)}
                        className="text-2xl font-bold text-blue-600 bg-transparent border-b border-blue-300 focus:border-blue-500 outline-none text-center w-full"
                      />
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e: any) => handleStepUpdate(index, 'title', e.target.value)}
                        className="text-lg font-semibold bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none text-center w-full"
                      />
                      <textarea
                        value={step.description}
                        onChange={(e: any) => handleStepUpdate(index, 'description', e.target.value)}
                        className="text-sm bg-transparent border border-gray-300 focus:border-gray-500 outline-none rounded p-2 w-full min-h-[60px]"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-blue-600 mb-2">{step.step}</div>
                      <h5 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h5>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(localContent.features || features).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e: any) => handleFeatureUpdate(index, 'icon', e.target.value)}
                    className="text-3xl text-center w-full bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none"
                  />
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e: any) => handleFeatureUpdate(index, 'title', e.target.value)}
                    className="text-xl font-semibold text-center w-full bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e: any) => handleFeatureUpdate(index, 'description', e.target.value)}
                    className="text-sm text-center w-full bg-transparent border border-gray-300 focus:border-gray-500 outline-none rounded p-2 min-h-[60px]"
                  />
                </div>
              ) : (
                <>
                  <div className="text-4xl mb-4 text-center">{feature.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    );
  }

  // ===================================================================
  // EDITING MODE
  // ===================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrated Delivery Editor</h1>
          <p className="text-gray-600">Customize your integrated delivery showcase with dynamic pink-rose styling</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <h1 className="text-2xl font-bold">Integrated Delivery</h1>
                <p className="text-pink-100 mt-1">Unified framework showcase</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(localContent.features || features).slice(0, 2).map((feature: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{feature.icon}</span>
                          <h5 className="font-medium text-gray-900">{feature.title}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{feature.description}</p>
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
                <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
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

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-rose-500 rounded-full mr-3"></span>
                  Features ({(localContent.features || features).length})
                </h2>
                <button
                  onClick={() => {
                    const newFeature = {
                      title: "New Feature",
                      description: "Describe this feature...",
                      icon: "✨",
                    };
                    handleUpdate("features", [...(localContent.features || features), newFeature]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-medium shadow-lg"
                >
                  + Add Feature
                </button>
              </div>

              <AnimatePresence>
                {(localContent.features || features).map((feature: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-pink-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                        Feature {i + 1}: {feature.title}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedFeatures = (localContent.features || features).filter((_: any, index: number) => index !== i);
                          handleUpdate("features", updatedFeatures);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={feature.title}
                        onChange={(v) => handleFeatureUpdate(i, "title", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={feature.icon}
                        onChange={(v) => handleFeatureUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={feature.description}
                          onChange={(v) => handleFeatureUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Process Steps */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  Process Steps ({(localContent.processSteps || processSteps).length})
                </h2>
                <button
                  onClick={() => {
                    const newStep = {
                      step: "New Step",
                      title: "Step Title",
                      description: "Describe this step...",
                    };
                    handleUpdate("processSteps", [...(localContent.processSteps || processSteps), newStep]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-medium shadow-lg"
                >
                  + Add Step
                </button>
              </div>

              <AnimatePresence>
                {(localContent.processSteps || processSteps).map((step: any, i: number) => (
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
                        Step {i + 1}: {step.title}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedSteps = (localContent.processSteps || processSteps).filter((_: any, index: number) => index !== i);
                          handleUpdate("processSteps", updatedSteps);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Step Number"
                        value={step.step}
                        onChange={(v) => handleStepUpdate(i, "step", v)}
                      />
                      <EditableText
                        label="Title"
                        value={step.title}
                        onChange={(v) => handleStepUpdate(i, "title", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={step.description}
                          onChange={(v) => handleStepUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}