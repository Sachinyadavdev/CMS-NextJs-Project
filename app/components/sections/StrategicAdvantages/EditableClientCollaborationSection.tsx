import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
} from "../../EditableInputs";

interface ClientCollaborationContent {
  title?: string;
  subtitle?: string;
  description?: string;
  principles?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  teamMembers?: Array<{
    name: string;
    role: string;
    avatar: string;
    expertise: string;
  }>;
  collaborationStats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

type ClientCollaborationSection = BaseSection<ClientCollaborationContent>;

interface Props {
  section: ClientCollaborationSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ClientCollaborationSection>) => void;
}

export default function EditableClientCollaborationSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Client-Centric Collaboration",
    subtitle = "Partnership-Led Execution",
    description = "Transparent communication, strategic alignment, and partnership-led execution ensure every solution reflects client goals, budget requirements, and business performance expectations.",
    principles = [
      {
        title: "Transparent Communication",
        description:
          "Open and honest dialogue throughout the project lifecycle",
        icon: "💬",
      },
      {
        title: "Strategic Alignment",
        description:
          "Goals and objectives perfectly aligned with client vision",
        icon: "🎯",
      },
      {
        title: "Partnership Approach",
        description: "Working together as true partners, not just vendors",
        icon: "🤝",
      },
    ],
    teamMembers = [
      {
        name: "Client Success Manager",
        role: "Primary Contact",
        avatar: "👨‍💼",
        expertise: "Relationship Management",
      },
      {
        name: "Technical Lead",
        role: "Solution Architect",
        avatar: "👩‍💻",
        expertise: "Technical Implementation",
      },
      {
        name: "Project Manager",
        role: "Delivery Lead",
        avatar: "👨‍🔧",
        expertise: "Project Execution",
      },
      {
        name: "Quality Assurance",
        role: "Quality Control",
        avatar: "👩‍🔬",
        expertise: "Standards Compliance",
      },
    ],
    collaborationStats = [
      { value: "100%", label: "Client Satisfaction" },
      { value: "95%", label: "On-Time Delivery" },
      { value: "98%", label: "Budget Adherence" },
      { value: "24/7", label: "Support Availability" },
    ],
    backgroundColor = "from-green-50 to-emerald-100",
    textColor = "text-gray-800",
    accentColor = "green",
  } = content;

  const [localContent, setLocalContent] = useState(content);

  const handleUpdate = (field: string, value: any) => {
    const updated = { ...localContent, [field]: value };
    setLocalContent(updated);
    onUpdate({ content: updated });
  };

  const handlePrincipleUpdate = (index: number, field: string, value: any) => {
    const updatedPrinciples = [...(localContent.principles || principles)];
    updatedPrinciples[index] = { ...updatedPrinciples[index], [field]: value };
    handleUpdate("principles", updatedPrinciples);
  };

  const handleMemberUpdate = (index: number, field: string, value: any) => {
    const updatedMembers = [...(localContent.teamMembers || teamMembers)];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    handleUpdate("teamMembers", updatedMembers);
  };

  const handleStatUpdate = (index: number, field: string, value: any) => {
    const updatedStats = [
      ...(localContent.collaborationStats || collaborationStats),
    ];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    handleUpdate("collaborationStats", updatedStats);
  };

  // ===================================================================
  // LIVE VIEW – Modern Client Collaboration Showcase
  // ===================================================================
  if (!isEditing) {
    return (
      <section
        className={`relative py-20 bg-gradient-to-br ${backgroundColor} overflow-hidden`}
      >
        {/* Network connection lines background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            {/* Connection lines between team members */}
            <motion.line
              x1="200"
              y1="300"
              x2="400"
              y2="200"
              stroke="#10B981"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.line
              x1="400"
              y1="200"
              x2="600"
              y2="300"
              stroke="#059669"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
              }}
            />
            <motion.line
              x1="600"
              y1="300"
              x2="800"
              y2="200"
              stroke="#047857"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
            <motion.line
              x1="400"
              y1="400"
              x2="600"
              y2="400"
              stroke="#065F46"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              delay: 1.5,
            }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={localContent.title || title}
                onChange={(e: any) => handleUpdate("title", e.target.value)}
                className="text-4xl font-bold text-center w-full bg-transparent border-b-2 border-green-300 focus:border-green-500 outline-none"
                placeholder="Section Title"
              />
              <input
                type="text"
                value={localContent.subtitle || subtitle}
                onChange={(e: any) => handleUpdate("subtitle", e.target.value)}
                className="text-xl text-center w-full bg-transparent border-b-2 border-green-300 focus:border-green-500 outline-none"
                placeholder="Section Subtitle"
              />
              <textarea
                value={localContent.description || description}
                onChange={(e: any) => handleUpdate("description", e.target.value)}
                className="text-lg text-center w-full bg-transparent border-2 border-green-300 focus:border-green-500 outline-none rounded p-2 min-h-[100px]"
                placeholder="Section Description"
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {(localContent.principles || principles).map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={principle.icon}
                    onChange={(e: any) =>
                      handlePrincipleUpdate(index, "icon", e.target.value)
                    }
                    className="text-4xl text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                  />
                  <input
                    type="text"
                    value={principle.title}
                    onChange={(e: any) =>
                      handlePrincipleUpdate(index, "title", e.target.value)
                    }
                    className="text-xl font-semibold text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                  />
                  <textarea
                    value={principle.description}
                    onChange={(e: any) =>
                      handlePrincipleUpdate(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="text-sm text-center w-full bg-transparent border border-green-300 focus:border-green-500 outline-none rounded p-2 min-h-[60px]"
                  />
                </div>
              ) : (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                    className="text-5xl mb-4"
                  >
                    {principle.icon}
                  </motion.div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {principle.title}
                  </h4>
                  <p className="text-gray-600">{principle.description}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Team Collaboration Circle */}
        <div className="mb-16">
          <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
            Our Dedicated Team
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {(localContent.teamMembers || teamMembers).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                {isEditing ? (
                  <div className="bg-white rounded-xl shadow-lg p-6 space-y-3 min-w-[200px]">
                    <input
                      type="text"
                      value={member.avatar}
                      onChange={(e: any) =>
                        handleMemberUpdate(index, "avatar", e.target.value)
                      }
                      className="text-4xl text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                    />
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e: any) =>
                        handleMemberUpdate(index, "name", e.target.value)
                      }
                      className="text-lg font-semibold text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                    />
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e: any) =>
                        handleMemberUpdate(index, "role", e.target.value)
                      }
                      className="text-sm text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                    />
                    <input
                      type="text"
                      value={member.expertise}
                      onChange={(e: any) =>
                        handleMemberUpdate(index, "expertise", e.target.value)
                      }
                      className="text-xs text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                      className="text-6xl mb-3"
                    >
                      {member.avatar}
                    </motion.div>
                    <h5 className="text-lg font-semibold text-gray-800 mb-1">
                      {member.name}
                    </h5>
                    <p className="text-sm text-green-600 font-medium mb-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-600">{member.expertise}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Collaboration Stats */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h4 className={`text-2xl font-bold ${textColor} text-center mb-8`}>
            Collaboration Excellence
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(localContent.collaborationStats || collaborationStats).map(
              (stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e: any) =>
                          handleStatUpdate(index, "value", e.target.value)
                        }
                        className="text-3xl font-bold text-green-600 text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e: any) =>
                          handleStatUpdate(index, "label", e.target.value)
                        }
                        className="text-sm text-center w-full bg-transparent border-b border-green-300 focus:border-green-500 outline-none"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </>
                  )}
                </motion.div>
              )
            )}
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Collaboration Editor</h1>
          <p className="text-gray-600">Customize your client collaboration showcase with dynamic green-emerald styling</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <h1 className="text-2xl font-bold">Client Collaboration</h1>
                <p className="text-green-100 mt-1">Partnership-led execution</p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{subtitle}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {(localContent.principles || principles).slice(0, 2).map((principle: any, i: number) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{principle.icon}</span>
                          <h5 className="font-medium text-gray-900">{principle.title}</h5>
                        </div>
                        <p className="text-xs text-gray-600">{principle.description}</p>
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
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
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
                  onChange={(v) => handleUpdate("description", v)}
                  rows={3}
                />
              </div>
            </div>

            {/* Principles */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></span>
                  Principles ({(localContent.principles || principles).length})
                </h2>
                <button
                  onClick={() => {
                    const newPrinciple = {
                      title: "New Principle",
                      description: "Describe this principle...",
                      icon: "✨",
                    };
                    handleUpdate("principles", [...(localContent.principles || principles), newPrinciple]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium shadow-lg"
                >
                  + Add Principle
                </button>
              </div>

              <AnimatePresence>
                {(localContent.principles || principles).map((principle: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Principle {i + 1}: {principle.title}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedPrinciples = (localContent.principles || principles).filter((_: any, index: number) => index !== i);
                          handleUpdate("principles", updatedPrinciples);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={principle.title}
                        onChange={(v) => handlePrincipleUpdate(i, "title", v)}
                      />
                      <EditableText
                        label="Icon"
                        value={principle.icon}
                        onChange={(v) => handlePrincipleUpdate(i, "icon", v)}
                      />
                      <div className="md:col-span-2">
                        <EditableTextarea
                          label="Description"
                          value={principle.description}
                          onChange={(v) => handlePrincipleUpdate(i, "description", v)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-teal-500 rounded-full mr-3"></span>
                  Team Members ({(localContent.teamMembers || teamMembers).length})
                </h2>
                <button
                  onClick={() => {
                    const newMember = {
                      name: "New Team Member",
                      role: "Role",
                      avatar: "👤",
                      expertise: "Expertise area",
                    };
                    handleUpdate("teamMembers", [...(localContent.teamMembers || teamMembers), newMember]);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium shadow-lg"
                >
                  + Add Member
                </button>
              </div>

              <AnimatePresence>
                {(localContent.teamMembers || teamMembers).map((member: any, i: number) => (
                  <motion.div
                    key={i}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                        Member {i + 1}: {member.name}
                      </h4>
                      <button
                        onClick={() => {
                          const updatedMembers = (localContent.teamMembers || teamMembers).filter((_: any, index: number) => index !== i);
                          handleUpdate("teamMembers", updatedMembers);
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Name"
                        value={member.name}
                        onChange={(v) => handleMemberUpdate(i, "name", v)}
                      />
                      <EditableText
                        label="Role"
                        value={member.role}
                        onChange={(v) => handleMemberUpdate(i, "role", v)}
                      />
                      <EditableText
                        label="Avatar"
                        value={member.avatar}
                        onChange={(v) => handleMemberUpdate(i, "avatar", v)}
                      />
                      <EditableText
                        label="Expertise"
                        value={member.expertise}
                        onChange={(v) => handleMemberUpdate(i, "expertise", v)}
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Collaboration Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></span>
                Collaboration Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(localContent.collaborationStats || collaborationStats).map((stat: any, index: number) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-200">
                    <div className="space-y-3">
                      <EditableText
                        label="Value"
                        value={stat.value}
                        onChange={(v) => handleStatUpdate(index, "value", v)}
                      />
                      <EditableText
                        label="Label"
                        value={stat.label}
                        onChange={(v) => handleStatUpdate(index, "label", v)}
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
