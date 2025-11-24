"use client";

import React, { useState } from "react";
import { ContactFormSection, ContactFormField } from "@/lib/db";
import { 
  User, 
  Mail, 
  Smartphone, 
  MessageSquare, 
  Building, 
  Calendar,
  Hash,
  CheckSquare,
  Circle,
  ChevronDown,
  Plus, 
  Trash2, 
  Edit3,
  MoveUp,
  MoveDown,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { EditableText, EditableTextarea, EditableColorPicker, EditableSelect, EditableCheckbox } from "@/app/components/EditableInputs";

interface EditableContactFormProps {
  section: ContactFormSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<ContactFormSection>) => void;
}

export default function ContactForm({
  section,
  isEditing,
  onUpdate,
}: EditableContactFormProps) {
  const content = section.content || {};
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContentUpdate = (patch: Record<string, unknown>) => {
    onUpdate({ content: { ...content, ...patch } });
  };

  const handleFieldUpdate = (fieldId: string, updates: Record<string, unknown>) => {
    const fields = content.fields || [];
    const updatedFields = fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    handleContentUpdate({ fields: updatedFields });
  };

  const addNewField = (type: ContactFormField['type']) => {
    const fields = content.fields || [];
    const newField: ContactFormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}`,
      required: false,
      width: 'full',
      order: fields.length
    };

    if (type === 'select' || type === 'radio' || type === 'checkbox') {
      newField.options = ['Option 1', 'Option 2', 'Option 3'];
    }

    handleContentUpdate({ fields: [...fields, newField] });
  };

  const removeField = (fieldId: string) => {
    const fields = content.fields || [];
    const updatedFields = fields.filter(field => field.id !== fieldId);
    handleContentUpdate({ fields: updatedFields });
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const fields = content.fields || [];
    const currentIndex = fields.findIndex(field => field.id === fieldId);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= fields.length) return;
    
    const updatedFields = [...fields];
    [updatedFields[currentIndex], updatedFields[newIndex]] = [updatedFields[newIndex], updatedFields[currentIndex]];
    
    handleContentUpdate({ fields: updatedFields });
  };

  const getFieldIcon = (type: ContactFormField['type']) => {
    const iconProps = { className: "w-5 h-5" };
    switch (type) {
      case 'text': return <User {...iconProps} />;
      case 'email': return <Mail {...iconProps} />;
      case 'tel': return <Smartphone {...iconProps} />;
      case 'textarea': return <MessageSquare {...iconProps} />;
      case 'select': return <ChevronDown {...iconProps} />;
      case 'number': return <Hash {...iconProps} />;
      case 'date': return <Calendar {...iconProps} />;
      case 'checkbox': return <CheckSquare {...iconProps} />;
      case 'radio': return <Circle {...iconProps} />;
      default: return <User {...iconProps} />;
    }
  };

  const validateField = (field: ContactFormField, value: any): string => {
    if (field.required && (!value || value.toString().trim() === '')) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { minLength, maxLength, pattern, customMessage } = field.validation;
      
      if (minLength && value.toString().length < minLength) {
        return customMessage || `${field.label} must be at least ${minLength} characters`;
      }
      
      if (maxLength && value.toString().length > maxLength) {
        return customMessage || `${field.label} must be no more than ${maxLength} characters`;
      }
      
      if (pattern && !new RegExp(pattern).test(value.toString())) {
        return customMessage || `${field.label} format is invalid`;
      }
    }

    if (field.type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const fields = content.fields || [];
    const errors: Record<string, string> = {};

    // Validate all fields
    fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        errors[field.id] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({});
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const renderField = (field: ContactFormField, isPreview = false) => {
    const value = formData[field.id] || '';
    const error = formErrors[field.id];
    const hasError = Boolean(error);

    const fieldProps = {
      id: field.id,
      name: field.id,
      placeholder: field.placeholder,
      required: field.required,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [field.id]: e.target.value });
        if (error) {
          setFormErrors({ ...formErrors, [field.id]: '' });
        }
      },
      className: `w-full px-4 py-3 border rounded-lg transition-all duration-300 ${
        hasError 
          ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
      } focus:ring-2 focus:outline-none ${
        content.animateOnFocus ? 'transform focus:scale-105' : ''
      }`,
      style: {
        backgroundColor: content.fieldBackgroundColor || '#FFFFFF',
        borderColor: hasError ? '#EF4444' : (content.fieldBorderColor || '#D1D5DB'),
        color: content.fieldTextColor || '#374151'
      }
    };

    let fieldElement;

    switch (field.type) {
      case 'textarea':
        fieldElement = (
          <textarea
            {...fieldProps}
            rows={4}
            className={`${fieldProps.className} resize-none`}
          />
        );
        break;
      
      case 'select':
        fieldElement = (
          <select {...fieldProps}>
            <option value="">{field.placeholder || `Select ${field.label}`}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
        break;
      
      case 'checkbox':
        fieldElement = (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={field.id}
                  value={option}
                  checked={Array.isArray(value) && value.includes(option)}
                  onChange={(e: any) => {
                    const currentValue = Array.isArray(value) ? value : [];
                    const newValue = e.target.checked
                      ? [...currentValue, option]
                      : currentValue.filter(v => v !== option);
                    setFormData({ ...formData, [field.id]: newValue });
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span style={{ color: content.fieldTextColor || '#374151' }}>{option}</span>
              </label>
            ))}
          </div>
        );
        break;
      
      case 'radio':
        fieldElement = (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e: any) => setFormData({ ...formData, [field.id]: e.target.value })}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span style={{ color: content.fieldTextColor || '#374151' }}>{option}</span>
              </label>
            ))}
          </div>
        );
        break;
      
      default:
        fieldElement = (
          <input
            {...fieldProps}
            type={field.type}
          />
        );
    }

    const widthClass = isPreview 
      ? field.width === 'half' ? 'md:col-span-6' : field.width === 'third' ? 'md:col-span-4' : 'md:col-span-12'
      : 'col-span-12';

    return (
      <div key={field.id} className={`${widthClass} space-y-2`}>
        <label 
          htmlFor={field.id}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: content.labelColor || '#374151' }}
        >
          {content.showFieldIcons && getFieldIcon(field.type)}
          {field.label}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        
        {fieldElement}
        
        {error && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
      </div>
    );
  };

  if (!isEditing) {
    const {
      title = "Get in Touch",
      subtitle = "We'd Love to Hear From You",
      description = "Fill out the form below and we'll get back to you as soon as possible.",
      fields = [
        {
          id: 'name',
          type: 'text' as const,
          label: 'Full Name',
          placeholder: 'Enter your full name',
          required: true,
          width: 'half' as const,
          order: 0
        },
        {
          id: 'email',
          type: 'email' as const,
          label: 'Email Address',
          placeholder: 'Enter your email address',
          required: true,
          width: 'half' as const,
          order: 1
        },
        {
          id: 'phone',
          type: 'tel' as const,
          label: 'Phone Number',
          placeholder: 'Enter your phone number',
          required: false,
          width: 'half' as const,
          order: 2
        },
        {
          id: 'company',
          type: 'text' as const,
          label: 'Company',
          placeholder: 'Enter your company name',
          required: false,
          width: 'half' as const,
          order: 3
        },
        {
          id: 'message',
          type: 'textarea' as const,
          label: 'Message',
          placeholder: 'Tell us about your project or inquiry',
          required: true,
          width: 'full' as const,
          order: 4
        }
      ],
      submitButtonText = "Send Message",
      successMessage = "Thank you! Your message has been sent successfully.",
      errorMessage = "Sorry, there was an error sending your message. Please try again.",
      titleColor = '#EF4130',
      subtitleColor = '#6B7280',
      descriptionColor = '#374151',
      backgroundColor = '#F9FAFB',
      formBackgroundColor = '#FFFFFF',
      fieldBackgroundColor = '#FFFFFF',
      fieldBorderColor = '#D1D5DB',
      fieldTextColor = '#374151',
      labelColor = '#374151',
      buttonBackgroundColor = '#EF4130',
      buttonTextColor = '#FFFFFF',
      buttonHoverColor = '#DC2626',
      accentColor = '#EF4130',
      alignment = 'center',
      formLayout = 'two-column',
      showFieldIcons = true,
      animateOnFocus = true,
      paddingTop = '0px',
      paddingBottom = '80px',
      marginTop = '0px',
      marginBottom = '0px',
      animationDelay = 0.2,
    } = content;

    const sortedFields = [...fields].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
      <section 
        className="relative overflow-hidden"
        style={{ 
          backgroundColor,
          paddingTop,
          paddingBottom,
          marginTop,
          marginBottom,
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-20 right-20 w-40 h-40 rounded-full blur-3xl opacity-10"
            style={{ 
              background: `linear-gradient(45deg, ${accentColor}, ${titleColor})`,
              animation: 'float 15s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-20 left-20 w-32 h-32 rounded-full blur-2xl opacity-15"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor}30, transparent)`,
              animation: 'float 10s ease-in-out infinite 2s'
            }}
          />
        </div>

        {/* Add keyframe animations */}
        <style jsx>{`
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-15px) translateX(8px); }
            66% { transform: translateY(8px) translateX(-8px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className={`mb-12 ${
            alignment === 'left' ? 'text-left' : 
            alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            {title && (
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                style={{ 
                  color: titleColor,
                  animation: `slideInDown 1s ease-out ${animationDelay}s both`
                }}
              >
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p 
                className="text-xl md:text-2xl font-light mb-4"
                style={{ 
                  color: subtitleColor,
                  animation: `slideInDown 1s ease-out ${animationDelay + 0.2}s both`
                }}
              >
                {subtitle}
              </p>
            )}

            {description && (
              <p 
                className="text-lg opacity-80 max-w-2xl mx-auto"
                style={{ 
                  color: descriptionColor,
                  animation: `fadeIn 1s ease-out ${animationDelay + 0.4}s both`
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Form Section */}
          <div 
            className="relative p-8 rounded-2xl shadow-2xl"
            style={{ 
              backgroundColor: formBackgroundColor,
              animation: `slideInUp 1s ease-out ${animationDelay + 0.6}s both`
            }}
          >
            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div 
                className="mb-6 p-4 rounded-lg border-l-4 bg-green-50 border-green-400 flex items-center gap-3"
                style={{ animation: 'slideInDown 0.5s ease-out' }}
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-800 font-medium">{successMessage}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div 
                className="mb-6 p-4 rounded-lg border-l-4 bg-red-50 border-red-400 flex items-center gap-3"
                style={{ animation: 'slideInDown 0.5s ease-out' }}
              >
                <AlertCircle className="w-6 h-6 text-red-600" />
                <p className="text-red-800 font-medium">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className={`grid gap-6 ${
                formLayout === 'two-column' ? 'md:grid-cols-12' : 'grid-cols-1'
              }`}>
                {sortedFields.map(field => renderField(field, true))}
              </div>

              <div className="pt-6 border-t border-gray-200 mt-6">
                <p className="text-sm text-gray-600 mb-4 flex items-center justify-start gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Your data is securely saved and your privacy is fully maintained
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full md:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{
                    backgroundColor: buttonBackgroundColor,
                    color: buttonTextColor,
                  }}
                  onMouseEnter={(e: any) => {
                    e.currentTarget.style.backgroundColor = buttonHoverColor;
                  }}
                  onMouseLeave={(e: any) => {
                    e.currentTarget.style.backgroundColor = buttonBackgroundColor;
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {submitButtonText}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Render the preview section
  const renderPreview = () => {
    const {
      title = "Get in Touch",
      subtitle = "We'd Love to Hear From You",
      description = "Fill out the form below and we'll get back to you as soon as possible.",
      fields = [],
      titleColor = '#EF4130',
      subtitleColor = '#6B7280',
      descriptionColor = '#374151',
      backgroundColor = '#F9FAFB',
      formBackgroundColor = '#FFFFFF',
      alignment = 'center',
      formLayout = 'two-column',
    } = content;

    const sortedFields = [...fields].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
      <section 
        className="relative overflow-hidden rounded-lg p-8"
        style={{ backgroundColor }}
      >
        <div className="max-w-2xl mx-auto">
          {/* Header Preview */}
          <div className={`mb-8 ${
            alignment === 'left' ? 'text-left' : 
            alignment === 'right' ? 'text-right' : 'text-center'
          }`}>
            {title && (
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ color: titleColor }}
              >
                {title}
              </h2>
            )}
            
            {subtitle && (
              <p 
                className="text-lg font-light mb-2 opacity-80"
                style={{ color: subtitleColor }}
              >
                {subtitle}
              </p>
            )}

            {description && (
              <p 
                className="text-sm opacity-70"
                style={{ color: descriptionColor }}
              >
                {description.length > 100 ? `${description.substring(0, 100)}...` : description}
              </p>
            )}
          </div>

          {/* Form Preview */}
          <div 
            className="p-6 rounded-xl shadow-lg"
            style={{ backgroundColor: formBackgroundColor }}
          >
            <div className={`grid gap-4 ${
              formLayout === 'two-column' ? 'md:grid-cols-12' : 'grid-cols-1'
            }`}>
              {sortedFields.slice(0, 4).map(field => (
                <div 
                  key={field.id} 
                  className={`space-y-2 ${
                    field.width === 'half' ? 'md:col-span-6' : 
                    field.width === 'third' ? 'md:col-span-4' : 'md:col-span-12'
                  }`}
                >
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="w-full h-10 bg-gray-100 border border-gray-300 rounded-lg"></div>
                </div>
              ))}
              {fields.length > 4 && (
                <div className="md:col-span-12 text-center text-sm text-gray-500 py-2">
                  +{fields.length - 4} more fields
                </div>
              )}
            </div>
            <div className="mt-6">
              <div className="w-32 h-10 bg-red-500 rounded-lg opacity-80"></div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const handleSaveChanges = () => {
    onUpdate({ content });
  };

  const fieldTypes: { value: ContactFormField['type']; label: string }[] = [
    { value: 'text', label: 'Text Input' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Phone' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkboxes' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-xl">
      {/* Preview Panel */}
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-100">
          <h3 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Preview
          </h3>
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl overflow-hidden">
          {renderPreview()}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="lg:col-span-2 space-y-6">
        {/* Text Content Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2" />
            Text Content
          </h3>
          <div className="space-y-4">
            <EditableText
              label="Title"
              value={content.title || ""}
              onChange={(value: any) => handleContentUpdate({ title: value })}
            />
            <EditableText
              label="Subtitle"
              value={content.subtitle || ""}
              onChange={(value: any) => handleContentUpdate({ subtitle: value })}
            />
            <EditableTextarea
              label="Description"
              value={content.description || ""}
              onChange={(value: any) => handleContentUpdate({ description: value })}
              rows={3}
            />
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-2" />
            Form Fields
          </h3>
          <div className="space-y-4">
            <div className="flex justify-end">
              <select
                onChange={(e: any) => {
                  if (e.target.value) {
                    addNewField(e.target.value as ContactFormField['type']);
                    e.target.value = '';
                  }
                }}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="">Add Field Type...</option>
                {fieldTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {(content.fields || []).map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-semibold text-gray-800 flex items-center gap-2">
                    {getFieldIcon(field.type)}
                    {field.label} ({field.type})
                  </h5>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => moveField(field.id, 'up')}
                      disabled={index === 0}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveField(field.id, 'down')}
                      disabled={index === (content.fields || []).length - 1}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingField(editingField === field.id ? null : field.id)}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="p-2 text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {editingField === field.id && (
                  <div className="space-y-4 border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <EditableText
                        label="Field Label"
                        value={field.label}
                        onChange={(value: any) => handleFieldUpdate(field.id, { label: value })}
                      />
                      <EditableText
                        label="Placeholder"
                        value={field.placeholder || ''}
                        onChange={(value: any) => handleFieldUpdate(field.id, { placeholder: value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <EditableSelect
                        label="Field Width"
                        value={field.width || 'full'}
                        onChange={(value: any) => handleFieldUpdate(field.id, { width: value })}
                        options={[
                          { value: 'full', label: 'Full Width' },
                          { value: 'half', label: 'Half Width' },
                          { value: 'third', label: 'Third Width' }
                        ]}
                      />
                      <EditableCheckbox
                        label="Required"
                        checked={Boolean(field.required)}
                        onChange={(value: any) => handleFieldUpdate(field.id, { required: value })}
                      />
                    </div>

                    {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                      <EditableTextarea
                        label="Options (one per line)"
                        value={field.options?.join('\n') || ''}
                        onChange={(value: any) => handleFieldUpdate(field.id, {
                          options: value.split('\n').filter((opt: string) => opt.trim())
                        })}
                        rows={4}
                      />
                    )}

                    {/* Validation Settings */}
                    <div className="border-t border-gray-100 pt-4">
                      <h6 className="text-sm font-semibold text-gray-900 mb-3">Validation Rules</h6>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <EditableText
                          label="Min Length"
                          value={field.validation?.minLength?.toString() || ''}
                          onChange={(value: any) => handleFieldUpdate(field.id, {
                            validation: {
                              ...field.validation,
                              minLength: value ? parseInt(value) : undefined
                            }
                          })}
                        />
                        <EditableText
                          label="Max Length"
                          value={field.validation?.maxLength?.toString() || ''}
                          onChange={(value: any) => handleFieldUpdate(field.id, {
                            validation: {
                              ...field.validation,
                              maxLength: value ? parseInt(value) : undefined
                            }
                          })}
                        />
                      </div>
                      <div className="mt-4">
                        <EditableText
                          label="Custom Error Message"
                          value={field.validation?.customMessage || ''}
                          onChange={(value: any) => handleFieldUpdate(field.id, {
                            validation: {
                              ...field.validation,
                              customMessage: value
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {(content.fields || []).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No form fields added yet. Select a field type above to get started.</p>
              </div>
            )}
          </div>
        </div>

        {/* Form Settings Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            Form Settings
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <EditableText
                label="Submit Button Text"
                value={content.submitButtonText || ""}
                onChange={(value: any) => handleContentUpdate({ submitButtonText: value })}
              />
              <EditableSelect
                label="Form Layout"
                value={content.formLayout || "two-column"}
                onChange={(value: any) => handleContentUpdate({ formLayout: value })}
                options={[
                  { value: 'single', label: 'Single Column' },
                  { value: 'two-column', label: 'Two Column' },
                  { value: 'mixed', label: 'Mixed Layout' }
                ]}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <EditableTextarea
                label="Success Message"
                value={content.successMessage || ""}
                onChange={(value: any) => handleContentUpdate({ successMessage: value })}
                rows={2}
              />
              <EditableTextarea
                label="Error Message"
                value={content.errorMessage || ""}
                onChange={(value: any) => handleContentUpdate({ errorMessage: value })}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Styling & Colors Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-2" />
            Styling & Colors
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <EditableColorPicker
              label="Title Color"
              value={content.titleColor || "#EF4130"}
              onChange={(value: any) => handleContentUpdate({ titleColor: value })}
            />
            <EditableColorPicker
              label="Subtitle Color"
              value={content.subtitleColor || "#6B7280"}
              onChange={(value: any) => handleContentUpdate({ subtitleColor: value })}
            />
            <EditableColorPicker
              label="Background Color"
              value={content.backgroundColor || "#F9FAFB"}
              onChange={(value: any) => handleContentUpdate({ backgroundColor: value })}
            />
            <EditableColorPicker
              label="Form Background"
              value={content.formBackgroundColor || "#FFFFFF"}
              onChange={(value: any) => handleContentUpdate({ formBackgroundColor: value })}
            />
            <EditableColorPicker
              label="Button Color"
              value={content.buttonBackgroundColor || "#EF4130"}
              onChange={(value: any) => handleContentUpdate({ buttonBackgroundColor: value })}
            />
            <EditableColorPicker
              label="Button Hover Color"
              value={content.buttonHoverColor || "#DC2626"}
              onChange={(value: any) => handleContentUpdate({ buttonHoverColor: value })}
            />
          </div>
        </div>

        {/* Layout Options Section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-2" />
            Layout Options
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <EditableSelect
              label="Text Alignment"
              value={content.alignment || "center"}
              onChange={(value: any) => handleContentUpdate({ alignment: value })}
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
              ]}
            />
            <div className="space-y-4">
              <EditableCheckbox
                label="Show Field Icons"
                checked={Boolean(content.showFieldIcons !== false)}
                onChange={(value: any) => handleContentUpdate({ showFieldIcons: value })}
              />
              <EditableCheckbox
                label="Animate on Focus"
                checked={Boolean(content.animateOnFocus !== false)}
                onChange={(value: any) => handleContentUpdate({ animateOnFocus: value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
