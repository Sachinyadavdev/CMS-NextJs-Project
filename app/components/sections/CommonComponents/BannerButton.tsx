"use client";

import React from "react";
import { ArrowRight, ExternalLink, Download, Play, Send, Phone, Mail, MessageCircle } from "lucide-react";

interface BannerButtonProps {
  // Content Props
  text: string;
  href?: string;
  onClick?: () => void;
  
  // Style Variants
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  // Customization
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  
  // Icon Options
  icon?: 'arrow-right' | 'external-link' | 'download' | 'play' | 'send' | 'phone' | 'mail' | 'message' | 'none';
  iconPosition?: 'left' | 'right';
  
  // Animation & Effects
  animation?: 'slide' | 'scale' | 'glow' | 'shimmer' | 'bounce' | 'pulse';
  shadow?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  // Behavior
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  openInNewTab?: boolean;
  
  // Additional Props
  className?: string;
  id?: string;
  ariaLabel?: string;
}

const BannerButton: React.FC<BannerButtonProps> = ({
  text,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  backgroundColor,
  textColor,
  borderColor,
  hoverBackgroundColor,
  hoverTextColor,
  icon = 'arrow-right',
  iconPosition = 'right',
  animation = 'slide',
  shadow = true,
  rounded = 'lg',
  disabled = false,
  loading = false,
  fullWidth = false,
  openInNewTab = false,
  className = '',
  id,
  ariaLabel,
}) => {
  // Icon mapping
  const iconMap = {
    'arrow-right': ArrowRight,
    'external-link': ExternalLink,
    'download': Download,
    'play': Play,
    'send': Send,
    'phone': Phone,
    'mail': Mail,
    'message': MessageCircle,
    'none': null,
  };

  const IconComponent = icon !== 'none' ? iconMap[icon] : null;

  // Size configurations
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  // Base variant styles
  const getVariantStyles = () => {
    const baseStyles = "font-bold transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50";
    
    switch (variant) {
      case 'primary':
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-2 border-red-600 hover:border-red-700`;
      case 'secondary':
        return `${baseStyles} bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 border-2 border-gray-600 hover:border-gray-700`;
      case 'outline':
        return `${baseStyles} bg-transparent text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500`;
      case 'ghost':
        return `${baseStyles} bg-transparent text-red-600 border-2 border-transparent hover:bg-red-50 hover:border-red-200 focus:ring-red-500`;
      case 'gradient':
        return `${baseStyles} bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white hover:from-red-700 hover:via-red-600 hover:to-orange-600 focus:ring-red-500 border-2 border-transparent`;
      default:
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-2 border-red-600 hover:border-red-700`;
    }
  };

  // Animation classes
  const getAnimationClasses = () => {
    switch (animation) {
      case 'slide':
        return 'hover:translate-x-1 active:translate-x-0';
      case 'scale':
        return 'hover:scale-105 active:scale-95';
      case 'glow':
        return 'hover:shadow-2xl hover:shadow-red-500/50';
      case 'shimmer':
        return 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700';
      case 'bounce':
        return 'hover:animate-bounce';
      case 'pulse':
        return 'hover:animate-pulse';
      default:
        return 'hover:translate-x-1 active:translate-x-0';
    }
  };

  // Custom style overrides
  const customStyles: React.CSSProperties = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    ...(borderColor && { borderColor }),
  };

  // Hover styles (applied via CSS variables)
  const hoverStyles: React.CSSProperties = {
    '--hover-bg': hoverBackgroundColor || '',
    '--hover-text': hoverTextColor || '',
  } as React.CSSProperties;

  const buttonClasses = `
    ${getVariantStyles()}
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    ${getAnimationClasses()}
    ${shadow ? 'shadow-lg hover:shadow-xl' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${loading ? 'cursor-wait' : ''}
    inline-flex items-center justify-center gap-2 group
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {/* Loading Spinner */}
      {loading && (
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
      )}
      
      {/* Left Icon */}
      {IconComponent && iconPosition === 'left' && !loading && (
        <IconComponent 
          className={`${iconSizes[size]} transition-transform duration-300 ${
            animation === 'slide' ? 'group-hover:-translate-x-1' : ''
          }`} 
        />
      )}
      
      {/* Button Text */}
      <span className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
        {text}
      </span>
      
      {/* Right Icon */}
      {IconComponent && iconPosition === 'right' && !loading && (
        <IconComponent 
          className={`${iconSizes[size]} transition-transform duration-300 ${
            animation === 'slide' ? 'group-hover:translate-x-1' : ''
          }`} 
        />
      )}
      
      {/* Shimmer Effect Overlay */}
      {animation === 'shimmer' && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      )}
    </>
  );

  // Additional CSS for custom hover colors
  const additionalCSS = (
    <style jsx>{`
      .custom-hover:hover {
        background-color: var(--hover-bg) !important;
        color: var(--hover-text) !important;
      }
    `}</style>
  );

  if (href) {
    return (
      <>
        {additionalCSS}
        <a
          href={href}
          className={`${buttonClasses} ${hoverBackgroundColor || hoverTextColor ? 'custom-hover' : ''}`}
          style={{ ...customStyles, ...hoverStyles }}
          onClick={handleClick}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          id={id}
          aria-label={ariaLabel || text}
          aria-disabled={disabled}
        >
          {content}
        </a>
      </>
    );
  }

  return (
    <>
      {additionalCSS}
      <button
        className={`${buttonClasses} ${hoverBackgroundColor || hoverTextColor ? 'custom-hover' : ''}`}
        style={{ ...customStyles, ...hoverStyles }}
        onClick={handleClick}
        disabled={disabled}
        id={id}
        aria-label={ariaLabel || text}
        type="button"
      >
        {content}
      </button>
    </>
  );
};

export default BannerButton;

// Example usage components for easy copy-paste
export const BannerButtonExamples = {
  // Primary CTA Button
  PrimaryCTA: () => (
    <BannerButton
      text="Get Started"
      href="#"
      variant="primary"
      size="lg"
      animation="slide"
      shadow={true}
    />
  ),

  // Contact Button
  ContactButton: () => (
    <BannerButton
      text="Contact Us"
      href="#contact"
      variant="outline"
      icon="phone"
      animation="glow"
      size="md"
    />
  ),

  // Download Button
  DownloadButton: () => (
    <BannerButton
      text="Download Brochure"
      href="/brochure.pdf"
      variant="gradient"
      icon="download"
      animation="shimmer"
      openInNewTab={true}
    />
  ),

  // Play Video Button
  PlayButton: () => (
    <BannerButton
      text="Watch Video"
      variant="ghost"
      icon="play"
      animation="scale"
      rounded="full"
      onClick={() => console.log('Play video')}
    />
  ),

  // Custom Styled Button
  CustomButton: () => (
    <BannerButton
      text="Custom Style"
      href="#"
      variant="primary"
      backgroundColor="#8B5CF6"
      hoverBackgroundColor="#7C3AED"
      textColor="#FFFFFF"
      animation="bounce"
      shadow={true}
    />
  ),

  // Loading Button
  LoadingButton: () => (
    <BannerButton
      text="Submitting..."
      variant="primary"
      loading={true}
      disabled={true}
    />
  ),

  // Full Width Button
  FullWidthButton: () => (
    <BannerButton
      text="Subscribe Now"
      href="#subscribe"
      variant="gradient"
      fullWidth={true}
      size="lg"
      animation="glow"
    />
  ),
};

// Type export for use in other components
export type { BannerButtonProps };
