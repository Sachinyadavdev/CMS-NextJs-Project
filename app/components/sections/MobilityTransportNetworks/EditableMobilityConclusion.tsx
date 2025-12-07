"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
    EditableTextarea,
    EditableColorPicker,
} from "@/app/components/EditableInputs";
import { ChevronDown, Target } from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { mobilityTheme, mobilitySectionWrapper } from "./MobilityTheme";

interface ControlGroupProps {
    title: string;
    id: string;
    activeId: string;
    onToggle: (id: string) => void;
    children: React.ReactNode;
}

function ControlGroup({ title, id, activeId, onToggle, children }: ControlGroupProps) {
    const isOpen = activeId === id;
    return (
        <motion.div
            className="border border-gray-200/50 rounded-xl overflow-hidden bg-white/50 hover:bg-white/70 transition-colors"
        >
            <button
                onClick={() => onToggle(id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors"
            >
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.div>
            </button>
            {isOpen && (
                <div className="p-3 space-y-3 border-t border-gray-200/50">
                    {children}
                </div>
            )}
        </motion.div>
    );
}

interface EditableMobilityConclusionProps {
    section: PageSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<PageSection>) => void;
}

export default function EditableMobilityConclusion({
    section,
    isEditing,
    onUpdate,
}: EditableMobilityConclusionProps) {
    const content = (section.content || {}) as MobilityContent;
    const {
        line1 = "Collaborating with purpose.",
        line2 = "Delivering with precision.",
        backgroundColor = mobilityTheme.pageBackground,
        textColor = mobilityTheme.textPrimary,
        accentColor = mobilityTheme.accent,
    } = content;

    const [activeSection, setActiveSection] = useState<string>("content");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const viewModeContent = {
        line1,
        line2,
        backgroundColor,
        textColor,
        accentColor,
    };

    if (!isEditing) {
        return <MobilityConclusionView content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Conclusion Editor"
            description="Edit the final statement."
            preview={
                <div className="h-full overflow-auto">
                    <MobilityConclusionView content={viewModeContent} />
                </div>
            }
            controls={
                <div className="space-y-4">
                    <ControlGroup
                        title="Content"
                        id="content"
                        activeId={activeSection}
                        onToggle={setActiveSection}
                    >
                        <EditableTextarea
                            label="Line 1"
                            value={line1}
                            onChange={(value) => handleContentUpdate({ line1: value })}
                            rows={2}
                        />
                        <EditableTextarea
                            label="Line 2"
                            value={line2}
                            onChange={(value) => handleContentUpdate({ line2: value })}
                            rows={2}
                        />
                    </ControlGroup>
                    <ControlGroup
                        title="Styles"
                        id="styles"
                        activeId={activeSection}
                        onToggle={setActiveSection}
                    >
                        <EditableColorPicker
                            label="Background Color"
                            value={backgroundColor}
                            onChange={(value) => handleContentUpdate({ backgroundColor: value })}
                        />
                        <EditableColorPicker
                            label="Text Color"
                            value={textColor}
                            onChange={(value) => handleContentUpdate({ textColor: value })}
                        />
                        <EditableColorPicker
                            label="Accent Color"
                            value={accentColor}
                            onChange={(value) => handleContentUpdate({ accentColor: value })}
                        />
                    </ControlGroup>
                </div>
            }
        />
    );
}

function MobilityConclusionView({ content }: { content: any }) {
    return (
        <section
            className={`${mobilitySectionWrapper} flex items-center justify-center min-h-[40vh]`}
            style={{ backgroundColor: content.backgroundColor }}
        >
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 inline-block"
                >
                    <Target className="w-12 h-12 mx-auto opacity-50" style={{ color: content.accentColor }} />
                </motion.div>

                <div className="space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                        style={{ color: content.textColor }}
                    >
                        {content.line1}
                    </motion.h2>
                    <motion.h2
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-70"
                        style={{ color: content.textColor }}
                    >
                        {content.line2}
                    </motion.h2>
                </div>
            </div>
        </section>
    );
}
