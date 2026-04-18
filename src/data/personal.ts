import type { SocialLink, ContactInfo, HighlightCard } from '@/types';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const PERSONAL = {
  name: 'Sonu Shahuji',
  title: 'Full Stack Engineer',
  tagline:
    'Founding Engineer at a Series A Solar Fintech Startup | 6+ Years Building Scalable Web Applications',
  resumeUrl: `${basePath}/resume.pdf`,
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/sonushahuji4',
    icon: 'Github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sonushahuji/',
    icon: 'Linkedin',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/i.m.sonuuu',
    icon: 'Instagram',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/sonushahuji4/',
    icon: 'Code',
  },
  {
    name: 'Email',
    url: 'mailto:sonushahuji4@gmail.com',
    icon: 'Mail',
  },
];

export const ABOUT_SUMMARY = [
  'Full Stack Engineer with 6 years of experience working on scalable web applications using Node.js, React.js, JavaScript, TypeScript, Next.js, PostgreSQL, and AWS.',
  'Currently working as a Founding Engineer at Aerem Solutions, a solar fintech startup. I joined at an early stage and got the opportunity to make foundational decisions around the tech stack, database design, and CI/CD setup to help deliver the MVP. Over time, the platform has grown to monitor 500+ solar plants, serve 200+ B2B customers, and process 2M+ daily IoT data points.',
  'Handling this scale led to one of my proudest engineering achievements: completely re-architecting our ETL data pipeline for solar energy telemetry. Originally, processing a standard 15-minute data cycle for 5,000 plants took 12 hours to complete. Through aggressive performance optimization, I slashed that execution time down to just 28 milliseconds while scaling the load to 10,000 plants (30,000+ inverters). Today, that pipeline is so efficient it has the capacity to process data for over 30 million plants within a single 15-minute SLA.',
  'Before Aerem, I spent close to 3 years at Cimpress India (National Pen), a global e-commerce platform serving users across 20+ countries. I worked across the full stack — contributing to product features, building REST APIs, and setting up React storefronts with a focus on performance and reliability.',
] as const;

export const HIGHLIGHT_CARDS: HighlightCard[] = [
  { value: '6+', label: 'Years of Experience' },
  { value: '4', label: 'Production Products' },
  { value: '3', label: 'Engineers Led' },
];

export const INTERESTS = [
  'Building products from zero to one',
  'Real-time systems — IoT pipelines, WebSocket dashboards',
  'Performance optimization — DB tuning, caching',
  'Helping teams grow — code reviews, mentoring',
] as const;

export const CONTACT_INFO: ContactInfo = {
  email: 'sonushahuji4@gmail.com',
  phone: '',
  location: 'Mumbai, India',
  linkedin: 'https://www.linkedin.com/in/sonushahuji/',
  github: 'https://github.com/sonushahuji4',
  resumeUrl: `${basePath}/resume.pdf`,
};

export const INSTAGRAM_URL = 'https://instagram.com/i.m.sonuuu';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzgkpwl';
