"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
  EditableTextarea,
  EditableColorPicker,
  EditableText,
  EditableCheckbox,
  EditableRange,
  EditableSelect,
  EditableNumber,
} from "@/app/components/EditableInputs";
import MediaUpload from "@/app/components/MediaUpload";
import { Sparkles, ChevronDown } from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { mobilityTheme, mobilitySectionWrapper } from "./MobilityTheme";
import BannerButton from "@/app/components/sections/CommonComponents/BannerButton";

interface ControlGroupProps {
  title: string;
  id: string;
  activeId: string;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

type HeroStat = {
  label: string;
  value: string;
  detail?: string;
};

const defaultHeroStats: HeroStat[] = [
  {
    label: "Transit transformations",
    value: "120+",
    detail: "City-scale upgrades",
  },
  {
    label: "Grid efficiency gains",
    value: "28%",
    detail: "Average energy savings",
  },
  { label: "Connected districts", value: "18", detail: "Across the region" },
];

function ControlGroup({
  title,
  id,
  activeId,
  onToggle,
  children,
}: ControlGroupProps) {
  const isOpen = activeId === id;
  return (
    <motion.div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white/50 hover:bg-white/70 transition-colors">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>
      {isOpen && (
        <div className="p-3 space-y-3 border-t border-gray-200/50">
          {children}
        </div>
      )}
    </motion.div>
  );
}

interface EditableMobilityHeroProps {
  section: PageSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
}

export default function EditableMobilityHero({
  section,
  isEditing,
  onUpdate,
}: EditableMobilityHeroProps) {
  const content = (section.content || {}) as MobilityContent;
  const {
    heroEyebrow = "Mobility Intelligence Platform",
    heroHeadline = "Connected transport networks engineered for tomorrow",
    heroText = "Powering progress means more than meeting demand—it's about building smarter, cleaner and future-ready systems. RAUS brings together technical depth and industry insight to deliver energy and resource solutions that perform today and evolve for tomorrow.",
    heroBadgeLabel = "Infrastructure + Energy + Data",
    heroBadgeSubtext = "Integrated delivery partners",
    heroPrimaryActionLabel = "Plan a mobility workshop",
    heroPrimaryActionLink = "#contact",
    heroSecondaryActionLabel = "See capabilities",
    heroSecondaryActionLink = "#case-studies",
    heroImageUrl = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    heroVideoUrl = "",
    heroImageAlt = "Mobility network visualization",
    heroImageOverlay = "rgba(15,23,42,0.55)",
    heroGlowColor = "rgba(14,165,233,0.45)",
    heroPatternColor = "rgba(56,189,248,0.18)",
    heroCardBackgroundColor = mobilityTheme.card,
    heroStats = defaultHeroStats,
    heroShowScrollIndicator = true,
    heroScrollLabel = "Scroll to explore the network",
    heroGridOpacity = 0.35,
    backgroundColor = mobilityTheme.pageBackground,
    backgroundImageUrl = "",
    backgroundImageOverlay = "rgba(0,0,0,0.5)",
    textColor = mobilityTheme.textPrimary,
    accentColor = mobilityTheme.accent,
    heroSecondaryAccentColor = mobilityTheme.accentSecondary,
    heroEyebrowIcon = "Sparkles",
    heroHeadlineSize = "6xl",
    heroTextSize = "xl",
    heroBadgePosition = "top-left",
    heroBadgeBackgroundColor = "rgba(255,255,255,0.1)",
    heroBadgeTextColor = "#ffffff",
    heroContentAlignment = "left",
    heroLayout = "split",
    heroGridSize = 120,
    heroAnimationDuration = 0.8,
    heroAnimationDelay = 0.1,
    heroScrollIndicatorPosition = "bottom-center",
    heroScrollIndicatorStyle = "line",
    heroBorderRadius = 32,
    heroPadding = 24,
    heroMargin = 0,
    heroMinHeight = 70,
  } = content;

  const [activeSection, setActiveSection] = useState<string>("content");

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const heroStatsList = (heroStats as HeroStat[] | undefined)?.length
    ? (heroStats as HeroStat[])
    : defaultHeroStats;

  const handleStatUpdate = (
    index: number,
    field: keyof HeroStat,
    value: string
  ) => {
    const updated = [...heroStatsList];
    updated[index] = { ...updated[index], [field]: value };
    handleContentUpdate({ heroStats: updated });
  };

  const handleAddStat = () => {
    const updated = [...heroStatsList, { label: "New metric", value: "0" }];
    handleContentUpdate({ heroStats: updated });
  };

  const handleRemoveStat = (index: number) => {
    const updated = heroStatsList.filter((_, statIndex) => statIndex !== index);
    handleContentUpdate({ heroStats: updated });
  };

  const viewModeContent = {
    heroEyebrow,
    heroHeadline,
    heroText,
    heroBadgeLabel,
    heroBadgeSubtext,
    heroPrimaryActionLabel,
    heroPrimaryActionLink,
    heroSecondaryActionLabel,
    heroSecondaryActionLink,
    heroImageUrl,
    heroImageAlt,
    heroImageOverlay,
    heroGlowColor,
    heroPatternColor,
    heroCardBackgroundColor,
    heroStats: heroStatsList,
    heroShowScrollIndicator,
    heroScrollLabel,
    heroGridOpacity,
    backgroundColor,
    backgroundImageUrl,
    backgroundImageOverlay,
    textColor,
    accentColor,
    heroSecondaryAccentColor,
    heroLayout,
  };

  if (!isEditing) {
    return <MobilityHeroView content={viewModeContent} />;
  }

  return (
    <SectionEditorLayout
      title="Mobility Hero Editor"
      description="Add imagery, metrics and full configuration for the hero."
      preview={
        <div className="h-full overflow-auto">
          <MobilityHeroView content={viewModeContent} />
        </div>
      }
      controls={
        <div className="space-y-4">
          <ControlGroup
            title="Narrative"
            id="content"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableSelect
              label="Eyebrow Icon"
              value={heroEyebrowIcon}
              onChange={(value) =>
                handleContentUpdate({ heroEyebrowIcon: value })
              }
              options={[
                { label: "Sparkles", value: "Sparkles" },
                { label: "Zap", value: "Zap" },
                { label: "Target", value: "Target" },
                { label: "TrendingUp", value: "TrendingUp" },
                { label: "Globe", value: "Globe" },
                { label: "MapPin", value: "MapPin" },
              ]}
            />
            <EditableText
              label="Eyebrow"
              value={heroEyebrow}
              onChange={(value) => handleContentUpdate({ heroEyebrow: value })}
            />
            <EditableText
              label="Headline"
              value={heroHeadline}
              onChange={(value) => handleContentUpdate({ heroHeadline: value })}
            />
            <EditableTextarea
              label="Description"
              value={heroText}
              onChange={(value) => handleContentUpdate({ heroText: value })}
              rows={5}
            />
            <EditableText
              label="Badge Title"
              value={heroBadgeLabel}
              onChange={(value) =>
                handleContentUpdate({ heroBadgeLabel: value })
              }
            />
            <EditableText
              label="Badge Subtext"
              value={heroBadgeSubtext}
              onChange={(value) =>
                handleContentUpdate({ heroBadgeSubtext: value })
              }
            />
          </ControlGroup>
          <ControlGroup
            title="Actions"
            id="actions"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableText
              label="Primary Label"
              value={heroPrimaryActionLabel}
              onChange={(value) =>
                handleContentUpdate({ heroPrimaryActionLabel: value })
              }
            />
            <EditableText
              label="Primary Link"
              value={heroPrimaryActionLink}
              onChange={(value) =>
                handleContentUpdate({ heroPrimaryActionLink: value })
              }
            />
            <EditableText
              label="Secondary Label"
              value={heroSecondaryActionLabel}
              onChange={(value) =>
                handleContentUpdate({ heroSecondaryActionLabel: value })
              }
            />
            <EditableText
              label="Secondary Link"
              value={heroSecondaryActionLink}
              onChange={(value) =>
                handleContentUpdate({ heroSecondaryActionLink: value })
              }
            />
          </ControlGroup>
          <ControlGroup
            title="Imagery"
            id="imagery"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MediaUpload
                label="Hero Image"
                type="image"
                currentUrl={heroImageUrl}
                onUpload={(url) =>
                  handleContentUpdate({ heroImageUrl: url, heroVideoUrl: "" })
                }
                onRemove={() => handleContentUpdate({ heroImageUrl: "" })}
              />
              <MediaUpload
                label="Hero Video"
                type="video"
                currentUrl={heroVideoUrl}
                onUpload={(url) =>
                  handleContentUpdate({ heroVideoUrl: url, heroImageUrl: "" })
                }
                onRemove={() => handleContentUpdate({ heroVideoUrl: "" })}
              />
            </div>
            <EditableText
              label="Image Alt"
              value={heroImageAlt}
              onChange={(value) => handleContentUpdate({ heroImageAlt: value })}
            />
            <EditableColorPicker
              label="Image Overlay"
              value={heroImageOverlay}
              onChange={(value) =>
                handleContentUpdate({ heroImageOverlay: value })
              }
            />
            <EditableColorPicker
              label="Glow Color"
              value={heroGlowColor}
              onChange={(value) =>
                handleContentUpdate({ heroGlowColor: value })
              }
            />
            <EditableColorPicker
              label="Pattern Color"
              value={heroPatternColor}
              onChange={(value) =>
                handleContentUpdate({ heroPatternColor: value })
              }
            />
            <EditableSelect
              label="Badge Position"
              value={heroBadgePosition}
              onChange={(value) =>
                handleContentUpdate({ heroBadgePosition: value })
              }
              options={[
                { label: "Top Left", value: "top-left" },
                { label: "Top Right", value: "top-right" },
                { label: "Bottom Left", value: "bottom-left" },
                { label: "Bottom Right", value: "bottom-right" },
              ]}
            />
            <EditableColorPicker
              label="Badge Background"
              value={heroBadgeBackgroundColor}
              onChange={(value) =>
                handleContentUpdate({ heroBadgeBackgroundColor: value })
              }
            />
            <EditableColorPicker
              label="Badge Text Color"
              value={heroBadgeTextColor}
              onChange={(value) =>
                handleContentUpdate({ heroBadgeTextColor: value })
              }
            />
          </ControlGroup>
          <ControlGroup
            title="Metrics"
            id="metrics"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            {heroStatsList.map((stat, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border border-gray-200/80 p-3 bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    Metric {index + 1}
                  </span>
                  {heroStatsList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveStat(index)}
                      className="text-xs font-semibold text-rose-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <EditableText
                  label="Value"
                  value={stat.value}
                  onChange={(value) => handleStatUpdate(index, "value", value)}
                />
                <EditableText
                  label="Label"
                  value={stat.label}
                  onChange={(value) => handleStatUpdate(index, "label", value)}
                />
                <EditableText
                  label="Detail"
                  value={stat.detail || ""}
                  onChange={(value) => handleStatUpdate(index, "detail", value)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddStat}
              className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Add Metric
            </button>
          </ControlGroup>
          <ControlGroup
            title="Background"
            id="background"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={(value) =>
                handleContentUpdate({ backgroundColor: value })
              }
            />
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={backgroundImageUrl}
              onUpload={(url) =>
                handleContentUpdate({ backgroundImageUrl: url })
              }
              onRemove={() => handleContentUpdate({ backgroundImageUrl: "" })}
            />
            {backgroundImageUrl && (
              <EditableColorPicker
                label="Background Image Overlay"
                value={backgroundImageOverlay}
                onChange={(value) =>
                  handleContentUpdate({ backgroundImageOverlay: value })
                }
              />
            )}
          </ControlGroup>
          <ControlGroup
            title="Styles"
            id="styles"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableColorPicker
              label="Primary Text"
              value={textColor}
              onChange={(value) => handleContentUpdate({ textColor: value })}
            />
            <EditableColorPicker
              label="Accent"
              value={accentColor}
              onChange={(value) => handleContentUpdate({ accentColor: value })}
            />
            <EditableColorPicker
              label="Secondary Accent"
              value={heroSecondaryAccentColor}
              onChange={(value) =>
                handleContentUpdate({ heroSecondaryAccentColor: value })
              }
            />
            <EditableColorPicker
              label="Card Background"
              value={heroCardBackgroundColor}
              onChange={(value) =>
                handleContentUpdate({ heroCardBackgroundColor: value })
              }
            />
            <EditableRange
              label="Grid Opacity"
              value={heroGridOpacity}
              min={0}
              max={1}
              step={0.05}
              onChange={(value) =>
                handleContentUpdate({ heroGridOpacity: value })
              }
            />
            <EditableCheckbox
              label="Show Scroll Indicator"
              checked={heroShowScrollIndicator}
              onChange={(value) =>
                handleContentUpdate({ heroShowScrollIndicator: value })
              }
            />
            {heroShowScrollIndicator && (
              <EditableText
                label="Scroll Label"
                value={heroScrollLabel}
                onChange={(value) =>
                  handleContentUpdate({ heroScrollLabel: value })
                }
              />
            )}
          </ControlGroup>
          <ControlGroup
            title="Typography"
            id="typography"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableSelect
              label="Headline Size"
              value={heroHeadlineSize}
              onChange={(value) =>
                handleContentUpdate({ heroHeadlineSize: value })
              }
              options={[
                { label: "4xl", value: "4xl" },
                { label: "5xl", value: "5xl" },
                { label: "6xl", value: "6xl" },
                { label: "7xl", value: "7xl" },
                { label: "8xl", value: "8xl" },
              ]}
            />
            <EditableSelect
              label="Text Size"
              value={heroTextSize}
              onChange={(value) => handleContentUpdate({ heroTextSize: value })}
              options={[
                { label: "sm", value: "sm" },
                { label: "base", value: "base" },
                { label: "lg", value: "lg" },
                { label: "xl", value: "xl" },
                { label: "2xl", value: "2xl" },
              ]}
            />
          </ControlGroup>
          <ControlGroup
            title="Layout"
            id="layout"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableSelect
              label="Hero Layout"
              value={heroLayout}
              onChange={(value) => handleContentUpdate({ heroLayout: value })}
              options={[
                { label: "Split (Image Right)", value: "split" },
                { label: "Split (Image Left)", value: "split-reverse" },
                { label: "Centered", value: "centered" },
                { label: "Full Width", value: "full-width" },
              ]}
            />
            <EditableSelect
              label="Content Alignment"
              value={heroContentAlignment}
              onChange={(value) =>
                handleContentUpdate({ heroContentAlignment: value })
              }
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
            <EditableNumber
              label="Grid Size (px)"
              value={heroGridSize}
              min={50}
              max={200}
              step={10}
              onChange={(value) => handleContentUpdate({ heroGridSize: value })}
            />
            <EditableNumber
              label="Border Radius (px)"
              value={heroBorderRadius}
              min={0}
              max={100}
              step={4}
              onChange={(value) =>
                handleContentUpdate({ heroBorderRadius: value })
              }
            />
            <EditableNumber
              label="Padding (px)"
              value={heroPadding}
              min={0}
              max={100}
              step={4}
              onChange={(value) => handleContentUpdate({ heroPadding: value })}
            />
            <EditableNumber
              label="Margin (px)"
              value={heroMargin}
              min={0}
              max={100}
              step={4}
              onChange={(value) => handleContentUpdate({ heroMargin: value })}
            />
            <EditableNumber
              label="Min Height (vh)"
              value={heroMinHeight}
              min={50}
              max={100}
              step={5}
              onChange={(value) =>
                handleContentUpdate({ heroMinHeight: value })
              }
            />
          </ControlGroup>
          <ControlGroup
            title="Animation"
            id="animation"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableRange
              label="Animation Duration"
              value={heroAnimationDuration}
              min={0.1}
              max={2.0}
              step={0.1}
              onChange={(value) =>
                handleContentUpdate({ heroAnimationDuration: value })
              }
            />
            <EditableRange
              label="Animation Delay"
              value={heroAnimationDelay}
              min={0}
              max={1.0}
              step={0.05}
              onChange={(value) =>
                handleContentUpdate({ heroAnimationDelay: value })
              }
            />
            <EditableSelect
              label="Scroll Indicator Position"
              value={heroScrollIndicatorPosition}
              onChange={(value) =>
                handleContentUpdate({ heroScrollIndicatorPosition: value })
              }
              options={[
                { label: "Bottom Center", value: "bottom-center" },
                { label: "Bottom Left", value: "bottom-left" },
                { label: "Bottom Right", value: "bottom-right" },
              ]}
            />
            <EditableSelect
              label="Scroll Indicator Style"
              value={heroScrollIndicatorStyle}
              onChange={(value) =>
                handleContentUpdate({ heroScrollIndicatorStyle: value })
              }
              options={[
                { label: "Line", value: "line" },
                { label: "Arrow", value: "arrow" },
                { label: "Dot", value: "dot" },
              ]}
            />
          </ControlGroup>
        </div>
      }
    />
  );
}

function MobilityHeroView({ content }: { content: any }) {
  const stats: HeroStat[] = content.heroStats || defaultHeroStats;
  const layout = content.heroLayout || "split";

  // Determine grid layout based on heroLayout
  const getLayoutClasses = () => {
    switch (layout) {
      case "split-reverse":
        return "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center";
      case "centered":
        return "flex flex-col items-center text-center";
      case "full-width":
        return "flex flex-col";
      case "split":
      default:
        return "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center";
    }
  };

  const shouldShowImage = layout === "split" || layout === "split-reverse";
  const imageOnLeft = layout === "split-reverse";

  return (
    <section
      className={`${mobilitySectionWrapper} min-h-[70vh] flex items-center relative overflow-hidden`}
      style={{ backgroundColor: content.backgroundColor }}
    >
      {/* Background Image */}
      {content.backgroundImageUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${content.backgroundImageUrl})`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: content.backgroundImageOverlay,
            }}
          />
        </>
      )}

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${content.heroGlowColor} 0, transparent 45%), radial-gradient(circle at 80% 0%, ${content.heroSecondaryAccentColor} 0, transparent 40%)`,
          opacity: 0.8,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
          opacity: content.heroGridOpacity,
        }}
      />

      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className={getLayoutClasses()}>
          {/* Content Section */}
          <div
            className={`flex flex-col justify-center space-y-8 lg:space-y-10 ${
              imageOnLeft ? "lg:order-2" : ""
            } ${layout === "centered" ? "items-center" : ""}`}
            style={{ order: imageOnLeft ? 2 : 1 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur ${
                layout === "centered" ? "" : "self-start"
              }`}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: content.accentColor }}
              />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: content.accentColor }}
              >
                {content.heroEyebrow}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-6"
            >
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight ${
                  layout === "centered" ? "max-w-4xl" : ""
                }`}
                style={{ color: content.textColor }}
              >
                {content.heroHeadline}
              </h1>
              <p
                className={`text-lg md:text-xl leading-relaxed text-white/80 ${
                  layout === "centered" ? "max-w-3xl" : "max-w-2xl"
                }`}
              >
                {content.heroText}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <BannerButton
                text={content.heroPrimaryActionLabel}
                href={content.heroPrimaryActionLink}
                variant="primary"
                size="lg"
                backgroundColor={content.accentColor}
                animation="slide"
                shadow={true}
              />
              <BannerButton
                text={content.heroSecondaryActionLabel}
                href={content.heroSecondaryActionLink}
                variant="outline"
                size="lg"
                borderColor="rgba(255,255,255,0.3)"
                textColor="rgba(255,255,255,0.9)"
                hoverBackgroundColor="rgba(255,255,255,0.1)"
                animation="slide"
                shadow={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${
                layout === "centered" ? "max-w-3xl" : "max-w-2xl"
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur px-5 py-4 text-center sm:text-left"
                  style={{ backgroundColor: content.heroCardBackgroundColor }}
                >
                  <div
                    className="text-2xl font-semibold mb-1"
                    style={{ color: content.accentColor }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-white/80 mb-1">
                    {stat.label}
                  </div>
                  {stat.detail && (
                    <div className="text-xs text-white/60">{stat.detail}</div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image Section */}
          {shouldShowImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center lg:justify-end"
              style={{ order: imageOnLeft ? 1 : 2 }}
            >
              <div className="relative w-full max-w-lg">
                <div
                  className="absolute inset-0 rounded-[32px] blur-3xl"
                  style={{ background: content.heroGlowColor, opacity: 0.7 }}
                />
                <div className="relative rounded-[32px] overflow-hidden border border-white/15 shadow-2xl">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: content.heroImageOverlay,
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div
                    className="h-[480px] w-full"
                    style={{
                      backgroundImage: `url(${content.heroImageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    role="img"
                    aria-label={content.heroImageAlt}
                  />
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
                    <div>
                      <p className="text-xs text-white/60">
                        {content.heroBadgeLabel}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {content.heroBadgeSubtext}
                      </p>
                    </div>
                    <span className="text-white/70 text-xs">
                      Live telemetry
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {content.heroShowScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs tracking-[0.4em] uppercase text-white/60">
          <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-white/80 animate-pulse" />
          <span>{content.heroScrollLabel}</span>
        </div>
      )}
    </section>
  );
}
