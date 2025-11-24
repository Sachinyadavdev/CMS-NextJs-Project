"use client";

import React, { useState } from "react";
import { ContactAddressSection } from "@/lib/db";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  Globe, 
  Plus, 
  Trash2, 
  Edit3,
  Star,
  ExternalLink
} from "lucide-react";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableContactAddressProps {
  section: ContactAddressSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ContactAddressSection>) => void;
}

export default function ContactAddress({
  section,
  isEditing,
  onUpdate,
}: EditableContactAddressProps) {
  const content = section.content || {};
  const [editingOffice, setEditingOffice] = useState<string | null>(null);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleOfficeUpdate = (officeId: string, updates: Record<string, unknown>) => {
    const offices = content.offices || [];
    const updatedOffices = offices.map(office => 
      office.id === officeId ? { ...office, ...updates } : office
    );
    handleContentUpdate({ offices: updatedOffices });
  };

  const addNewOffice = () => {
    const offices = content.offices || [];
    const newOffice = {
      id: `office-${Date.now()}`,
      name: "New Office",
      type: "office",
      address: ["Address Line 1", "City, Country"],
      phone: "",
      email: "",
      poBox: "",
      mapUrl: ""
    };
    handleContentUpdate({ offices: [...offices, newOffice] });
  };

  const removeOffice = (officeId: string) => {
    const offices = content.offices || [];
    const updatedOffices = offices.filter(office => office.id !== officeId);
    handleContentUpdate({ offices: updatedOffices });
  };

  const updateOfficeAddress = (officeId: string, addressLines: string[]) => {
    handleOfficeUpdate(officeId, { address: addressLines });
  };

  if (!isEditing) {
    const {
      title = "🌍 Get in Touch",
      subtitle = "Our Global Presence",
      offices = [
        {
          id: "dubai-hq",
          name: "Dubai – Headquarters",
          type: "headquarters",
          address: [
            "RAUS Integrated Project Management Services LLC",
            "Sheikh Rashid Tower,",
            "World Trade Center,",
            "Sheikh Zayed Road, Dubai – UAE"
          ],
          poBox: "P.O. Box: 293816"
        },
        {
          id: "tanzania",
          name: "Tanzania Office",
          type: "office",
          address: [
            "84 Kinondoni Rd,",
            "Dar es Salaam 14110, Tanzania"
          ]
        },
        {
          id: "india-chennai",
          name: "India Office – Chennai",
          type: "office",
          address: [
            "Prince Infocity 1,",
            "Old Mahabalipuram Road,",
            "Perungudi, Chennai, Tamil Nadu – 600096"
          ]
        }
      ],
      titleColor = '#EF4130',
      subtitleColor = '#6B7280',
      textColor = '#374151',
      backgroundColor = '#F9FAFB',
      cardBackgroundColor = '#FFFFFF',
      borderColor = '#E5E7EB',
      accentColor = '#EF4130',
      alignment = 'center',
      layout = 'grid',
      showIcons = true,
      showBorders = true,
      paddingTop = '80px',
      paddingBottom = '80px',
      marginTop = '0px',
      marginBottom = '0px',
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
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated background shapes */}
          <div 
            className="absolute top-20 right-20 w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ 
              background: `linear-gradient(45deg, ${accentColor}, ${titleColor})`,
              animation: 'float 12s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-20 left-20 w-32 h-32 rounded-full blur-2xl opacity-15"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}30, transparent)`,
              animation: 'float 8s ease-in-out infinite 2s'
            }}
          />
          
          {/* Floating icons */}
          <div className="absolute top-1/4 left-1/4 opacity-10" style={{ animation: 'float 6s ease-in-out infinite' }}>
            <Globe className="w-8 h-8" style={{ color: accentColor }} />
          </div>
          <div className="absolute top-1/3 right-1/3 opacity-10" style={{ animation: 'float 8s ease-in-out infinite 1s' }}>
            <MapPin className="w-6 h-6" style={{ color: accentColor }} />
          </div>
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
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-15px) translateX(8px); }
            66% { transform: translateY(8px) translateX(-8px); }
          }
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0, -8px, 0); }
            70% { transform: translate3d(0, -4px, 0); }
            90% { transform: translate3d(0, -2px, 0); }
          }
        `}</style>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className={`mb-12 ${
            alignment === 'left' ? 'text-left' : 
            alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            {/* Title */}
            {title && (
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{ 
                  color: titleColor,
                  animation: `slideInDown 1s ease-out ${animationDelay}s both`
                }}
              >
                {title}
              </h2>
            )}
            
            {/* Subtitle */}
            {subtitle && (
              <p 
                className="text-xl md:text-2xl font-light opacity-80"
                style={{ 
                  color: subtitleColor,
                  animation: `slideInDown 1s ease-out ${animationDelay + 0.2}s both`
                }}
              >
                {subtitle}
              </p>
            )}
            
            {/* Decorative Line */}
            <div 
              className={`relative h-1 w-24 mt-6 overflow-hidden rounded-full ${
                alignment === 'center' ? 'mx-auto' : 
                alignment === 'right' ? 'ml-auto' : ''
              }`}
              style={{ 
                background: `linear-gradient(90deg, ${accentColor}, ${accentColor}40, transparent)`,
                animation: `slideInUp 1s ease-out ${animationDelay + 0.4}s both`
              }}
            >
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  animation: 'shimmer 3s ease-in-out infinite',
                  transform: 'translateX(-100%)'
                }}
              />
            </div>
          </div>

          {/* Offices Grid/List */}
          <div 
            className={`${
              layout === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-8'
            }`}
            style={{ 
              animation: `fadeIn 1s ease-out ${animationDelay + 0.6}s both` 
            }}
          >
            {offices.map((office, index) => (
              <div
                key={office.id}
                className={`relative group transition-all duration-500 transform hover:scale-105 ${
                  layout === 'list' ? 'flex flex-col md:flex-row gap-6' : ''
                }`}
                style={{ 
                  animation: `scaleIn 0.8s ease-out ${animationDelay + 0.8 + (index * 0.2)}s both` 
                }}
              >
                {/* Office Card */}
                <div 
                  className={`relative p-8 rounded-2xl transition-all duration-300 ${
                    showBorders ? 'border-2' : ''
                  } ${
                    layout === 'list' ? 'flex-1' : 'h-full'
                  }`}
                  style={{ 
                    backgroundColor: cardBackgroundColor,
                    borderColor: showBorders ? borderColor : 'transparent',
                    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Headquarters Badge */}
                  {office.type === 'headquarters' && (
                    <div 
                      className="absolute -top-3 -right-3 p-2 rounded-full shadow-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  )}

                  {/* Office Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {showIcons && (
                        <div 
                          className="p-3 rounded-full"
                          style={{ backgroundColor: `${accentColor}20` }}
                        >
                          <Building2 
                            className="w-6 h-6" 
                            style={{ color: accentColor }} 
                          />
                        </div>
                      )}
                      <div>
                        <h3 
                          className="text-xl font-bold mb-1"
                          style={{ color: titleColor }}
                        >
                          {office.name}
                        </h3>
                        <span 
                          className="text-sm font-medium uppercase tracking-wider px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: office.type === 'headquarters' ? `${accentColor}20` : `${subtitleColor}20`,
                            color: office.type === 'headquarters' ? accentColor : subtitleColor
                          }}
                        >
                          {office.type === 'headquarters' ? 'Headquarters' : 'Branch Office'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      {showIcons && (
                        <MapPin 
                          className="w-5 h-5 mt-1 flex-shrink-0" 
                          style={{ color: accentColor }} 
                        />
                      )}
                      <div className="flex-1">
                        <div className="space-y-1">
                          {office.address.map((line, lineIndex) => (
                            <p 
                              key={lineIndex}
                              className="leading-relaxed"
                              style={{ color: textColor }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                        
                        {/* P.O. Box */}
                        {office.poBox && (
                          <p 
                            className="mt-2 font-medium"
                            style={{ color: subtitleColor }}
                          >
                            {office.poBox}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      {office.phone && (
                        <div className="flex items-center gap-3">
                          <Phone 
                            className="w-4 h-4" 
                            style={{ color: accentColor }} 
                          />
                          <a 
                            href={`tel:${office.phone}`}
                            className="hover:underline transition-colors"
                            style={{ color: textColor }}
                          >
                            {office.phone}
                          </a>
                        </div>
                      )}
                      
                      {office.email && (
                        <div className="flex items-center gap-3">
                          <Mail 
                            className="w-4 h-4" 
                            style={{ color: accentColor }} 
                          />
                          <a 
                            href={`mailto:${office.email}`}
                            className="hover:underline transition-colors"
                            style={{ color: textColor }}
                          >
                            {office.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                  
                  {/* Interactive Elements */}
                  {office.mapUrl && (
                    <div className="absolute top-4 right-4 transition-all duration-300">
                      <a 
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center hover:scale-110 hover:-translate-y-1 group/maplink"
                        title="Open in Maps"
                        style={{
                          background: `linear-gradient(135deg, white, ${accentColor}10)`
                        }}
                      >
                        <ExternalLink 
                          className="w-4 h-4 transition-all duration-300 group-hover/maplink:scale-110" 
                          style={{ color: accentColor }} 
                        />
                        
                        {/* Ripple effect on hover */}
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover/maplink:opacity-100 group-hover/maplink:scale-150 transition-all duration-500"
                          style={{
                            background: `radial-gradient(circle, ${accentColor}20, transparent 70%)`
                          }}
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "🌍 Get in Touch",
      subtitle = "Our Global Presence",
      offices = [
        {
          id: "dubai-hq",
          name: "Dubai – Headquarters",
          type: "headquarters",
          address: [
            "RAUS Integrated Project Management Services LLC",
            "Sheikh Rashid Tower, World Trade Center",
            "Sheikh Zayed Road, Dubai – UAE"
          ],
          poBox: "P.O. Box: 293816"
        },
        {
          id: "tanzania",
          name: "Tanzania Office",
          type: "office",
          address: [
            "84 Kinondoni Rd,",
            "Dar es Salaam 14110, Tanzania"
          ]
        }
      ],
      titleColor = '#EF4130',
      subtitleColor = '#6B7280',
      textColor = '#374151',
      backgroundColor = '#F9FAFB',
      cardBackgroundColor = '#FFFFFF',
      borderColor = '#E5E7EB',
      accentColor = '#EF4130',
      alignment = 'center',
      layout = 'grid',
      showIcons = true,
      showBorders = true,
    } = content;

    return (
      <section 
        className="relative overflow-hidden rounded-lg p-8"
        style={{ backgroundColor }}
      >
        {/* Background Elements Preview */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-4 right-4 w-20 h-20 rounded-full blur-2xl opacity-10"
            style={{ background: `linear-gradient(45deg, ${accentColor}, ${titleColor})` }}
          />
          <Globe className="absolute top-6 left-6 w-6 h-6 opacity-10" style={{ color: accentColor }} />
        </div>

        <div className="relative z-10">
          {/* Header Preview */}
          <div className={`mb-8 ${
            alignment === 'left' ? 'text-left' : 
            alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            {title && (
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ color: titleColor }}
              >
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p 
                className="text-lg font-light opacity-80"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            
            {/* Decorative Line Preview */}
            <div 
              className={`relative h-1 w-16 mt-4 overflow-hidden rounded-full ${
                alignment === 'center' ? 'mx-auto' : 
                alignment === 'right' ? 'ml-auto' : ''
              }`}
              style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}40, transparent)` }}
            >
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  animation: 'shimmer 3s ease-in-out infinite',
                  transform: 'translateX(-100%)'
                }}
              />
            </div>
          </div>

          {/* Offices Preview */}
          <div className={`${
            layout === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
              : 'space-y-4'
          }`}>
            {offices.slice(0, 2).map((office) => (
              <div
                key={office.id}
                className="relative group"
              >
                <div 
                  className={`p-6 rounded-xl transition-all duration-300 ${
                    showBorders ? 'border-2' : ''
                  }`}
                  style={{ 
                    backgroundColor: cardBackgroundColor,
                    borderColor: showBorders ? borderColor : 'transparent',
                    boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  {/* Headquarters Badge Preview */}
                  {office.type === 'headquarters' && (
                    <div 
                      className="absolute -top-2 -right-2 p-1 rounded-full shadow-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  )}

                  {/* Office Header Preview */}
                  <div className="flex items-start gap-3 mb-4">
                    {showIcons && (
                      <div 
                        className="p-2 rounded-full"
                        style={{ backgroundColor: `${accentColor}20` }}
                      >
                        <Building2 
                          className="w-4 h-4" 
                          style={{ color: accentColor }} 
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 
                        className="text-lg font-bold mb-1"
                        style={{ color: titleColor }}
                      >
                        {office.name}
                      </h3>
                      <span 
                        className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full"
                        style={{ 
                          backgroundColor: office.type === 'headquarters' ? `${accentColor}20` : `${subtitleColor}20`,
                          color: office.type === 'headquarters' ? accentColor : subtitleColor
                        }}
                      >
                        {office.type === 'headquarters' ? 'HQ' : 'Office'}
                      </span>
                    </div>
                  </div>

                  {/* Address Preview */}
                  <div className="flex items-start gap-3">
                    {showIcons && (
                      <MapPin 
                        className="w-4 h-4 mt-1 flex-shrink-0" 
                        style={{ color: accentColor }} 
                      />
                    )}
                    <div className="flex-1">
                      <div className="space-y-1">
                        {office.address.slice(0, 2).map((line, lineIndex) => (
                          <p 
                            key={lineIndex}
                            className="text-sm leading-relaxed"
                            style={{ color: textColor }}
                          >
                            {line.length > 40 ? `${line.substring(0, 40)}...` : line}
                          </p>
                        ))}
                        {office.address.length > 2 && (
                          <p className="text-xs opacity-60" style={{ color: textColor }}>
                            +{office.address.length - 2} more lines
                          </p>
                        )}
                      </div>
                      
                      {office.poBox && (
                        <p 
                          className="mt-2 text-sm font-medium"
                          style={{ color: subtitleColor }}
                        >
                          {office.poBox}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      <div className="rounded-xl border border-green-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-green-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border border-green-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Contact Address
          </h3>
          <span className="h-3 w-3 rounded-full bg-green-400/40" />
        </div>

        <div className="space-y-6">
          {/* Header Content */}
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

          {/* Offices Management */}
          <div className="border-t border-green-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Office Locations</h4>
              <button
                type="button"
                onClick={addNewOffice}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                Add Office
              </button>
            </div>

            <div className="space-y-6">
              {(content.offices || []).map((office, index) => (
                <div key={office.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-medium text-gray-900">
                      Office {index + 1}: {office.name}
                    </h5>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingOffice(editingOffice === office.id ? null : office.id)}
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeOffice(office.id)}
                        className="p-2 text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {editingOffice === office.id && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <EditableText
                          label="Office Name"
                          value={office.name}
                          onChange={(value: any) => handleOfficeUpdate(office.id, { name: value })}
                        />
                        <EditableSelect
                          label="Office Type"
                          value={office.type}
                          onChange={(value: any) => handleOfficeUpdate(office.id, { type: value })}
                          options={[
                            { value: "office", label: "Branch Office" },
                            { value: "headquarters", label: "Headquarters" }
                          ]}
                        />
                      </div>

                      <EditableTextarea
                        label="Address (one line per field)"
                        value={office.address?.join('\n') || ''}
                        onChange={(value: any) => updateOfficeAddress(office.id, value.split('\n'))}
                        rows={4}
                      />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <EditableText
                          label="Phone"
                          value={office.phone || ''}
                          onChange={(value: any) => handleOfficeUpdate(office.id, { phone: value })}
                        />
                        <EditableText
                          label="Email"
                          value={office.email || ''}
                          onChange={(value: any) => handleOfficeUpdate(office.id, { email: value })}
                        />
                        <EditableText
                          label="P.O. Box"
                          value={office.poBox || ''}
                          onChange={(value: any) => handleOfficeUpdate(office.id, { poBox: value })}
                        />
                      </div>

                      <EditableText
                        label="Google Maps URL"
                        value={office.mapUrl || ''}
                        onChange={(value: any) => handleOfficeUpdate(office.id, { mapUrl: value })}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Design Settings */}
          <div className="border-t border-green-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Design Settings</h4>
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
                value={content.backgroundColor || "#F9FAFB"}
                onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
              />
              <EditableColorPicker
                label="Card Background"
                value={content.cardBackgroundColor || "#FFFFFF"}
                onChange={(value: any) => handleContentUpdate({ cardBackgroundColor: value })}
              />
              <EditableColorPicker
                label="Accent Color"
                value={content.accentColor || "#EF4130"}
                onChange={(value: any) => handleContentUpdate({ accentColor: value })}
              />
            </div>
          </div>

          {/* Layout Settings */}
          <div className="border-t border-green-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Layout & Options</h4>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                label="Layout Style"
                value={content.layout || "grid"}
                onChange={(value: any) => handleContentUpdate({ layout: value })}
                options={[
                  { value: "grid", label: "Grid" },
                  { value: "list", label: "List" }
                ]}
              />
              <EditableCheckbox
                label="Show Icons"
                checked={Boolean(content.showIcons !== false)}
                onChange={(value: any) => handleContentUpdate({ showIcons: value })}
              />
              <EditableCheckbox
                label="Show Borders"
                checked={Boolean(content.showBorders !== false)}
                onChange={(value: any) => handleContentUpdate({ showBorders: value })}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-green-100 pt-6">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
