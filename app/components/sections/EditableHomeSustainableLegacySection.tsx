"use client";

import React from "react";
import { HomeSustainableLegacySection } from "@/lib/db";
import MediaUpload from "../MediaUpload";

interface EditableHomeSustainableLegacyProps {
  section: HomeSustainableLegacySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HomeSustainableLegacySection>) => void;
}

export default function EditableHomeSustainableLegacySection({ section, isEditing, onUpdate }: EditableHomeSustainableLegacyProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "Building a Sustainable Legacy, Today and Beyond",
      imageUrl,
      backgroundColor = '#EF4130',
      textColor = '#ffffff',
      fontSize = '28px',
      alignment = 'center'
    } = content;

    return (
      <section className="relative h-screen min-h-[600px] overflow-hidden mt-24">
        <div className="grid lg:grid-cols-5 h-full">
          {/* Text Content - Left Side */}
          <div 
            className="lg:col-span-2 flex items-center justify-center p-8 lg:p-16"
            style={{ backgroundColor }}
          >
            <div className={`max-w-lg ${
              alignment === 'center' ? 'text-center' : 
              alignment === 'right' ? 'text-right' : 'text-left'
            }`}>
              <h2 
                className="leading-tight"
                style={{ 
                  color: textColor,
                  fontSize: fontSize,
                  lineHeight: '1.4'
                }}
              >
                {title}
              </h2>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:col-span-3 relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Sustainable Architecture"
                className="w-full h-full object-cover"
              />
            ) : (
              /* Default architectural image placeholder */
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%2387CEEB;stop-opacity:1" /><stop offset="100%" style="stop-color:%23E0F6FF;stop-opacity:1" /></linearGradient></defs><rect width="800" height="600" fill="url(%23sky)"/><g fill="%23C0C0C0"><rect x="100" y="200" width="200" height="300" rx="10"/><rect x="150" y="150" width="100" height="50" rx="5"/><rect x="350" y="180" width="300" height="320" rx="15"/><rect x="400" y="130" width="200" height="50" rx="8"/></g><g fill="%23228B22"><circle cx="80" cy="400" r="30"/><circle cx="720" cy="450" r="40"/><rect x="0" y="500" width="800" height="100"/></g><g fill="%23FFD700"><circle cx="650" cy="100" r="40"/></g></svg>')`
                }}
              >
                {/* Overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
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
      title = "Building a Sustainable Legacy, Today and Beyond",
      imageUrl,
      backgroundColor = '#EF4130',
      textColor = '#ffffff',
      fontSize = '28px',
      alignment = 'center'
    } = content;

    return (
      <section className="relative h-96 min-h-[400px] overflow-hidden rounded-lg">
        <div className="grid lg:grid-cols-5 h-full">
          {/* Text Content - Left Side */}
          <div 
            className="lg:col-span-2 flex items-center justify-center p-8"
            style={{ backgroundColor }}
          >
            <div className={`max-w-lg ${
              alignment === 'center' ? 'text-center' : 
              alignment === 'right' ? 'text-right' : 'text-left'
            }`}>
              <h2 
                className="leading-tight"
                style={{ 
                  color: textColor,
                  fontSize: fontSize,
                  lineHeight: '1.4'
                }}
              >
                {title}
              </h2>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:col-span-3 relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Sustainable Architecture"
                className="w-full h-full object-cover"
              />
            ) : (
              /* Default architectural image placeholder */
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:%2387CEEB;stop-opacity:1" /><stop offset="100%" style="stop-color:%23E0F6FF;stop-opacity:1" /></linearGradient></defs><rect width="800" height="600" fill="url(%23sky)"/><g fill="%23C0C0C0"><rect x="100" y="200" width="200" height="300" rx="10"/><rect x="150" y="150" width="100" height="50" rx="5"/><rect x="350" y="180" width="300" height="320" rx="15"/><rect x="400" y="130" width="200" height="50" rx="8"/></g><g fill="%23228B22"><circle cx="80" cy="400" r="30"/><circle cx="720" cy="450" r="40"/><rect x="0" y="500" width="800" height="100"/></g><g fill="%23FFD700"><circle cx="650" cy="100" r="40"/></g></svg>')`
                }}
              >
                {/* Overlay for better text contrast if needed */}
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Live Preview */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-lime-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Edit Sustainable Legacy Section</h3>
          <span className="h-3 w-3 rounded-full bg-lime-400/40" />
        </div>
      <div className="space-y-6">
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Title
          <input
            type="text"
            value={content.title || ""}
            onChange={(event) => handleContentUpdate({ title: event.target.value })}
            className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-lime-500 focus:outline-none"
          />
        </label>
        <MediaUpload
          label="Background Image"
          type="image"
          currentUrl={content.imageUrl}
          onUpload={(url) => handleContentUpdate({ imageUrl: url })}
          onRemove={() => handleContentUpdate({ imageUrl: '' })}
          placeholder="Or paste image URL..."
          className=""
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Background Color
            <input
              type="text"
              value={content.backgroundColor || ""}
              onChange={(event) => handleContentUpdate({ backgroundColor: event.target.value })}
              className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-lime-500 focus:outline-none"
              placeholder="#EF4130"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Text Color
            <input
              type="text"
              value={content.textColor || ""}
              onChange={(event) => handleContentUpdate({ textColor: event.target.value })}
              className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-lime-500 focus:outline-none"
              placeholder="#FFFFFF"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-gray-700">
            Font Size
            <input
              type="text"
              value={content.fontSize || ""}
              onChange={(event) => handleContentUpdate({ fontSize: event.target.value })}
              className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-lime-500 focus:outline-none"
              placeholder="e.g. 32px"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm text-gray-700">
          Alignment
          <select
            value={content.alignment || "center"}
            onChange={(event) => handleContentUpdate({ alignment: event.target.value })}
            className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-lime-500 focus:outline-none"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>

        {/* Save Button */}
        <div className="mt-6 border-t border-lime-100 pt-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-lg bg-lime-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-lime-700"
          >
            Save Changes
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
