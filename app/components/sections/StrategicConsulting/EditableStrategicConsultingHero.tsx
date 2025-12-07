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
    EditableRange,
    EditableSelect,
} from "@/app/components/EditableInputs";
import {
    ChevronDown,
    Sparkles,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { strategicTheme, strategicSectionWrapper } from "./StrategicConsultingTheme";

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
        <motion.div className="border border-gray-200/80 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
            <button
                onClick={() => onToggle(isOpen ? "" : id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-semibold text-gray-800">{title}</span>
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
                        className="border-t border-gray-200/50"
                    >
                        <div className="p-4 space-y-4">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface EditableStrategicConsultingHeroProps {
    section: StrategicConsultingParagraphsSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<StrategicConsultingParagraphsSection>) => void;
}

export default function EditableStrategicConsultingHero({
    section,
    isEditing,
    onUpdate,
}: EditableStrategicConsultingHeroProps) {
    const content = section.content || {};
    const {
        paragraph1Text = "Strategic Consulting & Advisory Solutions empower clients to navigate complexity and seize opportunity across real estate, infrastructure, spatial planning, urban development and digital transformation.",
        paragraph1Image = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920",
        paragraph1OverlayOpacity = 0.75,
        paragraph1BackgroundColor = strategicTheme.pageBackground,
        paragraph1TextColor = strategicTheme.textPrimary,
        paragraph1AccentColor = strategicTheme.accent,
        paragraph1TextSize = "5xl",        // ← NEW
        paragraph1TextAlign = "center",    // ← NEW
    } = content;

    const [activeSection, setActiveSection] = useState<string>("p1");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const viewModeContent = {
        paragraph1Text,
        paragraph1Image,
        paragraph1OverlayOpacity,
        paragraph1BackgroundColor,
        paragraph1TextColor,
        paragraph1AccentColor,
        paragraph1TextSize,
        paragraph1TextAlign,
    };

    if (!isEditing) {
        return <Paragraph1 content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Hero Section Editor"
            description="Light & modern hero builder"
            preview={
                <div className="h-full overflow-auto">
                    <Paragraph1 content={viewModeContent} />
                </div>
            }
            previewWrapperClassName="relative h-[680px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            controls={
                <>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-xl">
                                <Sparkles className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Content & Typography
                                </h2>
                                <p className="text-sm text-gray-500">Craft the hero narrative</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ControlGroup title="Content" id="content" activeId={activeSection} onToggle={setActiveSection}>
                                <EditableTextarea
                                    label="Main Heading"
                                    value={paragraph1Text}
                                    onChange={(value) => handleContentUpdate({ paragraph1Text: value })}
                                    placeholder="Enter your powerful message..."
                                    rows={5}
                                />
                                <MediaUpload
                                    label="Background Image"
                                    type="image"
                                    currentUrl={paragraph1Image}
                                    onUpload={(url) => handleContentUpdate({ paragraph1Image: url })}
                                    onRemove={() => handleContentUpdate({ paragraph1Image: "" })}
                                />
                            </ControlGroup>

                            <ControlGroup title="Typography" id="typography" activeId={activeSection} onToggle={setActiveSection}>
                                <EditableSelect
                                    label="Text Size"
                                    value={paragraph1TextSize}
                                    onChange={(value) => handleContentUpdate({ paragraph1TextSize: value })}
                                    options={[
                                        { label: "XS", value: "text-xs" },
                                        { label: "SM", value: "text-sm" },
                                        { label: "Base", value: "text-base" },
                                        { label: "LG", value: "text-lg" },
                                        { label: "XL", value: "text-xl" },
                                        { label: "2XL", value: "text-2xl" },
                                        { label: "3XL", value: "text-3xl" },
                                        { label: "4XL", value: "text-4xl" },
                                        { label: "5XL", value: "text-5xl" },
                                        { label: "6XL", value: "text-6xl" },
                                        { label: "7XL", value: "text-7xl" },
                                    ]}
                                />

                                <EditableSelect
                                    label="Text Alignment"
                                    value={paragraph1TextAlign}
                                    onChange={(value) => handleContentUpdate({ paragraph1TextAlign: value })}
                                    options={[
                                        { label: "Left", value: "left", icon: <AlignLeft size={16} /> },
                                        { label: "Center", value: "center", icon: <AlignCenter size={16} /> },
                                        { label: "Right", value: "right", icon: <AlignRight size={16} /> },
                                    ]}
                                />
                            </ControlGroup>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 rounded-xl">
                                <ChevronDown className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Color & Effects
                                </h2>
                                <p className="text-sm text-gray-500">Balance contrast and clarity</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ControlGroup title="Colors" id="colors" activeId={activeSection} onToggle={setActiveSection}>
                                <EditableColorPicker
                                    label="Text Color"
                                    value={paragraph1TextColor}
                                    onChange={(value) => handleContentUpdate({ paragraph1TextColor: value })}
                                />
                                <EditableColorPicker
                                    label="Accent Color"
                                    value={paragraph1AccentColor}
                                    onChange={(value) => handleContentUpdate({ paragraph1AccentColor: value })}
                                />
                                <EditableRange
                                    label="Image Lightness"
                                    value={paragraph1OverlayOpacity}
                                    onChange={(value) => handleContentUpdate({ paragraph1OverlayOpacity: value })}
                                    min={0.3}
                                    max={1}
                                    step={0.05}
                                    showValue
                                />
                            </ControlGroup>
                        </div>
                    </motion.div>
                </>
            }
        />
    );
}

// UPDATED HERO WITH TEXT SIZE & ALIGNMENT SUPPORT
function Paragraph1({ content }: { content: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const textAlignClass = content.paragraph1TextAlign === "left" ? "text-left" :
        content.paragraph1TextAlign === "right" ? "text-right" : "text-center";

    const containerAlignClass = content.paragraph1TextAlign === "left" ? "justify-start text-left" :
        content.paragraph1TextAlign === "right" ? "justify-end text-right" : "justify-center text-center";

    return (
        <section
            ref={ref}
            className={`${strategicSectionWrapper} min-h-screen flex items-center`}
            style={{ backgroundColor: content.paragraph1BackgroundColor }}
        >
            {/* Parallax Background */}
            <motion.div
                className="absolute inset-0"
                style={{ y: yImage, scale: scaleImage }}
            >
                <img
                    src={content.paragraph1Image}
                    alt="Hero"
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: strategicTheme.pageBackground, opacity: 1 - content.paragraph1OverlayOpacity }}
                />
            </motion.div>

            {/* Content */}
            <motion.div
                className={`relative z-10 max-w-7xl mx-auto px-8 w-full flex flex-col items-center ${containerAlignClass}`}
                style={{ y: yText }}
            >
                {/* Main Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`${content.paragraph1TextSize || "text-5xl"} md:${content.paragraph1TextSize || "text-6xl"} lg:${content.paragraph1TextSize || "text-7xl"} font-light leading-tight tracking-tight mb-8 ${textAlignClass}`}
                    style={{ color: content.paragraph1TextColor }}
                >
                    {content.paragraph1Text.split(" ").map((word: string, i: number) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: i * 0.03 }}
                            className="inline-block"
                        >
                            {word}&nbsp;
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Decorative Line */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "120px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className={`h-1 rounded-full ${content.paragraph1TextAlign === "center" ? "mx-auto" : content.paragraph1TextAlign === "left" ? "ml-0" : "mr-0"}`}
                    style={{ backgroundColor: content.paragraph1AccentColor }}
                />

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <ChevronDown size={32} style={{ color: content.paragraph1AccentColor }} />
                </motion.div>
            </motion.div>
        </section>
    );
}