"use client";

import React from "react";
import {
  ArrowUpRight,
  Home,
  Globe,
  Users,
  Truck,
  BarChart3,
  Building,
  Zap,
  Settings,
  Shield,
  Lightbulb,
  Target,
  Briefcase,
  Award,
  CheckCircle,
  TrendingUp,
  Layers,
  Map,
  Clock,
  Star,
  Heart,
  Smile,
  Sparkles,
  Plus,
  Trash2,
  GripVertical,
  Palette,
  Type,
  Image as ImageIcon,
} from "lucide-react";
import { HomeServicesSection, HomeServiceItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
} from "@/app/components/EditableInputs";

interface AtaGlanceServiceSectionProps {
  section: HomeServicesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HomeServicesSection>) => void;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  ArrowUpRight,
  Home,
  Globe,
  Users,
  Truck,
  BarChart3,
  Building,
  Zap,
  Settings,
  Shield,
  Lightbulb,
  Target,
  Briefcase,
  Award,
  CheckCircle,
  TrendingUp,
  Layers,
  Map,
  Clock,
  Star,
  Heart,
  Smile,
  Sparkles,
};

const getIconNames = () => Object.keys(iconMap);

const extractServices = (
  content: HomeServicesSection["content"]
): HomeServiceItem[] => {
  if (Array.isArray(content)) return content;
  if (!content) return [];
  if (Array.isArray(content.services))
    return content.services as HomeServiceItem[];
  return Object.values(content).filter(
    (v): v is HomeServiceItem => !!v && typeof v === "object" && "title" in v
  );
};

