import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type {
  PageSection,
  HeroSection,
  TextSection,
  CardSection,
} from "@/lib/db";

interface SectionComponentProps {
  section: PageSection;
  isEditing: boolean;
  onUpdate: (updates: Partial<PageSection>) => void;
}

const EditableHero = dynamic(() => import("./sections/EditableHero"), {
  ssr: true,
});
const EditableTextSection = dynamic(
  () => import("./sections/EditableTextSection"),
  { ssr: true }
);
const EditableCardSection = dynamic(
  () => import("./sections/EditableCardSection"),
  { ssr: true }
);
const EditableWhoWeAreSection = dynamic(
  () => import("./sections/AtaGlance/EditableWhoWeAreSection"),
  { ssr: true }
);
const EditableHomeAboutSection = dynamic(
  () => import("./sections/EditableHomeAboutSection"),
  { ssr: true }
);
const EditableHomeServicesSection = dynamic(
  () => import("./sections/EditableHomeServicesSection"),
  { ssr: true }
);
const EditableHomeSustainableLegacySection = dynamic(
  () => import("./sections/EditableHomeSustainableLegacySection"),
  { ssr: true }
);
const EditableDoubleHeadingSection = dynamic(
  () => import("./sections/EditableDoubleHeadingSection"),
  { ssr: true }
);
const EditableHoverCardSection = dynamic(
  () => import("./sections/EditableHoverCardSection"),
  { ssr: true }
);
const EditableInnerBannerTextSection = dynamic(
  () => import("./sections/EditableInnerBannerTextSection"),
  { ssr: true }
);
const EditableBannerWithStatsSection = dynamic(
  () => import("./sections/EditableBannerWithStatsSection"),
  { ssr: true }
);
const EditableAboveFooterSection = dynamic(
  () => import("./sections/EditableAboveFooterSection"),
  { ssr: true }
);
const EditableDualHeaderImageSection = dynamic(
  () => import("./sections/AtaGlance/EditableDualHeaderImageSection"),
  { ssr: true }
);
const EditableValueCardSection = dynamic(
  () => import("./sections/EditableValueCardSection"),
  { ssr: true }
);
const EditableRealEstateHeroSection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstateHeroSection"),
  { ssr: true }
);
const EditableRealEstateIntegrationSection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstateIntegrationSection"),
  { ssr: true }
);
const EditableRealEstateArchitecturalSection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstateArchitecturalSection"),
  { ssr: true }
);
const EditableRealEstateInnovationSection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstateInnovationSection"),
  { ssr: true }
);
const EditableRealEstateDesignBuildSection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstateDesignBuildSection"),
  { ssr: true }
);
const EditableRealEstateVirtualRealitySection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstateVirtualRealitySection"),
  { ssr: true }
);
const EditableRealEstatePortfolioSection = dynamic(
  () => import("./sections/RealEstate/EditableRealEstatePortfolioSection"),
  { ssr: true }
);
const EditableRealEstateProjectApproachSection = dynamic(
  () =>
    import("./sections/RealEstate/EditableRealEstateProjectApproachSection"),
  { ssr: true }
);
const EditableRealEstateProjectOversightSection = dynamic(
  () =>
    import("./sections/RealEstate/EditableRealEstateProjectOversightSection"),
  { ssr: true }
);
const EditableGenericSection = dynamic(
  () => import("./sections/EditableGenericSection"),
  { ssr: true }
);
const EditableStrategicConsultingHeroSection = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableStrategicConsultingHeroSection"
    ),
  { ssr: true }
);
const EditableStrategicConsultingServicesSection = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableStrategicConsultingServicesSection"
    ),
  { ssr: true }
);
const EditableStrategicConsultingExpertiseSection = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableStrategicConsultingExpertiseSection"
    ),
  { ssr: true }
);
const EditableStrategicConsultingCaseStudiesSection = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableStrategicConsultingCaseStudiesSection"
    ),
  { ssr: true }
);
const EditableStrategicConsultingMethodologySection = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableStrategicConsultingMethodologySection"
    ),
  { ssr: true }
);
const EditableStrategicConsultingHero = dynamic(
  () =>
    import("./sections/StrategicConsulting/EditableStrategicConsultingHero"),
  { ssr: true }
);
const EditableStrategicConsultingFeature = dynamic(
  () =>
    import("./sections/StrategicConsulting/EditableStrategicConsultingFeature"),
  { ssr: true }
);
const EditableStrategicConsultingConclusion = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableStrategicConsultingConclusion"
    ),
  { ssr: true }
);
const EditableInfrastructureAdvisoryContentSection = dynamic(
  () =>
    import(
      "./sections/StrategicConsulting/EditableInfrastructureAdvisoryContentSection"
    ),
  { ssr: true }
);
const EditableProjectCoordinationHeroSection = dynamic(
  () =>
    import(
      "./sections/ProjectCoordination/EditableProjectCoordinationHeroSection"
    ),
  { ssr: true }
);
const EditableProjectCoordinationCoreSection = dynamic(
  () =>
    import(
      "./sections/ProjectCoordination/EditableProjectCoordinationCoreSection"
    ),
  { ssr: true }
);
const EditableProjectCoordinationApproachSection = dynamic(
  () =>
    import(
      "./sections/ProjectCoordination/EditableProjectCoordinationApproachSection"
    ),
  { ssr: true }
);
const EditableWhatSetsRausApartSection = dynamic(
  () =>
    import("./sections/ProjectCoordination/EditableWhatSetsRausApartSection"),
  { ssr: true }
);
const EditableApprovalStandardsSection = dynamic(
  () =>
    import("./sections/ProjectCoordination/EditableApprovalStandardsSection"),
  { ssr: true }
);
const EditableGovernanceCommitmentSection = dynamic(
  () =>
    import(
      "./sections/ProjectCoordination/EditableGovernanceCommitmentSection"
    ),
  { ssr: true }
);
const EditableInfrastructureResourceHeroSection = dynamic(
  () =>
    import(
      "./sections/InfrastructureResource/EditableInfrastructureResourceHeroSection"
    ),
  { ssr: true }
);
const EditableInfrastructureResourceServicesSection = dynamic(
  () =>
    import(
      "./sections/InfrastructureResource/EditableInfrastructureResourceServicesSection"
    ),
  { ssr: true }
);
const EditableInfrastructureResourceProjectsSection = dynamic(
  () =>
    import(
      "./sections/InfrastructureResource/EditableInfrastructureResourceProjectsSection"
    ),
  { ssr: true }
);
const EditableInfrastructureResourceCapabilitiesSection = dynamic(
  () =>
    import(
      "./sections/InfrastructureResource/EditableInfrastructureResourceCapabilitiesSection"
    ),
  { ssr: true }
);
const EditableInfrastructureResourceSustainabilitySection = dynamic(
  () =>
    import(
      "./sections/InfrastructureResource/EditableInfrastructureResourceSustainabilitySection"
    ),
  { ssr: true }
);
const EditableInfraVisionSection = dynamic(
  () => import("./sections/InfrastructureResource/EditableInfraVisionSection"),
  { ssr: true }
);
const InfraParagraphCont = dynamic(
  () => import("./sections/InfrastructureResource/InfraPragraphCont"),
  { ssr: true }
);
const AtaGlanceHeroSection = dynamic(
  () => import("./sections/AtaGlance/AtaGlanceHeroSection"),
  { ssr: true }
);
const AtaGlanceServiceSection = dynamic(
  () => import("./sections/AtaGlance/AtaGlanceServiceSection"),
  { ssr: true }
);
const EditablePhilosophySection = dynamic(
  () => import("./sections/AtaGlance/EditablePhilosophySection"),
  { ssr: true }
);
const ContactPageBanner = dynamic(
  () => import("./sections/Contact/ContactPageBanner"),
  { ssr: true }
);
const ContactTextArea = dynamic(
  () => import("./sections/Contact/ContactTextArea"),
  { ssr: true }
);
const ContactAddress = dynamic(
  () => import("./sections/Contact/ContactAddress"),
  { ssr: true }
);
const ContactForm = dynamic(() => import("./sections/Contact/ContactForm"), {
  ssr: true,
});
const OurValueHeroBanner = dynamic(
  () => import("./sections/OurValuesPage/OurValueHeroBanner"),
  { ssr: true }
);
const OurCoreValues = dynamic(
  () => import("./sections/OurValuesPage/OurCoreValues"),
  { ssr: true }
);
const CorporateGovernance = dynamic(
  () => import("./sections/OurValuesPage/CorporateGovernance"),
  { ssr: true }
);
const DigitalGovernance = dynamic(
  () => import("./sections/OurValuesPage/DigitalGovernance"),
  { ssr: true }
);
const CSRSection = dynamic(
  () => import("./sections/OurValuesPage/CSRSection"),
  { ssr: true }
);
const PartnershipHero = dynamic(
  () => import("./sections/Partnerships/PartnershipHero"),
  { ssr: true }
);
const CollaboratingWithPurpose = dynamic(
  () => import("./sections/Partnerships/CollaboratingWithPurpose"),
  { ssr: true }
);
const PartnershipPhilosophy = dynamic(
  () => import("./sections/Partnerships/PartnershipPhilosophy"),
  { ssr: true }
);
const OurPartnerEcosystem = dynamic(
  () => import("./sections/Partnerships/OurPartnerEcosystem"),
  { ssr: true }
);
const WhyChooseRaus = dynamic(
  () => import("./sections/Partnerships/WhyChooseRaus"),
  { ssr: true }
);
const CallToAction = dynamic(
  () => import("./sections/Partnerships/CallToAction"),
  { ssr: true }
);
const DigitalTransformationHero = dynamic(
  () => import("./sections/DigitalTransformation/DigitalTransformationHero"),
  { ssr: true }
);
const ParagraphSectionFirst = dynamic(
  () => import("./sections/DigitalTransformation/ParagraphSectionFirst"),
  { ssr: true }
);
const DigitalTransformationApproach = dynamic(
  () =>
    import("./sections/DigitalTransformation/DigitalTransformationApproach"),
  { ssr: true }
);
const DigitalTransformationFeatures = dynamic(
  () =>
    import("./sections/DigitalTransformation/DigitalTransformationFeatures"),
  { ssr: true }
);
const WhyRausDigitalTransformation = dynamic(
  () => import("./sections/DigitalTransformation/WhyRausDigitalTransformation"),
  { ssr: true }
);
const EditableEnvironmentSustainabilityHeroSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityHeroSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityCoreSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityCoreSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityPlanningSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityPlanningSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityCarbonSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityCarbonSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityPracticesSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityPracticesSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityBuildingSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityBuildingSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilitySDGsSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilitySDGsSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityCommitmentSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityCommitmentSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityResponsibilitySection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityResponsibilitySection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityServicesSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityServicesSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityMindsetSection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityMindsetSection"
    ),
  { ssr: true }
);
const EditableEnvironmentSustainabilityStrategySection = dynamic(
  () =>
    import(
      "./sections/EnvironmentSustainability/EditableEnvironmentSustainabilityStrategySection"
    ),
  { ssr: true }
);
const EditableProjectSection = dynamic(() => import("./sections/Project"), {
  ssr: true,
});
const EditableProjectsHeroSection = dynamic(
  () => import("./sections/Projects/EditableProjectsHeroSection"),
  { ssr: true }
);
const EditableBharatMartSection = dynamic(
  () => import("./sections/Projects/EditableBharatMartSection"),
  { ssr: true }
);
const EditableDubaiExhibitionCentreSection = dynamic(
  () => import("./sections/Projects/EditableDubaiExhibitionCentreSection"),
  { ssr: true }
);
const EditableAnantaraResortSection = dynamic(
  () => import("./sections/Projects/EditableAnantaraResortSection"),
  { ssr: true }
);
const EditableSolutionSmartOpsSection = dynamic(
  () => import("./sections/Projects/EditableSolutionSmartOpsSection"),
  { ssr: true }
);
const EditableOxagonSection = dynamic(
  () => import("./sections/Projects/EditableOxagonSection"),
  { ssr: true }
);
const EditableWynnAlMarjanSection = dynamic(
  () => import("./sections/Projects/EditableWynnAlMarjanSection"),
  { ssr: true }
);

