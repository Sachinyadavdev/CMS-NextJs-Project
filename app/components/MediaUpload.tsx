"use client";

import React, { useState } from "react";
import { uploadFile, deleteFile } from "@/utils/api";

interface MediaUploadProps {
  label: string;
  type: 'image' | 'video';
  currentUrl?: string;
  onUpload: (url: string) => void;
  onRemove: () => void;
  placeholder?: string;
  accept?: string;
  maxSize?: string;
  minDimensions?: string;
  supportedFormats?: string;
  className?: string;
}

export default function MediaUpload({
  label,
  type,
  currentUrl,
  onUpload,
  onRemove,
  placeholder = `Or paste ${type} URL...`,
  accept = type === 'image' ? 'image/*' : 'video/*',
  maxSize = type === 'image' ? '10MB' : '100MB',
  minDimensions = type === 'image' ? '800x600px' : '1280x720px',
  supportedFormats = type === 'image' ? 'JPEG, PNG, WebP' : 'MP4, WebM, OGG',
  className = ""
}: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState("");

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const fileUrl = await uploadFile(file, type);
      onUpload(fileUrl);
      setTempUrl("");
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = async () => {
    if (!currentUrl) return;
    
    setDeleting(true);
    setUploadError(null);
    try {
      await deleteFile(currentUrl);
      onRemove();
    } catch (error) {
      console.error('Delete failed:', error);
      setUploadError(error instanceof Error ? error.message : 'Delete failed. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
    // Reset input
    event.target.value = '';
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setTempUrl(url);
    onUpload(url);
  };

  const inputId = `${type}Upload-${Math.random().toString(36).substring(7)}`;

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        {currentUrl ? (
          <div className="space-y-3">
            {type === 'image' ? (
              <img
                src={currentUrl}
                alt={`${label} preview`}
                className="w-full h-24 object-cover rounded border border-gray-200"
              />
            ) : (
              <video
                src={currentUrl}
                className="w-full h-24 object-cover rounded border border-gray-200"
                muted
                playsInline
              />
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRemoveMedia}
                disabled={deleting}
                className="px-3 py-1 text-xs bg-red-100 text-red-700 border border-red-200 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
              >
                {deleting ? '🔄 Removing...' : '🗑️ Remove'}
              </button>
              <a
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 hover:text-primary-700 underline"
              >
                View Full
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 text-gray-400">
              {uploading ? '🔄' : type === 'image' ? '🖼️' : '🎥'}
            </div>
            <label 
              htmlFor={inputId}
              className={`cursor-pointer text-sm ${
                uploading ? 'text-gray-400' : 'text-primary-600 hover:text-primary-700'
              }`}
            >
              {uploading ? 'Uploading...' : `Upload ${type === 'image' ? 'Image' : 'Video'}`}
            </label>
            <input
              id={inputId}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <div className="text-xs text-gray-500 mt-1">
              Max {maxSize} • Min {minDimensions} • {supportedFormats}
            </div>
          </div>
        )}
      </div>

      {/* URL Input */}
      <input
        type="text"
        value={currentUrl || tempUrl}
        onChange={handleUrlChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none text-sm"
        disabled={uploading || deleting}
      />

      {/* Error Display */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{uploadError}</p>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-xs text-red-600 hover:text-red-800 mt-1"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}