"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect, EditableRange } from "@/app/components/EditableInputs";

interface ApproachItem {
  number: string;
  title: string;
  description: string;
  features: string[];
  backgroundImage?: string;
}

interface ApproachContent {
  icon?: string;
  mainTitle?: string;
  subtitle?: string;
  approaches?: ApproachItem[];
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  animationStyle?: string;
  alignment?: "left" | "center" | "right";
  overlayColor?: string;
  overlayOpacity?: number;
  cardHoverEffect?: string;
}

interface DigitalTransformationApproachProps {
  section: { content?: ApproachContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: ApproachContent }>) => void;
}

const defaultContent: ApproachContent = {
  icon: "🌐",
  mainTitle: "Our Digital Transformation Approach",
  subtitle: "We combine deep industry insight with advanced technology to ensure every project is smarter, greener, and more connected. Our approach focuses on:",
  approaches: [
    {
      number: "1",
      title: "Technology-Enabled Design & Planning",
      description: "By integrating technology early, we ensure clarity, reduce rework, and accelerate project timelines.",
      features: [
        "Intelligent BIM modeling for accuracy and coordination",
        "Predictive simulations using digital twins",
        "Real-time stakeholder visualization using VR/AR",
        "Data-driven decision support for cost, quality & efficiency"
      ],
      backgroundImage: ""
    }
  ],
  accentColor: "#00d4ff",
  backgroundColor: "#ffffff",
  textColor: "#1f2937",
  animationStyle: "fade",
  alignment: "left",
  overlayColor: "#000000",
  overlayOpacity: 0.3,
  cardHoverEffect: "lift"
};

const animationOptions = [
  { label: "Fade", value: "fade", icon: "✨" },
  { label: "Bounce", value: "bounce", icon: "🎈" },
  { label: "Zoom", value: "zoom", icon: "🔍" },
  { label: "Slide", value: "slide", icon: "➡️" },
];

function getTextAlignClass(alignment: string) {
  switch (alignment) {
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-left";
  }
}

