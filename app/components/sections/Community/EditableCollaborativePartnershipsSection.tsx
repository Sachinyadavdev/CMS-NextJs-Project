import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { EditableText, EditableTextarea } from "@/app/components/EditableInputs";

interface CollaborativePartnershipsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  stakeholderGroups?: Array<{
    group: string;
    role: string;
    collaboration: string[];
    icon: string;
  }>;
  partnershipModels?: Array<{
    model: string;
    description: string;
    benefits: string;
    icon: string;
  }>;
  impactMetrics?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type CollaborativePartnershipsSection = BaseSection<CollaborativePartnershipsContent>;

interface Props {
  section: CollaborativePartnershipsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<CollaborativePartnershipsSection>) => void;
}

export default function EditableCollaborativePartnershipsSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Collaborative Community Partnerships",
    subtitle = "Working Together for Lasting Impact",
    description = "By working closely with local authorities, NGOs, civic organizations, and stakeholders, RAUS ensures every project responds to real needs and delivers lasting social impact.",
    stakeholderGroups = [
      {
        group: "Local Authorities",
        role: "Policy guidance and regulatory compliance",
        collaboration: ["Joint planning sessions", "Regulatory alignment", "Permit coordination"],
        icon: "🏛️"
      },
      {
        group: "NGOs & Non-Profits",
        role: "Community outreach and social programs",
        collaboration: ["Needs assessment", "Program integration", "Impact measurement"],
        icon: "🤝"
      },
      {
        group: "Civic Organizations",
        role: "Community representation and advocacy",
        collaboration: ["Stakeholder engagement", "Feedback integration", "Event coordination"],
        icon: "👥"
      },
      {
        group: "Local Businesses",
        role: "Economic development and job creation",
        collaboration: ["Supplier partnerships", "Employment programs", "Economic impact studies"],
        icon: "💼"
      }
    ],
    partnershipModels = [
      {
        model: "Integrated Planning",
        description: "Collaborative project planning from concept to completion",
        benefits: "Comprehensive solutions that meet all stakeholder needs",
        icon: "📋"
      },
      {
        model: "Community Advisory Boards",
        description: "Ongoing community input throughout the project lifecycle",
        benefits: "Ensures projects reflect community priorities and values",
        icon: "🎯"
      },
      {
        model: "Impact Partnerships",
        description: "Joint initiatives for maximum community benefit",
        benefits: "Amplified positive impact through combined resources",
        icon: "🚀"
      }
    ],
    impactMetrics = [
      { value: "150+", label: "Active Partnerships" },
      { value: "25,000+", label: "Community Members Engaged" },
      { value: "98%", label: "Stakeholder Satisfaction" },
      { value: "500+", label: "Joint Initiatives Completed" }
    ],
    backgroundColor = "from-red-50 to-crimson-50",
    textColor = "text-gray-800",
    accentColor = "red"
  } = content;

  const [localContent, setLocalContent] = useState(content);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...localContent, [field]: value };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const handleStakeholderUpdate = (index: number, field: string, value: any) => {
    const updatedStakeholders = [...(localContent.stakeholderGroups || stakeholderGroups)];
    if (field === 'collaboration') {
      updatedStakeholders[index] = { ...updatedStakeholders[index], collaboration: value };
    } else {
      updatedStakeholders[index] = { ...updatedStakeholders[index], [field]: value };
    }
    handleUpdate('stakeholderGroups', updatedStakeholders);
  };

  const handleModelUpdate = (index: number, field: string, value: any) => {
    const updatedModels = [...(localContent.partnershipModels || partnershipModels)];
    updatedModels[index] = { ...updatedModels[index], [field]: value };
    handleUpdate('partnershipModels', updatedModels);
  };

  const handleMetricUpdate = (index: number, field: string, value: any) => {
    const updatedMetrics = [...(localContent.impactMetrics || impactMetrics)];
    updatedMetrics[index] = { ...updatedMetrics[index], [field]: value };
    handleUpdate('impactMetrics', updatedMetrics);
  };

  // ===================================================================
  // LIVE VIEW – Modern Collaborative Partnerships Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}>
      {/* Partnership network visualization */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          {/* Central hub */}
          <motion.circle
            cx="600"
            cy="400"
            r="40"
            fill="#DC2626"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Connecting lines to stakeholders */}
          <motion.line
            x1="600" y1="400" x2="300" y2="200"
            stroke="#EF4444"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="600" y1="400" x2="900" y2="200"
            stroke="#F87171"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
          <motion.line
            x1="600" y1="400" x2="300" y2="600"
            stroke="#EF4444"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.line
            x1="600" y1="400" x2="900" y2="600"
            stroke="#F87171"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
          />

          {/* Stakeholder nodes */}
          <motion.circle
            cx="300" cy="200" r="25"
            fill="#DC2626"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx="900" cy="200" r="25"
            fill="#EF4444"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle
            cx="300" cy="600" r="25"
            fill="#F87171"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.circle
            cx="900" cy="600" r="25"
            fill="#DC2626"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`text-4xl md:text-5xl font-bold ${textColor} mb-4`}
          >
            {title}
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xl md:text-2xl font-semibold text-${accentColor}-600 mb-6`}
          >
            {subtitle}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-lg ${textColor} max-w-3xl mx-auto leading-relaxed`}
          >
            {description}
          </motion.p>
        </div>

        {/* Stakeholder Groups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {(localContent.stakeholderGroups || stakeholderGroups).map((stakeholder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                <span className="text-5xl mr-4">{stakeholder.icon}</span>
                <div>
                  <h5 className="text-2xl font-bold text-gray-800">{stakeholder.group}</h5>
                  <p className="text-red-600 italic text-sm">{stakeholder.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                {stakeholder.collaboration.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex items-center text-sm text-red-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {activity}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Models */}
        <div className="mb-16">
          <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>Our Partnership Models</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(localContent.partnershipModels || partnershipModels).map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                  className="text-5xl mb-4"
                >
                  {model.icon}
                </motion.div>
                <h6 className="text-xl font-semibold text-gray-800 mb-2">{model.model}</h6>
                <p className="text-gray-600 mb-3">{model.description}</p>
                <p className="text-sm italic text-red-600">{model.benefits}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>Partnership Impact</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(localContent.impactMetrics || impactMetrics).map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-red-600 mb-1">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
    );
  }

  // ===================================================================
  // EDITING MODE
  // ===================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Collaborative Partnerships Editor</h1>
          <p className="text-gray-600">Customize your collaborative partnerships showcase with dynamic red-rose styling</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-red-500 to-rose-500 text-white">
                <h1 className="text-2xl font-bold">Collaborative Partnerships</h1>
                <p className="text-red-100 mt-1">Working together for lasting impact</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(localContent.stakeholderGroups || stakeholderGroups).slice(0, 2).map((group: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{group.icon}</span>
                          <h5 className="font-medium text-gray-900">{group.group}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{group.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                Header Settings
              </h2>
              <div className="space-y-5">
                <EditableText
                  label="Main Title"
                  value={title}
                  onChange={(v) => handleUpdate("title", v)}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate("subtitle", v)}
                />
                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(e: any) => handleUpdate("description", e)}
                  rows={3}
                />
              </div>
            </div>

            {/* Stakeholder Groups */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-rose-500 rounded-full mr-3"></span>
                  Stakeholder Groups ({(localContent.stakeholderGroups || stakeholderGroups).length})
                </h2>
                <button
                  onClick={() => {
                    const newGroup = {
                      group: "New Stakeholder Group",
                      role: "Role description...",
                      collaboration: ["Collaboration point 1", "Collaboration point 2"],
                      icon: "🤝",
                    };
                    handleUpdate("stakeholderGroups", [...(localContent.stakeholderGroups || stakeholderGroups), newGroup]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-medium shadow-lg"
                >
                  + Add Group
                </button>
              </div>

              <AnimatePresence>
                {(localContent.stakeholderGroups || stakeholderGroups).map((group: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-red-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        Group {i + 1}: {group.group}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedGroups = (localContent.stakeholderGroups || stakeholderGroups).filter((_: any, index: number) => index !== i);
                          handleUpdate("stakeholderGroups", updatedGroups);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Group Name"
                        value={group.group}
                        onChange={(v) => handleStakeholderUpdate(i, "group", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={group.icon}
                        onChange={(v) => handleStakeholderUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <textarea
                          rows={2}
                          value={group.role}
                          onChange={(e: any) => handleStakeholderUpdate(i, "role", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Collaboration Points */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Collaboration Points</label>
                      <div className="space-y-2">
                        {group.collaboration.map((point: string, pointIndex: number) => (
                          <div key={pointIndex} className="flex gap-3">
                            <input
                              key={`collaboration-${i}-${pointIndex}`}
                              type="text"
                              value={point}
                              onChange={(e: any) => {
                                const updatedCollaboration = [...group.collaboration];
                                updatedCollaboration[pointIndex] = e.target.value;
                                handleStakeholderUpdate(i, "collaboration", updatedCollaboration);
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                              placeholder="Enter collaboration point..."
                            />
                            <button
                              onClick={() => {
                                const updatedCollaboration = group.collaboration.filter(
                                  (_: string, fi: number) => fi !== pointIndex
                                );
                                handleStakeholderUpdate(i, "collaboration", updatedCollaboration);
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleStakeholderUpdate(i, "collaboration", [...group.collaboration, "New collaboration point"]);
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-red-500 hover:text-red-500 transition-colors text-sm font-medium"
                        >
                          + Add Collaboration Point
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Partnership Models */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-pink-500 rounded-full mr-3"></span>
                  Partnership Models ({(localContent.partnershipModels || partnershipModels).length})
                </h2>
                <button
                  onClick={() => {
                    const newModel = {
                      model: "New Partnership Model",
                      description: "Describe this model...",
                      benefits: "Key benefits of this model",
                      icon: "🚀",
                    };
                    handleUpdate("partnershipModels", [...(localContent.partnershipModels || partnershipModels), newModel]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-medium shadow-lg"
                >
                  + Add Model
                </button>
              </div>

              <AnimatePresence>
                {(localContent.partnershipModels || partnershipModels).map((model: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-rose-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mr-2"></div>
                        Model {i + 1}: {model.model}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedModels = (localContent.partnershipModels || partnershipModels).filter((_: any, index: number) => index !== i);
                          handleUpdate("partnershipModels", updatedModels);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label={`Model Name-${i}`}
                        value={model.model}
                        onChange={(v) => handleModelUpdate(i, "model", v)}
                      />
                      <EditableText
                        label={`Icon-${i}`}
                        value={model.icon}
                        onChange={(v) => handleModelUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={2}
                          value={model.description}
                          onChange={(e: any) => handleModelUpdate(i, "description", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                        <textarea
                          rows={2}
                          value={model.benefits}
                          onChange={(e: any) => handleModelUpdate(i, "benefits", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Impact Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(localContent.impactMetrics || impactMetrics).map((metric: any, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-red-50 rounded-xl border border-gray-200">
                    <div className="space-y-3">
                      <EditableText
                        label="Value"
                        value={metric.value}
                        onChange={(v) => handleMetricUpdate(index, "value", v)}
                      />
                      <EditableText
                        label="Label"
                        value={metric.label}
                        onChange={(v) => handleMetricUpdate(index, "label", v)}
                      />
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