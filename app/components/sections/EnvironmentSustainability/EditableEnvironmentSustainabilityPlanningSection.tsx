"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  icon: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityPlanningSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Environmental Planning & Compliance",
    description1 = "RAUS provides comprehensive environmental planning aligned with regulatory frameworks and local and global sustainability standards. Our strategies reduce risk, enhance ecological performance, and strengthen project resilience from the earliest stages of design.",
    description2 = "We conduct assessments that address regulatory compliance while supporting improved biodiversity, reduced emissions, and optimized resource consumption. This ensures that every project not only meets environmental requirements but contributes meaningfully to its surrounding ecosystem.",
    checklistItems = [
      {
        id: "1",
        title: "Regulatory Compliance Assessment",
        description:
          "Comprehensive evaluation of local and international environmental regulations",
        checked: true,
        icon: "📋",
      },
      {
        id: "2",
        title: "Biodiversity Impact Analysis",
        description:
          "Assessment of project impact on local ecosystems and wildlife habitats",
        checked: true,
        icon: "🦋",
      },
      {
        id: "3",
        title: "Emission Reduction Planning",
        description:
          "Strategies to minimize carbon footprint and greenhouse gas emissions",
        checked: true,
        icon: "🌫️",
      },
      {
        id: "4",
        title: "Resource Optimization",
        description:
          "Efficient use of water, energy, and raw materials throughout project lifecycle",
        checked: true,
        icon: "💧",
      },
      {
        id: "5",
        title: "Risk Mitigation Strategies",
        description:
          "Identification and management of environmental risks and contingencies",
        checked: true,
        icon: "🛡️",
      },
      {
        id: "6",
        title: "Stakeholder Engagement",
        description:
          "Collaboration with local communities and environmental organizations",
        checked: true,
        icon: "🤝",
      },
    ],
    backgroundColor = "#f8fafc",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    checkColor = "#dc2626",
    cardColor = "#ffffff",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleItemUpdate = (index: number, patch: Partial<ChecklistItem>) => {
    const updated = checklistItems.map((item: any, i: number) =>
      i === index ? { ...item, ...patch } : item
    );
    handleUpdate({ checklistItems: updated });
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      title: "New Checklist Item",
      description: "Describe this planning aspect...",
      checked: false,
      icon: "✅",
    };
    handleUpdate({ checklistItems: [...checklistItems, newItem] });
  };

  const handleRemoveItem = (index: number) => {
    handleUpdate({
      checklistItems: checklistItems.filter((_: any, i: number) => i !== index),
    });
  };

  // ===================================================================
  // LIVE VIEW – Checklist Layout
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

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {checklistItems.map((item: ChecklistItem, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
                style={{ backgroundColor: cardColor }}
              >
                {/* Card */}
                <div className="p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                  {/* Checkmark Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                    }}
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: checkColor }}
                  >
                    <motion.div
                      animate={item.checked ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      className="text-white text-xl"
                    >
                      {item.checked ? "✓" : "○"}
                    </motion.div>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                    }}
                    className="text-4xl mb-6"
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Progress Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: item.checked ? 1 : 0.3 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.6 }}
                    className="mt-6 h-1 rounded-full bg-gray-200 origin-left"
                    style={{
                      background: item.checked
                        ? `linear-gradient(to right, ${checkColor}, ${checkColor}80)`
                        : "rgb(229 231 235)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white shadow-lg border border-gray-100">
              <div className="text-3xl">📊</div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ color: checkColor }}
                >
                  {
                    checklistItems.filter((item: ChecklistItem) => item.checked)
                      .length
                  }
                  /{checklistItems.length}
                </div>
                <div className="text-sm text-gray-600">
                  Compliance Areas Covered
                </div>
              </div>
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
          {checklistItems.slice(0, 6).map((item: any, i: number) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border border-gray-200 relative"
              style={{ backgroundColor: cardColor }}
            >
              <div
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                style={{ backgroundColor: checkColor }}
              >
                {item.checked ? "✓" : "○"}
              </div>
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600">
                {item.description.substring(0, 50)}...
              </p>
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
            Environmental Planning Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Checklist-style compliance and planning features
          </p>
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

            {/* Checklist Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Checklist Items</h2>
                <button
                  onClick={handleAddItem}
                  className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
                >
                  + Add Item
                </button>
              </div>

              <div className="space-y-6">
                {checklistItems.map((item: any, i: number) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Item {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveItem(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={item.icon}
                        onChange={(v) => handleItemUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={item.title}
                        onChange={(v) => handleItemUpdate(i, { title: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={item.description}
                        onChange={(v) => handleItemUpdate(i, { description: v })}
                        rows={2}
                        className="md:col-span-2"
                      />
                    </div>
                    <EditableCheckbox
                      label="Mark as Completed"
                      checked={item.checked}
                      onChange={(v) => handleItemUpdate(i, { checked: v })}
                    />
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
                  label="Check Color"
                  value={checkColor}
                  onChange={(v) => handleUpdate({ checkColor: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
