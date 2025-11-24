"use client";

import React from "react";

interface EditableCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  helperText?: string;
  description?: string;
}

export default function EditableCheckbox({
  label,
  checked,
  onChange,
  className = "",
  disabled = false,
  helperText = "",
  description = "",
}: EditableCheckboxProps) {
  return (
    <div className={`flex items-start gap-3 ${className}`}>
      <input
        type="checkbox"
        id={`checkbox-${label}`}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
        className={`h-4 w-4 rounded border-gray-300 transition-all accent-blue-500 mt-1 cursor-pointer ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      />
      <label 
        htmlFor={`checkbox-${label}`}
        className={`flex flex-col gap-1 text-sm ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
      >
        <span className="font-semibold text-gray-900">{label}</span>
        {description && <span className="text-xs text-gray-600">{description}</span>}
        {helperText && <span className="text-xs text-gray-500">{helperText}</span>}
      </label>
    </div>
  );
}
