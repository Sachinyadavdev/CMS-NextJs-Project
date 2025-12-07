"use client";

import React, { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { StrategicConsultingParagraphsSection } from "@/lib/db";
import {
    EditableTextarea,
    EditableColorPicker,
    EditableSelect,
} from "@/app/components/EditableInputs";
import {
    ChevronDown,
    Sparkles,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { strategicTheme, strategicSectionWrapper, strategicPanel } from "./StrategicConsultingTheme";

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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200/50 overflow-hidden"
                    >
                        <div className="p-3 space-y-3">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface EditableStrategicConsultingConclusionProps {
    section: StrategicConsultingParagraphsSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<StrategicConsultingParagraphsSection>) => void;
}

export default function EditableStrategicConsultingConclusion({
    section,
    isEditing,
    onUpdate,
}: EditableStrategicConsultingConclusionProps) {
    const content = section.content || {};
    const {
        paragraph3Text = "RAUS is anchored in insight, foresight and impact. These principles guide every engagement—from strategy to execution—delivering tailored solutions, informed decisions and sustainable growth across every sector we serve.",
        paragraph3BackgroundColor = strategicTheme.pageBackground,
        paragraph3TextColor = strategicTheme.textPrimary,
        paragraph3BackgroundPattern = "blueprint",
    } = content;

    const [activeSection, setActiveSection] = useState<string>("p3");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const viewModeContent = {
        paragraph3Text,
        paragraph3BackgroundColor,
        paragraph3TextColor,
        paragraph3BackgroundPattern: paragraph3BackgroundPattern as
            | "blueprint"
            | "grid"
            | "dots"
            | "lines",
    };

    if (!isEditing) {
        return <Paragraph3 content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Conclusion Section Editor"
            description="Customize message and visual tone"
            preview={
                <div className="h-full overflow-auto">
                    <Paragraph3 content={viewModeContent} />
                </div>
            }
            previewWrapperClassName="relative h-[520px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            controls={
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-100 rounded-lg">
                            <Sparkles className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">Conclusion Content</h2>
                            <p className="text-sm text-gray-500">Craft the final impression</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <ControlGroup
                            title="Message"
                            id="p3"
                            activeId={activeSection}
                            onToggle={setActiveSection}
                        >
                            <EditableTextarea
                                label="Conclusion Text"
                                value={paragraph3Text}
                                onChange={(value) =>
                                    handleContentUpdate({ paragraph3Text: value })
                                }
                                placeholder="Enter conclusion text..."
                                rows={5}
                            />
                        </ControlGroup>

                        <ControlGroup
                            title="Style & Effects"
                            id="style"
                            activeId={activeSection}
                            onToggle={setActiveSection}
                        >
                            <EditableSelect
                                label="Background Pattern"
                                value={paragraph3BackgroundPattern}
                                onChange={(value) =>
                                    handleContentUpdate({ paragraph3BackgroundPattern: value })
                                }
                                options={[
                                    { label: "Blueprint", value: "blueprint" },
                                    { label: "Grid", value: "grid" },
                                    { label: "Dots", value: "dots" },
                                    { label: "Lines", value: "lines" },
                                ]}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <EditableColorPicker
                                    label="Text Color"
                                    value={paragraph3TextColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ paragraph3TextColor: value })
                                    }
                                />
                                <EditableColorPicker
                                    label="Bg Color"
                                    value={paragraph3BackgroundColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ paragraph3BackgroundColor: value })
                                    }
                                />
                            </div>
                        </ControlGroup>
                    </div>
                </motion.div>
            }
        />
    );
}

function Paragraph3({ content }: { content: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0.8]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    const getBackgroundPattern = () => {
        const color = "rgba(239,65,48,0.08)";
        switch (content.paragraph3BackgroundPattern) {
            case "grid":
                return `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
            case "dots":
                return `radial-gradient(circle, ${color} 1px, transparent 1px)`;
            case "lines":
                return `repeating-linear-gradient(45deg, ${color}, ${color} 1px, transparent 1px, transparent 10px)`;
            case "blueprint":
            default:
                return `linear-gradient(0deg, ${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`;
        }
    };

    return (
        <section
            ref={containerRef}
            className={`${strategicSectionWrapper} flex items-center justify-center`}
            style={{ backgroundColor: content.paragraph3BackgroundColor }}
        >
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: getBackgroundPattern(),
                    backgroundSize: content.paragraph3BackgroundPattern === "dots" ? "20px 20px" : "40px 40px",
                    opacity: 0.5,
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center relative z-10"
                style={{ opacity, scale, rotate }}
            >
                <motion.p
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-10 tracking-tight"
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="relative inline-flex flex-col items-center w-full">
                        <motion.span
                            className="absolute -inset-x-10 -inset-y-8 rounded-[64px] bg-gradient-to-r from-[#EF4130]/25 via-[#FF6B4A]/20 to-[#EF4130]/25 blur-3xl"
                            aria-hidden="true"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="absolute -inset-x-6 -inset-y-4 rounded-[56px] border border-white/60 bg-white/20 backdrop-blur-md shadow-[0_20px_80px_rgba(15,23,42,0.25)]"
                            aria-hidden="true"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                        />
                        <span className="relative z-10 flex flex-col items-center gap-5 text-center">
                            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]" style={{ color: strategicTheme.accent }}>
                                <span className="h-px w-10 bg-gradient-to-r from-transparent via-[#EF4130] to-[#FF6B4A]/80" />
                                <Sparkles className="w-4 h-4" style={{ color: strategicTheme.accent }} />
                                Signature Insight
                                <span className="h-px w-10 bg-gradient-to-r from-[#FF6B4A]/80 via-[#EF4130] to-transparent" />
                            </span>
                            <span
                                className="block leading-tight drop-shadow-[0_10px_35px_rgba(15,23,42,0.35)]"
                                style={{ color: content.paragraph3TextColor }}
                            >
                                "{content.paragraph3Text}"
                            </span>
                        </span>
                    </span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative flex items-center justify-center gap-3 text-xs uppercase tracking-[0.28em] text-white/70"
                    style={{ originX: 0.5 }}
                >
                    <span className="h-px w-12 bg-gradient-to-r from-transparent via-[#EF4130]/40 to-[#FF6B4A]/60" />
                    <span className="px-4 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.35)] text-white">
                        Crafted For Impact
                    </span>
                    <span className="h-px w-12 bg-gradient-to-r from-[#FF6B4A]/60 via-[#EF4130]/40 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}
