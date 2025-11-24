"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import BannerButton from "../CommonComponents/BannerButton";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableCheckbox,
  EditableRange,
} from "@/app/components/EditableInputs";

interface PartnershipHeroProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function PartnershipHero({ section, isEditing, onUpdate }: PartnershipHeroProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  // Shared helpers
  const titleSizeClasses: Record<string, string> = {
    '2xl': 'text-2xl md:text-3xl',
    '3xl': 'text-3xl md:text-4xl',
    '4xl': 'text-4xl md:text-5xl',
    '5xl': 'text-5xl md:text-6xl',
    '6xl': 'text-5xl md:text-6xl lg:text-7xl',
    '7xl': 'text-6xl md:text-7xl lg:text-8xl',
    '8xl': 'text-7xl md:text-8xl lg:text-9xl',
  };

  const descriptionSizeClasses: Record<string, string> = {
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
  };

  const getAnimationClass = (animationEnabled = true, style = 'fade') => {
    if (!animationEnabled) return '';
    switch (style) {
      case 'fade':
        return 'animate-fadeInUp';
      case 'slide':
        return 'animate-slideInRight';
      case 'zoom':
        return 'animate-zoomIn';
      case 'bounce':
        return 'animate-bounceIn';
      default:
        return 'animate-fadeInUp';
    }
  };

  if (!isEditing) {
    const {
      title = 'Strategic Partnerships',
      subtitle = 'Building Tomorrow Together',
      description = 'We collaborate with industry leaders to deliver innovative solutions that drive sustainable growth and create lasting impact.',
      buttonText = 'Explore Opportunities',
      buttonLink = '#contact',
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#021124',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#F3F4F6',
      alignment = 'center',
      overlay = true,
      overlayOpacity = 0.35,
      overlayColor = '#000000',
      titleSize = '6xl',
      subtitleSize = '4xl',
      descriptionSize = 'xl',
      animationEnabled = true,
      animationStyle = 'fade',
      showScrollIndicator = true,
      height = 'full',
    } = content;

    const heightClasses: Record<string, string> = {
      small: 'min-h-[60vh]',
      medium: 'min-h-[75vh]',
      large: 'min-h-[90vh]',
      full: 'min-h-screen',
    };

    return (
      <section className={`relative ${heightClasses[height as keyof typeof heightClasses] || heightClasses.full} flex items-center overflow-hidden`}>
        {/* Background Media */}
        {backgroundVideo && (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {backgroundImage && !backgroundVideo && (
          <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}

        {!backgroundImage && !backgroundVideo && (
          <div className="absolute inset-0 w-full h-full" style={{ backgroundColor }} />
        )}

        {/* Overlay */}
        {overlay && (
          <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }} />
        )}

        {/* Animated shapes and particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-10 right-20 w-56 h-56 rounded-full blur-3xl opacity-20"
            style={{ background: `linear-gradient(45deg, ${titleColor}, ${subtitleColor})`, animation: 'float 12s ease-in-out infinite' }}
          />
          <div
            className="absolute bottom-10 left-10 w-96 h-56 rounded-2xl blur-2xl opacity-10"
            style={{ background: `linear-gradient(135deg, ${titleColor}33, transparent)`, animation: 'float 16s ease-in-out infinite 2s' }}
          />

          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-10"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float ${6 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s` }}
              />
            ))}
          </div>
        </div>

        {/* Add keyframes */}
        <style jsx>{`
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
          @keyframes zoomIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
          @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { transform: scale(1); } }
          @keyframes float { 0%, 100% { transform: translateY(0px) translateX(0px); } 33% { transform: translateY(-20px) translateX(10px); } 66% { transform: translateY(10px) translateX(-10px); } }
        `}</style>

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`max-w-5xl ${alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'}`}>
              <div className={`${getAnimationClass(animationEnabled, animationStyle)} space-y-4 mb-6`}>
                {subtitle && <p className={`${titleSizeClasses[subtitleSize as keyof typeof titleSizeClasses] || titleSizeClasses['4xl']} font-light opacity-90`} style={{ color: subtitleColor }}>{subtitle}</p>}
                {title && <h1 className={`${titleSizeClasses[titleSize as keyof typeof titleSizeClasses] || titleSizeClasses['6xl']} font-bold leading-tight`} style={{ color: titleColor }}>{title}</h1>}
              </div>

              {description && (
                <div className={`${animationEnabled ? 'animate-fadeInUp' : ''} mb-10`} style={{ animationDelay: '0.3s' }}>
                  <p className={`${descriptionSizeClasses[descriptionSize as keyof typeof descriptionSizeClasses] || descriptionSizeClasses.xl} leading-relaxed`} style={{ color: textColor }}>{description}</p>
                </div>
              )}

              {buttonText && (
                <div className={`flex ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <BannerButton text={buttonText} href={buttonLink} variant="primary" size="lg" rounded="lg" shadow={true} />
                </div>
              )}
            </div>
          </div>
        </div>

        {showScrollIndicator && (
          <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 ${animationEnabled ? 'animate-bounce' : ''}`}>
            <div className="w-6 h-10 border-2 rounded-full flex justify-center opacity-70" style={{ borderColor: textColor }}>
              <div className="w-1 h-3 rounded-full mt-2" style={{ backgroundColor: textColor }} />
            </div>
          </div>
        )}
      </section>
    );
  }

  // Editing UI with Live Preview
  const renderPreview = () => {
    const {
      title = 'Strategic Partnerships',
      subtitle = 'Building Tomorrow Together',
      description = 'We collaborate with industry leaders to deliver innovative solutions that drive sustainable growth and create lasting impact.',
      buttonText = 'Explore Opportunities',
      buttonLink = '#contact',
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#021124',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#F3F4F6',
      alignment = 'center',
      overlay = true,
      overlayOpacity = 0.35,
      overlayColor = '#000000',
    } = content;

    return (
      <section className="relative min-h-[500px] flex items-center overflow-hidden rounded-lg">
        {backgroundVideo && (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"><source src={backgroundVideo} type="video/mp4" /></video>
        )}
        {backgroundImage && !backgroundVideo && (
          <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        {!backgroundImage && !backgroundVideo && <div className="absolute inset-0" style={{ backgroundColor }} />}
        {overlay && <div className="absolute inset-0" style={{ backgroundColor: overlayColor, opacity: overlayOpacity }} />}

        <div className="relative z-10 w-full p-8">
          <div className={`max-w-4xl ${alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'}`}>
            {subtitle && <p className="text-2xl md:text-3xl font-light opacity-90" style={{ color: subtitleColor }}>{subtitle}</p>}
            {title && <h1 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: titleColor }}>{title}</h1>}
            {description && <p className="text-base md:text-lg leading-relaxed mt-4" style={{ color: textColor }}>{description.length > 150 ? `${description.substring(0, 150)}...` : description}</p>}
            {buttonText && <div className="mt-6"><BannerButton text={buttonText} href={buttonLink} variant="primary" size="md" shadow={false} rounded="lg" /></div>}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Sticky Live Preview */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="sticky top-8">
          <div className="rounded-2xl border-2 border-red-200 bg-white p-6 shadow-lg backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-gradient-to-r from-red-500 to-purple-500 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-red-600 to-purple-600" />
                </span>
              </div>
            </div>
            {renderPreview()}
          </div>
        </div>
      </motion.div>

      {/* Editing Controls */}
      <div className="lg:col-span-2 space-y-6">
        {/* Content Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-indigo-500" />
            <h4 className="text-lg font-semibold text-gray-900">Content</h4>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <EditableText
                label="Title"
                value={content.title || ""}
                onChange={(val) => handleContentUpdate({ title: val })}
                placeholder="Strategic Partnerships"
              />
              <EditableText
                label="Subtitle"
                value={content.subtitle || ""}
                onChange={(val) => handleContentUpdate({ subtitle: val })}
                placeholder="Building Tomorrow Together"
              />
            </div>
            <EditableTextarea
              label="Description"
              value={content.description || ""}
              onChange={(val) => handleContentUpdate({ description: val })}
              rows={4}
              placeholder="..."
            />
          </div>
        </div>

        {/* Background Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <h4 className="text-lg font-semibold text-gray-900">Background & Media</h4>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MediaUpload label="Background Image" type="image" currentUrl={content.backgroundImage} onUpload={(url)=>handleContentUpdate({ backgroundImage: url, backgroundVideo: '' })} onRemove={()=>handleContentUpdate({ backgroundImage: '' })} placeholder="Or paste image URL..." />
              <MediaUpload label="Background Video" type="video" currentUrl={content.backgroundVideo} onUpload={(url)=>handleContentUpdate({ backgroundVideo: url, backgroundImage: '' })} onRemove={()=>handleContentUpdate({ backgroundVideo: '' })} placeholder="Or paste video URL..." />
            </div>
            {content.backgroundImage && (<div className="mt-4 overflow-hidden rounded-lg border border-red-100"><img src={content.backgroundImage} alt="Background preview" className="h-48 w-full object-cover"/></div>)}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <EditableColorPicker
                label="Background Color"
                value={content.backgroundColor || "#021124"}
                onChange={(val) => handleContentUpdate({ backgroundColor: val })}
              />
              <EditableColorPicker
                label="Overlay Color"
                value={content.overlayColor || "#000000"}
                onChange={(val) => handleContentUpdate({ overlayColor: val })}
              />
            </div>
          </div>
        </div>

        {/* Colors & Typography Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <h4 className="text-lg font-semibold text-gray-900">Colors & Typography</h4>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <EditableColorPicker
                label="Title Color"
                value={content.titleColor || "#EF4130"}
                onChange={(val) => handleContentUpdate({ titleColor: val })}
              />
              <EditableColorPicker
                label="Subtitle Color"
                value={content.subtitleColor || "#F3F4F6"}
                onChange={(val) => handleContentUpdate({ subtitleColor: val })}
              />
              <EditableColorPicker
                label="Text Color"
                value={content.textColor || "#ffffff"}
                onChange={(val) => handleContentUpdate({ textColor: val })}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <EditableSelect
                label="Title Size"
                value={content.titleSize || '6xl'}
                onChange={(val) => handleContentUpdate({ titleSize: val })}
                options={[
                  { label: '2XL', value: '2xl' },
                  { label: '3XL', value: '3xl' },
                  { label: '4XL', value: '4xl' },
                  { label: '5XL', value: '5xl' },
                  { label: '6XL', value: '6xl' },
                  { label: '7XL', value: '7xl' },
                  { label: '8XL', value: '8xl' },
                ]}
              />
              <EditableSelect
                label="Subtitle Size"
                value={content.subtitleSize || '4xl'}
                onChange={(val) => handleContentUpdate({ subtitleSize: val })}
                options={[
                  { label: '2XL', value: '2xl' },
                  { label: '3XL', value: '3xl' },
                  { label: '4XL', value: '4xl' },
                  { label: '5XL', value: '5xl' },
                  { label: '6XL', value: '6xl' },
                ]}
              />
              <EditableSelect
                label="Description Size"
                value={content.descriptionSize || 'xl'}
                onChange={(val) => handleContentUpdate({ descriptionSize: val })}
                options={[
                  { label: 'Small', value: 'sm' },
                  { label: 'Base', value: 'base' },
                  { label: 'Large', value: 'lg' },
                  { label: 'XL', value: 'xl' },
                  { label: '2XL', value: '2xl' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-teal-500" />
            <h4 className="text-lg font-semibold text-gray-900">Button</h4>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <EditableText
              label="Primary Button Text"
              value={content.buttonText || ''}
              onChange={(val) => handleContentUpdate({ buttonText: val })}
              placeholder="Explore Opportunities"
            />
            <EditableText
              label="Primary Button Link"
              value={content.buttonLink || ''}
              onChange={(val) => handleContentUpdate({ buttonLink: val })}
              placeholder="#contact"
            />
          </div>
        </div>

        {/* Layout & Animation Section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-cyan-500" />
            <h4 className="text-lg font-semibold text-gray-900">Layout & Animation</h4>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <EditableSelect
                label="Alignment"
                value={content.alignment || 'center'}
                onChange={(val) => handleContentUpdate({ alignment: val })}
                options={[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]}
              />
              <EditableSelect
                label="Height"
                value={content.height || 'full'}
                onChange={(val) => handleContentUpdate({ height: val })}
                options={[
                  { label: 'Small (60vh)', value: 'small' },
                  { label: 'Medium (75vh)', value: 'medium' },
                  { label: 'Large (90vh)', value: 'large' },
                  { label: 'Full', value: 'full' },
                ]}
              />
              <EditableSelect
                label="Animation Style"
                value={content.animationStyle || 'fade'}
                onChange={(val) => handleContentUpdate({ animationStyle: val })}
                options={[
                  { label: 'Fade', value: 'fade' },
                  { label: 'Slide', value: 'slide' },
                  { label: 'Zoom', value: 'zoom' },
                  { label: 'Bounce', value: 'bounce' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <EditableCheckbox
                label="Enable Overlay"
                checked={content.overlay !== undefined ? content.overlay : true}
                onChange={(val) => handleContentUpdate({ overlay: val })}
              />
              <EditableCheckbox
                label="Enable Animations"
                checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
                onChange={(val) => handleContentUpdate({ animationEnabled: val })}
              />
            </div>
            <EditableRange
              label="Overlay Opacity"
              value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.35}
              onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
              min={0}
              max={1}
              step={0.01}
              unit="%"
              showValue
            />
          </div>
        </div>
      </div>
    </div>
  );
}
