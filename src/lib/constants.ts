export const SITE_CONFIG = {
  title: 'Sonu Shahuji — Full Stack Engineer',
  description:
    'Portfolio of Sonu Shahuji — Full Stack Engineer with 6+ years of experience building scalable web applications. Founding Engineer at Aerem Solutions.',
  url: 'https://sonushahuji4.github.io/sonu-portfolio',
  author: 'Sonu Shahuji',
} as const;

export const SECTION_IDS = {
  hero: 'hero',
  about: 'about',
  experience: 'experience',
  projects: 'projects',
  skills: 'skills',
  lifeCircle: 'life-circle',
  education: 'education',
  growth: 'growth',
  achievements: 'achievements',
  contact: 'contact',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: `#${SECTION_IDS.about}` },
  { label: 'Experience', href: `#${SECTION_IDS.experience}` },
  { label: 'Projects', href: `#${SECTION_IDS.projects}` },
  { label: 'Skills', href: `#${SECTION_IDS.skills}` },
  { label: 'Contact', href: `#${SECTION_IDS.contact}` },
] as const;

export const NAV_MORE_LINKS = [
  { label: 'Journey', href: `#${SECTION_IDS.growth}` },
  { label: 'Achievements', href: `#${SECTION_IDS.achievements}` },
] as const;
