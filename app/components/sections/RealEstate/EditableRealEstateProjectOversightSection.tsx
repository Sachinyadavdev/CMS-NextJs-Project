"use client";

import React from "react";
import { motion } from "framer-motion";
import { RealEstateProjectOversightSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface Props {
  section: RealEstateProjectOversightSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateProjectOversightSection>) => void;
}

export default function EditableRealEstateProjectOversightSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};
  const {
    title = "Project Oversight & Approval Standards",
    subtitle = "Ensuring Alignment, Efficiency and Accountability",
    description = "Project Oversight & Coordination ensures that complex initiatives stay aligned, efficient and accountable from start to finish. By integrating strategy, communication and execution within a unified structure, this approach drives consistency across teams, timelines and deliverables.",
    items = [
      {
        title: "Centralized Management Across Phases",
        description:
          "Oversees planning, design, execution and delivery under one framework—ensuring consistency and control at every stage.",
      },
      {
        title: "Stakeholder Alignment & Communication",
        description:
          "Facilitates transparent collaboration among clients, consultants, contractors and vendors to drive clarity and accountability.",
      },
      {
        title: "Risk, Quality & Timeline Assurance",
        description:
          "Implements rigorous controls to mitigate risks, uphold standards and ensure timely, on-budget project completion.",
      },
    ],
    image = "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=80&w=1000",
    backgroundColor = "#ffffff",
    textColor = "#0f172a",
    accentColor = "#EF4130",
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleItemUpdate = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    handleUpdate({ items: newItems });
  };

  if (!isEditing) {
    return (
      <section className="pb-24 overflow-hidden" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: textColor }}
              >
                {title}
              </h2>
              {subtitle && (
                <p
                  className="text-xl font-medium mb-8"
                  style={{ color: accentColor }}
                >
                  {subtitle}
                </p>
              )}
              <p
                className="text-lg leading-relaxed mb-10 opacity-80"
                style={{ color: textColor }}
              >
                {description}
              </p>

              <div className="space-y-8">
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="group"
                  >
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <div
                          className="w-2 h-2 rounded-full mt-2 transition-all duration-300 group-hover:scale-150"
                          style={{ backgroundColor: accentColor }}
                        />
                      </div>
                      <div>
                        <h3
                          className="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ color: textColor }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-base leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: textColor }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
                style={{ backgroundColor: accentColor }}
              />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] group">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        Project Oversight Content
      </h2>
      <div className="space-y-6">
        <EditableText
          label="Title"
          value={title}
          onChange={(v) => handleUpdate({ title: v })}
        />
        <EditableText
          label="Subtitle"
          value={subtitle}
          onChange={(v) => handleUpdate({ subtitle: v })}
        />
        <EditableTextarea
          label="Description"
          value={description}
          onChange={(v) => handleUpdate({ description: v })}
          rows={4}
        />

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900">Bullet Points</h3>
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <EditableText
                label={`Point ${index + 1} Title`}
                value={item.title}
                onChange={(v) => handleItemUpdate(index, "title", v)}
              />
              <EditableTextarea
                label={`Point ${index + 1} Description`}
                value={item.description}
                onChange={(v) => handleItemUpdate(index, "description", v)}
                rows={2}
              />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Styling & Media</h3>
          <MediaUpload
            label="Side Image"
            type="image"
            currentUrl={image}
            onUpload={(url) => handleUpdate({ image: url })}
            onRemove={() => handleUpdate({ image: "" })}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <EditableColorPicker
              label="Background"
              value={backgroundColor}
              onChange={(v) => handleUpdate({ backgroundColor: v })}
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
          </div>
        </div>
      </div>
    </div>
  );
}
