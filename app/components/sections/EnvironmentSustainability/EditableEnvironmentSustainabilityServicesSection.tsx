"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "@/app/components/EditableInputs";

interface DomainCard {
  id: string;
  title: string;
  description: string;
}

interface Props {
  section: any;
  isEditing: boolean;
  onUpdate: (updates: Partial<any>) => void;
}

export default function EditableEnvironmentSustainabilityServicesSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Environmental Services & Key Domains",
    subtitle = "Comprehensive Advisory for a Sustainable Future",
    description =
      "A broad suite of environmental and sustainable development services support our clients in achieving regulatory alignment, operational efficiency and long-term ecological value.",
    domains = [
      {
        id: "1",
        title: "Environment Advisory",
        description: "Strategy-first guidance that balances policy alignment with ecological outcomes.",
      },
      {
        id: "2",
        title: "HSE Reporting",
        description: "Data-driven health, safety and environment reporting for total compliance clarity.",
      },
      {
        id: "3",
        title: "Waste Management",
        description: "Circular waste practices that reduce impact and unlock resource recovery.",
      },
      {
        id: "4",
        title: "Sustainable Development",
        description: "Integrated planning that embeds sustainability metrics into every phase.",
      },
      {
        id: "5",
        title: "ESG Advisory",
        description: "Frameworks that connect governance rigor with measurable sustainability goals.",
      },
      {
        id: "6",
        title: "Carbon Advisory",
        description: "Carbon accounting, reduction roadmaps and transition strategies.",
      },
    ],
    backgroundColor = "#fef2f2",
    titleColor = "#1f2937",
    textColor = "#374151",
    cardBackgroundColor = "#ffffff",
    accentColor = "#dc2626",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleDomainChange = (index: number, patch: Partial<DomainCard>) => {
    const updated = domains.map((domain: DomainCard, i: number) =>
      i === index ? { ...domain, ...patch } : domain
    );
    handleUpdate({ domains: updated });
  };

  const handleAddDomain = () => {
    const newDomain = {
      id: Date.now().toString(),
      title: "New Domain",
      description: "Describe this domain...",
    };
    handleUpdate({ domains: [...domains, newDomain] });
  };

  const handleRemoveDomain = (index: number) => {
    handleUpdate({ domains: domains.filter((_: any, i: number) => i !== index) });
  };

  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-sm font-semibold tracking-[0.4em] uppercase" style={{ color: accentColor }}>
                {subtitle}
              </p>
              <h2 className="text-4xl font-bold" style={{ color: titleColor }}>
                {title}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: textColor }}>
                {description}
              </p>
              <div className="flex flex-wrap gap-3">
                {domains.slice(0, 3).map((domain: DomainCard) => (
                  <span
                    key={domain.id}
                    className="px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ backgroundColor: "rgba(34, 211, 238, 0.15)", color: accentColor }}
                  >
                    {domain.title}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {domains.map((domain: DomainCard, index: number) => (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="p-6 rounded-2xl border shadow-sm h-full"
                  style={{ backgroundColor: cardBackgroundColor }}
                >
                  <div className="text-2xl mb-4 font-semibold" style={{ color: accentColor }}>
                    {(index + 1).toString().padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: titleColor }}>
                    {domain.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: textColor }}>
                    {domain.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const Preview = () => (
    <div className="p-8 rounded-3xl border bg-white">
      <p className="text-xs uppercase tracking-[0.4em] text-sky-400">{subtitle}</p>
      <h2 className="text-3xl font-bold mt-4">{title}</h2>
      <p className="text-sm mt-3 text-gray-600">{description.substring(0, 100)}...</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains.slice(0, 2).map((domain: DomainCard, index: number) => (
          <div key={domain.id} className="p-4 rounded-2xl border">
            <div className="text-sm font-semibold text-sky-500">Domain {index + 1}</div>
            <h4 className="text-lg font-semibold mt-2">{domain.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{domain.description.substring(0, 60)}...</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold">Environmental Services Section Editor</h1>
          <p className="text-gray-600 mt-2">Update narrative content and domain cards</p>
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
          </div>
          <div className="bg-white rounded-2xl border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Core Domains</h2>
              <button onClick={handleAddDomain} className="px-4 py-2 bg-slate-900 text-white rounded-xl">
                + Add Domain
              </button>
            </div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {domains.map((domain: DomainCard, index: number) => (
                <motion.div key={domain.id} layout className="border rounded-xl p-4 space-y-4">
                  <EditableText label="Title" value={domain.title} onChange={(v) => handleDomainChange(index, { title: v })} />
                  <EditableTextarea label="Description" rows={3} value={domain.description} onChange={(v) => handleDomainChange(index, { description: v })} />
                  <button onClick={() => handleRemoveDomain(index)} className="text-red-600 text-sm">
                    Remove Domain
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
