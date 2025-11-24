"use client";

import React from "react";

interface EditableRangeProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
  showValue?: boolean;
  unit?: string;
  helperText?: string;
}

export default function EditableRange({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = "",
  disabled = false,
  showValue = true,
  unit = "",
  helperText = "",
}: EditableRangeProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-3 text-sm text-gray-700 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-900">{label}</span>
        {showValue && (
          <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded border border-gray-300">
            {value}
            {unit && <span className="text-gray-600 ml-1">{unit}</span>}
          </span>
        )}
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(parseFloat(event.target.value))}
          disabled={disabled}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            background: disabled
              ? "#E5E7EB"
              : `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {helperText && <span className="text-xs text-gray-500">{helperText}</span>}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${disabled ? "#9CA3AF" : "#3B82F6"};
          cursor: ${disabled ? "not-allowed" : "pointer"};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover:not(:disabled) {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${disabled ? "#9CA3AF" : "#3B82F6"};
          cursor: ${disabled ? "not-allowed" : "pointer"};
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover:not(:disabled) {
          transform: scale(1.2);
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
