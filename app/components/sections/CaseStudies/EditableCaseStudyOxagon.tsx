"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
    EditableText,
    EditableTextarea,
} from "../../EditableInputs";

interface CaseStudyOxagonContent {
    projectTitle?: string;
    category?: string;
    overview?: string;
    fullDescription?: string;
    highlights?: string[];
    impact?: string;
    image?: string;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
}

type CaseStudyOxagonSection = BaseSection<CaseStudyOxagonContent>;

interface Props {
    section: CaseStudyOxagonSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<CaseStudyOxagonSection>) => void;
}

export default function EditableCaseStudyOxagon({
    section,
    isEditing,
    onUpdate,
}: Props) {
    const content = section.content || {};

    const {
        projectTitle = "Oxagon – World's First Floating Industrial City",
        category = "Urban Innovation • Industrial Ecosystem • Sustainable Urbanism",
        overview = "Oxagon is a revolutionary floating industrial city in NEOM, Saudi Arabia—designed as a next-generation hub for clean manufacturing, autonomous logistics and circular economy industries.",
        fullDescription = "Oxagon, a core component of NEOM, is the world's first floating industrial city and a landmark model for futuristic manufacturing. Positioned along the Red Sea, it operates on clean energy, features AI-driven systems and integrates autonomous logistics with advanced industrial technologies.\n\nIts circular economy–based masterplan includes green hydrogen production, smart port automation, modular urban scalability and sustainable infrastructure. By combining efficient mobility, innovation labs and living zones, Oxagon is shaping the future of industrial urbanism with resilience and human-centric design at its core.",
        highlights = [
            "World's Largest Floating Industrial City",
            "Industry 4.0-enabled manufacturing zones",
            "Powered entirely by renewable energy including green hydrogen",
            "Circular economy systems optimizing waste, water & energy",
            "AI, IoT & digital twins for real-time urban operations",
        ],
        impact = "A global benchmark redefining how cities can support clean manufacturing, economic diversification and sustainable industrial growth.",
        image = "",
        backgroundColor = "#fef2f2",
        textColor = "#1f2937",
        accentColor = "#dc2626",
    } = content;

    const handleUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const handleHighlightUpdate = (index: number, value: string) => {
        const updatedHighlights = [...highlights];
        updatedHighlights[index] = value;
        handleUpdate({ highlights: updatedHighlights });
    };

    const addHighlight = () => {
        handleUpdate({ highlights: [...highlights, "New Highlight"] });
    };

    const removeHighlight = (index: number) => {
        const updatedHighlights = highlights.filter((_, i) => i !== index);
        handleUpdate({ highlights: updatedHighlights });
    };

    // ===================================================================
    // LIVE VIEW
    // ===================================================================
    if (!isEditing) {
        return (
            <section id="oxagon" className="py-24 relative overflow-hidden" style={{ backgroundColor }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
                                {category}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: textColor }}>
                                {projectTitle}
                            </h2>
                            <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                                <p className="font-medium text-xl text-gray-900 mb-4">{overview}</p>
                                <div className="whitespace-pre-line">{fullDescription}</div>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-50 mb-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center" style={{ color: accentColor }}>
                                    <span className="w-2 h-8 bg-red-600 rounded-full mr-3"></span>
                                    Key Highlights
                                </h3>
                                <ul className="space-y-4">
                                    {highlights.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-red-500 mr-3 mt-1">✦</span>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-l-4 border-red-500 pl-6 py-2">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Impact</h4>
                                <p className="text-gray-600 italic">{impact}</p>
                            </div>
                        </motion.div>

                        {/* Right Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="sticky top-8">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] group">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={projectTitle}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-6xl">🏭</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <div className="text-sm font-medium opacity-80 uppercase tracking-wider mb-2">NEOM, Saudi Arabia</div>
                                        <div className="text-2xl font-bold">The Future of Industrial Innovation</div>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-50"></div>
                                <div className="absolute -z-10 -bottom-10 -left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    }

    // ===================================================================
    // EDITING MODE
    // ===================================================================
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Oxagon Case Study Editor
                    </h1>
                    <p className="text-gray-600">
                        Edit the Oxagon case study details
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Preview */}
                    <div className="sticky top-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-6 bg-red-600 text-white">
                                <h2 className="text-xl font-bold">Preview</h2>
                            </div>
                            <div className="p-6 max-h-[600px] overflow-y-auto">
                                <h3 className="font-bold text-xl mb-2">{projectTitle}</h3>
                                <p className="text-sm text-red-600 mb-4">{category}</p>
                                <p className="text-sm font-medium mb-4">{overview}</p>
                                <div className="text-sm text-gray-600 mb-4 whitespace-pre-line">{fullDescription}</div>
                                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                    <h4 className="font-bold text-sm mb-2">Highlights</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-600">
                                        {highlights.map((h, i) => <li key={i}>{h}</li>)}
                                    </ul>
                                </div>
                                <div className="border-l-2 border-red-500 pl-3">
                                    <span className="text-xs font-bold block">IMPACT</span>
                                    <p className="text-sm italic">{impact}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Content Settings</h2>
                            <div className="space-y-5">
                                <MediaUpload
                                    label="Project Image"
                                    type="image"
                                    currentUrl={image}
                                    onUpload={(url) => handleUpdate({ image: url })}
                                    onRemove={() => handleUpdate({ image: "" })}
                                />
                                <EditableText
                                    label="Project Title"
                                    value={projectTitle}
                                    onChange={(v) => handleUpdate({ projectTitle: v })}
                                />
                                <EditableText
                                    label="Category"
                                    value={category}
                                    onChange={(v) => handleUpdate({ category: v })}
                                />
                                <EditableTextarea
                                    label="Overview (Short Summary)"
                                    value={overview}
                                    onChange={(v) => handleUpdate({ overview: v })}
                                    rows={3}
                                />
                                <EditableTextarea
                                    label="Full Description"
                                    value={fullDescription}
                                    onChange={(v) => handleUpdate({ fullDescription: v })}
                                    rows={6}
                                />
                                <EditableTextarea
                                    label="Impact"
                                    value={impact}
                                    onChange={(v) => handleUpdate({ impact: v })}
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Key Highlights</h2>
                                <button
                                    onClick={addHighlight}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    + Add Item
                                </button>
                            </div>
                            <div className="space-y-3">
                                {highlights.map((highlight, index) => (
                                    <div key={index} className="flex gap-2">
                                        <div className="flex-grow">
                                            <EditableText
                                                label={`Highlight ${index + 1}`}
                                                value={highlight}
                                                onChange={(v) => handleHighlightUpdate(index, v)}
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeHighlight(index)}
                                            className="text-red-500 hover:text-red-700 mt-6"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
