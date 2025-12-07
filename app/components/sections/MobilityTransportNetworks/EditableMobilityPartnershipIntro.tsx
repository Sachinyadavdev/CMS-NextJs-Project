"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
    EditableTextarea,
    EditableText,
    EditableColorPicker,
} from "@/app/components/EditableInputs";
import { ChevronDown, Users, ArrowUpRight } from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { mobilityTheme, mobilitySectionWrapper, mobilityContainer } from "./MobilityTheme";

interface ControlGroupProps {
    title: string;
    id: string;
    activeId: string;
    onToggle: (id: string) => void;
    children: React.ReactNode;
}

type PartnershipMetric = {
    label: string;
    value: string;
    detail?: string;
};

function ControlGroup({ title, id, activeId, onToggle, children }: ControlGroupProps) {
    const isOpen = activeId === id;
    return (
        <motion.div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white/50 hover:bg-white/70 transition-colors">
            <button
                onClick={() => onToggle(id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors"
            >
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.div>
            </button>
            {isOpen && <div className="p-3 space-y-3 border-t border-gray-200/50">{children}</div>}
        </motion.div>
    );
}

interface EditableMobilityPartnershipIntroProps {
    section: PageSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<PageSection>) => void;
}

export default function EditableMobilityPartnershipIntro({ section, isEditing, onUpdate }: EditableMobilityPartnershipIntroProps) {
    const content = (section.content || {}) as MobilityContent;
    const {
        partnershipEyebrow = "Alliance ecosystems",
        title = "Partnership & Alliances",
        bodyText = "We cultivate alliances that transcend transactional relationships. Our partners are integral to our mission to deliver integrated, future-ready environments that empower our clients. Through collaboration, we bring together diverse expertise—from architecture and engineering to smart technologies and sustainable design—ensuring that every project is greater than the sum of its parts.",
        partnershipHighlight = "Co-developing programs with the world’s most forward-looking operators.",
        partnershipImageUrl = "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
        partnershipImageAlt = "Partners collaborating",
        partnershipImageOverlay = "rgba(15,23,42,0.45)",
        partnershipMetrics = [
            { label: "Multi-year alliances", value: "45", detail: "Spanning transit, energy, aviation" },
            { label: "Specialist disciplines", value: "30+", detail: "From acoustics to digital twins" },
        ],
        partnershipPills = [
            "Systems integrators",
            "Transit authorities",
            "Deep-tech labs",
        ],
        partnershipCardBackgroundColor = mobilityTheme.card,
        partnershipAccentSoftColor = "rgba(14,165,233,0.12)",
        backgroundColor = mobilityTheme.pageBackground,
        textColor = mobilityTheme.textPrimary,
        accentColor = mobilityTheme.accent,
    } = content;

    const [activeSection, setActiveSection] = useState<string>("content");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const metricsList = (partnershipMetrics as PartnershipMetric[] | undefined)?.length
        ? (partnershipMetrics as PartnershipMetric[])
        : partnershipMetrics;

    const pillList = partnershipPills && partnershipPills.length ? partnershipPills : ["Systems integrators", "Transit authorities", "Deep-tech labs"];

    const handleMetricChange = (index: number, field: keyof PartnershipMetric, value: string) => {
        const updated = [...metricsList];
        updated[index] = { ...updated[index], [field]: value };
        handleContentUpdate({ partnershipMetrics: updated });
    };

    const handleAddMetric = () => {
        const updated = [...metricsList, { label: "New metric", value: "0" }];
        handleContentUpdate({ partnershipMetrics: updated });
    };

    const handleRemoveMetric = (index: number) => {
        const updated = metricsList.filter((_, metricIndex) => metricIndex !== index);
        handleContentUpdate({ partnershipMetrics: updated });
    };

    const handlePillChange = (index: number, value: string) => {
        const updated = [...pillList];
        updated[index] = value;
        handleContentUpdate({ partnershipPills: updated });
    };

    const handleAddPill = () => {
        handleContentUpdate({ partnershipPills: [...pillList, "New focus"] });
    };

    const handleRemovePill = (index: number) => {
        const updated = pillList.filter((_, pillIndex) => pillIndex !== index);
        handleContentUpdate({ partnershipPills: updated });
    };

    const viewModeContent = {
        partnershipEyebrow,
        title,
        bodyText,
        partnershipHighlight,
        partnershipImageUrl,
        partnershipImageAlt,
        partnershipImageOverlay,
        partnershipMetrics: metricsList,
        partnershipPills: pillList,
        partnershipCardBackgroundColor,
        partnershipAccentSoftColor,
        backgroundColor,
        textColor,
        accentColor,
    };

    if (!isEditing) {
        return <MobilityPartnershipIntroView content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Partnership Intro Editor"
            description="Layer images, highlights, metrics and full styling controls."
            preview={
                <div className="h-full overflow-auto">
                    <MobilityPartnershipIntroView content={viewModeContent} />
                </div>
            }
            controls={
                <div className="space-y-4">
                    <ControlGroup title="Narrative" id="content" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableText
                            label="Eyebrow"
                            value={partnershipEyebrow}
                            onChange={(value) => handleContentUpdate({ partnershipEyebrow: value })}
                        />
                        <EditableText label="Title" value={title} onChange={(value) => handleContentUpdate({ title: value })} />
                        <EditableTextarea
                            label="Body"
                            value={bodyText}
                            onChange={(value) => handleContentUpdate({ bodyText: value })}
                            rows={6}
                        />
                        <EditableTextarea
                            label="Highlight"
                            value={partnershipHighlight}
                            onChange={(value) => handleContentUpdate({ partnershipHighlight: value })}
                            rows={3}
                        />
                    </ControlGroup>
                    <ControlGroup title="Focus Areas" id="pills" activeId={activeSection} onToggle={setActiveSection}>
                        {pillList.map((pill, index) => (
                            <div key={index} className="space-y-2 rounded-lg border border-gray-200/80 p-3 bg-white">
                                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                                    Focus {index + 1}
                                    {pillList.length > 1 && (
                                        <button type="button" className="text-rose-500" onClick={() => handleRemovePill(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <EditableText label="Chip Text" value={pill} onChange={(value) => handlePillChange(index, value)} />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddPill}
                            className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Add Focus
                        </button>
                    </ControlGroup>
                    <ControlGroup title="Metrics" id="metrics" activeId={activeSection} onToggle={setActiveSection}>
                        {metricsList.map((metric, index) => (
                            <div key={index} className="space-y-2 rounded-lg border border-gray-200/80 p-3 bg-white">
                                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                                    Metric {index + 1}
                                    {metricsList.length > 1 && (
                                        <button type="button" className="text-rose-500" onClick={() => handleRemoveMetric(index)}>
                                            Remove
                                        </button>
                                    )}
                                </div>
                                <EditableText
                                    label="Value"
                                    value={metric.value}
                                    onChange={(value) => handleMetricChange(index, "value", value)}
                                />
                                <EditableText
                                    label="Label"
                                    value={metric.label}
                                    onChange={(value) => handleMetricChange(index, "label", value)}
                                />
                                <EditableText
                                    label="Detail"
                                    value={metric.detail || ""}
                                    onChange={(value) => handleMetricChange(index, "detail", value)}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddMetric}
                            className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Add Metric
                        </button>
                    </ControlGroup>
                    <ControlGroup title="Imagery" id="imagery" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableText
                            label="Image URL"
                            value={partnershipImageUrl}
                            onChange={(value) => handleContentUpdate({ partnershipImageUrl: value })}
                        />
                        <EditableText
                            label="Image Alt"
                            value={partnershipImageAlt}
                            onChange={(value) => handleContentUpdate({ partnershipImageAlt: value })}
                        />
                        <EditableColorPicker
                            label="Image Overlay"
                            value={partnershipImageOverlay}
                            onChange={(value) => handleContentUpdate({ partnershipImageOverlay: value })}
                        />
                    </ControlGroup>
                    <ControlGroup title="Styles" id="styles" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableColorPicker
                            label="Background"
                            value={backgroundColor}
                            onChange={(value) => handleContentUpdate({ backgroundColor: value })}
                        />
                        <EditableColorPicker
                            label="Text"
                            value={textColor}
                            onChange={(value) => handleContentUpdate({ textColor: value })}
                        />
                        <EditableColorPicker
                            label="Accent"
                            value={accentColor}
                            onChange={(value) => handleContentUpdate({ accentColor: value })}
                        />
                        <EditableColorPicker
                            label="Card Background"
                            value={partnershipCardBackgroundColor}
                            onChange={(value) => handleContentUpdate({ partnershipCardBackgroundColor: value })}
                        />
                        <EditableColorPicker
                            label="Soft Accent"
                            value={partnershipAccentSoftColor}
                            onChange={(value) => handleContentUpdate({ partnershipAccentSoftColor: value })}
                        />
                    </ControlGroup>
                </div>
            }
        />
    );
}

function MobilityPartnershipIntroView({ content }: { content: any }) {
    const metrics: PartnershipMetric[] = content.partnershipMetrics || [];

    return (
        <section className={`${mobilitySectionWrapper}`} style={{ backgroundColor: content.backgroundColor }}>
            <div className={`${mobilityContainer} relative`}>
                <div
                    className="absolute inset-0 rounded-[48px] blur-3xl opacity-70"
                    style={{ background: content.partnershipAccentSoftColor }}
                />
                <div className="relative grid lg:grid-cols-[minmax(0,1fr)_420px] gap-12 items-center">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur"
                        >
                            <Users className="w-4 h-4" style={{ color: content.accentColor }} />
                            <span className="text-xs font-semibold tracking-[0.3em] uppercase" style={{ color: content.accentColor }}>
                                {content.partnershipEyebrow}
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold"
                            style={{ color: content.textColor }}
                        >
                            {content.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-lg leading-relaxed text-white/80"
                        >
                            {content.bodyText}
                        </motion.p>
                        {content.partnershipHighlight && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-4 text-white"
                            >
                                {content.partnershipHighlight}
                            </motion.div>
                        )}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="flex flex-wrap gap-3"
                        >
                            {(content.partnershipPills || []).map((pill: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full text-sm font-semibold border border-white/15 bg-white/10 text-white/80"
                                >
                                    {pill}
                                </span>
                            ))}
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="grid sm:grid-cols-2 gap-4"
                        >
                            {metrics.map((metric, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
                                    style={{ backgroundColor: content.partnershipCardBackgroundColor }}
                                >
                                    <div className="text-3xl font-semibold" style={{ color: content.accentColor }}>
                                        {metric.value}
                                    </div>
                                    <div className="text-sm font-medium text-white/80">{metric.label}</div>
                                    {metric.detail && <div className="text-xs text-white/60 mt-1">{metric.detail}</div>}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-[32px] blur-3xl opacity-60" style={{ background: content.accentColor }} />
                        <div className="relative rounded-[32px] overflow-hidden border border-white/15 shadow-2xl">
                            <div
                                className="absolute inset-0"
                                style={{ background: content.partnershipImageOverlay, mixBlendMode: "multiply" }}
                            />
                            <div
                                className="h-[440px]"
                                style={{
                                    backgroundImage: `url(${content.partnershipImageUrl})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                role="img"
                                aria-label={content.partnershipImageAlt}
                            />
                            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/15 backdrop-blur px-6 py-4 text-white flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-white/70">Alliance cadence</p>
                                    <p className="text-lg font-semibold">Weekly design sprints</p>
                                </div>
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
