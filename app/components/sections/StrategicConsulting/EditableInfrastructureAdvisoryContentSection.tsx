"use client";

import React, { useState } from "react";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import { StrategicConsultingParagraphsSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
    EditableTextarea,
    EditableColorPicker,
    EditableSelect,
    EditableRange,
} from "@/app/components/EditableInputs";
import {
    ChevronDown,
    Building2,
    Sparkles,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Palette,
    Layout,
    Shapes,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { strategicTheme, strategicSectionWrapper, strategicPanel, strategicContainer } from "./StrategicConsultingTheme";

interface ControlGroupProps {
    title: string;
    id: string;
    activeId: string;
    onToggle: (id: string) => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

function ControlGroup({ title, id, activeId, onToggle, children, icon }: ControlGroupProps) {
    const isOpen = activeId === id;
    return (
        <motion.div
            className="border border-gray-200/80 rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300"
            whileHover={{ y: -2 }}
        >
            <button
                onClick={() => onToggle(isOpen ? "" : id)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{title}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200/50 bg-white/30"
                    >
                        <div className="p-4 space-y-4">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface EditableInfrastructureAdvisoryContentSectionProps {
    section: StrategicConsultingParagraphsSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<StrategicConsultingParagraphsSection>) => void;
}

export default function EditableInfrastructureAdvisoryContentSection({
    section,
    isEditing,
    onUpdate,
}: EditableInfrastructureAdvisoryContentSectionProps) {
    const content = section.content || {};
    const {
        infraTitle = "Infrastructure Advisory",
        infraParagraph1 = "Our Infrastructure Advisory services support clients in planning, designing and delivering large-scale developments that are resilient, efficient and future-ready. We bring together technical expertise, policy insight and data-driven strategy to guide infrastructure decision-making from concept to completion.",
        infraParagraph2 = "We help organizations evaluate feasibility, optimize investment, reduce risk and ensure that infrastructure assets deliver lasting value for the communities they serve. With a focus on sustainability, compliance and long-term performance, our advisory approach aligns vision, operational needs and real-world conditions to create infrastructure that stands the test of time.",
        infraImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920",
        infraImagePosition = "right",
        infraBackgroundColor = strategicTheme.pageBackground,
        infraTextColor = strategicTheme.textSecondary,
        infraTitleColor = strategicTheme.textPrimary,
        infraAccentColor = strategicTheme.accent,
        infraTitleSize = "4xl",
        infraTextSize = "lg",
        infraTextAlign = "left",
        infraImageHeight = 80,
        backgroundStyle = "floating-blobs",
        borderRadiusStyle = "asymmetric",
        overlayOpacity = 0.05,
        overlayColor = strategicTheme.accent,
    } = content;

    const [activeSection, setActiveSection] = useState<string>("content");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const viewModeContent = {
        infraTitle,
        infraParagraph1,
        infraParagraph2,
        infraImage,
        infraImagePosition: infraImagePosition as "left" | "right",
        infraBackgroundColor,
        infraTextColor,
        infraTitleColor,
        infraAccentColor,
        infraTitleSize,
        infraTextSize,
        infraTextAlign,
        infraImageHeight,
        backgroundStyle: backgroundStyle as "floating-blobs" | "geometric" | "gradient-mesh" | "organic-waves",
        borderRadiusStyle: borderRadiusStyle as "asymmetric" | "rounded-corners" | "curved-edges" | "custom-shape",
        overlayOpacity,
        overlayColor,
    };

    if (!isEditing) {
        return <InfrastructureContent content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Infrastructure Advisory Editor"
            description="Control narrative, typography and visual presentation"
            preview={
                <div className="h-full overflow-auto">
                    <InfrastructureContent content={viewModeContent} />
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
                            <div className="p-2 bg-orange-100 rounded-xl">
                                <Building2 className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Content & Typography
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Fine-tune storytelling elements
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ControlGroup
                                title="Content"
                                id="content"
                                activeId={activeSection}
                                onToggle={setActiveSection}
                                icon={<AlignLeft className="w-4 h-4 text-blue-600" />}
                            >
                                <EditableTextarea
                                    label="Title"
                                    value={infraTitle}
                                    onChange={(value) => handleContentUpdate({ infraTitle: value })}
                                    placeholder="Section title..."
                                    rows={2}
                                />
                                <EditableTextarea
                                    label="First Paragraph"
                                    value={infraParagraph1}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraParagraph1: value })
                                    }
                                    placeholder="Enter first paragraph..."
                                    rows={5}
                                />
                                <EditableTextarea
                                    label="Second Paragraph"
                                    value={infraParagraph2}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraParagraph2: value })
                                    }
                                    placeholder="Enter second paragraph..."
                                    rows={5}
                                />
                                <MediaUpload
                                    label="Section Image"
                                    type="image"
                                    currentUrl={infraImage}
                                    onUpload={(url) =>
                                        handleContentUpdate({ infraImage: url })
                                    }
                                    onRemove={() =>
                                        handleContentUpdate({ infraImage: "" })
                                    }
                                />
                            </ControlGroup>

                            <ControlGroup
                                title="Typography"
                                id="typography"
                                activeId={activeSection}
                                onToggle={setActiveSection}
                                icon={<AlignCenter className="w-4 h-4 text-purple-600" />}
                            >
                                <EditableSelect
                                    label="Title Size"
                                    value={infraTitleSize}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraTitleSize: value })
                                    }
                                    options={[
                                        { label: "2XL", value: "2xl" },
                                        { label: "3XL", value: "3xl" },
                                        { label: "4XL", value: "4xl" },
                                        { label: "5XL", value: "5xl" },
                                    ]}
                                />
                                <EditableSelect
                                    label="Text Size"
                                    value={infraTextSize}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraTextSize: value })
                                    }
                                    options={[
                                        { label: "Base", value: "base" },
                                        { label: "LG", value: "lg" },
                                        { label: "XL", value: "xl" },
                                        { label: "2XL", value: "2xl" },
                                    ]}
                                />
                                <EditableSelect
                                    label="Text Alignment"
                                    value={infraTextAlign}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraTextAlign: value })
                                    }
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
                                <Layout className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Layout & Visuals
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Shape the immersive experience
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <ControlGroup
                                title="Layout & Style"
                                id="layout"
                                activeId={activeSection}
                                onToggle={setActiveSection}
                                icon={<Layout className="w-4 h-4 text-green-600" />}
                            >
                                <EditableSelect
                                    label="Image Position"
                                    value={infraImagePosition}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraImagePosition: value })
                                    }
                                    options={[
                                        { label: "Left", value: "left" },
                                        { label: "Right", value: "right" },
                                    ]}
                                />
                                <EditableRange
                                    label="Image Height"
                                    value={infraImageHeight}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraImageHeight: value })
                                    }
                                    min={40}
                                    max={120}
                                    step={10}
                                    showValue
                                />
                                <EditableSelect
                                    label="Background Style"
                                    value={backgroundStyle}
                                    onChange={(value) =>
                                        handleContentUpdate({ backgroundStyle: value })
                                    }
                                    options={[
                                        { label: "Floating Blobs", value: "floating-blobs" },
                                        { label: "Geometric", value: "geometric" },
                                        { label: "Gradient Mesh", value: "gradient-mesh" },
                                        { label: "Organic Waves", value: "organic-waves" },
                                    ]}
                                />
                                <EditableSelect
                                    label="Border Radius Style"
                                    value={borderRadiusStyle}
                                    onChange={(value) =>
                                        handleContentUpdate({ borderRadiusStyle: value })
                                    }
                                    options={[
                                        { label: "Asymmetric", value: "asymmetric" },
                                        { label: "Rounded Corners", value: "rounded-corners" },
                                        { label: "Curved Edges", value: "curved-edges" },
                                        { label: "Custom Shape", value: "custom-shape" },
                                    ]}
                                />
                            </ControlGroup>

                            <ControlGroup
                                title="Colors & Effects"
                                id="colors"
                                activeId={activeSection}
                                onToggle={setActiveSection}
                                icon={<Palette className="w-4 h-4 text-rose-600" />}
                            >
                                <EditableColorPicker
                                    label="Background Color"
                                    value={infraBackgroundColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraBackgroundColor: value })
                                    }
                                />
                                <EditableColorPicker
                                    label="Title Color"
                                    value={infraTitleColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraTitleColor: value })
                                    }
                                />
                                <EditableColorPicker
                                    label="Text Color"
                                    value={infraTextColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraTextColor: value })
                                    }
                                />
                                <EditableColorPicker
                                    label="Accent Color"
                                    value={infraAccentColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ infraAccentColor: value })
                                    }
                                />
                                <EditableColorPicker
                                    label="Overlay Color"
                                    value={overlayColor}
                                    onChange={(value) =>
                                        handleContentUpdate({ overlayColor: value })
                                    }
                                />
                                <EditableRange
                                    label="Overlay Opacity"
                                    value={overlayOpacity}
                                    onChange={(value) =>
                                        handleContentUpdate({ overlayOpacity: value })
                                    }
                                    min={0}
                                    max={0.3}
                                    step={0.01}
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

