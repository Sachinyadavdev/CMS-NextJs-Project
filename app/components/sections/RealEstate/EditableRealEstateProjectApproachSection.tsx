"use client";

import React from "react";
import {
  RealEstateProjectApproachSection,
  ProjectApproachPhase,
} from "@/lib/db";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface EditableRealEstateProjectApproachProps {
  section: RealEstateProjectApproachSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateProjectApproachSection>) => void;
}

export default function EditableRealEstateProjectApproachSection({
  section,
  isEditing,
  onUpdate,
}: EditableRealEstateProjectApproachProps) {
  const content = section.content || {};

  const defaultPhases: ProjectApproachPhase[] = [
    {
      id: "phase-1",
      number: "01",
      title: "DISCOVERY &\nANALYSIS",
      description: "Understanding client objectives, context and challenges.",
      color: "#EF4130",
    },
    {
      id: "phase-2",
      number: "02",
      title: "STRATEGIC\nPLANNING",
      description:
        "Crafting a roadmap that balances design, technology and sustainability.",
      color: "#6B7280",
    },
    {
      id: "phase-3",
      number: "03",
      title: "DESIGN &\nENGINEERING",
      description: "Translating ideas into actionable, future-proof designs.",
      color: "#06B6D4",
    },
    {
      id: "phase-4",
      number: "04",
      title: "IMPLEMENTATION\n& EXECUTION",
      description: "Managing every detail with precision and accountability.",
      color: "#1E40AF",
    },
    {
      id: "phase-5",
      number: "05",
      title: "HANDOVER &\nBEYOND",
      description: "Ensuring seamless transitions and ongoing performance.",
      color: "#374151",
    },
  ];

  const {
    title = "Our Project Approach:",
    subtitle = "Building Beyond Boundaries",
    description = "At RAUS, our project approach is more than a process—it's a mindset and a promise. We blend strategic insight, technical precision and innovative thinking to transform ideas into high-performing, future-ready realities. Our approach is designed to unlock hidden potential, streamline complexities and empower every stakeholder to succeed.\n\nBy embracing cutting-edge technologies, data-driven decision-making and sustainable practices, we future-proof every project and prepare it to thrive in an ever-changing world. Our commitment goes beyond mere delivery—we build with purpose, accountability and a vision for tomorrow and enduring success for our clients.",
    closingText = "Every project is an opportunity to innovate, collaborate and deliver lasting value. At RAUS, we don't just build projects—we build partnerships that stand the test of time.",
    phases,
    backgroundColor = "#ffffff",
    textColor = "#000000",
    titleColor = "#000000",
    subtitleColor = "#EF4130",
    accentColor = "#EF4130",
  } = content;

  const phasesData = phases && phases.length > 0 ? phases : defaultPhases;

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const updatePhases = (next: ProjectApproachPhase[]) => {
    handleContentUpdate({ phases: next });
  };

  const updatePhaseById = (
    id: string,
    patch: Partial<ProjectApproachPhase>
  ) => {
    const base = phases && phases.length > 0 ? phases : defaultPhases;
    const updated = base.map((phase) =>
      phase.id === id ? { ...phase, ...patch } : phase
    );
    updatePhases(updated);
  };

  const handleAddPhase = () => {
    const base = phases && phases.length > 0 ? phases : phasesData;
    const newPhase: ProjectApproachPhase = {
      id: `phase-${Date.now()}`,
      number: String(base.length + 1).padStart(2, "0"),
      title: "NEW PHASE",
      description: "Phase description here.",
      color: accentColor,
    };
    updatePhases([...base, newPhase]);
  };

  const handleRemovePhase = (phaseId: string) => {
    const base = phases && phases.length > 0 ? phases : defaultPhases;
    const filtered = base.filter((phase) => phase.id !== phaseId);
    updatePhases(filtered);
  };

  if (!isEditing) {
    return (
      <section
        className="relative pb-20 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: accentColor }}
          />
          <div
            className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            <p
              className="text-2xl sm:text-3xl font-semibold mb-8"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>

            {/* Decorative line */}
            <div
              className="h-1 w-24 mx-auto rounded-full mb-12"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Description */}
          <div className="max-w-5xl mx-auto mb-16">
            <p
              className="text-lg md:text-xl leading-relaxed whitespace-pre-line"
              style={{ color: textColor }}
            >
              {description}
            </p>
          </div>

          {/* Timeline Flow Diagram */}
          <div className="mb-16">
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent hidden md:block" />

              {/* Timeline Steps */}
              <div
                className="grid grid-cols-1 gap-8 md:gap-4"
                style={{
                  gridTemplateColumns: `repeat(${phasesData.length}, minmax(0, 1fr))`,
                }}
              >
                {phasesData.map((phase, index) => (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Number Circle */}
                      <div
                        className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl"
                        style={{ backgroundColor: phase.color }}
                      >
                        <span className="text-3xl font-bold text-white">
                          {phase.number}
                        </span>
                        <div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle, ${phase.color}80, transparent)`,
                            transform: "scale(1.5)",
                          }}
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg font-bold mb-2 uppercase tracking-wide whitespace-pre-line"
                        style={{ color: phase.color }}
                      >
                        {phase.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: textColor }}
                      >
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Closing Text */}
          {closingText && (
            <div className="max-w-4xl mx-auto text-center">
              <p
                className="text-lg md:text-xl leading-relaxed font-medium"
                style={{ color: textColor }}
              >
                {closingText}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Preview for editing mode
  const renderPreview = () => {
    return (
      <section
        className="py-12 rounded-lg overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            <p
              className="text-xl font-semibold mb-4"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
            <div
              className="h-1 w-16 mx-auto rounded-full mb-6"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <p
              className="text-sm leading-relaxed whitespace-pre-line line-clamp-6"
              style={{ color: textColor }}
            >
              {description}
            </p>
          </div>

          {/* Timeline Preview */}
          <div className="mb-8">
            <div className="flex justify-between items-center gap-2">
              {phasesData.map((phase) => (
                <div key={phase.id} className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.number}
                  </div>
                  <div className="h-0.5 w-full bg-gray-300 mt-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Closing Text */}
          {closingText && (
            <div className="text-center">
              <p
                className="text-sm leading-relaxed line-clamp-3"
                style={{ color: textColor }}
              >
                {closingText}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  };

  // Editing Mode
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8">
          {renderPreview()}
        </div>
      </motion.div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={title}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Our Project Approach:"
            />
            <EditableText
              label="Subtitle"
              value={subtitle}
              onChange={(val) => handleContentUpdate({ subtitle: val })}
              placeholder="Building Beyond Boundaries"
            />
            <EditableTextarea
              label="Description"
              value={description}
              onChange={(val) => handleContentUpdate({ description: val })}
              rows={8}
              placeholder="At RAUS, our project approach is more than a process..."
            />
            <EditableTextarea
              label="Closing Text"
              value={closingText}
              onChange={(val) => handleContentUpdate({ closingText: val })}
              rows={3}
              placeholder="Every project is an opportunity to innovate..."
            />
          </div>
        </div>

        {/* Timeline Phases Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2" />
              Timeline Phases
            </h3>
            <button
              onClick={handleAddPhase}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              + Add Phase
            </button>
          </div>

          <div className="space-y-4">
            {phasesData.map((phase, index) => (
              <div
                key={phase.id}
                className="p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-600">
                    Phase {index + 1}
                  </span>
                  {phasesData.length > 1 && (
                    <button
                      onClick={() => handleRemovePhase(phase.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-xs font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <EditableText
                    label="Number"
                    value={phase.number}
                    onChange={(val) =>
                      updatePhaseById(phase.id, { number: val })
                    }
                    placeholder="01"
                  />
                  <EditableColorPicker
                    label="Color"
                    value={phase.color}
                    onChange={(val) =>
                      updatePhaseById(phase.id, { color: val })
                    }
                  />
                </div>

                <div className="mt-3">
                  <EditableTextarea
                    label="Title (use \n for line breaks)"
                    value={phase.title}
                    onChange={(val) =>
                      updatePhaseById(phase.id, { title: val })
                    }
                    rows={2}
                    placeholder="PHASE TITLE"
                  />
                </div>

                <div className="mt-3">
                  <EditableTextarea
                    label="Description"
                    value={phase.description}
                    onChange={(val) =>
                      updatePhaseById(phase.id, { description: val })
                    }
                    rows={2}
                    placeholder="Phase description..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colors & Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Colors & Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={(val) => handleContentUpdate({ backgroundColor: val })}
            />
            <EditableColorPicker
              label="Text Color"
              value={textColor}
              onChange={(val) => handleContentUpdate({ textColor: val })}
            />
            <EditableColorPicker
              label="Title Color"
              value={titleColor}
              onChange={(val) => handleContentUpdate({ titleColor: val })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={subtitleColor}
              onChange={(val) => handleContentUpdate({ subtitleColor: val })}
            />
            <EditableColorPicker
              label="Accent Color"
              value={accentColor}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
