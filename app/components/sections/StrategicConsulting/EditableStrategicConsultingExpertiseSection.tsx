"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { StrategicConsultingExpertiseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableStrategicConsultingExpertiseProps {
  section: StrategicConsultingExpertiseSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<StrategicConsultingExpertiseSection>) => void;
}

export default function EditableStrategicConsultingExpertiseSection({
  section,
  isEditing,
  onUpdate,
}: EditableStrategicConsultingExpertiseProps) {
  const content = section.content || {};
  const {
    title = "Our Expertise Areas",
    subtitle = "Deep Industry Knowledge and Specialized Skills",
    description = "With years of experience across multiple industries, our team brings specialized expertise to every consulting engagement.",
    expertiseAreas = [
      {
        id: "1",
        title: "Technology & Digital",
        description: "Leading digital transformation initiatives and technology strategy development.",
        year: "2020",
        icon: "💻",
        color: "#EF4130",
        skills: ["Digital Strategy", "Cloud Migration", "AI/ML Implementation", "Cybersecurity"],
        achievements: ["50+ Digital Transformations", "99.9% Success Rate"],
      },
      {
        id: "2",
        title: "Financial Services",
        description: "Expert guidance in banking, insurance, and fintech regulatory compliance.",
        year: "2018",
        icon: "🏦",
        color: "#d63324",
        skills: ["Regulatory Compliance", "Risk Management", "Financial Modeling", "M&A Advisory"],
        achievements: ["$2B+ Transaction Value", "100% Regulatory Compliance"],
      },
      {
        id: "3",
        title: "Healthcare & Life Sciences",
        description: "Navigating complex healthcare regulations and optimizing patient outcomes.",
        year: "2019",
        icon: "🏥",
        color: "#b52a1f",
        skills: ["Healthcare IT", "Clinical Operations", "Regulatory Affairs", "Patient Experience"],
        achievements: ["15 Healthcare Systems", "Improved Patient Satisfaction by 40%"],
      },
      {
        id: "4",
        title: "Manufacturing & Industrial",
        description: "Driving operational excellence and supply chain optimization in manufacturing.",
        year: "2017",
        icon: "🏭",
        color: "#EF4130",
        skills: ["Lean Manufacturing", "Supply Chain", "Industry 4.0", "Quality Management"],
        achievements: ["30% Cost Reduction", "50+ Manufacturing Facilities"],
      },
      {
        id: "5",
        title: "Retail & Consumer Goods",
        description: "Enhancing customer experience and optimizing retail operations.",
        year: "2021",
        icon: "🛍️",
        color: "#d63324",
        skills: ["Omnichannel Strategy", "Customer Analytics", "E-commerce", "Brand Strategy"],
        achievements: ["25% Revenue Growth", "Enhanced Customer Loyalty"],
      },
    ],
    backgroundColor = "#ffffff",
    textColor = "#000000",
    titleColor = "#000000",
    subtitleColor = "#EF4130",
    timelineColor = "#EF4130",
    showAchievements = true,
  } = content;

  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [visibleAreas, setVisibleAreas] = useState<Set<string>>(new Set());

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  // Animation observer for scroll-triggered animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-area-id');
            if (id) {
              setVisibleAreas(prev => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-area-id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [expertiseAreas]);

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

          {/* Timeline - Desktop Version */}
          <div className="hidden lg:block relative">
            {/* Timeline line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent"
              style={{ backgroundColor: timelineColor }}
            />

            {expertiseAreas.map((area, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleAreas.has(area.id);

              return (
                <div
                  key={area.id}
                  data-area-id={area.id}
                  className={`relative mb-16 ${isLeft ? 'text-right pr-8 md:pr-16' : 'text-left pl-8 md:pl-16 ml-auto'}`}
                  style={{
                    width: '50%',
                  }}
                >
                  {/* Year Badge - Replacing Dot */}
                  <div
                    className={`absolute w-20 h-20 rounded-full border-4 border-white shadow-2xl z-10 transform -translate-y-1/2 flex items-center justify-center transition-all duration-700 ${
                      isVisible 
                        ? 'scale-100 opacity-100 rotate-0' 
                        : 'scale-50 opacity-0 rotate-45'
                    }`}
                    style={{
                      backgroundColor: area.color,
                      [isLeft ? 'right' : 'left']: '-40px',
                      top: '50%',
                      boxShadow: `0 10px 30px ${area.color}40, 0 0 0 4px white`,
                    }}
                  >
                    <span className="text-white font-bold text-sm leading-tight text-center">
                      {area.year}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform cursor-pointer p-8 relative overflow-hidden group ${
                      isLeft ? 'mr-8' : 'ml-8'
                    } ${
                      isVisible
                        ? 'translate-y-0 opacity-100'
                        : isLeft
                        ? '-translate-y-10 opacity-0'
                        : 'translate-y-10 opacity-0'
                    }`}
                    onMouseEnter={() => setActiveArea(area.id)}
                    onMouseLeave={() => setActiveArea(null)}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Background pattern */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8 text-6xl"
                      style={{ color: area.color }}
                    >
                      {area.icon}
                    </div>

                    {/* Icon and title */}
                    <div className="flex items-center mb-4">
                      <div
                        className="text-4xl mr-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                        style={{ color: area.color }}
                      >
                        {area.icon}
                      </div>
                      <h3
                        className="text-2xl font-bold transition-colors duration-300"
                        style={{ color: area.color }}
                      >
                        {area.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {area.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-700 mb-3 text-lg">Key Skills:</h4>
                      <div className="flex flex-wrap gap-3">
                        {area.skills?.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 text-sm rounded-full border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {showAchievements && area.achievements && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-3 text-lg">Achievements:</h4>
                        <div className="space-y-3">
                          {area.achievements.map((achievement, idx) => (
                            <div 
                              key={idx} 
                              className="text-gray-600 flex items-center transition-all duration-300 hover:translate-x-2"
                            >
                              <span
                                className="w-3 h-3 rounded-full mr-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                                style={{ backgroundColor: area.color }}
                              />
                              <span className="text-base">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Hover effect overlay */}
                    <div
                      className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                        activeArea === area.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${area.color}15 0%, ${area.color}08 100%)`,
                      }}
                    />

                    {/* Shine effect */}
                    <div
                      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-1000 ${
                        activeArea === area.id ? 'translate-x-0' : '-translate-x-full'
                      }`}
                      style={{ opacity: 0.3 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Version */}
          <div className="lg:hidden space-y-8">
            {/* Timeline for mobile */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-1 transform -translate-x-1/2"
                style={{ backgroundColor: timelineColor }}
              />
              
              {expertiseAreas.map((area, index) => {
                const isVisible = visibleAreas.has(area.id);

                return (
                  <div
                    key={area.id}
                    data-area-id={area.id}
                    className="relative pl-20 pb-8"
                  >
                    {/* Year Badge for mobile */}
                    <div
                      className={`absolute left-0 w-14 h-14 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center transition-all duration-700 ${
                        isVisible 
                          ? 'scale-100 opacity-100' 
                          : 'scale-50 opacity-0'
                      }`}
                      style={{
                        backgroundColor: area.color,
                        transform: 'translateX(-50%)',
                        boxShadow: `0 5px 15px ${area.color}40, 0 0 0 3px white`,
                      }}
                    >
                      <span className="text-white font-bold text-xs text-center leading-tight">
                        {area.year}
                      </span>
                    </div>

                    {/* Content card for mobile */}
                    <div
                      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform cursor-pointer p-6 relative overflow-hidden group ${
                        isVisible
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-10 opacity-0'
                      }`}
                      onTouchStart={() => setActiveArea(area.id)}
                      onTouchEnd={() => setActiveArea(null)}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Background pattern */}
                      <div
                        className="absolute top-0 right-0 w-20 h-20 opacity-5 transform rotate-12 translate-x-4 -translate-y-4 text-4xl"
                        style={{ color: area.color }}
                      >
                        {area.icon}
                      </div>

                      {/* Icon and title */}
                      <div className="flex items-center mb-3">
                        <div
                          className="text-3xl mr-3 transition-all duration-300 group-hover:scale-110"
                          style={{ color: area.color }}
                        >
                          {area.icon}
                        </div>
                        <h3
                          className="text-xl font-bold"
                          style={{ color: area.color }}
                        >
                          {area.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {area.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {area.skills?.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {showAchievements && area.achievements && (
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-2 text-sm">Achievements:</h4>
                          <div className="space-y-2">
                            {area.achievements.map((achievement, idx) => (
                              <div key={idx} className="text-sm text-gray-600 flex items-center">
                                <span
                                  className="w-2 h-2 rounded-full mr-2 flex-shrink-0"
                                  style={{ backgroundColor: area.color }}
                                />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Hover effect overlay */}
                      <div
                        className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                          activeArea === area.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${area.color}10 0%, ${area.color}05 100%)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

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

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(239, 65, 48, 0.4);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(239, 65, 48, 0);
            }
          }

          .animate-pulse-glow {
            animation: pulseGlow 2s infinite;
          }
        `}</style>
      </section>
    );
  }

  // Render the preview section for editing mode
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

          {/* Mobile preview */}
          <div className="lg:hidden space-y-4">
            {expertiseAreas.slice(0, 2).map((area, index) => (
              <div
                key={area.id}
                className="flex items-center space-x-4 bg-white rounded-lg shadow-md p-4"
              >
                <div className="text-2xl">{area.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm">{area.title}</h3>
                  <p className="text-xs text-gray-600">{area.description?.substring(0, 60) || 'No description'}...</p>
                </div>
                <div 
                  className="text-xs text-white px-2 py-1 rounded-full font-bold"
                  style={{ backgroundColor: area.color }}
                >
                  {area.year}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop preview */}
          <div className="hidden lg:block space-y-4">
            {expertiseAreas.slice(0, 3).map((area, index) => (
              <div
                key={area.id}
                className="flex items-center justify-between bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{area.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{area.title}</h3>
                    <p className="text-sm text-gray-600">{area.description?.substring(0, 80) || 'No description'}...</p>
                  </div>
                </div>
                <div 
                  className="text-white px-3 py-2 rounded-full font-bold text-sm min-w-16 text-center"
                  style={{ backgroundColor: area.color }}
                >
                  {area.year}
                </div>
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
            Expertise Section Editor
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Content
              </h2>
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
                    label="📝 Text Color"
                    value={textColor}
                    onChange={(value) => handleContentUpdate({ textColor: value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <EditableColorPicker
                  label="⏱️ Timeline Color"
                  value={timelineColor}
                  onChange={(value) => handleContentUpdate({ timelineColor: value })}
                />

                <EditableCheckbox
                  label="🏆 Show Achievements"
                  checked={showAchievements}
                  onChange={(value) => handleContentUpdate({ showAchievements: value })}
                />
              </div>
            </motion.div>

            {/* Expertise Areas Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Expertise Areas ({expertiseAreas.length})
                </h2>
                <button
                  onClick={() => {
                    const newArea = {
                      id: Date.now().toString(),
                      title: "New Expertise Area",
                      description: "Description of expertise",
                      year: "2024",
                      icon: "✨",
                      color: "#EF4130",
                      skills: ["Skill 1", "Skill 2"],
                      achievements: ["Achievement 1"],
                    };
                    handleContentUpdate({ expertiseAreas: [...expertiseAreas, newArea] });
                  }}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Add Area
                </button>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {expertiseAreas.map((area, index) => (
                  <div key={area.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-semibold text-gray-900">Area {index + 1}</h5>
                      <button
                        onClick={() => {
                          const updatedAreas = expertiseAreas.filter((_, i) => i !== index);
                          handleContentUpdate({ expertiseAreas: updatedAreas });
                        }}
                        className="text-sm text-red-600 transition hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <EditableText
                        label="📝 Title"
                        value={area.title || ""}
                        onChange={(value) => {
                          const updatedAreas = [...expertiseAreas];
                          updatedAreas[index] = { ...updatedAreas[index], title: value };
                          handleContentUpdate({ expertiseAreas: updatedAreas });
                        }}
                      />
                      <EditableText
                        label="📅 Year"
                        value={area.year || ""}
                        onChange={(value) => {
                          const updatedAreas = [...expertiseAreas];
                          updatedAreas[index] = { ...updatedAreas[index], year: value };
                          handleContentUpdate({ expertiseAreas: updatedAreas });
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mt-3">
                      <EditableText
                        label="🎨 Icon"
                        value={area.icon || ""}
                        onChange={(value) => {
                          const updatedAreas = [...expertiseAreas];
                          updatedAreas[index] = { ...updatedAreas[index], icon: value };
                          handleContentUpdate({ expertiseAreas: updatedAreas });
                        }}
                      />
                      <EditableColorPicker
                        label="🎨 Color"
                        value={area.color || "#EF4130"}
                        onChange={(value) => {
                          const updatedAreas = [...expertiseAreas];
                          updatedAreas[index] = { ...updatedAreas[index], color: value };
                          handleContentUpdate({ expertiseAreas: updatedAreas });
                        }}
                      />
                    </div>

                    <EditableTextarea
                      label="📄 Description"
                      value={area.description || ""}
                      onChange={(value) => {
                        const updatedAreas = [...expertiseAreas];
                        updatedAreas[index] = { ...updatedAreas[index], description: value };
                        handleContentUpdate({ expertiseAreas: updatedAreas });
                      }}
                    />

                    <EditableText
                      label="✨ Skills (comma-separated)"
                      value={area.skills ? area.skills.join(", ") : ""}
                      onChange={(value) => {
                        const updatedAreas = [...expertiseAreas];
                        updatedAreas[index] = {
                          ...updatedAreas[index],
                          skills: value.split(",").map((s) => s.trim()).filter((s) => s),
                        };
                        handleContentUpdate({ expertiseAreas: updatedAreas });
                      }}
                    />

                    <EditableText
                      label="🏆 Achievements (comma-separated)"
                      value={area.achievements ? area.achievements.join(", ") : ""}
                      onChange={(value) => {
                        const updatedAreas = [...expertiseAreas];
                        updatedAreas[index] = {
                          ...updatedAreas[index],
                          achievements: value.split(",").map((a) => a.trim()).filter((a) => a),
                        };
                        handleContentUpdate({ expertiseAreas: updatedAreas });
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}