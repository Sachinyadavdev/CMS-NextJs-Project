"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
  EditableTextarea,
  EditableText,
  EditableSelect,
  EditableColorPicker,
  EditableNumber,
  EditableRange,
} from "@/app/components/EditableInputs";
import {
  ChevronDown,
  Layers,
  Zap,
  Activity,
  Map,
  Radar,
  Route,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";

interface ControlGroupProps {
  title: string;
  id: string;
  activeId: string;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

interface TransportNetworkItem {
  title: string;
  description: string;
  iconName: string;
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

interface EditableMobilityTransportNetworksProps {
  section: PageSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
}

export default function EditableMobilityTransportNetworks({
  section,
  isEditing,
  onUpdate,
}: EditableMobilityTransportNetworksProps) {
  const content = (section.content || {}) as MobilityContent;
  const {
    transportNetworks = [
      {
        title: "Rail Networks",
        description: "High-speed rail and metro systems connecting urban centers with efficient, sustainable transportation.",
        iconName: "route",
      },
      {
        title: "EV Charging Infrastructure",
        description: "Comprehensive electric vehicle charging network supporting widespread adoption of clean transportation.",
        iconName: "zap",
      },
      {
        title: "Smart Traffic Management",
        description: "AI-powered traffic control systems optimizing flow and reducing congestion in urban areas.",
        iconName: "activity",
      },
      {
        title: "Pedestrian & Bike Networks",
        description: "Safe, accessible pathways for walking and cycling, promoting active transportation modes.",
        iconName: "map",
      },
    ],
    sectionTitle = "Transport Networks",
    sectionSubtitle = "Comprehensive transportation infrastructure connecting communities and enabling sustainable mobility.",
    backgroundColor = "#fef2f2",
    backgroundGradientColor = "#fee2e2",
    titleColor = "#7f1d1d",
    subtitleColor = "#b91c1c",
    cardBackgroundColor = "#ffffff",
    cardBorderColor = "#fee2e2",
    cardHoverColor = "rgba(239, 68, 68, 0.05)",
    iconBackgroundColor = "#fee2e2",
    iconHoverColor = "#fecaca",
    iconColor = "#dc2626",
    cardTitleColor = "#7f1d1d",
    cardTitleHoverColor = "#b91c1c",
    cardDescriptionColor = "#b91c1c",
    gridColumns = "2",
    cardBorderRadius = 24,
    cardPadding = 32,
    cardGap = 32,
    iconSize = 64,
    titleSize = "4xl",
    subtitleSize = "xl",
    cardTitleSize = "2xl",
    sectionPaddingY = 80,
    sectionPaddingX = 24,
    animationDuration = 0.5,
    animationDelay = 0.1,
  } = content;

  const [activeSection, setActiveSection] = useState<string>("networks");

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleNetworkUpdate = (
    index: number,
    field: keyof TransportNetworkItem,
    value: string
  ) => {
    const updated = [...(transportNetworks as TransportNetworkItem[])];
    updated[index] = { ...updated[index], [field]: value };
    handleContentUpdate({ transportNetworks: updated });
  };

  const handleAddNetwork = () => {
    const updated = [
      ...(transportNetworks as TransportNetworkItem[]),
      {
        title: "New Transport Network",
        description: "Describe the transportation network.",
        iconName: "layers",
      },
    ];
    handleContentUpdate({ transportNetworks: updated });
  };

  const handleRemoveNetwork = (index: number) => {
    const updated = (transportNetworks as TransportNetworkItem[]).filter(
      (_, networkIndex) => networkIndex !== index
    );
    handleContentUpdate({ transportNetworks: updated });
  };

  const viewModeContent = {
    transportNetworks: transportNetworks as TransportNetworkItem[],
    sectionTitle,
    sectionSubtitle,
    backgroundColor,
    backgroundGradientColor,
    titleColor,
    subtitleColor,
    cardBackgroundColor,
    cardBorderColor,
    cardHoverColor,
    iconBackgroundColor,
    iconHoverColor,
    iconColor,
    cardTitleColor,
    cardTitleHoverColor,
    cardDescriptionColor,
    gridColumns,
    cardBorderRadius,
    cardPadding,
    cardGap,
    iconSize,
    titleSize,
    subtitleSize,
    cardTitleSize,
    sectionPaddingY,
    sectionPaddingX,
    animationDuration,
    animationDelay,
  };

  if (!isEditing) {
    return <MobilityTransportNetworksView content={viewModeContent} />;
  }

  return (
    <SectionEditorLayout
      title="Mobility Transport Networks Editor"
      description="Control imagery, layout, icons and content for each transport network tile."
      preview={
        <div className="h-full overflow-auto">
          <MobilityTransportNetworksView content={viewModeContent} />
        </div>
      }
      controls={
        <div className="space-y-4">
          <ControlGroup
            title="Section Content"
            id="content"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableText
              label="Section Title"
              value={sectionTitle}
              onChange={(value) => handleContentUpdate({ sectionTitle: value })}
            />
            <EditableTextarea
              label="Section Subtitle"
              value={sectionSubtitle}
              onChange={(value) => handleContentUpdate({ sectionSubtitle: value })}
              rows={2}
            />
          </ControlGroup>

          <ControlGroup
            title="Transport Networks"
            id="networks"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            {(transportNetworks as TransportNetworkItem[]).map((network, index) => (
              <div
                key={index}
                className="space-y-3 rounded-lg border border-gray-200/80 bg-white p-3"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  Network {index + 1}
                  {(transportNetworks as TransportNetworkItem[]).length > 1 && (
                    <button
                      type="button"
                      className="text-rose-500"
                      onClick={() => handleRemoveNetwork(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <EditableText
                  label="Title"
                  value={network.title}
                  onChange={(value) =>
                    handleNetworkUpdate(index, "title", value)
                  }
                />
                <EditableTextarea
                  label="Description"
                  value={network.description}
                  onChange={(value) =>
                    handleNetworkUpdate(index, "description", value)
                  }
                  rows={3}
                />
                <EditableSelect
                  label="Icon"
                  value={network.iconName}
                  onChange={(value) =>
                    handleNetworkUpdate(index, "iconName", value as string)
                  }
                  options={iconOptions}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddNetwork}
              className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Add Transport Network
            </button>
          </ControlGroup>

          <ControlGroup
            title="Colors"
            id="colors"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={(value) => handleContentUpdate({ backgroundColor: value })}
            />
            <EditableColorPicker
              label="Background Gradient Color"
              value={backgroundGradientColor}
              onChange={(value) => handleContentUpdate({ backgroundGradientColor: value })}
            />
            <EditableColorPicker
              label="Title Color"
              value={titleColor}
              onChange={(value) => handleContentUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={subtitleColor}
              onChange={(value) => handleContentUpdate({ subtitleColor: value })}
            />
            <EditableColorPicker
              label="Card Background"
              value={cardBackgroundColor}
              onChange={(value) => handleContentUpdate({ cardBackgroundColor: value })}
            />
            <EditableColorPicker
              label="Card Border Color"
              value={cardBorderColor}
              onChange={(value) => handleContentUpdate({ cardBorderColor: value })}
            />
            <EditableColorPicker
              label="Card Hover Color"
              value={cardHoverColor}
              onChange={(value) => handleContentUpdate({ cardHoverColor: value })}
            />
            <EditableColorPicker
              label="Icon Background"
              value={iconBackgroundColor}
              onChange={(value) => handleContentUpdate({ iconBackgroundColor: value })}
            />
            <EditableColorPicker
              label="Icon Hover Color"
              value={iconHoverColor}
              onChange={(value) => handleContentUpdate({ iconHoverColor: value })}
            />
            <EditableColorPicker
              label="Icon Color"
              value={iconColor}
              onChange={(value) => handleContentUpdate({ iconColor: value })}
            />
            <EditableColorPicker
              label="Card Title Color"
              value={cardTitleColor}
              onChange={(value) => handleContentUpdate({ cardTitleColor: value })}
            />
            <EditableColorPicker
              label="Card Title Hover"
              value={cardTitleHoverColor}
              onChange={(value) => handleContentUpdate({ cardTitleHoverColor: value })}
            />
            <EditableColorPicker
              label="Card Description Color"
              value={cardDescriptionColor}
              onChange={(value) => handleContentUpdate({ cardDescriptionColor: value })}
            />
          </ControlGroup>

          <ControlGroup
            title="Layout"
            id="layout"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableSelect
              label="Grid Columns"
              value={gridColumns}
              onChange={(value) => handleContentUpdate({ gridColumns: value })}
              options={[
                { label: "1 Column", value: "1" },
                { label: "2 Columns", value: "2" },
                { label: "3 Columns", value: "3" },
                { label: "4 Columns", value: "4" },
              ]}
            />
            <EditableNumber
              label="Card Border Radius (px)"
              value={cardBorderRadius}
              min={0}
              max={50}
              step={4}
              onChange={(value) => handleContentUpdate({ cardBorderRadius: value })}
            />
            <EditableNumber
              label="Card Padding (px)"
              value={cardPadding}
              min={16}
              max={64}
              step={4}
              onChange={(value) => handleContentUpdate({ cardPadding: value })}
            />
            <EditableNumber
              label="Card Gap (px)"
              value={cardGap}
              min={8}
              max={64}
              step={4}
              onChange={(value) => handleContentUpdate({ cardGap: value })}
            />
            <EditableNumber
              label="Icon Size (px)"
              value={iconSize}
              min={32}
              max={128}
              step={8}
              onChange={(value) => handleContentUpdate({ iconSize: value })}
            />
            <EditableNumber
              label="Section Padding Y (px)"
              value={sectionPaddingY}
              min={40}
              max={160}
              step={8}
              onChange={(value) => handleContentUpdate({ sectionPaddingY: value })}
            />
            <EditableNumber
              label="Section Padding X (px)"
              value={sectionPaddingX}
              min={16}
              max={96}
              step={4}
              onChange={(value) => handleContentUpdate({ sectionPaddingX: value })}
            />
          </ControlGroup>

          <ControlGroup
            title="Typography"
            id="typography"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableSelect
              label="Title Size"
              value={titleSize}
              onChange={(value) => handleContentUpdate({ titleSize: value })}
              options={[
                { label: "3xl", value: "3xl" },
                { label: "4xl", value: "4xl" },
                { label: "5xl", value: "5xl" },
                { label: "6xl", value: "6xl" },
              ]}
            />
            <EditableSelect
              label="Subtitle Size"
              value={subtitleSize}
              onChange={(value) => handleContentUpdate({ subtitleSize: value })}
              options={[
                { label: "base", value: "base" },
                { label: "lg", value: "lg" },
                { label: "xl", value: "xl" },
                { label: "2xl", value: "2xl" },
              ]}
            />
            <EditableSelect
              label="Card Title Size"
              value={cardTitleSize}
              onChange={(value) => handleContentUpdate({ cardTitleSize: value })}
              options={[
                { label: "lg", value: "lg" },
                { label: "xl", value: "xl" },
                { label: "2xl", value: "2xl" },
                { label: "3xl", value: "3xl" },
              ]}
            />
          </ControlGroup>

          <ControlGroup
            title="Animation"
            id="animation"
            activeId={activeSection}
            onToggle={setActiveSection}
          >
            <EditableRange
              label="Animation Duration (s)"
              value={animationDuration}
              min={0.1}
              max={2.0}
              step={0.1}
              onChange={(value) => handleContentUpdate({ animationDuration: value })}
            />
            <EditableRange
              label="Animation Delay (s)"
              value={animationDelay}
              min={0}
              max={0.5}
              step={0.05}
              onChange={(value) => handleContentUpdate({ animationDelay: value })}
            />
          </ControlGroup>
        </div>
      }
    />
  );
}

function MobilityTransportNetworksView({ content }: { content: any }) {
  const transportNetworks: TransportNetworkItem[] = content.transportNetworks || [];
  const {
    sectionTitle = "Transport Networks",
    sectionSubtitle = "Comprehensive transportation infrastructure connecting communities and enabling sustainable mobility.",
    backgroundColor = "#fef2f2",
    backgroundGradientColor = "#fee2e2",
    titleColor = "#7f1d1d",
    subtitleColor = "#b91c1c",
    cardBackgroundColor = "#ffffff",
    cardBorderColor = "#fee2e2",
    cardHoverColor = "rgba(239, 68, 68, 0.05)",
    iconBackgroundColor = "#fee2e2",
    iconHoverColor = "#fecaca",
    iconColor = "#dc2626",
    cardTitleColor = "#7f1d1d",
    cardTitleHoverColor = "#b91c1c",
    cardDescriptionColor = "#b91c1c",
    gridColumns = "2",
    cardBorderRadius = 24,
    cardPadding = 32,
    cardGap = 32,
    iconSize = 64,
    titleSize = "4xl",
    subtitleSize = "xl",
    cardTitleSize = "2xl",
    sectionPaddingY = 80,
    sectionPaddingX = 24,
    animationDuration = 0.5,
    animationDelay = 0.1,
  } = content;

  const gridColsClass = {
    "1": "grid-cols-1",
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4",
  }[gridColumns as "1" | "2" | "3" | "4"] || "md:grid-cols-2";

  return (
    <section
      className={`relative overflow-hidden`}
      style={{
        background: `linear-gradient(to bottom right, ${backgroundColor}, ${backgroundGradientColor})`,
        paddingTop: `${sectionPaddingY}px`,
        paddingBottom: `${sectionPaddingY}px`,
        paddingLeft: `${sectionPaddingX}px`,
        paddingRight: `${sectionPaddingX}px`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-${titleSize} md:text-${titleSize === '4xl' ? '5xl' : titleSize} font-bold mb-6`} style={{ color: titleColor }}>
              {sectionTitle}
            </h2>
            <p className={`text-${subtitleSize} max-w-3xl mx-auto`} style={{ color: subtitleColor }}>
              {sectionSubtitle}
            </p>
          </motion.div>
        </div>

        <div className={`grid ${gridColsClass}`} style={{ gap: `${cardGap}px` }}>
          {transportNetworks.map((network, index) => {
            const Icon =
              iconLibrary[network.iconName as keyof typeof iconLibrary] ||
              Layers;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: animationDuration, delay: index * animationDelay }}
                className={`group relative shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border`}
                style={{
                  backgroundColor: cardBackgroundColor,
                  borderColor: cardBorderColor,
                  borderRadius: `${cardBorderRadius}px`,
                  padding: `${cardPadding}px`,
                }}
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  style={{
                    backgroundColor: cardHoverColor,
                    borderRadius: `${cardBorderRadius}px`
                  }}
                />

                <div className="relative">
                  <div
                    className={`inline-flex items-center justify-center rounded-2xl mb-6 transition-colors duration-300`}
                    style={{
                      backgroundColor: iconBackgroundColor,
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = iconHoverColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = iconBackgroundColor}
                  >
                    <Icon style={{ color: iconColor, width: `${iconSize / 2}px`, height: `${iconSize / 2}px` }} />
                  </div>

                  <h3
                    className={`text-${cardTitleSize} font-bold mb-4 transition-colors duration-300`}
                    style={{ color: cardTitleColor }}
                    onMouseEnter={(e) => e.currentTarget.style.color = cardTitleHoverColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = cardTitleColor}
                  >
                    {network.title}
                  </h3>

                  <p className="leading-relaxed" style={{ color: cardDescriptionColor }}>
                    {network.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