export default function AtaGlanceServiceSection({
  section,
  isEditing,
  onUpdate,
}: AtaGlanceServiceSectionProps) {
  const content = section.content;
  const services = extractServices(content);
  const baseConfig = Array.isArray(content) ? {} : content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    const updated = Array.isArray(content)
      ? { services, ...patch }
      : { ...baseConfig, ...patch };
    onUpdate({ content: updated });
  };

  const handleServiceUpdate = (
    index: number,
    patch: Partial<HomeServiceItem>
  ) => {
    const updatedServices = services.map((s, i) =>
      i === index ? { ...s, ...patch } : s
    );
    handleContentUpdate({ services: updatedServices });
  };

  const handleAddService = () => {
    const newService: HomeServiceItem = {
      id: Date.now().toString(),
      iconType: "lucide",
      iconName: "Sparkles",
      title: "New Service",
      description: "Describe your amazing service here...",
    };
    handleContentUpdate({ services: [...services, newService] });
  };

  const handleRemoveService = (index: number) => {
    const updated = services.filter((_, i) => i !== index);
    handleContentUpdate({ services: updated });
  };

  // Shared config values
  const config = {
    title: (baseConfig.title as string) || "Comprehensive Solutions",
    subtitle: (baseConfig.subtitle as string) || "At a Glance",
    backgroundColor: (baseConfig.backgroundColor as string) || "#0f172a",
    titleColor: (baseConfig.titleColor as string) || "#ffffff",
    subtitleColor: (baseConfig.subtitleColor as string) || "#f43f5e",
    iconColor: (baseConfig.iconColor as string) || "#f43f5e",
    cardBackgroundColor:
      (baseConfig.cardBackgroundColor as string) || "rgba(255, 255, 255, 0.05)",
    textColor: (baseConfig.textColor as string) || "#e2e8f0",
    alignment: (baseConfig.alignment as string) || "center",
  };

  const renderIcon = (service: HomeServiceItem, size: "sm" | "lg" = "lg") => {
    const w = size === "lg" ? "w-14 h-14" : "w-10 h-10";
    if (service.iconType === "custom" && service.iconUrl) {
      return (
        <img
          src={service.iconUrl}
          alt=""
          className={`${w} object-contain rounded-lg`}
        />
      );
    }
    const Icon =
      service.iconType === "lucide" && service.iconName
        ? iconMap[service.iconName]
        : Sparkles;
    return Icon ? (
      <Icon className={w} style={{ color: config.iconColor }} />
    ) : (
      <Sparkles className={w} style={{ color: config.iconColor }} />
    );
  };

  // === PRODUCTION VIEW (Non-editing) ===
  if (!isEditing) {
    return (
      <section
        className="relative py-20 overflow-hidden"
        style={{ backgroundColor: config.backgroundColor }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-rose-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-rose-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 backdrop-blur-xl mb-6">
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: config.iconColor }}
              />
              <span
                className="text-sm font-bold tracking-wider"
                style={{ color: config.iconColor }}
              >
                {config.subtitle}
              </span>
            </span>
            <h2 className="text-5xl md:text-6xl font-bold" style={{ color: config.titleColor }}>
              {config.title}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(services.length > 0
              ? services
              : [
                  {
                    id: "1",
                    iconType: "lucide" as const,
                    iconName: "Target",
                    title: "Strategic Planning",
                    description: "Roadmaps that drive sustainable success",
                  },
                  {
                    id: "2",
                    iconType: "lucide" as const,
                    iconName: "Zap",
                    title: "Digital Innovation",
                    description: "Transformative tech solutions",
                  },
                  {
                    id: "3",
                    iconType: "lucide" as const,
                    iconName: "Shield",
                    title: "Risk Management",
                    description: "Proactive protection strategies",
                  },
                  {
                    id: "4",
                    iconType: "lucide" as const,
                    iconName: "TrendingUp",
                    title: "Growth Acceleration",
                    description: "Scale faster with data-driven insights",
                  },
                ]
            ).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div
                  className="h-full p-8 rounded-3xl border border-white/10 backdrop-blur-2xl transition-all duration-500 hover:border-white/30 hover:shadow-2xl"
                  style={{ backgroundColor: config.cardBackgroundColor }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div className="inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-xl">
                      {renderIcon(service)}
                    </div>
                    <h3
                      className="text-2xl font-bold mb-4"
                      style={{ color: config.titleColor }}
                    >
                      {service.title}
                    </h3>
                    <p
                      className="leading-relaxed opacity-90"
                      style={{ color: config.textColor }}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // === EDITING MODE ===
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-red-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8">
          <div
            style={{ backgroundColor: config.backgroundColor }}
            className="p-8 min-h-96"
          >
            <div className="bg-gray-50/80 backdrop-blur-2xl rounded-2xl p-8 border border-white/10">
              {/* Mini production view */}
              <div className="text-center mb-10">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-4"
                  style={{
                    borderColor: `${config.iconColor}40`,
                    backgroundColor: `${config.iconColor}10`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: config.iconColor }}
                  />
                  <span
                    className="text-xs font-bold"
                    style={{ color: config.iconColor }}
                  >
                    {config.subtitle}
                  </span>
                </div>
                <h2
                  className="text-4xl font-bold mb-3"
                  style={{ color: config.titleColor }}
                >
                  {config.title}
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {(services.length > 0
                  ? services.slice(0, 4)
                  : Array(4).fill(null)
                ).map((s, i) => {
                  const service = s || {
                    title: "Service Title",
                    description: "Description goes here...",
                    iconName: "Sparkles",
                  };
                  return (
                    <div
                      key={i}
                      className="p-6 rounded-2xl border border-white/10"
                      style={{
                        backgroundColor: config.cardBackgroundColor,
                      }}
                    >
                      <div
                        className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${config.iconColor}20, ${config.iconColor}10)`,
                        }}
                      >
                        {renderIcon(service as any, "sm")}
                      </div>
                      <h4
                        className="font-bold text-lg mb-2"
                        style={{ color: config.titleColor }}
                      >
                        {service.title}
                      </h4>
                      <p
                        className="text-sm opacity-80"
                        style={{ color: config.textColor }}
                      >
                        {service.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Palette className="w-8 h-8 text-purple-400" />
              Section Settings
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddService}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/50 transition"
            >
              <Plus className="w-5 h-5" />
              Add Service
            </motion.button>
          </div>

          {/* Global Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <EditableText
              label="Section Title"
              value={config.title}
              onChange={(v) => handleContentUpdate({ title: v })}
            />
            <EditableText
              label="Subtitle Badge"
              value={config.subtitle}
              onChange={(v) => handleContentUpdate({ subtitle: v })}
            />
            <EditableColorPicker
              label="Background Color"
              value={config.backgroundColor}
              onChange={(v) => handleContentUpdate({ backgroundColor: v })}
            />
            <EditableColorPicker
              label="Title Color"
              value={config.titleColor}
              onChange={(v) => handleContentUpdate({ titleColor: v })}
            />
            <EditableColorPicker
              label="Accent Color"
              value={config.iconColor}
              onChange={(v) => handleContentUpdate({ iconColor: v })}
            />
            <EditableColorPicker
              label="Card Background"
              value={config.cardBackgroundColor}
              onChange={(v) => handleContentUpdate({ cardBackgroundColor: v })}
            />
            <EditableColorPicker
              label="Text Color"
              value={config.textColor}
              onChange={(v) => handleContentUpdate({ textColor: v })}
            />
            <EditableSelect
              label="Alignment"
              value={config.alignment}
              onChange={(v) => handleContentUpdate({ alignment: v })}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
          </div>

          {/* Services List */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <GripVertical className="w-6 h-6 text-gray-400" />
              Services ({services.length})
            </h3>

            {services.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">
                    Service #{index + 1}
                  </h4>
                  <button
                    onClick={() => handleRemoveService(index)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <EditableText
                    label="Title"
                    value={service.title || ""}
                    onChange={(v) => handleServiceUpdate(index, { title: v })}
                  />
                  <EditableTextarea
                    label="Description"
                    value={service.description || ""}
                    onChange={(v) =>
                      handleServiceUpdate(index, { description: v })
                    }
                    rows={2}
                  />
                  <EditableSelect
                    label="Icon Source"
                    value={service.iconType || "lucide"}
                    onChange={(v) =>
                      handleServiceUpdate(index, {
                        iconType: v as any,
                        iconUrl: v === "lucide" ? "" : service.iconUrl,
                      })
                    }
                    options={[
                      { value: "lucide", label: "Lucide Icons" },
                      { value: "custom", label: "Custom Upload" },
                    ]}
                  />
                  {service.iconType === "lucide" ? (
                    <EditableSelect
                      label="Choose Icon"
                      value={service.iconName || ""}
                      onChange={(v) =>
                        handleServiceUpdate(index, { iconName: v })
                      }
                      options={[
                        { value: "", label: "Select icon..." },
                        ...getIconNames().map((n) => ({
                          value: n,
                          label: n,
                        })),
                      ]}
                    />
                  ) : (
                    <div className="md:col-span-2">
                      <MediaUpload
                        label="Upload Custom Icon"
                        type="image"
                        currentUrl={service.iconUrl}
                        onUpload={(url) =>
                          handleServiceUpdate(index, { iconUrl: url })
                        }
                        onRemove={() =>
                          handleServiceUpdate(index, { iconUrl: "" })
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Live icon preview */}
                <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-200 inline-flex items-center gap-4">
                  <span className="text-sm text-gray-600">Preview:</span>
                  {renderIcon(service, "lg")}
                  <span className="font-medium text-gray-900">
                    {service.title || "Untitled"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
