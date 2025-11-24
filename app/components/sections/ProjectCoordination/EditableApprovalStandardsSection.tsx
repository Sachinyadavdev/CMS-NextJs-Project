"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ApprovalStandardsSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface EditableApprovalStandardsProps {
  section: ApprovalStandardsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ApprovalStandardsSection>) => void;
}

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function EditableApprovalStandardsSection({
  section,
  isEditing,
  onUpdate,
}: EditableApprovalStandardsProps) {
  // Fix: Use section directly instead of section.content
  const content = section.content || {};
  const {
    title = "Approval Standards",
    subtitle = "A Structured, Transparent Pathway to Compliance",
    description = "Our approvals framework ensures every requirement—from design compliance to final certification—is met with precision. Through proactive coordination and risk-managed compliance, we keep approvals on schedule and projects on track.",
    process = [
      {
        id: "1",
        title: "Pre-Approval Strategy",
        description: "Feasibility assessments, design compliance checks, and pre-approval consultations to ensure readiness before submission.",
        icon: "📘",
        color: "#EF4130"
      },
      {
        id: "2",
        title: "Documentation & Submission",
        description: "Preparation and submission of architectural, MEP, and safety documentation, including drawings and calculations.",
        icon: "📝",
        color: "#d63324"
      },
      {
        id: "3",
        title: "Authority Coordination",
        description: "Liaising with government bodies and agencies, tracking submissions, and managing communication requirements.",
        icon: "🏛️",
        color: "#b52a1f"
      },
      {
        id: "4",
        title: "Issue Resolution",
        description: "Addressing feedback, providing design clarifications, and re-submitting modified documents as required.",
        icon: "🔧",
        color: "#EF4130"
      },
      {
        id: "5",
        title: "Final Clearance",
        description: "Securing NOCs, compliance approvals, and completion certificates to finalize project delivery.",
        icon: "✅",
        color: "#d63324"
      }
    ],
    backgroundColor = "#ffffff",
    subtitleColor = "#EF4130"
  } = content;

  const [animatedSteps, setAnimatedSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Fixed animation logic
  useEffect(() => {
    if (isEditing) return; // Don't animate in edit mode

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setAnimatedSteps(prev => {
                if (!prev.includes(stepIndex)) {
                  return [...prev, stepIndex];
                }
                return prev;
              });
            }, stepIndex * 200);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px 0px' }
    );

    const stepElements = document.querySelectorAll('.process-step-animation');
    stepElements.forEach(step => observer.observe(step));

    return () => observer.disconnect();
  }, [isEditing, process.length]);

  // Reset animations when process changes
  useEffect(() => {
    setAnimatedSteps([]);
  }, [process.length]);

  // Fix: Update the section directly
  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ 
      content: { 
        ...content, 
        ...patch 
      }
    });
  };

  const handleProcessUpdate = (index: number, patch: Partial<ProcessStep>) => {
    const updatedProcess = process.map((step: any, idx: number) =>
      idx === index ? { ...step, ...patch } : step
    );
    handleContentUpdate({ process: updatedProcess });
  };

  const handleAddProcess = () => {
    const newProcess: ProcessStep = {
      id: Date.now().toString(),
      title: "New Process Step",
      description: "Process step description",
      icon: "✨",
      color: "#EF4130"
    };
    handleContentUpdate({ process: [...process, newProcess] });
  };

  const handleRemoveProcess = (index: number) => {
    const updatedProcess = process.filter((_: any, idx: any) => idx !== index);
    handleContentUpdate({ process: updatedProcess });
  };

  if (!isEditing) {
    return (
      <section
        ref={sectionRef}
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl sm:text-2xl mb-6" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-lg max-w-3xl mx-auto leading-relaxed text-gray-600">
                {description}
              </p>
            )}
          </div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-red-500 via-red-400 to-red-500"></div>

            <div className="space-y-12 lg:space-y-0">
              {process.map((step: any, index: number) => (
                <div
                  key={step.id}
                  data-index={index}
                  className={`process-step-animation relative flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } ${
                    animatedSteps.includes(index) 
                      ? 'animate-fade-in-up opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                  } transition-all duration-700 ease-out`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-5/12 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div
                      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4"
                      style={{ borderLeftColor: step.color }}
                    >
                      {/* Icon and Title */}
                      <div className="flex items-center mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4"
                          style={{ backgroundColor: `${step.color}15` }}
                        >
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden lg:block w-2/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add CSS animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}</style>
      </section>
    );
  }

  // Render preview - FIXED: Show all process steps properly
  const renderPreview = () => {
    return (
      <section className="relative py-12 overflow-hidden rounded-lg" style={{ backgroundColor }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg mb-4" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {process.map((step: any, index: number) => (
              <div key={step.id} className="flex items-center space-x-3 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {index + 1}
                </div>
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-sm"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xs text-gray-900 truncate">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const PreviewCard = () => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
    >
      {renderPreview()}
      <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-gray-800 font-medium text-sm">Live Preview</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Light Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Approval Standards Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time editing with instant preview
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <PreviewCard />
          </motion.div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Content
              </h2>
              <div className="space-y-6">
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
                  onChange={(v) =>
                    handleContentUpdate({ description: v })
                  }
                  rows={4}
                />
              </div>
            </motion.div>

            {/* Process Management Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Process Steps
                </h2>
                <button
                  type="button"
                  onClick={handleAddProcess}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                >
                  + Add Step
                </button>
              </div>
              <div className="space-y-4">
                {process.map((step: any, index: number) => (
                  <motion.div
                    key={step.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-semibold text-gray-800">
                        Step {index + 1}
                      </h5>
                      <button
                        onClick={() => handleRemoveProcess(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <EditableText
                        label="Title"
                        value={step.title || ''}
                        onChange={(v) =>
                          handleProcessUpdate(index, { title: v })
                        }
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <EditableText
                          label="Icon"
                          value={step.icon || ''}
                          onChange={(v) =>
                            handleProcessUpdate(index, { icon: v })
                          }
                        />
                        <EditableColorPicker
                          label="Color"
                          value={step.color || '#EF4130'}
                          onChange={(v) =>
                            handleProcessUpdate(index, { color: v })
                          }
                        />
                      </div>
                      <EditableTextarea
                        label="Description"
                        value={step.description || ''}
                        onChange={(v) =>
                          handleProcessUpdate(index, {
                            description: v,
                          })
                        }
                        rows={2}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Colors Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Colors
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <EditableColorPicker
                  label="Background Color"
                  value={backgroundColor}
                  onChange={(v) =>
                    handleContentUpdate({ backgroundColor: v })
                  }
                />
                <EditableColorPicker
                  label="Subtitle Color"
                  value={subtitleColor}
                  onChange={(v) =>
                    handleContentUpdate({ subtitleColor: v })
                  }
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}