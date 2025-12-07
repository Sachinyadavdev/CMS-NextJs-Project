"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PageSection, MobilityContent } from "@/lib/db";
import {
    EditableTextarea,
    EditableText,
    EditableColorPicker,
    EditableSelect,
    EditableRange,
} from "@/app/components/EditableInputs";
import {
    ChevronDown,
    Globe,
    Award,
    Leaf,
    HardHat,
    Building2,
    Handshake,
    ShieldCheck,
    Cpu,
    Sparkles,
} from "lucide-react";
import SectionEditorLayout from "./SectionEditorLayout";
import { mobilityTheme, mobilitySectionWrapper, mobilityContainer, mobilityPanel } from "./MobilityTheme";

interface ControlGroupProps {
    title: string;
    id: string;
    activeId: string;
    onToggle: (id: string) => void;
    children: React.ReactNode;
}

interface PartnerCategory {
    title: string;
    description: string;
    iconName?: string;
    stat?: string;
    badge?: string;
}

const iconLibrary = {
    globe: Globe,
    award: Award,
    leaf: Leaf,
    hardhat: HardHat,
    building: Building2,
    handshake: Handshake,
    shield: ShieldCheck,
    cpu: Cpu,
    sparkles: Sparkles,
};

const iconOptions = [
    { label: "Globe", value: "globe" },
    { label: "Award", value: "award" },
    { label: "Leaf", value: "leaf" },
    { label: "Hardhat", value: "hardhat" },
    { label: "Building", value: "building" },
    { label: "Handshake", value: "handshake" },
    { label: "Shield", value: "shield" },
    { label: "Compute", value: "cpu" },
    { label: "Sparkles", value: "sparkles" },
];

function ControlGroup({ title, id, activeId, onToggle, children }: ControlGroupProps) {
    const isOpen = activeId === id;
    return (
        <motion.div className="border border-gray-200/50 rounded-xl overflow-hidden bg-white/50 hover:bg-white/70 transition-colors">
            <button
                onClick={() => onToggle(isOpen ? "" : id)}
                className="w-full flex items-center justify-between p-3 hover:bg-gray-50/50 transition-colors"
            >
                <span className="text-sm font-semibold text-gray-700">{title}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.div>
            </button>
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-200/30"
            >
                <div className="p-4 space-y-4">{children}</div>
            </motion.div>
        </motion.div>
    );
}

interface EditableMobilityPartnersListProps {
    section: PageSection;
    isEditing: boolean;
    onUpdate: (updates: Partial<PageSection>) => void;
}

