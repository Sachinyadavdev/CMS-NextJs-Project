"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface Commitment {
  id: string;
  quote: string;
  author: string;
  role: string;
  icon: string;
  color: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityCommitmentSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Our Commitment",
    description1 = "Sustainability is our pledge to build responsibly, act consciously, and leave a positive legacy. By integrating environmental intelligence with innovative technologies and human-centered design, RAUS delivers solutions that support climate resilience, ecological balance, and long-term community prosperity.",
    description2 = "We believe that shaping tomorrow begins with the actions we take today—and we remain committed to creating places where people thrive, ecosystems flourish, and future generations are protected.",
    commitments = [
      {
        id: "1",
        quote: "Building responsibly means creating spaces that not only serve today's needs but protect tomorrow's possibilities.",
        author: "RAUS Leadership",
        role: "Environmental Stewardship",
        icon: "🌱",
        color: "#10b981",
      },
      {
        id: "2",
        quote: "Every project is an opportunity to advance sustainability and create lasting positive impact on our communities.",
        author: "RAUS Team",
        role: "Sustainable Development",
        icon: "♻️",
        color: "#3b82f6",
      },
      {
        id: "3",
        quote: "Innovation and environmental responsibility go hand in hand in shaping the future of our built environment.",
        author: "RAUS Vision",
        role: "Climate Action",
        icon: "🌍",
        color: "#f59e0b",
      },
    ],
    backgroundColor = "#f8fafc",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    accentColor = "#059669",
    quoteColor = "#374151",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleCommitmentUpdate = (index: number, patch: Partial<Commitment>) => {
    const updated = commitments.map((c: any, i: number) =>
      i === index ? { ...c, ...patch } : c
    );
    handleUpdate({ commitments: updated });
  };

  const handleAddCommitment = () => {
    const newCommitment = {
      id: Date.now().toString(),
      quote: "New commitment quote...",
      author: "RAUS",
      role: "New Role",
      icon: "⭐",
      color: "#10b981",
    };
    handleUpdate({ commitments: [...commitments, newCommitment] });
  };

  const handleRemoveCommitment = (index: number) => {
    handleUpdate({ commitments: commitments.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Testimonial-Style Commitment Cards
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

          {/* Commitment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {commitments.map((commitment: Commitment, index: number) => (
              <motion.div
                key={commitment.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-full relative overflow-hidden">
                  {/* Decorative quote mark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                    }}
                    className="absolute top-6 right-6 text-6xl opacity-10"
                    style={{ color: commitment.color }}
                  >
                    "
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.2 + 0.2,
                      type: "spring",
                    }}
                    className="text-4xl mb-6"
                  >
                    {commitment.icon}
                  </motion.div>

                  {/* Quote */}
                  <motion.blockquote
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                    className="text-lg leading-relaxed mb-6 italic font-medium"
                    style={{ color: quoteColor }}
                  >
                    "{commitment.quote}"
                  </motion.blockquote>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    className="border-t border-gray-100 pt-4"
                  >
                    <div className="font-semibold" style={{ color: titleColor }}>
                      {commitment.author}
                    </div>
                    <div className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                      {commitment.role}
                    </div>
                  </motion.div>

                  {/* Color accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                    className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                    style={{ backgroundColor: commitment.color }}
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2 + 1,
                    type: "spring",
                  }}
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: commitment.color }}
                >
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-6 bg-white rounded-2xl shadow-xl border border-gray-100">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                🌱
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-2" style={{ color: titleColor }}>
                  Join Our Mission
                </h3>
                <p className="text-sm" style={{ color: textColor, opacity: 0.8 }}>
                  Partner with us to create sustainable solutions for a better tomorrow
                </p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl"
              >
                🤝
              </motion.div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {commitments.slice(0, 3).map((commitment: any, i: number) => (
            <div
              key={commitment.id}
              className="bg-white rounded-2xl shadow border border-gray-200 p-6 relative"
            >
              <div className="absolute top-4 right-4 text-4xl opacity-20">"</div>
              <div className="text-3xl mb-4">{commitment.icon}</div>
              <blockquote className="text-sm italic mb-4" style={{ color: quoteColor }}>
                "{commitment.quote.substring(0, 60)}..."
              </blockquote>
              <div className="border-t border-gray-100 pt-3">
                <div className="font-semibold text-sm" style={{ color: titleColor }}>
                  {commitment.author}
                </div>
                <div className="text-xs" style={{ color: textColor, opacity: 0.7 }}>
                  {commitment.role}
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: commitment.color }}
              />
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
            Commitment Section Editor
          </h1>
          <p className="text-gray-600 mt-1">Testimonial-style commitment cards with quotes</p>
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

            {/* Commitments */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Commitment Statements</h2>
                <button
                  onClick={handleAddCommitment}
                  className="px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium"
                >
                  + Add Commitment
                </button>
              </div>

              <div className="space-y-6">
                {commitments.map((commitment: any, i: number) => (
                  <motion.div
                    key={commitment.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Commitment {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveCommitment(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={commitment.icon}
                        onChange={(v) => handleCommitmentUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Author"
                        value={commitment.author}
                        onChange={(v) => handleCommitmentUpdate(i, { author: v })}
                      />
                      <EditableText
                        label="Role"
                        value={commitment.role}
                        onChange={(v) => handleCommitmentUpdate(i, { role: v })}
                      />
                      <EditableColorPicker
                        label="Color"
                        value={commitment.color}
                        onChange={(v) => handleCommitmentUpdate(i, { color: v })}
                      />
                      <EditableTextarea
                        label="Quote"
                        value={commitment.quote}
                        onChange={(v) => handleCommitmentUpdate(i, { quote: v })}
                        rows={3}
                        className="md:col-span-2"
                      />
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
                <EditableColorPicker
                  label="Quote Color"
                  value={quoteColor}
                  onChange={(v) => handleUpdate({ quoteColor: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}