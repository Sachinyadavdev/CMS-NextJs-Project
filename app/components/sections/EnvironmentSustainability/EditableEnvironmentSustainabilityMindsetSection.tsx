"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface Highlight {
  id: string;
  title: string;
  description: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityMindsetSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Sustainability Commitment",
    subtitle = "A Mindset That Shapes Every Project",
    intro =
      "Sustainability is our pledge to build responsibly, act consciously and leave a positive legacy. It influences how we plan, design and deliver—ensuring every project supports environmental health, community well-being and long-term resilience.",
    supporting =
      "Sustainability is more than compliance; it is a mindset. Our environmental services are driven by a commitment to future resilience, low-impact development and long-term ecological value.",
    extended =
      "Every initiative integrates sustainability from the ground up, aligned with global standards, local regulations and the needs of the communities we serve.",
    highlights = [
      {
        id: "1",
        title: "Future Resilience",
        description: "Adaptive strategies that anticipate climate realities and protect investments.",
      },
      {
        id: "2",
        title: "Low-Impact Development",
        description: "Design and delivery methodologies that minimize disruption and conserve resources.",
      },
      {
        id: "3",
        title: "Ecological Value",
        description: "Outcomes that enhance biodiversity, healthy communities and regenerative growth.",
      },
    ],
    backgroundColor = "#ffffff",
    titleColor = "#0f172a",
    textColor = "#475569",
    accentColor = "#14b8a6",
    cardBackgroundColor = "#ecfdf5",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleHighlightChange = (index: number, patch: Partial<Highlight>) => {
    const updated = highlights.map((highlight: Highlight, i: number) =>
      i === index ? { ...highlight, ...patch } : highlight
    );
    handleUpdate({ highlights: updated });
  };

  const handleAddHighlight = () => {
    const newHighlight = {
      id: Date.now().toString(),
      title: "New Highlight",
      description: "Describe this highlight...",
    };
    handleUpdate({ highlights: [...highlights, newHighlight] });
  };

  const handleRemoveHighlight = (index: number) => {
    handleUpdate({ highlights: highlights.filter((_: any, i: number) => i !== index) });
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
            className="max-w-4xl"
          >
            <p className="text-sm font-semibold tracking-[0.4em] uppercase" style={{ color: accentColor }}>
              {subtitle}
            </p>
            <h2 className="text-4xl font-bold mt-4" style={{ color: titleColor }}>
              {title}
            </h2>
            <p className="text-lg leading-relaxed mt-6" style={{ color: textColor }}>
              {intro}
            </p>
            <p className="text-lg leading-relaxed mt-4" style={{ color: textColor }}>
              {supporting}
            </p>
          </motion.div>
          <div className="mt-12 grid lg:grid-cols-[2fr,1fr] gap-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {highlights.map((highlight: Highlight, index: number) => (
                <motion.div
                  key={highlight.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-3xl p-6 border h-full"
                  style={{ backgroundColor: cardBackgroundColor, borderColor: "#99f6e4" }}
                >
                  <div className="text-sm font-semibold text-teal-600">Commitment {index + 1}</div>
                  <h3 className="text-xl font-semibold mt-3 text-gray-900">{highlight.title}</h3>
                  <p className="text-base mt-3" style={{ color: textColor }}>
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 rounded-3xl border"
              style={{ backgroundColor: cardBackgroundColor, borderColor: "#5eead4" }}
            >
              <div className="text-sm uppercase tracking-[0.3em] text-teal-600">Mindset</div>
              <p className="text-lg mt-4" style={{ color: textColor }}>
                {extended}
              </p>
              <div className="mt-8 h-px w-full" style={{ backgroundColor: "rgba(20, 184, 166, 0.3)" }} />
              <p className="mt-8 text-sm font-semibold text-teal-700 uppercase tracking-[0.4em]">
                Responsible by design
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const Preview = () => (
    <div className="p-8 rounded-3xl border bg-white">
      <p className="text-xs uppercase tracking-[0.4em] text-teal-500">{subtitle}</p>
      <h2 className="text-3xl font-bold mt-4">{title}</h2>
      <p className="text-sm mt-3 text-gray-600">{intro.substring(0, 100)}...</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.slice(0, 2).map((highlight: Highlight) => (
          <div key={highlight.id} className="p-4 rounded-2xl border">
            <h4 className="font-semibold text-lg">{highlight.title}</h4>
            <p className="text-sm text-gray-600 mt-2">{highlight.description.substring(0, 60)}...</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold">Sustainability Mindset Section Editor</h1>
          <p className="text-gray-600 mt-2">Adjust the narrative and highlight cards</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-2 gap-10 items-start">
        <div className="sticky top-8">
          <Preview />
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border p-6 space-y-5">
            <h2 className="text-2xl font-semibold">Narrative</h2>
            <EditableText label="Title" value={title} onChange={(v) => handleUpdate({ title: v })} />
            <EditableText label="Subtitle" value={subtitle} onChange={(v) => handleUpdate({ subtitle: v })} />
            <EditableTextarea label="Intro" rows={4} value={intro} onChange={(v) => handleUpdate({ intro: v })} />
            <EditableTextarea label="Supporting" rows={3} value={supporting} onChange={(v) => handleUpdate({ supporting: v })} />
            <EditableTextarea label="Extended" rows={3} value={extended} onChange={(v) => handleUpdate({ extended: v })} />
          </div>
          <div className="bg-white rounded-2xl border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Highlights</h2>
              <button onClick={handleAddHighlight} className="px-4 py-2 bg-emerald-600 text-white rounded-xl">
                + Add Highlight
              </button>
            </div>
            <div className="space-y-4">
              {highlights.map((highlight: Highlight, index: number) => (
                <motion.div key={highlight.id} layout className="border rounded-xl p-4 space-y-4">
                  <EditableText label="Title" value={highlight.title} onChange={(v) => handleHighlightChange(index, { title: v })} />
                  <EditableTextarea label="Description" rows={3} value={highlight.description} onChange={(v) => handleHighlightChange(index, { description: v })} />
                  <button onClick={() => handleRemoveHighlight(index)} className="text-red-600 text-sm">
                    Remove Highlight
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <EditableColorPicker label="Background" value={backgroundColor} onChange={(v) => handleUpdate({ backgroundColor: v })} />
            <EditableColorPicker label="Title Color" value={titleColor} onChange={(v) => handleUpdate({ titleColor: v })} />
            <EditableColorPicker label="Text Color" value={textColor} onChange={(v) => handleUpdate({ textColor: v })} />
            <EditableColorPicker label="Accent Color" value={accentColor} onChange={(v) => handleUpdate({ accentColor: v })} />
            <EditableColorPicker label="Card Background" value={cardBackgroundColor} onChange={(v) => handleUpdate({ cardBackgroundColor: v })} />
          </div>
        </div>
      </div>
    </div>
  );
}
