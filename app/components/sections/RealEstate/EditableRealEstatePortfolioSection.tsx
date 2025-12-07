"use client";

import React, { useState, useEffect } from "react";
import { RealEstatePortfolioSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

interface EditableRealEstatePortfolioProps {
  section: RealEstatePortfolioSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstatePortfolioSection>) => void;
}

export default function EditableRealEstatePortfolioSection({
  section,
  isEditing,
  onUpdate,
}: EditableRealEstatePortfolioProps) {
  const content = section.content || {};
  const {
    title = "Our Portfolio",
    subtitle = "Showcasing Excellence in Real Estate & Construction",
    description = "Explore our diverse portfolio of completed projects that demonstrate our commitment to quality, innovation and sustainable development.",
    projects = [
      {
        id: "1",
        title: "Luxury Residential Complex",
        category: "Residential",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        description:
          "A premium residential development featuring modern architecture and sustainable design.",
        location: "Dubai, UAE",
        year: "2023",
        features: [
          "Sustainable Design",
          "Smart Home Technology",
          "Premium Amenities",
        ],
      },
      {
        id: "2",
        title: "Commercial Tower",
        category: "Commercial",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        description:
          "State-of-the-art commercial tower with LEED certification and innovative workspace design.",
        location: "Abu Dhabi, UAE",
        year: "2023",
        features: ["LEED Certified", "Modern Workspaces", "Energy Efficient"],
      },
      {
        id: "3",
        title: "Mixed-Use Development",
        category: "Mixed-Use",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        description:
          "Integrated mixed-use development combining retail, office and residential spaces.",
        location: "Sharjah, UAE",
        year: "2022",
        features: ["Mixed-Use", "Community Focus", "Retail Integration"],
      },
    ],
    categories = [
      "All",
      "Residential",
      "Commercial",
      "Mixed-Use",
      "Infrastructure",
    ],
    backgroundColor = "#ffffff",
    textColor = "#000000",
    titleColor = "#000000",
    subtitleColor = "#EF4130",
  } = content;

  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  if (!isEditing) {
    return (
      <section className="py-20" style={{ backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-xl lg:text-2xl mb-6"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p
                className="text-lg max-w-3xl mx-auto leading-relaxed"
                style={{ color: textColor, opacity: 0.8 }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-2 border-transparent"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category ? "#EF4130" : undefined,
                  borderColor:
                    activeCategory !== category ? "#EF4130" : undefined,
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110">
                      {project.category}
                    </span>
                  </div>

                  {/* Location Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-white/90 text-gray-800 text-sm font-medium rounded-full shadow-lg transform transition-all duration-300 group-hover:scale-110">
                      {project.location}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ${
                      hoveredProject === project.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div className="text-center text-white transform transition-all duration-500 group-hover:translate-y-0 translate-y-4">
                      <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
                        {project.title}
                      </h3>
                      <p className="text-sm mb-4 opacity-90 drop-shadow-md">
                        {project.description}
                      </p>
                      {project.features && project.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                          {project.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/20 backdrop-blur-sm text-xs rounded-full border border-white/30 transform transition-all duration-300 hover:scale-110 hover:bg-white/30"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-xs opacity-75">
                        Completed in {project.year}
                      </div>
                    </div>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/50 rounded-xl transition-all duration-500" />
                </div>

                {/* Project Info */}
                <div className="p-6 bg-white">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: titleColor }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-12">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    currentPage === page
                      ? "bg-red-500 text-white"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-12">
            <button
              className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #EF4130 0%, #d63324 100%)",
              }}
              onMouseEnter={(e: any) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #d63324 0%, #b52a1f 100%)";
              }}
              onMouseLeave={(e: any) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #EF4130 0%, #d63324 100%)";
              }}
            >
              View All Projects
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    return (
      <section className="py-12" style={{ backgroundColor }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: titleColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg mb-4" style={{ color: subtitleColor }}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-1">{project.title}</h3>
                  <p className="text-xs text-gray-600">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
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
                value={title}
                onChange={(e: any) => handleContentUpdate({ title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Our Portfolio"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e: any) => handleContentUpdate({ subtitle: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Showcasing Excellence in Real Estate"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e: any) => handleContentUpdate({ description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Explore our diverse portfolio..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Categories (comma-separated)</label>
              <input
                type="text"
                value={categories.join(", ")}
                onChange={(e: any) => handleContentUpdate({ categories: e.target.value.split(",").map((c: any) => c.trim()) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="All, Residential, Commercial, Mixed-Use"
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
              onClick={() => {
                const newProject = {
                  id: Date.now().toString(),
                  title: "New Project",
                  category: "Residential",
                  image: "",
                  description: "Project description",
                  location: "Location",
                  year: "2024",
                  features: [],
                };
                handleContentUpdate({ projects: [...projects, newProject] });
              }}
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
                    onClick={() => {
                      const updatedProjects = projects.filter((_, i) => i !== index);
                      handleContentUpdate({ projects: updatedProjects });
                    }}
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
                      onChange={(e: any) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = { ...updatedProjects[index], title: e.target.value };
                        handleContentUpdate({ projects: updatedProjects });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Project Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={project.category || ""}
                      onChange={(e: any) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = { ...updatedProjects[index], category: e.target.value };
                        handleContentUpdate({ projects: updatedProjects });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      {categories.filter((c) => c !== "All").map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={project.location || ""}
                      onChange={(e: any) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = { ...updatedProjects[index], location: e.target.value };
                        handleContentUpdate({ projects: updatedProjects });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Dubai, UAE"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                    <input
                      type="text"
                      value={project.year || ""}
                      onChange={(e: any) => {
                        const updatedProjects = [...projects];
                        updatedProjects[index] = { ...updatedProjects[index], year: e.target.value };
                        handleContentUpdate({ projects: updatedProjects });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={project.description || ""}
                    onChange={(e: any) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index] = { ...updatedProjects[index], description: e.target.value };
                      handleContentUpdate({ projects: updatedProjects });
                    }}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="Project description"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Features (comma-separated)</label>
                  <input
                    type="text"
                    value={project.features ? project.features.join(", ") : ""}
                    onChange={(e: any) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index] = {
                        ...updatedProjects[index],
                        features: e.target.value.split(",").map((f: any) => f.trim()).filter((f: any) => f),
                      };
                      handleContentUpdate({ projects: updatedProjects });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Sustainable Design, Smart Home Technology"
                  />
                </div>

                <div className="mt-4">
                  <MediaUpload
                    label="Project Image"
                    type="image"
                    currentUrl={project.image}
                    onUpload={(url) => {
                      const updatedProjects = [...projects];
                      updatedProjects[index] = { ...updatedProjects[index], image: url };
                      handleContentUpdate({ projects: updatedProjects });
                    }}
                    onRemove={() => {
                      const updatedProjects = [...projects];
                      updatedProjects[index] = { ...updatedProjects[index], image: "" };
                      handleContentUpdate({ projects: updatedProjects });
                    }}
                    placeholder="Or paste image URL..."
                  />
                </div>
              </div>
            ))}
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
                value={backgroundColor}
                onChange={(e: any) => handleContentUpdate({ backgroundColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e: any) => handleContentUpdate({ textColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title Color</label>
              <input
                type="color"
                value={titleColor}
                onChange={(e: any) => handleContentUpdate({ titleColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle Color</label>
              <input
                type="color"
                value={subtitleColor}
                onChange={(e: any) => handleContentUpdate({ subtitleColor: e.target.value })}
                className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