// Case Studies Components
const EditableCaseStudiesHero = dynamic(
  () => import("./sections/CaseStudies/EditableCaseStudiesHero"),
  { ssr: true }
);
const EditableFeaturedCaseStudies = dynamic(
  () => import("./sections/CaseStudies/EditableFeaturedCaseStudies"),
  { ssr: true }
);
const EditableCaseStudyOxagon = dynamic(
  () => import("./sections/CaseStudies/EditableCaseStudyOxagon"),
  { ssr: true }
);
const EditableCaseStudyWynn = dynamic(
  () => import("./sections/CaseStudies/EditableCaseStudyWynn"),
  { ssr: true }
);
const EditableCaseStudyExhibitions = dynamic(
  () => import("./sections/CaseStudies/EditableCaseStudyExhibitions"),
  { ssr: true }
);
const EditableCaseStudiesCTA = dynamic(
  () => import("./sections/CaseStudies/EditableCaseStudiesCTA"),
  { ssr: true }
);

// Mobility Transport Networks Components
const EditableMobilityHero = dynamic(
  () => import("./sections/MobilityTransportNetworks/EditableMobilityHero"),
  { ssr: true }
);
const EditableMobilityFeatures = dynamic(
  () => import("./sections/MobilityTransportNetworks/EditableMobilityFeatures"),
  { ssr: true }
);
const EditableMobilityPartnershipIntro = dynamic(
  () =>
    import(
      "./sections/MobilityTransportNetworks/EditableMobilityPartnershipIntro"
    ),
  { ssr: true }
);
const EditableMobilityPartnersList = dynamic(
  () =>
    import("./sections/MobilityTransportNetworks/EditableMobilityPartnersList"),
  { ssr: true }
);
const EditableMobilityConclusion = dynamic(
  () =>
    import("./sections/MobilityTransportNetworks/EditableMobilityConclusion"),
  { ssr: true }
);
const EditableMobilityTransportNetworks = dynamic(
  () =>
    import(
      "./sections/MobilityTransportNetworks/EditableMobilityTransportNetworks"
    ),
  { ssr: true }
);
const EditableMobilityVision = dynamic(
  () => import("./sections/MobilityTransportNetworks/EditableMobilityVision"),
  { ssr: true }
);

