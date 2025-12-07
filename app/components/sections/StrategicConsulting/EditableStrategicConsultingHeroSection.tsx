"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StrategicConsultingHeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableCheckbox, EditableRange, EditableSelect } from "@/app/components/EditableInputs";
import SectionEditorLayout from "./SectionEditorLayout";
import { strategicTheme, strategicSectionWrapper } from "./StrategicConsultingTheme";

interface EditableStrategicConsultingHeroProps {
  section: StrategicConsultingHeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<StrategicConsultingHeroSection>) => void;
}

export default function EditableStrategicConsultingHeroSection({
  section,
  isEditing,
  onUpdate,
}: EditableStrategicConsultingHeroProps) {
  const content = section.content || {};
  const {
    title = "Strategic Consulting Excellence",
    subtitle = "Transforming Businesses Through Strategic Innovation",
    description = "We provide comprehensive strategic consulting services to help organizations navigate complex challenges and achieve sustainable growth in today's dynamic business environment.",
    primaryButtonText = "Get Started",
    primaryButtonLink = "#contact",
    secondaryButtonText = "Our Approach",
    secondaryButtonLink = "#methodology",
    backgroundImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920",
    backgroundVideo = "",
    backgroundColor = strategicTheme.pageBackground,
    textColor = strategicTheme.textSecondary,
    titleColor = strategicTheme.textPrimary,
    subtitleColor = strategicTheme.accent,
    primaryButtonColor = strategicTheme.accent,
    secondaryButtonColor = strategicTheme.surfaceAlt,
    overlayOpacity = 0.75,
    showParticles = true,
    showFloatingElements = true,
    titleAlignment = "left",
    subtitleAlignment = "left",
    descriptionAlignment = "left",
    titleSize = "xl",
    subtitleSize = "large",
    descriptionSize = "medium",
  } = content;

  const [animatedTitle, setAnimatedTitle] = useState(false);
  const [animatedSubtitle, setAnimatedSubtitle] = useState(false);
  const [animatedDescription, setAnimatedDescription] = useState(false);
  const [animatedButtons, setAnimatedButtons] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimatedTitle(true), 300);
    const timer2 = setTimeout(() => setAnimatedSubtitle(true), 500);
    const timer3 = setTimeout(() => setAnimatedDescription(true), 700);
    const timer4 = setTimeout(() => setAnimatedButtons(true), 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  // Helper to get Tailwind classes for size and alignment
  const getTextClasses = (size: string, alignment: string) => {
    const sizeMap: Record<string, string> = {
      small: "text-sm lg:text-base",
      medium: "text-lg lg:text-xl",
      large: "text-2xl lg:text-3xl",
      xl: "text-4xl lg:text-5xl xl:text-6xl",
    };
    const alignMap: Record<string, string> = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    };
    return `${sizeMap[size] || sizeMap.medium} ${
      alignMap[alignment] || alignMap.left
    }`;
  };

  // Helper for preview sizes (smaller scale)
  const getPreviewTextClasses = (size: string) => {
    const previewSizeMap: Record<string, string> = {
      small: "text-xs",
      medium: "text-sm",
      large: "text-base",
      xl: "text-lg",
    };
    return previewSizeMap[size] || previewSizeMap.medium;
  };

  if (!isEditing) {
    return (
      <section
        ref={heroRef}
        className={`${strategicSectionWrapper} min-h-screen flex items-center justify-start`}
        style={{ backgroundColor }}
      >
        {/* Advanced Background with Parallax */}
        <div className="absolute inset-0 z-0">
          {backgroundVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ transform: "translateZ(0)" }}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          ) : backgroundImage ? (
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${backgroundImage}")`,
                transform: "translateZ(0)",
              }}
            />
          ) : null}

          {/* Dynamic Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#05070F]/95 via-[#0B1220]/85 to-[#160a0a]/75"
            style={{ opacity: overlayOpacity }}
          />

          {/* Additional Gradient Accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#EF4130]/15 via-transparent to-[#FF6B4A]/10" />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent 95%, ${textColor}20 100%)`,
                backgroundSize: "60px 60px",
                animation: "gridMove 20s linear infinite",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(transparent 95%, ${textColor}20 100%)`,
                backgroundSize: "60px 60px",
                animation: "gridMove 15s linear infinite reverse",
              }}
            />
          </div>
        </div>

        {/* Animated Floating Elements */}
        {showFloatingElements && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Strategic Icons Floating */}
            <div className="absolute top-20 left-20 w-20 h-20 bg-[#EF4130]/15 rounded-full blur-xl animate-float-slow" />
            <div className="absolute top-40 right-32 w-16 h-16 bg-[#FF6B4A]/15 rounded-full blur-lg animate-float-medium" />
            <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-[#EF4130]/8 rounded-full blur-2xl animate-float-slow" />

            {/* Geometric Shapes */}
            <div className="absolute top-1/3 right-40 w-3 h-3 bg-[#EF4130]/40 rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-40 w-2 h-2 bg-[#FF6B4A]/30 rounded-full animate-pulse delay-1000" />
            <div className="absolute top-2/3 right-60 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-500" />

            {/* Floating Business Icons */}
            <div className="absolute top-1/4 right-1/4 transform rotate-12 animate-float-slow">
              <div className="w-12 h-12 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-1/3 left-1/3 transform -rotate-6 animate-float-medium delay-1000">
              <div className="w-10 h-10 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Particle System */}
        {showParticles && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `particleFloat ${
                    4 + Math.random() * 3
                  }s ease-in-out infinite ${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Custom Animations */}
        <style jsx>{`
          @keyframes float-slow {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.7;
            }
            33% {
              transform: translateY(-30px) translateX(15px) scale(1.1);
              opacity: 0.9;
            }
            66% {
              transform: translateY(20px) translateX(-10px) scale(0.9);
              opacity: 0.5;
            }
          }
          @keyframes float-medium {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-40px) translateX(20px) scale(1.2);
              opacity: 0.8;
            }
          }
          @keyframes particleFloat {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg);
              opacity: 0.3;
            }
            50% {
              transform: translateY(-80px) rotate(180deg);
              opacity: 0.8;
            }
          }
          @keyframes gridMove {
            0% {
              transform: translateX(0) translateY(0);
            }
            100% {
              transform: translateX(-60px) translateY(-60px);
            }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              {/* Subtitle with Enhanced Accent */}
              <div
                className={`inline-flex items-center gap-4 transition-all duration-1000 ${
                  animatedSubtitle
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
                <span
                  className="font-semibold tracking-widest uppercase text-sm letter-spacing-wider"
                  style={{ color: subtitleColor }}
                >
                  {subtitle}
                </span>
              </div>

              {/* Main Title with Enhanced Styling */}
              <div className="relative">
                <h1
                  className={`font-bold leading-tight transition-all duration-1000 mb-6 ${
                    animatedTitle
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  } ${getTextClasses(titleSize, titleAlignment)}`}
                  style={{
                    color: titleColor,
                    background: `linear-gradient(135deg, ${titleColor}dd, ${titleColor}ff)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: `0 4px 30px ${titleColor}20`,
                  }}
                >
                  {title}
                </h1>

                {/* Title Accent Line */}
                <div
                  className={`w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 delay-300 ${
                    animatedTitle
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                />
              </div>

              {/* Description with Enhanced Styling */}
              {description && (
                <div className="relative">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-red-500/50 to-transparent rounded-full" />
                  <p
                    className={`leading-relaxed transition-all duration-1000 ${
                      animatedDescription
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    } ${getTextClasses(descriptionSize, descriptionAlignment)}`}
                    style={{
                      color: textColor,
                    }}
                  >
                    {description}
                  </p>
                </div>
              )}

              {/* Enhanced Action Buttons */}
              {(primaryButtonText || secondaryButtonText) && (
                <div
                  className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 ${
                    animatedButtons
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {primaryButtonText && (
                    <a
                      href={primaryButtonLink || "#"}
                      className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${primaryButtonColor}, ${primaryButtonColor}dd)`,
                        boxShadow: `0 8px 32px ${primaryButtonColor}40, 0 2px 12px ${primaryButtonColor}60`,
                      }}
                    >
                      <span className="relative z-10 text-white flex items-center gap-3">
                        {primaryButtonText}
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <div className="absolute inset-0 border border-white/20 rounded-xl group-hover:border-white/40 transition-colors" />
                    </a>
                  )}

                  {secondaryButtonText && (
                    <a
                      href={secondaryButtonLink || "#"}
                      className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-500 backdrop-blur-sm bg-white/5 hover:bg-white/10 transform hover:scale-105 overflow-hidden"
                      style={{
                        borderColor:
                          secondaryButtonColor === "transparent"
                            ? "rgba(255,255,255,0.3)"
                            : secondaryButtonColor,
                        color: textColor,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {secondaryButtonText}
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Side - Enhanced Visual Element */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Abstract Shape */}
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#EF4130]/10 to-[#FF6B4A]/10 backdrop-blur-sm border border-white/10 transform rotate-3 shadow-2xl overflow-hidden">
                  {/* Centered Large Strategy Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transform rotate-6">
                      <svg
                        className="w-20 h-20 text-white/70"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Inner Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

                  {/* Animated Orbs */}
                  <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-[#FF6B4A]/20 rounded-full blur-xl animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-red-400/15 rounded-full blur-2xl animate-pulse delay-1000" />

                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 transform rotate-12 animate-float-slow">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-8 h-8 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 transform -rotate-6 animate-float-medium delay-500">
                    <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white/60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#EF4130]/10 to-[#FF6B4A]/10 rounded-3xl blur-xl opacity-50 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center relative">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    return (
      <section
        className="relative min-h-[400px] flex items-center justify-start overflow-hidden rounded-xl border border-gray-200 shadow-lg"
        style={{ backgroundColor }}
      >
        {/* Background */}
        {(backgroundImage || backgroundVideo) && (
          <div className="absolute inset-0 z-0">
            {backgroundVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={backgroundVideo} type="video/mp4" />
              </video>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url("${backgroundImage}")` }}
              />
            )}
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-900/80"
              style={{ opacity: overlayOpacity }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 w-full px-6 py-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-red-500 rounded-full" />
              <span
                className="font-semibold text-xs uppercase tracking-wider"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </span>
            </div>
            <h1
              className={`font-bold leading-tight mb-4 ${getPreviewTextClasses(
                titleSize
              )}`}
              style={{ color: titleColor }}
            >
              {title}
            </h1>
            {description && (
              <p
                className={`leading-relaxed mb-6 ${getPreviewTextClasses(
                  descriptionSize
                )}`}
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              {primaryButtonText && (
                <a
                  href={primaryButtonLink || "#"}
                  className="px-6 py-3 font-semibold rounded-lg text-white text-sm shadow-lg"
                  style={{ backgroundColor: primaryButtonColor }}
                >
                  {primaryButtonText}
                </a>
              )}
              {secondaryButtonText && (
                <a
                  href={secondaryButtonLink || "#"}
                  className="px-6 py-3 font-semibold rounded-lg border text-sm backdrop-blur-sm bg-white/5"
                  style={{
                    borderColor:
                      secondaryButtonColor === "transparent"
                        ? "rgba(255,255,255,0.3)"
                        : secondaryButtonColor,
                    color: textColor,
                  }}
                >
                  {secondaryButtonText}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <SectionEditorLayout
      title="Hero Section Editor"
      description="Real-time editing with instant preview"
      preview={renderPreview()}
      controls={
        <>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Content
            </h2>
            <div className="space-y-6">
              <EditableText
                label="📝 Title"
                value={title}
                onChange={(value) => handleContentUpdate({ title: value })}
              />

              <EditableText
                label="📋 Subtitle"
                value={subtitle}
                onChange={(value) => handleContentUpdate({ subtitle: value })}
              />

              <EditableTextarea
                label="📄 Description"
                value={description}
                onChange={(value) => handleContentUpdate({ description: value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <EditableText
                  label="🔘 Primary Button Text"
                  value={primaryButtonText}
                  onChange={(value) => handleContentUpdate({ primaryButtonText: value })}
                />
                <EditableText
                  label="🔗 Primary Button Link"
                  value={primaryButtonLink}
                  onChange={(value) => handleContentUpdate({ primaryButtonLink: value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EditableText
                  label="🔘 Secondary Button Text"
                  value={secondaryButtonText}
                  onChange={(value) => handleContentUpdate({ secondaryButtonText: value })}
                />
                <EditableText
                  label="🔗 Secondary Button Link"
                  value={secondaryButtonLink}
                  onChange={(value) => handleContentUpdate({ secondaryButtonLink: value })}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Style & Media
            </h2>
            <div className="space-y-7">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Background Image
                </label>
                <MediaUpload
                  label="Background Image"
                  type="image"
                  currentUrl={backgroundImage}
                  onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
                  onRemove={() => handleContentUpdate({ backgroundImage: "" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Background Video
                </label>
                <MediaUpload
                  label="Background Video"
                  type="video"
                  currentUrl={backgroundVideo}
                  onUpload={(url) => handleContentUpdate({ backgroundVideo: url })}
                  onRemove={() => handleContentUpdate({ backgroundVideo: "" })}
                />
              </div>

              <EditableColorPicker
                label="🎨 Fallback Background Color"
                value={backgroundColor}
                onChange={(value) => handleContentUpdate({ backgroundColor: value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <EditableColorPicker
                  label="🎨 Text Color"
                  value={textColor}
                  onChange={(value) => handleContentUpdate({ textColor: value })}
                />
                <EditableColorPicker
                  label="📝 Title Color"
                  value={titleColor}
                  onChange={(value) => handleContentUpdate({ titleColor: value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <EditableColorPicker
                  label="📋 Subtitle Color"
                  value={subtitleColor}
                  onChange={(value) => handleContentUpdate({ subtitleColor: value })}
                />
                <EditableColorPicker
                  label="🔘 Primary Button Color"
                  value={primaryButtonColor}
                  onChange={(value) => handleContentUpdate({ primaryButtonColor: value })}
                />
              </div>

              <EditableRange
                label="👁️ Overlay Opacity"
                value={overlayOpacity}
                onChange={(value) => handleContentUpdate({ overlayOpacity: value })}
                min={0}
                max={1}
                step={0.05}
                unit="%"
              />

              <div className="space-y-4">
                <EditableCheckbox
                  label="✨ Show Particles"
                  checked={showParticles}
                  onChange={(value) => handleContentUpdate({ showParticles: value })}
                />
                <EditableCheckbox
                  label="🎭 Show Floating Elements"
                  checked={showFloatingElements}
                  onChange={(value) => handleContentUpdate({ showFloatingElements: value })}
                />
              </div>
            </div>
          </motion.div>
        </>
      }
    />
  );
}
