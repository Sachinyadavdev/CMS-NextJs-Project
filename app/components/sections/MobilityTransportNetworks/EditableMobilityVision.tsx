"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
  EditableTextarea,
  EditableText,
  EditableColorPicker,
} from "@/app/components/EditableInputs";
import MediaUpload from "@/app/components/MediaUpload";
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Cpu,
  Users,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import {
  mobilityTheme,
  mobilitySectionWrapper,
  mobilityContainer,
} from "./MobilityTheme";

interface ControlGroupProps {
  title: string;
  id: string;
  activeId: string;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

function ControlGroup({
  title,
  id,
  activeId,
  onToggle,
  children,
}: ControlGroupProps) {
  const isOpen = activeId === id;
  return (
    <motion.div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white/50 hover:bg-white/70 transition-colors">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>
      {isOpen && (
        <div className="p-3 space-y-3 border-t border-gray-200/50">
          {children}
        </div>
      )}
    </motion.div>
  );
}

interface EditableMobilityVisionProps {
  section: PageSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
}

const defaultVisionPoints = [
  {
    title: "Mobility-as-a-System",
    description:
      "Designs that go beyond roads—integrating rail, EV, cycling and pedestrian flows into one connected network.",
  },
  {
    title: "Real-Time Intelligence",
    description:
      "Data-driven platforms that monitor, predict and optimize traffic, reducing delays and improving efficiency citywide.",
  },
  {
    title: "Tech-First Infrastructure",
    description:
      "Embedded sensors, adaptive lighting, smart intersections—built for today, ready for tomorrow.",
  },
  {
    title: "Designing for Everyone",
    description:
      "Inclusive planning that ensures mobility access for all ages, abilities and modes of movement.",
  },
];

export default function EditableMobilityVision({
  section,
  isEditing,
  onUpdate,
}: EditableMobilityVisionProps) {
  const content = (section.content || {}) as MobilityContent;
  const {
    visionTitle = "Mobility today isn’t just about moving from point A to B—it’s about creating connected, adaptive and intelligent systems that move people and goods effortlessly across evolving urban landscapes. By merging infrastructure design with smart technology, transport networks are reimagined as dynamic ecosystems—responsive to real-time needs, built for future growth and centered around the human experience.",
    visionPoints = defaultVisionPoints,
    visionImageUrl = "https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1600&q=80",
    visionAccentColor = mobilityTheme.accent,
    visionBackgroundColor = mobilityTheme.pageBackground,
    textColor = mobilityTheme.textPrimary,
  } = content;

  const [activeSection, setActiveSection] = useState<string>("content");

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePointUpdate = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const updatedPoints = [...(visionPoints || defaultVisionPoints)];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    handleContentUpdate({ visionPoints: updatedPoints });
  };

  const viewModeContent = {
    visionTitle,
    visionPoints: visionPoints || defaultVisionPoints,
    visionImageUrl,
    visionAccentColor,
    visionBackgroundColor,
    textColor,
  };

  if (!isEditing) {
    return <MobilityVisionView content={viewModeContent} />;
  }

  return (
    <SectionEditorLayout
      title="Mobility Vision Editor"
      description="Edit the vision statement and key pillars."
      preview={
        <div className="h-full overflow-auto">
          <MobilityVisionView content={viewModeContent} />
        </div>
      }
      controls={
        <div className="space-y-4">
          <ControlGroup
            title="Vision Statement"
            id="content"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableTextarea
              label="Vision Text"
              value={visionTitle}
              onChange={(value) => handleContentUpdate({ visionTitle: value })}
              rows={8}
            />
          </ControlGroup>
          <ControlGroup
            title="Vision Points"
            id="points"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            {(visionPoints || defaultVisionPoints).map((point, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border border-gray-200/80 bg-white p-3"
              >
                <div className="text-xs font-semibold text-gray-500">
                  Point {index + 1}
                </div>
                <EditableText
                  label="Title"
                  value={point.title}
                  onChange={(value) => handlePointUpdate(index, "title", value)}
                />
                <EditableTextarea
                  label="Description"
                  value={point.description}
                  onChange={(value) =>
                    handlePointUpdate(index, "description", value)
                  }
                  rows={3}
                />
              </div>
            ))}
          </ControlGroup>
          <ControlGroup
            title="Imagery"
            id="imagery"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <MediaUpload
              label="Vision Image"
              type="image"
              currentUrl={visionImageUrl}
              onUpload={(url) => handleContentUpdate({ visionImageUrl: url })}
              onRemove={() => handleContentUpdate({ visionImageUrl: "" })}
            />
          </ControlGroup>
          <ControlGroup
            title="Styles"
            id="styles"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableColorPicker
              label="Background"
              value={visionBackgroundColor}
              onChange={(value) =>
                handleContentUpdate({ visionBackgroundColor: value })
              }
            />
            <EditableColorPicker
              label="Accent"
              value={visionAccentColor}
              onChange={(value) =>
                handleContentUpdate({ visionAccentColor: value })
              }
            />
            <EditableColorPicker
              label="Text"
              value={textColor}
              onChange={(value) => handleContentUpdate({ textColor: value })}
            />
          </ControlGroup>
        </div>
      }
    />
  );
}

function MobilityVisionView({ content }: { content: any }) {
  const points = content.visionPoints || defaultVisionPoints;
  const icons = [Globe, Zap, Cpu, Users];

  return (
    <section
      className={`${mobilitySectionWrapper} relative overflow-hidden py-24 lg:py-32`}
      style={{ backgroundColor: content.visionBackgroundColor }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20"
          style={{ background: content.visionAccentColor }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-10"
          style={{ background: content.textColor }}
        />
      </div>

      <div className={`${mobilityContainer} relative z-10`}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Vision Statement (5 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Sparkles
                className="w-3 h-3"
                style={{ color: content.visionAccentColor }}
              />
              <span className="text-xs font-medium tracking-widest uppercase text-white/70">
                Future Vision
              </span>
            </div>

            <h2
              className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide text-white/90"
              style={{ color: content.textColor }}
            >
              {content.visionTitle}
            </h2>

            <div className="h-px w-24 bg-gradient-to-r from-white/30 to-transparent" />

            {content.visionImageUrl && (
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl group mt-8">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <img
                  src={content.visionImageUrl}
                  alt="Mobility Vision"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}
          </motion.div>

          {/* Right Column: Points Grid (7 columns) */}
          <div className="lg:col-span-7 grid gap-5">
            {points.map((point: any, index: number) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm hover:-translate-x-1"
                >
                  <div className="flex gap-6 items-start">
                    <div
                      className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{ color: content.visionAccentColor }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-3 pt-1">
                      <h3
                        className="text-xl font-semibold tracking-tight"
                        style={{ color: content.textColor }}
                      >
                        {point.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed text-base">
                        {point.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover Gradient Border */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />

                  {/* Bottom Glow Line */}
                  <div
                    className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      backgroundImage: `linear-gradient(90deg, transparent, ${content.visionAccentColor}, transparent)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
