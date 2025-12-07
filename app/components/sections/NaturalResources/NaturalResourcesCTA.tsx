"use client";

import React, { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSection, HeroContent } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
} from "@/app/components/EditableInputs";

interface NaturalResourcesCTAContent extends HeroContent {
  animationStyle?: string;
}

interface NaturalResourcesCTAProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

const defaultContent: NaturalResourcesCTAContent = {
  title: "Ready to build smarter, sustainable systems?",
  description:
    "Partner with RAUS to power your next project with future-ready solutions.",
  buttonText: "Contact Us",
  buttonLink: "/contact",
  accentColor: "#22C55E",
  backgroundColor: "#F0FDF4",
  animationStyle: "fade",
  alignment: "center",
};

const animationOptions = [
  { label: "Fade", value: "fade" },
  { label: "Bounce", value: "bounce" },
  { label: "Zoom", value: "zoom" },
  { label: "Slide", value: "slide" },
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

export default function NaturalResourcesCTA({
  section,
  isEditing,
  onUpdate,
}: NaturalResourcesCTAProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<NaturalResourcesCTAContent>({
    ...defaultContent,
    ...content,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector("style[data-natural-resources-cta]")) {
        const style = document.createElement("style");
        style.setAttribute("data-natural-resources-cta", "true");
        style.innerHTML = `
@keyframes fade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade { animation: fade 0.7s cubic-bezier(0.4,0,0.2,1) both; }
@keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
.animate-bounce { animation: bounce 1.2s infinite; }
@keyframes zoom { from{transform:scale(0.8);opacity:0;} to{transform:scale(1);opacity:1;} }
.animate-zoom { animation: zoom 0.6s cubic-bezier(0.4,0,0.2,1) both; }
@keyframes slide { from{transform:translateX(-40px);opacity:0;} to{transform:translateX(0);opacity:1;} }
.animate-slide { animation: slide 0.6s cubic-bezier(0.4,0,0.2,1) both; }
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
    const data = props?.useLocal
      ? localContent
      : { ...defaultContent, ...content, ...localContent };
    const textAlignClass = getTextAlignClass(data.alignment || "center");
    return (
      <section
        className={`relative rounded-2xl shadow-xl px-6 py-10 md:px-16 md:py-16 overflow-hidden transition-all ${textAlignClass}`}
        style={{ background: data.backgroundColor }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: `url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 400 400\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.9\\' numOctaves=\\'4\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')`,
            backgroundSize: "200px 200px",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2
            className={`flex items-center gap-2 text-3xl md:text-4xl font-extrabold mb-2 animate-${data.animationStyle} ${textAlignClass}`}
            style={{ color: data.accentColor }}
          >
            <Leaf className="w-8 h-8 animate-bounce" />
            {data.title}
          </h2>
          <p
            className={`max-w-6xl text-lg md:text-xl font-medium animate-${data.animationStyle} ${textAlignClass}`}
            style={{ color: "#22292f" }}
          >
            {data.description}
          </p>
          {data.buttonText && (
            <a
              href={data.buttonLink || "#"}
              className="inline-block mt-4 px-8 py-4 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ background: data.accentColor }}
            >
              {data.buttonText}
            </a>
          )}
        </div>
      </section>
    );
  };

  if (!isEditing) return <Preview />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Live Preview - Sticky Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-1 sticky top-8 h-fit"
      >
        <div
          className="rounded-xl border bg-white p-6 shadow-lg backdrop-blur-sm"
          style={{ borderColor: localContent.accentColor }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: localContent.accentColor }}
              />
              Live Preview
            </h3>
          </div>
          <Preview useLocal />
        </div>
      </motion.div>

      {/* Editing Controls - Right Columns */}
      <div className="lg:col-span-2 space-y-6">
        <div
          className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4"
          style={{ borderLeftColor: "#6366f1" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              }}
            />
            <h4 className="font-semibold text-gray-700 text-lg">Content</h4>
          </div>
          <EditableText
            label="Title"
            value={localContent.title || ""}
            onChange={(val) => handleContentUpdate({ title: val })}
            placeholder="Enter title..."
          />
          <EditableTextarea
            label="Description"
            value={localContent.description || ""}
            onChange={(val) => handleContentUpdate({ description: val })}
            rows={3}
            placeholder="Enter description..."
          />
        </div>

        <div
          className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4"
          style={{ borderLeftColor: "#ef4444" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f87171)",
              }}
            />
            <h4 className="font-semibold text-gray-700 text-lg">Button</h4>
          </div>
          <EditableText
            label="Button Text"
            value={localContent.buttonText || ""}
            onChange={(val) => handleContentUpdate({ buttonText: val })}
            placeholder="Enter button text..."
          />
          <EditableText
            label="Button Link"
            value={localContent.buttonLink || ""}
            onChange={(val) => handleContentUpdate({ buttonLink: val })}
            placeholder="Enter button link..."
          />
        </div>

        <div
          className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4"
          style={{ borderLeftColor: "#f59e0b" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
              }}
            />
            <h4 className="font-semibold text-gray-700 text-lg">
              Appearance & Animation
            </h4>
          </div>
          <EditableColorPicker
            label="Accent Color"
            value={localContent.accentColor || ""}
            onChange={(val) => handleContentUpdate({ accentColor: val })}
          />
          <EditableColorPicker
            label="Background Color"
            value={localContent.backgroundColor || ""}
            onChange={(val) => handleContentUpdate({ backgroundColor: val })}
          />
          <EditableSelect
            label="Alignment"
            value={localContent.alignment || "center"}
            onChange={(val) => handleContentUpdate({ alignment: val })}
            options={[
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ]}
          />
          <EditableSelect
            label="Animation Style"
            value={localContent.animationStyle || "fade"}
            onChange={(val) => handleContentUpdate({ animationStyle: val })}
            options={animationOptions}
          />
        </div>
      </div>
    </div>
  );
}
