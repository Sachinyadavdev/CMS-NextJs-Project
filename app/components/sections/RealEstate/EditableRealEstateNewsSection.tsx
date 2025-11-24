"use client";

import React from "react";
import { RealEstateNewsSection, RealEstateNewsItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

interface EditableRealEstateNewsProps {
  section: RealEstateNewsSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateNewsSection>) => void;
}

export default function EditableRealEstateNewsSection({
  section,
  isEditing,
  onUpdate
}: EditableRealEstateNewsProps) {
  const content = section.content || {};
  const news = content.news || [];

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleNewsUpdate = (newsIndex: number, newsUpdates: Partial<RealEstateNewsItem>) => {
    const updatedNews = [...news];
    updatedNews[newsIndex] = { ...updatedNews[newsIndex], ...newsUpdates };
    handleContentUpdate({ news: updatedNews });
  };

  const addNews = () => {
    const newNewsItem: RealEstateNewsItem = {
      id: Date.now().toString(),
      title: "New News Article",
      description: "News description",
      imageUrl: "",
      link: "",
      date: new Date().toISOString().split('T')[0]
    };
    handleContentUpdate({ news: [...news, newNewsItem] });
  };

  const removeNews = (index: number) => {
    const updatedNews = news.filter((_, i) => i !== index);
    handleContentUpdate({ news: updatedNews });
  };

  if (!isEditing) {
    const {
      title = "News",
      subtitle = "",
      backgroundColor = '#ffffff',
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

          {/* News Grid */}
          {news.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((newsItem, index) => (
                <article
                  key={newsItem.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {newsItem.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={newsItem.imageUrl}
                        alt={newsItem.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {newsItem.date && (
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(newsItem.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    )}

                    {newsItem.title && (
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 line-clamp-2">
                        {newsItem.title}
                      </h3>
                    )}

                    {newsItem.description && (
                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {newsItem.description}
                      </p>
                    )}

                    {newsItem.link && (
                      <a
                        href={newsItem.link}
                        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                      >
                        Read More →
                      </a>
                    )}
                  </div>
                </article>
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
        style={{ backgroundColor: content.backgroundColor || '#ffffff' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: content.textColor || '#000000' }}>
              {content.title || "News"}
            </h2>
            {content.subtitle && (
              <p className="text-lg opacity-80" style={{ color: content.textColor || '#000000' }}>
                {content.subtitle}
              </p>
            )}
          </div>

          {/* News Grid */}
          {news.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {news.slice(0, 3).map((newsItem, index) => (
                <div key={newsItem.id} className="bg-white rounded-lg overflow-hidden shadow">
                  {newsItem.imageUrl && (
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="w-full h-24 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <div className="text-xs text-gray-500 mb-1">
                      {newsItem.date}
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {newsItem.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {newsItem.description}
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
                placeholder="News"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(event) => handleContentUpdate({ subtitle: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Latest updates and announcements"
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
                value={content.backgroundColor || "#ffffff"}
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

        {/* News Articles Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              News Articles
            </h3>
            <button
              onClick={addNews}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Article
            </button>
          </div>

          <div className="space-y-4">
            {news.map((newsItem, index) => (
              <div key={newsItem.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">News Article {index + 1}</h5>
                  <button
                    onClick={() => removeNews(index)}
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
                      value={newsItem.title || ""}
                      onChange={(event) => handleNewsUpdate(index, { title: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="News Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={newsItem.date || ""}
                      onChange={(event) => handleNewsUpdate(index, { date: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link (Optional)</label>
                    <input
                      type="text"
                      value={newsItem.link || ""}
                      onChange={(event) => handleNewsUpdate(index, { link: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newsItem.description || ""}
                    onChange={(event) => handleNewsUpdate(index, { description: event.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                    placeholder="News description"
                  />
                </div>

                <div className="mt-4">
                  <MediaUpload
                    label="News Image (Optional)"
                    type="image"
                    currentUrl={newsItem.imageUrl}
                    onUpload={(url) => handleNewsUpdate(index, { imageUrl: url })}
                    onRemove={() => handleNewsUpdate(index, { imageUrl: "" })}
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