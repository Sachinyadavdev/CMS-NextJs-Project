"use client";

import React from "react";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableCheckbox,
  EditableRange,
} from "../../EditableInputs";
import { motion } from "framer-motion";

interface EditablePhilosophyProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

export default function EditablePhilosophySection({
  section,
  isEditing,
  onUpdate,
}: EditablePhilosophyProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const defaultText = "We believe that the true measure of progress is how it uplifts the people and communities it touches. From bustling corporate campuses to vibrant public spaces, our work is guided by a simple yet powerful principle: build places where people feel a sense of belonging, inspiration and pride";

  // Preview Component
  const renderPreview = () => {
    const {
      text = defaultText,
      imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80",
      accentColor = "#D4AF37",
      textColor = "#ffffff",
      fontSize = "xl",
      animationEnabled = true,
    } = content;

    const fontSizeClasses = {
      sm: "text-lg md:text-xl",
      base: "text-xl md:text-2xl",
      lg: "text-2xl md:text-3xl",
      xl: "text-2xl md:text-3xl lg:text-4xl",
    };

    return (
      <section className="relative w-full py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />
        
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Animated Text Container */}
        <div className="relative mx-auto max-w-5xl px-4 text-center text-white">
          <div className={`space-y-8 ${animationEnabled ? 'animate-fadeInUp' : ''}`}>
            {/* Quote Container */}
            <div className="relative">
              {/* Opening Quote */}
              <div 
                className="absolute -top-8 -left-6 md:-left-10 text-7xl md:text-9xl font-serif opacity-50 leading-none pointer-events-none"
                style={{ color: accentColor }}
              >
                "
              </div>

              {/* Main Quote Text */}
              <blockquote
                className={`${fontSizeClasses[fontSize as keyof typeof fontSizeClasses] || fontSizeClasses.base} leading-relaxed font-light tracking-wide max-w-4xl mx-auto relative px-8 md:px-12 py-6 italic`}
                style={{ 
                  lineHeight: "1.4",
                  color: textColor,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                }}
              >
                {animationEnabled ? (
                  text.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className="inline-block"
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        animation: "typewriter 0.1s forwards",
                        opacity: 0,
                        transform: "translateY(10px)",
                      }}
                    >
                      {word}&nbsp;
                    </span>
                  ))
                ) : (
                  text
                )}
              </blockquote>

              {/* Closing Quote */}
              <div 
                className="absolute -bottom-6 -right-6 md:-right-10 text-7xl md:text-9xl font-serif opacity-50 leading-none pointer-events-none"
                style={{ color: accentColor }}
              >
                "
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center justify-center space-x-4">
              {/* Left ornament */}
              <div 
                className="w-16 h-px"
                style={{ 
                  background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                  animation: animationEnabled ? "slideInLeft 1s ease-out 2.5s forwards" : "none",
                  opacity: animationEnabled ? 0 : 1
                }}
              />
              
              {/* Center accent */}
              <div
                className="w-3 h-3 rounded-full border-2 transform rotate-45"
                style={{ 
                  borderColor: accentColor,
                  backgroundColor: `${accentColor}30`,
                  animation: animationEnabled ? "delayedFadeIn 1s ease-out 3s forwards" : "none",
                  opacity: animationEnabled ? 0 : 1
                }}
              />
              
              {/* Right ornament */}
              <div 
                className="w-16 h-px"
                style={{ 
                  background: `linear-gradient(to left, transparent, ${accentColor}, transparent)`,
                  animation: animationEnabled ? "slideInRight 1s ease-out 2.5s forwards" : "none",
                  opacity: animationEnabled ? 0 : 1
                }}
              />
            </div>

            {/* Attribution or signature line */}
            <div 
              className="text-sm font-medium opacity-75 tracking-wider"
              style={{ 
                color: accentColor,
                animation: animationEnabled ? "fadeInUp 1s ease-out 3.5s forwards" : "none",
                opacity: animationEnabled ? 0 : 0.75
              }}
            >
              — Our Philosophy
            </div>
          </div>
        </div>

        <style jsx>{`
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
          @keyframes typewriter {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes delayedFadeIn {
            0%, 50% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slideInLeft {
            from { 
              opacity: 0; 
              transform: translateX(-20px) scaleX(0); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0) scaleX(1); 
            }
          }
          @keyframes slideInRight {
            from { 
              opacity: 0; 
              transform: translateX(20px) scaleX(0); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0) scaleX(1); 
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
          }
        `}</style>
      </section>
    );
  };

  if (!isEditing) {
    return renderPreview();
  }

  // Editing Mode
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
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Philosophy Text
          </h3>
          <div className="space-y-4">
            <EditableTextarea
              label="Philosophy Text"
              value={content.text || defaultText}
              onChange={(val) => handleContentUpdate({ text: val })}
              rows={6}
              placeholder="Enter your philosophy statement..."
            />
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
            Media & Background
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={content.imageUrl}
              onUpload={(url) => handleContentUpdate({ imageUrl: url })}
              onRemove={() => handleContentUpdate({ imageUrl: "" })}
              placeholder="Or paste image URL..."
            />

            {content.imageUrl && (
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={content.imageUrl}
                  alt="Philosophy section preview"
                  className="h-32 w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Styling Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <EditableColorPicker
              label="Accent Color"
              value={content.accentColor || "#D4AF37"}
              onChange={(val) => handleContentUpdate({ accentColor: val })}
            />

            <EditableColorPicker
              label="Text Color"
              value={content.textColor || "#ffffff"}
              onChange={(val) => handleContentUpdate({ textColor: val })}
            />

            <EditableSelect
              label="Font Size"
              value={content.fontSize || "xl"}
              onChange={(val) => handleContentUpdate({ fontSize: val })}
              options={[
                { label: "Small", value: "sm" },
                { label: "Base", value: "base" },
                { label: "Large", value: "lg" },
                { label: "Extra Large", value: "xl" },
              ]}
            />
          </div>
          <div className="mt-6">
            <EditableRange
              label="Overlay Opacity"
              value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.4}
              onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
              min={0}
              max={1}
              step={0.1}
              unit="%"
              showValue
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Features & Options
          </h3>
          <div className="space-y-4">
            <EditableCheckbox
              label="Enable Animations"
              checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
              onChange={(val) => handleContentUpdate({ animationEnabled: val })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}