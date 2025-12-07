"use client";

import React from "react";
import { ValueCardSection, ValueCardItem, TailwindBreakpoint } from "@/lib/db";
import {
  EditableText,
  EditableColorPicker,
  EditableSelect,
  EditableTextarea,
  EditableNumber,
} from "@/app/components/EditableInputs";

interface EditableValueStatsCardProps {
  section: ValueCardSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ValueCardSection>) => void;
}

const extractItems = (
  content: ValueCardSection["content"]
): ValueCardItem[] => {
  if (!content) return [];
  if (Array.isArray(content.items)) return content.items;
  const potential = Object.values(content)
    .filter((value) => typeof value === "object" && value !== null)
    .map((value) => value as ValueCardItem);
  return potential.filter((item) => item && (item.value || item.description));
};

const getGridClasses = (
  columns: Partial<Record<keyof TailwindBreakpoint, number>>
) => {
  const baseCols = columns.base || 1;
  const smCols = columns.sm || baseCols;
  const mdCols = columns.md || smCols;
  const lgCols = columns.lg || mdCols;
  const xlCols = columns.xl || lgCols;

  return `grid-cols-${baseCols} sm:grid-cols-${smCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols} xl:grid-cols-${xlCols}`;
};

const ValueStatsCardPreview = ({
  content,
}: {
  content: ValueCardSection["content"];
}) => {
  const items = extractItems(content);
  const title = content?.title;
  const subtitle = content?.subtitle;
  const columns = content?.columns || {};
  const backgroundColor = content?.backgroundColor || "#ffffff";
  const titleColor = content?.titleColor || "#1f2937";
  const subtitleColor = content?.subtitleColor || "#6b7280";
  const cardBgColor = content?.cardBgColor || "#ffffff";
  const cardBorderColor = content?.cardBorderColor || "#e5e7eb";
  const accentColor = content?.accentColor || "#ef4130";

  return (
    <section className="py-12 px-4 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
        />
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${accentColor}, transparent)`,
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: titleColor }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Cards Grid */}
        <div className={`grid gap-8 ${getGridClasses(columns)}`}>
          {items.map((item, index) => (
            <div
              key={`${item.value}-${index}`}
              className="group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
              style={{
                backgroundColor: cardBgColor,
                border: `2px solid ${cardBorderColor}`,
              }}
            >
              {/* Hover Background Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{ background: accentColor }}
              />

              {/* Content Container */}
              <div className="relative z-10">
                {/* Icon and Value Row */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Icon */}
                  {item.icon && (
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accentColor}15` }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                  )}

                  {/* Big Value */}
                  {item.value && (
                    <div
                      className="text-5xl md:text-6xl font-black leading-none transition-colors duration-300 group-hover:opacity-90"
                      style={{ color: item.valueColor || accentColor }}
                    >
                      {item.value}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div
                  className={`space-y-3 ${
                    item.alignment === "center"
                      ? "text-center"
                      : item.alignment === "right"
                        ? "text-right"
                        : "text-left"
                  }`}
                >
                  {item.title && (
                    <h3
                      className="text-xl font-bold transition-colors duration-300"
                      style={{ color: titleColor }}
                    >
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p
                      className="text-base leading-relaxed transition-colors duration-300"
                      style={{ color: subtitleColor }}
                    >
                      {item.description.split("\n").map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < item.description!.split("\n").length - 1 && (
                            <br className="mb-2" />
                          )}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function EditableValueStatsCard({
  section,
  isEditing,
  onUpdate,
}: EditableValueStatsCardProps) {
  const content = section.content || {};
  const items = extractItems(content);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleItemUpdate = (index: number, patch: Partial<ValueCardItem>) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, ...patch } : item
    );
    handleContentUpdate({ items: updatedItems });
  };

  const handleAddItem = () => {
    const newItem: ValueCardItem = {
      value: "50%",
      description: "Update description",
      title: "New Stat",
      icon: "📊",
      alignment: "left",
    };
    handleContentUpdate({ items: [...items, newItem] });
  };

  const handleRemoveItem = (index: number) => {
    handleContentUpdate({ items: items.filter((_, idx) => idx !== index) });
  };

  if (!isEditing) {
    return <ValueStatsCardPreview content={content} />;
  }

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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden max-h-96 overflow-y-auto">
          <ValueStatsCardPreview content={content} />
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Section Header
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(value) => handleContentUpdate({ title: value })}
            />
            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(value) => handleContentUpdate({ subtitle: value })}
            />
          </div>
        </div>

        {/* Colors Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mr-2" />
            Colors & Styling
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "#ffffff"}
              onChange={(value) =>
                handleContentUpdate({ backgroundColor: value })
              }
            />
            <EditableColorPicker
              label="Title Color"
              value={content.titleColor || "#1f2937"}
              onChange={(value) => handleContentUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="Card Background"
              value={content.cardBgColor || "#ffffff"}
              onChange={(value) => handleContentUpdate({ cardBgColor: value })}
            />
            <EditableColorPicker
              label="Accent Color"
              value={content.accentColor || "#ef4130"}
              onChange={(value) => handleContentUpdate({ accentColor: value })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={content.subtitleColor || "#6b7280"}
              onChange={(value) =>
                handleContentUpdate({ subtitleColor: value })
              }
            />
            <EditableColorPicker
              label="Card Border Color"
              value={content.cardBorderColor || "#e5e7eb"}
              onChange={(value) =>
                handleContentUpdate({ cardBorderColor: value })
              }
            />
          </div>
        </div>

        {/* Layout Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            Layout & Grid
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {(["base", "sm", "md", "lg", "xl"] as const).map((key) => (
              <EditableNumber
                key={key}
                label={`${key.toUpperCase()} Cols`}
                value={(content.columns?.[key] as number) || 0}
                onChange={(value) =>
                  handleContentUpdate({
                    columns: {
                      ...content.columns,
                      [key]: value || undefined,
                    },
                  })
                }
                min={1}
                max={6}
              />
            ))}
          </div>
        </div>

        {/* Items Management Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Stats Cards
            </h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all font-medium"
            >
              Add Card
            </button>
          </div>
          <div className="space-y-6 max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <div
                key={`${item.value}-${index}`}
                className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Card {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableText
                      label="Value (e.g., 50%, 100)"
                      value={item.value || ""}
                      onChange={(value) =>
                        handleItemUpdate(index, { value })
                      }
                    />
                    <EditableColorPicker
                      label="Value Color"
                      value={item.valueColor || "#ef4130"}
                      onChange={(value) =>
                        handleItemUpdate(index, { valueColor: value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EditableText
                      label="Icon (emoji)"
                      value={item.icon || ""}
                      onChange={(value) =>
                        handleItemUpdate(index, { icon: value })
                      }
                      placeholder="e.g., 📊"
                    />
                    <EditableSelect
                      label="Alignment"
                      value={item.alignment || "left"}
                      onChange={(value) =>
                        handleItemUpdate(index, {
                          alignment: value as "left" | "center" | "right",
                        })
                      }
                      options={[
                        { label: "Left", value: "left" },
                        { label: "Center", value: "center" },
                        { label: "Right", value: "right" },
                      ]}
                    />
                  </div>

                  <EditableText
                    label="Title"
                    value={item.title || ""}
                    onChange={(value) =>
                      handleItemUpdate(index, { title: value })
                    }
                  />

                  <EditableTextarea
                    label="Description"
                    value={item.description || ""}
                    onChange={(value) =>
                      handleItemUpdate(index, { description: value })
                    }
                    rows={3}
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
