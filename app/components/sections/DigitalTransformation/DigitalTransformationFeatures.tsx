"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  RefreshCw,
  Bot,
  Trophy,
  Target,
  Leaf,
  Rocket,
  Zap,
  Shield,
  Settings,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Eye,
  Gauge,
  Key,
  Layers,
  Network,
  Square,
  Grid3x3,
  Workflow,
  Cpu,
  Cloud,
  Database,
  Lock,
  AlertCircle,
  Download,
  Upload,
  Smartphone,
  Monitor,
  Server,
  Wifi,
  Map,
  Timer,
  Package,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  ThumbsUp,
  Activity,
  Compass,
} from "lucide-react";
import MediaUpload from "../../MediaUpload";

interface Feature {
  icon: string;
  iconType?: "emoji" | "lucide";
  iconName?: string;
  title: string;
  description: string;
  items: string[];
  backgroundImage?: string;
  backgroundColor?: string;
}

interface FeaturesContent {
  mainTitle?: string;
  mainDescription?: string;
  features?: Feature[];
  accentColor?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOverlayColor?: string;
  backgroundOverlayOpacity?: number;
  animationStyle?: string;
  alignment?: "left" | "center" | "right";
  cardStyle?: "minimal" | "shadow" | "glow";
  itemsPerRow?: 1 | 2 | 3;
}

interface DigitalTransformationFeaturesProps {
  section: { content?: FeaturesContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: FeaturesContent }>) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  Wrench,
  RefreshCw,
  Bot,
  Trophy,
  Target,
  Leaf,
  Rocket,
  Zap,
  Shield,
  Settings,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Eye,
  Gauge,
  Key,
  Layers,
  Network,
  Square,
  Grid3x3,
  Workflow,
  Cpu,
  Cloud,
  Database,
  Lock,
  AlertCircle,
  Download,
  Upload,
  Smartphone,
  Monitor,
  Server,
  Wifi,
  Map,
  Timer,
  Package,
  Briefcase,
  Users,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  ThumbsUp,
  Activity,
  Compass,
};

function getIconNames() {
  return Object.keys(iconMap).sort();
}

function renderIcon(feature: Feature, size: number = 32, color?: string) {
  if (feature.iconType === "lucide" && feature.iconName && iconMap[feature.iconName]) {
    const IconComponent = iconMap[feature.iconName];
    return <IconComponent size={size} color={color} strokeWidth={1.5} />;
  }
  return <span style={{ fontSize: `${size}px` }}>{feature.icon}</span>;
}

const defaultContent: FeaturesContent = {
  mainTitle: "Digital Transformation Solutions",
  mainDescription: "Explore our comprehensive suite of digital transformation capabilities designed to future-proof your assets.",
  features: [
    {
      icon: "🏗️",
      iconType: "lucide",
      iconName: "Wrench",
      title: "Building Information Modeling (BIM)",
      description: "BIM is central to our process—ensuring clarity, precision and alignment across all stakeholders.",
      items: [
        "Intelligent 3D modeling",
        "Clash detection & coordination",
        "Documentation automation",
        "Lifecycle cost analysis",
        "Integrated project data environment"
      ],
      backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
      backgroundColor: "#0f3460"
    },
    {
      icon: "🪄",
      iconType: "lucide",
      iconName: "RefreshCw",
      title: "Digital Twin Integration",
      description: "A digital twin gives clients a living, breathing virtual replica of their physical asset—enabling real-time insights and predictive decision-making.",
      items: [
        "Live monitoring of systems & performance",
        "\"What-if\" scenario simulations",
        "Predictive maintenance alerts",
        "Carbon, energy & cost optimization",
        "Safety and compliance visualization"
      ],
      backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
      backgroundColor: "#1a3a52"
    },
    {
      icon: "🔍",
      iconType: "lucide",
      iconName: "Bot",
      title: "AI-Powered Project Management",
      description: "We utilize AI and analytics to improve project accuracy and eliminate risks.",
      items: [
        "Schedule forecasting",
        "Risk modeling",
        "Resource optimization",
        "Quality monitoring",
        "Automated progress tracking"
      ],
      backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
      backgroundColor: "#254441"
    },
    {
      icon: "🏢",
      iconType: "lucide",
      iconName: "Smartphone",
      title: "Smart Workspace Solutions",
      description: "We transform traditional workplaces into adaptive, digital-first environments.",
      items: [
        "Occupancy tracking",
        "Hybrid workspace optimization",
        "Digital signage & visual dashboards",
        "Environmental comfort control",
        "Sensor-based meeting rooms",
        "User-centric mobile automation"
      ],
      backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
      backgroundColor: "#2d3a3d"
    },
    {
      icon: "📊",
      iconType: "lucide",
      iconName: "BarChart3",
      title: "Data-Driven Decision Support",
      description: "Data is at the heart of every digital solution at RAUS.",
      items: [
        "Energy & sustainability analytics",
        "Operational cost tracking",
        "Lifecycle insights",
        "Space utilization analysis",
        "User experience monitoring"
      ],
      backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
      backgroundColor: "#1a2a3a"
    }
  ],
  accentColor: "#00d4ff",
  backgroundColor: "#000000",
  backgroundImage: "",
  backgroundOverlayColor: "rgba(0, 0, 0, 0.5)",
  backgroundOverlayOpacity: 0.5,
  animationStyle: "fade",
  alignment: "center",
  cardStyle: "shadow",
  itemsPerRow: 2
};

