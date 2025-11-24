"use client";

import React from "react";
import { ContactPageBannerSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import BannerButton from "@/app/components/sections/CommonComponents/BannerButton";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect, EditableCheckbox, EditableRange } from "@/app/components/EditableInputs";

interface EditableContactPageBannerProps {
  section: ContactPageBannerSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ContactPageBannerSection>) => void;
}

export default function ContactPageBanner({
  section,
  isEditing,
  onUpdate,
}: EditableContactPageBannerProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleContactInfoUpdate = (patch: Record<string, unknown>) => {
    const contactInfo = content.contactInfo || {};
    onUpdate({ 
      content: { 
        ...content, 
        contactInfo: { ...contactInfo, ...patch } 
      } 
    });
  };

  if (!isEditing) {
    const {
      title = "Get in Touch",
      subtitle = "Let's Build Something Amazing Together",
      description = "Ready to transform your vision into reality? Our team of experts is here to help you create sustainable, innovative solutions that make a difference.",
      contactInfo = {},
      buttonText,
      buttonLink,
      secondaryButtonText,
      secondaryButtonLink,
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#1a202c',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#ffffff',
      alignment = 'center',
      overlay = true,
      overlayOpacity = 0.6,
      showContactInfo = true,
      formEmbedCode,
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
            className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Animated floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Contact-themed floating elements */}
          <div className="absolute top-1/4 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animation: 'float 12s ease-in-out infinite' }} />
          <div className="absolute bottom-1/3 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" style={{ animation: 'float 15s ease-in-out infinite 3s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
          
          {/* Floating contact icons */}
          <div className="absolute top-1/4 left-1/4 opacity-20" style={{ animation: 'float 6s ease-in-out infinite, twinkle 4s ease-in-out infinite' }}>
            <Phone className="w-8 h-8 text-red-400" />
          </div>
          <div className="absolute top-2/3 right-1/3 opacity-15" style={{ animation: 'float 8s ease-in-out infinite 2s, twinkle 5s ease-in-out infinite 1s' }}>
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 opacity-10" style={{ animation: 'float 7s ease-in-out infinite 1s, twinkle 3s ease-in-out infinite 2s' }}>
            <MessageCircle className="w-10 h-10 text-purple-400" />
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: 'linear-gradient(rgba(239, 65, 48, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 65, 48, 0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
            25% { transform: translateY(-25px) translateX(15px) scale(1.05); }
            50% { transform: translateY(-50px) translateX(-15px) scale(0.95); }
            75% { transform: translateY(-25px) translateX(10px) scale(1.02); }
          }
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.4; }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          @keyframes shimmerLine {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(200%); opacity: 0; }
          }
        `}</style>
        
        {/* Content Container */}
        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Main Content */}
              <div 
                className={`${
                  showContactInfo ? 'lg:col-span-8' : 'lg:col-span-12'
                } relative ${
                  alignment === 'left' ? 'text-left' : 
                  alignment === 'right' ? 'text-right' : 'text-center'
                }`}
              >
                <div 
                  className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl"
                  style={{ animation: 'slideInUp 1s ease-out' }}
                >
                  {/* Title Section with staggered animation */}
                  <div className="space-y-4 mb-8">
                    <h1 
                      className="font-bold leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
                      style={{ 
                        color: titleColor,
                        animation: 'slideInDown 1s ease-out 0.2s both'
                      }}
                    >
                      {title}
                    </h1>
                    <h2 
                      className="font-light leading-tight text-2xl sm:text-3xl lg:text-4xl xl:text-5xl opacity-90"
                      style={{ 
                        color: subtitleColor,
                        animation: 'slideInDown 1s ease-out 0.4s both'
                      }}
                    >
                      {subtitle}
                    </h2>
                  </div>
                  
                  {/* Description with decorative line */}
                  {description && (
                    <div 
                      className={`relative ${alignment === 'center' ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}
                      style={{ animation: 'fadeInScale 1s ease-out 0.6s both' }}
                    >
                      <div 
                        className={`relative w-48 h-1 mb-6 overflow-hidden rounded-full ${
                          alignment === 'center' ? 'mx-auto' : 
                          alignment === 'right' ? 'ml-auto' : ''
                        }`}
                        style={{ 
                          background: `linear-gradient(90deg, ${titleColor}, ${titleColor}40, transparent)`,
                        }}
                      >
                        <div 
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${titleColor}, transparent)`,
                            animation: 'shimmerLine 2s ease-in-out infinite',
                            transform: 'translateX(-100%)'
                          }}
                        />
                      </div>
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
                      style={{ animation: 'slideInUp 1s ease-out 0.8s both' }}
                    >
                      {buttonText && (
                        <BannerButton
                          text={buttonText}
                          href={buttonLink || '#'}
                          variant="primary"
                          size="lg"
                          backgroundColor={titleColor}
                          hoverBackgroundColor={titleColor === '#EF4130' ? '#DC2626' : undefined}
                          icon="send"
                          animation="shimmer"
                          shadow={true}
                          rounded="xl"
                          openInNewTab={buttonLink?.startsWith('http')}
                        />
                      )}
                      
                      {secondaryButtonText && (
                        <BannerButton
                          text={secondaryButtonText}
                          href={secondaryButtonLink || '#'}
                          variant="outline"
                          size="lg"
                          textColor="white"
                          borderColor="rgba(255, 255, 255, 0.4)"
                          hoverBackgroundColor="rgba(255, 255, 255, 0.1)"
                          icon="message"
                          animation="scale"
                          shadow={false}
                          rounded="xl"
                          className="backdrop-blur-md bg-white/5"
                          openInNewTab={secondaryButtonLink?.startsWith('http')}
                        />
                      )}
                    </div>
                  )}

                  {/* Embedded Form */}
                  {formEmbedCode && (
                    <div 
                      className="mt-12"
                      style={{ animation: 'fadeInScale 1s ease-out 1s both' }}
                      dangerouslySetInnerHTML={{ __html: formEmbedCode }}
                    />
                  )}
                </div>
              </div>

              {/* Contact Information Card */}
              {showContactInfo && (
                <div 
                  className="lg:col-span-4"
                  style={{ animation: 'slideInUp 1s ease-out 0.4s both' }}
                >
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30 shadow-2xl">
                    <h3 
                      className="text-2xl font-bold mb-6"
                      style={{ color: titleColor }}
                    >
                      Contact Information
                    </h3>
                    
                    <div className="space-y-6">
                      {contactInfo.phone && (
                        <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                          <div className="p-3 rounded-full bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                            <Phone className="w-6 h-6 text-red-400" />
                          </div>
                          <div>
                            <p className="text-sm opacity-70" style={{ color: textColor }}>Phone</p>
                            <p className="text-lg font-semibold" style={{ color: textColor }}>{contactInfo.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {contactInfo.email && (
                        <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                          <div className="p-3 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                            <Mail className="w-6 h-6 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm opacity-70" style={{ color: textColor }}>Email</p>
                            <p className="text-lg font-semibold" style={{ color: textColor }}>{contactInfo.email}</p>
                          </div>
                        </div>
                      )}
                      
                      {contactInfo.address && (
                        <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                          <div className="p-3 rounded-full bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                            <MapPin className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm opacity-70" style={{ color: textColor }}>Address</p>
                            <p className="text-lg font-semibold" style={{ color: textColor }}>{contactInfo.address}</p>
                          </div>
                        </div>
                      )}
                      
                      {contactInfo.hours && (
                        <div className="flex items-center gap-4 group cursor-pointer hover:scale-105 transition-transform">
                          <div className="p-3 rounded-full bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                            <Clock className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-sm opacity-70" style={{ color: textColor }}>Hours</p>
                            <p className="text-lg font-semibold" style={{ color: textColor }}>{contactInfo.hours}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "Get in Touch",
      subtitle = "Let's Build Something Amazing Together",
      description = "Ready to transform your vision into reality? Our team of experts is here to help you create sustainable, innovative solutions that make a difference.",
      contactInfo = {},
      buttonText,
      buttonLink,
      secondaryButtonText,
      secondaryButtonLink,
      backgroundImage,
      backgroundVideo,
      backgroundColor = '#1a202c',
      textColor = '#ffffff',
      titleColor = '#EF4130',
      subtitleColor = '#ffffff',
      alignment = 'center',
      overlay = true,
      overlayOpacity = 0.6,
      showContactInfo = true,
    } = content;

    return (
      <section className="relative min-h-[600px] flex items-center overflow-hidden rounded-lg">
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
            className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Floating elements preview */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <Phone className="absolute top-1/4 left-1/4 w-6 h-6 text-red-400 opacity-20" />
          <Mail className="absolute top-2/3 right-1/3 w-4 h-4 text-blue-400 opacity-15" />
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full p-8">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Main Content */}
            <div 
              className={`${
                showContactInfo ? 'lg:col-span-8' : 'lg:col-span-12'
              } ${
                alignment === 'left' ? 'text-left' : 
                alignment === 'right' ? 'text-right' : 'text-center'
              }`}
            >
              <div className="space-y-3 mb-6">
                <h1 
                  className="font-bold leading-tight text-3xl"
                  style={{ color: titleColor }}
                >
                  {title}
                </h1>
                <h2 
                  className="font-light leading-tight text-xl opacity-90"
                  style={{ color: subtitleColor }}
                >
                  {subtitle}
                </h2>
              </div>
              
              {description && (
                <div className={`${alignment === 'center' ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
                  <div 
                    className={`relative w-24 h-1 mb-4 overflow-hidden rounded-full ${
                      alignment === 'center' ? 'mx-auto' : 
                      alignment === 'right' ? 'ml-auto' : ''
                    }`}
                    style={{ 
                      background: `linear-gradient(90deg, ${titleColor}, ${titleColor}40, transparent)`,
                    }}
                  >
                    <div 
                      className="absolute inset-0 w-full h-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${titleColor}, transparent)`,
                        animation: 'shimmerLine 2s ease-in-out infinite',
                        transform: 'translateX(-100%)'
                      }}
                    />
                  </div>
                  <p
                    style={{ color: textColor }}
                    className="text-sm leading-relaxed opacity-90"
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
                <div className={`flex flex-wrap gap-3 mt-6 ${
                  alignment === 'center' ? 'justify-center' : 
                  alignment === 'right' ? 'justify-end' : 'justify-start'
                }`}>
                  {buttonText && (
                    <BannerButton
                      text={buttonText}
                      href={buttonLink || '#'}
                      variant="primary"
                      size="md"
                      backgroundColor={titleColor}
                      icon="send"
                      animation="slide"
                      shadow={true}
                      rounded="lg"
                    />
                  )}
                  {secondaryButtonText && (
                    <BannerButton
                      text={secondaryButtonText}
                      href={secondaryButtonLink || '#'}
                      variant="outline"
                      size="md"
                      textColor="white"
                      borderColor="rgba(255, 255, 255, 0.4)"
                      hoverBackgroundColor="rgba(255, 255, 255, 0.1)"
                      icon="message"
                      animation="scale"
                      shadow={false}
                      rounded="lg"
                      className="backdrop-blur-md bg-white/5"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Contact Information Card Preview */}
            {showContactInfo && (
              <div className="lg:col-span-4">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/30">
                  <h3 
                    className="text-lg font-bold mb-4"
                    style={{ color: titleColor }}
                  >
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    {contactInfo.phone && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-red-500/20">
                          <Phone className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                          <p className="text-xs opacity-70" style={{ color: textColor }}>Phone</p>
                          <p className="text-sm font-semibold" style={{ color: textColor }}>{contactInfo.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {contactInfo.email && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-500/20">
                          <Mail className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs opacity-70" style={{ color: textColor }}>Email</p>
                          <p className="text-sm font-semibold" style={{ color: textColor }}>{contactInfo.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {contactInfo.address && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-green-500/20">
                          <MapPin className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs opacity-70" style={{ color: textColor }}>Address</p>
                          <p className="text-sm font-semibold" style={{ color: textColor }}>{contactInfo.address}</p>
                        </div>
                      </div>
                    )}
                    
                    {contactInfo.hours && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-purple-500/20">
                          <Clock className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs opacity-70" style={{ color: textColor }}>Hours</p>
                          <p className="text-sm font-semibold" style={{ color: textColor }}>{contactInfo.hours}</p>
                        </div>
                      </div>
                    )}
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
      <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-orange-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border border-orange-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Contact Page Banner
          </h3>
          <span className="h-3 w-3 rounded-full bg-orange-400/40" />
        </div>

        <div className="space-y-6">
          {/* Main Content */}
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
            rows={4}
          />

          {/* Media Upload */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={content.backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url, backgroundVideo: '' })}
              onRemove={() => handleContentUpdate({ backgroundImage: '' })}
              placeholder="Upload background image or paste URL..."
              maxSize="10MB"
              supportedFormats="PNG, JPG, WebP"
            />

            <MediaUpload
              label="Background Video"
              type="video"
              currentUrl={content.backgroundVideo}
              onUpload={(url) => handleContentUpdate({ backgroundVideo: url, backgroundImage: '' })}
              onRemove={() => handleContentUpdate({ backgroundVideo: '' })}
              placeholder="Upload background video or paste URL..."
              maxSize="50MB"
              supportedFormats="MP4, WebM"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
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
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "#1a202c"}
              onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
            />
          </div>

          {/* Layout Settings */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
            <EditableCheckbox
              label="Show Contact Info"
              checked={Boolean(content.showContactInfo !== false)}
              onChange={(value: any) => handleContentUpdate({ showContactInfo: value })}
            />
            <EditableCheckbox
              label="Enable Overlay"
              checked={content.overlay !== undefined ? content.overlay : true}
              onChange={(value: any) => handleContentUpdate({ overlay: value })}
            />
          </div>

          {/* Overlay Opacity */}
          <EditableRange
            label="Overlay Opacity"
            value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.6}
            onChange={(value: any) => handleContentUpdate({ overlayOpacity: value })}
            min={0}
            max={1}
            step={0.1}
          />

          {/* Buttons */}
          <div className="border-t border-orange-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Action Buttons</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <EditableText
                label="Primary Button Text"
                value={content.buttonText || ""}
                onChange={(value: any) => handleContentUpdate({ buttonText: value })}
              />
              <EditableText
                label="Primary Button Link"
                value={content.buttonLink || ""}
                onChange={(value: any) => handleContentUpdate({ buttonLink: value })}
              />
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
          </div>

          {/* Contact Information */}
          {content.showContactInfo !== false && (
            <div className="border-t border-orange-100 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <EditableText
                  label="Phone Number"
                  value={content.contactInfo?.phone || ""}
                  onChange={(value: any) => handleContactInfoUpdate({ phone: value })}
                />
                <EditableText
                  label="Email Address"
                  value={content.contactInfo?.email || ""}
                  onChange={(value: any) => handleContactInfoUpdate({ email: value })}
                />
                <EditableTextarea
                  label="Address"
                  value={content.contactInfo?.address || ""}
                  onChange={(value: any) => handleContactInfoUpdate({ address: value })}
                />
                <EditableText
                  label="Business Hours"
                  value={content.contactInfo?.hours || ""}
                  onChange={(value: any) => handleContactInfoUpdate({ hours: value })}
                />
              </div>
            </div>
          )}

          {/* Form Embed */}
          <div className="border-t border-orange-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Embedded Form (Optional)</h4>
            <EditableTextarea
              label="Form Embed Code"
              value={content.formEmbedCode || ""}
              onChange={(value: any) => handleContentUpdate({ formEmbedCode: value })}
              rows={4}
            />
            <small className="text-gray-500 block mt-2">
              Paste HTML embed code from services like Google Forms, Typeform, or custom forms.
            </small>
          </div>

          {/* Save Button */}
          <div className="border-t border-orange-100 pt-6">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-lg bg-orange-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