export default function DigitalTransformationApproach({ section, isEditing, onUpdate }: DigitalTransformationApproachProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<ApproachContent>({
    ...defaultContent,
    ...content,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector('style[data-approach]')) {
        const style = document.createElement('style');
        style.setAttribute('data-approach', 'true');
        style.innerHTML = `
@keyframes fade { 
  from { opacity: 0; transform: translateY(20px); } 
  to { opacity: 1; transform: translateY(0); } 
}
.animate-fade { animation: fade 0.7s cubic-bezier(0.4,0,0.2,1) both; }

@keyframes bounce { 
  0%, 100% { transform: translateY(0); } 
  50% { transform: translateY(-8px); } 
}
.animate-bounce { animation: bounce 1.2s infinite; }

@keyframes zoom { 
  from { transform: scale(0.8); opacity: 0; } 
  to { transform: scale(1); opacity: 1; } 
}
.animate-zoom { animation: zoom 0.6s cubic-bezier(0.4,0,0.2,1) both; }

@keyframes slide { 
  from { transform: translateX(-40px); opacity: 0; } 
  to { transform: translateX(0); opacity: 1; } 
}
.animate-slide { animation: slide 0.6s cubic-bezier(0.4,0,0.2,1) both; }

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
.shimmer {
  animation: shimmer 3s infinite;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 1000px 100%;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.float { animation: float 3s ease-in-out infinite; }

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.6); }
}
.pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

.card-hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15) !important;
}

.card-hover-glow:hover {
  box-shadow: 0 0 40px rgba(0, 212, 255, 0.4) !important;
}

.card-hover-scale:hover {
  transform: scale(1.05);
}

.card-hover-rotate:hover {
  transform: perspective(1000px) rotateY(5deg);
}

.card-base {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
`;
        document.head.appendChild(style);
      }
    }
  }, []);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    const updated = { ...localContent, ...patch };
    setLocalContent(updated);
    onUpdate && onUpdate({ content: updated });
  };

  const Preview = (props?: { useLocal?: boolean }) => {
    const data = props?.useLocal ? localContent : { ...defaultContent, ...content, ...localContent };
    const textAlignClass = getTextAlignClass(data.alignment || "left");
    
    return (
      <section
        className={`relative rounded-2xl px-6 py-12 md:px-20 md:py-20 overflow-hidden ${textAlignClass}`}
        style={{ 
          background: `linear-gradient(135deg, ${data.backgroundColor} 0%, ${data.backgroundColor}f0 100%)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }}
      >
        {/* Decorative background elements (noise only, no orbs) */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ background: `url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/\%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/\%3E%3C/svg%3E')`, backgroundSize: '200px 200px' }} />
        {/* Accent line decoration */}
        <div className="absolute top-0 left-0 right-0 h-1 shimmer" style={{ background: `linear-gradient(90deg, transparent, ${data.accentColor}, transparent)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 shimmer" style={{ background: `linear-gradient(90deg, transparent, ${data.accentColor}, transparent)`, animationDelay: '1.5s' }} />
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className={`mb-14 ${textAlignClass === 'text-center' ? 'flex flex-col items-center' : textAlignClass === 'text-right' ? 'flex flex-col items-end' : 'flex flex-col items-start'}`}>
            <div className="mb-4 text-6xl animate-fade" style={{ filter: `drop-shadow(0 0 12px ${data.accentColor}40)` }}>
              {data.icon}
            </div>
            <div className="mb-2 w-12 h-1 rounded-full animate-fade" style={{ backgroundColor: data.accentColor }} />
            <h2 
              className={`text-3xl md:text-5xl lg:text-4xl font-extrabold animate-${data.animationStyle} ${textAlignClass} leading-tight mb-4`} 
              style={{ 
                color: data.accentColor,
                textShadow: `0 2px 18px ${data.accentColor}20`
              }}
            >
              {data.mainTitle}
            </h2>
            <p 
              className={`text-xl md:text-xl lg:text-xl leading-relaxed animate-${data.animationStyle} ${textAlignClass} max-w-6xl`}
              style={{ 
                color: '#334155',
                fontWeight: '400',
                letterSpacing: '0.01em',
                lineHeight: '1.7',
                animationDelay: '0.15s'
              }}
            >
              {data.subtitle}
            </p>
          </div>
          {/* Approaches Grid - 3 cards in one row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.approaches && data.approaches.map((approach, idx) => (
              <div
                key={idx}
                className={`relative bg-white bg-opacity-80 rounded-2xl p-8 md:p-10 border border-gray-100 hover:border-opacity-70 card-base card-hover-${data.cardHoverEffect} animate-${data.animationStyle}`}
                style={{ 
                  animationDelay: `${idx * 0.2 + 0.3}s`,
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.04)',
                  backgroundImage: approach.backgroundImage ? `url('${approach.backgroundImage}')` : 'none',
                  backgroundSize: approach.backgroundImage ? 'cover' : undefined,
                  backgroundPosition: approach.backgroundImage ? 'center' : undefined
                }}
              >
                {approach.backgroundImage && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      backgroundColor: data.overlayColor,
                      opacity: data.overlayOpacity || 0.3
                    }}
                  />
                )}
                {/* Approach Number Badge */}
                <div 
                  className="absolute -top-6 -left-6 w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                  style={{ 
                    backgroundColor: data.accentColor,
                    boxShadow: `0 4px 16px ${data.accentColor}30`
                  }}
                >
                  {approach.number}
                </div>
                {/* Approach Content */}
                <div className={`ml-6 relative z-10 ${approach.backgroundImage ? 'text-white' : ''}`}>
                  <h3 
                    className={`text-xl md:text-2xl font-bold mb-3 ${textAlignClass}`}
                    style={{ color: approach.backgroundImage ? 'white' : data.accentColor }}
                  >
                    {approach.title}
                  </h3>
                  {/* Features List */}
                  <ul className="space-y-2 mb-4">
                    {approach.features.map((feature, featureIdx) => (
                      <li 
                        key={featureIdx}
                        className={`flex items-start gap-2 text-base md:text-base ${textAlignClass === 'text-right' ? 'flex-row-reverse' : ''}`}
                        style={{ color: approach.backgroundImage ? 'rgba(255,255,255,0.9)' : data.textColor || '#475569' }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: data.accentColor }}
                        />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Description */}
                  <p 
                    className={`text-base md:text-base italic ${textAlignClass}`}
                    style={{ 
                      color: approach.backgroundImage ? 'rgba(255,255,255,0.85)' : '#64748b',
                      paddingTop: '0.75rem',
                      borderTop: `2px solid ${approach.backgroundImage ? 'rgba(255,255,255,0.2)' : `${data.accentColor}10`}`
                    }}
                  >
                    {approach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  if (!isEditing) return <Preview />;

  return (
    <div className="mb-8 space-y-8">
      {/* Live Preview */}
      <div className="rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl pulse-glow transition-all duration-300" style={{ borderColor: localContent.accentColor }}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: localContent.accentColor, boxShadow: `0 0 10px ${localContent.accentColor}` }} />
            Live Preview
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">Active</span>
          </div>
        </div>
        <Preview useLocal />
      </div>

      {/* Editing Controls */}
      <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${localContent.accentColor}20` }}>
            ✏️
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Edit Digital Transformation Approach</h3>
        </div>

        {/* Header Section */}
        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <EditableText
            label="🎯 Icon"
            value={localContent.icon || ""}
            onChange={(e: any) => handleContentUpdate({ icon: e.target.value })}
          />
        </div>

        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <EditableText
            label="📝 Main Title"
            value={localContent.mainTitle || ""}
            onChange={(e: any) => handleContentUpdate({ mainTitle: e.target.value })}
          />
        </div>

        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <EditableTextarea
            label="📄 Subtitle"
            value={localContent.subtitle || ""}
            onChange={(e: any) => handleContentUpdate({ subtitle: e.target.value })}
          />
        </div>

        {/* Approaches Section */}
        <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h4 className="font-bold text-gray-800 text-xl flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Approaches
          </h4>
          <div className="space-y-6">
            {(localContent.approaches || []).map((approach, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-700">Approach #{i + 1}</span>
                  <button
                    onClick={() => {
                      const arr = [...(localContent.approaches || [])];
                      arr.splice(i, 1);
                      handleContentUpdate({ approaches: arr });
                    }}
                    className="rounded-xl px-4 py-2 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
                  >
                    🗑️ Remove
                  </button>
                </div>
                <div className="space-y-4">
                  <EditableText
                    label="Number"
                    value={approach.number}
                    onChange={(e: any) => {
                      const arr = [...(localContent.approaches || [])];
                      const value = typeof e === "string" ? e : e.target.value;
                      arr[i] = { ...arr[i], number: value };
                      handleContentUpdate({ approaches: arr });
                    }}
                  />
                  <EditableText
                    label="Title"
                    value={approach.title}
                    onChange={(e: any) => {
                      const arr = [...(localContent.approaches || [])];
                      const value = typeof e === "string" ? e : e.target.value;
                      arr[i] = { ...arr[i], title: value };
                      handleContentUpdate({ approaches: arr });
                    }}
                  />
                  <EditableTextarea
                    label="Description"
                    value={approach.description}
                    onChange={(e: any) => {
                      const arr = [...(localContent.approaches || [])];
                      const value = typeof e === "string" ? e : e.target.value;
                      arr[i] = { ...arr[i], description: value };
                      handleContentUpdate({ approaches: arr });
                    }}
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Features</label>
                    <div className="space-y-2">
                      {approach.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex gap-2">
                          <div className="flex-1">
                            <EditableText
                              label=""
                              value={feature}
                              onChange={(e: any) => {
                                const arr = [...(localContent.approaches || [])];
                                const newFeatures = [...arr[i].features];
                                const value = typeof e === "string" ? e : e.target.value;
                                newFeatures[fIdx] = value;
                                arr[i] = { ...arr[i], features: newFeatures };
                                handleContentUpdate({ approaches: arr });
                              }}
                            />
                          </div>
                          <button
                            onClick={() => {
                              const arr = [...(localContent.approaches || [])];
                              const newFeatures = [...arr[i].features];
                              newFeatures.splice(fIdx, 1);
                              arr[i] = { ...arr[i], features: newFeatures };
                              handleContentUpdate({ approaches: arr });
                            }}
                            className="rounded-lg px-3 py-2 bg-red-50 border border-red-200 text-red-600 text-sm hover:bg-red-100 transition-all"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const arr = [...(localContent.approaches || [])];
                          arr[i] = { ...arr[i], features: [...arr[i].features, "New feature"] };
                          handleContentUpdate({ approaches: arr });
                        }}
                        className="w-full rounded-lg px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium hover:bg-blue-100 transition-all"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>
                  <div>
                    <MediaUpload
                      label="Background Image"
                      type="image"
                      currentUrl={approach.backgroundImage || ""}
                      onUpload={(url: string) => {
                        const arr = [...(localContent.approaches || [])];
                        arr[i] = { ...arr[i], backgroundImage: url };
                        handleContentUpdate({ approaches: arr });
                      }}
                      onRemove={() => {
                        const arr = [...(localContent.approaches || [])];
                        arr[i] = { ...arr[i], backgroundImage: "" };
                        handleContentUpdate({ approaches: arr });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const arr = [...(localContent.approaches || [])];
              arr.push({
                number: String(arr.length + 1),
                title: "New Approach",
                description: "Approach description here",
                features: ["Feature 1", "Feature 2"]
              });
              handleContentUpdate({ approaches: arr });
            }}
            className="w-full rounded-xl px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 text-blue-700 font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-2xl">➕</span>
            Add Approach
          </button>
        </div>

        {/* Appearance & Animation Section */}
        <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h4 className="font-bold text-gray-800 text-xl flex items-center gap-2 pb-4 border-b border-gray-200">
            <span className="text-xl">🎨</span>
            Appearance & Animation
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="🎨 Accent Color"
              value={localContent.accentColor || "#00d4ff"}
              onChange={(e: any) => handleContentUpdate({ accentColor: e.target.value })}
            />
            
            <EditableColorPicker
              label="🖼️ Background Color"
              value={localContent.backgroundColor || "#ffffff"}
              onChange={(e: any) => handleContentUpdate({ backgroundColor: e.target.value })}
            />
            
            <EditableSelect
              label="📐 Alignment"
              value={localContent.alignment || "left"}
              onChange={(e: any) => handleContentUpdate({ alignment: e.target.value })}
              options={[
                { value: "left", label: "⬅️ Left" },
                { value: "center", label: "↔️ Center" },
                { value: "right", label: "➡️ Right" }
              ]}
            />
            
            <EditableSelect
              label="⚡ Animation Style"
              value={localContent.animationStyle || "fade"}
              onChange={(e: any) => handleContentUpdate({ animationStyle: e.target.value })}
              options={animationOptions.map((opt) => ({
                value: opt.value,
                label: `${opt.icon} ${opt.label}`
              }))}
            />

            <EditableColorPicker
              label="📝 Text Color"
              value={localContent.textColor || "#1f2937"}
              onChange={(e: any) => handleContentUpdate({ textColor: e.target.value })}
            />

            <EditableSelect
              label="🎭 Card Hover Effect"
              value={localContent.cardHoverEffect || "lift"}
              onChange={(e: any) => handleContentUpdate({ cardHoverEffect: e.target.value })}
              options={[
                { value: "lift", label: "⬆️ Lift" },
                { value: "glow", label: "✨ Glow" },
                { value: "scale", label: "📈 Scale" },
                { value: "rotate", label: "🔄 Rotate" }
              ]}
            />

            <EditableColorPicker
              label="🎨 Overlay Color"
              value={localContent.overlayColor || "#000000"}
              onChange={(e: any) => handleContentUpdate({ overlayColor: e.target.value })}
            />

            <EditableRange
              label="👁️ Overlay Opacity"
              value={localContent.overlayOpacity || 0.3}
              onChange={(e: any) => handleContentUpdate({ overlayOpacity: parseFloat(e.target.value) })}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}