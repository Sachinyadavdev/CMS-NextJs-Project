"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface Practice {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  benefits: string[];
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityPracticesSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Sustainable Development Practices",
    description = "RAUS champions sustainable development through the integration of low-carbon materials, energy-efficient systems, and green building standards. Our teams focus on minimizing environmental impact through:",
    practices = [
      {
        id: "1",
        title: "Smart Resource Management",
        description: "Intelligent allocation and optimization of resources throughout the project lifecycle",
        icon: "🧠",
        color: "#dc2626",
        benefits: ["Cost reduction", "Efficiency improvement", "Resource conservation"],
      },
      {
        id: "2",
        title: "Waste Reduction & Circular Use",
        description: "Implementing circular economy principles to minimize waste and maximize material reuse",
        icon: "♻️",
        color: "#ef4444",
        benefits: ["Waste minimization", "Material recovery", "Environmental protection"],
      },
      {
        id: "3",
        title: "Energy Optimization & Renewable Integration",
        description: "Maximizing energy efficiency and integrating renewable energy sources",
        icon: "⚡",
        color: "#f87171",
        benefits: ["Energy savings", "Carbon reduction", "Cost efficiency"],
      },
      {
        id: "4",
        title: "Water Conservation & Efficient Systems",
        description: "Advanced water management solutions for conservation and efficiency",
        icon: "💧",
        color: "#fca5a5",
        benefits: ["Water savings", "Quality improvement", "Sustainability"],
      },
      {
        id: "5",
        title: "Healthy Indoor Environmental Quality",
        description: "Creating spaces that promote occupant health, comfort, and well-being",
        icon: "🏥",
        color: "#dc2626",
        benefits: ["Health improvement", "Productivity boost", "Well-being enhancement"],
      },
    ],
    backgroundColor = "#fef7ed",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    accentColor = "#dc2626",
    cardColor = "#ffffff",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handlePracticeUpdate = (index: number, patch: Partial<Practice>) => {
    const updated = practices.map((p: any, i: number) =>
      i === index ? { ...p, ...patch } : p
    );
    handleUpdate({ practices: updated });
  };

  const handleBenefitUpdate = (practiceIndex: number, benefitIndex: number, newBenefit: string) => {
    const updated = practices.map((p: any, i: number) => {
      if (i === practiceIndex) {
        const updatedBenefits = p.benefits.map((b: string, j: number) =>
          j === benefitIndex ? newBenefit : b
        );
        return { ...p, benefits: updatedBenefits };
      }
      return p;
    });
    handleUpdate({ practices: updated });
  };

  const handleAddBenefit = (practiceIndex: number) => {
    const updated = practices.map((p: any, i: number) => {
      if (i === practiceIndex) {
        return { ...p, benefits: [...p.benefits, "New benefit..."] };
      }
      return p;
    });
    handleUpdate({ practices: updated });
  };

  const handleRemoveBenefit = (practiceIndex: number, benefitIndex: number) => {
    const updated = practices.map((p: any, i: number) => {
      if (i === practiceIndex) {
        return { ...p, benefits: p.benefits.filter((_: string, j: number) => j !== benefitIndex) };
      }
      return p;
    });
    handleUpdate({ practices: updated });
  };

  const handleAddPractice = () => {
    const newPractice = {
      id: Date.now().toString(),
      title: "New Practice",
      description: "Describe this sustainable practice...",
      icon: "⭐",
      color: "#8b5cf6",
      benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
    };
    handleUpdate({ practices: [...practices, newPractice] });
  };

  const handleRemovePractice = (index: number) => {
    handleUpdate({ practices: practices.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Bullet Points with Interactive Cards
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
              className="text-4xl md:text-5xl font-bold mb-8"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            <p
              className="max-w-4xl mx-auto text-xl leading-relaxed"
              style={{ color: textColor }}
            >
              {description}
            </p>
          </motion.div>

          {/* Practices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practices.map((practice: Practice, index: number) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
                style={{ backgroundColor: cardColor }}
              >
                <div className="p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                  {/* Icon with animated background */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.2,
                      type: "spring",
                    }}
                    className="relative mb-6"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                      style={{ backgroundColor: `${practice.color}15` }}
                    >
                      {practice.icon}
                    </div>
                    {/* Animated ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      }}
                      className="absolute inset-0 rounded-2xl border-2"
                      style={{ borderColor: practice.color }}
                    />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                    className="text-xl font-bold mb-4"
                    style={{ color: titleColor }}
                  >
                    {practice.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.6 }}
                    className="text-gray-600 leading-relaxed mb-6"
                  >
                    {practice.description}
                  </motion.p>

                  {/* Benefits */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.8 }}
                    className="space-y-2"
                  >
                    {practice.benefits.map((benefit: string, benefitIndex: number) => (
                      <motion.div
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + 1 + benefitIndex * 0.1,
                        }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: practice.color }}
                        />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Hover effect overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                    style={{ borderColor: practice.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <div
              className="h-1 w-32 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
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
            {description.substring(0, 100)}...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.slice(0, 6).map((practice: any, i: number) => (
            <div
              key={practice.id}
              className="p-6 rounded-2xl border border-gray-200"
              style={{ backgroundColor: cardColor }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: `${practice.color}20` }}
              >
                {practice.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{practice.title}</h3>
              <p className="text-xs text-gray-600 mb-3">{practice.description.substring(0, 60)}...</p>
              <div className="space-y-1">
                {practice.benefits.slice(0, 2).map((benefit: string, j: number) => (
                  <div key={j} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: practice.color }}
                    />
                    <span className="text-xs text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
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
            Sustainable Practices Editor
          </h1>
          <p className="text-gray-600 mt-1">Interactive cards with bullet points and benefits</p>
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
                  label="Description"
                  value={description}
                  onChange={(v) => handleUpdate({ description: v })}
                  rows={3}
                />
              </div>
            </div>

            {/* Practices */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Sustainable Practices</h2>
                <button
                  onClick={handleAddPractice}
                  className="px-5 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition font-medium"
                >
                  + Add Practice
                </button>
              </div>

              <div className="space-y-6">
                {practices.map((practice: any, i: number) => (
                  <motion.div
                    key={practice.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Practice {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemovePractice(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={practice.icon}
                        onChange={(v) => handlePracticeUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={practice.title}
                        onChange={(v) => handlePracticeUpdate(i, { title: v })}
                      />
                      <EditableColorPicker
                        label="Color"
                        value={practice.color}
                        onChange={(v) => handlePracticeUpdate(i, { color: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={practice.description}
                        onChange={(v) => handlePracticeUpdate(i, { description: v })}
                        rows={2}
                        className="md:col-span-2"
                      />
                    </div>

                    {/* Benefits */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Benefits
                        </label>
                        <button
                          onClick={() => handleAddBenefit(i)}
                          className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                        >
                          + Add Benefit
                        </button>
                      </div>
                      <div className="space-y-2">
                        {practice.benefits.map((benefit: string, j: number) => (
                          <div key={j} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={benefit}
                              onChange={(e: any) => handleBenefitUpdate(i, j, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
                              placeholder="Enter benefit..."
                            />
                            <button
                              onClick={() => handleRemoveBenefit(i, j)}
                              className="text-red-600 hover:text-red-700 text-sm p-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
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