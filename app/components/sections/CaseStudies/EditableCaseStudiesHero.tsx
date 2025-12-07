
import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";
import {
    EditableText,
    EditableTextarea,
    EditableSelect,
} from "../../EditableInputs";
import MediaUpload from "../../MediaUpload";

interface CaseStudiesHeroContent {
    title?: string;
    subtitle?: string;
    introText?: string;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    backgroundMediaType?: "color" | "image" | "video";
    backgroundImageUrl?: string;
    backgroundVideoUrl?: string;
}

type CaseStudiesHeroSection = BaseSection<CaseStudiesHeroContent>;

interface Props {
    section: CaseStudiesHeroSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<CaseStudiesHeroSection>) => void;
}

export default function EditableCaseStudiesHero({
    section,
    isEditing,
    onUpdate,
}: Props) {
    const content = section.content || {};

    const {
        title = "Case Studies",
        subtitle = "Transformative Projects, Built with Innovation & Precision",
        introText = "Showcasing a selection of visionary developments and strategic collaborations across industrial cities, hospitality destinations and global exhibitions. Each case study highlights RAUS's role in enabling sustainable, technology-driven solutions at scale.",
        backgroundColor = "#fef2f2",
        textColor = "#1f2937",
        accentColor = "#dc2626",
        backgroundMediaType = "color",
        backgroundImageUrl = "",
        backgroundVideoUrl = "",
    } = content;

    const imageBackgroundUrl = backgroundImageUrl?.trim() || "";
    const videoBackgroundUrl = backgroundVideoUrl?.trim() || "";
    const showImageBackground = backgroundMediaType === "image" && !!imageBackgroundUrl;
    const showVideoBackground = backgroundMediaType === "video" && !!videoBackgroundUrl;

    const handleUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    // Grid animation optimization
    const GridOverlay = () => (
        <div className="absolute inset-0 opacity-5 z-10 pointer-events-none">
            <div className="grid grid-cols-20 gap-1 h-full">
                {Array.from({ length: 400 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.01 }}
                        className="bg-red-400 rounded-full"
                    />
                ))}
            </div>
        </div>
    );

    // Floating emojis animation
    const FloatingEmojis = () => (
        <>
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-10 right-10 text-6xl opacity-10 z-20 pointer-events-none"
            >
                📊
            </motion.div>
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-10 left-10 text-6xl opacity-10 z-20 pointer-events-none"
            >
                🏗️
            </motion.div>
        </>
    );

    // Background renderer
    const BackgroundRenderer = () => {
        if (showImageBackground) {
            return (
                <div className="absolute inset-0 z-0">
                    <img
                        src={imageBackgroundUrl}
                        alt=""
                        className="h-full w-full object-cover"
                        aria-hidden="true"
                        loading="lazy"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"
                        aria-hidden="true"
                    />
                </div>
            );
        }

        if (showVideoBackground) {
            return (
                <div className="absolute inset-0 z-0">
                    <video
                        src={videoBackgroundUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"
                        aria-hidden="true"
                    />
                </div>
            );
        }

        return null;
    };

    // ===================================================================
    // LIVE VIEW – Case Studies Hero
    // ===================================================================
    if (!isEditing) {
        return (
            <section
                className="py-24 relative overflow-hidden"
                style={{ backgroundColor }}
            >
                <BackgroundRenderer />
                <GridOverlay />
                <FloatingEmojis />

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-30">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1
                            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                            style={{ color: textColor }}
                        >
                            {title}
                        </h1>
                        <h2
                            className="text-2xl md:text-3xl font-semibold mb-8"
                            style={{ color: accentColor }}
                        >
                            {subtitle}
                        </h2>
                        <p
                            className="max-w-4xl mx-auto text-xl leading-relaxed"
                            style={{ color: textColor }}
                        >
                            {introText}
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    // ===================================================================
    // EDITING MODE
    // ===================================================================
    const Preview = () => (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500 text-white">
                <h1 className="text-2xl font-bold">Case Studies Hero</h1>
                <p className="text-red-100 mt-1">Page Introduction</p>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 text-2xl">{title}</h4>
                    <p className="text-lg text-red-600 font-medium">{subtitle}</p>
                    <p className="text-sm text-gray-600 line-clamp-3">{introText}</p>
                    <div className="pt-4 border-t border-gray-100 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">Background:</span>
                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600">
                                {backgroundMediaType === "video"
                                    ? "Video"
                                    : backgroundMediaType === "image"
                                    ? "Image"
                                    : "Color"}
                            </span>
                        </div>
                        {showImageBackground && (
                            <div className="mt-3">
                                <img
                                    src={imageBackgroundUrl}
                                    alt=""
                                    className="h-32 w-full rounded-xl object-cover"
                                    aria-hidden="true"
                                />
                            </div>
                        )}
                        {showVideoBackground && (
                            <div className="mt-3">
                                <video
                                    src={videoBackgroundUrl}
                                    className="h-32 w-full rounded-xl object-cover"
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const EditorSection = ({ title, iconColor, children }: { 
        title: string; 
        iconColor: string; 
        children: React.ReactNode;
    }) => (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span 
                    className={`w-3 h-3 ${iconColor} rounded-full mr-3`}
                />
                {title}
            </h2>
            {children}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Case Studies Hero Editor
                    </h1>
                    <p className="text-gray-600">
                        Customize the case studies page introduction
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Preview */}
                    <div className="sticky top-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse" />
                                Live Preview
                            </h2>
                        </div>
                        <Preview />
                    </div>

                    {/* Right: Controls */}
                    <div className="space-y-8">
                        <EditorSection title="Content Settings" iconColor="bg-red-500">
                            <div className="space-y-5">
                                <EditableText
                                    label="Page Title"
                                    value={title}
                                    onChange={(v) => handleUpdate({ title: v })}
                                />
                                <EditableText
                                    label="Subtitle"
                                    value={subtitle}
                                    onChange={(v) => handleUpdate({ subtitle: v })}
                                />
                                <EditableTextarea
                                    label="Introduction Text"
                                    value={introText}
                                    onChange={(v) => handleUpdate({ introText: v })}
                                    rows={4}
                                />
                            </div>
                        </EditorSection>

                        <EditorSection title="Background Settings" iconColor="bg-rose-500">
                            <div className="space-y-5">
                                <EditableSelect
                                    label="Background Style"
                                    value={backgroundMediaType}
                                    onChange={(v) =>
                                        handleUpdate({ backgroundMediaType: v as "color" | "image" | "video" })
                                    }
                                    options={[
                                        { label: "Solid Color", value: "color" },
                                        { label: "Image", value: "image" },
                                        { label: "Video", value: "video" },
                                    ]}
                                    helperText="Choose how the hero background is rendered."
                                />
                                {backgroundMediaType === "image" && (
                                    <MediaUpload
                                        label="Background Image"
                                        type="image"
                                        currentUrl={backgroundImageUrl || ""}
                                        onUpload={(url) => handleUpdate({ backgroundImageUrl: url })}
                                        onRemove={() => handleUpdate({ backgroundImageUrl: "" })}
                                        placeholder="Upload or paste image URL"
                                    />
                                )}
                                {backgroundMediaType === "video" && (
                                    <MediaUpload
                                        label="Background Video"
                                        type="video"
                                        currentUrl={backgroundVideoUrl || ""}
                                        onUpload={(url) => handleUpdate({ backgroundVideoUrl: url })}
                                        onRemove={() => handleUpdate({ backgroundVideoUrl: "" })}
                                        placeholder="Upload or paste video URL"
                                    />
                                )}
                            </div>
                        </EditorSection>
                    </div>
                </div>
            </div>
        </div>
    );
}