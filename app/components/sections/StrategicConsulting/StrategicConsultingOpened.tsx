"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import EditableStrategicConsultingHeroSection from "./EditableStrategicConsultingHeroSection";
import EditableStrategicConsultingServicesSection from "./EditableStrategicConsultingServicesSection";
import EditableStrategicConsultingExpertiseSection from "./EditableStrategicConsultingExpertiseSection";
import EditableStrategicConsultingCaseStudiesSection from "./EditableStrategicConsultingCaseStudiesSection";
import EditableStrategicConsultingMethodologySection from "./EditableStrategicConsultingMethodologySection";
import {
  StrategicConsultingHeroSection,
  StrategicConsultingServicesSection,
  StrategicConsultingExpertiseSection,
  StrategicConsultingCaseStudiesSection,
  StrategicConsultingMethodologySection,
} from "@/lib/db";

interface Props {
  sections: {
    hero: StrategicConsultingHeroSection;
    services: StrategicConsultingServicesSection;
    expertise: StrategicConsultingExpertiseSection;
    caseStudies: StrategicConsultingCaseStudiesSection;
    methodology: StrategicConsultingMethodologySection;
  };
  onUpdate: (sectionType: string, updates: any) => void;
}

type SectionType = 'hero' | 'services' | 'expertise' | 'caseStudies' | 'methodology';

export default function StrategicConsultingOpened({ sections, onUpdate }: Props) {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');

  const sectionOptions = [
    { key: 'hero' as SectionType, label: 'Hero Section', component: EditableStrategicConsultingHeroSection },
    { key: 'services' as SectionType, label: 'Services Section', component: EditableStrategicConsultingServicesSection },
    { key: 'expertise' as SectionType, label: 'Expertise Section', component: EditableStrategicConsultingExpertiseSection },
    { key: 'caseStudies' as SectionType, label: 'Case Studies Section', component: EditableStrategicConsultingCaseStudiesSection },
    { key: 'methodology' as SectionType, label: 'Methodology Section', component: EditableStrategicConsultingMethodologySection },
  ];

  const ActiveComponent = sectionOptions.find(opt => opt.key === activeSection)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Light Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Strategic Consulting Editor
          </h1>
          <p className="text-gray-600 mt-1">
            Edit all Strategic Consulting sections with real-time preview
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8 space-y-6"
          >
            {/* Section Selector */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Section to Edit
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {sectionOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setActiveSection(option.key)}
                    className={`px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeSection === option.key
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-white font-medium text-sm">Live Preview</span>
                </div>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {ActiveComponent && (
                  <ActiveComponent
                    section={sections[activeSection] as any}
                    isEditing={false}
                    onUpdate={() => {}} // Preview only, no updates
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Editor Controls */}
          <div className="space-y-8">
            {ActiveComponent && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ActiveComponent
                  section={sections[activeSection]}
                  isEditing={true}
                  onUpdate={(updates) => onUpdate(activeSection, updates)}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}