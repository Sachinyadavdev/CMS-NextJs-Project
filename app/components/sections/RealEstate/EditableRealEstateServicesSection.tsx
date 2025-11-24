"use client";

import React from "react";
import { RealEstateServicesSection, RealEstateServiceItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

interface EditableRealEstateServicesProps {
  section: RealEstateServicesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateServicesSection>) => void;
}

export default function EditableRealEstateServicesSection({
  section,
  isEditing,
  onUpdate
}: EditableRealEstateServicesProps) {
  const content = section.content || {};
  const services = content.services || [];

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleServiceUpdate = (serviceIndex: number, serviceUpdates: Partial<RealEstateServiceItem>) => {
    const updatedServices = [...services];
    updatedServices[serviceIndex] = { ...updatedServices[serviceIndex], ...serviceUpdates };
    handleContentUpdate({ services: updatedServices });
  };

  const addService = () => {
    const newService: RealEstateServiceItem = {
      id: Date.now().toString(),
      title: "New Service",
      description: "Service description",
      iconUrl: "",
      link: ""
    };
    handleContentUpdate({ services: [...services, newService] });
  };

  const removeService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    handleContentUpdate({ services: updatedServices });
  };

  if (!isEditing) {
    const {
      title = "SERVICES",
      subtitle = "We believe in guiding our clients on a transformative journey",
      description = "We embrace intelligence, deep industry expertise, and responsible working practices because the future demands it.",
      backgroundColor = '#ffffff',
      textColor = '#000000'
    } = content;

    return (
      <section className="py-20" style={{ backgroundColor, color: textColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl font-light mb-6" style={{ color: textColor, opacity: 0.8 }}>
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-lg max-w-3xl mx-auto" style={{ color: textColor, opacity: 0.7 }}>
                {description}
              </p>
            )}
          </div>

          {/* Services Grid */}
          {services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                >
                  {service.iconUrl && (
                    <div className="mb-6">
                      <img
                        src={service.iconUrl}
                        alt={service.title}
                        className="w-16 h-16 object-contain mx-auto"
                      />
                    </div>
                  )}

                  {service.title && (
                    <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">
                      {service.title}
                    </h3>
                  )}

                  {service.description && (
                    <p className="text-gray-600 text-center leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  {service.link && (
                    <div className="text-center mt-6">
                      <a
                        href={service.link}
                        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                      >
                        Learn More →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Render compact preview
  const renderPreview = () => {
    return (
      <section
        className="relative py-8 rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        style={{ backgroundColor: content.backgroundColor || '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: content.textColor || '#000000' }}>
              {content.title || "SERVICES"}
            </h2>
            {content.subtitle && (
              <p className="text-lg opacity-80" style={{ color: content.textColor || '#000000' }}>
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Services Grid */}
          {services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.slice(0, 3).map((service, index) => (
                <div key={service.id} className="bg-white rounded-lg p-4 shadow">
                  {service.iconUrl && (
                    <img
                      src={service.iconUrl}
                      alt={service.title}
                      className="w-8 h-8 object-contain mx-auto mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-center text-sm">
                    {service.title}
                  </h3>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    {service.description?.substring(0, 50)}...
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

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
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
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
            Text Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(event) => handleContentUpdate({ title: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="SERVICES"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(event) => handleContentUpdate({ subtitle: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="We believe in guiding our clients..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={content.description || ""}
                onChange={(event) => handleContentUpdate({ description: event.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="We embrace intelligence, deep industry expertise..."
              />
            </div>
          </div>
        </div>

        {/* Colors & Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Colors & Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={content.backgroundColor || "#ffffff"}
                onChange={(event) => handleContentUpdate({ backgroundColor: event.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={content.textColor || "#000000"}
                onChange={(event) => handleContentUpdate({ textColor: event.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Services
            </h3>
            <button
              onClick={addService}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={service.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">Service {index + 1}</h5>
                  <button
                    onClick={() => removeService(index)}
                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={service.title || ""}
                      onChange={(event) => handleServiceUpdate(index, { title: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Service Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link (Optional)</label>
                    <input
                      type="text"
                      value={service.link || ""}
                      onChange={(event) => handleServiceUpdate(index, { link: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={service.description || ""}
                    onChange={(event) => handleServiceUpdate(index, { description: event.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="Service description"
                  />
                </div>

                <div className="mt-4">
                  <MediaUpload
                    label="Icon Image (Optional)"
                    type="image"
                    currentUrl={service.iconUrl}
                    onUpload={(url) => handleServiceUpdate(index, { iconUrl: url })}
                    onRemove={() => handleServiceUpdate(index, { iconUrl: "" })}
                    placeholder="Or paste icon URL..."
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