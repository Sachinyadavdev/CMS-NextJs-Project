"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Users, Leaf, Wrench, FileText } from 'lucide-react';
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
} from "@/app/components/EditableInputs";

interface Category {
  title: string;
  icon?: string;
  description?: string;
  bullets?: string[];
}

interface HeroSection {
  content?: any;
}

interface OurPartnerEcosystemProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function OurPartnerEcosystem({ section, isEditing, onUpdate }: OurPartnerEcosystemProps) {
  const content = section.content || {};
  const [localContent, setLocalContent] = useState<any>({
    title: content.title || 'Our Partner Ecosystem',
    subtitle: content.subtitle || 'RAUS collaborates with a powerful network of global and regional partners who bring specialized knowledge, cutting-edge tools and execution excellence.',
    backgroundColor: content.backgroundColor || '#0A1220',
    titleColor: content.titleColor || '#FFFFFF',
    textColor: content.textColor || '#DCEAFE',
    accentColor: content.accentColor || '#EF4130',
    categories: content.categories || [
      {
        title: 'Global Technology Providers',
        icon: 'Globe',
        description: 'We align with leading innovators in BIM, IoT, AI analytics, digital twins and automation to enhance project precision and digital transformation.',
        bullets: ['Intelligent modeling and visualization', 'Real-time project analytics', 'Predictive risk and performance modeling', 'Smart infrastructure integration'],
      },
      {
        title: 'Specialist Consultants',
        icon: 'Users',
        description: 'For every project, RAUS brings in domain experts who elevate quality, comfort and functionality.',
        bullets: ['Acoustics & sound engineering', 'Ergonomics & human-centered design', 'Biophilic & wellness design', 'Glare management & lighting', 'Sustainable materials & circular design'],
      },
      {
        title: 'Sustainability & Green Building Partners',
        icon: 'Leaf',
        description: 'Sustainability is a core pillar at RAUS and we collaborate with organizations leading advancements in green building and circular economy.',
        bullets: ['LEED & green certification', 'Circular economy systems', 'Low-carbon material development', 'Water and energy conservation', 'Climate risk & ESG advisory'],
      },
      {
        title: 'Construction & Fit-Out Contractors',
        icon: 'Wrench',
        description: 'RAUS works with trusted construction experts who share our commitment to quality, safety and timely delivery.',
        bullets: ['Precise execution of design intent', 'Efficient coordination across trades', 'Superior craftsmanship', 'On-time milestones & oversight'],
      },
      {
        title: 'Public Sector & Regulatory Authorities',
        icon: 'FileText',
        description: 'RAUS maintains strong relationships with key government bodies and approval authorities—critical for navigating compliance, permitting and technical approvals.',
        bullets: ['Faster authority coordination', 'Efficient documentation & NOC processes', 'Regulatory alignment from concept to completion'],
      },
    ],
    animationEnabled: content.animationEnabled !== undefined ? content.animationEnabled : true,
    cardBackgroundColor: content.cardBackgroundColor || '#ffffff',
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleContentUpdate = (patch: Record<string, any>) => {
    const updated = { ...localContent, ...patch };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const hexToRGBA = (hex: string, alpha = 1) => {
    try {
      const hexNorm = hex.replace('#', '');
      const fullHex = hexNorm.length === 3 ? hexNorm.split('').map((c: string) => c + c).join('') : hexNorm;
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
    try {
      const hexNorm = String(hex || '#FFFFFF').replace('#', '');
      const fullHex = hexNorm.length === 3 ? hexNorm.split('').map((c: string) => c + c).join('') : hexNorm;
      const num = parseInt(fullHex, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return luminance > 0.6 ? '#0F172A' : '#FFFFFF';
    } catch (e) {
      return '#FFFFFF';
    }
  };

  const IconRenderer = ({ name }: { name: string }) => {
    const map: any = { Globe, Users, Leaf, Wrench, FileText };
    const key = String(name || 'Globe');
    const El = map[key] || Globe;
    return <El className="w-6 h-6 text-white" />;
  };

  const Preview = (props?: { useLocal?: boolean }) => {
    const data = props?.useLocal ? localContent : { ...content, ...localContent };
    
    return (
      <section className="w-full py-16 lg:py-24 relative overflow-hidden" style={{ background: data.backgroundColor }}>
        {/* Background texture layers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Dot pattern texture */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, ${hexToRGBA(data.accentColor, 0.15)} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
          
          {/* Grid lines */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(${hexToRGBA(data.titleColor, 0.1)} 1px, transparent 1px),
                linear-gradient(90deg, ${hexToRGBA(data.titleColor, 0.1)} 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Diagonal lines texture */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                ${hexToRGBA(data.accentColor, 0.3)} 0px,
                ${hexToRGBA(data.accentColor, 0.3)} 1px,
                transparent 1px,
                transparent 12px
              )`
            }}
          />
          
          {/* Animated gradient orbs */}
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${data.accentColor} 0%, transparent 70%)`,
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${data.accentColor} 0%, transparent 70%)`,
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
          
          {/* Additional floating orbs */}
          <div 
            className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${data.titleColor} 0%, transparent 70%)`,
              animation: 'float 30s ease-in-out infinite'
            }}
          />
          
          {/* Noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px'
            }}
          />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -20px) scale(1.05); }
            50% { transform: translate(-15px, 15px) scale(0.95); }
            75% { transform: translate(15px, 10px) scale(1.02); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          .card-item {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
          }
          
          .card-item:nth-child(1) { animation-delay: 0.1s; }
          .card-item:nth-child(2) { animation-delay: 0.2s; }
          .card-item:nth-child(3) { animation-delay: 0.3s; }
          .card-item:nth-child(4) { animation-delay: 0.4s; }
          .card-item:nth-child(5) { animation-delay: 0.5s; }
          .card-item:nth-child(6) { animation-delay: 0.6s; }
        `}</style>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header with staggered animation */}
          <div 
            className="max-w-3xl mx-auto text-center mb-12"
            style={{
              animation: isVisible ? 'fadeInUp 0.8s ease-out' : 'none'
            }}
          >
            <div className="inline-block mb-4">
              <h2 
                className="text-2xl lg:text-3xl md:text-4xl font-bold tracking-tight relative"
                style={{ color: data.accentColor }}
              >
                {data.title}
                {/* <div 
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{
                    width: '60%',
                    background: `linear-gradient(90deg, ${data.accentColor} 0%, transparent 100%)`,
                    animation: 'scaleIn 0.8s ease-out 0.3s forwards',
                    transformOrigin: 'left',
                    opacity: 0
                  }}
                /> */}
              </h2>
            </div>
            <p 
              className="mt-6 text-base lg:text-lg leading-relaxed"
              style={{ 
                color: data.textColor,
                animation: 'fadeIn 1s ease-out 0.4s forwards',
                opacity: 0
              }}
            >
              {data.subtitle}
            </p>
          </div>

          {/* Cards grid with staggered entrance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(data.categories || []).map((cat: Category, i: number) => (
              <div
                key={i}
                className="card-item group relative rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 ease-out hover:scale-105 cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRGBA(data.cardBackgroundColor, 0.98)} 0%, ${hexToRGBA(data.cardBackgroundColor, 0.9)} 100%), linear-gradient(135deg, ${hexToRGBA(data.accentColor, 0.06)} 0%, ${hexToRGBA('#FFFFFF', 0.03)} 100%)`,
                    borderLeft: `4px solid ${data.accentColor}`,
                    boxShadow: `0 6px 28px ${hexToRGBA(data.cardBackgroundColor, 0.06)}, 0 4px 20px ${hexToRGBA(data.accentColor, 0.08)}`,
                  }}
              >
                {/* Shimmer effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-2xl pointer-events-none"
                >
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${hexToRGBA(data.cardBackgroundColor, 0.2)}, transparent)`,
                      animation: 'shimmer 2s infinite'
                    }}
                  />
                </div>

                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-4 relative z-10">
                  <div 
                    className="w-14 h-14 flex items-center justify-center rounded-xl shadow-lg transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    style={{ 
                      background: `linear-gradient(135deg, ${data.accentColor} 0%, ${hexToRGBA(data.accentColor, 0.8)} 100%)`,
                      boxShadow: `0 8px 20px ${hexToRGBA(data.accentColor, 0.3)}`
                    }}
                  >
                    <IconRenderer name={cat.icon || 'Globe'} />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-bold text-lg lg:text-xl mb-2 transition-colors duration-300"
                      style={{ color: getReadableTextColor(data.cardBackgroundColor) }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                {cat.description && (
                    <p 
                      className="text-sm leading-relaxed mb-4 relative z-10"
                      style={{ color: hexToRGBA(getReadableTextColor(data.cardBackgroundColor), 0.9) }}
                    >
                    {cat.description}
                  </p>
                )}

                {/* Bullets */}
                {cat.bullets && (
                  <ul className="space-y-2.5 relative z-10">
                    {cat.bullets.map((b, idx) => (
                        <li 
                        key={idx}
                        className="text-sm flex items-start gap-3 transform transition-all duration-300 group-hover:translate-x-1"
                        style={{ 
                          color: hexToRGBA(getReadableTextColor(data.cardBackgroundColor), 0.85),
                          transitionDelay: `${idx * 50}ms`
                        }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                          style={{ 
                            background: data.accentColor,
                            boxShadow: `0 0 8px ${hexToRGBA(data.accentColor, 0.5)}`
                          }}
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Hover border glow */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `0 0 30px ${hexToRGBA(data.accentColor, 0.3)}`,
                    background: `linear-gradient(180deg, ${hexToRGBA(data.cardBackgroundColor, 0.02)}, ${hexToRGBA(data.cardBackgroundColor, 0.02)})`
                  }}
                />
              </div>
            ))}
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
        <div className="rounded-xl border bg-white p-6 shadow-lg backdrop-blur-sm" style={{ borderColor: hexToRGBA(localContent.accentColor, 0.2) }}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: localContent.accentColor }} />
              Live Preview
            </h3>
          </div>
          <div className="rounded-lg overflow-hidden border" style={{ borderColor: hexToRGBA(localContent.accentColor, 0.1) }}>
            <Preview useLocal />
          </div>
        </div>
      </motion.div>

      {/* Editing Controls - Right Columns */}
      <div className="lg:col-span-2 space-y-6">
        <div className='space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4' style={{ borderLeftColor: "#6366f1" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #6366f1, #a78bfa)" }} />
            <h4 className='font-bold text-gray-800 text-lg'>Content</h4>
          </div>
          <EditableText
            label="Title"
            value={localContent.title}
            onChange={(val) => handleContentUpdate({ title: val })}
            placeholder="Enter title..."
          />
          <EditableTextarea
            label="Subtitle"
            value={localContent.subtitle}
            onChange={(val) => handleContentUpdate({ subtitle: val })}
            rows={3}
            placeholder="Enter subtitle..."
          />
        </div>

        <div className='space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4' style={{ borderLeftColor: "#ef4444" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #ef4444, #f87171)" }} />
            <h4 className='font-bold text-gray-800 text-lg'>Appearance</h4>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <EditableColorPicker
              label="Accent Color"
              value={localContent.accentColor}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />
            <EditableColorPicker
              label="Background"
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
            <EditableColorPicker
              label="Card Background"
              value={localContent.cardBackgroundColor}
              onChange={(val) => handleContentUpdate({ cardBackgroundColor: val })}
            />
          </div>
        </div>

        <div className='space-y-4 bg-white p-6 rounded-lg shadow-sm border-l-4' style={{ borderLeftColor: "#f59e0b" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }} />
            <h4 className='font-bold text-gray-800 text-lg'>Categories</h4>
          </div>
          {(localContent.categories || []).map((cat: Category, idx: number) => (
            <div key={idx} className='space-y-3 bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm'>
              <div className='flex items-center gap-2'>
                <div className='flex-1'>
                  <EditableText
                    label=""
                    value={cat.title}
                    onChange={(val) => {
                      const arr = JSON.parse(JSON.stringify(localContent.categories));
                      arr[idx].title = val;
                      handleContentUpdate({ categories: arr });
                    }}
                    placeholder="Category title"
                  />
                </div>
                <div className='w-32'>
                  <EditableSelect
                    label=""
                    value={cat.icon || 'Globe'}
                    onChange={(val) => {
                      const arr = JSON.parse(JSON.stringify(localContent.categories));
                      arr[idx].icon = val;
                      handleContentUpdate({ categories: arr });
                    }}
                    options={['Globe', 'Users', 'Leaf', 'Wrench', 'FileText'].map((n) => ({
                      label: n,
                      value: n,
                    }))}
                  />
                </div>
                <button
                  onClick={() => {
                    const arr = JSON.parse(JSON.stringify(localContent.categories || []));
                    arr.splice(idx, 1);
                    handleContentUpdate({ categories: arr });
                  }}
                  className='rounded-lg px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all font-medium'
                >
                  Remove
                </button>
              </div>
              <EditableTextarea
                label=""
                value={cat.description || ''}
                onChange={(val) => {
                  const arr = JSON.parse(JSON.stringify(localContent.categories));
                  arr[idx].description = val;
                  handleContentUpdate({ categories: arr });
                }}
                rows={2}
                placeholder="Category description"
              />
              <div className='space-y-2'>
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Bullet Points</p>
                {(cat.bullets || []).map((b, j) => (
                  <div key={j} className='flex gap-2 items-center'>
                    <div className='flex-1'>
                      <EditableText
                        label=""
                        value={b}
                        onChange={(val) => {
                          const arr = JSON.parse(JSON.stringify(localContent.categories));
                          arr[idx].bullets[j] = val;
                          handleContentUpdate({ categories: arr });
                        }}
                        placeholder="Bullet point"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const arr = JSON.parse(JSON.stringify(localContent.categories));
                        arr[idx].bullets.splice(j, 1);
                        handleContentUpdate({ categories: arr });
                      }}
                      className='rounded-lg px-3 py-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all text-sm font-medium'
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => { 
                    const arr = JSON.parse(JSON.stringify(localContent.categories || [])); 
                    arr[idx].bullets = arr[idx].bullets || []; 
                    arr[idx].bullets.push('New bullet point'); 
                    handleContentUpdate({ categories: arr }); 
                  }} 
                  className='rounded-lg px-4 py-2 font-medium text-sm transition-all hover:shadow-md'
                  style={{ 
                    backgroundColor: hexToRGBA(localContent.accentColor, 0.1), 
                    color: localContent.accentColor,
                    border: `2px solid ${hexToRGBA(localContent.accentColor, 0.2)}`
                  }}
                >
                  + Add Bullet
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={() => { 
              const arr = JSON.parse(JSON.stringify(localContent.categories || [])); 
              arr.push({ title: 'New Category', icon: 'Globe', description: '', bullets: [] }); 
              handleContentUpdate({ categories: arr }); 
            }} 
            className='rounded-lg px-6 py-3 font-semibold transition-all hover:shadow-lg transform hover:scale-105'
            style={{ 
              backgroundColor: localContent.accentColor,
              color: '#FFFFFF',
              boxShadow: `0 4px 12px ${hexToRGBA(localContent.accentColor, 0.3)}`
            }}
          >
            + Add New Category
          </button>
        </div>
      </div>
    </div>
  );
}