"use client";

import React, { useState } from "react";
import { OurCoreValuesSection } from "@/lib/db";
import { motion } from "framer-motion";
import { 
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
  EditableSelect
} from "@/app/components/EditableInputs";
import { 
  Shield, 
  Lightbulb, 
  Leaf, 
  Users, 
  Target,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface OurCoreValuesProps {
  section: OurCoreValuesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<OurCoreValuesSection>) => void;
}

const iconMap = {
  shield: Shield,
  lightbulb: Lightbulb,
  leaf: Leaf,
  users: Users,
  target: Target,
};

type IconType = keyof typeof iconMap;

export default function OurCoreValues({
  section,
  isEditing,
  onUpdate,
}: OurCoreValuesProps) {
  const content = section.content || {};
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleValueUpdate = (index: number, field: string, value: string) => {
    const values = [...(content.values || [])];
    values[index] = { ...values[index], [field]: value };
    handleContentUpdate({ values });
  };

  const addValue = () => {
    const values = [...(content.values || [])];
    values.push({
      number: values.length + 1,
      title: "New Value",
      description: "Description of this value...",
      icon: "target" as IconType,
    });
    handleContentUpdate({ values });
  };

  const removeValue = (index: number) => {
    const values = content.values?.filter((_: unknown, i: number) => i !== index) || [];
    const renumberedValues = values.map((value: { number?: number; title?: string; description?: string; icon?: IconType }, i: number) => ({
      ...value,
      number: i + 1,
    }));
    handleContentUpdate({ values: renumberedValues });
  };

  const moveValue = (index: number, direction: 'up' | 'down') => {
    const values = [...(content.values || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= values.length) return;
    
    [values[index], values[newIndex]] = [values[newIndex], values[index]];
    const renumberedValues = values.map((value, i) => ({
      ...value,
      number: i + 1,
    }));
    handleContentUpdate({ values: renumberedValues });
  };

  if (!isEditing) {
    const {
      title = "Our Core Values",
      subtitle = "At RAUS, our values define who we are, guide every decision we make and inspire the impact we aim to create. We believe in building more than projects — we build trust, responsibility and a legacy of sustainable progress.",
      backgroundColor = "#ffffff",
      titleColor = "#EF4130",
      subtitleColor = "#333333",
      cardBackgroundColor = "#ffffff",
      cardTextColor = "#333333",
      cardTitleColor = "#EF4130",
      accentColor = "#EF4130",
      animationEnabled = true,
      cardStyle = "elevated",
      layout = "grid",
      values = [
        {
          number: 1,
          title: "Integrity in Every Action",
          description: "We operate with transparency, honesty and accountability — ensuring that every partnership, process and project reflects the highest ethical standards. Integrity isn't just a principle at RAUS; it's our foundation for lasting relationships.",
          icon: "shield" as IconType,
        },
        {
          number: 2,
          title: "Innovation with Purpose",
          description: "We embrace emerging technologies, data intelligence and creative thinking not for novelty, but for meaningful progress. Every innovation we adopt drives efficiency, enhances performance and creates value that endures.",
          icon: "lightbulb" as IconType,
        },
        {
          number: 3,
          title: "Sustainability as a Standard",
          description: "Sustainability is embedded in everything we do — from design and material selection to operations and governance. We go beyond compliance to champion circular economy practices, low-carbon solutions and community well-being.",
          icon: "leaf" as IconType,
        },
        {
          number: 4,
          title: "Collaboration for Collective Success",
          description: "We believe the best outcomes come from shared vision and teamwork. Our multidisciplinary approach unites experts, partners and communities to deliver integrated, future-ready solutions that serve people and the planet.",
          icon: "users" as IconType,
        },
        {
          number: 5,
          title: "Excellence through Accountability",
          description: "We strive for excellence in every deliverable, guided by data, precision and responsibility. Each milestone is measured not just by results, but by the value it adds to our clients, our communities and the environment.",
          icon: "target" as IconType,
        },
      ],
    } = content;

    const cardStyles = {
      elevated: "bg-white shadow-xl hover:shadow-2xl border border-gray-100",
      flat: "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200",
      outlined: "bg-white border-2 hover:border-4",
      gradient: "bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl border border-gray-100",
    };

    const layoutStyles = {
      grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
      list: "flex flex-col space-y-6",
      masonry: "columns-1 md:columns-2 lg:columns-3 gap-8",
    };

    return (
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating orbs */}
          <div
            className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent)`,
              animation: animationEnabled ? 'float 20s ease-in-out infinite' : 'none',
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent)`,
              animation: animationEnabled ? 'float 15s ease-in-out infinite 5s' : 'none',
            }}
          />
          
          {/* Decorative lines */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={accentColor} strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -30px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulse-subtle {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(200%) rotate(45deg); }
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
              <div className="relative inline-block mb-6">
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
              <p 
                className="text-lg md:text-xl leading-relaxed mt-8"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Values Grid/List */}
          <div className={layoutStyles[layout as keyof typeof layoutStyles] || layoutStyles.grid}>
            {values.map((value: { number?: number; title?: string; description?: string; icon?: IconType }, index: number) => {
              const IconComponent = iconMap[value.icon || 'target'];
              
              return (
                <div
                  key={index}
                  className={`
                    group relative overflow-hidden rounded-2xl p-8 transition-all duration-500
                    ${cardStyles[cardStyle as keyof typeof cardStyles] || cardStyles.elevated}
                    ${animationEnabled ? 'hover:scale-105' : ''}
                    ${layout === 'masonry' ? 'break-inside-avoid mb-8' : ''}
                  `}
                  style={{ 
                    backgroundColor: cardBackgroundColor,
                    borderColor: accentColor,
                    animationDelay: animationEnabled ? `${index * 0.1}s` : '0s',
                    animationFillMode: 'both',
                  }}
                >
                  {/* Shimmer effect on hover */}
                  {animationEnabled && (
                    <div 
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accentColor}15, transparent)`,
                      }}
                    />
                  )}

                  {/* Number Badge */}
                  <div 
                    className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg"
                    style={{ 
                      backgroundColor: `${accentColor}15`,
                      color: accentColor,
                    }}
                  >
                    {value.number}
                  </div>

                  {/* Icon */}
                  <div 
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}
                    style={{ 
                      backgroundColor: `${accentColor}10`,
                    }}
                  >
                    <IconComponent 
                      className={`w-8 h-8 ${animationEnabled ? 'group-hover:rotate-12 transition-transform duration-300' : ''}`}
                      style={{ color: accentColor }}
                    />
                    {/* Icon glow effect */}
                    <div 
                      className={`absolute inset-0 rounded-xl blur-xl opacity-0 ${animationEnabled ? 'group-hover:opacity-30' : ''} transition-opacity duration-300`}
                      style={{ backgroundColor: accentColor }}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 
                      className="text-2xl font-bold mb-4 leading-tight"
                      style={{ color: cardTitleColor }}
                    >
                      {value.title}
                    </h3>
                    
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: cardTextColor }}
                    >
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative corner accent */}
                  <div 
                    className="absolute bottom-0 right-0 w-32 h-32 opacity-5"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${accentColor}, transparent 70%)`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const renderPreview = () => {
    const {
      title = "Our Core Values",
      subtitle = "At RAUS, our values define who we are, guide every decision we make and inspire the impact we aim to create.",
      backgroundColor = "#ffffff",
      titleColor = "#EF4130",
      cardBackgroundColor = "#ffffff",
      cardTitleColor = "#EF4130",
      accentColor = "#EF4130",
      values = [],
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
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              {subtitle.length > 200 ? `${subtitle.substring(0, 200)}...` : subtitle}
            </p>
          )}
        </div>

        {/* Preview Values - Show first 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.slice(0, 3).map((value: { number?: number; title?: string; description?: string; icon?: IconType }, index: number) => {
            const IconComponent = iconMap[value.icon || 'target'];
            
            return (
              <div
                key={index}
                className="relative rounded-xl p-6 shadow-md border"
                style={{ 
                  backgroundColor: cardBackgroundColor,
                  borderColor: `${accentColor}30`,
                }}
              >
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ 
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                  }}
                >
                  {value.number}
                </div>

                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${accentColor}10` }}
                >
                  <IconComponent 
                    className="w-6 h-6"
                    style={{ color: accentColor }}
                  />
                </div>

                <h3 
                  className="text-lg font-bold mb-2"
                  style={{ color: cardTitleColor }}
                >
                  {value.title}
                </h3>
                
                <p className="text-sm text-gray-600 line-clamp-3">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {values.length > 3 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            + {values.length - 3} more value{values.length - 3 !== 1 ? 's' : ''}
          </p>
        )}
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
              label="Section Title"
              value={content.title || ""}
              onChange={(value: any) => handleContentUpdate({ title: value })}
              placeholder="Our Core Values"
            />

            <EditableTextarea
              label="Subtitle / Description"
              value={content.subtitle || ""}
              onChange={(value: any) => handleContentUpdate({ subtitle: value })}
              rows={4}
              placeholder="At RAUS, our values define who we are..."
            />
          </div>
        </div>

        {/* Style Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Colors & Styling
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Section Colors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableColorPicker
                  label="Background Color"
                  value={content.backgroundColor || "#ffffff"}
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
                  value={content.subtitleColor || "#333333"}
                  onChange={(value: any) => handleContentUpdate({ subtitleColor: value })}
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                Card Colors
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableColorPicker
                  label="Card Background"
                  value={content.cardBackgroundColor || "#ffffff"}
                  onChange={(value: any) => handleContentUpdate({ cardBackgroundColor: value })}
                />

                <EditableColorPicker
                  label="Card Title Color"
                  value={content.cardTitleColor || "#EF4130"}
                  onChange={(value: any) => handleContentUpdate({ cardTitleColor: value })}
                />

                <EditableColorPicker
                  label="Card Text Color"
                  value={content.cardTextColor || "#333333"}
                  onChange={(value: any) => handleContentUpdate({ cardTextColor: value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Layout Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Layout & Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableSelect
              label="Card Style"
              value={content.cardStyle || "elevated"}
              onChange={(value: any) => handleContentUpdate({ cardStyle: value })}
              options={[
                { value: "elevated", label: "Elevated (Shadow)" },
                { value: "flat", label: "Flat" },
                { value: "outlined", label: "Outlined" },
                { value: "gradient", label: "Gradient" }
              ]}
            />

            <EditableSelect
              label="Layout Style"
              value={content.layout || "grid"}
              onChange={(value: any) => handleContentUpdate({ layout: value })}
              options={[
                { value: "grid", label: "Grid" },
                { value: "list", label: "List" },
                { value: "masonry", label: "Masonry" }
              ]}
            />

            <EditableCheckbox
              label="Enable Animations"
              checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
              onChange={(checked) => handleContentUpdate({ animationEnabled: checked })}
            />
          </div>
        </div>

        {/* Core Values Management */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Core Values
            </h3>
            <button
              onClick={addValue}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {(content.values || []).map((value: { number?: number; title?: string; description?: string; icon?: IconType }, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {/* Value Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-move flex-shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm">
                      Value {value.number}
                    </span>
                    <span className="text-xs text-gray-600 truncate flex-1">{value.title}</span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {expandedCard === index ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => moveValue(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                      title="Move up"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveValue(index, 'down')}
                      disabled={index === (content.values?.length || 0) - 1}
                      className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
                      title="Move down"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeValue(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Remove value"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedCard === index && (
                  <div className="space-y-3 pt-3 border-t border-gray-200">
                    <div className="grid grid-cols-1 gap-3">
                      <EditableText
                        label="Title"
                        value={value.title || ""}
                        onChange={(value: any) => handleValueUpdate(index, 'title', value)}
                        placeholder="Value Title"
                      />

                      <EditableSelect
                        label="Icon"
                        value={value.icon || "target"}
                        onChange={(value: any) => handleValueUpdate(index, 'icon', value)}
                        options={[
                          { value: "shield", label: "Shield (Integrity)" },
                          { value: "lightbulb", label: "Lightbulb (Innovation)" },
                          { value: "leaf", label: "Leaf (Sustainability)" },
                          { value: "users", label: "Users (Collaboration)" },
                          { value: "target", label: "Target (Excellence)" }
                        ]}
                      />
                    </div>

                    <EditableTextarea
                      label="Description"
                      value={value.description || ""}
                      onChange={(value: any) => handleValueUpdate(index, 'description', value)}
                      rows={3}
                      placeholder="Describe this core value..."
                    />
                  </div>
                )}
              </div>
            ))}

            {(!content.values || content.values.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm mb-3">No core values added yet</p>
                <button
                  onClick={addValue}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Value
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
