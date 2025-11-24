"use client";

import React, { useState } from "react";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableRange, EditableSelect, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableHeroProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function EditableHero({ section, isEditing, onUpdate }: EditableHeroProps) {
  const content = section.content || {};
  const overlayValue = Number(content.overlayOpacity ?? 0.5);
  const alignment = content.alignment || "center";
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  } as const;
  const chosenAlignment = alignmentClasses[alignment as keyof typeof alignmentClasses] || alignmentClasses.center;

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
      backgroundColor = '#1f2937',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#FFFFFF',
      alignment = 'left',
      overlay = true,
      overlayOpacity = 0.3,
      titleSize = '6xl',
      subtitleSize = '6xl',
      descriptionSize = 'lg'
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

      {/* Default RAUS banner video if no media provided */}
      {!backgroundImage && !backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/default-banner-video.mp4" type="video/mp4" />
        </video>
      )}
      
      {/* Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      
      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`max-w-4xl ${
              alignment === 'left' ? 'text-left' : 
              alignment === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'
            }`}
          >
            {/* Main Title with Red Color */}
            <div className="space-y-2 mb-0">
              <h1 className="font-medium leading-tight tracking-tight">
                <span 
                  style={{ color: titleColor, fontSize: '35px' }}
                  className="block"
                >
                  {title}
                </span>
                <span 
                  style={{ color: subtitleColor, fontSize: '35px' }}
                  className="block"
                >
                  {subtitle}
                </span>
              </h1>
            </div>
            
            {/* Description */}
            {description && (
              <div className={`max-w-4xl ${alignment === 'center' ? 'mx-auto' : ''} mt-0`}>
                <p
                  style={{ color: textColor }}
                  className=" md:text-xl lg:text-2xl leading-relaxed opacity-90 font-light"
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
              <div className={`flex flex-col sm:flex-row gap-6 mt-12 ${
                alignment === 'center' ? 'justify-center' : 
                alignment === 'right' ? 'justify-end' : 'justify-start'
              }`}>
                {buttonText && (
                  <a
                    href={buttonLink || '#'}
                    className="inline-flex items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                  >
                    {buttonText}
                  </a>
                )}
                
                {secondaryButtonText && (
                  <a
                    href={secondaryButtonLink || '#'}
                    className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300"
                  >
                    {secondaryButtonText}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center opacity-70">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
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
      backgroundColor = '#1f2937',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#EF4130',
      alignment = 'left',
      overlay = true,
      overlayOpacity = 0.3,
    } = content;

    return (
      <section className="relative min-h-[400px] flex items-center overflow-hidden rounded-lg">
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
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        )}
        
        {/* Content Container */}
        <div className="relative z-10 w-full p-8">
          <div 
            className={`max-w-4xl ${
              alignment === 'left' ? 'text-left' : 
              alignment === 'right' ? 'text-right ml-auto' : 'text-center mx-auto'
            }`}
          >
            {/* Main Title with Red Color */}
            <div className="space-y-2 mb-6">
              <h1 className="font-medium leading-tight tracking-tight">
                <span 
                  style={{ color: titleColor, fontSize: '28px' }}
                  className="block"
                >
                  {title}
                </span>
                <span 
                  style={{ color: subtitleColor, fontSize: '28px' }}
                  className="block"
                >
                  {subtitle}
                </span>
              </h1>
            </div>
            
            {/* Description */}
            {description && (
              <div className={`max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
                <p
                  style={{ color: textColor }}
                  className="text-lg leading-relaxed opacity-90 font-light"
                >
                  {description.split('\\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < description.split('\\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            {(buttonText || secondaryButtonText) && (
              <div className={`flex flex-col sm:flex-row gap-4 mt-8 ${
                alignment === 'center' ? 'justify-center' : 
                alignment === 'right' ? 'justify-end' : 'justify-start'
              }`}>
                {buttonText && (
                  <a
                    href={buttonLink || '#'}
                    className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    {buttonText}
                  </a>
                )}
                
                {secondaryButtonText && (
                  <a
                    href={secondaryButtonLink || '#'}
                    className="inline-flex items-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300"
                  >
                    {secondaryButtonText}
                  </a>
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
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(val) => handleContentUpdate({ title: val })}
              placeholder="Enter title..."
            />
            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(val) => handleContentUpdate({ subtitle: val })}
              placeholder="Enter subtitle..."
            />
            <EditableTextarea
              label="Description"
              value={content.description || "By integrating diverse technical expertise under one roof, we ensure a seamless,\nsingle-source solution that respects deadlines, enhances quality and drives innovation at every stage."}
              onChange={(val) => handleContentUpdate({ description: val })}
              rows={4}
              placeholder="Enter description..."
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-2" />
            Media & Background
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img src={content.backgroundImage} alt="Hero preview" className="h-32 w-full object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            Buttons & Actions
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableText
                label="Primary Button Text"
                value={content.buttonText || ""}
                onChange={(val) => handleContentUpdate({ buttonText: val })}
                placeholder="Enter button text..."
              />
              <EditableText
                label="Primary Button Link"
                value={content.buttonLink || ""}
                onChange={(val) => handleContentUpdate({ buttonLink: val })}
                placeholder="Enter button link..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableText
                label="Secondary Button Text"
                value={content.secondaryButtonText || ""}
                onChange={(val) => handleContentUpdate({ secondaryButtonText: val })}
                placeholder="Enter secondary button text..."
              />
              <EditableText
                label="Secondary Button Link"
                value={content.secondaryButtonLink || ""}
                onChange={(val) => handleContentUpdate({ secondaryButtonLink: val })}
                placeholder="Enter secondary button link..."
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
            <EditableColorPicker
              label="Title Color"
              value={content.titleColor || "#EF4130"}
              onChange={(val) => handleContentUpdate({ titleColor: val })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={content.subtitleColor || "#FFFFFF"}
              onChange={(val) => handleContentUpdate({ subtitleColor: val })}
            />
            <EditableColorPicker
              label="Text Color"
              value={content.textColor || "#ffffff"}
              onChange={(val) => handleContentUpdate({ textColor: val })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "#1f2937"}
              onChange={(val) => handleContentUpdate({ backgroundColor: val })}
            />
            <EditableSelect
              label="Alignment"
              value={content.alignment || "center"}
              onChange={(val) => handleContentUpdate({ alignment: val })}
              options={[
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ]}
            />
            <EditableRange
              label="Overlay Opacity"
              value={content.overlayOpacity ?? 0.3}
              onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
              min={0}
              max={1}
              step={0.1}
              showValue
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <EditableSelect
              label="Title Size"
              value={content.titleSize || "6xl"}
              onChange={(val) => handleContentUpdate({ titleSize: val })}
              options={[
                { label: "2XL", value: "2xl" },
                { label: "3XL", value: "3xl" },
                { label: "4XL", value: "4xl" },
                { label: "5XL", value: "5xl" },
                { label: "6XL", value: "6xl" },
                { label: "7XL", value: "7xl" },
                { label: "8XL", value: "8xl" },
              ]}
            />
            <EditableSelect
              label="Subtitle Size"
              value={content.subtitleSize || "6xl"}
              onChange={(val) => handleContentUpdate({ subtitleSize: val })}
              options={[
                { label: "2XL", value: "2xl" },
                { label: "3XL", value: "3xl" },
                { label: "4XL", value: "4xl" },
                { label: "5XL", value: "5xl" },
                { label: "6XL", value: "6xl" },
                { label: "7XL", value: "7xl" },
                { label: "8XL", value: "8xl" },
              ]}
            />
            <EditableSelect
              label="Description Size"
              value={content.descriptionSize || "lg"}
              onChange={(val) => handleContentUpdate({ descriptionSize: val })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Base", value: "base" },
                { label: "Large", value: "lg" },
                { label: "XL", value: "xl" },
                { label: "2XL", value: "2xl" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
