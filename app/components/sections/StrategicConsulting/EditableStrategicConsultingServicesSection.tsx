"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StrategicConsultingServicesSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableStrategicConsultingServicesProps {
  section: StrategicConsultingServicesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<StrategicConsultingServicesSection>) => void;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export default function EditableStrategicConsultingServicesSection({
  section,
  isEditing,
  onUpdate,
}: EditableStrategicConsultingServicesProps) {
  const content = section.content as any || {};
  const {
    title = "Our Strategic Consulting Services",
    subtitle = "Comprehensive Solutions for Business Excellence",
    description = "We offer a wide range of strategic consulting services designed to help organizations achieve their goals and navigate complex business challenges.",
    services = [
      {
        id: "1",
        title: "Business Strategy",
        description: "Develop comprehensive business strategies that drive growth and competitive advantage.",
        icon: "🎯",
        color: "#EF4130",
        features: ["Market Analysis", "Competitive Intelligence", "Growth Planning"],
      },
      {
        id: "2",
        title: "Digital Transformation",
        description: "Guide organizations through digital transformation initiatives to modernize operations.",
        icon: "🚀",
        color: "#d63324",
        features: ["Technology Assessment", "Process Optimization", "Change Management"],
      },
      {
        id: "3",
        title: "Financial Consulting",
        description: "Expert financial analysis and consulting to optimize capital structure and profitability.",
        icon: "💰",
        color: "#b52a1f",
        features: ["Financial Modeling", "Risk Assessment", "Investment Strategy"],
      },
      {
        id: "4",
        title: "Operations Excellence",
        description: "Streamline operations and improve efficiency through proven methodologies and best practices.",
        icon: "⚡",
        color: "#991b14",
        features: ["Process Improvement", "Lean Management", "Quality Assurance"],
      },
      {
        id: "5",
        title: "Change Management",
        description: "Support organizations through major changes with effective change management strategies.",
        icon: "🔄",
        color: "#7d1510",
        features: ["Change Strategy", "Stakeholder Engagement", "Training Programs"],
      },
      {
        id: "6",
        title: "Risk Management",
        description: "Identify, assess, and mitigate risks to ensure business continuity and resilience.",
        icon: "🛡️",
        color: "#61110c",
        features: ["Risk Assessment", "Compliance Management", "Crisis Planning"],
      },
    ],
    backgroundColor = "#ffffff",
    textColor = "#000000",
    titleColor = "#000000",
    subtitleColor = "#EF4130",
    cardBackgroundColor = "#f8f9fa",
    cardHoverColor = "#ffffff",
    layout = "grid", // 'grid' or 'masonry'
    showIcons = true,
    showFeatures = true,
  } = content;

  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setTimeout(() => {
              setAnimatedCards(prev => [...prev, cardIndex]);
            }, cardIndex * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleServiceUpdate = (index: number, patch: Partial<Service>) => {
    const updatedServices = services.map((service: any, idx: number) =>
      idx === index ? { ...service, ...patch } : service
    );
    handleContentUpdate({ services: updatedServices });
  };

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      icon: "✨",
      color: "#EF4130",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    };
    handleContentUpdate({ services: [...services, newService] });
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_: any, idx: number) => idx !== index);
    handleContentUpdate({ services: updatedServices });
  };

  if (!isEditing) {
    return (
      <section
        ref={sectionRef}
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-red-200 bg-red-50">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wider">
                {subtitle}
              </span>
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: titleColor }}
            >
              {title}
            </h2>

            {description && (
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed opacity-80"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Services Grid */}
          <div className={`grid gap-8 ${
            layout === 'masonry'
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {services.map((service: any, index: number) => (
              <div
                key={service.id}
                data-index={index}
                className={`group relative rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  animatedCards.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  backgroundColor: hoveredCard === service.id ? cardHoverColor : cardBackgroundColor,
                  boxShadow: hoveredCard === service.id
                    ? `0 20px 40px ${service.color}20, 0 0 0 1px ${service.color}30`
                    : '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated Background Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
                  }}
                />

                {/* Icon with Animation */}
                {showIcons && (
                  <div
                    className="relative z-10 mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color,
                      boxShadow: `0 0 20px ${service.color}30`
                    }}
                  >
                    {service.icon}
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-xl md:text-2xl font-bold mb-4 leading-tight"
                    style={{ color: titleColor }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-base leading-relaxed mb-6 opacity-80"
                    style={{ color: textColor }}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  {showFeatures && service.features && service.features.length > 0 && (
                    <div className="space-y-2">
                      {service.features.map((feature: any, featureIndex: number) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3 text-sm opacity-70 group-hover:opacity-90 transition-opacity"
                          style={{ color: textColor }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: service.color }}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover Effect Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}40, transparent)`,
                    padding: '2px'
                  }}
                >
                  <div className="w-full h-full rounded-2xl bg-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(239, 65, 48, 0.3); }
            50% { box-shadow: 0 0 40px rgba(239, 65, 48, 0.6); }
          }
        `}</style>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const previewServices = services.slice(0, 3);

    return (
      <section className="relative py-12 overflow-hidden rounded-lg" style={{ backgroundColor }}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-red-200 bg-red-50">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">
                {subtitle}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: titleColor }}>
              {title}
            </h2>
            {description && (
              <p className="text-base max-w-2xl mx-auto opacity-80" style={{ color: textColor }}>
                {description}
              </p>
            )}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewServices.map((service: any, index: number) => (
              <div
                key={index}
                className="rounded-xl p-6 transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: cardBackgroundColor,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}
              >
                {showIcons && (
                  <div
                    className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl text-xl"
                    style={{
                      backgroundColor: `${service.color}15`,
                      color: service.color
                    }}
                  >
                    {service.icon}
                  </div>
                )}

                <h3 className="text-lg font-bold mb-3" style={{ color: titleColor }}>
                  {service.title}
                </h3>

                <p className="text-sm opacity-80 mb-4" style={{ color: textColor }}>
                  {service.description}
                </p>

                {showFeatures && service.features && service.features.length > 0 && (
                  <div className="space-y-1">
                    {service.features.slice(0, 2).map((feature: any, featureIndex: number) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-xs opacity-70"
                        style={{ color: textColor }}
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

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
            Services Section Editor
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
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            >
              {renderPreview()}
              <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-gray-800 font-medium text-sm">Live Preview</span>
              </div>
            </motion.div>
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
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Content
                </h2>
                <button
                  type="button"
                  onClick={handleAddService}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Add Service
                </button>
              </div>
              <div className="space-y-6">
                <EditableText
                  label="📝 Title"
                  value={title}
                  onChange={(value) => handleContentUpdate({ title: value })}
                />
                <EditableText
                  label="📋 Subtitle"
                  value={subtitle}
                  onChange={(value) => handleContentUpdate({ subtitle: value })}
                />
                <EditableTextarea
                  label="📄 Description"
                  value={description}
                  onChange={(value) => handleContentUpdate({ description: value })}
                />
              </div>
            </motion.div>

            {/* Style Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Style
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <EditableColorPicker
                    label="🎨 Background Color"
                    value={backgroundColor}
                    onChange={(value) => handleContentUpdate({ backgroundColor: value })}
                  />
                  <EditableColorPicker
                    label="📋 Title Color"
                    value={titleColor}
                    onChange={(value) => handleContentUpdate({ titleColor: value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <EditableColorPicker
                    label="📝 Subtitle Color"
                    value={subtitleColor}
                    onChange={(value) => handleContentUpdate({ subtitleColor: value })}
                  />
                  <EditableColorPicker
                    label="📝 Text Color"
                    value={textColor}
                    onChange={(value) => handleContentUpdate({ textColor: value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <EditableColorPicker
                    label="📦 Card Background"
                    value={cardBackgroundColor}
                    onChange={(value) => handleContentUpdate({ cardBackgroundColor: value })}
                  />
                  <EditableColorPicker
                    label="✨ Card Hover Color"
                    value={cardHoverColor}
                    onChange={(value) => handleContentUpdate({ cardHoverColor: value })}
                  />
                </div>

                <div className="space-y-4">
                  <EditableText
                    label="📐 Layout"
                    value={layout}
                    onChange={(value) => handleContentUpdate({ layout: value })}
                    type="text"
                  />

                  <div className="space-y-3">
                    <EditableCheckbox
                      label="🎨 Show Icons"
                      checked={showIcons}
                      onChange={(value) => handleContentUpdate({ showIcons: value })}
                    />
                    <EditableCheckbox
                      label="✨ Show Features"
                      checked={showFeatures}
                      onChange={(value) => handleContentUpdate({ showFeatures: value })}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services List Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Services ({services.length})
              </h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {services.map((service: any, index: number) => (
                  <div key={service.id} className="rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-md font-semibold text-gray-900">Service {index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="text-sm text-red-600 transition hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <EditableText
                        label="📝 Title"
                        value={service.title}
                        onChange={(value) => handleServiceUpdate(index, { title: value })}
                      />
                      <EditableText
                        label="🎨 Icon"
                        value={service.icon}
                        onChange={(value) => handleServiceUpdate(index, { icon: value })}
                        placeholder="🎯"
                      />
                    </div>
                    <EditableTextarea
                      label="📄 Description"
                      value={service.description}
                      onChange={(value) => handleServiceUpdate(index, { description: value })}
                    />
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mt-3">
                      <EditableColorPicker
                        label="🎨 Color"
                        value={service.color}
                        onChange={(value) => handleServiceUpdate(index, { color: value })}
                      />
                      <EditableText
                        label="✨ Features (comma-separated)"
                        value={service.features.join(', ')}
                        onChange={(value) => handleServiceUpdate(index, { features: value.split(',').map((f) => f.trim()) })}
                        placeholder="Feature 1, Feature 2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};