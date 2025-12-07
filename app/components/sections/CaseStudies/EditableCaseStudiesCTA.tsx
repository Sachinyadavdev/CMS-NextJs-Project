"use client";

import React from "react";
import { motion } from "framer-motion";
import { BaseSection } from "@/lib/db";
import {
    EditableText,
} from "../../EditableInputs";

interface CaseStudiesCTAContent {
    exploreTitle?: string;
    exploreButtonText?: string;
    exploreButtonLink?: string;
    workWithUsTitle?: string;
    workWithUsButtonText?: string;
    workWithUsButtonLink?: string;
    backgroundColor?: string;
    textColor?: string;
}

type CaseStudiesCTASection = BaseSection<CaseStudiesCTAContent>;

interface Props {
    section: CaseStudiesCTASection;
    isEditing: boolean;
    onUpdate: (updates: Partial<CaseStudiesCTASection>) => void;
}

export default function EditableCaseStudiesCTA({
    section,
    isEditing,
    onUpdate,
}: Props) {
    const content = section.content || {};

    const {
        exploreTitle = "Explore More Projects",
        exploreButtonText = "View All Projects",
        exploreButtonLink = "/projects",
        workWithUsTitle = "Work With Us",
        workWithUsButtonText = "Contact Us",
        workWithUsButtonLink = "/contact",
        backgroundColor = "#1f2937", // Dark background
        textColor = "#ffffff",
    } = content;

    const handleUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    // ===================================================================
    // LIVE VIEW
    // ===================================================================
    if (!isEditing) {
        return (
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 text-center">
                        {/* Explore More */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                        >
                            <h3 className="text-3xl font-bold mb-8">{exploreTitle}</h3>
                            <a
                                href={exploreButtonLink}
                                className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors transform hover:scale-105 duration-200"
                            >
                                {exploreButtonText}
                            </a>
                        </motion.div>

                        {/* Work With Us */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-12 border border-red-900/30 hover:border-red-500 transition-all duration-300"
                        >
                            <h3 className="text-3xl font-bold mb-8">{workWithUsTitle}</h3>
                            <a
                                href={workWithUsButtonLink}
                                className="inline-block px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors transform hover:scale-105 duration-200 shadow-lg shadow-red-600/30"
                            >
                                {workWithUsButtonText}
                            </a>
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
                        Case Studies CTA Editor
                    </h1>
                    <p className="text-gray-600">
                        Edit the call to action section
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Preview */}
                    <div className="sticky top-8">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                            <div className="p-6 bg-gray-900 text-white">
                                <h2 className="text-xl font-bold">Preview</h2>
                            </div>
                            <div className="p-6 bg-gray-800">
                                <div className="space-y-6">
                                    <div className="bg-gray-700 p-6 rounded-xl text-center text-white">
                                        <h4 className="text-xl font-bold mb-4">{exploreTitle}</h4>
                                        <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-bold">
                                            {exploreButtonText}
                                        </button>
                                    </div>
                                    <div className="bg-red-900/30 p-6 rounded-xl text-center text-white border border-red-900">
                                        <h4 className="text-xl font-bold mb-4">{workWithUsTitle}</h4>
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-bold">
                                            {workWithUsButtonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Explore Projects Section</h2>
                            <div className="space-y-4">
                                <EditableText
                                    label="Title"
                                    value={exploreTitle}
                                    onChange={(v) => handleUpdate({ exploreTitle: v })}
                                />
                                <EditableText
                                    label="Button Text"
                                    value={exploreButtonText}
                                    onChange={(v) => handleUpdate({ exploreButtonText: v })}
                                />
                                <EditableText
                                    label="Button Link"
                                    value={exploreButtonLink}
                                    onChange={(v) => handleUpdate({ exploreButtonLink: v })}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Work With Us Section</h2>
                            <div className="space-y-4">
                                <EditableText
                                    label="Title"
                                    value={workWithUsTitle}
                                    onChange={(v) => handleUpdate({ workWithUsTitle: v })}
                                />
                                <EditableText
                                    label="Button Text"
                                    value={workWithUsButtonText}
                                    onChange={(v) => handleUpdate({ workWithUsButtonText: v })}
                                />
                                <EditableText
                                    label="Button Link"
                                    value={workWithUsButtonLink}
                                    onChange={(v) => handleUpdate({ workWithUsButtonLink: v })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
