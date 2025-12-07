import React from "react";
import {
  RealEstateVirtualRealitySection,
  RealEstateVirtualRealityFeature,
  RealEstateVirtualRealityInsight,
} from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const hexToRgba = (hex: string, alpha = 1) => {
  const normalized = hex?.replace("#", "");
  if (!normalized || (normalized.length !== 3 && normalized.length !== 6)) {
    return `rgba(0,0,0,${alpha})`;
  }
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface EditableRealEstateVirtualRealityProps {
  section: RealEstateVirtualRealitySection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateVirtualRealitySection>) => void;
}

export default function EditableRealEstateVirtualRealitySection({
  section,
  isEditing,
  onUpdate,
}: EditableRealEstateVirtualRealityProps) {
  const content = section.content || {};
  const {
    eyebrow = "Virtual Reality",
    title = "Immersive Delivery Systems",
    description = "Virtual Reality (VR) takes our design process even further, offering an interactive experience that allows clients to explore every angle, adjust layouts and refine finishes in real time. This hands-on approach not only enhances collaboration but also empowers clients to make informed decisions with confidence.",
    supportingText = "By integrating these advanced tools into our workflow, we bridge the gap between imagination and reality—delivering spaces that truly resonate.",
    statLabel = "raus.ae",
    statValue = "16+",
    features,
    insights,
    backgroundImage,
    backgroundVideo,
    backgroundColor = "#030712",
    cardBackground = "rgba(19, 19, 19, 0.68)",
    gridColor = "#1f273a",
    textColor = "#c7d2fe",
    titleColor = "#ffffff",
    accentColor = "#7c3aed",
    backgroundOverlay = true,
    backgroundOverlayOpacity = 0.65,
    cardOverlay = true,
    cardOverlayOpacity = 0.2,
  } = content;

  const backgroundOverlayAlpha = clamp(backgroundOverlayOpacity ?? 0, 0, 1);
  const cardOverlayAlpha = clamp(cardOverlayOpacity ?? 0, 0, 1);

  const defaultFeatures: RealEstateVirtualRealityFeature[] = [
    {
      id: "immersive-visualization",
      title: "Immersive Visualization",
      bullets: [
        "Life-scale mixed-reality walkthroughs",
        "Real-time stakeholder collaboration",
        "Early-stage design refinements",
      ],
    },
    {
      id: "digital-twin-analytics",
      title: "Digital Twin Analytics",
      bullets: [
        "Live-data monitoring of cost, schedule, quality",
        "Predictive 'what-if' simulations",
        "Automated anomaly alerts",
      ],
    },
    {
      id: "sustainable-tech",
      title: "Sustainable Tech Integration",
      bullets: [
        "Low-carbon materials modeling",
        "AI-optimized resource allocation",
        "Net-zero performance tracking",
      ],
    },
  ];

  const defaultInsights: RealEstateVirtualRealityInsight[] = [
    {
      id: "immersive-solution",
      title: "Immersive Solution",
      description:
        "Virtual reality, augmented reality and interactive 3D models allow stakeholders to fully engage with designs before construction begins—enabling faster alignment and more informed choices.",
    },
    {
      id: "real-time-experience",
      title: "Real-Time Experience",
      description:
        "Live collaboration tools and instant visual feedback streamline the design-to-build process, ensuring agility and seamless coordination across teams.",
    },
    {
      id: "data-driven",
      title: "Data Driven Decisions",
      description:
        "Design choices are guided by performance metrics, sustainability data and user behavior insights—ensuring outcomes that are efficient and future ready.",
    },
  ];

  const featuresData = features && features.length ? features : defaultFeatures;
  const insightsData = insights && insights.length ? insights : defaultInsights;

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const updateFeatures = (next: RealEstateVirtualRealityFeature[]) => {
    handleContentUpdate({ features: next });
  };

  const updateFeatureById = (
    id: string,
    patch: Partial<RealEstateVirtualRealityFeature>
  ) => {
    const base = features && features.length ? features : defaultFeatures;
    const updated = base.map((feature) =>
      feature.id === id ? { ...feature, ...patch } : feature
    );
    updateFeatures(updated);
  };

  const handleBulletChange = (
    featureId: string,
    index: number,
    value: string
  ) => {
    const base = features && features.length ? features : defaultFeatures;
    const updated = base.map((feature) => {
      if (feature.id !== featureId) return feature;
      const bullets = feature.bullets ? [...feature.bullets] : [];
      bullets[index] = value;
      return { ...feature, bullets };
    });
    updateFeatures(updated);
  };

  const handleAddFeature = () => {
    const base = features && features.length ? features : featuresData;
    const newFeature: RealEstateVirtualRealityFeature = {
      id: `feature-${Date.now()}`,
      title: "New Capability",
      bullets: ["First talking point"],
    };
    updateFeatures([...base, newFeature]);
  };

  const handleRemoveFeature = (featureId: string) => {
    const base = features && features.length ? features : defaultFeatures;
    const filtered = base.filter((feature) => feature.id !== featureId);
    updateFeatures(filtered);
  };

  const handleAddBullet = (featureId: string) => {
    const base = features && features.length ? features : defaultFeatures;
    const updated = base.map((feature) => {
      if (feature.id !== featureId) return feature;
      const bullets = feature.bullets
        ? [...feature.bullets, "New detail"]
        : ["New detail"];
      return { ...feature, bullets };
    });
    updateFeatures(updated);
  };

  const handleRemoveBullet = (featureId: string, index: number) => {
    const base = features && features.length ? features : defaultFeatures;
    const updated = base.map((feature) => {
      if (feature.id !== featureId) return feature;
      const bullets = feature.bullets
        ? feature.bullets.filter((_, idx) => idx !== index)
        : [];
      return { ...feature, bullets };
    });
    updateFeatures(updated);
  };

  const updateInsights = (next: RealEstateVirtualRealityInsight[]) => {
    handleContentUpdate({ insights: next });
  };

  const handleInsightChange = (
    id: string,
    patch: Partial<RealEstateVirtualRealityInsight>
  ) => {
    const base = insights && insights.length ? insights : defaultInsights;
    const updated = base.map((insight) =>
      insight.id === id ? { ...insight, ...patch } : insight
    );
    updateInsights(updated);
  };

  const handleAddInsight = () => {
    const base = insights && insights.length ? insights : insightsData;
    const newInsight: RealEstateVirtualRealityInsight = {
      id: `insight-${Date.now()}`,
      title: "New Insight",
      description: "Explain the outcome or value.",
    };
    updateInsights([...base, newInsight]);
  };

  const handleRemoveInsight = (id: string) => {
    const base = insights && insights.length ? insights : defaultInsights;
    const filtered = base.filter((insight) => insight.id !== id);
    updateInsights(filtered);
  };

  const renderBackgroundMedia = () => (
    <>
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      {backgroundImage && !backgroundVideo && (
        <img
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {backgroundOverlay && (backgroundVideo || backgroundImage) && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: hexToRgba(backgroundColor, backgroundOverlayAlpha),
          }}
        />
      )}
    </>
  );

  const LayoutContent = () => (
    <div className="space-y-16">
      <div className="grid gap-16 lg:grid-cols-2">
        <div className="space-y-6">
          {eyebrow && (
            <span
              className="inline-flex items-center rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{
                color: accentColor,
                borderColor: `${accentColor}40`,
                backgroundColor: `${accentColor}10`,
              }}
            >
              {eyebrow}
            </span>
          )}
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: textColor }}>
            {description}
          </p>
          {supportingText && (
            <p
              className="text-base leading-relaxed"
              style={{ color: textColor }}
            >
              {supportingText}
            </p>
          )}
          <div className="flex items-center gap-4">
            <div
              className="rounded-2xl border px-6 py-4 shadow-2xl"
              style={{
                borderColor: `${accentColor}40`,
                backgroundColor: `${accentColor}15`,
              }}
            >
              <p
                className="text-sm uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                {statLabel}
              </p>
              <p
                className="text-4xl font-semibold"
                style={{ color: titleColor }}
              >
                {statValue}
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          {featuresData.map((feature) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-3xl border backdrop-blur-xl p-6 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-2xl"
              style={{
                backgroundColor: cardBackground,
                borderColor: `${accentColor}20`,
              }}
            >
              {cardOverlay && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: hexToRgba(
                      backgroundColor,
                      cardOverlayAlpha
                    ),
                  }}
                />
              )}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at top right, ${accentColor}30, transparent 60%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  borderColor: "#ef4444",
                  border: "1px solid",
                  borderRadius: "inherit",
                }}
              />
              <div className="relative z-10 space-y-4">
                <h3
                  className="text-lg font-semibold transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: titleColor }}
                >
                  {feature.title}
                </h3>
                <ul className="space-y-2">
                  {feature.bullets?.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 rounded-full transition-all duration-300 group-hover:scale-150"
                        style={{ backgroundColor: accentColor }}
                      />
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: textColor }}
                      >
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      {insightsData.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {insightsData.map((insight) => (
            <div
              key={insight.id}
              className="group relative rounded-3xl border p-6 backdrop-blur overflow-hidden transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer"
              style={{
                backgroundColor: cardBackground,
                borderColor: `${accentColor}15`,
              }}
            >
              {cardOverlay && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: hexToRgba(
                      backgroundColor,
                      cardOverlayAlpha
                    ),
                  }}
                />
              )}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}20, transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  borderColor: "#ef4444",
                  border: "1px solid",
                  borderRadius: "inherit",
                }}
              />
              <p
                className="relative z-10 text-xs uppercase tracking-[0.3em] transition-all duration-300 group-hover:text-opacity-90 group-hover:tracking-[0.35em]"
                style={{ color: accentColor }}
              >
                {insight.title}
              </p>
              <p
                className="relative z-10 mt-3 text-sm leading-relaxed transition-transform duration-300 group-hover:translate-y-0.5"
                style={{ color: textColor }}
              >
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const backgroundGridStyle = {
    backgroundImage: `linear-gradient(90deg, ${gridColor} 1px, transparent 1px), linear-gradient(${gridColor} 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
  } as React.CSSProperties;

  if (!isEditing) {
    return (
      <section
        className="relative overflow-hidden py-24"
        style={{ backgroundColor }}
      >
        {renderBackgroundMedia()}
        <div
          className="absolute inset-0 opacity-40"
          style={backgroundGridStyle}
        />
        <div
          className="absolute -right-10 top-20 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}40` }}
        />
        <div
          className="absolute -left-10 bottom-0 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}25` }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <LayoutContent />
        </div>
      </section>
    );
  }

  const renderPreview = () => (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{ backgroundColor }}
    >
      {renderBackgroundMedia()}
      <div
        className="absolute inset-0 opacity-40"
        style={backgroundGridStyle}
      />
      <div className="relative z-10 px-4 py-8">
        <LayoutContent />
      </div>
    </section>
  );

  return (
    <div className="grid grid-cols-1 gap-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white p-6 shadow-xl lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 lg:col-span-1"
      >
        <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-4">
          <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold text-transparent">
            Live Preview
          </h3>
          <div className="h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
        </div>
        <div className="sticky top-8 rounded-2xl border border-white/50 bg-white/80 shadow-2xl backdrop-blur-sm">
          {renderPreview()}
        </div>
      </motion.div>

      <div className="space-y-6 lg:col-span-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            Narrative
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Eyebrow
              </label>
              <input
                type="text"
                value={eyebrow}
                onChange={(e) =>
                  handleContentUpdate({ eyebrow: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Virtual Reality"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Immersive Delivery Systems"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) =>
                  handleContentUpdate({ description: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Virtual Reality (VR) takes our design process..."
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Supporting Text
              </label>
              <textarea
                rows={3}
                value={supportingText}
                onChange={(e) =>
                  handleContentUpdate({ supportingText: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="By integrating these advanced tools..."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stat Label
                </label>
                <input
                  type="text"
                  value={statLabel}
                  onChange={(e) =>
                    handleContentUpdate({ statLabel: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="raus.ae"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stat Value
                </label>
                <input
                  type="text"
                  value={statValue}
                  onChange={(e) =>
                    handleContentUpdate({ statValue: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="16+"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Feature Clusters
            </h3>
            <button
              type="button"
              onClick={handleAddFeature}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Add Feature
            </button>
          </div>
          <div className="space-y-6">
            {featuresData.map((feature) => (
              <div
                key={feature.id}
                className="rounded-2xl border border-gray-100 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    {feature.title}
                  </p>
                  {featuresData.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feature.id)}
                      className="text-xs font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={feature.title || ""}
                    onChange={(e) =>
                      updateFeatureById(feature.id, { title: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-2"
                    placeholder="Feature title"
                  />
                  <div className="space-y-2">
                    {feature.bullets?.map((bullet, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) =>
                            handleBulletChange(
                              feature.id,
                              index,
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border border-gray-300 px-4 py-2"
                          placeholder="Detail"
                        />
                        {feature.bullets && feature.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveBullet(feature.id, index)
                            }
                            className="rounded-xl border border-red-100 px-3 text-xs font-semibold text-red-500"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(feature.id)}
                    className="rounded-full bg-gray-900 px-4 py-1 text-xs font-semibold text-white"
                  >
                    Add Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              Insight Tiles
            </h3>
            <button
              type="button"
              onClick={handleAddInsight}
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Add Insight
            </button>
          </div>
          <div className="space-y-6">
            {insightsData.map((insight) => (
              <div
                key={insight.id}
                className="rounded-2xl border border-gray-100 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    {insight.title}
                  </p>
                  {insightsData.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveInsight(insight.id)}
                      className="text-xs font-semibold text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={insight.title || ""}
                  onChange={(e) =>
                    handleInsightChange(insight.id, { title: e.target.value })
                  }
                  className="mb-3 w-full rounded-xl border border-gray-300 px-4 py-2"
                  placeholder="Insight title"
                />
                <textarea
                  rows={3}
                  value={insight.description || ""}
                  onChange={(e) =>
                    handleInsightChange(insight.id, {
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-2"
                  placeholder="Insight description"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" />
            Media
          </h3>
          <div className="space-y-4">
            <MediaUpload
              label="Background Image"
              type="image"
              currentUrl={backgroundImage}
              onUpload={(url) => handleContentUpdate({ backgroundImage: url })}
              onRemove={() =>
                handleContentUpdate({ backgroundImage: undefined })
              }
              placeholder="Paste image URL"
            />
            <MediaUpload
              label="Background Video"
              type="video"
              currentUrl={backgroundVideo}
              onUpload={(url) => handleContentUpdate({ backgroundVideo: url })}
              onRemove={() =>
                handleContentUpdate({ backgroundVideo: undefined })
              }
              placeholder="Paste video URL"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500" />
            Colors & Surfaces
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Background Color
              </label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) =>
                  handleContentUpdate({ backgroundColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Title Color
              </label>
              <input
                type="color"
                value={titleColor}
                onChange={(e) =>
                  handleContentUpdate({ titleColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Body Text Color
              </label>
              <input
                type="color"
                value={textColor}
                onChange={(e) =>
                  handleContentUpdate({ textColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Accent Color
              </label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) =>
                  handleContentUpdate({ accentColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Card Background
              </label>
              <input
                type="color"
                value={cardBackground}
                onChange={(e) =>
                  handleContentUpdate({ cardBackground: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Grid Color
              </label>
              <input
                type="color"
                value={gridColor}
                onChange={(e) =>
                  handleContentUpdate({ gridColor: e.target.value })
                }
                className="h-12 w-full cursor-pointer rounded-xl border border-gray-300"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center text-xl font-bold text-gray-800">
            <span className="mr-2 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            Overlay Settings
          </h3>
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Background Overlay
                </label>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={backgroundOverlay}
                    onChange={(e) =>
                      handleContentUpdate({
                        backgroundOverlay: e.target.checked,
                      })
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300"></div>
                </label>
              </div>
              {backgroundOverlay && (
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-600">
                    Opacity: {Math.round(backgroundOverlayOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={backgroundOverlayOpacity}
                    onChange={(e) =>
                      handleContentUpdate({
                        backgroundOverlayOpacity: parseFloat(e.target.value),
                      })
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
                  />
                </div>
              )}
            </div>

            <div className="rounded-xl border border-gray-100 p-4">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700">
                  Card Overlay
                </label>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={cardOverlay}
                    onChange={(e) =>
                      handleContentUpdate({ cardOverlay: e.target.checked })
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300"></div>
                </label>
              </div>
              {cardOverlay && (
                <div>
                  <label className="mb-2 block text-xs font-medium text-gray-600">
                    Opacity: {Math.round(cardOverlayOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={cardOverlayOpacity}
                    onChange={(e) =>
                      handleContentUpdate({
                        cardOverlayOpacity: parseFloat(e.target.value),
                      })
                    }
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
