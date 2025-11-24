import fs from "fs";
import path from "path";

const dbDir = path.join(process.cwd(), "data");
const layoutsFile = path.join(dbDir, "layouts.json");
const layoutVersionsFile = path.join(dbDir, "layout-versions.json");
const usersFile = path.join(dbDir, "users.json");

const ensureDbDir = () => {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
};

const ensureFile = (filePath: string, defaultData: any) => {
  ensureDbDir();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

const getLayoutVersions = (): LayoutVersion[] => {
  ensureFile(layoutVersionsFile, []);
  const data = fs.readFileSync(layoutVersionsFile, "utf-8");
  return JSON.parse(data);
};

const saveLayoutVersions = (versions: LayoutVersion[]): void => {
  fs.writeFileSync(layoutVersionsFile, JSON.stringify(versions, null, 2));
};

const getLayoutVersionsByLayoutId = (layoutId: string): LayoutVersion[] => {
  const versions = getLayoutVersions();
  return versions.filter((v) => v.layoutId === layoutId);
};

export interface BaseSection<TContent = any> {
  id: string;
  type: string;
  content: TContent;
  hidden?: boolean;
  order?: number;
}

export interface HeroContent {
  title?: string;
  subtitle?: string;
  text?: string;
  description?: string;


  // Primary Button
  buttonText?: string;
  buttonLink?: string;
  buttonIcon?: string;
  buttonAnimation?: string;

  // Secondary Button
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonVariant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  secondaryButtonIcon?: string;
  secondaryButtonAnimation?: string;

  backgroundImage?: string;
  backgroundVideo?: string;
  imageUrl?: string;
  videoUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
  fontSize?: string;
  color?: string;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
  accentColor?: string;
  animationEnabled?: boolean;
  blurIntensity?: number;
  features?: any,
  animationStyle?: any,
  showScrollIndicator?: boolean;
  cardPadding?: string;
}

export type HeroSection = BaseSection<HeroContent>;

export interface TextContent {
  title?: string;
  text?: string;
  fontSize?: string;
  color?: string;
  alignment?: "left" | "center" | "right";
}

export type TextSection = BaseSection<TextContent>;

export interface CardContent {
  title?: string;
  text?: string;
  imageUrl?: string;
  subtitle?: string;
  mediaUrl?: string;
  mediaType?: string;
}

export type CardSection = BaseSection<CardContent>;

export interface WhoWeAreContent {
  title?: string;
  text?: string;
  fontSize?: string;
  color?: string;
  alignment?: "left" | "center" | "right";
  titleAlignment?: "left" | "center" | "right";
  textAlignment?: "left" | "center" | "right";
  titleFontSize?: string;
  textFontSize?: string;
  titleColor?: string;
  textColor?: string;
  imageUrl?: string;
  sectionAlignment?: "left" | "right";
  accentColor?: string;
}

export type WhoWeAreSection = BaseSection<WhoWeAreContent>;

export interface HomeAboutContent {
  title?: string;
  subtitle?: string;
  description?: string;
  additionalText?: string;
  logoImage?: string;
  logoVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  alignment?: "left" | "center" | "right";
  layout?: string;
}

export type HomeAboutSection = BaseSection<HomeAboutContent>;

export interface HomeServiceItem {
  id: string;
  iconType?: "lucide" | "custom";
  iconName?: string;
  iconUrl?: string;
  title?: string;
  description?: string;
}

export type HomeServicesContent =
  | HomeServiceItem[]
  | {
      title?: string;
      subtitle?: string;
      services?: HomeServiceItem[];
      [key: string]: any;
    };

export type HomeServicesSection = BaseSection<HomeServicesContent>;

export interface HomeSustainableLegacyContent {
  title?: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  alignment?: "left" | "center" | "right";
}

export type HomeSustainableLegacySection =
  BaseSection<HomeSustainableLegacyContent>;

export interface DoubleHeadingContent {
  title?: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
  titleFontSize?: string;
  subtitleFontSize?: string;
  alignment?: "left" | "center" | "right";
  marginTop?: string;
  marginBottom?: string;
  backgroundColor?: string;
}

export type DoubleHeadingSection = BaseSection<DoubleHeadingContent>;

export interface HoverCardItem {
  id: string;
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  mediaType?: string;
  type?: string;
}

export interface HoverCardContent {
  cards?: HoverCardItem[];
  [key: string]: any;
}

export type HoverCardSection = BaseSection<HoverCardContent>;

export interface InnerBannerTextContent {
  title?: string;
  description?: string;
  titleColor?: string;
  descriptionColor?: string;
  titleFontSize?: string;
  descriptionFontSize?: string;
  alignment?: "left" | "center" | "right";
  bannerBackgroundImage?: string;
  bannerBackgroundVideo?: string;
  overlayColor?: string;
  overlayOpacity?: string | number;
  height?: string;
  paddingTop?: string;
  paddingBottom?: string;
}

export type InnerBannerTextSection = BaseSection<InnerBannerTextContent>;

export interface BannerStat {
  label?: string;
  value?: string;
  valueColor?: string;
  description?: string;
  labelColor?: string;
  labelFontSize?: string;
  valueFontSize?: string;
}

export interface BannerWithStatsContent extends InnerBannerTextContent {
  stats?: BannerStat[];
  marginTop?: string;
  alignment?: "left" | "center" | "right";
  showStats?: boolean;
  statsLabelColor?: string;
  statsValueColor?: string;
  statsLabelFontSize?: string;
  statsValueFontSize?: string;
}

export interface AboveFooterContent {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  titleColor?: string;
  descriptionColor?: string;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  titleFontSize?: string;
  descriptionFontSize?: string;
  buttonFontSize?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  contentBackgroundColor?: string;
  alignment?: "left" | "center" | "right";
  showButton?: boolean;
  height?: string;
  marginTop?: string;
}

export type AboveFooterSection = BaseSection<AboveFooterContent>;

export interface DualHeaderImageContent {
  smallHeader?: string;
  bigHeader?: string;
  imageUrl?: string;
  textAlignment?: "left" | "center" | "right";
  textColor?: string;
  smallHeaderFontSize?: string;
  bigHeaderFontSize?: string;
  backgroundColor?: string;
  textPosition?: string;
  overlayOpacity?: string | number | any;
  showOverlay?: boolean;
  smallHeaderColor?: string;
  bigHeaderColor?: string;
  description?: string;
  descriptionColor?: string;
  descriptionFontSize?: string;
  descriptionAlignment?: string;
  buttonText?: string;
  showButton?: boolean;
}

export type DualHeaderImageSection = BaseSection<DualHeaderImageContent>;

export interface ValueCardItem {
  value?: string;
  valueColor?: string;
  description?: string;
  icon?: string;
  title?: string;
  alignment?: "left" | "center" | "right";
}

export interface ValueCardContent {
  title?: string;
  subtitle?: string;
  items?: ValueCardItem[];
  columns?: Record<string, number>;
  [key: string]: any;
}

export interface ContactPageBannerContent {
  title?: string;
  subtitle?: string;
  description?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    hours?: string;
  };
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  overlayOpacity?: number;
  showContactInfo?: boolean;
  formEmbedCode?: string;
}

