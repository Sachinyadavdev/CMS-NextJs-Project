"use client";

import React from "react";
import { ArrowUpRight, Home, Globe, Users, Truck, BarChart3, Building, Zap, Settings, Shield, Lightbulb, Target, Briefcase, Award, CheckCircle, TrendingUp, Layers, Map, Clock, Star, Heart, Smile, Coffee, Camera, Music, Gamepad2, Headphones, Palette, Bookmark, Calendar, Mail, Phone, MessageCircle, Search, Filter, Download, Upload, Share, Edit, Trash, Plus, Minus, X, Check, Eye, EyeOff, Lock, Unlock, User, Crown, Diamond, Gem, Sparkles, Flame, Sun, Moon, Cloud, Umbrella, Snowflake, Droplet, Leaf, Trees, Flower, Mountain, Waves } from "lucide-react";
import { HomeServicesSection, HomeServiceItem } from "@/lib/db";
import MediaUpload from "../MediaUpload";

interface EditableHomeServicesProps {
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

export default function EditableHomeServicesSection({ section, isEditing, onUpdate }: EditableHomeServicesProps) {
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

  const handleSaveChanges = () => {
    onUpdate({ 
      content: { 
        ...baseConfig, 
        services 
      } 
    });
  };

  if (!isEditing) {
    const {
      title = "Our Suite of Integrated Services",
      subtitle = "We offer expert guidance and execution across the full project lifecycle, turning challenges into growth engines:",
      backgroundColor = 'transparent',
      titleColor = '#EF4130',
      subtitleColor = '#333333',
      iconColor = '#EF4130',
      cardBackgroundColor = 'transparent',
      cardBorderColor = 'transparent',
      cardShadow = 'none',
      alignment = 'center',
      titleFontSize = 28,
      subtitleFontSize = 18,
      showSeparator = false,
      separatorColor = '#EF4130'
    } = baseConfig;

    // Default services if none provided
    const defaultServices = services.length > 0 ? services : [
      {
        id: '1',
        iconType: 'lucide' as const,
        iconName: 'Home',
        title: 'Real Estate & Construction',
        description: 'Shaping sustainable, inclusive and future-ready environments'
      },
      {
        id: '2',
        iconType: 'lucide' as const,
        iconName: 'Globe',
        title: 'Digital Transformation',
        description: 'Connecting architecture, tech and operations for smarter spaces'
      },
      {
        id: '3',
        iconType: 'lucide' as const,
        iconName: 'Users',
        title: 'Strategic Consulting & Advisory Solutions',
        description: 'Driving strategic roadmaps for infrastructure, urban planning and digital growth'
      },
      {
        id: '4',
        iconType: 'lucide' as const,
        iconName: 'Truck',
        title: 'Mobility & Transport Networks',
        description: 'Holistic transport planning using digital innovation for better connectivity and resilience'
      },
      {
        id: '5',
        iconType: 'lucide' as const,
        iconName: 'BarChart3',
        title: 'Project Coordination & Approval Standards',
        description: 'End-to-end oversight with centralized management and approvals'
      }
    ];

    const renderIcon = (service: HomeServiceItem) => {
      if (service.iconType === 'custom' && service.iconUrl) {
        return (
          <img 
            src={service.iconUrl} 
            alt={`${service.title} icon`}
            className="w-12 h-12 object-contain"
          />
        );
      }
      
      if (service.iconType === 'lucide' && service.iconName) {
        const IconComponent = iconMap[service.iconName];
        if (IconComponent) {
          return (
            <IconComponent 
              className="w-12 h-12"
              style={{ color: iconColor }}
            />
          );
        }
      }
      
      // Fallback icon
      return (
        <Home 
          className="w-12 h-12"
          style={{ color: iconColor }}
        />
      );
    };

    return (
      <section 
        className="py-0 lg:py-0"
        style={{ backgroundColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className={`mb-16 ${
            alignment === 'center' ? 'text-center' : 
            alignment === 'right' ? 'text-right' : 'text-left'
          }`}>
            <h2 className="leading-tight">
              <span 
                style={{ 
                  color: titleColor, 
                  fontSize: `${titleFontSize}px`, 
                  fontWeight: 'bold' 
                }}
                className="block"
              >
                {title}
              </span>
              <span 
                style={{ 
                  color: subtitleColor, 
                  fontSize: `${subtitleFontSize}px`, 
                  fontWeight: '300' 
                }}
                className="block mt-2"
              >
                {subtitle}
              </span>
            </h2>
          </div>

          {/* Services Grid */}
          <div className="space-y-8 lg:space-y-12">
            {/* First Row - 3 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {defaultServices.slice(0, 3).map((service: HomeServiceItem, index: number) => (
                <div 
                  key={service.id}
                  className="relative group"
                >
                  {/* Service Card */}
                  <div 
                    className="p-6 transition-all duration-300 text-center relative"
                    style={{ 
                      backgroundColor: cardBackgroundColor,
                      borderColor: cardBorderColor,
                      boxShadow: cardShadow,
                      borderWidth: cardBorderColor !== 'transparent' ? '1px' : '0',
                      borderRadius: cardBackgroundColor !== 'transparent' || cardBorderColor !== 'transparent' ? '16px' : '0'
                    }}
                  >
                    {/* Separator line - only show for first two cards */}
                    {index < 2 && (
                      <div 
                        className="absolute top-6 -right-4 h-48 w-px hidden lg:block"
                        style={{ backgroundColor: separatorColor }}
                      />
                    )}

                    {/* Arrow in top-right corner */}
                    <div className="absolute top-6 right-6">
                      <ArrowUpRight 
                        className="w-6 h-6"
                        style={{ color: iconColor }}
                      />
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="flex-shrink-0">
                        {renderIcon(service)}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 
                        className="text-xl mb-4 leading-tight font-semibold"
                        style={{ color: '#333333' }}
                      >
                        {service.title}
                      </h3>
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: 'rgb(51, 51, 51)', fontWeight: '300' }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - 2 Cards Centered */}
            {defaultServices.length > 3 && (
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                  {defaultServices.slice(3, 5).map((service: HomeServiceItem, index: number) => (
                    <div 
                      key={service.id}
                      className="relative group"
                    >
                      {/* Service Card */}
                      <div 
                        className="p-6 transition-all duration-300 text-center relative"
                        style={{ 
                          backgroundColor: cardBackgroundColor,
                          borderColor: cardBorderColor,
                          boxShadow: cardShadow,
                          borderWidth: cardBorderColor !== 'transparent' ? '1px' : '0',
                          borderRadius: cardBackgroundColor !== 'transparent' || cardBorderColor !== 'transparent' ? '16px' : '0'
                        }}
                      >
                        {/* Separator line - only show for first card */}
                        {index === 0 && (
                          <div 
                            className="absolute top-6 -right-4 h-48 w-px hidden md:block"
                            style={{ backgroundColor: separatorColor }}
                          />
                        )}

                        {/* Arrow in top-right corner */}
                        <div className="absolute top-6 right-6">
                          <ArrowUpRight 
                            className="w-6 h-6"
                            style={{ color: iconColor }}
                          />
                        </div>

                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                          <div className="flex-shrink-0">
                            {renderIcon(service)}
                          </div>
                        </div>

                        {/* Content */}
                        <div>
                          <h3 
                            className="text-xl mb-4 leading-tight font-semibold"
                            style={{ color: '#333333' }}
                          >
                            {service.title}
                          </h3>
                          <p 
                            className="text-lg leading-relaxed"
                            style={{ color: 'rgb(51, 51, 51)', fontWeight: '300' }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
  // Render the preview section
  const renderPreview = () => {
    const {
      title = "Our Suite of Integrated Services",
      subtitle = "We offer expert guidance and execution across the full project lifecycle, turning challenges into growth engines:",
      backgroundColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#333333',
      iconColor = '#EF4130',
      alignment = 'center'
    } = baseConfig;

    const defaultServices = services.length > 0 ? services : [
      {
        id: '1',
        iconType: 'lucide' as const,
        iconName: 'Home',
        title: 'Real Estate & Construction',
        description: 'Shaping sustainable, inclusive and future-ready environments'
      },
      {
        id: '2',
        iconType: 'lucide' as const,
        iconName: 'Globe',
        title: 'Digital Transformation',
        description: 'Connecting architecture, tech and operations for smarter spaces'
      },
      {
        id: '3',
        iconType: 'lucide' as const,
        iconName: 'Users',
        title: 'Strategic Consulting',
        description: 'Driving strategic roadmaps for infrastructure and digital growth'
      }
    ];

    const renderIcon = (service: HomeServiceItem) => {
      if (service.iconType === 'custom' && service.iconUrl) {
        return (
          <img 
            src={service.iconUrl} 
            alt={`${service.title} icon`}
            className="w-10 h-10 object-contain"
          />
        );
      }
      
      if (service.iconType === 'lucide' && service.iconName) {
        const IconComponent = iconMap[service.iconName];
        if (IconComponent) {
          return (
            <IconComponent 
              className="w-10 h-10"
              style={{ color: iconColor }}
            />
          );
        }
      }
      
      return (
        <Home 
          className="w-10 h-10"
          style={{ color: iconColor }}
        />
      );
    };

    return (
      <section 
        className="py-8 rounded-lg"
        style={{ backgroundColor }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className={`mb-8 ${
            alignment === 'center' ? 'text-center' : 
            alignment === 'right' ? 'text-right' : 'text-left'
          }`}>
            <h2 className="leading-tight">
              <span 
                style={{ color: titleColor, fontSize: '24px', fontWeight: 'bold' }}
                className="block"
              >
                {title}
              </span>
              <span 
                style={{ color: subtitleColor, fontSize: '24px', fontWeight: '300' }}
                className="block mt-1"
              >
                {subtitle}
              </span>
            </h2>
          </div>

          {/* Services Grid - Preview only shows first 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultServices.slice(0, 3).map((service: HomeServiceItem, index: number) => (
              <div 
                key={service.id}
                className="relative group"
              >
                <div className="p-4 rounded-xl transition-all duration-300 text-center relative border border-gray-200">
                  {/* Arrow in top-right corner */}
                  <div className="absolute top-4 right-4">
                    <ArrowUpRight 
                      className="w-5 h-5"
                      style={{ color: iconColor }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="flex-shrink-0">
                      {renderIcon(service)}
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 
                      className="text-lg mb-2 leading-tight font-semibold"
                      style={{ color: '#333333' }}
                    >
                      {service.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgb(51, 51, 51)', fontWeight: '300' }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
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
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center justify-between">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
              Section Header
            </span>
            <button
              type="button"
              onClick={handleAddService}
              className="rounded-lg border border-orange-400 px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
            >
              Add Service
            </button>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={(baseConfig.title as string) || ""}
                onChange={(event) => handleContentUpdate({ title: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter section title..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Section Subtitle</label>
              <input
                type="text"
                value={(baseConfig.subtitle as string) || ""}
                onChange={(event) => handleContentUpdate({ subtitle: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter section subtitle..."
              />
            </div>
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Background Color</label>
              <input
                type="color"
                value={(baseConfig.backgroundColor as string) || "#ffffff"}
                onChange={(event) => handleContentUpdate({ backgroundColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title Color</label>
              <input
                type="color"
                value={(baseConfig.titleColor as string) || "#EF4130"}
                onChange={(event) => handleContentUpdate({ titleColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle Color</label>
              <input
                type="color"
                value={(baseConfig.subtitleColor as string) || "#333333"}
                onChange={(event) => handleContentUpdate({ subtitleColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Icon Color</label>
              <input
                type="color"
                value={(baseConfig.iconColor as string) || "#EF4130"}
                onChange={(event) => handleContentUpdate({ iconColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Card Background</label>
              <input
                type="color"
                value={(baseConfig.cardBackgroundColor as string) || "#ffffff"}
                onChange={(event) => handleContentUpdate({ cardBackgroundColor: event.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
              <select
                value={(baseConfig.alignment as string) || "center"}
                onChange={(event) => handleContentUpdate({ alignment: event.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2" />
            Services Management
          </h3>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={service.id || index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">Service {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={service.title || ""}
                      onChange={(event) => handleServiceUpdate(index, { title: event.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Service title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon Type</label>
                    <select
                      value={service.iconType || "lucide"}
                      onChange={(event) => handleServiceUpdate(index, { iconType: event.target.value } as any)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="lucide">Lucide Icon</option>
                      <option value="custom">Custom Icon</option>
                    </select>
                  </div>
                </div>
                {service.iconType === 'lucide' ? (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name</label>
                    <select
                      value={service.iconName || "Sparkles"}
                      onChange={(event) => handleServiceUpdate(index, { iconName: event.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {getIconNames().map((iconName) => (
                        <option key={iconName} value={iconName}>{iconName}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="mt-3">
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
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={service.description || ""}
                    onChange={(event) => handleServiceUpdate(index, { description: event.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Service description..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};