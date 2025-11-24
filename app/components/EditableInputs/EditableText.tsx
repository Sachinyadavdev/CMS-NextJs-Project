"use client";

import React from "react";

interface EditableTextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  step?: string;
  min?: string;
  max?: string;
  pattern?: string;
  required?: boolean;
  error?: string | null;
  helperText?: string;
}

export default function EditableText({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  disabled = false,
  step,
  min,
  max,
  pattern,
  required = false,
  error = null,
  helperText = "",
}: EditableTextProps) {
  return (
    <label className={`flex flex-col gap-2 text-sm text-gray-700 ${className}`}>
      <span className="font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        pattern={pattern}
        required={required}
        className={`rounded-lg border px-4 py-3 text-gray-900 transition-all focus:outline-none ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
      />
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    </label>
  );
}
