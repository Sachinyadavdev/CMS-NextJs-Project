"use client";

import React from "react";
import { BannerWithStatsSection, BannerStat } from "@/lib/db";
import MediaUpload from "../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableRange, EditableSelect } from "@/app/components/EditableInputs";

interface EditableBannerWithStatsProps {
  section: BannerWithStatsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<BannerWithStatsSection>) => void;
}

export default function EditableBannerWithStatsSection({ section, isEditing, onUpdate }: EditableBannerWithStatsProps) {
  const content = section.content || {};
  const stats: BannerStat[] = Array.isArray(content.stats) ? content.stats : [];
  const overlayValue = Number(content.overlayOpacity ?? 0.4);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleStatUpdate = (index: number, patch: Partial<BannerStat>) => {
    const updatedStats = stats.map((stat: BannerStat, idx: number) => (idx === index ? { ...stat, ...patch } : stat));
    handleContentUpdate({ stats: updatedStats });
  };

  const handleAddStat = () => {
    const newStat: BannerStat = { label: "Label", value: "Value" };
    handleContentUpdate({ stats: [...stats, newStat] });
  };

  const handleRemoveStat = (index: number) => {
    const updatedStats = stats.filter((_: BannerStat, idx: number) => idx !== index);
    handleContentUpdate({ stats: updatedStats });
  };

  if (!isEditing) {
    const {
      title = "Bharat Mart – Dubai",
      description = "A revolutionary retail and commercial complex that redefines shopping experiences through integrated smart technologies and sustainable design principles.",
      titleColor = "#ffffff",
      descriptionColor = "#ffffff",
      titleFontSize = "30px",
      descriptionFontSize = "16px",
      alignment = "left",
      bannerBackgroundImage = "",
      bannerBackgroundVideo = "",
      overlayColor = "#000000",
      height = "600px",
      paddingTop = "80px",
      paddingBottom = "80px",
      marginTop = "0px",
      statsLabelColor = "#ffffff",
      statsValueColor = "#ffffff",
      statsLabelFontSize = "12px",
      statsValueFontSize = "16px",
      showStats = true,
      buttonText = "Read More",
      buttonLink = "",
    } = content;

    return (
      <section
        className="relative flex items-end overflow-hidden rounded-3xl mx-6 sm:mx-8 lg:mx-12 xl:mx-16"
        style={{
          height,
          minHeight: "400px",
          marginTop,
        }}
      >
        {/* Background Media */}
        {bannerBackgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bannerBackgroundVideo} type="video/mp4" />
          </video>
        ) : bannerBackgroundImage ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${bannerBackgroundImage}")`,
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800" />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayValue,
          }}
        />

        {/* Content Container */}
        <div className=" relative z-10 w-full  mx-auto px-4 sm:px-12 lg:px-16 pb-12 scale-[0.6] sm:scale-100 origin-top">
          <div
            className={`${
              alignment === "center"
                ? "text-center"
                : alignment === "right"
                ? "text-right"
                : "text-left"
            }`}
          >
            {/* Title */}
            <h2
              className="font-bold mb-3 leading-tight text-3xl sm:text-4xl lg:text-5xl"
              style={{
                color: titleColor,
                fontSize: titleFontSize,
              }}
            >
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p
                className="leading-relaxed mb-6 text-base sm:text-lg max-w-2xl"
                style={{
                  color: descriptionColor,
                  fontSize: descriptionFontSize,
                  marginLeft: alignment === "center" ? "auto" : alignment === "right" ? "auto" : "0",
                  marginRight: alignment === "center" ? "auto" : "0",
                }}
              >
                {description}
              </p>
            )}

            {/* Stats */}
            {showStats && stats.length > 0 && (
              <div
                className={`flex flex-wrap gap-6 sm:gap-8 lg:gap-12 mb-8 ${
                  alignment === "center"
                    ? "justify-center"
                    : alignment === "right"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <span
                      className="text-sm font-bold uppercase tracking-wider opacity-90"
                      style={{
                        color: stat.labelColor || statsLabelColor,
                        fontSize: stat.labelFontSize || statsLabelFontSize,
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="text-xl sm:text-2xl"
                      style={{
                        color: stat.valueColor || statsValueColor,
                        fontSize: stat.valueFontSize || statsValueFontSize,
                      }}
                    >
                      {stat.value}
                    </span>
                    {stat.description && (
                      <span className="text-xs text-gray-300 mt-1">
                        {stat.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Button */}
            {buttonText && buttonLink && (
              <div className={alignment === "center" ? "flex justify-center" : alignment === "right" ? "flex justify-end" : "flex justify-start"}>
                <a
                  href={buttonLink}
                  className="px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: "#EF4444" }}
                >
                  {buttonText}
                </a>
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
      title = "Bharat Mart – Dubai",
      description = "A revolutionary retail and commercial complex that redefines shopping experiences through integrated smart technologies and sustainable design principles.",
      titleColor = "#ffffff",
      descriptionColor = "#ffffff",
      titleFontSize = "24px", // Smaller for preview
      descriptionFontSize = "14px", // Smaller for preview
      alignment = "left",
      bannerBackgroundImage = "",
      bannerBackgroundVideo = "",
      overlayColor = "#000000",
      height = "300px", // Smaller height for preview
      paddingTop = "40px",
      paddingBottom = "40px",
      marginTop = "0px",
      statsLabelColor = "#ffffff",
      statsValueColor = "#ffffff",
      statsLabelFontSize = "10px",
      statsValueFontSize = "14px",
      showStats = true,
      buttonText = "Read More",
      buttonLink = "",
    } = content;

    const previewStats = stats.length > 0 ? stats.slice(0, 3) : [
      { label: "PROJECTS", value: "50+" },
      { label: "CLIENTS", value: "200+" },
      { label: "YEARS", value: "10+" }
    ];

    return (
      <section
        className="relative flex items-end overflow-hidden rounded-2xl"
        style={{
          height,
          minHeight: "250px",
        }}
      >
        {/* Background Media */}
        {bannerBackgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bannerBackgroundVideo} type="video/mp4" />
          </video>
        ) : bannerBackgroundImage ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${bannerBackgroundImage}")`,
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gray-800" />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlayColor,
            opacity: overlayValue,
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-6">
          <div
            className={`${
              alignment === "center"
                ? "text-center"
                : alignment === "right"
                ? "text-right"
                : "text-left"
            }`}
          >
            {/* Title */}
            <h2
              className="font-bold mb-2 leading-tight text-xl sm:text-2xl"
              style={{
                color: titleColor,
                fontSize: titleFontSize,
              }}
            >
              {title}
            </h2>

            {/* Description */}
            {description && (
              <p
                className="leading-relaxed mb-4 text-sm max-w-xl"
                style={{
                  color: descriptionColor,
                  fontSize: descriptionFontSize,
                  marginLeft: alignment === "center" ? "auto" : alignment === "right" ? "auto" : "0",
                  marginRight: alignment === "center" ? "auto" : "0",
                }}
              >
                {description}
              </p>
            )}

            {/* Stats */}
            {showStats && previewStats.length > 0 && (
              <div
                className={`flex flex-wrap gap-4 mb-4 ${
                  alignment === "center"
                    ? "justify-center"
                    : alignment === "right"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {previewStats.map((stat, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <span
                      className="text-xs font-bold uppercase tracking-wider opacity-90"
                      style={{
                        color: stat.labelColor || statsLabelColor,
                        fontSize: stat.labelFontSize || statsLabelFontSize,
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: stat.valueColor || statsValueColor,
                        fontSize: stat.valueFontSize || statsValueFontSize,
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Button */}
            {buttonText && buttonLink && (
              <div className={alignment === "center" ? "flex justify-center" : alignment === "right" ? "flex justify-end" : "flex justify-start"}>
                <a
                  href={buttonLink}
                  className="px-4 py-2 text-white font-semibold text-sm rounded hover:opacity-90 transition-opacity duration-200"
                  style={{ backgroundColor: "#EF4444" }}
                >
                  {buttonText}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

  const handleSaveChanges = () => {
    onUpdate({ content: { ...content, stats } });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Live Preview */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          <span className="h-3 w-3 rounded-full bg-primary-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Edit Banner With Stats Section</h3>
          <button
            type="button"
            onClick={handleAddStat}
            className="rounded-lg border border-primary-400 px-4 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
          >
            Add Stat
          </button>
        </div>
      <div className="space-y-6">
        <EditableText
          label="Title"
          value={content.title || ""}
          onChange={(val) => handleContentUpdate({ title: val })}
        />
        <EditableTextarea
          label="Description"
          value={content.description || ""}
          onChange={(val) => handleContentUpdate({ description: val })}
          rows={4}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableColorPicker
            label="Title Color"
            value={content.titleColor || "#ffffff"}
            onChange={(val) => handleContentUpdate({ titleColor: val })}
          />
          <EditableColorPicker
            label="Description Color"
            value={content.descriptionColor || "#ffffff"}
            onChange={(val) => handleContentUpdate({ descriptionColor: val })}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableText
            label="Title Font Size"
            value={content.titleFontSize || ""}
            onChange={(val) => handleContentUpdate({ titleFontSize: val })}
            placeholder="48px"
          />
          <EditableText
            label="Description Font Size"
            value={content.descriptionFontSize || ""}
            onChange={(val) => handleContentUpdate({ descriptionFontSize: val })}
            placeholder="18px"
          />
        </div>
        <EditableSelect
          label="Alignment"
          value={content.alignment || "left"}
          onChange={(val) => handleContentUpdate({ alignment: val })}
          options={[
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ]}
        />
        {/* Media Upload */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MediaUpload
            label="Background Image"
            type="image"
            currentUrl={content.bannerBackgroundImage}
            onUpload={(url) => handleContentUpdate({ bannerBackgroundImage: url })}
            onRemove={() => handleContentUpdate({ bannerBackgroundImage: '' })}
            placeholder="Upload background image or paste URL..."
            maxSize="10MB"
            supportedFormats="PNG, JPG, WebP"
            className=""
          />
          <MediaUpload
            label="Background Video"
            type="video"
            currentUrl={content.bannerBackgroundVideo}
            onUpload={(url) => handleContentUpdate({ bannerBackgroundVideo: url })}
            onRemove={() => handleContentUpdate({ bannerBackgroundVideo: '' })}
            placeholder="Upload background video or paste URL..."
            maxSize="50MB"
            supportedFormats="MP4, WebM, MOV"
            className=""
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <EditableColorPicker
            label="Overlay Color"
            value={content.overlayColor || "#000000"}
            onChange={(val) => handleContentUpdate({ overlayColor: val })}
          />
          <EditableRange
            label="Overlay Opacity"
            value={overlayValue}
            onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
            min={0}
            max={1}
            step={0.1}
            showValue
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <EditableText
            label="Height"
            value={content.height || ""}
            onChange={(val) => handleContentUpdate({ height: val })}
            placeholder="600px"
          />
          <EditableText
            label="Margin Top"
            value={content.marginTop || ""}
            onChange={(val) => handleContentUpdate({ marginTop: val })}
            placeholder="0px"
          />
          <EditableSelect
            label="Show Stats"
            value={content.showStats !== false ? "true" : "false"}
            onChange={(val) => handleContentUpdate({ showStats: val === "true" })}
            options={[
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ]}
          />
        </div>
        
        {/* Stats Global Settings */}
        <div className="border-t border-primary-100 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Stats Global Settings</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EditableColorPicker
              label="Stats Label Color"
              value={content.statsLabelColor || "#ffffff"}
              onChange={(val) => handleContentUpdate({ statsLabelColor: val })}
            />
            <EditableColorPicker
              label="Stats Value Color"
              value={content.statsValueColor || "#ffffff"}
              onChange={(val) => handleContentUpdate({ statsValueColor: val })}
            />
            <EditableText
              label="Stats Label Font Size"
              value={content.statsLabelFontSize || ""}
              onChange={(val) => handleContentUpdate({ statsLabelFontSize: val })}
              placeholder="12px"
            />
            <EditableText
              label="Stats Value Font Size"
              value={content.statsValueFontSize || ""}
              onChange={(val) => handleContentUpdate({ statsValueFontSize: val })}
              placeholder="24px"
            />
          </div>
        </div>

        {/* Button Settings */}
        <div className="border-t border-primary-100 pt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Button Settings</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EditableText
              label="Button Text"
              value={content.buttonText || ""}
              onChange={(val) => handleContentUpdate({ buttonText: val })}
              placeholder="Read More"
            />
            <EditableText
              label="Button Link"
              value={content.buttonLink || ""}
              onChange={(val) => handleContentUpdate({ buttonLink: val })}
              placeholder="https://example.com or /page"
            />
          </div>
        </div>
      </div>
      
        {stats.length > 0 && (
          <div className="mt-8 space-y-6">
            {stats.map((stat, index) => (
              <div key={`${stat.label}-${index}`} className="rounded-lg border border-primary-100 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">Stat {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(index)}
                    className="text-sm text-red-600 transition hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <EditableText
                    label="Label"
                    value={stat.label || ""}
                    onChange={(val) => handleStatUpdate(index, { label: val })}
                  />
                  <EditableText
                    label="Value"
                    value={stat.value || ""}
                    onChange={(val) => handleStatUpdate(index, { value: val })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <EditableColorPicker
                    label="Label Color"
                    value={stat.labelColor || "#ffffff"}
                    onChange={(val) => handleStatUpdate(index, { labelColor: val })}
                  />
                  <EditableColorPicker
                    label="Value Color"
                    value={stat.valueColor || "#ffffff"}
                    onChange={(val) => handleStatUpdate(index, { valueColor: val })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <EditableText
                    label="Label Font Size"
                    value={stat.labelFontSize || ""}
                    onChange={(val) => handleStatUpdate(index, { labelFontSize: val })}
                  />
                  <EditableText
                    label="Value Font Size"
                    value={stat.valueFontSize || ""}
                    onChange={(val) => handleStatUpdate(index, { valueFontSize: val })}
                  />
                </div>
                <div className="mt-4">
                  <EditableText
                    label="Description"
                    value={stat.description || ""}
                    onChange={(val) => handleStatUpdate(index, { description: val })}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6 border-t border-primary-100 pt-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}