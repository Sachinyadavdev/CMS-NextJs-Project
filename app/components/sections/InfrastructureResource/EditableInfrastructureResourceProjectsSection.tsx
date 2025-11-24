"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InfrastructureResourceProjectsSection } from "@/lib/db";
import {
  EditableText,
  EditableTextarea,
  EditableColorPicker,
  EditableCheckbox,
} from "@/app/components/EditableInputs";

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
}

interface Props {
  section: InfrastructureResourceProjectsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<InfrastructureResourceProjectsSection>) => void;
}

export default function EditableInfrastructureResourceProjectsSection({
  section,
  isEditing,
  onUpdate,
}: Props) {
  const content = (section || {}) as any;

  const {
    title = "Featured Infrastructure Projects",
    subtitle = "Delivering Excellence Across Sectors",
    description = "Explore our portfolio of successful infrastructure projects that demonstrate our commitment to quality, innovation, and excellence.",
    projects = [
      {
        id: "1",
        title: "Metropolitan Highway Expansion",
        category: "Transportation",
        description: "Major highway expansion project connecting urban centers and improving regional connectivity.",
        image: "",
        location: "Greater City Area",
        year: "2023",
        status: "Completed",
        features: [
          "12-lane highway",
          "Smart traffic management",
          "Environmental mitigation",
          "Public transit integration",
        ],
      },
      {
        id: "2",
        title: "Sustainable Water Treatment Facility",
        category: "Water & Wastewater",
        description: "State-of-the-art water treatment plant using advanced filtration and efficient operations.",
        image: "",
        location: "Riverside County",
        year: "2024",
        status: "In Progress",
        features: [
          "1M gallon/day capacity",
          "Energy-efficient operations",
          "Advanced filtration",
          "Smart monitoring",
        ],
      },
      {
        id: "3",
        title: "Urban Rail Transit System",
        category: "Transportation",
        description: "Modern light rail system connecting downtown districts with efficient transportation.",
        image: "",
        location: "Downtown Metro",
        year: "2022",
        status: "Completed",
        features: [
          "15km track length",
          "Electric-powered trains",
          "Automated scheduling",
          "Accessibility features",
        ],
      },
      {
        id: "4",
        title: "Renewable Energy Grid",
        category: "Energy",
        description: "Large-scale solar and wind energy infrastructure supporting clean energy transition.",
        image: "",
        location: "Desert Valley",
        year: "2023",
        status: "Completed",
        features: [
          "500MW capacity",
          "Grid integration",
          "Energy storage",
          "Remote monitoring",
        ],
      },
      {
        id: "5",
        title: "Smart City Infrastructure",
        category: "Urban Development",
        description: "Comprehensive smart city implementation with IoT sensors and data-driven urban management.",
        image: "",
        location: "Innovation City",
        year: "2024",
        status: "In Progress",
        features: [
          "IoT sensor network",
          "Data analytics platform",
          "Smart lighting",
          "Traffic optimization",
        ],
      },
      {
        id: "6",
        title: "Coastal Protection System",
        category: "Environmental",
        description: "Advanced coastal defense system protecting communities from rising sea levels and storms.",
        image: "",
        location: "Coastal Region",
        year: "2023",
        status: "Completed",
        features: [
          "Sea wall construction",
          "Ecosystem restoration",
          "Flood prevention",
          "Sustainable materials",
        ],
      },
    ],
    categories = ["All", "Transportation", "Water & Wastewater", "Energy", "Urban Development", "Environmental"],
    backgroundColor = "#f8fafc",
    textColor = "#1f2937",
    titleColor = "#1f2937",
    subtitleColor = "#EF4130",
    showFilters = true,
  } = content;

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((project: Project) => project.category === selectedCategory);

  const handleUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ ...content, ...patch });
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
      category: "Transportation",
      description: "Describe this infrastructure project...",
      image: "",
      location: "Location",
      year: new Date().getFullYear().toString(),
      status: "Planning",
      features: ["Feature 1", "Feature 2"],
    };
    handleUpdate({ projects: [...projects, newProject] });
  };

  const handleRemoveProject = (index: number) => {
    handleUpdate({ projects: projects.filter((_: any, i: number) => i !== index) });
  };

  // ===================================================================
  // LIVE VIEW – Portfolio Grid with Filters
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
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Construction-Themed Projects Portfolio */}
          <div className="relative">
            {/* Construction Site Background */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 gap-2 h-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.01 }}
                    className="bg-orange-400 rounded-sm"
                  />
                ))}
              </div>
            </div>

            {/* Floating Construction Elements */}
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 text-4xl opacity-20 z-0"
            >
              🚧
            </motion.div>
            <motion.div
              animate={{
                x: [0, -25, 0],
                y: [0, 25, 0],
                rotate: [0, -20, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-32 right-16 text-3xl opacity-15 z-0"
            >
              🏗️
            </motion.div>

            <motion.div
              layout
              className="relative z-10 columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project: Project, index: number) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 100, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -100, rotateY: 15 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.05,
                      zIndex: 20,
                      rotateY: 5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    className="group break-inside-avoid relative"
                    style={{
                      height: index % 3 === 0 ? '340px' : index % 3 === 1 ? '300px' : '380px'
                    }}
                  >
                    {/* Construction Blueprint Frame */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                      className="absolute -inset-3 border-2 border-primary-300 rounded-2xl opacity-30 z-0"
                      style={{ borderStyle: 'dashed' }}
                    />

                    {/* Blueprint Corners */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.5 }}
                      className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary-500 z-10"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.6 }}
                      className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary-500 z-10"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.7 }}
                      className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary-500 z-10"
                    />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.8 }}
                      className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary-500 z-10"
                    />

                    {/* Project Card */}
                    <motion.div
                      className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-200 h-full z-10"
                      whileHover={{ boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.3)" }}
                    >
                      {/* Construction Progress Indicator */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: index * 0.15 + 1 }}
                        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 z-20"
                      />

                      {/* Image with construction overlay */}
                      <div className="relative h-full bg-gray-200 overflow-hidden">
                        {project.image ? (
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 relative">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className="text-6xl opacity-30"
                            >
                              ⚙️
                            </motion.div>
                            {/* Construction grid overlay */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="grid grid-cols-6 gap-1 h-full">
                                {Array.from({ length: 24 }).map((_, i) => (
                                  <div key={i} className="bg-gray-600 rounded-sm"></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Construction-themed overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-6 left-6 right-6 text-white">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.15 + 1.2 }}
                              className="text-xl font-bold mb-2"
                            >
                              {project.location}
                            </motion.div>
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.15 + 1.4 }}
                              className="text-sm opacity-90 mb-3 flex items-center gap-2"
                            >
                              <span className="bg-orange-500 px-2 py-1 rounded text-xs font-bold">
                                {project.year}
                              </span>
                              <span className="text-xs">COMPLETED</span>
                            </motion.div>
                            <motion.p
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: index * 0.15 + 1.6 }}
                              className="text-sm leading-relaxed opacity-90 line-clamp-3"
                            >
                              {project.description}
                            </motion.p>
                          </div>
                        </div>

                        {/* Construction Badges */}
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.15 + 0.8, type: "spring" }}
                          className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg flex items-center gap-1"
                        >
                          <span>🏗️</span>
                          {project.location}
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.15 + 1, type: "spring" }}
                          className="absolute top-4 right-4 bg-primary-500 text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg"
                        >
                          {project.year}
                        </motion.div>

                        {/* Construction Status Indicator */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.15 + 1.8 }}
                          className="absolute bottom-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full bg-green-400 rounded-full"
                          />
                        </motion.div>

                        {/* Rivets */}
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.15 + 2 }}
                          className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border border-white shadow-sm"
                        />
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.15 + 2.1 }}
                          className="absolute bottom-2 left-2 w-2 h-2 bg-primary-600 rounded-full border border-white shadow-sm"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Load More / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors"
            >
              View All Projects
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  // ===================================================================
  // EDITOR MODE – Clean & Functional
  // ===================================================================
  const Preview = () => (
    <div
      className="py-12 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold" style={{ color: titleColor }}>
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-xl" style={{ color: subtitleColor }}>
              {subtitle}
            </p>
          )}
        </div>

        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.slice(0, 4).map((category: string) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === "All"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project: any, i: number) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-primary-100 to-primary-200 relative">
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-white/90 rounded-full text-xs">
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
                <p className="text-xs text-gray-600 mb-2">
                  {project.location} • {project.year}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-6 flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        Live Preview
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Editor Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Infrastructure Projects Editor
          </h1>
          <p className="text-gray-600 mt-1">Portfolio grid with filterable projects</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Preview */}
          <div className="sticky top-8">
            <Preview />
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Header</h2>
              <div className="space-y-5">
                <EditableText
                  label="Title"
                  value={title}
                  onChange={(v) => handleUpdate({ title: v })}
                />
                <EditableText
                  label="Subtitle"
                  value={subtitle}
                  onChange={(v) => handleUpdate({ subtitle: v })}
                />
                <EditableTextarea
                  label="Description"
                  value={description}
                  onChange={(e: any) => handleUpdate({ description: e })}
                  rows={3}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Categories</h2>
              <div className="space-y-2">
                {categories.map((category: string, index: number) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={category}
                      onChange={(e: any) => {
                        const updated = [...categories];
                        updated[index] = e.target.value;
                        handleUpdate({ categories: updated });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => {
                        handleUpdate({
                          categories: categories.filter((_: string, i: number) => i !== index),
                        });
                      }}
                      className="px-3 py-2 text-red-600 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    handleUpdate({ categories: [...categories, "New Category"] });
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition"
                >
                  + Add Category
                </button>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Projects</h2>
                <button
                  onClick={handleAddProject}
                  className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium"
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
                    className="mb-6 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-800">
                        Project {i + 1}
                      </h4>
                      <button
                        onClick={() => handleRemoveProject(i)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <EditableText
                        label="Title"
                        value={project.title}
                        onChange={(v) => handleProjectUpdate(i, { title: v })}
                      />
                      <EditableText
                        label="Category"
                        value={project.category}
                        onChange={(v) => handleProjectUpdate(i, { category: v })}
                      />
                      <EditableText
                        label="Location"
                        value={project.location}
                        onChange={(v) => handleProjectUpdate(i, { location: v })}
                      />
                      <EditableText
                        label="Year"
                        value={project.year}
                        onChange={(v) => handleProjectUpdate(i, { year: v })}
                      />
                      <EditableText
                        label="Status"
                        value={project.status}
                        onChange={(v) => handleProjectUpdate(i, { status: v })}
                      />
                      <EditableText
                        label="Image URL"
                        value={project.image}
                        onChange={(v) => handleProjectUpdate(i, { image: v })}
                      />
                      <EditableTextarea
                        label="Description"
                        value={project.description}
                        onChange={(e: any) => handleProjectUpdate(i, { description: e })}
                        rows={2}
                        className="md:col-span-2"
                      />
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                      </label>
                      <div className="space-y-2">
                        {project.features.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e: any) => {
                                const updatedFeatures = [...project.features];
                                updatedFeatures[featureIndex] = e.target.value;
                                handleProjectUpdate(i, { features: updatedFeatures });
                              }}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <button
                              onClick={() => {
                                const updatedFeatures = project.features.filter(
                                  (_: string, fi: number) => fi !== featureIndex
                                );
                                handleProjectUpdate(i, { features: updatedFeatures });
                              }}
                              className="px-3 py-2 text-red-600 hover:text-red-700 text-sm"
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
                          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition text-sm"
                        >
                          + Add Feature
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Colors & Settings */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold mb-6">Colors & Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <EditableColorPicker
                    label="Background"
                    value={backgroundColor}
                    onChange={(v) => handleUpdate({ backgroundColor: v })}
                  />
                  <EditableColorPicker
                    label="Title Color"
                    value={titleColor}
                    onChange={(v) => handleUpdate({ titleColor: v })}
                  />
                  <EditableColorPicker
                    label="Subtitle Color"
                    value={subtitleColor}
                    onChange={(v) => handleUpdate({ subtitleColor: v })}
                  />
                  <EditableColorPicker
                    label="Text Color"
                    value={textColor}
                    onChange={(v) => handleUpdate({ textColor: v })}
                  />
                </div>

                <EditableCheckbox
                  label="Show Filter Buttons"
                  checked={showFilters}
                  onChange={(value: any) => handleUpdate({ showFilters: value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}