export type ContactPageBannerSection = BaseSection<ContactPageBannerContent>;

export interface ContactTextAreaContent {
  title?: string;
  subtitle?: string;
  description?: string;
  titleColor?: string;
  subtitleColor?: string;
  textColor?: string;
  backgroundColor?: string;
  alignment?: "left" | "center" | "right";
  titleFontSize?: string;
  subtitleFontSize?: string;
  descriptionFontSize?: string;
  showDecorationLine?: boolean;
  decorationLineColor?: string;
  paddingTop?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginBottom?: string;
  backgroundPattern?: boolean;
  animationDelay?: number;
}

export type ContactTextAreaSection = BaseSection<ContactTextAreaContent>;

export interface ContactAddressContent {
  title?: string;
  subtitle?: string;
  offices?: {
    id: string;
    name: string;
    type: string; // 'headquarters' | 'office'
    address: string[];
    phone?: string;
    email?: string;
    fax?: string;
    poBox?: string;
    mapUrl?: string;
  }[];
  titleColor?: string;
  subtitleColor?: string;
  textColor?: string;
  backgroundColor?: string;
  cardBackgroundColor?: string;
  borderColor?: string;
  accentColor?: string;
  alignment?: "left" | "center" | "right";
  layout?: "grid" | "list";
  showIcons?: boolean;
  showBorders?: boolean;
  paddingTop?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginBottom?: string;
  animationDelay?: number;
}

export type ContactAddressSection = BaseSection<ContactAddressContent>;

export interface ContactFormField {
  id: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "number"
    | "date";
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
  };
  options?: string[]; // For select, radio, checkbox
  width?: "full" | "half" | "third";
  order?: number;
}

