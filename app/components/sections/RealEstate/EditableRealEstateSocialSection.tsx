"use client";

import React from "react";
import { RealEstateSocialSection, RealEstateSocialItem } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";

interface EditableRealEstateSocialProps {
  section: RealEstateSocialSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<RealEstateSocialSection>) => void;
}

export default function EditableRealEstateSocialSection({
  section,
  isEditing,
  onUpdate
}: EditableRealEstateSocialProps) {
  const content = section.content || {};
  const posts = content.posts || [];

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handlePostUpdate = (postIndex: number, postUpdates: Partial<RealEstateSocialItem>) => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex] = { ...updatedPosts[postIndex], ...postUpdates };
    handleContentUpdate({ posts: updatedPosts });
  };

  const addPost = () => {
    const newPost: RealEstateSocialItem = {
      id: Date.now().toString(),
      imageUrl: "",
      link: "",
      platform: "Instagram"
    };
    handleContentUpdate({ posts: [...posts, newPost] });
  };

  const removePost = (index: number) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    handleContentUpdate({ posts: updatedPosts });
  };

  if (!isEditing) {
    const {
      title = "Instagram",
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

          {/* Social Posts Grid */}
          {posts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {post.link ? (
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={`Social post ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            {post.platform || 'Social'}
                          </span>
                        </div>
                      )}
                    </a>
                  ) : (
                    post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={`Social post ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-sm">
                          {post.platform || 'Social'}
                        </span>
                      </div>
                    )
                  )}
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
              {content.title || "Instagram"}
            </h2>
            {content.subtitle && (
              <p className="text-lg opacity-80" style={{ color: content.textColor || '#000000' }}>
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Social Posts Grid */}
          {posts.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {posts.slice(0, 6).map((post, index) => (
                <div key={post.id} className="aspect-square bg-white rounded overflow-hidden shadow">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={`Post ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-500">
                        {post.platform || 'Social'}
                      </span>
                    </div>
                  )}
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
                placeholder="Instagram"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(event) => handleContentUpdate({ subtitle: event.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Follow us on social media"
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

        {/* Social Posts Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
              Social Posts
            </h3>
            <button
              onClick={addPost}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Add Post
            </button>
          </div>

          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800">Social Post {index + 1}</h5>
                  <button
                    onClick={() => removePost(index)}
                    className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
                    <select
                      value={post.platform || "Instagram"}
                      onChange={(event) => handlePostUpdate(index, { platform: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    >
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Link (Optional)</label>
                    <input
                      type="text"
                      value={post.link || ""}
                      onChange={(event) => handlePostUpdate(index, { link: event.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <MediaUpload
                    label="Post Image"
                    type="image"
                    currentUrl={post.imageUrl}
                    onUpload={(url) => handlePostUpdate(index, { imageUrl: url })}
                    onRemove={() => handlePostUpdate(index, { imageUrl: "" })}
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