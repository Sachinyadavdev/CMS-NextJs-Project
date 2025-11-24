"use client";

import React from "react";
import { RealEstateProjectsSection, RealEstateProjectItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

interface EditableRealEstateProjectsProps {
  section: RealEstateProjectsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateProjectsSection>) => void;
}

export default function EditableRealEstateProjectsSection({
  section,
  isEditing,
  onUpdate
}: EditableRealEstateProjectsProps) {
  const content = section.content || {};
  const projects = content.projects || [];

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleProjectUpdate = (projectIndex: number, projectUpdates: Partial<RealEstateProjectItem>) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = { ...updatedProjects[projectIndex], ...projectUpdates };
    handleContentUpdate({ projects: updatedProjects });
  };

  const addProject = () => {
    const newProject: RealEstateProjectItem = {
      id: Date.now().toString(),
      title: "New Project",
      location: "Location",
      year: "2024",
      description: "Project description",
      imageUrl: "",
      link: ""
    };
    handleContentUpdate({ projects: [...projects, newProject] });
  };

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    handleContentUpdate({ projects: updatedProjects });
  };

  if (!isEditing) {
    const {
      title = "Projects",
      subtitle = "",
      backgroundColor = '#f8f9fa',
      textColor = '#000000'
    } = content;

    return (
      <section className="py-20" style={{ backgroundColor, color: textColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl md:text-2xl font-light" style={{ color: textColor, opacity: 0.8 }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Projects Grid */}
          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {project.imageUrl && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.year}
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {project.title && (
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {project.title}
                      </h3>
                    )}

                    {project.location && (
                      <p className="text-red-600 font-medium mb-3">
                        {project.location}
                      </p>
                    )}

                    {project.description && (
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {project.description}
                      </p>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // Render compact preview
  const renderPreview = () => {
    return (
      <section
        className="relative py-8 rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
        style={{ backgroundColor: content.backgroundColor || '#f8f9fa' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: content.textColor || '#000000' }}>
              {content.title || "Projects"}
            </h2>
            {content.subtitle && (
              <p className="text-lg opacity-80" style={{ color: content.textColor || '#000000' }}>
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Projects Grid */}
          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((project, index) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-24 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-red-600 text-xs mb-1">
                      {project.location}
                    </p>
                    <p className="text-xs text-gray-600">
                      {project.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  // Editing Mode
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-1 space-y-4"
      >
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden sticky top-8">
          {renderPreview()}
        </div>
      </motion.div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Text Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={content.title || ""}
                onChange={(event) => handleContentUpdate({ title: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Projects"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(event) => handleContentUpdate({ subtitle: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Our latest work"
              />
            </div>
          </div>
        </div>

        {/* Colors & Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Colors & Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color</label>
              <input
                type="color"
                value={content.backgroundColor || "#f8f9fa"}
                onChange={(event) => handleContentUpdate({ backgroundColor: event.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={content.textColor || "#000000"}
                onChange={(event) => handleContentUpdate({ textColor: event.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Projects
            </h3>
            <button
              onClick={addProject}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Project
            </button>
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={project.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">Project {index + 1}</h5>
                  <button
                    onClick={() => removeProject(index)}
                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={project.title || ""}
                      onChange={(event) => handleProjectUpdate(index, { title: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Project Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={project.location || ""}
                      onChange={(event) => handleProjectUpdate(index, { location: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Dubai, UAE"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={project.year || ""}
                      onChange={(event) => handleProjectUpdate(index, { year: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link (Optional)</label>
                    <input
                      type="text"
                      value={project.link || ""}
                      onChange={(event) => handleProjectUpdate(index, { link: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={project.description || ""}
                    onChange={(event) => handleProjectUpdate(index, { description: event.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="Project description"
                  />
                </div>

                <div className="mt-4">
                  <MediaUpload
                    label="Project Image"
                    type="image"
                    currentUrl={project.imageUrl}
                    onUpload={(url) => handleProjectUpdate(index, { imageUrl: url })}
                    onRemove={() => handleProjectUpdate(index, { imageUrl: "" })}
                    placeholder="Or paste image URL..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}