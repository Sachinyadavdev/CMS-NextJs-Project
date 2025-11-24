"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StrategicConsultingMethodologySection } from "@/lib/db";
import { EditableText, EditableTextarea, EditableColorPicker, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableStrategicConsultingMethodologyProps {
  section: StrategicConsultingMethodologySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<StrategicConsultingMethodologySection>) => void;
}

export default function EditableStrategicConsultingMethodologySection({
  section,
  isEditing,
  onUpdate,
}: EditableStrategicConsultingMethodologyProps) {
  const content = section.content as any || {};

  const {
    title = "Our Strategic Methodology",
    subtitle = "Proven Process for Transformative Results",
    description = "Our structured approach ensures consistent delivery of high-quality strategic consulting services that drive measurable business outcomes.",
    methodology = [
      {
        id: "1",
        title: "Discovery & Assessment",
        description:
          "Comprehensive analysis of current state, challenges, and opportunities through stakeholder interviews, data analysis, and benchmarking.",
        icon: "🔍",
        color: "#EF4130",
        duration: "2-4 weeks",
        deliverables: [
          "Current state assessment report",
          "Stakeholder analysis",
          "Opportunity identification",
          "Initial recommendations",
        ],
        tools: ["Interviews", "Surveys", "Data Analysis", "Benchmarking"],
      },
      {
        id: "2",
        title: "Strategy Development",
        description:
          "Collaborative development of strategic initiatives, roadmaps, and implementation plans aligned with organizational goals.",
        icon: "🎯",
        color: "#d63324",
        duration: "4-8 weeks",
        deliverables: [
          "Strategic roadmap",
          "Implementation plan",
          "Change management strategy",
          "Success metrics",
        ],
        tools: [
          "Workshops",
          "Strategic Planning",
          "Roadmapping",
          "KPI Development",
        ],
      },
      {
        id: "3",
        title: "Implementation Support",
        description:
          "Hands-on support during execution phase, including change management, training, and ongoing optimization.",
        icon: "⚡",
        color: "#b52a1f",
        duration: "8-16 weeks",
        deliverables: [
          "Implementation roadmap",
          "Training programs",
          "Progress monitoring",
          "Optimization recommendations",
        ],
        tools: [
          "Project Management",
          "Change Management",
          "Training",
          "Monitoring",
        ],
      },
      {
        id: "4",
        title: "Measurement & Optimization",
        description:
          "Continuous monitoring of results, performance optimization, and scaling successful initiatives across the organization.",
        icon: "📊",
        color: "#EF4130",
        duration: "Ongoing",
        deliverables: [
          "Performance dashboards",
          "Optimization reports",
          "Scaling recommendations",
          "Success case studies",
        ],
        tools: [
          "Analytics",
          "Performance Monitoring",
          "Optimization",
          "Scaling",
        ],
      },
    ],
    backgroundColor = "#ffffff",
    textColor = "#000000",
    titleColor = "#000000",
    subtitleColor = "#EF4130",
    showConnectors = true,
    connectorColor = "#EF4130",
    showDetails = true,
    // CTA fields
    ctaTitle = "Ready to Transform Your Business?",
    ctaDescription = "Let's discuss how our proven methodology can help you achieve your strategic objectives and drive sustainable growth.",
    ctaButtonText = "Start Your Journey",
    ctaButtonLink = "#",
    ctaTitleColor = "#000000",
    ctaDescriptionColor = "#6b7280",
    ctaButtonColor = "#EF4130",
    ctaBgGradientStart = "#fef2f2",
    ctaBgGradientEnd = "#fee2e2",
  } = content;

  const [activeStep, setActiveStep] = useState<string | null>(null);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    return (
      <section className="py-20" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-xl lg:text-2xl mb-6"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="text-lg max-w-3xl mx-auto leading-relaxed"
                style={{ color: textColor, opacity: 0.8 }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Methodology Steps */}
          <div className="relative">
            {/* Connection Lines */}
            {showConnectors && (
              <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 z-0">
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: connectorColor }}
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {methodology.map((step: any, index: number) => (
                <div
                  key={step.id}
                  className="group cursor-pointer"
                  style={{
                    animation: `slideInUp 0.8s ease-out ${index * 0.2}s both`,
                  }}
                  onMouseEnter={() => setActiveStep(step.id)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="text-center">
                    {/* Step Number */}
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 transition-all duration-300 group-hover:scale-110 shadow-lg"
                      style={{ backgroundColor: step.color }}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: step.color }}
                    >
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-3 transition-colors duration-300"
                      style={{
                        color: activeStep === step.id ? step.color : titleColor,
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Duration */}
                    <div
                      className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
                      style={{
                        backgroundColor: `${step.color}20`,
                        color: step.color,
                      }}
                    >
                      {step.duration}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Expandable Details */}
                    {showDetails && (
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          activeStep === step.id
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-gray-50 rounded-lg p-4 mt-4">
                          {/* Deliverables */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">
                              Key Deliverables:
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {step.deliverables?.map((deliverable: any, idx: number) => (
                                <li key={idx} className="flex items-start">
                                  <span
                                    className="w-1.5 h-1.5 rounded-full mr-2 mt-2 flex-shrink-0"
                                    style={{ backgroundColor: step.color }}
                                  />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tools */}
                          <div>
                            <h4 className="font-semibold text-sm text-gray-700 mb-2">
                              Tools & Methods:
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {step.tools?.map((tool: any, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-white text-xs rounded-full border"
                                  style={{
                                    borderColor: step.color,
                                    color: step.color,
                                  }}
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Hover indicator */}
                    <div
                      className={`mt-4 transition-all duration-300 ${
                        activeStep === step.id
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 transform translate-y-2"
                      }`}
                    >
                      <div
                        className="w-8 h-1 rounded-full mx-auto"
                        style={{ backgroundColor: step.color }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div
              className="rounded-2xl p-8 max-w-4xl mx-auto"
              style={{
                background: `linear-gradient(to right, ${ctaBgGradientStart}, ${ctaBgGradientEnd})`,
              }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: ctaTitleColor }}
              >
                {ctaTitle}
              </h3>
              <p
                className="mb-6 max-w-2xl mx-auto"
                style={{ color: ctaDescriptionColor }}
              >
                {ctaDescription}
              </p>
              <a
                href={ctaButtonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: ctaButtonColor }}
              >
                {ctaButtonText}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    return (
      <section className="py-12" style={{ backgroundColor }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg mb-4" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {methodology.map((step: any, index: number) => (
              <div key={step.id} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white mx-auto mb-3"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>
                <div className="text-2xl mb-2">{step.icon}</div>
                <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-gray-600">{step.duration}</p>
              </div>
            ))}
          </div>

          {/* CTA Preview */}
          <div
            className="p-4 rounded-lg text-center border"
            style={{
              background: `linear-gradient(to right, ${ctaBgGradientStart}, ${ctaBgGradientEnd})`,
            }}
          >
            <h4
              className="font-bold text-sm mb-1"
              style={{ color: ctaTitleColor }}
            >
              {ctaTitle}
            </h4>
            <p className="text-xs mb-2" style={{ color: ctaDescriptionColor }}>
              {ctaDescription.substring(0, 50)}...
            </p>
            <a
              href={ctaButtonLink}
              className="inline-block px-3 py-1 text-xs text-white rounded font-medium"
              style={{ backgroundColor: ctaButtonColor }}
            >
              {ctaButtonText}
            </a>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Text Content Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="📝 Title"
              value={title}
              onChange={(value) => handleContentUpdate({ title: value })}
              placeholder="Enter title..."
            />
            <EditableText
              label="📋 Subtitle"
              value={subtitle}
              onChange={(value) => handleContentUpdate({ subtitle: value })}
              placeholder="Enter subtitle..."
            />
            <EditableTextarea
              label="📄 Description"
              value={description}
              onChange={(value) => handleContentUpdate({ description: value })}
              placeholder="Enter description..."
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-2" />
            Call to Action
          </h3>
          <div className="space-y-4">
            <EditableText
              label="🎯 CTA Title"
              value={ctaTitle}
              onChange={(value) => handleContentUpdate({ ctaTitle: value })}
              placeholder="Enter CTA title..."
            />
            <EditableTextarea
              label="📝 CTA Description"
              value={ctaDescription}
              onChange={(value) => handleContentUpdate({ ctaDescription: value })}
              placeholder="Enter CTA description..."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableText
                label="🔘 Button Text"
                value={ctaButtonText}
                onChange={(value) => handleContentUpdate({ ctaButtonText: value })}
                placeholder="Enter button text..."
              />
              <EditableText
                label="🔗 Button Link"
                value={ctaButtonLink}
                onChange={(value) => handleContentUpdate({ ctaButtonLink: value })}
                placeholder="Enter button link..."
              />
              <EditableColorPicker
                label="📝 CTA Title Color"
                value={ctaTitleColor}
                onChange={(value) => handleContentUpdate({ ctaTitleColor: value })}
              />
              <EditableColorPicker
                label="📋 CTA Description Color"
                value={ctaDescriptionColor}
                onChange={(value) => handleContentUpdate({ ctaDescriptionColor: value })}
              />
              <EditableColorPicker
                label="🔘 Button Color"
                value={ctaButtonColor}
                onChange={(value) => handleContentUpdate({ ctaButtonColor: value })}
              />
              <EditableColorPicker
                label="🎨 Gradient Start"
                value={ctaBgGradientStart}
                onChange={(value) => handleContentUpdate({ ctaBgGradientStart: value })}
              />
              <EditableColorPicker
                label="🎨 Gradient End"
                value={ctaBgGradientEnd}
                onChange={(value) => handleContentUpdate({ ctaBgGradientEnd: value })}
              />
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            Settings
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableCheckbox
                label="🔗 Show Connectors"
                checked={showConnectors}
                onChange={(value) => handleContentUpdate({ showConnectors: value })}
              />
              <EditableCheckbox
                label="👁️ Show Details on Hover"
                checked={showDetails}
                onChange={(value) => handleContentUpdate({ showDetails: value })}
              />
            </div>
          </div>
        </div>

        {/* Methodology Steps Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Methodology Steps
          </h3>
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const newStep = {
                    id: Date.now().toString(),
                    title: "New Step",
                    description: "Step description",
                    icon: "✨",
                    color: "#EF4130",
                    duration: "4 weeks",
                    deliverables: ["Deliverable 1"],
                    tools: ["Tool 1"],
                  };
                  handleContentUpdate({
                    methodology: [...methodology, newStep],
                  });
                }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Add Step
              </button>
            </div>

            {methodology.map((step: any, index: number) => (
              <div
                key={step.id}
                className="border border-gray-200 rounded-xl p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">
                    Step {index + 1}: {step.title}
                  </h5>
                  <button
                    onClick={() => {
                      const updatedMethodology = methodology.filter(
                        (_: any, i: number) => i !== index
                      );
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <EditableText
                    label="📝 Title"
                    value={step.title || ""}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        title: value,
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    placeholder="Step Title"
                  />
                  <EditableText
                    label="🎨 Icon"
                    value={step.icon || ""}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        icon: value,
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    placeholder="🔍"
                  />
                  <EditableColorPicker
                    label="🎨 Color"
                    value={step.color || "#EF4130"}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        color: value,
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                  />
                  <EditableText
                    label="⏱️ Duration"
                    value={step.duration || ""}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        duration: value,
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    placeholder="4 weeks"
                  />
                </div>

                <div className="space-y-4">
                  <EditableTextarea
                    label="📄 Description"
                    value={step.description || ""}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        description: value,
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    placeholder="Step description"
                  />
                  <EditableText
                    label="✅ Deliverables (comma-separated)"
                    value={step.deliverables ? step.deliverables.join(", ") : ""}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        deliverables: value
                          .split(",")
                          .map((d) => d.trim())
                          .filter((d) => d),
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    placeholder="Deliverable 1, Deliverable 2"
                  />
                  <EditableText
                    label="🔧 Tools & Methods (comma-separated)"
                    value={step.tools ? step.tools.join(", ") : ""}
                    onChange={(value) => {
                      const updatedMethodology = [...methodology];
                      updatedMethodology[index] = {
                        ...updatedMethodology[index],
                        tools: value
                          .split(",")
                          .map((t) => t.trim())
                          .filter((t) => t),
                      };
                      handleContentUpdate({ methodology: updatedMethodology });
                    }}
                    placeholder="Tool 1, Tool 2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Styling & Colors Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="🎨 Background Color"
              value={backgroundColor}
              onChange={(value) => handleContentUpdate({ backgroundColor: value })}
            />
            <EditableColorPicker
              label="📝 Text Color"
              value={textColor}
              onChange={(value) => handleContentUpdate({ textColor: value })}
            />
            <EditableColorPicker
              label="📋 Title Color"
              value={titleColor}
              onChange={(value) => handleContentUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="📝 Subtitle Color"
              value={subtitleColor}
              onChange={(value) => handleContentUpdate({ subtitleColor: value })}
            />
            <EditableColorPicker
              label="🔗 Connector Color"
              value={connectorColor}
              onChange={(value) => handleContentUpdate({ connectorColor: value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
