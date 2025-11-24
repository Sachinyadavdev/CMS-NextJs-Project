"use client";

import React from "react";

interface SelectOption {
  label: string;
  value: string | number;
}

interface EditableSelectProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string | null;
  helperText?: string;
  multiple?: boolean;
}

export default function EditableSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  required = false,
  error = null,
  helperText = "",
  multiple = false,
}: EditableSelectProps) {
  return (
    <label className={`flex flex-col gap-2 text-sm text-gray-700 ${className}`}>
      <span className="font-semibold text-gray-900">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        required={required}
        multiple={multiple}
        className={`rounded-lg border px-4 py-3 text-gray-900 transition-all focus:outline-none ${
          error
            ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        } ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
      >
        {!multiple && (
          <option value="" disabled={required}>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
    </label>
  );
}