export interface ContactFormContent {
  title?: string;
  subtitle?: string;
  description?: string;
  fields?: ContactFormField[];
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  backgroundColor?: string;
  formBackgroundColor?: string;
  fieldBackgroundColor?: string;
  fieldBorderColor?: string;
  fieldTextColor?: string;
  labelColor?: string;
  buttonBackgroundColor?: string;
  buttonTextColor?: string;
  buttonHoverColor?: string;
  accentColor?: string;
  alignment?: "left" | "center" | "right";
  formLayout?: "single" | "two-column" | "mixed";
  showFieldIcons?: boolean;
  animateOnFocus?: boolean;
  paddingTop?: string;
  paddingBottom?: string;
  marginTop?: string;
  marginBottom?: string;
  animationDelay?: number;
}

export type ContactFormSection = BaseSection<ContactFormContent>;

export type ValueCardSection = BaseSection<ValueCardContent>;

export type BannerWithStatsSection = BaseSection<BannerWithStatsContent>;

export interface OurValueHeroBannerContent {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  buttonIcon?:
    | "arrow-right"
    | "external-link"
    | "download"
    | "play"
    | "send"
    | "phone"
    | "mail"
    | "message"
    | "none";
  buttonAnimation?: "slide" | "scale" | "glow" | "shimmer" | "bounce" | "pulse";
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  secondaryButtonVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "gradient";
  secondaryButtonIcon?:
    | "arrow-right"
    | "external-link"
    | "download"
    | "play"
    | "send"
    | "phone"
    | "mail"
    | "message"
    | "none";
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
  animationEnabled?: boolean;
  animationStyle?: "fade" | "slide" | "zoom" | "bounce";
  showScrollIndicator?: boolean;
  height?: "small" | "medium" | "large" | "full";
}

export type OurValueHeroBannerSection = BaseSection<OurValueHeroBannerContent>;



export interface CoreValue {
  number: number;
  title: string;
  description: string;
  icon: "shield" | "lightbulb" | "leaf" | "users" | "target";
}

export interface OurCoreValuesContent {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  cardBackgroundColor?: string;
  cardTextColor?: string;
  cardTitleColor?: string;
  accentColor?: string;
  animationEnabled?: boolean;
  cardStyle?: "elevated" | "flat" | "outlined" | "gradient";
  layout?: "grid" | "list" | "masonry";
  values?: CoreValue[];
}

export type OurCoreValuesSection = BaseSection<OurCoreValuesContent>;

export interface GovernancePrinciple {
  title: string;
  description: string;
  icon: "shield" | "eye" | "filecheck" | "users";
}

export interface CorporateGovernanceContent {
  title?: string;
  subtitle?: string;
  description?: string;
  frameworkTitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  descriptionColor?: string;
  accentColor?: string;
  cardBackgroundColor?: string;
  cardTextColor?: string;
  cardTitleColor?: string;
  animationEnabled?: boolean;
  showBackgroundImage?: boolean;
  imagePosition?: "left" | "right";
  principles?: GovernancePrinciple[];
}

export type CorporateGovernanceSection =
  BaseSection<CorporateGovernanceContent>;

export interface DigitalGovernanceInitiative {
  title: string;
  description: string;
  icon: "monitor" | "users" | "award" | "book";
  backgroundImage?: string;
}

export interface DigitalGovernanceContent {
  title?: string;
  description?: string;
  backgroundColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  accentColor?: string;
  cardBackgroundColor?: string;
  cardHoverColor?: string;
  cardTextColor?: string;
  cardTitleColor?: string;
  cardBorderColor?: string;
  animationEnabled?: boolean;
  initiatives?: DigitalGovernanceInitiative[];
}

export type DigitalGovernanceSection = BaseSection<DigitalGovernanceContent>;

export interface CSRSectionContent {
  title?: string;
  description?: string;
  backgroundImage?: string;
  accentColor?: string;
  textColor?: string;
  overlayColor?: string;
}

export type CSRSection = BaseSection<CSRSectionContent>;

// Partnership Page

export interface CollaborativePartnershipsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  stakeholderGroups?: Array<{
    group: string;
    role: string;
    collaboration: string[];
    icon: string;
  }>;
  partnershipModels?: Array<{
    model: string;
    description: string;
    benefits: string;
    icon: string;
  }>;
  impactMetrics?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type CollaborativePartnershipsSection = BaseSection<CollaborativePartnershipsContent>;

