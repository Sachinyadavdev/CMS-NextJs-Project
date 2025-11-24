"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Rocket, Star, Sparkles, Edit3, Palette, Layout } from "lucide-react";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

interface WhyChooseRausContent {
  title?: string;
  description?: string;
  bullets?: string[];
  accentColor?: string;
  backgroundColor?: string;
  animationEnabled?: boolean;
  animationStyle?: string;
  alignment?: string;
}

interface WhyChooseRausSection {
  content?: WhyChooseRausContent;
}

interface WhyChooseRausProps {
  section: WhyChooseRausSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<WhyChooseRausSection>) => void;
}

const defaultBullets = [
  "Integrated expertise across design, engineering, sustainability & digital transformation",
  "A collaborative, transparent working model",
  "Advanced digital tools that reduce risks and accelerate decision-making",
  "A strong ethical and governance framework",
  "A commitment to innovation and sustainability in every project",
];

function getReadableTextColor(hex: string) {
  const hexNorm = hex.replace('#', '');
  const fullHex = hexNorm.length === 3 ? hexNorm.split('').map((c) => c + c).join('') : hexNorm;
  const num = parseInt(fullHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? '#111827' : '#FFFFFF';
}

const animationOptions = [
  { label: "Fade In", value: "fade" },
  { label: "Bounce", value: "bounce" },
  { label: "Zoom", value: "zoom" },
  { label: "Slide", value: "slide" },
];

export default function WhyChooseRaus({ section, isEditing, onUpdate }: WhyChooseRausProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<WhyChooseRausContent>({
    title: content.title || "🚀 Why Partners Choose RAUS",
    description:
      content.description ||
      "Together, we deliver impact that is scalable, future-proof, and human-centered.",
    bullets: content.bullets || defaultBullets,
    accentColor: content.accentColor || "#7C3AED",
    backgroundColor: content.backgroundColor || "#F5F7FA",
    animationEnabled: content.animationEnabled !== undefined ? content.animationEnabled : true,
    animationStyle: content.animationStyle || "fade",
    alignment: content.alignment || "center",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector('style[data-whychoose]')) {
        const style = document.createElement('style');
        style.setAttribute('data-whychoose', 'true');
        style.innerHTML = `
@keyframes fade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade {
  animation: fade 0.7s cubic-bezier(0.4,0,0.2,1) both;
}
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-bounce {
  animation: bounce 1.2s infinite;
}
@keyframes zoom {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-zoom {
  animation: zoom 0.6s cubic-bezier(0.4,0,0.2,1) both;
}
@keyframes slide {
  from { transform: translateX(-40px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slide {
  animation: slide 0.6s cubic-bezier(0.4,0,0.2,1) both;
}
@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
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

  const getAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case "center":
        return {
          container: "text-center",
          title: "justify-center",
          bullet: "justify-center",
          description: "mx-auto"
        };
      case "right":
        return {
          container: "text-right",
          title: "justify-end",
          bullet: "justify-end",
          description: "ml-auto"
        };
      default:
        return {
          container: "text-left",
          title: "justify-start",
          bullet: "justify-start",
          description: "mr-auto"
        };
    }
  };

  // Live Preview
  const Preview = (props?: { useLocal?: boolean }) => {
    const data = props?.useLocal ? localContent : { ...content, ...localContent };
    const textColor = getReadableTextColor(data.backgroundColor || "#F5F7FA");
    const alignClasses = getAlignmentClasses(data.alignment || "center");
    
    return (
      <section
        className={`relative rounded-3xl shadow-2xl p-10 md:p-16 overflow-hidden transition-all duration-500 ${alignClasses.container}`}
        style={{
          background: `linear-gradient(135deg, ${data.backgroundColor} 0%, ${data.backgroundColor}dd 100%)`,
          color: textColor,
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" 
             style={{ background: data.accentColor, transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10" 
             style={{ background: data.accentColor, transform: 'translate(-40%, 40%)' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Title Section */}
          <div className={`flex items-center gap-3 mb-6 ${alignClasses.title}`}>
            <div className="relative">
              <Rocket className="w-10 h-10 animate-spin-slow" style={{ color: data.accentColor }} />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight" 
                style={{ color: data.accentColor }}>
              {data.title}
            </h2>
          </div>
          
          {/* Bullets Section */}
          <div className="space-y-4 my-8">
            {(data.bullets || []).map((b: string, idx: number) => (
              <div
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${alignClasses.bullet} ${
                  localContent.animationEnabled ? `animate-${localContent.animationStyle}` : ''
                }`}
                style={{
                  animationDelay: `${idx * 0.12}s`,
                  backgroundColor: `${data.accentColor}15`,
                  borderLeft: `4px solid ${data.accentColor}`,
                }}
                key={idx}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="relative">
                    <Star className="w-6 h-6 animate-bounce" style={{ color: data.accentColor }} />
                    <div className="absolute inset-0 w-6 h-6 rounded-full blur-md opacity-50" 
                         style={{ backgroundColor: data.accentColor }} />
                  </div>
                </div>
                <span className="text-lg font-semibold leading-relaxed flex-1" style={{ color: textColor }}>
                  {b}
                </span>
              </div>
            ))}
          </div>
          
          {/* Description */}
          <div className={`mt-8 p-6 rounded-2xl max-w-3xl ${alignClasses.description}`}
               style={{ 
                 background: `linear-gradient(135deg, ${data.accentColor}20 0%, ${data.accentColor}10 100%)`,
                 borderTop: `3px solid ${data.accentColor}60`
               }}>
            <p className="text-xl font-bold" style={{ color: textColor }}>
              {data.description}
            </p>
          </div>
        </div>
      </section>
    );
  };

  if (!isEditing) return <Preview />;

  // Editing UI
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Live Preview - Sticky Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-1 sticky top-8 h-fit"
      >
        <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl border-2 backdrop-blur-sm" 
             style={{ borderColor: `${localContent.accentColor}40` }}>
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: localContent.accentColor }} />
              Live Preview
              <Sparkles className="w-5 h-5" style={{ color: localContent.accentColor }} />
            </h3>
          </div>
          <Preview useLocal />
        </div>
      </motion.div>

      {/* Editing Controls - Right Columns */}
      <div className="lg:col-span-2 space-y-6">
        {/* Content Editor */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#6366f1" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Content</h4>
          </div>
          <div className="space-y-6">
            <EditableText
              label="Title"
              value={localContent.title || ''}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Enter section title..."
            />
            
            <EditableTextarea
              label="Description"
              value={localContent.description || ''}
              onChange={(val) => handleContentUpdate({ description: val })}
              rows={3}
              placeholder="Enter description..."
            />
          </div>
        </div>

        {/* Bullets Editor */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#ef4444" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #ef4444, #f87171)" }} />
            <h4 className="font-bold text-gray-900 text-lg">Key Points</h4>
          </div>
          <div className="space-y-3">
            {(localContent.bullets || []).map((b: string, i: number) => (
              <div key={i} className="flex gap-3 items-center group">
                <span className="text-sm font-bold text-gray-400 min-w-[24px]">#{i + 1}</span>
                <div className="flex-1">
                  <EditableText
                    label=""
                    value={b}
                    onChange={(val) => {
                      const arr = [...(localContent.bullets || [])];
                      arr[i] = val;
                      handleContentUpdate({ bullets: arr });
                    }}
                    placeholder="Enter bullet point..."
                  />
                </div>
                <button
                  onClick={() => {
                    const arr = [...(localContent.bullets || [])];
                    arr.splice(i, 1);
                    handleContentUpdate({ bullets: arr });
                  }}
                  className="rounded-lg px-4 py-3 bg-red-50 border-2 border-red-100 text-red-600 font-semibold hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const arr = [...(localContent.bullets || [])];
              arr.push("New Value");
              handleContentUpdate({ bullets: arr });
            }}
            className="rounded-xl px-6 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 text-purple-700 font-bold mt-4 hover:from-purple-100 hover:to-blue-100 transition-all"
          >
            + Add Bullet Point
          </button>
        </div>

        {/* Appearance Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#f59e0b" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }} />
            <h4 className="font-bold text-gray-900 text-lg">Design & Style</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="Accent Color"
              value={localContent.accentColor || ''}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />
            
            <EditableColorPicker
              label="Background Color"
              value={localContent.backgroundColor || ''}
              onChange={(val) => handleContentUpdate({ backgroundColor: val })}
            />
            
            <EditableSelect
              label="Content Alignment"
              value={localContent.alignment || ''}
              onChange={(val) => handleContentUpdate({ alignment: val })}
              options={[
                { label: '← Left', value: 'left' },
                { label: '↔ Center', value: 'center' },
                { label: '→ Right', value: 'right' },
              ]}
            />
            
            <EditableSelect
              label="Animation Style"
              value={localContent.animationStyle || ''}
              onChange={(val) => handleContentUpdate({ animationStyle: val })}
              options={animationOptions}
              disabled={!localContent.animationEnabled}
            />
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <EditableCheckbox
              label="Enable Animations"
              checked={localContent.animationEnabled || false}
              onChange={(val) => handleContentUpdate({ animationEnabled: val })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}