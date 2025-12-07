"use client";

import React, { useState, useEffect } from "react";
import { HeroContent as BaseHeroContent } from "@/lib/db";

type HeroContent = BaseHeroContent & {
  buttonVariant?: string;
  secondaryButtonVariant?: string;
  buttonAnimation?: string;
  secondaryButtonAnimation?: string;
  buttonIcon?: string;
  secondaryButtonIcon?: string;
  // Add any other custom fields used in your object
};
import MediaUpload from "../../MediaUpload";
import BannerButton from "../CommonComponents/BannerButton";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableRange,
} from "@/app/components/EditableInputs";

interface DigitalTransformationHeroProps {
  section: { content?: HeroContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: HeroContent }>) => void;
}

export default function DigitalTransformationHeroBanner({
  section,
  isEditing,
  onUpdate,
}: DigitalTransformationHeroProps) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const content: HeroContent & {
    buttonAnimation?: string;
    secondaryButtonAnimation?: string;
    buttonIcon?: string;
    secondaryButtonIcon?: string;
    secondaryButtonVariant?: string;
  } = {
    title: "Digital Transformation",
    subtitle: "Reimagining the Future of Business",
    description:
      "Leverage cutting-edge technologies to accelerate innovation, streamline operations and deliver unparalleled customer experiences in the digital era.",
    buttonText: "Start Your Journey",
    buttonLink: "#contact",
    buttonVariant: "gradient",
    buttonAnimation: "glow",
    secondaryButtonText: "See Case Studies",
    secondaryButtonLink: "#cases",
    secondaryButtonVariant: "outline",
    secondaryButtonAnimation: "pulse",
    backgroundColor: "#0f172a",
    accentColor: "#00d4ff",
    textColor: "#e2e8f0",
    overlayOpacity: 0.5,
    overlayColor: "#020617",
    alignment: "center",
    height: "full",
    overlay: true,
    animationEnabled: true,
    ...section.content,
  };

  const bgImage = content.backgroundImage || content.imageUrl;
  const bgVideo = content.backgroundVideo || content.videoUrl;

  const handleUpdate = (updates: Partial<HeroContent>) => {
    onUpdate({ content: { ...content, ...updates } });
  };

  // Mouse parallax for glowing orbs
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
                animate={{
                  y: [
                    -200,
                    typeof window !== "undefined"
                      ? window.innerHeight + 200
                      : 1000,
                  ],
                }}
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
        {bgVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
        )}
        {bgImage && !bgVideo && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bgImage})`,
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

        {/* Mouse-following Glow Orbs */}
        <motion.div
          className="pointer-events-none absolute -inset-10 opacity-40"
          style={{
            background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, ${content.accentColor}44, transparent 40%)`,
            x,
            y,
          }}
        />

        <motion.div
          className="absolute -left-40 top-20 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            background: `radial-gradient(circle, ${content.accentColor}aa, transparent)`,
            rotateX,
            rotateY,
          }}
          animate={{ x: [-50, 100, -50], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
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
                style={{ color: content.accentColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {content.subtitle}
              </motion.p>
            )}

            {content.title && (
              <motion.h1
                className="text-4xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-10"
                style={{ color: content.textColor }}
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

            {/* Buttons - Exactly like your reference */}
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
              {content.buttonText && (
                <BannerButton
                  text={content.buttonText}
                  href={content.buttonLink}
                  variant={(content.buttonVariant as any) || "gradient"}
                  size="xl"
                  icon={content.buttonIcon as any}
                  animation={(content.buttonAnimation as any) || "glow"}
                  shadow={true}
                  rounded="lg"
                  className={`min-w-[220px] ${
                    content.buttonVariant === "gradient"
                      ? "bg-[linear-gradient(45deg,_" +
                        content.accentColor +
                        ",_#8b5cf6)]"
                      : ""
                  }`}
                />
              )}

              {content.secondaryButtonText && (
                <BannerButton
                  text={content.secondaryButtonText}
                  href={content.secondaryButtonLink}
                  variant={
                    (content.secondaryButtonVariant as
                      | "gradient"
                      | "outline"
                      | "primary"
                      | "secondary"
                      | "ghost") || "outline"
                  }
                  size="xl"
                  icon={(content.secondaryButtonIcon as any) || "arrow-right"}
                  animation={
                    (content.secondaryButtonAnimation as any) || "pulse"
                  }
                  shadow={true}
                  rounded="lg"
                  className={`min-w-[220px] border-2`}
                />
              )}
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes gridMove {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(60px, 60px);
            }
          }
        `}</style>
      </section>
    );
  }

  // ========================= EDIT MODE - WHITE LIKE ORIGINAL =========================
  return (
    <div className="mb-12 space-y-8">
      {/* Live Preview */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
          Live Preview - Digital Transformation Hero
          <span className="h-3 w-3 rounded-full bg-cyan-400 animate-pulse" />
        </h3>
        <div className="rounded-lg overflow-hidden border border-gray-200">
          {/* Reuse view mode but in small preview size */}
          <div className="h-[400px] relative overflow-hidden">
            <DigitalTransformationHeroBanner
              section={{ content }}
              isEditing={false}
              onUpdate={() => {}}
            />
          </div>
        </div>
      </div>

      {/* EDITING PANEL - CLEAN WHITE */}
      <div className="rounded-xl border border-blue-200 bg-white p-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Edit Digital Transformation Hero Banner
        </h3>

        <div className="space-y-8">
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(e: any) => handleUpdate({ title: e.target.value })}
            />
            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(e: any) => handleUpdate({ subtitle: e.target.value })}
            />
            <div className="md:col-span-2">
              <EditableTextarea
                label="Description"
                value={content.description || ""}
                onChange={(e: any) =>
                  handleUpdate({ description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Background */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={bgImage}
              onUpload={(url) =>
                handleUpdate({ backgroundImage: url, imageUrl: url })
              }
              onRemove={() =>
                handleUpdate({ backgroundImage: "", imageUrl: "" })
              }
            />
            <MediaUpload
              label="Background Video"
              type="video"
              currentUrl={bgVideo}
              onUpload={(url) =>
                handleUpdate({ backgroundVideo: url, videoUrl: url })
              }
              onRemove={() =>
                handleUpdate({ backgroundVideo: "", videoUrl: "" })
              }
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <EditableColorPicker
              label="Accent Color"
              value={content.accentColor || "#00d4ff"}
              onChange={(e: any) =>
                handleUpdate({ accentColor: e.target.value })
              }
            />
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "#0f172a"}
              onChange={(e: any) =>
                handleUpdate({ backgroundColor: e.target.value })
              }
            />
            <EditableColorPicker
              label="Text Color"
              value={content.textColor || "#e2e8f0"}
              onChange={(e: any) => handleUpdate({ textColor: e.target.value })}
            />
            <EditableRange
              label="Overlay Opacity"
              value={content.overlayOpacity || 0.65}
              onChange={(e: any) =>
                handleUpdate({ overlayOpacity: parseFloat(e.target.value) })
              }
              min={0}
              max={1}
              step={0.05}
            />
          </div>

          {/* Primary Button */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Primary Button</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EditableText
                label="Button Text"
                value={content.buttonText || ""}
                onChange={(e: any) =>
                  handleUpdate({ buttonText: e.target.value })
                }
              />
              <EditableText
                label="Link"
                value={content.buttonLink || ""}
                onChange={(e: any) =>
                  handleUpdate({ buttonLink: e.target.value })
                }
              />
              <EditableSelect
                label="Variant"
                value={content.buttonVariant || "gradient"}
                onChange={(e: any) =>
                  handleUpdate({ buttonVariant: e.target.value as any })
                }
                options={[
                  { value: "gradient", label: "Gradient" },
                  { value: "primary", label: "Primary" },
                  { value: "outline", label: "Outline" },
                ]}
              />
            </div>
          </div>

          {/* Secondary Button */}
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-900 mb-4">
              Secondary Button
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EditableText
                label="Button Text"
                value={content.secondaryButtonText || ""}
                onChange={(e: any) =>
                  handleUpdate({ secondaryButtonText: e.target.value })
                }
              />
              <EditableText
                label="Link"
                value={content.secondaryButtonLink || ""}
                onChange={(e: any) =>
                  handleUpdate({ secondaryButtonLink: e.target.value })
                }
              />
              <EditableSelect
                label="Variant"
                value={content.secondaryButtonVariant || "outline"}
                onChange={(e: any) =>
                  handleUpdate({
                    secondaryButtonVariant: e.target.value,
                  } as Partial<HeroContent>)
                }
                options={[
                  { value: "outline", label: "Outline" },
                  { value: "ghost", label: "Ghost" },
                  { value: "primary", label: "Primary" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