// Strategic Advantages Components
const EditableStrategicAdvantagesHeroSection = dynamic(
  () =>
    import(
      "./sections/StrategicAdvantages/EditableStrategicAdvantagesHeroSection"
    ),
  { ssr: true }
);
const EditableIntegratedDeliverySection = dynamic(
  () =>
    import("./sections/StrategicAdvantages/EditableIntegratedDeliverySection"),
  { ssr: true }
);
const EditableInnovationExecutionSection = dynamic(
  () =>
    import("./sections/StrategicAdvantages/EditableInnovationExecutionSection"),
  { ssr: true }
);
const EditableClientCollaborationSection = dynamic(
  () =>
    import("./sections/StrategicAdvantages/EditableClientCollaborationSection"),
  { ssr: true }
);
const EditableSustainabilityCoreSection = dynamic(
  () =>
    import("./sections/StrategicAdvantages/EditableSustainabilityCoreSection"),
  { ssr: true }
);
const EditableAgilityAdaptabilitySection = dynamic(
  () =>
    import("./sections/StrategicAdvantages/EditableAgilityAdaptabilitySection"),
  { ssr: true }
);

// Community Components
const EditableCommunityHeroSection = dynamic(
  () => import("./sections/Community/EditableCommunityHeroSection"),
  { ssr: true }
);
const EditableHumanCenteredSection = dynamic(
  () => import("./sections/Community/EditableHumanCenteredSection"),
  { ssr: true }
);
const EditableCorporateResponsibilitySection = dynamic(
  () => import("./sections/Community/EditableCorporateResponsibilitySection"),
  { ssr: true }
);
const EditableInclusiveDesignSection = dynamic(
  () => import("./sections/Community/EditableInclusiveDesignSection"),
  { ssr: true }
);
const EditablePublicSpacesSection = dynamic(
  () => import("./sections/Community/EditablePublicSpacesSection"),
  { ssr: true }
);
const EditableCollaborativePartnershipsSection = dynamic(
  () => import("./sections/Community/EditableCollaborativePartnershipsSection"),
  { ssr: true }
);
const EditablePhilosophyWithHoverCardsSection = dynamic(
  () => import("./sections/AtaGlance/EditablePhilosophyWithHoverCardsSection"),
  { ssr: true }
);
const EditableAtaGlanceServiceSection = dynamic(
  () => import("./sections/AtaGlance/AtaGlanceExtraServices"),
  { ssr: true }
);
const EditableValueStatsCard = dynamic(
  () => import("./sections/OurValuesPage/EditableValueStatsCard"),
  { ssr: true }
);

