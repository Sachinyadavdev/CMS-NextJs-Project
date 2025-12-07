"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import BannerButton from "../CommonComponents/BannerButton";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableRange,
  EditableSelect,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

interface CollaboratingWithPurposeProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function CollaboratingWithPurpose({
  section,
  isEditing,
  onUpdate,
}: CollaboratingWithPurposeProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState({
    title:
      content.title || "Collaborating with Purpose. Delivering with Precision.",
    subtitle: content.subtitle || "",
    description:
      content.description ||
      "At RAUS, partnerships are more than collaborations — they are a shared commitment to shaping future-ready environments built on innovation, sustainability and excellence. Our alliances enable us to bring together diverse expertise, global perspectives and advanced technologies to deliver integrated solutions that exceed expectations.\n\nWe believe that when the right minds come together, extraordinary outcomes are possible.",
    backgroundImage: content.backgroundImage || "",
    backgroundVideo: content.backgroundVideo || "",
    backgroundColor: content.backgroundColor || "#0b1220",
    titleColor: content.titleColor || "#FFFFFF",
    subtitleColor: content.subtitleColor || "#E5E7EB",
    textColor: content.textColor || "#E6EEF6",
    overlay: content.overlay !== undefined ? content.overlay : true,
    overlayColor: content.overlayColor || "#000000",
    overlayOpacity: content.overlayOpacity ?? 0.22,
    titleSize: content.titleSize || "4xl",
    descriptionSize: content.descriptionSize || "base",
    animationEnabled:
      content.animationEnabled !== undefined ? content.animationEnabled : true,
    animationStyle: content.animationStyle || "fade",
    alignment: content.alignment || "center",
    buttonText: content.buttonText || "",
    buttonLink: content.buttonLink || "",
    accentColor: content.accentColor || "#7C3AED",
    features: content.features || [
      "Sustainable Design",
      "Global Reach",
      "Advanced Technology",
    ],
    blurIntensity: content.blurIntensity ?? 6,
  });

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    const updated = { ...localContent, ...patch };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  // Helper - converts hex colors into rgba string for use in inline styles
  const hexToRGBA = (hex: string, alpha = 1) => {
    try {
      const hexNorm = hex.replace("#", "");
      const fullHex =
        hexNorm.length === 3
          ? hexNorm
              .split("")
              .map((c) => c + c)
              .join("")
          : hexNorm;
      const num = parseInt(fullHex, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch (e) {
      return `rgba(0,0,0,${alpha})`;
    }
  };

  const getReadableTextColor = (hex: string) => {
    const hexNorm = hex.replace("#", "");
    const fullHex =
      hexNorm.length === 3
        ? hexNorm
            .split("")
            .map((c) => c + c)
            .join("")
        : hexNorm;
    const num = parseInt(fullHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.6 ? "#111827" : "#FFFFFF";
  };

  const Preview = (props?: { useLocal?: boolean }) => {
    const data = props?.useLocal
      ? localContent
      : { ...content, ...localContent };
    return (
      <section
        className="relative w-full py-16 lg:py-28 flex items-center justify-center overflow-hidden"
        style={{ minHeight: 420, backgroundColor: data.backgroundColor }}
      >
        {/* BG media */}
        {data.backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={data.backgroundVideo} type="video/mp4" />
          </video>
        )}
        {data.backgroundImage && !data.backgroundVideo && (
          <img
            src={data.backgroundImage}
            alt="collaboration background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay */}
        {data.overlay && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: data.overlayColor,
              opacity: Number(data.overlayOpacity),
              backdropFilter: `blur(${data.blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${data.blurIntensity}px)`,
            }}
          />
        )}

        {/* Decorative shapes and motion - enhanced */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -left-28 -top-6 w-96 h-96 rounded-full blur-3xl opacity-20 transform rotate-12 animate-float-slow"
            style={{
              background: `linear-gradient(135deg, ${data.accentColor}, rgba(124,58,237,0.5))`,
            }}
          />
          <div
            className="absolute left-8 top-12 w-40 h-40 rounded-full blur-2xl opacity-10 animate-float-slow-reverse"
            style={{
              background: `linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
            }}
          />
          <div
            className="absolute right-8 bottom-6 w-72 h-72 rounded-xl blur-2xl opacity-10 animate-float-slow-reverse"
            style={{
              background: `linear-gradient(45deg, rgba(34,197,94,0.16), rgba(59,130,246,0.06))`,
            }}
          />
          {/* soft particle highlights */}
          <div className="absolute right-1/2 -top-10 transform translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-20 blur-sm animate-twinkle-slow" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: data.accentColor }}
            />
            <span className="text-sm font-medium text-gray-200 uppercase tracking-wide">
              Partnerships
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl font-semibold mb-4 leading-tight"
            style={{
              color: data.titleColor,
              textShadow: "0 6px 18px rgba(0,0,0,0.25)",
            }}
          >
            {data.title}
          </h2>
          <p
            className="max-w-3xl mx-auto text-md md:text-lg leading-relaxed mb-6"
            style={{
              color: data.textColor,
              opacity: 0.96,
              whiteSpace: "pre-line",
            }}
          >
            {data.description}
          </p>

          {/* Feature Chips */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-0">
            {(data.features || []).slice(0, 3).map((f: any, idx: number) => {
              const chipStyle: React.CSSProperties = {
                background: `linear-gradient(90deg, ${hexToRGBA(
                  data.accentColor,
                  0.12
                )}, ${hexToRGBA(data.accentColor, 0.06)})`,
                borderColor: hexToRGBA(data.accentColor, 0.08),
                // boxShadow is provided by CSS chip border; keep it off inline to allow hover effect in CSS
                color: getReadableTextColor(data.accentColor),
                animationDelay: `${idx * 120}ms`,
                animationFillMode: "both",
                animationName: "chip-pop",
                animationDuration: "560ms",
                animationTimingFunction: "cubic-bezier(.2,.9,.3,1)",
              };
              const iconStyle: React.CSSProperties = {
                width: 10,
                height: 10,
                borderRadius: 12,
                background: data.accentColor,
                boxShadow: `0 8px 18px ${hexToRGBA(data.accentColor, 0.12)}`,
              };

              return (
                <div
                  key={idx}
                  className="mx-auto inline-flex items-center gap-3 rounded-full px-5 py-2 shadow-sm transform transition-all duration-300 chip-hover animate-chip-pop chip-border"
                  style={chipStyle}
                >
                  <div style={iconStyle} />
                  <div
                    className="text-sm font-semibold"
                    style={{ color: chipStyle.color }}
                  >
                    {f}
                  </div>
                </div>
              );
            })}
          </div>

          {data.buttonText && (
            <div className="mt-16 flex justify-center">
              <BannerButton
                text={String(data.buttonText)}
                href={String(data.buttonLink || "#")}
                variant="primary"
                size="md"
                rounded="lg"
                backgroundColor={String(data.accentColor)}
                textColor="#fff"
                hoverBackgroundColor={String(data.accentColor)}
                shadow={true}
                className="transform transition-all hover:-translate-y-1 hover:shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>
    );
  };

  if (!isEditing) {
    return <Preview />;
  }

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
          style={{ borderColor: hexToRGBA(localContent.accentColor, 0.12) }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            <span
              className="h-3 w-3 rounded-full animate-pulse"
              style={{
                backgroundColor: hexToRGBA(localContent.accentColor, 0.36),
              }}
            />
          </div>
          <Preview useLocal />
        </div>
      </motion.div>

      {/* Editing Controls - Right Columns */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#6366f1" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Text</h4>
          </div>
          <EditableText
            label="Title"
            value={localContent.title}
            onChange={(val) => handleContentUpdate({ title: val })}
            placeholder="Enter title..."
          />
          <EditableTextarea
            label="Description"
            value={localContent.description}
            onChange={(val) => handleContentUpdate({ description: val })}
            rows={5}
            placeholder="Enter description..."
          />
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#ef4444" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #ef4444, #f87171)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Media & Colors</h4>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={String(localContent.backgroundImage || "")}
              onUpload={(url) =>
                handleContentUpdate({
                  backgroundImage: url,
                  backgroundVideo: "",
                })
              }
              onRemove={() => handleContentUpdate({ backgroundImage: "" })}
              placeholder="Or paste image URL..."
            />
            <MediaUpload
              label="Background Video"
              type="video"
              currentUrl={String(localContent.backgroundVideo || "")}
              onUpload={(url) =>
                handleContentUpdate({
                  backgroundVideo: url,
                  backgroundImage: "",
                })
              }
              onRemove={() => handleContentUpdate({ backgroundVideo: "" })}
              placeholder="Or paste video URL..."
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
            <EditableText
              label="Button Text"
              value={String(localContent.buttonText || "")}
              onChange={(val) => handleContentUpdate({ buttonText: val })}
              placeholder="Explore Opportunities"
            />
            <EditableText
              label="Button Link"
              value={String(localContent.buttonLink || "")}
              onChange={(val) => handleContentUpdate({ buttonLink: val })}
              placeholder="#contact"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <EditableColorPicker
              label="Title Color"
              value={localContent.titleColor}
              onChange={(val) => handleContentUpdate({ titleColor: val })}
            />
            <EditableColorPicker
              label="Text Color"
              value={localContent.textColor}
              onChange={(val) => handleContentUpdate({ textColor: val })}
            />
            <EditableColorPicker
              label="Overlay Color"
              value={localContent.overlayColor}
              onChange={(val) => handleContentUpdate({ overlayColor: val })}
            />
            <EditableRange
              label="Overlay Opacity"
              value={Number(localContent.overlayOpacity)}
              onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
              min={0}
              max={1}
              step={0.01}
            />
            <EditableColorPicker
              label="Accent Color"
              value={localContent.accentColor}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />
            <EditableRange
              label="BG Blur"
              value={Number(localContent.blurIntensity)}
              onChange={(val) => handleContentUpdate({ blurIntensity: val })}
              min={0}
              max={16}
              step={1}
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#f59e0b" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Layout & Animation</h4>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EditableSelect
              label="Alignment"
              value={localContent.alignment}
              onChange={(val) => handleContentUpdate({ alignment: val })}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
            <EditableSelect
              label="Animation Style"
              value={localContent.animationStyle}
              onChange={(val) => handleContentUpdate({ animationStyle: val })}
              options={[
                { label: "Fade", value: "fade" },
                { label: "Slide", value: "slide" },
                { label: "Zoom", value: "zoom" },
                { label: "Bounce", value: "bounce" },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <EditableCheckbox
              label="Enable Overlay"
              checked={
                localContent.overlay !== undefined ? localContent.overlay : true
              }
              onChange={(val) => handleContentUpdate({ overlay: val })}
            />
            <EditableCheckbox
              label="Enable Animations"
              checked={
                localContent.animationEnabled !== undefined
                  ? localContent.animationEnabled
                  : true
              }
              onChange={(val) => handleContentUpdate({ animationEnabled: val })}
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#06b6d4" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #06b6d4, #67e8f9)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Features</h4>
          </div>
          <p className="text-sm text-gray-500">
            Add up to 3 quick features for this section (displayed as chips).
          </p>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {(localContent.features || [])
              .slice(0, 3)
              .map((f: string, i: number) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <EditableText
                      label=""
                      value={f}
                      onChange={(val) => {
                        const arr = [...(localContent.features || [])];
                        arr[i] = val;
                        handleContentUpdate({ features: arr });
                      }}
                      placeholder="Feature name"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const arr = [...(localContent.features || [])];
                      arr.splice(i, 1);
                      handleContentUpdate({ features: arr });
                    }}
                    className="rounded px-3 py-2 bg-red-50 border border-red-100 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <div>
              <button
                onClick={() => {
                  const arr = [...(localContent.features || [])];
                  if (arr.length < 3) arr.push("New Feature");
                  handleContentUpdate({ features: arr });
                }}
                className="rounded-lg px-4 py-2"
                style={{
                  backgroundColor: hexToRGBA(localContent.accentColor, 0.08),
                  borderColor: hexToRGBA(localContent.accentColor, 0.1),
                  color: localContent.accentColor,
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
              >
                Add Feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