function InfrastructureContent({ content }: { content: any }) {
    const textAlignClass =
        content.infraTextAlign === "left" ? "text-left" :
            content.infraTextAlign === "right" ? "text-right" : "text-center";

    const containerAlignClass =
        content.infraTextAlign === "left" ? "justify-start" :
            content.infraTextAlign === "right" ? "justify-end" : "justify-center";

    const titleSizeClass = `text-${content.infraTitleSize}`;
    const textSizeClass = `text-${content.infraTextSize}`;

    const getBorderRadiusClass = () => {
        switch (content.borderRadiusStyle) {
            case "asymmetric":
                return "rounded-tl-3xl rounded-br-3xl rounded-tr-xl rounded-bl-xl";
            case "rounded-corners":
                return "rounded-3xl";
            case "curved-edges":
                return "rounded-[2rem]";
            case "custom-shape":
                return "rounded-tl-[3rem] rounded-tr-[1rem] rounded-br-[3rem] rounded-bl-[1rem]";
            default:
                return "rounded-2xl";
        }
    };

    const BackgroundOverlay = () => {
        switch (content.backgroundStyle) {
            case "floating-blobs":
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full opacity-20"
                                style={{
                                    backgroundColor: content.overlayColor,
                                    width: Math.random() * 300 + 100,
                                    height: Math.random() * 300 + 100,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -40, 0],
                                    x: [0, 20, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 8 + Math.random() * 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                );

            case "geometric":
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute opacity-15"
                                style={{
                                    backgroundColor: content.overlayColor,
                                    width: Math.random() * 200 + 50,
                                    height: Math.random() * 200 + 50,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    borderRadius: i % 3 === 0 ? "30% 70% 70% 30% / 30% 30% 70% 70%" :
                                        i % 3 === 1 ? "50% 50% 50% 50% / 60% 60% 40% 40%" :
                                            "25% 75% 25% 75% / 75% 25% 75% 25%",
                                }}
                                animate={{
                                    rotate: [0, 180, 360],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 12 + Math.random() * 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        ))}
                    </div>
                );

            case "gradient-mesh":
                return (
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            background: `
                                 radial-gradient(circle at 20% 80%, ${content.overlayColor}40 0%, transparent 50%),
                                 radial-gradient(circle at 80% 20%, ${content.overlayColor}30 0%, transparent 50%),
                                 radial-gradient(circle at 40% 40%, ${content.overlayColor}20 0%, transparent 50%),
                                 radial-gradient(circle at 60% 60%, ${content.overlayColor}25 0%, transparent 50%)
                             `,
                        }}
                    />
                );

            case "organic-waves":
                return (
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 opacity-10"
                            style={{
                                background: `radial-gradient(ellipse at 30% 50%, ${content.overlayColor}40 0%, transparent 50%)`,
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute inset-0 opacity-15"
                            style={{
                                background: `radial-gradient(ellipse at 70% 30%, ${content.overlayColor}30 0%, transparent 50%)`,
                            }}
                            animate={{
                                scale: [1.2, 1, 1.2],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <section
            className={`${strategicSectionWrapper} overflow-hidden relative`}
            style={{ backgroundColor: content.infraBackgroundColor }}
        >
            {/* Background Overlay */}
            <BackgroundOverlay />

            <div className={`${strategicContainer} relative z-10`}>
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${content.infraImagePosition === "right" ? "" : "lg:grid-flow-dense"}`}>

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className={`relative ${content.infraImagePosition === "right" ? "" : "lg:order-2"}`}
                    >
                        <motion.div
                            className={`relative overflow-hidden shadow-2xl ${getBorderRadiusClass()}`}
                            whileHover={{ scale: 1.02}}
                            transition={{ duration: 0.4 }}
                            style={{
                                boxShadow: `0 25px 50px -12px ${content.infraAccentColor}20`,
                            }}
                        >
                            {content.infraImage && (
                                <img
                                    src={content.infraImage}
                                    alt="Infrastructure Advisory"
                                    className="w-full object-cover"
                                    style={{ height: `${content.infraImageHeight}` }}
                                />
                            )}
                            {/* Image Overlay Gradient */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    background: `linear-gradient(45deg, ${content.infraAccentColor}20, transparent)`,
                                }}
                            />
                        </motion.div>

                        {/* Floating Accent Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-30"
                            style={{ backgroundColor: content.infraAccentColor }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                        />
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-40"
                            style={{ backgroundColor: content.infraAccentColor }}
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.4, 0.8, 0.4],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                delay: 1,
                            }}
                        />
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: content.infraImagePosition === "right" ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={`flex flex-col ${containerAlignClass} ${content.infraImagePosition === "right" ? "" : "lg:order-1"}`}
                    >
                        {/* Animated Accent Line */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "80px" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className={`h-1.5 rounded-full mb-8 ${getBorderRadiusClass()}`}
                            style={{ backgroundColor: content.infraAccentColor }}
                        />

                        {/* Title with Gradient Effect */}
                        <motion.h2
                            className={`${titleSizeClass} font-bold mb-8 leading-tight ${textAlignClass}`}
                            style={{
                                color: content.infraTitleColor,
                                background: content.backgroundStyle === "gradient-mesh"
                                    ? `linear-gradient(135deg, ${content.infraTitleColor}, ${content.infraAccentColor})`
                                    : 'none',
                                WebkitBackgroundClip: content.backgroundStyle === "gradient-mesh" ? 'text' : 'none',
                                WebkitTextFillColor: content.backgroundStyle === "gradient-mesh" ? 'transparent' : 'inherit',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {content.infraTitle}
                        </motion.h2>

                        {/* Paragraphs Container with Subtle Background */}
                        <motion.div
                            className={`space-y-6 p-6 rounded-2xl backdrop-blur-sm ${getBorderRadiusClass()}`}
                            style={{
                                backgroundColor: content.overlayColor + '08',
                                border: `1px solid ${content.overlayColor}15`,
                            }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <p
                                className={`${textSizeClass} leading-relaxed ${textAlignClass}`}
                                style={{ color: content.infraTextColor }}
                            >
                                {content.infraParagraph1}
                            </p>
                            <p
                                className={`${textSizeClass} leading-relaxed ${textAlignClass}`}
                                style={{ color: content.infraTextColor }}
                            >
                                {content.infraParagraph2}
                            </p>
                        </motion.div>

                        {/* Bottom Accent with Animation */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                            className={`h-1 w-16 mt-8 ${getBorderRadiusClass()}`}
                            style={{
                                backgroundColor: content.infraAccentColor,
                                originX: textAlignClass === 'text-right' ? 1 : textAlignClass === 'text-center' ? 0.5 : 0
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}