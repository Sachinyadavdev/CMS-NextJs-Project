"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";

interface HumanCenteredContent {
  title?: string;
  subtitle?: string;
  description?: string;
  designPrinciples?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  spaceTypes?: Array<{
    type: string;
    description: string;
    features: string[];
    icon: string;
  }>;
  impactMetrics?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type HumanCenteredSection = BaseSection<HumanCenteredContent>;

interface Props {
  section: HumanCenteredSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HumanCenteredSection>) => void;
}

export default function EditableHumanCenteredSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Human-Centered Development",
    subtitle = "Spaces Designed for People",
    description = "Spaces are created not only to perform well but to foster belonging, interaction and pride—whether corporate environments, public domains, or mixed-use developments.",
    designPrinciples = [
      {
        title: "Belonging",
        description: "Creating spaces where people feel they belong",
        icon: "🏠",
      },
      {
        title: "Interaction",
        description: "Encouraging meaningful human connections",
        icon: "🤝",
      },
      {
        title: "Pride",
        description: "Fostering community pride and ownership",
        icon: "⭐",
      },
    ],
    spaceTypes = [
      {
        type: "Corporate Environments",
        description: "Workspaces that inspire and connect",
        features: ["Collaborative areas", "Wellness spaces", "Community hubs"],
        icon: "🏢",
      },
      {
        type: "Public Domains",
        description: "Shared spaces for community gathering",
        features: [
          "Accessible design",
          "Inclusive amenities",
          "Cultural integration",
        ],
        icon: "🌆",
      },
      {
        type: "Mixed-Use Developments",
        description: "Integrated living and working spaces",
        features: [
          "Balanced communities",
          "Walkable design",
          "Social connectivity",
        ],
        icon: "🏘️",
      },
    ],
    impactMetrics = [
      { value: "85%", label: "User Satisfaction" },
      { value: "70%", label: "Community Engagement" },
      { value: "90%", label: "Space Utilization" },
      { value: "95%", label: "Accessibility Score" },
    ],
    backgroundColor = "from-red-50 to-rose-100",
    textColor = "text-gray-800",
    accentColor = "red",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePrincipleUpdate = (
    index: number,
    patch: Partial<(typeof designPrinciples)[0]>
  ) => {
    const updated = [...designPrinciples];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ designPrinciples: updated });
  };

  const handleSpaceUpdate = (
    index: number,
    field: keyof (typeof spaceTypes)[0],
    value: any
  ) => {
    const updated = [...spaceTypes];
    if (field === "features") {
      updated[index] = { ...updated[index], features: value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    handleUpdate({ spaceTypes: updated });
  };

  const handleMetricUpdate = (
    index: number,
    patch: Partial<(typeof impactMetrics)[0]>
  ) => {
    const updated = [...impactMetrics];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ impactMetrics: updated });
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
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-20 left-20 w-32 h-32 bg-red-200 rounded-full"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 right-20 w-24 h-24 bg-rose-300 rounded-full"
          />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 1000"
          >
            <motion.path
              d="M200,300 Q400,200 600,300 Q800,400 600,500 Q400,600 200,500"
              stroke="#DC2626"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            {[
              [200, 300],
              [600, 300],
              [600, 500],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r="6"
                fill="#DC2626"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
          </svg>
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

          {/* Design Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {designPrinciples.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="text-5xl mb-4"
                >
                  {p.icon}
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {p.title}
                </h4>
                <p className="text-gray-600">{p.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Space Types */}
          <div className="mb-16">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Types of Spaces We Create
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spaceTypes.map((space, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{space.icon}</span>
                    <h5 className="text-2xl font-bold text-gray-800">
                      {space.type}
                    </h5>
                  </div>
                  <p className="text-gray-600 mb-4">{space.description}</p>
                  <div className="space-y-2">
                    {space.features.map((f, fi) => (
                      <div
                        key={fi}
                        className="flex items-center text-sm text-red-700"
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                        {f}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Community Impact
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactMetrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {m.value}
                  </div>
                  <div className="text-sm text-gray-600">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITING MODE - Same Style as All Other Sections
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500 text-white">
        <h1 className="text-2xl font-bold">Human-Centered Development</h1>
        <p className="text-red-100 mt-1">People-First Design Philosophy</p>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        <div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
          <p className="text-sm text-red-600">{subtitle}</p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="grid grid-cols-3 gap-4">
          {designPrinciples.map((p, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl">{p.icon}</div>
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
            Human-Centered Design Editor
          </h1>
          <p className="text-gray-600">Craft spaces that put people first</p>
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

            {/* Design Principles */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-rose-500 rounded-full mr-3"></span>
                Design Principles
              </h2>
              <div className="space-y-6">
                {designPrinciples.map((p, i) => (
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Icon"
                        value={p.icon}
                        onChange={(v) => handlePrincipleUpdate(i, { icon: v })}
                      />
                      <Input
                        label="Title"
                        value={p.title}
                        onChange={(v) => handlePrincipleUpdate(i, { title: v })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={p.description}
                        onChange={(e: any) =>
                          handlePrincipleUpdate(i, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Types */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                Space Types
              </h2>
              <div className="space-y-6">
                {spaceTypes.map((space, i) => (
                  <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Icon"
                        value={space.icon}
                        onChange={(v) => handleSpaceUpdate(i, "icon", v)}
                      />
                      <Input
                        label="Type"
                        value={space.type}
                        onChange={(v) => handleSpaceUpdate(i, "type", v)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={space.description}
                        onChange={(e: any) =>
                          handleSpaceUpdate(i, "description", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={space.features.join("\n")}
                        onChange={(e: any) =>
                          handleSpaceUpdate(
                            i,
                            "features",
                            e.target.value.split("\n").filter(Boolean)
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none font-mono text-sm"
                        placeholder="Collaborative areas&#10;Wellness spaces&#10;Community hubs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                Impact Metrics
              </h2>
              <div className="space-y-4">
                {impactMetrics.map((m, i) => (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <Input
                      label="Value"
                      value={m.value}
                      onChange={(v) => handleMetricUpdate(i, { value: v })}
                    />
                    <Input
                      label="Label"
                      value={m.label}
                      onChange={(v) => handleMetricUpdate(i, { label: v })}
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