const animationOptions = [
  { label: "Fade", value: "fade", icon: "✨" },
  { label: "Bounce", value: "bounce", icon: "🎈" },
  { label: "Zoom", value: "zoom", icon: "🔍" },
  { label: "Slide", value: "slide", icon: "➡️" },
];

const cardStyleOptions = [
  { label: "Minimal", value: "minimal", icon: "📋" },
  { label: "Shadow", value: "shadow", icon: "📦" },
  { label: "Glow", value: "glow", icon: "✨" },
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

function getGridColsClass(itemsPerRow: number) {
  switch (itemsPerRow) {
    case 1:
      return "md:grid-cols-1";
    case 2:
      return "md:grid-cols-2";
    default:
      return "md:grid-cols-3";
  }
}

function getCardStyleClass(style: string, accentColor: string) {
  switch (style) {
    case "glow":
      return `border-2 border-${accentColor === "#00d4ff" ? "cyan" : "blue"}-200 bg-gradient-to-br from-white via-${accentColor === "#00d4ff" ? "cyan" : "blue"}-50 to-white shadow-lg hover:shadow-2xl`;
    case "minimal":
      return "border border-gray-100 bg-white hover:border-gray-200";
    case "shadow":
    default:
      return "border border-gray-100 bg-white shadow-lg hover:shadow-2xl";
  }
}

export default function DigitalTransformationFeatures({
  section,
  isEditing,
  onUpdate,
}: DigitalTransformationFeaturesProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<FeaturesContent>({
    ...defaultContent,
    ...content,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector("style[data-features]")) {
        const style = document.createElement("style");
        style.setAttribute("data-features", "true");
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

.card-hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15) !important;
}

.card-base {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-scroll {
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.carousel-scroll::-webkit-scrollbar {
  height: 6px;
}

.carousel-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.carousel-scroll::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.carousel-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(0, 212, 255, 0.2);
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }

@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.animate-float-slow { animation: float-slow 6s ease-in-out infinite; }

@keyframes card-scale-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes card-glow {
  0%, 100% { box-shadow: 0 8px 32px rgba(0, 212, 255, 0.1); }
  50% { box-shadow: 0 8px 32px rgba(0, 212, 255, 0.25); }
}

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
    const textAlignClass = getTextAlignClass(data.alignment || "left");
    const gridColsClass = getGridColsClass(data.itemsPerRow || 3);

    return (
      <section
        className={`relative overflow-hidden w-full min-h-screen ${textAlignClass}`}
        style={{
          backgroundColor: data.backgroundColor || "#000000",
          display: "block",
        }}
      >
        {/* Background image layer */}
        {data.backgroundImage && (
          <div
            className="absolute inset-0 pointer-events-none animate-pulse-slow"
            style={{
              backgroundImage: data.backgroundImage.startsWith("url") 
                ? data.backgroundImage 
                : `url('${data.backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
        )}

        {/* Overlay color layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: data.backgroundOverlayColor || "rgba(0, 0, 0, 0.5)",
            opacity: data.backgroundOverlayOpacity ?? 0.5,
          }}
        />

        {/* Subtle animated background elements */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none animate-float-slow"
          style={{
            background: `radial-gradient(circle, ${data.accentColor}, transparent)`,
            filter: "blur(40px)",
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 opacity-5 pointer-events-none animate-float-slow"
          style={{
            background: `radial-gradient(circle, ${data.accentColor}, transparent)`,
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 px-6 md:px-20">
          {/* Header Section */}
          <div className="text-center mb-10 py-8 md:py-12">
            <div className="mb-2 inline-block">
              <div className="flex items-center justify-center">
                <div className="h-0.5 w-12 rounded-full animate-fade" style={{ backgroundColor: data.accentColor }} />
              </div>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black animate-fade leading-tight mb-3"
              style={{
                color: "#ffffff",
                textShadow: `0 2px 12px ${data.accentColor}20`,
              }}
            >
              {data.mainTitle}
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto animate-fade"
              style={{
                color: "#cbd5e1",
                fontWeight: "400",
                letterSpacing: "0.005em",
                lineHeight: "1.6",
                animationDelay: "0.1s",
              }}
            >
              {data.mainDescription}
            </p>
          </div>

          {/* Compact Expandable Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto pb-8 md:pb-12">
            {data.features &&
              data.features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-xl overflow-hidden group transition-all duration-500 animate-${data.animationStyle} shadow-lg hover:shadow-2xl hover:scale-105 transform`}
                  style={{
                    animationDelay: `${idx * 0.1}s`,
                    boxShadow: `0 8px 32px rgba(0, 212, 255, 0.1)`,
                  }}
                >
                  {/* Background layer */}
                  <div
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                    style={{
                      background: feature.backgroundImage || feature.backgroundColor || "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  {/* Overlay gradient - darker */}
                  <div
                    className="absolute inset-0 group-hover:opacity-90 opacity-75 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${data.accentColor}40 0%, ${data.accentColor}15 50%, rgba(15,23,42,0.6) 100%)`,
                    }}
                  />

                  {/* Subtle border - normal state */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300"
                    style={{
                      border: `1px solid rgba(55, 65, 81, 0.3)`,
                      boxShadow: "none",
                    }}
                    id={`border-normal-${idx}`}
                  />

                  {/* Border glow - hover state */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      border: `2px solid ${data.accentColor}`,
                      boxShadow: `0 0 30px ${data.accentColor}60, inset 0 0 30px ${data.accentColor}30`,
                    }}
                  />

                  {/* Shimmer effect on hover */}
                  <div
                    className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${data.accentColor}, transparent)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* Top: Icon & Number */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className="group-hover:scale-125 transition-transform duration-300 drop-shadow-lg flex items-center justify-center w-12 h-12 flex-shrink-0"
                        style={{
                          textShadow: `0 2px 8px ${data.accentColor}40`,
                        }}
                      >
                        {renderIcon(feature, 48, data.accentColor)}
                      </div>
                      <div
                        className="text-2xl font-black opacity-15 group-hover:opacity-35 transition-opacity"
                        style={{ color: data.accentColor }}
                      >
                        {`${String(idx + 1).padStart(2, "0")}`}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg font-bold leading-snug drop-shadow-md mb-3"
                      style={{ color: "#ffffff" }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed drop-shadow-md font-medium mb-4"
                      style={{ color: "#cbd5e1" }}
                    >
                      {feature.description}
                    </p>

                    {/* Key capabilities grid */}
                    <div className="grid grid-cols-1 gap-2">
                      {feature.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-2 text-sm drop-shadow-md"
                          style={{ color: "#cbd5e1" }}
                        >
                          <span
                            className="shrink-0 font-bold mt-0.5 text-sm"
                            style={{
                              color: data.accentColor,
                            }}
                          >
                            ◆
                          </span>
                          <span className="leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  };

  if (!isEditing) return <Preview />;

  return (
    <div className="mb-8 space-y-8">
      {/* Live Preview */}
      <div
        className="rounded-2xl border-2 bg-white p-8 shadow-2xl pulse-glow transition-all duration-300"
        style={{ borderColor: localContent.accentColor }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: localContent.accentColor,
                boxShadow: `0 0 10px ${localContent.accentColor}`,
              }}
            />
            Live Preview
          </h3>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-300">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">Active</span>
          </div>
        </div>
        <Preview useLocal />
      </div>

      {/* Editing Controls */}
      <div className="space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-300">
        <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-300">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${localContent.accentColor}20` }}
          >
            ✏️
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Edit Digital Transformation Features
          </h3>
        </div>

        {/* Header Section */}
        <div className="space-y-4 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">📝</span>
            Main Title
          </label>
          <input
            className="w-full rounded-xl border-2 border-gray-300 bg-white p-4 text-lg font-medium text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none placeholder-gray-500"
            value={localContent.mainTitle}
            onChange={(e: any) => handleContentUpdate({ mainTitle: e.target.value })}
            placeholder="Enter main title..."
          />
        </div>

        <div className="space-y-4 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">📄</span>
            Main Description
          </label>
          <textarea
            className="w-full rounded-xl border-2 border-gray-300 bg-white p-4 text-base text-gray-900 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none placeholder-gray-500"
            value={localContent.mainDescription}
            onChange={(e: any) =>
              handleContentUpdate({ mainDescription: e.target.value })
            }
            rows={3}
            placeholder="Enter main description..."
          />
        </div>

        {/* Style Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-300">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              🎨 Accent Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={localContent.accentColor}
                onChange={(e: any) =>
                  handleContentUpdate({ accentColor: e.target.value })
                }
                className="w-16 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={localContent.accentColor}
                onChange={(e: any) =>
                  handleContentUpdate({ accentColor: e.target.value })
                }
                className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-2 text-sm text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              ✨ Animation Style
            </label>
            <select
              value={localContent.animationStyle}
              onChange={(e: any) =>
                handleContentUpdate({ animationStyle: e.target.value })
              }
              className="w-full rounded-lg border-2 border-gray-300 bg-white p-2 text-gray-900"
            >
              {animationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Background & Overlay Controls */}
        <div className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-300">
          <h4 className="font-bold text-gray-900 text-xl flex items-center gap-2">
            <span className="text-xl">🖼️</span>
            Background Settings
          </h4>

          <MediaUpload
            label="🌅 Background Image"
            type="image"
            currentUrl={localContent.backgroundImage}
            onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
            onRemove={() => handleContentUpdate({ backgroundImage: "" })}
            className="w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🎭 Overlay Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={localContent.backgroundOverlayColor?.substring(0, 7) || "#000000"}
                  onChange={(e: any) => {
                    const rgb = parseInt(e.target.value.substring(1), 16);
                    const opacity = localContent.backgroundOverlayOpacity ?? 0.5;
                    const r = (rgb >> 16) & 255;
                    const g = (rgb >> 8) & 255;
                    const b = rgb & 255;
                    handleContentUpdate({
                      backgroundOverlayColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
                    });
                  }}
                  className="w-16 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={localContent.backgroundOverlayColor || "rgba(0, 0, 0, 0.5)"}
                  onChange={(e: any) =>
                    handleContentUpdate({ backgroundOverlayColor: e.target.value })
                  }
                  className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-2 text-sm font-mono text-gray-900 placeholder-gray-500"
                  placeholder="rgba(0, 0, 0, 0.5)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🔆 Overlay Opacity
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={localContent.backgroundOverlayOpacity ?? 0.5}
                  onChange={(e: any) =>
                    handleContentUpdate({
                      backgroundOverlayOpacity: parseFloat(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-700 w-12 text-right">
                  {Math.round((localContent.backgroundOverlayOpacity ?? 0.5) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-300">
          <h4 className="font-bold text-gray-900 text-xl flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Features
          </h4>
          <div className="space-y-6">
            {(localContent.features || []).map((feature, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-700">
                    Feature #{i + 1}
                  </span>
                  <button
                    onClick={() => {
                      const arr = [...(localContent.features || [])];
                      arr.splice(i, 1);
                      handleContentUpdate({ features: arr });
                    }}
                    className="rounded-xl px-4 py-2 bg-red-100 hover:bg-red-200 border-2 border-red-300 text-red-700 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
                  >
                    🗑️ Remove
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Icon Type Selector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Icon Type
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const arr = [...(localContent.features || [])];
                          arr[i] = { ...arr[i], iconType: "emoji" };
                          handleContentUpdate({ features: arr });
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                          feature.iconType === "emoji" || !feature.iconType
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 border-2 border-gray-400"
                        }`}
                      >
                        😀 Emoji
                      </button>
                      <button
                        onClick={() => {
                          const arr = [...(localContent.features || [])];
                          arr[i] = { ...arr[i], iconType: "lucide", iconName: feature.iconName || "Wrench" };
                          handleContentUpdate({ features: arr });
                        }}
                        className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                          feature.iconType === "lucide"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 border-2 border-gray-400"
                        }`}
                      >
                        ✦ Lucide
                      </button>
                    </div>
                  </div>

                  {/* Emoji Icon Picker */}
                  {(!feature.iconType || feature.iconType === "emoji") && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Emoji Icon
                      </label>
                      <input
                        className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-2xl text-center text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder-gray-500"
                        value={feature.icon}
                        onChange={(e: any) => {
                          const arr = [...(localContent.features || [])];
                          arr[i] = { ...arr[i], icon: e.target.value };
                          handleContentUpdate({ features: arr });
                        }}
                        placeholder="🎯"
                      />
                    </div>
                  )}

                  {/* Lucide Icon Picker */}
                  {feature.iconType === "lucide" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Lucide Icon
                      </label>
                      <select
                        value={feature.iconName || "Wrench"}
                        onChange={(e: any) => {
                          const arr = [...(localContent.features || [])];
                          arr[i] = { ...arr[i], iconName: e.target.value };
                          handleContentUpdate({ features: arr });
                        }}
                        className="w-full rounded-lg border-2 border-gray-300 bg-white p-2 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      >
                        {getIconNames().map((iconName) => (
                          <option key={iconName} value={iconName}>
                            {iconName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none placeholder-gray-500"
                      value={feature.title}
                      onChange={(e: any) => {
                        const arr = [...(localContent.features || [])];
                        arr[i] = { ...arr[i], title: e.target.value };
                        handleContentUpdate({ features: arr });
                      }}
                      placeholder="Feature title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none placeholder-gray-500"
                      value={feature.description}
                      onChange={(e: any) => {
                        const arr = [...(localContent.features || [])];
                        arr[i] = { ...arr[i], description: e.target.value };
                        handleContentUpdate({ features: arr });
                      }}
                      rows={2}
                      placeholder="Feature description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Items (one per line)
                    </label>
                    <textarea
                      className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none placeholder-gray-500"
                      value={feature.items.join("\n")}
                      onChange={(e: any) => {
                        const arr = [...(localContent.features || [])];
                        arr[i] = {
                          ...arr[i],
                          items: e.target.value
                            .split("\n")
                            .filter((item: string) => item.trim()),
                        };
                        handleContentUpdate({ features: arr });
                      }}
                      rows={feature.items.length || 4}
                      placeholder="Item 1&#10;Item 2&#10;Item 3..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={feature.backgroundColor || "#0f3460"}
                        onChange={(e: any) => {
                          const arr = [...(localContent.features || [])];
                          arr[i] = {
                            ...arr[i],
                            backgroundColor: e.target.value,
                          };
                          handleContentUpdate({ features: arr });
                        }}
                        className="w-16 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={feature.backgroundColor || "#0f3460"}
                        onChange={(e: any) => {
                          const arr = [...(localContent.features || [])];
                          arr[i] = {
                            ...arr[i],
                            backgroundColor: e.target.value,
                          };
                          handleContentUpdate({ features: arr });
                        }}
                        className="flex-1 rounded-lg border-2 border-gray-300 bg-white p-2 text-sm font-mono text-gray-900 placeholder-gray-500"
                        placeholder="#0f3460"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Background Image / Gradient
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-sm font-mono placeholder-gray-500"
                      value={feature.backgroundImage || ""}
                      onChange={(e: any) => {
                        const arr = [...(localContent.features || [])];
                        arr[i] = {
                          ...arr[i],
                          backgroundImage: e.target.value,
                        };
                        handleContentUpdate({ features: arr });
                      }}
                      placeholder="e.g., linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%) or url(https://...)"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Leave empty for default. Use CSS gradients or image URLs.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              const arr = [...(localContent.features || [])];
              arr.push({
                icon: "✨",
                iconType: "emoji",
                title: "New Feature",
                description: "Feature description",
                items: ["Item 1", "Item 2", "Item 3"],
                backgroundColor: "#0f3460",
                backgroundImage: "linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.85) 100%)",
              });
              handleContentUpdate({ features: arr });
            }}
            className="w-full rounded-xl px-6 py-3 bg-green-600 hover:bg-green-700 border-2 border-green-500 text-white font-semibold transition-all duration-300 hover:shadow-md"
          >
            ➕ Add Feature
          </button>
        </div>
      </div>
    </div>
  );
}
