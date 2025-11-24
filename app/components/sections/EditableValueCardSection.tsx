"use client";

import React from "react";
import { ValueCardSection, ValueCardItem, TailwindBreakpoint } from "@/lib/db";

interface EditableValueCardProps {
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

// Preview Component - Extracted for reuse
const ValueCardPreview = ({ content }: { content: ValueCardSection["content"] }) => {
  const items = extractItems(content);
  const title = content?.title;
  const subtitle = content?.subtitle;
  const columns = content?.columns || {};

  return (
    <section className="py-5 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-primary-800 to-gray-900 bg-clip-text text-transparent mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {/* Cards Grid */}
        <div className={`grid gap-8 ${getGridClasses(columns)}`}>
          {items.map((item, index) => (
            <div
              key={`${item.value}-${index}`}
              className="group p-8 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl relative overflow-hidden"
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              {/* Content Container */}
              <div className="relative z-10">
                {/* Icon/Number Container */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {/* Optional Icon */}
                    {item.icon && (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <span className="text-white font-semibold text-lg">
                          {item.icon}
                        </span>
                      </div>
                    )}
                    {/* Value Number */}
                    {item.value && (
                      <h3
                        className="text-5xl md:text-6xl font-black leading-none transition-colors duration-300 group-hover:text-primary-600"
                        style={{ color: item.valueColor || "#ff3333" }}
                      >
                        {item.value}
                      </h3>
                    )}
                  </div>
                </div>
                {/* Description */}
                <div
                  className={`space-y-4 ${
                    item.alignment ? `text-${item.alignment}` : "text-left"
                  }`}
                >
                  {item.title && (
                    <h4 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
                      {item.title}
                    </h4>
                  )}
                  {item.description && (
                    <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                      {item.description.split("\n").map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex <
                            item.description!.split("\n").length - 1 && (
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

export default function EditableValueCardSection({
  section,
  isEditing,
  onUpdate,
}: EditableValueCardProps) {
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
      value: "0",
      description: "Update description",
      title: "New Title",
      icon: "",
      alignment: "left",
    };
    handleContentUpdate({ items: [...items, newItem] });
  };

  const handleRemoveItem = (index: number) => {
    handleContentUpdate({ items: items.filter((_, idx) => idx !== index) });
  };

  if (!isEditing) {
    return <ValueCardPreview content={content} />;
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
          <ValueCardPreview content={content} />
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(event) =>
                  handleContentUpdate({ title: event.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(event) =>
                  handleContentUpdate({ subtitle: event.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            Layout & Positioning
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {(["base", "sm", "md", "lg", "xl"] as const).map((key) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{key.toUpperCase()} Columns</label>
                <input
                  type="number"
                  min="1"
                  value={(content.columns?.[key] as number) || ""}
                  onChange={(event) =>
                    handleContentUpdate({
                      columns: {
                        ...content.columns,
                        [key]: event.target.value
                          ? Number(event.target.value)
                          : undefined,
                      },
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Items Management Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Items Management
            </h3>
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all"
            >
              Add Stat
            </button>
          </div>
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                key={`${item.value}-${index}`}
                className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Entry {index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="px-3 py-1 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Value</label>
                    <input
                      type="text"
                      value={item.value || ""}
                      onChange={(event) =>
                        handleItemUpdate(index, { value: event.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Value Color</label>
                    <input
                      type="text"
                      value={item.valueColor || ""}
                      onChange={(event) =>
                        handleItemUpdate(index, { valueColor: event.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Icon</label>
                    <input
                      type="text"
                      value={item.icon || ""}
                      onChange={(event) =>
                        handleItemUpdate(index, { icon: event.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="e.g., ⭐"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(event) =>
                        handleItemUpdate(index, { title: event.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Alignment</label>
                    <select
                      value={item.alignment || "left"}
                      onChange={(event) =>
                        handleItemUpdate(index, { alignment: event.target.value as "left" | "center" | "right" })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={item.description || ""}
                      onChange={(event) =>
                        handleItemUpdate(index, { description: event.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}