"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";

interface CorporateResponsibilityContent {
  title?: string;
  subtitle?: string;
  description?: string;
  pillars?: Array<{
    title: string;
    description: string;
    icon: string;
    impact: string;
  }>;
  initiatives?: Array<{
    name: string;
    description: string;
    beneficiaries: string;
    metrics: string;
  }>;
  commitmentStats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type CorporateResponsibilitySection =
  BaseSection<CorporateResponsibilityContent>;

interface Props {
  section: CorporateResponsibilitySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<CorporateResponsibilitySection>) => void;
}

export default function EditableCorporateResponsibilitySection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Corporate Social Responsibility in Action",
    subtitle = "Business Success with Social Impact",
    description = "Ethical operations, responsible material choices, and socially aligned decision-making ensure that business success translates into measurable community benefit.",
    pillars = [
      {
        title: "Ethical Operations",
        description: "Conducting business with integrity and transparency",
        icon: "⚖️",
        impact: "Building trust and accountability",
      },
      {
        title: "Responsible Materials",
        description: "Choosing sustainable and ethical sourcing",
        icon: "🌱",
        impact: "Supporting fair labor practices",
      },
      {
        title: "Social Decision-Making",
        description: "Considering community impact in all choices",
        icon: "🤝",
        impact: "Creating shared value for all stakeholders",
      },
    ],
    initiatives = [
      {
        name: "Local Employment Programs",
        description: "Prioritizing local workforce development",
        beneficiaries: "Community members seeking employment",
        metrics: "500+ jobs created annually",
      },
      {
        name: "Supplier Diversity",
        description: "Supporting minority-owned businesses",
        beneficiaries: "Local entrepreneurs and businesses",
        metrics: "40% diverse supplier partnerships",
      },
      {
        name: "Education Partnerships",
        description: "Investing in STEM education programs",
        beneficiaries: "Students and educational institutions",
        metrics: "10,000+ students impacted yearly",
      },
    ],
    commitmentStats = [
      { value: "30%", label: "Revenue to Social Programs", icon: "💰" },
      { value: "25,000", label: "Community Members Served", icon: "👥" },
      { value: "15", label: "Active CSR Programs", icon: "🎯" },
      { value: "95%", label: "Stakeholder Satisfaction", icon: "⭐" },
    ],
    backgroundColor = "from-red-100 to-rose-200",
    textColor = "text-gray-800",
    accentColor = "red",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePillarUpdate = (
    index: number,
    patch: Partial<(typeof pillars)[0]>
  ) => {
    const updated = [...pillars];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ pillars: updated });
  };

  const handleInitiativeUpdate = (
    index: number,
    patch: Partial<(typeof initiatives)[0]>
  ) => {
    const updated = [...initiatives];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ initiatives: updated });
  };

  const handleStatUpdate = (
    index: number,
    patch: Partial<(typeof commitmentStats)[0]>
  ) => {
    const updated = [...commitmentStats];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ commitmentStats: updated });
  };

  // ===================================================================
  // LIVE VIEW
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}
      >
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-red-300 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/3 right-1/3 w-48 h-48 border-4 border-rose-400 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0, 0.1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/4 left-1/3 w-32 h-32 border-4 border-red-400 rounded-full"
          />
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

          {/* CSR Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(220,38,38,0.3)",
                      "0 0 40px rgba(220,38,38,0.6)",
                      "0 0 20px rgba(220,38,38,0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute inset-0 rounded-xl"
                />
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className="text-5xl mb-4"
                  >
                    {pillar.icon}
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-gray-600 mb-2">{pillar.description}</p>
                  <p className="text-sm italic text-red-600">{pillar.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Initiatives */}
          <div className="mb-16">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Key Initiatives
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {initiatives.map((init, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <h5 className="text-xl font-bold text-gray-800 mb-3">
                    {init.name}
                  </h5>
                  <p className="text-gray-600 mb-4">{init.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-red-700">
                        Beneficiaries:
                      </span>{" "}
                      <span>{init.beneficiaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-red-700">Impact:</span>{" "}
                      <span>{init.metrics}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Commitment Stats */}
          <div className="bg-white rounded-2xl shadow-xl p p-8">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Our Commitment in Numbers
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {commitmentStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                    className="text-4xl mb-2"
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITING MODE - Clean & Consistent with Previous Sections
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500 text-white">
        <h1 className="text-2xl font-bold">Corporate Social Responsibility</h1>
        <p className="text-red-100 mt-1">Social Impact & Ethical Business</p>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        <div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
          <p className="text-sm text-red-600">{subtitle}</p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="grid grid-cols-3 gap-3">
          {pillars.map((p, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl">{p.icon}</div>
              <p className="text-xs font-medium mt-1">{p.title}</p>
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
            CSR Section Editor
          </h1>
          <p className="text-gray-600">
            Customize your corporate responsibility showcase
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
            {/* Basic Info */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* CSR Pillars */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-rose-500 rounded-full mr-3"></span>
                CSR Pillars
              </h2>
              <div className="space-y-6">
                {pillars.map((pillar, i) => (
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Icon"
                        value={pillar.icon}
                        onChange={(v) => handlePillarUpdate(i, { icon: v })}
                      />
                      <Input
                        label="Title"
                        value={pillar.title}
                        onChange={(v) => handlePillarUpdate(i, { title: v })}
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={pillar.description}
                          onChange={(e: any) =>
                            handlePillarUpdate(i, {
                              description: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                        />
                      </div>
                      <Input
                        label="Impact"
                        value={pillar.impact}
                        onChange={(v) => handlePillarUpdate(i, { impact: v })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Initiatives */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                Key Initiatives
              </h2>
              <div className="space-y-6">
                {initiatives.map((init, i) => (
                  <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                    <Input
                      label="Name"
                      value={init.name}
                      onChange={(v) => handleInitiativeUpdate(i, { name: v })}
                    />
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={init.description}
                        onChange={(e: any) =>
                          handleInitiativeUpdate(i, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input
                        label="Beneficiaries"
                        value={init.beneficiaries}
                        onChange={(v) =>
                          handleInitiativeUpdate(i, { beneficiaries: v })
                        }
                      />
                      <Input
                        label="Metrics"
                        value={init.metrics}
                        onChange={(v) =>
                          handleInitiativeUpdate(i, { metrics: v })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                Commitment Stats
              </h2>
              <div className="space-y-4">
                {commitmentStats.map((stat, i) => (
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                    <Input
                      label="Icon"
                      value={stat.icon}
                      onChange={(v) => handleStatUpdate(i, { icon: v })}
                    />
                    <Input
                      label="Value"
                      value={stat.value}
                      onChange={(v) => handleStatUpdate(i, { value: v })}
                    />
                    <Input
                      label="Label"
                      value={stat.label}
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
