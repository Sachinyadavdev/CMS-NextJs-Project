"use client";

import React, { useState } from "react";
import { StrategicConsultingCaseStudiesSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea, EditableColorPicker, EditableCheckbox } from "@/app/components/EditableInputs";
import SectionEditorLayout from "./SectionEditorLayout";
import { strategicTheme, strategicSectionWrapper, strategicContainer, strategicPanel } from "./StrategicConsultingTheme";

interface EditableStrategicConsultingCaseStudiesProps {
  section: StrategicConsultingCaseStudiesSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<StrategicConsultingCaseStudiesSection>) => void;
}

export default function EditableStrategicConsultingCaseStudiesSection({
  section,
  isEditing,
  onUpdate,
}: EditableStrategicConsultingCaseStudiesProps) {
  const content = section.content || {};
  const {
    title = "Success Stories",
    subtitle = "Real Results from Strategic Consulting Engagements",
    description = "Explore our portfolio of successful consulting projects that demonstrate our ability to drive transformative change and deliver measurable business outcomes.",
    caseStudies = [
      {
        id: "1",
        title: "Digital Transformation for Fortune 500 Retailer",
        client: "Global Retail Corp",
        industry: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
        challenge: "Legacy systems hindering growth and customer experience",
        solution: "Implemented omnichannel strategy with modern tech stack",
        results: [
          "40% increase in online sales",
          "60% improvement in customer satisfaction",
          "25% reduction in operational costs",
        ],
        duration: "12 months",
        team: "8 consultants",
        color: "#EF4130",
      },
      {
        id: "2",
        title: "Operational Excellence in Manufacturing",
        client: "Industrial Solutions Ltd",
        industry: "Manufacturing",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
        challenge: "Inefficient processes causing delays and quality issues",
        solution: "Lean manufacturing implementation and supply chain optimization",
        results: [
          "35% reduction in production time",
          "50% decrease in defect rates",
          "30% improvement in on-time delivery",
        ],
        duration: "8 months",
        team: "6 consultants",
        color: "#d63324",
      },
      {
        id: "3",
        title: "Financial Services Regulatory Compliance",
        client: "Premier Bank",
        industry: "Financial Services",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
        challenge: "Complex regulatory requirements and compliance gaps",
        solution: "Comprehensive compliance framework and risk management system",
        results: [
          "100% regulatory compliance achieved",
          "40% reduction in compliance costs",
          "Enhanced risk mitigation capabilities",
        ],
        duration: "10 months",
        team: "5 consultants",
        color: "#b52a1f",
      },
    ],
    backgroundColor = strategicTheme.pageBackground,
    textColor = strategicTheme.textSecondary,
    titleColor = strategicTheme.textPrimary,
    subtitleColor = strategicTheme.accent,
    showFilters = true,
    filters = ["All", "Retail", "Manufacturing", "Financial Services", "Healthcare", "Technology"],
  } = content;

  const [activeFilter, setActiveFilter] = useState("All");
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const toggleCardFlip = (id: string) => {
    const newFlipped = new Set(flippedCards);
    if (newFlipped.has(id)) {
      newFlipped.delete(id);
    } else {
      newFlipped.add(id);
    }
    setFlippedCards(newFlipped);
  };

  const filteredCaseStudies =
    activeFilter === "All"
      ? caseStudies
      : caseStudies.filter((study) => study.industry === activeFilter);

  if (!isEditing) {
    return (
      <section className={`${strategicSectionWrapper} pb-20`} style={{ backgroundColor }}>
        <div className={`${strategicContainer} px-4 sm:px-6 lg:px-8`}>
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-xl lg:text-2xl mb-6"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="text-lg max-w-3xl mx-auto leading-relaxed"
                style={{ color: textColor, opacity: 0.8 }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 border ${
                    activeFilter === filter
                      ? "text-white shadow-[0_15px_45px_rgba(239,65,48,0.35)] bg-[#EF4130] border-transparent"
                      : "text-white/70 border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((study, index) => (
              <div
                key={study.id}
                className="group h-96 cursor-pointer"
                style={{
                  perspective: "1000px",
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}
                onClick={() => toggleCardFlip(study.id)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    flippedCards.has(study.id) ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div
                          className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3"
                          style={{
                            backgroundColor: `${study.color}CC`,
                          }}
                        >
                          {study.industry}
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">
                          {study.title}
                        </h3>
                        <p className="text-sm opacity-90 mb-3">{study.client}</p>
                        <div className="flex items-center justify-between text-xs opacity-75">
                          <span>{study.duration}</span>
                          <span>{study.team}</span>
                        </div>
                      </div>

                      {/* Flip indicator */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                    <div
                      className="h-full rounded-xl p-6 flex flex-col justify-center text-white"
                      style={{ backgroundColor: study.color }}
                    >
                      <h3 className="text-xl font-bold mb-4">{study.title}</h3>

                      <div className="space-y-4 flex-1">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Challenge:</h4>
                          <p className="text-sm opacity-90">{study.challenge}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Solution:</h4>
                          <p className="text-sm opacity-90">{study.solution}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">Key Results:</h4>
                          <ul className="text-sm opacity-90 space-y-1">
                            {study.results?.map((result, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 mt-2 flex-shrink-0" />
                                {result}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs opacity-75 mt-4 pt-4 border-t border-white/20">
                        <span>{study.duration}</span>
                        <span>{study.team}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #EF4130 0%, #d63324 100%)",
              }}
            >
              View All Case Studies
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
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

          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }

          .backface-hidden {
            backface-visibility: hidden;
          }

          .rotate-y-180 {
            transform: rotateY(180deg);
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    return (
      <section className="py-12 rounded-3xl" style={{ backgroundColor }}>
        <div className={`${strategicContainer} max-w-4xl px-4`}>
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg mb-4" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {caseStudies.slice(0, 3).map((study) => (
              <div
                key={study.id}
                className={`${strategicPanel} shadow-md overflow-hidden`}
              >
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1" style={{ color: titleColor }}>{study.title}</h3>
                  <p className="text-xs" style={{ color: textColor }}>{study.client}</p>
                  <p className="text-xs mt-1" style={{ color: subtitleColor }}>{study.industry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <SectionEditorLayout
      title="Case Studies Section Editor"
      description="Curate success stories and styling"
      preview={
        <div className="h-full overflow-auto">
          {renderPreview()}
        </div>
      }
      previewWrapperClassName="relative h-[680px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
      controls={
        <>
        {/* Text Content Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="📝 Title"
              value={title}
              onChange={(value) => handleContentUpdate({ title: value })}
              placeholder="Enter title..."
            />
            <EditableText
              label="📋 Subtitle"
              value={subtitle}
              onChange={(value) => handleContentUpdate({ subtitle: value })}
              placeholder="Enter subtitle..."
            />
            <EditableTextarea
              label="📄 Description"
              value={description}
              onChange={(value) => handleContentUpdate({ description: value })}
              placeholder="Enter description..."
            />
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            Settings
          </h3>
          <div className="space-y-4">
            <EditableCheckbox
              label="🔍 Show Filters"
              checked={showFilters}
              onChange={(value) => handleContentUpdate({ showFilters: value })}
            />
            {showFilters && (
              <EditableText
                label="🏷️ Filters (comma-separated)"
                value={filters.join(", ")}
                onChange={(value) => handleContentUpdate({ filters: value.split(",").map((f: string) => f.trim()) })}
                placeholder="All, Retail, Manufacturing..."
              />
            )}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Case Studies
          </h3>
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const newStudy = {
                    id: Date.now().toString(),
                    title: "New Case Study",
                    client: "Client Name",
                    industry: "Industry",
                    image: "",
                    challenge: "Business challenge",
                    solution: "Our solution",
                    results: ["Result 1", "Result 2"],
                    duration: "6 months",
                    team: "4 consultants",
                    color: "#EF4130",
                  };
                  handleContentUpdate({ caseStudies: [...caseStudies, newStudy] });
                }}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Add Case Study
              </button>
            </div>

            {caseStudies.map((study, index) => (
              <div key={study.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">Case Study {index + 1}</h5>
                  <button
                    onClick={() => {
                      const updatedStudies = caseStudies.filter((_, i) => i !== index);
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <EditableText
                    label="📝 Title"
                    value={study.title || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], title: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Case Study Title"
                  />
                  <EditableText
                    label="👤 Client"
                    value={study.client || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], client: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Client Name"
                  />
                  <EditableText
                    label="🏢 Industry"
                    value={study.industry || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], industry: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Industry"
                  />
                  <EditableColorPicker
                    label="🎨 Color"
                    value={study.color || "#EF4130"}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], color: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                  />
                  <EditableText
                    label="⏱️ Duration"
                    value={study.duration || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], duration: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="6 months"
                  />
                  <EditableText
                    label="👥 Team Size"
                    value={study.team || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], team: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="4 consultants"
                  />
                </div>

                <div className="space-y-4">
                  <EditableTextarea
                    label="⚠️ Challenge"
                    value={study.challenge || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], challenge: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Business challenge description"
                  />
                  <EditableTextarea
                    label="💡 Solution"
                    value={study.solution || ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], solution: value };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Solution description"
                  />
                  <EditableText
                    label="✅ Results (comma-separated)"
                    value={study.results ? study.results.join(", ") : ""}
                    onChange={(value) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = {
                        ...updatedStudies[index],
                        results: value.split(",").map((r: string) => r.trim()).filter((r: string) => r),
                      };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Result 1, Result 2, Result 3"
                  />
                </div>
                  <MediaUpload
                    label="Case Study Image"
                    type="image"
                    currentUrl={study.image}
                    onUpload={(url) => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], image: url };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    onRemove={() => {
                      const updatedStudies = [...caseStudies];
                      updatedStudies[index] = { ...updatedStudies[index], image: "" };
                      handleContentUpdate({ caseStudies: updatedStudies });
                    }}
                    placeholder="Or paste image URL..."
                  />
                </div>
              // </div>
            ))}
          </div>
        </div>

        {/* Styling & Colors Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableColorPicker
              label="🎨 Background Color"
              value={backgroundColor}
              onChange={(value) => handleContentUpdate({ backgroundColor: value })}
            />
            <EditableColorPicker
              label="📝 Text Color"
              value={textColor}
              onChange={(value) => handleContentUpdate({ textColor: value })}
            />
            <EditableColorPicker
              label="📋 Title Color"
              value={titleColor}
              onChange={(value) => handleContentUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="📝 Subtitle Color"
              value={subtitleColor}
              onChange={(value) => handleContentUpdate({ subtitleColor: value })}
            />
          </div>
        </div>
        </>
      }
    />
  );
}