export default function EditableMobilityPartnersList({
    section,
    isEditing,
    onUpdate,
}: EditableMobilityPartnersListProps) {
    const content = (section.content || {}) as MobilityContent;

    const {
        partnersEyebrow = "Collaborative ecosystem",
        eyebrowIcon = "sparkles",
        eyebrowIconColor = "#f59e0b",
        partnersTitle = "Partner categories",
        enableTitleGradient = false,
        titleGradientFrom = "#f59e0b",
        titleGradientTo = "#ef4444",
        partnersDescription = "Long-term alignments with regulators, builders, technology platforms and delivery specialists.",
        partnersHighlightItems = [
            "Mobility authorities",
            "Systems integrators",
            "Sustainability labs",
        ],
        highlightStyle = "pill", // pill | outlined | minimal
        categories = [
            {
                title: "Global Technology Providers",
                description: "Leaders in BIM, AI analytics and digital transformation who help us drive efficiency, quality and innovation.",
                iconName: "cpu",
                stat: "20+ active",
                badge: "Digital",
            },
            {
                title: "Specialist Consultants",
                description: "Experts in acoustics, ergonomics, biophilic design, glare management and other niche disciplines that elevate project outcomes.",
                iconName: "award",
                stat: "30 disciplines",
                badge: "Expertise",
            },
            {
                title: "Sustainability Partners",
                description: "Organizations dedicated to green building practices, circular economy solutions and energy-efficient technologies.",
                iconName: "leaf",
                stat: "Net-zero focus",
                badge: "ESG",
            },
            {
                title: "Construction & Fit-out Contractors",
                description: "Proven collaborators who share our commitment to quality, safety and timely delivery.",
                iconName: "hardhat",
                stat: "Tier-1",
                badge: "Delivery",
            },
            {
                title: "Public Sector & Regulatory Stakeholders",
                description: "Long-standing relationships with key authorities to navigate approvals seamlessly and ensure compliance.",
                iconName: "building",
                stat: "12 agencies",
                badge: "Regulatory",
            },
        ],
        categoryLayout = "horizontal", // horizontal | vertical
        categoryHoverEffect = "lift", // lift | glow | none
        iconSize = "lg",
        cardBorderRadius = "2xl",
        partnersImageUrl = "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1200&q=80",
        imageOverlayOpacity = 0.3,
        imageOverlayGradient = "to-bottom",
        footerText = "Our partners are more than vendors; they’re collaborators in shaping tomorrow’s environments.",
        showFooterCTA = true,
        footerCTAText = "Explore Partnerships",
        footerCTALink = "#",
        sectionPaddingTop = 24,
        sectionPaddingBottom = 24,
        backgroundColor = mobilityTheme.pageBackground,
        cardBackgroundColor = mobilityTheme.card,
        partnersCardBackgroundColor = mobilityTheme.card,
        textColor = mobilityTheme.textPrimary,
        accentColor = mobilityTheme.accent,
    } = content;

    const [activeSection, setActiveSection] = useState<string>("header");

    const handleContentUpdate = (patch: Record<string, unknown>) => {
        onUpdate({ content: { ...content, ...patch } });
    };

    const handleCategoryUpdate = (index: number, field: keyof PartnerCategory, value: string) => {
        const updated = [...(categories as PartnerCategory[])];
        updated[index] = { ...updated[index], [field]: value };
        handleContentUpdate({ categories: updated });
    };

    const handleAddCategory = () => {
        handleContentUpdate({
            categories: [...categories, { title: "New Partner Category", description: "Describe this partnership.", iconName: "globe", badge: "New" }],
        });
    };

    const handleRemoveCategory = (index: number) => {
        handleContentUpdate({ categories: categories.filter((_, i) => i !== index) });
    };

    const handleHighlightChange = (index: number, value: string) => {
        const updated = [...partnersHighlightItems];
        updated[index] = value;
        handleContentUpdate({ partnersHighlightItems: updated });
    };

    const handleAddHighlight = () => {
        handleContentUpdate({ partnersHighlightItems: [...partnersHighlightItems, "New highlight"] });
    };

    const handleRemoveHighlight = (index: number) => {
        handleContentUpdate({ partnersHighlightItems: partnersHighlightItems.filter((_, i) => i !== index) });
    };

    const viewModeContent = {
        partnersEyebrow,
        eyebrowIcon,
        eyebrowIconColor,
        partnersTitle,
        enableTitleGradient,
        titleGradientFrom,
        titleGradientTo,
        partnersDescription,
        partnersHighlightItems,
        highlightStyle,
        categories,
        categoryLayout,
        categoryHoverEffect,
        iconSize,
        cardBorderRadius,
        partnersImageUrl,
        imageOverlayOpacity,
        imageOverlayGradient,
        footerText,
        showFooterCTA,
        footerCTAText,
        footerCTALink,
        sectionPaddingTop,
        sectionPaddingBottom,
        backgroundColor,
        cardBackgroundColor,
        partnersCardBackgroundColor,
        textColor,
        accentColor,
    };

    if (!isEditing) {
        return <MobilityPartnersListView content={viewModeContent} />;
    }

    return (
        <SectionEditorLayout
            title="Partners List Editor"
            description="Fully customizable partner ecosystem section with advanced styling."
            preview={
                <div className="h-full overflow-auto bg-gray-50">
                    <MobilityPartnersListView content={viewModeContent} />
                </div>
            }
            controls={
                <div className="space-y-4">
                    {/* Header & Title */}
                    <ControlGroup title="Header & Title" id="header" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableText label="Eyebrow" value={partnersEyebrow} onChange={(v) => handleContentUpdate({ partnersEyebrow: v })} />
                        <EditableSelect label="Eyebrow Icon" value={eyebrowIcon} onChange={(v) => handleContentUpdate({ eyebrowIcon: v })} options={iconOptions} />
                        <EditableColorPicker label="Eyebrow Icon Color" value={eyebrowIconColor} onChange={(v) => handleContentUpdate({ eyebrowIconColor: v })} />
                        <EditableText label="Main Title" value={partnersTitle} onChange={(v) => handleContentUpdate({ partnersTitle: v })} />
                        <div className="flex items-center gap-3">
                            <input type="checkbox" checked={enableTitleGradient} onChange={(e) => handleContentUpdate({ enableTitleGradient: e.target.checked })} />
                            <label className="text-sm font-medium">Enable Gradient Title</label>
                        </div>
                        {enableTitleGradient && (
                            <>
                                <EditableColorPicker label="Gradient From" value={titleGradientFrom} onChange={(v) => handleContentUpdate({ titleGradientFrom: v })} />
                                <EditableColorPicker label="Gradient To" value={titleGradientTo} onChange={(v) => handleContentUpdate({ titleGradientTo: v })} />
                            </>
                        )}
                        <EditableTextarea label="Description" value={partnersDescription} onChange={(v) => handleContentUpdate({ partnersDescription: v })} rows={4} />
                    </ControlGroup>

                    {/* Highlights */}
                    <ControlGroup title="Highlights" id="highlights" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableSelect label="Style" value={highlightStyle} onChange={(v) => handleContentUpdate({ highlightStyle: v })}
                            options={[
                                { label: "Pill (Soft)", value: "pill" },
                                { label: "Outlined", value: "outlined" },
                                { label: "Minimal", value: "minimal" },
                            ]}
                        />
                        {partnersHighlightItems.map((item: string, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <EditableText value={item} onChange={(v) => handleHighlightChange(i, v)} />
                                {partnersHighlightItems.length > 1 && (
                                    <button onClick={() => handleRemoveHighlight(i)} className="text-red-500 text-xs">Remove</button>
                                )}
                            </div>
                        ))}
                        <button onClick={handleAddHighlight} className="text-sm text-blue-600 font-medium">+ Add Highlight</button>
                    </ControlGroup>

                    {/* Categories */}
                    <ControlGroup title="Partner Categories" id="categories" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableSelect label="Layout" value={categoryLayout} onChange={(v) => handleContentUpdate({ categoryLayout: v })}
                            options={[
                                { label: "Horizontal", value: "horizontal" },
                                { label: "Vertical", value: "vertical" },
                            ]}
                        />
                        <EditableSelect label="Hover Effect" value={categoryHoverEffect} onChange={(v) => handleContentUpdate({ categoryHoverEffect: v })}
                            options={[
                                { label: "Lift Up", value: "lift" },
                                { label: "Glow", value: "glow" },
                                { label: "None", value: "none" },
                            ]}
                        />
                        <EditableSelect label="Icon Size" value={iconSize} onChange={(v) => handleContentUpdate({ iconSize: v })}
                            options={[
                                { label: "Small", value: "sm" },
                                { label: "Medium", value: "md" },
                                { label: "Large", value: "lg" },
                                { label: "X-Large", value: "xl" },
                            ]}
                        />
                        {(categories as PartnerCategory[]).map((cat, i) => (
                            <div key={i} className="p-4 border rounded-lg space-y-3 bg-gray-50">
                                <div className="flex justify-between">
                                    <span className="text-sm font-semibold">Category {i + 1}</span>
                                    {categories.length > 1 && <button onClick={() => handleRemoveCategory(i)} className="text-red-500 text-xs">Remove</button>}
                                </div>
                                <EditableText label="Title" value={cat.title} onChange={(v) => handleCategoryUpdate(i, "title", v)} />
                                <EditableTextarea label="Description" value={cat.description} onChange={(v) => handleCategoryUpdate(i, "description", v)} rows={3} />
                                <EditableText label="Badge" value={cat.badge || ""} onChange={(v) => handleCategoryUpdate(i, "badge", v)} />
                                <EditableText label="Stat" value={cat.stat || ""} onChange={(v) => handleCategoryUpdate(i, "stat", v)} />
                                <EditableSelect label="Icon" value={cat.iconName || "globe"} onChange={(v) => handleCategoryUpdate(i, "iconName", v)} options={iconOptions} />
                            </div>
                        ))}
                        <button onClick={handleAddCategory} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                            + Add Category
                        </button>
                    </ControlGroup>

                    {/* Image & Overlay */}
                    <ControlGroup title="Hero Image" id="image" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableText label="Image URL" value={partnersImageUrl} onChange={(v) => handleContentUpdate({ partnersImageUrl: v })} />
                        <EditableRange label="Overlay Opacity (%)" value={imageOverlayOpacity * 100} min={0} max={80} onChange={(v) => handleContentUpdate({ imageOverlayOpacity: v / 100 })} />
                        <EditableSelect label="Overlay Gradient" value={imageOverlayGradient} onChange={(v) => handleContentUpdate({ imageOverlayGradient: v })}
                            options={[
                                { label: "Top to Bottom", value: "to-bottom" },
                                { label: "Diagonal", value: "to-br" },
                                { label: "Radial", value: "radial" },
                                { label: "None", value: "none" },
                            ]}
                        />
                    </ControlGroup>

                    {/* Footer & CTA */}
                    <ControlGroup title="Footer & CTA" id="footer" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableTextarea label="Footer Text" value={footerText} onChange={(v) => handleContentUpdate({ footerText: v })} rows={4} />
                        <div className="flex items-center gap-3">
                            <input type="checkbox" checked={showFooterCTA} onChange={(e) => handleContentUpdate({ showFooterCTA: e.target.checked })} />
                            <label>Show CTA Button</label>
                        </div>
                        {showFooterCTA && (
                            <>
                                <EditableText label="Button Text" value={footerCTAText} onChange={(v) => handleContentUpdate({ footerCTAText: v })} />
                                <EditableText label="Button Link" value={footerCTALink} onChange={(v) => handleContentUpdate({ footerCTALink: v })} />
                            </>
                        )}
                    </ControlGroup>

                    {/* Spacing & Style */}
                    <ControlGroup title="Spacing & Style" id="style" activeId={activeSection} onToggle={setActiveSection}>
                        <EditableRange label="Top Padding (rem)" value={sectionPaddingTop} min={8} max={48} step={4} showValue onChange={(v) => handleContentUpdate({ sectionPaddingTop: v })} />
                        <EditableRange label="Bottom Padding (rem)" value={sectionPaddingBottom} min={8} max={48} step={4} showValue onChange={(v) => handleContentUpdate({ sectionPaddingBottom: v })} />
                        <EditableColorPicker label="Background" value={backgroundColor} onChange={(v) => handleContentUpdate({ backgroundColor: v })} />
                        <EditableColorPicker label="Text Color" value={textColor} onChange={(v) => handleContentUpdate({ textColor: v })} />
                        <EditableColorPicker label="Accent Color" value={accentColor} onChange={(v) => handleContentUpdate({ accentColor: v })} />
                        <EditableColorPicker label="Card Background" value={partnersCardBackgroundColor} onChange={(v) => handleContentUpdate({ partnersCardBackgroundColor: v })} />
                    </ControlGroup>
                </div>
            }
        />
    );
}

