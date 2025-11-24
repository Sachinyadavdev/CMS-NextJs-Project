"use client";

import React, { useState } from "react";

interface EditableColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string | null;
  helperText?: string;
  showPreview?: boolean;
  presetColors?: string[];
}

const DEFAULT_PRESET_COLORS = [
  "#000000",
  "#FFFFFF",
  "#EF4130",
  "#D4AF37",
  "#6B7280",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#10B981",
];

export default function EditableColorPicker({
  label,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  error = null,
  helperText = "",
  showPreview = true,
  presetColors = DEFAULT_PRESET_COLORS,
}: EditableColorPickerProps) {
  const [showInput, setShowInput] = useState(false);

  const isValidHex = (hex: string) => /^#[0-9A-F]{6}$/i.test(hex);

  const handleHexChange = (newValue: string) => {
    const upperHex = newValue.toUpperCase();
    if (upperHex === "" || isValidHex(upperHex)) {
      onChange(upperHex || value);
    }
  };

  return (
    <div className={`flex flex-col gap-2 text-sm text-gray-700 ${className}`}>
      <span className="font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>

      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className={`h-12 w-16 rounded-lg border-2 cursor-pointer transition-all ${
              error ? "border-red-300" : "border-gray-300 hover:border-blue-500"
            } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowInput(!showInput)}
            disabled={disabled}
            className="px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {showInput ? "Hide" : "Hex"}
          </button>
          {showPreview && (
            <span className="text-xs text-gray-600 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
              {value}
            </span>
          )}
        </div>
      </div>

      {showInput && (
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-600">#</span>
          <input
            type="text"
            value={value.replace("#", "")}
            onChange={(event) => handleHexChange(`#${event.target.value.toUpperCase()}`)}
            placeholder="000000"
            maxLength={6}
            disabled={disabled}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-mono transition-all focus:outline-none ${
              error
                ? "border-red-300 bg-red-50 focus:border-red-500"
                : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
          />
        </div>
      )}

      {presetColors.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {presetColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              disabled={disabled}
              className={`h-8 w-8 rounded-lg border-2 transition-all hover:scale-110 ${
                value === color ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300 hover:border-gray-400"
              } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}

      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    </div>
  );
}
