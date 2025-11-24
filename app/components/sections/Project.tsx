"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BaseSection } from "@/lib/db";
import MediaUpload from "../MediaUpload";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
  year: string;
  status: string;
  features: string[];
  link?: string;
}

interface ProjectContent {
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: Project[];
  categories?: string[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showFilters?: boolean;
}

type ProjectSection = BaseSection<ProjectContent>;

interface Props {
  section: ProjectSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ProjectSection>) => void;
}

export default function EditableProjectSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = section.content || {};

  const {
    title = "Our Projects",
    subtitle = "Showcasing Innovation and Excellence",
    description = "Explore our diverse portfolio of projects that demonstrate our commitment to quality, creativity, and sustainable development.",
    projects = [
      {
        id: "1",
        title: "Digital Transformation Initiative",
        category: "Technology",
        description: "Comprehensive digital overhaul of legacy systems with modern cloud infrastructure and AI integration.",
        image: "",
        location: "Global",
        year: "2024",
        status: "In Progress",
        features: [
          "Cloud Migration",
          "AI Implementation",
          "Process Automation",
          "Data Analytics",
        ],
        link: "#",
      },
      {
        id: "2",
        title: "Sustainable Urban Development",
        category: "Real Estate",
        description: "Eco-friendly residential complex featuring green building standards and community-focused design.",
        image: "",
        location: "Downtown Metro",
        year: "2023",
        status: "Completed",
        features: [
          "LEED Certification",
          "Solar Integration",
          "Green Spaces",
          "Smart Infrastructure",
        ],
        link: "#",
      },
      {
        id: "3",
        title: "Healthcare Innovation Hub",
        category: "Healthcare",
        description: "State-of-the-art medical facility combining advanced technology with patient-centered care design.",
        image: "",
        location: "Medical District",
        year: "2024",
        status: "In Progress",
        features: [
          "Telemedicine Integration",
          "Smart Monitoring",
          "Patient Portals",
          "Research Facilities",
        ],
        link: "#",
      },
    ],
    categories = ["All", "Technology", "Real Estate", "Healthcare", "Education", "Infrastructure"],
    backgroundColor = "#f8fafc",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    subtitleColor = "#7c3aed",
    showFilters = true,
  } = content;

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((project: Project) => project.category === selectedCategory);

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleProjectUpdate = (index: number, patch: Partial<Project>) => {
    const updated = projects.map((p: any, i: number) =>
      i === index ? { ...p, ...patch } : p
    );
    handleUpdate({ projects: updated });
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: "New Project",
      category: "Technology",
      description: "Describe this project...",
      image: "",
      location: "Location",
      year: new Date().getFullYear().toString(),
      status: "Planning",
      features: ["Feature 1", "Feature 2"],
      link: "#",
    };
    handleUpdate({ projects: [...projects, newProject] });
  };

  const handleRemoveProject = (index: number) => {
    handleUpdate({ projects: projects.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Modern Project Portfolio
  // ===================================================================
  if (!isEditing) {
    return (
      <section className="py-24" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-6xl font-extrabold tracking-tight"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="mt-5 text-2xl font-medium"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="mt-6 max-w-4xl mx-auto text-xl leading-relaxed"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </motion.div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category: string) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-purple-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Modern Project Grid */}
          <div className="relative">
            {/* Abstract Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-16 gap-1 h-full">
                {Array.from({ length: 256 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.005 }}
                    className="bg-purple-400 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Floating Tech Elements */}
            <motion.div
              animate={{
                x: [0, 40, 0],
                y: [0, -30, 0],
                rotate: [0, 25, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-16 left-12 text-5xl opacity-10 z-0"
            >
              🚀
            </motion.div>
            <motion.div
              animate={{
                x: [0, -35, 0],
                y: [0, 35, 0],
                rotate: [0, -30, 0],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-24 right-20 text-4xl opacity-8 z-0"
            >
              💡
            </motion.div>
            <motion.div
              animate={{
                x: [0, 25, 0],
                y: [0, -25, 0],
                rotate: [0, 20, 0],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 right-12 text-3xl opacity-12 z-0"
            >
              ⚡
            </motion.div>

            <motion.div
              layout
              className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project: Project, index: number) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                          <div className="text-6xl opacity-50">📁</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'Completed' ? 'bg-green-500 text-white' :
                          project.status === 'In Progress' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Year */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-sm font-medium opacity-90">{project.year}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <span className="mr-2">📍</span>
                        {project.location}
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {project.features.slice(0, 3).map((feature: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                              +{project.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Link */}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
                        >
                          Learn More
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITING MODE
  // ===================================================================
  const Preview = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <h1 className="text-2xl font-bold">Project Portfolio</h1>
        <p className="text-purple-100 mt-1">Modern project showcase with filtering</p>
      </div>
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {projects.slice(0, 2).map((project: Project, i: number) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                {project.image ? (
                  <img src={project.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">📁</div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{project.title}</h4>
                  <p className="text-sm text-gray-500">{project.category} • {project.year}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
            </div>
          ))}
          {projects.length > 2 && (
            <div className="text-center text-gray-500 text-sm py-2">
              +{projects.length - 2} more projects
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const Input = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Portfolio Editor</h1>
          <p className="text-gray-600">Customize your project showcase with unique purple-blue styling</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                Live Preview
              </h2>
            </div>
            <Preview />
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                Header Settings
              </h2>
              <div className="space-y-5">
                <Input
                  label="Main Title"
                  value={title}
                  onChange={(v) => handleUpdate({ title: v })}
                />
                <Input
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate({ subtitle: v })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e: any) => handleUpdate({ description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                Filter Categories
              </h2>
              <div className="space-y-3">
                {categories.map((category: string, index: number) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={category}
                      onChange={(e: any) => {
                        const updated = [...categories];
                        updated[index] = e.target.value;
                        handleUpdate({ categories: updated });
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={() => {
                        handleUpdate({
                          categories: categories.filter((_: string, i: number) => i !== index),
                        });
                      }}
                      className="px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    handleUpdate({ categories: [...categories, "New Category"] });
                  }}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-colors font-medium"
                >
                  + Add Category
                </button>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                  Projects ({projects.length})
                </h2>
                <button
                  onClick={handleAddProject}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all font-medium shadow-lg"
                >
                  + Add Project
                </button>
              </div>

              <AnimatePresence>
                {projects.map((project: any, i: number) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        Project {i + 1}: {project.title}
                      </h4>
                      <button
                        onClick={() => handleRemoveProject(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Title"
                        value={project.title}
                        onChange={(v) => handleProjectUpdate(i, { title: v })}
                      />
                      <Input
                        label="Category"
                        value={project.category}
                        onChange={(v) => handleProjectUpdate(i, { category: v })}
                      />
                      <Input
                        label="Location"
                        value={project.location}
                        onChange={(v) => handleProjectUpdate(i, { location: v })}
                      />
                      <Input
                        label="Year"
                        value={project.year}
                        onChange={(v) => handleProjectUpdate(i, { year: v })}
                      />
                      <Input
                        label="Status"
                        value={project.status}
                        onChange={(v) => handleProjectUpdate(i, { status: v })}
                      />
                      <Input
                        label="Project Link (optional)"
                        value={project.link || ""}
                        onChange={(v) => handleProjectUpdate(i, { link: v })}
                      />
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={2}
                          value={project.description}
                          onChange={(e: any) => handleProjectUpdate(i, { description: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <MediaUpload
                        label="Project Image"
                        type="image"
                        currentUrl={project.image}
                        onUpload={(url) => handleProjectUpdate(i, { image: url })}
                        onRemove={() => handleProjectUpdate(i, { image: "" })}
                        placeholder="Upload project image..."
                      />
                    </div>

                    {/* Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Key Features</label>
                      <div className="space-y-2">
                        {project.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex gap-3">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e: any) => {
                                const updatedFeatures = [...project.features];
                                updatedFeatures[featureIndex] = e.target.value;
                                handleProjectUpdate(i, { features: updatedFeatures });
                              }}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                              placeholder="Enter feature..."
                            />
                            <button
                              onClick={() => {
                                const updatedFeatures = project.features.filter(
                                  (_: string, fi: number) => fi !== featureIndex
                                );
                                handleProjectUpdate(i, { features: updatedFeatures });
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleProjectUpdate(i, {
                              features: [...project.features, "New feature"],
                            });
                          }}
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-purple-500 hover:text-purple-500 transition-colors text-sm font-medium"
                        >
                          + Add Feature
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}