// Final Enhanced View Component
function MobilityPartnersListView({ content }: { content: any }) {
    const categories: PartnerCategory[] = content.categories || [];

    const getOverlayGradient = () => {
        if (content.imageOverlayGradient === "to-bottom") return "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)";
        if (content.imageOverlayGradient === "to-br") return "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.6) 100%)";
        if (content.imageOverlayGradient === "radial") return "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.7) 100%)";
        return "transparent";
    };

    const IconComponent = iconLibrary[content.eyebrowIcon as keyof typeof iconLibrary] || Sparkles;

    return (
        <section
            className={`${mobilitySectionWrapper}`}
            style={{
                backgroundColor: content.backgroundColor,
                paddingTop: `${content.sectionPaddingTop / 4}rem`,
                paddingBottom: `${content.sectionPaddingBottom / 4}rem`,
            }}
        >
            <div className={`${mobilityContainer} space-y-20`}>
                {/* Hero */}
                <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                        >
                            <IconComponent className="w-5 h-5" style={{ color: content.eyebrowIconColor }} />
                            <span className="text-sm font-bold tracking-widest uppercase" style={{ color: content.eyebrowIconColor }}>
                                {content.partnersEyebrow}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black leading-tight"
                        >
                            {content.enableTitleGradient ? (
                                <span style={{
                                    background: `linear-gradient(135deg, ${content.titleGradientFrom}, ${content.titleGradientTo})`,
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    {content.partnersTitle}
                                </span>
                            ) : (
                                <span style={{ color: content.textColor }}>{content.partnersTitle}</span>
                            )}
                        </motion.h2>

                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg opacity-90" style={{ color: content.textColor }}>
                            {content.partnersDescription}
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-3">
                            {content.partnersHighlightItems.map((item: string, i: number) => {
                                const base = "px-5 py-2.5 rounded-full text-sm font-medium transition-all";
                                if (content.highlightStyle === "outlined")
                                    return <span key={i} className={`${base} border border-white/30 bg-transparent text-white/90`}>{item}</span>;
                                if (content.highlightStyle === "minimal")
                                    return <span key={i} className={`${base} bg-transparent text-white/80`}>{item}</span>;
                                return <span key={i} className={`${base} bg-white/15 backdrop-blur border border-white/20 text-white`}>{item}</span>;
                            })}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-3xl blur-3xl opacity-60" style={{ backgroundColor: content.accentColor }} />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <div
                                className="h-96 bg-cover bg-center"
                                style={{ backgroundImage: `url(${content.partnersImageUrl})` }}
                            >
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: getOverlayGradient(),
                                        opacity: content.imageOverlayOpacity,
                                    }}
                                />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-lg rounded-2xl p-6 border border-white/30">
                                <p className="text-white/80 text-sm">Collaboration Ecosystem</p>
                                <p className="text-white text-xl font-bold">Integrated Partner Network</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Categories */}
                <div className={`grid gap-8 ${content.categoryLayout === "vertical" ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"}`}>
                    {categories.map((cat: PartnerCategory, i: number) => {
                        const Icon = iconLibrary[cat.iconName as keyof typeof iconLibrary] || Globe;
                        const sizeClass = content.iconSize === "xl" ? "w-12 h-12" : content.iconSize === "lg" ? "w-10 h-10" : content.iconSize === "md" ? "w-8 h-8" : "w-6 h-6";

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`
                                    ${mobilityPanel} rounded-${content.cardBorderRadius} p-8 border border-white/10
                                    ${content.categoryHoverEffect === "lift" ? "hover:-translate-y-2" : ""}
                                    ${content.categoryHoverEffect === "glow" ? "hover:shadow-2xl hover:shadow-white/20" : ""}
                                    transition-all duration-300
                                `}
                                style={{ backgroundColor: content.partnersCardBackgroundColor }}
                            >
                                <div className={content.categoryLayout === "vertical" ? "space-y-6 text-center" : "flex items-start gap-8"}>
                                    <div className={`${content.categoryLayout === "vertical" ? "mx-auto" : ""} p-5 rounded-2xl bg-white/10 border border-white/20`}>
                                        <Icon className={sizeClass} style={{ color: content.accentColor }} />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        {cat.badge && <p className="text-xs font-bold tracking-widest uppercase opacity-70">{cat.badge}</p>}
                                        <h3 className="text-2xl font-bold" style={{ color: content.textColor }}>{cat.title}</h3>
                                        {cat.stat && <p className="text-sm opacity-70">{cat.stat}</p>}
                                        <p className="leading-relaxed opacity-90">{cat.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center space-y-8"
                >
                    <p className="text-xl md:text-2xl font-light italic max-w-4xl mx-auto leading-relaxed" style={{ color: content.textColor }}>
                        "{content.footerText}"
                    </p>
                    {content.showFooterCTA && (
                        <a
                            href={content.footerCTALink}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/30 transition-all"
                        >
                            {content.footerCTAText}
                            <Sparkles className="w-5 h-5" />
                        </a>
                    )}
                </motion.div>
            </div>
        </section>
    );
}