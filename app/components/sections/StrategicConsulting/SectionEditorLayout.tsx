"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionEditorLayoutProps {
  title: string;
  description?: string;
  preview: React.ReactNode;
  controls: React.ReactNode;
  previewWrapperClassName?: string;
  previewBadgeLabel?: string;
  containerClassName?: string;
}

export default function SectionEditorLayout({
  title,
  description,
  preview,
  controls,
  previewWrapperClassName,
  previewBadgeLabel = "Live Preview",
  containerClassName = "min-h-screen bg-gray-50",
}: SectionEditorLayoutProps) {
  const previewWrapperClasses =
    previewWrapperClassName ||
    "relative h-[680px] bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-200";

  return (
    <div className={containerClassName}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-gray-200 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-8"
          >
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={previewWrapperClasses}
            >
              {preview}
              {previewBadgeLabel && (
                <div className="absolute top-5 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-gray-800 font-medium text-sm">
                    {previewBadgeLabel}
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-8">{controls}</div>
        </div>
      </div>
    </div>
  );
}
