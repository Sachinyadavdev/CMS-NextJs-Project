"use client";

import React, { useState } from "react";
import { DigitalGovernanceSection } from "@/lib/db";
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
  Monitor, 
  Users, 
  Award, 
  Book,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  GripVertical,
  Sparkles
} from "lucide-react";

interface DigitalGovernanceProps {
  section: DigitalGovernanceSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<DigitalGovernanceSection>) => void;
}

const iconMap = {
  monitor: Monitor,
  users: Users,
  award: Award,
  book: Book,
};

type IconType = keyof typeof iconMap;

export default function DigitalGovernance({
  section,
  isEditing,
  onUpdate,
}: DigitalGovernanceProps) {
  const content = section.content || {};
  const [expandedInitiative, setExpandedInitiative] = useState<number | null>(null);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleInitiativeUpdate = (index: number, field: string, value: string | undefined) => {
    const initiatives = [...(content.initiatives || [])];
    initiatives[index] = { ...initiatives[index], [field]: value };
    handleContentUpdate({ initiatives });
  };

  const addInitiative = () => {
    const initiatives = [...(content.initiatives || [])];
    initiatives.push({
      title: "New Initiative",
      description: "Description of this digital governance initiative...",
      icon: "monitor" as IconType,
      backgroundImage: undefined,
    });
    handleContentUpdate({ initiatives });
  };

  const removeInitiative = (index: number) => {
    const initiatives = content.initiatives?.filter((_: unknown, i: number) => i !== index) || [];
    handleContentUpdate({ initiatives });
  };

  const moveInitiative = (index: number, direction: 'up' | 'down') => {
    const initiatives = [...(content.initiatives || [])];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= initiatives.length) return;
    
    [initiatives[index], initiatives[newIndex]] = [initiatives[newIndex], initiatives[index]];
    handleContentUpdate({ initiatives });
  };

  if (!isEditing) {
    const {
      title = "Digital Governance Initiatives",
      description = "Our governance ecosystem is enhanced through digital transformation, ensuring clarity, speed and engagement.",
      backgroundColor = "#0a0a0a",
      titleColor = "#ffffff",
      descriptionColor = "#a3a3a3",
      accentColor = "#EF4130",
      cardBackgroundColor = "#1a1a1a",
      cardHoverColor = "#252525",
      cardTextColor = "#d4d4d4",
      cardTitleColor = "#ffffff",
      cardBorderColor = "#2a2a2a",
      animationEnabled = true,
      initiatives = [
        {
          title: "Interactive Governance Dashboard",
          description: "Real-time visibility into compliance metrics, sustainability indicators and performance benchmarks.",
          icon: "monitor" as IconType,
          backgroundImage: undefined,
        },
        {
          title: "Stakeholder Engagement Forums",
          description: "Regular virtual and in-person workshops where partners, clients and communities share feedback and shape our growth roadmap.",
          icon: "users" as IconType,
          backgroundImage: undefined,
        },
        {
          title: "Governance Excellence Recognition",
          description: "Annual awards celebrating teams that demonstrate exceptional transparency, responsibility and ethical conduct.",
          icon: "award" as IconType,
          backgroundImage: undefined,
        },
        {
          title: "Digital Governance Playbook",
          description: "A living document that defines our governance philosophy — accessible, measurable and adaptable to evolving global standards.",
          icon: "book" as IconType,
          backgroundImage: undefined,
        },
      ],
    } = content;

    return (
      <section 
        className="relative py-20 lg:py-32 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${accentColor} 1px, transparent 1px),
              linear-gradient(90deg, ${accentColor} 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: animationEnabled ? 'gridMove 20s linear infinite' : 'none',
          }}
        />

        {/* Glowing orbs */}
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ 
            backgroundColor: accentColor,
            animation: animationEnabled ? 'float-slow 12s ease-in-out infinite' : 'none',
          }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ 
            backgroundColor: accentColor,
            animation: animationEnabled ? 'float-slow 15s ease-in-out infinite 3s' : 'none',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <div 
            className={`text-center mb-16 lg:mb-20 ${animationEnabled ? 'animate-fadeInUp' : ''}`}
          >
            <div className="relative inline-block mb-6">
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
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
            <p 
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: descriptionColor }}
            >
              {description}
            </p>
          </div>

          {/* Initiatives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {initiatives.map((initiative: { title: string; description: string; icon: IconType; backgroundImage?: string }, index: number) => {
              const IconComponent = iconMap[initiative.icon] || Monitor;
              const delay = index * 0.1;
              
              return (
                <div
                  key={index}
                  className={`
                    group relative overflow-hidden rounded-2xl
                    transition-all duration-500
                    ${animationEnabled ? 'animate-fadeInUp hover:shadow-2xl' : ''}
                  `}
                  style={{
                    backgroundColor: cardBackgroundColor,
                    borderWidth: '1px',
                    borderColor: cardBorderColor,
                    animationDelay: `${delay}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {/* Background Image */}
                  {initiative.backgroundImage && (
                    <div className="absolute inset-0">
                      <img
                        src={initiative.backgroundImage}
                        alt={initiative.title}
                        className="w-full h-full object-cover opacity-18"
                      />
                      <div 
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${cardBackgroundColor}b3, ${cardBackgroundColor}99)`,
                        }}
                      />
                    </div>
                  )}

                  {/* Hover gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}08, transparent)`,
                    }}
                  />

                  {/* Card content */}
                  <div className="relative p-8 lg:p-10">
                    {/* Icon with glow effect */}
                    <div className="relative mb-6 inline-block">
                      <div 
                        className="absolute inset-0 rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"
                        style={{ backgroundColor: accentColor }}
                      />
                      <div 
                        className="relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 border-2"
                        style={{ backgroundColor: `${accentColor}15`, borderColor: '#FEEFEE' }}
                      >
                        <IconComponent 
                          className="w-8 h-8 transition-all duration-300 group-hover:scale-125"
                          style={{ color: accentColor }}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-xl lg:text-2xl font-bold mb-4 transition-colors duration-300"
                      style={{ color: cardTitleColor }}
                    >
                      {initiative.title}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-base leading-relaxed transition-colors duration-300"
                      style={{ color: cardTextColor }}
                    >
                      {initiative.description}
                    </p>
                  </div>

                  {/* Corner sparkle on hover */}
                  <Sparkles 
                    className="absolute top-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12"
                    style={{ color: accentColor }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-30px) translateX(20px); }
            66% { transform: translateY(30px) translateX(-20px); }
          }
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 50px 50px; }
          }
        `}</style>
      </section>
    );
  }

  const {
    title = "Digital Governance Initiatives",
    description = "Our governance ecosystem is enhanced through digital transformation, ensuring clarity, speed and engagement.",
    backgroundColor = "#0a0a0a",
    titleColor = "#ffffff",
    descriptionColor = "#a3a3a3",
    accentColor = "#EF4130",
    cardBackgroundColor = "#1a1a1a",
    cardHoverColor = "#252525",
    cardTextColor = "#d4d4d4",
    cardTitleColor = "#ffffff",
    cardBorderColor = "#2a2a2a",
    animationEnabled = true,
    initiatives = [],
  } = content;

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
          <section 
            className="relative py-20 lg:py-32 overflow-hidden"
            style={{ backgroundColor: content.backgroundColor || '#0a0a0a' }}
          >
            {/* Animated grid background */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(${content.accentColor || '#EF4130'} 1px, transparent 1px),
                  linear-gradient(90deg, ${content.accentColor || '#EF4130'} 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                animation: content.animationEnabled ? 'gridMove 20s linear infinite' : 'none',
              }}
            />

            {/* Glowing orbs */}
            <div 
              className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ 
                backgroundColor: content.accentColor || '#EF4130',
                animation: content.animationEnabled ? 'float-slow 12s ease-in-out infinite' : 'none',
              }}
            />
            <div 
              className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
              style={{ 
                backgroundColor: content.accentColor || '#EF4130',
                animation: content.animationEnabled ? 'float-slow 15s ease-in-out infinite 3s' : 'none',
              }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Header Section */}
              <div 
                className={`text-center mb-16 lg:mb-20 ${content.animationEnabled ? 'animate-fadeInUp' : ''}`}
              >
                <div className="relative inline-block mb-6">
                  <h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                    style={{ color: content.titleColor || '#ffffff' }}
                  >
                    {content.title || 'Digital Governance Initiatives'}
                  </h2>
                  {/* Decorative underline with animation */}
                  <div className="relative mt-4 h-1.5 w-40 mx-auto rounded-full overflow-hidden" style={{ backgroundColor: `${content.accentColor || '#EF4130'}30` }}>
                    <div 
                      className="absolute inset-0 h-full w-1/2 rounded-full"
                      style={{ 
                        backgroundColor: content.accentColor || '#EF4130',
                        animation: content.animationEnabled ? 'shimmer 2s ease-in-out infinite' : 'none',
                      }}
                    />
                  </div>
                </div>
                <p 
                  className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                  style={{ color: content.descriptionColor || '#a3a3a3' }}
                >
                  {content.description || ''}
                </p>
              </div>

              {/* Initiatives Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {(content.initiatives || []).map((initiative, index) => {
                  const IconComponent = iconMap[initiative.icon] || Monitor;
                  const delay = index * 0.1;
                  return (
                    <div
                      key={index}
                      className={`
                        group relative overflow-hidden rounded-2xl
                        transition-all duration-500
                        ${content.animationEnabled ? 'animate-fadeInUp hover:shadow-2xl' : ''}`}
                      style={{
                        backgroundColor: content.cardBackgroundColor || '#1a1a1a',
                        borderWidth: '1px',
                        borderColor: content.cardBorderColor || '#2a2a2a',
                        animationDelay: `${delay}s`,
                        animationFillMode: 'both',
                      }}
                    >
                      {/* Background Image */}
                      {initiative.backgroundImage && (
                        <div className="absolute inset-0">
                          <img
                            src={initiative.backgroundImage}
                            alt={initiative.title}
                            className="w-full h-full object-cover opacity-18"
                          />
                          <div 
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${(content.cardBackgroundColor || '#1a1a1a') + 'b3'}, ${(content.cardBackgroundColor || '#1a1a1a') + '99'})`,
                            }}
                          />
                          <div 
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(135deg, ${(content.cardBackgroundColor || '#1a1a1a') + 'e6'}, ${(content.cardBackgroundColor || '#1a1a1a') + 'cc'})`,
                            }}
                          />
                        </div>
                      )}

                      {/* Hover gradient overlay */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${(content.accentColor || '#EF4130') + '08'}, transparent)`,
                        }}
                      />

                      {/* Card content */}
                      <div className="relative p-8 lg:p-10">
                        {/* Icon with glow effect */}
                        <div className="relative mb-6 inline-block">
                          <div 
                            className="absolute inset-0 rounded-xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"
                            style={{ backgroundColor: content.accentColor || '#EF4130' }}
                          />
                          <div 
                            className="relative w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6 border-2"
                            style={{ backgroundColor: (content.accentColor || '#EF4130') + '15', borderColor: content.accentColor || '#EF4130' }}
                          >
                            <IconComponent 
                              className="w-8 h-8 transition-all duration-300 group-hover:scale-125"
                              style={{ color: content.accentColor || '#EF4130' }}
                            />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 
                          className="text-xl lg:text-2xl font-bold mb-4 transition-colors duration-300"
                          style={{ color: content.cardTitleColor || '#ffffff' }}
                        >
                          {initiative.title}
                        </h3>

                        {/* Description */}
                        <p 
                          className="text-base leading-relaxed transition-colors duration-300"
                          style={{ color: content.cardTextColor || '#d4d4d4' }}
                        >
                          {initiative.description}
                        </p>
                      </div>

                      {/* Corner sparkle on hover */}
                      <Sparkles 
                        className="absolute top-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12"
                        style={{ color: content.accentColor || '#EF4130' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <style jsx>{`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
              @keyframes float-slow {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                33% { transform: translateY(-30px) translateX(20px); }
                66% { transform: translateY(30px) translateX(-20px); }
              }
              @keyframes gridMove {
                0% { background-position: 0 0; }
                100% { background-position: 50px 50px; }
              }
            `}</style>
          </section>
        </div>
      </motion.div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Header Content
          </h3>
          <div className="space-y-4">
          
          <EditableText
            label="Title"
            value={title}
            onChange={(value: any) => handleContentUpdate({ title: value })}
            placeholder="Digital Governance Initiatives"
          />

          <EditableTextarea
            label="Description"
            value={description}
            onChange={(value: any) => handleContentUpdate({ description: value })}
            rows={3}
            placeholder="Our governance ecosystem is enhanced through digital transformation..."
          />
        </div>
        </div>

        {/* Color Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Color Settings
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <EditableColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
            />

            <EditableColorPicker
              label="Accent Color"
              value={accentColor}
              onChange={(value: any) => handleContentUpdate({ accentColor: value })}
            />

            <EditableColorPicker
              label="Title Color"
              value={titleColor}
              onChange={(value: any) => handleContentUpdate({ titleColor: value })}
            />

            <EditableColorPicker
              label="Description Color"
              value={descriptionColor}
              onChange={(value: any) => handleContentUpdate({ descriptionColor: value })}
            />

            <EditableColorPicker
              label="Card Background"
              value={cardBackgroundColor}
              onChange={(value: any) => handleContentUpdate({ cardBackgroundColor: value })}
            />

            <EditableColorPicker
              label="Card Title Color"
              value={cardTitleColor}
              onChange={(value: any) => handleContentUpdate({ cardTitleColor: value })}
            />

            <EditableColorPicker
              label="Card Text Color"
              value={cardTextColor}
              onChange={(value: any) => handleContentUpdate({ cardTextColor: value })}
            />

            <EditableColorPicker
              label="Card Border Color"
              value={cardBorderColor}
              onChange={(value: any) => handleContentUpdate({ cardBorderColor: value })}
            />
            </div>
          </div>
        </div>

        {/* Animation Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Animation Settings
          </h3>
          <div className="space-y-4">
            <EditableCheckbox
            label="Enable Animations"
            checked={animationEnabled}
            onChange={(checked) => handleContentUpdate({ animationEnabled: checked })}
              />
            </div>
        </div>

        {/* Initiatives Management */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mr-2" />
              Digital Initiatives
            </h3>
            <button
              onClick={addInitiative}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Initiative
            </button>
          </div>

          <div className="space-y-3">
            {initiatives.map((initiative: { title: string; description: string; icon: IconType; backgroundImage?: string }, index: number) => {
              const isExpanded = expandedInitiative === index;
              
              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Initiative Header */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50">
                    <button
                      onClick={() => setExpandedInitiative(isExpanded ? null : index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    
                    <span className="flex-1 font-medium text-gray-900">
                      {initiative.title}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveInitiative(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveInitiative(index, 'down')}
                        disabled={index === initiatives.length - 1}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => removeInitiative(index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Initiative Edit Form */}
                  {isExpanded && (
                    <div className="p-4 space-y-4 bg-white border-t border-gray-200">
                      <EditableSelect
                        label="Icon"
                        value={initiative.icon}
                        onChange={(value: any) => handleInitiativeUpdate(index, "icon", value)}
                        options={[
                          { value: "monitor", label: "Monitor (Dashboard)" },
                          { value: "users", label: "Users (Forums)" },
                          { value: "award", label: "Award (Recognition)" },
                          { value: "book", label: "Book (Playbook)" }
                        ]}
                      />

                      <EditableText
                        label="Title"
                        value={initiative.title}
                        onChange={(value: any) => handleInitiativeUpdate(index, "title", value)}
                        placeholder="Initiative Title"
                      />

                      <EditableTextarea
                        label="Description"
                        value={initiative.description}
                        onChange={(value: any) => handleInitiativeUpdate(index, "description", value)}
                        rows={3}
                        placeholder="Describe this initiative..."
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background Image
                        </label>
                        <MediaUpload
                          label=""
                          type="image"
                          currentUrl={initiative.backgroundImage}
                          onUpload={(url) => handleInitiativeUpdate(index, "backgroundImage", url)}
                          onRemove={() => handleInitiativeUpdate(index, "backgroundImage", undefined)}
                          placeholder="Upload or paste image URL..."
                        />
                        {initiative.backgroundImage && (
                          <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
                            <img 
                              src={initiative.backgroundImage} 
                              alt="Preview" 
                              className="h-32 w-full object-cover" 
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {initiatives.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No initiatives yet. Click "Add Initiative" to create one.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
