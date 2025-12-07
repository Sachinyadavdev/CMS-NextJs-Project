"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface Principle {
  id: string;
  title: string;
  description: string;
  accent: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityResponsibilitySection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Environmental Responsibility",
    subtitle = "Building Low-Impact, High-Performance Environments",
    description =
      "Environmental responsibility at RAUS is embedded into every phase—planning, design, construction and operations. Our focus is on developing high-performance, low-impact spaces that balance human needs with ecological preservation.",
    supportingText =
      "Through innovation, regulatory compliance and strategic foresight, we deliver sustainable solutions engineered to endure and evolve.",
    principles = [
      {
        id: "1",
        title: "Future-Focused Design",
        description:
          "Solutions crafted to excel today while adapting to tomorrow’s challenges.",
        accent: "#38bdf8",
      },
      {
        id: "2",
        title: "Integrated Responsibility",
        description:
          "Environmental, social and economic priorities aligned across the entire lifecycle.",
        accent: "#34d399",
      },
      {
        id: "3",
        title: "Low Impact, High Value",
        description:
          "Smart materials, energy-efficient systems and circular practices that reduce footprint without compromising performance.",
        accent: "#fbbf24",
      },
    ],
    backgroundColor = "#0f172a",
    titleColor = "#f8fafc",
    textColor = "#cbd5f5",
    cardBackgroundColor = "#1e293b",
    accentColor = "#38bdf8",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handlePrincipleChange = (index: number, patch: Partial<Principle>) => {
    const updated = principles.map((item: Principle, i: number) =>
      i === index ? { ...item, ...patch } : item
    );
    handleUpdate({ principles: updated });
  };

  const handleAddPrinciple = () => {
    const newPrinciple = {
      id: Date.now().toString(),
      title: "New Principle",
      description: "Describe this principle...",
      accent: accentColor,
    };
    handleUpdate({ principles: [...principles, newPrinciple] });
  };

  const handleRemovePrinciple = (index: number) => {
    handleUpdate({ principles: principles.filter((_: any, i: number) => i !== index) });
  };

  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="uppercase tracking-[0.3em] text-sm" style={{ color: accentColor }}>
              {subtitle}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: titleColor }}>
              {title}
            </h2>
            <div className="space-y-5 max-w-3xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: textColor }}>
                {description}
              </p>
              <p className="text-lg md:text-xl leading-relaxed" style={{ color: textColor }}>
                {supportingText}
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-10"
            style={{ boxShadow: "0 20px 60px rgba(15, 23, 42, 0.6)" }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: accentColor }}>
                  Key Principles
                </p>
                <h3 className="text-2xl font-semibold" style={{ color: titleColor }}>
                  Future-ready and impact-conscious frameworks
                </h3>
              </div>
              <div className="h-1 w-24 rounded-full" style={{ backgroundColor: accentColor }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((principle: Principle, index: number) => (
                <motion.div
                  key={principle.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl h-full"
                  style={{ backgroundColor: cardBackgroundColor }}
                >
                  <div className="p-8">
                    <div className="w-10 h-10 rounded-full mb-6" style={{ backgroundColor: principle.accent }} />
                    <h4 className="text-xl font-semibold mb-4" style={{ color: titleColor }}>
                      {principle.title}
                    </h4>
                    <p className="text-base leading-relaxed" style={{ color: textColor }}>
                      {principle.description}
                    </p>
                  </div>
                  <div className="h-1 rounded-b-2xl" style={{ backgroundColor: principle.accent }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const Preview = () => (
    <div className="p-10 rounded-3xl border" style={{ backgroundColor }}>
      <p className="uppercase tracking-[0.3em] text-xs" style={{ color: accentColor }}>
        {subtitle}
      </p>
      <h2 className="text-3xl font-bold mt-3" style={{ color: titleColor }}>
        {title}
      </h2>
      <p className="mt-4 text-base" style={{ color: textColor }}>
        {description.substring(0, 120)}...
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {principles.slice(0, 2).map((principle: Principle) => (
          <div key={principle.id} className="p-4 rounded-2xl" style={{ backgroundColor: cardBackgroundColor }}>
            <div className="w-8 h-8 rounded-full mb-3" style={{ backgroundColor: principle.accent }} />
            <h4 className="font-semibold text-lg" style={{ color: titleColor }}>
              {principle.title}
            </h4>
            <p className="text-sm mt-1" style={{ color: textColor }}>
              {principle.description.substring(0, 60)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold">Environmental Responsibility Section Editor</h1>
          <p className="text-gray-600 mt-2">Edit the narrative and key principles that define responsibility</p>
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
            <EditableTextarea label="Description" value={description} rows={4} onChange={(v) => handleUpdate({ description: v })} />
            <EditableTextarea label="Supporting Text" value={supportingText} rows={3} onChange={(v) => handleUpdate({ supportingText: v })} />
          </div>
          <div className="bg-white rounded-2xl border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Key Principles</h2>
              <button onClick={handleAddPrinciple} className="px-4 py-2 bg-slate-900 text-white rounded-xl">
                + Add Principle
              </button>
            </div>
            <div className="space-y-4">
              {principles.map((principle: Principle, index: number) => (
                <motion.div key={principle.id} layout className="p-4 border rounded-xl space-y-4">
                  <EditableText label="Title" value={principle.title} onChange={(v) => handlePrincipleChange(index, { title: v })} />
                  <EditableTextarea label="Description" value={principle.description} rows={3} onChange={(v) => handlePrincipleChange(index, { description: v })} />
                  <EditableColorPicker label="Accent Color" value={principle.accent} onChange={(v) => handlePrincipleChange(index, { accent: v })} />
                  <button onClick={() => handleRemovePrinciple(index)} className="text-red-600 text-sm">
                    Remove Principle
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
