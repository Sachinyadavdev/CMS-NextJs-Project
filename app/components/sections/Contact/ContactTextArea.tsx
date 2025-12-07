"use client";

import React from "react";
import { ContactTextAreaSection } from "@/lib/db";
import { Sparkles, Quote, ArrowRight } from "lucide-react";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableContactTextAreaProps {
  section: ContactTextAreaSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ContactTextAreaSection>) => void;
}

export default function ContactTextArea({
  section,
  isEditing,
  onUpdate,
}: EditableContactTextAreaProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "Why Choose Us?",
      subtitle = "Your Trusted Partner",
      description = "We bring together industry expertise, innovative solutions and a commitment to excellence. Our team is dedicated to delivering results that exceed expectations and build lasting partnerships.",
      titleColor = '#EF4130',
      subtitleColor = '#6B7280',
      textColor = '#374151',
      backgroundColor = '#FFFFFF',
      alignment = 'center',
      titleFontSize = '48px',
      subtitleFontSize = '20px',
      descriptionFontSize = '18px',
      showDecorationLine = true,
      decorationLineColor = '#EF4130',
      paddingTop = '80px',
      paddingBottom = '80px',
      marginTop = '0px',
      marginBottom = '0px',
      backgroundPattern = false,
      animationDelay = 0.2,
    } = content;

    return (
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor,
          paddingTop,
          paddingBottom,
          marginTop,
          marginBottom,
        }}
      >
        {/* Background Pattern */}
        {backgroundPattern && (
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: `linear-gradient(30deg, ${decorationLineColor}20 12%, transparent 12.5%, transparent 87%, ${decorationLineColor}20 87.5%, ${decorationLineColor}20), linear-gradient(150deg, ${decorationLineColor}20 12%, transparent 12.5%, transparent 87%, ${decorationLineColor}20 87.5%, ${decorationLineColor}20)`,
                backgroundSize: '20px 35px'
              }}
            />
          </div>
        )}

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated sparkles */}
          {/* <div className="absolute top-1/4 left-1/4 opacity-20" style={{ animation: 'sparkle 3s ease-in-out infinite' }}>
            <Sparkles className="w-6 h-6" style={{ color: decorationLineColor }} />
          </div> */}
          <div className="absolute top-1/3 right-1/4 opacity-15" style={{ animation: 'sparkle 4s ease-in-out infinite 1s' }}>
            <Sparkles className="w-4 h-4" style={{ color: decorationLineColor }} />
          </div>
          {/* <div className="absolute bottom-1/3 left-1/3 opacity-10" style={{ animation: 'sparkle 3.5s ease-in-out infinite 2s' }}>
            <Sparkles className="w-5 h-5" style={{ color: decorationLineColor }} />
          </div> */}
          
          {/* Floating geometric shapes */}
          <div 
            className="absolute top-20 right-20 w-32 h-32 rounded-full blur-3xl opacity-10"
            style={{ 
              background: `linear-gradient(45deg, ${decorationLineColor}, ${titleColor})`,
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-20 left-20 w-24 h-24 rounded-full blur-2xl opacity-15"
            style={{ 
              background: `linear-gradient(135deg, ${decorationLineColor}30, transparent)`,
              animation: 'float 6s ease-in-out infinite 2s'
            }}
          />
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
            50% { opacity: 0.8; transform: scale(1.2) rotate(180deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-20px) translateX(10px); }
            66% { transform: translateY(10px) translateX(-10px); }
          }
          @keyframes shimmerLine {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(200%); opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${
            alignment === 'left' ? 'text-left' : 
            alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            
            {/* Subtitle with animation */}
            {subtitle && (
              <div 
                className="relative inline-flex items-center gap-2 mb-4"
                style={{ 
                  animation: `slideInDown 0.8s ease-out ${animationDelay}s both` 
                }}
              >
                <Quote className="w-5 h-5 opacity-60" style={{ color: subtitleColor }} />
                <span 
                  className="font-medium uppercase tracking-wider"
                  style={{ 
                    color: subtitleColor,
                    fontSize: subtitleFontSize,
                    letterSpacing: '0.1em'
                  }}
                >
                  {subtitle}
                </span>
                <div 
                  className="w-12 h-0.5 ml-2"
                  style={{ backgroundColor: decorationLineColor }}
                />
              </div>
            )}

            {/* Main Title with staggered animation */}
            {title && (
              <h2 
                className="font-bold leading-tight mb-6"
                style={{ 
                  color: titleColor,
                  fontSize: titleFontSize,
                  animation: `slideInUp 1s ease-out ${animationDelay + 0.2}s both`,
                  lineHeight: 1.2
                }}
              >
                {title.split(' ').map((word, index) => (
                  <span 
                    key={index}
                    className="inline-block mr-2"
                    style={{ 
                      animation: `fadeIn 0.8s ease-out ${animationDelay + 0.1 * index}s both` 
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h2>
            )}

            {/* Decorative Line */}
            {showDecorationLine && (
              <div 
                className={`relative h-1 mb-8 overflow-hidden rounded-full ${
                  alignment === 'center' ? 'mx-auto max-w-24' : 'max-w-32'
                }`}
                style={{ 
                  background: `linear-gradient(90deg, ${decorationLineColor}, ${decorationLineColor}40, transparent)`,
                  animation: `slideInUp 1s ease-out ${animationDelay + 0.4}s both`
                }}
              >
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${decorationLineColor}, transparent)`,
                    animation: 'shimmerLine 3s ease-in-out infinite',
                    transform: 'translateX(-100%)'
                  }}
                />
              </div>
            )}

            {/* Description with enhanced typography */}
            {description && (
              <div 
                className={`relative w-full ${
                  alignment === 'center' ? 'mx-auto max-w-5xl' : 'max-w-none'
                }`}
                style={{ 
                  animation: `slideInUp 1s ease-out ${animationDelay + 0.6}s both` 
                }}
              >
                <div className="relative">
                  {/* Quote decoration for center alignment */}
                  {alignment === 'center' && (
                    <div className="absolute -top-4 -left-4 opacity-20">
                      <Quote className="w-8 h-8" style={{ color: decorationLineColor }} />
                    </div>
                  )}
                  
                  <p 
                    className="leading-relaxed font-light whitespace-pre-wrap break-words"
                    style={{ 
                      color: textColor,
                      fontSize: descriptionFontSize,
                      lineHeight: 1.7,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {description.split('\n').map((paragraph, index) => (
                      <span key={index}>
                        {paragraph.split('. ').map((sentence, sentenceIndex) => (
                          <span 
                            key={sentenceIndex}
                            className="inline-block"
                            style={{ 
                              animation: `fadeIn 0.8s ease-out ${animationDelay + 0.7 + (sentenceIndex * 0.1)}s both` 
                            }}
                          >
                            {sentence}{sentenceIndex < paragraph.split('. ').length - 1 ? '. ' : ''}
                          </span>
                        ))}
                        {index < description.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>

                  {/* Animated accent line at the end */}
                  {/* <div 
                    className={`mt-6 flex items-center gap-3 ${
                      alignment === 'center' ? 'justify-center' : 
                      alignment === 'right' ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ 
                      animation: `slideInUp 1s ease-out ${animationDelay + 1}s both` 
                    }}
                  >
                    <div 
                      className="h-0.5 w-16 rounded-full"
                      style={{ 
                        backgroundColor: decorationLineColor,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                    <ArrowRight 
                      className="w-4 h-4 opacity-60" 
                      style={{ color: decorationLineColor }} 
                    />
                  </div> */}
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
      title = "Why Choose Us?",
      subtitle = "Your Trusted Partner",
      description = "We bring together industry expertise, innovative solutions and a commitment to excellence. Our team is dedicated to delivering results that exceed expectations and build lasting partnerships.",
      titleColor = '#EF4130',
      subtitleColor = '#6B7280',
      textColor = '#374151',
      backgroundColor = '#FFFFFF',
      alignment = 'center',
      titleFontSize = '32px', // Smaller for preview
      subtitleFontSize = '16px',
      descriptionFontSize = '14px',
      showDecorationLine = true,
      decorationLineColor = '#EF4130',
      backgroundPattern = false,
    } = content;

    return (
      <section 
        className="relative overflow-hidden rounded-lg p-8"
        style={{ backgroundColor }}
      >
        {/* Background Pattern Preview */}
        {backgroundPattern && (
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundImage: `linear-gradient(30deg, ${decorationLineColor}20 12%, transparent 12.5%, transparent 87%, ${decorationLineColor}20 87.5%, ${decorationLineColor}20), linear-gradient(150deg, ${decorationLineColor}20 12%, transparent 12.5%, transparent 87%, ${decorationLineColor}20 87.5%, ${decorationLineColor}20)`,
                backgroundSize: '15px 25px'
              }}
            />
          </div>
        )}

        {/* Floating Elements Preview */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Sparkles className="absolute top-4 right-4 w-4 h-4 opacity-20" style={{ color: decorationLineColor }} />
          <div 
            className="absolute top-6 left-6 w-16 h-16 rounded-full blur-2xl opacity-10"
            style={{ background: `linear-gradient(45deg, ${decorationLineColor}, ${titleColor})` }}
          />
        </div>

        <div className="relative z-10">
          <div className={`${
            alignment === 'left' ? 'text-left' : 
            alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            
            {/* Subtitle Preview */}
            {subtitle && (
              <div className="inline-flex items-center gap-2 mb-3">
                <Quote className="w-4 h-4 opacity-60" style={{ color: subtitleColor }} />
                <span 
                  className="font-medium uppercase tracking-wider"
                  style={{ 
                    color: subtitleColor,
                    fontSize: subtitleFontSize,
                    letterSpacing: '0.1em'
                  }}
                >
                  {subtitle}
                </span>
                <div 
                  className="w-8 h-0.5 ml-2"
                  style={{ backgroundColor: decorationLineColor }}
                />
              </div>
            )}

            {/* Title Preview */}
            {title && (
              <h2 
                className="font-bold leading-tight mb-4"
                style={{ 
                  color: titleColor,
                  fontSize: titleFontSize,
                  lineHeight: 1.2
                }}
              >
                {title}
              </h2>
            )}

            {/* Decorative Line Preview */}
            {showDecorationLine && (
              <div 
                className={`relative h-1 mb-4 overflow-hidden rounded-full ${
                  alignment === 'center' ? 'mx-auto max-w-16' : 'max-w-20'
                }`}
                style={{ 
                  background: `linear-gradient(90deg, ${decorationLineColor}, ${decorationLineColor}40, transparent)`
                }}
              >
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${decorationLineColor}, transparent)`,
                    animation: 'shimmerLine 3s ease-in-out infinite',
                    transform: 'translateX(-100%)'
                  }}
                />
              </div>
            )}

            {/* Description Preview */}
            {description && (
              <div className={`w-full ${
                alignment === 'center' ? 'mx-auto max-w-3xl' : 'max-w-none'
              }`}>
                <div className="relative">
                  {alignment === 'center' && (
                    <div className="absolute -top-2 -left-2 opacity-20">
                      <Quote className="w-5 h-5" style={{ color: decorationLineColor }} />
                    </div>
                  )}
                  
                  <p 
                    className="leading-relaxed font-light whitespace-pre-wrap break-words"
                    style={{ 
                      color: textColor,
                      fontSize: descriptionFontSize,
                      lineHeight: 1.6,
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word'
                    }}
                  >
                    {description.split('\n').map((paragraph, index) => (
                      <span key={index}>
                        {paragraph}
                        {index < description.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>

                  {/* Accent line preview */}
                  <div 
                    className={`mt-4 flex items-center gap-2 ${
                      alignment === 'center' ? 'justify-center' : 
                      alignment === 'right' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div 
                      className="h-0.5 w-12 rounded-full"
                      style={{ backgroundColor: decorationLineColor }}
                    />
                    <ArrowRight 
                      className="w-3 h-3 opacity-60" 
                      style={{ color: decorationLineColor }} 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const handleSaveChanges = () => {
    onUpdate({ content });
  };

  return (
    <div className="mb-8 space-y-6">
      {/* Live Preview */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-blue-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Contact Text Area
          </h3>
          <span className="h-3 w-3 rounded-full bg-blue-400/40" />
        </div>

        <div className="space-y-6">
          {/* Content Fields */}
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

          <EditableTextarea
            label="Description"
            value={content.description || ""}
            onChange={(value: any) => handleContentUpdate({ description: value })}
            rows={5}
          />

          {/* Color Settings */}
          <div className="border-t border-blue-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Colors</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <EditableColorPicker
                label="Title Color"
                value={content.titleColor || "#EF4130"}
                onChange={(value: any) => handleContentUpdate({ titleColor: value })}
              />
              <EditableColorPicker
                label="Subtitle Color"
                value={content.subtitleColor || "#6B7280"}
                onChange={(value: any) => handleContentUpdate({ subtitleColor: value })}
              />
              <EditableColorPicker
                label="Text Color"
                value={content.textColor || "#374151"}
                onChange={(value: any) => handleContentUpdate({ textColor: value })}
              />
              <EditableColorPicker
                label="Background Color"
                value={content.backgroundColor || "#FFFFFF"}
                onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
              />
              <EditableColorPicker
                label="Decoration Line Color"
                value={content.decorationLineColor || "#EF4130"}
                onChange={(value: any) => handleContentUpdate({ decorationLineColor: value })}
              />
            </div>
          </div>

          {/* Typography Settings */}
          <div className="border-t border-blue-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Typography</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <EditableText
                label="Title Font Size"
                value={content.titleFontSize || "48px"}
                onChange={(value: any) => handleContentUpdate({ titleFontSize: value })}
              />
              <EditableText
                label="Subtitle Font Size"
                value={content.subtitleFontSize || "20px"}
                onChange={(value: any) => handleContentUpdate({ subtitleFontSize: value })}
              />
              <EditableText
                label="Description Font Size"
                value={content.descriptionFontSize || "18px"}
                onChange={(value: any) => handleContentUpdate({ descriptionFontSize: value })}
              />
            </div>
          </div>

          {/* Layout Settings */}
          <div className="border-t border-blue-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Layout & Spacing</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableSelect
                label="Alignment"
                value={content.alignment || "center"}
                onChange={(value: any) => handleContentUpdate({ alignment: value })}
                options={[
                  { value: 'left', label: 'Left' },
                  { value: 'center', label: 'Center' },
                  { value: 'right', label: 'Right' }
                ]}
              />
              <EditableText
                label="Animation Delay (seconds)"
                value={(content.animationDelay || 0.2).toString()}
                onChange={(value: any) => handleContentUpdate({ animationDelay: parseFloat(value) })}
              />
              <EditableText
                label="Padding Top"
                value={content.paddingTop || "80px"}
                onChange={(value: any) => handleContentUpdate({ paddingTop: value })}
              />
              <EditableText
                label="Padding Bottom"
                value={content.paddingBottom || "80px"}
                onChange={(value: any) => handleContentUpdate({ paddingBottom: value })}
              />
            </div>
          </div>

          {/* Visual Effects */}
          <div className="border-t border-blue-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Visual Effects</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableCheckbox
                label="Show Decoration Line"
                checked={Boolean(content.showDecorationLine !== false)}
                onChange={(value: any) => handleContentUpdate({ showDecorationLine: value })}
              />
              <EditableCheckbox
                label="Background Pattern"
                checked={Boolean(content.backgroundPattern)}
                onChange={(value: any) => handleContentUpdate({ backgroundPattern: value })}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-blue-100 pt-6">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
