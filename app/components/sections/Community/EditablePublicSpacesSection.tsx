"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";

interface PublicSpacesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  spaceTypes?: Array<{
    type: string;
    purpose: string;
    features: string[];
    icon: string;
    visitors: string;
  }>;
  communityBenefits?: Array<{
    benefit: string;
    description: string;
    icon: string;
  }>;
  engagementStats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type PublicSpacesSection = BaseSection<PublicSpacesContent>;

interface Props {
  section: PublicSpacesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<PublicSpacesSection>) => void;
}

export default function EditablePublicSpacesSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Public Spaces with Purpose",
    subtitle = "Where Communities Come Together",
    description = "Parks, plazas, civic areas and shared domains are planned to unite people, encourage engagement and elevate overall quality of life through thoughtful design.",
    spaceTypes = [
      {
        type: "Community Parks",
        purpose: "Natural gathering spaces for recreation and relaxation",
        features: [
          "Green spaces",
          "Walking paths",
          "Playground equipment",
          "Picnic areas",
        ],
        icon: "🌳",
        visitors: "Daily community gatherings",
      },
      {
        type: "Civic Plazas",
        purpose: "Central hubs for civic engagement and events",
        features: ["Event spaces", "Public art", "Seating areas", "Lighting"],
        icon: "🏛️",
        visitors: "Weekly community events",
      },
      {
        type: "Cultural Squares",
        purpose: "Celebrating local heritage and cultural expression",
        features: [
          "Cultural installations",
          "Performance spaces",
          "Market areas",
          "Historical markers",
        ],
        icon: "🎭",
        visitors: "Cultural festivals and celebrations",
      },
      {
        type: "Transit Hubs",
        purpose: "Connecting transportation with community spaces",
        features: [
          "Waiting areas",
          "Retail spaces",
          "Information centers",
          "Bike parking",
        ],
        icon: "🚇",
        visitors: "Daily commuters and travelers",
      },
    ],
    communityBenefits = [
      {
        benefit: "Social Cohesion",
        description:
          "Building stronger community bonds through shared experiences",
        icon: "🤝",
      },
      {
        benefit: "Health & Wellness",
        description: "Promoting physical activity and mental well-being",
        icon: "❤️",
      },
      {
        benefit: "Economic Vitality",
        description: "Supporting local businesses and economic activity",
        icon: "💼",
      },
      {
        benefit: "Cultural Expression",
        description: "Providing venues for artistic and cultural activities",
        icon: "🎨",
      },
    ],
    engagementStats = [
      { value: "50,000+", label: "Monthly Visitors" },
      { value: "200+", label: "Annual Events" },
      { value: "95%", label: "User Satisfaction" },
      { value: "24/7", label: "Community Access" },
    ],
    backgroundColor = "from-red-100 to-coral-100",
    textColor = "text-gray-800",
    accentColor = "red",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
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

  const handleBenefitUpdate = (
    index: number,
    patch: Partial<(typeof communityBenefits)[0]>
  ) => {
    const updated = [...communityBenefits];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ communityBenefits: updated });
  };

  const handleStatUpdate = (
    index: number,
    patch: Partial<(typeof engagementStats)[0]>
  ) => {
    const updated = [...engagementStats];
    updated[index] = { ...updated[index], ...patch };
    handleUpdate({ engagementStats: updated });
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
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-20 left-20 text-6xl opacity-10"
          >
            👥
          </motion.div>
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute top-32 right-32 text-5xl opacity-15"
          >
            🎭
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 left-1/4 text-4xl opacity-12"
          >
            🌳
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 3 }}
            className="absolute bottom-32 right-1/4 text-3xl opacity-8"
          >
            🏛️
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

          {/* Space Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {spaceTypes.map((space, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <span className="text-5xl mr-4">{space.icon}</span>
                  <div>
                    <h5 className="text-2xl font-bold text-gray-800">
                      {space.type}
                    </h5>
                    <p className="text-sm text-red-600 italic">
                      {space.visitors}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{space.purpose}</p>
                <div className="grid grid-cols-2 gap-2">
                  {space.features.map((f, fi) => (
                    <div
                      key={fi}
                      className="flex items-center text-sm text-red-700"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Community Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {communityBenefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  className="text-4xl mb-3"
                >
                  {b.icon}
                </motion.div>
                <h6 className="text-lg font-semibold text-gray-800 mb-2">
                  {b.benefit}
                </h6>
                <p className="text-sm text-gray-600">{b.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Engagement Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
              Community Engagement Impact
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {engagementStats.map((s, i) => (
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
  // EDITING MODE – Perfectly Consistent with All Other Sections
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <h1 className="text-2xl font-bold">Public Spaces with Purpose</h1>
        <p className="text-red-100 mt-1">Community Gathering & Connection</p>
      </div>
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        <div>
          <h3 className="font-bold text-xl text-gray-900">{title}</h3>
          <p className="text-sm text-red-600">{subtitle}</p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="grid grid-cols-2 gap-4">
          {spaceTypes.slice(0, 4).map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl">{s.icon}</div>
              <p className="text-xs font-medium mt-1">{s.type}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Public Spaces Editor
          </h1>
          <p className="text-gray-600">
            Design vibrant, inclusive community spaces
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

            {/* Space Types */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                Space Types
              </h2>
              <div className="space-y-6">
                {spaceTypes.map((space, i) => (
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
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
                        Purpose
                      </label>
                      <textarea
                        rows={2}
                        value={space.purpose}
                        onChange={(e: any) =>
                          handleSpaceUpdate(i, "purpose", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
                      />
                    </div>
                    <div className="mb-4">
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
                      />
                    </div>
                    <Input
                      label="Visitors Description"
                      value={space.visitors}
                      onChange={(v) => handleSpaceUpdate(i, "visitors", v)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Community Benefits */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-3"></span>
                Community Benefits
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {communityBenefits.map((b, i) => (
                  <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Icon"
                        value={b.icon}
                        onChange={(v) => handleBenefitUpdate(i, { icon: v })}
                      />
                      <Input
                        label="Benefit"
                        value={b.benefit}
                        onChange={(v) => handleBenefitUpdate(i, { benefit: v })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={b.description}
                        onChange={(e: any) =>
                          handleBenefitUpdate(i, {
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

            {/* Engagement Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-3"></span>
                Engagement Stats
              </h2>
              <div className="space-y-4">
                {engagementStats.map((s, i) => (
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
