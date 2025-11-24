"use client";

import React from "react";
import { AboveFooterSection } from "@/lib/db";
import ReadMoreImg from "../../assets/ReadMoreButton.png";
import Image from "next/image";
import MediaUpload from "../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableCheckbox,
} from "@/app/components/EditableInputs";
import Link from "next/link";

interface EditableAboveFooterProps {
  section: AboveFooterSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<AboveFooterSection>) => void;
}

export default function EditableAboveFooterSection({
  section,
  isEditing,
  onUpdate,
}: EditableAboveFooterProps) {
  const content = section.content || {};

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  if (!isEditing) {
    const {
      title = "",
      description = "",
      titleColor = "#ffffff",
      descriptionColor = "#ffffff",
      titleFontSize = "48px",
      descriptionFontSize = "18px",
      alignment = "left",
      backgroundImage = "",
      backgroundColor = "transparent",
      contentBackgroundColor = "#000000",
      showButton = false,
      buttonText = "Read More",
      buttonUrl = "#",
      height = "600px",
      marginTop = "0px",
    } = content;

    const handleButtonClick = () => {
      if (buttonUrl && buttonUrl !== "#") {
        window.location.href = buttonUrl;
      }
    };

    return (
      <section
        className="relative overflow-hidden h-auto lg:h-full"
        style={{
          marginTop,
          backgroundColor,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 h-auto lg:h-full">
          {/* Left Side - Image */}
          <div className="relative overflow-hidden w-full h-[40vh] lg:h-full min-h-[300px] lg:col-span-2">
            {backgroundImage ? (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${backgroundImage.replace(
                    /\\/g,
                    "/"
                  )}")`,
                }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-300" />
            )}
          </div>

          {/* Right Side - Content */}
          <div
            className="flex items-center justify-center px-4 sm:px-8 lg:px-16 py-8 lg:py-12 w-full lg:col-span-3"
            style={{
              backgroundColor: contentBackgroundColor,
            }}
          >
            <div
              className={`max-w-lg w-full ${
                alignment === "center"
                  ? "text-center"
                  : alignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {/* Title */}
              <h2
                className="mb-4 lg:mb-6 leading-tight text-2xl sm:text-3xl lg:text-5xl"
                style={{
                  fontSize: titleFontSize,
                  lineHeight: 1.3,
                }}
              >
                {title.includes("RAUS") ? (
                  <>
                    {title.split("RAUS").map((part, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <span style={{ color: "#ef4130" }}>RAUS</span>
                        )}
                        <span style={{ color: titleColor }}>{part}</span>
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <span style={{ color: titleColor }}>{title}</span>
                )}
              </h2>

              {/* Description */}
              {description && (
                <p
                  className="leading-relaxed mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg"
                  style={{
                    color: descriptionColor,
                    fontSize: descriptionFontSize,
                  }}
                >
                  {description}
                </p>
              )}
              <div className="flex items-center justify-center mx-auto">
                <div
                  className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:opacity-80"
                  onClick={handleButtonClick}
                >
                  <Image
                    src={ReadMoreImg}
                    alt="read more button"
                    width={100}
                    height={100}
                  />
                </div>
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
      title = "Sample Title",
      description = "Sample description for the above footer section.",
      titleColor = "#ffffff",
      descriptionColor = "#ffffff",
      titleFontSize = "32px", // Smaller for preview
      descriptionFontSize = "16px",
      alignment = "left",
      backgroundImage = "",
      backgroundColor = "transparent",
      contentBackgroundColor = "#000000",
      showButton = false,
      buttonText = "Read More",
      buttonUrl = "#",
      height = "300px", // Smaller height for preview
      marginTop = "0px",
    } = content;

    return (
      <section
        className="relative overflow-hidden h-auto rounded-lg"
        style={{
          backgroundColor,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 h-auto">
          {/* Left Side - Image */}
          <div className="relative overflow-hidden w-full h-[200px] min-h-[200px] lg:col-span-2">
            {backgroundImage ? (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("${backgroundImage.replace(
                    /\\/g,
                    "/"
                  )}")`,
                }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No background image</span>
              </div>
            )}
          </div>

          {/* Right Side - Content */}
          <div
            className="flex items-center justify-center px-4 py-6 w-full lg:col-span-3"
            style={{
              backgroundColor: contentBackgroundColor,
            }}
          >
            <div
              className={`max-w-lg w-full ${
                alignment === "center"
                  ? "text-center"
                  : alignment === "right"
                  ? "text-right"
                  : "text-left"
              }`}
            >
              {/* Title */}
              <h2
                className="mb-3 leading-tight text-lg sm:text-xl"
                style={{
                  fontSize: titleFontSize,
                  lineHeight: 1.3,
                }}
              >
                {title.includes("RAUS") ? (
                  <>
                    {title.split("RAUS").map((part, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <span style={{ color: "#ef4130" }}>RAUS</span>
                        )}
                        <span style={{ color: titleColor }}>{part}</span>
                      </React.Fragment>
                    ))}
                  </>
                ) : (
                  <span style={{ color: titleColor }}>{title}</span>
                )}
              </h2>

              {/* Description */}
              {description && (
                <p
                  className="leading-relaxed mb-4 text-sm"
                  style={{
                    color: descriptionColor,
                    fontSize: descriptionFontSize,
                  }}
                >
                  {description}
                </p>
              )}

              {/* Button or Image */}
              {showButton ? (
                
                <button
                  className="px-4 py-2 rounded transition-colors"
                  style={{
                    color: content.buttonTextColor || "#ef4130",
                    backgroundColor:
                      content.buttonBackgroundColor || "transparent",
                    fontSize: content.buttonFontSize || "1rem",
                    border: `1px solid ${content.buttonTextColor || "#ef4130"}`,
                  }}
                >
                  {buttonText}
                </button>
              ) : (
                <div className="flex items-center justify-center mx-auto w-16">
                  <div className="cursor-pointer transition-transform duration-300 hover:scale-110 hover:opacity-80">
                    
                      <Image
                        src={ReadMoreImg}
                        alt="read more button"
                        width={60}
                        height={60}
                        className="cursor-pointer"
                      />
                  
                  </div>
                </div>
              )}
            </div>
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
          <span className="h-3 w-3 rounded-full bg-red-400/40" />
        </div>
        {renderPreview()}
      </div>

      {/* Editing Controls */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            Edit Above Footer Section
          </h3>
          <span className="h-3 w-3 rounded-full bg-red-400/40" />
        </div>
        <div className="space-y-6">
          <EditableTextarea
            label="Title"
            value={content.title || ""}
            onChange={(val) => handleContentUpdate({ title: val })}
            rows={3}
            placeholder="Enter your title here... (Use 'RAUS' to make it appear in red)"
            helperText="Tip: Include 'RAUS' in your title to automatically highlight it in red. Use line breaks for multi-line titles."
          />
          <EditableTextarea
            label="Description"
            value={content.description || ""}
            onChange={(val) => handleContentUpdate({ description: val })}
            rows={4}
            placeholder="Enter your description here..."
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
              onChange={(val) =>
                handleContentUpdate({ descriptionFontSize: val })
              }
              placeholder="18px"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={content.backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
              onRemove={() => handleContentUpdate({ backgroundImage: "" })}
              placeholder="Upload background image or paste URL..."
              maxSize="10MB"
              supportedFormats="PNG, JPG, WebP"
              className=""
            />
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "transparent"}
              onChange={(val) => handleContentUpdate({ backgroundColor: val })}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EditableColorPicker
              label="Content Background Color"
              value={content.contentBackgroundColor || "#000000"}
              onChange={(val) =>
                handleContentUpdate({ contentBackgroundColor: val })
              }
            />
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
          </div>

          {/* Button Settings */}
          <div className="border-t border-red-100 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Button Settings
            </h4>
            <EditableCheckbox
              label="Show Call-to-Action Button"
              checked={Boolean(content.showButton)}
              onChange={(val) => handleContentUpdate({ showButton: val })}
            />

            {content.showButton && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-4">
                <EditableText
                  label="Button Text"
                  value={content.buttonText || ""}
                  onChange={(val) => handleContentUpdate({ buttonText: val })}
                  placeholder="Read More"
                />
                <EditableText
                  label="Button Link"
                  value={content.buttonUrl || ""}
                  onChange={(val) => handleContentUpdate({ buttonUrl: val })}
                  placeholder="https://example.com"
                />
                <EditableColorPicker
                  label="Button Text Color"
                  value={content.buttonTextColor || "#ef4130"}
                  onChange={(val) =>
                    handleContentUpdate({ buttonTextColor: val })
                  }
                />
                <EditableColorPicker
                  label="Button Background Color"
                  value={content.buttonBackgroundColor || "transparent"}
                  onChange={(val) =>
                    handleContentUpdate({ buttonBackgroundColor: val })
                  }
                />
                <EditableText
                  label="Button Font Size"
                  value={content.buttonFontSize || ""}
                  onChange={(val) =>
                    handleContentUpdate({ buttonFontSize: val })
                  }
                  placeholder="1rem"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          </div>

          {/* Save Button */}
          <div className="mt-6 border-t border-red-100 pt-4">
            <button
              type="button"
              onClick={handleSaveChanges}
              className="rounded-lg bg-red-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
