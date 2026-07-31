export interface GeneralSettings {
  companyName: string;
  slogan: string;
  tabTitleTemplate: string;
  faviconUrl?: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  workingHours: string;
}

export interface AdminAuthSettings {
  username: string;
  passwordHash: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  visible: boolean;
}

export interface NavSettings {
  ctaText: string;
  ctaLink: string;
  navItems: NavItem[];
}

export interface HeroSettings {
  badge: string;
  title: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgImageUrl: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutSettings {
  heading: string;
  subtitle: string;
  contentParagraph1: string;
  contentParagraph2: string;
  imageUrl: string;
  features: FeatureItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ServicesSettings {
  heading: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyUsSettings {
  heading: string;
  subtitle: string;
  items: WhyUsItem[];
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface StatisticsSettings {
  heading: string;
  subtitle: string;
  items: StatItem[];
}

export interface PartnerItem {
  id: string;
  name: string;
  logoUrl: string;
}

export interface PartnersSettings {
  heading: string;
  subtitle: string;
  items: PartnerItem[];
}

export interface ContactSettings {
  heading: string;
  subtitle: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  formTitle: string;
  formNamePlaceholder: string;
  formEmailPlaceholder: string;
  formPhonePlaceholder: string;
  formMessagePlaceholder: string;
  formSubmitButton: string;
  formSuccessMessage: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface FooterSettings {
  companyDescription: string;
  quickLinksHeading: string;
  contactHeading: string;
  copyrightText: string;
  socialLinks: SocialLink[];
}

export interface SiteData {
  general: GeneralSettings;
  adminAuth: AdminAuthSettings;
  nav: NavSettings;
  hero: HeroSettings;
  about: AboutSettings;
  services: ServicesSettings;
  whyUs: WhyUsSettings;
  statistics: StatisticsSettings;
  partners: PartnersSettings;
  contact: ContactSettings;
  footer: FooterSettings;
}
