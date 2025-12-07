"use client";

import React from "react";
import { ArrowUpRight, Home, Globe, Users, Truck, BarChart3, Building, Zap, Settings, Shield, Lightbulb, Target, Briefcase, Award, CheckCircle, TrendingUp, Layers, Map, Clock, Star, Heart, Smile, Coffee, Camera, Music, Gamepad2, Headphones, Palette, Bookmark, Calendar, Mail, Phone, MessageCircle, Search, Filter, Download, Upload, Share, Edit, Trash, Plus, Minus, X, Check, Eye, EyeOff, Lock, Unlock, User, Crown, Diamond, Gem, Sparkles, Flame, Sun, Moon, Cloud, Umbrella, Snowflake, Droplet, Leaf, Trees, Flower, Mountain, Waves } from "lucide-react";
import { HomeServicesSection, HomeServiceItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect } from "@/app/components/EditableInputs";

interface AtaGlanceServiceSectionProps {
  section: HomeServicesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HomeServicesSection>) => void;
}

// Map of available Lucide icons
const iconMap: { [key: string]: React.ComponentType<any> } = {
  ArrowUpRight, Home, Globe, Users, Truck, BarChart3, Building, Zap, Settings, Shield, 
  Lightbulb, Target, Briefcase, Award, CheckCircle, TrendingUp, Layers, Map, Clock, 
  Star, Heart, Smile, Coffee, Camera, Music, Gamepad2, Headphones, Palette, Bookmark, 
  Calendar, Mail, Phone, MessageCircle, Search, Filter, Download, Upload, Share, Edit, 
  Trash, Plus, Minus, X, Check, Eye, EyeOff, Lock, Unlock, User, Crown, Diamond, Gem, 
  Sparkles, Flame, Sun, Moon, Cloud, Umbrella, Snowflake, Droplet, Leaf, Trees, Flower, 
  Mountain, Waves
};

const getIconNames = () => Object.keys(iconMap);

const extractServices = (content: HomeServicesSection["content"]): HomeServiceItem[] => {
  if (Array.isArray(content)) {
    return content;
  }

  if (!content) return [];

  if (Array.isArray(content.services)) {
    return content.services as HomeServiceItem[];
  }

  const candidates = Object.values(content)
    .filter((value) => typeof value === "object" && value !== null)
    .map((value) => value as HomeServiceItem);

  return candidates.filter((item) => item && item.title);
};

