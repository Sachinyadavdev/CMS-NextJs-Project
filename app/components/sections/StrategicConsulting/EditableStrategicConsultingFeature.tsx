"use client";

import React, { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { StrategicConsultingParagraphsSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
    EditableTextarea,
    EditableColorPicker,
    EditableSelect,
} from "@/app/components/EditableInputs";
import {
    ChevronDown,
    Layers,
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

interface EditableStrategicConsultingFeatureProps {
    section: StrategicConsultingParagraphsSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<StrategicConsultingParagraphsSection>) => void;
}

export default function EditableStrategicConsultingFeature({
    section,
    isEditing,
    onUpdate,
}: EditableStrategicConsultingFeatureProps) {
    const content = section.content || {};
    const {
        paragraph2Text = "From shaping cityscapes to optimizing asset portfolios and accelerating digital maturity, we align business objectives with actionable roadmaps. Our approach is collaborative, adaptive and grounded in measurable value—ensuring that every vision evolves into a resilient, high-performing reality.",
        paragraph2Image = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920",
        paragraph2ImagePosition = "left",
        paragraph2BackgroundColor = strategicTheme.pageBackground,
        paragraph2TextColor = strategicTheme.textPrimary,
    } = content;

    const [activeSection, setActiveSection] = useState<string>("p2");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const viewModeContent = {
        paragraph2Text,
        paragraph2Image,
        paragraph2ImagePosition: paragraph2ImagePosition as "left" | "right",
        paragraph2BackgroundColor,
        paragraph2TextColor,
    };

    if (!isEditing) {
        return <Paragraph2 content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Feature Section Editor"
            description="Edit paragraph story, media and layout"
            preview={
                <div className="h-full overflow-auto">
                    <Paragraph2 content={viewModeContent} />
                </div>
            }
            previewWrapperClassName="relative h-[680px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            controls={
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Layers className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                Content & Layout
                            </h2>
                            <p className="text-sm text-gray-500">
                                Configure storytelling details
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <ControlGroup
                            title="Content"
                            id="p2"
                            activeId={activeSection}
                            onToggle={setActiveSection}
                        >
                            <EditableTextarea
                                label="Feature Text"
                                value={paragraph2Text}
                                onChange={(value) =>
                                    handleContentUpdate({ paragraph2Text: value })
                                }
                                placeholder="Enter feature text..."
                                rows={5}
                            />
                            <MediaUpload
                                label="Feature Image"
                                type="image"
                                currentUrl={paragraph2Image}
                                onUpload={(url) =>
                                    handleContentUpdate({ paragraph2Image: url })
                                }
                                onRemove={() =>
                                    handleContentUpdate({ paragraph2Image: "" })
                                }
                            />
                        </ControlGroup>

                        <ControlGroup
                            title="Layout & Style"
                            id="layout"
                            activeId={activeSection}
                            onToggle={setActiveSection}
                        >
                            <EditableSelect
                                label="Image Position"
                                value={paragraph2ImagePosition}
                                onChange={(value) =>
                                    handleContentUpdate({ paragraph2ImagePosition: value })
                                }
                                options={[
                                    { label: "Left", value: "left" },
                                    { label: "Right", value: "right" },
                                ]}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <EditableColorPicker
                                    label="Text Color"
                                    value={paragraph2TextColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ paragraph2TextColor: value })
                                    }
                                />
                                <EditableColorPicker
                                    label="Bg Color"
                                    value={paragraph2BackgroundColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ paragraph2BackgroundColor: value })
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

function Paragraph2({ content }: { content: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 0.8]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
    const textX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);

    return (
        <section
            ref={containerRef}
            className={`${strategicSectionWrapper} lg:py-32 overflow-hidden`}
            style={{ backgroundColor: content.paragraph2BackgroundColor }}
        >
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Image Side */}
                <motion.div
                    className={`relative ${content.paragraph2ImagePosition === "right" ? "lg:order-2" : ""}`}
                    style={{ scale: imageScale }}
                >
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                    >
                        {content.paragraph2Image && (
                            <img
                                src={content.paragraph2Image}
                                alt="Feature"
                                className="w-full h-full object-cover aspect-[4/3]"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={content.paragraph2ImagePosition === "right" ? "lg:order-1" : ""}
                    style={{ opacity }}
                >
                    <p
                        className="text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed mb-6"
                        style={{ color: content.paragraph2TextColor }}
                    >
                        {content.paragraph2Text}
                    </p>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "5rem" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-[#EF4130] to-[#FF6B4A] rounded-full"
                    />
                </motion.div>
            </div>
        </section>
    );
}
