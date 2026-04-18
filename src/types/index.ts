export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface HighlightCard {
  value: string;
  label: string;
}

export interface Impact {
  text: string;
  metric?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  type: string;
  duration: string;
  location: string;
  impacts: Impact[];
  tech: string[];
  companyUrl?: string;
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  duration: string;
  activities?: string[];
  description?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
  imageUrl?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
}

export interface CourseCertificate {
  name: string;
  platform: string;
  certificateUrl: string;
}

export interface Recommendation {
  name: string;
  title: string;
  company: string;
  quote: string;
}

export interface Hobby {
  name: string;
  icon: string;
  category: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}
