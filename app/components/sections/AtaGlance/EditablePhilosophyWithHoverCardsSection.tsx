"use client";

import React, { useState } from "react";
import { HeroSection } from "@/lib/db";
import {
  EditableTextarea,
  EditableColorPicker,
  EditableSelect,
  EditableCheckbox,
  EditableRange,
} from "../../EditableInputs";
import { motion } from "framer-motion";

interface ValueCard {
  id: string;
  value: string;
  title?: string;
  description: string;
  icon?: string;
  valueColor?: string;
  alignment?: "left" | "center" | "right";
}

interface EditablePhilosophyWithHoverCardsProps {
  section: HeroSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<HeroSection>) => void;
}

const ValueCardComponent = ({ card }: { card: ValueCard }) => {
  return (
    <div className="group p-8 bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-50 via-primary-100 to-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {card.icon && (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <span className="text-white font-semibold text-lg">
                  {card.icon}
                </span>
              </div>
            )}
            {card.value && (
              <h3
                className="text-5xl md:text-6xl font-black leading-none transition-colors duration-300 group-hover:text-primary-600"
                style={{ color: card.valueColor || "#ff3333" }}
              >
                {card.value}
              </h3>
            )}
          </div>
        </div>
        <div
          className={`space-y-4 ${
            card.alignment ? `text-${card.alignment}` : "text-left"
          }`}
        >
          {card.title && (
            <h4 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-800">
              {card.title}
            </h4>
          )}
          {card.description && (
            <p className="text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
              {card.description.split("\n").map((line, lineIndex) => (
                <span key={lineIndex}>
                  {line}
                  {lineIndex < card.description.split("\n").length - 1 && (
                    <br className="mb-2" />
                  )}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EditablePhilosophyWithHoverCardsSection({
  section,
  isEditing,
  onUpdate,
}: EditablePhilosophyWithHoverCardsProps) {
  const content = section.content || {};

  const layoutDirection = content.layoutDirection || "left-philosophy";

  const defaultText =
    "We believe that the true measure of progress is how it uplifts the people and communities it touches. From bustling corporate campuses to vibrant public spaces, our work is guided by a simple yet powerful principle: build places where people feel a sense of belonging, inspiration and pride";

  const defaultCards: ValueCard[] = [
    {
      id: "1",
      value: "78%",
      description:
        "of customers prefer brands that prioritize social responsibility",
      valueColor: "#ef4130",
    },
    {
      id: "2",
      value: "25%",
      description:
        "Increase in social interaction in communities with quality public spaces",
      valueColor: "#ef4130",
    },
    {
      id: "3",
      value: "20%",
      description: "reduction in project delays through local partnerships",
      valueColor: "#ef4130",
    },
    {
      id: "4",
      value: "60%",
      description:
        "of employees feel more engaged in companies with strong CSR values",
      valueColor: "#ef4130",
    },
  ];

  const cards: any =
    Array.isArray(content.cards) && content.cards.length > 0
      ? (content.cards as ValueCard[])
      : defaultCards;

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleCardUpdate = (index: number, patch: Partial<ValueCard>) => {
    const updatedCards = cards.map((card: any, idx: number) =>
      idx === index ? { ...card, ...patch } : card
    );
    handleContentUpdate({ cards: updatedCards });
  };

  const handleAddCard = () => {
    const newCard: ValueCard = {
      id: Date.now().toString(),
      value: "0",
      description: "Update description",
      valueColor: "#ef4130",
    };
    handleContentUpdate({ cards: [...cards, newCard] });
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = cards.filter((_: any, idx: number) => idx !== index);
    handleContentUpdate({ cards: updatedCards });
  };

  const renderPhilosophyPreview = () => {
    const {
      text = defaultText,
      backgroundColor = "#1a1a1a",
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
      <section className="relative w-full py-20 overflow-hidden rounded-lg">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor,
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 text-center text-white">
          <div
            className={`space-y-8 ${
              animationEnabled ? "animate-fadeInUp" : ""
            }`}
          >
            <div className="relative">
              {content.showPhilosophy === "true" && (
                <div
                  className="absolute -top-8 -left-6 md:-left-10 text-7xl md:text-9xl font-serif opacity-50 leading-none pointer-events-none"
                  style={{ color: accentColor }}
                >
                  "
                </div>
              )}

              <blockquote
                className={`${
                  fontSizeClasses[fontSize as keyof typeof fontSizeClasses] ||
                  fontSizeClasses.base
                } leading-relaxed font-light tracking-wide max-w-4xl mx-auto relative px-8 md:px-12 py-6 italic`}
                style={{
                  lineHeight: "1.4",
                  color: textColor,
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {animationEnabled
                  ? text.split(" ").map((word, index) => (
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
                  : text}
              </blockquote>

              {content.showPhilosophy === "true" && (
                <div
                  className="absolute -bottom-6 -right-6 md:-right-10 text-7xl md:text-9xl font-serif opacity-50 leading-none pointer-events-none"
                  style={{ color: accentColor }}
                >
                  "
                </div>
              )}
            </div>

            {content.showPhilosophy === "true" && (
              <>
                <div className="flex items-center justify-center space-x-4">
                  <div
                    className="w-16 h-px"
                    style={{
                      background: `linear-gradient(to right, transparent, ${accentColor}, transparent)`,
                      animation: animationEnabled
                        ? "slideInLeft 1s ease-out 2.5s forwards"
                        : "none",
                      opacity: animationEnabled ? 0 : 1,
                    }}
                  />

                  <div
                    className="w-3 h-3 rounded-full border-2 transform rotate-45"
                    style={{
                      borderColor: accentColor,
                      backgroundColor: `${accentColor}30`,
                      animation: animationEnabled
                        ? "delayedFadeIn 1s ease-out 3s forwards"
                        : "none",
                      opacity: animationEnabled ? 0 : 1,
                    }}
                  />

                  <div
                    className="w-16 h-px"
                    style={{
                      background: `linear-gradient(to left, transparent, ${accentColor}, transparent)`,
                      animation: animationEnabled
                        ? "slideInRight 1s ease-out 2.5s forwards"
                        : "none",
                      opacity: animationEnabled ? 0 : 1,
                    }}
                  />
                </div>

                <div
                  className="text-sm font-medium opacity-75 tracking-wider"
                  style={{
                    color: accentColor,
                    animation: animationEnabled
                      ? "fadeInUp 1s ease-out 3.5s forwards"
                      : "none",
                    opacity: animationEnabled ? 0 : 0.75,
                  }}
                >
                  — Our Philosophy
                </div>
              </>
            )}
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
            0%,
            50% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
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

  const renderValueCardsPreview = () => {
    const previewCards = cards.slice(0, 4);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previewCards.map((card: any) => (
          <ValueCardComponent key={card.id} card={card} />
        ))}
      </div>
    );
  };

  if (!isEditing) {
    const philosophySection = (
      <div className="flex items-center justify-center">
        {renderPhilosophyPreview()}
      </div>
    );

    const cardsSection = (
      <div className="px-4 max-w-7xl mx-auto">{renderValueCardsPreview()}</div>
    );

    return (
      <section className="w-full py-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4 items-start ${
            layoutDirection === "right-philosophy" ? "lg:grid-flow-dense" : ""
          }`}
        >
          {layoutDirection === "left-philosophy" ? (
            <>
              <div>{philosophySection}</div>
              <div>{cardsSection}</div>
            </>
          ) : (
            <>
              <div>{cardsSection}</div>
              <div>{philosophySection}</div>
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      <div
        className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${
          layoutDirection === "right-philosophy" ? "lg:grid-flow-dense" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`${
            layoutDirection === "right-philosophy"
              ? "lg:col-start-3 lg:col-span-1"
              : "lg:col-span-1"
          } space-y-4`}
        >
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Preview
            </h3>
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse" />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8 space-y-4">
            <div className="p-4 border-b">
              <h4 className="text-sm font-semibold text-gray-600">
                Philosophy Section
              </h4>
              <div className="mt-3 max-h-64 overflow-y-auto">
                {renderPhilosophyPreview()}
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-600">
                Statistics Cards (2 per row)
              </h4>
              <div className="mt-3">{renderValueCardsPreview()}</div>
            </div>
          </div>
        </motion.div>

        <div
          className={`${
            layoutDirection === "right-philosophy"
              ? "lg:col-start-1 lg:col-span-2"
              : "lg:col-span-2"
          } space-y-6`}
        >
          {/* Philosophy Settings */}
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

          {/* Background Color */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2" />
              Background
            </h3>
            <div className="space-y-4">
              <EditableColorPicker
                label="Background Color"
                value={content.backgroundColor || "#1a1a1a"}
                onChange={(val) =>
                  handleContentUpdate({ backgroundColor: val })
                }
              />
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
                checked={
                  content.animationEnabled !== undefined
                    ? content.animationEnabled
                    : true
                }
                onChange={(val) =>
                  handleContentUpdate({ animationEnabled: val })
                }
              />
            </div>
          </div>

          {/* Value Cards Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full mr-2" />
                Statistics Cards (2 per row)
              </h3>
              <button
                type="button"
                onClick={handleAddCard}
                className="rounded-lg border border-fuchsia-400 px-4 py-2 text-sm font-semibold text-fuchsia-700 transition hover:bg-fuchsia-50"
              >
                Add Stat
              </button>
            </div>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {cards.map((card: any, index: number) => (
                <div
                  key={card.id}
                  className="space-y-4 rounded-lg border bg-gray-50 p-5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Stat {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(index)}
                      className="text-sm text-red-600 transition hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm text-gray-700">
                      Value
                      <input
                        type="text"
                        value={card.value || ""}
                        onChange={(event) =>
                          handleCardUpdate(index, { value: event.target.value })
                        }
                        className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                        placeholder="e.g. 78%"
                      />
                    </label>
                    <label className="flex flex-col gap-2 text-sm text-gray-700">
                      Value Color
                      <input
                        type="text"
                        value={card.valueColor || ""}
                        onChange={(event) =>
                          handleCardUpdate(index, {
                            valueColor: event.target.value,
                          })
                        }
                        className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                        placeholder="#ef4130"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Title (Optional)
                    <input
                      type="text"
                      value={card.title || ""}
                      onChange={(event) =>
                        handleCardUpdate(index, { title: event.target.value })
                      }
                      className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Icon (Optional)
                    <input
                      type="text"
                      value={card.icon || ""}
                      onChange={(event) =>
                        handleCardUpdate(index, { icon: event.target.value })
                      }
                      className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                      placeholder="e.g. ⭐"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Description
                    <textarea
                      value={card.description || ""}
                      onChange={(event) =>
                        handleCardUpdate(index, {
                          description: event.target.value,
                        })
                      }
                      rows={3}
                      className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-700">
                    Alignment
                    <select
                      value={card.alignment || "left"}
                      onChange={(event) =>
                        handleCardUpdate(index, {
                          alignment: event.target.value as
                            | "left"
                            | "center"
                            | "right",
                        })
                      }
                      className="rounded-lg border bg-white px-4 py-3 text-gray-900 focus:border-fuchsia-500 focus:outline-none"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
