"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface SDG {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  focus: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilitySDGsSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Aligned With Global Sustainable Development Goals (SDGs)",
    description = "RAUS aligns with the United Nations Sustainable Development Goals, ensuring that our projects contribute to global sustainability targets. Our work advances better health and well-being (SDG 3), clean energy (SDG 7), economic growth (SDG 8), sustainable cities (SDG 11), responsible consumption (SDG 12), climate action (SDG 13), life on land (SDG 15), and strong partnerships (SDG 17). Through this alignment, we ensure that every project is part of a broader mission to create resilient, inclusive, and future-ready environments.",
    sdgs = [
      {
        id: "1",
        number: 3,
        title: "Good Health and Well-being",
        description: "Ensuring healthy lives and promoting well-being for all at all ages",
        icon: "🏥",
        color: "#ef4444",
        focus: "Health & Wellness",
      },
      {
        id: "2",
        number: 7,
        title: "Affordable and Clean Energy",
        description: "Ensuring access to affordable, reliable, sustainable and modern energy",
        icon: "⚡",
        color: "#f59e0b",
        focus: "Clean Energy",
      },
      {
        id: "3",
        number: 8,
        title: "Decent Work and Economic Growth",
        description: "Promoting sustained, inclusive and sustainable economic growth",
        icon: "💼",
        color: "#10b981",
        focus: "Economic Development",
      },
      {
        id: "4",
        number: 11,
        title: "Sustainable Cities and Communities",
        description: "Making cities and human settlements inclusive, safe, resilient and sustainable",
        icon: "🏙️",
        color: "#f97316",
        focus: "Urban Development",
      },
      {
        id: "5",
        number: 12,
        title: "Responsible Consumption and Production",
        description: "Ensuring sustainable consumption and production patterns",
        icon: "♻️",
        color: "#eab308",
        focus: "Resource Management",
      },
      {
        id: "6",
        number: 13,
        title: "Climate Action",
        description: "Taking urgent action to combat climate change and its impacts",
        icon: "🌡️",
        color: "#06b6d4",
        focus: "Climate Change",
      },
      {
        id: "7",
        number: 15,
        title: "Life on Land",
        description: "Protecting, restoring and promoting sustainable use of terrestrial ecosystems",
        icon: "🌳",
        color: "#22c55e",
        focus: "Biodiversity",
      },
      {
        id: "8",
        number: 17,
        title: "Partnerships for the Goals",
        description: "Strengthening the means of implementation and revitalizing the global partnership",
        icon: "🤝",
        color: "#3b82f6",
        focus: "Global Cooperation",
      },
    ],
    backgroundColor = "#1e3a8a",
    textColor = "#f1f5f9",
    titleColor = "#f1f5f9",
    accentColor = "#60a5fa",
    globeColor = "#dbeafe",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleSDGUpdate = (index: number, patch: Partial<SDG>) => {
    const updated = sdgs.map((sdg: any, i: number) =>
      i === index ? { ...sdg, ...patch } : sdg
    );
    handleUpdate({ sdgs: updated });
  };

  const handleAddSDG = () => {
    const newSDG = {
      id: Date.now().toString(),
      number: 1,
      title: "New SDG",
      description: "Describe this sustainable development goal...",
      icon: "🎯",
      color: "#60a5fa",
      focus: "New Focus",
    };
    handleUpdate({ sdgs: [...sdgs, newSDG] });
  };

  const handleRemoveSDG = (index: number) => {
    handleUpdate({ sdgs: sdgs.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – SDG Circles with Global Theme
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor }}>
        {/* Animated globe background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="text-[400px] select-none"
            style={{ color: globeColor }}
          >
            🌍
          </motion.div>
        </div>

        {/* Floating SDG numbers */}
        <div className="absolute inset-0 pointer-events-none">
          {sdgs.slice(0, 8).map((sdg: SDG, i: number) => (
            <motion.div
              key={sdg.id}
              className="absolute text-white opacity-20 font-bold text-6xl"
              style={{
                left: `${10 + (i % 4) * 20}%`,
                top: `${20 + Math.floor(i / 4) * 30}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            >
              {sdg.number}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-8 text-[${titleColor}]`}
            >
              {title}
            </h2>
            <p
              className={`max-w-4xl mx-auto text-xl leading-relaxed text-[${textColor}]`}
            >
              {description}
            </p>
          </motion.div>

          {/* SDG Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sdgs.map((sdg: SDG, index: number) => (
              <motion.div
                key={sdg.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                {/* SDG Circle */}
                <div className="relative">
                  {/* Outer ring */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.2,
                      type: "spring",
                    }}
                    className="w-32 h-32 rounded-full border-4 flex items-center justify-center mx-auto mb-6 relative"
                    style={{ borderColor: sdg.color }}
                  >
                    {/* Inner circle with number */}
                    <div
                      className="w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-white shadow-lg"
                      style={{ backgroundColor: sdg.color }}
                    >
                      <div className="text-2xl">{sdg.number}</div>
                    </div>

                    {/* Animated pulse ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: sdg.color }}
                    />
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1 + 0.4,
                      type: "spring",
                    }}
                    className="text-4xl text-center mb-4"
                  >
                    {sdg.icon}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                    className="text-center"
                  >
                    <h3 className={`text-lg font-bold mb-3 text-[${textColor}]`}>
                      {sdg.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 text-[${textColor}] opacity-80`}>
                      {sdg.description}
                    </p>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${sdg.color}30`,
                        color: sdg.color,
                      }}
                    >
                      {sdg.focus}
                    </div>
                  </motion.div>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${sdg.color}20 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* UN Logo and Global Impact */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-6 px-8 py-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="text-6xl">🇺🇳</div>
              <div>
                <div className="text-2xl font-bold mb-2" style={{ color: accentColor }}>
                  Global Impact
                </div>
                <div className="text-sm" style={{ color: textColor, opacity: 0.8 }}>
                  Contributing to a sustainable future for all
                </div>
              </div>
              <div className="text-6xl">🌍</div>
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
      className={`py-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden bg-[${backgroundColor}]`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold text-[${titleColor}]`}>
            {title}
          </h2>
          <p className={`mt-3 text-lg text-[${textColor}]`}>
            {description.substring(0, 100)}...
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {sdgs.slice(0, 8).map((sdg: any, i: number) => (
            <div
              key={sdg.id}
              className="text-center"
            >
              <div className="relative mb-4">
                <div
                  className="w-20 h-20 rounded-full border-4 flex items-center justify-center mx-auto"
                  style={{ borderColor: sdg.color }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.number}
                  </div>
                </div>
              </div>
              <div className="text-2xl mb-2">{sdg.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">{sdg.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{sdg.description.substring(0, 40)}...</p>
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: `${sdg.color}20`, color: sdg.color }}>
                {sdg.focus}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
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
            SDGs Alignment Editor
          </h1>
          <p className="text-gray-600 mt-1">Sustainable Development Goals with circular design</p>
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
                  rows={4}
                />
              </div>
            </div>

            {/* SDGs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Sustainable Development Goals</h2>
                <button
                  onClick={handleAddSDG}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  + Add SDG
                </button>
              </div>

              <div className="space-y-6">
                {sdgs.map((sdg: any, i: number) => (
                  <motion.div
                    key={sdg.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        SDG {sdg.number}
                      </h4>
                      <button
                        onClick={() => handleRemoveSDG(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={sdg.icon}
                        onChange={(v) => handleSDGUpdate(i, { icon: v })}
                      />
                      <EditableText
                        label="Title"
                        value={sdg.title}
                        onChange={(v) => handleSDGUpdate(i, { title: v })}
                      />
                      <EditableText
                        label="SDG Number"
                        value={sdg.number.toString()}
                        onChange={(v) => handleSDGUpdate(i, { number: parseInt(v) || 1 })}
                      />
                      <EditableText
                        label="Focus Area"
                        value={sdg.focus}
                        onChange={(v) => handleSDGUpdate(i, { focus: v })}
                      />
                      <EditableColorPicker
                        label="Color"
                        value={sdg.color}
                        onChange={(v) => handleSDGUpdate(i, { color: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={sdg.description}
                        onChange={(v) => handleSDGUpdate(i, { description: v })}
                        rows={2}
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
                  label="Globe Color"
                  value={globeColor}
                  onChange={(v) => handleUpdate({ globeColor: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}