"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";

interface InclusiveDesignContent {
  title?: string;
  subtitle?: string;
  description?: string;
  accessibilityFeatures?: Array<{
    category: string;
    features: string[];
    icon: string;
  }>;
  userGroups?: Array<{
    group: string;
    needs: string;
    solutions: string[];
    icon: string;
  }>;
  complianceStats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type InclusiveDesignSection = BaseSection<InclusiveDesignContent>;

interface Props {
  section: InclusiveDesignSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InclusiveDesignSection>) => void;
}

export default function EditableInclusiveDesignSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Inclusive and Accessible Design",
    subtitle = "Design for Everyone",
    description = "RAUS champions environments that welcome diverse users, respect cultural identity, and provide equitable access so communities can thrive together.",
    accessibilityFeatures = [
      {
        category: "Physical Accessibility",
        features: [
          "Wheelchair accessible pathways",
          "Tactile paving",
          "Accessible restroom facilities",
          "Elevator access",
        ],
        icon: "♿",
      },
      {
        category: "Sensory Accessibility",
        features: [
          "Visual wayfinding",
          "Auditory signals",
          "Quiet spaces",
          "Adjustable lighting",
        ],
        icon: "👁️",
      },
      {
        category: "Cognitive Accessibility",
        features: [
          "Clear signage",
          "Simple navigation",
          "Multilingual information",
          "Predictable layouts",
        ],
        icon: "🧠",
      },
    ],
    userGroups = [
      {
        group: "People with Disabilities",
        needs: "Barrier-free access and accommodations",
        solutions: [
          "Universal design principles",
          "Assistive technology integration",
          "Accessible transportation",
        ],
        icon: "♿",
      },
      {
        group: "Elderly Community",
        needs: "Age-friendly environments",
        solutions: [
          "Low-maintenance spaces",
          "Comfortable seating",
          "Easy-to-use facilities",
        ],
        icon: "👴",
      },
      {
        group: "Families with Children",
        needs: "Child-friendly and safe spaces",
        solutions: ["Play areas", "Safety features", "Family amenities"],
        icon: "👨‍👩‍👧‍👦",
      },
      {
        group: "Cultural Communities",
        needs: "Respect for diverse backgrounds",
        solutions: [
          "Multicultural spaces",
          "Cultural integration",
          "Inclusive programming",
        ],
        icon: "🌍",
      },
    ],
    complianceStats = [
      { value: "100%", label: "ADA Compliance" },
      { value: "95%", label: "Universal Design Score" },
      { value: "98%", label: "Accessibility Rating" },
      { value: "50+", label: "Languages Supported" },
    ],
    backgroundColor = "from-red-50 to-crimson-100",
    textColor = "text-gray-800",
    accentColor = "red",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleFeatureUpdate = (
    index: number,
    field: "features" | string,
    value: any
  ) => {
    const updated = [...accessibilityFeatures];
    if (field === "features") {
      updated[index] = { ...updated[index], features: value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    handleUpdate({ accessibilityFeatures: updated });
  };

  const handleGroupUpdate = (
    index: number,
    field: "solutions" | string,
    value: any
  ) => {
    const updated = [...userGroups];
    if (field === "solutions") {
      updated[index] = { ...updated[index], solutions: value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    handleUpdate({ userGroups: updated });
  };

  const handleStatUpdate = (
    index: number,
    patch: Partial<(typeof complianceStats)[0]>
  ) => {
    const updated = [...complianceStats];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ complianceStats: updated });
  };

  // ===================================================================
  // LIVE VIEW
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern
                id="inclusive-pattern"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="5" cy="5" r="2" fill="#DC2626" />
                <circle cx="15" cy="15" r="2" fill="#EF4444" />
                <rect x="8" y="8" width="4" height="4" fill="#F87171" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#inclusive-pattern)" />
          </svg>
        </div>

        <div className="absolute inset-0">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-20 text-4xl opacity-20"
          >
            ♿
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 left-20 text-3xl opacity-25"
          >
            👁️
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -360] }}
            transition={{ duration: 10, repeat: Infinity, delay: 4 }}
            className="absolute top-1/2 left-1/4 text-2xl opacity-15"
          >
            🧠
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}
            >
              {title}
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl font-semibold text-${accentColor}-600 mb-6`}
            >
              {subtitle}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className={`text-lg ${textColor} max-w-3xl mx-auto leading-relaxed`}
            >
              {description}
            </motion.p>
          </div>

          {/* Accessibility Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {accessibilityFeatures.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl mr-3">{f.icon}</span>
                  <h4 className="text-xl font-semibold text-gray-800">
                    {f.category}
                  </h4>
                </div>
                <div className="space-y-2">
                  {f.features.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-red-700"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* User Groups */}
          <div className="mb-16">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Designing for Diverse Communities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userGroups.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-5xl mr-4">{g.icon}</span>
                    <div>
                      <h5 className="text-2xl font-bold text-gray-800">
                        {g.group}
                      </h5>
                      <p className="text-red-600 italic">{g.needs}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {g.solutions.map((sol, si) => (
                      <div key={si} className="flex items-start text-sm">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-gray-600">{sol}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compliance Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Accessibility Excellence
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {complianceStats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-600">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITING MODE – Perfectly Consistent
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-crimson-600 text-white">
        <h1 className="text-2xl font-bold">Inclusive & Accessible Design</h1>
        <p className="text-red-100 mt-1">Design for Every Person</p>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        <div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
          <p className="text-sm text-red-600">{subtitle}</p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="grid grid-cols-3 gap-3">
          {accessibilityFeatures.map((f, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl">{f.icon}</div>
              <p className="text-xs font-medium mt-1">{f.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Input = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inclusive Design Editor
          </h1>
          <p className="text-gray-600">
            Create spaces that truly welcome everyone
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Live Preview */}
          <div className="sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Live Preview
            </h2>
            <Preview />
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Section Header
              </h2>
              <div className="space-y-5">
                <Input
                  label="Title"
                  value={title}
                  onChange={(v) => handleUpdate({ title: v })}
                />
                <Input
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate({ subtitle: v })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e: any) =>
                      handleUpdate({ description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-rose-500 rounded-full mr-3"></span>
                Accessibility Features
              </h2>
              <div className="space-y-6">
                {accessibilityFeatures.map((f, i) => (
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Icon"
                        value={f.icon}
                        onChange={(v) => handleFeatureUpdate(i, "icon", v)}
                      />
                      <Input
                        label="Category"
                        value={f.category}
                        onChange={(v) => handleFeatureUpdate(i, "category", v)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={f.features.join("\n")}
                        onChange={(e: any) =>
                          handleFeatureUpdate(
                            i,
                            "features",
                            e.target.value.split("\n").filter(Boolean)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none font-mono text-sm"
                        placeholder="Wheelchair accessible pathways&#10;Tactile paving&#10;..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Groups */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                Diverse User Groups
              </h2>
              <div className="space-y-6">
                {userGroups.map((g, i) => (
                  <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Icon"
                        value={g.icon}
                        onChange={(v) => handleGroupUpdate(i, "icon", v)}
                      />
                      <Input
                        label="Group Name"
                        value={g.group}
                        onChange={(v) => handleGroupUpdate(i, "group", v)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Needs
                      </label>
                      <textarea
                        rows={2}
                        value={g.needs}
                        onChange={(e: any) =>
                          handleGroupUpdate(i, "needs", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Solutions (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={g.solutions.join("\n")}
                        onChange={(e: any) =>
                          handleGroupUpdate(
                            i,
                            "solutions",
                            e.target.value.split("\n").filter(Boolean)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none font-mono text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                Compliance Stats
              </h2>
              <div className="space-y-4">
                {complianceStats.map((s, i) => (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <Input
                      label="Value"
                      value={s.value}
                      onChange={(v) => handleStatUpdate(i, { value: v })}
                    />
                    <Input
                      label="Label"
                      value={s.label}
                      onChange={(v) => handleStatUpdate(i, { label: v })}
                    />
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
