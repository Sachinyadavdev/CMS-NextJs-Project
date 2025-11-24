"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect, EditableCheckbox, EditableRange } from "@/app/components/EditableInputs";

interface EditableAtaGlanceHeroProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function AtaGlanceHeroSection({ section, isEditing, onUpdate }: EditableAtaGlanceHeroProps) {
  const content = section.content || {};
  const alignment = content.alignment || "center";

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "Integrating",
      subtitle = "Sustainable Infrastructure",
      description = "By integrating diverse technical expertise under one roof, we ensure a seamless,\nsingle-source solution that respects deadlines, enhances quality and drives innovation at every stage.",
      buttonText,
      buttonLink,
      secondaryButtonText,
      secondaryButtonLink,
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#0a0e27',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#EF4130',
      alignment = 'left',
      overlay = true,
      overlayOpacity = 0.5,
    } = content;

    return (
      <section className="relative min-h-screen flex items-center overflow-hidden">
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

        {/* Default background if no media provided */}
        {!backgroundImage && !backgroundVideo && (
          <div 
            className="absolute inset-0"
            style={{ backgroundColor }}
          />
        )}
        
        {/* Advanced Overlay with gradient */}
        {overlay && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 8s ease-in-out infinite' }} />
          <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl" style={{ animation: 'float 6s ease-in-out infinite 1s' }} />
          
          {/* Floating particles */}
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-red-400/40 rounded-full" style={{ animation: 'float 5s ease-in-out infinite, twinkle 3s ease-in-out infinite' }} />
          <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-red-400/30 rounded-full" style={{ animation: 'float 7s ease-in-out infinite 1s, twinkle 4s ease-in-out infinite 1s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/20 rounded-full" style={{ animation: 'float 6s ease-in-out infinite 2s, twinkle 2s ease-in-out infinite' }} />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-red-300/30 rounded-full" style={{ animation: 'float 8s ease-in-out infinite 0.5s, twinkle 3.5s ease-in-out infinite 0.5s' }} />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: 'linear-gradient(rgba(239, 65, 48, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 65, 48, 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-10px); }
            75% { transform: translateY(-20px) translateX(5px); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
        
        {/* Content Container */}
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Left Content - 7 columns */}
              <div 
                className={`lg:col-span-7 relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl ${
                  alignment === 'left' ? 'text-left' : 
                  alignment === 'right' ? 'text-right lg:col-start-6' : 'text-center lg:col-span-12'
                }`}
                style={{ animation: 'slideInLeft 1s ease-out' }}
              >
                {/* Title Section with staggered animation */}
                <div className="space-y-3 mb-8">
                  <h1 className="font-bold leading-tight tracking-tight">
                    <span 
                      style={{ color: titleColor, animation: 'fadeInUp 1s ease-out 0.2s both' }}
                      className="block text-5xl sm:text-6xl lg:text-7xl"
                    >
                      {title}
                    </span>
                    <span 
                      style={{ color: subtitleColor, animation: 'fadeInUp 1s ease-out 0.4s both' }}
                      className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mt-2"
                    >
                      {subtitle}
                    </span>
                  </h1>
                </div>
                
                {/* Description with decorative line */}
                {description && (
                  <div 
                    className={`relative ${alignment === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}
                    style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}
                  >
                    <div 
                      className={`w-full h-1 mb-6 ${
                        alignment === 'center' ? 'mx-auto' : 
                        alignment === 'right' ? 'ml-auto' : ''
                      }`}
                      style={{ 
                        background: `linear-gradient(90deg, ${titleColor}, transparent)`,
                        animation: 'scaleIn 0.8s ease-out 0.8s both'
                      }}
                    />
                    <p
                      style={{ color: textColor }}
                      className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 font-light"
                    >
                      {description.split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < description.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                {(buttonText || secondaryButtonText) && (
                  <div 
                    className={`flex flex-col sm:flex-row gap-5 mt-12 ${
                      alignment === 'center' ? 'justify-center' : 
                      alignment === 'right' ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ animation: 'fadeInUp 1s ease-out 0.8s both' }}
                  >
                    {buttonText && (
                      <a
                        href={buttonLink || '#'}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold rounded-xl transition-all duration-500 transform hover:scale-105 overflow-hidden shadow-2xl"
                        style={{ backgroundColor: titleColor }}
                      >
                        <span className="relative z-10 text-white flex items-center gap-2">
                          {buttonText}
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-white/20 transform -skew-x-12" />
                        </div>
                      </a>
                    )}
                    
                    {secondaryButtonText && (
                      <a
                        href={secondaryButtonLink || '#'}
                        className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 text-white hover:border-white font-bold rounded-xl transition-all duration-500 backdrop-blur-md bg-white/5 hover:bg-white/10 transform hover:scale-105"
                      >
                        {secondaryButtonText}
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "Integrating",
      subtitle = "Sustainable Infrastructure",
      description = "By integrating diverse technical expertise under one roof, we ensure a seamless,\nsingle-source solution that respects deadlines, enhances quality and drives innovation at every stage.",
      buttonText,
      buttonLink,
      secondaryButtonText,
      secondaryButtonLink,
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#0a0e27',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#EF4130',
      alignment = 'left',
      overlay = true,
      overlayOpacity = 0.5,
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

        {/* Default background if no media provided */}
        {!backgroundImage && !backgroundVideo && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ backgroundColor }}
          />
        )}
        
        {/* Overlay */}
        {overlay && (
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-slate-950/95"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Floating elements preview */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-48 h-48 bg-red-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full p-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div 
              className={`lg:col-span-7 ${
                alignment === 'left' ? 'text-left' : 
                alignment === 'right' ? 'text-right lg:col-start-6' : 'text-center lg:col-span-12'
              }`}
            >
              <div className="space-y-3 mb-6">
                <h1 className="font-bold leading-tight">
                  <span 
                    style={{ color: titleColor }}
                    className="block text-4xl"
                  >
                    {title}
                  </span>
                  <span 
                    style={{ color: subtitleColor }}
                    className="block text-4xl font-light"
                  >
                    {subtitle}
                  </span>
                </h1>
              </div>
              
              {description && (
                <div className={`${alignment === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
                  <div 
                    className={`w-20 h-1 mb-4 ${
                      alignment === 'center' ? 'mx-auto' : 
                      alignment === 'right' ? 'ml-auto' : ''
                    }`}
                    style={{ background: `linear-gradient(90deg, ${titleColor}, transparent)` }}
                  />
                  <p
                    style={{ color: textColor }}
                    className="text-base leading-relaxed opacity-90"
                  >
                    {description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < description.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              
              {(buttonText || secondaryButtonText) && (
                <div className={`flex flex-wrap gap-4 mt-8 ${
                  alignment === 'center' ? 'justify-center' : 
                  alignment === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  {buttonText && (
                    <a
                      href={buttonLink || '#'}
                      className="px-6 py-3 font-bold rounded-lg text-white"
                      style={{ backgroundColor: titleColor }}
                    >
                      {buttonText}
                    </a>
                  )}
                  {secondaryButtonText && (
                    <a
                      href={secondaryButtonLink || '#'}
                      className="px-6 py-3 border-2 border-white/40 text-white font-bold rounded-lg backdrop-blur-md bg-white/5"
                    >
                      {secondaryButtonText}
                    </a>
                  )}
                </div>
              )}
            </div>
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
          <h3 className="text-xl font-semibold text-gray-900">Edit At a Glance Hero Section</h3>
          <span className="h-3 w-3 rounded-full bg-red-400/40" />
        </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <EditableText
          label="Title"
          value={content.title || ""}
          onChange={(value: any) => handleContentUpdate({ title: value })}
        />
        <EditableText
          label="Subtitle"
          value={content.subtitle || ""}
          onChange={(value: any) => handleContentUpdate({ subtitle: value })}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <EditableTextarea
          label="Description"
          value={content.description || "By integrating diverse technical expertise under one roof, we ensure a seamless,\nsingle-source solution that respects deadlines, enhances quality and drives innovation at every stage."}
          onChange={(value: any) => handleContentUpdate({ description: value })}
          rows={4}
        />
        <div className="grid grid-cols-1 gap-6">
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
      </div>
      {content.backgroundImage && (
        <div className="mt-4 overflow-hidden rounded-lg border border-primary-100">
          <img src={content.backgroundImage} alt="Hero preview" className="h-48 w-full object-cover" />
        </div>
      )}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <EditableColorPicker
          label="Background Color"
          value={content.backgroundColor || "#0a0e27"}
          onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
        />
        <EditableSelect
          label="Alignment"
          value={alignment}
          onChange={(value: any) => handleContentUpdate({ alignment: value })}
          options={[
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" }
          ]}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <EditableText
          label="Button Text"
          value={content.buttonText || ""}
          onChange={(value: any) => handleContentUpdate({ buttonText: value })}
        />
        <EditableText
          label="Button Link"
          value={content.buttonLink || ""}
          onChange={(value: any) => handleContentUpdate({ buttonLink: value })}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <EditableText
          label="Secondary Button Text"
          value={content.secondaryButtonText || ""}
          onChange={(value: any) => handleContentUpdate({ secondaryButtonText: value })}
        />
        <EditableText
          label="Secondary Button Link"
          value={content.secondaryButtonLink || ""}
          onChange={(value: any) => handleContentUpdate({ secondaryButtonLink: value })}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <EditableCheckbox
          label="Enable Overlay"
          checked={content.overlay !== undefined ? content.overlay : true}
          onChange={(value: any) => handleContentUpdate({ overlay: value })}
        />
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
  );
}