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
    name: 'LeetCode',
    url: 'https://leetcode.com/u/sonushahuji4/',
    icon: 'Code',
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/sonushahuji4',
    icon: 'Trophy',
  },
  {
    name: 'Email',
    url: 'mailto:sonushahuji4@gmail.com',
    icon: 'Mail',
  },
];

export const ABOUT_SUMMARY = [
  'Full Stack Engineer with 6 years of experience working on scalable web applications using Node.js, React.js, JavaScript, TypeScript, Next.js, PostgreSQL, and AWS.',
  'Currently working as a Founding Engineer at Aerem Solutions, a solar fintech startup. I joined at an early stage and got the opportunity to make foundational decisions around the tech stack, database design, and CI/CD setup, and helped deliver the MVP. Over time, the platform has grown to monitor 500+ solar plants, serve 200+ B2B customers, and process 2M+ daily IoT data points.',
  'Before Aerem, I spent close to 3 years at Cimpress India (National Pen), a global e-commerce platform serving users across 20+ countries. I worked across the full stack — contributing to product features, building REST APIs, and setting up React storefronts with a focus on performance and reliability.',
] as const;

export const HIGHLIGHT_CARDS: HighlightCard[] = [
  { value: '6+', label: 'Years of Experience' },
  { value: '20+', label: 'Countries Served' },
  { value: '2M+', label: 'Daily IoT Events' },
  { value: '1→5', label: 'Team Built & Led' },
];

export const INTERESTS = [
  'Building products from zero to one',
  'Real-time systems — IoT pipelines, WebSocket dashboards',
  'Performance optimization — DB tuning, caching',
  'Helping teams grow — code reviews, mentoring',
] as const;

export const CONTACT_INFO: ContactInfo = {
  email: 'sonushahuji4@gmail.com',
  phone: '+91 9594196932',
  location: 'Mumbai, India',
  linkedin: 'https://www.linkedin.com/in/sonushahuji/',
  github: 'https://github.com/sonushahuji4',
  resumeUrl: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/resume.pdf`,
};
