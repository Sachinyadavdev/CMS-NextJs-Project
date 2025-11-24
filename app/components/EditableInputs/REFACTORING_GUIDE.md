# Refactoring Guide: Converting to Reusable Input Components

This guide shows how to refactor existing editable components to use the new centralized input components.

## Example: Refactoring EditablePhilosophySection

### Step 1: Import the Reusable Components

**Before:**
```tsx
import React from "react";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import { motion } from "framer-motion";
```

**After:**
```tsx
import React from "react";
import { HeroSection } from "@/lib/db";
import MediaUpload from "../../MediaUpload";
import {
  EditableText,
  EditableTextarea,
  EditableSelect,
  EditableColorPicker,
  EditableCheckbox,
  EditableRange,
} from "../EditableInputs";
import { motion } from "framer-motion";
```

### Step 2: Replace Individual Input Elements

**Before (Lines 242-249 of EditablePhilosophySection.tsx):**
```tsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Philosophy Text</label>
  <textarea
    value={content.text || defaultText}
    onChange={(event) => handleContentUpdate({ text: event.target.value })}
    rows={6}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
    placeholder="Enter your philosophy statement..."
  />
</div>
```

**After:**
```tsx
<EditableTextarea
  label="Philosophy Text"
  value={content.text || defaultText}
  onChange={(val) => handleContentUpdate({ text: val })}
  rows={6}
  placeholder="Enter your philosophy statement..."
/>
```

### Step 3: Replace Color Inputs

**Before (Lines 289-305 of EditablePhilosophySection.tsx):**
```tsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Accent Color</label>
  <input
    type="color"
    value={content.accentColor || "#D4AF37"}
    onChange={(event) => handleContentUpdate({ accentColor: event.target.value })}
    className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
  />
</div>

<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Text Color</label>
  <input
    type="color"
    value={content.textColor || "#ffffff"}
    onChange={(event) => handleContentUpdate({ textColor: event.target.value })}
    className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer shadow-sm"
  />
</div>
```

**After:**
```tsx
<EditableColorPicker
  label="Accent Color"
  value={content.accentColor || "#D4AF37"}
  onChange={(val) => handleContentUpdate({ accentColor: val })}
/>

<EditableColorPicker
  label="Text Color"
  value={content.textColor || "#ffffff"}
  onChange={(val) => handleContentUpdate({ textColor: val })}
/>
```

### Step 4: Replace Select Elements

**Before (Lines 310-320 of EditablePhilosophySection.tsx):**
```tsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Font Size</label>
  <select
    value={content.fontSize || "xl"}
    onChange={(event) => handleContentUpdate({ fontSize: event.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
  >
    <option value="sm">Small</option>
    <option value="base">Base</option>
    <option value="lg">Large</option>
    <option value="xl">Extra Large</option>
  </select>
</div>
```

**After:**
```tsx
<EditableSelect
  label="Font Size"
  value={content.fontSize || "xl"}
  onChange={(val) => handleContentUpdate({ fontSize: val })}
  options={[
    { label: "Small", value: "sm" },
    { label: "Base", value: "base" },
    { label: "Large", value: "lg" },
    { label: "Extra Large", value: "xl" },
  ]}
/>
```

### Step 5: Replace Range/Slider Inputs

**Before (Lines 324-336 of EditablePhilosophySection.tsx):**
```tsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">Overlay Opacity</label>
  <input
    type="range"
    min="0"
    max="1"
    step="0.1"
    value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.4}
    onChange={(event) => handleContentUpdate({ overlayOpacity: parseFloat(event.target.value) })}
    className="w-full"
  />
  <span className="text-xs text-gray-500 text-center block mt-1">
    {((content.overlayOpacity !== undefined ? content.overlayOpacity : 0.4) * 100).toFixed(0)}%
  </span>
</div>
```

**After:**
```tsx
<EditableRange
  label="Overlay Opacity"
  value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.4}
  onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
  min={0}
  max={1}
  step={0.1}
  unit="%"
  showValue
/>
```

### Step 6: Replace Checkbox Inputs

