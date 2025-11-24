"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Globe, Users, Award, Handshake, Star } from 'lucide-react';
import { HeroSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

interface PartnershipPhilosophyProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function PartnershipPhilosophy({ section, isEditing, onUpdate }: PartnershipPhilosophyProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState({
    title: content.title || "🌍 Our Partnership Philosophy",
    description: content.description || "We view every partner as an extension of our mission — contributing to intelligent, sustainable, and high-performing environments. Every collaboration is built on:",
    backgroundColor: content.backgroundColor || "#071027",
    titleColor: content.titleColor || "#FFFFFF",
    textColor: content.textColor || "#DCEAFE",
    accentColor: content.accentColor || "#7C3AED",
    features: (content.features || ["Trust & Transparency", "Shared Values", "Mutual Growth", "Commitment to Excellence", "Long-term Relationship Building"]).map((f: any, idx: number) => typeof f === 'string' ? { title: f, icon: ["ShieldCheck","Globe","Users","Award","Handshake"][idx] || 'Star' } : f),
    cardPadding: content.cardPadding || "py-4 px-6",
    animationEnabled: content.animationEnabled !== undefined ? content.animationEnabled : true,
  });

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    const updated = { ...localContent, ...patch };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  // Helpers for color calculations
  const hexToRGBA = (hex: string, alpha = 1) => {
    try {
      const hexNorm = hex.replace('#', '');
      const fullHex = hexNorm.length === 3 ? hexNorm.split('').map((c) => c + c).join('') : hexNorm;
      const num = parseInt(fullHex, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch (e) {
      return `rgba(255,255,255,${alpha})`;
    }
  };

  const getReadableTextColor = (hex: string) => {
    const hexNorm = hex.replace('#', '');
    const fullHex = hexNorm.length === 3 ? hexNorm.split('').map((c) => c + c).join('') : hexNorm;
    const num = parseInt(fullHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.6 ? '#0F172A' : '#FFFFFF';
  };

  const Preview = (props?: { useLocal?: boolean }) => {
    const data = props?.useLocal ? localContent : { ...content, ...localContent };
    const cardStyleBase: React.CSSProperties = {
      background: `linear-gradient(180deg, ${hexToRGBA(data.accentColor, 0.14)}, ${hexToRGBA(data.accentColor, 0.04)})`,
      border: `1px solid ${hexToRGBA('#ffffff', 0.06)}`,
      color: getReadableTextColor(data.accentColor),
      backdropFilter: `blur(8px)`,
      boxShadow: `0 10px 30px ${hexToRGBA('#000000', 0.18)}`,
      borderLeft: `4px solid ${hexToRGBA(data.accentColor, 0.9)}`,
    };

    return (
      <section className="relative w-full py-16 lg:py-20 flex items-center justify-center overflow-hidden" style={{ minHeight: 420, background: data.backgroundColor }}>
        <div className="relative z-10 max-w-6xl w-full px-6">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h3 className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: hexToRGBA(data.accentColor, 0.9) }}>Our Philosophy</h3>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3" style={{ color: data.titleColor }}>{data.title}</h2>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: data.textColor }}>{data.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.features || []).map((f: any, idx: number) => {
              const itemTitle = typeof f === 'string' ? f : f.title;
              const itemIcon = typeof f === 'string' ? (["ShieldCheck","Globe","Users","Award","Handshake"][idx] || 'Star') : f.icon || 'Star';
              const IconComponent = ({ iconName }: {iconName?: string}) => {
                const map: any = { ShieldCheck, Globe, Users, Award, Handshake, Star };
                const key = String(iconName || 'Star');
                const El = map[key] || map['Star'];
                return <El className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110" />;
              };

                return (
                <div key={idx} className={`rounded-xl transform transition-all duration-300 chip-hover animate-chip-pop chip-border group cursor-pointer`} style={{ ...cardStyleBase, padding: '18px 20px', animationDelay: `${idx * 120}ms` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-sm border border-white/10 transform transition-transform duration-300 group-hover:scale-110" style={{ background: data.accentColor }}>
                      <IconComponent iconName={itemIcon} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold transition-transform duration-300 transform group-hover:translate-x-1 leading-tight" style={{ color: data.titleColor }}>{itemTitle}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  if (!isEditing) return <Preview />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Live Preview - Sticky Left Column */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="lg:col-span-1 sticky top-8 h-fit"
      >
        <div className="rounded-xl border bg-white p-6 shadow-lg backdrop-blur-sm" style={{ borderColor: hexToRGBA(localContent.accentColor, 0.12) }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
            <span className="h-3 w-3 rounded-full animate-pulse" style={{ backgroundColor: hexToRGBA(localContent.accentColor, 0.36) }} />
          </div>
          <Preview useLocal />
        </div>
      </motion.div>

      {/* Editing Controls - Right Columns */}
      <div className="lg:col-span-2 space-y-6">
        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#6366f1" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Content</h4>
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
            rows={4}
            placeholder="Enter description..."
          />
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#ef4444" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #ef4444, #f87171)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Appearance</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableColorPicker
              label="Accent Color"
              value={localContent.accentColor}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />
            <EditableColorPicker
              label="BG Color"
              value={localContent.backgroundColor}
              onChange={(val) => handleContentUpdate({ backgroundColor: val })}
            />
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
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#f59e0b" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Features</h4>
          </div>
          <p className="text-sm text-gray-500">Manage the points displayed in the fancy boxes below (max 6).</p>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {(localContent.features || []).slice(0,6).map((f: any, i: number) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1">
                  <EditableText
                    label=""
                    value={f.title}
                    onChange={(val) => {
                      const arr = JSON.parse(JSON.stringify(localContent.features || []));
                      arr[i] = { ...arr[i], title: val };
                      handleContentUpdate({ features: arr });
                    }}
                    placeholder="Feature title"
                  />
                </div>
                <div className="w-32">
                  <EditableSelect
                    label=""
                    value={f.icon || 'ShieldCheck'}
                    onChange={(val) => {
                      const arr = JSON.parse(JSON.stringify(localContent.features || []));
                      arr[i] = { ...arr[i], icon: val };
                      handleContentUpdate({ features: arr });
                    }}
                    options={['ShieldCheck', 'Globe', 'Users', 'Award', 'Handshake', 'Star'].map((name) => ({
                      label: name,
                      value: name,
                    }))}
                  />
                </div>
                <div className="w-8 h-8 rounded flex items-center justify-center bg-white/6 border border-white/6" style={{ background: hexToRGBA(localContent.accentColor, 0.08) }}>
                  {(() => {
                    const map: any = { ShieldCheck, Globe, Users, Award, Handshake, Star };
                    const key = String(f.icon || 'ShieldCheck');
                    const El = map[key] || map['ShieldCheck'];
                    return <El className="w-4 h-4 text-white" />;
                  })()}
                </div>
                <button onClick={() => { const arr = [...(localContent.features || [])]; arr.splice(i,1); handleContentUpdate({ features: arr }); }} className="rounded px-3 py-2 bg-red-50 border border-red-100 text-red-600">Remove</button>
              </div>
            ))}
            <div>
              <button onClick={() => { const arr = [...(localContent.features || [])]; if (arr.length < 6) arr.push({ title: 'New Point', icon: 'ShieldCheck' }); handleContentUpdate({ features: arr }); }} className="rounded-lg px-4 py-2" style={{ backgroundColor: hexToRGBA(localContent.accentColor, 0.08), borderColor: hexToRGBA(localContent.accentColor, 0.10), color: localContent.accentColor, borderStyle: 'solid', borderWidth: 1 }}>Add Feature</button>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: "#06b6d4" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #06b6d4, #67e8f9)" }} />
            <h4 className="font-semibold text-gray-700 text-lg">Animation</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableCheckbox
              label="Enable Animations"
              checked={localContent.animationEnabled}
              onChange={(val) => handleContentUpdate({ animationEnabled: val })}
            />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
