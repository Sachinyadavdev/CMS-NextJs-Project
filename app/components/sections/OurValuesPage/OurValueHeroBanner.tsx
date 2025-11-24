"use client";

import React, { useState } from "react";
import { OurValueHeroBannerSection } from "@/lib/db";
import { motion } from "framer-motion";
import MediaUpload from "../../MediaUpload";
import BannerButton from "../CommonComponents/BannerButton";
import { 
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
  EditableSelect,
  EditableRange
} from "@/app/components/EditableInputs";

interface OurValueHeroBannerProps {
  section: OurValueHeroBannerSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<OurValueHeroBannerSection>) => void;
}

export default function OurValueHeroBanner({
  section,
  isEditing,
  onUpdate,
}: OurValueHeroBannerProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "Our Values",
      subtitle = "Building Excellence Through Integrity",
      description = "We are committed to delivering exceptional quality, fostering innovation, and maintaining the highest standards of integrity in everything we do.",
      buttonText,
      buttonLink,
      buttonVariant = 'primary',
      buttonIcon = 'arrow-right',
      buttonAnimation = 'slide',
      secondaryButtonText,
      secondaryButtonLink,
      secondaryButtonVariant = 'outline',
      secondaryButtonIcon = 'external-link',
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#1f2937',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#FFFFFF',
      alignment = 'center',
      overlay = true,
      overlayOpacity = 0.5,
      overlayColor = '#000000',
      titleSize = '6xl',
      subtitleSize = '6xl',
      descriptionSize = 'xl',
      animationEnabled = true,
      animationStyle = 'fade',
      showScrollIndicator = true,
      height = 'full',
    } = content;

    const heightClasses = {
      small: 'min-h-[60vh]',
      medium: 'min-h-[75vh]',
      large: 'min-h-[90vh]',
      full: 'min-h-screen',
    };

    const titleSizeClasses = {
      '2xl': 'text-2xl md:text-3xl',
      '3xl': 'text-3xl md:text-4xl',
      '4xl': 'text-4xl md:text-5xl',
      '5xl': 'text-5xl md:text-6xl',
      '6xl': 'text-5xl md:text-6xl lg:text-7xl',
      '7xl': 'text-6xl md:text-7xl lg:text-8xl',
      '8xl': 'text-7xl md:text-8xl lg:text-9xl',
    };

    const descriptionSizeClasses = {
      sm: 'text-sm md:text-base',
      base: 'text-base md:text-lg',
      lg: 'text-lg md:text-xl',
      xl: 'text-xl md:text-2xl',
      '2xl': 'text-2xl md:text-3xl',
    };

    const getAnimationClass = () => {
      if (!animationEnabled) return '';
      
      switch (animationStyle) {
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

    return (
      <section 
        className={`relative ${heightClasses[height as keyof typeof heightClasses] || heightClasses.full} flex items-center overflow-hidden`}
      >
        {/* Background Media */}
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}
        
        {backgroundImage && !backgroundVideo && (
          <img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Background Color fallback */}
        {!backgroundImage && !backgroundVideo && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor }}
          />
        )}
        
        {/* Overlay */}
        {overlay && (
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: overlayColor,
              opacity: overlayOpacity 
            }}
          />
        )}

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating shapes */}
          <div
            className="absolute top-1/4 right-20 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{
              background: `linear-gradient(45deg, ${titleColor}, ${subtitleColor})`,
              animation: 'float 15s ease-in-out infinite'
            }}
          />
          <div
            className="absolute bottom-1/4 left-20 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{
              background: `linear-gradient(135deg, ${titleColor}50, transparent)`,
              animation: 'float 12s ease-in-out infinite 2s'
            }}
          />

          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-80px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3); }
            50% { opacity: 1; transform: scale(1.05); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
            33% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
            66% { transform: translateY(20px) translateX(-20px) rotate(-5deg); }
          }
          @keyframes shimmerLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
        
        {/* Content Container */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className={`max-w-5xl ${
                alignment === 'left' ? 'text-left' : 
                alignment === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'
              }`}
            >
              {/* Title with Animation */}
              <div className={`space-y-4 mb-6 ${getAnimationClass()}`}>
                {subtitle && (
                  <div className="relative inline-block">
                    <p 
                      className={`${titleSizeClasses[subtitleSize as keyof typeof titleSizeClasses] || titleSizeClasses['6xl']} font-light tracking-wide mb-2 opacity-90`}
                      style={{ 
                        color: subtitleColor,
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {subtitle}
                    </p>
                  </div>
                )}
                
                {title && (
                  <div className="relative inline-block">
                    <h1 
                      className={`${titleSizeClasses[titleSize as keyof typeof titleSizeClasses] || titleSizeClasses['6xl']} font-bold leading-tight tracking-tight`}
                      style={{ 
                        color: titleColor,
                        textShadow: '0 4px 20px rgba(0,0,0,0.4)'
                      }}
                    >
                      {title}
                    </h1>
                    
                    {/* Decorative underline with shimmer */}
                    <div 
                      className="relative h-1.5 w-32 mx-auto mt-6 rounded-full overflow-hidden"
                      style={{ 
                        background: `linear-gradient(90deg, transparent, ${titleColor}, transparent)`,
                      }}
                    >
                      <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, white, transparent)`,
                          animation: 'shimmerLine 2s ease-in-out infinite',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Description with delayed animation */}
              {description && (
                <div 
                  className={`max-w-4xl ${alignment === 'center' ? 'mx-auto' : ''} mb-10 ${animationEnabled ? 'animate-fadeInUp' : ''}`}
                  style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                >
                  <p
                    style={{ 
                      color: textColor,
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    }}
                    className={`${descriptionSizeClasses[descriptionSize as keyof typeof descriptionSizeClasses] || descriptionSizeClasses.xl} leading-relaxed opacity-95 font-light whitespace-pre-line`}
                  >
                    {description}
                  </p>
                </div>
              )}
              
              {/* Action Buttons with staggered animation */}
              {(buttonText || secondaryButtonText) && (
                <div 
                  className={`flex flex-col sm:flex-row gap-6 mt-12 ${
                    alignment === 'center' ? 'justify-center' : 
                    alignment === 'right' ? 'justify-end' : 'justify-start'
                  } ${animationEnabled ? 'animate-fadeInUp' : ''}`}
                  style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
                >
                  {buttonText && (
                    <BannerButton
                      text={buttonText}
                      href={buttonLink}
                      variant={buttonVariant}
                      size="lg"
                      icon={buttonIcon}
                      animation={buttonAnimation}
                      shadow={true}
                      rounded="lg"
                    />
                  )}
                  
                  {secondaryButtonText && (
                    <BannerButton
                      text={secondaryButtonText}
                      href={secondaryButtonLink}
                      variant={secondaryButtonVariant}
                      size="lg"
                      icon={secondaryButtonIcon}
                      animation="scale"
                      shadow={true}
                      rounded="lg"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div 
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${animationEnabled ? 'animate-bounce' : ''}`}
            style={{ animationDelay: '1s' }}
          >
            <div 
              className="w-6 h-10 border-2 rounded-full flex justify-center opacity-70"
              style={{ borderColor: textColor }}
            >
              <div 
                className="w-1 h-3 rounded-full mt-2"
                style={{ 
                  backgroundColor: textColor,
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        )}
      </section>
    );
  }

  const renderPreview = () => {
    const {
      title = "Our Values",
      subtitle = "Building Excellence Through Integrity",
      description = "We are committed to delivering exceptional quality, fostering innovation, and maintaining the highest standards of integrity in everything we do.",
      buttonText,
      buttonLink,
      buttonVariant = 'primary',
      secondaryButtonText,
      secondaryButtonLink,
      secondaryButtonVariant = 'outline',
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#1f2937',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#FFFFFF',
      alignment = 'center',
      overlay = true,
      overlayOpacity = 0.5,
      overlayColor = '#000000',
    } = content;

    return (
      <section className="relative min-h-[500px] flex items-center overflow-hidden rounded-lg">
        {/* Background Media */}
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}
        
        {backgroundImage && !backgroundVideo && (
          <img
            src={backgroundImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Background Color fallback */}
        {!backgroundImage && !backgroundVideo && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor }}
          />
        )}
        
        {/* Overlay */}
        {overlay && (
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundColor: overlayColor,
              opacity: overlayOpacity 
            }}
          />
        )}

        {/* Animated Background Preview */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <div
            className="absolute top-20 right-10 w-40 h-40 rounded-full blur-2xl opacity-30"
            style={{ background: `linear-gradient(45deg, ${titleColor}, ${subtitleColor})` }}
          />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full p-8">
          <div 
            className={`max-w-4xl ${
              alignment === 'left' ? 'text-left' : 
              alignment === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'
            }`}
          >
            {/* Preview Title */}
            <div className="space-y-3 mb-6">
              {subtitle && (
                <p 
                  className="text-2xl md:text-3xl font-light opacity-90"
                  style={{ color: subtitleColor }}
                >
                  {subtitle}
                </p>
              )}
              
              {title && (
                <div>
                  <h1 
                    className="text-3xl md:text-4xl font-bold leading-tight"
                    style={{ color: titleColor }}
                  >
                    {title}
                  </h1>
                  <div 
                    className="h-1 w-20 mx-auto mt-4 rounded-full"
                    style={{ backgroundColor: titleColor }}
                  />
                </div>
              )}
            </div>
            
            {/* Preview Description */}
            {description && (
              <div className={`max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''} mb-8`}>
                <p
                  style={{ color: textColor }}
                  className="text-base md:text-lg leading-relaxed opacity-90"
                >
                  {description.length > 150 ? `${description.substring(0, 150)}...` : description}
                </p>
              </div>
            )}
            
            {/* Preview Buttons */}
            {(buttonText || secondaryButtonText) && (
              <div className={`flex flex-col sm:flex-row gap-4 ${
                alignment === 'center' ? 'justify-center' : 
                alignment === 'right' ? 'justify-end' : 'justify-start'
              }`}>
                {buttonText && (
                  <BannerButton
                    text={buttonText}
                    href={buttonLink}
                    variant={buttonVariant}
                    size="md"
                    shadow={false}
                    rounded="lg"
                  />
                )}
                {secondaryButtonText && (
                  <BannerButton
                    text={secondaryButtonText}
                    href={secondaryButtonLink || "#"}
                    variant={secondaryButtonVariant}
                    size="md"
                    shadow={false}
                    rounded="lg"
                  />
                )}
              </div>
            )}
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

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Content Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Content
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableText
                label="Title"
                value={content.title || ""}
                onChange={(value: any) => handleContentUpdate({ title: value })}
                placeholder="Our Values"
              />
              
              <EditableText
                label="Subtitle"
                value={content.subtitle || ""}
                onChange={(value: any) => handleContentUpdate({ subtitle: value })}
                placeholder="Building Excellence Through Integrity"
              />
            </div>

            <div className="mt-4">
              <EditableTextarea
                label="Description"
                value={content.description || ""}
                onChange={(value: any) => handleContentUpdate({ description: value })}
                rows={4}
                placeholder="We are committed to delivering exceptional quality..."
              />
            </div>
          </div>
        </div>

        {/* Background & Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Background & Media
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <MediaUpload
                label="Background Image"
                type="image"
                currentUrl={content.backgroundImage}
                onUpload={(url) => handleContentUpdate({ backgroundImage: url, backgroundVideo: '' })}
                onRemove={() => handleContentUpdate({ backgroundImage: '' })}
                placeholder="Or paste image URL..."
              />

              <MediaUpload
                label="Background Video"
                type="video"
                currentUrl={content.backgroundVideo}
                onUpload={(url) => handleContentUpdate({ backgroundVideo: url, backgroundImage: '' })}
                onRemove={() => handleContentUpdate({ backgroundVideo: '' })}
                placeholder="Or paste video URL..."
              />
            </div>

            {content.backgroundImage && (
              <div className="mt-4 overflow-hidden rounded-lg border border-blue-100">
                <img src={content.backgroundImage} alt="Background preview" className="h-48 w-full object-cover" />
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
              <EditableColorPicker
                label="Background Color"
                value={content.backgroundColor || "#1f2937"}
                onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
              />

              <EditableColorPicker
                label="Overlay Color"
                value={content.overlayColor || "#000000"}
                onChange={(value: any) => handleContentUpdate({ overlayColor: value })}
              />
            </div>
          </div>
        </div>

        {/* Colors Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Colors
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <EditableColorPicker
                label="Title Color"
                value={content.titleColor || "#EF4130"}
                onChange={(value: any) => handleContentUpdate({ titleColor: value })}
              />
              
              <EditableColorPicker
                label="Subtitle Color"
                value={content.subtitleColor || "#ffffff"}
                onChange={(value: any) => handleContentUpdate({ subtitleColor: value })}
              />
              
              <EditableColorPicker
                label="Text Color"
                value={content.textColor || "#ffffff"}
                onChange={(value: any) => handleContentUpdate({ textColor: value })}
              />
            </div>
          </div>
        </div>

        {/* Typography Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mr-2" />
            Typography
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <EditableSelect
                label="Title Size"
                value={content.titleSize || "6xl"}
                onChange={(value: any) => handleContentUpdate({ titleSize: value })}
                options={[
                  { value: "2xl", label: "2XL" },
                  { value: "3xl", label: "3XL" },
                  { value: "4xl", label: "4XL" },
                  { value: "5xl", label: "5XL" },
                  { value: "6xl", label: "6XL" },
                  { value: "7xl", label: "7XL" },
                  { value: "8xl", label: "8XL" }
                ]}
              />

              <EditableSelect
                label="Subtitle Size"
                value={content.subtitleSize || "6xl"}
                onChange={(value: any) => handleContentUpdate({ subtitleSize: value })}
                options={[
                  { value: "2xl", label: "2XL" },
                  { value: "3xl", label: "3XL" },
                  { value: "4xl", label: "4XL" },
                  { value: "5xl", label: "5XL" },
                  { value: "6xl", label: "6XL" },
                  { value: "7xl", label: "7XL" },
                  { value: "8xl", label: "8XL" }
                ]}
              />

              <EditableSelect
                label="Description Size"
                value={content.descriptionSize || "xl"}
                onChange={(value: any) => handleContentUpdate({ descriptionSize: value })}
                options={[
                  { value: "sm", label: "Small" },
                  { value: "base", label: "Base" },
                  { value: "lg", label: "Large" },
                  { value: "xl", label: "XL" },
                  { value: "2xl", label: "2XL" }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Primary Button Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Primary Button
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableText
                label="Button Text"
                value={content.buttonText || ""}
                onChange={(value: any) => handleContentUpdate({ buttonText: value })}
                placeholder="Explore Our Values"
              />
              
              <EditableText
                label="Button Link"
                value={content.buttonLink || ""}
                onChange={(value: any) => handleContentUpdate({ buttonLink: value })}
                placeholder="#values"
              />

              <EditableSelect
                label="Button Variant"
                value={content.buttonVariant || "primary"}
                onChange={(value: any) => handleContentUpdate({ buttonVariant: value })}
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "secondary", label: "Secondary" },
                  { value: "outline", label: "Outline" },
                  { value: "ghost", label: "Ghost" },
                  { value: "gradient", label: "Gradient" }
                ]}
              />

              <EditableSelect
                label="Button Icon"
                value={content.buttonIcon || "arrow-right"}
                onChange={(value: any) => handleContentUpdate({ buttonIcon: value })}
                options={[
                  { value: "arrow-right", label: "Arrow Right" },
                  { value: "external-link", label: "External Link" },
                  { value: "download", label: "Download" },
                  { value: "play", label: "Play" },
                  { value: "send", label: "Send" },
                  { value: "phone", label: "Phone" },
                  { value: "mail", label: "Mail" },
                  { value: "message", label: "Message" },
                  { value: "none", label: "None" }
                ]}
              />

              <EditableSelect
                label="Button Animation"
                value={content.buttonAnimation || "slide"}
                onChange={(value: any) => handleContentUpdate({ buttonAnimation: value })}
                options={[
                  { value: "slide", label: "Slide" },
                  { value: "scale", label: "Scale" },
                  { value: "glow", label: "Glow" },
                  { value: "shimmer", label: "Shimmer" },
                  { value: "bounce", label: "Bounce" },
                  { value: "pulse", label: "Pulse" }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Secondary Button Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mr-2" />
            Secondary Button
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableText
                label="Button Text"
                value={content.secondaryButtonText || ""}
                onChange={(value: any) => handleContentUpdate({ secondaryButtonText: value })}
                placeholder="Learn More"
              />
              
              <EditableText
                label="Button Link"
                value={content.secondaryButtonLink || ""}
                onChange={(value: any) => handleContentUpdate({ secondaryButtonLink: value })}
                placeholder="#about"
              />

              <EditableSelect
                label="Button Variant"
                value={content.secondaryButtonVariant || "outline"}
                onChange={(value: any) => handleContentUpdate({ secondaryButtonVariant: value })}
                options={[
                  { value: "primary", label: "Primary" },
                  { value: "secondary", label: "Secondary" },
                  { value: "outline", label: "Outline" },
                  { value: "ghost", label: "Ghost" },
                  { value: "gradient", label: "Gradient" }
                ]}
              />

              <EditableSelect
                label="Button Icon"
                value={content.secondaryButtonIcon || "external-link"}
                onChange={(value: any) => handleContentUpdate({ secondaryButtonIcon: value })}
                options={[
                  { value: "arrow-right", label: "Arrow Right" },
                  { value: "external-link", label: "External Link" },
                  { value: "download", label: "Download" },
                  { value: "play", label: "Play" },
                  { value: "send", label: "Send" },
                  { value: "phone", label: "Phone" },
                  { value: "mail", label: "Mail" },
                  { value: "message", label: "Message" },
                  { value: "none", label: "None" }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Layout & Animation Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-2" />
            Layout & Animation
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <EditableSelect
                label="Alignment"
                value={content.alignment || "center"}
                onChange={(value: any) => handleContentUpdate({ alignment: value })}
                options={[
                  { value: "left", label: "Left" },
                  { value: "center", label: "Center" },
                  { value: "right", label: "Right" }
                ]}
              />

              <EditableSelect
                label="Height"
                value={content.height || "full"}
                onChange={(value: any) => handleContentUpdate({ height: value })}
                options={[
                  { value: "small", label: "Small (60vh)" },
                  { value: "medium", label: "Medium (75vh)" },
                  { value: "large", label: "Large (90vh)" },
                  { value: "full", label: "Full Screen" }
                ]}
              />

              <EditableSelect
                label="Animation Style"
                value={content.animationStyle || "fade"}
                onChange={(value: any) => handleContentUpdate({ animationStyle: value })}
                options={[
                  { value: "fade", label: "Fade In Up" },
                  { value: "slide", label: "Slide In Right" },
                  { value: "zoom", label: "Zoom In" },
                  { value: "bounce", label: "Bounce In" }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
              <EditableCheckbox
                label="Enable Overlay"
                checked={content.overlay !== undefined ? content.overlay : true}
                onChange={(checked) => handleContentUpdate({ overlay: checked })}
              />

              <EditableCheckbox
                label="Enable Animations"
                checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
                onChange={(checked) => handleContentUpdate({ animationEnabled: checked })}
              />

              <EditableCheckbox
                label="Show Scroll Indicator"
                checked={content.showScrollIndicator !== undefined ? content.showScrollIndicator : true}
                onChange={(checked) => handleContentUpdate({ showScrollIndicator: checked })}
              />
            </div>

            <div className="mt-6">
              <EditableRange
                label="Overlay Opacity"
                value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.5}
                onChange={(value: any) => handleContentUpdate({ overlayOpacity: value })}
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
