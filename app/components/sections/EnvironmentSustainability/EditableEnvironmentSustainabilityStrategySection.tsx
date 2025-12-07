"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface FocusArea {
  id: string;
  title: string;
  description: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityStrategySection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Environmental Strategy & Implementation",
    subtitle = "Frameworks That Drive Measurable Impact",
    description =
      "Our strategic environmental solutions help clients achieve compliance, reduce risk and future-proof their infrastructure. We combine scientific analysis, regulatory understanding and industry best practices to deliver meaningful outcomes.",
    highlight = "Advisory Focus Areas",
    focusAreas = [
      {
        id: "1",
        title: "Environmental Planning & Compliance",
        description:
          "Strategies to satisfy regulatory frameworks while enhancing ecological outcomes and minimizing risk.",
      },
      {
        id: "2",
        title: "Carbon & Climate Risk Assessment",
        description:
          "Measuring emissions, evaluating climate impacts and defining mitigation strategies to future-proof assets.",
      },
      {
        id: "3",
        title: "ESG & Climate Strategy",
        description:
          "Developing Environment, Social and Governance frameworks aligned with climate resilience and long-term value.",
      },
      {
        id: "4",
        title: "Sustainability Advisory",
        description:
          "Integrating low-carbon materials, energy-efficient systems and green certifications across each project lifecycle.",
      },
      {
        id: "5",
        title: "Green Building & Urban Design",
        description:
          "High-performance design solutions that reduce energy demand, enhance air quality and improve occupant well-being.",
      },
    ],
    backgroundColor = "#0f172a",
    titleColor = "#f1f5f9",
    textColor = "#cbd5f5",
    cardBackgroundColor = "rgba(15, 23, 42, 0.6)",
    accentColor = "#dc2626",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleFocusAreaChange = (index: number, patch: Partial<FocusArea>) => {
    const updated = focusAreas.map((area: FocusArea, i: number) =>
      i === index ? { ...area, ...patch } : area
    );
    handleUpdate({ focusAreas: updated });
  };

  const handleAddFocusArea = () => {
    const newArea = {
      id: Date.now().toString(),
      title: "New Focus Area",
      description: "Describe this focus area...",
    };
    handleUpdate({ focusAreas: [...focusAreas, newArea] });
  };

  const handleRemoveFocusArea = (index: number) => {
    handleUpdate({ focusAreas: focusAreas.filter((_: any, i: number) => i !== index) });
  };

  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="uppercase tracking-[0.4em] text-sm" style={{ color: accentColor }}>
              {subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ color: titleColor }}>
              {title}
            </h2>
            <p className="text-lg leading-relaxed mt-6" style={{ color: textColor }}>
              {description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 rounded-3xl border px-8 py-10"
            style={{ borderColor: "rgba(249, 115, 22, 0.3)", backgroundColor: "rgba(15,23,42,0.7)" }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold tracking-[0.4em] uppercase" style={{ color: accentColor }}>
                  {highlight}
                </p>
                <h3 className="text-2xl font-semibold mt-3" style={{ color: titleColor }}>
                  Strategic pathways backed by evidence
                </h3>
              </div>
              <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }} />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {focusAreas.map((area: FocusArea, index: number) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl border px-6 py-6 h-full"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)", backgroundColor: cardBackgroundColor }}
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>
                    {`0${index + 1}`.slice(-2)}
                  </div>
                  <h4 className="text-xl font-semibold mt-4" style={{ color: titleColor }}>
                    {area.title}
                  </h4>
                  <p className="text-base mt-3 leading-relaxed" style={{ color: textColor }}>
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const Preview = () => (
    <div className="p-8 rounded-3xl border bg-[#0f172a] text-white">
      <p className="text-xs uppercase tracking-[0.4em] text-orange-400">{subtitle}</p>
      <h2 className="text-3xl font-bold mt-4">{title}</h2>
      <p className="text-sm mt-4 text-slate-200">{description.substring(0, 110)}...</p>
      <div className="mt-6 space-y-3">
        {focusAreas.slice(0, 2).map((area: FocusArea) => (
          <div key={area.id} className="p-4 rounded-2xl border border-white/10">
            <h4 className="font-semibold">{area.title}</h4>
            <p className="text-sm text-slate-300 mt-2">{area.description.substring(0, 60)}...</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold">Environmental Strategy Section Editor</h1>
          <p className="text-gray-600 mt-2">Manage headline content and advisory focus areas</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-2 gap-10 items-start">
        <div className="sticky top-8">
          <Preview />
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border p-6 space-y-5">
            <h2 className="text-2xl font-semibold">Header</h2>
            <EditableText label="Title" value={title} onChange={(v) => handleUpdate({ title: v })} />
            <EditableText label="Subtitle" value={subtitle} onChange={(v) => handleUpdate({ subtitle: v })} />
            <EditableTextarea label="Description" rows={4} value={description} onChange={(v) => handleUpdate({ description: v })} />
            <EditableText label="Highlight Label" value={highlight} onChange={(v) => handleUpdate({ highlight: v })} />
          </div>
          <div className="bg-white rounded-2xl border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Focus Areas</h2>
              <button onClick={handleAddFocusArea} className="px-4 py-2 bg-orange-600 text-white rounded-xl">
                + Add Focus Area
              </button>
            </div>
            <div className="space-y-4">
              {focusAreas.map((area: FocusArea, index: number) => (
                <motion.div key={area.id} layout className="border rounded-xl p-4 space-y-4">
                  <EditableText label="Title" value={area.title} onChange={(v) => handleFocusAreaChange(index, { title: v })} />
                  <EditableTextarea label="Description" rows={3} value={area.description} onChange={(v) => handleFocusAreaChange(index, { description: v })} />
                  <button onClick={() => handleRemoveFocusArea(index)} className="text-red-600 text-sm">
                    Remove Focus Area
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <EditableColorPicker label="Background" value={backgroundColor} onChange={(v) => handleUpdate({ backgroundColor: v })} />
            <EditableColorPicker label="Title Color" value={titleColor} onChange={(v) => handleUpdate({ titleColor: v })} />
            <EditableColorPicker label="Text Color" value={textColor} onChange={(v) => handleUpdate({ textColor: v })} />
            <EditableColorPicker label="Card Background" value={cardBackgroundColor} onChange={(v) => handleUpdate({ cardBackgroundColor: v })} />
            <EditableColorPicker label="Accent Color" value={accentColor} onChange={(v) => handleUpdate({ accentColor: v })} />
          </div>
        </div>
      </div>
    </div>
  );
}
