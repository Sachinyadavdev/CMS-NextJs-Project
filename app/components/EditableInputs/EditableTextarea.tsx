"use client";

import React from "react";

interface EditableTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  required?: boolean;
  error?: string | null;
  helperText?: string;
  showCharCount?: boolean;
}

export default function EditableTextarea({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 5,
  className = "",
  disabled = false,
  maxLength,
  required = false,
  error = null,
  helperText = "",
  showCharCount = false,
}: EditableTextareaProps) {
  const charCount = value?.length || 0;
  const charPercentage = maxLength ? (charCount / maxLength) * 100 : 0;

  return (
    <label className={`flex flex-col gap-2 text-sm text-gray-700 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">
          {label}
          {required && <span className="text-red-500">*</span>}
        </span>
        {showCharCount && maxLength && (
          <span className={`text-xs font-medium ${charPercentage > 90 ? "text-red-600" : "text-gray-500"}`}>
            {charCount} / {maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        required={required}
        className={`rounded-lg border px-4 py-3 text-gray-900 transition-all focus:outline-none resize-none ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
      />
      {showCharCount && maxLength && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-colors ${charPercentage > 90 ? "bg-red-500" : "bg-blue-500"}`}
            style={{ width: `${Math.min(charPercentage, 100)}%` }}
          />
        </div>
      )}
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    </label>
  );
}