export interface CorporateResponsibilityContent {
  title?: string;
  subtitle?: string;
  description?: string;
  pillars?: Array<{
    title: string;
    description: string;
    icon: string;
    impact: string;
  }>;
  initiatives?: Array<{
    name: string;
    description: string;
    beneficiaries: string;
    metrics: string;
  }>;
  commitmentStats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type CorporateResponsibilitySection = BaseSection<CorporateResponsibilityContent>;

export interface HumanCenteredContent {
  title?: string;
  subtitle?: string;
  description?: string;
  designPrinciples?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  spaceTypes?: Array<{
    type: string;
    description: string;
    features: string[];
    icon: string;
  }>;
  impactMetrics?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type HumanCenteredSection = BaseSection<HumanCenteredContent>;

export interface InclusiveDesignContent {
  title?: string;
  subtitle?: string;
  description?: string;
  accessibilityFeatures?: Array<{
    category: string;
    features: string[];
    icon: string;
  }>;
  userGroups?: Array<{
    group: string;
    needs: string;
    solutions: string[];
    icon: string;
  }>;
  complianceStats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type InclusiveDesignSection = BaseSection<InclusiveDesignContent>;

export interface PublicSpacesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  spaceTypes?: Array<{
    type: string;
    purpose: string;
    features: string[];
    icon: string;
    visitors: string;
  }>;
  communityBenefits?: Array<{
    benefit: string;
    description: string;
    icon: string;
  }>;
  engagementStats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type PublicSpacesSection = BaseSection<PublicSpacesContent>;

export interface ProjectContent {
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: any[]; // Array of project objects
  categories?: string[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showFilters?: boolean;
}

export type ProjectSection = BaseSection<ProjectContent>;

export interface AnantaraResortContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  interiorImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  amenities?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type AnantaraResortSection = BaseSection<AnantaraResortContent>;

export interface BharatMartContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type BharatMartSection = BaseSection<BharatMartContent>;

export interface DubaiExhibitionCentreContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  galleryImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type DubaiExhibitionCentreSection = BaseSection<DubaiExhibitionCentreContent>;

export interface OxagonContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  conceptImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  innovations?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type OxagonSection = BaseSection<OxagonContent>;

export interface SolutionSmartOpsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  facilityImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  technologies?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type SolutionSmartOpsSection = BaseSection<SolutionSmartOpsContent>;

export interface WynnAlMarjanContent {
  title?: string;
  subtitle?: string;
  description?: string;
  location?: string;
  year?: string;
  status?: string;
  heroImage?: string;
  resortImages?: string[];
  features?: string[];
  highlights?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  experiences?: string[];
  stats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type WynnAlMarjanSection = BaseSection<WynnAlMarjanContent>;

export interface AgilityAdaptabilityContent {
  title?: string;
  subtitle?: string;
  description?: string;
  capabilities?: Array<{
    title: string;
    description: string;
    icon: string;
    adaptability: string;
  }>;
  methodologies?: Array<{
    name: string;
    description: string;
    benefits: string[];
  }>;
  flexibilityStats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type AgilityAdaptabilitySection = BaseSection<AgilityAdaptabilityContent>;

export interface ClientCollaborationContent {
  title?: string;
  subtitle?: string;
  description?: string;
  principles?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  teamMembers?: Array<{
    name: string;
    role: string;
    avatar: string;
    expertise: string;
  }>;
  collaborationStats?: Array<{
    value: string;
    label: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type ClientCollaborationSection = BaseSection<ClientCollaborationContent>;

export interface InnovationExecutionContent {
  title?: string;
  subtitle?: string;
  description?: string;
  technologies?: Array<{
    name: string;
    description: string;
    icon: string;
    benefits: string[];
  }>;
  stats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type InnovationExecutionSection = BaseSection<InnovationExecutionContent>;

export interface IntegratedDeliveryContent {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  processSteps?: Array<{
    step: string;
    title: string;
    description: string;
  }>;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type IntegratedDeliverySection = BaseSection<IntegratedDeliveryContent>;

export interface SustainabilityCoreContent {
  title?: string;
  subtitle?: string;
  description?: string;
  pillars?: Array<{
    title: string;
    description: string;
    icon: string;
    initiatives: string[];
  }>;
  impactStats?: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  certifications?: string[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

export type SustainabilityCoreSection = BaseSection<SustainabilityCoreContent>;

/* Partnership hero content spec — add near other hero / banner section interfaces */
export interface PartnershipHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;}
export interface HeroFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface ProjectCoordinationHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  overlayOpacity?: number;
  overlayColor?: string;
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
  height?: "small" | "medium" | "large" | "full";
  animationEnabled?: boolean;
  animationStyle?: "fade" | "slide" | "zoom" | "bounce";
  showScrollIndicator?: boolean;
  // Button / CTA options
  buttonVariant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  buttonIcon?: "arrow-right" | "external-link" | "download" | "play" | "send" | "phone" | "mail" | "message" | "none";
  buttonAnimation?: "slide" | "scale" | "glow" | "shimmer" | "bounce" | "pulse";
}

/* Export the typed section */
export type PartnershipHeroSection = BaseSection<PartnershipHeroContent>;

export interface RealEstateHeroStat {
  label?: string;
  value?: string;
  valueColor?: string;
  labelColor?: string;
  description?: string;
}

export interface RealEstateHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: RealEstateHeroStat[];
  buttonText?: string;
  buttonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  alignment?: "left" | "center" | "right";
  overlay?: boolean;
  overlayOpacity?: number;
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
}

export type RealEstateHeroSection = BaseSection<RealEstateHeroContent>;

export interface RealEstateServiceItem {
  id: string;
  title?: string;
  description?: string;
  iconUrl?: string;
  link?: string;
}

export interface RealEstateServicesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: RealEstateServiceItem[];
  backgroundColor?: string;
  textColor?: string;
}

export type RealEstateServicesSection = BaseSection<RealEstateServicesContent>;

export interface RealEstateProjectItem {
  id: string;
  title?: string;
  location?: string;
  year?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
}

export interface RealEstateProjectsContent {
  title?: string;
  subtitle?: string;
  projects?: RealEstateProjectItem[];
  backgroundColor?: string;
  textColor?: string;
}

export type RealEstateProjectsSection = BaseSection<RealEstateProjectsContent>;

export interface RealEstateNewsItem {
  id: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  date?: string;
}

export interface RealEstateNewsContent {
  title?: string;
  subtitle?: string;
  news?: RealEstateNewsItem[];
  backgroundColor?: string;
  textColor?: string;
}

export type RealEstateNewsSection = BaseSection<RealEstateNewsContent>;

export interface RealEstateSocialItem {
  id: string;
  imageUrl?: string;
  link?: string;
  platform?: string;
}

export interface RealEstateSocialContent {
  title?: string;
  subtitle?: string;
  posts?: RealEstateSocialItem[];
  backgroundColor?: string;
  textColor?: string;
}

export type RealEstateSocialSection = BaseSection<RealEstateSocialContent>;

export interface RealEstateIntegrationContent {
  title?: string;
  subtitle?: string;
  description?: string;
  bulletPoints?: string[];
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export type RealEstateIntegrationSection =
  BaseSection<RealEstateIntegrationContent>;

export interface RealEstateArchitecturalContent {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export type RealEstateArchitecturalSection =
  BaseSection<RealEstateArchitecturalContent>;

export interface RealEstateInnovationItem {
  id: string;
  title?: string;
  bulletPoints?: string[];
}

export interface RealEstateInnovationContent {
  title?: string;
  subtitle?: string;
  sections?: RealEstateInnovationItem[];
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export type RealEstateInnovationSection =
  BaseSection<RealEstateInnovationContent>;

export interface RealEstateDesignBuildContent {
  title?: string;
  subtitle?: string;
  description?: string;
  additionalText?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export type RealEstateDesignBuildSection =
  BaseSection<RealEstateDesignBuildContent>;

export interface RealEstatePortfolioProject {
  id: string;
  title?: string;
  category?: string;
  image?: string;
  description?: string;
  location?: string;
  year?: string;
  features?: string[];
}

export interface RealEstatePortfolioContent {
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: RealEstatePortfolioProject[];
  categories?: string[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export type RealEstatePortfolioSection =
  BaseSection<RealEstatePortfolioContent>;

export interface RealEstateTestimonialItem {
  id: string;
  name?: string;
  position?: string;
  company?: string;
  image?: string;
  rating?: number;
  text?: string;
  project?: string;
}

export interface RealEstateTestimonialsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials?: RealEstateTestimonialItem[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export type RealEstateTestimonialsSection =
  BaseSection<RealEstateTestimonialsContent>;

export interface RealEstateContactFormField {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  options?: string[];
}

export interface RealEstateContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

export interface RealEstateContactContent {
  title?: string;
  subtitle?: string;
  description?: string;
  contactInfo?: RealEstateContactInfo;
  formFields?: RealEstateContactFormField[];
  submitButtonText?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showMap?: boolean;
  mapLocation?: string;
}

export type RealEstateContactSection = BaseSection<RealEstateContactContent>;

export interface ImageWithTextContent {
  heading?: string;
  text?: string;
  image?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonLink?: string;
}

export type ImageWithTextSection = BaseSection<ImageWithTextContent>;

export interface StrategicConsultingHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  overlayOpacity?: number;
  showParticles?: boolean;
  showFloatingElements?: boolean;
  titleAlignment?: string;
  subtitleAlignment?: string;
  descriptionAlignment?: string;
  titleSize?: string;
  subtitleSize?: string;
  descriptionSize?: string;
}

export type StrategicConsultingHeroSection =
  BaseSection<StrategicConsultingHeroContent>;

export interface StrategicConsultingService {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  features?: string[];
}

export interface StrategicConsultingServicesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: StrategicConsultingService[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  layout?: "hexagonal" | "grid" | "circular";
}

export type StrategicConsultingServicesSection =
  BaseSection<StrategicConsultingServicesContent>;

export interface StrategicConsultingExpertiseArea {
  id: string;
  title?: string;
  description?: string;
  year?: string;
  icon?: string;
  color?: string;
  skills?: string[];
  achievements?: string[];
}

export interface StrategicConsultingExpertiseContent {
  title?: string;
  subtitle?: string;
  description?: string;
  expertiseAreas?: StrategicConsultingExpertiseArea[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  timelineColor?: string;
  showAchievements?: boolean;
}

export type StrategicConsultingExpertiseSection =
  BaseSection<StrategicConsultingExpertiseContent>;

export interface StrategicConsultingCaseStudy {
  id: string;
  title?: string;
  client?: string;
  industry?: string;
  image?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  duration?: string;
  team?: string;
  color?: string;
}

export interface StrategicConsultingCaseStudiesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  caseStudies?: StrategicConsultingCaseStudy[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showFilters?: boolean;
  filters?: string[];
}

export type StrategicConsultingCaseStudiesSection =
  BaseSection<StrategicConsultingCaseStudiesContent>;

export interface StrategicConsultingMethodologyStep {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  duration?: string;
  deliverables?: string[];
  tools?: string[];
}

export interface StrategicConsultingMethodologyContent {
  title?: string;
  subtitle?: string;
  description?: string;
  methodology?: StrategicConsultingMethodologyStep[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showConnectors?: boolean;
  connectorColor?: string;
  showDetails?: boolean;
}

export type StrategicConsultingMethodologySection =
  BaseSection<StrategicConsultingMethodologyContent>;

export interface StrategicConsultingTestimonial {
  id: string;
  name?: string;
  position?: string;
  company?: string;
  image?: string;
  quote?: string;
  rating?: number;
  project?: string;
  industry?: string;
  color?: string;
}

export interface StrategicConsultingTestimonialsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials?: StrategicConsultingTestimonial[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showRatings?: boolean;
  showNavigation?: boolean;
  layout?: "carousel" | "grid" | "single";
}

export type StrategicConsultingTestimonialsSection =
  BaseSection<StrategicConsultingTestimonialsContent>;

export interface GovernancePillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: 'active' | 'planned' | 'deprecated';
  priority: 'high' | 'medium' | 'low';
  level: number;
  children: string[];
}

export interface GovernanceCommitmentContent {
  title?: string;
  subtitle?: string;
  description?: string;
  pillars?: GovernancePillar[];
  layoutMode?: 'hierarchy' | 'network' | 'pyramid' | 'matrix';
  accentColor?: string;
  backgroundColor?: string;
  subtitleColor?: string;
  showConnections?: boolean;
  showPriority?: boolean;
  interactiveMode?: boolean;
}

export interface CoreWorkflowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  position?: { x: number; y: number };
  connections?: string[];
}

export interface ProjectCoordinationCoreContent {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
  subtitleColor?: string;
  layoutMode?: 'timeline' | 'workflow' | 'circular' | 'hexagon';
  workflowSteps?: CoreWorkflowStep[];
  showConnections?: boolean;
  animationEnabled?: boolean;
  interactiveMode?: boolean;
}

export interface ProjectCoordinationHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  overlayOpacity?: number;
  showFloatingElements?: boolean;
  showStats?: boolean;
}

export type ProjectCoordinationHeroSection = BaseSection<ProjectCoordinationHeroContent>;

export interface ProjectCoordinationCoreSectionItem {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  features?: string[];
}

export interface ProjectCoordinationCoreContent {
  title?: string;
  subtitle?: string;
  description?: string;
  sections?: ProjectCoordinationCoreSectionItem[];
  backgroundColor?: string;
  textColor?: string;
  subtitleColor?: string;
}

export type ProjectCoordinationCoreSection = BaseSection<ProjectCoordinationCoreContent>;

export interface ProjectCoordinationApproachStep {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
}

export interface ProjectCoordinationApproachContent {
  title?: string;
  subtitle?: string;
  description?: string;
  steps?: ProjectCoordinationApproachStep[];
  backgroundColor?: string;
  subtitleColor?: string;
}

export type ProjectCoordinationApproachSection = BaseSection<ProjectCoordinationApproachContent>;

export interface ApprovalStandardsProcess {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface ApprovalStandardsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  process?: ApprovalStandardsProcess[];
  backgroundColor?: string;
  subtitleColor?: string;
}

export type ApprovalStandardsSection = BaseSection<ApprovalStandardsContent>;

export interface GovernanceCommitmentPillar {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
}

export type GovernanceCommitmentSection = BaseSection<GovernanceCommitmentContent>;

export interface InfrastructureResourceHeroContent {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  overlayOpacity?: number;
  showStats?: boolean;
  stats?: { label: string; value: string; icon?: string }[];
}

export type InfrastructureResourceHeroSection = BaseSection<InfrastructureResourceHeroContent>;

export interface InfrastructureResourceService {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  features?: string[];
  color?: string;
}

export interface InfrastructureResourceServicesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: InfrastructureResourceService[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  layout?: "mosaic" | "timeline" | "hexagonal";
}

export type InfrastructureResourceServicesSection = BaseSection<InfrastructureResourceServicesContent>;

export interface InfrastructureResourceProject {
  id: string;
  title?: string;
  category?: string;
  description?: string;
  image?: string;
  location?: string;
  year?: string;
  status?: string;
  features?: string[];
}

export interface InfrastructureResourceProjectsContent {
  title?: string;
  subtitle?: string;
  description?: string;
  projects?: InfrastructureResourceProject[];
  categories?: string[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showFilters?: boolean;
}

export type InfrastructureResourceProjectsSection = BaseSection<InfrastructureResourceProjectsContent>;

export interface InfrastructureResourceCapability {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  level?: number;
  category?: string;
}

export interface InfrastructureResourceCapabilitiesContent {
  title?: string;
  subtitle?: string;
  description?: string;
  capabilities?: InfrastructureResourceCapability[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showProgress?: boolean;
}

export type InfrastructureResourceCapabilitiesSection = BaseSection<InfrastructureResourceCapabilitiesContent>;

export interface InfrastructureResourceSustainabilityContent {
  title?: string;
  subtitle?: string;
  description?: string;
  initiatives?: { id: string; title: string; description: string; icon: string; impact: string }[];
  backgroundColor?: string;
  textColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  showMetrics?: boolean;
  metrics?: { label: string; value: string; unit: string }[];
}

export type InfrastructureResourceSustainabilitySection = BaseSection<InfrastructureResourceSustainabilityContent>;

export type GenericSection = BaseSection<Record<string, any>>;

export type PageSection =
  | HeroSection
  | TextSection
  | CardSection
  | WhoWeAreSection
  | HomeAboutSection
  | HomeServicesSection
  | HomeSustainableLegacySection
  | DoubleHeadingSection
  | HoverCardSection
  | InnerBannerTextSection
  | BannerWithStatsSection
  | AboveFooterSection
  | DualHeaderImageSection
  | ValueCardSection
  | RealEstateHeroSection
  | RealEstateIntegrationSection
  | RealEstateArchitecturalSection
  | RealEstateInnovationSection
  | RealEstateDesignBuildSection
  | RealEstatePortfolioSection
  | RealEstateTestimonialsSection
  | RealEstateContactSection
  | StrategicConsultingHeroSection
  | StrategicConsultingServicesSection
  | StrategicConsultingExpertiseSection
  | StrategicConsultingCaseStudiesSection
  | StrategicConsultingMethodologySection
  | StrategicConsultingTestimonialsSection
  | ImageWithTextSection
  | ContactPageBannerSection
  | ContactTextAreaSection
  | ContactAddressSection
  | ContactFormSection
  | OurValueHeroBannerSection
  | OurCoreValuesSection
  | CorporateGovernanceSection
  | DigitalGovernanceSection
  | CSRSection
  | CollaborativePartnershipsSection
  | CorporateResponsibilitySection
  | HumanCenteredSection
  | InclusiveDesignSection
  | PublicSpacesSection
  | ProjectSection
  | AnantaraResortSection
  | BharatMartSection
  | DubaiExhibitionCentreSection
  | OxagonSection
  | SolutionSmartOpsSection
  | WynnAlMarjanSection
  | AgilityAdaptabilitySection
  | ClientCollaborationSection
  | InnovationExecutionSection
  | IntegratedDeliverySection
  | SustainabilityCoreSection
  | ProjectCoordinationHeroSection
  | ProjectCoordinationCoreSection
  | ProjectCoordinationApproachSection
  | ApprovalStandardsSection
  | GovernanceCommitmentSection
  | InfrastructureResourceHeroSection
  | InfrastructureResourceServicesSection
  | InfrastructureResourceProjectsSection
  | InfrastructureResourceCapabilitiesSection
  | InfrastructureResourceSustainabilitySection
  | GenericSection
  ;

export interface PageMetadata {
  title: string;
  description?: string;
  slug?: string;
  keywords?: string;
  ogImage?: string;
}

export interface LayoutVersion {
  versionId: string;
  layoutId?: string;
  sections: PageSection[];
  createdAt: string;
  createdBy: string;
  isDraft: boolean;
  notes?: string;
}

export type LayoutVersionsMap = Record<string, LayoutVersion[]>;

export interface Layout {
  id: string;
  name: string;
  title: string;
  slug: string;
  sections: PageSection[];
  metadata: PageMetadata;
  versions: LayoutVersion[];
  currentVersionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

export interface TailwindBreakpoint {
  base: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export const getLayouts = (): Layout[] => {
  ensureFile(layoutsFile, []);
  const data = fs.readFileSync(layoutsFile, "utf-8");
  const layouts: Layout[] = JSON.parse(data);
  const allVersions = getLayoutVersions();

  return layouts.map((layout) => ({
    ...layout,
    versions: allVersions.filter((v) => v.layoutId === layout.id),
  }));
};

export const getLayoutBySlug = (slug: string): Layout | null => {
  const layouts = getLayouts();
  return layouts.find((l) => l.slug === slug) || null;
};

export const getLayoutById = (id: string): Layout | null => {
  const layouts = getLayouts();
  return layouts.find((l) => l.id === id) || null;
};

export const createLayout = (
  layout: Omit<
    Layout,
    "id" | "createdAt" | "updatedAt" | "currentVersionId" | "versions"
  >
): Layout => {
  const layouts = getLayouts();
  const versionId = Date.now().toString();
  const newLayout: Layout = {
    ...layout,
    id: Date.now().toString(),
    sections: layout.sections || [],
    metadata: layout.metadata || { title: "", description: "" },
    versions: [],
    currentVersionId: versionId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Save initial version separately
  const initialVersion: LayoutVersion = {
    versionId,
    layoutId: newLayout.id,
    sections: layout.sections || [],
    createdAt: new Date().toISOString(),
    createdBy: "system",
    isDraft: false,
  };
  const versions = getLayoutVersions();
  versions.push(initialVersion);
  saveLayoutVersions(versions);

  layouts.push(newLayout);
  fs.writeFileSync(layoutsFile, JSON.stringify(layouts, null, 2));
  return newLayout;
};

export const updateLayout = (
  id: string,
  updates: Partial<Omit<Layout, "id" | "createdAt">>
): Layout | null => {
  const layouts = getLayouts();
  const index = layouts.findIndex((l) => l.id === id);
  if (index === -1) return null;

  layouts[index] = {
    ...layouts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(layoutsFile, JSON.stringify(layouts, null, 2));
  return layouts[index];
};

export const deleteLayout = (id: string): boolean => {
  const layouts = getLayouts();
  const filteredLayouts = layouts.filter((l) => l.id !== id);
  if (filteredLayouts.length === layouts.length) return false;
  fs.writeFileSync(layoutsFile, JSON.stringify(filteredLayouts, null, 2));
  return true;
};

export const saveLayoutVersion = (
  id: string,
  sections: PageSection[],
  userEmail: string,
  isDraft: boolean = false,
  notes?: string
): Layout | null => {
  const layouts = getLayouts();
  const index = layouts.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const versionId = Date.now().toString();
  const newVersion: LayoutVersion = {
    versionId,
    layoutId: id,
    sections,
    createdAt: new Date().toISOString(),
    createdBy: userEmail,
    isDraft,
    notes,
  };

  // Save version to separate file
  const versions = getLayoutVersions();
  versions.push(newVersion);
  saveLayoutVersions(versions);

  // Update layout with new current version
  layouts[index].currentVersionId = versionId;
  layouts[index].sections = sections;
  layouts[index].updatedAt = new Date().toISOString();

  fs.writeFileSync(layoutsFile, JSON.stringify(layouts, null, 2));
  return layouts[index];
};

export const revertToVersion = (
  layoutId: string,
  versionId: string,
  userId: string
): Layout | null => {
  const layouts = getLayouts();
  const layoutIndex = layouts.findIndex((l) => l.id === layoutId);
  if (layoutIndex === -1) return null;

  const version = layouts[layoutIndex].versions.find(
    (v) => v.versionId === versionId
  );
  if (!version) return null;

  return saveLayoutVersion(
    layoutId,
    version.sections,
    userId,
    false,
    `Reverted to version ${versionId}`
  );
};

export const updateLayoutMetadata = (
  id: string,
  metadata: PageMetadata
): Layout | null => {
  const layouts = getLayouts();
  const index = layouts.findIndex((l) => l.id === id);
  if (index === -1) return null;

  layouts[index].metadata = metadata;
  layouts[index].updatedAt = new Date().toISOString();
  fs.writeFileSync(layoutsFile, JSON.stringify(layouts, null, 2));
  return layouts[index];
};