**Before (Lines 346-354 of EditablePhilosophySection.tsx):**
```tsx
<label className="flex items-center gap-3">
  <input
    type="checkbox"
    checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
    onChange={(event) => handleContentUpdate({ animationEnabled: event.target.checked })}
    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
  />
  <span className="text-sm text-gray-700">Enable Animations</span>
</label>
```

**After:**
```tsx
<EditableCheckbox
  label="Enable Animations"
  checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
  onChange={(val) => handleContentUpdate({ animationEnabled: val })}
/>
```

## Full Refactored Editing Section Example

```tsx
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
      {/* ... preview code remains the same ... */}
    </motion.div>

    {/* Controls Panel */}
    <div className="lg:col-span-2 space-y-6">
      {/* Philosophy Text Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2 inline-block" />
          Philosophy Text
        </h3>
        <div className="space-y-4">
          <EditableTextarea
            label="Philosophy Text"
            value={content.text || defaultText}
            onChange={(val) => handleContentUpdate({ text: val })}
            rows={6}
            placeholder="Enter your philosophy statement..."
          />
        </div>
      </div>

      {/* Media Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mr-2 inline-block" />
          Media & Background
        </h3>
        <div className="space-y-4">
          <MediaUpload
            label="Background Image"
            type="image"
            currentUrl={content.imageUrl}
            onUpload={(url) => handleContentUpdate({ imageUrl: url })}
            onRemove={() => handleContentUpdate({ imageUrl: "" })}
            placeholder="Or paste image URL..."
          />
          {content.imageUrl && (
            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <img
                src={content.imageUrl}
                alt="Philosophy section preview"
                className="h-32 w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Styling Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 inline-block" />
          Styling & Colors
        </h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <EditableColorPicker
            label="Accent Color"
            value={content.accentColor || "#D4AF37"}
            onChange={(val) => handleContentUpdate({ accentColor: val })}
          />

          <EditableColorPicker
            label="Text Color"
            value={content.textColor || "#ffffff"}
            onChange={(val) => handleContentUpdate({ textColor: val })}
          />

          <EditableSelect
            label="Font Size"
            value={content.fontSize || "xl"}
            onChange={(val) => handleContentUpdate({ fontSize: val })}
            options={[
              { label: "Small", value: "sm" },
              { label: "Base", value: "base" },
              { label: "Large", value: "lg" },
              { label: "Extra Large", value: "xl" },
            ]}
          />
        </div>
        
        <div className="mt-6">
          <EditableRange
            label="Overlay Opacity"
            value={content.overlayOpacity !== undefined ? content.overlayOpacity : 0.4}
            onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
            min={0}
            max={1}
            step={0.1}
            unit="%"
            showValue
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2 inline-block" />
          Features & Options
        </h3>
        <div className="space-y-4">
          <EditableCheckbox
            label="Enable Animations"
            checked={content.animationEnabled !== undefined ? content.animationEnabled : true}
            onChange={(val) => handleContentUpdate({ animationEnabled: val })}
          />
        </div>
      </div>
    </div>
  </div>
);
```

## Benefits of Refactoring

1. **Reduced Code**: 30-50% less code in each component
2. **Consistency**: All inputs look and behave the same way
3. **Maintainability**: Bug fixes and improvements apply to all components
4. **Easier Updates**: Change styling in one place
5. **Better UX**: Consistent error handling and accessibility features
6. **Type Safety**: Full TypeScript support with proper types

## Migration Strategy

1. Create the new EditableInputs folder and components (Done!)
2. Refactor non-critical components first (e.g., smaller sections)
3. Test thoroughly before moving to critical components
4. Update multiple components in batches (e.g., all "Contact" components)
5. Remove old inline input patterns once migration is complete

## Common Patterns to Replace

| Old Pattern | New Component |
|------------|---------------|
| `<input type="text" />` | `<EditableText />` |
| `<textarea />` | `<EditableTextarea />` |
| `<select />` | `<EditableSelect />` |
| `<input type="color" />` | `<EditableColorPicker />` |
| `<input type="checkbox" />` | `<EditableCheckbox />` |
| `<input type="number" />` | `<EditableNumber />` |
| `<input type="range" />` | `<EditableRange />` |
