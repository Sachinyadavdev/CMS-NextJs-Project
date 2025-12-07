"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectCoordinationDifferentiatorsSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableRange,
} from "../../EditableInputs";
import MediaUpload from "../../MediaUpload";

interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Props {
  section: ProjectCoordinationDifferentiatorsSection;
  isEditing: boolean;
  onUpdate: (
    updates: Partial<ProjectCoordinationDifferentiatorsSection>
  ) => void;
}

export default function EditableWhatSetsRausApartSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section.content ||
    {}) as ProjectCoordinationDifferentiatorsSection["content"];

  const {
    title = "What Sets RAUS Apart",
    subtitle = "Built on trust, technology and relentless follow-through",
    description = "RAUS blends deep partnerships, future-ready technologies and agile governance to orchestrate programs that stay aligned, adaptive and measurably successful.",
    differentiators = [
      {
        id: "1",
        title: "Partnership-Driven Management",
        description:
          "Collaborating closely with clients, vendors and partners for seamless communication, transparency and stakeholder alignment.",
        icon: "🤝",
        color: "#EF4130",
      },
      {
        id: "2",
        title: "Technology Integration",
        description:
          "Utilizing BIM, IoT, AI analytics and digital twins to drive efficiency, reduce risk and optimize outcomes.",
        icon: "💡",
        color: "#F97316",
      },
      {
        id: "3",
        title: "Sustainability & Future-Readiness",
        description:
          "Prioritizing green practices, smart systems and adaptable designs that thrive in changing environments.",
        icon: "🌿",
        color: "#10B981",
      },
      {
        id: "4",
        title: "Flexibility & Customization",
        description:
          "Tailoring solutions to fit any scale, industry, or complexity with agility and creativity.",
        icon: "🧩",
        color: "#3B82F6",
      },
      {
        id: "5",
        title: "Continuous Improvement & Excellence",
        description:
          "A commitment to learning, refining and exceeding standards through quality assurance and client feedback.",
        icon: "✨",
        color: "#A855F7",
      },
    ],
    backgroundColor = "#0f172a",
    textColor = "#ffffff",
    accentColor = "#EF4130",
    cardBackgroundColor = "#ffffff",
    cardTextColor = "#0f172a",
    backgroundImage= "",
    overlayOpacity = 0.8,
  } = content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleDifferentiatorUpdate = (
    index: number,
    patch: Partial<Differentiator>
  ) => {
    const updated = differentiators.map((item: any, i: number) =>
      i === index ? { ...item, ...patch } : item
    );
    handleContentUpdate({ differentiators: updated });
  };

  const handleAddDifferentiator = () => {
    const newDifferentiator: Differentiator = {
      id: Date.now().toString(),
      title: "New Differentiator",
      description: "Describe the differentiator",
      icon: "⭐",
      color: accentColor,
    };
    handleContentUpdate({
      differentiators: [...differentiators, newDifferentiator],
    });
  };

  const handleRemoveDifferentiator = (index: number) => {
    handleContentUpdate({
      differentiators: differentiators.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };

  if (!isEditing) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor }} />
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p
              className="text-sm font-semibold tracking-[0.3em] uppercase"
              style={{ color: accentColor }}
            >
              Distinction
            </p>
            <h2
              className="mt-6 text-4xl md:text-5xl font-bold"
              style={{ color: textColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="mt-4 text-xl font-medium"
                style={{ color: accentColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="mt-6 text-lg leading-relaxed opacity-80"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {differentiators.map((item: any, index: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative rounded-3xl p-8 shadow-xl border border-white/10 overflow-hidden"
                style={{ backgroundColor: cardBackgroundColor }}
              >
                <div
                  className="absolute inset-x-10 top-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  }}
                />
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: `${item.color}1f` }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold uppercase tracking-[0.2em]"
                      style={{ color: accentColor }}
                    >
                      0{index + 1}
                    </p>
                    <h3
                      className="mt-2 text-2xl font-bold"
                      style={{ color: cardTextColor }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="mt-4 text-base leading-relaxed"
                      style={{ color: `${cardTextColor}cc` }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const Preview = () => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
    >
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor }} />
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p
            className="text-xs font-semibold tracking-[0.4em] uppercase"
            style={{ color: accentColor }}
          >
            Distinction
          </p>
          <h3 className="mt-4 text-3xl font-bold" style={{ color: textColor }}>
            {title}
          </h3>
          {subtitle && (
            <p className="mt-3 text-lg" style={{ color: accentColor }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-10 grid gap-5 px-8">
          {differentiators.slice(0, 4).map((item: any) => (
            <div
              key={item.id}
              className="bg-white/90 rounded-2xl p-5 text-left"
              style={{ backgroundColor: cardBackgroundColor }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${item.color}1f` }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.3em]"
                    style={{ color: accentColor }}
                  >
                    Focus
                  </p>
                  <p
                    className="text-base font-semibold"
                    style={{ color: cardTextColor }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="absolute top-5 right-6 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Live Preview
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Differentiators Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Craft the RAUS advantage narrative
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-8"
          >
            <Preview />
          </motion.div>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Content
              </h2>
              <div className="space-y-5">
                <EditableText
                  label="Title"
                  value={title}
                  onChange={(v) => handleContentUpdate({ title: v })}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleContentUpdate({ subtitle: v })}
                />
                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(v) => handleContentUpdate({ description: v })}
                  rows={3}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Differentiators
                </h2>
                <button
                  onClick={handleAddDifferentiator}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-6">
                {differentiators.map((item: any, index: number) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-semibold text-gray-800">
                        Item {index + 1}
                      </p>
                      <button
                        onClick={() => handleRemoveDifferentiator(index)}
                        className="text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <EditableText
                        label="Icon"
                        value={item.icon}
                        onChange={(v) =>
                          handleDifferentiatorUpdate(index, { icon: v })
                        }
                      />
                      <div className="md:col-span-3">
                        <EditableText
                          label="Title"
                          value={item.title}
                          onChange={(v) =>
                            handleDifferentiatorUpdate(index, { title: v })
                          }
                        />
                      </div>
                      <div className="md:col-span-4">
                        <EditableTextarea
                          label="Description"
                          value={item.description}
                          onChange={(v) =>
                            handleDifferentiatorUpdate(index, {
                              description: v,
                            })
                          }
                          rows={2}
                        />
                      </div>
                      <EditableColorPicker
                        label="Accent"
                        value={item.color}
                        onChange={(v) =>
                          handleDifferentiatorUpdate(index, { color: v })
                        }
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Style & Media
              </h2>
              <div className="space-y-6">
                <MediaUpload
                  label="Background Image"
                  type="image"
                  currentUrl={backgroundImage}
                  onUpload={(url) =>
                    handleContentUpdate({ backgroundImage: url })
                  }
                  onRemove={() => handleContentUpdate({ backgroundImage: "" })}
                />
                <EditableRange
                  label="Overlay Opacity"
                  min={0}
                  max={1}
                  step={0.05}
                  value={overlayOpacity}
                  onChange={(v) => handleContentUpdate({ overlayOpacity: v })}
                  showValue
                  unit=""
                />
                <div className="grid grid-cols-2 gap-6">
                  <EditableColorPicker
                    label="Background Color"
                    value={backgroundColor}
                    onChange={(v) =>
                      handleContentUpdate({ backgroundColor: v })
                    }
                  />
                  <EditableColorPicker
                    label="Headline Text"
                    value={textColor}
                    onChange={(v) => handleContentUpdate({ textColor: v })}
                  />
                  <EditableColorPicker
                    label="Accent"
                    value={accentColor}
                    onChange={(v) => handleContentUpdate({ accentColor: v })}
                  />
                  <EditableColorPicker
                    label="Card Background"
                    value={cardBackgroundColor}
                    onChange={(v) =>
                      handleContentUpdate({ cardBackgroundColor: v })
                    }
                  />
                  <EditableColorPicker
                    label="Card Text"
                    value={cardTextColor}
                    onChange={(v) => handleContentUpdate({ cardTextColor: v })}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
