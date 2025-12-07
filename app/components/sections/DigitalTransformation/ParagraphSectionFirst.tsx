"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect } from "@/app/components/EditableInputs";

interface ParagraphSectionContent {
  title?: string;
  paragraphs?: string[];
  accentColor?: string;
  backgroundColor?: string;
  animationStyle?: string;
  alignment?: "left" | "center" | "right";
}

interface ParagraphSectionFirstProps {
  section: { content?: ParagraphSectionContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: ParagraphSectionContent }>) => void;
}

const defaultContent: ParagraphSectionContent = {
  title: "Transforming Spaces Into Intelligent, Connected, Future-Ready Ecosystems",
  paragraphs: [
    "At RAUS, Digital Transformation is more than integrating technology—it's about reshaping how buildings operate, how people interact with spaces and how organizations unlock long-term performance.",
    "We bridge architecture, engineering, data and smart technologies to create intelligent environments that are adaptive, efficient and built for tomorrow.",
    "From smart buildings and IoT systems to digital twins, automation and AI-driven project delivery, our digital solutions elevate every stage of the built environment lifecycle—design, construction, operations and maintenance."
  ],
  accentColor: "#00d4ff",
  backgroundColor: "#f8fafc",
  animationStyle: "fade",
  alignment: "center"
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

export default function ParagraphSectionFirst({ section, isEditing, onUpdate }: ParagraphSectionFirstProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<ParagraphSectionContent>({
    ...defaultContent,
    ...content,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector('style[data-paragraph]')) {
        const style = document.createElement('style');
        style.setAttribute('data-paragraph', 'true');
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
    const textAlignClass = getTextAlignClass(data.alignment || "center");
    return (
      <section
        className={`relative rounded-3xl shadow-2xl px-8 py-16 md:px-24 md:py-24 overflow-hidden transition-all duration-500 hover:shadow-3xl ${textAlignClass}`}
        style={{ background: data.backgroundColor }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ background: `url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/\%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/\%3E%3C/svg%3E')`, backgroundSize: '200px 200px' }} />
        
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 float" style={{ background: `radial-gradient(circle, ${data.accentColor}, transparent)` }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 float" style={{ background: `radial-gradient(circle, ${data.accentColor}, transparent)`, animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-2 items-center">
          <h2 
            className={`text-4xl md:text-4xl font-extrabold mb-8 animate-${data.animationStyle} ${textAlignClass} leading-tight`} 
            style={{ 
              color: data.accentColor,
              textShadow: `0 4px 20px ${data.accentColor}40`
            }}
          >
            {data.title}
          </h2>
          {data.paragraphs && data.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={`text-xl md:text-xl lg:text-xl leading-relaxed animate-${data.animationStyle} ${textAlignClass} leading-relaxed transition-all duration-300 hover:opacity-100`}
              style={{ 
                color: '#22292f', 
                maxWidth: '100%',
                animationDelay: `${idx * 0.1}s`
              }}
            >
              {p}
            </p>
          ))}
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
          <h3 className="text-2xl font-bold text-gray-900">Edit Paragraph Section</h3>
        </div>

        {/* Title Section */}
        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <EditableText
            label="📝 Title"
            value={localContent.title || ""}
            onChange={(e: any) => handleContentUpdate({ title: e.target.value })}
          />
        </div>

        {/* Paragraphs Section */}
        <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h4 className="font-bold text-gray-800 text-xl flex items-center gap-2">
            <span className="text-xl">📄</span>
            Paragraphs
          </h4>
          <div className="space-y-4">
            {(localContent.paragraphs || []).map((p, i) => (
              <div key={i} className="flex gap-3 items-start p-4 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300">
                <span className="mt-3 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold text-white shrink-0" style={{ backgroundColor: localContent.accentColor }}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <EditableTextarea
                    label=""
                    value={p}
                    onChange={(e: any) => {
                      const arr = [...(localContent.paragraphs || [])];
                      arr[i] = e.target.value;
                      handleContentUpdate({ paragraphs: arr });
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    const arr = [...(localContent.paragraphs || [])];
                    arr.splice(i, 1);
                    handleContentUpdate({ paragraphs: arr });
                  }}
                  className="mt-1 rounded-xl px-4 py-3 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105 shrink-0"
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const arr = [...(localContent.paragraphs || [])];
              arr.push("New paragraph");
              handleContentUpdate({ paragraphs: arr });
            }}
            className="w-full rounded-xl px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-200 text-blue-700 font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
          >
            <span className="text-2xl">➕</span>
            Add Paragraph
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
              value={localContent.backgroundColor || "#f8fafc"}
              onChange={(e: any) => handleContentUpdate({ backgroundColor: e.target.value })}
            />
            
            <EditableSelect
              label="📐 Alignment"
              value={localContent.alignment || "center"}
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
          </div>
        </div>
      </div>
    </div>
  );
}