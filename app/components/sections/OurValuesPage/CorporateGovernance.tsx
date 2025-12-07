"use client";

import React, { useState } from "react";
import { CorporateGovernanceSection } from "@/lib/db";
import { motion } from "framer-motion";
import MediaUpload from "../../MediaUpload";
import { 
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
  EditableSelect
} from "@/app/components/EditableInputs";
import { 
  Shield, 
  Eye, 
  FileCheck, 
  Users,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical
} from "lucide-react";

interface CorporateGovernanceProps {
  section: CorporateGovernanceSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<CorporateGovernanceSection>) => void;
}

// Icon mapping
const iconMap = {
  shield: Shield,
  eye: Eye,
  filecheck: FileCheck,
  users: Users,
};

type IconType = keyof typeof iconMap;

export default function CorporateGovernance({
  section,
  isEditing,
  onUpdate,
}: CorporateGovernanceProps) {
  const content = section.content || {};
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(null);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePrincipleUpdate = (index: number, field: string, value: string) => {
    const principles = [...(content.principles || [])];
    principles[index] = { ...principles[index], [field]: value };
    handleContentUpdate({ principles });
  };

  const addPrinciple = () => {
    const principles = [...(content.principles || [])];
    principles.push({
      title: "New Principle",
      description: "Description of this governance principle...",
      icon: "shield" as IconType,
    });
    handleContentUpdate({ principles });
  };

  const removePrinciple = (index: number) => {
    const principles = content.principles?.filter((_: unknown, i: number) => i !== index) || [];
    handleContentUpdate({ principles });
  };

  const movePrinciple = (index: number, direction: 'up' | 'down') => {
    const principles = [...(content.principles || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= principles.length) return;
    
    [principles[index], principles[newIndex]] = [principles[newIndex], principles[index]];
    handleContentUpdate({ principles });
  };

  if (!isEditing) {
    const {
      title = "Corporate Governance",
      subtitle = "Building Trust Through Transparency",
      description = "Corporate governance at RAUS is not a compliance checklist — it's our promise of integrity, responsibility and accountability. It ensures that we innovate boldly, partner responsibly and deliver long-term value for all stakeholders.",
      frameworkTitle = "Governance Framework",
      backgroundImage,
      backgroundColor = "#f9fafb",
      titleColor = "#EF4130",
      subtitleColor = "#1f2937",
      descriptionColor = "#4b5563",
      accentColor = "#EF4130",
      cardBackgroundColor = "#ffffff",
      cardTextColor = "#374151",
      cardTitleColor = "#1f2937",
      animationEnabled = true,
      showBackgroundImage = true,
      imagePosition = "right",
      principles = [
        {
          title: "Ethical Oversight",
          description: "Every project and partnership is guided by clearly defined ethical standards.",
          icon: "shield" as IconType,
        },
        {
          title: "Transparency",
          description: "Our processes are traceable, auditable and fully aligned with international governance best practices.",
          icon: "eye" as IconType,
        },
        {
          title: "Accountability",
          description: "Board-level oversight ensures all actions reflect RAUS's core mission and societal responsibilities.",
          icon: "filecheck" as IconType,
        },
        {
          title: "Inclusivity",
          description: "We foster diversity across leadership and decision-making, with growing representation among women and local stakeholders.",
          icon: "users" as IconType,
        },
      ],
    } = content;

    return (
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute inset-0">
            {/* Geometric pattern */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="governance-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path 
                    d="M 60 0 L 0 0 0 60" 
                    fill="none" 
                    stroke={accentColor} 
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#governance-grid)" />
            </svg>
          </div>

          {/* Animated orbs */}
          <div
            className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accentColor}15, transparent 70%)`,
              animation: animationEnabled ? 'float-slow 25s ease-in-out infinite' : 'none',
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${accentColor}10, transparent 70%)`,
              animation: animationEnabled ? 'float-slow 20s ease-in-out infinite 5s' : 'none',
            }}
          />
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -40px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.95); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes pulse-ring {
            0% { transform: scale(0.9); opacity: 1; }
            100% { transform: scale(1.3); opacity: 0; }
          }
          @keyframes shine {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <div 
            className={`text-center max-w-4xl mx-auto mb-16 ${
              animationEnabled ? 'animate-fadeInUp' : ''
            }`}
          >
            {title && (
              <div className="relative inline-block mb-4">
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  style={{ color: titleColor }}
                >
                  {title}
                </h2>
                {/* Decorative underline with animation */}
                <div className="relative mt-4 h-1.5 w-40 mx-auto rounded-full overflow-hidden" style={{ backgroundColor: `${accentColor}30` }}>
                  <div 
                    className="absolute inset-0 h-full w-1/2 rounded-full"
                    style={{ 
                      backgroundColor: accentColor,
                      animation: animationEnabled ? 'shimmer 2s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>
              </div>
            )}
            
            {subtitle && (
              <h3 
                className="text-2xl md:text-3xl font-semibold mb-6"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </h3>
            )}

            {description && (
              <p 
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: descriptionColor }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Main Content Layout */}
          <div className={`grid grid-cols-1 ${showBackgroundImage && backgroundImage ? 'lg:grid-cols-2' : 'lg:grid-cols-1'} gap-12 items-center`}>
            {/* Framework Section */}
            <div 
              className={`
                ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}
              `}
              style={{ 
                animationDelay: '0.3s',
                animationFillMode: 'both',
              }}
            >
              {frameworkTitle && (
                <h3 
                  className="text-3xl md:text-4xl font-bold mb-8"
                  style={{ color: titleColor }}
                >
                  {frameworkTitle}
                </h3>
              )}

              {/* Principles List */}
              <div className="space-y-6">
                {principles.map((principle: { title?: string; description?: string; icon?: IconType }, index: number) => {
                  const IconComponent = iconMap[principle.icon || 'shield'];
                  
                  return (
                    <div
                      key={index}
                      className={`
                        group relative rounded-2xl p-6 transition-all duration-500
                        shadow-md hover:shadow-xl border-l-4
                        ${animationEnabled ? 'hover:translate-x-2' : ''}
                      `}
                      style={{ 
                        backgroundColor: cardBackgroundColor,
                        borderLeftColor: accentColor,
                        animationDelay: animationEnabled ? `${0.5 + index * 0.1}s` : '0s',
                        animationFillMode: 'both',
                      }}
                    >
                      {/* Background shimmer effect */}
                      {animationEnabled && (
                        <div 
                          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl overflow-hidden"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${accentColor}08, transparent)`,
                          }}
                        />
                      )}

                      <div className="flex items-start gap-4 relative z-10">
                        {/* Icon Container */}
                        <div className="relative flex-shrink-0">
                          <div 
                            className={`
                              w-14 h-14 rounded-xl flex items-center justify-center
                              ${animationEnabled ? 'group-hover:scale-110' : ''}
                              transition-transform duration-300
                            `}
                            style={{ backgroundColor: `${accentColor}15` }}
                          >
                            <IconComponent 
                              className="w-7 h-7"
                              style={{ color: accentColor }}
                            />
                          </div>
                          
                          {/* Pulse ring on hover */}
                          {animationEnabled && (
                            <div 
                              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                              style={{
                                border: `2px solid ${accentColor}`,
                                animation: 'pulse-ring 1.5s ease-out infinite',
                              }}
                            />
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                          <h4 
                            className="text-xl font-bold mb-2"
                            style={{ color: cardTitleColor }}
                          >
                            {principle.title}
                          </h4>
                          <p 
                            className="text-base leading-relaxed"
                            style={{ color: cardTextColor }}
                          >
                            {principle.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom accent line */}
                      <div 
                        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image Section */}
            {showBackgroundImage && backgroundImage && (
              <div 
                className={`
                  relative h-full
                  ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}
                  ${animationEnabled ? (imagePosition === 'right' ? 'animate-fadeInRight' : 'animate-fadeInLeft') : ''}
                `}
                style={{ 
                  animationDelay: '0.4s',
                  animationFillMode: 'both',
                }}
              >
                {/* Image container */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl group">
                  <img
                    src={backgroundImage}
                    alt={title}
                    className={`w-full h-full object-cover ${animationEnabled ? 'group-hover:scale-110 ' : ''} transition-all duration-700 ease-out`}
                  />
                  
                  {/* Hover overlay with subtle gradient */}
                  <div 
                    className={`absolute inset-0 bg-black/0 ${animationEnabled ? 'group-hover:bg-black/10' : ''} transition-all duration-500`}
                  />

                  {/* Animated border on hover */}
                  <div 
                    className={`absolute inset-0 border-4 border-transparent ${animationEnabled ? 'group-hover:border-white/30' : ''} rounded-2xl transition-all duration-500 pointer-events-none`}
                  />

                  {/* Shine effect on hover */}
                  {animationEnabled && (
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                        animation: 'shine 1.5s ease-in-out',
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "Corporate Governance",
      subtitle = "Building Trust Through Transparency",
      description = "Corporate governance at RAUS is not a compliance checklist — it's our promise of integrity, responsibility and accountability.",
      frameworkTitle = "Governance Framework",
      backgroundImage,
      backgroundColor = "#f9fafb",
      titleColor = "#EF4130",
      accentColor = "#EF4130",
      showBackgroundImage = true,
      principles = [],
    } = content;

    return (
      <section 
        className="p-8 rounded-lg"
        style={{ backgroundColor }}
      >
        {/* Preview Header */}
        <div className="text-center mb-8">
          {title && (
            <h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
          )}
          
          {subtitle && (
            <h3 className="text-xl font-semibold mb-3 text-gray-700">
              {subtitle}
            </h3>
          )}

          {description && (
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {description.length > 150 ? `${description.substring(0, 150)}...` : description}
            </p>
          )}
        </div>

        {/* Preview Content */}
        <div className={`grid grid-cols-1 ${showBackgroundImage && backgroundImage ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8`}>
          <div>
            {frameworkTitle && (
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: titleColor }}
              >
                {frameworkTitle}
              </h3>
            )}

            <div className="space-y-4">
              {principles.slice(0, 3).map((principle: { title?: string; description?: string; icon?: IconType }, index: number) => {
                const IconComponent = iconMap[principle.icon || 'shield'];
                
                return (
                  <div
                    key={index}
                    className="rounded-xl p-4 shadow-sm border-l-4"
                    style={{ 
                      backgroundColor: "#ffffff",
                      borderLeftColor: accentColor,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${accentColor}15` }}
                      >
                        <IconComponent 
                          className="w-5 h-5"
                          style={{ color: accentColor }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base font-bold mb-1 text-gray-900">
                          {principle.title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {principles.length > 3 && (
                <p className="text-sm text-gray-500 text-center">
                  + {principles.length - 3} more principle{principles.length - 3 !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {showBackgroundImage && backgroundImage && (
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src={backgroundImage}
                alt={title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-red-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8">
          {renderPreview()}
        </div>
      </motion.div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header Content Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Header Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(value: any) => handleContentUpdate({ title: value })}
              placeholder="Corporate Governance"
            />

            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(value: any) => handleContentUpdate({ subtitle: value })}
              placeholder="Building Trust Through Transparency"
            />

            <EditableTextarea
              label="Description"
              value={content.description || ""}
              onChange={(value: any) => handleContentUpdate({ description: value })}
              rows={4}
              placeholder="Corporate governance at RAUS is not a compliance checklist..."
            />

            <EditableText
              label="Framework Title"
              value={content.frameworkTitle || ""}
              onChange={(value: any) => handleContentUpdate({ frameworkTitle: value })}
              placeholder="Governance Framework"
            />
          </div>
        </div>

        {/* Background Image & Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Media & Background
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Governance Image"
              type="image"
              currentUrl={content.backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
              onRemove={() => handleContentUpdate({ backgroundImage: '' })}
              placeholder="Upload or paste image URL..."
            />

            {content.backgroundImage && (
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                <img src={content.backgroundImage} alt="Preview" className="h-40 w-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableCheckbox
                label="Show Background Image"
                checked={content.showBackgroundImage !== undefined ? content.showBackgroundImage : true}
                onChange={(checked) => handleContentUpdate({ showBackgroundImage: checked })}
              />

              <EditableSelect
                label="Image Position"
                value={content.imagePosition || "right"}
                onChange={(value: any) => handleContentUpdate({ imagePosition: value })}
                options={[
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Style Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Style Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "#f9fafb"}
              onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
            />

            <EditableColorPicker
              label="Accent Color"
              value={content.accentColor || "#EF4130"}
              onChange={(value: any) => handleContentUpdate({ accentColor: value })}
            />

            <EditableColorPicker
              label="Title Color"
              value={content.titleColor || "#EF4130"}
              onChange={(value: any) => handleContentUpdate({ titleColor: value })}
            />

            <EditableColorPicker
              label="Subtitle Color"
              value={content.subtitleColor || "#1f2937"}
              onChange={(value: any) => handleContentUpdate({ subtitleColor: value })}
            />

            <EditableColorPicker
              label="Description Color"
              value={content.descriptionColor || "#4b5563"}
              onChange={(value: any) => handleContentUpdate({ descriptionColor: value })}
            />

            <EditableColorPicker
              label="Card Background Color"
              value={content.cardBackgroundColor || "#ffffff"}
              onChange={(value: any) => handleContentUpdate({ cardBackgroundColor: value })}
            />

            <EditableColorPicker
              label="Card Title Color"
              value={content.cardTitleColor || "#1f2937"}
              onChange={(value: any) => handleContentUpdate({ cardTitleColor: value })}
            />

            <EditableColorPicker
              label="Card Text Color"
              value={content.cardTextColor || "#374151"}
              onChange={(value: any) => handleContentUpdate({ cardTextColor: value })}
            />
          </div>

          <div className="flex items-center gap-4 mt-4">
            <EditableCheckbox
              label="Enable Animations"
              checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
              onChange={(checked) => handleContentUpdate({ animationEnabled: checked })}
            />
          </div>
        </div>

        {/* Governance Principles Management */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Governance Principles
            </h3>
            <button
              onClick={addPrinciple}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {(content.principles || []).map((principle: { title?: string; description?: string; icon?: IconType }, index: number) => (
              <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 space-y-4 bg-gray-50"
                >
                  {/* Principle Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                      <span className="font-semibold text-gray-900">
                        {principle.title || `Principle ${index + 1}`}
                      </span>
                      <button
                        onClick={() => setExpandedPrinciple(expandedPrinciple === index ? null : index)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        {expandedPrinciple === index ? (
                          <ChevronUp className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => movePrinciple(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => movePrinciple(index, 'down')}
                        disabled={index === (content.principles?.length || 0) - 1}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removePrinciple(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Remove principle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedPrinciple === index && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <EditableText
                          label="Title"
                          value={principle.title || ""}
                          onChange={(value: any) => handlePrincipleUpdate(index, 'title', value)}
                          placeholder="Principle Title"
                        />

                        <EditableSelect
                          label="Icon"
                          value={principle.icon || "shield"}
                          onChange={(value: any) => handlePrincipleUpdate(index, 'icon', value)}
                          options={[
                            { value: "shield", label: "Shield (Ethical)" },
                            { value: "eye", label: "Eye (Transparency)" },
                            { value: "filecheck", label: "File Check (Accountability)" },
                            { value: "users", label: "Users (Inclusivity)" }
                          ]}
                        />
                      </div>

                      <EditableTextarea
                        label="Description"
                        value={principle.description || ""}
                        onChange={(value: any) => handlePrincipleUpdate(index, 'description', value)}
                        rows={3}
                        placeholder="Describe this principle..."
                      />
                    </div>
                  )}
                </div>
              ))}

            {(!content.principles || content.principles.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm mb-3">No governance principles added yet</p>
                <button
                  onClick={addPrinciple}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Principle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