// Natural Resources Components
const NaturalResourcesCTA = dynamic(
  () => import("./sections/NaturalResources/NaturalResourcesCTA"),
  { ssr: true }
);

const componentMap: Record<string, ComponentType<SectionComponentProps>> = {
  hero: EditableHero as any,
  text: EditableTextSection as any,
  card: EditableCardSection as any,
  "who-we-are": EditableWhoWeAreSection as any,
  "home-about": EditableHomeAboutSection as any,
  "home-services": EditableHomeServicesSection as any,
  "home-sustainable-legacy": EditableHomeSustainableLegacySection as any,
  "double-heading": EditableDoubleHeadingSection as any,
  "hover-card": EditableHoverCardSection as any,
  "inner-banner-text": EditableInnerBannerTextSection as any,
  "banner-with-stats": EditableBannerWithStatsSection as any,
  "above-footer": EditableAboveFooterSection as any,
  "dual-header-img": EditableDualHeaderImageSection as any,
  "value-card": EditableValueCardSection as any,
  "at-a-glance-hero": AtaGlanceHeroSection as any,
  "at-a-glance-service": AtaGlanceServiceSection as any,
  "editable-philosophy": EditablePhilosophySection as any,
  "contact-page-banner": ContactPageBanner as any,
  "contact-text-area": ContactTextArea as any,
  "contact-address-section-1": ContactAddress as any,
  "contact-form": ContactForm as any,
  "real-estate-hero": EditableRealEstateHeroSection as any,
  "real-estate-integration": EditableRealEstateIntegrationSection as any,
  "real-estate-architectural": EditableRealEstateArchitecturalSection as any,
  "real-estate-innovation": EditableRealEstateInnovationSection as any,
  "real-estate-design-build": EditableRealEstateDesignBuildSection as any,
  "real-estate-virtual-reality": EditableRealEstateVirtualRealitySection as any,
  "real-estate-portfolio": EditableRealEstatePortfolioSection as any,
  "real-estate-project-approach":
    EditableRealEstateProjectApproachSection as any,
  "real-estate-project-oversight":
    EditableRealEstateProjectOversightSection as any,
  "strategic-consulting-hero": EditableStrategicConsultingHeroSection as any,
  "strategic-consulting-services":
    EditableStrategicConsultingServicesSection as any,
  "strategic-consulting-expertise":
    EditableStrategicConsultingExpertiseSection as any,
  "strategic-consulting-case-studies":
    EditableStrategicConsultingCaseStudiesSection as any,
  "strategic-consulting-methodology":
    EditableStrategicConsultingMethodologySection as any,
  "strategic-consulting-paragraph-hero": EditableStrategicConsultingHero as any,
  "strategic-consulting-paragraph-feature":
    EditableStrategicConsultingFeature as any,
  "strategic-consulting-paragraph-conclusion":
    EditableStrategicConsultingConclusion as any,
  "infrastructure-advisory-content":
    EditableInfrastructureAdvisoryContentSection as any,
  "our-value-hero-banner": OurValueHeroBanner as any,
  "our-core-values": OurCoreValues as any,
  "corporate-governance": CorporateGovernance as any,
  DigitalGovernanceSection: DigitalGovernance as any,
  CSRSection: CSRSection as any,
  "partnership-hero": PartnershipHero as any,
  "partnership-philosophy": PartnershipPhilosophy as any,
  "our-partner-ecosystem": OurPartnerEcosystem as any,
  "collaborating-with-purpose": CollaboratingWithPurpose as any,
  WhyChooseRaus: WhyChooseRaus as any,
  CallToAction: CallToAction as any,
  DigitalTransformationHeroBanner: DigitalTransformationHero as any,
  ParagraphSectionFirst: ParagraphSectionFirst as any,
  DigitalTransformationApproach: DigitalTransformationApproach as any,
  DigitalTransformationFeatures: DigitalTransformationFeatures as any,
  WhyRausDigitalTransformation: WhyRausDigitalTransformation as any,
  "project-coordination-hero": EditableProjectCoordinationHeroSection as any,
  "project-coordination-core": EditableProjectCoordinationCoreSection as any,
  "project-coordination-approach":
    EditableProjectCoordinationApproachSection as any,
  "project-coordination-differentiators":
    EditableWhatSetsRausApartSection as any,
  "approval-standards": EditableApprovalStandardsSection as any,
  "governance-commitment": EditableGovernanceCommitmentSection as any,
  "infrastructure-resource-hero":
    EditableInfrastructureResourceHeroSection as any,
  "infrastructure-resource-services":
    EditableInfrastructureResourceServicesSection as any,
  "infrastructure-resource-projects":
    EditableInfrastructureResourceProjectsSection as any,
  "infrastructure-resource-capabilities":
    EditableInfrastructureResourceCapabilitiesSection as any,
  "infrastructure-resource-sustainability":
    EditableInfrastructureResourceSustainabilitySection as any,
  "infrastructure-resource-vision": EditableInfraVisionSection as any,
  "infrastructure-resource-paragraph": InfraParagraphCont as any,
  "environment-sustainability-hero":
    EditableEnvironmentSustainabilityHeroSection as any,
  "environment-sustainability-core":
    EditableEnvironmentSustainabilityCoreSection as any,
  "environment-sustainability-planning":
    EditableEnvironmentSustainabilityPlanningSection as any,
  "environment-sustainability-carbon":
    EditableEnvironmentSustainabilityCarbonSection as any,
  "environment-sustainability-practices":
    EditableEnvironmentSustainabilityPracticesSection as any,
  "environment-sustainability-building":
    EditableEnvironmentSustainabilityBuildingSection as any,
  "environment-sustainability-sdgs":
    EditableEnvironmentSustainabilitySDGsSection as any,
  "environment-sustainability-commitment":
    EditableEnvironmentSustainabilityCommitmentSection as any,
  "environment-sustainability-responsibility":
    EditableEnvironmentSustainabilityResponsibilitySection as any,
  "environment-sustainability-services":
    EditableEnvironmentSustainabilityServicesSection as any,
  "environment-sustainability-mindset":
    EditableEnvironmentSustainabilityMindsetSection as any,
  "environment-sustainability-strategy":
    EditableEnvironmentSustainabilityStrategySection as any,
  project: EditableProjectSection as any,
  "projects-hero": EditableProjectsHeroSection as any,
  "bharat-mart": EditableBharatMartSection as any,
  "dubai-exhibition-centre": EditableDubaiExhibitionCentreSection as any,
  "anantara-resort": EditableAnantaraResortSection as any,
  "solution-smart-ops": EditableSolutionSmartOpsSection as any,
  oxagon: EditableOxagonSection as any,
  "wynn-al-marjan": EditableWynnAlMarjanSection as any,
  // Case Studies
  "case-studies-hero": EditableCaseStudiesHero as any,
  "featured-case-studies": EditableFeaturedCaseStudies as any,
  "case-study-oxagon": EditableCaseStudyOxagon as any,
  "case-study-wynn": EditableCaseStudyWynn as any,
  "case-study-exhibitions": EditableCaseStudyExhibitions as any,
  "case-studies-cta": EditableCaseStudiesCTA as any,
  // Strategic Advantages
  "strategic-advantages-hero": EditableStrategicAdvantagesHeroSection as any,
  "integrated-delivery-model": EditableIntegratedDeliverySection as any,
  "innovation-driven-execution": EditableInnovationExecutionSection as any,
  "client-centric-collaboration": EditableClientCollaborationSection as any,
  "sustainability-at-the-core": EditableSustainabilityCoreSection as any,
  "agility-adaptability": EditableAgilityAdaptabilitySection as any,
  // Mobility Transport Networks
  "mobility-hero": EditableMobilityHero as any,
  "mobility-features": EditableMobilityFeatures as any,
  "mobility-partnership-intro": EditableMobilityPartnershipIntro as any,
  "mobility-partners-list": EditableMobilityPartnersList as any,
  "mobility-conclusion": EditableMobilityConclusion as any,
  "mobility-transport-networks": EditableMobilityTransportNetworks as any,
  "mobility-vision": EditableMobilityVision as any,
  // Community
  "community-hero": EditableCommunityHeroSection as any,
  "human-centered-development": EditableHumanCenteredSection as any,
  "corporate-social-responsibility":
    EditableCorporateResponsibilitySection as any,
  "inclusive-accessible-design": EditableInclusiveDesignSection as any,
  "public-spaces-with-purpose": EditablePublicSpacesSection as any,
  "collaborative-community-partnerships":
    EditableCollaborativePartnershipsSection as any,
  "philosophy-with-hover-cards": EditablePhilosophyWithHoverCardsSection as any,
  "at-a-glance-extra-service": EditableAtaGlanceServiceSection as any,
  "our-values-value-card-stats-card": EditableValueStatsCard as any,
  // Natural Resources
  "natural-resources-cta": NaturalResourcesCTA as any,
};

export function getSectionComponent(
  type: string
): ComponentType<SectionComponentProps> | null {
  return componentMap[type] || null;
}

export function getDefaultComponent(): ComponentType<SectionComponentProps> {
  return EditableGenericSection as any;
}
