"use client";

import { useState } from "react";
import type { PageSection } from "@/lib/db";

interface SectionManagerProps {
  sections: PageSection[];
  onUpdate: (sections: PageSection[]) => void;
}

const SECTION_TYPES = [
  { id: "hero", label: "Hero Section" },
  { id: "text", label: "Text Section" },
  { id: "card", label: "Card Section" },
  { id: "who-we-are", label: "Who We Are" },
  { id: "home-about", label: "Home About" },
  { id: "home-services", label: "Home Services" },
  { id: "home-sustainable-legacy", label: "Sustainable Legacy" },
  { id: "double-heading", label: "Double Heading" },
  { id: "hover-card", label: "Hover Card" },
  { id: "inner-banner-text", label: "Inner Banner Text" },
  { id: "banner-with-stats", label: "Banner with Stats" },
  { id: "above-footer", label: "Above Footer" },
  { id: "dual-header-img", label: "Dual Header Image" },
  { id: "value-card", label: "Value Card" },
  { id: "at-a-glance-hero", label: "At a Glance Hero" },
  { id: "at-a-glance-service", label: "At a Glance Service" },
  { id: "editable-philosophy", label: "Philosophy" },
  { id: "contact-page-banner", label: "Contact Banner" },
  { id: "contact-text-area", label: "Contact Text Area" },
  { id: "contact-address-section-1", label: "Contact Address" },
  { id: "contact-form", label: "Contact Form" },
  { id: "real-estate-hero", label: "Real Estate Hero" },
  { id: "real-estate-integration", label: "Real Estate Integration" },
  { id: "real-estate-architectural", label: "Real Estate Architectural" },
  { id: "real-estate-innovation", label: "Real Estate Innovation" },
  { id: "real-estate-design-build", label: "Real Estate Design Build" },
  { id: "real-estate-portfolio", label: "Real Estate Portfolio" },
  { id: "strategic-consulting-hero", label: "Strategic Consulting Hero" },
  { id: "strategic-consulting-services", label: "Strategic Consulting Services" },
  { id: "strategic-consulting-expertise", label: "Strategic Consulting Expertise" },
  { id: "strategic-consulting-case-studies", label: "Strategic Consulting Cases" },
  { id: "strategic-consulting-methodology", label: "Strategic Consulting Methodology" },
  { id: "our-value-hero-banner", label: "Our Value Hero" },
  { id: "our-core-values", label: "Our Core Values" },
  { id: "corporate-governance", label: "Corporate Governance" },
  { id: "DigitalGovernanceSection", label: "Digital Governance" },
  { id: "CSRSection", label: "CSR Section" },
  { id: "partnership-hero", label: "Partnership Hero" },
  { id: "partnership-philosophy", label: "Partnership Philosophy" },
  { id: "our-partner-ecosystem", label: "Partner Ecosystem" },
  { id: "collaborating-with-purpose", label: "Collaborating with Purpose" },
  { id: "WhyChooseRaus", label: "Why Choose Raus" },
  { id: "CallToAction", label: "Call to Action" },
  { id: "DigitalTransformationHeroBanner", label: "Digital Transformation Hero" },
  { id: "ParagraphSectionFirst", label: "Paragraph Section" },
  { id: "DigitalTransformationApproach", label: "DT Approach" },
  { id: "DigitalTransformationFeatures", label: "DT Features" },
  { id: "WhyRausDigitalTransformation", label: "Why Raus DT" },
  { id: "project-coordination-hero", label: "Project Coordination Hero" },
  { id: "project-coordination-core", label: "Project Coordination Core" },
  { id: "project-coordination-approach", label: "Project Coordination Approach" },
  { id: "approval-standards", label: "Approval Standards" },
  { id: "governance-commitment", label: "Governance Commitment" },
  { id: "infrastructure-resource-hero", label: "Infrastructure Hero" },
  { id: "infrastructure-resource-services", label: "Infrastructure Services" },
  { id: "infrastructure-resource-projects", label: "Infrastructure Projects" },
  { id: "infrastructure-resource-capabilities", label: "Infrastructure Capabilities" },
  { id: "infrastructure-resource-sustainability", label: "Infrastructure Sustainability" },
  { id: "infrastructure-resource-vision", label: "Infrastructure Vision" },
  { id: "infrastructure-resource-paragraph", label: "Infrastructure Paragraph" },
  { id: "environment-sustainability-hero", label: "Environment Sustainability Hero" },
  { id: "environment-sustainability-core", label: "Environment Sustainability Core" },
  { id: "environment-sustainability-planning", label: "Environment Planning" },
  { id: "environment-sustainability-carbon", label: "Environment Carbon" },
  { id: "environment-sustainability-practices", label: "Environment Practices" },
  { id: "environment-sustainability-building", label: "Environment Building" },
  { id: "environment-sustainability-sdgs", label: "Environment SDGs" },
  { id: "environment-sustainability-commitment", label: "Environment Commitment" },
  { id: "project", label: "Project" },
  { id: "projects-hero", label: "Projects Hero" },
  { id: "bharat-mart", label: "Bharat Mart" },
  { id: "dubai-exhibition-centre", label: "Dubai Exhibition Centre" },
  { id: "anantara-resort", label: "Anantara Resort" },
  { id: "solution-smart-ops", label: "Solution Smart Ops" },
  { id: "oxagon", label: "Oxagon" },
  { id: "wynn-al-marjan", label: "Wynn Al Marjan" },
  { id: "strategic-advantages-hero", label: "Strategic Advantages Hero" },
  { id: "integrated-delivery-model", label: "Integrated Delivery Model" },
  { id: "innovation-driven-execution", label: "Innovation Driven Execution" },
  { id: "client-centric-collaboration", label: "Client Centric Collaboration" },
  { id: "sustainability-at-the-core", label: "Sustainability at Core" },
  { id: "agility-adaptability", label: "Agility & Adaptability" },
  { id: "community-hero", label: "Community Hero" },
  { id: "human-centered-development", label: "Human Centered Development" },
  { id: "corporate-social-responsibility", label: "Corporate Social Responsibility" },
  { id: "inclusive-accessible-design", label: "Inclusive Design" },
  { id: "public-spaces-with-purpose", label: "Public Spaces" },
  { id: "collaborative-community-partnerships", label: "Community Partnerships" },
];

