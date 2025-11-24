"use client";

import React from "react";

interface EditableNumberProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  required?: boolean;
  error?: string | null;
  helperText?: string;
}

export default function EditableNumber({
  label,
  value,
  onChange,
  placeholder = "0",
  className = "",
  disabled = false,
  step = 1,
  min,
  max,
  required = false,
  error = null,
  helperText = "",
}: EditableNumberProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseFloat(event.target.value);
    if (!isNaN(numValue) || event.target.value === "") {
      onChange(numValue || 0);
    }
  };

  return (
    <label className={`flex flex-col gap-2 text-sm text-gray-700 ${className}`}>
      <span className="font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
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
