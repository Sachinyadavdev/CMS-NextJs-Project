"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MediaUpload from "../../MediaUpload";
import { 
  Zap, RefreshCw, Bot, Trophy, Target, Leaf, Rocket, Star, Diamond, Flame,
  Lightbulb, Wrench, Settings, Shield, TrendingUp, Heart, Smile, Coffee,
  Camera, Music, Gamepad2, Headphones, Palette, CheckCircle, Award, Users,
  Globe, Building, BarChart3, Search, Filter, Download, Upload, Share, 
  Edit3, Trash2, Plus, Minus, X, Check, Eye, Lock, User, Crown, Gem,
  Sparkles, Sun, Cloud, Umbrella, Droplet, Trees, Flower, Mountain, Waves,
  ArrowRight, Briefcase, Map, Clock, Bookmark, Calendar, Mail, Phone,
  MessageCircle, AlertCircle, Home, Truck, Code, GitBranch, Database,
  RotateCcw, MoreHorizontal
} from "lucide-react";

interface ReasonItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: string;
  iconType?: "lucide" | "emoji";
  iconName?: string;
}

interface WhyRausContent {
  mainTitle?: string;
  mainSubtitle?: string;
  closingStatement?: string;
  closingStatementIcon?: string;
  closingStatementIconType?: "lucide" | "emoji";
  closingStatementIconName?: string;
  closingStatementStyle?: "banner" | "quote" | "highlight" | "fullwidth";
  reasons?: ReasonItem[];
  accentColor?: string;
  backgroundColor?: string;
  cardLayout?: "alternating" | "grid" | "column";
  animationStyle?: string;
  cardOverlay?: boolean;
  cardOverlayOpacity?: number;
  cardOverlayColor?: string;
}

interface WhyRausDigitalTransformationProps {
  section: { content?: WhyRausContent };
  isEditing: boolean;
  onUpdate: (updates: Partial<{ content?: WhyRausContent }>) => void;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Wrench, RefreshCw, Bot, Trophy, Target, Leaf, Rocket, Star, Diamond, Flame,
  Lightbulb, Zap, Settings, Shield, TrendingUp, Heart, Smile, Coffee,
  Camera, Music, Gamepad2, Headphones, Palette, CheckCircle, Award, Users,
  Globe, Building, BarChart3, Search, Filter, Download, Upload, Share,
  Edit3, Trash2, Plus, Minus, X, Check, Eye, Lock, User, Crown, Gem,
  Sparkles, Sun, Cloud, Umbrella, Droplet, Trees, Flower, Mountain, Waves,
  ArrowRight, Briefcase, Map, Clock, Bookmark, Calendar, Mail, Phone,
  MessageCircle, AlertCircle, Home, Truck, Code, GitBranch, Database,
  RotateCcw, MoreHorizontal
};

const getIconNames = () => Object.keys(iconMap).sort();

const defaultContent: WhyRausContent = {
  mainTitle: "Why RAUS for Digital Transformation?",
  mainSubtitle: "We combine deep industry expertise with cutting-edge technology to deliver measurable results.",
  closingStatement: "At RAUS, we don't just upgrade buildings—we future-proof them.",
  closingStatementIconName: "Rocket",
  closingStatementIconType: "lucide",
  closingStatementStyle: "fullwidth",
  reasons: [
    {
      id: "1",
      iconName: "Wrench",
      iconType: "lucide",
      title: "Integrated Expertise",
      description: "Seamless collaboration across design, engineering, IT, and smart technology teams ensures cohesive solutions.",
      image: ""
    },
    {
      id: "2",
      iconName: "RefreshCw",
      iconType: "lucide",
      title: "Seamless Integration",
      description: "Perfect blend of physical + digital environments creating truly intelligent, connected spaces.",
      image: ""
    },
    {
      id: "3",
      iconName: "Bot",
      iconType: "lucide",
      title: "Advanced Technology Stack",
      description: "Leverage BIM, IoT, AI, and digital twins to deliver next-generation building solutions.",
      image: ""
    },
    {
      id: "4",
      iconName: "Trophy",
      iconType: "lucide",
      title: "Proven Track Record",
      description: "Successfully delivered projects across mixed-use, hospitality, offices, logistics & government sectors.",
      image: ""
    },
    {
      id: "5",
      iconName: "Target",
      iconType: "lucide",
      title: "Customized Solutions",
      description: "Every solution is uniquely tailored to your building's specific operational goals and challenges.",
      image: ""
    },
    {
      id: "6",
      iconName: "Leaf",
      iconType: "lucide",
      title: "Sustainability Focus",
      description: "Committed to long-term performance, carbon reduction, and environmental responsibility.",
      image: ""
    }
  ],
  accentColor: "#00d4ff",
  backgroundColor: "#ffffff",
  cardLayout: "grid",
  animationStyle: "fade",
  cardOverlay: false,
  cardOverlayOpacity: 5,
  cardOverlayColor: "#000000"
};

