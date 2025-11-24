# Editable Input Components Usage Guide

These reusable components are designed to simplify form input management in editable sections. They follow the same pattern as `MediaUpload` and can be imported and used consistently across all editable components.

## Components Available

### 1. EditableText
For simple text, email, password, or numeric text inputs.

```tsx
import { EditableText } from "@/app/components/EditableInputs";

<EditableText
  label="Title"
  value={content.title || ""}
  onChange={(val) => handleContentUpdate({ title: val })}
  placeholder="Enter title..."
  type="text"
  required
/>
```

**Props:**
- `label` (string): Field label
- `value` (string): Current value
- `onChange` (function): Callback when value changes
- `type` (string, optional): HTML input type (text, email, password, url, etc.) - default: "text"
- `placeholder` (string, optional)
- `disabled` (boolean, optional)
- `required` (boolean, optional)
- `error` (string | null, optional): Error message to display
- `helperText` (string, optional): Helper text below input
- `className` (string, optional): Additional CSS classes

---

### 2. EditableTextarea
For multi-line text input with optional character limit.

```tsx
import { EditableTextarea } from "@/app/components/EditableInputs";

<EditableTextarea
  label="Description"
  value={content.description || ""}
  onChange={(val) => handleContentUpdate({ description: val })}
  rows={6}
  maxLength={500}
  showCharCount
  required
/>
```

**Props:**
- `label` (string): Field label
- `value` (string): Current value
- `onChange` (function): Callback when value changes
- `rows` (number, optional): Number of visible rows - default: 5
- `maxLength` (number, optional): Character limit
- `showCharCount` (boolean, optional): Show character counter - default: false
- `placeholder` (string, optional)
- `disabled` (boolean, optional)
- `required` (boolean, optional)
- `error` (string | null, optional)
- `helperText` (string, optional)
- `className` (string, optional)

---

### 3. EditableSelect
For dropdown selections.

```tsx
import { EditableSelect } from "@/app/components/EditableInputs";

const fontSizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

<EditableSelect
  label="Font Size"
  value={content.fontSize || "md"}
  onChange={(val) => handleContentUpdate({ fontSize: val })}
  options={fontSizeOptions}
  placeholder="Choose size..."
  required
/>
```

**Props:**
- `label` (string): Field label
- `value` (string | number): Current value
- `onChange` (function): Callback when value changes
- `options` (SelectOption[]): Array of {label, value} objects
- `placeholder` (string, optional)
- `disabled` (boolean, optional)
- `required` (boolean, optional)
- `multiple` (boolean, optional): Allow multiple selections - default: false
- `error` (string | null, optional)
- `helperText` (string, optional)
- `className` (string, optional)

---

### 4. EditableColorPicker
For color selection with visual picker, hex input, and presets.

```tsx
import { EditableColorPicker } from "@/app/components/EditableInputs";

<EditableColorPicker
  label="Accent Color"
  value={content.accentColor || "#D4AF37"}
  onChange={(val) => handleContentUpdate({ accentColor: val })}
  showPreview
  presetColors={["#000000", "#FFFFFF", "#EF4130", "#D4AF37"]}
/>
```

**Props:**
- `label` (string): Field label
- `value` (string): Hex color value (e.g., "#D4AF37")
- `onChange` (function): Callback when value changes
- `showPreview` (boolean, optional): Show hex value preview - default: true
- `presetColors` (string[], optional): Array of preset hex colors
- `disabled` (boolean, optional)
- `required` (boolean, optional)
- `error` (string | null, optional)
- `helperText` (string, optional)
- `className` (string, optional)

---

### 5. EditableCheckbox
For boolean toggle inputs.

```tsx
import { EditableCheckbox } from "@/app/components/EditableInputs";

<EditableCheckbox
  label="Enable Animations"
  checked={content.animationEnabled || false}
  onChange={(val) => handleContentUpdate({ animationEnabled: val })}
  description="Enable smooth transitions and animations"
/>
```

**Props:**
- `label` (string): Field label
- `checked` (boolean): Current value
- `onChange` (function): Callback when value changes
- `description` (string, optional): Description text below label
- `disabled` (boolean, optional)
- `helperText` (string, optional)
- `className` (string, optional)

---

### 6. EditableNumber
For numeric input with min/max constraints.

```tsx
import { EditableNumber } from "@/app/components/EditableInputs";

<EditableNumber
  label="Animation Delay"
  value={content.animationDelay || 0.2}
  onChange={(val) => handleContentUpdate({ animationDelay: val })}
  step={0.1}
  min={0}
  max={5}
  helperText="Time in seconds"
/>
```

**Props:**
- `label` (string): Field label
- `value` (number): Current value
- `onChange` (function): Callback when value changes
- `step` (number, optional): Increment step - default: 1
- `min` (number, optional): Minimum value
- `max` (number, optional): Maximum value
- `placeholder` (string, optional)
- `disabled` (boolean, optional)
- `required` (boolean, optional)
- `error` (string | null, optional)
- `helperText` (string, optional)
- `className` (string, optional)

---

### 7. EditableRange
For slider input with visual feedback.

```tsx
import { EditableRange } from "@/app/components/EditableInputs";

<EditableRange
  label="Overlay Opacity"
  value={content.overlayOpacity || 0.4}
  onChange={(val) => handleContentUpdate({ overlayOpacity: val })}
  min={0}
  max={1}
  step={0.1}
  unit="%"
  showValue
/>
```

**Props:**
- `label` (string): Field label
- `value` (number): Current value
- `onChange` (function): Callback when value changes
- `min` (number, optional): Minimum value - default: 0
- `max` (number, optional): Maximum value - default: 100
- `step` (number, optional): Increment step - default: 1
- `showValue` (boolean, optional): Show current value - default: true
- `unit` (string, optional): Unit label (e.g., "%", "px", "s")
- `disabled` (boolean, optional)
- `helperText` (string, optional)
- `className` (string, optional)

---

## Usage in Editable Components

Replace inline input code with these reusable components:

### Before:
```tsx
<label className="flex flex-col gap-2 text-sm text-gray-700 mb-2">
  Title
  <input
    type="text"
    value={content.title || ""}
    onChange={(event) => handleContentUpdate({ title: event.target.value })}
    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
    placeholder="Enter your title..."
  />
</label>
```

### After:
```tsx
import { EditableText } from "@/app/components/EditableInputs";

<EditableText
  label="Title"
  value={content.title || ""}
  onChange={(val) => handleContentUpdate({ title: val })}
  placeholder="Enter your title..."
/>
```

## Key Benefits

✅ **Consistency**: Same styling and behavior across all editable sections  
✅ **Reusability**: No need to duplicate input code  
✅ **Maintainability**: Update styling in one place  
✅ **Extensibility**: Easy to add new features globally  
✅ **Type Safety**: Full TypeScript support  
✅ **Accessibility**: Proper labels and ARIA attributes  
✅ **Error Handling**: Built-in error and helper text support  

## Styling

All components use consistent Tailwind CSS classes:
- Blue borders/rings for focus state
- Red borders/background for error state
- Gray styling for disabled state
- Smooth transitions for better UX