export default function AtaGlanceServiceSection({ section, isEditing, onUpdate }: AtaGlanceServiceSectionProps) {
  const content = section.content;
  const services = extractServices(content);
  const baseConfig = Array.isArray(content) ? {} : content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    const updated = Array.isArray(content) ? { services, ...patch } : { ...baseConfig, ...patch };
    onUpdate({ content: updated });
  };

  const handleServiceUpdate = (index: number, patch: Partial<HomeServiceItem>) => {
    const updatedServices = services.map((service, idx) => (idx === index ? { ...service, ...patch } : service));
    handleContentUpdate({ services: updatedServices });
  };

  const handleAddService = () => {
    const newService: HomeServiceItem = {
      id: Date.now().toString(),
      iconType: "lucide",
      iconName: "Sparkles",
      title: "New Service",
      description: "Update this description.",
    };
    handleContentUpdate({ services: [...services, newService] });
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_, idx) => idx !== index);
    handleContentUpdate({ services: updatedServices });
  };

  if (!isEditing) {
    const {
      title = "Comprehensive Solutions",
      subtitle = "At a Glance",
      backgroundColor = '#0a0e27',
      titleColor = '#ffffff',
      subtitleColor = '#EF4130',
      iconColor = '#EF4130',
      cardBackgroundColor = 'rgba(255, 255, 255, 0.05)',
      textColor = '#e5e7eb',
      alignment = 'center',
      layout = 'grid' // 'grid' or 'masonry'
    } = baseConfig;

    // Default services if none provided
    const defaultServices = services.length > 0 ? services : [
      {
        id: '1',
        iconType: 'lucide' as const,
        iconName: 'Target',
        title: 'Strategic Planning',
        description: 'Comprehensive roadmaps and strategic guidance for long-term success'
      },
      {
        id: '2',
        iconType: 'lucide' as const,
        iconName: 'Zap',
        title: 'Digital Innovation',
        description: 'Cutting-edge technology solutions that transform your operations'
      },
      {
        id: '3',
        iconType: 'lucide' as const,
        iconName: 'Shield',
        title: 'Risk Management',
        description: 'Proactive identification and mitigation of potential challenges'
      },
      {
        id: '4',
        iconType: 'lucide' as const,
        iconName: 'TrendingUp',
        title: 'Growth Strategies',
        description: 'Data-driven approaches to accelerate business expansion'
      }
    ];

    const renderIcon = (service: HomeServiceItem) => {
      if (service.iconType === 'custom' && service.iconUrl) {
        return (
          <img 
            src={service.iconUrl} 
            alt={`${service.title} icon`}
            className="w-14 h-14 object-contain"
          />
        );
      }
      
      if (service.iconType === 'lucide' && service.iconName) {
        const IconComponent = iconMap[service.iconName];
        if (IconComponent) {
          return (
            <IconComponent 
              className="w-14 h-14"
              style={{ color: iconColor }}
            />
          );
        }
      }
      
      return (
        <Sparkles 
          className="w-14 h-14"
          style={{ color: iconColor }}
        />
      );
    };

    return (
      <section 
        className="relative pt-10 overflow-hidden"
        style={{ backgroundColor }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ 
              backgroundColor: iconColor,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl"
            style={{ animation: 'float 10s ease-in-out infinite 2s' }}
          />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{ 
              backgroundImage: `linear-gradient(${iconColor}20 1px, transparent 1px), linear-gradient(90deg, ${iconColor}20 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-30px) translateX(15px); }
            50% { transform: translateY(-60px) translateX(-15px); }
            75% { transform: translateY(-30px) translateX(10px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div 
            className={`mb-16 lg:mb-20 ${
              alignment === 'center' ? 'text-center mx-auto max-w-3xl' : 
              alignment === 'right' ? 'text-right' : 'text-left'
            }`}
            style={{ animation: 'fadeInUp 1s ease-out' }}
          >
            {/* Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full border backdrop-blur-md ${
                alignment === 'center' ? '' : 
                alignment === 'right' ? 'ml-auto' : ''
              }`}
              style={{ 
                borderColor: `${iconColor}40`,
                backgroundColor: `${iconColor}10`
              }}
            >
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: iconColor }}
              />
              <span 
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: iconColor }}
              >
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: titleColor }}
            >
              {title}
            </h2>

            {/* Decorative line */}
            <div 
              className={`h-1 w-24 rounded-full ${
                alignment === 'center' ? 'mx-auto' : 
                alignment === 'right' ? 'ml-auto' : ''
              }`}
              style={{ 
                backgroundColor: iconColor,
                animation: 'scaleIn 0.8s ease-out 0.3s both'
              }}
            />
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultServices.map((service: HomeServiceItem, index: number) => (
              <div 
                key={service.id}
                className="group"
                style={{ animation: `fadeInUp 1s ease-out ${0.2 + index * 0.1}s both` }}
              >
                <div 
                  className="relative h-full p-8 rounded-3xl backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-white/30 overflow-hidden"
                  style={{ backgroundColor: cardBackgroundColor }}
                >
                  {/* Glowing effect on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                    style={{ 
                      background: `radial-gradient(circle at center, ${iconColor}30, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div 
                      className="mb-6 inline-flex p-4 rounded-2xl backdrop-blur-sm transition-all duration-500 group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)`,
                        boxShadow: `0 0 30px ${iconColor}30`
                      }}
                    >
                      {renderIcon(service)}
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-xl lg:text-2xl font-bold mb-4 leading-tight"
                      style={{ color: titleColor }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-base leading-relaxed mb-6 opacity-80"
                      style={{ color: textColor }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom gradient line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ 
                      background: `linear-gradient(90deg, ${iconColor}, transparent)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Preview for editing mode
  const renderPreview = () => {
    const {
      title = "Comprehensive Solutions",
      subtitle = "At a Glance",
      backgroundColor = '#0a0e27',
      titleColor = '#ffffff',
      subtitleColor = '#EF4130',
      iconColor = '#EF4130',
      cardBackgroundColor = 'rgba(255, 255, 255, 0.05)',
      textColor = '#e5e7eb'
    } = baseConfig;

    const defaultServices = services.length > 0 ? services.slice(0, 4) : [
      {
        id: '1',
        iconType: 'lucide' as const,
        iconName: 'Target',
        title: 'Strategic Planning',
        description: 'Comprehensive roadmaps for success'
      },
      {
        id: '2',
        iconType: 'lucide' as const,
        iconName: 'Zap',
        title: 'Digital Innovation',
        description: 'Technology solutions that transform'
      }
    ];

    const renderIcon = (service: HomeServiceItem) => {
      if (service.iconType === 'custom' && service.iconUrl) {
        return <img src={service.iconUrl} alt="" className="w-10 h-10 object-contain" />;
      }
      if (service.iconType === 'lucide' && service.iconName) {
        const IconComponent = iconMap[service.iconName];
        if (IconComponent) {
          return <IconComponent className="w-10 h-10" style={{ color: iconColor }} />;
        }
      }
      return <Sparkles className="w-10 h-10" style={{ color: iconColor }} />;
    };

    return (
      <section 
        className="py-12 rounded-lg overflow-hidden"
        style={{ backgroundColor }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border backdrop-blur-md"
              style={{ 
                borderColor: `${iconColor}40`,
                backgroundColor: `${iconColor}10`
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: iconColor }} />
              <span className="text-xs font-bold uppercase" style={{ color: iconColor }}>
                {subtitle}
              </span>
            </div>
            <h2 className="text-3xl font-bold" style={{ color: titleColor }}>
              {title}
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defaultServices.slice(0, 2).map((service: HomeServiceItem, index: number) => (
              <div 
                key={service.id}
                className="p-6 rounded-2xl backdrop-blur-xl border border-white/10"
                style={{ backgroundColor: cardBackgroundColor }}
              >
                <div 
                  className="inline-flex p-3 rounded-xl mb-4"
                  style={{ background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)` }}
                >
                  {renderIcon(service)}
                </div>
                <div 
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border border-white/10"
                  style={{ backgroundColor: `${iconColor}20`, color: iconColor }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: titleColor }}>
                  {service.title}
                </h3>
                <p className="text-sm opacity-80" style={{ color: textColor }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-red-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8">
          {renderPreview()}
        </div>
      </motion.div>

      {/* Editing Controls */}
      <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Edit At a Glance Services</h3>
          <button
            type="button"
            onClick={handleAddService}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition"
          >
            Add Service
          </button>
        </div>

        <div className="space-y-6">
          {/* Section Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableText
              label="Section Title"
              value={(baseConfig.title as string) || ""}
              onChange={(value: any) => handleContentUpdate({ title: value })}
            />
            <EditableText
              label="Section Subtitle"
              value={(baseConfig.subtitle as string) || ""}
              onChange={(value: any) => handleContentUpdate({ subtitle: value })}
            />
          </div>

          {/* Color Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EditableColorPicker
              label="Background Color"
              value={(baseConfig.backgroundColor as string) || ""}
              onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
            />
            <EditableColorPicker
              label="Title Color"
              value={(baseConfig.titleColor as string) || ""}
              onChange={(value: any) => handleContentUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="Accent Color"
              value={(baseConfig.iconColor as string) || ""}
              onChange={(value: any) => handleContentUpdate({ iconColor: value })}
            />
            <EditableColorPicker
              label="Card Background"
              value={(baseConfig.cardBackgroundColor as string) || ""}
              onChange={(value: any) => handleContentUpdate({ cardBackgroundColor: value })}
            />
            <EditableColorPicker
              label="Text Color"
              value={(baseConfig.textColor as string) || ""}
              onChange={(value: any) => handleContentUpdate({ textColor: value })}
            />
            <EditableSelect
              label="Alignment"
              value={(baseConfig.alignment as string) || "center"}
              onChange={(value: any) => handleContentUpdate({ alignment: value })}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" }
              ]}
            />
          </div>

          {/* Individual Services */}
          <div className="mt-8 space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Services</h4>
            {services.map((service, index) => (
              <div key={service.id} className="rounded-lg border bg-purple-50/30 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h5 className="text-base font-semibold text-gray-900">Service {index + 1}</h5>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-sm text-red-600 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <EditableText
                    label="Title"
                    value={service.title || ""}
                    onChange={(value: any) => handleServiceUpdate(index, { title: value })}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableSelect
                      label="Icon Type"
                      value={service.iconType || 'lucide'}
                      onChange={(value: any) => handleServiceUpdate(index, { iconType: value as 'lucide' | 'custom' })}
                      options={[
                        { value: "lucide", label: "Lucide Icon" },
                        { value: "custom", label: "Custom Icon" }
                      ]}
                    />
                    
                    {service.iconType === 'lucide' ? (
                      <EditableSelect
                        label="Icon Name"
                        value={service.iconName || ""}
                        onChange={(value: any) => handleServiceUpdate(index, { iconName: value } as any)}
                        options={[
                          { value: "", label: "Select an icon..." },
                          ...getIconNames().map((iconName) => ({ value: iconName, label: iconName }))
                        ]}
                      />
                    ) : (
                      <div className="flex flex-col gap-2">
                        <MediaUpload
                          label="Custom Icon"
                          type="image"
                          currentUrl={service.iconUrl}
                          onUpload={(url) => handleServiceUpdate(index, { iconUrl: url })}
                          onRemove={() => handleServiceUpdate(index, { iconUrl: '' })}
                          placeholder="Upload custom icon..."
                        />
                      </div>
                    )}
                  </div>
                  
                  <EditableTextarea
                    label="Description"
                    value={service.description || ""}
                    onChange={(value: any) => handleServiceUpdate(index, { description: value })}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}