const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export interface Project {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  role: string;
  period: string;
  category: 'professional' | 'personal';
  description: string;
  impact: { value: string; label: string }[];
  tech: string[];
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'aerem',
    title: 'Aerem Solar Monitoring Platform',
    company: 'Aerem Solutions',
    companyLogo: `${basePath}/logos/aerem.avif`,
    role: 'Founding Engineer',
    period: '2023 — present',
    category: 'professional',
    description: 'Built a production-grade SaaS platform for real-time solar plant monitoring from scratch. Designed the architecture, database schema, CI/CD, and delivered the MVP that helped secure a Series A of INR 160 Crore. The platform now monitors 500+ plants, serves 200+ B2B customers, and processes 2M+ daily IoT readings.',
    impact: [
      { value: '500+', label: 'Solar Plants' },
      { value: '2M+', label: 'Daily IoT Events' },
      { value: '200+', label: 'B2B Customers' },
      { value: '-60%', label: 'Support Tickets' },
    ],
    tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Redis', 'WebSockets'],
  },
  {
    id: 'cimpress',
    title: 'National Pen E-Commerce Platform',
    company: 'Cimpress India',
    companyLogo: `${basePath}/logos/cimpress.png`,
    role: 'Senior Software Engineer',
    period: '2020 — 2023',
    category: 'professional',
    description: 'Contributed to a global e-commerce platform serving millions across 20+ countries. Shipped product features that drove 30-40% of platform revenue, built 15+ production REST APIs with Redis caching, integrated real-time payment workflows, and built SSG storefronts scoring 95+ on Lighthouse.',
    impact: [
      { value: '30-40%', label: 'Revenue Impact' },
      { value: '15+', label: 'Production APIs' },
      { value: '99.9%', label: 'API Uptime' },
      { value: '95+', label: 'Lighthouse Score' },
    ],
    tech: ['React', 'Angular', 'Node.js', 'Express', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
  },
  {
    id: 'eventos',
    title: 'Eventos',
    company: 'Personal Project',
    companyLogo: '',
    role: 'Creator',
    period: '2021',
    category: 'personal',
    description: 'A social media platform for event enthusiasts to discover, track, and engage with events. Features media sharing, stories, live streams, posts, and connecting with friends around shared interests.',
    impact: [],
    tech: ['JavaScript', 'React'],
    url: 'https://github.com/sonushahuji4/Eventos',
  },
  {
    id: 'chat',
    title: 'Real-time Chat Application',
    company: 'Personal Project',
    companyLogo: '',
    role: 'Creator',
    period: '2021',
    category: 'personal',
    description: 'Instant messaging application with room support, real-time delivery indicators, and live WebSocket communication. Built to understand Socket.io and real-time architecture patterns.',
    impact: [],
    tech: ['TypeScript', 'React', 'Node.js', 'Express', 'Socket.io'],
    url: 'https://github.com/sonushahuji4/Chat-Application',
  },
];
