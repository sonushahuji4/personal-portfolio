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

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'professional' | 'personal';
  links: ProjectLink[];
  highlight?: string;
}

export interface Skill {
  name: string;
  years?: number;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  duration: string;
  activities?: string[];
  description?: string;
}

export interface PlatformStat {
  label: string;
  value: string;
}

export interface Platform {
  name: string;
  username: string;
  stats: PlatformStat[];
  url: string;
  color: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Recommendation {
  name: string;
  title: string;
  company: string;
  quote: string;
}

export interface Course {
  name: string;
  platform: string;
  instructor: string;
  status: 'completed' | 'in-progress' | 'planned';
  url: string;
  topics: string[];
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
