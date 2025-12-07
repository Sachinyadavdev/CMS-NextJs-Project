"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
  EditableTextarea,
  EditableText,
  EditableColorPicker,
  EditableSelect,
} from "@/app/components/EditableInputs";
import MediaUpload from "@/app/components/MediaUpload";
import {
  ChevronDown,
  Layers,
  Zap,
  Activity,
  Map,
  Radar,
  Route,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import {
  mobilityTheme,
  mobilitySectionWrapper,
  mobilityContainer,
  mobilityPanel,
} from "./MobilityTheme";

interface ControlGroupProps {
  title: string;
  id: string;
  activeId: string;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

interface FeatureItem {
  title: string;
  description: string;
  iconName?: string;
  highlight?: string;
  linkLabel?: string;
  linkHref?: string;
}

const iconLibrary = {
  layers: Layers,
  zap: Zap,
  activity: Activity,
  map: Map,
  radar: Radar,
  route: Route,
};

const iconOptions = [
  { label: "Systems", value: "layers" },
  { label: "Energy", value: "zap" },
  { label: "Performance", value: "activity" },
  { label: "Mapping", value: "map" },
  { label: "Sensing", value: "radar" },
  { label: "Routing", value: "route" },
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

interface EditableMobilityFeaturesProps {
  section: PageSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
}

export default function EditableMobilityFeatures({
  section,
  isEditing,
  onUpdate,
}: EditableMobilityFeaturesProps) {
  const content = (section.content || {}) as MobilityContent;
  const {
    features = [
      {
        title: "Mobility-as-a-System",
        description:
          "Designs that go beyond roads—integrating rail, EV, cycling and pedestrian flows into one connected network.",
        iconName: "network",
        highlight: "Integrated mobility frameworks + system-wide planning",
      },
      {
        title: "Real-Time Intelligence",
        description:
          "Data-driven platforms that monitor, predict and optimize traffic, reducing delays and improving efficiency citywide.",
        iconName: "activity",
        highlight: "Predictive analytics + mobility dashboards",
      },
      {
        title: "Tech-First Infrastructure",
        description:
          "Embedded sensors, adaptive lighting, smart intersections—built for today, ready for tomorrow.",
        iconName: "cpu",
        highlight: "IoT infrastructure + smart city command layers",
      },
      {
        title: "Designing for Everyone",
        description:
          "Inclusive planning that ensures mobility access for all ages, abilities and modes of movement.",
        iconName: "accessibility",
        highlight: "Universal design standards + people-first planning",
      },
    ],
    featuresEyebrow = "Delivery playbooks",
    featuresTitle = "Why RAUS for mobility networks",
    featuresDescription = "Layering transit, critical infrastructure and data services into unified delivery models.",
    featuresDescriptionColor = "rgba(255,255,255,0.8)",
    featuresImageUrl = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    featuresAccentGlow = "rgba(14,165,233,0.18)",
    featuresCardDescriptionColor = "rgba(255,255,255,0.7)",
    backgroundColor = mobilityTheme.pageBackground,
    cardBackgroundColor = mobilityTheme.card,
    textColor = mobilityTheme.textPrimary,
    accentColor = mobilityTheme.accent,
  } = content;

  const [activeSection, setActiveSection] = useState<string>("section");

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleFeatureUpdate = (
    index: number,
    field: keyof FeatureItem,
    value: string
  ) => {
    const updated = [...(features as FeatureItem[])];
    updated[index] = { ...updated[index], [field]: value };
    handleContentUpdate({ features: updated });
  };

  const handleAddFeature = () => {
    const updated = [
      ...(features as FeatureItem[]),
      { title: "New capability", description: "Describe the value." },
    ];
    handleContentUpdate({ features: updated });
  };

  const handleRemoveFeature = (index: number) => {
    const updated = (features as FeatureItem[]).filter(
      (_, featureIndex) => featureIndex !== index
    );
    handleContentUpdate({ features: updated });
  };

  const viewModeContent = {
    features: features as FeatureItem[],
    featuresEyebrow,
    featuresTitle,
    featuresDescription,
    featuresDescriptionColor,
    featuresImageUrl,
    featuresAccentGlow,
    featuresCardDescriptionColor,
    backgroundColor,
    cardBackgroundColor,
    textColor,
    accentColor,
  };

  if (!isEditing) {
    return <MobilityFeaturesView content={viewModeContent} />;
  }

  return (
    <SectionEditorLayout
      title="Mobility Features Editor"
      description="Control imagery, layout, icons and content for each capability tile."
      preview={
        <div className="h-full overflow-auto">
          <MobilityFeaturesView content={viewModeContent} />
        </div>
      }
      controls={
        <div className="space-y-4">
          <ControlGroup
            title="Section Copy"
            id="section"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableText
              label="Eyebrow"
              value={featuresEyebrow}
              onChange={(value) =>
                handleContentUpdate({ featuresEyebrow: value })
              }
            />
            <EditableText
              label="Title"
              value={featuresTitle}
              onChange={(value) =>
                handleContentUpdate({ featuresTitle: value })
              }
            />
            <EditableTextarea
              label="Description"
              value={featuresDescription}
              onChange={(value) =>
                handleContentUpdate({ featuresDescription: value })
              }
              rows={4}
            />
          </ControlGroup>
          <ControlGroup
            title="Feature Blocks"
            id="features"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            {(features as FeatureItem[]).map((feature, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border border-gray-200/80 bg-white p-3"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  Feature {index + 1}
                  {(features as FeatureItem[]).length > 1 && (
                    <button
                      type="button"
                      className="text-rose-500"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <EditableText
                  label="Title"
                  value={feature.title}
                  onChange={(value) =>
                    handleFeatureUpdate(index, "title", value)
                  }
                />
                <EditableTextarea
                  label="Description"
                  value={feature.description}
                  onChange={(value) =>
                    handleFeatureUpdate(index, "description", value)
                  }
                  rows={3}
                />
                <EditableText
                  label="Highlight"
                  value={feature.highlight || ""}
                  onChange={(value) =>
                    handleFeatureUpdate(index, "highlight", value)
                  }
                />
                <EditableSelect
                  label="Icon"
                  value={feature.iconName || "layers"}
                  onChange={(value) =>
                    handleFeatureUpdate(index, "iconName", value as string)
                  }
                  options={iconOptions}
                />
                <EditableText
                  label="Link Label"
                  value={feature.linkLabel || ""}
                  onChange={(value) =>
                    handleFeatureUpdate(index, "linkLabel", value)
                  }
                />
                <EditableText
                  label="Link URL"
                  value={feature.linkHref || ""}
                  onChange={(value) =>
                    handleFeatureUpdate(index, "linkHref", value)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Add Feature
            </button>
          </ControlGroup>
          <ControlGroup
            title="Imagery"
            id="imagery"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <MediaUpload
              label="Features Image"
              type="image"
              currentUrl={featuresImageUrl}
              onUpload={(url) => handleContentUpdate({ featuresImageUrl: url })}
              onRemove={() => handleContentUpdate({ featuresImageUrl: "" })}
            />
          </ControlGroup>
          <ControlGroup
            title="Styles"
            id="styles"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableColorPicker
              label="Background"
              value={backgroundColor}
              onChange={(value) =>
                handleContentUpdate({ backgroundColor: value })
              }
            />
            <EditableColorPicker
              label="Card Background"
              value={cardBackgroundColor}
              onChange={(value) =>
                handleContentUpdate({ cardBackgroundColor: value })
              }
            />
            <EditableColorPicker
              label="Text"
              value={textColor}
              onChange={(value) => handleContentUpdate({ textColor: value })}
            />
            <EditableColorPicker
              label="Accent"
              value={accentColor}
              onChange={(value) => handleContentUpdate({ accentColor: value })}
            />
            <EditableColorPicker
              label="Glow"
              value={featuresAccentGlow}
              onChange={(value) =>
                handleContentUpdate({ featuresAccentGlow: value })
              }
            />
            <EditableColorPicker
              label="Main Description Text"
              value={featuresDescriptionColor}
              onChange={(value) =>
                handleContentUpdate({ featuresDescriptionColor: value })
              }
            />
            <EditableColorPicker
              label="Card Description Text"
              value={featuresCardDescriptionColor}
              onChange={(value) =>
                handleContentUpdate({ featuresCardDescriptionColor: value })
              }
            />
          </ControlGroup>
        </div>
      }
    />
  );
}

function MobilityFeaturesView({ content }: { content: any }) {
  const features: FeatureItem[] = content.features || [];

  return (
    <section
      className={`${mobilitySectionWrapper}`}
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className={`${mobilityContainer} space-y-16`}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-12 items-start">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur"
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: content.accentColor }}
              />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: content.accentColor }}
              >
                {content.featuresEyebrow}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ color: content.textColor }}
              >
                {content.featuresTitle}
              </h2>
              <p
                className="text-lg"
                style={{ color: content.featuresDescriptionColor }}
              >
                {content.featuresDescription}
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-[32px] blur-3xl"
              style={{ background: content.featuresAccentGlow }}
            />
            <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <div
                className="h-[360px]"
                style={{
                  backgroundImage: `url(${content.featuresImageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/15 backdrop-blur px-6 py-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">Program view</p>
                  <p className="text-lg font-semibold">
                    Live systems orchestration
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon =
              iconLibrary[feature.iconName as keyof typeof iconLibrary] ||
              Layers;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${mobilityPanel} p-8 flex flex-col gap-5 hover:-translate-y-1 transition-transform`}
                style={{ backgroundColor: content.cardBackgroundColor }}
              >
                <div className="inline-flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <Icon
                      className="w-6 h-6"
                      style={{ color: content.accentColor }}
                    />
                  </div>
                  {feature.highlight && (
                    <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                      {feature.highlight}
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: content.textColor }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="leading-relaxed"
                    style={{ color: content.featuresCardDescriptionColor }}
                  >
                    {feature.description}
                  </p>
                </div>
                {feature.linkLabel && feature.linkHref && (
                  <a
                    href={feature.linkHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: content.accentColor }}
                  >
                    {feature.linkLabel}
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
