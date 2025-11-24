"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCoordinationApproachSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface ApproachStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface Props {
  section: ProjectCoordinationApproachSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ProjectCoordinationApproachSection>) => void;
}

export default function EditableProjectCoordinationApproachSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Our Project Approach",
    subtitle = "Clear. Fast. Results-Driven.",
    description = "We deliver projects with a proven, transparent process that eliminates complexity and maximizes impact — from day one to long-term success.",
    steps = [
      {
        id: "1",
        title: "Discovery & Alignment",
        description:
          "We start by deeply understanding your goals, challenges, and vision to ensure perfect alignment.",
        icon: "🎯",
      },
      {
        id: "2",
        title: "Strategy & Planning",
        description:
          "A detailed roadmap with milestones, timelines, and risk management built in from the start.",
        icon: "🗺️",
      },
      {
        id: "3",
        title: "Design & Build",
        description:
          "Beautiful, functional solutions crafted with precision and scalability in mind.",
        icon: "✨",
      },
      {
        id: "4",
        title: "Testing & Refinement",
        description:
          "Rigorous quality checks across all devices and scenarios to guarantee flawless performance.",
        icon: "✅",
      },
      {
        id: "5",
        title: "Launch & Support",
        description:
          "Smooth deployment followed by ongoing optimization and dedicated long-term partnership.",
        icon: "🚀",
      },
    ],
    backgroundColor = "#ffffff",
    subtitleColor = "#e11d48", // rose-600
  } = content;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleStepUpdate = (index: number, patch: Partial<ApproachStep>) => {
    const updated = steps.map((s: any, i: number) =>
      i === index ? { ...s, ...patch } : s
    );
    handleUpdate({ steps: updated });
  };

  const handleAddStep = () => {
    const newStep = {
      id: Date.now().toString(),
      title: "New Phase",
      description: "Describe this phase of your approach...",
      icon: "⭐",
    };
    handleUpdate({ steps: [...steps, newStep] });
  };

  const handleRemoveStep = (index: number) => {
    handleUpdate({ steps: steps.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Clean, Modern 2-Column Cards (No Animations, No Gaps)
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p
                className="mt-5 text-2xl font-medium"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p className="mt-6 max-w-4xl mx-auto text-xl leading-relaxed text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Clean 2-Column Grid */}
          <div className="grid lg:grid-cols-2 gap-10">
            {steps.map((step: ApproachStep, index: number) => (
              <div
                key={step.id}
                className="group relative bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-300"
              >
                {/* Subtle accent bar */}
                <div
                  className="absolute left-0 top-10 w-1 h-16 rounded-r-full transition-all duration-300 group-hover:h-24"
                  style={{ backgroundColor: subtitleColor }}
                />

                <div className="flex items-start gap-6">
                  <div className="text-5xl flex-shrink-0">{step.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITOR MODE – Clean & Functional
  // ===================================================================
  const Preview = () => (
    <div
      className="py-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-3 text-xl" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step: any, i: number) => (
            <div
              key={step.id}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl">{step.icon}</span>
                <h3 className="font-bold text-gray-900">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Live Preview
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Project Approach Editor
          </h1>
          <p className="text-gray-600 mt-1">Clean, modern card layout</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <Preview />
          </motion.div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Header</h2>
              <div className="space-y-5">
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
                  onChange={(v) =>
                    handleUpdate({ description: v })
                  }
                  rows={3}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Approach Steps</h2>
                <button
                  onClick={handleAddStep}
                  className="px-5 py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition font-medium"
                >
                  + Add Step
                </button>
              </div>

              <AnimatePresence>
                {steps.map((step: any, i: number) => (
                  <motion.div
                    key={step.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Step {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveStep(i)}
                        className="text-rose-600 hover:text-rose-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={step.icon}
                        onChange={(v) => handleStepUpdate(i, { icon: v })}
                      />
                      <div className="md:col-span-2">
                        <EditableText
                          label="Title"
                          value={step.title}
                          onChange={(v) => handleStepUpdate(i, { title: v })}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <EditableTextarea
                          label="Description"
                          value={step.description}
                          onChange={(v) =>
                            handleStepUpdate(i, { description: v })
                          }
                          rows={2}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Colors */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Colors</h2>
              <div className="grid grid-cols-2 gap-6">
                <EditableColorPicker
                  label="Background"
                  value={backgroundColor}
                  onChange={(v) => handleUpdate({ backgroundColor: v })}
                />
                <EditableColorPicker
                  label="Accent Color"
                  value={subtitleColor}
                  onChange={(v) => handleUpdate({ subtitleColor: v })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