export default function SectionManager({ sections, onUpdate }: SectionManagerProps) {
  const [newSectionType, setNewSectionType] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddSection = () => {
    if (!newSectionType) return;

    const newSection: PageSection = {
      id: `section-${Date.now()}`,
      type: newSectionType,
      content: {},
      hidden: false,
      order: sections.length,
    };

    onUpdate([...sections, newSection]);
    setNewSectionType("");
  };

  const handleDeleteSection = (index: number) => {
    const updated = sections.filter((_, i) => i !== index);
    onUpdate(updated.map((s, i) => ({ ...s, order: i })));
  };

  const handleToggleHidden = (index: number) => {
    const updated = [...sections];
    updated[index] = {
      ...updated[index],
      hidden: !updated[index].hidden,
    };
    onUpdate(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updated = [...sections];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, draggedItem);

    onUpdate(updated.map((s, i) => ({ ...s, order: i })));
    setDraggedIndex(null);
  };

  const getTypeLabel = (type: string) => {
    return SECTION_TYPES.find((t) => t.id === type)?.label || type;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-primary-25">
        <h2 className="text-lg font-semibold text-gray-900">Manage Sections</h2>
        <p className="text-sm text-gray-600 mt-1">
          Organize, add, and manage sections. Drag to reorder.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Add Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Add New Section</h3>
          <div className="flex gap-2">
            <select
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value)}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
            >
              <option value="">Select a section type...</option>
              {SECTION_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddSection}
              disabled={!newSectionType}
              className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add
            </button>
          </div>
        </div>

        {/* Sections List */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Sections ({sections.length})
          </h3>
          {sections.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <svg
                className="w-12 h-12 mx-auto text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600 font-medium">No sections added yet</p>
              <p className="text-gray-500 text-sm">Add your first section above to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`p-4 border rounded-lg transition-all duration-200 cursor-move ${
                    draggedIndex === index
                      ? "bg-primary-50 border-primary-300 opacity-50"
                      : "bg-white border-gray-300 hover:border-gray-400 hover:shadow-sm"
                  } ${section.hidden ? "bg-gray-50" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M3 2a1 1 0 000 2h14a1 1 0 100-2H3z" />
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-semibold truncate ${
                            section.hidden ? "text-gray-400 line-through" : "text-gray-900"
                          }`}
                        >
                          {getTypeLabel(section.type)}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{section.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <button
                        onClick={() => handleDeleteSection(index)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Tips:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Drag sections to reorder them</li>
                <li>Click the eye icon to hide/show sections (hidden sections won't render)</li>
                <li>Click the trash icon to delete sections permanently</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
