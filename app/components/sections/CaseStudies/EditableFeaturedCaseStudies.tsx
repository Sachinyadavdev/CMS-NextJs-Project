"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
    EditableText,
    EditableTextarea,
} from "../../EditableInputs";

interface FeaturedCaseStudiesContent {
    title?: string;
    subtitle?: string;
    caseStudies?: Array<{
        image: string;
        title: string;
        category: string;
        description: string;
        linkText: string;
        linkUrl: string;
    }>;
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
}

type FeaturedCaseStudiesSection = BaseSection<FeaturedCaseStudiesContent>;

interface Props {
    section: FeaturedCaseStudiesSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<FeaturedCaseStudiesSection>) => void;
}

export default function EditableFeaturedCaseStudies({
    section,
    isEditing,
    onUpdate,
}: Props) {
    const content = section.content || {};

    const {
        title = "Featured Case Studies",
        subtitle = "Explore Our Impact",
        caseStudies = [
            {
                image: "",
                title: "Oxagon – NEOM",
                category: "Industrial City",
                description: "World's first floating industrial city powered by clean energy.",
                linkText: "View Case Study",
                linkUrl: "#oxagon",
            },
            {
                image: "",
                title: "Wynn Al Marjan Island",
                category: "Hospitality Resort",
                description: "UAE's first luxury gaming resort with smart infrastructure.",
                linkText: "View Case Study",
                linkUrl: "#wynn",
            },
            {
                image: "",
                title: "RAUS Exhibitions",
                category: "Global Events",
                description: "Showcasing innovation at The Big 5 Dubai & Architect'24.",
                linkText: "View Case Study",
                linkUrl: "#exhibitions",
            },
        ],
        backgroundColor = "#ffffff",
        textColor = "#1f2937",
        accentColor = "#dc2626",
    } = content;

    const handleUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const handleCaseStudyUpdate = (index: number, field: string, value: any) => {
        const updatedCaseStudies = [...caseStudies];
        updatedCaseStudies[index] = { ...updatedCaseStudies[index], [field]: value };
        handleUpdate({ caseStudies: updatedCaseStudies });
    };

    const addCaseStudy = () => {
        const newCaseStudy = {
            image: "",
            title: "New Case Study",
            category: "Category",
            description: "Description of the case study...",
            linkText: "View Case Study",
            linkUrl: "#",
        };
        handleUpdate({ caseStudies: [...caseStudies, newCaseStudy] });
    };

    const removeCaseStudy = (index: number) => {
        const updatedCaseStudies = caseStudies.filter((_, i) => i !== index);
        handleUpdate({ caseStudies: updatedCaseStudies });
    };

    // ===================================================================
    // LIVE VIEW
    // ===================================================================
    if (!isEditing) {
        return (
            <section className="py-20 relative overflow-hidden" style={{ backgroundColor }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold mb-4"
                            style={{ color: textColor }}
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl font-medium"
                            style={{ color: accentColor }}
                        >
                            {subtitle}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {caseStudies.map((study, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    {study.image ? (
                                        <img
                                            src={study.image}
                                            alt={study.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                            <span className="text-4xl">🖼️</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-red-600 shadow-sm">
                                        {study.category}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                                        {study.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                                        {study.description}
                                    </p>
                                    <a
                                        href={study.linkUrl}
                                        className="inline-flex items-center font-semibold text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        {study.linkText}
                                        <svg
                                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
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
                        Featured Case Studies Editor
                    </h1>
                    <p className="text-gray-600">
                        Manage the featured case studies cards
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Preview */}
                    <div className="sticky top-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-6 bg-gray-900 text-white">
                                <h2 className="text-xl font-bold">Preview</h2>
                            </div>
                            <div className="p-6 bg-gray-100">
                                <div className="space-y-4">
                                    {caseStudies.map((study, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow flex gap-4">
                                            <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                                                {study.image && <img src={study.image} className="w-full h-full object-cover" />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{study.title}</h4>
                                                <span className="text-xs text-red-600 font-medium">{study.category}</span>
                                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{study.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Section Settings</h2>
                            <div className="space-y-4">
                                <EditableText
                                    label="Section Title"
                                    value={title}
                                    onChange={(v) => handleUpdate({ title: v })}
                                />
                                <EditableText
                                    label="Subtitle"
                                    value={subtitle}
                                    onChange={(v) => handleUpdate({ subtitle: v })}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Case Studies Cards</h2>
                                <button
                                    onClick={addCaseStudy}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    + Add Card
                                </button>
                            </div>

                            <div className="space-y-6">
                                {caseStudies.map((study, index) => (
                                    <div key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-200 relative">
                                        <button
                                            onClick={() => removeCaseStudy(index)}
                                            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                        <h3 className="font-medium text-gray-900 mb-4">Card {index + 1}</h3>

                                        <div className="space-y-4">
                                            <MediaUpload
                                                label="Card Image"
                                                type="image"
                                                currentUrl={study.image}
                                                onUpload={(url) => handleCaseStudyUpdate(index, "image", url)}
                                                onRemove={() => handleCaseStudyUpdate(index, "image", "")}
                                            />
                                            <EditableText
                                                label="Title"
                                                value={study.title}
                                                onChange={(v) => handleCaseStudyUpdate(index, "title", v)}
                                            />
                                            <EditableText
                                                label="Category"
                                                value={study.category}
                                                onChange={(v) => handleCaseStudyUpdate(index, "category", v)}
                                            />
                                            <EditableTextarea
                                                label="Description"
                                                value={study.description}
                                                onChange={(v) => handleCaseStudyUpdate(index, "description", v)}
                                                rows={3}
                                            />
                                            <div className="grid grid-cols-2 gap-4">
                                                <EditableText
                                                    label="Link Text"
                                                    value={study.linkText}
                                                    onChange={(v) => handleCaseStudyUpdate(index, "linkText", v)}
                                                />
                                                <EditableText
                                                    label="Link URL"
                                                    value={study.linkUrl}
                                                    onChange={(v) => handleCaseStudyUpdate(index, "linkUrl", v)}
                                                />
                                            </div>
                                        </div>
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
