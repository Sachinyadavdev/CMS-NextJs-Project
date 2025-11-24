"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { InfrastructureResourceHeroSection } from "@/lib/db";
import MediaUpload from "@/app/components/MediaUpload";
import BannerButton from "../CommonComponents/BannerButton";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
  EditableRange,
} from "@/app/components/EditableInputs";

interface Props {
  section: InfrastructureResourceHeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InfrastructureResourceHeroSection>) => void;
}

export default function EditableInfrastructureResourceHeroSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const content = {
    title: "Building Tomorrow's Infrastructure",
    subtitle: "Excellence. Innovation. Results.",
    description: "We deliver world-class infrastructure solutions that power communities, drive economic growth, and create lasting value for generations to come.",
    primaryButtonText: "Explore Our Projects",
    primaryButtonLink: "#projects",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "#about",
    backgroundImage: "",
    backgroundVideo: "",
    backgroundColor: "#0f172a",
    textColor: "#e2e8f0",
    titleColor: "#ffffff",
    subtitleColor: "#EF4130",
    accentColor: "#EF4130",
    overlayOpacity: 0.65,
    overlayColor: "#020617",
    alignment: "center",
    height: "full",
    overlay: true,
    animationEnabled: true,
    showStats: true,
    stats: [
      { label: "Projects Completed", value: "500+", icon: "🏗️" },
      { label: "Years Experience", value: "25+", icon: "⏱️" },
      { label: "Countries Served", value: "15+", icon: "🌍" },
      { label: "Team Members", value: "2000+", icon: "👥" },
    ],
    ...section,
  } as any;

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
  };

  const handleStatUpdate = (index: number, patch: Partial<typeof content.stats[0]>) => {
    const updated = content.stats.map((s: any, i: number) =>
      i === index ? { ...s, ...patch } : s
    );
    handleUpdate({ stats: updated });
  };

  const handleAddStat = () => {
    const newStat = { label: "New Metric", value: "0", icon: "📊" };
    handleUpdate({ stats: [...content.stats, newStat] });
  };

  const handleRemoveStat = (index: number) => {
    handleUpdate({ stats: content.stats.filter((_: any, i: number) => i !== index) });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
    return undefined;
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  if (!isEditing) {
    return (
      <section
        className={`relative overflow-hidden flex items-center justify-center ${
          content.height === "full" ? "min-h-screen" : "min-h-[80vh]"
        } cursor-crosshair`}
        style={{ backgroundColor: content.backgroundColor }}
        onMouseMove={(e: any) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
      >
        {/* Animated Grid */}
        {content.animationEnabled && (
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(${content.accentColor}30 1px, transparent 1px), linear-gradient(90deg, ${content.accentColor}30 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
                animation: "gridMove 30s linear infinite",
              }}
            />
          </div>
        )}

        {/* Floating Particles */}
        {content.animationEnabled && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: content.accentColor,
                  boxShadow: `0 0 30px ${content.accentColor}`,
                  left: `${(i * 100) / 12}%`,
                }}
                animate={{ y: [-200, typeof window !== "undefined" ? window.innerHeight + 200 : 1000] }}
                transition={{
                  duration: 18 + i * 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}

        {/* Background Media */}
        {content.backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={content.backgroundVideo} type="video/mp4" />
          </video>
        )}
        {content.backgroundImage && !content.backgroundVideo && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${content.backgroundImage})`,
              filter: "brightness(0.5)",
            }}
          />
        )}

        {/* Overlay */}
        {content.overlay && (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${content.overlayColor}ee, ${content.overlayColor}cc)`,
              opacity: content.overlayOpacity,
            }}
          />
        )}

        {/* Mouse-following Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(1200px circle at ${mouseX}px ${mouseY}px, ${content.accentColor}33, transparent 45%)`,
            opacity: 0.6,
          }}
        />

        {/* Inner Bright Glow */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${content.accentColor}66, transparent 60%)`,
            opacity: 0.4,
          }}
        />

        {/* Ring Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${content.accentColor}00, ${content.accentColor}22 40%, transparent 70%)`,
            opacity: 0.7,
          }}
        />

        {/* Animated Background Glow */}
        <motion.div
          className="absolute -left-40 top-20 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${content.accentColor}88, transparent)`,
            rotateX,
            rotateY,
          }}
          animate={{ x: [-50, 100, -50], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Mouse Position Indicator Ring */}
        <motion.div
          className="pointer-events-none absolute -inset-10"
          style={{
            background: `conic-gradient(from 0deg, ${content.accentColor}40, transparent, transparent, ${content.accentColor}40)`,
            backgroundSize: '400% 400%',
            animation: 'rotate 8s linear infinite',
            WebkitMaskImage: `radial-gradient(circle at ${mouseX}px ${mouseY}px, black 0%, black 300px, transparent 500px)`,
            maskImage: `radial-gradient(circle at ${mouseX}px ${mouseY}px, black 0%, black 300px, transparent 500px)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {content.subtitle && (
              <motion.p
                className="text-3xl md:text-5xl font-light tracking-widest mb-8"
                style={{ color: content.subtitleColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {content.subtitle}
              </motion.p>
            )}

            {content.title && (
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-10"
                style={{ color: content.titleColor }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                {content.title}
              </motion.h1>
            )}

            {content.description && (
              <motion.p
                className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light opacity-90 mb-12"
                style={{ color: content.textColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {content.description}
              </motion.p>
            )}

            {/* Stats Grid */}
            {content.showStats && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12"
              >
                {content.stats.map((stat: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + index * 0.1,
                    }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl mb-2">{stat.icon}</div>
                    <div
                      className="text-3xl lg:text-4xl font-bold mb-2"
                      style={{ color: content.titleColor }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-sm lg:text-base font-medium uppercase tracking-wide"
                      style={{ color: content.textColor }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Buttons */}
            <motion.div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${
                content.alignment === "left"
                  ? "justify-start"
                  : content.alignment === "right"
                  ? "justify-end"
                  : "justify-center"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              {content.primaryButtonText && (
                <BannerButton
                  text={content.primaryButtonText}
                  href={content.primaryButtonLink}
                  variant="gradient"
                  size="xl"
                  animation="glow"
                  shadow={true}
                  rounded="lg"
                  className={`min-w-[220px] bg-[linear-gradient(45deg,_${content.accentColor},_#8b5cf6)]`}
                />
              )}

              {content.secondaryButtonText && (
                <BannerButton
                  text={content.secondaryButtonText}
                  href={content.secondaryButtonLink}
                  variant="outline"
                  size="xl"
                  animation="pulse"
                  shadow={true}
                  rounded="lg"
                  className="min-w-[220px] border-2"
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>

        <style jsx>{`
          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }
          @keyframes rotate {
            0% {
              background-position: 0% 0%;
            }
            100% {
              background-position: 360% 360%;
            }
          }
        `}</style>
      </section>
    );
  }

  // ========================= EDIT MODE =========================
  return (
    <div className="mb-12 space-y-8">
      {/* Live Preview */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
          Live Preview - Infrastructure Hero
          <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
        </h3>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          <div className="h-[400px] relative overflow-hidden">
            <EditableInfrastructureResourceHeroSection
              section={content}
              isEditing={false}
              onUpdate={() => {}}
            />
          </div>
        </div>
      </div>

      {/* EDITING PANEL */}
      <div className="rounded-xl border border-blue-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Edit Infrastructure Hero Banner
        </h3>

        <div className="space-y-8">
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(value: any) => handleUpdate({ title: value })}
              placeholder="Building Tomorrow's Infrastructure"
            />
            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(value: any) => handleUpdate({ subtitle: value })}
            />
            <EditableTextarea
              label="Description"
              value={content.description || ""}
              onChange={(value: any) => handleUpdate({ description: value })}
              rows={4}
              className="md:col-span-2"
            />
          </div>

          {/* Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={content.backgroundImage}
              onUpload={(url) => handleUpdate({ backgroundImage: url })}
              onRemove={() => handleUpdate({ backgroundImage: "" })}
            />
            <MediaUpload
              label="Background Video"
              type="video"
              currentUrl={content.backgroundVideo}
              onUpload={(url) => handleUpdate({ backgroundVideo: url })}
              onRemove={() => handleUpdate({ backgroundVideo: "" })}
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <EditableColorPicker
              label="Background"
              value={content.backgroundColor}
              onChange={(value: any) => handleUpdate({ backgroundColor: value })}
            />
            <EditableColorPicker
              label="Title Color"
              value={content.titleColor}
              onChange={(value: any) => handleUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={content.subtitleColor}
              onChange={(value: any) => handleUpdate({ subtitleColor: value })}
            />
            <EditableColorPicker
              label="Accent Color"
              value={content.accentColor}
              onChange={(value: any) => handleUpdate({ accentColor: value })}
            />
            <EditableColorPicker
              label="Text Color"
              value={content.textColor}
              onChange={(value: any) => handleUpdate({ textColor: value })}
            />
            <EditableColorPicker
              label="Overlay Color"
              value={content.overlayColor}
              onChange={(value: any) => handleUpdate({ overlayColor: value })}
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableText
              label="Primary Button Text"
              value={content.primaryButtonText || ""}
              onChange={(value: any) => handleUpdate({ primaryButtonText: value })}
            />
            <EditableText
              label="Primary Button Link"
              value={content.primaryButtonLink || ""}
              onChange={(value: any) => handleUpdate({ primaryButtonLink: value })}
            />
            <EditableText
              label="Secondary Button Text"
              value={content.secondaryButtonText || ""}
              onChange={(value: any) => handleUpdate({ secondaryButtonText: value })}
            />
            <EditableText
              label="Secondary Button Link"
              value={content.secondaryButtonLink || ""}
              onChange={(value: any) => handleUpdate({ secondaryButtonLink: value })}
            />
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <EditableCheckbox
              label="Show Overlay"
              checked={content.overlay}
              onChange={(value: any) => handleUpdate({ overlay: value })}
            />
            <EditableCheckbox
              label="Enable Animations"
              checked={content.animationEnabled}
              onChange={(value: any) => handleUpdate({ animationEnabled: value })}
            />
            <EditableCheckbox
              label="Show Statistics"
              checked={content.showStats}
              onChange={(value: any) => handleUpdate({ showStats: value })}
            />
            <EditableRange
              label={`Overlay Opacity: ${content.overlayOpacity}`}
              value={content.overlayOpacity}
              min={0}
              max={1}
              step={0.1}
              onChange={(value: any) => handleUpdate({ overlayOpacity: value })}
            />
          </div>

          {/* Statistics */}
          {content.showStats && (
            <div className="border-t pt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Statistics</h3>
                <button
                  onClick={handleAddStat}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  + Add Stat
                </button>
              </div>

              <AnimatePresence>
                {content.stats.map((stat: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">Stat {i + 1}</h4>
                      <button
                        onClick={() => handleRemoveStat(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <EditableText
                        label="Icon (Emoji)"
                        value={stat.icon}
                        onChange={(value: any) => handleStatUpdate(i, { icon: value })}
                      />
                      <EditableText
                        label="Value"
                        value={stat.value}
                        onChange={(value: any) => handleStatUpdate(i, { value: value })}
                      />
                      <EditableText
                        label="Label"
                        value={stat.label}
                        onChange={(value: any) => handleStatUpdate(i, { label: value })}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