const layoutOptions = [
  { label: "Grid", value: "grid", icon: "📊" },
  { label: "Alternating", value: "alternating", icon: "↔️" },
  { label: "Column", value: "column", icon: "📋" },
];

const animationOptions = [
  { label: "Fade", value: "fade", icon: "✨" },
  { label: "Bounce", value: "bounce", icon: "🎈" },
  { label: "Zoom", value: "zoom", icon: "🔍" },
  { label: "Slide", value: "slide", icon: "➡️" },
];

const iconNames = getIconNames();

const closingStyleOptions = [
  { label: "Full Width Banner", value: "fullwidth", icon: "📽️" },
  { label: "Quote Box", value: "quote", icon: "💬" },
  { label: "Highlighted Banner", value: "highlight", icon: "⭐" },
  { label: "Simple Banner", value: "banner", icon: "🎀" },
];

const renderLucideIcon = (iconName: string | undefined, size: number = 24, color: string = "currentColor") => {
  if (!iconName) return null;
  const IconComponent = iconMap[iconName];
  if (IconComponent) {
    return <IconComponent size={size} color={color} />;
  }
  return null;
};

export default function WhyRausDigitalTransformation({
  section,
  isEditing,
  onUpdate,
}: WhyRausDigitalTransformationProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<WhyRausContent>({
    ...defaultContent,
    ...content,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.head.querySelector("style[data-why-raus]")) {
        const style = document.createElement("style");
        style.setAttribute("data-why-raus", "true");
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

@keyframes slideInLeft {
  from { transform: translateX(-60px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(60px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.slide-in-left { animation: slideInLeft 0.8s cubic-bezier(0.4,0,0.2,1) both; }
.slide-in-right { animation: slideInRight 0.8s cubic-bezier(0.4,0,0.2,1) both; }

.reason-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.reason-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15) !important;
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

    return (
      <section
        className="relative px-6 py-16 md:px-20 md:py-24 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${data.backgroundColor} 0%, ${data.backgroundColor}f0 100%)`,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Decorative background noise */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            background: `url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/\%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/\%3E%3C/svg%3E')`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Accent line decorations */}
        <div
          className="absolute top-0 left-0 right-0 h-1 shimmer"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.accentColor}, transparent)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-3 w-12 h-1 rounded-full mx-auto animate-fade" style={{ backgroundColor: data.accentColor }} />
            <h2
              className="text-4xl md:text-5xl font-extrabold animate-fade leading-tight mb-6"
              style={{
                color: data.accentColor,
                textShadow: `0 2px 18px ${data.accentColor}20`,
              }}
            >
              {data.mainTitle}
            </h2>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade"
              style={{
                color: "#334155",
                fontWeight: "400",
                letterSpacing: "0.01em",
                lineHeight: "1.7",
                animationDelay: "0.15s",
              }}
            >
              {data.mainSubtitle}
            </p>
          </div>

          {/* Reasons - Different Layouts */}
          {data.cardLayout === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {data.reasons &&
                data.reasons.map((reason, idx) => (
                  <div
                    key={reason.id}
                    className={`relative bg-white rounded-2xl p-8 border border-gray-100 reason-card animate-${data.animationStyle} hover:border-gray-200 transition-all duration-300 overflow-hidden`}
                    style={{
                      boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  >
                    {data.cardOverlay && (
                      <>
                        <div
                          className="absolute inset-0 pointer-events-none rounded-2xl"
                          style={{
                            backgroundColor: data.cardOverlayColor || "#000000",
                            opacity: (data.cardOverlayOpacity || 5) / 100 / 2,
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none rounded-2xl"
                          style={{
                            background: `url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/\%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/\%3E%3C/svg%3E')`,
                            backgroundSize: "200px 200px",
                            opacity: (data.cardOverlayOpacity || 5) / 100 / 2,
                          }}
                        />
                      </>
                    )}
                    <div className="relative z-10">
                      {reason.image && (
                        <div className="mb-6 h-48 rounded-xl overflow-hidden">
                          <img
                            src={reason.image}
                            alt={reason.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="mb-4 flex items-center gap-3">
                        {reason.iconType === "lucide" && reason.iconName ? (
                          <div style={{ color: data.accentColor }}>
                            {renderLucideIcon(reason.iconName, 48, data.accentColor)}
                          </div>
                        ) : (
                          <div className="text-5xl">{reason.icon}</div>
                        )}
                      </div>
                      <h3
                        className="text-2xl font-bold mb-3"
                        style={{ color: data.accentColor }}
                      >
                        {reason.title}
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: "#64748b" }}>
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {data.cardLayout === "alternating" && (
            <div className="space-y-12 mb-12">
              {data.reasons &&
                data.reasons.map((reason, idx) => (
                  <div
                    key={reason.id}
                    className={`flex flex-col ${
                      idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-12 items-center animate-${data.animationStyle}`}
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  >
                    {reason.image && (
                      <div className="w-full md:w-1/2">
                        <div className="h-80 rounded-2xl overflow-hidden shadow-lg">
                          <img
                            src={reason.image}
                            alt={reason.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className={`${reason.image ? "w-full md:w-1/2" : "w-full"}`}>
                      <div className="mb-4 flex items-center gap-3">
                        {reason.iconType === "lucide" && reason.iconName ? (
                          <div style={{ color: data.accentColor }}>
                            {renderLucideIcon(reason.iconName, 56, data.accentColor)}
                          </div>
                        ) : (
                          <div className="text-6xl">{reason.icon}</div>
                        )}
                      </div>
                      <h3
                        className="text-3xl font-bold mb-4"
                        style={{ color: data.accentColor }}
                      >
                        {reason.title}
                      </h3>
                      <p className="text-lg leading-relaxed" style={{ color: "#475569" }}>
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {data.cardLayout === "column" && (
            <div className="space-y-6 mb-12 max-w-3xl mx-auto">
              {data.reasons &&
                data.reasons.map((reason, idx) => (
                  <div
                    key={reason.id}
                    className="relative bg-white rounded-xl p-8 border border-gray-100 reason-card animate-fade hover:border-gray-200 transition-all duration-300 overflow-hidden"
                    style={{
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                      animationDelay: `${idx * 0.08}s`,
                    }}
                  >
                    {data.cardOverlay && (
                      <>
                        <div
                          className="absolute inset-0 pointer-events-none rounded-xl"
                          style={{
                            backgroundColor: data.cardOverlayColor || "#000000",
                            opacity: (data.cardOverlayOpacity || 5) / 100 / 2,
                          }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none rounded-xl"
                          style={{
                            background: `url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/\%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/\%3E%3C/svg%3E')`,
                            backgroundSize: "200px 200px",
                            opacity: (data.cardOverlayOpacity || 5) / 100 / 2,
                          }}
                        />
                      </>
                    )}
                    <div className="relative z-10 flex gap-6">
                      {reason.image && (
                        <div className="w-32 h-32 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={reason.image}
                            alt={reason.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {reason.iconType === "lucide" && reason.iconName ? (
                            <div style={{ color: data.accentColor, flexShrink: 0 }}>
                              {renderLucideIcon(reason.iconName, 40, data.accentColor)}
                            </div>
                          ) : (
                            <span className="text-4xl">{reason.icon}</span>
                          )}
                          <h3
                            className="text-2xl font-bold"
                            style={{ color: data.accentColor }}
                          >
                            {reason.title}
                          </h3>
                        </div>
                        <p className="text-base leading-relaxed" style={{ color: "#64748b" }}>
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Closing Statement - Different Styles */}
          {data.closingStatement && data.closingStatementStyle === "fullwidth" && (
            <div
              className="relative py-24 px-8 rounded-2xl animate-fade overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${data.accentColor} 0%, ${data.accentColor}dd 100%)`,
              }}
            >
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/\%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/\%3E%3C/svg%3E')`,
                backgroundSize: "200px 200px"
              }} />
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                {data.closingStatementIconName && data.closingStatementIconType === "lucide" ? (
                  <div className="mb-6 animate-bounce inline-flex">
                    <div style={{ color: "white" }}>
                      {renderLucideIcon(data.closingStatementIconName, 72, "white")}
                    </div>
                  </div>
                ) : data.closingStatementIcon ? (
                  <div className="text-8xl mb-6 animate-bounce">{data.closingStatementIcon}</div>
                ) : null}
                <p className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
                  {data.closingStatement}
                </p>
              </div>
            </div>
          )}

          {data.closingStatement && data.closingStatementStyle === "quote" && (
            <div className="text-center py-16 px-8 animate-fade max-w-3xl mx-auto">
              <div className="text-6xl mb-6">"</div>
              <p className="text-3xl md:text-4xl font-bold leading-tight mb-6" style={{ color: data.accentColor }}>
                {data.closingStatement}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="flex-1 h-1" style={{ background: `linear-gradient(to right, transparent, ${data.accentColor})` }} />
                {data.closingStatementIconName && data.closingStatementIconType === "lucide" ? (
                  <div style={{ color: data.accentColor }}>
                    {renderLucideIcon(data.closingStatementIconName, 40, data.accentColor)}
                  </div>
                ) : data.closingStatementIcon ? (
                  <span className="text-4xl">{data.closingStatementIcon}</span>
                ) : null}
                <div className="flex-1 h-1" style={{ background: `linear-gradient(to left, transparent, ${data.accentColor})` }} />
              </div>
            </div>
          )}

          {data.closingStatement && data.closingStatementStyle === "highlight" && (
            <div
              className="py-16 px-12 rounded-2xl animate-fade relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${data.accentColor}15 0%, ${data.accentColor}05 100%)`,
                border: `3px solid ${data.accentColor}`,
              }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full" style={{
                background: `radial-gradient(circle, ${data.accentColor}20, transparent)`,
                filter: "blur(30px)"
              }} />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full" style={{
                background: `radial-gradient(circle, ${data.accentColor}20, transparent)`,
                filter: "blur(30px)"
              }} />
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-4">
                  {data.closingStatementIconName && data.closingStatementIconType === "lucide" ? (
                    <>
                      <div style={{ color: data.accentColor }}>
                        {renderLucideIcon(data.closingStatementIconName, 48, data.accentColor)}
                      </div>
                      <span className="text-5xl font-extrabold" style={{ color: data.accentColor }}>✦</span>
                      <div style={{ color: data.accentColor }}>
                        {renderLucideIcon(data.closingStatementIconName, 48, data.accentColor)}
                      </div>
                    </>
                  ) : data.closingStatementIcon ? (
                    <>
                      <span className="text-5xl">{data.closingStatementIcon}</span>
                      <span className="text-5xl font-extrabold" style={{ color: data.accentColor }}>✦</span>
                      <span className="text-5xl">{data.closingStatementIcon}</span>
                    </>
                  ) : null}
                </div>
                <p className="text-3xl md:text-4xl font-extrabold leading-tight" style={{ color: data.accentColor }}>
                  {data.closingStatement}
                </p>
              </div>
            </div>
          )}

          {data.closingStatement && data.closingStatementStyle === "banner" && (
            <div
              className="text-center py-12 px-8 rounded-xl animate-fade"
              style={{
                background: `linear-gradient(135deg, ${data.accentColor}10 0%, ${data.accentColor}05 100%)`,
                border: `2px solid ${data.accentColor}30`,
              }}
            >
              {data.closingStatementIconName && data.closingStatementIconType === "lucide" ? (
                <div className="mb-3 flex justify-center">
                  <div style={{ color: data.accentColor }}>
                    {renderLucideIcon(data.closingStatementIconName, 44, data.accentColor)}
                  </div>
                </div>
              ) : data.closingStatementIcon ? (
                <div className="text-4xl mb-3">{data.closingStatementIcon}</div>
              ) : null}
              <p
                className="text-2xl md:text-3xl font-bold leading-tight"
                style={{ color: data.accentColor }}
              >
                {data.closingStatement}
              </p>
            </div>
          )}
        </div>
      </section>
    );
  };

  if (!isEditing) return <Preview />;

  return (
    <div className="mb-8 space-y-8">
      {/* Live Preview */}
      <div
        className="rounded-2xl border-2 bg-gradient-to-br from-white to-gray-50 p-8 shadow-2xl transition-all duration-300"
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
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-green-700">Active</span>
          </div>
        </div>
        <Preview useLocal />
      </div>

      {/* Editing Controls */}
      <div className="space-y-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-200">
        <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${localContent.accentColor}20` }}
          >
            ✏️
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            Edit Why RAUS for Digital Transformation
          </h3>
        </div>

        {/* Header Section */}
        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">📝</span>
            Main Title
          </label>
          <input
            className="w-full rounded-xl border-2 border-gray-200 p-4 text-lg font-medium focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
            value={localContent.mainTitle}
            onChange={(e: any) => handleContentUpdate({ mainTitle: e.target.value })}
            placeholder="Enter main title..."
          />
        </div>

        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">📄</span>
            Main Subtitle
          </label>
          <textarea
            className="w-full rounded-xl border-2 border-gray-200 p-4 text-base focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none"
            value={localContent.mainSubtitle}
            onChange={(e: any) => handleContentUpdate({ mainSubtitle: e.target.value })}
            rows={3}
            placeholder="Enter main subtitle..."
          />
        </div>

        <div className="space-y-4 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Closing Statement
          </label>
          <textarea
            className="w-full rounded-xl border-2 border-gray-200 p-4 text-base focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none"
            value={localContent.closingStatement}
            onChange={(e: any) => handleContentUpdate({ closingStatement: e.target.value })}
            rows={2}
            placeholder="Enter closing statement..."
          />
        </div>

        {/* Closing Statement Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Closing Statement Icon
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={localContent.closingStatementIconName || ""}
                onChange={(e: any) => handleContentUpdate({ closingStatementIconName: e.target.value, closingStatementIconType: "lucide" })}
                className="flex-1 rounded-lg border-2 border-gray-200 p-3 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                placeholder="Select an icon..."
              />
            </div>
            <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-lg border border-gray-200">
              {iconNames.map((iconName) => (
                <button
                  key={iconName}
                  onClick={() => handleContentUpdate({ closingStatementIconName: iconName, closingStatementIconType: "lucide" })}
                  className={`p-3 rounded flex flex-col items-center justify-center gap-1 text-xs hover:bg-blue-200 transition-all ${
                    localContent.closingStatementIconName === iconName ? "bg-blue-400 text-white" : "hover:bg-gray-200"
                  }`}
                  title={iconName}
                >
                  <div style={{ color: localContent.closingStatementIconName === iconName ? "white" : localContent.accentColor }}>
                    {renderLucideIcon(iconName, 20)}
                  </div>
                  <span className="text-xs">{iconName.replace(/([A-Z])/g, "\n$1").substring(0, 8)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Closing Statement Style
            </label>
            <select
              value={localContent.closingStatementStyle}
              onChange={(e: any) => handleContentUpdate({ closingStatementStyle: e.target.value })}
              className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
            >
              {closingStyleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Style Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Accent Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={localContent.accentColor}
                onChange={(e: any) => handleContentUpdate({ accentColor: e.target.value })}
                className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
              />
              <input
                type="text"
                value={localContent.accentColor}
                onChange={(e: any) => handleContentUpdate({ accentColor: e.target.value })}
                className="flex-1 rounded-lg border-2 border-gray-200 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Card Layout
            </label>
            <select
              value={localContent.cardLayout}
              onChange={(e: any) => handleContentUpdate({ cardLayout: e.target.value })}
              className="w-full rounded-lg border-2 border-gray-200 p-2"
            >
              {layoutOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Animation
            </label>
            <select
              value={localContent.animationStyle}
              onChange={(e: any) => handleContentUpdate({ animationStyle: e.target.value })}
              className="w-full rounded-lg border-2 border-gray-200 p-2"
            >
              {animationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <input
                type="checkbox"
                checked={localContent.cardOverlay || false}
                onChange={(e: any) => handleContentUpdate({ cardOverlay: e.target.checked })}
                className="w-5 h-5 rounded cursor-pointer accent-blue-500"
              />
              Card Overlay
            </label>
            <div className="text-xs text-gray-500">
              {localContent.cardOverlay ? "Overlay enabled" : "Overlay disabled"}
            </div>
          </div>

          {localContent.cardOverlay && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Overlay Opacity: {localContent.cardOverlayOpacity || 5}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={localContent.cardOverlayOpacity || 5}
                  onChange={(e: any) => handleContentUpdate({ cardOverlayOpacity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="text-xs text-gray-500 mt-1">Adjust texture visibility</div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Overlay Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={localContent.cardOverlayColor || "#000000"}
                    onChange={(e: any) => handleContentUpdate({ cardOverlayColor: e.target.value })}
                    className="w-16 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={localContent.cardOverlayColor || "#000000"}
                    onChange={(e: any) => handleContentUpdate({ cardOverlayColor: e.target.value })}
                    className="flex-1 rounded-lg border-2 border-gray-200 p-2 text-sm font-mono"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Reasons Section */}
        <div className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h4 className="font-bold text-gray-800 text-xl flex items-center gap-2">
            <span className="text-xl">🎯</span>
            Why RAUS Reasons
          </h4>
          <div className="space-y-6">
            {(localContent.reasons || []).map((reason, i) => (
              <div
                key={reason.id}
                className="p-6 bg-gray-50 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-700">Reason #{i + 1}</span>
                  <button
                    onClick={() => {
                      const arr = [...(localContent.reasons || [])];
                      arr.splice(i, 1);
                      handleContentUpdate({ reasons: arr });
                    }}
                    className="rounded-xl px-4 py-2 bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-semibold transition-all duration-300 hover:shadow-md hover:scale-105"
                  >
                    🗑️ Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Icon
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        className="flex-1 rounded-lg border-2 border-gray-200 p-3 text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                        value={reason.iconName || ""}
                        onChange={(e: any) => {
                          const arr = [...(localContent.reasons || [])];
                          arr[i] = { ...arr[i], iconName: e.target.value, iconType: "lucide" };
                          handleContentUpdate({ reasons: arr });
                        }}
                        placeholder="Select an icon..."
                      />
                    </div>
                    <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-100 rounded-lg border border-gray-300">
                      {iconNames.map((iconName) => (
                        <button
                          key={iconName}
                          onClick={() => {
                            const arr = [...(localContent.reasons || [])];
                            arr[i] = { ...arr[i], iconName, iconType: "lucide" };
                            handleContentUpdate({ reasons: arr });
                          }}
                          className={`p-2 rounded flex flex-col items-center justify-center gap-1 hover:bg-blue-200 transition-all ${
                            reason.iconName === iconName ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                          }`}
                          title={iconName}
                        >
                          <div style={{ color: reason.iconName === iconName ? "white" : localContent.accentColor }}>
                            {renderLucideIcon(iconName, 18)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                      value={reason.title}
                      onChange={(e: any) => {
                        const arr = [...(localContent.reasons || [])];
                        arr[i] = { ...arr[i], title: e.target.value };
                        handleContentUpdate({ reasons: arr });
                      }}
                      placeholder="Reason title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded-lg border-2 border-gray-200 p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all outline-none resize-none"
                      value={reason.description}
                      onChange={(e: any) => {
                        const arr = [...(localContent.reasons || [])];
                        arr[i] = { ...arr[i], description: e.target.value };
                        handleContentUpdate({ reasons: arr });
                      }}
                      rows={3}
                      placeholder="Reason description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image
                    </label>
                    <MediaUpload
                      label=""
                      type="image"
                      currentUrl={reason.image}
                      onUpload={(url) => {
                        const arr = [...(localContent.reasons || [])];
                        arr[i] = { ...arr[i], image: url };
                        handleContentUpdate({ reasons: arr });
                      }}
                      onRemove={() => {
                        const arr = [...(localContent.reasons || [])];
                        arr[i] = { ...arr[i], image: "" };
                        handleContentUpdate({ reasons: arr });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              const arr = [...(localContent.reasons || [])];
              arr.push({
                id: `reason-${Date.now()}`,
                iconName: "Star",
                iconType: "lucide",
                title: "New Reason",
                description: "Reason description...",
                image: ""
              });
              handleContentUpdate({ reasons: arr });
            }}
            className="w-full rounded-xl px-6 py-3 bg-green-50 hover:bg-green-100 border-2 border-green-200 text-green-600 font-semibold transition-all duration-300 hover:shadow-md"
          >
            ➕ Add Reason
          </button>
        </div>
      </div>
    </div>
  );
}
